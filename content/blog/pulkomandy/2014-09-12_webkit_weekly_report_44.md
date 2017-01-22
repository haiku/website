+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #44"
date = "2014-09-12T07:26:46.000Z"
tags = ["WebKit", "contract work"]
+++

Hello there!

Yesterday I released version 1.4.4 of HaikuWebKit. This version includes the latest fixes to the rendering code and should be completely useable again. There are still a few drawing issues but they shouldn't prevent you to browse the web anymore.

<!--more-->

This is not the only change in this release. I ran through the html5test.com results and implemented some of the missing features to improve our score. The most visible changes are:

<ul>
<li>Input type="color" is now implemented, with a pop-up color picker</li>
<li>The css :read-write selector is implemented (not my work, this was done by the Apple guys)</li>
<li>Web Notifications are supported, using our notification server</li>
<li>The download attribute on hyperlinks is supported. This can be used to force a link to be downloaded, rather than shown in the browser.</li>
</ul>

I worked on some other features, but the implementation is not working well enough so I skipped them for this release. I will resume work on those and try to get them working properly, but for now it's better to leave them disabled and let websites fall back to non-HTML5 alternatives.

<ul>
<li>input type="date" and related (time, week, month, ...) are not rendering properly</li>
<li>Geolocation can be enabled, but we need some data to return. It seems Firefox is using some Google service to guess a location from your IP address and wifi network your computer can see. This will be optional, and user will be prompted before such sensitive information is sent to a website.</li>
<li>Device orientation can also be enabled, but we usually don't have accelerometer data to report. I don't know what other desktop browsers are using here.</li>
<li>Web Crypto and CSP 1.1 don't seem to work even after enabling support in WebKit. I haven't found if this is a problem of missing something in our code, or just incomplete implementations on WebKit side.</li>
</ul>

With all these features enabled, we will get more than 400 points on the html5test. I will first try to get the more interesting features working (the date and time inputs in forms). Things like Web Crypto and CSP 1.1 are still drafts at the W3C, so it's better to wait until the specifications are frozen and the WebKit implementation is done.

The html5test goes up to 555 points. The remaining 155 are things like speech synthesis, video DRM support, and some other less useful things. I'm not sure they are worth my time. One of the features I may still look at is WebGL, but without OpenGL acceleration this is rather useless.

My plan for next week is to take a break from the WebKit coding and migrate Haiku to Python 2.7. We are using 2.6.9 but WebKit will require 2.7 starting next week, so it's time we update this. Then I will get back to those HTML5 features and the remaining drawing issues.