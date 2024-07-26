+++
type = "blog"
title = "[GSoC 2024] Hardware Virtualization: Progress Report #2"
author = "dalme"
date = "2024-07-25 19:59:09+02:00"
tags = ["gsoc", "gsoc2024", "qemu", "nvmm"]
+++

Another month has gone by and we're entering now the last month of GSoC! So, what did I get done this month?

## What works now that didn't work before?

- The driver supports now the 16 IOCTL calls defined by the driver, which means that
both the frontend and the VMX backend are complete.
- EPT tables support: Much of my previous post content was about EPT tables and all the
problems I was having to get them working. Now support for them is complete and it works!
The EPT page fault handler only consists of one call to Haiku's page fault handler, since it's
everything integrated into Haiku's virtual memory subsystem.
- libnvmm's test suite is ported and all tests pass.
- QEMU (latest version from Haikuports) is capable, after applying a patch, of detecting NVMM support
and compile. It doesn't work, sadly, something breaks after executing a few chunks of any given VM.

However, I didn't make any progress on the SVM backend (which is still at a very early state). I'm beginning to realise that this is one thing I won't be able to finish during the coding period.
I probably have all the pieces needed to port it but I have to look at the differences between SVM and VMX (there are a few) and that will probably take some time I might not have in the end.
Also, it's worth to mention that despite getting more and more stuff working [the list of TODO things keeps getting longer and longer](https://github.com/dalmemail/haiku-nvmm/issues).
Things on that list are improvements on performance and behavior (NVMM's kidnaps the CPU which is probably not the best behavior if we want the system to be responsive, ...). None of them is very long or difficult but there are a lot of those little things to do so they will end up requiring a considerable amount of time.

Last week I shared a screenshot on the forum of the first ever VM to be virtualized:

![calc-vm virtualized by NVMM](/files/blog/dalme/vm.png)

## What's the current blocker?

After compiling QEMU with NVMM support (which was harder than I expected) I tried to run a VM on it. Of course it didn't work.
The problem is, this doesn't happen right at the beginning of VM execution but after 10-or-so memory exits correctly handled by NVMM. So that makes it hard to debug because the problem isn't on the point it fails but before. It doesn't help that the VM runs on a "black box" mode in which you can't see what's happening inside. I've been reading Intel SDM Volume 3 (which covers VMX) and I'll probably be able to make some ugly hack to trigger VM exits after executing a single instruction. I've been trying some other indirect less-time-consuming strategies for the last two days without much luck, so I'll probably have to make those hacks on NVMM to be able to see what's going on.

Remember you can follow NVMM's port development at [GitHub](https://github.com/dalmemail/haiku-nvmm).
