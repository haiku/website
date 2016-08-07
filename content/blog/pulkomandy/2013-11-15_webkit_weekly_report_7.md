+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #7"
date = "2013-11-15T08:39:56.000Z"
tags = ["WebKit", "webpositive", "contract", "Services Kit", "contract work"]
+++

Hello world!

This week I reached a major milestone in my work, as I'm done merging all WebKit commits all the way to november 2013. HaikuLauncher is still running fine, and I will make the small required changes in WebPositive so it works fine again. Expect an updated WebPositive in trunk very soon now.

This week merges were as boring as the previous week ones: addition of the NiX port, removal of the Qt one (next version of Qt will go with Blink), replacement of a lot of never-null pointers to use references instead, rename of the KURL class to URL, and some API changes. WebKit has started using some C++11 features to help with cleaner and faster code.

I've also started looking at the test system. WebKit uses a tool called DumpRenderTree that will produce a text representation of the render tree. This allows running tests that are not dependant on any platform. There are also 'pixel tests', where WebKit renders a web page, and compares the results with a PNG file. And finally, there are some javascript-only tests for JavaScriptCore.

I've updated our version of DumpRenderTree (since WebKit has no common API on different platforms, each platform must provide an implementation for it). I've got it to run in the mode where you give it a single test on the command line, which is good for manual testing, but the testsuite instead feeds test names on the standard input, and this somehow crashes our version currently. I'll debug that and run the 33000+ tests to get a better idea of where we are.

There will be some more work to do before we can run the complete testsuite, for example tests involving HTTP require an apache web server port (anyone has a recipe for this ?), and many methods in the test frameworks aren't implemented yet. These allow the tests to access some browser settings from Javascript, for example they can disable cookies, change cache policies, and so on. This allows testing of WebKit with all possible settings.

I want to get the testsuite running to help with future work on adding new features and the merges we'll have to do. This will help getting a better idea of the status of our port, and make sure we don't break things when merging new versions of WebKit in. Also, the tests are usually simple and the failing one will point to the features we are missing, making the port much easier to fix and improve.