+++
type = "blog"
title = "Haiku Activity & Contract Report, June 2024"
author = "waddlesplash"
date = "2024-07-15 23:45:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57754 through hrev57801.

<!--more-->

### Applications

apl removed some unused code from HaikuDepot related to displaying publisher email addresses. He also cleaned up some code in the rating window and adjusted the window title when a specific package is opened, and fixed `BColumnListView` to work properly with a corner "status view" (like the one in HaikuDepot that displays the count of packages) in HiDPI mode, implemented pasting into the package rating comment field (and fixed its vertical scrollbar), fixed a crash on early quits, and more.

humdinger adjusted some uses of ellipses (...) in UI text.

humdinger improved Magnify's display of width/height when using crosshairs to measure pixels.

Abdelra6 fixed Icon-O-Matic not automatically moving back onscreen on startup if its saved position was offscreen.

waddlesplash cleaned up some code in Tracker around add-on loading, and added some more safety precautions to try and prevent crashes.

### Command line tools

OscarL reworked the help text spacing of the `package` command to be less cramped.

waddlesplash added support for dumping of `iovec` structures to `strace`. He also tweaked the "stats" mode output to be more compact.

### Servers

waddlesplash moved the mounting of the shared-memory RAMFS into `launch_daemon`. (Previously it was done in the kernel, but as launch_daemon was the one responsible for creating the mountpoint for it, this didn't make sense and didn't work on the first boot of a fresh image.)

### Kits

madmax fixed `BHandler::IsWatched` returning wrong values due to the internal map having items incorrectly added to it.

### Drivers

diegoroux made some minor changes to the `virtio_sound` driver to prepare it to be loaded by the device_manager.

korli fixed a KDL that could be caused by a debugger command in the PS/2 driver.

waddlesplash adjusted the FreeBSD network compatibility layer to support FreeBSD 14.x drivers, and then synchronized all the ethernet and WiFi drivers with upstream FreeBSD and OpenBSD. This picks up support for some new ethernet adapters, and fixes some issues in the WiFi drivers. He also made some tweaks to an assert in the compatibility layer's DMA memory management, which could help with debugging some rare issues.

Timm Steinbeck (a new contributor!) contributed a fix to a KDL that happened in the USB stack's exploration logic on his hardware.

### File systems

waddlesplash refactored BFS' Query support use the common query parser and evaluator (that RAMFS and packagefs already used). This involved first backporting a variety of changes to the common query parser (as it's derived from the one in BFS, but the two had diverged a bit), then rewriting the Query-handling portions of BFS to use the common code instead of its built-in version. He also cleaned up some other code and build system files relating to filesystems while at it.

Following the refactor of BFS to use the common query parser, waddlesplash rewrote the top-level parse loop to not use so much recursion (fixing stack overflows on parsing very large queries) and then added a limit to the number of terms that can be in one query (fixing stack overflows on evaluating very large queries.) He also fixed a bug relating to query term "scoring" when some terms don't have an associated index.

### libroot & kernel

trungnt2910 (a GSoC 2024 participant) contributed a change to report exit status information of teams and threads in debugger messages. He also adjusted the debugger API to properly report "killing" signals (`SIGKILL`, `SIGKILLTHR`), fixed installing debuggers when an application has signals deferred, and made new teams be reported to the debugger before being resumed. (All these changes are to improve the behavior and functionality of the GDB port he's working on, but most of them will benefit Haiku's own native Debugger, too.)

waddlesplash adjusted when new teams in the kernel get their arguments set, so that other teams that watch team creations will be able to immediately see what the new team's arguments are.

korli implemented thread-affinity configuration, allowing specific teams or threads to restrict themselves to specific CPU cores. (This is especially relevant on newer Intel processors that have a design similar to ARM's "big.LITTLE", but it may also be relevant on multi-socket setups.) This required reworking of kernel-internal data structures related to CPUs and the thread scheduler, introducing new syscalls, and then fixing a variety of bugs that cropped up after the modifications.

waddlesplash fixed readv/writev behavior after the VFS refactor a few months back relating to FDs that don't support seeking. (This fixes WINE failing to start on nightly builds.) He also adjusted how most syscalls that accept `iovec`s handle copying them from userland, avoiding memory allocation in more cases.

### Documentation

Zardshard added documentation for the `BBitmap` constructor that takes an `area_id`.

### Build system

waddlesplash synchronized the PCI and USB IDs files.

PulkoMandy fixed the build system's reference to the Gutenprint packages.

### Are we beta5 yet?

Soon! The blockers have been fixed, and I've posted a preliminary timeline and emailed the development mailing list about the release. The timeline is perhaps a bit ambitious (it has us release in about a month), but given that Haiku is in a pretty good state already, and that there isn't really a whole lot left to be done for the release, I think it's doable. Stay tuned for test builds!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
