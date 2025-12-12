+++
type = "blog"
title = "Haiku Activity & Contract Report, November 2025 (ft. Go)"
author = "waddlesplash"
date = "2025-12-12 17:20:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59111 through hrev59187.

<!--more-->

### Go 1.18

The most notable development in November was the introduction of a port of the Go programming language, version 1.18. This is still a few years old (from 2022; the current is Go 1.25), but it's far newer than the previous Go port to Haiku (1.4 from 2014); and unlike the previous port which was never in the package repositories, this one is now already available there (for x86_64 at least) and can be installed via `pkgman`.

The bulk of the work on this port was done by korli, building off earlier work from other contributors. He also made changes to Haiku itself to improve POSIX compliance and fix issues uncovered while running the Go test suite. Kudos!

waddlesplash managed, with some hacks, to use the Go port to compile and run an older version of the "Hugo" static site generator, and then run the `hugo serve` live preview mode of Haiku's website on Haiku itself. So, for the first time, the monthly report was largely written, previewed, and edited from within Haiku itself (using the native code editor "Koder" to write the markdown, WebPositive to view the generated site, and Iceweasel to spellcheck.) Pretty neat!

### app_server restarts

Following a number of changes by waddlesplash, it's now possible for app_server (Haiku's display server / window manager) to be restarted at runtime, and for all running applications to re-connect to it automatically. This used to work long ago, but it had broken at some point since. Now, when app_server crashes, you can type "quit" at the white-screen Debugger prompt, choose "kill", and app_server should immediately come back with all applications that are still running.

### Applications

OscarL fixed the Temperature display in ActivityMonitor to properly display "No thermal sensor" if there is no temperature information available.

OscarL made Terminal synchronize its internal clipboard with the system's only at startup, fixing a regression from an earlier change.

apl made HaikuDepot much more robust to network problems, handling failures more gracefully and prompting the user as needed. He also added "native" and "desktop" filters, allowing users to look through lists of only "native" Haiku applications or "desktop" applications more broadly. humdinger followed up with some tweaks to the wording of the options, to improve clarity.

humdinger refactored WebPositive to send Tracker more correct messages when telling it to open folder and select a file (e.g. from the Downloads window.)

jscipione fixed a regression in background colors of address fields in Mail. nephele fixed the text color in MediaPlayer's Info window, the panel color in LaunchBox, and some in the standard Color selector. jscipione simplified the logic for automatically updating colors in AboutSystem.

nephele changed Appearance preferences to send only a single "update colors" message when many colors are changed at once, improving efficiency (and possibly reducing flickering in some circumstances.) jscipione fixed the height of the fake scrollbars in Appearance preferences.

jscipione adjusted Tracker to send the "workspace activated" notification message on to any replicants, so that they can adjust colors or other things depending on the current workspace. He also fixed edit box locations in icon mode, resolved state problems after a cancelled drag-and-drop, made volumes be sorted before folders if "List folders first" is enabled, made file-panels respond to settings changes, and made a number of code cleanups.

samuelrp84 contributed fixes to the Input preferences panel for the tapping sensitivity control, which had incorrect ranges before.

nathan242 (a new contributor!) made the Location field clickable in MediaPlayer's Info window, resolving a rather old feature request.

nipos made Network preferences properly display the full range of statuses for network adapters, so that it's clear what state an adapter is actually in.

### Command line tools

nipos made it possible to install the NetworkStatus replicant in Deskbar via the command line even if the replicant window is open.

korli added support to `strace` for dumping `stat` structures, `sockopt`, `sigset_t`, `sigprocmask`, and signal names.

waddlesplash fixed a number of bugs and oversights in Debugger's command-line interface, fixing hangs and other problems. This makes the "non-KDL white screen" (e.g. for an app_server or registrar crash), which is powered by the Debugger CLI, much more reliable.

### Kits

nipos fixed some problems with moving to the previous or next months in the Calendar control. He also fixed keyboard navigation in list views after new items are inserted.

jscipione changed BControl to not set colors in `AttachedToWindow()`, which isn't needed after earlier changes to BButton and allows for greater flexibility in subclasses. He also fixed the text color in BSlider, cleaned up code related to drawing it in the ControlLooks, and increased the size of the (optional and disabled by default) scrollbar knobs to make them more visible.

waddlesplash made tooltips use computed spacing instead of hard-coded values, improving their appearance on HiDPI.

jscipione adjusted BPartition to return `B_BUSY` when invoking `Mount()` on an already-mounted partition.

### Servers

nipos made pop-up notifications immediately change their position when the setting for notification positioning is changed.

SED4906 contributed a change to fix sound playback in notification_server, making notifications actually play their specified sounds.

waddlesplash fixed some order-of-operations and missing-lock problems in app_server, fixing a number of crashes.

waddlesplash refactored the DHCP client code in net_server to run on its own thread and not block a message loop thread, fixing a number of hangs (including of applications that talk to net_server, like Network preferences) and allowing the DHCP client to properly shut down when no longer needed.

### Drivers

PulkoMandy fixed command timeouts in the SDHCI driver, improving its compatibility.

samuelrp84 contributed a number of fixes to touchpad support, improving handling of temporary errors and incorrect data, adding documentation of current behavior and TODOs for improvement, setting defaults properly, and using more standard functions. (These are the first of a long series of patches he's proposed that implement support for more Elantech touchpads, many of which are still under review and aren't merged just yet.)

madmax fixed the normalized name generation in usb_disk to remove spaces at the beginning.

### File systems

OscarL added another stub function to userlandfs' FUSE implementation in order to get `squashfs-fuse` to work on Haiku (which it now does). He also made userlandfs propagate the "read-only" flag from the FUSE filesystem stat into the Haiku filesystem stat, allowing Tracker to use proper backgrounds and other such details for read-only volumes mounted via FUSE.

### libroot & kernel

korli implemented the `SOCK_SEQPACKET` socket type for UNIX domain sockets. He also changed `recv` and `send` to accept zero-length buffers (which have meaning on datagram sockets), adjusted `accept` and `recv` to handle invalid addresses more like Linux and the BSDs do, and implemented `MSG_TRUNC` and `MSG_PEEK` for UNIX domain sockets.

korli changed `exec()` to support being invoked when the process has other threads beside the current (main) one, better matching the POSIX specified behavior.

korli changed `fork` to preserve the signal mask across forks.

korli added `ffsl` and `ffsll` to `strings.h`, as they're in POSIX-2024. He also updated the `arc4random` implementation from BSD upstream.

waddlesplash fixed a regression in managing memory commitments upon cutting areas caused by the previous month's improvements. He also implemented transferring page commitments for overcommitted caches/areas and avoided shrinking commitment incorrectly, fixing some more kernel assertion failures seen when running userland applications AddressSanitizer.

waddlesplash reworked how I/O requests are managed in the kernel, making it possible for there to be subclasses of `IORequestOwner` objects, where previously there was only the base class. This enabled drivers that don't use the generic I/O schedule (most notably NVMe) to use its own `IORequestOwner`s for better bookkeeping, which waddlesplash took advantage of to avoid unnecessary recursion and fix a stack overflow.

waddlesplash implemented and enabled a native Path MTU discovery algorithm for IPv4 and TCP, fixing some compatibility issues on certain networks.

waddlesplash fixed a bug where the displayed size of partitions in the bootloader menu would be the size of the underlying disk and not the partition itself.

madmax fixed some text encoding problems in the bootloaders, fixing display of Unicode characters that show up in some file names when blocklisting files from the bootloader.

waddlesplash adjusted the kernel to block mounting partitions that are already mounted. This allowed an equivalent check to be removed from the FAT driver, fixing some regressions it had caused.

waddlesplash fixed a bug in libroot's C locale handling that was incorrectly changing all locale categories to the same locale, when only one was requested to be changed.

### Build system

A `_DEPRECATED` macro was introduced into the base system headers, which adds a "deprecated" C/C++ compiler attribute where used. (It's not used anywhere yet, but the idea is to start using it on deprecated methods, classes, etc. so that the compiler will emit `-Wdeprecated` for these when used, making them easier to spot.)

waddlesplash rehabilitated the bootloader tests, which include a harness for running much of the bootloader as a userspace program, to make it easier to debug and experiment with. (They hadn't been compiled in a very long time, since before package management at least.)

mmu_man imported an old script that converts Linux console keymaps to Haiku keymaps.

PulkoMandy fixed the bootstrap build for ARM and ARM64.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
