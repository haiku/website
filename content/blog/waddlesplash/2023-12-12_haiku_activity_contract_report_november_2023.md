+++
type = "blog"
title = "Haiku Activity & Contract Report, November 2023 (ft. VPN support)"
author = "waddlesplash"
date = "2023-12-12 22:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57364 through hrev57428.

<!--more-->

### TUN support, for VPNs

Last month's highlight is probably the addition of a TUN/TAP driver, which is now included on nightly builds. TUN mode definitely works, while TAP mode has not been tested as much.

The TUN/TAP driver was initially written by Swangeon as part of GSoC 2023. It wasn't in a fully working state, however, and had a number of issues still remaining when it was initially merged. waddlesplash picked up the work and performed multiple refactors on it, merging a multiple-driver setup into a single network module that also publishes character devices in devfs, overhauling the buffer queuing logic, fixing and completing the TUN portions of the driver (and making necessary modifications to other parts of the network stack), and performing general cleanups.

The driver has been tested with OpenVPN, but other TUN-based VPNs should work also. Some manual configuration is required (as OpenVPN does not yet know how to manage network routes on Haiku.) Here's a template set of commands for setting it up:

```sh
## starting a VPN:
# create interface
ifconfig tun/0 up
# start VPN and connect (config file should mention tun/0)
openvpn --config <CONFIG FILE>

## then:
# add static route for VPN traffic (needs to go over existing connection)
route add /dev/net/<NIC>/0 <VPN SERVER IP> gw <CURRENT GATEWAY IP>
# delete the existing default gateway
route del /dev/net/<NIC>/0 default gw <CURRENT GATEWAY IP>
# add the VPN gateway as default; all traffic should now go over VPN
route add tun/0 inet default gw <VPN GATEWAY IP>
```

### Applications

axeld refactored DiskProbe's Find window to use layouts.

humdinger added an "Open with..." menu to ShowImage, allowing one to open the current image in another supported application without having to switch to Tracker. In addition, he fixed saving images (which was broken on 64-bit.) He also fixed an off-by-one error in image placement, and rearranged some menus for consistency.

humdinger fixed Tracker to display half-star ratings on files instead of rounding to the nearest whole star. He also added "Reset rating" menu actions to MediaPlayer and ShowImage, to allow file ratings to be easily reset.

apl made some performance improvements to HaikuDepot's loading procedure, including to defer loading sizes or skip it all together when unnecessary, using buffered reads and reusing text buffers during JSON parsing, and more. He also started a refactor of the data-model generation code, writing a new parser generation script and adjusting the generated code for performance, among other changes.

humdinger fixed Mail's "Save address" command to automatically open "People" with the email and name fields already populated if no contact file yet exists for that email address. (This involved adjusting "People" to accept such initial values.)

davidkaroly introduced target-endianness handling into Debugger's debug-info handling, potentially allowing debug information from architectures with endiannesses differing from the host's to still be loaded and analyzed. He also introduced routines for reading integers in DWARF of arbitrary size (as some are e.g. 3 bytes, not just 1, 2, 4, or 8.) He also implemented parsing of DWARF5's indirect string and address forms.

humdinger reworked OverlayImage to use BAboutWindow, fixing some layout problems.

jscipione made tooltips be set on truncated window items in Deskbar, so that the full window title can still be seen if desired.

jscipione fixed the enabled/disabled status of right-click actions in Tracker in queries (where results will be in different folders with differing permissions.) He also performed some refactoring, combining some duplicate checks, fixed some other regressions around read/write mode and crashes relating to editing filenames, and made the column titles in queries consistent with the rest of the interface.

jscipione fixed keyboard tracking on pressing the "Up" arrow key in menus. (This means items selected upon pressing the "up" arrow key can now be activated with the keyboard, not merely ones selected upon pressing the "Down" arrow key.)

waddlesplash fixed saving of thumbnail creation times in filesystem attributes in Tracker, fixing their display in the "Get info" window as well as resolving some other bugs around too frequent or too infrequent regeneration of thumbnails.

jscipione removed the display of "Inaccessible memory" from AboutSystem. This just wound up confusing too many users as similar metrics aren't displayed on other OSes. (The number can still be seen in the relevant command line tools.) He also consolidated some of the information displays at the same time.

### Command line tools

mmu_man added help text to the `safemode` command line tool (used to detect the value of kernel safemode options.)

### Kits

korli fixed a bad memory leak in the FFmpeg media plugin that was leaking memory when decoding audio frames.

PulkoMandy fixed merging of text spans in HaikuDepot's TextView class (a replacement for the older `BTextView` in the Interface Kit.)

jscipione made the text box values be right-aligned in `BColorControl`.

X512 fixed a swapped-parameters problem in `BSocket::Bind`.

### Drivers

X512 fixed setting area names for `/dev/poke`'s `POKE_MAP_MEMORY` command, fixing a regression introduced back when the driver was fixed for SMAP.

waddlesplash (in a series of commits scattered across the month) refactored the handling of the `flags` parameter of `send`/`sendmsg` and `recv`/`recvmsg` inside the network stack. Initially, this was done to fix test failures and hangs in some programs using UNIX domain sockets which passed flags that altered behavior (like `MSG_PEEK`) but which were not actually handled by the UNIX domain sockets implementation; the initial change just made `EOPNOTSUPP` be returned when unhandled flags were specified. This, however, wound up uncovering that some applications (including `curl`) had been passing some (relatively unimportant) unsupported flags, leading to some of those being first implemented in the UNIX domain sockets module, but eventually led to refactoring in the main network sockets module and a variety of flags logic being consolidated there rather than implemented uniquely by every socket module (TCP, UDP, etc.) A number of minor bugs in the implementation of such flags were corrected along the way, along with various code cleanups done to the socket module and others (old FIFO templates code, etc.)

PulkoMandy reduced the timeout for PS/2 mouse resets. As the keyboard is initialized after the mouse, this can (in some cases) speed up keyboard initialization.

waddlesplash fixed updating of network statistics for both ethernet and loopback drivers. On ethernet, it was not thread-safe, and on loopback, statistics were not updated at all (so now the loopback interface will actually display something other than zero for sent bytes and packets.)

waddlesplash fixed compiling some private headers in the FreeBSD compatibility layer in C89 mode. (While the kernel is always built with the newer GCC and thus C11 mode, some applications like `wpa_supplicant` include these headers and may still be compiled in C89 mode.)

### File systems

korli implemented the necessary hook in the ext2/3/4 driver for `fcntl(F_SETFL)` to work there.

waddlesplash adjusted the ext2/3/4 driver to display a name besides merely "ext2" (which is confusing as the driver supports ext3 and ext4 features.) PulkoMandy later updated the name again. It will now be displayed as "ext4" or "Linux Extended File System 2/3/4" (depending on whether the short or the long name is used.)

kallisti5 added some default initializers and added a missing check in BFS, following on suggestions from Clang's static analyzer.

### libroot & kernel

korli fixed a regression in the bootloader following the TSC refactoring from the previous month.

korli adjusted the context-switch logic on x86_64 to always load the default values into FPU and SSE control registers. This actually saves two instructions compared to the old code, and fixes some kernel panics caused when applications (or drivers) set certain CPU flags.

waddlesplash imported `stpncpy` from musl (a POSIX function we were missing.)

waddlesplash allowed negative values to be passed to `release_sem_etc` when the `B_RELEASE_ALL` flag was set. Such values will be used as the argument to `thread_unblock`, meaning the awoken thread will receive an error code instead of `B_OK` on wakeup. (This was used in the refactored TUN/TAP driver, which needs to wake up threads waiting on `net_fifo`s without having them actually receive any buffers.)

### Build system

A patch by KapiX to add support for checkouts created with `git worktree` was merged. (The build system needs to track the timestamp of a few files in the `.git` dir, which has to be found differently when `git worktree` is in use.)

humdinger added the Genio IDE (a native IDE for Haiku)'s `.genio` directory to the `.gitignore`.

waddlesplash deleted an old file in the root of the repository containing configuration for a code scanning service that no longer exists.

### Documentation

mmu_man added mentions of the need for `python3` and `zstd` in `ReadMe.Compiling.md`.

### ARM & RISC-V

kallisti5 reduced the page table tracing in the RISC-V EFI bootloader. He also added a missing page table type.

### HaikuPorts

The problems in QtWebEngine (Chromium) causing crashes on YouTube and many other sites were fixed by korli. We are still running on a Qt 5.x version of QtWebEngine (so, a Chromium version well behind the current, though with whatever security patches the Qt developers backported), but "Falkon" is a much more usable web browser now (perhaps better than GNOME Web in some respects.)

The node.js port was bumped to the latest LTS version (and npm along with it.)

waddlesplash pushed a new version of Xlibe, this time fixing a few problems with custom cursors (following a note on the forum about Drawterm, the Plan 9 remoting client, being affected by them.)

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!

Following the discussion on the forum after last activity report (and some others elsewhere), I've made a few adjustments to my TODO list as well as the R1/beta5 milestone. Development continues...
