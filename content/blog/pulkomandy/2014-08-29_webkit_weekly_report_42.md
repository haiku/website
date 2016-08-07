+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #42"
date = "2014-08-29T09:07:10.000Z"
tags = ["WebKit", "intel_extreme", "contract work"]
+++

Hello world!

This week most of my time was spent on preparing the 1.4.3 release of HaikuWebkit. This fixes more bugs and removes the "tiled" rendering mode introduced in 1.4.0, which turned out to not work so well. Some old drawing issues will make a comeback, however, and I will need to dig into the app_server clipping code again to understnad what's happening there and actually fix them.
<!--break-->
Yesterday my new machine was delivered. I'm now the owner of a Core-i3 4330 based machine, which I will use for Haiku and WebKit development. This machine has two cores with hyperthreading, and is much more modern than my aging laptop. It's currently cloning the WebKit repo. I'm keeping my laptop as well so I can use both machines at the same time to do multiple big compilations in parallel.

Anyway, this isn't the only reason I bought this machine. With all the talk on the mailing lists about Haiku not supporting any modern hardware, I wanted to try things for myself and see what it was really like. This machine features UEFI, USB3 ports, but also legacy PS/2 and COM ports so I have a way to use KDL if that's needed.

I'm currently booting in "legacy" BIOS mode and not making use of the USB3 ports. However this morning I added support to our drivers for the CPU integrated video, and I now have the machine running at native resolution. Addingthis was just a matter of putting the PCI IDs in the driver, something that only takes a few minutes. So if you have hardware that only boots in VESA mode, please take the time to open a ticket and include a complete listdev output. Maybe there is a similar easy fix for your hardware, but with no bug report, we have no way to know if that would work.

On this new machine I'm also getting some short mouse stalls (the cursor stops moving for one or two seconds, then resumes). I'll be investigating this as I'm not the only one with this problem and there's a ticket for it. And I will have a look at our UEFI support too, now that I can actually test it.

Sound and network worked out of the box, as well as the SD card reader installed in the machine. So I'd say our modern hardware support is actually not that bad at all, and easy to improve if people take the time to report their problems on the bugtracker so our devs can try to fix them.

Of course I'm also continuing the work on WebKit2 and fixing the remaining drawing issues in the current WebKit1. I'll try to get WebKit2 to display some pages to see if it has the same problems.