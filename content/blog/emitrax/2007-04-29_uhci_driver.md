+++
type = "blog"
author = "emitrax"
title = "UHCI Driver"
date = "2007-04-29T22:10:05.000Z"
tags = ["usb", "gsoc", "uhci"]
+++

After reading the main part of the USB specs, I moved on to the UHCI driver specs this week-end. I can now say, that implementing the isochronous part to the UHCI driver is a lot easier than I thought, and I guess Micheal can confirm. While reading the UHCI specs I followed Micheal's code, and I have some questions about it, but I'll write him an email for that. By the way, is R1 intended only for x86?

I just wanted to _announce_, that my gsoc project will probably change to adding USB OHCI full support, as the former would take less than a whole summer. I obviously already talked to both my mentor Oliver and Micheal about it. If it's ok with him though, I'd like to add isochronous support to the UHCI driver first. By the way, how does it work with patches and commits? Shall I just commit my changes to the svn or shall I first provide a patch so that someone can review it before it goes into the svn?

Anyway, I'm looking for some USB driver written in kernel space to see how drivers communicate with the bus_manager. I'm also looking for some USBKit documentation, even though I found some code like the FinePix driver, and the usb_dev_info command line that use it.

I guess it's all for now. 

Stay tuned ;-)

