+++
type = "blog"
title = "Haiku Activity & Contract Report, August 2025"
author = "waddlesplash"
date = "2025-09-15 21:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58987 through hrev59021.

<!--more-->

### `git status` performance optimizations

`git status` has long been, for large repositories, a much slower operation on Haiku than on Linux. There are a lot of reasons for this, but the most significant one is lock contention in disk caches.

Last month, waddlesplash spent a bunch of time refactoring the disk block and directory entry caching logic in the kernel to be able to use atomic operations rather than exclusive locks in the most common cases (reading an already-cached block, and inserting a new entry into the entry cache.) These sorts of changes are tricky to write and tougher to test (any bugs in them that aren't immediately obvious will likely be due to race conditions, and can usually only be found by analyzing code carefully, as all other means of trying to catch them generally change timing enough that they won't occur).

The results are clearly more than worth the trouble, though: in one test setup with `git status` in Haiku's `buildtools` repository (which contains the entirety of the `gcc` and `binutils` source code, among other things -- over 160,000 files) went from around 33 seconds with a cold disk cache, to around 20 seconds; and with a hot disk cache, from around 15 seconds to around 2.5 seconds.

This is still a ways off from Linux (with a similar setup in the same repository, `git status` there with a hot disk cache takes only 0.3 seconds). Performance on Haiku will likely be measurably faster on builds without `KDEBUG` enabled, but not by that much. Still, this is clearly a significant improvement over the way things were before now.

### Applications

jscipione fixed a corner case in Tracker that could've led to crashes in Open/Save panels, and adjusted the logic to not rebuild add-on menus unnecessarily.

Anarchos added code to app_server's remote-desktop logic to send the current state of the cursor on connection (previously, you had to move the mouse in such a way as to change the cursor in order to see it.)

nipos fixed the minimum width of the information panel in AboutSystem, the default text color in MediaPlayer's Playlist window, and changed Icon-O-Matic to properly disable the "Remove" menu item when no transformer is selected.

### Command line tools

OscarL added usage information to `iroster`, a command to work with the input_server device roster.

nipos fixed `cddb_lookup` to do DNS lookups only just before performing lookups, rather than every time the command is run, even if no lookup needs to be performed.

### Kits

X512 fixed some ID wraparound problems in the Interface Kit.

waddlesplash added some optimizations to `BView::Invalidate` to skip invalidating if the requested invalidation region is out-of-bounds (and then removed some redundant logic from the ColumnListView control that had been doing the same thing.)

jscipione fixed the default text colors in slider controls.

X512 fixed clipping region storage in BPicture to be compatible with BeOS (and also more efficient.)

nipos adjusted `BMenuField`s to have a visible effect when hovered over with the mouse, same as regular buttons.

### Drivers

Habbie added some support for "Apollo Lake" graphics devices to the Intel modesetting driver.

waddlesplash refactored the `usb_disk` driver, first to lock the I/O memory before acquiring I/O locks rather than after (preventing lock-order inversions), and then to use the general I/O scheduler, which properly handles I/O prioritization and asynchronous operations. This fixes at least one KDL, and likely improves system responsiveness when Haiku's used with slow USB disks.

waddlesplash refactored part of the XHCI (USB3) driver to submit some kinds of transfers directly, without a bounce buffer, when they meet DMA restrictions. This goes along with the `usb_disk` refactor, and should increase performance (especially peak performance) by avoiding copying data around unnecessarily.

waddlesplash fixed some corner conditions in the USB code of the FreeBSD network driver compatibility layer, as part of ongoing work to try and port some USB ethernet drivers from FreeBSD (the changes to actually introduce the drivers, however, are still pending for review and not merged, as they don't work yet.)

### File systems

Jim906 implemented support in the FAT driver for filesystem sector sizes larger than 512 bytes. (This is important for supporting "4K-native" disks, which many SSDs are.)

nephele changed label drawing logic in the Interface Kit to specifiy the proper colors and not rely on defaults in more cases.

korli dropped "orphan" list support (a feature intended for managing unlinked but not yet deleted files, which it seems is at this point obsolete and isn't implemented by FreeBSD) from the ext2/3/4 driver. He also fixed the blocks count accounting after enlarge or shrink of a node.

waddlesplash, following a change by korli to root inode reference counting for ext2/3/4, discovered an inconsistency in the kernel VFS' unmount operations going back quite a few years. It was presumed that filesystems were supposed to maintain ownership of their root node object, but in practice this wasn't respected, and nothing checked for it. waddlesplash thus fixed the VFS to respect it and introduced sanity checks to verify it (and also some to defend against other reference-counting problems), and then fixed most of the filesystem drivers to match. jmairboeck came by later and fixed two that were initially missed.

waddlesplash made a number of cleanups and some critical bugfixes to ramfs' extended-attributes index management code, fixing crashes in some rare cases, slightly optimizing for performance, and adding a number of assertions to detect similar problems in the future.

korli merged the implementations of `/dev/null` and `/dev/zero`, and added a `/dev/full` which always returns `ENOSPC` when attempting to write to it (Linux and FreeBSD have the same.)

### libroot & kernel

Habbie added two macros to `sys/time.h` for `timeval` conversion to/from `timespec`, for compatibility with the BSDs and Linux.

waddlesplash cleaned up some code in the kernel related to APIC timer configuration, as well as feature detection for some older AMD processors.

waddlesplash refactored the kernel debugger ("KDL") to idle-loop rather than busy-loop, and introduced an x86-specific mechanism for this that makes use of the `MWAITX` (AMD) and `TPAUSE` (Intel) instructions, when available, to save power by waiting for a set period of time (interrupts are always disabled in the kernel debugger, so we can't rely any of the other mechanisms, like `HLT`, to do this.) On a Ryzen 3700X, this appears to reduce power consumption in KDL by about 35 watts (while Haiku's regular, non-KDL CPU idling reduces it by around 54 watts. That seems to be less of a reduction as Windows manages, but that's not surprising as there's still more things for Haiku to implement that would reduce power usage.)

waddlesplash slightly optimized `spin()`, the general kernel idle-loop for when interrupts are disabled (by removing an unnecessary subtraction from the hot portion of the loop.)

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
