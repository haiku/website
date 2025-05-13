+++
type = "blog"
title = "Haiku Activity & Contract Report, April 2025"
author = "waddlesplash"
date = "2025-05-12 20:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58788 through hrev58847.

<!--more-->

### Applications

jackburton79 fixed a case where the cursor color in Terminal wouldn't be initialized, especially notable when running Terminal as a replicant. He also added support for executing commands in Terminal using the scripting API, and made the cursor when the view isn't focused empty instead of filled.

ilzu made a number of improvements to session management on startup in WebPositive, including restoring the previous session even if launched to open a link, saving and restoring workspaces, and more.

OscarL adjusted StyledEdit to block most ASCII control characters from being typed.

humdinger adjusted LaunchBox to make an error message translatable.

humdinger added checks to Sounds to more gracefully handle the "sounds" directory not existing.

waddlesplash made a number of fixes to Tracker, including: fixing a memory leak of menu items, avoiding rebuilding menus when not necessary, avoiding rescanning templates on every rebuild of the context menu, caching add-ons' supported mimetypes rather than re-scanning them frequently, watching a directory and all its child nodes at once rather than each node individually, and other changes to significantly improve performance and responsiveness when opening menus, selecting files, or using queries along with code cleanups and other improvements.

PawanYr contributed a large change to add area selection support to the Screenshot application.

### Command line tools

jmairboeck modified `listusb` so that the "port status" information is properly aligned in the printed output.

waddlesplash made the `leak_analyser` tool ignore everything allocated inside the internal Locale Kit initialization routine, as this isn't destroyed on close.

### Kits

waddlesplash added some more NULL checks to `BString`, fixing crashes in out-of-memory situations.

A patch from bitigchi to make `BDecimalSpinner` use `BNumberFormat`, for locale-aware number formatting and parsing, was merged.

augiedoggie added a MIME definition for the generic "flattened BMessage" type, so that such files have more information shown about them in Tracker than just "file".

waddlesplash made some cleanups to the dispatch of shortcuts without the `Cmd` key.

X512 fixed a bug in `BPopUpMenu` that was setting up shortcuts in the wrong window. This fixes a number of regressions (since beta5) in shortcut handling that had been quite annoying.

### Servers

waddlesplash made a number of changes to the HID drivers and input_server device handlers to make "interruptions" (i.e. `SIGINT`) be handled properly, allowing input_server to be exited instead of hanging forever.

### Drivers

ilzu added support to the Wacom driver for the "Cintiq13HD" device.

kuku929 tried to add support for more than one PCI bus on x86 (needed for certain kinds of bridge devices), but unfortunately the change caused boot regressions and had to be reverted.

Captain0xFF added device IDs for more Polaris10-series GPUs to the `radeon_hd` driver.

waddlesplash fixed a boot failure regression in the NVMe driver after last month's changes to activate power-saving, and korli fixed an oversight that was not passing the right parameters down to the device for power saving.

waddlesplash added another check to the `acpi_battery` driver that fixed the boot on at least one machine.

### File systems

waddlesplash reworked some unused code in the query parser/evaluator to add a `B_QUERY_WATCH_ALL` flag, which makes the query send node monitoring notifications for all changes to files within the query, not just changes that result in a file getting added or removed from the query results. (This is now used in Tracker to considerably improve the efficiency of queries with large numbers of results.) For now, the flag is private, but it could easily be made public in the future. He also made changes to avoid sending duplicate rename notifications when this flag is set.

### libroot & kernel

waddlesplash changed libroot to call thread-exit hooks after C++ destructors during exit, fixing some crashes in certain applications.

PulkoMandy added a declaration for `MAP_FILE` to the headers, which some applications want to use with `mmap` "just to be sure" (it's not needed on Haiku and is defined to `0`.)

waddlesplah replaced the (very old) glibc string to integer/float conversion routines in libroot with musl's (and then deleted the glibc versions.)

zeldakatze made some tweaks to the PowerPC paging code to make it build after recent refactors.

waddlesplash made a number of changes to the page-freeing logic in the new `malloc`'s global cache to better handle "fragmented" frees and avoid creating thousands of areas unnecessarily.

trungnt2910 added call-frame information annotations to the syscall wrapper routines, so that they can be handled properly by `libunwind` and other such tools.

trungnt2910 added support for `RTLD_NOLOAD`, an extension that's not in POSIX but is broadly available on other OSes that support `dlopen`. He also made `dladdr` work on `commpage` symbols, which will allow `libunwind` to properly unwind exceptions even through signal frames.

korli added UNIX-style load-average tracking (i.e. `getloadavg(3)`) to the kernel and `libbsd.so`, allowing some build and test tools to more intelligently schedule jobs.

jmairboeck changed the `fenv.h` headers so that the standard `_DEFAULT_SOURCE` definition (automatically defined in `<features.h>`) suffices to enable non-standard extension functions and definitions.

waddlesplash adjusted handling of double-faults on x86, fixing an incorrect GS (that was making the kernel debugger useless) on 32-bit, calling the double-fault-specific kernel debugger entry point on 64-bit, and adding more safety checks around the "detect double fault CPU" method. He also added some bounds checking and fixed error handling in the kernel debugger command execution path.

waddlesplash fixed the build of the "video text console" for the bootloader (a console implementation that uses the same framebuffer-based console facility as the kernel debugger does), made it usable in more situations, and more. He also wrote up a hack (not committed to the main Haiku repository) to build BIOS loaders with it enabled by default, for experimental use on hardware (e.g. Chromebooks) that faults when trying to use the standard text mode console.

waddlesplash sychronized the `stdio`, `printf`, and `sscanf` implementations with a much newer version of upstream glibc than they had been using, fixing some corner-case bugs in the process. This initially caused some regressions, but those were fixed in relatively short order.

### Build system

PulkoMandy updated the version of `m4` used in bootstrap builds.

waddlesplash added missing PCI modules from the bootstrap build declarations.

### Documentation

PulkoMandy updated some of the documentation around bootstrapping and fixed some links in the package management internals documentation.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
