+++
type = "blog"
author = "scgtrp"
title = "VBox guest additions: status; second quarter goals"
date = "2011-06-17T01:49:03.000Z"
tags = ["gsoc2011", "virtualbox"]
+++

During the first few weeks of GSoC, I've gotten vboxsf, the shared folders module, mostly working, though I'm a bit behind where I'd like to be due to unexpected things repeatedly coming up both in physical-land and on my development setup. All supported functionality is working when accessed from the terminal - at this point I'm just optimizing and working on a bug where looking at a shared folder the wrong way in Tracker causes the kernel to panic. Mouse pointer integration, the other thing I had in my schedule for the first quarter, is now working; therefore finishing up the last few bits of vboxsf will be one of my main goals in the next few weeks.

The other goal I have now is time synchronization. It turns out this is more important than I thought - I didn't take into account how many things depend on timestamps being set to reasonable values, and my Haiku installation is at this point very confused as to what the current date and time are.

Several new features, including symlink support, were added in VBox 4, which I was completely unaware of until recently despite it having been released several months ago. I have now upgraded my laptop's copy of VBox so the Haiku port of the guest additions will be able to use these new features.
