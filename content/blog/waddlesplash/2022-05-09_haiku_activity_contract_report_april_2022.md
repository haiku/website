+++
type = "blog"
title = "Haiku Activity & Contract Report: April 2022"
author = "waddlesplash"
date = "2022-05-09 13:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As has been the case recently, the Activity Report is hereby combined with my Contract Report.

This report covers hrev55992 to hrev56087.

<!--more-->

### Applications

Jim906 submitted a change to make FileTypes remember its window position.

korli enhanced mouse event support in Terminal.

jessicah implemented 24-bit true-color support in Terminal.

Jim906 implemented support for `.pls` playlists in MediaPlayer.

Dale Cieslak made input in DeskCalc locale-formatting-aware.

waddlesplash fixed the "looping" behavior occasionally seen in the "All packages" list in HaikuDepot, and also fixed more causes of the "crash on exit" seen in the past few months.

waddlesplash fixed some crashes in DiskProbe.

waddlesplash reworked thumbnail support in Tracker (which was added last year by jscipione.) Previously it did not auto-refresh thumbnails in some cases, and could get stuck or crash if a directory with tons of images or on a read-only volume was opened. The new code may be slightly slower to create thumbnails, but it does not get stuck and it has not yet been observed to crash. Memory leaks in the icon cache were also fixed at the same time.

### Drivers

PulkoMandy added support for brightness control in the intel_extreme graphics driver on a number of device generations and enhanced it for some older ones. korli also made some adjustments in this area.

korli made quite a number of improvements to DisplayPort support in both the intel_extreme and radeon_hd graphics drivers. He also added initial support for "Comet Lake"-class devices in the intel_extreme driver.

korli fixed a SMAP (memory access) violation in the NFS (v2) driver.

tqh deleted the config_manager system. This was an older mechanism, partially inherited from BeOS, to have hard-coded or configurable information about devices that cannot be automatically probed (for example, many ISA-bus devices.) We never really supported these on x86; and if we ever decided to in the future, we would probably use the FDT (device tree) system that the ARM and RISC-V ports are already using (and successfully) instead. This allowed a chunk of legacy code to be deleted.

korli enhanced sparse-file support in the EXT2/3/4 driver.

PulkoMandy adjusted interrupt handling in the SDHCI driver.

korli added more entry caching support to the btrfs, ext2, and exfat drivers. (This may speed up operations on those filesystems considerably in some cases.)

### Interface Kit

PulkoMandy fixed a problem in app_server when trying to stack windows on top of themselves.

scph (a new contributor!) fixed changing mouse acceleration settings; it appears this was not working properly since the Input preferences refactor some time ago.

waddlesplash removed some deprecated functions from the headers and renamed some newer, recently added functions to be more in line with Haiku naming conventions in the mouse support code.

### Command Line Tools

PulkoMandy added a pkg-config file for userlandfs's FUSE support, to make it easier to build FUSE drivers on Haiku.

korli implemented tracing of `fcntl` and `wait_for_child` syscall parameters in `strace`.

### Bootloader

kallisti5 made some adjustments to the RISC-V EFI bootloader.

### libroot & kernel

X512 added support for simple signal handling on RISC-V.

X512 removed some handwritten assembly for signal handling in favor of high-level code on x86_64.

korli added some checks in timeout handling for poll/select operations.

X512 adjusted the linker flags and dropped the linker scripts for `runtime_loader` as they were no longer necessary. This makes it slightly easier to make changes to or port runtime_loader across architectures.

dominicm (a new contributor and prospective GSoC student) added support for the C11 Threads API to `libroot`, with an implementation mostly taken from FreeBSD.

korli fixed poll notifications for listening sockets to not send "write" notifications (which were not supposed to be sent.)

waddlesplash removed a deprecated timezone function from public headers.

waddlesplash cleaned up some bits of kernel code to use newer, more streamlined APIs and fix compiler warnings.

waddlesplash reduced another panic assertion KDL into a syslog debug print in the ConditionVariables code. (The assertion was only observed to trip in VirtualBox on slow systems, but it was rather annoying to have to deal with.)

### ARM!

urnefeld and milek7 submitted a number of changes towards ARM64 in both the bootloader and the kernel. (Some of these have been merged; others are still pending review on Gerrit.)

davidkaroly also submitted a variety of ARM changes, towards the EFI bootloader, syscalls, UARTs, linker scripts, page tables, exception handling, and other things.

PulkoMandy added support for the Allwinner A10 (sun4i)'s interrupt controller.

### HaikuPorts

There is a variety of new software available now: LeoCAD, Stellarium, Apache webserver, and as usual a lot of bumped versions.

### Contract work in progress: WiFi

The largest item I worked on last month, which I mentioned investigating in my previous report but had not started on, is some experiments incorporating OpenBSD WiFi drivers in addition to FreeBSD WiFi drivers. This would, if successful, bring in support for a few new classes of devices (including Intel's most recent line) as well as 802.11ac support on `idualwifi7260` and some of the new drivers that would come along.

At present, most of the stack compiles (I have ~hundreds of lines of new code in the compatibility layer to make that possible), and the new version of the `idualwifi7260` (`iwm`) driver now is down to "only" a few dozen errors. Within another few days of work it should compile, and then I will have to get it to link and then try to actually run it.

Based on the work so far on the new compatibility code, I think that this project, which seemed a bit crazy at the beginning, will actually work out and allow us to run drivers from both BSDs without too much headache. But it's not a sure thing yet; only time will tell.

### That's all, folks!

Yes, that's it this month. (It was a bit of a slower month, as due to the Easter holidays and surrounding events I only did a week's worth of work. Looking at the commit logs, I think other people took a bit of a break as well.)

Once again, many thanks to all of Haiku's supporters, and our wonderful community! We could not do all this without you.

See you next month!
