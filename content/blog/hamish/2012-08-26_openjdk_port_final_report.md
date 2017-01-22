+++
type = "blog"
author = "hamish"
title = "OpenJDK port: final report"
date = "2012-08-26T23:43:25.000Z"
tags = ["gsoc", "gsoc2012", "OpenJDK"]
+++

Since my three-quarter term report I've been working on adding audio input support to the jsound port and fixing various bugs in the JDK. Since the AWT/Java2d and jsound ports are now completed, my goals for the summer have been accomplished! The OpenJDK port is now in a fairly usable state, and community members have been using it to run some large scale Swing apps such as NetBeans and ThinkFree office.

The next thing I would like to do is merge my work in to the Haiku port repository at the OpenJDK project. From there I'd like to look into the possibility of acquiring access to the Java TCK, which will allow for comprehensive testing of the port. This will no doubt uncover many bugs and keep me busy for a while. Here are some other possible areas of expansion for the future:

<!--more-->

<ul>
<li>An x86-64 Hotspot port to go along with our brand new x86-64 Haiku port.</li>
<li>A native Haiku look and feel for Swing.</li>
<li>Merge in updates from the jdk7u branch (the codebase of the Haiku port is more than a year old now).</li>
</ul>

Further development of the Haiku OpenJDK port will be going on here: http://openjdk.java.net/projects/haiku-port/. Anyone interested in contributing is more than welcome.

Finally, I would like to thank my mentor Andrew Bachmann, the Haiku developers, and the rest of the Haiku community for all their help and for all the bug reports. This has been a very rewarding and educational experience. :-)

Recent-ish binaries available <a href="http://dl.dropbox.com/u/61946213/j2sdk-august.tar.xz">here</a> - hrev44492 or newer required.