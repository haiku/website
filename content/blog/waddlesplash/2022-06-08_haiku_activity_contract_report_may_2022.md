+++
type = "blog"
title = "Haiku Activity & Contract Report: May 2022"
author = "waddlesplash"
date = "2022-06-08 17:00:00-04:00"
tags = ["contractor"]
+++

As now seems to be the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56088 to hrev56147.

Before I get into the development items from May, you may want to know that, though it has not been formally announced yet, you can now donate to Haiku, Inc. (and thus support my ongoing contract) through [GitHub Sponsors](https://github.com/sponsors/haiku/)!

<!--more-->

### Applications

PulkoMandy fixed text in the status view being cut off in Installer.

Jim906 improved window cascading in FileTypes.

jadedctrl added per-track scripting support to MediaPlayer. Now you can use `hey` (or another interface to Haiku's scripting suites system) to control MediaPlayer's playlist.

korli added more vendor identifiers to Screen preferences, so that it can identify monitor manufacturers more accurately.

apl fixed version date updates in HaikuDepot. He also fixed more properly a crash which waddlesplash had implemented a workaround for last time.

dcieslak fixed locale-aware display in DeskCalc, which had been somewhat broken by his changes last time.

Jim906 fixed WebPositive to not display the "..." icon on the bookmark bar when the overflow menu would be empty.

### Drivers

korli did a lot more work on the intel_extreme driver, including VBT parsing, hotplug notifications, (e)DisplayPort support, and more.

Lt-Henry added more constants from the HID specification to the headers, so they can be used in the driver later on.

kallisti5 adjusted the FreeBSD compatibility layer to support some more socket `ioctl`s on all drivers, and made a first pass at handling MTU changes.

PulkoMandy wrote a new driver for RNDIS USB ethernet. This is the protocol most Android phones use when sharing their internet connection using "USB tethering", so you can get Haiku online this way on supported devices now. (It was only tested on a few devices though, more testing welcome!)

waddlesplash made a number of changes to the FreeBSD compatibility layer discovered and then "back-ported" from his branched work on porting OpenBSD WiFi drivers, including invoking Haiku's PCI code instead of recreating equivalent functionality, removing unused features that FreeBSD also dropped, and more.

waddlesplash overhauled MTU ("maximum transmission unit") and also receive size handling in the network stack and the FreeBSD compatibility layer. Previously, we always stayed at the default ethernet MTU of 1500, which was fine but suboptimal (as ethernet can usually support jumbo frames up to size 9000 or so), but more problematic was that we could not handle receiving anything larger than this, as it would trigger errors in the ethernet handler related to scattered I/O operations. This required a number of changes: first to the stack itself and to the IPv4 & IPv6 handlers to check the correct MTU value, then to the `ethernet` module to use larger buffers if necessary when reading or writing data, and finally to the FreeBSD compatibility layer to activate the larger MTUs. These changes had a side effect of fixing "high packet loss" on some devices (or at least PulkoMandy's very recent Intel ethernet device, anyway.)

The MTU changes then exposed another problem related to buffer management, but that was not fixed until a few days later in June.

korli imported a patch to the `atheros813x` driver from OpenBSD (and waddlesplash submitted it to be upstreamed to FreeBSD.)

### File systems

Mashijams (now a GSoC 2022 student!) fixed all warnings and enabled -Werror in the XFS filesystem driver.

### Kits

jessicah fixed `BStringList::DoForEach` behavior and updated the documentation for all `DoForEach` variations to be clearer about behavior. (PulkoMandy later improved it even further.)

### Command line tools

kallisti5 adjusted some internal tooling to generated build package repositories along with the infrastructure migration.

jessicah fixed a corner case related to symlinked directories in the build support code.

### Bootloader

Anarchos submitted a patch that mostly fixed PXE booting.

### libroot & kernel

nielx fixed `strptime()` partial match behavior to match the POSIX specification.

waddlesplash changed `wait_for_thread` (which `pthread_join` also uses internally) to return `EDEADLK` immediately instead of hanging if a thread tries to wait on itself. This matches the behavior of most other modern OSes, but does constitute a behavioral change with BeOS. (It was discovered when testing the RNDIS driver: when unplugging the device, the stack would wind up trying to wait for itself.)

waddlesplash fixed network device unplug handling to not hang or crash the system in some circumstances (triggerable by the new RNDIS driver.)

kallisti5 made userspace thread names be printed to the system log upon failure to start a debugger for them (this is useful when bringing up new architectures when the user debugger can't be used yet.)

trungnt2910 (a new contributor!) submitted a change to make kernel permissions on areas more strict. Previously, if no read/write permissions were given to an area, the kernel would give itself read/write permissions by default. This meant that userspace operations on memory-mapped areas and file descriptors did not always behave as expected, especially with relation to other OSes. (Fixing this problem exposed a bunch Haiku drivers that inadvertently depended on the old behavior, so a variety of changes had to be made as those problems were discovered, but they seem generally resolved now.)

korli fixed signal-handling behavior of the `system()` function.

### ARM!

milek7 made a lot more additions to ARM64 support, including a large amount of work-in-progress on the MMU code, kernel thread switching, exception handling, pagetables, setjmp/longjmp, ACPI (which included generic support for non-x86), and more.

### RISC-V!

kallisti5 updated and fixed a lot of the packages in the RISC-V package repository in working towards building usable images by default.

kallisti5 fixed time conversion calculations, making the uptime clock (and thus most timed operations) behave correctly.

### HaikuPorts

QGIS is now in the repositories, and there were version bumps for LibreOffice, WINE, a lot of KDE applications, and both Qt 5 and Qt 6, and plenty more besides.

### Contract work (still) in progress: WiFi

At the end of last month, I had a lot of the OpenBSD WiFi stack and the accompanying `idualwifi7260` driver compiling, but not linking and certainly not running. I made a lot more progress in May: the driver now fully compiles and links, and then after many rounds of trial and error starts and initializes the hardware, and from there I made quite a lot of changes working on getting it properly integrated. Scanning support was the first to work, but as of the end of the month I had not managed to join any networks and connect to the internet with it yet.

I have made quite a lot of progress in the first week of June, but to tell you that would be to get ahead of myself ... so you will have to wait and see what next month brings. Or, if you cannot wait, keep an eye on the forums and the commit logs and I can say you will not be disappointed... :)

### That's all, folks!

I can promise that next month will have quite a bit more than there was this month. Already in the first week there have been some pretty significant developments, and that is before the new WiFi work even lands. Exciting times!
