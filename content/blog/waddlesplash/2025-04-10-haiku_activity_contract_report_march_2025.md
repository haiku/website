+++
type = "blog"
title = "Haiku Activity & Contract Report, March 2025"
author = "waddlesplash"
date = "2025-04-10 23:20:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58697 through hrev58787.

<!--more-->

### Applications

jscipione did some minor code cleanups in Tracker.

humdinger added some more translator credits to AboutSystem.

OscarL adjusted ProcessController to display "system resources" before "caches" in the memory menu, making it much easier to understand what the numbers mean (and bringing it more in line with other items in the memory menu.) waddlesplash cleaned up the kernel memory accounting code in ProcessController to actually work properly, fixing some long-standing TODOs. He also did some other code cleanup around return types and string handling as well.

bitigchi made Terminal use the Unicode "multiplication sign" character instead of ASCII "x" in some more places (in the GUI).

AkashKumar7902 contributed a change to make the time tooltip on the seek slider in MediaPlayer display on hover, not just on drag. waddlesplash then made some more improvements to the tooltip to make it update much more smoothly. X512 added a "25% scale" video playback menu option.

apl merged a very large refactor of HaikuDepot to improve the application's performance and responsiveness.

### Command line tools

OscarL tweaked the `keymap` tool to show help with `-h`, and use `-H` for the "header" option instead.

humdinger rewrote `waitfor` to use a `BApplication`, and added an option to wait for the network being active.

### Kits

apl added a way to add and remove items from `BColumnListView` in bulk.

waddlesplash made some fixes to the tooltip management code, making it much more possible for controls specify specific tooltip positions and have them be respected. (This made the MediaPlayer changes work much more nicely.)

waddlesplash fixed a use-after-free discovered by the guarded heap in `BSlider`.

PulkoMandy added some missing macros to `elf.h` needed by WebKit.

### Servers

madmax fixed the build of the `test_app_server` setup after recent refactors.

korli fixed handling of failed condition checks in `launch_daemon`, implemented the "file created" event, and added support for "driver settings" file format for conditions (fixing some old bugs in the driver settings code along the way). He also fixed stopping services, and added some missing documentation comments.

nipos fixed some code duplication in `app_server` font rendering code.

madmax add some tests for `app_server` text rendering, and made some fixes to check glyph bounding boxes, correctly draw text with a clipping path, and text decoration lines being drawn with transforms.

augiedoggie added a `syslog_max_history` option to the kernel settings file, to control how many old syslog files are kept: the default is 1, but that default can now be increased if you want to keep more old syslogs.

### Drivers

waddlesplash merged changes to the `iaxwifi200` driver (`iwx` on the BSDs) from OpenBSD to add support for another device.

waddlesplash merged changes to the `atheros813x` ethernet driver from upstream FreeBSD to fix operation on some newer devices.

waddlesplash tweaked the SCSI bus and drivers to use `NotifyOne` not `NotifyAll` on its condition variables. (This doesn't change behavior, because there's only ever one waiter on these variables, but it's important to be clear here because some other threads may destroy the variable immediately after being woken up.)

waddlesplash cleaned up the interrupts glue code in `ralinkwifi`, potentially fixing some bugs. He then imported a driver for `MT7601U` devices from FreeBSD, however it isn't clear if this driver actually works properly on Haiku yet.

waddlesplash added some logic to `ram_disk` missed in recent refactors, and fixed a hang in its "TRIM" routine.

korli implemented "autonomous power save" in `nvme_disk`, reducing power usage by ~1W on one of his systems.

X512 made some changes to input drivers to allow `input_server` to actually be interrupted/restarted.

X512 made the `framebuffer` driver not attempt to map the whole PCI BAR, but only just enough for the framebuffer itself. (This was a holdover from the VESA driver, which does want to do that for various reasons, but the dumb framebuffer driver should not.)

### File systems

waddlesplash added checks, first to `devfs` and then to many other filesystems, for the `O_DIRECTORY` flag on opening files, fixing `cp file /dev/some/block/device` among other things.

Jim906 contributed a patch to handle stale inodes much better in the NFS4 (client) driver, fixing a number of common kernel panics it caused, and also made inode fetching allowed to fail for removed nodes and fixed a locking problem in the read routine, fixing more kernel panics. He also wrote a number of debug output routines to help with diagnosing problems in the driver.

### libroot & kernel

waddlesplash refactored the kernel `Thread` structure to use the standard linked-list template classes, instead of manually managed ones, and switched it to use doubly-linked lists instead of singly-linked ones, making removals of thread structures O(1) instead of O(N). He also fixed a bug that was preventing correct `time` accounting for living child teams, a small memory leak in a corner case in thread destruction, and a TODO about when IDs wrap in `get_next_thread_info`.

waddlesplash made the `mutex_destroy` "not owned" assertion print a backtrace of the actually owning thread automatically.

waddlesplash added another invocation of `cpu_pause` in a spin loop in the condition variables code, to avoid burning CPU cycles unnecessarily.

waddlesplash adjusted the generic `memcmp` implementation to compare `size_t`s (which are 64-bit on 64-bit architectures) instead of `uint32_t`s, added the same multiple-bytes optimization to `strncmp` as `strcmp` already had, and avoided unnecessary subtractions in `memcmp`, `strcmp`, and `strncmp`.

waddlesplash cleaned up a lot of file organization and build rules for the "strings" code (`memcmp`, `strcmp`, etc.), especially the architecture-specific files. He then rewrote the generic `memcpy` and `memset` implementations (applying more optimizations to `memset` in particular), made the generic versions always used in the bootloader, and replaced the homegrown x86 `memcpy` and `memset` assembly implementations with NetBSD's (which seems to have been the upstream for FreeBSD and others.) (The homegrown x86_64 `memcpy` and `memset` appear to be better optimized than any of the BSD's implementations, so they remain as-is.)

waddlesplash fixed a race condition in the new FIFO implementation, fixing some lock-related KDLs. He also added an assertion to the common locking code that would've made the problem easier to find.

waddlesplash fixed `write()` in libroot not handling values outside the 32-bit range properly on 64-bit architectures, and also fixed displaying such large values in `strace` properly (for all syscalls that return `ssize_t`, not just `read` and `write`, too.)

waddlesplash made a number of fixes to FPU context state handling in the kernel on x86_64, including resetting the state properly on all thread entries, storing the userspace FPU state in the kernel thread structure instead of the kernel thread stack (which is also a small performance optimization), sending the proper `FPE_*` code corresponding to faults with `SIGFPE`, properly handling control words on context switch, and more. This fixes a number of corner-case KDLs and application crashes.

waddlesplash adjusted the kernel to not report protection flags for kernel areas to any user except root, so that ProcessController can be sure it can make use of them. He also fixed the slab memory manager (which backs the kernel `malloc` and `object_cache`s) to report its areas as writable (which they always are), which fixes the memory counts for the kernel in ProcessController.

waddlesplash renamed many of the basic interrupt functions in the kernel to use "intr" (if not "interrupt") rather than the abbreviation "int", which could be confused with "integer". (BeOS used "interrupt", the abbreviation "int" was a holdover from NewOS.)

waddlesplash fixed "LA57" (5-level paging) mode support in the kernel to properly free its page tables, which were previously getting leaked. (There are some users running Haiku in KVM on systems with LA57 support now, so it's more important that this works than it was a few years ago.)

waddlesplash fixed a deadlock reported by korli in the filesystem caching code related to page wait behavior (found by running the `gVisor` tests on Haiku.)

waddlesplash improved handling of invalid pointers in the guarded heap, printing more verbose messages for them instead of just "generic segfault".

waddlesplash made `dup3` return `EINVAL` if the old and new file descriptors are the same, bringing it in line with POSIX.

waddlesplash added `qsort_r` to libroot (it's in the newest version of POSIX.)

waddlesplash did a large number of cleanups to the remaining `glibc`-derived code in libroot (and also the legacy `libstdc++`): dropping private definitions from public headers, removing functions already defined elsewhere, deleting unneeded files, replacing more files with musl or BSD equivalents, adding the `stdio_ext` routines as found in musl and elsewhere (and needed by Gnulib after the removal of the private definitions), dropped many unused math files, dropped glibc locale structures and made it interface with Haiku locale structures directly, and much more.

waddlesplash upgraded `getopt` to the version found in glibc 2.41.

korli fixed the kernel `vsnprintf` to correctly print fractions smaller than `0.1`.

korli fixed the `create_dir` syscall to return `EEXIST` if a node already exists, before `EROFS`.

Anarchos made some improvements to the bootloader menu for PXE boot, displaying "Network" as the boot method, displaying the IP address of the boot volume, etc.

### Build system

waddlesplash fixed a build regression on macOS by disabling some unneeded code on all platforms but Haiku in the Support Kit.

waddlesplash fixed the libroot stubs generator (a rarely-used tool that regenerates some files needed for bootstrapping) to work on Python 3.

korli made some minor changes to fix warnings from AddressSanitizer.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
