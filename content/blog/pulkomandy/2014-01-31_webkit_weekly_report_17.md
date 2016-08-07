+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #17"
date = "2014-01-31T08:50:41.000Z"
tags = ["contract work", "WebKit", "app_server"]
+++

Hello everyone!

The work started last week on ClipToPicture made some progress this week. We discussed this further with Stippi and now have a solution that doesn't involve rewriting half of app_server code, and is also a bit simpler and faster than what I tried to do first. I wrote a test application and some boilerplate code, then Stippi jumped in and implemented the missing bits. There are still some missing features like the ability to stack multiple clippings using PushState/PopState, and some problems when scaling and translating the view, as expected. We also met a drawing glitch when moving or resizing the window, however, we're not sure what's happening yet.

With Haiku switched to gcc4.8, I tried updating our WebKit to a newer version again. But, this doesn't work yet, and it seems the problem is a missing option in our gcc configure script invocation. I wanted to rebuilt gcc with the proper options, but I hit some filesystem corruption on my data partition. I'm now trying to backup everything, but a bug in Haiku makes this incredibly slow. Of course, I paused my contract since wednesday, and until I can get this issue sorted out and resume working. No data was lost, but touching some files on that partition triggers a KDL. So, it's time I reformat it and put the data back on it.

As a result of these FS problems, I haven't got much work done this week. So, this report is short.