
+++
type = "blog"
title = "Haiku Activity & Contract Report, October 2022"
author = "waddlesplash"
date = "2022-11-14 23:40:00-04:00"
tags = ["contractor"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56505 to hrev56564.

<!--more-->

### Applications

humdinger adjusted some strings in various applications to use sentence-casing, as our UI guidelines specify.

OscarL fixed BootManager's usage of partition name APIs following the previous month's API changes.

apl fixed the "Changelog" display in HaikuDepot.

OscarL fixed some minor annoyances with the Sounds preflet.

korli added a display pane to the Devices application for USB devices (after refactors to make these devices show up, as noted below.)

OscarL fixed updating the displayed hrev when using AboutSystem as a replicant instead of a regular application.

axeld added an option for 4096-size blocks in DiskProbe. This is the size of a standard memory page, and can be useful when looking at memory dumps, RAM disks, or other such things.

waddlesplash refactored some windows and controls in HaikuDepot and MediaPlayer to be properly sensitive to font size changes and HiDPI displays.

korli added support for displaying vendor names for ACPI devices in the Devices application.

waddlesplash massively improved the efficiency of the wireless networks display in Network preferences (and `ifconfig` also) and thus its performance.

OscarL fixed TextSearch to not re-search unnecessarily (e.g. when changes to the filesystem which are clearly not file content changes occur, there is no need to re-run the search.)

PulkoMandy fixed thumbnail caching in Tracker.

### Command-line tools

OscarL did more work on making `checkstyle.py`, the internal coding style checking tool, run under Python 3.

korli switched `listusb` to use the class-code table from `usb.ids` instead of a custom hard-coded one (which did not have all the types of classes.)

korli added an `acpi_call` tool to directly invoke ACPI routines from userland. (This is an advanced feature likely only of use to developers to test functionality, it is not included in the main system packages as a result.)

korli adjusted the `mountvolume` tool following changes to partition name APIs.

korli wrote a script to extract all the device IDs that network drivers declare support for in their source code into one large list, for convenience of browsing.

### Drivers

korli switched all the USB host drivers (i.e. USB1/2/3 interface drivers) to use the "new"-style driver model (which has really been around in the Haiku kernel for many years) instead of the "legacy" one inherited from BeOS that they were using until now. He then made their "explore" thread always get invoked when new USB busses are attached (which mostly happens during early boot), to ensure as many devices as possible are detected in case the boot device is far down, and export all devices to the "new"-style device manager (which means USB devices finally appear in the Devices application now.)

korli fixed the string lengths of PCI class information utility routines.

korli added some entries for newer devices to the HDA driver.

korli added more device IDs to the PCH I2C bus manager from newer Intel hardware.

waddlesplash implemented a polling fallback mode for the NVMe driver. This way, certain NVMe devices that do not seem to support interrupts-based I/O can still be used with Haiku; previously they caused boots to stall out or the whole system to be painfully slow.

X512 fixed configuration-space access in the VirtIO-MMIO bus driver.

korli switched the USB-ECM driver to use the new driver API. This marks the first USB device driver to be migrated, and paves the way for the rest to be as well.

PulkoMandy made a change to ensure PCI information is still printed to the syslog even if initialization of the PCI bus was "deferred," as it is when ACPI is available.

kallisti5 made some minor fixes to the `radeon_hd` driver while investigating other issues.

### Servers

waddlesplash adjusted the logic for automatically picking a larger font size in `app_server` on its first startup, following axeld's suggestions.

waddlesplash fixed the shutdown window (handled by the `registrar`) to resize itself automatically when an especially long prompt is displayed.

### File systems

Mashijams implemented basic support for extended attributes in the XFS driver, and made a few other repairs and refactors to it. He also made some optimizations.

waddlesplash turned certain kinds of path truncation in the NTFS driver into errors instead of warnings, potentially preventing some KDLs. He also added some better accounting for certain kinds of null-terminated strings.

PulkoMandy removed automatic volume name generation (for example, when USB drives have no specified name) from the file systems and standardized a single mechanism for it in userland, so that all filesystems can benefit from it.

### Kits

waddlesplash adjusted `BAlert` to trigger relayouts when its icon is changed while it is open.

nielx merged the `netservices2` kit into the main tree. This is a massively re-worked version of the Network Services Kit (Haiku's built-in HTTP, etc. clients) with a lot of the pitfalls and problems of the first (current) one resolved. It still needs some work, and it is not much used at present, but it provides a better path forward than the existing one did.

### libroot & kernel

korli made the kernel verify that drivers can be reloaded if necessary (i.e. we already have mounted the boot device) before unloading them. This may fix a few rather rate boot-failure issues.

davidkaroly made changes to embed the hrev number in the bootloaders, so they can be clearly seen and when or what version a bootloader is from immediately apparent. This is especially relevant to the EFI loader which is not updated with the rest of the OS.

davidkaroly added the x86 32-bit EFI loader to the default builds. It should now be possible to boot regular 32-bit anyboot images via EFI.

davidkaroly also refactored the memory-management portion of the RISCV64 portion of the EFI loader to use more generic code instead of its own logic.

axeld added and implemented a missing function from the kernel's C++ support section.

korli implemented some hooks to fetch the driver associated with a specific device, for diagnostics in the Devices app.

pengphei contributed an implementation of `pthread_getname_np` and `pthread_setname_np`. These functions (found in the BSDs) rename the specified thread, which Haiku threads natively supported but was not exposed in a cross-platform way before now.

davidkaroly adjusted how the bootloader stores its logs to use a proper "ring buffer", which can be handed off directly to the kernel for capturing more of the early-boot phase in debug logs.

One of the Emacs developers reported an oversight which prevented Emacs from using `posix_spawn` on Haiku, which was corrected by waddlesplash.

waddlesplash fixed some performance problems in the kernel VFS layer spotted by a benchmark used on the BSDs, following comments by a FreeBSD developer. He also fixed some locking logic and added a missing ASSERT.

### Build system

kallisti5 changed the build system to use `grep -E` instead of `egrep`, as the latter prints a rather annoying deprecation message now.

kallisti5 updated some boot testing scripts to try and extract some error messages from the boot process automatically.

waddlesplash removed the logic for generating the User Guide and Welcome packages from the main Haiku build system, and then removed the actual contents of those packages themselves from the main tree. The User Guide and Welcome pages are now stored in a separate repository and built as separate packages. This prevents having to update all the Welcome and User Guide packages every time a new build of Haiku was made, as they are now versioned entirely separately.

### Are we beta4 yet?

It's close! The branch has been cut and final fixes are ongoing. Check the forums or the bug tracker for current status, and to see how you can help out with trying test builds!

### That's all, folks!

Thanks once again to all the donors who make my contract possible!
