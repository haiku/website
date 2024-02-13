+++
type = "blog"
title = "Haiku Activity & Contract Report, January 2024 (ft. USB audio)"
author = "waddlesplash"
date = "2024-02-13 4:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57494 through hrev57560.

<!--more-->

### USB audio

The most notable set of changes last month was a series of fixes to the XHCI (USB3) driver and then the USB audio driver itself, culminating in the USB audio driver being turned on by default for nightly builds!

A few weeks back, X512 noticed an oversight in the XHCI driver's handling of "isochronous" transfers (which pretty much only USB media devices like audio or webcams use.) I refactored the relevant portions of the driver to correct the oversight, as well as making a tweak to how the USB audio driver schedules transfers to be more in line with what other OSes do, after which the USB audio driver started working pretty much immediately. (It had originally been written back in the days of USB 1.0 controllers and worked to some degree then, and in the years since was repeatedly patched to keep it in line with current kernel APIs and to fix bugs, crashes, etc.; without that maintenance, it likely wouldn't have worked so smoothly on the first try.)

A few more rounds of cleanup and bugfixing later to the XHCI driver (more robust error reporting, fewer messages printed to syslog, etc.), the USB stack (moving some functionality from the bus drivers into the stack, adjusting returned error codes across bus drivers for consistency), and the USB audio driver (adjusting timeouts, increasing some buffer sizes, improving error reporting), things seemed to be working stably enough that it seemed safe to turn it on in the nightly builds, and so it was (in the last commit of the month, in fact.)

There's still a few caveats (e.g. only USB 1.0 audio devices are supported, rather than 2.0 devices, and they may not work when connected to anything but USB 3 controllers), and also some `media_server` bugs which mean switching your outputs from an internal audio card to a USB device is a bit finicky. There's a [forum thread](https://discuss.haiku-os.org/t/usb-audio-enabled-in-nightly-builds/14576/16) with some details and discussion, if you want to try it out.

### Applications

jscipione fixed crashes in Icon-O-Matic caused by the auto-scroll changes in BListView.

jscipione adjusted Keymap to put the status icons in the "Modifier keys" window inside the menu-fields. (However, there have been some reports the icons have stopped showing up after this change, so more work may still be needed.)

korli added detection of "Not charging" battery states to PowerStatus.

apl did some code cleanup and fixed some compiler warnings in HaikuDepot. He also refactored the parts of the code that fetch and display screenshots.

humdinger moved the "TV" app into the `haiku_extras` package. It's only useful with real TV tuner devices, which aren't especially common these days, and which Haiku doesn't have too many drivers for, either. (While at it, he also added a description to the `extras` package info, and jmairboeck later added proper `provides` declarations for TV and another tool in the package.)

jscipione removed the remnants of Trash-related settings from Tracker, and cleaned up the code that had checked them. He also performed some other miscellaneous code cleanup throughout Tracker.

waddlesplash added logic to PowerStatus to allow it to be automatically installed in Deskbar on first boot, but only if there's actually a battery detected.

### Command line tools

madmax fixed some compiler warnings in the `elfsymbolpatcher` tool.

waddlesplash fixed the `desklink` custom-item system to check what size Deskbar tray entries actually are, and use that, rather than a default (small) size.

### Kits

PulkoMandy updated the FFmpeg media add-on with some initial changes for FFmpeg 6 support (mostly disabled behind preprocessor flags.)

korli fixed a positioning problem in `BAdapterIO` (a `BDataIO` implementation used in the Media Kit and in some applications for playing media streamed from the internet.) He also added a `FlushBefore()` method to the API, to allow unused/unneeded data to be discarded.

humdinger made a quick-fix in the `registrar` for a problem with the "supporting applications" functionality: it didn't work for MIME types that had upper-case characters in them. waddlesplash came by later on and cleaned up and fixed the underlying problems in the supporting-apps classes, and undid the quick-fix in the `registrar`.

PulkoMandy adjusted BMenu to use `std::stable_sort` internally in the implementation of `SortItems`, so that successive sorts don't swap the order of items that compare equally.

madmax fixed some bugs in `BOutlineListView::ItemUnderAt` and adjusted it to accept `NULL` to mean the parent of the topmost items. (He adjusted the documentation and testsuite at the same time.)

waddlesplash tried to fix a regression in BScrollView that was causing "blank space" to appear in some applications. (The fix solved problems in some applications, but not others, it seems.)

### Servers

X512 reduced the minimum timer interval permitted by the `registrar`, which is used to implement `BMessageRunner`. (This may be useful for developers who want to use `BMessageRunner` to implement animations, or things like that.)

korli modified app_server to scan recursively in `/dev/graphics` for devices.

madmax removed some obsolete code from `runtime_loader`.

waddlesplash fixed the `registrar` to truncate the recents (apps, files, etc.) lists to 100 items maximum, rather than letting them grow indefinitely.

### Drivers

waddlesplash fixed some SMAP violation KDLs in the `mmc` and `nvme` disk drivers, which occurred when running the `driveinfo` command on them.

PulkoMandy adjusted the PCI subsystem to handle "non-fixed" hardware addresses (i.e. addresses with some values unset which have to be computed.) This was done as part of work to fix boot-failure KDLs that happen on some hardware, but it seems there's still more to be done here.

waddlesplash refactored parts of the PCI subsystem to be able to report an arbitrary number of memory ranges, rather than being hard-coded to a maximum of 6. (At present, the memory ranges in question aren't actually used anywhere yet, so this likely won't fix any problems.)

waddlesplash synchronized the `idualwifi7260` and `iaxwifi200` drivers, plus the `net80211` stack they use, with OpenBSD upstream.

korli added some more device IDs to the AMD Cryptographic Coprocessor driver (an RNG source.)

korli added a modesetting driver for `virtio_gpu` devices, and added it to the standard builds. These are the ones created by QEMU when `-device virtio-vga` is specified.

waddlesplash fixed the XHCI driver to properly handle "stopped, length invalid" error events, plus a few other problems. This will reduce syslog spam and improve error recovery under a number of conditions. He also refactored how it "links" USB transfers into endpoint rings to avoid "double-links", which might fix strange behavior seen on some controllers.

waddlesplash fixed a use-after-invalidate bug (which was probably rarely triggered, if ever) in the IPv4 kernel module, and restructured the code to prevent similar problems from happening in the future. He also fixed the module to clamp the overall MTU as needed, in case a lower layer returned a value greater than the maximum size of an IPv4 packet.

waddlesplash fixed the packet-input routine in the FreeBSD compatibility layer to handle being passed multiple packets at once, same as in FreeBSD. At present, the only code imported into Haiku which makes use of this functionality is `iflib` (used by `ipro1000` and `intel22x`), which had a workaround added in Haiku to not need it; but it seems the workaround didn't work quite right and could cause memory leaks, as removing the workaround after implementing the functionality in the compatibility layer seemed to solve some leaks.

waddlesplash added code to the TCP module inside the `send()` implementation to ensure data is actually being sent before sleeping to wait for more space in the send queue to be available. (This may fix traffic stalls in some applications that send more data at once than can fit in the TCP send queue, and also do not specify the `NOWAIT` flag to return immediately when the queue is full.) He then removed the overridden default buffer size (32KiB) the TCP module applied to send queues, meaning the system default will now be applied (64KiB), but also values specified by applications might have a chance to get used now.

waddlesplash added some code to the USB disk driver to cancel more types of queued transfers, in an effort to fix some rare KDLs. (It doesn't seem to have fixed the problem, unfortunately.)

waddlesplash did some refactoring in the TCP module to the sending logic, breaking some larger functions up into a set of smaller ones; mostly a non-functional change, but making the code easier to follow and modify.

waddlesplash fixed the TTY layer to return success (instead of failure) on partial writes, so that the calling application will know that some bytes were actually written. This fixes problems with pasting large amounts of data into shell sessions over SSH with some applications.

korli added some better handling of DDI and some code for Gen12 to the `intel_extreme` modesetting driver.

### File systems

waddlesplash fixed some bugs in `userlandfs` that were preventing most FUSE filesystems from working properly; however, in the process, he had to disable the (new since beta4) caching support for FUSE, which seemed to not be working properly, and instead causing errors to spuriously be returned. He also adjusted a memory allocation in the kernel userlandfs module to fix/prevent some SMAP violation KDLs that happened under certain circumstances.

### libroot & kernel

PulkoMandy fixed `features.h` (a header implicitly included to detect what features should be exposed in other, mostly POSIX, headers) to still work when the BSD compatibility headers (`libbsd`, not related to the kernel FreeBSD compatibility layer) are not in the compiler's include path, which is now needed when building Haiku itself.

X512 fixed a file descriptor leak inside the kernel implementation of the `preallocate` function. This had been the culprit causing memory leaks in some ported web browsers (Falkon and Web among them), which were really leaks of shared-memory files on the `ramfs`.

Following X512's change, waddlesplash went through and cleaned up file descriptor and vnode management in the kernel VFS layer, switching as many places as possible to use `FileDescriptorPutter`s and `VnodePutter`s (and replacing some variant implementations of those classes) rather than manually invoking `put_vnode`/`put_fd` (as, if these had been used throughout, the bug causing the leak wouldn't have happened at all.) This also eliminated some of the uses of `goto` in the VFS subsystem. He also refactored some functions that previously took `vnode**` parameters to instead take `VnodePutter&`s, to simplify code and prevent memory leaks.

korli fixed `create_vnode` to also create non-existent entries when traversing. (This fixes `open()` failing when passed a path which is a symbolic link to a non-existent file.)

waddlesplash changed the kernel virtual memory subsystem to avoid committing memory inside `mmap` for private mappings (i.e. those without `MAP_SHARED`) which are non-writable (i.e. without `PROT_WRITE` specified). Instead, memory will be committed inside `set_area_protection` or `set_memory_protection` (`mprotect`), when/if the area or portions of it are made writable. This allows applications to map large files (including files larger than the actual available amount of system memory) as read-only without hitting `ENOMEM` errors. (They could do this previously if they specified `MAP_NORESERVE`, but now it will work even without that flag being specified.) This fixes use of Git on large repositories on systems with limited RAM.

### Build system

kallisti5 updated the GCC package built into full Haiku image builds to the current version in the update repositories (13.2).

### Documentation

waddlesplash fixed a typo preventing a page on synchronization primitives from appearing properly in the API documentation.

PulkoMandy documented the various item-reordering APIs in `BMenu`.

madmax fixed some typos, copy-pasta, and strange grammar in various classes in the API documentation.

### ARM & RISC-V

No new changes in-tree this month for ARM or RISC-V, but there was at least some out-of-tree activity.

### HaikuPorts

Begasus updated the R port, and added a port of RKWard, the KDE IDE for R.

augiedoggie added an (initially disabled) recipe for `fuse-nfs`, which (after the userlandfs fixes) seems to work pretty well.

### Are we beta5 yet?

Not yet, no. But I fixed a number of tickets last month which were in the beta5 milestone (and determined some more could be de-prioritized out of the milestone), putting a good dent in the number still to be completed...

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
