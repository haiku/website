+++
type = "blog"
title = "Haiku Activity & Contract Report, February 2023"
author = "waddlesplash"
date = "2023-03-11 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56748 through hrev56803.

<!--more-->

### Applications & Command Line Tools

PulkoMandy fixed DeskCalc to update button colors "live" from system colors.

Jim906 made the webpage icons in WebPositive draggable into file manager windows (and other applications) as bookmarks.

nephele fixed Mail to respect the system text and link colors.

waddlesplash made `fstrim` pretty-print the trimmed size instead of only showing a raw byte count.

korli implemented some more common features in `setvolume`: automatically unmute when increasing volume, mute at the minimum volume, and don't decrease volume when muted.

waddlesplash made Deskbar's main window (which of course has no titlebar)'s name never be translated, even when "Translate application names" is enabled in Locale preferences. This works around a long-standing bug where, if the feature was enabled, various Deskbar replicants would fail to load, or display as a non-functioning "?" icon. The real solution will require changing `BDeskbar`'s API, which is under discussion on the bug tracker.

n0toose cleaned up setting of status messages in Installer.

### Drivers

OscarL fixed the build of the `acpi_lid` driver and fixed a potential memory leak. (which is currently not included in builds and is unused). He also fixed the status updating logic of the `acpi_ac` driver.

waddlesplash fixed the reporting of the trimmed data size in the `nvme_disk` driver. Previously it trimmed data correctly, but reported a much smaller size than was actually trimmed.

waddlesplash fixed the `B_GET_GEOMETRY` and `B_GET_BIOS_GEOMETRY` ioctls of the `remote_disk` driver following an earlier refactor.

waddlesplash made Package Kit's decompression code use an `object_cache` for allocations in kernel mode. This makes a pretty significant difference in time spent in this function during startup; in testing it seemed to be a >5x speedup, reducing time spent from over half a second to about 1/10th instead. (This path is hit every time packages are accessed, not just during boot.)

waddlesplash synchronized the `idualwifi7260` and `iaxwifi200` drivers with upstream OpenBSD.

### Servers

dcieslak reworked locking for application-level font managers in `app_server` and fixed some logic errors.

madmax also fixed the build of `test_app_server`, the harness to run `app_server` in a window for testing purposes, for working on the previous changes. He also fixed the lifecycle handling of `FontStyle` objects within `FontManager`s, fixed FreeType error handling, and over the course of the month, performed many other clean-ups and refactors to this code. As a result, the app_server crashes triggered by the most recent version of WebPositive on nightly builds should be completely fixed.

kallisti5 fixed some pointer logic in `index_server`.

Jim906 fixed `mount_server` to actually remember whether a partition was mounted read-only or not.

waddlesplash made the "application crash" dialog of `debug_server` appear above all other windows, so it cannot be accidentally "lost".

### File systems

PulkoMandy reworked the old "googlefs" to be just "websearchfs". (This special filesystem runs internet searches for "Queries".) It still is not included in default builds, however.

PulkoMandy refactored XFS on-disk-data handling to fix a lot of warnings and potential problems, and then enabled `-Werror` for the whole driver.

waddlesplash fixed a corner case in BFS' trim logic, which previously could have missed trimming the final "range" of a partition.

waddlesplash removed some old logic and files to run certain filesystem drivers on BeOS (which was long since useless, as the drivers had been adapted to Haiku's own filesystems API.)

### Kits

PulkoMandy fixed handling of big-endian bitmaps for control icons in `BControl`. He also removed deprecated constructors from `BMenuField`, and added a missing constructor variant for layout mode.

### libroot & kernel

davidkaroly added `crypt_r` to libroot, which is needed by some ports. He also replaced the legacy `crypt_des` implementation with that of musl's. He also removed an unnecessary abstraction to clean the code up further.

waddlesplash renamed some legacy driver hooks for clarity's sake. He also removed an old sizing hack from the VFS layer, reworked the `libroot_build` I/O around `readv`/`writev`, and implemented the BSD extensions `preadv`/`pwritev` (just a wrapper around our own extension functions, `readv_pos`/`writev_pos`.)

vaibhavg20comp (a new contributor, welcome!) implemented `cfsetspeed`, a BSD extension to `termios`.

waddlesplash reworked `netdb.h` to have much fewer non-standard functions, dropped unused/unimplemented definitions, and other cleanup. (The functions which are still implemented were not removed from the ABI, preserving compatibility with older Haiku and, in some cases, BeOS' BONE.)

waddlesplash replaced the `ports` and `services` files, needed for implementing some functions in `libnetwork`, with the OpenBSD versions instead of the NetBSD ones we were using. These files are much smaller, they don't have the "kitchen sink" of all network services and ports but merely what is actually needed by the applications which use these APIs.

waddlesplash changed the kernel's virtual memory manager to prohibit memory-mapping with negative offsets. (Previously this behaved erratically or caused kernel panics.) He also added some simple tests for this and other `mmap`-related behavior to the testsuite.

### Build system

jessicah added the `zstd_devel` package to the `Development` set, as it is now needed for building Haiku.

kallisti5 dropped the old device-tree files from the tree, as these are now unneeded as modern u-boot/EFI will pass the device-tree to the booting operating system directly in most cases.

PulkoMandy dropped some Jam rules for mathematical computations which were mostly unused and just cluttered up the Jam ruleset (and probably made compilation slower as they had to be parsed every run.)

### Documentation

PulkoMandy wrote up some internals documentation about the standard C library portions of `libroot`, and the behavior of `features.h`.

waddlesplash updated the Doxygen used for generation of the Haiku Book to 1.9.6, and enabled the internal search engine.

nephele implemented "dark mode" for the Haiku Book, and added new CSS for styling the search results pane.

### HaikuPorts

TeX Live, TeXStudio, and LilyPond are now available in the repositories.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!

As for what's next: I intend to continue looking at various minor/moderate issues around the system which have stacked up or otherwise seem to be a nuisance; there are some reports of whole-system hangs I hope to investigate this month, for instance. After that, we shall see, but I have a few ideas in mind...
