+++
type = "blog"
title = "Haiku Activity & Contract Report, October 2024"
author = "waddlesplash"
date = "2024-11-05 17:30:00-05:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58188 through hrev58291.

<!--more-->

### Applications

nipos adjusted Icon-O-Matic to open file panels in the same folder as the current file, fixed a bug in FontDemo that was preventing direct selection of font families, fixed Terminal to not change view sizes when changing font sizes, fixed text colors in Screen and ScreenSaver preferences, and more.

apl fixed the "Open" button in HaikuDepot not displaying application names in some circumstances, refactored HaikuDepot's user ratings code, improved default the logic around default icons, and more.

waddlesplash added `MoveOnScreen()` calls to a number of applications and preferences, to avoid having windows start offscreen after screen sizes changed. pinaraf contributed a similar fix for the Printers preflet.

sen (a new contributor!) made a number of improvements to the PowerStatus application to better support systems with multiple batteries, including proper handling for unused batteries, computing of time-left and low battery alerts when there's more than one battery available, and handling of battery disconnects while running.

jscipione made some code changes to Tracker related to a work-in-progress refactor of the shortcuts code. waddlesplash made a number of cleanups to the Find panel, deleting unneeded and unwanted code especially around the "clean up old queries" feature, and reinstating the draggable query icon. jscipione fixed a variety of issues around various parts of Tracker, including automatically closing extra windows when switching to "spatial" mode, fixing crashes related to popup menus, and more.

CodeforEvolution implemented clearing the scrollback via an ANSI control sequence in Terminal (a feature already supported by xterm, Konsole, and others.)

### Kits

nipos fixed the Calendar view to vertically center date labels.

waddlesplash added some checks in BMessage to prevent more crashes when deserializing corrupt messages.

mt fixed some argument naming inconsistencies spotted by cppcheck.

X512 cleaned up some code in BView to use a utility function for sending `BShape` data to app_server.

ayu-ch changed `BPoint::PrintToStream` to actually print some decimal places.

nephele changed `BTextControl` to make the background of controls in an "invalid" state turn red.

### Drivers

waddlesplash adjusted the `broadcom570x` driver to use MSIs for interrupts when possible, fixing support for various devices.

CodeforEvolution ported the `vmxnet` driver from FreeBSD, to support VMware's `VMXNET` paravirtualized networking interface.

waddlesplash adjusted how reference counting for USB objects works, fixing some bugs and adding more robust assertions (though this introduced some new KDLs which could either be old bugs or just new regressions which haven't been solved just yet.)

gscrain added some missing definitions from the USB Audio v2 specification to the headers, and added more dumping of its descriptors to `listusb`. (The USB audio driver itself hasn't been modified yet to support this.)

waddlesplash renamed the `intel_cstates` CPU idle driver to `x86_cstates`, as it also works on modern AMD hardware, and adjusted some fallback behavior in it. (He also modified another spin-loop in the kernel to make use of it.)

waddlesplash added some more sanity assertions to the network stack.

waddlesplash removed some duplicated code from the AHCI (SATA) driver, making it use common routines instead. He also fixed a 32/64-bit address mixup, which was causing boot failures on some 32-bit systems with more than 4GB of RAM.

waddlesplash reduced some log spam from the HDA driver.

waddlesplash fixed the SCSI stack to more properly respect DMA address restrictions.

### File systems

waddlesplash optimized searching for the next free block in the BFS block bitmap code, greatly speeding up creation and resizing of files on especially fragmented partitions.

waddlesplash reworked packagefs to have only installed directory nodes be r/w-locked, instead of *all* nodes. This saves 40 bytes (on 64-bit systems) per installed package file, which adds up to multiple MB on a system with lots of packages installed.

waddlesplash cleaned up some unused parameters in the block cache APIs.

### libroot & kernel

waddlesplash cleaned up the bootloader's heap memory allocation logic, and then increased the size of maximum "standard" heap allocations to be large enough for packagefs buffers to fit. This massively reduces after-boot memory usage when booting with the BIOS loader, as not all bootloader heap memory is properly cleaned up yet, it seems. (The EFI loader is also affected, but not nearly as badly.) He also tried to refactor some of the bootloader memory management code to make memory cleanups on exit more feasible, but encountered a number of difficulties and only partially succeeded.

VoloDroid fixed the re-initialization of serial output in the EFI bootloader on x86_64.

waddlesplash turned down tracing in the SMP code in the BIOS bootloader.

waddlesplash adjusted the bootloader to display the system package version with the latest state, making it clearer what will actually be booted.

waddlesplash relaxed a check in the virtual memory types logic when legacy MTRRs are enabled, avoiding KDLs in some situations.

waddlesplash made the kernel discard swap space on-disk when swap is disabled.

waddlesplash added an assertion in the core virtual memory code to check that we don't commit (reserve) more memory than we need for any given region, and fixed a number of places in the code where the accounting for this wasn't quite correct (though some still linger.) He also fixed interaction between the "set memory protection" (`mprotect`) and "set area protection" APIs. He also cleaned up some of the assertions and KDL commands, implemented some more debugging methods, and moved some source code around for better organization.

waddlesplash did some refactors and cleanups to the early boot memory allocation code in the kernel, fixing the boot on some systems with large amounts of RAM (or systems with unusual memory layouts.)

waddlesplash (re)added some more assertions to the kernel r/w locking code, fixed some logic errors in the low resource manager, and added a missing vnode reference acquisition in the file cache.

mmlr implemented Ctrl+D as a shortcut to exit KDL (when it's possible to do so, that is.)

nipos and waddlesplash fixed some bugs in the ICU time conversion code for dates in the future (or past).

waddlesplash adjusted more parts of libroot to use the common utility function for converting `timespec` structures.

waddlesplash cleaned up macros in some headers, including `<sys/select.h>`, to avoid namespace pollution and duplicate definitions.

korli adjusted FIFOs to honor `O_NONBLOCK` on `open()` correctly.

korli changed driver loading to prefer loading from the non-packaged / "user" directories over the packaged ones (unless loading drivers from non-packaged is disabled entirely.)

### Documentation

drea233 fixed a typo in the Keyboard documentation.

### Build system

jessicah made `./configure` detect the system `wget`'s supported retry flags. waddlesplash adjusted how a Python interpreter can be specified to `./configure` to match other tools, and fixed its version checks. OscarL made `./configure` automatically choose the right GCC when running on `x86_gcc2h` platforms.

CodeforEvolution removed an obsolete definition from the `package_repo` Jamfile.

waddlesplash rehabilitated the build of the `DiskDeviceManagerTest`.

### ARM

oanderso implemented instruction cache synchronization, fixed some double-locking problems, implemented `VMTranslationMap::MaxPagesNeededToMap`,

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible.
