+++
type = "blog"
title = "Haiku Activity & Contract Report, July 2024"
author = "waddlesplash"
date = "2024-08-12 23:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57802 through hrev57900.

<!--more-->

## Performance improvements: elimination of various bottlenecks

The major item I spent the most time on last month was general system performance and stability. This involved a number of changes to the kernel as well as to various parts of userland that pretty much all applications use in one way or another.

### True vectored I/O for non-cached reads/writes to disk devices

In addition to the standard `read` and `write` I/O calls, there are also variants called `readv` and `writev` which accept arrays ("vectors") of buffers (with possibly varying sizes) to read and write from all at once. Of course, `readv` and `writev` can be implemented in terms of standard `read` and `write` just using a loop, and for the most part that's what the default implementation in the kernel did. Most of the time, this was fast enough, because most reads and writes are backed by the "file cache", and as such means the read or write is just a simple memory copy (and the real I/O is done much later.)

But for reads and writes to actual disk devices, there isn't any caching, so reading and writing multiple buffers separately rather than all at once incurs a lot of overhead. The "file cache" itself did proper "vectored" I/O, but all reads and writes outside of file data (most notably the "block cache", which a number of filesystem drivers, including BFS, use for handling inodes and the journal) did not.

Fixing this was relatively straightforward, requiring only a few changes: just adding a "bypass" mechanism into the kernel's vectored I/O routines to allow them to use the same mechanism the "file cache" does to read and write data when the target is a disk device, and making sure the BFS journal and then the block cache actually made use of it. While working on it, I uncovered a few corner-case bugs in the NVMe driver as well as other places, and fixed these along the way.

(Later, I made some changes on top of this to allow `readv`/`writev` syscalls to behave properly for sockets, as well.)

### Fixing the profiler

Haiku has a built-in CPU time profiler (just called `profile`.) Unfortunately, it's been rather broken for years, regularly outputting data that was either empty or just didn't make any sense. In order to use it to try and track down some of the other bottlenecks, I spent a bunch of time fixing various bugs in it, as well as the debugger support code that it relies on to function, including to stack trace collection, buffer flushing, symbol lookup, scheduler callbacks, image load reporting, and more. I also implemented userspace-only profiling (ignoring kernel stack frames entirely), fixed some output buffer sizing issues, and fixed a race condition in thread resumption that also affected `strace`.

While it isn't perfect, it's much better than before, and can now be used to profile applications and the kernel to see where CPU time is being spent; and notably it now checks the thread's CPU time counters to detect if it "missed" profiling ticks, and if so how many.

### Avoiding the `device_manager` lock

One problem rapidly revealed in testing of various benchmarks is that every start of every command and application went through the kernel's `device_manager` lock. It turned out that this was because every time a new application/command is started, we have to initialize the stack protector with some random data, which required opening `/dev/urandom`, and opening any file on `devfs` requires acquiring the `device_manager` lock. Normally, this shouldn't be too much of an issue, but on systems with many USB devices and hubs it could randomly delay application startup by as many as a few seconds, since periodic USB device exploration acquired the lock and held it until it was complete.

This is now fixed twice over: first, `libroot` was adjusted to request random data without needing to open a FD on `/dev/` (or at all, in fact); and secondly, the USB stack was adjusted to not hold the `device_manager` lock for so long a time. Systems with many USB devices and hubs will see an especially significant performance improvement to jobs like compiling where many programs are started in quick succession.

### ELF `DT_GNU_HASH`

ELF symbol lookup and runtime linking tends to be a large part of application startup time. To improve this, UNIX System V introduced a hash table (`DT_HASH`) into the ELF format for faster symbol lookup. But these hash tables were still rather limited; so eventually the GNU developers came up with a new hash table format which is much more performant (and also contains a bloom filter for much faster testing of negatives.) Our `runtime_loader` did not support this, so I spent some time implementing it. Basic testing showed that with our standard applications and libraries, it does improve loading performance but not by too much; it seems that the performance gain is much more significant when there are very large objects like LLVM's shared libraries in use.

While working on support for `DT_GNU_HASH`, I discovered that FreeBSD and others had a slightly more optimized version of the hashing routine for `DT_HASH`, and imported it into Haiku to gain a bit of performance there, too.

(No applications on Haiku currently ship with GNU hash tables in their ELF binaries by default; you have to change some linker options to get them included.)

### `mmap` premapping (and related changes)

Normally, when `mmap` is used, not all (or even most) pages of the file being mapped are loaded into memory at once, but rather the OS just sets up some bookkeeping structres and then "lazily" reads and maps the pages in on fault. But of course mapping on fault is slower than mapping up front, so to assist with this trade-off we try and map pages that have seen use before (e.g. shared libraries used in multiple applications, especially during a compile job.)

But the code that actually did the pre-mapping only checked one of the two "used" fields on the page (the one updated by the page daemon), which meant that for recently-loaded pages that the page daemon hasn't had a chance to scan through yet (likely ones in immediate use for which pre-mapping would provide the most benefit), we didn't pre-map them. So this is now fixed, providing a significant performance increase to tasks with heavy use of `mmap` on the same files.

At the same time, I also adjusted the "cache prefetch" logic (separate from the "premap" logic: we try to pre-read some megabytes of data of an `mmap`'ed file into memory, but only actually map the data in if it's already been used or when a page fault happens) to skip prefetch entirely if the file in question already had more cached than prefech would've loaded. I also tweaked `vm_page` initialization to allow the compiler to optimize it just a bit more.

Finally, I reworked the "page mappings" structure allocation to use multiple object_caches (a kind of heap) on SMP systems, seriously reducing lock contention between CPUs.

### All-at-once removal of memory areas

Since all memory areas on Haiku have global `area_id`s, they also must be stored in a global table; so when a team on Haiku quits, all its areas must be removed from the global table. Previously, we just deleted each of the team's areas one by one the same as if the team itself was deleting them one at a time, which meant we would acquire the global areas table lock briefly, remove the area, unlock, delete the area, and so on. This can wind up being slow if multiple threads are trying to delete many areas at the same time, as they will wind up acquiring the locks in sequence while briefly sleeping while the other thread has the lock.

Instead, we now acquire the global areas lock once at the beginning when deleting all of a team's areas, remove all the areas at once, release the lock, and then move forward with the rest of the area deletion operations. This also massively reduces lock contention when many applications are starting and stopping in quick succession.

The overall improvement of this and preceding changes for compile jobs is somewhere around 25% on SMP systems; the standard "compile part of Haiku" test I ran repeatedly while working on these changes went from around ~38.5 seconds down to ~29.6 seconds. kallisti5 tested on bare metal with `-j16` and reported similar improvements. We are now less than double Linux's times for the same compile workload! (and that's with a KDEBUG kernel; a release kernel will surely be faster still.)

### Network buffer checksums and copying

I also added a new "flags" field to network buffers, and defined two flags for it: `L3_CHECKSUM_VALID` and `L4_CHECKSUM_VALID`. When set, these indicate that the "Layer 3" (e.g. IPv4) and/or "Layer 4" (e.g. TCP, UDP) checksums are known to be valid. When set on loopback (so the checksums need only be computed on the send side and not the receive side), they improved throughput by up to 30% (I saw an increase of around 2.2 Gbits/sec on my test setup.)

After adding these flags, I refactored the `ethernet` driver interface to support drivers sending and receiving network buffers directly, rather than just reading and writing data via `read` and `write` hooks, and then adjusted the `virtio` driver and the FreeBSD compatibility layer to make use of it (eliminating one `memcpy` of buffers in the send and receive path.)

Once the buffers were passed all the way up from the bottom of the stack, I added code in the FreeBSD compatibility layer to forward FreeBSD's equivalent network buffer flags, and to the virtio network driver to do the same; so on supporting FreeBSD drivers and virtio environments, there is now support for IP and TCP/UDP receive checksum offload on Haiku. (Send checksum offload isn't implemented yet.)

Well, that's all for this special section. Now on to the rest of the changes:

### Applications

apl made a number of changes to HaikuDepot to make it better support HiDPI displays, including refactoring the image loading system, removing hard-coded constants for icon and view sizes, and plenty more.

madmax fixed the block filter in CharacterMap to properly handle Unicode blocks that overlap according to the Be definitions. He also made characters that don't have glyphs in the chosen font display as grayed-out. Later, humdinger came along and tweaked CharacterMap's colors and improved the "dark" theme.

humdinger removed some broken links from AboutSystem.

madmax fixed the display of subtitles in MediaPlayer, which had been broken in multiple ways for some time.

PulkoMandy fixed the sizing of the "titled separator" menu item in Tracker, which wasn't large enough if there weren't other menu items around it to stretch it.

Callisto-Mathias (a GSoC '24 student) added a menu bar to the "Find" panel in Tracker, introducing options like "Open", "Save as", quick template selection, history, and more.

X512 fixed a memory fault leading to a crash on exit in GLInfo.

ilzu contributed a patch to allow organizing Tracker's "New" templates into submenus. Previously any folder created in the "New" templates folder would just be itself a template folder, but now it is possible (by setting a Tracker attribute) to tell Tracker to display it as a submenu instead.

### Command line tools

OscarL made a number of minor improvements to `proj2make`, which is used to convert old BeOS ".proj" files into Makefiles.

waddlesplash made a number of improvements to `strace`, including support for printing the polled objects for `wait_for_objects` and `event_queue` syscalls, fixing some buffer sizing crashes, refactoring code for clarity, and more.

### Servers

madmax refactored a number of the settings classes between input_server and the Input preferences, and then fixed a number of issues with setting and storing "Mouse" settings in particular. Now separate mice will properly have separate settings, and the settings will be remembered properly across reboots.

TmTFx added a missing character to the Friulian keymap.

waddlesplash adjusted launch_daemon to properly set the filemodes of the `tmp` and `shared_memory` directories so that all applications can write to them, not just ones on the root `user`.

### Kits

madmax added an option to skip fallbacks in `BFont::GetHasGlyphs`, in order to determine whether a given font actually has the glyphs in question or merely a fallback font does.

madmax made a number of minor improvements to text layout when word wrapping is disabled in `BTextView`.

jscipione did some minor cleanup in the printing support code.

korli replaced the "udis86" disassembler, used by the userspace Debugger as well as the kernel debugger on x86, with Zydis. (udis86 was not really maintained anymore while Zydis is actively maintained and used in a number of other major projects.)

waddlesplash added more assertions to the `BReferenceable` reference-counting class to check the validity of reference counts. This caught a few bugs in app_server cursor management, which he then fixed.

### Drivers

waddlesplash added some more error logs to the PCI bus manager and drivers in order to try and catch the cause of some boot regressions that cropped up in the refactor, and also fixed some minor bugs around area size computation and what error codes are returned.

waddlesplash refactored some code in the FreeBSD and OpenBSD compatibility layers to not need so much memory for bounce buffers, and to avoid leaking memory when allocating bounce buffers fails.

kallisti5 added some missing USB IDs for FTDI UARTs.

waddlesplash made some fixes to USB and other code to get things compiling under `KDEBUG_LEVEL < 2` again (needed for the release images.)

waddlesplash made some minor fixes to the SACK logic in the TCP module.

### File systems

Jim906 contributed a major overhaul of the FAT filesystem driver (which dated back to the days of BeOS, as it was one of the pieces of "sample code" Be released as open-source) to mostly use FreeBSD's FAT driver code as a base, in order to make the driver much more reliable and fix a lot of long-standing bugs. After the initial merge, Jim906 and some other developers followed-up about reported bugs in the new code (assertion failures, etc.) and its integration with the build system.

waddlesplash fixed a bug in RAMFS' `get_vnode` routine and added an assertion in the kernel VFS layer that would've caught the problem with a clear assertion rather than resulting in a kernel crash.

### libroot & kernel

waddlesplash sprinked some usage of the `final` keyword around the VM classes in the kernel, to allow the compiler to elide virtual calls if possible.

waddlesplash tweaked the x86 SMP code to avoid reading APIC registers when sending interrupts to other CPUs. (This may slightly increase performance on some systems, including VMs.)

waddlesplash adjusted the libroot locale support code to use a consistent date format option with ICU, fixing some POSIX locale failures following the ICU upgrade. He also cleaned up some details about the setting of `LC_*` environment variables in launch_daemon and related code. Also, OscarL contributed a patch to reset the `LC_*` environment variables in `/etc/profile`, since of course they could have changed since the environs were initialized at the end of the boot process.

waddlesplash made some cleanups to the pthreads implementation, adding some more error checking and moving around the implementation of some "extension" functions. He then added an implementation of `pthread_timedjoin_np`, based on an old patch from jessicah.

waddlesplash adjusted the kernel's internal `select_fd` function to properly report that no events were selected when trying to select a FD that doesn't support reporting events. This doesn't matter for `wait_for_objects`/`select`/`poll` (which just reports these as always readable/writable), but for the `event_queue` (and thus `kqueue`) we don't want to support adding these kinds of FDs, so now they can be properly rejected instead of silently accepted.

korli moved `getentropy` from `libbsd.so` to libroot, as it's now standardized in POSIX.1-2024.

waddlesplash made a change to try and avoid resetting the hardware timer interrupt if it's already set correctly. (Unfortunately this change had to be reverted as it exposed a number of bugs in the timer setup code which haven't been fully resolved just yet.)

waddlesplash upgraded the `regex` code in libroot to a newer version of glibc.

X512 refactored the kernel's FD handling mechanism to identify file descriptors by their function tables, rather than a hardcoded "type" enumeration. (This paves the way for more FD types to be introduced by drivers without explicit kernel support for them.)

waddlesplash refactored thread mask handling in the kernel scheduler for clarity (and performance.)

X512 noticed an off-by-one error in the handling of frame pointers in the KDL stack trace printing code. (This was visible in that the left-hand column of stack frame addresses was vertically "shifted" by one compared to where it should be.) waddlesplash then continued the investigation and wrote a fix, also fixing the kernel/userland switching detection logic in the stack trace printing code at the same time.

korli fixed a few minor warnings in kernel code spotted by the GCC Analyzer.

waddlesplash tweaked the configuration for the kernel guarded heap (which is not compiled in by default) to make it work again.

waddlesplash added a KDL command to look up what object_cache a specified kernel address is in (if any.)

### Documentation

jessicah added a note about the behavior of the `B_ABSOLUTE_REAL_TIME_TIMEOUT` option.

### Build system

The EXR Translator was removed from the tree; it's now available instead as a third-party package at HaikuPorts.

PulkoMandy added some missing stubs to `libroot_stubs` (which is used for bootstrapping the OS, e.g. on new architectures), and made a few other tweaks to the build system to get bootstrap builds at least partially working again. (waddlesplash then came by later and regenerated the stubs files from scratch to add even more missing stubs.)

waddlesplash removed support for `HOST_CC_IS_LEGACY_GCC`. The host tools must now always be built with a modern C/C++ compiler, including on 32-bit x86.

waddlesplash added a vendored `libsolv` and switched the build system to use it, rather than the binary packages. This paves the way for cleaner updates of `libsolv` in Haiku, as it's a critical system component that the Package Kit relies on for proper functioning.

### RISC-V

X512 ported the `arch_debug` code from the x86 version, allowing for more sophisticated stack traces and other facilities in KDL as well as support for the profiler in userspace.

## Whew!

That was a lot! July was certainly the busiest month for Haiku in some time, and the first days of August have been about as busy. Which leads to the question I'm sure everyone wants to know the answer to:

### Are we beta5 yet?

The release was branched last week, HaikuPorts builders were upgraded within the next days (hence why r1beta4 package repositories are now deactivated), and package synchronization and other basic preparations for building release images were completed today. So, once we get the CI straightened out, expect to see R1/beta5 "test candidates" appear on the forum, and then "release candidates" in the weeks after that. So, we are close; by the end of this month or the first week of the next, I expect, barring any unforseen difficulties.

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
