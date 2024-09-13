+++
type = "article"
title = "R1/beta5 – Release Notes"
tags = []
date = "2024-09-13 12:00:00Z"
+++

The fifth beta for Haiku R1 over a year and a half of hard work to improve Haiku's hardware support and its overall stability, and to make lots more software ports available for use. [Nearly 350 bugs and enhancement tickets](https://dev.haiku-os.org/query?milestone=R1%2Fbeta5&group=component&status=closed) have been resolved for this release.

Please keep in mind that Haiku is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are increasingly confident in its stability, we cannot provide assurances against data loss.

For all of this release cycle, waddlesplash was [employed as a contractor](https://www.haiku-os.org/news/2021-08-25_hiring_waddlesplash/) to work on Haiku. His contract is presently ongoing, supported by the generous donations of readers like you to Haiku, Inc., a 501(c)3 non-profit.

*To download Haiku or learn how to upgrade from R1/beta4, see "[Get Haiku!](/get-haiku/)". For press inquiries, see "[Press contact](#press-contact)".*

## System requirements

This release is available for x86 32-bit and 64-bit platforms.

{{< alert-info "BeOS R5 Compatibility" "Note that BeOS R5 compatibility is only provided on the 32-bit images." >}}

<table><tr><td>
<h4>MINIMUM (32-bit)</h4>
<ul>
<li><strong>Processor</strong>: Intel Pentium II; AMD Athlon</li>
<li><strong>Memory:</strong> 384MB</li>
<li><strong>Monitor:</strong> 800x600</li>
<li><strong>Storage:</strong> 3GB</li>
</ul>
</td><td>
<h4>RECOMMENDED (64-bit)</h4>
<ul>
<li><strong>Processor</strong>: Intel Core i3; AMD Phenom II</li>
<li><strong>Memory:</strong> 2GB</li>
<li><strong>Monitor:</strong> 1366x768</li>
<li><strong>Storage:</strong> 16GB</li>
</ul>
</td></tr></table>

<!--{{< alert-info "SSE2 support" "SSE2 support is required to use the WebPositive web browser. On machines where this is not available, it is recommended to install the NetSurf browser instead." >}}-->

## New features

### Simplified color selection &amp; "Dark mode"

<img src="/files/get-haiku/r1beta5/appearance-light.png" width="49%">
<img src="/files/get-haiku/r1beta5/appearance-dark.png" width="49%">

Instead of displaying all 30-odd color options in the Appearance preferences and making users edit all of them, by default only three are shown, and the rest are automatically computed whenever one of these three are changed. (The full set of colors can still be edited manually, for any users that want to do that.) This new automatic color selection mode is fully "dark mode"-aware; it will switch to using light text colors when users select dark panel background colors, and vice versa.

In addition, there were many fixes throughout the system and in built-in applications to handle user-selected colors and "dark mode" more correctly (especially as regards control gradients, as you can see here; though some of these are already not an issue if one uses the "Flat" decorator & control look from the "Haiku Extras" package). While there are still things to be fixed and work continues in the development branch, overall the situation is much better than before.

### Icon-O-Matic improvements

<img src="/files/blog/zardshard/icon_o_matic.png" width="50%">

Icon-O-Matic, the editor for Haiku's native icon format (HVIF), received a number of enhancements (largely thanks to a GSoC '23 student), in particular "reference images" (bitmap images that can be imported and used as a background in Icon-O-Matic, to trace vector paths on top of), perspective transformations (which are now also supported in HVIF itself), and significant improvements to copy and paste.

### PowerStatus improvements

<img src="/docs/userguide/en/images/powerstatus-images/applet.png" width="50%">

PowerStatus, the built-in desktop applet to show battery status and information, will now automatically be installed in the Deskbar on the first startup if it detects a battery (or batteries) on your system. It also received a number of fixes to handle battery state more correctly, and to issue sounds as well as popup notifications when the battery capacity is running low.

### Tracker improvements

<img src="/files/get-haiku/r1beta5/tracker.png" width="50%">

Tracker, Haiku's file manager, received a number of minor improvements. One particularly noticeable one is that it now has more sophisticated handling of read-only folders and volumes: they'll be displayed with a faded background (the same as was used for queries, virtual directories, and some other special views), and all menu actions that require writing will be disabled entirely, instead of remaining enabled but displaying errors whenever one attempted to use them.

### Support for USB audio devices

There is now basic support for input and output in USB audio devices. Not all devices are supported (in particular, the more advanced USB 2.0 audio devices are not), but many have been tested to work.

(However, as the system media services hadn't seen much use in hot-plugging devices or switching outputs before, you may need to restart them once or twice if you want to switch outputs while Haiku is running in order to get audio output to your USB devices to work. This is a known bug, and there's been some work already towards solving it for a future release.)

### TUN/TAP

There's now a TUN/TAP network driver, primarily useful for VPNs (or other tunneling tools). Some manual setup is required to setup a VPN and then configure the system to route traffic through it by default, but once configured, traffic should flow normally through the VPN instead of through the regular gateway. (Note that TAP mode has seen less testing than TUN mode, and should be considered more experimental.)

### TCP throughput improvements

A significant amount of time and attention was given to the TCP stack, resulting in a great number of fixes and enhancements to it. Overall, TCP performance on loopback (localhost) is now reliably in the double-digit Gbits/sec on modern hardware (previously it was much lower, often pitifully so: dozens of Mbits/sec at most.) TCP outside loopback connections is also massively improved, by much better ACK coalescing, sending proper SACK data, and finally a real window-scaling algorithm (though only for the receiving side of the connection at the moment.)

Outside of TCP itself, significant changes were made to the network stack to improve, among other things: statistics counting (as seen in `ifconfig` and elsewhere), reduce buffer copies, and allow buffer flags to be passed from the lowest levels of the stack to ones higher up. This last change means that drivers which support receive checksum offload for IP, TCP, and UDP (which includes most of the ported FreeBSD ethernet drivers, and now also the native `virtio` driver) can indicate as such, saving checksum computations for those protocols.

The final result is an order of magnitude (or more!) greater TCP performance on most real-world connections (an 8-10x improvement is not an atypical result), bringing Haiku much closer to other operating systems in overall network performance.

### Improvements to Terminal and the TTY/PTY layer

The native Terminal application has a number of improvements, including support for bracketed paste (used to handle pastes with line-breaks and other special characters into editors and shell prompts), a settings panel for configuring custom color schemes, and more.

The TTY/PTY layer (which powers Terminal, SSH, and many other tools) also saw a number of improvements, including a significant refactor to unify the formerly-separate TTY and PTY code, fixes to handle reads and writes of large amounts of data more correctly, and support for some TTY extensions commonly found on other operating systems (like `TIOCOUTQ`).

### General performance optimizations

A great many performance optimizations were done to the kernel and drivers, including batching many more I/O operations, avoiding unnecessary locks on application startup, improved pre-mapping of memory mapped files, reduced lock contention in page mapping, batched modification of the global memory areas table (and a different implementation of its underlying data structure), changes to keep page lists in-order to ease allocations, temporary buffer allocation performance improvements in hot I/O paths, support for `DT_GNU_HASH` in the ELF loader, and more.

The `user_mutex` system (a facility similar to Linux's `futex` system, but somewhat less generic in design), which powers Haiku's implementation of `pthread_mutex`, `pthread_rwlock`, and more, also saw a significant overhaul to its design and implementation to fix bugs and improve performance. The new design solves multiple correctness issues in the old design (unavoidable race conditions and the like), as well as being overall faster, especially for heavily-contended locks (thanks in large part to a different internal locking strategy and avoidance of "locked" physical memory for non-shared locks.)

The overall result is that compile performance is around 25% (or more, in many cases) faster than it was before. We are now less than twice as slow as Linux on at least some compile workloads (even on many-cored machines with `-j16`.)

### Rewritten FAT driver

The old FAT filesystem driver (which dated back to sample code Be, Inc. released as open-source before their demise) has been almost totally replaced with a port of FreeBSD's FAT driver. This resolves a number of long-standing compatibility and data handling problems that the old driver had, and makes Haiku more interoperable with other systems.

### UFS2 driver

Haiku now has read-only support for UFS2 ("Unix File System 2"), the default filesystem used in FreeBSD, thanks to a home-grown driver written by a GSoC student and improved upon by other contributors.

### `kqueue(2)`

Haiku now implements a subset of the BSD `kqueue` API, an event-queuing facility similar in purpose to Linux's `epoll`. It's much more efficient than POSIX `select` or `poll` at handling large numbers of wait objects (FDs, sockets, etc.), and as such is greatly preferred over them by applications and libraries with significant amounts of event-driven I/O, including libuv (node.js), libevent, WINE, and more.

### Enhanced `strace` and `profile`

Haiku's native `strace` (system call trace) and `profile` (CPU time profiler) have seen a number of improvements since the previous release. `strace` now supports printing flags, enums, and error codes by name, rather than just as hexadecimal values; and more parameters and return values are properly fetched. For example, before:
```
open(0x5, "plaintext", 0x2042, 0x0) = 0x8000000f () (49 us)
map_file("libicuuc.so.66 mmap area", 0x7f04c2675228, 0x6, 0x1ababd0, 0x1, 0x0, true, 0x3, 0x0) = 0x329a0 () (108 us)
```
and after:
```
open(0x5, "plaintext", O_RDWR|O_NOTRAVERSE|O_CLOEXEC, 0x0) = 0x8000000f Operation not allowed (57 us)
map_file("libicuuc.so.66 mmap area", [0x0], B_RANDOMIZED_ANY_ADDRESS, 0x1ababd0, B_READ_AREA, 0x0, true, 0x3, 0x0) = 0x73e8 ([0x6392223000]) (135 us)
```
It also now can print `iovec`s from calls to `readv`/`writev`, supports tracing the new event-queue-related syscalls powering `kqueue`, prints more information for signals, and more.

The native `profile` tool also received a number of enhancements, including accounting of profiler ticks vs. elapsed CPU time (to validate the profiler is working correctly, as well as indicate when interrupts or other things "steal" CPU time), better handling of userspace vs. kernel-space stack frames (and now supports profiling userspace only), as well as a lot of fixes, including to its Callgrind format output (for usage in KCachegrind or other visualizers.) It saw significant use in tracking down a number of the performance problems that are fixed or at least greatly improved in this release.

## Software ports

<img src="/files/get-haiku/r1beta5/ports.png">

The HaikuPorts project continues to maintain a wide variety of software ports to Haiku. There are simply too many new ports to list all of them here (including many new KDE apps and some more GTK applications), but here are a few of the more notable ones:

### GDB

Thanks to one of the GSoC 2024 students, Haiku now has a full-fledged port of GDB 15, including the command-line interface, the machine interface (for IDE integration), Python scripting, `gdbserver` (for remote debugging), and more. This replaces the old (and largely non-functional) port of GDB 6, and supplements Haiku's own native Debugger for developers who want a more familiar tool. (It has already seen use by other GSoC students this past summer, as well as by some contributors trying to debug builds of a work-in-progress Firefox port...)

### .NET (*experimental*)

There are now experimental ports of .NET Core 8 and 9 for Haiku. These are still "some assembly required" and may not quite work out-of-the-box, but they do exist (and some of the work has even been upstreamed into .NET Core itself.) There are also some experimental bindings for Haiku's native APIs (including the GUI APIs) to .NET...

### FLTK

<img src="/files/get-haiku/r1beta5/fltk.png" width="50%">

Thanks to Haiku's X11/Xlib compatibility library, there is now a working port of FLTK. (At present, there's no support for GLX, so only FLTK applications that don't need OpenGL will run.)

## Changes &amp; bug fixes

Hundreds of bugs and other minor issues were resolved since the previous release, and there are simply too many to try and list them all here. (The monthly [activity reports](/tags/activity-report) contain a much more complete accounting of the changes.) Practically every area of the system received some amount of attention, and the result is Haiku's most polished and stable release thus far (even more so than R1/beta4!), though some rough edges remain here and there.

### Improved POSIX compatibility

Haiku is always looking to see how we can improve our adherence to POSIX and make it easier for developers to port their software. There are too many changes in this area to individually list, but here are some highlights:

 * `getentropy` (POSIX.1-2024, and a longtime BSD extension)
 * `arc4random` (BSD extension)
 * `AF_UNIX` `SOCK_DGRAM` (UNIX datagram sockets)
 * `pthread_sigqueue` (GNU/BSD extension)
 * `preadv` & `pwritev` (extension)

### General stabilization work

A significant amount of time has been poured into work on stabilizing the whole system, with a great many kernel and driver crashes, hangs, corruptions, boot failures, and more tested, tracked down, and fixed over this release's development cycle. Overall, the system seems to be more stable than ever before.

## New contributors

Since the last release, there is 1 new Haiku developer with commit access: nephele, who has been working on Haiku's user interfaces, especially color customization and dark mode support. Welcome!

## Source code

The source code of Haiku itself can be accessed [from the GitHub mirror](https://github.com/haiku/haiku) or via [Haiku's own Git instance](https://git.haiku-os.org). Patches can be contributed [via Gerrit](https://review.haiku-os.org).

## Reporting issues

There are over 3,900 open tickets on Haiku's bug tracker and nearly 15,000 closed items.  If you find what you believe to be an issue, please search the bug tracker to see if it has already been reported, and if not, file a new ticket [on the bug tracker](https://dev.haiku-os.org/).

For information about major issues that have been fixed since the release, visit [the Release Addendum page](https://dev.haiku-os.org/wiki/R1/Beta5/ReleaseAddendum).

For more help, take the 'Quick Tour' and read the 'User Guide', both linked on the Haiku desktop. WebPositive opens by default with our 'Welcome' page which provides useful information and many helpful links, as does the Haiku Project's website.

For support and/or help with anything related to Haiku, feel free to post [on our forums](https://discuss.haiku-os.org), join one of our [IRC/Matrix/XMPP rooms](https://www.haiku-os.org/community/irc/), or send a message to one of our [mailing lists](https://www.haiku-os.org/community/ml) so our friendly community may assist you.

## Press contact

Press contact

Press inquiries may be directed to:

 * waddlesplash (English)
 * pulkomandy (French)
 * humdingerb (German)

All three contacts may be reached via `<nickname>`@gmail.
