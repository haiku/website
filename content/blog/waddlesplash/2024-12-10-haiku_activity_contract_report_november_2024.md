+++
type = "blog"
title = "Haiku Activity & Contract Report, November 2024"
author = "waddlesplash"
date = "2024-12-10 23:45:00-05:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58292 through hrev58368.

<!--more-->

### Applications

apl added an "installed" indicator to icons in HaikuDepot's list view, and continued the refactoring of its internal data model. humdinger contributed icons for the "native" indicator, and apl added this to HaikuDepot's display as well.

korli fixed an occasional crash in Screen preferences.

### Kits

X512 fixed an incorrect port deletion in `BApplication`.

X512 added move constructor and assignment support to `BRegion` and `BShape`, and added a 2-argument constructor variant to BRect.

waddlesplash restored some special casing for `B_RGB32` data in `BBitmap::SetBits`, fixing some compatibility with BeOS, and korli adjusted it a bit for correctness.

linkmauve fixed a typo in an assertion in `BTimeSource`.

waddlesplash completely rewrote `BTimedEventQueue`. The new implementation avoids `malloc` (necessary as this is in the "hot path" for media playback) and uses a templated linked-list rather than a manual one. Multiple users have reported that media playback seems smoother, especially on lower-end hardware, after this change.

### Servers

Hanicef (a new contributor!) contributed fixes to PadBlocker (the input_server filter that handles blocking touchpad events when keyboards are in use) to handle key repeat properly, and also to avoid blocking events from non-touchpad devices at all.

waddlesplash adjusted net_server to always remove the "autoconfiguration client" (usually the DHCP client) when a network link goes inactive, rather than just retry forever when there's no way to send data at all.

### Drivers

waddlesplash fixed some old bugs in the SCSI layer where flags were reset on the wrong request, which was the cause of many "no such range!" KDLs. He then removed a number of unneeded fields from internal data structures, and removed the need for the `locked_pool` memory allocation module, saving some memory and slightly increasing efficiency. The SCSI driver was the only consumer of the `locked_pool` system, which is now totally obsoleted by the kernel's own memory management routines, so it was deleted entirely.

korli fixed some memory management code in the es1370 and auvia drivers, fixing crashes and audio output on some systems that use them.

waddlesplash refactored the network stack to return "ancillary data" (mostly relevant for UNIX domain sockets, as this allows file descriptors to b shared across processes) all in one chunk if possible, rather than separate chunks. The POSIX specification doesn't seem to require this, but Firefox's IPC code (which was taken from Chromium) seems to expect it.

waddlesplash made some adjustments to the network stack and the FreeBSD compatibility layer to report traffic statistics much more reliably (and to report driver-level statistics at all.)

waddlesplash added a missing cancellation of queued transfers to the USB disk driver, fixing KDLs on failures to attach to USB floppy drives.

waddlesplash added another USB device ID to the `realtekwifi` driver, and later synchronized it (and the net80211 stack) with FreeBSD. He also adjusted some routines in the compatibility layer for correctness, allowing a Haiku-specific patch to be dropped from the stack.

waddlesplash added a missing NULL check and some missing deletions in the USB stack, fixing some (long-standing) memory leaks and (more recent) assertion failures.

PulkoMandy reworked the (incomplete) USB webcam driver to use standard headers rather than redefining constants from the UVC specification itself, and added support for decoding more information from UVC descriptors to `listusb`.

PulkoMandy fixed handling of unplugs and canceled transfers in the RNDIS network driver (used for USB tethering.)

waddlesplash (following analysis by PulkoMandy) increased the default timeout used in PS/2 mouse resets, fixing initialization on some hardware.

### File systems

korli restored the FAT driver reporting volume names with lowercase letters (the behavior from before the driver was refactored.)

waddlesplash fixed some memory assertion failures in RAMFS and ram_disk, and did some minor cleanups as well.

Jim906 implemented prefetching in the block_cache, and adjusted the FAT driver to make use of it, greatly speeding up mounts of larger FAT partitions.

dalme contributed a patch to clarify the meaning of some fields in BFS initialization.

waddlesplash fixed BFS's asynchronous I/O routine to keep references to inodes properly (and also fixed similar issues in the FAT and EXFAT drivers as well), fixing a very old assertion failure ticket.

waddlesplash fixed handling of the "last modified" index in BFS queries, and adjusted type coercion in the query parser to behave correctly for "time" types (and avoid re-converting types when unneeded.)

waddlesplash reworked how query terms are "scored" (in order to pick what index to run the query off of), signficantly improving efficiency by picking smaller indexes in many cases.

OscarL and waddlesplash reworked how partitions are matched in mount_server, reducing the number of "false positives" and partitions automounted erroneously.

### libroot & kernel

waddlesplash fixed some corner-cases in handling of FD arrays for `select`, and moved some definitions from `sys/select.h` to private headers.

korli added a number of functions specified in POSIX-2024, mostly to open FDs with `O_CLOEXEC` set automatically, such as `pipe3`, `dup2`, and memory management routines, like `reallocarray`, `memmem`, and some miscellaneous methods besides.

waddlesplash fixed an issue in the kernel `object_cache` arena allocation system where the "minimum object reserve" setting wasn't always respected properly.

waddlesplash added code to the bootloader to display the size of the bootable partitions in the menus, if that information can be retrieved.

waddlesplash added a necessary x86-specific stub to the libroot stubs files, which are used when "bootstrapping" (building a system fully from source with no built dependencies.)

waddlesplash did some cleanup to code in libroot, making one function return `PTHREAD_CANCELED` as the spec says it should, and using more common methods for wait time conversion where possible.

X512 added `posix_devctl` to libroot, a new POSIX-2024 method intended to replace the variable-argument `ioctl`. Meanwhile, waddlesplash refactored the `ioctl` declaration to use macros rather than struct initializers to avoid using the variable-argument `ioctl` when possible.

waddlesplash unified the bitmap blitting routines and image placement computations used for displaying the startup splash between the bootloader and the kernel.

korli added support for RGB16 framebuffers in the EFI loader.

waddlesplash refactored the "unused vnodes" system in the kernel VFS layer to use an inline template linked-list, and a spinlock to protect it rather than a (heavily contended, during busy FS operations like `git status`) mutex, which requires use of linked-lists anyway. He also adjusted the `io_context` structure to be R/W-locked, and added a fast path out of the vnode lookup routine. Put together, these changes significantly improve `git status` performance, at least when there's a hot disk cache.

waddlesplash refactored and cleaned up some parts of the `do_iterative_fd_io` and `do_fd_io` routines in the kernel VFS layer (which are used in filesystems to implement kernel-level asynchronous and vectored I/O), to fix some corner cases and handle references more correctly. This was then used to clean up the block_cache's new prefetcher a bit more.

waddlesplash fixed the default buffer size in `KPath`, the kernel path buffer handling class.

waddlesplash added a mechanism for the "framebuffer console", used to display KDLs, to be initialized much earlier in the kernel startup process, allowing kernel panics from virtual memory initialization (among other things) to be displayed onscreen, not just written to the syslog.

waddlesplash cleaned up and added more commands for dealing with I/O schedulers in the kernel debugger.

waddlesplash made a number of fixes to the virtual memory system's handling of `mprotect` and related functions, fixing assertion failures and other issues when these are used in certain circumstances, especially in conjunction with `fork`. He also turned down the logging of a variety of the page fault methods.

PulkoMandy added mkostemp (specified in POSIX-2024.)

### Documentation

PulkoMandy added documentation for some of the implementation details of `ioctl` and `posix_devctl` on Haiku.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible.
