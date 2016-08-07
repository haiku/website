+++
type = "blog"
author = "antifinidictor"
title = "GSOC 2011: Final Milestone Report"
date = "2011-08-22T16:13:26.000Z"
tags = ["gsoc2011", "final milestone report", "milestone report", "final report"]
+++

Hello all,

GSOC 2011 is over, and the SDL 1.3 for Haiku is over- for now.
I intend to continue working on the project, although I probably won't start again for a while, as the recent errors have been frustrating and I need to relax a bit.

The almost-most-recent-version is available at https://bitbucket.org/antifinidictor/haiku-sdl-1.3/; I had some problems with my computer and haven't been able to upload the most recent version yet, which just has some changes to which functions are static and which aren't.

Problems with the current version that I have been unable to solve:
(1) Window resizing is generating SEGFAULTs again.  It hadn't been for a long time, but recently started up again.  Since I don't have any regression tests, I am not sure when this error reappeared (sometime since I started working on fullscreen errors).  OpenGL windows can be resized all they want.
(2) Switching to and from fullscreen (both in OpenGL and not) cause the application to somehow lose keyboard focus, or something; it remains permanently on top of all other windows, but usually doesn't respond to shortcuts.  This error, to my knowledge is somewhat sporadic, and occurs most frequently with OpenGL.
(3) You cannot start normal applications in fullscreen mode (OpenGL usually works, but sometimes it doesn't).  When you do, the video mode changes, and the window takes up the entire screen, but the screen is entirely white.  The window responds to normal keyboard commands.
Otherwise, to my knowledge, SDL 1.3 video works for Haiku.  I'll add more errors as I remember them.

I would like to thank the Haiku community for supporting GSOC 2011 projects.  This was by far the most interesting work I've done to date, and I look forward to working with Haiku in the future!
