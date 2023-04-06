+++
type = "blog"
title = "Haiku Activity & Contract Report, March 2023"
author = "waddlesplash"
date = "2023-04-06 16:00:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56804 through hrev56887.

<!--more-->

### Applications

zdykstra fixed e-mail notification popups to open the mail directory in Tracker when clicked on. He also modified Mail to filter out messages in Trash from the "unread" counter, fixed a crash when local files conflict with remote IMAP folders, made the default mail folder attributes only be copied for new folders (fixing Tracker not "remembering" window size and positions),

waddlesplash refactored the Attachments view in Mail to use layouts. While it still does not display entirely correctly on systems with non-default font sizes, at least it is much better than it was previously.

OscarL fixed AboutSystem replicants displaying old, incorrect kernel dates.

eblanca fixed the ActivityMonitor settings window sometimes appearing (partially) offscreen.

zdykstra fixed setting custom icons for directories in FileTypes. This was theoretically supported, but the code did not actually handle this case properly; now, it works as expected.

Zardshard refactored some portions of Icon-O-Matic, like the TransformBox state handling, workspaces switching, and making use of `BReference<>` in some places, to fix various bugs and improve code quality.

humdinger reworded some text in Installer for clarity's sake. kallisti5 added Installer to the "minimum" build profile (mostly only used by developers for test builds.) n0toose adjusted Installer's new window layouts and removed some leftover code.

bitigchi started working on switching various applications to use `BNumberFormat` for displaying numbers, for locale-aware numeric formatting. So far, AboutSystem, MediaConverter, ShowImage have been refactored to use it.

jscipione fixed Deskbar's minimum-width calculation in horizontal mode.

humdinger added a "Copy" button to the WebPositive error console, allowing to copy all or just the selected messages. He also added code to detect when lines are repeated and only display a repeated count, instead of duplicating the lines.

zdykstra fixed Tracker writing default columns to the wrong attribute. Previously, Tracker was writing an endian-native state to a field declared "big-endian", which of course meant loading it did not work. Now, the correct attributes are used.

apl added password requirements display to HaikuDepot. Previously, trying to set a password that did not meet the requirements would just fail without an explanation of why.

Zardshard fixed rescanning in DriveSetup losing the focused partition list item. He also fixed a disparate view name.

X512 fixed Haiku3D's `BGLView` unlocking behavior, fixing redraw issues in some circumstances (especially on the new EGL-based `BGLView`, which is not yet turned on by default.)

Zardshard associated "core" files with Debugger, so one can open them with a double-click rather than having to open Debugger manually.

### Command line tools

jessicah fixed `open` not properly handling a case where the application launched was already running.

waddlesplash added a bunch of new features to `strace` to support pretty-printing of flags fields, `void**` parameters to memory mapping functions, error return values in `ssize_t`, fixed some bugs resulting in crashes, and some other miscellaneous improvements. Here is an example of printing two of the syscalls impacted the most by these changes, before:
```
open(0x5, "plaintext", 0x2042, 0x0) = 0x8000000f () (49 us)
map_file("http://libicuuc.so.66 mmap area", 0x7f04c2675228, 0x6, 0x1ababd0, 0x1, 0x0, true, 0x3, 0x0) = 0x329a0 () (108 us)
```
and then after:
```
open(0x5, "plaintext", O_RDWR | O_NOTRAVERSE | O_CLOEXEC, 0x0) = 0x8000000f Operation not allowed (57 us)
map_file("http://libicuuc.so.66 mmap area", [0x0], B_RANDOMIZED_ANY_ADDRESS, 0x1ababd0, B_READ_AREA, 0x0, true, 0x3, 0x0) = 0x73e8 ([0x6392223000]) (135 us)
```
This will greatly enhance debugging of certain memory- or file-related issues both in applications and in Haiku itself.

### Drivers

OscarL removed some obsolete functions from some `misc`-category drivers. He then also fixed temperature reporting in the `acpi_thermal` driver to report proper units.

### File systems

trungnt2910 fixed an edge case in userlandfs name handling: previously, names of length 1 did not work; now they do. (This was done as part of getting VMware guest additions filesystem support working in Haiku.)

waddlesplash updated NTFS-3G used by the `ntfs` filesystem driver to the latest version (a small number of bug fixes only.)

trungnt2910 implemented file content caching and thus also file memory-mapping for FUSE filesystems made available through `userlandfs`. This required some investigation and collaboration with other members of the development team, and then implementing the "IO" hook (which is used for semi-asynchronous IO) and properly handling caching flags of client FUSE filesystems. (This allows applications on mounted FUSE filesystems to be launched.)

### Kits

waddlesplash fixed handling of preferred configuration view sizes of most system DataTranslators, which fixes translator configuration views not being visible or just opening blank windows in many applications both first- and third-party (e.g. Screenshot.) zdykstra then folowed this up by removing manual assignments of view sizes from remaining translators.

waddlesplash migrated all remaining in-tree consumers of the `BNetworkDevice::GetNextNetwork` API (which was the old way of enumerating scanned WiFi networks, and was very inefficient) to the newer `GetNetworks` API, and then deprecated the `GetNextNetwork` API (as nothing out-of-tree appears to use it at all.)

### libroot & kernel

kallisti5 adjusted the EFI bootloader to reinitialize serial out after exiting EFI boot services. This fixes serial output on some RISC-V and ARM systems, which is critical for debugging problems early in the boot sequence.

humdinger adjusted some text in the bootloader around boot volume states for clarity's sake.

waddlesplash switched the global `VMArea`s store in the kernel to use an `AVLTree` instead of a `BOpenHashTable`. The open hash table had fast insert times, but as more and more areas were created, removal became slower and slower. Creating 2 million areas was quick, but then deleting them all when the application was destroyed could take *2 minutes* to complete. Under the new system, creating areas is just slightly slower (about 15% slower) while destroying them (when there are such large numbers) is much faster: deleting 2 million areas now takes 4 seconds instead of 2 minutes. In practice, however, this will not be a noticeable performance improvement most of the time, as most applications use at most thousands, not millions of areas, and the performance benefits then are not as noticeable.

waddlesplash refactored the thread-local-storage initialization code in the kernel. Previously, it was spread out across architectures, and now it is mostly unified; he also fixed reinitialization of thread-local variables after `fork` to only update select values instead of overwriting them, which fixes thread-local values being lost after `fork`.

### Build system

### Documentation

PulkoMandy reorganized the (rather old) internals documentation for app_server and modernized it slightly. He then added some new sections on invalidation, view bitmaps, and overlays.

nephele fixed the display of code blocks in the Haiku Book API documentation. He also fixed broken links in the package system documentation.

waddlesplash removed the `sock` application from `src/tests`, as it is rarely used and is now available from HaikuPorts.

Zardshard clarified the `BWindow::WorkspacesChanged` documentation.

kallisti5 added a draft proposal of adding a new EGL platform for Haiku to the EGL specification. While not submitted upstream yet, if it is (and is accepted), this would mean a new platform type in public EGL headers that applications could use to detect Haiku's windowing system.

### ARM & RISC-V

davidkaroly fixed the "interrupt postlude" on ARM64 to match other architectures. He also fixed loader code/data region mapping in the EFI bootloader for ARM64 as well. He also cleaned up some commented-out code in the ARM VM translation map handler, and removed unused variables from ARM kernel arguments.

kallisti5 fixed a double SATP-setting in the RISC-V bootloader that was causing hangs.

davidkaroly also deleted the SH-4 and DEC Alpha architecture directories from the kernel. Most of this code was inherited from NewOS, and consisted of headers only without any actual implementations. In case anyone ever does decide to try and port Haiku to these architectures, it is probably best to start from scratch, anyway (but why would you want to do that, at all?)

davidkaroly added a workaround to the ARM paging system to assume nothing is dirty, and implemented signals, fork, and syscall restarting. This allows the ARM port to get close to booting to desktop; it now starts `app_server`, but shows a crashing application dialog instead of getting to the desktop.

X512 made a number of changes to the RISC-V port: increased the total interrupt count, adding missing instruction cache invalidation and generic cache clearing, implementing more FDT features, timer frequency calculation, enabling the build of various network drivers, and more.

davidkaroly fixed unaligned memory accesses in BMessage which were causing crashes on ARM.

### `callout`s

Last month, I reworked the FreeBSD compatibility layer's `callout_stop` handling to be able to stop callouts that are about to run, not just ones scheduled to run at a later time. This change, however, wound up causing a lot of problems and took some time to get right; I wound up spending two full days debugging the problems caused by the initial attempt at a fix.

The initial code change was relatively straightforward (or so it seemed), did not cause any notable problems in testing, and so was pushed. The next day, reports came from a few users that, after some uptime (how much varied, it was not consistent), the kernel `fbsd callout` thread would suddenly start using 100% CPU and the only way to fix it was to reboot. After some attempts, I reproduced this successfully on bare metal with the `ipro1000` driver, but not in his initial VM setup; it was confirmed to be flaky.

Upon inspecting the code, it seemed that the only way 100% CPU usage could occur would be if an item in linked-list wound up referencing itself, i.e. a double-insertion. I thus added code (guarded by `KDEBUG`, which we only enable on nightly builds, not release builds) to modify items being removed from linked-lists to catch this case. It turned the 100% CPU usage into a KDL, but not any more frequent of one, and the KDL itself was unexpectedly mystifying as to what the problem really was.

Thankfully, other users found a QEMU setup on which the problem did reproduce, and more dead-ends, various attempts to make the code more robust  against such problems (without much success) and much careful thought, an artificial testcase was found that triggered the bug within seconds of booting, instead of minutes or hours. More assertions added to the linked-list code pushed the cause of the problem back further, and eventually the true cause was determined: some FreeBSD drivers can reschedule callouts just before they occur, which wound up in the "cancellation" logic, but the callouts had not actually been cancelled, leaving them in an invalid state. Following this, the problem was clear, and a fix was committed in short order.

In the future, the new assertions added to the linked-list code will likely catch problems like this much more readily, and save hours of debugging time. It's possible that some more obscure problems in other parts of the system could even be uncovered by the new assertions (though as of yet, I have not heard of any such reports.)

### HaikuPorts

The HaikuPorts team is presently hard at work upgrading all Python-related recipes to use a newer set of Python versions, so that old and deprecated Python 3 (and 2) versions can be dropped.

Begasus also wrote up a [quarterly report](https://discuss.haiku-os.org/t/haikuporter-haikuports-quarterly-report/13303) for HaikuPorts and HaikuPorter on the forums.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!

Later this month, I intend to write up a long and technical article about Haiku's kernel condition variables, which have some interesting properties not found on most other operating systems, and for which I rewrote the implementation between the beta3 and beta4 releases. So, stay tuned for that!
