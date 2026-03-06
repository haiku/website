+++
type = "blog"
title = "Haiku Activity & Contract Report, February 2026"
author = "waddlesplash"
date = "2026-03-05 21:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59356 through hrev59430.

<!--more-->

### Applications

humdinger fixed Mail to properly set the "thread" attribute on mail files when sending emails. He also added some missing files to the translation set, and implemented "labels", a new feature designed to replace custom "statuses".

humdinger made some followup changes to make the "Translate application names" Locale preference be respected in more cases.

jscipione fixed Tracker to draw dragged files and folders in a "selected" state, making them easier to see no matter what they are dragged overtop of. (There's some discussion about whether this is the most aesthetically pleasing option, however.) He also fixed some problems with sorting, background images, and more.

X512 (building on an earlier patch) reworked StyledEdit to always choose the lowest number for "Untitled" documents, fixing a quite old ticket.

madmax made a number of fixes to CharacterMap, including fixing block search in some cases, increasing the maximum size of the blocks list view, improving character layout, and more.

PulkoMandy (based on an older patch by mmu_man) added a "location selector" to Deskbar preferences, similar to Screensaver's "corner selector". This makes it much easier to discover that the Deskbar can be moved, and an easier way to do it than grabbing the small resize handles.

waddlesplash fixed Terminal and Expander to quit using `_exit` instead of `exit` in forked child processes, fixing some potential bugs if global destructors are incorrectly called in the children.

nephele simplified how settings are saved in LaunchBox.

### Command line tools

waddlesplash refactored `time_stats` to use `posix_spawn` instead of fork+exec.

### Kits

priyanshu-gupta07 contributed some unit tests for BStopWatch.

X512 fixed the "video mixer" Media Kit add-on, and added it to the base install. (It's mostly useful as a demonstration of video processing media nodes.)

korli changed the "print size" logic to switch to the next unit at 1000 instead of 1024 (e.g. "0.9 GiB" instead of "1,000 MiB").

PulkoMandy changed `BGeolocation` to query the "Beacon DB" for geolocation data (if requested by users), as the Mozilla Location Service has been discontinued.

waddlesplash made some changes to various Kits to avoid statically-allocated `BLocker` objects. (These can cause problems with applications that `fork`, which native Be/Haiku applications mostly shouldn't need to, but ported GUI applications might.) He also added some assertions to prevent `fork`'ed GUI applications from trying to continue to use the GUI, or from exiting normally. (While at it, he also did some cleanup to BGameSoundDevice.)

nathan242 fixed handling of the "Delete" key in focused text fields when there's a disabled shortcut that also is "Delete".

### Servers

KapiX fixed a crash in app_server when processing gradients with no color stops.

waddlesplash changed net_server and launch_daemon to use `posix_spawn` in place of fork+exec.

### Drivers

waddlesplash disabled the `virtio_block` driver, which unfortunately appears to be broken under multithreaded use (at a minimum), and has been for years. (The `virtio_scsi` driver, or any of the other virtio drivers for that matter, appear to be unaffected.)

korli added some missing parameters to the NVMe driver's feature management APIs.

waddlesplash synchronized most of the OpenBSD WiFi drivers with upstream, pulling in a number of bugfixes.

OscarL added another device to the Intel GART driver (part of how memory is managed for iGPUs).

waddlesplash disabled the "zero-copy" buffer optimization in the EHCI (USB2) driver, as it seems to have caused crashes and data corruption on at least some hardware.

### File systems

waddlesplash reworked how packagefs deals with low-memory conditions to degrade performance instead of hard-failing I/O operations in more cases.

waddlesplash fixed a crash in the NTFS driver when failing to mount some partitions.

AbdullahZulfiqar2005 added support for reading Zstd-compressed files in the BTRFS driver.

sleipbyte made a number of changes to the XFS driver, including fixing a compilation error, implementing the `rewind_dir` hook so that Tracker can list entries, fixing SMAP violations, partition identification, and more.

kallisti5 added some better logging in the NFSv2 driver.

nathan242 fixed a crash when creating a FAT filesystem on a disk image.

waddlesplash fixed a rare crash in BFS that could occur when checking a corrupt filesystem.

waddlesplash made some refactors to RAMFS, cleaning up support for an allocation size tracing routine, consolidating some node monitoring logic, and fixing node monitor events for regular files.

grep-name (a new contributor!) fixed some warnings and potential bugs in BTRFS.

waddlesplash fixed a division-by-zero caused by certain query strings in the query parser.

### libroot & kernel

waddlesplash reinstated some architecture-specific code in the `printf` implementation to fix some rare crashes.

waddlesplash optimized some swap-related routines in the kernel memory management code.

korli added a definition `GETENTROPY_MAX` to `<limits.h>`.

Goldfish64 (a new contributor!) contributed better support for Hyper-V hosts, including proper TSC calibration and a brand-new Hyper-V VMbus driver.

Amir-Ramez (a new contributor!) implemented address space reservation for the runtime_loader heap, improving efficiency (especially when ASLR is disabled.)

waddlesplash reworked the `pthread_barrier`s implementation to need fewer syscalls and to fix some races, fixing a hang that could sometimes occur in OpenGL applications.

waddlesplash made some changes to how TLB invalidations work on x86 to skip unnecessary invalidations (e.g. if one core broadcasts an invalidate to another core, but that other core did a context-switch before receiving the message, it should just skip it), slightly improving performance. The refactor this entailed also paves the way for better support for ASIDs on architectures where they're supported (or even mandatory.)

waddlesplash fixed the implementation of `POSIX_SPAWN_SETSID`, which was previously broken.

vighnesh-sawant (a new contributor!) added support for the `AI_V4MAPPED` flag to the DNS resolver.

### Build system

korli added some flags to `configure` to allow building the GCC 2 crosstools with a newer GCC.

fruitdelapassion made some changes to allow `-Werror` to be enabled for more modules, including in netfs, radeon, s3, and more.

KapiX began a big overhaul of the unit test system, working on simplifying the structure of the unit tests, to reduce the amount of boilerplate and make the tests easier to work with and write.

### Documentation

waddlesplash made `B_QUERY_WATCH_ALL` part of the public API and added documentation for it. Essentially, this flag behaves like `B_WATCH_ALL` does for directories, but for queries: it sends node monitor notifications when any entry within a query is changed, not just when entries are changed in ways that cause them to be added or removed from queries.

### Are we beta6 yet?

Getting closer. I've had a change refactoring part of the kernel's memory accounting systems (to fix a rather bad regression) up for review for a month, but none of the other kernel developers have had a chance to properly review it yet. More of the Tracker regressions have been fixed, though some remain. Besides those issues, there are around 5 or 6 bugs or regressions that really need to be fixed before we can start working on a release (though some of those are quite complicated and may take a bit to resolve.)

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
