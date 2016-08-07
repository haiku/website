+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #19"
date = "2014-02-14T07:37:36.000Z"
tags = ["contract work", "WebKit", "webpositive", "Services Kit", "serviceskit"]
+++

Hello everyone!

This week I worked on stabilization and small improvements of WebKit. There are a few new features, as well.

The crash with cursors I mentionned last week is fixed. I had forgotten to copy an object in the copy constructor, leading to a double delete. I continued working on the clipping code, and fixed the issues with www.haiku-os.org and a few other websites. But, I can't get it to work with haikuports, Trac, and now gmail is also broken. I don't want to do a release until we have a fix for that.

I also did some more work on supporting css shadows. With the updated clipping code, the ugly black box that was sometimes visible is now gone (it's clipped out). However, we also must draw the shadow itself. I did most of the implementation on WebKit side, but it needs support for a drawing mode (SourceIn) that app_server doesn't handle yet. So, I left that disabled for now, until we can get it to render the expected way.

An easy fix was adding the support for HTML5 "file" API. I just had to turn a compile flag on, and this gives us 10 more points on html5test.com. It also gets imgur.com image upload working.

I merged some changes from WebKit, without much problems. This brings the usual small fixes and cleanup, without too much code breakage this time. There are a lot of code cleanups going on at WebKit, making the codebase simpler and also faster.

I also did some work on the Network Kit HTTP backend. We now support gzip/deflate compression of HTTP data. This make some web pages load much faster, and also fixes issues with some websites serving compressed data even though the browser doesn't advertise support for it. While working on this, another problem in the HTTP code was discovered, there was a possible stack overflow because we were using a gcc extension to C++. This is now fixed, hopefully improving stability of the web browser.

With all those small issues fixed, it's time for another testsuite run. I hope I can find some test that fail because of our remaining clipping problems, as this would help me identify the issues more easily than with a complex web page such as gmail. I'd really like to squash at least the new issues introduced by this clipping change, so we can have a release that I'd qualify as stable. I'm trying to not start work on too much other features until we get this sorted out. Once that release is done, we can resume way on features that need more changes.

Next up on the TODO list: support for affine transformations (stippi added this to the app_server), which will improve SVG rendering a lot and possibly fix some other issues. Support for shadows, and the missing SourceIn composite drawing mode. When we get these two out, we should have much better rendering. There are probably other missing features, but they are yet to be identified.

See you next week!