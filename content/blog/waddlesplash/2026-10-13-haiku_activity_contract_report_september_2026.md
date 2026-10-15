+++
type = "blog"
title = "Haiku Activity & Contract Report, September 2026"
author = "waddlesplash"
date = "2026-10-13 21:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev60060 through hrev60192.

<!--more-->

### Applications

jscipione restored and enhanced the "most used queries" feature in the Find panel.

jscipione made a number of changes and enhancements to the volume control replicant, including proper support for indicating and controlling mute status, dropping the confusing "control physical output" option and other superfluous options, and more.

jscipione added an "Ignore all" option to Expander's alert dialog.

PulkoMandy fixed the PowerStatus replicant not resizing properly, especially when the battery returns invalid data.

More of aquamatic123's improvements to Devices (from GSoC '26) were merged, including filtering by name and hiding empty categories, and more.

phoudoin implemented translation of application names in Tracker's "Open with" popup menu in the "Info" window.

phoudoin changed ProcessController to automatically scale small icons when we don't have vectors, fixing the appearance of the small CPU icons.

phoudoin fixed Deskbar to not loop forever when trying to place replicants larger than any row.

apl changed HaikuDepot to relay more errors from PackageKit up to users, instead of displaying opaque messages. He also made it warn about there being potentially not enough space for installation remaining on the disk.

phoudoin added a background pattern to ShowImage, to make it easier to see the boundaries of images. He also integrated loading progress into the window's status bar, making it possible for translators that provide this information to display detailed status (and showing just the "barber pole" for any that don't.)

phoudoin improved the tooltips of endpoints and checkboxes to display more information in PatchBay.

AutumnMeowMeow (a new contributor!) implemented/fixed support in Terminal for VT100 and Xterm "application cursor keys." This fixes compatibility with a variety of terminal applications, e.g. selection shortcuts for `mcedit`, `nano`, `vis`, and much more.

nephele improved WebPositive's tab close button appearance and behavior.

phoudoin made DriveSetup trim trailing spaces from disk names before displaying them.

phoudoin changed Expander's Password prompt to use the layout API.

### Command line tools

diffie (a new contributor!) fixed the `acpi_call` tool's parsing of command line arguments.

korli fixed the "left/right" parameters behavior of `Workspaces`' command-line interface.

przemub fixed a buffer overflow in `telnetd`.

phoudoin fixed a number of problems parsing options in command line tools on non-x86 architectures.

### Kits

korli fixed a bug in alternate interface selection in the USB Kit.

PulkoMandy changed the HVIF translator to allow exporting sizes up to 512x512, from a previous maximum of 128x128.

phoudoin added `image/urf` and `image/pwg-raster` to the MIME database.

Udupa776 improved the contrast of inactive tabs in "dark mode".

phoudoin added standard extension message fields to the Translation Kit for "document count" and "document index", making it possible for translators that support images with multiple "pages" to export all of them via the Translators API.

przemub fixed the catalog fingerprint computation to be properly architecture-independent.

ilzu added some convenience functions to set menu targets and marked status to the Menu `LayoutBuilder`.

korli made the Package Kit restore the proper permissions to packages files when installing them.

Jim906 adjusted the "kernel-land emulation" logic in userland for lock routines, fixing some oversights after recent changes to the kernel.

korli moved an internal class in `BAlert` to the `BPrivate` namespace, fixing some symbol conflicts.

korli increased the "maximum connections" constant in the headers to a standard value, improving compatibility.

### Servers

waddlesplash fixed some error handling in the mouse/touchpad input handler, fixing touchpad input on some systems.

korli fixed a case where a `run` target has no specified name in launch_daemon.

kallisti5 changed a number of servers to have icons atop a hand, as a sort of visual indicator that they're system servers. (BeOS did the same, as did some of our servers, but a number didn't; we should now be more consistent on this front, at least.)

phoudoin fixed the Icons screensaver redrawing icons with the wrong drawing/blending mode.

waddlesplash made `package_daemon`'s prompt windows float over all other windows, to make it harder for them to get lost.

phoudoin fixed Screensaver to not try to load screensaver files that don't exist, avoiding unnecessary error prints to the syslog.

phoudoin changed the MIDI server to query the USB MIDI driver for specific device information, to show details about what device is connected to users.

### File systems

PulkoMandy reverted the change to let the kernel accept `-1` as `AT_FDCWD`, as there's a lot of software that hasn't been rebuilt since beta4 which still uses the old value. (korli and waddlesplash came by later and fixed some places in-tree that hadn't been updated.)

waddlesplash fixed a crash in `packagefs` upon failure to initialize.

phoudoin fixed a memory leak in the NTFS driver's `mkdir` implementation.

korli fixed some includes in `btrfs`.

axeld merged some more of the commits working towards BFS resizing support.

korli changed NFSv4 to start workqueue threads only when needed, avoiding a thread creation any time the module is loaded or probed.

waddlesplash overhauled some functions related to the `read/write_pages` hooks (which are really `read/write_uncached` hooks) in the kernel and drivers for consistency's and safety's sake.

waddlesplash cleaned up a bunch of debugging code in various filesystems, fixing some of the confusing "unknown" prints in the syslog and getting rid of duplicate code.

### Drivers

korli fixed a double-lock regression in the virtio bus' queuing logic.

neoman added support for a "Sunrise Point" device to the HDA audio driver.

phoudoin fixed an incorrect pointer dereference (leading to potential crashes) in a rarely-used USB stack API, a memory leak in the USB3 driver, increased some timeouts in the USB stack to match official recommendations, added more robustness checks, and more.

smrobtzz made a number of fixes to PCI resource management and allocation, fixing boot (or boot regressions) on some hardware.

smrobtzz fixed some problems with the handling of USB 1 and 2 devices attached to USB 3 controllers through hubs.

przemub implemented a variety of improvements in the `virtio_input` driver, including better keymap handling, support for multimedia keys, and more.

przemub fixed a variety of bugs in the `virtio_gpu` driver, getting modesetting working on more setups.

Coldfirex fixed a number of error handling bugs in various components, including missed frees or closes in error paths, and more. korli came by and extended some of Coldfirex's fixes to even more components.

korli fixed `accept4` not properly honoring the `SOCK_NONBLOCK` flag, which was breaking `curl` and other applications.

waddlesplash fixed the handling of `TTYFLUSH` for PTYs.

dcbeckman fixed a KDL when replugging different USB audio devices from the same vendor.

waddlesplash (and korli) made some changes to the SCSI CD driver to handle requests from userland properly, fixing KDLs.

phoudoin made a number of fixes to the USB MIDI driver, including ones to fix hangs and deadlocks, improve error handling, expose more information, and more.

przemub made the virtio random-number driver specify a "pretty name" (which makes it show up nicer in the Devices application.)

phoudoin added support to the NVMe driver for retrieving device names and serial numbers.

nathan242 fixed the finger count and extended buttons logic for Synaptic touchpads, and cleaned up some other logic in the process.

waddlesplash made a number of changes to make NVMM execution easily interruptible by signals, which are used by QEMU and other emulators for control flow in VM threads. This may improve VM performance considerably in many cases.

waddlesplash added some missing lock acquisitions in the IPv4 module, and fixed a reference leak.

### libroot & kernel

korli fixed a missing lock in the TCP endpoint manager, potentially fixing some KDLs.

waddlesplash changed how the "ABI" and "API" versions for running processes are computed inside `runtime_loader`, making these values somewhat more useful for `libroot` and the Kits to detect if any backwards-compatibility fixes need to be applied.

korli minimized differences between Haiku and upstream in some of the DNS resolver source code, making merging changes from upstream easier. He also disabled some unneeded/unused features.

waddlesplash fixed a deadlock in the kernel's write quota tracking.

PulkoMandy changed the kernel and architecture internals to differentiate interrupt types with an enum instead of a bool, making the code much clearer.

waddlesplash made a number of changes to improve error handling in the file cache (the system underlying file data caching, as well as `mmap`), fixing a number of TODOs, missed error checks, and more.

waddlesplash fixed a problem where `fork` could try to commit memory on areas that don't have any commitment, and don't need any commitment, fixing a KDL with the "Message" screensaver.

korli synchronized the `readpassphrase` implementation with upstream OpenBSD.

waddlesplash fixed an error reporting problem in `kqueue`, fixing compatibility with some `libevent` behaviors.

VoloDroid fixed `system_time_nsecs` for < 1 GHz processors on 32-bit x86, which had been broken for a long time (but went unnoticed as it's rarely used.)

korli adjusted what signals are sent for General Protection Exceptions and Range Exceeded Exceptions, to improve compatibility with other OSes.

waddlesplash made running threads, not just waiting or syscall'ing threads, interruptible by signals (mostly for NVMM's sake, but it also may have improved behavior in some other scenarios, too.)

waddlesplash made the kernel print its own timestamps in syslog output, instead of relying on the `syslog_daemon`. This means we get proper and correct timestamps for the early boot output up till the `syslog_daemon` starts, making it easier to diagnose various problems.

### Build system

przemub made some improvements to the bootstrapping process, including to scripts and package versions.

### Documentation

PulkoMandy wrote some new internals documentation about device driver hooks.

phoudoin dropped an obsolete TODO from MIDI internals documentation, and added some notes about a different potential improvement.

### ARM, RISC-V, M68K

przemub fixed some ARM64 memory management instruction macros, and changed the ARM64 `VMTranslationMap` to make use of them instead of just inline assembly. He also wrote a `GICv3` interrupt controller driver, making it possible to boot Haiku with hardware virtualization on ARM64 Apple devices, added some CPU identification logic for ARM64, and fixed or implemented a significant number of things in ARM64 port code.

kallisti5 made some minor fixes to the M68K bootloader code to bring it more in line with that of other platforms.

X512 fixed the bare-metal RISC-V bootloader on some newer emulators.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
