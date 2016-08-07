+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #11"
date = "2013-12-13T07:41:42.000Z"
tags = ["WebKit", "webpositive", "contract", "Services Kit", "contract work"]
+++

Hello everyone.

Some progress again this week.

First of all, I finally updated the haikuwebkit package, for both gcc2hybrid and gcc4. This means you can download things with WebPositive again, and all the bugfixes since the last release are in as well.

On the testsuite side, I got the crash-report feature to more or less work thanks to help from Rene and Ingo. There was one improvement to Debugger to allow extracting the stack trace when using the --save-report option on a thread that's not (yet) crashed. I tried various ways of plugging this into the testsuite, but it turned out catching the signals is the right thing to do. I also had to override debugger() in the testsuite system to call abort, and raise the expected signal, instead of dropping directly into debugger.

Most of the crashes reports are now working, but sometimes Debugger fails exiting and stays waiting for something. I have to manually kill it to get the testsuite to continue. Well, the cases where it works are already quite helpful, helping me to catch some bugs in my image saving code for the "pixel test" stuff, and also improving the logic to decide when to run the next test - we were sometimes doing this before the current one had finished running its javascript code.

Writing of the TestExpectations file continues, I have enough entries in it now to filter some of the tests out and make the final report useable. WebKit reports tests that didn't run as expected (crashes, things that failed, and things that passed when we told in the TestExpectations that they should fail). With 15000 tests not passing, the WebPage is quite huge, but now small enough Web+ manages to render it. I'm exploring the results and either adding rules to TestExpectations, or fixing the bugs when I've also seen them create issues on some web pages.

One of the fixes I did is support for gradients (in CSS and SVG). We had some code written, but apparently not too well tested. It was using the wrong range for the gradient stops (our API expects 0 to 255, and the code used 0 to 1). Also, the gradient semantics are a bit different, in our gradients, if there is no stop at the start or end of the gradient, they will draw random colors. CSS expect the first and last stops to extend to the gradient edge.

I already identified some other problems in both the testsuite and WebKit code itself. I'm not going to fix all the issues, so my goal is to write as much of the TestExpectations as I can, trying to describe why each of the tests fail and grouping them together. The goal is to get everything to run "as expected" (even if that means actually failing). This way, the impact of any change can easily be identified by the number of tests fixed or broken.

I'll still have a look at the crashing tests. If we can get those fixed, the testsuite will run more smoothly and we can expect the actual browser to be more stable as well.