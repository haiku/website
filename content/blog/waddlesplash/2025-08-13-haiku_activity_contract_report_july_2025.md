+++
type = "blog"
title = "Haiku Activity & Contract Report, July 2025"
author = "waddlesplash"
date = "2025-08-13 23:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58946 through hrev58986.

<!--more-->

### Applications

waddlesplash reworked Terminal to not change its current directory when spawning new Terminals, which was inadvertently causing filesystems to not be able to be unmounted if a Terminal was spawned inside them.

abbategabriel changed the name of "Status bar" in Appearance preferences to "Progress bar". The class on Haiku is called `BStatusBar`, but on other OSes the common terminology is "Progress bar", so this is less confusing.

nipos made the scrollbars in SerialConnect adjust with the font size.

jscipione changed Tracker to show mounted volumes on the Desktop in file panels once more (they've always been shown on the regular Desktop), fixing some tickets that hav been open for a number of years. He also fixed pressing Esc to cancel type-ahead filtering in file panels, did some code cleanup, implemented dragging the corner icon for more directories, and fixed some bugs related to redrawing poses and updating the icon for "Trash" that dated back to the BeOS days!

humdinger changed ShowImage and FileTypes to use "IconMenuItems" in their "Supported Applications" menus, making it easier to spot specific applications.

### Command line tools

waddlesplash fixed `su` asking for a password even when run as root directly, and fixed all the multiuser commands (`su`, `login`, etc.) to properly set groups when logging in as another user. (This is mostly relevant for SSH sessions and the like.)

PulkoMandy added locking and protection printing to `listarea`.

waddlesplash added coded to `fdinfo` to allow it to print applications' current working directories (which would have greatly simplified the debugging process to solve the Terminal issue.)

### Kits

madmax fixed an iteration problem in the Storage Kit that was causing registrar crashes when installing mimetypes without previously registered super-types.

waddlesplash changed `BMenu` to handle registering and unregistering submenus better, fixing crashes in many applications when closing menus via the Escape key.

jscipione added "FAT16" to the known filesystem types in the Storage Kit.

jscipione fixed the default Quit shortcut on windows, which had been broken by an earlier refactor.

### Drivers

waddlesplash added some missing checks to the `poke` driver, fixing KDLs if userland applications pass invalid data to its `ioctl`s.

DigitalBox98 added support for the Pad Wheel on Wacom tablets.

### File systems

Jim906 added checks for stale nodes in the directory cache in the NFSv4 driver, properly implemented cache invalidation for nodes, fixed some comparison logic in the directory cache, and made UID/GID consistent for asynchronous I/O, fixing crashes, stale data, and other problems.

nephele implemented `fdatasync`, a POSIX method we had lacked before now.

waddlesplash refactored permissions checking for the `write_stat` filesystem operation in the kernel as well as the BFS, RAMFS, and EXT4 filesystem drivers, fixing some issues that had shown up with `rsync`.

korli made a number of fixes to tree splitting in the EXT4 driver, fixing directories not being able to grow beyond a certain amount of entries.

### libroot & kernel

waddlesplash made a number of changes to the new malloc in libroot to improve behavior on 32-bit systems, especially when the address space is almost full, fixing GCC compilation of some very large files in Clang on 32-bit. He also made some changes in the kernel to reduce address space fragmentation, even when ASLR is disabled.

waddlesplash fixed a number of problems with area cutting and resizing, especially around memory-mapped files from RAMFS, fixing crashes and other issues when using DOSEMU.

PulkoMandy implemented `RTLD_GROUP`, an extension to the `dlopen` APIs found on Solaris and elsewhere, which is used by DOSEMU.

waddlesplash fixed memory commitment accounting for areas with `READ` but not `WRITE` permissions, fixing some assertion failures (and undercounting of used memory) when using web browsers or other applications that do complex memory management operations.

waddlesplash made a number of fixes to the kernel and drivers to get the kernel guarded_heap implementation working once more (it had bitrotted somewhat over the past few months), and fixed an issue it uncovered (a missing initialization in the filesystems QueryParser.)

waddlesplash added some missing permissions checks to the `get_extended_team_info` syscall.

waddlesplash fixed a potential file descriptor leak in a corner case in the VFS.

PulkoMandy changed the signal handler context structures on x86 and x86_64 to expose a lot more information, including the segment registers, fault address, interrupt number, and error code. This was done so that DOSEMU could be ported, but the additional information should be useful to other software that does advanced JIT compilation, like WINE.

waddlesplash changed `sethostname` to return an error if the proposed hostname is too long, rather than silently truncating it.

### Documentation

cafeina and jscipione fixed a typo in the BMenu documentation.

PulkoMandy wrote up some documentation for our `dlfcn.h`, detailing differences with other OSes or extensions to POSIX.

### That's all, folks!

A slightly shorter month than usual, but there are some interesting changes in the works which have started appearing in the nightlies for August, so keep an eye out...

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
