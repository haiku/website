+++
type = "blog"
title = "Haiku Activity & Contract Report, March 2024"
author = "waddlesplash"
date = "2024-04-12 23:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57616 through hrev57679.

<!--more-->

### Applications

apl improved language code handling in HaikuDepot.

nephele added himself and humdinger to the list of maintainers displayed in AboutSystem.

waddlesplash removed some dead code from the Appearance preflet. (He also spent a significant amount of time reworking the Colors tab to hide most colors by default and pick them automatically instead, but that work was merged this month, not in March.)

OscarL adjusted some of Terminal's keyboard shortcuts in order to avoid conflicting with various command-line application shortcuts; specifically the shortcuts for tab switching and single-line scrolling.

OscarL fixed TextSearch's "Set target" file picker not opening when its last-set directory no longer exists.

axeld fixed FileTypes not displaying bitmap (non-vector) file icons in HiDPI mode.

PulkoMandy fixed WebPositive to allow selecting "full and half fixed" fonts as well as "fixed" fonts, for the monospace font option.

bitigchi adjusted BColumnListView to use automatic locale-aware formatting for sizes and dates, which affects a number of applications. He also made similar adjustments to pkgman and others.

### Command line tools

OscarL made the shell init scripts export the `XDG_STATE_HOME` environment variable.

PulkoMandy patched the new `ping` to only try and ping addresses on configured address families by default (i.e., don't try to ping IPv6 addresses if there is only an IPv4 connection available.)

### Kits

OscarL fixed some warnings in Interface Kit tests.

PulkoMandy fixed the build of the FFmpeg add-on with debug tracing enabled. waddlesplash fixed the calculation of framecounts when FFmpeg does not report a stream duration, and implemented passing packet metadata through from the demuxer to the decoder. PulkoMandy then upgraded the add-on to use FFmpeg 6.

korli fixed `timespeccmp` (a BSD compatibility routine.)

madmax removed some default values from an ambiguous method in `BFont`.

apl added some more tests to Locale Kit language code parsing.

X512 refactored parts of Package Kit to allow `BPackageResolvable` to be set to a parsed string.

### Servers

korli adjusted app_server to load all fonts and named-variants from a font file, as opposed to just the first one. (Some font files contain multiple variants in one, rather than splitting the variants across multiple files.)

OscarL fixed the "Right Option" key not being set to anything in a number of keymap files.

waddlesplash adjusted package_daemon to try and use the old activated-packages file's timestamp when naming the `state_` directory created from it. This should make the state times match the time the old state was actually made, rather than the time it was superseded, and thus make choosing an older state to boot from in the bootloader a much less confusing process.

### Drivers

waddlesplash adjusted how socket addresses are set inside the TCP module during binding, potentially fixing a rare assertion-failure KDL. He also added a missing return value check, based on an old patch from Gerrit.

korli fixed a logic error introduced in refactoring which led to TCP connections not being closed properly.

milek7 fixed some problems in the ACPI interrupt routing code (which were primarily affecting non-x86 platforms.)

PulkoMandy added a quirk to the USB HID driver to enable the 6th button on a mouse he's using.

### File systems

InfiniteVerma fixed error message printing in the `cat` command of `fs_shell`.

### libroot & kernel

PulkoMandy added a print to syslog in the unmount routine, to indicate which inode is still referenced when a volume can't be unmounted.

X512 changed the type of interrupt numbers used throughout the kernel to use `int32` consistently. (There was disparity between `int`, `uint8`, and `int32` previously.)

waddlesplash fixed an issue in `WeakPointer` that could lead to it making NULL dereferences, and subsequently simplified some code in the socket module.

Anarchos made `rename` of files to themselves succeed without trying to do anything (instead of returning an error.)

waddlesplash fixed some edge cases in the VFS around vnode creation as well as a reference leak of vnodes introduced in earlier refactoring, fixing problems with unmounts that had cropped up recently. He then added more assertions and cleaned up some utility routines for clarity and correctness. (The new assertions uncovered a problem in `fs_shell` that he then fixed.)

waddlesplash refactored behavior inside the VFS to have proper errors returned when trying to read and write to file descriptors that don't support seeking with file offsets specified, rather than silently doing the wrong thing.

korli implemented support for `DT_RUNPATH` in runtime_loader.

### Build system

kallisti5 updated some of the packages used to build Haiku, including gutenprint, FFmpeg, and others.

davidkaroly bumped the maximum GCC version that Haiku or its tools can be built with to 14.x.

### ARM & RISC-V

milek7 fixed some issues in some of the functions written in assembly for ARM64, stopping some registers from getting clobbered and thus fixing context switches. He also adjusted the instruction used for CPU idling, fixed some floating-point state changes, and implemented synchronizing the instruction cache.

kallisti5 added some more packets to the RISC-V build set, and bumped the versions of some others.

### Are we beta5 yet?

The milestone on Trac is down to 19 tickets, and one of those had a potential fix merged and is waiting for people to report back.

In the process of working on fixing memory leaks and closing out old Gerrit changes, I wound up trying to fix some in the Bluetooth modules... which turned out to be a much larger project than expected. On the plus side, once I finish with these refactors, the Bluetooth stack should be much more stable overall, potentially paving the way to bring actual Bluetooth functionality to Haiku besides simple device pairing...

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
