+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #30"
date = "2014-05-02T06:51:19.000Z"
tags = ["webpositive", "WebKit", "contract work"]
+++

Hello everyone,

Not so much exciting things this week...

Well, good news first, on wednesday I uploaded HaikuWebkit 1.3.1 packages. It should be more stable than the previous releases, and includes work from the last 3 weeks including some more bugfixes for audio/video support, working web socket support, and many smaller fixes.
<!--more-->
As usual, the boring work on the testsuite continues, and I'm slowly processing the test results and investigating each failure.

The main problems I'm trying to solve currently are the slow rendering on some pages, the annoying flickering, and in some cases even missing parts of the drawing. I'm trying to change the way we handle our rendering, as there are different code paths in WebKit, and each port can use a different one. The settings we have seems to make anything that use 3d transforms invisible. Unfortunately, some websites try to use 3d transforms (actually, a transformation that does nothing) to trick the browser into using OpenGL to accelerate rendering of the page. This doesn't work too well for us. We have the choice of implementing these 3D transforms using app_server (and even implementing them to do nothing may be enough in most cases), but I haven't managed to get this to work yet.

I'm also working on improving our support for CSS gradients. They are used in many ways on some websites, which led to identifying some quirks of our own BGradient API. I'll be fixing those, as well.

Next up is shadow support, as we are completely ignoring them currently. While this doesn't create any big useability problems, most websites actually don't render as intended.