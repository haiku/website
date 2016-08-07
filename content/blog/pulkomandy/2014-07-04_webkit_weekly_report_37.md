+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #37"
date = "2014-07-04T10:47:27.000Z"
tags = ["WebKit", "contract work"]
+++

Hello there!

Few things to mention this week.

The 1.4.1 version of HaikuWebkit with the new drawing code is available in the nightlies. While it seems to work better in many cases, there will likely be a few regressions, please give it a test run and report any rendering problem you get.

With this released, I started the work on getting WebKit2 to build. Following the advise from one of the webkit-gtk developers in last week update comments, I'm starting with a port that will use UNIX Domain Sockets. Once that compiles, and I have studied the code a bit more, I will have a try at switching to BMessages. I noticed that the Apple ports are not using domain sockets but a darwin/XNU-specific IPC, so I think the same should be possible for us. The IPC is only one of the many small changes, fixes and cleanups we will have to work on for WebKit2 to compile. And then there's the work needed to also get it to run in an useful way.

Finally, I will be at the RMLL (http://2014.rmll.info) with mmu_man and oco next week, showing Haiku to all the people gathering there. This means there will probably be little time for coding on the WebKit port, but maybe we'll meet people from other projects and help them port their code to Haiku.