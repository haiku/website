+++
type = "blog"
title = "Haiku monthly activity report, May 2019"
author = "waddlesplash"
date = "2019-06-08 13:00:00-04:00"
tags = []
+++

Welcome to the monthly report for May 2019! PulkoMandy is once again busier than usual, so I'm filling in.

This report covers hrev53094-hrev53174 (120 commits.)

### Applications &amp; Libraries

korli changed how `runtime_loader` handles weak symbols to be more in line with the behavior of other operating systems.

waddlesplash tweaked "strace" to print syscall names plainly, i.e. without the prefixed "_kern_".

mmu_man committed changes to allow loading the BControlLook from an add-on, and added a setting to the Appearance preferences for it. This allows developers to create their own control theming, as all controls are drawn using this class.

A few older changes from oortwijn correcting some corner-cases in USB tablet logic were (finally) committed.

Haiku's `malloc` implementation, previously based on the (now-ancient, sbrk-based) `hoard2`, was replaced with `rpmalloc`, a high-perforance mmap-based allocator. This enables applications on 64-bit Haiku to use more than 1.5GB of RAM, and also provides an across-the-board 10-15% performance improvement, with some use-cases seeing even larger ones. Thanks go to mmlr, PulkoMandy, and waddlesplash for the Haiku-side work on this, and mjansson, the creator of rpmalloc, for being so responsive to feedback!

waddlesplash introduced a change to our `mmap` implementation that will name mmap areas after the object that created them (e.g. "libfreetype.so mmap area"). This may help in debugging.

PulkoMandy implemented a few more scrollback-related features in SerialConnect, including "clear", "reset", and better window-resizing logic.

waddlesplash made the "Disable user add-ons" safe-mode setting block loading dynamic libraries from user-writeable locations altogether, making it possible to e.g. un-brick a Haiku system which has corrupted libraries in `non-packaged` without having to boot into another partition.

`pkgman` and HaikuDepot now inform the user when a reboot is needed to complete installations, thanks to waddlesplash.

Haiku now sports a revamped "crash dialog", thanks to PulkoMandy, which should be more locale-friendly than the previous one was. Hopefully it will be some time before most users see it...

### Servers

waddlesplash fixed `package_daemon` to actually return errors on failures to commit transactions, instead of always returning "OK". This turns a number of cryptic errors (e.g. "Failed to remove transaction directory") into much more understandable ones (e.g. "package already activated").

### Drivers

korli made some miscellaneous fixes to the `mem` driver, which allows (privileged) userland processes to read physical memory.

waddlesplash fixed a bug in the Bluetooth driver's `ioctl` implementation, so it now works properly again.

waddlesplash corrected 64-bit physical address handling in the PCI bus manager, which fixed XHCI on some very recent hardware ("Hades Canyon" NUCs, for instance.) He also refactored parts of the XHCI driver to configure "periodic" endpoints more correctly.

waddlesplash merged a memory leak fix from FreeBSD to the kernel WiFi stack, which may also fix some rarer panics.

BGA (returning after a long hiatus!) corrected some incorrect behavior in the FreeBSD compatibility layer related to device structure memory, and then some in the PCI memory mapping logic, which fixed ethernet and WiFi on a variety of systems where it was previously broken (including his, of course.)

waddlesplash corrected some error checks in the USB stack, which fixed a number of KDLs on device unplug.

korli made some changes to the SCSI stack to handle `cdrecord` and other consumers of the "raw" API better.

### Kernel

waddlesplash made the kernel file-cache do bounds-checking even when in "passthrough" mode, which fixed installation following the changes to make packagefs use the cache in this mode.

waddlesplash added some more asserts to the kernel's mutex implementation, which should change some more deadlock conditions to panics instead.

PulkoMandy committed more changes towards SPARC support. The bootloader now starts and begins looking for boot partitions now.

### Build system

Haiku is now built using GCC 8.3 on most architectures! Thanks to mt for helping out with this upgrade by submitting -Werror fixes.

kallisti5 made some tweaks and improvements to the bootstrap process following the GCC upgrade.

---

Thanks for reading, and see you next month!