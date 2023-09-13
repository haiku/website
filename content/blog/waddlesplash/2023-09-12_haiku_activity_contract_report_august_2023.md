+++
type = "blog"
title = "Haiku Activity & Contract Report, August 2023"
author = "waddlesplash"
date = "2023-09-12 21:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57184 through hrev57256.

It's worth noting: the main Haiku CI is currently offline as the developer who was hosting the build machine moved to a location with much slower internet. A new build machine and home for the CI has already been selected, but isn't fully online yet, so the nightly builds are a bit behind at the moment.

<!--more-->

### Applications

Zardshard contributed some changes to refactor parts of Debugger's CLI event handling, especially the `WaitForThreadOrUser` routine and also the message-passing facilities.

PulkoMandy implemented clipboard paste in SerialConnect.

Humdinger adjusted Tracker's logic that converts a size in bytes to a user-friendly string, and added a comment for translators at the same time.

Humdinger added a mime-db entry for email drafts (which have a different type than regular email files.)

Zardshard (a GSoC '23 participant) made the left sidebar's lists resizable using splitters, fixed a window resizing bug, improved various saving-related error messages, and fixed some bugs that occurred when pasting text. Zardshard also implemented perspective transformations for Icon-O-Matic and HVIF, a long-requested and pretty substantial change, which required importing newer AGG rendering code. Finally, he made sidebar list items copy/pastable, and fixed selection of multiple path vertices.

Humdinger improved CodyCam's icon and added its missing Icon-O-Matic source file to the repository.

waddlesplash fixed some screen vendor names used in Screen preferences to remove extraneous content, or to restore proper names that had been deleted from the upstream database the list was sourced from. (This fixes the scary "DO NOT USE" messages that would sometimes appear in Screen preferences.)

waddlesplash adjusted Debugger's debug-info loading code to print a more intelligible warning when encountering unsupported DWARF versions.

waddlesplash reworked ShowImage to use layouts for the main view area. (This fixes an incorrect sizing problem that would happen when hiding or showing the toolbar.)

waddlesplash refactored Tracker's `NavMenu` and `SlowContextPopup` classes, first reducing the differences between them, and then folding the latter into the former (as they were near-duplicates of each other.) This duplication dated all the way back to the first OpenTracker source commit over 20 years ago, and probably long before that! He also merged some closely related methods in `BPoseView` that had TODO comments indicating they should be combined.

davidkaroly implemented DWARFv4 line-info parsing in Debugger. (However, our new GCC emits v5 by default, despite some flags set internally that should prevent this, so one still needs to specify `-gdwarf-4` in order to get GCC to output debug-info parseable by our Debugger.)

waddlesplash fixed Zip-O-Matic's logic to select the newly-created zip file in Tracker.

### Command line tools

PulkoMandy moved the "mountpoint" column last in the `df` command's output, making the table much more readable when there are long mountpoint paths.

### Kits

PulkoMandy made some improvements to `BTextView`'s internal height-vs-width metrics calculation routine when the text view is in read-only mode.

waddlesplash adjusted lock acquisition in `BMenu::AddItem`, which should hopefully fix some of the long-standing crashes known to happen in the Network preflet, among others.

waddlesplash implemented `getentropy` (through the "generic syscall" mechanism; it merely reads `/dev/{u}random` without needing a file descriptor) and then merged an `arc4random` implementation to go with it.

waddlesplash synchronized the DNS resolver up to NetBSD 9.3. Previously it was on an older version of the separately released "netresolv" code, but now it uses NetBSD's mainline source directly (with a handful of Haiku-specific patches.) This resolved some tickets related to DNS resolution.

### Drivers

korli added support for some newer hardware generations to the PCH "thermal" driver (used on Intel machines.)

### File systems

phcoder contributed a large number of fixes to the UFS2 filesystem driver, including to directory iteration, read support, implementing `access()`, and a lot more. The much improved driver has been added to the default builds, so Haiku can now read (but not yet write) UFS2 filesystems.

phcoder implemented the `truncate` operation in the `fs_shell`'s FUSE layer, making the `bfs_fuse` driver much more usable on Linux (and other OSes too.)

waddlesplash rewrote `ramfs`'s Query parser/evaluator. Previously, it used its own (much outdated) copy of the one from BFS; now it uses the "common" one (which was created during `packagefs` development, but until now had not been used by anything else but `packagefs` itself.) This resulted in a diff with a net deletion of over 1500 lines. He also adjusted `ramfs` to not show up in certain Tracker views (it was hidden from a few already, but still appeared in others.)

### libroot & kernel

waddlesplash implemented an "errata patch" for the recently-disclosed AMD "Zenbleed" vulnerability.

trungnt2910 fixed the "connected" status reporting of UNIX domain sockets so that operations like `getpeername` work correctly. waddlesplash fixed the UNIX domain socket `Close` routines as well as the read/write routines' checking of the shutdown status, and korli implemented `MSG_DONTWAIT` for them. trungnt2910 then implemented `SO_RCVBUF` for all kinds of UNIX sockets.

waddlesplash removed and refactored some functions in kernel utility headers introduced in the lead-up to the `event_queue` implementation which turned out to not be needed after all, and ported some assertions and fault-tolerance between `DoublyLinkedList` and `DoublyLinkedQueue`.

waddlesplash fixed some issues uncovered or introduced with the `event_queue`/`kqueue` changes the previous month, including incorrect locking around deselect operations in the kernel VFS layer, incorrect atomic flag modifications in the event-queue system itself, potential (or actual) use-afrer-frees in the older select code, and more.

waddlesplash adjusted the return values of `ConditionVariable::Notify{All}` and `ConditionVariableEntry::Wait` to guarantee that the number returned by `Notify` is the actual number of `ConditionVariableEntry::Wait`s that returned with the passed status. (This is needed to avoid races into deadlocks in the user-mutex system.)

waddlesplash patched libroot's default allocator to acquire and then release or reinitialize another lock after fork, to reduce deadlocks.

waddlesplash silenced a warning from the bootloader's ELF loader when encountering `PT_EH_FRAME`, which the new GCC inserts by default.

korli tweaked the Intel microcode loading logic to not load microcode when it's already up to date.

axeld added a missing routine (`user_memset`) to the `kernelland_emu` library, used for testing kernel components in userland.

jmairboeck added a missing newline to a print in the kernel debugger.

korli added a `sched_getcpu` routine to `libgnu`. This is a GNU extension, but can be used to get the ID of the CPU that a thread is currently running on (which can of course change at any time.) On newer x86_64 CPUs, it uses a CPU feature to read the ID in userland; on others, it uses a syscall for this purpose.

waddlesplash adjusted some feature-flags in headers to use the standard forms from `features.h`.

waddlesplash fixed the indentation of some `locale_t` functions, and then added an internal method to expose the "POSIX"/"C" locale directly. He then replaced a number of time-related C library methods with the implementations from `musl` (replacing FreeBSD, or in some cases much older, code.) He also synchronized a number of other files with FreeBSD, pulling in updates and bugfixes.

### Build system

madmax removed accidental trigraphs from various parts of the build. (These are character sequences in source code starting with an unescaped `?` used for encoding various characters. The fix is just to add a `\` in front of the `?`.)

nielx updated the repository of packages (from HaikuPorts) used in the building of Haiku images.

PulkoMandy removed `-Wno-error=deprecated` from the global compiler flags, as it's no longer needed. (Note that this is different from `-Wno-error=deprecated-declarations`, which we still need.) He also removed some usage of deprecated C++ features in a few files across different components.

tqh made some minor edits to the code here and there to silence some warnings.

waddlesplash fixed the type of `MAIL:draft` and `MAIL:flags` filesystem indexes in the default install, which fixes the "Open Drafts" option in Mail not working properly.

nielx fixed the build of the `DateFormatTest`.

### Documentation

nielx updated the developer (internals) documentation on generating the package repository used to build Haiku itself, and also that for upgrading the GCC buildtools.

### ARM & RISC-V

davidkaroly updated the "bootstrap" package versions (which refer to those in `HaikuPortsCross`) for `arm`, `arm64`, `riscv`, and even `x86_64`.

### HaikuPorts

waddlesplash implemented `GraphicsExpose` in `Xlibe`, which fixes all scrolling in FLTK applications (previously it would just hang the entire application forever.)

### Website

There are GSoC final reports out now, from [Zardshard](https://www.haiku-os.org/blog/zardshard/) on Icon-O-Matic, and [trungnt2910](https://www.haiku-os.org/blog/trungnt2910/) on porting .NET.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
