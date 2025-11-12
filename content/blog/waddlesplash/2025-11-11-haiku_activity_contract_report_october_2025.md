+++
type = "blog"
title = "Haiku Activity & Contract Report, October 2025"
author = "waddlesplash"
date = "2025-11-11 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59050 through hrev59110.

<!--more-->

### New kernel guarded heap

The biggest change last month is that I entirely rewrote the kernel's "guarded heap" implementation. Some users may be familiar with the userland version of this, which we often ask users to try when encountering problems in userland software, with some invocation like `LD_PRELOAD=libroot_debug.so MALLOC_DEBUG=g program...`. This facility basically puts every single allocation on its own page, right up against a guard page. This is extremely inefficient, but it is very effective at catching buffer overruns (and, with memory reuse disabled, use-after-frees and double-frees; though not always ones that are race-sensitive) without recompiling anything.

The kernel also has a guarded heap, the implementation of which was originally quite similar to the userland one. The kernel, however, has a lot of different things going on when it comes to managing memory that userland does not, like the bookkeeping structures for areas and the like. This means depending on what point `malloc()` is invoked in the kernel, we may not actually be permitted to reserve more memory, but must rely on what had been reserved already, or else we'd hit deadlocks! But we also have the advantage that the kernel `malloc`, if it wants to, can interact directly with the virtual memory allocation and page table management systems, whereas the userland `malloc` can only do so through the regular syscalls, which are rather abstract by comparison.

The old kernel guarded heap, then, was rather suboptimal, and additionally it had not kept up with the userland one anyway: for example, in the last few years the userland guarded heap gained support for using `MAP_NORESERVE` to overcommit its areas, and then `madvise` to free pages that are no longer needed, allowing "virtual memory reuse disabled" guarded heap runs to survive for quite long periods of time even with lots and lots of churn, at least on 64-bit systems where address space is cheap. The kernel did not gain this equivalent support, and so was prone to running out of memory very quickly even on 64-bit systems. The implementation in the kernel also required some extra features in the VM and page table systems that weren't implemented on all architectures, and in fact only used by the guarded heap.

So, to rectify these limitations, I rewrote the kernel guarded heap more or less from scratch, taking the old code into account where it made sense but otherwise creating entirely new bookkeeping structures, interacting directly with the page table and virtual memory systems, and more. This new guarded heap implementation frees physical pages when not in use, meaning that the "virtual memory reuse disabled" mode now runs for quite long periods of time (indeed, I could successfully boot to the desktop and run compile jobs.) It also prints more diagnostics when kernel panics due to memory faults inside the heap happen, which the old kernel guarded heap didn't (but the userland one has always done).

The new kernel guarded heap was merged in hrev59101, though it can't be used without changing options in `kernel_debug_config` and recompiling. In the near future, I may make some pre-built test builds with the guarded heap compiled in available, so that users can try it out and see if they encounter any memory faults that way. (There are a few recently opened tickets that may be much easier to diagnose with such builds, which was a significant part of the motivation to develop this new implementation.)

### Applications

humdinger fixed the "Show in Tracker" and "Trim to selection" actions of sub-items in TextSearch. He also added a right-click menu that shows the relevant actions for items.

nipos improved AutoRaise to scale its icon to fit the Deskbar's size.

madmax fixed some crashes in Tracker when scripting was used in combination with type-ahead filtering.

PulkoMandy fixed the drawing of the middle dot of the clock in Time preferences in dark mode.

nipos implemented wrapping from the last to first or from the first to last images in ShowImage. He also improved image loading to display more detailed errors when loading fails.

PulkoMandy converted the main view in DriveSetup to use layouts.

nipos changed DeskCalc to remember its color only after colors are dropped, not unconditionally.

nipos fixed a number of text colors in DiskProbe, and also refactored its type editor panels to use layouts.

PulkoMandy implemented support for temperature information in ActivityMonitor, and added the "ACPI thermal" driver as a data source.

nipos implemented synchronizing Terminal's internal clipboard with the system clipboard when it opens.

jscipione added "Disks" to the Desktop drill-down menu if the "Show Disks" setting is enabled in Tracker settings. He also added "Edit query" and "Close all in workspace" to the Query window, fixed some shortcuts not being properly redirected in file panels, and fixed rectangle hit-testing in icon mode. waddlesplash fixed the background colors in the main and "Get info" windows of the column titles after the control color refactors (a change that also fixes other applications, too.)

nipos fixed a state change problem in the Installer leading to the Quit button confusingly being labeled "Begin" instead in some rare circumstances.

nipos fixed scrollbar size computation in the "Playground" demo.

### Command line tools

OscarL added a `--show <field>` option to the `info` command of `pkgman` (e.g. `pkgman coreutils --show provides`), which may come in handy for those writing scripts that operate on more than just installed packages.

PulkoMandy added support to `sysinfo` for displaying "Leaf 7" CPU features, like AVX2, AVX512, and more.

### Kits

X512 added some future-proofing in the app_server protocol for multiple screen support. He also reworked one of the memory-sharing mechanisms inside app_server itself to maintain a reference count and use a map to keep track of cloned client areas, improving performance and fixing some potential area leaks under heavy load.

waddlesplash fixed some confusion in BWindow between different shortcut modifiers fields, fixing a number of tickets about crashes and strange behavior in Tracker.

nipos fixed the tinting of the `<empty>` menu item in dark mode.

humdinger fixed the behavior of `BDate::LongDayName()`, which previously wasn't returning the unabbreviated name.

nipos fixed drawing artifacts appearing on resize in the "barber pole" control.

Following a diagnosis and an initial patch by X512, waddlesplash fixed receiving empty `BRegions` across the app_server link, fixing some regressions seen in WonderBrush and elsewhere.

### Drivers

waddlesplash added support in the EHCI (USB 2) driver for using physical buffers directly, if they align with EHCI DMA requirements. (This allows the USB disk driver, the only driver currently using physical USB requests at present, to avoid bounce buffers in some conditions, skipping copies and improving efficiency.)

waddlesplash ported the "ACPI C-states" CPU idle module to the new ACPI and CPU module APIs. It hadn't been updated in a very long time (since before 2013), so it needed a significant amount of work to get it going again, and then a lot of troubleshooting after that. Unfortunately it still does not work quite right on the hardware it was tested on, so it's still disabled by default. (The modern C-states CPU idle module, which uses a different mechanism for idling, is still enabled by default and has been for many years; this module is only for relatively old hardware.)

korli added support for up to 64 logical block address formats to the NVMe driver.

PulkoMandy made a number of changes to the SDHCI driver, cleaning up the code and fixing problems related to interrupt handling and transfers. SED4906 (a new contributor!) submitted a change that significantly corrects how the SDHCI driver detects host controllers.

PulkoMandy implemented `B_GET_DEVICE_NAME` for the `acpi_thermal` driver (which required exposing the `convertutf` routines in the kernel itself to C, not just C++).

### File systems

Jim906 added locking to prevent use-after-free (or free-during-use, rather) problems on a ConditionVariable in the NFS4 driver.

OscarL adjusted userlandfs to properly release its root nodes, which is necessary after recent VFS refactors.

### libroot & kernel

korli implemented support for the `IPV6_V6ONLY` socket option.

PulkoMandy fixed a slight oversight in the ConditionVariable implementation that could have led to variables incorrectly not being notified in some rare circumstances involving timeouts or interruptions, leading to degraded performance.

waddlesplash enhanced a use-after-free assertion in the kernel slab allocator, to try and troubleshoot some problems.

waddlesplash added a missing return from an error case handler in the kernel sockets implementation, which might fix some odd KDLs that were reported recently.

korli added a SMBIOS probe mechanism that fetches its address from the EFI boot services. (This also required making some changes to allow passing more arbitrary information to the kernel without breaking ABI so often.)

korli imported a number of patches from musl to the `strftime` method and related functions, to fix bugs and bring us closer into compliance with POSIX-2024.

waddlesplash made the `rwlock` KDL command dump the read-locking threads (if any) on kernels built with `KDEBUG_RW_LOCK_DEBUG` enabled. (It isn't by default, as it's a quite expensive debug option; without it, the relevant information to determine what threads hold read-locks isn't available.)

waddlesplash added some more lock assertions to the VM and VFS subsystems, and fixed a double-read-lock problem uncovered by the `KDEBUG_RW_LOCK_DEBUG` option.

korli fixed a process-group reference leak in signal handling, and fixed some various checks to team state in `setpgid()`.

korli added some macros to `<complex.h>` that are declared in the newest specifications.

waddlesplash added an `ASSERT` to check that early-boot area creations never fail (a change inspired by work on the guarded heap, where it would've saved some debugging time.) This caught a rather serious discrepancy in the ARM64 port, which may be part of why that port isn't booting very far after a change some months ago to how the bootloader sets up memory maps.

waddlesplash fixed a mismatched free inside the VFS that was triggering assertion failure KDLs.

waddlesplash made some changes to fix a "double lock" KDL in the VM on certain error conditions.

waddlesplash made some refactors to the "cut areas" routine to better handle some corner-cases around areas that were previously shared across processes, but now no longer are.

### Build system

smrobtzz (a new contributor!) changed the `unzip` tool to be compiled with `-std=99`, fixing the build on hosts that are using GCC 15.

X512 dropped the `+x` bit from a number of files that didn't need it.

PulkoMandy dropped a number of obsolete build rules for dependency packages that aren't needed at the moment.

jscipione fixed the build of the host tools on recent macOS versions.

waddlesplash made and imported some changes to various parts of the source to appease Clang.

### Documentation

PulkoMandy fixed a number of Doxygen warnings in the Haiku Book (where the Haiku APIs are documented), and added documentation for the kernel ConditionVariable API. You can read it [online](https://www.haiku-os.org/docs/api/structConditionVariable.html).

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
