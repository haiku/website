+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #9"
date = "2013-11-29T09:26:45.000Z"
tags = ["WebKit", "contract", "Services Kit", "contract work"]
+++

Hello world!

This week I got the testsuite running. The fixed build of gcc I was talking about last week worked, and I can now link a working DumpRenderTree executable. The first test run wasn't very good, with DRT crashing quite often, some javascript alerts popping on my screen, and ended after running about 9000 tests in an app_server freeze.

I'm adding some of the missing features to DumpRenderTree: alerts are now dumped to the standard output like other ports do, so they can be compared as part of the testing process. I skipped the test that crashes app_server (the testsuite system has support for skipping tests, and a few other things). I also did some smaller changes like setting the default font size to 16px for the tests (the browser still defaults to 14px, which is a bit unusual, but nothing in the css spec enforces a default size of 16px) ; and changing the JS console messages format for DRT so they match other ports (the main change is to not include the file name in the message, this way the test gives the same result if run from a different directory).

I'm now working on support for PNG dump of web pages in DRT. Some tests are testing things that aren't easily seen in a text dump, such as CSS gradients. To test this, there are two systems used in WebKit testsuite: the first one is comparing the rendering with a reference PNG. This works well, but there are often minor changes to the rendering, making it hard to keep the test result up to date with the browser. The PNG files are also often platform specific, due to different antialiasing or drawing algorithms, font rasterizers, and the like. So, a better system called "reftests" is used. The idea is the same, but instead of comparing with a fixed PNG image, DRT generate PNGs of two different pages, and checks that they render exactly the same. When there are two ways of rendering the same thing, this works, and follows the browser changes automatically.

Our results are currently not very good, with a lot of failing tests. I expect the support for pixel-tests and reftests to improve this a bit. Note that the goal isn't to reach 100% success: none of the other platforms do that. Instead, there is a "TestExpectations" file which tells which test should fail or succeed. The actual results are compared with the file. When fixing a bug, you can then easily verify that you don't introduce new test failures, and possibly that you make existing tests pass when they failed before.

The WebKit project requires each commit to either introduce a new test, or fix an existing one, unless youhave very good reasons (sometimes it isn't possible to test something, or the test would take too long to run).

In order to run the complete testsuite, I will also need a running HTTP server. The current scripts support either lighttpd or apache. One option is porting one of these, the other is modifying the scripts to accept something else, such as PoorMan or Cherokee, for which we already have an Haikuports recipe.

With the testsuite running, we will now have a way to check that future work on our WebKit port don't break things that were already working, like it happened with the version bundled in current nightlies - I bet you noticed the crashes.


I didn't work only on the testsuite, and also did some small improvements on the network layer. I'm adding support for data: URIs, and improving the MIME type identification system, which is currently restricted to HTTP. I also started looking at support for gzip compression of HTTP data. This is suppoed to be optional, but some websites actually require it. It shouldn't be too hard to implement and could bring us an even faster browsing experience, anyway.