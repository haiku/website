+++
type = "blog"
author = "antifinidictor"
title = "GSOC 2011: Midterm Milestone Report"
date = "2011-07-15T02:56:52.000Z"
tags = ["milestone report", "gsoc2011", "SDL", "SDL 1.3", "midterm"]
+++

So far:
SDL 1.3 officially compiles.
Whether it works is another story.

I've created 7 patches so far, four of which were created in logical pairs, one of which was completely useless.  The 7th patch (SDL-1-3_patch06.diff) was sent out to the haiku-gsoc mailing list today, and should allow the code to compile.  Note that not all functionality is implemented in the video code.

I've also started working on creating a Google code project to host my repository; this will make it easier to follow my progress if I succeed.  So far I have had trouble pushing my repository to the project site; it's a lot of information, and takes about five hours.  I've tried twice and it failed both times, although the failure may have been due to other things running; I'll have to try again tonight.

I finally managed to find a machine that works with both Haiku's graphics and internet drivers, and am moving my project onto this machine.  This probably won't affect my workflow too much, but it will increase the number of updates I can make.

Future:
I will implement the more important video functionality missing in the current compiling version over the next couple of weeks, as well as review the code I have for any obvious bugs.  By the next milestone report I will have, at the very least, a simple test that creates and destroys blank windows.

At any rate, I think I've made some good progress, and I hope I will continue to do so over the remaining weeks of the project.