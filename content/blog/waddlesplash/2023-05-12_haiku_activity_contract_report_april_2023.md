+++
type = "blog"
title = "Haiku Activity & Contract Report, April 2023"
author = "waddlesplash"
date = "2023-05-12 15:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56888 through hrev56961.

<!--more-->

### Applications

Zardshard added support for opening executables directly with Debugger, using "Open with" or drag-and-drop onto the application icon, to start debugging applications more easily. He also added an explanation to the CLI that the target to be debugged must be specified, improved the help text of the "dump memory" commands, and removed some dead code.

jscipione fixed Deskbar to scale the leaf/team menus with the bold font only, not with the main "plain" font, for consistency's sake, and also made the "Vulcan Death Grip" shortcut work in Deskbar even in mini-mode. He also applied a patch to use vector icons for the "window" icons in team menus, but this caused problems and had to be reverted for the time being.

zdykstra reworked the "Set to" window in Mail to use layouts, and made the main window's toolbar icons automatically scale with the font size.

apl adjusted HaikuDepot to handle longer nicknames for the Haiku Depot web service.

bitigchi enhanced PowerStatus to use `BNumberFormat` for locale-aware percentage formatting.

jscipione did some code and style cleanup in Tracker.

OscarL fixed CPU information not updating automatically in AboutSystem replicants.

### Kits

linkmauve fixed AVIF sniffing to handle more kinds of AVIF images, and PulkoMandy fixed a bug in the Translation Kit that was preventing grayscale AVIFs from being decoded correctly.

Freaxed fixed a bug in BOutlineListView that was causing items to disappear when expanding an item containing other collapsed lists. He also contributed a change to use a symbol for shortcuts with "space" in them.

jscipione implemented status bars in the BeControlLook.

wszdexdrf rewrote the ISA.h header, which had not been cleaned up in many years.

jscipione removed the mandatory label margins from buttons. This does not change their "preferred" size in layouts, it only means that in buttons which (for whatever reason) are forced to be very small, their text labels will not be arbitrarily cut off.

madmax fixed clipping behavior in the default ControlLook implementation, which had caused problems with button drawing in WebPositive for many years. jscipione then fixed the BeControlLook to match the new behavior, and madmax also fixed the "flat" control look.

PulkoMandy moved the "barber pole" class, used to indicate background operations in progress, from HaikuDepot into `libshared`, where it can be more easily used by other applications, including ones out-of-tree.

madmax removed some obsolete and dead code from BTabView.

### Servers

trungnt2910 fixed an infinite loop in `app_server` startup when there is no `/dev/graphics` directory.

### Drivers

Following the FreeBSD first round of compatibility layer callout fixes (covered in [last month's activity report](blog/waddlesplash/2023-04-06_haiku_activity_contract_report_march_2023/)), waddlesplash refactored `callout_stop` for clarity and correctness, fixing a few more bugs in the process. He also added a missing `LOCKGIANT` invocation to the device hooks, and toned down some of the giant-lock assertions to match what FreeBSD does in the callout code.

korli adjusted the TCP layer to avoid overflowing the advertised window scale.

The big PCI refactor commit series, by X512 and korli, was merged. (jessicah contributed at least one fix after the merge.) This refactors the PCI handling to be more consistently split along bus driver / bus manager lines, like other subsystems within Haiku are (e.g. USB), where previously it was split only along architecture lines. This allows for more sharing of code between different architectures, or more complicated PCI initialization sequences. (There are some regressions from this that have emerged in testing, however, which are not yet resolved, so upgrade with caution if you are still on a slightly older nightly build.)

waddlesplash added an implementation of the "scan" `ioctl` to the OpenBSD WiFi driver compatibility code. This does not actually initiate scans at present, but it does indicate if one is already in progress, which suffices to allow `ifconfig ... scan` to return results instead of erroring out unnecessarily.

waddlesplash added a missing bounds check to the `nvme_disk` I/O logic, and adjusted the clamping behavior to be more consistent. He also did the same for the `mmc_disk` driver.

### File systems

vaibhavg20comp fixed the build errors in `btrfs_shell`, the test harness for the BTRFS filesystem.

mbrumbelow removed some unused variables from the common fs_shell code, and also userlandfs.

### libroot & kernel

waddlesplash added some more assertions to the kernel's linked-list implementations, to help catch bugs like the FreeBSD callout problems at once instead of letting them corrupt datastructures. He also cleaned up the `DoublyLinkedList` insertion APIs, which had some deprecated functions still being used in many places around the tree.

jessicah fixed an inconsistency in the find_paths API's return values for settings directories.

waddlesplash fixed a number of minor bugs in libroot's C/POSIX support: he added a missing include of `stdint.h` to `uchar.h`, adjusted the definition of `FP_ILOGB0` to match the specification, rewrote `getlogin_r` to actually be reentrant and to return more expected errors, synchronized the `random` implementation with upstream FreeBSD and deleted the (unused) glibc versions, replaced `rand_r` and `rand` with the musl implementations, fixed the C11 `ONCE_INIT` implementation, and more. (Many of these bugs and specification non-compliances were reported by one of the Gnulib developers.)

waddlesplash fixed `strxfrm`/`wcstrxfrm` mistakenly including the terminating `NULL` byte in the output count. A similar fix had already been made by him back in early 2022 to `wcsxfrm`, but not to these other functions. He also fixed a corner case return value in `mbrtowc`.

waddlesplash fixed a race condition in team loading that was leading to a use-after-free of a condition variable, which could cause a KDL in very rare circumstances.

korli applied a fix from upstream glibc to the printf long-double handling.

trungnt2910 fixed pointer handling in stack protector initialization, which could crash when running in `chroot`s without `/dev`.

jessicah fixed `duplocale` not setting some magic values in the locale data structures correctly, which meant locale duplication did not really work.

waddlesplash fixed initialization of the "numeric" locale handling inside libroot, fixing a variety of obscure crashes in ported applications.

waddlesplash debugged a whole-system hang which turned out to be a deadlock between BFS and the file cache, and wrote it up in a ticket, but no fix has been implemented yet. He did, however, refactor some thread block information printed in the kernel debugger which would have made tracking down the problem much easier.

waddlesplash refactored the implementations of XSI message queues and semaphores to use condition variables, instead of a custom block-queue implementation (which was not actually correct, and contained known issues and potential race conditions going back many years.) The new code is much more robust. However, these APIs are not used very much, it appears; a test-case for them in Haiku's own testsuite was broken for years and nobody noticed.

waddlesplash, working off a patch originally written by X512, cleaned up the default read/write hook implementations for the SCSI and VirtIO disk drivers to be more consistent in their creation of `IORequest` objects (the kernel's asynchronous & vectored I/O operation management system), and then consolidated this logic into the kernel itself instead of requiring drivers to perform it themselves.

waddlesplash refactored the `IORequest` sub-operation (`IOOperation`) APIs to be simpler, handling more logic internally instead of requiring API consumers to handle it. Most of these methods are only used by the I/O scheduler, but at least one driver (NVMe) bypasses the I/O scheduler altogether, and when it was first written, these inconsistencies and complexities had made using the APIs correctly difficult.

waddlesplash added some missing NULL checks to the kernel FD syscall handlers. This fixes a KDL triggered by jessicah's work-in-progress port of a newer `node.js` version, and possibly by some other newer ports as well.

### Documentation

waddlesplash improved the `syslog` API documentation in the Haiku Book by importing parts of an old newsletter article and website page (and then deleted the website page, as it was otherwise out of date.)

PulkoMandy fixed some typos in class names.

### ARM & RISC-V

X512 contributed a change to the "framebuffer" driver to fix framebuffer addresses turning up as `NULL` on non-x86 devices. He also cleaned up and fixed some status register logic and removed redundant stack trace printing on RISC-V.

### HaikuPorts

Begasus also wrote up a [monthly report](https://discuss.haiku-os.org/t/haikuports-report-april-2023/13443/9) for HaikuPorts and HaikuPorter on the forums.

### Website

My (long) article on Haiku's [condition variables implementation](/blog/waddlesplash/2023-04-24_condition_variables/), writing up work I did mostly towards the beginning of the contract, was published last month. It generated some interest outside Haiku's community, but I think it would up being too highly technical even for many programmers.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
