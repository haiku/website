+++
type = "blog"
title = "Haiku Activity & Contract Report, July 2026"
author = "waddlesplash"
date = "2026-08-14 12:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59821 through hrev59921.

<!--more-->


### Applications

humdinger adjusted a lot of GUI strings in the Bluetooth preferences to conform to our Interface Guidelines.

aquamatic123 (GSoC '26) implemented a number of improvements in the Devices application. (He's since posted a blogpost covering these.)

PulkoMandy cleaned up the layout of the URL bar for WebPositive, making things look a bit cleaner. madmax fixed the scaling of the close button on WebPositive's Find bar.

k32n13 improved the pixel positioning of filename editors in Tracker, and also adjusted highlight box sizing slightly.

humdinger moved "More details" in SoftwareUpdater into its settings window.

madmax fixed a number of problems with translation catalogs in various applications, including Tracker, Terminal, Network preferences, and more.

nathan242 implemented the ability to change the partition types in DriveSetup, making it easier to set up GPT disks for Haiku.

madmax fixed the redrawing of some parts of Tracker's Info window and "count" view. jscipione fixed dragging inside the root window, and disabled the Disks dropdown on open/save panels.

PulkoMandy updated the credits section of AboutSystem.

apl fixed HaikuDepot to automatically deselect packages when the filtered list changes and they're no longer in it.

waddlesplash fixed a crash in the OverlayImage replicant.

PulkoMandy updated the PNP and ACPI IDs lists used by Devices.

### Kits

k32n13 fixed problems with invisible carets, margin/padding drawing, and missing uses of cached font heights in `BTextView`.

phoudoin fixed shortcuts not working properly when Caps Lock was enabled.

KevinAdams improved the x86 CPU name detection logic (used by AboutSystem and other applications) significantly, relying more on the "brand string" and only hardcoding names for CPUs that have no or incorrect "brand string"s. PulkoMandy came by later and improved things a bit more.

korli fixed some problems with buffer management in `BBufferIO`.

haydentech fixed the drawing of status bar frames in the default control look.

PulkoMandy fixed crashes on playing certain video files that needed colorspace conversions.

### Servers

waddlesplash fixed a lock-order inversion in app_server's cursor routines, fixing a hang.

PulkoMandy fixed app_server to save brightness settings even if workspace settings don't exist.

madmax fixed some crashes in the Bluetooth server.

korli added an `acpi_ac` monitor to power_daemon.

### File systems

kallisti5 fixed timestamp comparison and some error handling logic in the NFSv4 driver.

nathan242 adjusted the "Intel" partitioning system to properly handle re-formatting a disk that previously had an ISO9660 header.

waddlesplash changed BFS to update file stat times when the file size changes or is truncated, fixing a POSIX compliance issue which was causing `ninja` to perform unnecessary rebuilds.

AbdullahZulfiqar2005 implemented the free-blocks computation in BTRFS.

### Drivers

waddlesplash fixed a regression where changing video modes under the VESA driver wouldn't update the video mode used in KDL.

X512 tried to enable HDMI audio output in the HDA driver, but unfortunately it broke audio settings for regular audio devices and had to be reverted.

vighnesh-sawant (GSoC '26) started work on implementing support for "SCO" connections in the Bluetooth stack, which will be needed for Bluetooth audio support.

mohammedrattia (GSoC '26) continued work towards supporting Bluetooth HID devices, with changes to connection pairing and more.

smrobtzz moved x86 PCI IO port management into the x86 PCI driver.

waddlesplash adjusted the FIFO's `select` implementation to not report events as selected that will never actually be notified.

waddlesplash made a number of fixes to the NVMM interfaces with the Haiku kernel, and then thanks to a report from SED4906, discovered that the problem preventing Haiku from booting to the desktop inside NVMM was actually on the Haiku side. With this worked around, Haiku booted to the desktop successfully, and so did a number of other OSes (including Linux): it appears the problem that was leading to random crashes was fixed some earlier changes waddlesplash did and not noticed then. With this fixed, NVMM was enabled by default, including on the beta6 branch, and the QEMU in the package depots updated to be able to use NVMM if present and operational.

smrobtzz discovered the cause for the "SMAP violation in ACPI on shutdown" KDLs on various recent hardware: it was due to ACPI trying to use PCI before PCI was initialized (as we wait until after ACPI is initialized to initialize PCI, since it can make use of ACPI features.) He and waddlesplash developed some fixes to break the circular dependency, and added assertions to prevent similar problems from going unnoticed in the future.

PulkoMandy did some code cleanup and minor fixes to the usb_rndis driver.

waddlesplash made some adjustments to the usb_disk driver to handle devices with multiple "LUNs" (e.g. card readers with multiple slots) and also devices with no media present better, fixing some KDLs.

PulkoMandy changed the BIOS call mechanism to not copy the real VRAM when calling the BIOS. On some systems it's not present at all (e.g. NVMM), so we'll just get no data or crashes when trying to read it.

waddlesplash added two new device IDs to the "intel_gart" driver (a dependency of the intel_extreme modesetting driver) reported as working by users.

korli fixed some mishandling of bitflags in the Bluetooth USB driver.

korli fixed the `read` hooks in the acpi_lid and acpi_ac drivers, and implemented `select` hooks for the acpi_ac driver.

### libroot & kernel

phoudoin fixed a configuration path in the DNS resolver.

SED4906 removed an unnecessary branch in the x86 context switching code.

waddlesplash made some minor improvements to the kernel event_queue API, and then implemented `EV_RECEIPT` in the kqueue compatibility code. He also added support for waiting on Haiku-specific object types (Be ports and semaphores) with kqueue, similar to how macOS supports Mach ports in their kqueue implementation.

waddlesplash fixed a flag inversion in the memory-locking routine in the kernel, fixing some spurious I/O failures under high memory pressure. He also cleaned up some code and added more assertions.

waddlesplash refactored some parts of the disk I/O system to add quotas for modified file data, preventing unbounded growth of the cached/modified pages in RAM if data is being written to a device with slow writes, which allowed dropping a `Sync` call from Tracker's file copy operations, improving performance. He also fixed some reference leaks for mounted disk images.

waddlesplash made the "Disable BIOS calls" boot option actually work (it did nothing before.)

waddlesplash made some improvements to debug commands in the guarded heap and slab allocators.

waddlesplash fixed an incorrect "cookie pointer" in the device manager, which fixed some KDLs.

waddlesplash made some tweaks to internal data structure management in the kernel address space manager, avoiding some corner-case problems with debug kernels and potentially lowering memory usage a bit. He also tweaked some buffer sizing constants in the general allocator (only on master, not beta6, though, as these could potentially cause problems.)

waddlesplash fixed a number of problems with used-memory accounting on 32-bit systems with more than 32 bits of physical RAM or swap space (e.g. x86 with PAE), which had gone unnoticed for a while after memory management refactors, it appears.

Jim906 added some UTF-8 to UTF-16 conversion utility functions to the kernel. These aren't used yet, but eventually they should be in the FAT driver to properly support Unicode characters there. jscipione came by later and fixed the build regression on macOS that this change caused.

korli reorganized the definitions of `wchar` and related functions and types, bringing Haiku into better conformance with the standards. He also updated the bootstrap stubs files for libroot.

waddlesplash fixed handling of non-page-aligned addresses in the kernel's `get_memory_map` routine, which is used for DMA reads/writes in disk drivers (and many other places.) This bug was notoriously difficult to track down: it manifested as memory-corruption-related application crashes and KDLs, but only when some specific debug options were enabled (that even nightly builds do not enable by default.) A lot of instrumentation was added and removed to try and detect the source; eventually it was uncovered after thoroughly eliminating a lot of other possibilities. How much this could've affected non-debug builds is unclear; the most common combinations of filesystems and disk drivers might never had any problems, but with less common ones it might've appeared more often.

waddlesplash cleaned up reference count handling of `VMArea` objects.

waddlesplash implemented an "area info cache" in the backend to libroot's default `malloc` implementation, avoiding a lot of unnecessary syscalls on frees.

waddlesplash adjusted things so that the keyboard KDL shortcut can be used much earlier in the boot process than before (on x86 at least.)

korli made `pthread_mutexattr_getprotocol` more compliant with the POSIX specification, fixing some potential bugs.

### Build system

humdinger added the default "Sounds" package (from the contest all those years ago) to the default package set for releases. He also improved the "Get Haiku" graphic a bit.

waddlesplash updated the version constants and made some configuration fixes for the beta6 release.

### Documentation

kallisti5 and waddlesplash added a short `AGENTS.md` to the repository root explaining that AI-generated contributions are forbidden.

PulkoMandy fixed some documentation generation warnings in the developer documentation. He also wrote some basic documentation for network drivers, and added a page on the basics of writing device drivers in general.

dridiha contributed an example driver for the QEMU "EDU" PCI device.

waddlesplash fixed a typo in the BBufferIO documentation.

### ARM & RISC-V

kallisti5 made some fixes to SD card offsets for ARM64, and lowered the necessary CPU type.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
