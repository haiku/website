+++
type = "blog"
title = "Haiku Activity & Contract Report, January 2023"
author = "waddlesplash"
date = "2023-02-14 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report. Apologies for the delay in getting this one out; I had originally planned to publish it before the end of last week.

This report covers hrev56682 through hrev56747.

<!--more-->

### Applications & Command Line Tools

humdinger enhanced the printed output of `setvolume`.

OscarL fixed building the in-tree VirtualKeyboard. (It is still not included by default yet however.)

jessicah implemented "bracketed paste" in Terminal. This is used in `nano` and other applications to properly handle pastes with line-breaks and other special characters in them. (Even `bash` can make use of it for pastes into shell prompts!) It's enabled by default and is a noticeable improvement over the old behavior.

jessicah also implemented a graphical settings panel for configuring colorschemes in Terminal.

xoblite cleaned up the Devices application's user interface, removing unused tabs and streamlining various aspects of it. He also removed some unnecessary font changing logic from Tracker.

nephele fixed the script which opens the Userguide from the Desktop shortcut to handle locales properly.

humdinger fixed the date in the header of forwarded e-mails.

CodeforEvolution fixed the drawing of selected text under some circumstances when light desktop colors are in use.

waddlesplash removed some unused methods and options from Tracker's internals.

waddlesplash fixed error handling in the `keyboard` input device, which should improve the diagnostics which end up in the syslog when errors occur.

waddlesplash removed the `play` command from the tree. This was for playing audio CDs via SCSI commands, which is not supported on basically any modern hardware. The `CDPlayer` application did the same thing, and was removed to HaikuArchives years ago. The `play` command was missed then, and has now been moved to live along with it.

### Drivers

korli fixed the `asus-wmi` driver to pass the proper number of parameters for all calls.

OscarL fixed the `poke` driver to use `phys_addr_t` for physical addresses, which fixes its operation on 32-bit systems with more than 4GB of RAM.

Zelenoviy synchronized the `intel22x` driver with upstream FreeBSD, fixing support for some devices.

korli added support for some more Haswell devices to the `intel_extreme` modesetting driver.

ambroff increased the default MTU for the `loopback` network device to be in line with other operating systems.

cmeerw (a new contributor!) submitted patches fixing various broken parts of the IPv6 stack.

waddlesplash refactored the FreeBSD & OpenBSD compatibility layer somewhat to reduce code duplication, and then made a number of modifications, adjustments, and additions to support OpenBSD ethernet drivers in addition to their WiFi drivers. He then ported the `rge` driver from OpenBSD, known as `rtl8125` on Haiku, which adds support for the equivalently-named series of Realtek ethernet devices. He also cleaned up some of the build system logic related to the BSD drivers.

PulkoMandy implemented the "extended W" mode for Synaptics touchpads. This should provide for smoother input support on touchpads which support this mode.

cmeerw fixed setting the default network route after setting the IP address. This should fix some long-standing issues where the "gateway" setting was not applied when using static configurations in Network preferences.

cmeerw fixed sending segment sizes computation in the TCP layer.

### Servers

madmax fixed constant usages in the recently-refactored FontManager code in app_server.

### File systems

waddlesplash consolidated some utility functions across various filesystem drivers and adapted the EXFAT and XFS drivers to use the new `next_dirent` and other common operations methods.

waddlesplash added a missing permissions check to the kernel `rootfs`.

### Kits

PulkoMandy fixed `BMenu::SetTriggersEnabled` to actually disable triggers (not shortcuts/accelerators, this refers to activating menu items by pressing a single key while the menu is opened.) Previously it only disabled drawing the underlines for them (which is disabled by default and can only be enabled by editing a configuration file.)

X512 added support to BBitmap and app_server to use a client-defined area instead of a BBitmap/app_server-allocated one. This will be especially useful for GPU-associated buffers.

waddlesplash enabled Zstd compression in the Package Kit by default.

nephele adjusted the StatusView controls (used in various applications) to compute a font size based on the scroll-bar size, instead of guessing.

PulkoMandy fixed various usages of deprecated APIs and missing initializations in the FFmpeg media plugin, resolving some crashes.

### libroot & kernel

kallisti5 refactored the serial services implementation in the EFI loader. He also adjusted the DTB logic for greater compatibility.

korli added initial support to the x86 CPU detection logic in the kernel to detect CPU cores of differing types. (Intel "Adler Lake" CPUs introduce this; ARM cores have had it for some time.)

jessicah added some basic deadlock detection to `pthread_rwlock`.

kallisti5 fixed newlines in serial/syslog output for the kernel debugger. (This was a long-standing issue which had made copy/pasting KDL sessions out of a syslog or serial log quite annoying.)

waddlesplash added reference-count assertions to the `WeakReferenceable` implementation, to catch delete-before-unreference and other incorrect handling problems.

waddlesplash cleaned up some of the `libroot_build` logic and removed some headers that were then no longer used from its include directories.

### Build system

kallisti5 committed scripts for making Google Compute Engine images of Haiku builds, so Haiku can be run in GCE instances.

xoblite synchronized the PCI-IDs list.

### Documentation

PulkoMandy fixed all the Sphinx generation warnings for the developer-internal documentation. He also adjusted the structure, adding more layers for better organization.

n0toose adjusted `ReadMe.Compiling.md` to refer to the currently-used build profiles.

### ARM & RISC-V

X512 added FDT compatibility logic to the OCores I2C driver for the HiFive Unmatched.

kallisti5 adjusted the scripts for running RISC-V builds under QEMU to pass the proper flags for input to the guest machine. He also fixed enumeration of VirtIO devices in the kernel device manager on this architecture.

kallisti5 added ARM64 to the QEMU launch test script.

### That's all, folks!

A bit of a shorter month after December's release of beta4, but there are some new contributors who have contributed noteworthy patches already. Thanks to all who work to make Haiku a great project to use, and a fine community to belong to.
