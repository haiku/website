+++
type = "blog"
author = "axeld"
title = "CD boot update"
date = "2005-10-14T15:10:00.000Z"
tags = ["cd boot"]
+++

Everything is in place now, and the boot loader is even passing all information to the kernel to be able to boot from a CD. It's not yet working though, as the VFS is only evaluating the partition offset of the boot volume, and nothing more.<br /><br />It's probably only a tiny bit left, so I try to finish it tomorrow - in my spare time, as I usually don't work during the weekend :-)<br /><br />We have also agreed on not making demo CDs (images only, of course) available before the whole system runs a bit more stable. Compared to a hard disk image, a CD image is likely to be tested by a lot more people - and therefore, the first impression should not be too bad.
