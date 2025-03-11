+++
type = "blog"
title = "Haiku Activity & Contract Report, February 2025"
author = "waddlesplash"
date = "2025-03-11 14:20:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58584 through hrev58696.

<!--more-->

### Applications

jscipione fixed opening folders by double-clicking the "Location" column in query results in Tracker. He also fixed hard-coded values for certain menu item metrics, bringing them in line with standard menu metrics, cleaned up some parts of drag & drop support, refactored some of the drawing logic, made some fixes to add-on loading, and more.

nephele removed Gopher from the declared list of supported protocols in WebPositive. (It was supported when we used the Haiku-native network backend, but now that WebPositive uses CURL again, it isn't supported.)

waddlesplash made some changes to HaikuDepot (inspired by patches from oco) to improve performance somewhat when searching for items.

captain0xff (a new contributor!) removed some duplicate code from Screen preferences.

waddlesplash fixed some memory-management problems and race conditions in Tracker, fixing at least one crash.

### Command line tools

korli added support to `strace` to dump the arguments of `rlimit` syscalls, and the "type" argument of `mmap` syscalls.

OscarL merged the "filteredquery" command-line tool into the "query" tool, meaning that "query" can now filter results by directory.

### Kits

jscipione implemented support for keyboard shortcuts without the `Cmd` key in the Interface Kit. (Previously all menu shortcuts, no matter what other modifier keys they used, were also required to have `Cmd` as one of them.) He then modified some applications to make use of this feature, such as MediaPlayer's Playlist window, Tracker's "move to trash", and others.

jscipione fixed some background color management problems in `BTextView`.

nipos contributed a fix to `BControlLook` to use the "panel text" color for scrollbar arrows, fixing contrast in some color schemes. nephele came by later and fixed an oversight in the original change.

PulkoMandy added the remaining missing ASCII control character definitions to `InterfaceDefs.h`.

waddlesplash refactored `BObjectList<>` to take `bool owning` as a template parameter rather than a constructor parameter. This will make static code analysis of modules that use this class much easier (as there were a lot of "double free/use-after-free" false positives before that just had to be ignored), and also make memory leaks harder to inadvertently cause. He also cleaned up some code to use the more optimal `BStringList` instead of `BObjectList<BString>` at the same time.

nephele fixed `BFilePanel` to handle non-existent target directories more gracefully.

korli added checks to `BMenuField::SetLabel` to better handle `NULL` labels.

waddlesplash made some changes to `BList`, `BMessage`, and some of their consumers (like the registrar) to avoid allocating memory in more cases, and just use the stack (or defer it till later) instead.

waddlesplash adjusted and added some checks in `BScrollView` and `BColumnListView` to not redraw unnecessarily in more cases, improving performance in HaikuDepot somewhat.

ilzu fixed an error report in a corner-case the JSON message writer.

jscipione cleaned up the ownership of the "menu semaphore" in BWindow.

waddlesplash adjusted `BBlockCache` (a memory chunk cache) to not cache anything when a debug/guarded allocator is in use.

### Servers

korli added a hook to the VirtualKeyboard input panel (which is still disabled by default) to handle screen(mode) changes properly, and made it automatically refresh when the system keymap changes.

augiedoggie reworked screensavers to support using the "system" (i.e. UNIX user) password to unlock the screen after the screensaver run, and added a command-line argument to launch and lock the screen immediately instead of after a delay.

madmax fixed the name of a private method in `input_server`.

X512 removed an unnecessary argument from internal `draw_bezier` functions.

### Drivers

Lt-Henry added support for AMD I2C busses to the `pch_i2c` driver.

waddlesplash reworked the "IA32 BIOS" bootloader to report the ACPI root pointer (same as the EFI bootloader), and to always use this in ACPI initialization rather than trying to re-find it.

waddlesplash fixed some corner-cases and added missing checks to XHCI initialization.

korli modified the `virtio_pci` bus driver to handle the device revisions more according to the specification.

waddlesplash adjusted the SCSI bus manager to use the proper maximum values for DMA attributes.

### File systems

waddlesplash optimized block fetching in B+tree iteration to not "put" and "get" the same block over and over again unnecessarily, speeding up "git status" performance with cold disk caches a bit (but there's still a lot more work to be done there.)

augiedoggie changed `userlandfs_server` to use `B_MULTIPLE_LAUNCH`, allowing multiple userlandfs/FUSE filesystems to be mounted at the same time.

waddlesplash added some missing locks to BFS' checkfs operations, potentially fixing some rare KDLs.

### libroot & kernel

korli disabled "C5" and "C6" C-states on Intel "Skylake" microarchitecture, fixing the boot on some systems.

waddlesplash fixed the "guarded heap object cache" (a debug allocation facility) in the kernel after recent refactors.

waddlesplash added some sanity checks in `create_sem` to return errors when requesting a semaphore with a negative count, same as BeOS apparently did.

waddlesplash added checks in the file cache to validate that the size of the underlying file didn't shrink past the end of the request between when the read or write was issued and after actually acquiring the lock (and to bail out if it did). He also cleaned up some code related to page reservations.

korli adjusted runtime_loader to make `dlsym(RTLD_NEXT)` search all loaded ELF regions for the caller's address, not just the first ones. waddlesplash followed this up with some similar fixes to other parts of runtime_loader.

waddlesplash continued his ongoing memory management improvements, fixes, and cleanups, implementing more cases of resizing (expanding/shrinking) memory areas when there's a virtual memory reservation adjacent to them (and writing tests for these cases) in the kernel. These changes were the last remaining piece needed before the new `malloc` implementation for userland (mostly based on OpenBSD's malloc, but with a few additional optimizations and a Haiku-specific process-global cache added) could be merged and turned on by default. There were a number of followup fixes to the kernel and the new allocator's "glue" and global caching logic since, but the allocator has been in use in the nightlies for a few weeks with no serious issues. It provides modest performance improvements over the old allocator in most cases, and in some cases that were pathological for the old allocator (GCC LTO appears to have been one), provides order-of-magnitude (or mode) performance improvements.

korli fixed `pthread_key` destructor invocation to iterate over the keys for at least `PTHREAD_DESTRUCTOR_ITERATIONS`, as the specification indicates. waddlesplash made a small optimization to avoid syscalls in some cases of `pthread_cond_signal`.

waddlesplash added some more mutex acquisitions before spinlock acquisitions in the syslog code, avoiding some assertion failure panics when "onscreen debug output" is enabled for a boot.

waddlesplash refactored x86 APIC timer initialization, moving the calibration from the bootloader into the kernel, making it somewhat more accurate, and reading the value from CPUID on hypervisors rather than computing it from scratch.

waddlesplash added code to handle a corner-case in `mprotect`, fixing the last known kernel panic (assertion failure) that "Iceweasel" was regularly triggering on nightly builds.

waddlesplash fixed the kernel and bootloaders on x86 to not hang forever if the default serial line is dead or nonexistent. (On specialized or very new x86 hardware, like the Steam Deck, it doesn't exist, and trying to write to it without timeouts will just result in infinite hangs.)

phcoder contributed fixes to make `x86_{read|write}_msr` an inline function on 32-bit x86 (it already was on 64-bit), add X2APIC support to the EFI bootloader (needed on very recent hardware), use a separate allocation function to make sure that the "PML4" page is always allocated in the 32-bit region (which waddlesplash refactored and merged after memory management cleanups to other parts of the bootloader), and to support the GDT being above 4GB.

waddlesplash replaced some more implementations of standard C functions with versions from musl, including `memmove`, `strlen`, `strlcat`, and more. He also synchronized the `glob` implementation with upstream FreeBSD, added some more optimizations to `memcmp`, and more.

korli moved partial-zero-fill-pages logic from the file cache into VMCache, fixing `mmap` behavior in some corner cases involving RAMFS.

waddlesplash rewrote the kernel FIFO (`pipe(2)`) implementation to use more atomics and fewer locks, improving the performance of `stress-ng --pipe 1` (in a VM) from ~230 MB/s to ~2.5 GB/s.

### Build system

korli fixed some miscellaneous warnings.

waddlesplash made a number of fixes to make it possible to build Haiku on FreeBSD, and Linux distributions that use musl. He also deleted some unneeded source files from the copy of `unzip` used as part of the build tools.

korli adjusted the stack protection options in the build system (which are disabled by default) to apply to more parts of the source tree.

nephele changed a usage of the `which` command to use the shell builtin `command -v` instead.

### Documentation

waddlesplash dropped some obsolete internals documentation on merging patches from NetBSD trunk for `netresolv`, as the procedure described there doesn't apply anymore. Following some discussion on the mailing list, PulkoMandy wrote up a new page describing the general procedure for merging code from other sources into Haiku and keeping it up-to-date.

kuku929 (a new contributor!) contributed a graph showing an example of the kernel device manager's node tree.

PulkoMandy moved syscalls documentation from the website to the internals documentation, and imported oco's article on profiling applications.

dalmemail fixed a typo in a documentation comment for `VMCache`.

madmax added a missing "end comment" to the Haiku Book that was preventing the "Synchronization Primitives" page from being rendered.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
