+++
type = "blog"
title = "[GSoC 2024] Sound virtio: Community Update"
author = "diegoroux"
date = "2024-06-19 01:07:34-06:00"
tags = ["gsoc", "gsoc2024", "virtio", "sound"]
+++

# intro
Hello, once again! It's been a month since the last update, so here we go.

Good news, there is active development of the virtio sound driver for Haiku.
Key progress includes assigning channel maps to their respective streams and
integrating PCM stream scanning.

Additionally, efforts have focused on modularizing the driver, ensuring
compliance with Haiku's coding standards, and laying the groundwork for further
enhancements to functionality. While progress has been substantial, there are
still areas requiring refinement as we continue to expand the driver's
capabilities.

# Understanding & Applying Virtio Sound Specification
Control of the device is achieved through dedicated queues; for initializing
and discovering supported device configurations, we only care about one queue:
the control queue.

As per the spec [5.14.2](https://docs.oasis-open.org/virtio/virtio/v1.2/cs01/virtio-v1.2-cs01.html#x1-5310002):
> The control queue is used for sending control messages from the driver to
> the device.

We can discover device configuration through the control queue and get the
following struct:
```
struct virtio_snd_config { 
    le32 jacks;     // indicates a total number of all available jacks.
    le32 streams;   // indicates a total number of all available PCM streams.
    le32 chmaps;    // indicates a total number of all available channel maps.
};
```

Not surprisingly, the host implementations do not support the full configuration.
For example, [QEMU](https://www.qemu.org/docs/master/system/devices/virtio-snd.html)
only supports `streams` (fixed at two) and will always return zero `jacks` and zero
`chmaps`. I was surprised by this last one; QEMU expects that the guest driver falls
back to a Front left, right channel mapping when zero `chmaps` are offered.

There's a [vhost-user project](https://wiki.qemu.org/Internships/ProjectIdeas/VirtioSound)
for QEMU, written in Rust, that does implement `chmaps`.

For the development of this project, both implementations are used for testing
the driver.

After knowing how many `jacks`, `streams`, and `chmaps` the device offers, we're
supposed to query information about them. Each one returns a respective structure.
I'm not going to cover it in detail (I could do a more in-depth overview for
those who like knowing about these things). After this, we're kind of done with
the initial discovery part; we now need to communicate with Haiku to set up the
device completely.

# Getting the driver to load
So, I made a mistake...
```
#define VIRTIO_SOUND_DRIVER_MODULE_NAME 	"drivers/audio/virtio/driver_v1"
#define VIRTIO_SOUND_DEVICE_MODULE_NAME 	"drivers/audio/virtio/device_v1"
```
If you know more about writing drivers for Haiku, especially audio ones,
you may already be sighing in disbelief.

It should look like this:

```
#define VIRTIO_SOUND_DRIVER_MODULE_NAME 	"drivers/audio/hmulti/virtio_sound/driver_v1"
#define VIRTIO_SOUND_DEVICE_MODULE_NAME 	"drivers/audio/hmulti/virtio_sound/device_v1"
```

Yay! Now the driver loads... I should've done more before the initial commit...
Thanks, Korli. I couldn't figure out why it wouldn't load; two days went into
this change, before I gave up and asked.

# multi_audio
So what does Haiku call/write/read first from the driver, after being
correctly registered? Well, I didn't know the answer, so through some
digging we go.

To prevent this entry from getting longer than it is now, I'll keep 
this investigation short.

If you look at line 137 of [MultiAudioDevice.cpp](https://github.com/haiku/haiku/blob/master/src/add-ons/media/media-add-ons/multi_audio/MultiAudioDevice.cpp#L137), you've got the answer.
MultiAudio requires from us a description of the device (formats, rates, channels,
channel map, etc).

If you look further than line 137, you'll see more of the ioctl calls that
MultiAudio performs, don't worry about them (for now).

To fulfill this request, we must convert the formats, rates,
channel designations, and so on, from Virtio 'encoding' to Haiku's MultiAudio
encoding. To achieve this, LUTs were used (quite the buildup, not a very exciting
solution). After that, we build the channel map and the description that is asked
from us and return it.

There's a lot more, and more technical, that I would love to keep
writing about, but I'll cut it here for now.

# outro
I've had my fair share of kernel panics, segment violations,
and compilation errors, but I've been able to get past them, so yeah, 
I've been learning a lot about Haiku.

I'd like to thank Korli once more; any roadblock, question, or
issue I had, Korli has been there to help.

You can follow my progress at my [fork](https://github.com/diegoroux/haiku/tree/virtio-sound-dev),
within the branch `virtio-sound-dev`.

I'll try to update you all more often.

Until next time.