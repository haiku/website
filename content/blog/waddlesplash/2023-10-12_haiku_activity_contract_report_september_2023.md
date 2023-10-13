+++
type = "blog"
title = "Haiku Activity & Contract Report, September 2023"
author = "waddlesplash"
date = "2023-10-12 21:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57257 through hrev57308.

This was a bit of a shorter month than usual (for me, at least.)

<!--more-->

### Applications

Zardshard cleaned up some code in Icon-O-Matic, removing `using namespace` directives from headers. He also fixed building Deskbar with `ASSERT`s compiled in.

humdinger adjusted the "low battery" notifications in PowerStatus allow setting distinct sounds for "battery low" and "battery critical" notifications.

davidkaroly did a bunch of work on Debugger to allow it to (partially) parse newer versions of the DWARF debugging information standard, as GCC now generates.

jacereda (a new contributor!) refactored Keymap's "Modifier keys" dialog, and added support for remapping the "Caps Lock" key (in addition to the already-remappable Shift, Control, Option, and Command keys.)

humdinger fixed some internationalization logic in the "Colors" preferences window in Terminal.

waddlesplash fixed Tracker file panels having their "Open" buttons incorrectly enabled, or incorrectly allowing files to be double-clicked for opening, when only directories were supposed to be openable. (This fixed a bug dating all the way back to the original OpenTracker source import in 2001!)

apl implemented the basics of token-based authentication (part of Haiku's ongoing switch to a "single-sign-on" system instead of having separate account databases for all our online services) in HaikuDepot.

humdinger added a setting to limit FPS in GLTeapot. Previously, if the running display driver supported detecting when retraces occurred, GLTeapot would aways wait for it and thus only produce at most as many FPS as the screen refresh rate, making it not very useful as the "benchmark" it has been seen as in the past. Now this can be turned on and off, allowing one to get hundreds to thousands of FPS once more.

### Command line tools

cpr420 fixed the `filteredquery` command's displaying of results, argument parsing, and cleaned up the code somewhat.

### Kits

waddlesplash fixed the logic of `BBufferedDataIO::Write`, which was quite incorrect (but apparently not used anywhere, whether inside Haiku's own source code or in third-party software) and added some unit tests for it.

### Drivers

waddlesplash fixed a NULL-dereference panic in the IPv4 networking module that could happen in certain scenarios involving multicast.

waddlesplash synchronized the `iaxwifi200` (aka. `iwx`) driver with OpenBSD, bringing in a lot of changes that utilize newer firmware versions.

### File systems

waddlesplash fixed some locking problems in packagefs causing whole-system hangs which had been uncovered while testing certain experimental (not yet enabled) HaikuPorts recipes. (The packages produced still can't be installed properly, but at least the failure will now be a graceful one.)

### libroot & kernel

trungnt2910 added a definition of `static_assert` for C11 and up. (For C++11, this is a compiler builtin, but for C11 it needs to be defined in a header file.)

davidkaroly adjusted some of the internal musl headers and by bringing in changes from upstream, fixing build issues on non-x86 architectures.

waddlesplash deleted some old and long-unused private headers, and updated some of the BSD compatibility headers to newer versions from FreeBSD.

waddlesplash fixed a type mixup causing kernel panics in the XSI (POSIX extensions) message queue implementations, and performed a number of code cleanups to it while doing so.

waddlesplash altered the "trap in kernel debugger" loop to invoke the `PAUSE` (or equivalent) instruction. This loop runs on all CPUs *besides* the one actively running the kernel debugger, and so it spends most of its time waiting for something to happen. Invoking `PAUSE` just like waiting spinlocks do hints to the CPU that we are in a busy-loop and to avoid consuming as much power. (Even in a VM with only a few cores allocated, the lessened power consumption and thus difference in fan spin-up are very noticeable.)

waddlesplash removed the custom implementations of `arch_debug_get_caller` and replaced them with a compiler builtin.

waddlesplash rewrote the `B_DEBUG_SPINLOCK_CONTENTION` debugging option. This option (disabled by default through a `#define`; the whole system must be specially recompiled if it is enabled) allows measuring how much time is spent holding or waiting for spinlocks across the system. As spinlocks are always dealt with in interrupts-disabled mode, it's thus useful for tracking down performance problems or hotspots in areas the kernel profiler can't see.

puckipedia fixed stack alignment in `arch_debug_call_with_fault_handler`, used in the kernel debugger for invoking various commands. They also fixed a bug in the kernel's x86(_64)-specific code to send inter-CPU interrupts, which was causing incorrect or missed deliveries (fixing problems with Haiku running on machines large numbers of cores randomly stalling or hanging.)

### Build system

waddlesplash disabled autovectorization optimizations for the kernel, at least for the time being. These compiler optimizations turn regular operations into SIMD operations (e.g. using SSE2 instructions on x86, or NEON instructions on ARM), which can sometimes provide significant performance improvements but requires use of the FPU (among other limitations.) There should be no reason these can't be used in the kernel, and indeed we've had them enabled for years, but after the GCC 13 upgrade, they were identified as the cause of various problems running Haiku in virtual machines (and not just in one virtualization platform; QEMU/KVM, VMware, and VirtualBox are all affected, though in different ways.) None of the problems have thus far been observed on bare metal, but until the cause can be properly tracked down, autovectorization was disabled entirely for the kernel (it remains enabled for userland, of course.) Perhaps notably, Linux and the BSDs have much more severe restrictions on the use of the FPU (thus including SSE2, NEON, etc. instructions) in kernel-mode than Haiku does, so there's basically no chance for such optimizations to be done in kernel mode at all for them, and thus it's possible VM software has not been much tested for the use of such CPU instructions in kernel mode.

### Documentation

Zardshard wrote proper documentation in the Haiku Book for `BMenu::AddDynamicItem`.

PulkoMandy added a note about calling `GetMouse()` inside a `MouseUp()` hook in the `BView` documentation.

### ARM & RISC-V

davidkaroly dusted off some of the M68K (!) port code and brought it partially in line with some of the changes that have occurred in the years since it was last touched, specifically in the bootloaders, musl internal headers, kernel architecture-specific files, and other related areas. He also performed similar cleanups to the PPC port.

davidkaroly silenced some warnings in the ARM64 port.

X512 added another RISCV-specific section to the ELF loaders (just ignored for now as it's not needed at the moment.) He also refactored page-table flags handling to have more readable code and be properly atomic, fixing some concurrent access bugs.

### HaikuPorts

LLVM/Clang 17 packages are now available, with a lot of Haiku-specific fixes and patches compared to prior versions.

Running of Fortran applications compiled with GCC 13's Fortran compiler was fixed.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
