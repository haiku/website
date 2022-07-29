+++
type = "blog"
title = "Haiku Activity & Contract Report, June 2022: 802.11ac WiFi"
author = "waddlesplash"
date = "2022-07-09 15:30:00-04:00"
tags = ["contractor"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report. Since there is just so much to report this month, instead of the usual chronological order by section, instead things will be loosely sorted by "size".

This report covers hrev56148 to hrev56235.

<!--more-->

### 802.11ac WiFi support

The biggest item this month is of course that waddlesplash finally got the OpenBSD WiFi stack and drivers he was working on over the past few months to at least connect to networks, and so it was merged into the master branch last month. This adds 802.11n and 802.11ac support to the `idualwifi7260` (also known as `iwm` on FreeBSD and OpenBSD) driver, and imports the `iaxwifi200` (also known as `iwx` on OpenBSD) driver, which supports most "Intel AX" WiFi devices found in newer hardware.

There were of course a number of regressions or new bugs introduced by the new driver port, and tracking those down occupied a lot of the rest of the month, but most of those are now resolved with only a few ones remaining (mostly relating to connecting to networks; once established, connections seem to now be much more stable and reliable than with the previous drivers.) extrowerk confirmed that the 802.11ac support is working as expected: he got over 120 Mbit/s in a real-world speedtest while connected with the new driver.

This actually means that Haiku is, to the best of our knowledge, only the third open-source OS to support 802.11ac WiFi, after Linux and of course OpenBSD which did most of the hard work we are reusing here. (Not even FreeBSD, which began work on 802.11ac WiFi years ago, has any drivers in its tree or even passably usable which actually support it.)

### Drivers

The network MTU fixes last month exposed another problem: when using the larger buffers needed to support jumbo frames, some FreeBSD ethernet drivers try to allocate memory with very specific restrictions, often needing bounce buffers, for use in device operations. The compatibility layer did not support this, so the DMA mapping APIs needed a sizeable set of changes to support it. This required multiple rounds of testing to work out all the bugs, but those now having been worked out, the drivers are back to functioning as before (and in fact it is possible some older issues that were caused by this missing functionality have been fixed as well.)

korli imported a fix from OpenBSD to the `atheros813x` driver (and waddlesplash submitted it onward to FreeBSD.)

korli improved Broadwell devices support in the `intel_extreme` graphics driver.

waddlesplash fixed timeout handling in the FreeBSD compatibility layer for "callouts." Previously, timeouts would be triggered even if they were supposed to be cancelled or not scheduled at all; now this case is handled correctly.

waddlesplash adjusted "too large packet" handling in the `read` routine of the FreeBSD compatibility layer to print an error instead of silently failing and blocking all future I/O. He also disabled some needless logging prints.

waddlesplash fixed some graphics drivers to specify the correct memory protection flags following last month's changes to require them.

waddlesplash added the WiFi MTU to the list of MTUs automatically attempted by the FreeBSD compatibility layer.

PulkoMandy fixed handling of multiple packets being sent in one USB frame in the RNDIS network driver.

waddlesplash reworked handling of the `SIOCGIFMEDIA` ioctl to behave identically on FreeBSD and non-FreeBSD drivers, and simplified its usages in userland.

waddlesplash fixed the FreeBSD compatibility layer to handle 64-bit physical/hardware addresses on 32-bit correctly. There was partial support for this, but it was incomplete and likely contributed to some of the problems seen on 32-bit systems.

waddlesplash fixed the EHCI (USB2) driver to check for errors in memory access handling in more situations.

kallisti5 deleted some dead/unused code from the radeon_hd driver.

PulkoMandy fixed key repeat settings handling in the PS/2 driver under some circumstances where it might get lost.

waddlesplash rewrote the taskqueues implementation in the FreeBSD compatibility layer to reuse much more code from FreeBSD. He then reworked the `HAIKU_DRIVER_REQUIREMENTS` specified in drivers to accurately indicate what drivers require what taskqueues.

korli added support for drives larger than 2TiB to the `usb_disk` driver. He also adjusted some parts of the kernel to better support this.

waddlesplash added default maximum packet size handling to the USB stack for SuperSpeed (USB 3) endpoints. This might fix connecting or using some less-well-behaved devices.

waddlesplash added the needed functions to the FreeBSD compatibility layer and then imported the USB modules to the `ralinkwifi` driver. Unfortunately these may not be working just yet, or at least only on certain devices.

### Applications

apl adjusted HaikuDepot to not increment the "view counters" of packages immediately but only after a delay, solving some performance issues.

Jim906 fixed search criteria not being restored when editing queries in Tracker.

waddlesplash added support for displaying the WiFi media type to `ifconfig` and Network preferences; now you can easily tell what 802.11 mode you are connected with.

jsteinaker changed NetworkStatus to detect when network interfaces were removed.

konrad1977 cleaned up dead code from BeOS and Dan0 in the DiskProbe sources.

Jim906 fixed the initial focus in StyledEdit not being given to the main text view.

korli stopped Tracker from trying to fix file permissions on read-only volumes.

### File systems

Mashijams implemented the basics of the "version 5" superblock in the XFS driver.

korli changed the EXT2/3/4 driver to check when the filesystem has errors or is not "clean" and only allow mounting it read-only in those situations.

korli fixed the BFS driver to support initializing large partitions with smaller block sizes. (Large block sizes with large drives already worked.)

korli fixed a SMAP violation in the BTRFS driver related to inline data.

### Command line tools

waddlesplash added tracing of `msghdr` structures to `strace`.

jessicah added support for specifying custom sysroots when building the cross-compilation tools (for targeting Haiku on other operating systems.)

### Bootloader

jessicah fixed handling of (absent) serial devices in the EFI loader, fixing booting on a number of devices.

waddlesplash dropped all the ARM support from the U-Boot "native" loader. These days we always use U-Boot in EFI mode, which actually supports more than the "native" U-Boot APIs do, so this code is no longer needed. The PowerPC support for native U-Boot booting remains as it may have some uses still.

### libroot & kernel

waddlesplash reworked iovec copying from userland to the kernel, adding more validation checks to protect against malicious applications or incorrectly sized buffers.

waddlesplash added overflow checking to the kernel `calloc` implementation.

jessicah added `catopen`/`catgets`/`catclose` stubs to the libroot locale implementation.

waddlesplash removed synchronous I/O request handling from `devfs`, as the kernel VFS layer already has a fallback to handle this, and the implementation in `devfs` might have been the cause of some stack overflow panics on certain systems.

waddlesplash replaced some parts of libroot with equivalents from musl: `ffs`, `getsubopt`, `ftw`, `nftw`; and then moved some non-standard BSD extensions to `libbsd`. He also reworked and removed some obsolete headers.

PulkoMandy created a larger version of the kernel debugger font for HiDPI displays, and replaced the one we were using for that purpose with it. He also wrote some scripts to convert the fonts to or from PNG files so they can be easily edited.

X512 adjusted where some internal variables are set during early libroot initialization so that `pthread_self()` and some other functions return proper values while static initializers are being called before `main` is.

korli fixed the kernel device manager to not insert nodes before other nodes of the same priority. This fixes the ordering of disk drives in `/dev` among other things.

korli adjusted the VFS layer to properly traverse paths on `lstat` with trailing slashes.

korli adjusted the runtime_loader to be more lenient with some `STT` types as other OSes do.

trungnt2910 implemented `dl_iterate_phdr`, a BSD extension that allows for iterating through the program headers of the currently-loaded ELF binaries. This will be used for porting `libunwind`, among other things.

### RISC-V!

X512 submitted a change to support building the FreeBSD-ported drivers on RISC-V.

X512's change to support breakpoint interrupts on RISC-V was also merged.

### That's all, folks!

As you can see, last month was pretty busy; and already this month is shaping up to be quite busy, too. Now that the WiFi work is winding down, I've only got a few things left on my TODO list before we kick off work on the next beta release, which is already shaping up to be the best one yet.

Thanks once again to all the donors who make my contract possible!
