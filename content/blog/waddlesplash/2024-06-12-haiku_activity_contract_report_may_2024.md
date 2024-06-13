+++
type = "blog"
title = "Haiku Activity & Contract Report, May 2024"
author = "waddlesplash"
date = "2024-06-12 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57720 through hrev57753.

<!--more-->

### Applications

nephele and PulkoMandy did some code cleanup and minor bugfixes to localized strings in the GLife screensaver.

madmax fixed copying of the hex representation of characters in CharacterMap; it was missing a terminating NULL in some cases.

madmax fixed Tracker's logic for truncating file sizes to work properly with the newly-localized decimal separators.

korli made ProcessController save and restore the "Power saving" mode's setting.

X512 fixed slight misalignment of the text field for editing of file names in Tracker.

waddlesplash fixed the Appearance colors pane not selecting the first color on window open correctly.

### Command line tools

waddlesplash added a missing include to `listattr`.

waddlesplash synchronized the `telnet` and `ftpd` applications with upstream FreeBSD.

### Servers

madmax refactored some parts of font management in app_server, fixing problems that occurred when in-use fonts were uninstalled or deleted from the system. (Now they will be retained in memory so that running applications keep working.)

### Kits

PulkoMandy tweaked a Locale Kit header to indicate to compilers that `B_TRANSLATE` and related macros don't process format strings but return them with the format specifiers still intact. This allows the compiler to give the appropriate warnings when format specifiers (e.g. `%d`) don't match the types of the passed arguments. Fixing this problem uncovered a number of translated format strings with incorrect specifiers, so he also fixed all of those across the source tree.

waddlesplash fixed the BScrollView sizing logic to not break non-layouted applications, and added a comment around it (because it'd been reworked multiple times after breaking multiple applications.)

### Drivers

waddlesplash disabled tracing in the SDHCI driver, reducing syslog spam.

### File systems

waddlesplash did some refactors to the query parsing code (but most of them were not merged before the end of the month, and are only on Gerrit.)

### libroot & kernel

korli adjusted network socket creation to only inherit some socket options (`SO_*`) from the parent socket rather than all of them (as options relating to listening sockets don't make sense for connection sockets, for example.) This matches the behavior of other OSes (e.g. FreeBSD) better.

korli implemented `pthread_sigqueue()`, a Linux/BSD extension (like POSIX `sigqueue()` but for pthreads instead of a whole process.)

korli adjusted the BIOS bootloader to handle no framebuffer being present (for example, when QEMU is started with `-vga none`.)

trungnt2910 removed some includes of Haiku-specific files from the compatibility version of `<endian.h>`, fixing the build of some applications that declare their own versions of types declared in the Be/Haiku `<SupportDefs.h>`.

waddlesplash reworked the network stack initialization procedure, which loads all network modules at least once during the initialization scan, to only unload the unneeded modules at the end of the scan (rather than immediately.) This stops a number of redundant reloads of modules, as some of the modules scanned depend on other modules to be scanned later. He also refactored the kernel socket logic to avoid unloading the network stack as a whole unnecessarily, and to avoid a global lock on socket creation.

waddlesplash made `ioctl(FIONBIO)` translate internally into `fcntl(F_SETFL)` (and did some slight cleanup to the `F_SETFL` implementation while at it.) This allows all the implementations of `FIONBIO` scattered about the tree to be dropped, and also means `FIONBIO` can now be used on more than just socket FDs (which some applications want to do for efficiency's sake.)

waddlesplash added a sanity check for the `physical_page_number` field of `vm_page`. In some rare KDLs it seems to be zero when the page itself is likely not at the start of the page list, which probably indicates the page structure has been corrupted. The KDL command now uses the offset the page is at in the page array to determine what number the page is expected to have.

waddlesplash fixed allocation of double-fault stacks on x86. This had been broken for over a decade (meaning all double-faults would just have turned into triple-faults.) Double-faults are now properly handled and simply be regular KDLs.

waddlesplash fixed the guarded heap to be able to build and run again, and added a sanity check to prevent "early" memory allocation from occurring after the memory subsystem has taken over management of pages (which happened during fix-up of the guarded heap.)

### Documentation

dalmemail fixed an erroneous comment regarding `CPUID` behavior in the x86 headers.

nephele wrote documentation for the `color_which` (e.g. `B_PANEL_BACKGROUND_COLOR`) enumeration.

### Build system

mt contributed a few fixes for warnings emitted by GCC 14 in the IMAP module, network drivers, and the file systems' query parser.

waddlesplash added a "hex-encoded attributes" mode to `libroot_build`. This allows the extended attributes emulation system (used when cross-compiling) to be used on filesystems that support extended attributes of arbitrary length, but which don't preserve or allow for case sensitivity in extended attribute names.

### Are we beta5 yet?

The one remaining blocker now has a fix available (but it hasn't been propagated to all necessary places, hence why the ticket remains open.) Once that's done, we can move forward. Huzzah!

The other tickets that need to be solved before the release are mostly proceeding forward as well. PulkoMandy has been working on upgrading to OpenSSL 3.x, which is one of the larger remaining items to be tackled.

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
