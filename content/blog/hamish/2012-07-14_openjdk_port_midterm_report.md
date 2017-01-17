+++
type = "blog"
author = "hamish"
title = "OpenJDK port: midterm report"
date = "2012-07-14T23:47:17.000Z"
tags = ["gsoc", "gsoc2012", "OpenJDK"]
+++

After my quarter term report I worked on various bugs in the AWT port reported by testers, such as keyboard input problems. I also began reading up on the media kit in preparation for the next part of my project: the jsound port. This will bring audio and MIDI functionality to the OpenJDK port. Over the last week I made a start on the implementation for PCM input/output.
<!--more-->
Additionally, since my last report I was given commit access at the official Haiku port project over at the OpenJDK project: http://openjdk.java.net/projects/haiku-port/. This is great as it will provide a more central place for collaboration and possibly attract more developers to the project. I have started merging my work into the repositories there.

Finally, as promised last time, I have built a new set of binaries with the latest revision of the AWT port, which is in quite a stable state: http://dl.dropbox.com/u/61946213/j2sdk-july-r2.tar.xz. The archive is about 160MB extracted. Any bug reports are much appreciated and should be sent to me via my contact form on this site.