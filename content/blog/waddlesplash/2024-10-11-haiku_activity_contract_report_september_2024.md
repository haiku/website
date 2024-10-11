+++
type = "blog"
title = "Haiku Activity & Contract Report, September 2024 (ft. packagefs memory usage optimization)"
author = "waddlesplash"
date = "2024-10-11 15:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58043 through hrev58187.

We're now back to development "as usual" after the release of R1/beta5 (though some of the changes in this report did make it in to the release itself.)

<!--more-->

### packagefs memory usage optimization

While waiting for beta5-related rebuilds and other work to be completed last month, I spent a bunch of time trying to optimize packagefs's memory usage. There were a variety of changes here, such as: use singly- instead of doubly-linked lists where no performance penalty would be incurred, drop unused or constant fields from classes, inline reference counts for more optimal structure packing, eliminate unneeded padding, drop "object depots" from allocation arenas, make more use of allocation areas where it makes sense to, reduce locking granularity, implement and use a "bump allocator" for very short-lived objects, and more.

(Also while working on packagefs, I noticed our default string hashing routine was a somewhat outdated one; I replaced it with the now-common `hashdjb2` not just for packagefs but for most of the kernel, and then all of userspace as well.)

The final result is savings of somewhere around (or possibly more than) 20% of total packagefs memory usage, excluding file data caches, which amounts to at least 15 MB on my system.

Now, on to the rest of the report.

### Applications

jscipione cleaned up some code in Tracker, and fixed both Deskbar and Tracker to use the "Menu" font in more menus. OscarL fixed a Tracker crash on screen resolution changes. humdinger made the text input column in Tracker's Find panel wider, and jscipione removed an extra prompt to the user when dragging items out of query windows.

apl fixed the text colors in the "Usage conditions" window in HaikuDepot. jscipione fixed a crash when clicking on the conditions window before it's finished loading.

waddlesplash updated the list of maintainers in AboutSystem's credits.

nipos adjusted WebPositive's font settings preferences to support word wrapping. He also adjusted Keymap's buttons to use the standard system control colors, fixed Mail to make quoted text colors readable in dark mode, and fixed the text color in Tracker's "File permissions" and "Status" views.

korli adjusted the Intel partition map editor to automatically enable the "Active" checkbox for the first primary partition.

korli adjusted the default "Mute" media key shortcut to toggle mute on and off instead of just muting.

dovsienko fixed the Clock desktop applet pointing its hands imprecisely.

korli fixed ActivityMonitor to not start offscreen after restoring its position.

humdinger fixed quoting of partition names in some DriveSetup messages.

### Command line tools

An old patch from kallisti5 to improve `launch_roster`'s output (displaying more information by default, in a table format, including service status) was revamped and merged by waddlesplash.

waddlesplash added support for printing the mutex option flags (e.g. `MUTEX_SHARED`, for mutexes shared across processes) to `strace`.

waddlesplash added a `-f` option to `package_repo list` to print the canonical filenames of packages in a given `repo` file. (This is useful for certain tools that want to download packages outside of Haiku.)

### Servers

jscipione fixed the colors of the "problem" and "results" windows in package_daemon (the ones that appear when there are problems installing  or updating packages in HaikuDepot or SoftwareUpdater.)

waddlesplash added some more checks to the audio mixer startup, to avoid hangs in more cases.

madmax adjusted input_server to avoid locking the device list in more cases, fixing hangs and deadlocks when device threads hang.

madmax fixed single-clicks on the resize corner of windows erroneously minimizing the window.

### Kits

jscipione fixed live updating of text colors in Spinner controls, adjusted how parent colors are adopted across most controls, and tweaked the button background color in "dark mode."

waddlesplash made some adjustments to the Locale Kit to avoid crashing if ICU failed to initialize in more cases.

waddlesplash added another assertion to `BTimeSource` that published times don't have negative drift.

### Drivers

tmtfx enabled support for "Gemini Lake" and "Ice Lake" devices in the `intel_extreme` modesetting driver. PulkoMandy added some more code to support "Tiger Lake", and ilzu added some more "Tiger Lake" devices.

waddlesplash reduced the syslog spam of the `usb_audio` driver.

oanderso adjusted the ACPI driver to map its physical memory as "write-back" instead of "uncached". This was necessary for the ARM64 port to work (as otherwise we get faults on unaligned addresses), but it is supported on x86 as well. This exposed some other bugs in Haiku related to double-mapping of such physical memory, which must use the same memory type in order to not encounter problems (as if we don't, we'll get "machine check exception"s.)

mmlr fixed some bugs related to allocation of queues in the virtio drivers, and added more error checks and handling. korli added a check for the device status when resetting virtio devices, and fixed an out-of-bounds read in the virtio_pci driver.

### File systems

waddlesplash did some minor code and terminology cleanup in BFS.

Jim906 fixed a crash in FAT when disk I/O fails in some cases. He also enabled R/W access to volumes up to 2 TB in size, and added checks to prevent overflowing the sector count.

### libroot & kernel

Some minor fixes and performance improvements to the kernel derived from changes by jpelczar were merged by waddlesplash, including to the kernel `malloc`, locking granularity in the VM, page reservation leaks and dangling reference detection, and more. He cleaned up some of the code around the merged changes, while at it.

waddlesplash fixed an offset computation bug in the kernel IORequest subsystem that was leading to failed I/O operations spuriously being reported as successful.

waddlesplash cleaned up the `*at` (e.g. `linkat`) function implementations in `libroot` and related modules, making them use the `AT_FDCWD` constant rather than hard-coding values and reducing code duplication. He then adjusted the kernel to only accept `AT_FDCWD` and `-1` (the old value of `AT_FDCWD`) for such syscalls, rather than any negative value.

waddlesplash replaced some custom-written libroot I/O code with glibc's. (Eventually we want to switch entirely to musl, but the stdio implementation is still from glibc, so we should use glibc's code here to be consistent for the moment.)

waddlesplash fixed `gmtime()` to return the proper "GMT" timezone string.

waddlesplash fixed conversion of surrogate pairs in `mbrtowc`.

waddlesplash made a number of fixes to the pthreads implementation, including adjusting error codes to be more in line with the POSIX specification, suppressing `EINTR` in rwlocks, fixing deadlocks in barriers, and more. He also fixed invalid timeouts being passed to the POSIX unnamed semaphore routines, and fixed a logic error leading to shared unnamed semaphores not working properly.

korli adjusted the kernel's linker scripts to warn or error if there are unexpected or unhandled sections.

waddlesplash fixed accounting for a currently running thread's CPU time, which should improve the display of thread CPU usage in various applications.

waddlesplash refactored syscall runtime accounting, to count only the time actually spent in the syscall, and not its total overhead (which we can't easily measure from within the kernel, anyway.) This makes the times in `strace` output much more useful to work with.

waddlesplash reduced the maximum size of dirent buffers allocated by the kernel to 8 KB. (Most things that read dirents never read anything as large as the old or new limits, and the things that did should actually be faster this way anyway, as we now always go through a faster allocation facility in the kernel instead of a slower one.) He adjusted the few places in the tree that used such large buffers to use the new limit instead.

waddlesplash adjusted the "low resource" subsystem to not timeout due to a race condition when waiting for a single run to complete.

waddlesplash added some more assertions to the kernel mutex facilities to catch more spurious wakeups. He also fixed lock ABI compatibility between KDEBUG and non-KDEBUG builds, which had been a problem for many years. Now, drivers and kernel add-ons built against KDEBUG kernels should work with non-KDEBUG ones, while drivers built against non-KDEBUG kernels will encounter "missing symbol" errors when you try to use them against KDEBUG kernels. (Previously one would just get hangs, deadlocks, or crashes when attempting to do either of those things.)

waddlesplash adjusted the `kqueue` implementation to use a common facility for converting timespecs, and added a check for invalid timespecs.

waddlesplash fixed a race condition leading to spurious wakeups in the thread unblock-after-timeout logic (a recent regression).

waddlesplash made some improvements to the VFS entry cache, most notably including caching of hash values, allowing the cache to skip string comparisons when the hash values don't match. On one simple benchmark (rebuilding HaikuDepot) it saved about 10,000 string comparisons.

waddlesplash added some more debugging information to the `slab_object` KDL command.

waddlesplash made some more adjustments to the rwlocks debugging code, including adding another "wasn't locked" assertion (that code isn't enabled by default even on `KDEBUG` builds, as it's part of the checks that are rather expensive to run) as well as a "isn't read-locked" assertion (on destruction, which is enabled on all builds.) He fixed a few minor issues these assertions uncovered.

waddlesplash re-enabled the "initialize TSC from CPUID" code for hypervisors. (It was already enabled for bare metal.)

waddlesplash adjusted `runtime_loader` to be built without `-fno-builtin`, the same as most of libroot, providing a small performance improvement.

mmlr implemented PAT (Page Attribute Table) support for x86, which supersedes MTRRs and allows us to disable them entirely on supported hardware. He also cleaned up some of the code surrounding MTRRs and PAT, added some new debug commands, and added assertions to detect overlapping memory regions with differing types, which fixed most of the issues uncovered/caused by the ACPI memory type change. waddlesplash then renamed the `B_MTR_*` constants to "something more meaningful" (as an old TODO comment indicated they should be).

korli implemented printing of more x86 CPU features in the debug output.

waddlesplash changed most remaining non-POSIX include/feature guards in standard headers to be `_DEFAULT_SOURCE`, so that our `<features.h>` can turn them on automatically in most cases.

waddlesplash added a missed check for the new-style `BlockedEntries` settings in the bootloader.

waddlesplash cleaned up some code and adjusted how locking works in some parts of the PS/2 driver, to try and fix some race conditions.

waddlesplash added some more information to the "supposed to be free page" panic, and adjusted the "page" KDL command to use proper debug facilities for enumerating over address spaces rather than brute-force iteration (which is too slow to work well on 64-bit address spaces.)

kallisti5 fixed the build of the kernel guarded heap.

### Documentation

kallisti5 updated the instructions for generating Google Cloud Platform instances for Haiku.

### Build system

oanderso fixed building the DNS resolver under Clang.

waddlesplash adjusted the build system to only build the `haiku_source` package if `HAIKU_INCLUDE_SOURCES` is set, decreasing the time of full `@nightly`-profile image builds.

waddlesplash synchronized the set of packages from HaikuPorts that Haiku is built against (primarily for the sake of the R1/beta5 release.)

jessicah added some missing checks and options for the Python tool in `./configure`, plus some sanity checks for cross-tools options.

waddlesplash moved the libroot malloc implementations to their own subdirectory (to pave the way for the addition of more allocator(s) in the future, most notably OpenBSD's malloc, which is a current candidate for replacing hoard2.)

PulkoMandy added Wonderbrush to the release images on all architectures, not just x86 32-bit.

waddlesplash unified the BeOS ABI compatibility preprocessor definitions to a single definition, and adjusted all code to match. He also disabled "BeOS compatible types" (for `int32`, etc.) in kernel mode, and fixed the code that had depended on this.

waddlesplash cleaned up the base C/C++ compiler flags in ArchitectureRules and streamlined the comments around them.

### ARM

oanderson continued his work on ARM64 support, refactoring and implementing many missing parts of the VM translation map, exception handling, and TLBs, among other things.

waddlesplash added some "unimplemented" prints to the default base class implementation of certain VM debug methods, to aid in finding where missing functionality needs to be implemented.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible.
