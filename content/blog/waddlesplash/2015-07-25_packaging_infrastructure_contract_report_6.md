+++
type = "blog"
author = "waddlesplash"
title = "'Packaging Infrastructure' Contract Report #6"
date = "2015-07-25T20:48:49.000Z"
tags = ["contract work", "package management", "infrastructure"]
+++

A lot has happened since my last report. I decided to spend some time working on stabilizing both Haiku and the packaging system, and so I am closer to having full builds & HPKR generation, but I'm not quite there yet.
<!--break-->
<br><br>
I spent some time this week looking into the long-standing issues (e.g. DHCP) with Haiku, and then there was the launch_daemon merge from Axel also this week. I wound up deciding that with Haiku being this unstable currently, that having the build server update the builders unconditionally would be a bad idea, so I disabled that feature. I have on my TODO list to implement a way for administrators to be able to manually trigger updates once they're sure that Haiku is stable enough to run the buildservers on.<br>
<br>
On the HaikuPorts front, I haven't done much more in HaikuPorter, but I did spend some time teaching Humdinger how to fix lint errors in recipes, and he has been chugging through the gigantic list of failures that have to be solved before we can start using the Kitchen. This is extremely helpful, since de-linting recipes is pretty easy but time-consuming, so having Humdinger do it instead of having me spend contract time on it is excellent.<br>
<br>
Offline, I have a partially working copy of dependency resolution for builds. Once I get this working properly, the Kitchen will be feature-complete enough that I'll be able to start a test instance of it. I expect that we'll hit a lot of recipe build-errors, so we'll see how far I can get on that before having to go back to work on HaikuPorts.<br>
<br>
I have a week and a half (or so) worth of contract time left, which is definitely enough to get the server into a working state, but whether or not it'll be deployable depends on the current state of the HaikuPorts tree. We'll know for sure when I run it for the first time and see what happens.<br>
<br>
See you next week!