+++
type = "blog"
title = "Haiku Activity & Contract Report, July 2023"
author = "waddlesplash"
date = "2023-08-15 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev57127 through hrev57183.

<!--more-->

### `kqueue`!

For a long time now, Haiku has needed a successor API to `select`/`poll` (and our own homegrown `wait_for_objects`, which functions a lot like these but supports more object types than just FDs.) Both `select` and `poll` just take a list of FDs and return which of these have events pending (potentially blocking if none have any.) This is very inefficient when thousands of FDs/sockets are involved, as they must be "selected" and then "deselected" with every syscall, which can become quite slow. (WINE on Haiku has a noticeable CPU usage overhead because of this.)

It turned out there was more than merely a performance need for such an API, however, as .NET expects for an event-queueing API with "edge triggered" event support. Essentially, this means that when data is available for reading on a socket, an event is triggered once, and then not triggered again until more data is made available for reading (compared with "level triggered" events, which will report that data is readable every time an application queries what events are pending so long as there really is data for reading, and not only just after it was made available.)

Many years ago, hamishm wrote a partial implementation of such an API, but it was not very well tested, and also Haiku-specific. Last month, waddlesplash dusted off the old patches, reworked them around the kernel refactors that have occurred since then, cleaned them up, and implememented the BSD `kqueue()` API on top of them. This then required multiple rounds of testing (mostly against the testsuite of `libuv`, the event-handling backend for `node.js` and other projects) and rewrites, until the final result was sufficiently robust to be merged (and the implementation, by that point, differed greatly from hamishm's original patches.)

The new API provides only a subset of BSD `kqueue`: it only supports `EVFILT_READ`, `EVFILT_WRITE`, and `EVFILT_PROC`. There are some other limitations, too (for example, the amount of data readable or writable is not generally returned in the `data` field.) However, it is already sufficient for `libuv`, `.NET`, `WINE`, and a number of other projects that use like APIs.

(This also crossed off a few items that had been on waddlesplash's personal to-do list for multiple years, and had been requested by kallisti5 and others working on porting Rust applications.)

### Applications

humdinger fixed the window title of the Mail preferences window, and also a copy/paste error in the "Move target" settings implementation. He then adjusted the main Mail app to support files being dropped anywhere in a message composition window to be added as attachments, not just on the composition area, and reworked some rough edges of attachment handling.

jicese fixed a bug in Tracker that could lead to background images not being updated when switching directories.

Zardshard, a current GSoC student, made a number of modifications to Icon-O-Matic: removing the old home-grown translation system (long since deprecated in favor of Haiku's Locale Kit), generalized some classes (allowing for a sizeable chunk of code to be removed; this initially caused some regressions, but Zardshard fixed those in short order),

jmairboeck contributed a change to Icon-O-Matic to use `BStringFormat` in UI message formatting, so that proper plural forms can be localized correctly across languages. humdinger adjusted a number of UI strings for clarity, terminology, etc.

korli implemented underline colors and styles in Terminal, allowing for (e.g.) spellcheck in Vim to be rendered properly.

PulkoMandy changed Screen preferences to use a "matrix" menu layout for choosing screen resolution, instead of a "list" format.

humdinger changed everywhere that used an "x" character meaning "multiplication" to instead use a Unicode "×" (multiplication sign). The difference may be subtle, but it does mark an improvement nonetheless.

### Command line tools

PulkoMandy fixed an old bug in `xres` that prevented extracting resources due to a typo.

### Kits

X512 contributed a fix for a float-conversion deprecation warning in an Interface Kit header, and waddlesplash provided some follow-up fixes to other source files.

### Drivers

PulkoMandy fixed the TTY layer to notify `READABLE` as well as `WRITEABLE` (for select/poll) when the other end of a TTY is closed, fixing a hang in some applications.

mywave82 (a new contributor!) adjusted the USB ACM serial implementation to take the maximum packet size reported by the device into account, fixing incorrect behavior with some such devices.

PulkoMandy rewrote userlandfs' `FSCapabilities` class to use `std::bitset` instead of a custom bit-set implementation, resolving some warnings.

waddlesplash fixed a number of regressions in the (relatively new) PTY implementation, as compared to the old one, including stale child processes not exiting, state not being reset on the last close, and more.

phcoder contributed a driver (partially following one from FreeBSD) for Elantech I2C devices, which do not follow the common "HID" specification.

PulkoMandy fixed a synchronization problem in the USB RNDIS driver, which had caused problems if multiple sockets tried to use the driver at once.

X512 fixed a number of logic problems in the MMIO-based VirtIO bus driver, and (after adding some more utility functions) adjusted it to make use of the kernel's `Bitmap` class.

X512 adjusted the USB3 (XHCI) bus driver to report USB3-specific port statuses to userland.

### File systems

waddlesplash fixed handling of "junctions" in the NTFS driver, which previously appeared as broken symlinks (they will now appear as functioning symlinks.)

### libroot & kernel

trungnt2910 made `socketpair()` work for non-`STREAM` sockets, meaning that UNIX domain sockets can now be created this way.

trungnt2910 implemented `SOCK_DGRAM` (datagram) for `AF_UNIX` ("UNIX domain" sockets.) This will be used by a number of ported applications, including GTKWebKit, .NET, and more. Testcases for the new socket type were contributed at the same time.

waddlesplash fixed some race conditions leading to application deadlocks in the user_mutex "semaphores" code (and one rare case in the locking code.) This involved making some adjustments to the kernel condition variables code once more, this time to return the count of threads that were notified, in order for the waking thread to reset state if no threads were woken up. (These problems were discovered while working on Haiku's port of `libuv`, during development of the event-queue system.)

waddlesplash imported changes to the `fts` implementation in `libbsd` from upstream FreeBSD.

### Build system

PulkoMandy adjusted `liblinprog` to make sure its symbols are exposed through `libalm` (the Auckland Layout library), as the `alm` APIs expect the `linprog` APIs are available for applications to use.

trungnt2910 adjusted a number of C/C++ headers to be more friendly for API binding generators to parse, including adding names for enums, using `const` instead of `#define`, privatizing hidden constructors, etc.

waddlesplash moved some source files copied between different input drivers to a common folder and deleted the duplicates.

kallisti5 removed usage of the glibc-specific `%L` format specifier in favor of the standard `%ll`.

nielx continued work towards GCC 13, fixing or working around various warnings (and PulkoMandy fixed a number of general warnings already present.)

### Documentation

PulkoMandy adjusted a `poll()` test to check signal delivery vs. poll wakeups.

nephele contributed documentation for the BRoster launch flags (e.g. `B_SINGLE_LAUNCH`, `B_EXCLUSIVE_LAUNCH`, etc.) to the Haiku Book.

### ARM & RISC-V

X512 implemented "global page mapping" for RISC-V.

### Website

There are GSoC reports from last month, from [Zardshard](https://www.haiku-os.org/blog/zardshard/) on Icon-O-Matic, [trungnt2910](https://www.haiku-os.org/blog/trungnt2910/) on porting .NET, and [pairisto](https://www.haiku-os.org/blog/pairisto/) on VPN support.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
