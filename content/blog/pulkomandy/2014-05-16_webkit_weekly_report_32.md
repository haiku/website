+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #32"
date = "2014-05-16T12:04:02.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello everyone,

I spent most of the week working on the texture mapper drawing code. I spent a lot of time tweaking the options (each change requires a complete build of Web+, so this added up to a lot of time...), and today I got the texture mapper to display something in a BWindow.
<!--break-->
Things are far from usable yet, however. The screen is not always refreshed, so the pages often show all white until you scroll or resize the window to force it to refresh. Scrollbars aren't visible anymore (in this mode they are supposed to be handled by the "client", that is, we will have to draw native scrollbars instead of using WebKit faked ones) ; scrolling doesn't really work (only the part of the page that was initially visible is properly rendered) ; and things are very crashy.

The performance isn't very good, either, but currently the texture mapper is drawing to the offscreen view instead of directly to the on-screen one, so I think this can be improved.

There is some good news, too: I get the sberbank login page to render the login/password box properly! I didn't test other websites with known issues yet (or they crashed before I could see if they worked better), but I expect this rendering mode to give better results in many places once it is stabilized.

I made some other changes in different places, worth mentioning are a fix to tab-navigation to work with all form controls (checkboxes, buttons, etc), fixing a bug that was reported a long time ago ; and the usual update to latest version of webkit, as usual without any massive changes, but a lot of bugfixes, cleanups, and optimizations. Triaging of testsuite issues also continues as a background task.

I haven't talked about my side projects in a while. So here is an update: Slayer (a Team Monitor with CPU and RAM usage indicator) is available on HaikuArchives, in a version that builds for Haiku, and there is a haikuports recipe. There is another haikuports recipe for avr-gcc (with binutils and libc) for microcontroller hacking. And this week I'm trying to get the clang recipe to build a working package. I plan to use it for some ARM microcontroller projects, but clang will also be useful as a regular C++ compiler for the host system. It may even help getting the PPC build of Haiku going again.

Well, that's all for this week. I'll continue debugging and optimizing the new code into a usable state. See you next week for the results!