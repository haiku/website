+++
type = "blog"
author = "andrej_spielmann"
title = "Sub-pixel antialiasing report #2 [GSoC]"
date = "2008-07-23T19:00:30.000Z"
tags = ["gsoc", "sub-pixel", "antialiasing"]
+++

Another few weeks have passed since my last update, so here is another short report on the status of my project.
I hope everyone is enjoying the results of my work that have already been integrated into the main source trunk. Now I am pleased to announce that also the second part of my project is almost finished.
<!--more-->
Sub-pixel antialiasing can now be used for all vector-graphics in Haiku. This includes not only most geometric shapes in the system, but also transformed (rotated, skewed…) and hinted text. For colour filtering, Stephan’s averaging method is used and the user can adjust the ratio between the weight of sub-pixel values and average values. If the last sentence doesn’t seem to make much sense to you, see this mailing list thread for details about the filtering method:

https://www.freelists.org/archives/haiku-development/07-2008/msg00093.html

The next thing I’m going to do is add the controls for sub-pixel antialiasing into the Appearance preferences applet (and thus remove them from the Fonts applet again). I have already done this partially, but my mentor Stephan thinks (and I do as well) that it would be better to rewrite the Appearance preflet completely and integrate a few other existing preflets into it. I’m not quite sure how much of this work he expects I will do myself, but I hope that I will have enough time to do most of it.

Finally, have a look at some pictures of my work in action. The left one is grayscale antialiasing and the right one is sub-pixel antialiasing. I’m giving out a free pint of beer to anyone who says they see a difference :-D

<a href=http://www.stankaa.com/files/grayscale2.png><img src=http://www.stankaa.com/files/grayscale2.png width="320" /> </a><a href=http://www.stankaa.com/files/subpixel2.png><img src=http://www.stankaa.com/files/subpixel2.png width="320" /></a>