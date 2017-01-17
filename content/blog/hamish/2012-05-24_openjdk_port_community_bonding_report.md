+++
type = "blog"
author = "hamish"
title = "OpenJDK port: community bonding report"
date = "2012-05-24T20:09:44.000Z"
tags = ["OpenJDK", "gsoc2012", "gsoc", "gsoc gsoc2012 OpenJDK"]
+++

Over the community bonding period I've been researching the best approach to take for the AWT port, and over the past week or two I've been implementing a prototype.

AWT demands the implementation of a number of 'peers' for buttons, text boxes, etc. which have historically been implemented using the native widgets of the underlying platform. The time taken to implement and maintain these peers is quite large, especially considering that these AWT widgets have been superseded by Swing and are rarely used anymore.

An alternative implementation approach used by the <a href="http://openjdk.java.net/projects/caciocavallo/">Caciocavallo project</a> involves providing native heavyweights for the windows and views and then calling on Swing to provide drawing and event handling for the various widgets. This eases the porting of AWT and reduces the amount of platform-specific code to maintain. This approach is also taken by the recent port of OpenJDK to Mac OS X.

Over the past week or two I've written a prototype implementation using the Caciocavallo Swing AWT peers. It's very incomplete thus far, but I've got drawing working pretty reliably, as well as some event handling including mouse input. Screenshot below the fold.
<!--more-->
<div align="center">
<a href="http://dl.dropbox.com/u/61946213/awtshot.png">
<img src="http://dl.dropbox.com/u/61946213/awtshot.png" width="640px" height="480px" />
</a>
<p><em>A quick test frame using AWT</em></p>
</div>

In my introduction I also promised some binaries, which you can now get here: http://dl.dropbox.com/u/61946213/j2sdk-haiku.tar.xz.
You should be running at least hrev44069 if you want this to work properly. The whole thing weighs 140MB unpacked.