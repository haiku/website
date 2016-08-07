+++
type = "blog"
author = "antifinidictor"
title = "GSOC 2011: Three-Quarter Term Milestone Report"
date = "2011-08-05T21:17:11.000Z"
tags = ["gsoc2011", "milestone report", "three quarter term"]
+++

So far SDL 1.3 for Haiku has made significant progress.  Video draws correctly both with and without opengl, audio appears to already work, and various tests provided in the SDL test suite seem to work.  However, there are a few significant bugs I have come across.

The first error occurs when resizing the window.  The application occasionally receives the illegal operation signal or a SEGFAULT.  The illegal signal operations occurred when blitting from the backbuffer I allocated to the screenbuffer provided by BDirectWindow's DirectConnected() function.  Presumably this was caused by the window being resized in the middle of a draw operation, since this error only occurred after I moved blitting to a separate thread.  Before this, blitting was done in the application thread, and caused a slowdown of SDL's event handling by up to 1 second (moving around the mouse required redrawing the window).  I received several suggestions to fix this error, including move the blit code back to the application thread, use mutexes, and use BBitmaps.  I have since transferred drawing operations to a BBitmap object, which appears to have removed the illegal operation signal.  However, resizing the window continuously will result in the occasional SEGFAULT.  I only discovered this error today; I intend to investigate it further over the weekend.  So far I have noted that the SEGFAULT occurs in different places on different runs, although I have not officially found a connecting pattern.

The OpenGL implementation is incomplete, but works surprisingly well, thanks to BGLView.  There are problems with loading libraries, however;  for some reason, the flag indicating a library was successfully loaded is being set to false.  I will experiment with this error in the coming weeks, and hopefully resolve it.  OpenGL also has a resizing issue where any attempt to resize the window causes the program to freeze- without setting off any errors or signals in gdb.

In addition to fixing these errors, I intend to add functionality that I missed in the process of writing the video code.  For instance, many SDL flags passed to the window are not yet handled; currently only window resizing capability is used.

I intend to add to this list over the weekend, and possibly after the due date of this blog.

Note that the SDL repository I am editing is available at bitbucket.org (but I have not had access to internet this week up until today, and won't be able to upload the most recent changes until Sunday at the earliest): https://bitbucket.org/antifinidictor/haiku-sdl-1.3/

