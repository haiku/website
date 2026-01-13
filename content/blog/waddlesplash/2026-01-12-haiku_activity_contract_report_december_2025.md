+++
type = "blog"
title = "Haiku Activity & Contract Report, December 2025"
author = "waddlesplash"
date = "2026-01-12 21:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59188 through hrev59261.

<!--more-->

### Applications

axeld fixed light-mode colors in the Sudoku application (though dark-mode still needs work.)

korli fixed `SIGUSR1` being incorrectly masked for child processes of Terminal (like shells.) He also implemented support for hyperlinks specified by CLIs (as Terminal itself has already supported automatically "linkifying" any URLs that appear in console output for a long time.)

axeld changed AboutSystem to open with a golden-ratio window size, for a better appearance.

madmax fixed a bug in Deskbar that was causing an incorrect/duplicate display of applications in the "Twitcher" (the Alt+Tab popup.)

humdinger added a missing file to ActivityMonitor's localization rules, making it possible to translate some previously-missing strings from it.

DigitalBox98 fixed MediaPlayer's playlist code to work properly with media files on volumes without attributes, by guessing their mimetype if necessary.

apl implemented handling for 503 errors in HaikuDepot.

nipos fixed wheel (and touchpad) scrolling in People. He also fixed a missing (undrawn) border in all save panels, optimized HaikuDepot "usage conditions" window size for HiDPI, and adjusted MidiPlayer's volume slider fill color to not be hardcoded.

nathan242 changed Tracker to show the count of selected (out of total) items in the "count view".

waddlesplash made a number of HiDPI fixes to ProcessController, such as basing margins in menus on the font size, scaling the replicant's default width, allowing the standalone replicant window to be manually resized (which could be nice if you want a custom-sized view on your Desktop), and more.

PawanYr added a tool to the Installer to copy the EFI loader onto the system EFI partition, reducing the number of manual steps that need to be taken to set up Haiku on an EFI system.

jscipione added support for live-updating the colors of the Credits view in AboutSystem.

jscipione made read-only/disabled fields in Mail navigable and selectable, and also changed text control colors to update automatically.

PulkoMandy made DriveSetup show on all workspaces if Deskbar isn't running. (When running the Installer directly from the first-boot prompt, it's still possible to switch to other workspaces with the key commands, so if the window doesn't display on all desktops it's possible to get confused.)

### Command line tools

axeld cleaned up some constants in the `bfs_tools`, to avoid conflicts with system constants when building on non-Haiku systems. He then added build system logic to make building them on other OSes easily possible.

PulkoMandy changed `makebootable` to have safety checks to write to BFS partitions (preventing corruption if it's accidentally used on a non-BFS partition), and also to check if it needs to run at all, and print a diagnostic message if it's not.

waddlesplash removed a workaround from `checkfs` that's now unnecessary following an API change to the Storage Kit (and which was breaking its use on paths inside mounted filesystems.)

### Kits

PulkoMandy, working from an old patch by KapiX, decoupled the displayed label from the view name of `BTab`s. The old behavior is preserved for compatibility when running under a BeOS ABI, but elsewhere we now don't change the `BView` name when changing the `BTab` label.

OscarL changed `BTextView` to move the cursor position to the end of the selection on "Select All". (This matches the behavior of other OSes and closed a quite old ticket.)

waddlesplash fixed some incorrect memory management in `BUSBInterface` discovered by some developers experimenting with USB webcam support.

nipos fixed some incorrect changes to view colors caused by the code that draws slider triangles. He then fixed the translator preferences panels to use sliders with triangles.

PulkoMandy improved the drawing of "partially on" checkboxes, to draw a "-" through the middle instead of just changing the color.

### Servers

SED4906 fixed notification_server to only make "progress" sounds when a notification's progress actually changed.

X512 dropped some unused message codes from the app_server protocol definitions.

### Drivers

More of samuelrp84's large patch series to improve support for Elantech touchpads was merged, including tracing fixes and improvements for the Mouse driver, code cleanups around finger handling and tap statuses, fixes to two-finger scrolling, and more.

waddlesplash updated the FreeBSD driver compatibility layer for FreeBSD 15, and then updated all ethernet and WiFi drivers from FreeBSD to the versions from the FreeBSD 15 release.

### File systems

waddlesplash improved some logging in the UDF driver, and fixed an assertion-failure KDL triggered by recent refactors to the VFS.

axeld merged some patches to the BFS driver that work towards resizing support.

Jim906 fixed a double-lock problem in the FAT driver, fixing some rare KDLs.

PulkoMandy reworked how timestamps of exact seconds (i.e. `tv_nsec == 0`) are stored on BFS. Internally, a nonzero value is preferred, because avoiding duplicate values in timestamp indexes greatly speeds things up, so a random value is used when no subsecond timestamp is specified. However, some bugs caused these values to be exposed to userland, which was causing problems for some applications. After the rework, random values are still used when possible, but they're now correctly reported to userland as `0`.

### libroot & kernel

PulkoMandy consolidated some duplicate MMU-related code across the EFI bootloaders.

nathan242 added the hrev number to the standard KDL opening message, making it easier to determine from KDL output what Haiku version is in use.

Anarchos added a missing clear of a network buffer in the kernel socket handling code, fixing problems where addresses were not always terminated properly. waddlesplash came by afterwards with a more systematic solution to the problem, potentially fixing other bugs in the process.

waddlesplash fixed a number of problems with `strftime` and related APIs, such as missing support for `%k` and `%l`, incorrect handling of Unicode spaces, and more.

korli adjusted the TCP implementation to send `RST` instead of `FIN` when a connection was closed by an application but received data is being discarded. (This fixed a Go testcase.)

waddlesplash fixed a memory leak in the address space implementation that was triggered by the Rust compiler and other tools that used lots of memory. He fixed another potential leak and made some code and tracing cleanups at the same time.

kallisti5 and PulkoMandy implemented basic support for network booting in the EFI loader. (PulkoMandy also cleaned up some other bootloader code around the same time.) This now works at least on (32-bit) ARM, where PulkoMandy was using it to test builds without needing to flash drives every time he made a new build.

PulkoMandy moved the `networks` file, as used by `getnetent` and related APIs, to the proper data directory (instead of `/etc/` where it is on other \*NIXes.)

cmeerw imported a change to the DNS resolver from NetBSD to properly initialize resolver state objects.

### Build system

PulkoMandy cleaned up and improved the shared `FunctionTracer` class and deleted duplicate copies of it. He also renamed some functions that potentially conflicted with the global `debug_printf` method, and made the global `debug_printf` return the number of printed characters for compatibility with other `printf`-like methods.

PulkoMandy and waddlesplash moved a number of utility headers that are not kernel-specific from `headers/private/kernel/util` to `headers/private/util` (such as linked-lists, hash tables, bit operations, and more.) This makes it clearer that they can and should be used outside the kernel (and indeed, already were being used outside it in many cases.)

waddlesplash dropped some unnecessary disablings of `DEBUG=1` for certain components from the build logic.

PulkoMandy made a change to try and exclude unneeded catalogs for dependent shared libraries from packages (e.g. catalogs for `libbe.so` should only be in `haiku.hpkg`, not `haiku_datatranslators.hpkg`). However, this seems to have caused a regression where they aren't included even in the base package, so more work is needed.

humdinger fixed a number of problems in the WebPositive "loader pages" (the stub pages that power the default bookmarks in WebPositive), such as incorrect MIME types, encoding, and not using HTTPS.

OscarL changed the "Makefile Engine" to maintain separate flags for the C and C++ compilers, fixing some warnings.

cmeerw added basic support to the build system for building Haiku on NetBSD.

KapiX fixed the build of `test_app_server`.

### Documentation

DigitalBox98 added a "Device Kit" section to the Haiku Book.

PulkoMandy fixed an incorrect boolean in the `BKeyStore` documentation.

cafeina added documentation for `BSimpleGameSound` and `BSerialPort`.

### ARM

PulkoMandy fixed the EFI bootloader on ARM to relocate the UART (serial out) when it remaps virtual memory for the kernel, fixing serial out on real hardware past the bootloader stage.

### Are we beta6 yet?

Not quite. There has been some discussion on the mailing list as the ticket list gets smaller, but there's still at least some more regressions that need to be fixed. But it looks like we'll be starting the release process in the next month or two, most likely...

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
