+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #10"
date = "2013-12-06T08:24:15.000Z"
tags = ["contract", "WebKit", "webpositive", "contract work"]
+++

Hello world!
You may have heard I'm in for another month!

So, this week I made some more progress with the testsuite system. The major improvements are finished support for the image comparison system I was talking about in last week report. The DumpRenderTree tool now dumps a PNG image of the webpage (this was quite easy to do thanks to the offscreen BView to BBitmap rendering and the translation kit) when requested (not all tests use the feature). Then, another tool called ImageDiff reads two images, and computes the difference. If the difference is big enough, it generates a new image highlighting areas that don't match.

I had to re-add the x86 translators to the x86_gcc2hybrid build so I could make use of them in the gcc4-only WebKit. Fortunately this wasn't too hard either, with just some jamfile tweaks required to make it work again.

The other thing I worked on on DRT side is support for saving crash reports. The problem is, several tests are crashing the DumpRenderTree tool. Without further handling, this results on the testsuite waiting on the debug_server alert asking wether to save a debug report, kill the team, or open Debugger. It is quite annoying to click "kill" an hundred of times as the testsuite runs. So, I'm now catching the signals (SIGSEGV and SIGABRT) from DRT, and from the signal handler I ask Debugger to save a crash report for the current thread. I also modified the python side of the testsuite so it reads reads these reports and move them to the right place. They are now stored with the test results, renamed to the name of the test that made things crash. This is quite useful to see what happened, and execute the crashing tests manually. There's still one problem: Debugger will currently not save any stacktrace, because it does that only for stopped/crashed threads. And since I'm catching the signals, the threads aren't in stopped state anymore when using this trick.

With these fixes out of the way, we're now passing over 52% of the tests. This may look quite bad at first but there are several factors to this, other than failing tests. Most of these come from features that we don't implement yet, such as WebGL, video and audio support, accessibility, battery status (yes, there is a javascript API allowing webpages to query that), web notifications, and so on. There are also a few minor problems like off-by-one size errors that make a lot of the CSS tests fail. And there are strage things like some colors not matching what was requested (a 0,255,0 green gets drawn as 0,254,0 for some reason, making most of the canvas test fail).

The next part of the process is reviewing these results and completing the TestExpectation file. This involves saying things like 'yes, we expect "battery status" tests to fail'. And there are some more fine-grained indications, either "we don't plan to implement it" or "here's the bug in our bugtracker". The testsuite tool can then notify people that some tests passed when they shouldn't have (meaning a bug got fixed somewhere), or on the reverse, some test doesn't pass anymore (so something was broken by your changes). People can update the TestExpectations in the first case, or fix the problems in the second one. There is also a way to tell that we expect some tests to crash the test engine, or to skip them altogether (I use this to skip the one test that crashes app_server).

While reviewing the test results, I also catched and fixed one bug in our WebKit drawing code. This was a corner case of canvas drawing functions, probably not very important, but it would have not been easy to catch without the testsuite. This set of simple pages focusing on a single feature at a time are great to hint you as to where to look for problems.

So, on to analysing the results and maybe fixing some more issues.


On a more interesting note, I finished the support for data: URIs, and added cookie storage for file:// ones. I will provide updated haikuwebkit packages next week including these changes and fixing the easy-to-trigger crashes in the current Web+.