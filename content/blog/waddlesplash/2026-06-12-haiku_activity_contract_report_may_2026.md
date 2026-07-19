+++
type = "blog"
title = "Haiku Activity & Contract Report, May 2026"
author = "waddlesplash"
date = "2026-06-12 14:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59672 through hrev59753.

<!--more-->

### Applications

jscipione fixed some regressions in Tracker causing the scroll position to not be set properly when navigating between directories, and dropping files onto other files not working. He also fixed drag and drop of icons onto views with a different icon size, restored the Trash pose on the Desktop in file panels, refactored the drag bitmap's appearance, and more.

jscipione tweaked the layout of the "recents" count settings in Deskbar.

apl fixed a regression in HaikuDepot causing crashes when opening package files. He also refactored how the "Not available" views (e.g. for reviews) are shown, started reworking package selection handling, improved keyboard navigation support, and more.

humdinger tweaked the "delete old states" option in SoftwareUpdater settings to have a less technical label. He also fixed Tracker to show the name of the "Trash" directory translated, if translated folder names are enabled.

nipos fixed WebPositive to not open a homepage tab when opened by clicking a URL in some other application.

Zardshard fixed an assertion failure crash in Icon-O-Matic.

nipos fixed ShowImage's toolbar being cut off in fullscreen mode. He also fixed some window size limits in ActivityMonitor.

humdinger improved the color choices, and the appearance of the color selector, in StyledEdit. He also split the "Font" menu into "Font" and "Style" menus, which improves things on systems with lots of fonts installed.

nephele changed WebPositive's default search URLs for Google and DuckDuckGo to use the "no-AI" variants. He also improved the appearance of some buttons under HiDPI.

humdinger truncated long history items in TextSearch to a fixed width, to prevent the menu from getting larger than the screen width.

### Command line tools

PulkoMandy updated the USB IDs database, and then added decoding for more "CDC" descriptor types in `listusb`.

### Kits

X512 fixed various "mouse tracking"-related bugs in BListView, including incorrect selection changes and more.

waddlesplash fixed a regression preventing `BTab::SetEnabled` from working if it wasn't attached to a BTabView.

waddlesplash fixed a memory leak in Package Kit's job handling.

madmax fixed the BMessage-to-driver_settings converter to properly escape strings when writing out messages. This bug led to the wireless networks settings file not properly storing names of wireless networks with spaces or other special characters in them, leading to those networks not automatically being connected to (if requested) on startup, fixing a number of "WiFi autoconnect doesn't work" problems (but not all of them; some remain, it seems.)

### Servers

waddlesplash refactored how screen configurations are saved and restored in app_server, fixing the screen resolution not resetting properly after applications that change the resolution are quit or killed.

KevinAdams05 removed the "Save as PDF" default printer, which can't work by default if the "PDF Writer" package isn't installed. (That default printer should instead be added by the PDF Writer package.)

### File systems

nathan242 fixed various filesystems (including BFS) to properly send node monitor notifications when files are truncated via `O_TRUNC`.

jessicah fixed a crash in BFS when trying to create a volume without indexes.

### Drivers

PulkoMandy fixed a crash in the I2C driver (which is still disabled by default) on some hardware.

PulkoMandy did a bunch more work on the MMC driver (which is also disabled by default), improving initialization and getting it closer to working.

shivamsinghydv implemented parsing of more device information messages in the Bluetooth server.

nathan242 ported the `realtekwifi8187` driver (`urtw` from FreeBSD), adding support for some older Realtek USB WiFi hardware.

smrobtzz added logic to `intel_extreme` to try and disable framebuffer tiling, potentially fixing garbled screen output on some hardware.

smrobtzz fixed a race condition in the ACPI driver, fixing problems with ACPI battery and shutdown on various hardware.

### libroot & kernel

waddlesplash and trungnt2910 made changes to the kernel's FPU handling to allow AVX-512 to be enabled on processors that support it.

ypsvlq contributed a change to increase the maximum user stack size all the way to 64 MB. (This is apparently needed by the Zig compiler.)

jessicah added some symbol visibility definitions to `elf.h`.

nathan242 fixed the driver_settings file format loader to not error out on trying to load a zero-length file, fixing some problems in the launch_daemon and other applications that consume these files.

nathan242 added a missing update of partition names in the kernel, fixing a very old bug where renamed partitions showed the old name in various places across the system.

waddlesplash cleaned up some nonstandard headers (e.g. `null.h`), consolidated them into standard ones, adjusted the definitions of some constants, and fixed the definition of `SIZE_MAX` to be of the correct type.

PulkoMandy increased `PTHREAD_KEYS_MAX` to 512, to accomodate the Rust compiler needing more keys.

waddlesplash added an assertion to make sure that a thread's "pinned to CPU" counter does not become negative.

waddlesplash added a missing NULL check to an `ioctl` implementation, fixing a kernel crash under rare circumstances.

waddlesplash fixed some assertion checks in the virtual memory page logic that were leading to KDLs under high load.

waddlesplash fixed KDL initialization when some CPUs are stuck in spin loops and aren't responding to "start KDL" messages. This should hopefully allow debugging and diagnosing more "whole system hang" problems. He also deleted the "last caller" spinlock debug system, which is long since obsolete.

waddlesplash overhauled the "user timer" locking system, in order to fix some whole system hang problems, but also to improve performance and correctness: now there are more granular locks, better assertion checks, and more.

waddlesplash cleaned up x86 per-CPU timer handling, removing unnecessary hardware register reads and more, and then re-enabled some checks to bypass resetting timers entirely to improve performance.

### Build system

SED4906 added support for the host compiler being GCC 16.

waddlesplash fixed a missing parameter in GCC 2, and tweaked the build options to allow it to be compiled on more modern systems.

### Documentation

PulkoMandy fixed some typos in the documentation, and significantly improved the documentation of the SD/MMC drivers.

madmax reworked `BListView::CurrentSelection`'s documentation to be clearer about what values it returns.

cafeina wrote documentation for the USB Kit and some Network Kit classes in the Haiku Book.

### ARM & RISC-V

smrobtzz added some basic fixes for booting on Raspberry Pi 5 (but there's a lot more to do before this can fully work.) They also made a number of improvements to CPU startup logic, especially for SMP.

### Are we beta6 yet?

Not quite. More regressions have been fixed, leaving only a small number remaining, while most of the WebPositive issues have also been fixed. There will hopefully be more movement this month on that front, we'll see...

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
