+++
type = "blog"
title = "[GSoC 2024] Virtio Sound: Recording Achieved and more"
date = "2024-07-27 00:41:37-06:00"
tags = ["gsoc", "gsoc2024", "virtio", "sound"]
+++

# intro
Hello, once again! It's been weeks since the last update, so here we go.

Good news, there is active development of the virtio sound driver for Haiku.
Key progress includes recording on the device and improvements. 


# buffer exchange redesign
As per the last blog post:

We still specify 2 playback buffers, but incremented to 16,384 frames per
buffer, to handle audio streams.

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

I messed up a lot during these last two weeks. A certain [bug](https://github.com/diegoroux/haiku/issues/3)
appeared, and it was a tricky one, not even appearing all the time. As far
as I'm concerned, it looks like I should not have gone playback-first and
recording-last.

As noted in [issue #3](https://github.com/diegoroux/haiku/issues/3):

```c
buf_info.recorded_real_time = 0; // or whatever garbage value we had there.
buf_info.recorded_frames_count = 0; // same goes here.
```

I was signaling: `buf_info.flags = B_MULTI_BUFFER_PLAYBACK;` exclusively,
but it looks like multi_audio ultimately ignores that if recording was announced
before. It could not accurately produce a TimeSource and resulted in all types of
crashes of media_server_addon and/or media_server. Due to crashes being spontaneous,
the source was hard to trace back. Integrating recording to buffer_exchange was needed
to fix this, but I spent a lot of time actually figuring it out.

Secondly, I misattributed buffer_exchange being slow to causing the crash; this was
actually not the case. It rather appears that virtio sound being 'done' with a particular
buffer only means it has successfully copied/passed it to the audio backend, but no playback
was done. This led to buffer_exchange consuming buffers faster than what should have been
possible. buffer_exchange was faster than it should have been. That also messed with TimeSource
calculations. Korli caught the 'only passed to audio backend'.

# outro
Main functionality is here! I recognise that there's still work to do,
I still would like to ensure everything is 100% before pushing, and
maybe find ways to improve how we do stuff in the driver.

You can follow my progress at my [fork](https://github.com/diegoroux/haiku/tree/virtio-sound-dev),
within the branch `virtio-sound-dev`.

Until next time.
