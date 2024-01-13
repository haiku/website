+++
type = "blog"
title = "Haiku Activity & Contract Report, December 2023"
author = "waddlesplash"
date = "2024-01-12 22:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57429 through hrev57493.

<!--more-->

### TCP fixes

The most notable series of fixes last month were in the TCP implementation. There have been problems and inefficiencies known in it for some time, but following reports that they could be reproduced even on loopback (not just on LAN), I decided to spend time investigating.

First, I revived the `tcp_shell` (which was last used in 2008 or thereabouts.) This is a test harness for the TCP implementation that allows it to be run entirely in userland. (At present, it can't send or receive data outside itself, so it's mostly useful for testing the TCP implementation against itself.) This is highly useful, as it allows running the TCP implementation with a real debugger attached (and of course, edit-compile-run cycles are much shorter than when a base system package must be built and installed to test it.) After I'd gotten it working again, I added support for writing `.pcap` files to it, allowing the results of such userland tests to be analyzed in Wireshark (`tcpdump` can be used to generate `pcap` files for the real loopback interface), and a command to send large amounts of data across the internal connection.

After that, I set in on understanding just what was happening to cause connections speeds to degrade so severely (and with little CPU being used.) I eventually discovered that lots of duplicate ACKs were being sent when they shouldn't. These are usually used as indicators of congestion, lost packets, or other problems, and so they caused the sending side of the connection to increasingly slow its transmissions. Fixing this problem solved some of the performance degradation.

The other issue turned out to be that when the send window size dropped to 0, occasionally the sending side would not immediately resume transmission when it received a window update, but would wait for the "persist" timer to fire. This turned out to be a long-standing bug for which a fix had been attempted years before, but it had missed a crucial case which resulted in it being mostly ineffective.

These two problems resolved (and some other minor refactors and cleanups done along the way), TCP throughput on loopback (on a single-core VM) increased from an unsteady ~45Mbit/sec to a solid 5.4 Gbit/sec. (On multi-core machines the difference will be much less dramatic; it was already in the Gbit/sec range there.) Users have reported improvements in real-world traffic speeds, too, but at least here there's still much more work to be done: the whole implementation could use a refactor, and then some work to take better advantage of TCP features like SACK, congestion-control, and window-scale. I intend to work on some of these, so stay tuned for that.

### Applications

jscipione removed a stray separator from a context menu in Tracker's FilePanel (the system-wide open/save dialogs), made packagefs volumes display as size "-" instead of an incorrect (small) size, and performed some code cleanup. He also made changes to allow "Get info" being invoked from the File menu with no selection (in this case it opens the info window for the current directory), and fixed the logic checking defaults for thumbnail support in Tracker settings. Later, he moved all the default Tracker settings constants into one location (they previously had been duplicated in various parts of the source code.)

OscarL fixed RAM size not updating properly in the replicant version of AboutSystem. Later, jscipione reworked AboutSystem to not archive views in the replicant at all, but instead to recreate them freshly every time the replicant is instantiated, and made modifications so that the extra border is hidden when "Show replicants" is turned off.

jscipione adjusted some strings for consistency in Keymap, and fixed some regressions in the Modifier Keys window from when Caps Lock was added as a modifier.

humdinger fixed the bookmark bar not displaying in WebPositive under non-English locales.

waddlesplash fixed TUN/TAP interfaces appearing with the "Wi-Fi" device icon in the Network preflet.

mt fixed a file descriptor leak in Expander.

humdinger replaced the "window" icons used in Deskbar. (The new icons have much clearer indicators for windows on other workspaces.)

### Command line tools

kallisti5 fixed an incorrect format string in `remote_disk_server`.

waddlesplash adjusted `pkgman` to use "natural" sorting in `pkgman search` output (e.g. so that "llvm12" will appear after "llvm9".)

### Kits

jscipione modified BListView to update the selected item on mouse-up, *if* it was different than the item selected on mouse-down. This is useful e.g. when holding the mouse while scrolling through a list of items. He then implemented auto-scroll on "drag", and made a number of fixes to various applications to take advantage of the new scrolling logic: DataTranslators, Icon-O-Matic, etc.

jscipione added logic to BMenuItem to support visually representing "backspace" and "delete" shortcuts in menus.

jscipione cleaned up some code in BTextView, and then added logic to prevent scrolling if all text was already visible in the view.

PulkoMandy implemented some more features in HaikuDepot's custom TextView (which is a prototype replacement for BTextView with a much cleaner design), including clickable text (for hyperlinks), underlines, and forcing a relayout of the document when things change.

Freaxed fixed resizing glitches in BColumnListView for especially wide columns.

X512 fixed attempts to bind `AF_LOCAL` sockets in `BAbstractSocket` when connecting.

korli fixed a memory management regression in the FFmpeg media add-on that was leading to crashes when playing media.

PulkoMandy refactored some parts of the FFmpeg media add-on to remove usage of deprecated functions and prepare the way for using newer versions of FFmpeg.

### Servers

X512 modified app_server to clear view backgrounds immediately on expose. This will reduce redraw artifacts when applications are responding slowly (or are entirely hung.)

### Drivers

korli fixed some problems with the global-lock code in our ACPICA glue code, and cleaned up some of its build rules (as well as the build rules for some other kernel add-ons, at the same time.) PulkoMandy fixed a tracing problem in the glue code, and then updated to ACPICA version 20230628. korli then adjusted the ACPI module to export some more attributes into the device manager.

nephele attempted to fix a problem with brightness-control handoff in the `radeon_hd` driver.

korli fixed incorrect keys being reported on select (USB) HID keyboards with "minimum" values specified in their reports.

X512 (with some modifications from waddlesplash) adjusted the `poke` driver to map physical memory into the team's address space rather than the kernel's, meaning it will be automatically cleaned up on team exit.

mt fixed a use-after-free in an error branch in the virtio_block intialization code.

waddlesplash refactored network device statistics to be updated (mostly) within the stack itself, as opposed to the various device modules (ethernet, etc.) Now the only case where a device module has to update the device statistics directly is when packets are dropped in receive routines. This also fixes another case where loopback statistics were not being updated properly.

### File systems

mt fixed a duplicate expression in the FAT driver.

### libroot & kernel

mmu_man renamed `IFT_TUN` to `IFT_TUNNEL` (to match the name of the constant on the BSDs.)

waddlesplash made the `B_CLONEABLE_AREA` protection flag modifiable from userland (through `set_area_protection`), and cleaned up some bits of the kernel implementation of area-protection modification.

PulkoMandy made `regex.h` use `_DEFAULT_SOURCE` to protect its non-standard features (instead of a non-standard GNU preprocessor define.)

### Build system

PulkoMandy fixed the build of the launch_daemon test applications.

### Documentation

kallisti5 added a documentation page detailing how to get code completion in IDEs for the Haiku source tree.

PulkoMandy added a page describing the source tree's layout (mostly copied from the website, and the old page obsoleted.) He also wrote a page documenting kernel synchronization primitives for the Haiku Book.

PulkoMandy added a Python script that generates `dot` format graphs for dependencies from a set of HPKG files.

### ARM & RISC-V

davidkaroly fixed initial page mapping in the EFI loader for RISC-V.

### HaikuPorts

A new version of Genio (the native Haiku IDE) is now available. There are also a lot of new KDE packages (including RKWard, an IDE for the R language.)

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
