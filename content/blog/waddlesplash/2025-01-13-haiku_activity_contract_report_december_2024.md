+++
type = "blog"
title = "Haiku Activity & Contract Report, December 2024 (ft. Iceweasel)"
author = "waddlesplash"
date = "2025-01-13 23:30:00-05:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58369 through hrev58486.

<!--more-->

## Iceweasel

The biggest piece of news from last month is the arrival of "Iceweasel", a web browser built from Mozilla Firefox source code but without any official branding or registered trademarks, in the software depots (for x86_64 only, at the moment.) We've been "slow-rolling" the announcements on this one, in part because the browser was quite unstable at first and prone to cause kernel assertion failures on the nightly builds, but after a month of work it's in much better shape and is relatively stable.

There are still some kernel assertion failures that happen intermittently on the nightly builds with it (but not on beta5, as assertions are disabled there; you may get suboptimal performance or over-reservations of memory by the web browser processes, but the problems causing the failed assertions shouldn't be any more serious than that), and there are a lot of issues or missing features with the port itself still to resolve (e.g. WebRTC isn't implemented at all, pop-up windows/menus from browser extensions may not accept any mouse input, etc.), but these and other issues are slowly being worked on.

## Memory management changes

Motivated in large part by Iceweasel, I (waddlesplash) spent a significant amount of time in December (and still ongoing, in fact) working on various parts of the kernel virtual memory management facilities. Many of these changes were aimed at fixing problems exposed or suggested by investigating matters in Iceweasel and other memory-management-intensive tests, such as the Boehm garbage collector.

The changes in this area are probably too many (dozens) and too technical to reasonably detail all of them here (so check the commit logs if you're particularly interested), but among these are: optimizations to batch page writes in some cases, more safety checks in the area resize logic, removal of obsolete fields and comments, many fixes to memory reservation (commitment) behavior (especially in areas with per-page protections), more testcases in the test suite for corner-cases, better handling of reporting initially available memory, fixing of some softlocks that could occur on low-memory conditions, fixes to swap support, enforcement of more protection restrictions, major consolidation of page unmapping code from per-architecture files into architecture-independent files, and many more.

### Applications

nipos contributed a fix to Backgrounds to ignore color drops if the color picker is disabled.

apl did some significant refactoring to HaikuDepot's data models to pave the way for future improvements. He also adjusted the logic around package installation to report a "pending" state more rapidly, and hid the ratings UI when a package can't be rated for any reason.

PulkoMandy enhanced the Cortex "LoggingConsumer", a media node that logs details about whatever media buffers were sent to it, to report more details.

jscipione added back spacing at the bottom of the Expander main window. He also made some improvements to the font selection view in Appearance preferences, and nephele deleted some dead code from them as well.

jscipione made a number of changes to Tracker to fix "Escape" key behavior in file panels when "typeahead filtering" is enabled, and cleaned up the display of "selections" in the Find window. He made a number of coding style cleanups as well.

waddlesplash made a number of cleanups to the battery display in PowerStatus, making its display more intuitive and easier to tell at a glance what's going on when looking at it in Deskbar.

nephele made a number of improvements to the error log window in `mail_daemon`, such as support for dark mode and better scrollbar proportions.

jackburton79 fixed a potential memory leak on error and added some sane initialization defaults to Terminal.

humdinger made Sounds preferences remember the file panel location, and show only files and not folders in menus. He also added a mechanism to preview sound files in the file panel, and cleaned up a few of the names of notification sounds.

### Command line tools

waddlesplash (with some help from madmax) implemented `pkgman search -i --not-required`, a mode that shows only installed packages that are not required by any other installed package (i.e. "leaf" packages.)

kallisti5 adjusted the `route` command to accept an empty network address to mean "default", which OpenVPN uses to set up the default route.

### Kits

waddlesplash adjusted BTimedEventQueue (used for all audio output and other media operations on Haiku) to properly flush events on destruction, and a few other minor improvements.

waddlesplash adjusted the naming of the new `input_pointing_device_subtype` enum, which is used to report what kind of device generated pointer input events.

PulkoMandy implemented custom baudrates for serial output from the POSIX APIs all the way down into the USB serial driver.

nipos improved the legibility of text labels in the media controls display.

### Servers

X512 contributed changes to drop the legacy "2D acceleration" and batched-buffer-copies logic from app_server. This was not enabled (or even compiled in) for many years; it's obsolete even for the old hardware that supported these features (as CPU routines to do the same are faster much of the time anyway, it seems), and "modern" 2D-accelerated graphics just go through the 3D pipelines, so if app_server ever gained such code it would share practically nothing with these anyway.

jscipione redid the notification panel sizing to be properly font-size-aware. He adjusted the notification icons sizing in various servers as well.

### Drivers

korli fixed some problems with the handling of queue numbers in the `virtio-pci` bus driver, fixing a number of intermittent issues with virtio devices (they would sometimes fail to initialize, among other problems.)

waddlesplash sychronized the `realtekwifi` driver and WiFi stack with upstream FreeBSD, bringing in a number of bugfixes and other enhancements. He also tweaked the compiler flags to drop more unused or unneeded code at compile time.

waddlesplash restored the use of "uncached" memory for the ACPI module on x86(_64) by default, fixing boot failures on a few devices.

mtl1979 contributed checks to the usb_disk driver to return errors immediately rather than trying to read or write if there's a status of "no media present".

Lt-Henry added a new device ID to the Intel modesetting graphics driver.

PulkoMandy fixed some compiler warnings and enabled `-Werror` in various drivers. He also added more error checking to the PS/2 driver, to allow long timeouts to be avoided in another case.

waddlesplash fixed a race condition in the SCSI bus manager's (relatively new) request notification logic, and added some flags to make sure that we don't wait for memory in the critical path.

PulkoMandy enabled VESA BIOS patching (to inject more video modes) by default on hardware where it is known to work.

waddlesplash fixed a memory leak in the network stack when "raw" sockets were closed, and added an `ASSERT` that would have caught the problem.

### File systems

Jim906 contributed a fix to the FAT filesystem's entry-caching logic: previously, multiple instances of the same filename with different casing could wind up in the entry cache when the file was not present, but these weren't properly cleared when a file with one of those cases was created. Now, such incorrect "missing" entries aren't created at all, fixing some corner-cases around file copying in Tracker and allowing some FAT-specific code to be deleted.

waddlesplash moved handling of `open(O_RDONLY | O_TRUNC)` from filesystems into the VFS, and changed its behavior to return an error rather than truncating the file. What these flags specified together do is "undefined" in POSIX, but the Linux manpages ominously state "On many systems the file is actually truncated", and indeed on Linux, using this open mode actually truncates files most of the time! That's a rather surprising result, and there doesn't seem to be much reason to support it, so Haiku now does the saner thing and refuses to do anything in this case.

waddlesplash adjusted the filesystem query parser to not try to read the key size of invalid indexes in a corner case.

waddlesplash adjusted the filesystems logging during disk scanning and mounting to only print errors when a disk at least partially looks like a particular filesystem but is otherwise invalid, rather than printing a lot of noisy error messages for every failed identification. He also cleaned up some code related to initializing filesystems, and fixed the logic around initializing NTFS disks.

Jim906 fixed `file_cache_read` under userlandfs; previously it would return errors when reaching the end of files rather than handling them correctly.

waddlesplash added allocation of "scratch" buffers to the packagefs memory cache systems, avoiding frequent allocation and deallocation of temporary buffers.

### libroot & kernel

waddlesplash added a missing call to a base method in the `FileDiskDevice` class (used for handling files registered as virtual disks), fixing a file descriptor leak. He also cleaned up the code style a bit and fixed some minor TODOs while at it.

waddlesplash cleaned up some code in the "synchronous I/O" routines in the kernel (which are used when asynchronous I/O isn't possible at the lowest level), and fixed an assertion check that wasn't accounting for all possible error conditions, fixing some assertions when using files as disk devices.

waddlesplash fixed a bug in the logic that handled opening symlinks to nonexistent files with `O_CREAT` in the VFS. He also added a testcase for this and another related issue.

waddlesplash fixed some minor bugs in the "scheduling recorder" (kernel subsystem that records when threads are scheduled/descheduled, for performance analysis) and "DebugAnalyzer" (the GUI app that analyzes such reports).

waddlesplash fixed an unlocking-order problem in a VFS low-resource hook that occasionally caused kernel panics on high memory usage.

waddlesplash dropped the `*rand48_r` methods from `stdlib.h`. They're kept in `libroot` for ABI compatibility, but as they're nonstandard extensions provided only by glibc (not even the BSDs have them), we don't need to export them in public headers anymore.

waddlesplash renamed the `MoveFrom` primitive in the kernel `LinkedList` to be called `TakeFrom` instead. It doesn't have "move semantics", but rather appends the contents of the other list onto the current one, so we should avoid using the word "move" in such cases to avoid confusion.

waddlesplash adjusted `vfork()` to not call any fork hooks. (We don't implement a "true" `vfork`, but we can at least avoid doing most of the things that `fork` does in it, and we now do.)

korli implemented `pthread_getcpuclockid`, which retrieves a CPU time clock ID for a specific thread rather than a whole process.

waddlesplash enabled more `printf`-related warnings for bootloader code.

Anarchos contributed a change to increase the size of the memory region used for decompressing the boot tar archive, which is used when booting from certain types of media (like network devices).

### Build system

waddlesplash added some sanity checks to the core build rules to prevent setting of `ConfigVar`s with no value, and also to remove the `@profile` from `JAM_TARGETS` to avoid spurious warnings/errors later on.

kallisti5 added handling for ARM and RISC-V `HOST_CPU`s in the core build rules.

### Documentation

OscarL fixed a typo in the "Introduction to the `launch_daemon`" documentation.

jscipione added documentation for `BTextView::{GetFontAndColor,SetFontAndColor}`.

cafeina contributed documentation for `BShelf` and `BGameSound`.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible! Haiku, Inc. collected around $30,000 of donations in 2024; if we get even just that much this year, I'll be able to spend more paid time on Haiku without exhausting the Inc.'s funds too quickly.
