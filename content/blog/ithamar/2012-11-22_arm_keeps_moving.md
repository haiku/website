+++
type = "blog"
author = "ithamar"
title = "The ARM keeps moving..."
date = "2012-11-22T20:58:23.000Z"
tags = ["arm", "kernel_arm", "porting", "progress report"]
+++

<h1>The ARM keeps moving...</h1>

For people not watching the commit list closely, I've continued to find time to work on Haiku/ARM. So far, things look promising. No new screenshots of any kind though, but more investigation work done to get an idea of what I'm getting myself into. All in all, I'm actually quite pleased...

In my local repository (of which most is actually in the Haiku repository as well, bar some really nasty hacks that not even I dare to commit publicly) I've been able to get to the point where all content for a standard Haiku image is being built (the famous haiku-image target, for the devs reading this). Ofcourse, lots of architecture specific stuff is still stubbed out, but it means that at least there are no surprises lurking to get things to compile at least...

Since I've got a little more confidence in the amount of work needed to get Haiku/ARM up and running on at least a single target, I'll be writing up a proposal for a Haiku, Inc contract. This contract would enable me to focus more on Haiku/ARM for a longer stretch, reserve time in my schedule, with as a target getting some form of basic userland running on a single Haiku/ARM target. From start of next year I should be able to dedicate more time to Haiku/ARM if the contract proposal would get accepted.

Now, I'm not certain I'll commit to any specific target. For the moment, I'm considering to stick to QEMU/Verdex as my main target, but I might switch to some real hardware if needed. Also, some kind of userland could simply be a working "bash" shell, but ofcourse my real hope is to get far enough to see app_server up and running, with Tracker/Deskbar greeting us....

Anyway, short version is that I'm hoping to get Haiku/ARM far enough to make it very easy for other people to join in and port Haiku/ARM to their favorite device, with as little work as possible. It should become as easy as adding hardware support to Haiku/x86, if all goes well.

Time to get back to that source tree.... ;)
