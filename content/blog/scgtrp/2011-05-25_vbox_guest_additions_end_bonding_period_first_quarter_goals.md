+++
type = "blog"
author = "scgtrp"
title = "VBox guest additions: end of bonding period; first quarter goals"
date = "2011-05-25T10:25:27.000Z"
tags = ["gsoc2011", "milestone report", "virtualbox"]
+++

During the community bonding period I played around with the existing guest additions patch, getting it to build and switching my repository over to git to preserve my sanity. I've learned a lot about the way Haiku drivers and modules work, especially in the last few days, and it seems that a few things are simpler than I originally thought they'd be and some things are more difficult.

As an example of the latter, it turns out that drivers can't provide APIs to other drivers; only modules can do this. This posed a problem for the shared folders module, which needs to either be in a separate module or contain extreme hackiness. As a driver, the original vboxguest couldn't allow vboxsf to use its API. To solve this, mmu_man and I decided that the best first task would be to break up the existing vboxguest driver into a module (vboxguest) containing the guest additions and a driver (vboxdev) which exposes the library to userspace as /dev/misc/vboxguest. This is now finished.

It turns out guest properties and clipboard sharing are <a href="http://i.imgur.com/3g2fZ.png">already working</a>, and mouse pointer integration is at least partially implemented, though I've not managed to get it to work yet. This should free up a bit of time for some of the other things.

As my first major subproject, I'm planning to implement a shared folders filesystem module - as I (and possibly a couple of other students?) are coding exclusively in VirtualBox, it makes sense to focus on the things that make development easier first, and being able to share files with the host is certainly useful at times.