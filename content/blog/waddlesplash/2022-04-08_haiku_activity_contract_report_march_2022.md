+++
type = "blog"
title = "Haiku Activity & Contract Report: March 2022"
author = "waddlesplash"
date = "2022-04-08 14:30:00-04:00"
tags = ["contractor"]
+++

Just like the last few months, the usual Activity Report is hereby combined with my Contract Report.

This report covers hrev55917 to hrev55991.

<!--more-->

### Applications

Dale Cieslak fixed a rather old bug related to starting a new game in Pairs.

Humdinger cleaned up menu text in a few places for consistency with our style guides.

apl added support in HaikuDepot for displaying the size of local package files (the sizes of remote ones are already displayed.) He also changed what repository identification the client sends to the server, in anticipation of upcoming changes.

PulkoMandy removed a spurious assert from Tracker that triggered on debug builds.

waddlesplash fixed most of the "HaikuDepot crashes on exit" regressions from the past few months (but it seems one or two may still lurk.)

Jim906 adjusted the layout of the FileTypes' "Application" window, making resizing it more useful.

### Drivers

waddlesplash reduced one of the GCC 11 related optimization-disabling options, which was added to the WiFi stack's build, to only affect a single file instead of the entire module, improving performance and reducing CPU usage.

PulkoMandy's work on VESA BIOS live-patching (supporting more resolutions than a VESA BIOS was designed to, without having to write per-hardware drivers) was merged. It only works reliably on Intel hardware, and there are a few regressions related to it, but it should improve Haiku's usability on pre-EFI machines when it stabilizes a bit more.

waddlesplash fixed some problems in the newly-introduced USB support in the FreeBSD compatibility layer that could cause whole-system hangs in some cases.

rudolfc made a number of improvements to the Intel modesetting graphics driver, and made some general improvements to the common code to better support "cloned" accelerants.

korli added support for 64-bit PCI addresses to the Intel and AMD Radeon graphics drivers.

korli added basic "Jasper Lake" support to the Intel graphics driver, including "VBT" and "DTD" support, and vblank interrupts.

kallisti5 fixed the FAT driver to properly set the volume label when creating partitions.

waddlesplash upgraded the `ipro1000` ethernet driver in line with FreeBSD 13.1, which added support for the ethernet device in PulkoMandy's new laptop (which includes a very recent Intel chipset.)

PulkoMandy adjusted the PCI information logging to print 64-bit addresses more readably.

PulkoMandy fixed `acpi_battery` to accept slightly non-standard structures, which apparently the battery controller on his laptop has.

PulkoMandy added some very basic "Tiger Lake" support to the Intel graphics driver, including brightness setting.

Lt-Henry added the "digitizer" constants from the new HID 1.3 specification, which will be useful in implementing more complete USB-attached touchscreen support.

waddlesplash added some support for "Broadwell" devices to the Intel graphics driver. (Modesetting works; brightness control does not, just yet.)

### Interface Kit

Jim906 fixed an issue in the layout system where "cumulative minimums" were improperly computed, leading to cut-off controls in some applications like FileTypes.

### Command Line Tools

kallisti5 got rid of the old "mkdos" command (the "mkfs" command has been able to create FAT partitions for some time.)

waddlesplash fixed the profiler tool to account for unknown symbols in "inclusive" mode. (Unfortunately, at present the tool seems broken more generally, at least on x86_64, so it is a bit more limited at the moment.)

waddlesplash adjusted some header configurations in the unit tests to massively reduce compiler warnings.

### Bootloader

davidkaroly's work on supporting 32-bit EFI on x86 systems was mostly merged. You may need to compile it yourself, but it should be possible to boot Haiku on machines that require EFI but only have a 32-bit EFI BIOS (mostly some early hardware.)

korli let the bootloader use a real `int128` type if it is available (instead of emulating it using two `int64`s with custom numerical operations.)

### libroot & kernel

waddlesplash optimized some of the select() and poll() implementations in the kernel a bit, and did some slight cleanup in preparation for a larger refactor in this area.

X512's changes to allow userland applications to change some protected registers, which WINE needs, were merged.

kallisti5 made some simple changes while experimenting with using "lld" to link the system.

korli added some missing prototypes to internal glibc headers, which fixed some crashes with wide-character manipulation functions.

waddlesplash removed some unneeded parts of glibc from the tree (parts of obstack, etc.), and replaced a few other minor ones (a64l, l64a) with equivalents from musl. He also altered posix_spawn to use load_image() and avoid fork() in a few more cases.

waddlesplash improved some asserts in the FreeBSD compatibility layer's taskqueue code, to help with diagnosing some KDL tickets and probably fix some others, and cleaned up its locking routines to take advantage of some features that the rest of the compatibility layer now provides.

waddlesplash declared some internal kernel functions static, to stop them from being exported and prevent confusion.

waddlesplash cleaned up the low resource manager to better accommodate being actively notified of low resource states (e.g. low memory, out of address space, etc.), instead of just detecting them itself. Previously when it was notified of a low resource state, it would ignore whatever it was told and just trigger a re-scan of resources to see which were low; which meant that some not-so-detectable resources (like address space usage) would never trigger a low-memory notice to be issued. Now, these are handled, albeit not perfectly.

waddlesplash made the VFS layer allocate "vnode" objects from a dedicated pool ("object_cache"). This should increase performance a bit, but it will also allow one to check via the kernel debugger exactly how many vnodes are globally in use at any given time.

waddlesplash cleaned up the CPU information syscall to better use kernel/user memory operations, and also reworked the ELF loading code to use Deleter objects in order to remove all of its gotos.

waddlesplash removed a confusing requirement on "published" condition variables that they not be removed simultaneously with a notify/wait request, which was not observed in some parts of the network stack and led to KDLs on rare occasions. He also fixed a deadlock situation in the network stack related to autoconfiguration, which was observed in the same environment as the just-mentioned KDL.

waddlesplash fixed an incorrect virtual memory object type check, which led to mmap'ed memory being "lost" in some cases (notably in WINE, which was observed by X512 and a minimal testcase for the problem was submitted. Thanks!)

waddlesplash cleaned up some memory-protection-related code in the VM and made some minor optimizations to it, while investigating QtWebEngine crashes.

korli fixed a syscall misalignment problem on x86_64 that was causing KDLs in `strace`.

waddlesplash removed some unused (and incorrectly introduced) methods from the VFS layer.

waddlesplash completely reworked the `mlock()` implementation in the kernel. The old version was quite wrong and very prone to causing KDLs, which it did (somewhat ironically) on some port's `./configure` tests to see whether `mlock` was broken... whoops! A change was pushed to the previous beta branch to disable the old implementation entirely, while a new and very different implementation, written from scratch, has now been merged into the nightlies and seems to be working much better than the old one.

X512 fixed thread-local storage on riscv64; this allows userland to fully initialize once again. He also adjusted how runtime_loader is linked more generally.

X512 removed a lot of unused linker scripts, some of which had been in the source tree since the very first commit two decades ago (!).

### ARM!

davidkaroly's work to get the ARM port to enter userspace from the kernel was merged.

PulkoMandy made some initial changes to the EFI bootloader to support "Allwinner A10" devices.

urnenfeld reworked exception-level handling on the EFI loader for ARM64.

davidkaroly reworked "address-cells" and "size-cells" FDT handling in the EFI loader. He also added support for another UART, implemented privilege-level transitions, and did some other work towards running on bare metal.

### HaikuPorts

As the necessary changes were merged into Haiku, WINE is now available for x86_64 nightly builds!

### That's all, folks!

What's next? Well, more work toward the next release of course!

I did spend some time trying to investigate the all-too-frequent QtWebEngine crashes, especially after the success I had with resolving the VM-related problems WINE uncovered, but was unfortunately unsuccessful there. I added a number of hacks to the kernel to work around some of the crashes, but other crashes always happened in their place, so something seems more generally broken on that front. I have more or less stopped investigating that for the time being.

A number of the tracked regressions since the last release have been resolved (and plenty of unrelated issues besides, as you can see), so that should hopefully continue. PulkoMandy's new laptop has a WiFi card which is supported by OpenBSD but not FreeBSD, which is a general trend (there are some drivers we have which are much more feature-rich on OpenBSD), and so I may see if we can use the OpenBSD WiFi stack and some drivers without giving up our FreeBSD ones entirely (as there are some drivers, the Atheros one especially, that support tons more hardware on FreeBSD, and thus Haiku, than OpenBSD.)

Aside from that, there are some UI-related issues; but I expect that this month will be on the lighter side for me with the various holidays, so we will have to see about that.

Once again, many thanks to all of Haiku's supporters, and our wonderful community! We could not do all this without you.

See you next month!
