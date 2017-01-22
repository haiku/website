+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #23"
date = "2014-03-13T15:04:09.000Z"
tags = ["WebKit", "app_server", "contract work"]
+++

Hello everyone!

The report is a bit early this week, because I will not be available tomorrow (in case you wonder, I will be at the <a href="http://forever-party.net">Forever Party</a>). So, here it is.

<!--more-->

This week I continued the work on bug fixes. Last week I had already fixed most of the issues introduced in the previous release, but there were some more things I wanted to clean up before doing another release. First of all, I merged the latest version of WebKit (again). No surprises here, this comes with the usual set of fixes, optimizations and cleanups. I find it much easier to track these releases as they are made, because this way I can review the changes and when I get a new bug, it's possible to look at the git log and find the change that triggered it. If I let WebKit do too much progress at once, merging a huge number of commits at once, it's much harder to track the problems. Things are getting more stable on WebKit side, however. The GTK port is about to join the EFL one (and ours) on using the CMake build system, removing the autotools-based one. This means the CMake build files will be used by one more platform, and kept up to date by more people. One less thing to worry about.

The new release will happen today, it is building as I write this blog post. My goal for this release was to fix as much issues as possible to get a "stable" release. This is because I plan to start work on a big item on the TODO list next, yes, you guessed, HTML5 Audio/Video support! Finally!

So, I took some time to more carefully study the remaining bugs I had set aside because I was not sure how to fix them. As I told last week, I identified the problem with border bleeding. It happened because we didn't implement polygon filling rules properly. There are two common filling rules, "non-zero" and "even/odd", and app_server only implemented one of them. So, I added a new SetFillRule method to BView, allowing both winding rules to be used. Besides the border bleeding bug, this is also used in some other places in WebKit, so for example the remaining black boxes showing when box-shadow was used are finally gone. This was the cause for most of the remaining drawing problems we had, so now everything renders cleanly. The rendering can still be improved, of course, for example we still don't have box-shadows, but we get something that is at least readable, and works as well as before I started the work on WebKit.

But this is not all: I also identified a problem with CSS gradients when used as background images. When translating the view (using BView::SetOrigin()), Haiku (like BeOS) translates all future drawing operations, but also the current clipping region. WebKit doesn't expect the clipping region to be moved. There is no easy way to fix that, so for this release I have modified WebKit gradient drawing code to match our behavior. I added this to the FIXME list...

I also fixed an issue wih "complex" text rendering, where I used glyph indices given by WebKit as byte indices in an UTF-8 string. This works for ASCII text, and thus, most english pages, but while surfing on some French pages, I noticed some characters were missing from the strings. This was easily fixed and the new code is even simpler than the old buggy one.

I mentionned earlier that stippi had implemented affine transformations suport in BView. Well, I hadn't plugged this in the WebKit drawing code. It is done now, and it's possible to rotate and distort objects in CSS.

On the "not webkit" side, I have been helping our GSoC candidates to get started. One of them is trying to implement web socket support in WebKit (as his required patch submission for the selection process), and another is getting ready to work on the ARM port of Haiku. This promises an interesting summer, but we're still waiting for the students to submit their final proposals. I have also uploaded packages of Qt and Qupzilla to the Haiku repository, which means if Web+ fails on something, you will get another browser to try with. These packages were provided by Arfonzo, who wrote recipes for them, so it will be not too hard to keep those up to date.

Finally, I wanted to let everyone know that I am not currently working full-time for Haiku. As you know, the donations are still not enough to secure a long-term full-time contract. As I don't want this to happen, I'm working some hours each week for another company, so the progress on Haiku and Web+ may be slightly slower. But, this means I'm getting less money from Haiku each month, hopefully allowing me to continue to work at least part-time for a longer time. And when donation income allows for it again, I will be able to resume working full-time. If I don't do this, and money at Haiku runs out, I will have to get a regular full-time job again, making it difficult to resume working on Haiku later on. I just wanted this to be clear, and call everyone for donations to keep this running.