+++
type = "blog"
title = "Haiku Activity & Contract Report, September 2025"
author = "waddlesplash"
date = "2025-10-13 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59022 through hrev59049.

I was quite busy with other things besides Haiku in September, so this was a somewhat shorter month than usual.

<!--more-->

### Applications

apl fixed the scrollbar position after rows of column list views are removed, most notably for the ones in HaikuDepot.

PulkoMandy fixed a rare crash on open in WebPositive.

PulkoMandy enhanced Devices to show the human-readable names of ACPI device nodes, when known.

korli added support for overlined text, "DECRQM" (a way for terminal applications to determine the terminal state), and fixed "CSI REP" (repeat character) support in Terminal.

magnetProgramming (a new contributor!) changed Icon-O-Matic to display a warning message when exporting to SVG with gradient types that can't be represented in SVG.

### Kits

X512 cleaned up and consolidated a bunch of the code that sends data between the Interface Kit and the app_server, putting related methods nearer each other, changed `BRegion` sending to be more efficient, and fixing the sending of `BAffineTransform`.

waddlesplash imported changes from upstream to the FlatControlLook making it work better with the new default color tints.

### Drivers

waddlesplash fixed some problems with `select()` disconnection notifications in the TTY driver, fixing some programs not exiting when their parent TTYs did (e.g. `bash` child processes of a force-killed `Terminal`).

waddlesplash fixed the output packets counter not working properly on drivers imported from OpenBSD.

waddlesplash refactored device attach glue code in the FreeBSD/OpenBSD network driver compatibility layer, cleaning up how the "MII" network bus drivers are attached, and potentially paving the way for supporting more than just PCI and USB drivers in the compatibility layer (e.g. FDT support should now be much easier to implement than it would've been before).

waddlesplash adjusted the C-states CPU idle module to print more errors to indicate why C-states can't be used.

PulkoMandy improved logging and error handling in the USB-RNDIS network driver.

### File systems

Jim906 fixed the NFS4 driver to behave properly after the previous month's changes to the VFS to add more strict assertions uncovered bugs in a number of filesystem drivers. He also added a lot more (optional) debug output for diagnostics. He also improved handling of file "delegations", fixing a lot of errors and KDLs when working with an NFS4 server that sends these.

waddlesplash added some missing checks to the "overlay layers", turning a kernel panic into a regular error result.

waddlesplash removed some redundant checks of file descriptor modes from the RAMFS driver, and cleaned up some error codes across different filesystems. He also added some missing checks to the VFS layer itself.

waddlesplash added a fallback in a VFS I/O routine that some filesystems rely on, fixing KDLs when doing certain operations on RAMFS.

### libroot & kernel

korli fixed the `CPU_*` GNU extension definitions in `sched.h` to match glibc's (and to work with older C standards), fixing compatibility with a few ports.

jmairboeck added `WCOREDUMP` to `sys/wait.h`, a POSIX-2024 addition.

waddlesplash made some changes to the default kernel `malloc` implementation to queue objects differently and to add more checks under "KDEBUG" kernels (which all nightly builds are) to make use-after-frees more likely to be caught. (Already these changes have resulted in at least one bug report.)

waddlesplash fixed some corner-case KDLs and errors in the network stack related to less-used `recvmsg`/`sendmsg` features, and added some testcases related to them.

waddlesplash fixed a corner-case double-free in the `select()` implementation.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
