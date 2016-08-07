+++
type = "blog"
author = "emitrax"
title = "HCD [bfs]: Status Report #1"
date = "2008-06-22T17:33:19.000Z"
tags = ["bfs", "vfs", "hcd"]
+++

It's been almost a month already since the very first Haiku Code Drive began!

First of all thanks to all of those who have voted me, I was very surprised about the poll result.

Now some updates about my project.

As you know, my project aims to test the stability of the bfs file system. In order to do so
the idea is to first implement XSI Posix semaphores, and then compile bonnie++ which is a benchmark suite
for file systems. To be honest though, XSI Posix semaphore are not really mandatory, because it would be
faster to just port bonnie++ to Haiku, as it would require very few changes (e.g. those concerned locking).
However though, in the long run, Haiku would benifit more if I implement the semaphores previously mentioned,
as it would also make it more Posix compliant.

The easiest part was the user space one, now I'm working on the kernel side. I also started a thread
about this on the gsoc mailing list so you can follow it by clicking on the link below.
http://www.freelists.org/archives/haiku-gsoc/06-2008/msg00009.html

Although I'm not done with the above though, I've already started running some test without bonnie++
and hitting the first bug. See ticket #2400.

The test is quite simple but very time consuming, especially on my current hardware (by the way, 
if someone is willing to try the test with real hardware or a faster maching please contact me).

I first packed the whole haiku source code into a tarball from linux, move it to my usb disk, run
vmware, and try to unpack the almost 500MB tarball (1.5 GB unpacked) from Haiku. 
Yeah... "Good luck with that! :)"

The result, which at first seemed to me as a bfs bug, turned out to be a vfs one, although we are still discussing about it in the gsoc mailing list. See the link below for more details.
http://www.freelists.org/archives/haiku-gsoc/06-2008/msg00021.html

Despite the fact it has been confirmed not to be a bfs bug, as you can read from the mailing list, I'm still trying to fix it, while also finishing xsi sempahore implementation.

That's all for now.