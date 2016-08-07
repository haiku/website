+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #5"
date = "2013-10-25T06:50:21.000Z"
tags = ["WebKit", "Services Kit", "serviceskit", "contract", "contract work"]
+++

Hello there !

Well, not so much progress on WebKit this week. I spent most of the time working on CMake code to get it to generate hpkg files. I got something that works well enough to link Web+ to it, so I can test things with the actual browser instead of HaikuLauncher.
Today I added the cookie jar persistence, so Web+ remembers all the cookies when you exit and relaunch it. I also started working on HTTP authentication. These are the two features I couldn't test with HaikuLauncher, as it lacks some code for them (saving cookies on exit, and showing the HTTP authentication password prompt window).

I also implemented the protocol handler for file: URLs, so now I can browse the Be Book and Web+ default home page works as well.

With the HTTP authentication fixed, I think I will be on par with the current code, so I could merge this into Haiku now for you all to use. However, there are some new rendering glitches that maybe I should fix first. What do you think?