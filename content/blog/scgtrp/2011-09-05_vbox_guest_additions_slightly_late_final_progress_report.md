+++
type = "blog"
author = "scgtrp"
title = "VBox Guest Additions: A slightly late final progress report"
date = "2011-09-05T18:33:27.000Z"
tags = ["virtualbox", "gsoc2011"]
+++

As everyone has probably gathered from the first sentence of most of the other posts, GSoC 2011 is now over. I accomplished some of the goals I had for the last quarter, but was unable to get GCC2 support to work. The compiler is different enough to not work with the same options, and even after adding a GCC2 tool definition to kBuild I found that it was too old to compile some of the VirtualBox code. Various workarounds I tried for this proved unhelpful, so the additions will currently only compile and run on a GCC4 or GCC4 hybrid Haiku.

On a more positive note, there is now an (unaccelerated) video driver for VirtualBox which supports screen resizing. 2D acceleration would be possible, but would require changes to app_server (reporting changed areas of the screen to accelerants) that would not have fit in my timeline. I do plan to implement this eventually.

Also, a few people requested the ability to remove VBoxTray from the right-click menu on the replicant, so this is now possible.

While I do plan to continue working with Haiku, I currently am taking a break due to classes having just started.