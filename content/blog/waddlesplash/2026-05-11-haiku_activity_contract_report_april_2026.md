+++
type = "blog"
title = "Haiku Activity & Contract Report, April 2026"
author = "waddlesplash"
date = "2026-05-11 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59570 through hrev59671.

GSoC selection happened at the end of last month; you can [read the news post](https://www.haiku-os.org/news/2026-05-01_haiku_mentors_3_students_in_gsoc/) announcing this year's selectees. Thanks to everyone who applied!

<!--more-->

### Applications

phoudoin disabled some redundant filetype checking in TextSearch, improving performance a bit.

nipos dropped some obsolete code from WebPositive's tab bar.

jscipione continued his work on Tracker, removing redundant code, fixing problems with Copy/Paste, the Trash icon, and much more. waddlesplash came by and made a few fixes too, including one to avoid a lot of unnecessary node monitoring syscalls.

aquamatic123 did some cleanups to the Devices internals, solving another TODO. He also tracked down and fixed a memory leak.

apl refactored the JSON schema code generation system in HaikuDepot, to prepare for potential use with REST APIs (among other reasons.) He also fixed the "Featured" tab displaying as disabled incorrectly in some circumstances (which also entailed fixing a bug in `BTabView`), and reworked how the package view data is updated.

humdinger removed some unnecessary spacing in the Appearance preferences.

jscipione made the message body text colors in Mail automatically update when the system colors change.

nathan242 fixed a crash in SoftwareUpdater when trying to quit while a download was running. waddlesplash implemented automatic cleanup of the "admin" directory in it, meaning that older states will now automatically be deleted to free up space (unless the setting is disabled.)

jscipione cleaned up some code and added some missing functions to DeskCalc's math backend.

### Command line tools

waddlesplash improved the (not yet ready for general use) `ltrace` implementation, fixing a number of TODOs and inefficiencies. However, it's still not ready for general consumption, as it causes problems and crashes when it traces calls.

waddlesplash split the "clean up admin directory" functionality of `pkgman` into a separate subcommand (`pkgman cleanup`), and changed `install` to just alert the user that cleanups can/should be run.

### Kits

X512 fixed BPicture storage of affine transforms, string escapements, and more.

X512 removed a redundant value from the "mouse idle" notification message sent to applications.

nephele fixed a bug where `BCheckBox` drawing would alter the view state unexpectedly, causing drawing errors in WebPositive.

PulkoMandy restored the BeOS color-changing behavior of `BButton`, fixing compatibility with a few applications (like WonderBrush.)

korli added a missing error return in `BInvoker`.

waddlesplash did a major overhaul of the MIME sniffer's internals, removing some very large inefficiencies and also making use of new POSIX routines (like `memmem`) to make MIME sniffing faster. The results are quite noticeable: the "mimeset'ing package contents" stages of both the Haiku build and any HaikuPorts build are much faster now (by as much as 10x or more).

waddlesplash made `string_for_size()` pre-initialize its internal structures (so they don't need to be re-initialized every run), significantly reducing its performance overhead.

jscipione reduced how often shortcuts are probed in windows, significantly improving performance in applications like Tracker with a lot of dynamic shortcuts.

waddlesplash switched `BWindow` shortcut lookups to use a tree instead of a flat array, reducing comparisons and improving lookup time.

### Servers

phoudoin added support for `CAPABILITY` information in IMAP `LOGIN` responses in `mail_daemon`. He also adjusted the `ID` command to report Haiku as the client.

Coldfirex pulled in some typo fixes to AGG's drawing routines.

waddlesplash refactored media mixer startup to delay it until an application actually connects to the output. This has the advantage of saving time and CPU (and battery, as the hardware output won't be started either) until something actually plays sound. (Ideally we'd automatically stop the mixed again when nothing's playing anything, but that's not implemented yet.) This also fixes a lot of the "performance time too large!" crashes seen over the past year or two.

waddlesplash improved the environment-parsing routine in `launch_daemon`.

korli ran a code spellchecker on app_server and registrar, and fixed the problems it found.

### File systems

anujbillore-0-0 added some clarifying comments, fixed a hash lookup, implemented proper handling for an error path, and added a check for the minimum partition size in BTRFS.

waddlesplash changed BFS to send live-query rename/move notifications at the same time as node monitor notifications, fixing stale data being seen in such live-query notifications and potentially confusing applications.

sleipbyte added some handling for missing attribute forks on inodes.

### Networking

vighnesh-sawant fixed a socket leak in the Bluetooth stack, and also split the basic service-discovery server in the `bluetooth_server` to separate files.

shivamsinghydv fixed a problem in `bluetooth_server` that was leading to crashes in some circumstances.

phoudoin added support for "nsswitch" DNS resolution modules to be configured for `libnetwork.so`, potentially paving the way for mDNS support.

waddlesplash added support for `B_SELECT_DISCONNECTED` (aka `POLLHUP`, etc.) in socket notifications, fixing a test from the BSDs.

### Drivers

Mahmoussam implementing powering off of MMC/SDHCI devices when there's no voltage range support, and did a lot of work on the initialization process for eMMC devices.

waddlesplash imported the `zydwifi1211` driver (aka `zyd` from FreeBSD) and implemented some missing features it needed in the FreeBSD compatibility layer. (However, it's not clear if it works or not, or if we need some other changes for it yet.)

### libroot & kernel

waddlesplash split some functionality out of the very large VM subsystem source files into much more reasonably sized files, such as various initialization routines and the page writer. He also moved a busy-page notification to a more appropriate place, removed a redundant field from the page queues, and continued his (work-in-progress, not yet merged) work on the page writer refactor.

waddlesplash, following a tip from smrobtzz, pulled in a number of files from upstream glibc and adjusted the build system to gain proper 128-bit `long double` support in libroot's math routines. This fixes some crashes on ARM64, and hopefully also RISC-V.

waddlesplash fixed a minor "leak" of memory in the bootloader's splash screen code (in reality all the memory would be cleaned up later, but it matters for efficiency in kernel-bootloader handoff.) He also increased the "kernel arguments" memory chunk size, avoiding OOMs and other problems on some rare configurations (like "bootstrapped" images.)

korli added `sigaction` to the POSIX error mapper (used for compatibility with applications that can't handle BeOS/Haiku's negative error codes.)

waddlesplash refactored a part of SMP support to avoid having a lot of atomic values on the same CPU cache line.

### Build system

KapiX continued work on refactoring the unit tests, fixing the build of more modules and refactoring many tests, including some for the kernel, app_server, libroot, and more. He also worked on the "test" image profile, a setup designed to create a Haiku image pre-set for unit testing.

waddlesplash (building on some proposed changes by others) fixed building GCC2 with GCC14+, allowing the CI system to upgrade to a newer Linux distro release.

waddlesplash refactored how `libroot_build` (the compatibility layer for implementing various Haiku-specific methods on other OSes, so that Haiku can be cross-compiled on such targets) handles `errno`, fixing a number of bugs where stale or incorrect `errno`s would be read, which caused misbehavior in `mimeset` and other tools.

HalonixTheFirst added a fs_shell harness for the EXFAT filesystem.

nephele added a warning to `./configure` when some necessary static libraries could not be found.

SED4906 fixed typos for "unknown" across the entire tree.

waddlesplash added a missing deletion of a temporary file from the MMC image target, reducing confusion.

### Documentation

jscipione did some significant cleanup and clarification to `BEntry` and `BStatable` documentation. He also added a note about `MenusBeginning()` in the BWindow documentation.

### ARM & RISC-V

smrobtzz implemented basic support for SMP (multiple CPU cores/threads) for ARM64, enough for it to work in QEMU, and also fixed running with some versions of the EDK2 EFI firmware (which QEMU ships with), some problems with `system_time`, and other issues.

smrobtzz and waddlesplash updated a lot of HaikuPorts cross-compilation recipes, cleaned up the "bootstrapping" procedure, and then upgraded the base ARM64 package set to work properly with the new port configuration. (This means ARM64 builds using the binary packages, as is default, now work out-of-the-box on many QEMU configurations.)

waddlesplash fixed a TODO about using atomics in the RISC-V thread-local storage code.

### Are we beta6 yet?

Not yet. A WebPositive release is pending, and there are a few other bugs in Haiku that need to be fixed, too.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
