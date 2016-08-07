+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #14"
date = "2014-01-10T08:34:46.000Z"
tags = ["WebKit", "webpositive", "contract", "contract work"]
+++

Hello there,

Well, somehow quiet and regular activty this week. Not too much exciting things, but progress is being made.

I updated WebKit to early december version. This is not the latest one, but the guys at WebKit started using even more C++11 as Visual Studio on Windows finally gets more support for it. So, enter std::chrono and some std::thread stuff. Unfortunately, our version of gcc4 seems to be missing some of these. I'm now closely watching the work of korli and mt to bring us gcc4.8.

I made some long overdue cleanup to the build system, removing some manual (and undocumented) steps and fixing some bugs in the process. The about box will now report the proper WebKit version, once again using the standard CMake scripts to get it, instead of a custom shell script. Moreover, this seems to have fixed Google detecting us as a mobile browser. Some other websites still show that problem, however.

The work on completing the testsuite expectations continues. The progress is slow, as reviewing each of the tests, and looking for possible solutions before marking them all as failing is a very time consuming process. It is also a bit boring and unrewarding, so I'm also spending some time looking at some other things.

I attemted to fix the lockup issue. If you use Web+ you probably have noticed that it oftens becomes unresponsive and seems frozen for a minute or so. I now know what's happening: this triggers when you try to navigate away from a page thet's still loading, or performing an XmlHttpRequest or some other kind of network activity. If the socket is blocked on a connect() call, we have no way to unlock it from there. What WebKit does is it tries to close the connection, and the way it's implemented in our HTTP backend, we have to wait for the network activity to stop, before we can free the connection object. If we free the object without waiting for the thread to terminate first, the thread will crash when the connect call finally times out.

There is a well-known trick to avoid this issue, making the connect non-blocking, and then using select or poll to wait on it. Unfortunately, the Haiku network stack has some bugs that prevent this from working. I'm not yet up to speed on that area of the Haiku code yet, but I'll try to improve the situation.

On the rendering side, I'm also hitting various limitations of the BView API. First of all, the latest build I uploaded last week introduced two new rendering glitches, but fortunately I could get them fixed without reintroducing the box-shadow bug htat led to black rectangles drawing all over the place.

The missing bits in BView currently are support for transform matrices, which are used a lot for drawing SVG and maybe canvas elements ; and support for arbitrary clipping. I had a try at implementing the latter using ClipToPicture, but this lacks antialiasing and is implemented in a suboptimal way, leading to laggy scrolling. It also has problems with the way scrolling is implemented in WebKit, because the clipping is itself clipped (doh!) to the visible part of the view. So, when you try scrolling, it isn't updated and prevent things from drawing if they weren't already visible before scrolling.

I discussed these BView issues with Stippi and there is clearly no way to solve these issues without improving the BView API to add support for arbitrary transformations and clipping shapes. While the initial implementation of this shouldn't be too hard, there may be a few difficulties, for example with the way view coordinates are converted to window or screen ones. It may be a bit tricky to get this all working well.

There are other issues that can be solved only on the WebKit side, for example the history navigation problems. I'm not sure why this is happening, but sometimes, clicking on a link doesn't add it to the navigation history, making the next/previous buttons a bit unreliable to use.

Finally, there are a few known crashes that I'm still tracking. One of them happens when decoding big images or animatd gifs, another one when trying to attach a file to a mail on gmail, and one happens when trying to stop an https connection, and tends to be triggered easily when navigating gmail or github. I'll try to get these crashing issues fixed before I start playing with new features, so we can at least have a stable version of WebKit to do some web browsing, even if some features are still missing.