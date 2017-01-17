+++
type = "blog"
author = "stippi"
title = "WebPositive gets a bit more stable"
date = "2010-04-16T14:39:21.000Z"
tags = ["native browser", "WebKit", "webpositive", "contract work"]
+++

At least it can finally log into Facebook. Not that I am a fan of Facebook, but I realize how important it is for WebPositive to be able to log into that site. Some other seemingly random crashes have a good chance of being fixed, too, since I was able to track down a memory corruption bug that was caused by different parts of the code being compiled with incompatible defines. Unfortunately this took a bit of experiementing until I was finally on the right track. Today I hooked up my quad core machine to temporarily replace my regular Haiku work machine, which is CPU wise a bit underpowered. The insane rebuild times were really getting on my nerves. Even with the quad core it took quite a bit of patience, but to be absolutely sure to compile everything with the right defines, I had to compile... well... everything. Many times.
<!--more-->
Otherwise there haven't been great changes to WebPositive. I've implemented scrolling left and right when you have more tabs open than fit into the window. The "Go" button has been integrated into the URL text input. Some display glitches have been fixed in the tab view (not the menu bar, yet), and WebPositive can now pick the correct favicon size from a multi-size favicon.ico. Now that I can finally sleep well again with this Facebook crash fixed, I can probably turn my attention to the many feature requests that you guys have voiced in the comments. Once WebPositive is confirmed stable, I should work on integrating it into the Haiku build as well, to replace BeZillaBrowser as default browser perhaps. During the BeGeistert Coding Sprint, we've also fixed compiling the app_server testing environment under Haiku (where you run a windowed version of the app_server as a regular application, and then test applications inside that environment), so that I can efficiently work on the required new BView features that WebCore needs, most importantly affine transformations. And of course a whole bunch of other stuff, as always. :-)

Meanwhile, I can happily present to you <a href="http://www.yellowbites.com/downloads/WebPositive.zip">WebPositive Revision 444</a>!