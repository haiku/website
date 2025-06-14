+++
type = "blog"
title = "Haiku Activity & Contract Report, May 2025"
author = "waddlesplash"
date = "2025-06-13 22:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58848 through hrev58897.

<!--more-->

### Applications

PawanYr added code to HaikuDepot for when no search results appear in the "Featured packages" tab, to show a "Click here to search all packages" message. This should hopefully allow new users to more easily figure out how to use HaikuDepot, rather than seeing no results and assuming the packages must not be there.

waddlesplash fixed a crash in Tracker when using the keyboard to navigate the Desktop view.

OscarL added support for basic glob filtering to TextSearch (based on grep's `--include <glob>` option.) humdinger came by later and added keyboard navigation for history, along with a "Clear history" option.

jackburton79 fixed a potential double-lock in Terminal's clipboard handling code, that could happen when running Terminal as a replicant.

humdinger fixed a missing translation (for "Preferences") in Tracker.

humdinger fixed "Close and set to..." for multiple mails at a time.

jscipione (after a first attempt by humdinger) fixed the shortcut for "Select" in Tracker.

### Command line tools

Anarchos improved RemoteDesktop's argument parsing for handling the optional SSH port argument. He also set it to reuse ports by default, avoiding the need to wait for timeouts.

PulkoMandy and kallisti5 made some tweaks to Time to print a help message and exit if started with unrecognized command line flags.

humdinger fixed the download URL in the "install-wifi-firmwares.sh" script (though this script is very rarely needed, because it only applies to a few very old WiFi devices. Most WiFi firmware for any system of the past ~15 years that Haiku supports is already bundled with the OS.)

### Kits

waddlesplash reverted some changes from earlier this year to BTextView's word-wise/line-wise shortcuts, restoring the older (and more familiar) behavior.

PulkoMandy merged a change to significantly rework how the `BUrl` class handles URL encoding: it now stores URLs always in encoded form, simplifying a lot of logic. This unfortunately meant that the API had to be broken, but as this is a Haiku-introduced class not a BeOS-derived one, that's not quite so difficult as it could be. After updating the implementation and documentation, PulkoMandy followed up with a change adjusting all consumers of the API in the Haiku tree.

X512 fixed some incompatibilities in the flattened `BPicture` format (a format that records and replays Be/Haiku-native drawing commands) between Haiku and BeOS.

### Servers

OscarL made a number of improvements to the Latin-American and Spanish keymaps, mostly to `OPT+<key>` combinations.

### Drivers

PulkoMandy upgraded ACPICA, the library used to interface with hardware ACPI, to a newer version.

korli fixed the TCP implementation not retransmitting packets during connection startup, which was causing connections to fail to initialize when communications were unreliable.

DigitalBox98 added support for Intuos4-series devices to the Wacom driver.

### File systems

Jim906 fixed the NFSv4 driver to not delete internal `Inode` objects when unlinking files, allowing some more tests (from external NFSv4 testsuites) to pass. He also fixed a number of issues in the driver's internal caching logic in various corner-cases, fixing incorrect behaviors or instabilities and other issues.

korli enabled the "checksum-seed" feature in the EXT4 driver (it seems to be enabled by default on recent Linux, so this allows the EXT4 driver to once again read and write partitions created with the default settings from Linux.)

waddlesplash fixed some crashes related to the creation of large files, and the overwriting of hardlinked files, in the "RAMFS" filesystem.

### libroot & kernel

waddlesplash fixed another instance of the "Failed to acquire spinlock for a long time" kernel panic that could occur when onscreen debug output was enabled.

waddlesplash added code to the BIOS (x86) bootloader to automatically zero all registers before making BIOS calls.

waddlesplash enhanced an assertion failure message in the virtual memory layer, to help with diagnosing some issues.

waddlesplash fixed a number of crashes in the updated `libio` code (from upstream `glibc`) on the legacy (GCC2) ABI.

kallisti5 added more debug prints to some ELF loading failure conditions in the bootloader.

Habbie fixed the compilation of the BIOS bootloader with some extra disk-device-related tracing enabled.

waddlesplash switched back from the musl-based `strtol`, `strtod`, etc. routines to the glibc ones. It seems that while the musl ones work fine for musl's usecases, Haiku's greater support for C internationalization combined with musl's more limited support confuses applications and was causing problems. musl seems to be working on adding more support to these and other routines, so perhaps in the future we will be able to switch to musl's code once more and stick to it. (This revert doesn't affect the other musl-related code in libroot, nor the other upgrades to the glibc-based code.)

waddlesplash fixed validation that the requested locale in `setlocale()` really exists (and to bail out if it doesn't.) Previously any string was accepted, even ones for completely bogus locales, which was causing crashes in some rare circumstances later on.

### Documentation

waddlesplash made the new `BQuery::SetFlags` method behave like the other `Set...()` methods in `BQuery`, and wrote documentation for it.

jscipione added some more explanations about `BControl`'s status as an abstract class to its documentation.

### Build system

PulkoMandy fixed an "unused variable" warning. X512 deleted some unneeded code.

PulkoMandy dropped a number of redundant build rules for binaries from Jam (`Server`, `Preference`, etc.) and consolidated most of them to all use the `Application` rule. waddlesplash followed up later with another change finishing the rest.

OscarL added `INSTALL_DIR` and `TARGET_DIR` to the Makefile-Engine's example Makefile, along with comments explaining how they can be used to define where `make` and `make install` place the binaries.

kallisti5 made some preliminary changes for GCC 15 support in the system headers.

### RISC-V

kallisti5 fixed a linker script and updated a package for RISC-V, which should make the port boot once more.

### That's all, folks!

This month was a bit lighter than usual, it seems most of the developers (myself included) were busy with other things... however, HaikuPorts remained quite active: most months, at this point, there are more commits to HaikuPorts than Haiku, and sometimes by a significant margin, too (for May, it was 52 in Haiku vs. *258* in HaikuPorts!). I think overall this is a sign of Haiku's growing maturity: the system seems stable enough that the porters can do their work without uncovering too many bugs in Haiku that interrupt or halt their progress.

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
