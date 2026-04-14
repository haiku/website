+++
type = "blog"
title = "Haiku Activity & Contract Report, March 2026 (ft. ARM64)"
author = "waddlesplash"
date = "2026-04-13 22:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59431 through hrev59569.

<!--more-->

### ARM64

The biggest news this month is probably all the work that's been done on support for ARM64, largely thanks to contributors smrobtzz and SED4906!

smrobtzz contributed the bulk of the work, including fixes for building on macOS on ARM64, drivers for the Apple S5L UART, fixes to the kernel base address, clearing the frame pointer before entering the kernel, mapping physical memory correctly, the basics for userland, and more. SED4906 contributed some fixes to the bootloader page mapping, and `runtime_loader`'s page-size checks.

Combined, these changes allow the ARM64 port to get to the desktop in QEMU. There's [a forum thread](https://discuss.haiku-os.org/t/my-haiku-arm64-progress/19044), complete with screenshots, for anyone interested in following along.

### Applications

jscipione fixed a number of problems in Tracker, including problems with backgrounds, redrawing, Trash visibility, error checks, and more. nathan242 fixed a crash when cancelling empty-trash operations, problems with selected number formatting in the status view, and windows coming to foreground when not dragging. madmax fixed live updating of addon shortcuts.

mohammedrattia (a GSoC '26 prospective) fixed an inefficiency TODO in MediaPlayer's I/O code.

humdinger implemented "labels" in Mail, complete with a "Label as" addon in Tracker. Previously, only "status" could be used to set a custom label for emails, but that wasn't quite correct as this is usually a fixed field in IMAP. The new "label" system is stored locally only, and not sent to the server.

OscarL added better handling for unnamed thermal data sources in ActivityMonitor.

YashSuthar983 (a new contributor) implemented a "barber pole" animation for downloads of indeterminate sizes in WebPositive.

nipos fixed WebPositive to not reopen the last tab on next startup when it's deliberately closed to exit WebPositive.

Aquamatic123 (a GSoC '26 prospective) implemented "Order by Bus" sorting in the Devices application.

jackburton79 added a missing initialization of the cursor foreground color in Terminal's replicant mode.

### Command line tools

waddlesplash implemented support for automatic cleanup of old package states in the Package Kit, and made `pkgman` offer to do this after all installs, updates, or uninstalls. The cleanup will only remove states that are at least 30 days old, but will also keep at least 10 states even if some (or all) are older than 30 days. This should hopefully provide a good balance between disk space usage and "revert-ability". (SoftwareUpdater doesn't do this yet; ideally that will be implemented too, perhaps done by default without prompting but with a persistent setting to disable it, for users who want to keep more states than that.)

### Kits

waddlesplash refactored `BBlockCache` (a memory-caching class used by `BMessage` and others), `BTokenSpace`, and `BLooperList` to use lighter locks, removing the need for some semaphores and improving performance.

waddlesplash marked a few deprecated functions (in `BMimeType` and `BResources`) with the new `_DEPRECATED` macro, which sets a function attribute that causes compilers to emit `-Wdeprecated` when they're used.

KapiX refactored the Support Kit's tests, modernizing them and making it easier to write new tests.

X512 optimized the `BView::{Fill|Stroke}Polygon` that takes an aray of points.

Horizons (a new contributor!) fixed SSL certificate validation in `BSecureSocket`.

X512 fixed a number of incompatibilities in the BPicture format vs. BeOS R5's, including BBitmaps, font shear, subpictures, and more.

nipos changed scrollbars to have a fixed minimum size, and not to scale smaller even if the font size would indicate it.

waddlesplash optimized some BString `Find` methods to use some C `mem` routines rather than naive loops (and madmax came by later to fix some logic errors in the optimizations.)

### Servers

Goldfish64 fixed app_server passing the wrong hardware cursor size to accelerants.

vighnesh-sawant (a GSoC '26 prospective) fixed "inquiry result" message processing in the Bluetooth server when devices send multiple responses (which the Bluetooth specification permits.) He also implemented support for more kinds of "inquiry result" messages, implemented support for basic pairing, fixed duplicates in the remote-devices list, and more.

mohammedrattia cleaned up one of the local-device lookup functions inside the Bluetooth server. He also fixed the build of a Bluetooth test.

shivamsinghydv added checks that devices have valid addresses mefore marking them active in the Bluetooth server.

waddlesplash introduced support app_server (and the Game Kit) for accelerants that have their framebuffer mapped in user space only, and switched the framebuffer and VESA drivers to use this model. (Eventually, all drivers should be switched to use this model, as it's a relic of the '90s we certainly don't need to keep...)

### Drivers

Goldfish64 continued work on Hyper-V support, including the Hyper-V mouse, heartbeat support, time synchronization, the SCSI controller, and more (including all the prerequisites for these features).

OscarL fixed a debug print in the AMD P-states driver, and fixed the build of the HDA driver with more tracing disabled.

smrobtzz fixed a bug in the generic USB ethernet driver that was causing some devices to hang when fetching their MAC address.

smrobtzz fixed the remaining bugs in waddlesplash's work-in-progress changes for USB ethernet drivers in the FreeBSD compatibility layer, allowing those changes to be merged (bringing in more support for ASIX USB Ethernet adapters.)

### File systems

waddlesplash fixed a missing lock in BFS that was causing assertion failure (or even use after free) KDLs on concurrent deletion of files.

anujbillore-0-0 (a GSoC '26 prospective) added some missing checks to the BTRFS implementation, including for hash collisions in directory lookups.

nathan242 removed the I/O scheduler from the RAM disk driver, and made it handle I/O requests directly instead. This fixes some out-of-order operations that can potentially happen when the disk block size is larger than the filesystem block size, which is often the case under the RAM disk (this is due to a bug in the I/O scheduler which is being worked on separately.)

sleipbyte added some new feature flags to the XFS driver.

### libroot & kernel

waddlesplash refactored how some bookkeeping data structures for userland mutexes are allocated in the kernel, making failures less likely or easier to recover from.

korli fixed some problems with symlinks to non-existent directories: they need to be handled specially when creating files. (This was discovered running the Golang test suite.)

korli fixed an inconsistency with buffer size handling in the network stack. (This was also discovered by the Golang test suite.)

waddlesplash replaced `strchr` and `strcpy` with musl's (more optimized) versions.

waddlesplash and SED4906 fixed some races in the x86 global TLB invalidation routines (it's not clear if these would've actually been a problem without some features that we don't enable yet.)

waddlesplash did some major overhauls of the SMP message logic (which is used by the kernel to communicate between different cores/threads of a CPU, which is used to implement a lot of basic primitives), to reduce lock waits (using `rw_spinlock`s instead of regular spinlocks), avoid broadcasting messages to all cores if we can send them to specific cores, process a message for the current core while waiting for it to be processed on other cores, avoid unnecessary messages and atomic operations, and more.

waddlesplash enabled some select compiler builtins (e.g. `memcpy`) in the kernel. Normally, the kernel uses no compiler builtins as it's compiled with `-ffreestanding` (which tells the compiler that we aren't in a standard userland environment with a C library), but a lot of the builtin functions allow the compiler to optimize the code better. So, other projects (e.g. Linux, FreeBSD) that use `-ffreestanding` use special headers to re-enable the use of builtins and thus the optimizations that come with them; and now we have started to do the same.

Goldfish64 fixed IO-APIC initialization on some PCIe systems (a refactor for Hyper-V support had exposed some problems with it.)

waddlesplash fixed a crash when trying to use the guarded or debug heaps in libroot, which was due to locale initialization order changes.

waddlesplash's refactor of swap commitments (done a few months ago) was merged, improving system stability and performance in conditions where swap is in use. He also cleaned up some permissions and memory protection checks in the kernel, and refactored how committed-size storage is handled across VM objects to fix some TODOs and inconsistencies.

waddlesplash refactored how the kernel heaps are created and initialized, to allow the debug or guarded heap to be set at boot time (either via the bootloader or the kernel settings file) on all nightly builds, instead of requiring a custom build to be made to use these heaps. This will allow them to be enabled easily by users in testing various bugs; and indeed, they've already proven valuable in diagnosing a few different problems.

waddlesplash fixed a number of race condition problems between VM cache operations and filesystem I/O that led to deadlocks, by refactoring a number of routines. (He also added a testcase for the problems.)

waddlesplash fixed a few `kqueue` incompatibilities, including that FD closure was reported instead of being silently discarded.

madmax fixed blocklisting files that contain spaces in their names in the bootloader.

waddlesplash renamed `PTHREAD_RECURSIVE_MUTEX_INITIALIZER` to correctly have `_NP` in its name (same as glibc and others do), as it's non-POSIX.

### Build system

fruitdelapassion enabled `-Werror` for more drivers.

humdinger added `disroot.org` as a predefined email provider.

nephele fixed the build of libroot under Clang.

waddlesplash eliminated the need for a lot of userland to include kernel headers.

### Documentation

cafeina added documentation for `BCertificate`, `BProxySecureSocket`, `BSecureSocket`, and `BSocket`.

OscarL improved the clarity of one part of the Device Manager documentation.

waddlesplash removed some obsolete VM documentation, and updated the documentation for the swap implementation.

### Are we beta6 yet?

Not quite. There are a few bugs in WebPositive, among others, that are still blocking starting the release process... but a number of the other regressions have now been fixed, at least.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
