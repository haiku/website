+++
type = "blog"
title = "Haiku Activity & Contract Report, May 2023"
author = "waddlesplash"
date = "2023-06-09 23:20:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56962 through hrev57061. It was quite a busy month!

<!--more-->

### Applications

jscipione fixed Deskbar's window size limits in horizontal mode, and cleaned up some parts of its source code.

jscipione reworked Tracker's handling of read-only folders and volumes. Now, instead of triggering errors, menu actions related to editing will simply be disabled outright. In addition, the faded gray background (which was already used for queries, virtual directories, and some other special views) will also be used in any read-only folder or volume. He also cleaned up and refactored some of the code for clarity and consistency.

PulkoMandy added a "don't ask again" checkbox to Debugger's "install debug info?" alerts. This resolves a long-standing annoyance when trying to debug applications that have lots of libraries loaded.

Zardshard documented some of the classes associated with saving and importing/exporting files in Icon-O-Matic, cleaned up the code a bit, and fixed some memory leaks. He also fixed an assert and some memory leaks in Tracker which could be triggered in Icon-O-Matic.

kallisti5 added a special icon for "patch" files, to distinguish them from other kinds of text files. (It has already been made the default icon for the file type.)

humdinger improved some strings in Tracker and fixed sentence casing in the Touchpad preferences.

jscipione made Deskbar use vector icons for the small "window" icons that appear in expand-out menus. He also increased the size of icons used in the "Twitcher" (Cmd+Tab application switcher.)

waddlesplash changed PoorMan to default to the UTF-8 character set in HTTP header sending, instead of the less-useful Latin-1.

### Command line tools

korli fixed `ifconfig` to check that address families are actually available before trying to make use of them.

Zardshard added a small Python script capable of decoding HVIF's compact float format, for debugging/inspection purposes.

waddlesplash made some improvements to `listusb`: he moved CDC-related logic to its own file, fixed verbose class/subclass/protocol printing, and added a pretty-printer for SuperSpeed (USB3) "endpoint companion" descriptors.

korli added network-related definitions to `strace`, making socket syscalls much easier to understand in its output.

Zardshard fixed the `leak_analyser` script to not use `egrep`, which was deprecated, but `grep -E` instead.

trungnt2910 added detailed signal printing to `strace`. Previously, just the signal's name was printed, but now most of the other information sent along with a signal will also be displayed, too.

### Kits

Freaxed contributed a fix to `BOutlineListView`'s expand-collapse logic, which was causing inconsistent updates to selections when collapsing items.

jscipione made changes to allow for keyboard navigation on selectable but read-only (non-editable) text views and controls.

waddlesplash fixed the implementation of `BSerialPort::WaitForInput`. It seems to have been implemented in the very early days of Haiku, when all the Kits were developed on BeOS, because it used a BeOS extension `ioctl` which Haiku never supported. Now, it uses Haiku's `wait_for_objects`, and was confirmed to work correctly by the person who opened the original ticket about the problem.

waddlesplash removed some unimplemented BeOS extensions from the `termios` header.

PulkoMandy added a `BIconUtils::GetSystemIcon` method. This is currently used for fetching only a few icons, such as the ones used in standard "alert" boxes, but it may be extended in the future to support more. A few places throughout the tree that did this manually were adapted to use this new method directly. He also added the source of a few icons to the `artwork` directory.

X512 fixed the Japanese keymap to not specify the "Alt Gr" key (which JP keyboards do not use.)

PulkoMandy removed support for older OpenSSL versions in the Network Kit (which we don't use anymore) and began preparations for a switch to OpenSSL 3.

waddlesplash fixed a long-standing bug in `BScrollView` in which only the minimum size in one dimension of each scrollbar was taken into account, and not both of them. This allowed for the removal of some workarounds in FileTypes and other applications, and closed some pretty old tickets.

### Servers

madmax adjusted the view-drawing logic in app_server to properly handle invalid (empty) rectangles being passed to the `ClipToRect` function. He also changed the painting logic to consider gradients as having a "solid" pattern (no matter what pattern is actually set for drawing on the view.)

### Drivers

waddlesplash replaced the "TTY" driver with a "PTY" driver. Previously, Haiku's kernel had 2 different TTY management systems: one within the TTY "driver" (really for PTYs, used for all Terminal sessions, etc.) and one within a "module" (used by USB serial and all other external serial adapter drivers.) The "module" version was originally derived from the "driver" version, but had diverged from it, and lacked some important features. Now the old "driver" is gone (so we now have only one TTY implementation), a "PTY" driver that uses the "module" in its place, and the remaining missing features added to the "module".

trungnt2910 added support for some TTY extensions commonly supported by other operating systems, such as `TIOCM_RNG`, `TIOCOUTQ`, and "exclusive" mode.

korli disabled or turned down the default tracing levels in some of the IPv6 modules. He then fixed framing/deframing logic for the loopback interface and fixed/enabled packet capture for loopback.

waddlesplash added a missing `NULL` check to the FreeBSD compatibility layer's USB device handling, fixing boot on some systems.

waddlesplash made the USB stack fetch a device's default language before fetching any string descriptors from it. This fixes hangs on some hardware and virtual machines when running `listusb -v`, and other commands besids.

Swangeon cleaned up and fixed the MTU and other flags and values in the (not yet finished) TUN driver.

PulkoMandy & waddlesplash fixed handling of addresses without specified lengths in the "ECAM" PCI driver (added as part of the PCI refactoring, and first used for RISC-V, but it also has potential usage on ACPI on standard x86 machines.) waddlesplash then refactored the x86 PCI driver to make use of large parts of the "ECAM" driver, and got rid of a lot of PCI-specific ACPI handling code and just used the standard ACPI module instead. This makes it potentially possible to perform resource allocation under ACPI systems for PCI, which is needed for some I2C devices on recent hardware, among others.

waddlesplash added handling of an unlikely corner case (which is noted in the specification) to the XHCI (USB3) driver's handling of transfer cancellation.

waddlesplash reworked handling of "HALT" state recovery in the USB disk driver. This fixes strange errors or spurious disconnects/unmounts that used to sometimes happen, or at least manages to automatically recover from the problems without much disruption to operations.

korli adjusted the USB stack to perform an "explore" when a new bus driver is started (and waddlesplash provided some follow-up refactors and fixes to this logic later on.) This means that all the attached USB devices are enumerated immediately after the USB controller is initialized, rather than waiting for a separate exploration to take place asynchronously. This fixes some race conditions and boot failures caused by devices being scanned too late. He also adjusted some of the functions responsible for "publishing" devices to the rest of the kernel to not use too much stack.

waddlesplash reworked the USB stack to accept `phys_addr_t` buffers for bulk transfers. This required refactoring all 4 USB controller drivers, as well as a number of parts of the stack itself, and the introduction of a facility for copying such buffers to and from USB buffers.

waddlesplash reworked the USB disk driver to use the "new"-style driver API, which provides a facility for having "IO" operations submitted directly and managed by the driver instead of upper layers of the stack. He then reworked the driver to take advantage of that feature, using the common facilities for managing I/O requests and splitting up transfers that are too large or which require "partial" reads/writes, allowing a bunch of logic specific to the USB disk driver to be deleted in exchange for the common logic. He also granularized the locking used in the driver, reducing userland stalls when accessing data on such a device. These changes make the driver more reliable on less performant or less conformant USB disk devices, including all USB flash disks, and have been found to have fixed a number of issues already.

### File systems

Mashijams improved some perfomance problems related to extended attributes in the XFS driver, and also fixed the return value of a directory-cookie function and removed some unneeded macros.

### libroot & kernel

mt fixed a corner-case memory leak in the driver settings parser.

trungnt2910 added a header definition for `pthread_attr_get_np`, a non-POSIX extension which Haiku has implemented but never formally exposed for some time.

kallisti5 increased the maximum GCC version Haiku headers can be built with up to 13, after some testing.

trungnt2910 fixed `area_for` not working properly for user areas mapped with `PROT_NONE` (neither read nor write protections). Such areas are used by applications and frameworks by later changing their protections with `mprotect`. Previously, implementation of `area_for` had mistaken these for kernel areas and thus not returned them; now it distinguishes them correctly and behaves as expected.

trungnt2910 adjusted the `mmap` implementation to record the correct flags for the maximum permissions allowed on areas. For example, if a file is opened read-write, but the area is `mmap`'ed read-only, it should be possible to later change the protections to read-write. This is now possible after this change.

X512 removed `arch_check_syscall_restart`, which was not actually used nor implemented anywhere (and thus apparently not needed.)

trungnt2910 added some more attributes to the retrievable "team" information: the real UID/GID, session ID, start time, and more. These values are commonly retrievable on other POSIX-compliant OSes, and are expected to be present by some frameworks.

korli fixed a number of issues in a series of commits to the kernel FIFO, select, and network subsystems, fixing some regressions with pipes in shells, a bunch of tests found in the `libuv` test suite, and at least one KDL.

trungnt2910 made `cut_area` (used when `mmap`'ing inside/overtop an existing mapping) properly respect whether areas were overcommitting or not.

### Build system

PulkoMandy removed some unneeded or redundant dependency declarations from the `haiku` package information.

### Documentation

jscipione updated the API documentation for `BVolume::SetName`.

### ARM & RISC-V

davidkaroly fixed the `uname` value that is used on ARM (and removed some unused architectures and header files, as well.) He also renamed some functions used for manipulating system control registers, did some work on "access" flag handling and other paging-related matters in the VM implementation, removed some unused functions, refactored TLS initialization, and more.

X512 implemented memory barriers for RISC-V, and fixed the Makefile-Engine for it.

### Website

A number of GSoC '23 students have posted reports recently: there are ones from [Zardshard](https://www.haiku-os.org/blog/zardshard/) on Icon-O-Matic, [trungnt2910](https://www.haiku-os.org/blog/trungnt2910/) on porting .NET, and [pairisto](https://www.haiku-os.org/blog/pairisto/) on VPN support.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
