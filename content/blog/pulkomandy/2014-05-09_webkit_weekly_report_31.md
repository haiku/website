+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #31"
date = "2014-05-09T06:22:16.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello everyone.

Well, just got confirmation from Haiku, Inc. that I can continue working on this during May. Thanks to everyone who donated money to Haiku, Inc. for making this possible!

As mentioned last week, I'm working on fixing the flickering and missing rendering on some pages. I didn't get very good results yet, but I can at least give you an overview of the different ways WebKit can render things on screen.
<!--more-->
If you have followed the porting since the very early days, you already know that all the drawing has to happen in the main thread, where all the application runs, and not in the view thread. On Haiku, we accomplish this by drawing to an offscreen bitmap. The window thread then just copies parts of that bitmap on the screen.

Things have changed a bit over time to make things go faster, and be more easily hardware accelerated. The first change (developed for iOS) is the use of a tiled backing store. This is similar to our offscreen bitmap, but instead of a single bitmap, a lot of smaller tiles (usually 256x256 pixels) are used. The idea on iOS is to use these as GPU textures. Once a tile is rendered, there should be no need to modify it ; for example when scrolling the page, instead the tile can be moved on the screen. The GPU can keep tiles in memory as long as there is free space, allowing very fast scrolling without the need to redraw anything.

Without acceleration, the tiles aren't so helpful. Drawing small parts of the page on different tiles is slower than drawing the whole page on a single bitmap. 

The other change is the introduction of the texture mapper. This is used to speed up the drawing of objects that can move on the screen. In the drawing code we have, there is no buffering for this, which means when something moves on the screen (using CSS animation, for example), it has to be redrawn at each frame. This can be very slow if the moving object is a complex div with lots of contents. With the texture mapper, the object is rendered once to a "texture", and then the texture is copied (possibly with effects such as transformations or opacity) on the parent layer (which may be the root view, or another texture, which will itself be blitted later on).

This was developed with the idea that OpenGL can handle the blitting part, however a software rendered version is also available.

Why is that relevant? The texture mapper is a good way to handle the 3D transforms: you draw everything in the texture, then distort the texture bitmap according to the 3d transform. This means only one operation needs to be 3D (the texture blitting), instead of all the drawing operations. The texture mapper is now used by all other ports, so it's time for us to catch up and make use of it as well.

I have started experimenting with this (as well as the tiled backing store, but I will probably not make use of it), but I don't have results to show yet. I got things to compile, but trying to display a page will lead to a crash, apparently in an unrelated part of the code.

And that's all for this week. I hope to fix the crash and get things rendering at least as well as they were before. Then I can see if the texture mapper implementation will be enough to get these drawing problems fixed.