+++
type = "blog"
title = "Haiku Activity & Contract Report, April 2024"
author = "waddlesplash"
date = "2024-05-14 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57680 through hrev57719.

<!--more-->

### Applications

bitigchi applied internationalization to the display of number values.

PulkoMandy fixed "Favorites" items in Tracker file panels not working properly. (This was at beta5 milestone item.)

dalmegnu did some code cleanup in the Screen preferences.

waddlesplash fixed a Tracker crash that could sometimes happen when right-clicking outside of an open context menu. (This was a beta5 milestone item.)

waddlesplash reworked Appearance preferences to hide most system colors by default, but instead compute them automatically based off of just 3 main colors. This makes switching from "light mode" to "dark mode" much easier (just choose the "Panel background" color and make it a dark gray instead of a light gray; the font colors will automatically flip to white, etc.), though there's still more improvement that could be made here. (This required a fair bit of work to come up with sensible methods to compute the secondary colors automatically.)

madmax fixed some missing pages in the Tracker preferences. (This was at beta5 milestone item.)

Jim906 added a check in the Tracker file copy routine to display a more cogent error message when a copy or move fails with "file exists". (This is especially useful on case-insensitive filesystems, when copying different files with identical cases.)

### Command line tools

waddlesplash fixed a syntax error in the `quicktour` script, which is used when double-clicking the "Quick Tour" desktop icon on first boots.

InfiniteVerma fixed `cat` on symlinks in the `fs_shell`.

### Kits

PulkoMandy fixed the build of the FFmpeg decoder plugin with tracing enabled, and then fixed the frame rate detection logic (fixing playback of a number of video files, at least.) He also dropped some code for legacy FFmpeg support, and re-enabled multi-threaded decoding, which had been lost in an earlier refactor, which waddlesplash cleaned up a bit in a later commit.

madmax fixed `.wav` sounds not completing playback properly due to missing logic in the FFmpeg plugin.

kallisti5 added `B_SYSTEM_DESKBAR_DIRECTORY` as an option for `find_directory`. There was already a `B_USER_DESKBAR_DIRECTORY` (dating back to BeOS R5), but not the `SYSTEM` equivalent, which was added by Haiku (and is used by packages installed in `/system/packages` for their Deskbar links), so now there is.

madmax fixed string formatting of size and rate after the locale-awareness refactors.

madmax fixed an ABI break in BSpinner that had broken some applications.

### Drivers

PulkoMandy adjusted the logic in the PCI driver to try harder to fix up broken memory ranges from ACPI tables. (This may fix some assertions that were causing boot failures on certain hardware since the PCI refactor some months ago.)

PulkoMandy modified the es1370 audio driver to only initialize its logfile if it actually detects supported hardware.

PulkoMandy changed a log trace in the x86 IO-APIC logic to print more information to make debugging easier.

SED4906 (a new contributor!) implemented support for ACPI-attached devices to the SDHCI driver (previously it only supported PCI-attached devices.)

diegoroux (a new contributor!) implemented a basic stub of a driver for virtio_audio devices, which PulkoMandy later wired into the build and fixed some minor issues with.

PulkoMandy enabled `-Werror` for all the audio drivers that had no warnings, and then followed up this change with some fixing warnings and enabling it in more of the drivers, combining in work by other contributors in some cases as well as fixing issues in bus headers in others. For the "ac97" family of drivers, he refactored a variety of common codem, and deleted a lot of unused code in the "ich" drivers. In the end, `-Werror` was enabled for all audio drivers currently used.

waddlesplash completed a major refactor of the L2CAP component (a core part of the Bluetooth stack, the "datagram" or "sequential packet" socket protocol) as well as various other parts of the stack that interact directly with L2CAP, or that L2CAP directly interacts with, and a few other parts of the system besides (fixing include declarations in some private kernel headers, creating a `NetBufferDeleter` for better `net_buffer` management.) Inside L2CAP, the `l2cap_address` module received a lot of cleanup and a few bugfixes, while the rest of the component was more or less completely rewritten, with an all-new state management system (merging earlier disparate ones split across multiple components), locking strategy (the old one was practically nonexistent and woefully unsafe), receive path (much less convoluted), send path (some more work still needed here, however, around queuing), and more. The new component was tested by waddlesplash and kallisti5, who confirmed it can at least establish basic L2CAP connections with real Bluetooth devices (though unfortunately, the userland portion of the stack does not even fully implement the Bluetooth "Service Discovery Protocol", making further testing much harder.) There's still much more work to be done before the Bluetooth stack can be used to (e.g.) play Bluetooth audio or use a keyboard device, but this gets things back on track.

### File systems

priyanshu-gupta07 updated the definition of the "Inode" and "ShortAttribute" structures in the XFS driver.

korli adjusted RAMFS to honor the `O_DIRECTORY` flag on `open()` (and return an error instead of succeeding spuriously.)

### libroot & kernel

korli fixed the TCP implementation to immediately return error when trying to `recv()` on listening sockets.

### Documentation

PulkoMandy migrated `rc`'s own internals documentation to the Haiku internals documentation section.

### Build system

Anarchos added a unit test for receiving from an unbound UNIX domain socket.

waddlesplash deleted a duplicate copy of the `MsgSpy` source code.

kallisti5 dropped the (unmaintained) Vagrant scripts from the tree.

korli added a tool to interact with Intel graphics registers in the `intel_extreme` driver.

### Are we beta5 yet?

There are a few remaining real issues that need to be fixed (or worked around); but after that, all that remain are mostly "tasks" (e.g. updating build-packages.) The only remaining blocker is a regression in exception handling on 32-bit that began with the GCC 13 upgrade. After that's fixed, we could probably begin the release process...

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
