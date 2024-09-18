+++
type = "blog"
title = "Haiku Activity & Contract Report, August 2024"
author = "waddlesplash"
date = "2024-09-17 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57901 through hrev58042.

R1/beta5 was of course [released](https://www.haiku-os.org/news/2024-09-13_haiku_r1_beta5/) just a few days ago, and many (though not all) of the changes in this report made it in to the release.

<!--more-->

### Applications

madmax fixed a crash in AboutSystem caused by an incorrectly added copyright entry.

apl made a number of refactors to HaikuDepot's code, including to the language model, path handling, package data fetching, the display of publishers, and more.

nipos and nephele submitted fixes to the ColumnListView, Debugger, WebPositive, ResEdit, FontDemo, Cortex, Sudoku, and more to remove hard-coded colors and make things look better in "dark mode". (They also adjusted the computation used in Appearance for some colors in "dark mode" to make them fit in better.)

waddlesplash fixed the disassembler used by Debugger to handle addresses coming from registers in address computations (and submitted the fix upstream, as this is a third-party library.)

jscipione adjusted Tracker to repopulate menus when entering or leaving volumes, and to properly enable and disable some items in the "New" menu whenever menus are updated. He also fixed the "Copy" and "Cut" actions to not alter the selection (and fixed some other issues around Move and Copy, related to redraws), fixed some issues with colors in the "Open with..." window, and made drag-and-drops from virtual folders create symbolic links (instead of copying the underlying file.)

humdinger fixed some bugs in Tracker relating to the naming of duplicating or creating new files, including around locale awareness. He also added an option to create a "New template folder".

humdinger tweaked some GUI strings in various applications.

CalistoMathias (a GSoC '24 student)'s changes to implement basic folder filtering in Tracker queries were merged (however, this was done after the beta5 release was branched, so this feature isn't in the release.) jscipione later came by did a few cleanups to it.

nephele fixed the build of "Switcher".

OscarL fixed Clock to ensure that the first draw uses the current time (not some default time.)

jscipione fixed status icons not appearing in the "Modifier Keys" window in Keymap.

### Command line tools

waddlesplash added logic to `profile` to report the count of events dropped by the system profiler.

mmlr added an argument to `package_repo`'s "update" command that allows it to be used in an environment where not all packages in the repository are locally present (e.g. they might be stored in S3 buckets instead.)

### Servers

madmax added some missing locks of the font manager to app_server, and fortified the logic around addition and removal of fonts. He also fixed the font manager to not scan all directories twice on startup.

waddlesplash fixed a (probably harmless) broken timeout computation in app_server (uncovered in the process of working on the kernel timers change mentioned below.)

jscipione fixed window tab invalidation logic in app_server, fixing some very old "tab still appears after being removed from the stack" redraw glitches.

waddlesplash fixed a number of time computation bugs in the media mixer (uncovered by the `BTimeSource` assertions change mentioned below), which fixed many (if not most or all) of the cases of the "no audio immediately after boot, only some time later" bug. He also improved its event scheduling efficiency, fixed some of its logic around disconnecting/reconnecting to outputs, and fixed some crashes in the multi-audio node caused by certain audio devices reporting invalid control types. (He also experimented with adding logic to switch sound outputs without restarting the media services, but this doesn't work quite yet.)

waddlesplash added a check in registrar that clipboard download messages are sent properly, and added error handling for when they don't. (This, along with a corresponding change in `libbe`, fixes some application hangs on low-memory conditions when there's an especially large clipboard.)

madmax added some checks in input_server to avoid invalid mouse settings files causing the mouse to not work at all.

waddlesplash moved some of the font-management code around in `app_server` to avoid unnecessary waits for the font manager's thread during startup, when possible.

PulkoMandy and X512 fixed a conflict between the "power" keycode and the Japanese `\_` key, and adjusted the keymap documentation.

waddlesplash changed Debugger to not query the Package Kit in non-interactive mode at all (and fixed some other bugs, in Debugger and the Package Kit, related to this that were causing crashes or even hangs in various circumstances.)

mmlr fixed a use of uninitialized memory in the DHCP client (discovered by using the guarded heap.)

### Kits

Zardshard made a change to have BBitmaps with the `ACCEPTS_VIEWS` flag set not be cleared automatically, fixing a compatibility issue with BeOS (as well as making the use of such bitmaps more convenient in multiprocess applications like WebKit.)

waddlesplash added an assertion in `BTimeSource` in the Media Kit to prevent applications and services from trying to publish times with "drift" factors of 0. The "drift" value is used as a multipler and a divisor to correct for time/clock drift, so a value of zero (or negative) produces broken results. This was uncovered by the kernel timers change mentioned below, and it in turn uncovered more bugs in the media add-ons code.

waddlesplash fixed an API compatibility regression in `BListView` that was causing stack overflow crashes on drag-and-scroll in certain applications (like WonderBrush). jscipione adjusted `BListView` to not update selections on mouse up when dragging.

PulkoMandy fixed `BMenu` to draw checkmarks properly on matrix-layout menus.

### Drivers

waddlesplash implemented receive checksum offloading for IP, TCP, and UDP in `virtio_net`, and fixed some logic and buffer sizing errors in the driver as well.

korli added definitions and logic for "SuperSpeedPlus", a revision of USB3 that allows for 10 Gbps connections.

waddlesplash revised some of the out-of-order ACK logic in the TCP module, adjusted some debugging code to help with diagnosing some intermittent KDLs that some users have reported, and tweaked the window-update sending logic to avoid sending window updates unnecessarily. This was all in preparation for the implementation of dynamic receive window sizing, which was also merged last month (along with related fixes to the round-trip-time calculation), resulting in massively improved TCP throughput (as much as 10x or more depending on the connection.) Users who have previously seen slow download speeds on Haiku over long-distance connections should see very significant improvements now.

waddlesplash cleaned up some code and constants around ethernet MTUs, fixing some incorrect sizing in a few places. He then disabled MTUs larger than the ethernet maximum, as these aren't handled properly at the moment and just caused traffic loss. (In order to handle these properly, we need to implement "Path MTU Discovery", which at present we don't.)

PulkoMandy fixed boundary checks and adjusted read/write logic in the "Enhanced" (generally ACPI) PCI bus's configuration space code, to resolve "boot failure" regressions following the PCI refactors.

waddlesplash turned down some tracing constants to avoid syslog spam in some drivers.

waddlesplash fixed some bugs in the allocation of DMA buffers for FreeBSD/OpenBSD network drivers. He also fixed an incorrect buffer size in the receive path, which was a recent regression that was causing certain drivers not to work at all on some hardware.

waddlesplash made some slight efficiency improvements to the NVMe driver.

PulkoMandy updated ACPICA to a version from this March, and fixed a few minor issues in our code that interfaces with it.

waddlesplash cleaned up a variety of code related to ancillary data in the UNIX domain sockets module, and fixed some minor memory leaks in the network stack related to it. He also fixed a relatively rare KDL that sometimes happened when closing such sockets.

### File systems

waddlesplash unified some previously duplicated code between `ramfs` and `ram_disk`, made a few minor adjustments for efficiency, and then fixed it to allocate "cleared" pages. This fixes a violation of the POSIX specification that Clang depended on when working with memory-mapped files off `ramfs`. He also cleaned up and unified some code, adjusted the memory reservation priority (to avoid whole-system hangs on low-memory conditions), and fixed some missing sets in `ramfs` that were leading to KDLs.

waddlesplash added some more locking assertions to packagefs (and fixed the minor bugs they uncovered), and then added better diagnostic messages for the case where conflicting packages are requested to be mounted.

Jim906 fixed the initialization of media bytes in the FAT driver, made a change to speed up mounting of large volumes, and fixed errors in the handling of volume labels.

waddlesplash turned a kernel panic in the common query parser into a properly reported error.

waddlesplash started cleaning up the use of memory arenas (`object_cache`s) in packagefs, in preparation for changes reducing its overall memory usage.

### libroot & kernel

waddlesplash cleaned up some of the code in `WeakReferenceable`, an intrusive reference-counting class that allows for "weak" references.

waddlesplash cleaned up some logic in the kernel thread code to not rely on certain return values to cancel timeouts (though this change introduced a regression that wasn't fixed till this month.) He also fixed the scheduling of "absolute-real-time timeouts"; timeouts that have a time relative to the real time clock (instead of the system uptime clock.) These had previously only worked by chance (and probably in some cases would've gotten stuck for longer periods of time than they should have randomly). He performed some cleanups of the timer code at the same time.

waddlesplash fixed a check in the kernel's user-debugger code (the kernel interface used by the Debugger application) that was leading to whole-system hangs when the `debug_server` crashed or hung in certain circumstances (such as low memory.)

waddlesplash added some more sanity checks in the VFS to catch misbehaving filesystem drivers earlier, rather than causing cryptic KDLs later.

waddlesplash added a new mode to the "boot profiler" to allow the `scheduling_recorder` to capture the boot process, allowing thread latencies and lock contention during it to be analyzed. (He also fixed some other miscellaneous issues surrounding this feature in the various tools related to it: scrollbars in DebugAnalyzer, kernel permissions in `transfer_area`, etc.)

waddlesplash removed an unneeded scan of the SCSI bus and drivers from the device manager, reducing boot times somewhat.

waddlesplash fixed a major oversight in the kernel's `IORequest` API that was leading to mixups between the total size of a request and the last offset it transferred (i.e. the starting offset plus the total size.) This was leading to buffer overruns in the file cache, causing KDLs and other problems with cryptic errors about page structures. (He later added more assertions to the page code to catch misuses of the page structures like this more easily in the future.)

waddlesplash added an assertion to the kernel's interrupt handling logic to catch a bug in VM integration driver, and some checks in the global areas tree to catch duplicate area IDs.

waddlesplash fixed a bug in the `kqueue` implementation that was leading to `libevent`'s `kqueue` backend hanging on startup.

waddlesplash made a change to the kernel on 32-bit x86 to report syscall return values to `strace` more correctly (however, it wound up introducing a bug that caused intermittent crashes of many applications which wasn't discovered and fixed till near the end of the month.)

waddlesplash fixed some crashes in `runtime_loader` that could happen when not all the dependencies of a dynamically-loaded library were present. He also fixed some reference counting and cache management bugs between `ramfs` and the kernel VFS. (These two issues were uncovered by the unstable, experimental port of Firefox.)

waddlesplash renamed some architecture-specific functions introduced on x86 to have more generic names, as they're now declared and used on other architectures as well.

waddlesplash cleaned up some BeOS compatibility code in `libnetwork`, and adjusted things so that it's not even compiled in on most architectures.

waddlesplash implemented the one portable case of `mknod`/`mknodat` (the one where it's equivalent to `mkfifo`), as defined in POSIX.

mmlr made some fixes and cleanups to the guarded heap in `libroot_debug`, allowing it to be used in more scenarios (potentially on the whole system at once.)

### Documentation

waddlesplash adjusted the definition of `B_INFINITE_TIMEOUT` to make clearer that it's `INT64_MAX` (and cleaned up some code related to it.)

humdinger added a section to the HIG on "Recently Used Files".

waddlesplash renamed the "Release Milestones" developer documentation page to "Release Cookbook", which was what it used to be called when it was on Trac (and more accurately reflects what's in it.) He then updated some of its sections for clarity.

### Build system

X512 submitted a patch to put each build target on a separate line, in large part to make rebases and resolving merge conflicts in these files easier.

PulkoMandy, waddlesplash, and kallisti5 upgraded Haiku and its dependencies to be built against OpenSSL 3, Python 3.10, and a variety of other newer versions of standard packages.

PulkoMandy added a missing include of `<features.h>` in `<sched.h>`, to allow applications to use its extra features without needing to define any extra preprocessor macros.

waddlesplash updated the "WebPositive bookmarks" files, fixing some bugs in their redirections.

korli added the `linprog` library headers to the `haiku_devel` package. jmairboeck fixed some typos in comments in various compatibility headers, and waddlesplash fixed a C89 compatibility issue in one.

jscipione updated the size of nightly images to 650MB, so that there's a bit more free space available.

waddlesplash made a variety of changes around the tree and the build system to get Clang builds much closer to a working state again (and also cleaned up some code while at it.)

### ARM & PowerPC

zeldakatze fixed the text console in the OpenFirmware bootloader.

archeYR fixed the ARM kernel arch code to use the correct instruction for CPU idling.

oanderso fixed some bugs with cache and MMU maintenance in the ARM64 bootloader, allowing the boot to get into the kernel under virtualization on the Apple M1, then fixed the kernel timer code to work in a virtualized environment, and started making changes and implementing missing features in the MMU code.

### That's all, folks!

August was quite a busy month! Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible.
