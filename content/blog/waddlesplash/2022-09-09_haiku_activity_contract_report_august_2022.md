+++
type = "blog"
title = "Haiku Activity & Contract Report, August 2022"
author = "waddlesplash"
date = "2022-09-09 22:00:00-04:00"
tags = ["contractor"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56321 to hrev56399.

David Karoly, who has been doing a lot of work in and around the ARM ports, was granted commit access last month. Welcome to the team, David!

<!--more-->

### HiDPI work

Most of waddlesplash's time last month was spent on reworking various kits, applications, and libraries to better support Hi-DPI environments. Haiku has had partial support for this for some time, but there have been shortcomings which lead to not all metrics being properly scaled, leading to lots of applications displaying strangely at larger font sizes and DPIs.

Since a picture is worth a thousand words, here are three screenshots: the first without any scaling, the second what things looked like at 2x scale before last month's work, and the third after last month's work:

<a href="/files/blog/waddlesplash/2022_09-unscaled.png"><img src="/files/blog/waddlesplash/2022_09-unscaled.png" width="33%"/></a>
<a href="/files/blog/waddlesplash/2022_09-hidpi-before.png"><img src="/files/blog/waddlesplash/2022_09-hidpi-before.png" width="33%"/></a>
<a href="/files/blog/waddlesplash/2022_09-hidpi-after.png"><img src="/files/blog/waddlesplash/2022_09-hidpi-after.png" width="33%"/></a>

Among other things, changes were made to have dynamic instead of fixed values for: icon size computations in many applications (including Tracker, WebPositive, BAlerts, Deskbar, Network preferences, DiskProbe, desklink, ShowImage, Debugger, TeamMonitor, ProcessController), menu margins and padding, Deskbar sizing/padding/margins, BTabView padding, popup-menu dropdown buttons, Tracker (info window, icon cache, window metrics, file panels, column sizing), Terminal scrollbar metrics and font size, registrar's Shutdown dialog, all BButtons, BColumnListView scrollbar sizing, and Debugger teams list sizing. (Whew!)

The list of observable differences between default-DPI and high-DPI Haiku is now much smaller than it was previously.

### Applications

Jim906 made Tracker's Info window display details about the filesystem type, when invoked on a Volume directly.

PulkoMandy updated the lists of active and past contributors in AboutSystem.

jscipione added an ASCII art diagram to the Deskbar source comments to better indicate how "regions" work.

jackburton fixed a possible crash in the Screen preflet.

jsteinaker added a shortcut to cycle through tabs in WebPositive, much like most other browsers have.

apl fixed a crash in HaikuDepot when images cannot be loaded.

waddlesplash fixed the (extremely annoying) long-standing performance issue in Debugger where changing functions in the stack trace freezes the whole application for multiple seconds.

waddlesplash changed all the views in Debugger that display addresses to use a monospace font instead of the default display font.

### Drivers

korli improved the intel_extreme modesetting driver on some Gen-12 models.

korli disabled some non-working devices in the radeon_hd modesetting driver. kallisti5 and korli fixed memory computations in for newer cards in it, fixing crashes and getting some devices closer to working.

OscarL fixed baudrates 1200 and 1800 in the pc_serial driver, which were incorrectly configured. He also fixed the TCFLSH and TCSBRK ioctls.

waddlesplash fixed a NULL-dereference panic that occurred when trying to mount certain packages in `packagefs`.

waddlesplash fixed some more of the "can't connect" problems that occurred on OpenBSD WiFi drivers, and also fixed saving WPA passwords when using them.

### Servers

madmax reworked font cache locking in app_server to fix a deadlock in glyph layouting which occured in some applications.

### File systems

More work was done on the XFS filesystem as part of the GSoC project.

### Kits

jscipione made the `B_WORKSPACE_ACTIVATED` notification message be sent to child views and not just the root view of a window by default.

### libroot & kernel

trungnt2910 fixed a regression in `uselocale` that was causing crashes in some HaikuPorts applications.

waddlesplash adjusted the entry-caching system (part of the kernel's filesystem caching systems) to use larger cache sizes when there is more memory available, and also fixed a bug that was causing locking to occur far more than necessary. This improves the performance of things that search around the filesystem a lot, like compiling or `git`, somewhat.

waddlesplash fixed a race condition in the core thread scheduling logic which was causing deadlocks on some systems or under some settings. This bug was exposed by the change a few months ago which fixed the thread profiler; it seems to have existed all the way back to the import of the new scheduler in 2013 or so. In addition to fixing full-system hangs, this also was observed to give a 10% performance improvement (!) in some workloads.

korli fixed the kernel implementation of the `set_memory_protection` syscall to validate the passed flags correctly. He also made `putenv` catch more invalid strings as errors, and added some more checks to the userland-to-kernel `iovec`-copying utility routines introduced recently.

waddlesplash fixed a KDL in the VFS that occurred when using FIFOs in some rare scenarios. He also added some more information to assertion `panic`s in the VFS layer to help with debugging.

waddlesplash replaced libroot's strftime/strptime/wcsftime implementation's with musl's.

korli fixed some int32/size_t mismatches in kernel FD handling.

waddlesplash cleaned up some inline assembly definitions inherited from BeOS in public headers.

korli fixed `mprotect` page protections to be honored in `fork`ed teams.

### ARM!

X512 fixed loading of the MMIO-based VirtIO bus.

davidkaroly continued his work on the ARM port, implementing the generic timer, reading more parameters from the FDT, discovering VirtIO-MMIO and PCI devices from ACPI, using ACPI for PCI interrupt routing, refactoring PCI root node detection, discovering PCI and its interrupts from FDT, lots of interrupts-related fixes,

X512 fixed stack traces for ARM, and also fixed fetching the current thread ID in libroot.

### Are we beta4 yet?

The only remaining true "blocker" issue is one more WPA-connection-related one which I will likely fix this month (if I can manage to reproduce it.) There is also another blocker related to performance problems on 11th-generation Intel CPUs, but nobody has replied to korli's request for testing in some time here, so that may be kicked down the road due to a lack of testers. Otherwise, there does not seem to be anything else remaining.

So, likely at the end of this month or the beginning of next, I will begin the beta4 release process. If you know of any other critical regressions from previous releases or other problems that deserve to be fixed before the beta, speak now...

### That's all, folks!

Thanks once again to all the donors who make my contract possible!
