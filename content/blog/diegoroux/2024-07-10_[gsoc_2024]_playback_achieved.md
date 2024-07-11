+++
type = "blog"
title = "[GSoC 2024] Virtio Sound: Playback achieved."
author = "diegoroux"
date = "2024-07-10 16:02:14-06:00"
tags = ["gsoc", "gsoc2024", "virtio", "sound"]
+++

# intro
Hello, once again! It's been three weeks since the last update, so here we go.

Good news, there is active development of the virtio sound driver for Haiku.
Key progress includes achieving playback on the device.

# Getting the buffers ready.
We need to tell hmulti_audio where it should expect to write and read the audio
frames, to do that we need to fill out a structure called `multi_buffer_list`:
```
struct multi_buffer_list {
    // [...]

	int32			return_playback_buffers;
	int32			return_playback_channels;
	uint32			return_playback_buffer_size;

    // Contains the pointer to the start of a given buffer,
    // as well as the stride it should take.
	buffer_desc **	playback_buffers;

    // [...]

	int32			return_record_buffers;
	int32			return_record_channels;
	uint32			return_record_buffer_size;

	buffer_desc **	record_buffers;

    // [...]
};
```

We currently specify 2 playback buffers, 1024 frames per buffer, to handle
audio streams. The number of channels is specified in the chmap_query or
defaulting to stereo if no channel maps are given by the device.

Certainly! Let's structure the explanation of the playback section with a blog post style, focusing on the `multi_buffer_info` structure and how it facilitates audio playback interaction with the Virtio Sound device:

```
struct multi_buffer_info {
    // [...]

    bigtime_t       played_real_time;
    bigtime_t       played_frames_count; 
    
    // [...]

    int32           playback_buffer_cycle;

    bigtime_t       recorded_real_time;
    bigtime_t       recorded_frames_count;
    
    // [...]

    int32           record_buffer_cycle;

    // [...]
};
```

When `BUFFER_EXCHANGE` is first called, the driver is expected to populate the
`multi_buffer_info` structure. Because hmulti_audio doesn't have an established
way of signaling 'play', we take the first call as it's equivalent. So we reset
`playback_buffer_cycle` to 0, signaling that buffer writting should commence
from the first buffer.

Currently, we await both playback buffers before sending them to the
device. Unfortunately, vhost drivers expect all promised buffers to be sent at
once, this is left unresolved at the virtio spec. So both behaviours are correct
for playback. We will transition to promising only one buffer at a time for playback
(while keeping two for recording).

After sending buffers, we await a status code from the device to confirm
successful transfer. Upon confirmation, we update `multi_buffer_info` with the
next `playback_buffer_cycle` and system time.

# outro
Navigating both hmulti_audio and virtio specs have been quite the journey.
There's much more to explore and refine.

**hmulti_audio** presents an interesting API for audio, with limited
documentation. In my next blog post, I aim to bridge this gap by providing
a guide/summary of my findings, with the hope of pointing in the right direction,
aspiring developers interested in writing audio drivers for Haiku.

You can follow my progress at my [fork](https://github.com/diegoroux/haiku/tree/virtio-sound-dev),
within the branch `virtio-sound-dev`.

I'll try to update you all more often.

Until next time.