+++
type = "blog"
author = "xyzzy"
title = "x86_64 port: quarter term report"
date = "2012-06-22T12:27:28.000Z"
tags = ["gsoc", "gsoc2012", "x86_64"]
+++

As I mentioned in my first blog post, I had exams until a couple of weeks ago, so I didn't start working on my project properly until then. However, I am now working full time so I expect to make a lot more progress in the coming weeks.

So far I have made it possible to compile the kernel for x86_64 by adding stub implementations of all the architecture functions and fixing compilation errors/warnings (all architectures that Haiku supports at the moment are 32-bit, so there were various problems in the code when compiling for 64-bit). I have also made changes to the kernel_args structure (the structure which the bootloader passes to the kernel containing information such as the boot volume, loaded modules and the memory map). As I am making the x86 bootloader able to load both a 32-bit and 64-bit kernel, this structure must be compatible between both. The changes I have made make all members the same size regardless of whether compiling for 32-bit or 64-bit.

I have now begun implementing ELF64 loading into the bootloader so that the 64-bit kernel can be loaded. I expect to have the bootloader work completed by the end of next week, after which I will begin work on the kernel.

My GitHub repository can be found at https://github.com/xyzzy51/haiku/tree/x86_64 (I'm working in the x86_64 branch), for anyone who's interested in following my progress. You'll also see my commits on the haiku-commits list.