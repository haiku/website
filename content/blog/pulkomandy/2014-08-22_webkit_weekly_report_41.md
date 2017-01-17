+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #41"
date = "2014-08-22T07:09:25.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello there!

During the last two weeks, I spent most of my time working on the WebKit2 port. As I already mentioned, WebKit2 is where current WebKit development happens, and the most important change is the split of the WebKit system into two processes, one for showing the window, and one for doing the actual work of rendering the pages. But the more interesting thing is the more up to date and full-featured API that lets WebKit handle, for example, HTTPS certificates, so we don't have to do it ourselves - just show the dialog to the user when told to.
<!--more-->
So, this week I fixed all the compilation problems and finally got the WebProcess (the process that does network and page rendering stuff) and WebKitTestRunner (the testsuite runner for WebKit2) to compile. Most of the implementation is still stubbed out however, and the WebProcess will crash quite early in execution.

The next step is defining the API for WebKit2, which will be a bit different from the existing WebKit one. I'm starting, of course, with the BWebView class.

The WebKit1 API is still available and working, and my effort to complete the initial TestExpectations file for the test suite continues. I'm also keeping stuff up to date with current WebKit sources.

Besides the boring work on WebKit, I also worked on SerialConnect which got some drawing bugs fixed, and a scrollback buffer. Now that we have a libusb port and less bugs in our USB stack thanks to Akshay's great work during GSoC, Haiku is starting to be a usable platform for embedded device development. More to the point, I can now communicate with my mk802II - an ARM based PC-on-a-stick, and I'm now working on getting the ARM build of Haiku booting a bit further after dnivra got it to boot far enough to KDL (another GSoC achievement). Ithamar is also hacking on the ARM side of things, so expect some progress on that side during the coming months.

Well, that's all for these two weeks. I should mention that I've also been quite busy with other customers, which explains the reduced progress on Haiku last week from my side (and the lack of report).

And that closes the report for these two weeks. See you next Friday!