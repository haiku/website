+++
type = "blog"
title = "Haiku Activity & Contract Report, July 2022"
author = "waddlesplash"
date = "2022-08-09 23:00:00-04:00"
tags = ["contractor"]
+++

As is now the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56236 to hrev56320.

<!--more-->

### Applications

Jim906 improved the state-saving logic of file open/save panels in a series of commits. These should behave with more consistency across all applications (not just built-in ones) now.

j.mairboeck added a missing newline to `--help` output of Terminal.

jscipione improved Tracker's "Open with" menu to handle applications of the same name better: now it will disambiguate more clearly where those applications are to be found by volume, path, or otherwise.

tqh fixed a crash on exit related to reference counting in WebPositive.

waddlesplash fixed some disabled logic in WebPositive to support a "hamburger menu" operation mode. (Does anyone actually want this feature? It does look kind of neat, but it seems otherwise cumbersome...)

jscipione improved the Appearance panel in some small ways, most notably to support text wrapping in the font previews, which is quite necessary on some languages with longer demonstration strings to avoid cumbersome window sizes.

### Drivers

waddlesplash fixed more crashes, initialization failures, packet loss, other instabilities with the newly-ported OpenBSD drivers, as well as making a bunch of code cleanups and consolidations to the compatibility headers. The only known remaining issues now seem to be connection failures, and there are some leads on the cause of this on the bugtracker.

waddlesplash made some tweaks to the XHCI (USB3) driver for better handling of control transfers and cleaner code.

kallisti5 adjusted the `radeon_hd` accelerant to be able to fail initializations. In conjunction with a change to `app_server` mentioned below, this resolves a number of "back screen on boot" problems.

milek7 contributed a patch to allow the PCI bus manager to have its initialization deferred. This is necessary on ARM and other platforms where the PCI bus is not necessarily discovered the same way as it is on x86 (and even there it has utility so that PCI can be initialized after ACPI, if applicable.)

PulkoMandy adjusted the PS/2 driver to not publish the keyboard device until after mouse probing is complete. This fixes keyboards being reset and losing the settings applied from the Input preferences unnecessarily.

tqh deleted the ISA floppy driver code. We never properly supported fixed-function ISA, which the code depended on to work, anyway.

waddlesplash moved a lot of touchpad event generation logic out of the kernel-side PS/2 driver and into the userland `input_server` addon. This removes a lot of code duplication and extraneous logic from the kernel, and also means the event generation logic can use the real math functions from libroot, which should make them significantly more efficient as well as easier to maintain.

### Servers

waddlesplash refactored accelerant loading logic in `app_server` to properly be able to fall back to the VESA or framebuffer drivers if an accelerant failed to initialize. This fixes some of the "black screen" problems on a number of AMD/ATI systems (following the aforementioned `radeon_hd` changes to let the accelerant fail to initialize) and potentially other hardware as well. He also made more accelerant routines optional, allowing some cleanup of the VESA/framebuffer drivers.

madmax fixed origin handling in shared views in `app_server`.

dcieslak implemented `BFont::BoundingBox`, an API that was present in BeOS R5, even, but until now was not implemented in Haiku.

waddlesplash added basic scaling for window borders under HiDPI environments. While not visually perfect, at least the borders are now not a fixed (small) size but scale with the rest of the UI.

jscipione fixed the build of `test_app_server`.

### File systems

PulkoMandy fixed some warnings and enabled -Werror for the FAT, RamFS, and some other drivers.

Mashijams added support for v5 block and leaf directories to the XFS driver, and later B+Tree directories and support for v5 files.

PulkoMandy seriously reworked the FUSE support in userlandfs: upgrading the compatible API to FUSE 2.9, adding support for the FUSE "lowlevel" API, adding documentation, and more. This makes it possible to use a much wider variety of FUSE filesystems on Haiku.

### Kits

An older patch from Leorize introducing a new class to the Shared Kit, `BMemoryRingIO`, was finally merged. This class functions as a relatively sophisticated ring buffer that can be used in any `BDataIO` interface. This was originally done for the Network Kit, but it likely will have broader application than that.

nephele added basic "dark" color constants alongside the system-standard default "light" ones. This may be used in the future to add automatic support for "dark mode." For now, it will be used in WebPositive to support "dark mode" web applications more fully.

### Build system

waddlesplash upgraded the default set of packages that Haiku is built with for x86 & x86_64. This brings in mostly bugfixes, but more notably it includes new versions of all the WiFi-related packages, so it is no longer necessary to run `pkgman update` on nightly images before the new OpenBSD drivers will function correctly.

### libroot & kernel

waddlesplash adjusted the POSIX FIFO system to support opening a FIFO in both read and write mode at once. This is supported by the other POSIX-compatibile operating systems and is relied on by the `fish` shell to support some features.

trungnt2910 fixed the printf implementation in libroot's handling of `%F`.

trungnt2910 implemented `locale_t` and its related methods from newer versions of the POSIX standard. This is a required feature for some more advanced applications like recent versions of the `fish` shell, and also is optionally used in plenty more besides.

waddlesplash fixed the kernel-side handling of the profiler. This had apparently been broken for many years, dating all the way back to the new thread scheduler's merge in 2014 or so, but it seems nobody noticed until more recently. Now it is possible to profile applications (or the whole system) properly once more, and even use graphical tools like KCachegrind to identify and fix performance issues.

### Documentation

nephele contributed a patch to add support for "dark mode" to the User Guide's CSS rules.

kallisti5 and PulkoMandy worked on moving release engineering documentation from Trac and into the tree, as well as updating it to take various changes to our build and other procedures into account. This is especially relevant for the next upcoming beta release...

### ARM!

davidkaroly continues his work on the ARM port. Last month he fixed page directory alignments, user memory functions, more TRACE statements, the FDT, and more.

madmax also contributed a patch to the ARM build system logic.

milek7 added userspace entry wiring, UART mapping, ACPI, the architectural timer, and more for ARM64.

### HaikuPorts

waddlesplash added support to Xlibe to specify "XSettings" values. This allows applications which check XSettings, like GTK, to use the system-default fonts and HiDPI scaling. As a result, all GTK applications in HaikuPorts should now automatically respect whatever the default system font is, and at least attempt to scale corresponding to the way other Haiku applications do. Some other coordinate and event handling bugs were fixed around the same time as a result of testing other applications.

Begasus added a port of Geany, a GTK-based IDE, and added or bumped the versions of various other GTK-based software.

3dEyes added a port of Ladybird, the lightweight web browser that originated on SerenityOS.

### That's all, folks!

A bit of a quieter month in general (I didn't work as many hours last month as the month before.) But I did see we have more recurring donors on GitHub Sponsors.

Thanks once again to all the donors who make my contract possible!
