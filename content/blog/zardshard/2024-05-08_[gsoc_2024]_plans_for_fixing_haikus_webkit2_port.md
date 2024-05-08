+++
type = "blog"
title = "[GSoC 2024] Plans for Fixing Haiku's WebKit2 Port"
author = "Zardshard"
date = "2024-05-08 08:35:00-04:00"
tags = ["WebKit", "webpositive", "gsoc", "gsoc2024"]
+++

So I got accepted into GSoC again! I'm going to be working on WebKit2. But what is WebKit2, or even WebKit, for that matter? Well, WebPositive uses WebKit to render its web pages. Currently, we use the WebKitLegacy API to communicate with WebKit. It would be nice to switch to the newer version: WebKit2. However, our port of WebKit2 still needs work. At present, it has lost its ability to even render any webpage at all! So, getting WebKit2 to work will be the primary goal of my GSoC project. If there's time left, I might be able to integrate it into WebPositive.

The advantages WebKit2 has for WebPositive will be mostly invisible to end-users. The code will hopefully be more maintainable than the deprecated WebKitLegacy and we'll get access to several newer APIs such as the ad-blocking API. Perhaps the most visible change: problems in one part of the code should be less likely to crash the whole browser.

One of the first things I hope to get done is getting the current version of the WebKit2 port working as well as it did at the end of Rajagopalan's GSoC 2019 project. This would involve fixing inter-process communication and making sure the software renderer works. With those fixed, webpages should display once again. Once that's done, I can make the keyboard and mouse work, improve the API exposed to Haiku applications, and implement various other things, such as context menus and clipboard support.

Once WebKit2 is working, I plan on trying to integrate WebKit2 into WebPositive. But, I would be somewhat surprised if I had enough time in GSoC left to do this. Even if I can't get to that, our port of WebKit2 should be working reasonably well and it should be easier to maintain than its current state. As for those wanting to try it out before it being integrated into WebPositive, MiniBrowser should work. But beware, MiniBrowser is not currently available on HaikuDepot, and compiling it takes a 15GB of storage (if you're careful) and several hours of time. Actually, I've been thinking of writing a blog post about this subject, because I have used a variety of tricks to keep storage space and memory usage low, and it would be nice to have these documented for future contributors.
