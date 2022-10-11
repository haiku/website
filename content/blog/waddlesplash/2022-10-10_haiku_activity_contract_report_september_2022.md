+++
type = "blog"
title = "Haiku Activity & Contract Report, September 2022"
author = "waddlesplash"
date = "2022-09-10 23:50:00-04:00"
tags = ["contractor"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56400 to hrev56504.

<!--more-->

### Applications

jscipione fixed Deskbar to compute the clock margin based on the font size instead of hard-coding it.

humdinger made sure all strings in HaikuDepot are properly translateable (some were previously not.)

OscarL fixed some usability issues in the Sounds preflet, and debug builds of Tracker.

devin.gillman fixed crashes in `RemoteDesktop` related to command-line argument validation.

waddlesplash fixed more HiDPI issues in Tracker, including incorrect sizing of the draggable folder icon, missing resets of view states, missing columns in some views, and more. He also enabled automatic `sync`'ing during copy operations.

waddlesplash fixed the preview area width in the Appearance preflet following recent refactors.

korli fixed DriveSetup to auto-select the correct partition type if possible instead of defaulting to BFS in the "Change parameters" panel.

jscipione refactored AboutSystem to support the main view being used as a replicant (on the Desktop or elsewhere).

waddlesplash implemented HiDPI icon scaling in FirstBootPrompt, Keymap preferences, Input preferences, FileTypes, BootManager, and others. He also cleaned up HiDPI-related code in various applications.

waddlesplash adjusted the default weights of splitters and column sizings to better accomodate different font sizes in Debugger.

waddlesplash made the "Zoom text only" option in WebPositive actually be remembered across runs of the application, and defaulted it to "off" (as all other browsers have done for many years.)

waddlesplash turned on thumbnail generation in Tracker by default. (All known problems related to it causing crashes have been resolved for some time, and no new ones discovered.)

### Command-line tools

OscarL contributed an implementation of a `pidof` command, which comes standard on Linux but Haiku was until now lacking.

OscarL adjusted the default search scope of `pkgman search`, and added a `--search-scope` option to switch behaviors as necessary.

OscarL fixed the Haiku coding style checking tool to be able to run with Python 3.

### Drivers

davidkaroly silenced some unnecessary debug prints in the VirtIO drivers.

korli made some fixes to the HDA driver for some specific devices.

PulkoMandy and waddlesplash added missing NULL checks to various USB drivers' probe functions. (This fixes some rare KDLs that were preventing bootup when certain USB input or WiFi devices were connected.)

waddlesplash deleted an old, unused TTY bus manager. (We have other, more advanced TTY handling mechanisms now.)

PulkoMandy let the VESA BIOS patching code try harder to use potentially (but not necessarily) invalid custom modes.

korli changed the AHCI (SATA) driver to propagate the correct physical block size to the `READ_CAPACITY` command.

PulkoMandy made the Disk Device Manager automatically generate a name for volumes and filesystems that do not specify one. Previously, individual drivers or other parts of the system would do this but in an inconsistent way (or some would not do it at all, leading to confusion for some nameless volumes.) Now it is done consistently, generating a name based on the size of the volume or partition.

korli fixed inconsistencies in the reporting of "physical block size" (the size of blocks on a physical disk or other storage medium), which is separate from the "logical block size" (the size of blocks that reads/writes occur in) or "content/partition block size" (the block size of a filesystem on the device.) He adjusted a number of drivers to report it. It should now be displayed in DriveSetup.

waddlesplash merged a few patches from upstream OpenBSD to the `idualwifi7260` and `iaxwifi200` drivers. He also cleaned up the `MCLGETL` implementation, which allowed for a few more `#ifdef __HAIKU__` blocks to be removed and straight OpenBSD code used instead, and deleted some unused methods from some compatibility headers.

### Servers

kallisti5 adjusted debug logs in various servers to ensure that the component or server generating the log indicates as such in the output.

korli fixed saving screen brightness in some more configurations in app_server.

mbrumbelow removed the obsolete `register` storage class from some old code.

waddlesplash added logic to `app_server` to automatically select a larger font (1.5x or 2x) on HiDPI screen resolutions. (It can still be changed in Appearance preferences if necessary, of course; this merely picks a default larger than 12 on such screens when none has yet been set.)

### File systems

Mashijams continued the work, begun during GSoC, on the XFS driver, fixing bugs and implementing new features, like shortform attributes and symbolic links.

korli implemented changing partition types under GPT.

waddlesplash implemented a buffer management utility function for filesystem drivers to use in their `read_dir` implementation hooks, which takes care of automatically aligning the buffers and calculating the final sizes. (Most drivers did not align buffers, which was not a big problem on x86 but caused faults on ARM, and presumably also would on SPARC if the boot process got that far.) He adapted the BFS and NTFS drivers to use the new method, and korli adapted the EXT2/3/4 driver.

### Kits

jscipione fixed label alignment in BBoxes at font sizes other than the default.

waddlesplash fixed drawing borders in menu fields at font sizes larger than the default.

jsteinaker fixed parsing cookie date-time strings in the HTTP implementation of libnetapi.

nielx fixed the build of the `BMemoryRingIO` tests.

### libroot & kernel

waddlesplash fixed ELF thread-local storage destruction, which previously happened much too frequently and could have led to TLS data being destroyed incorrectly or prematurely, leading to application crashes.

PulkoMandy deleted some old, long-unused files related to partition management.

davidkaroly refactored some parts of MMU handling in the x86 EFI loader, and implemented loading "non-native" kernels at least for x86 (i.e. 32-bit EFI loading 64-bit kernels and vice versa.)

jsteinaker fixed an incompatibility in the newly imported `strptime` implementation from `musl` which had left it mostly broken.

korli implemented the remaining portions of the C11 Threads specification; it should now be complete.

korli changed TSC frequency initialization to occur based on the "CPUID" if possible on x86, instead of relying on a computed value. This fixes broken timers on (at least) some 11th-generation (and higher) Intel processors, which was leading to very sluggish and unresponsive systems. (This was one of the major issues holding up beta4.)

korli adjusted TSC reads on x86 to be strongly serialized (i.e. with `LFENCE` or other methods) so that the most fresh system time is always fetched.

waddlesplash moved around some imported code in `libroot`'s directories and replaced some more minor functions with the equivalents from `musl`.

waddlesplash rewrote the `readdir_r` implementation to fix some potential problems in it when mixed with regular `readdir`. (It does not seem to be widely used, so whether these problems ever actually happened is unclear.)

### Build system

dominicm adjusted some build system rules that were taking advantage of undocumented or unspecified Jam behavior, as part of his project to work on a replacement for the jam build tool.

waddlesplash adjusted the compiler flags used for building the kernel and drivers to specify `-fvisibility=hidden` for all static libraries (allowing unused functions to be excluded from the final output), which reduced the size of some library-heavy drivers (e.g. FreeBSD/OpenBSD WiFi drivers) by noticeable amounts.

waddlesplash made the same `-fvisibility=hidden` change for the bootloader, but he also adjusted it to use `-Oz` as well (optimizations for size instead of speed), saving a quite large percentage off the size of both the BIOS and EFI loaders (the former of which was getting close to the current internal limits for the size of boot images.)

### ARM!

davidkaroly adjusted ARM exception handling, user memory flags, fixed some thread-related and context-switching issues, refactored page fault handling, implemented thread-local storage, stack traces, unwinding, and more. He also refactored MMU handling for all non-x86 architectures in the EFI loader to use more common code.

### Are we beta4 yet?

Two blocking issues were resolved last month. The only ones that remain are "tasks" (i.e. not true issues, but things which must be changed before the next release, and should not be hard to do at all.)

Thus it is my plan to start the release process imminently: hurrah! This should have happened months ago, but things were delated as usual.

### That's all, folks!

Last month was on the shorter side: due to a variety of things outside of Haiku, I wound up logging only about a weeks' hours. Still, quite a lot happened in that time, as you can see!

Thanks once again to all the donors who make my contract possible!
