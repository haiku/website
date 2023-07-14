
+++
type = "blog"
title = "Haiku Activity & Contract Report, June 2023"
author = "waddlesplash"
date = "2023-07-14 19:00:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev57061 through hrev57126.

<!--more-->

### "user mutexes" refactor

The biggest changes last month were a series of commits by waddlesplash, all related to the `user_mutex` API and the consumers of it. This API is the kernel portion of the implementation of basically anything related to mutexes or locks in userland, including `pthread_mutex`, `pthread_cond`, `pthread_barrier`, unnamed semaphores (via `sem_open`), rwlocks, and more. It bears some resemblance in concept to Linux's `futex` API, but is very different in both design and implementation.

The commit series started out with some basic refactors, cleanups, and bug-fixes of the existing implementation, some of which had only been noticed recently. For instance, the implementation dealt exclusively with physical memory addresses, but used `addr_t` (which is 32 bits on 32-bit systems) and not `phys_addr_t` (which is 64 bits on 32-bit systems with PAE.) That was corrected first, along with some cleanup and consolidation of atomic and userland memory access routines.

Next came a major overhaul of the `pthread_barrier` implementation. The existing one was known to be so broken as to be basically unusable; its usage was disabled entirely in Mesa and other software ports, and these problems were encountered while writing other tests and benchmarks for `mutex_lock` routines. waddlesplash altered an existing `pthread_barrier` test-case to reproduce the problems (deadlocks/hangs), and then completely rewrote the implementation, fixing all the known issues with it and improving performance at the same time.

After that, waddlesplash added more assertions and sanity checks to certain mutex locking routines, including one designed to guard against double-locks in `pthread_mutex_lock`. This one was, under certain high-contention scenarios, actually possible to trigger: jessicah encountered the problem it guards against in GHC; without such an assertion, that problem took a long while to track down properly. (This was the bug that triggered all this work in the first place.)

Understanding how that assertion could possibly triggered required a lot of thought and careful reading of both userland and kernel source code. The fix, in [hrev57076](https://git.haiku-os.org/haiku/commit/?id=6f3f29c7dda1a66b75d9e10d3198d58ac8590115) has a commit message almost longer than the change itself, and changes both kernel and userland behavior (including a syscall rename) to prevent the problem from occurring.

The next series of changes focused on cleanup and fixing a few more (potential) problems throughout the code: a race in the "switch lock" syscall (which could not have caused any problems previously, however, as the API's one consumer, `pthread_cond`, would not use it in such a way as to trigger the problem), a race leading to a deadlock in the "unblock all threads" features (which was a regression from some of the prior changes), an incorrect usage of flags in `pthread_cond`'s wait routine, and finally code to handle another corner case in `pthread_barrier` (trying to destroy the barrier while not all threads have returned from the "critical section".)

Following this, waddlesplash performed major overhauls of the kernel implementation of the APIs. First, he modified the code (which was already using `ConditionVariable`s) to take more advantage of their features, allowing for the deletion of a lot of manual queuing/dequeuing logic, and reducing lock contention on the single system-wide "user mutex entries" table. He next granularized locking: the global lock for the "user mutex entries" table was turned into a read-write lock, and each "entry" (corresponding to one mutex) also gained its own read-write lock, allowing the time each thread spent holding the global lock to be greatly reduced.

(This last set of changes mostly served to pave the way for the following ones; while in some artificial benchmarks they improved performance greatly, in other real-world benchmarks they *decreased* performance. However, as will be seen shortly, all the lost performance was regained and then lots more by the end.)

The next step was to break up the global "user mutex entries" table, and create ones for each team (process). (The global one must still be used for mutexes in shared memory, but those are very rarely used, and in practice the per-team ones are used almost always.) After the refactor, alterations were made to use virtual addresses instead of physical ones for all per-team user mutexes, which means that memory pages no longer have to be locked in RAM before waiting on them. This change almost doubled GLTeapot's FPS in a contention-heavy virtual machine (~320 before to ~600 FPS after; before beginning on any of these changes, the best it could do was ~340).

Finally, waddlesplash added a `user_mutex` KDL command which allows for easy inspection of user mutex objects that threads are waiting on (in addition to some other KDL changes that, while helpful here, are not user-mutex-specific; those are detailed below.)

So far there have not been any more regressions reported following these changes, though there are some bugs in applications (or in Haiku's `libroot`) that the assertions uncovered which have yet to be fixed. Some users have reported that menu navigation seems "snappier" now, to them, following these changes (though this is, admittedly, very unscientific.)

### Applications

zdykstra fixed a minor oversight in Terminal that could sometimes prevent the (new) "Theme" window from appearing at all.

KENZ fixed a corner-case in DWARF file parsing in Debugger encountered while trying to debug some objects produced by Mozilla build systems.

Zardshard (a GSoC '23 student) implemented "references images" in Icon-O-Matic. This allows arbitrary (bitmap) images to be displayed within Icon-O-Matic, useful for artists who are working from existing image when drawing icons.

humdinger made ShowImage properly prevent the screensaver from triggering while in full-screen mode.

twang12-cpu implemented sound alerts for "low battery" and "finished charging" in PowerStatus.

humdinger fixed the layout of the "Set status" window in Mail, and added localization.

### Command line tools

trungnt2910 added support for the `sockaddr` structure type to `strace`, as well as the arguments passed to the `exec` and `load_image` syscalls and flags for the `user_mutex` syscalls. He also added some utility functions to `strace`'s internals for reading values more efficiently (and in at least one case, more correctly), and used this to clean up the code.

humdinger added an "info" command to `pkgman`, which will display the "Summary" and "Description" of any package (including ones not installed.)

korli fixed a regression in `ifconfig` that prevented standard commands (`up`, `down`, etc.) from working.

### Kits

Freaxed contributed a fix to `BAboutWindow`, resolving a problem involving invalid string pointers.

waddlesplash added missing getters and setters for `BAlignment` in `BMessage`.

### Drivers

waddlesplash fixed a double-lock kernel assertion panic in the `usb_disk` driver (a regression from the previous month's refactors.)

PulkoMandy added support for reporting EDID monitor data under EFI framebuffers.

X512 fixed a typo in the XHCI (USB3) driver specifying an incorrect size for a root hub descriptor.

phcoder fixed PS/2 keyboard probing on Google Chromebooks, which do not report expected results for the "reset" command.

korli (after an initial attempt by waddlesplash) adjusted the `emuxki` audio driver to work with userland buffers properly, fixing some KDLs.

phcoder fixed crashes in the `i2c_hid` driver (not yet added to builds by default) on bogus or invalid HID devices.

waddlesplash imported some fixes from OpenBSD to the `idualwifi7260` driver.

### libroot & kernel

trungnt2910 fixed a double-lock kernel assertion panic in the VM subsystem that could be triggered upon certain `mmap` invocations when there were existing mappings.

trungnt2910 fixed the behavior of `pthread_getschedparam` / `pthread_setschedparam` to work more in line with `sched_get_priority_min`, fixing a problem where threads could be unwittingly promoted into "real-time" priorities.

waddlesplash modified the `threads` KDL command to print the first 4 characters of condition variable names, instead of just "cvar", when threads are blocked on condition variables. This allows condition-variable types to be easily distinguished when reading through a long thread list: e.g. port read/write are now shown as `cvar:port`, while a user-mutex wait would be `cvar:umtx`.

trungnt2910 fixed cutting areas (which happens when `mmap`'ing over existing areas) when `mprotect` has been called on them. Previously the protections set by `mprotect` were not properly handled.

waddlesplash added `realloc_etc`, to complement the existing `malloc_etc`, and made use of it in the new page-protections code.

waddlesplash de-duplified and cleaned up some code in the kernel `rw_lock` implementation, and then completely rewrote the implementation of the `RW_LOCK_DEBUG` mode. Previously, this mode just turned `rw_lock`s into another sort of `recursive_lock`s, which allowed the `ASSERT_READ_LOCKED` macro to work, but also meant that it would not differentiate between a read lock and a write lock, and also that concurrent readers and writers would behave very differently. The new implementation preserves the reader-writer distinction and instead tracks what threads have a read lock in thread-local storage, which is much less efficient but allows for more checks to be done. (This debugging option is disabled even in nightly builds, custom builds have to be made with it enabled in order to use it.)

waddlesplash fixed a "missing lock" assertion in the kernel VFS mount routine. (This problem was discovered by the new `rw_lock` debugging mode.)

### Build system

nielx made a variety of changes to the build system, but mostly lots of different small areas in the source tree, to get Haiku (at least partially) buildable under GCC 13, removing unused includes, fixing new `-Werror`s, and lots more.

waddlesplash removed some last remnants of the `zip` tool, which was deleted from the tree years ago (we still use `unzip` during builds, however.)

### Documentation

Zardshard added a UML class diagram for Debugger's internals, so that developers can become acquainted with its architecture more rapidly.

nielx fixed some errors and warnings given by Doxygen during generation of the Haiku Book.

### ARM & RISC-V

davidkaroly fixed handling of the "Accessed" flag and implemented the "Modified" flag for the ARM MMU. He also enabled "TEX remap", also as part of memory management initialization. He then removed some unused and unneeded code, and added support for some more UART FDT options in the bootloader.

kallisti5 adjusted some test scripts for booting RISC-V images in QEMU to use emulated hardware with more compatibility.

X512 and kallisti5 updated the packages set used for RISC-V builds, added more build profiles, and added Wi-Fi drivers to the build.

X512 exposed FDT data to userland, which can be useful for debugging purposes or examining what decisions the kernel and drivers made during startup.

### Website

There are GSoC reports from last month, from [Zardshard](https://www.haiku-os.org/blog/zardshard/) on Icon-O-Matic, [trungnt2910](https://www.haiku-os.org/blog/trungnt2910/) on porting .NET, and [pairisto](https://www.haiku-os.org/blog/pairisto/) on VPN support.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
