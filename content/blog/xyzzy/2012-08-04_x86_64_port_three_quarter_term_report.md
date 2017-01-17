+++
type = "blog"
author = "xyzzy"
title = "x86_64 port: three quarter term report"
date = "2012-08-04T10:50:42.000Z"
tags = ["gsoc", "gsoc2012", "x86_64"]
+++

I have continued to make good progress since my midterm report. All the kernel functionality except for user debugging is implemented, and I have ported a basic set of drivers, including PCI, disk drivers, BFS and PS/2 input. For most drivers, porting is just a matter of fixing compiler warnings. For some, there are 64-bit issues which make porting more difficult. For example, the USB stack will require a bit more work as it currently assumes that addr_t is 32-bit everywhere.

I have also made some progress in porting userland to x86_64. I currently have libroot, libbe, bash, and most of the command line utilities ported. I have got an interactive bash shell running on top of consoled (which is usually used to run gdb on if app_server crashes).
<!--more-->
<div align="center">
<a href="/files/images/x86_64-threequarter.png"><br />
<img src="/files/images/x86_64-threequarter.png" width="640px" height="519px" />
<br /></a>
</div>

My next goal is to get app_server running. I have already made the first step toward this by porting the VESA graphics driver. This required a fair bit of work. The driver works by performing calls to the BIOS, which runs in 16-bit real mode. On x86, these calls were performed under a CPU mode called virtual 8086 mode, which allows 16-bit code to run under 32-bit mode. However, this mode doesn't exist in 64-bit mode, meaning it wasn't possible to perform the BIOS calls. The solution I have used is to use the x86emu library from X.org, which emulates a real mode x86 CPU to run the BIOS code under. This is what X uses to solve the same problem on x86_64. I wrapped the library into a new kernel module, and then changed the VESA driver to use that instead of virtual 8086 mode.

After I have ported app_server, the remaining work will be to port apps and the remaining drivers, and I have some outstanding TODOs which I will work through before the end of the coding period. Judging by my progress so far, I expect that the x86_64 port will become usable quite soon.