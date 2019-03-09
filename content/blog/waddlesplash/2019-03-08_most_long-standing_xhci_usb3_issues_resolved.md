+++
type = "blog"
title = "Most long-standing XHCI (USB 3.0+) issues resolved!"
author = "waddlesplash"
date = "2019-03-08 23:00:31-05:00"
tags = ["usb", "xhci"]
+++

Last month, I sat down and decided to at the very least attempt to fix our XHCI (USB 3 host controller) bus driver. Issues with it have been the most significant problem users have been facing, as most hardware made post-2012 has an XHCI chip as the system's primary USB chip, and most hardware made post-2014 (or so) has exclusively an XHCI chip and no EHCI (USB 2.0) or prior chipsets (which we do support very well.)

This has been a long-standing problem; in fact kallisti5 made <a href="https://www.haiku-os.org/blog/kallisti5/2017-07-17_bug_xhci_usb_30_issues/">a blog post</a> back in mid-2017 calling for help on exactly these issues. A few people stepped up and contributed some small fixes, which brought the driver to the point where it could at least boot Haiku within QEMU, and on certain bare-metal installs use flash disks, but this was not enough. It still caused device lockups (e.g. USB mouse/keyboard stalls) without any errors or other information as to what was going on, it still caused kernel panics on the insertion of certain devices (or, more unluckily, after medium- or long-uptimes with common ones) and on boot on others, or simply refused to function at all on quite a lot of hardware.

Well, just under a month (and ~40 commits) later, **virtually all those issues have been resolved.** There's a good bit of work that remains to be done, but at least all (!) the kernel panics are resolved, devices (largely) don't lock up without an explanation (there are a few exceptions, but not many), performance is greatly improved (40MB/s with random 1-2s-long stalls, to 120MB/s on some USB3 flash drives and XHCI chipsets), and XHCI-attached keyboards can even be used in KDL!

Anyone who was plagued by these or other probably-related problems is encouraged to grab a new nightly build (`hrev52966` or better) and re-test with the new and improved driver.

The only truly major (known) remaining issue is a hard-stall on boot with certain USB3 flash drives on NEC/Renesas controllers. Apparently USB2 flash drives on USB3 ports work, as well as mounting these flash drives after the boot has finished. Work is ongoing to investigate this. (I don't have any of the faulty controllers to test with, so, other developers with more limited time are the ones investigating here.)

For anyone more curious about the stabilization process, I'd recommend <a href="https://git.haiku-os.org/haiku/log/src/add-ons/kernel/busses/usb/xhci.cpp?id=hrev52976">reading the commit log</a> for the past month. Of particular interest are <a href="https://git.haiku-os.org/haiku/commit/?id=8fa626d09dfae368ab3c9ce0c3006629805309c4">hrev52772</a> (fixed most of the "controller initialization" boot KDLs), <a href="https://git.haiku-os.org/haiku/commit/?id=65ceb4c9318152f80df0f4efdb224309e67be100">hrev52924</a> (fixed broken transfer finalization logic, and halved the interrupt rate), <a href="https://git.haiku-os.org/haiku/commit/?id=a40a4c0d39da8d0cfe37263d3b82c4ba84414d37">hrev52963</a> (combined with the prior commit, fixed most of the other KDLs), <a href="https://git.haiku-os.org/haiku/commit/?id=bae7f6d5dd7a90fe94878116e9331ea4089d9df2">hrev52964~1</a> (*greatly* simplified and clarified a large portion of the driver), and <a href="https://git.haiku-os.org/haiku/commit/?id=57608a81c5c59cb71bc8de10516ac06f771c6df2">hrev52966</a> (fixed nearly all the random device stalls.)

Hopefully the much-improved driver will be more useful as a reference than FreeBSD's, OpenBSD's, or Linux's to other OS developers; at least during my work, those drivers are so badly organized that it's often hard to tell exactly what is going on vs. what the spec says should happen (though OpenBSD's is relatively sane here.) I've also tried to include clarifying comments in our code referencing the spec by section and page wherever "magic" happens (why didn't anyone do that before?).

Thanks go especially to PulkoMandy, humdinger, Vidrep, and kallisti5 for helping test; and to korli for some code review and fixes to my changes.
