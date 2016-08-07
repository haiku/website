+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Report #5"
date = "2016-05-11T22:41:31.000Z"
tags = ["media server", "media_kit", "streaming contract"]
+++

It's really a long time since the latest report, starting with this one I'm going to restore the usual article frequency.

The second part of my contract has been accepted and I'm finally returning to work on streaming support. However there is various work I had not the possibility to talk about and other things I pushed in the last week.
<!--break-->
The first issue dates back to 7th April: the ticket <a href="https://dev.haiku-os.org/ticket/5106">#5106</a>. BControllable is a media_kit interface allowing nodes to provide a toolkit independant interface targeted to be used for media controls. The first example you may see is the Mixer tab in Media preferences.

The problem was due to certain nodes, specifically the ones handling parameter events in the queue, that changed the value with a noticeable delay.

The motivation was that in the Haiku implementation the events were enqueued using the real_time instead of the performance_time. The ToneProducer was affected by this issue, and it has been solved in <a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev50191">hrev50191</a>.

Between hrev50192 and hrev50216 there are several things :

<ul>
 <li>Some follow-up fixes and cleanup.</li>
 <li>A partial attempt to increase the ffmpeg plugin safeness when writing to files.</li>
 <li>Work on the Mixer core threads synchronization. With those changes I aim to begin a general review of some fundamental media_kit parts.</li>
</ul>

In <a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev50241">hrev50241</a>/<a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev50242">hrev50242</a> I finished stabilizing, hopefully finally, the functions of launch_media_server and shutdown_media_server.

Someone may remember from the last article that I improved the media_server restart process and making it faster. This time it was the turn of making it safer and fix possible issues from both legacy and Haiku applications. One problem was for example that the shutdown_media_server function didn't remember the actual media_server instance making room for a mismatch.

If that happened, the result might have been non-working media functionalities due to the server being shut down twice. I also solved the little regression of the media server startup notification being shown each time the media_server started.

There are other fixes, too. The first was a little usability improvement in MediaPlayer by making the playlist window select the previous item after removing one. I made some cleanup in the reader/writer nodes, too. Those are special nodes to allow others to read and write files.

I aim to improve this code by making it decode/encode the data instead of only providing it, but I think this is for a future article.

I also continued the live555 recipe work, improving it by adding some missing fields and fixing the library installation paths.

Last but not least, there's some BMediaEventLooper work in <a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev50293">hrev50293</a>.

<ul>
 <li>The nodes latency calculation has been improved since my last attempt, the substance of this fix is to allow recognizing different kinds of latency.</li>
 <li>The main loop has been improved in this sense by flushing the late events in an attempt to better recover from stress situations.</li>
 <li>I added also a little backward compatibility fix, making SetBufferDuration to clamp the value to 0 in case the buffer duration is negative.</li>
</ul>

See you next week!