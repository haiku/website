+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #34"
date = "2014-06-06T06:53:28.000Z"
tags = ["WebKit", "webpositive", "app_server", "unit testing", "contract work"]
+++

Hello there,

<h3>app_server optimizations</h3>

Work on WebKit continued this week. In the previous report, I mentioned several issues with the new tiled rendering. Most of them turned out to be either problems in app_server or misuse of the APIs in the WebKit code. The most important part was that WebKit used region clipping and expected the region to be transformed when using SetTransform; however, with the current design, region clipping isn't affected by the view transform.

<!--more-->

The solution was to replace the region clipping by picture clipping, using FillRegion to prepare the picture. Now the region can be sheared and rotated at will, and things will continue working properly. However, the picture clipping is too slow, and when region clipping is removed, it is always applied to the whole view. Picture clipping is currently implemented by rendering the picture to an offscreen bitmap, then extracting the alpha channel for this to use it as an agg alpha mask. There are two ways to improve this.

First, we could detect the rectangle that the picture actually covers, and keep only the part of the mask that is inside that rectangle. Anything outside that region is known to be fully transparent and could be ignored when drawing. When using ClipToPicture to draw only a small area in a big view (as is often the case with the 4096x4096 tiles used in WebKit), this would avoid allocating a huge bitmap, and allow to work only on a smaller one and with a smaller part of the view.

There is another improvement possible: instead of using a bitmap for the mask, we could use agg rle-packed scanlines. This is a format specific to agg that represents a rasterized image in a compact format. For each line, it stores data such as "2000 fully transparent pixels, 1 pixel with alpha 128, 250 fully opaque pixels". Not only this save a lot of memory, it also allows agg to optimize drawing, as instead of computing the alpha blending for each pixel, it can switch between "fully opaque", "fully transparent" and "blending" mode for the different parts of the drawing. The fully transparent drawing is much faster (it just needs to do... nothing) and avoids testing each of the mask pixels one by one. The fully opaque mode still has to draw something, but it doesn't need to compute the alpha channel value and can use the source image directly. This leaves the slower alpha blending used only for edges of the clipping region, and only when they aren't perfectly pixel-aligned.

So, I released WebKit 1.3.2 and made a Haikuporter recipe, but I think it's better to not upload it to the repos until these app_server optimizations have been done.

<h3>Testing and network code debug</h3>

This week however, most of my work was done on testing (and fixing bugs!) for the network kit. There are several ways to do that, so here is an overview of what I did.

The first thing is writing unit tests for Haiku. We have a framework for this dating back to when Haiku was still using CVS. unfortunately, the tests are not run often enough, we should probably automate that. Anyways, the few tests we have for the service kit code were not using this framework. I converted the tests for BUrl to use it, and completed them with tests borrowed from some existing URL parser test suites available on the internet. This allowed us to catch several bugs in the BUrl implementation.

I continued this with writing tests for BNetworkCookie and BNetworkCookieJar. I currently have one test which does not pass, but others were unable to reproduce the issue. It may be related to locale or timezone settings as it is an issue with date parsing.

I will continue writing tests for the services kit API. When we started using it in HaikuDepot, it became clear that the current design (which was tailored for use in WebKit) is not the best for other Haiku apps, mainly because of different needs regarding threading. Having some tests will allow refactoring the code and checking that it still behaves as expected afterwards. If the refactoring goes well, it should help increase network performance, which isn't very good right now.

While I was into testing stuff, I also reviewed existing testsuites to see if they could be of any use to us. First of all, there is the Open POSIX test suite. As the name suggests, this tests various bits of the POSIX API and checks for POSIX compliance. This was already ported to Haiku by Ingo Weinhold as it was used for his work on POSIX signal handling. It already identified many issues in Haiku, but we also found that the testsuite itself had some bugs. This led to a fork of the testsuite and various fixes implemented on our side. Unfortunately, the Open POSIX test suite is not maintained as a standalone project anymore. It is now part of the Linux Test Project, which is Linux specific, and unsurprisingly doesn't compile on Haiku. However, I could get the updates done to the test suite from LTP and started merging that with our changes. It would be nice to revive this test suite, maybe with help from some of the *BSD projects. Currently, the testsuite fails several tests, and ends up in a KDL. We should probably fix this.

The Open Group, which writes the POSIX specifications, also has a test suite. They have a free licence (for one year) for open source projects which we could make use of. There is also an open source version of some parts of the test suite designed for the Linux Standard Base project. It may be possible to get this running on Haiku, but it's not as simple as the Open POSIX testsuite. So I left this aside until we get that first one passing. It's interesting to know that this testsuite tests both the C API, and also the shell interface and command line tools.

I also updated our netperf recipe, and this runs fine. Netperf is a tool for testing network performance.

I updated the recipe for libmicro, which was developed by the Solaris project. libmicro is a benchmark for the POSIX APIs, originally developed to compare Solaris and Linux performances. While I got it to compile, the 3rd test deadlocks on Haiku, so the results aren't very conclusive.

I also had a look at the tests from the NetBSD source tree. Some of this could be relevant to us, but unfortunately they are not easy to run outside of a NetBSD system, so I'm going to skip this for now.

Finally, I plan to have a look at the iknowthis system call fuzzer. A fuzzer is a tool that calls functions with random input to see what happens. The idea is that the system should not KDL. Most fuzzers are specific to a kernel, often Linux, as they call the syscall() function directly. It looks like iknowthis is the only one that fuzzes the POSIX APIs instead, which would make it easy to run it on Haiku. It is very likely to break the system in no time, and in several strange ways.

Some of this is probably a bit out of the strictly webkit scope, but a more stable OS also means a more stable browser. I will now focus on writing unit tests for the network kit in particular, but it would be nice if someone else picked up the open posix testsuite and tried to improve our score.

See you next week!