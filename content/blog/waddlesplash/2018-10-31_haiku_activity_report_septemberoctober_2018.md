+++
type = "blog"
title = "Haiku monthly activity report, September/October 2018"
author = "waddlesplash"
date = "2018-10-31 21:04:35-04:00"
tags = ["java"]
+++

Welcome to the tenth monthly report for 2018! PulkoMandy is busy packing and then travelling to BeGeistert, and most of the work these past two months was done by myself anyway, so, I'm covering for him once again. (Writing about yourself in the third person is fun!)

This report covers hrev52310-hrev52462 (~250 commits.)

### R1/beta1!

As you've probably already seen, heard, felt, ... etc., <a href="https://www.haiku-os.org/news/2018_09_28_haiku_r1_beta1/">Haiku R1/beta1 was released at the end of last month!</a>! A list of all the major changes since the last release (many of which were covered in progress reports past) can be found in the <a href="https://www.haiku-os.org/get-haiku/release-notes/">release notes</a>.

The general concensus is to try to release again next year at around the same time. But we'll see what happens on that front...

### Applications

A new WebKit release was cut in time for the beta, which included fixes to get YouTube working again, as well as for a number of nasty crashes that had plagued it for years, resulting in the most stable WebPositive yet. Following the beta release, PulkoMandy went back to merging in new changes, and is almost finally caught up to the present. After that, he intends to go back to working on fixing rendering bugs, crashes, and other issues in the port.

A crash related to removing items from BMenus was fixed by waddlesplash, which should solve related issues in the Network preferences.

waddlesplash fixed `pkgman` to make it be able to update and install packages with no internet connection, a long-standing issue from the early days of package management.

Some incorrect string formatting in Tracker and other applications due to a bug in `BString` (and relevant unit tests so it won't occur again) was fixed by waddlesplash.

Andrew Lindesay contributed some fixes to HaikuDepot, including some for crashes and loading errors, in time for the beta.

The long-standing "MediaPlayer uses a lot of CPU on audio files with album art" was fixed (again by waddlesplash).

kuroneko, a new contributor who has arrived following the beta, submitted some fixes to IMAP support in the Mail Daemon.

Chaiwat Suttipongsakul, a newcomer following the beta, contributed a Thai keymap which is now in the nightly builds.

### Servers

jackburton79 made some cleanups and fixes to the `BPicture` clipping and drawing code in `app_server`, which should fix some drawing issues in some of the more esoteric BeOS applications.

Some vague error codes in the `mount_server` were fixed by waddlesplash, and fixes to some (unrelated) bugs in the underlying Storage Kit were submitted by mt819.

Barrett has resumed work on refactoring the Media Kit. He's presently broken out the low-level codec support into a separate library, so that it can eventually be used by applications instead of just backing `BMediaTrack` and other related classes internally, as well as removing unused cruft in various places.

### Drivers

Incorrect error code propagation in the network stack was fixed by waddlesplash, as part of an effort to solve the issue that after a set period of time, joinable networks disappear (and never reappear until the device is disabled and re-enabled) from the list in Network preferences and `ifconfig`. Those changes were completed and also merged in time for the beta.

Humdinger merged a patch by Pete Goodeve to the HDA audio driver which allows for finer-grained control over some settings, including buffer management (which may be useful to users who want extra-low latency at the cost of increased CPU time.)

Leorize (one of last year's GCI winners who has stayed on as a contributor, mostly to HaikuPorts) contributed a fix to make `getsockname()`, a networking primitive, behave more like how it does on the BSDs and Linux.

Following a request by kallisti5, waddlesplash did some rework of the FreeBSD network drivers compatibility layer to add support for gigabit ethernet drivers. Currently, the driver for Intel's Gigabit Ethernet hardware has been added and is now included in nightly builds, and support for Emulex's server-grade OneConnect adapters should follow shortly.

hugeping, a new contributor who has shown up following the release of the beta, contributed a few fixes to the XHCI (USB3) driver that were causing syslog spamming, and to the FreeBSD compatibility layer to get `iprowifi2100` (the second-oldest Intel WiFi driver) to work again.

The NTFS driver has been updated to use libntfs 2017.3.23 from 2014.2.15 by waddlesplash. He intends to take some time to look into long-standing KDLs in the driver, also ... whenever he has some.

mmu_man has returned, and started working on getting the BFS driver to work in big-endian mode. It can now read the filesystem on his PPC BeBox (though not write to it), and he's resumed work on the Haiku port to PPC on a GitHub branch (!).

SirMik contributed a fix for the HDA driver on some ~2008 Apple hardware.

waddlesplash discovered that the FreeBSD compatibility layer was triggering timer interrupts 1000 times per second, a likely contributing factor to Haiku's poor batterly life on most laptops, as this prevents the CPU from idling. This has been fixed in a way that reduces the timer interrupts all the way ... to 0 (!).

### Kernel

As part of investigating old tickets for the beta, waddlesplash determined that the kernel never properly flushes the underlying drive's write-cache as part of filesystem "sync" operations, which could be a major cause of the disk corruption many users experienced. So far, most users that have tested report that almost all their corruption issues are gone (!!); so if you were one of these users, try the Beta or a nightly build and see if it's fixed.

mmlr fixed some bugs in the kernel fault handler that were causing application page faults to panic the kernel under some very specific circumstances.

waddlesplash reworked the GCC2 symbol demangler, which is used by both Debugger and the kernel. There were a number of bugs that could have caused it to panic the kernel (and definitely caused Debugger crashes) which were fixed as part of this.

waddlesplash tweaked the x86 interrupt routing code to be more compliant with the specification, leading to some boot failures and other issues to be solved on certain devices.

As part of investigating a larger issue unwittingly exposed by apparently trivial changes, waddlesplash discovered that "destroyed" kernel mutexes were not really so, and could often be locked again with no errors (though usually this would result in a deadlock or a hang.) He added some mode debugging code to the kernel so that these errors  are now panics instead of hangs, and so they have been (slowly) getting detected and fixed.

### Build system

waddlesplash made some more tweaks to the Jamfiles and to sources to get Clang builds working. A full `x86_64` image can now be built with virtually no "hacks" in the tree (!), and no longer crashes in the stage-1 bootloader (!!), but successfully starts the kernel, draws the bootsplash, and then tries to load the initial boot modules -- but it fails here due to Clang not linking the "early boot" drivers in quite the way the `bios_ia32` loader expects. It's possible the EFI loader would get farther, but waddlesplash shelved that project to focus on beta1 before getting to that.

waddlesplash added MIME sniff rules for XPS and DjVu documents, as the `DocumentReader` application in HaikuDepot can open these natively now. HEVC "elementary streams" gained a sniff rule at the same time (MediaPlayer can play them, though they are rather rare.)

jessicah's changes to support multiple bootloaders at once (written mostly for simultaneous EFI/Legacy BIOS support, but they might wind up being useful on ARM also) were cleaned up and merged by kallisti5. He then moved on to getting the ARM build system code migrated to this new system, and then started refactoring the EFI bootloader so it can be used on ARM as well as x86 (U-Boot has an EFI mode, and some higher-end ARM64 hardware boots via EFI natively.)

### Infrastructure

Not much has happened on the infrastructure front, because there's finally not much to do. `baron`, the old server, was turned off for multiple weeks and nobody really noticed (well, except for people who wanted to use the `contact@` email address ... but I repeat myself), as all services have now been migrated to `maui`, the new server.

The infrastructure seems to have handled the load of all the web traffic following the beta1 release admirably, though the mirror system could still use some improvement.

### Ports

Java has returned!
<img src="/files/blog/waddlesplash/javashare.png"/>

As of right now, it's still 32-bit only; but waddlesplash has started investigating the bootstrapping process to get it working on x86_64.

waddlesplash did some work to fix up the PostgreSQL port, so expect to see packages of that in the next few days.

fbrosson made almost <b>200 commits</b> to HaikuPorts over this period of time, which might be a new record. These were mostly recipe cleanups and additions of command-line tools, Python packages, and merges of other contributors' recipes.

3dEyes has been contributing fixes to Qt, and also ports of 3D games from Linux, including OpenMW, among others.

---

... and that's about all for these two months; which is actually a lot, now that I see it written all out here. Anyway, thanks for reading, and see you next month!