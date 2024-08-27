+++
type = "blog"
title = "[GSoC 2024] Virtio Sound: Final Report"
author = "diegoroux"
date = "2024-08-22 18:39:13-06:00"
tags = ["gsoc", "gsoc2024", "virtio", "sound", "video"]
+++

# Gerrit Submission.
[8141](https://review.haiku-os.org/c/haiku/+/8141)

# Overview
During this GSoC period, I focused on developing the virtio sound driver for Haiku,
aiming to enhance its performance as a guest OS in virtualized environments.
This journey began with some challenges, for example, initially, I missed a small
detail in the driver module path, which prevented the driver from loading.

One of the significant setbacks, I had, was understanding hmulti_audio.
With little to no documentation available, it felt like working with a black box.
I had to dive into existing audio drivers to piece together how things worked, but
even then, some aspects remained hidden to me.

Throughout the development, I encountered various bugs, such as SMAP faults and
unexpected crashes linked to hmulti_audio's undocumented requirements. But we
continued! And as of now, the driver supports playback but with some limitations.
High bitrates (e.g., 384 kHz, 192 kHz) are not fully functional, so playback for these
has been disabled. Recording, while partially successful at very low bitrates, has been
disabled due to quality concerns. I plan to continue refining these aspects post-GSoC,
with a focus on achieving reliable playback at high bitrates and reliable recording for 
all bitrates.

# Why won't you play at normal speed?
VirtIO Sound relies on four queues: the control queue, the rx queue, the tx queue,
and the event queue (currently unused). Configuration and stream discovery occur
through the control queue, where we identify the supported bitrates, formats, and
other stream characteristics. Once the streams are discovered, we configure them by
selecting the highest supported bitrate, which hmulti_audio defaults to, and initiate
the buffer_exchange process. Sounds simple? It it simple, but after this... (ugh)

The VirtIO specification leaves room for interpretation, particularly regarding how
and when buffers are considered "consumed." While the spec suggests that a device should
not return until audio buffers have been consumed, it doesn't clarify if this means the
buffers have been played or simply handed off to the host's audio system.
This ambiguity presented a challenge since hmulti_audio expects that once buffer_exchange
indicates a new buffer cycle, the buffer has been played.

To manage this, we implemented a solution where we wait the amount of time it would take
for the buffer to be played, aligning with hmulti_audio's expectations.
However, this isn't foolproof, as there's no reliable method to confirm playback—only
consumption. Events in this setup signal the completion of a full cycle, which just
results in the same behaviour. See commit [01f627f](https://github.com/diegoroux/haiku/commit/01f627fcd2c7994103431aa5dc3e5faf631cbe88).

# Unofficial hmulti_audio Guide
I suffered through not having an idea on what should I expect to
implement and in what order. So here's a concise guide based on my experience:

In order to get loaded and recognized by hmulti_audio, the MODULE_NAME for both drivers
and devices must start with `drivers/audio/hmulti/{name}`. For example:
`drivers/audio/hmulti/virtio_sound/driver_v1` and `drivers/audio/hmulti/virtio_sound/device_v1`.
The last part signals support for the new driver version.

hmulti_audio communicates with drivers primarily through ioctl calls (using codes that
look like: `B_MULTI_...`). All valid ioctl codes (as well as the structs used for them) can
be found in [headers/private/audio/hmulti_audio.h](https://github.com/haiku/haiku/blob/master/headers/private/audio/hmulti_audio.h) under the first enum.

<div class="alert alert-info">
For this point on, we'll treat sending an specific code through ioctl as calling a function.
</div>

The init procedure hmulti_audio goes through for a device can be read [here](https://github.com/haiku/haiku/blob/master/src/add-ons/media/media-add-ons/multi_audio/MultiAudioDevice.cpp#L118). 
To start, hmulti_audio retrieves the device information, such as supported formats, bitrates,
input/output channels, and the channel maps through `B_MULTI_GET_DESCRIPTION`.

<div class="alert alert-info">
bus_channels, can generate a bit of a confusion, at first glance, but they do not represent an
extra channel but rather the physical input/output.
</div>

Secondly, hmulti_audio will try to get and set enabled channels through `B_MULTI_GET_ENABLED_CHANNELS`
and `B_MULTI_GET_ENABLED_CHANNELS`, respectively. Even if you can't disable/enable channels on your
device, you must reply to both calls.

hmulti_audio, using the information given at the `B_MULTI_GET_DESCRIPTION` step, will pick
the highest supported bitrate and format for each stream. `B_MULTI_SET_GLOBAL_FORMAT` will
be called with a `multi_format_info` argument, which will contain the requested format and
bitrate for both input and output (if both supported). Immediately after, `B_MULTI_GET_GLOBAL_FORMAT`
will be called, to obtain the formats and bitrates, on which the device is currently
operating under, this means one can ignore the initial request as `B_MULTI_GET_GLOBAL_FORMAT`
will take precedent.

hmulti_audio then needs to know where to send the buffers for playback or where to retrieve
recorded buffers. This is done via `B_MULTI_GET_BUFFERS`, where we provide buffer details such
as the buffer size (in frames per buffer, rather than bytes), the number of buffer cycles,
and the buffers themselves. Inside `multi_buffer_list`, an array for a set number of buffers
is given, this array (separate arrays for playback and recording exist, but are the same
in structure) allows us to specify the starting address of this buffer, for one channel,
one must give the starting point for each channel, and stride (size in bytes of a single frame)
repating this for N buffers. To illustrate this point, for one buffer:
```c
for (uint32 ch_id = 0; ch_id < stream->channels; ch_id++) {
    buf_desc[ch_id].base = buf_ptr + (format_size * ch_id);
    buf_desc[ch_id].stride = format_size * stream->channels;
}
```

Finally, `B_MULTI_LIST_MIX_CONTROLS` is called by hmulti_audio to query the driver
for any user-facing controls that should be displayed in the Media Preferences. It is
acceptable to return 0 controls and B_OK if none are available.

The call to `B_MULTI_BUFFER_EXCHANGE` signifies the start of playback/recording,
although it is possible no actual audio data is sent at this stage. If the user
changes preferences (such as the bitrate), hmulti_audio will cycle through calling
`B_MULTI_SET_GLOBAL_FORMAT` and `B_MULTI_GET_BUFFERS` again. 

<div class="alert alert-info">
B_MULTI_BUFFER_FORCE_STOP is never called, one should never assume that
playback/recording will be explicitly stopped.
</div>

All the other ioctl codes, may remain unimplemented at your discretion.

<div class="alert alert-info">
Remember all structs given, live in userspace. Act accordingly.
</div>

# So, what did you do this summer?
I focused on implementing the VirtIO sound specification and
integrating it with Haiku's hmulti_audio system.

I successfully implemented playback, created a driver that's flexible and easy
to update, with potential for multi-stream support in the future.

This wasn't as straighforward as it might seem, see [#1](https://github.com/diegoroux/haiku/issues/1),
[#2](https://github.com/diegoroux/haiku/issues/2), [#3](https://github.com/diegoroux/haiku/issues/3).

Issue [#1](https://github.com/diegoroux/haiku/issues/1), given that I forgot
that structs came from userspace, I constantly violated SMAP in all replies
to hmulti_audio.

Issue [#2](https://github.com/diegoroux/haiku/issues/2), wanting to have 'clean'
replies I decided to memset (0x00) some structs before writing our reply on them. Doing
that in `get_description` caused the array pointer, where the channel map was 
expected to be, to be wiped to NULL. See how we [fixed this](https://github.com/diegoroux/haiku/commit/b3a98e80c4b5b05d331d0b4b6ad1dcc14d1e58d6).

Issue [#3](https://github.com/diegoroux/haiku/issues/3). 

![page fault image](../page_fault.png)

The longest (in time being opened to fixed) to exist. A page fault was occuring, randomly.
This made it harder to debug, as it sometimes it appeared to be fixed but one hour later
coming back. It was actually caused by not having values in the buffer_exchange for 
the recording. It was fixed by a ~three line change. This was frustrating, but I'm
glad it got fixed.

I dedicated a significant portion of my time to understanding and troubleshooting issues,
especially around high-bitrate playback and recording. Although high-bitrate playback is
still a work in progress, and recording has been temporarily disabled, these are areas
I plan to continue improving post-GSoC.

Looking ahead, my goals include fixing high-bitrate playback, re-enabling recording,
and optimizing the driver's performance, particularly in terms of CPU usage.
This project is something I plan to continue developing well beyond the GSoC period.

# the end?
This GSoC journey has been an incredible learning experience.
I want to endlessly thank Jérôme Duval (@korli) and Scott McCreary (@scottmc) for their
invaluable guidance, patience and valuable lessons; as well as to the community, everyone who
took the time to read my blog posts, those who offered help in the IRC during the early stages.
Your support made this possible, and I look forward to continuing my work with Haiku
in the future.

It's not the end, at least not for the VirtIO Sound driver.

If you want to have a more detailed view of all of my work, click [here](https://github.com/diegoroux/haiku/pull/4).

Thank you all!
- Diego Roux
