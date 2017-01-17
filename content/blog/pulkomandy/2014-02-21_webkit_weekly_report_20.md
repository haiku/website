+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #20"
date = "2014-02-21T08:10:59.000Z"
tags = ["contract work", "webpositive", "WebKit"]
+++

Hello everyone!

So, as advertised last week, I spent some time running the testsuite again. And as usual, it helped spot and even fix a few bugs.
<!--more-->
First of all, Ingo fixed the stack alignment in Haiku. This means the workarounds I had introduced in WebKit to get the JavaScript engine to run could now be removed. This was necessary, because the JavaScript engine in WebKit now uses the C stack for JS stuff (before it used a separate stack, which was properly aligned). Well, with this issue fixed, I could even enable the DFG JIT. DFG stands for "Data Flow Graph". This is another level of JIT in webKit, that is used when a method is called relatively often (about 70 times) or loops a lot (more than 1000 iterations). This new JIT is able to optimize the code according to execution statistics and other heuristics. But, the initial optimization work is a bit expensive. That's why it's only used for "hot" areas in the code.

I ran the Kraken benchmark to compare this against the latest released WebKit, and we have a 5x improvement. This benchmark is designed to show the power of such a JIT engine, so don't expect everything to run 5x faster. But still, there should be a noticeable performance improvement in heavy JS apps and websites.

With the stack alignment issues out of the way, our testsuite is still passing only about 20000 tests out of 32000. To increase this, I started implementing event sender in the testsuite tool. This is a way for the test suite to send mouse and keyboard events from javascript, as if the user clicked somewhere on the page. This allows testing of some interactive features. I have started the implementation with the mouse events, and I'll soon be adding keyboard ones.

I fixed the bug that led WebPositive to download some pages instead of displaying them. The problem was in our WebKit network code. WebKit expects us to provide the Content-Type HTTP headers (that gives the content MIME type and encoding) when processing HTTP requests. However, when a request lacked this header, we tried to guess a MIME type from the file extension. Unfortunately, this triggered for all HTTP 30x redirections (these don't come with a content-type), and the actual MIME type from the redirected page would then be ignored. Moreover, our guess attempt didn't work very well, because it's not easy to guess that "php", "dll", or "aspx" may actually be HTML files.

Finally, I merged more WebKit changes, so we don't get too much out of date. This goes with the usual set of optimizations, fixes, cleanups, and some new features.