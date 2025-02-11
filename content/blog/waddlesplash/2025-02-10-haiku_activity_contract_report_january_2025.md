+++
type = "blog"
title = "Haiku Activity & Contract Report, January 2025"
author = "waddlesplash"
date = "2025-02-10 23:20:00-05:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58487 through hrev58583.

<!--more-->

### Applications

omesh-barhate contributed a patch to add a context menu to WebPositive's bookmark bar items, to allow them to be edited more easily. humdinger cleaned up the strings in the new context menu and enhanced its functionality, and removed the "move to front" logic in the Downloads window.

digitalbox98 (a new contributor!) contributed a change to add a "Remove" menu for Transformers in Icon-O-Matic. Zardshard cleaned up some variable names in Icon-O-Matic as well.

PawanYr (a new contributor!) made TeamMonitor group child teams under their parents. (This makes multiprocess web browsers and terminals easier to deal with.)

PawanYr made Backgrounds preferences update the view whenever the X/Y coordinate boxes are modifed.

PawanYr fixed a crash related to query templates in Tracker. jscipione adjusted Tracker to disallow control characters in the file name edit box. nephele fixed the button color in file panels.

jscipione cleaned up and added more invocations of `AdoptSystemColors` and the like in multiple applications and classes: Deskbar, Tracker, HaikuDepot, BTextView, and more.

nipos made the analog clock display in Time use the "document" color rather than a hard-coded white color.

jscipione completed and merged a very large refactor of menu items and shortcuts handling in Tracker. This touches nearly every item displayed in menu bars and context menus in Tracker, and implements live updating of menus when modifier keys change, adds Cut/Copy/Paste to context menus, and more.

nipos added an option to strikeout text in StyledEdit.

PawanYr added speed, acceleration, and scroll settings to Touchpad preferences.

nephele deleted a bunch of obsolete and unused code from Appearance preferences, and renamed some classes to match Haiku conventions.

### Command line tools

augiedoggie fixed `rc -d` to correctly decompile `app_version` resources that were built on Haiku as well as on BeOS.

catmeow72 (a new contributor!) added a `-B` / `--get-brightness` option to `screenmode` to retrive the current brightness (instead of just setting it.)

### Kits

waddlesplash moved the system colormap to a shared area, avoiding all GUI applications needing to fetch and store it in their own memory.

nipos fixed tooltips in "channel slider" controls to display the expected values (rather than the "raw" values, which were 1000x larger.)

jscipione made BColorControl call `SetValue()` and `Invoke()` on color drops, if the control was enabled.

jscipione moved the ColorPreview classes to the private "shared" kit, deleting duplicate code between Appearance preferences and Terminal.

wadlesplash cleaned up the handling of ELF segments in the Debug Kit, fixing a lot of logic that did not handle multiple TEXT segments correctly (and Clang/LLD generate binaries with multiple TEXT segments by default, while GCC/LD can be configured to do so.) He also restored support for lookup of symbols based on remote memory access (instead of only ELF files), among other things. This fixes the generation of stack traces in debug reports for applications compiled with Clang (including most of the web browser ports.)

daveslusher (a new contributor!) fixed some potential buffer truncation problems when looking up MIME types.

### Servers

X512 cleaned up some error handling code in app_server.

nipos implemented `B_STRIKEOUT_FACE` in app_server.

### Drivers

waddlesplash improved the device probing logic in the FreeBSD compatibility layer to not perform so many string comparisons, and to avoid allocating and freeing big chunks of memory so often.

Lt-Henry adjusted the HID layer to parse "feature" reports (as well as "input" reports.)

kallisti5 adjusted radeon_hd to work properly after area cloning changes in the kernel (detailed below.)

DruSatori (a new contributor!) contributed support for "Alder Lake" chipsets to the `intel_extreme` modesetting driver.

korli added an `amd_thermal` driver to fetch temperatures on AMD systems, cleaned up the `pch_thermal` driver, and added both of those as well as the `acpi_thermal` driver to the default builds.

ilzu contributed support for the CTH-470 to the Wacom driver.

### File systems

waddlesplash added a missing check for parent directores in packagefs, fixing a rare KDL.

Jim906 contributed changes to make the NFSv4 driver build under the "userlandfs" infrastructure, which should make it much easier to debug. He also fixed some port buffer sizing problems in the userlandfs layer itself.

waddlesplash added support for "special" files (like FIFOs or UNIX sockets) to RAMFS. He also cleaned up some duplicate code, reduced lock contention, made the `readdir()` hook return more than one `dirent` at a time, and fixed some other bugs as well.

### libroot & kernel

waddlesplash's work on memory management logic in the kernel (and elsewhere) continued in January, with more fixes and improvements to page mapping, memory reservation accounting, kernel malloc block sizes, kernel stack allocation, cache fault counting, and much more. He also got OpenBSD's malloc up to performance par with libroot's current malloc (or better, in many cases) even under multithreaded workloads, though there's still more that needs to be done before it can be merged.

waddlesplash made some changes to avoid holding the "hot vnodes" lock too long in the VFS low-memory handler, fixing deadlocks.

waddlesplash adjusted the FD table creation logic in the kernel, shrinking the initial table size and breaking up some large allocations to make it much more likely to hit fast-paths.

cmeerw submitted a patch to libroot to fix an infinite loop in `pipe2` with Emacs/GNUlib.

waddlesplash added a fast path in the kernel thread code for when a thread is fetching its own `Thread` structure.

waddlesplash merged the bootloader and runtime_loader heap (malloc) implementations, as they were mostly copies of one another with differences in glue code only. He also fixed and implemented some tests for this heap, improved the glue code in runtime_loader, and did a bit of optimization of memory usage in the bootloader while at it.

waddlesplash fixed some mishandling of `errno` in the filesystem block cache that was leading to KDLs in some circumstances.

waddlesplash added an error definition for `ESOCKTNOSUPPORT`, which is in POSIX-2024.

waddlesplash adjusted permissions checks in the kernel to block teams from cloning areas they don't own with more permissions than the source area has (write permissions, specifically), and also to block non-root teams from inspecting other teams' memory properties.

waddlesplash moved the default selection of `B_RANDOMIZED_*` area types (i.e. ASLR) to libroot, so that it can be overridden for individual areas (if necessary).

waddlesplash added a `CLONE_AREA` message to the userspace debugger support in the kernel (used by the Debug Kit fixes described above), and added some more permissions checks to the user_debugger logic in general.

waddlesplash improved a permissions check in the `area_for` implementation, and made it distinguish between regular and "reserved" areas.

waddlesplash refactored the kernel's userspace symbol lookup logic to rely on the `extended_image_info` structures (which the `runtime_loader` reports to the kernel) rather than cloning the runtime_loader's debug information area. He also switched the `image_info` structures to use the standard `DoublyLinkedList` class, and cleaned up some other code related to linked-lists as well.

waddlesplash cleaned up code in runtime_loader, and then made it properly respect the `PF_EXECUTE` program header flag. Previously it just made all non-writable regions executable (which matched what GCC/LD generally generated by default anyway, but Clang/LLD binaries actually do have a non-executable TEXT section in most cases.) He also cleaned up the kernel ELF loader to not set user protections (based on `PF_*` flags) until the very end.

waddlesplash cleaned up a redundant `wait_for_thread` syscall.

waddlesplash improved the address-space blocking for uninitialized/freed memory. Under `PARANOID_KERNEL_MALLOC` (which is enabled for nightly builds), this reserves the virtual addresses most likely to be hit if "uninitialized" (`0xcccccccc`) or freed (`0xdeadbeef`) memory is touched. It only tried to reserve the 32-bit versions of the addresses, which wasn't very useful on 64-bit systems; now it reserves the 64-bit addresses as well.

waddlesplash changed page fault behavior to always insert new (clean) pages into the *topmost* cache object on page faults, rather than the lowest (deepest) cache object. In the case of a read fault, they would in some circumstances be inserted into the deepest cache instead. This behavior dated all the way back to NewOS, but now that Haiku has rather advanced copy-on-write, fork(), and cache resizing support, it was conflicting with other features (and probably isn't an optimization anyway as it would just cause more copy-on-writes when writes did occur.) This problem manifested in an extremely race-sensitive KDL, and after tracking it down and fixing it, waddlesplash added a new ASSERT that would have caught the problem immediately and without waiting for any races (and which has caught some other related problems already).

waddlesplash made the "I/O context root" lock (which must be held when `chroot`ing, among other things) an R/W lock, since the vast majority of the time an application's root path only needs to be read, not set, reducing lock contention.

waddlesplash reintroduced an "aligned pointers" optimization for `strcmp`, reducing CPU time/usage especially for longer strings as up to 4 bytes can be compared at a time now. He also replaced some other string functions with their musl equivalents.

### ARM & RISC-V

kallisti5 fixed some logic in the bootloader and serial code to fail properly if clock frequencies can't be fetched or are invalid.

### Build system

kallisti5 made some various fixes and improved support for architectures other than x86_64 in the build-cross-compiler Docker scripts.

waddlesplash fixed some missing build dependency declarations in the packagefs rules.

waddlesplash deleted some no-longer-needed license text files and cleaned up some of the remaining ones.

waddlesplash improved some error messages around Python detection in `./configure`.

daveslusher fixed some regular expression errors in Awk code that processes USB and PCI device lists.

### Documentation

nipos deleted some old and unused configuration files from the documentation directories, and replaced the remaining references to "OpenBeOS" with "Haiku".

jscipione reordered the keys enum in InterfaceDefs, and PulkoMandy added the missing elements (ASCII control codes and characters) for clarity and completeness.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
