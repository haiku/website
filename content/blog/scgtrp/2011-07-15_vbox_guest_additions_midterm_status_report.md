+++
type = "blog"
author = "scgtrp"
title = "VBox Guest Additions: midterm status report"
date = "2011-07-15T11:30:19.000Z"
tags = ["virtualbox", "gsoc2011"]
+++

Shares fully working!
Slightly slow, but usable.
Clipboardy stuff too.

I've now fixed most of the bugs in the guest additions, to the point that what's done so far is mostly usable - the only major bugs remaining are some random crashes in VBoxService that I've not been able to reproduce, and an inability to drag icons when mouse pointer integration is enabled. (Thanks to kallisti5 for finding both of these.) I also have replaced VBoxApp (which currently handles clipboard sharing) with VBoxTray, a replicant which serves the same purpose but can be autoloaded by Deskbar.

At my mentor's request, I've also added some installation instructions to the repository, as the build/install process is currently a bit complex. I intend to rewrite those instructions in the form of a makefile in the near future; this wasn't really a priority before because there wasn't much there for people to build.

The big task for this next part, though, is the video driver. This will include both OpenGL support and automatic screen resizing. The emulated video card is based on a 3dfx card, so I will hopefully be able to use large parts of the existing 3dfx accelerant, but I've still left myself a lot of time for this as these things are always a bit more complex than I predict. I plan to spend any leftover time on getting things to run a bit faster if possible.