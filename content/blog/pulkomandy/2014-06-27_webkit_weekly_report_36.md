+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #36"
date = "2014-06-27T07:37:47.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello everyone,

Things are rather quiet on the WebKit side this week. I'm reviewing and fixing the remaining bugs with the new drawing code, which is now working rather well. On the WebKit side, I have implemented a limited form of transform support for regions (only handling translation and scaling, not shear and rotations), which has very good results. As a consequence, we now have mostly correct drawing and quite good performance. Before I do a release (I know the version in current nightlies is quite outdated now), I want to fix one more bug, which is the lack of video display on youtube. This is probably a simple fix once I understand why the current code isn't working anymore.

<!--more-->

I also did several small fixes to WebPositive, on minor details, but which should improve the experience a lot. Removing a finished download doesn't trigger an error notification, the URL in the address bar is properly formatted, and some other small bugs like this were fixed.

As I said last week, once I release this new version of WebKit I will move on to getting WebKit2 to compile and run on Haiku. The WebKit2 API is where all the fun is happening in WebKit these days, and it provides a somewhat more standard interface between WebKit and application.

I read a bit about the design, and the current implementations use UNIX Domain sockets and X Surfaces for communication between the web and UI processes. The Haiku port will probably make use of BMessages and shared BBitmaps instead.

This separation is good news for us, as it will allow the embedding of BWebView into a standard BWindow. The current port needs a BWebWindow to manage the interfacing of views with the single WebKit engine running all of them. It will also considerably unload the main BApplication thread by moving all of WebKit to a different process. This will lead to much easier and cleaner integration of BWebView in existing applications, and will also make it much simpler to provide a BWebView API that is abstracted from WebKit internals, meaning it will be easier to turn it in a stable API, which can then be made public. I hope we will then see 3rd-party web browsers making use of this API to provide more functionality than Web+, which I think can remain the simple default browser.