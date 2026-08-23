+++
type = "blog"
title = "Haiku Activity & Contract Report, June 2026"
author = "waddlesplash"
date = "2026-07-13 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59754 through hrev59820.

<!--more-->

### NVMM

The thing that *should* be the biggest news item this month is that the GSoC 2024 work to port "NVMM", the NetBSD Virtual Machine Monitor (which runs on more than just NetBSD, despite the name), providing hardware-accelerated virtualization support for QEMU, was finally merged. Unfortunately it still doesn't fully work, so it's still disabled by default: hence, it's only a minor news item, unfortunately.

The code is now at least fully integrated with the Haiku tree, and all necessary kernel changes (including a number of bugfixes and the implementation of a handful of minor new features) has been completed, so the code shouldn't "bitrot" any further, and it's much easier to build, test, and work on it than it was when it was on a slowly-rotting branch. Additionally, I (waddlesplash) implemented support for AMD hosts (the GSoC project only implemented enough for Intel hosts), cleaned up a lot of the code, and implemented a number of performance improvements while at it.

The primary problem symptom is that guest OSes of any real complexity (Haiku included, but also Linux, etc.) crash in strange but apparently deterministic ways late in their boot process: e.g. trying to access memory that apparently isn't even mapped. The crashes don't appear to be race-sensitive and happen similarly on bare metal as well as in nested virtualization in VMs, on both Intel and AMD hosts.

Unfortunately all attempts at debugging the problems so far haven't led anywhere, but hopefully a solution will eventually be found, so that Haiku can finally gain virtualization support. You can follow along or chime in about this on the [corresponding forum thread](https://discuss.haiku-os.org/t/gsoc-2024-hardware-acceleration-for-haikus-qemu-port/14784/51).

### Applications

nephele dropped some disabled code implementing a "hamburger menu" from WebPositive. He also changed the URL input bar to handle empty URLs better, and improved the appearance of the "Go" button.

apl changed HaikuDepot's prompt asking about anonymous statistics collection to default to "No" instead of "Yes". He also implemented a better placeholder for when screenshots aren't available, and added some checks that the system clock isn't too far out of sync with the server. madmax came by later and fixed a crash.

PulkoMandy fixed some Tracker crashes and hangs when built in debug mode (which it isn't by default, not even on nightly builds, so only developers would have encountered this.)

PulkoMandy and waddlesplash made a number of fixes to FilePanels (open/save windows), fixing race conditions that caused their controls to be broken or in the wrong places, among other problems.

X512 fixed MediaPlayer being unable to restart playback of video files, dropped an old BeOS workaround from Cortex, fixed a hang on deleting nodes in Cortex, and more.

aquamatic123 (GSoC '26) implemented a number of improvements in the Devices application. (Keep an eye out for a blogpost covering these in the near future.)

humdinger changed a number of GUI strings in the Workspaces and Devices apps to be more understandable and fit in with our general style better.

### Command line tools

korli implemented moving to the directionally next/previous workspace via command line arguments to the `Workspaces` application. (This makes it possible to set up keybindings for these operations.)

### Kits

korli added a `Sort()` method that takes a custom comparison function to `BStringList`.

smrobtzz implemented support for 30-bit RGB pixel formats. (This is apparently needed on some Apple ARM devices.)

madmax fixed `BNetworkAddress` comparison for `AF_LINK` (Ethernet) addresses.

### Servers

PulkoMandy added a hardware cursor hook fallback to app_server.

madmax fixed a hang when net_server tried to load an empty `wifi_networks` settings file, and also some other issues related to handling of settings files.

mohammedrattia (GSoC '26) implemented support for some more mandatory Bluetooth control commands, and more. madmax came by later and fixed a crash in the Bluetooth preferences panel.

waddlesplash adjusted how screen brightness and the current screen configurations are stored in app_server, to fix some regressions from the earlier refactor of screen configurations.

phoudoin added checks that Print add-ons actually existed before trying to load them, silencing some confusing warnings in the syslog.

waddlesplash added some missing locking to the cursor routines in app_server, fixing crashes on screenmode changes.

madmax fixed the drawing of the last point in bilinear bitmap painting in app_server.

### File systems

jessicah fixed BFS to not crash with a (relatively new) assertion failure when running `checkfs` on a volume that has no indexes.

waddlesplash fixed rename/move operations when done through a bindfs. The previous logic was completely broken and would've always caused errors or KDLs, so I suppose in all the years since bindfs was written, nobody's ever tried to do that before?

waddlesplash fixed truncation not updating file modification time on ramfs.

### Drivers

PulkoMandy made some changes to the USB ethernet headers, in preparation to implement "NCM" USB ethernet support.

vighnesh-sawant (GSoC '26) started the implementation of isochronous transfers support in the Bluetooth stacks, which will be needed for Bluetooth audio support.

KevinAdams05 added some missing IDs for "Skylake" devices to the Intel graphics driver's memory management system.

smrobtzz changed the ACPI module to initialize the "embedded controller" much earlier in the boot process, which should remove some warning/error messages from some syslogs and also fix some ACPI-related problems on some systems.

waddlesplash (upon request from the forums) implemented basic 64-bit support in the S3 graphics driver. After confirmation that it worked, it was enabled by default there.

waddlesplash swapped the old linked-list for the new one in some network stack usages, allowing them to benefit from more extensive assertions and better inlining. He also fixed a problem in the UNIX socket implementation that was leading to hangs when trying to write more data than fits in a socket buffer.

### libroot & kernel

korli added some missing "memory barriers" to the kernel's thread pinning routines, fixing some rare KDLs and other problems.

smrobtzz added a check to the bootloader to fail more obviously when memory-management structures run out of space, instead of causing problems or even corruption later on.

waddlesplash implemented a mechanism to block reschedules in the scheduler (which NVMM needs.)

waddlesplash refactored how a key x86 control register that affects memory management and other tasks is initialized across different CPUs. The BIOS bootloader initialized it properly, but the EFI loader, in a major oversight, only initialized it correctly on the boot CPU: whoops! This problem was spotted by the NVMM code, which refused to initialize without a proper value in this control register (but other things would be affected than just VMs.) This may potentially solve some more mysterious issues seen on some EFI systems.

nathan242 fixed a major oversight in the I/O scheduler that could lead to disk corruption when using filesystems with smaller block sizes than the underlying disk block size. Generally this will only happen on newer SSDs (as they might have 4K-sized blocks instead of 512-sized blocks, and some filesystems like BFS default to 2048-sized blocks.)

waddlesplash fixed a deadlock in the VM functions that handle areas with per-page permissions (i.e. from `mprotect()`.) In fixing the deadlock, he fixed a number of performance problems and also implemented and fixed some more assertions in other VM functions, and discovered another major memory subsystem bug that hasn't been tracked down just yet...

waddlesplash adjusted how per-process timer objects are deleted in the kernel, fixing some regressions from previous months' refactors to the timers code.

### Build system

SED4906 added some inital support to the build system for 64-bit PowerPC.

PulkoMandy dropped some unneeded logic from build rules that extract compressed archives.

phoudoin added detection for `docx`, `xslx`, and other MS Office document formats to the MIME sniffer.

### Documentation

cafeina wrote documentation for the "loaded (ELF) image"-related types and routines in the Kernel Kit.

### ARM & RISC-V

smrobtzz implemented some more bits and pieces of support for Apple ARM platforms.

### Are we beta6 yet?

We have a definite release timeline now: a branch should be made by the end of this week, with a target release date of mid-August. Keep an eye on the forums for details to come about how you can help test!

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
