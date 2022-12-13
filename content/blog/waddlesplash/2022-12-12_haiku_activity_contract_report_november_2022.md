+++
type = "blog"
title = "Haiku Activity & Contract Report, November 2022"
author = "waddlesplash"
date = "2022-12-12 22:30:00-04:00"
tags = ["contractor"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56565 through hrev56626.

<!--more-->

### Applications

madmax fixed some issues in PoorMan's HTTP server backend that had been causing crashes and other instabilities.

PulkoMandy adjusted some messages for translation purposes.

madmax added code to make sure the cookie jar is saved in the appropriate location even when using the CURL networking backend in WebPositive.

waddlesplash fixed edge-cases around changing icon sizes in Tracker that could lead to icons disappearing entirely.

waddlesplash fixed icon size computation in `debug_server` to use the new `ComposeIconSize` method.

### Drivers

Zelenoviy contributed fixes to the (USB) HID input driver which fixed a number of USB input devices that previously did not work at all on Haiku. Thanks!

korli added support for the "CTA" extension block in EDID display information.

rudolfc fixed some problems with the (very old) `nvidia` graphics driver encountered when running it on newer Haiku versions.

korli fixed handling of the x86-specific PCI module in the USB drivers following the prior month's refactors, which had been subtly broken and caused kernel panics on startup on some certain systems (discovered during testing for R1/beta4.)

korli refactored our randomness system to be much closer to that of other OSes: he merged `/dev/random` and `/dev/urandom` to be the same thing and combined alternate entropy sources to feed into a single pool used by it. He also introduced a driver for AMD CCP's RNG functionality as a possible entropy source.

korli introduced a driver for AMD P-states (power states.) Haiku has had an Intel driver for this for some time, but lacked an equivalent AMD one until now.

korli added some more Haswell/Broadwell logic to the `intel_extreme` modesetting driver.

korli fixed behavior of the `O_NOCTTY` flag, fixing a lot of GPG's functionality.

korli added missing memory-management flags to the `silicon_image` disk driver (needed following a refactor some months ago, but nobody had run any hardware that needed the driver until just recently, it seems.)

waddlesplash changed the `nvme_disk` driver to use a recursive lock internally instead of a simple mutex, which fixes some kernel panics seen on at least some rarer hardware.

Zelenoviy contributed a fix to `termios` raw-mode initialization.

### Servers

OscarL fixed problems with auto-mounting in `mount_server` and various warnings in the partitioning code following earlier refactors.

### File systems

waddlesplash made a number of fixes to `ramfs`, a fully in-memory filesystem, over the course of the month. He fixed `mmap` being invoked on newly-created files, added logic to prevent the creation of undeletable directories with invalid names, fixed the locking code around unmounts, corrected reference counting of `Node` objects, refactored the memory management for very small buffers to not waste entire pages, and various other fixes. This sufficed to make `ramfs` stable enough to be added to the build by default and mounted at `/var/shared_memory`, meaning file-mapped shared memory will not ever be flushed to disk. (This provided a sizeable performance boost in applications using the Wayland compatibility layer, including GTK and the newly ported GTKWebKit-based browser.)

waddlesplash fixed `FAT` returning spurious errors for supposedly too-long names, prevening creation of some partitions in DriveSetup (discovered during testing for R1/beta4.)

### Kits

waddlesplash adjusted the spacing constants used in layouts in the Interface Kit, adding a new `BORDER` and `CORNER` spacing types. These have some slightly special behavior which allows them to be used in some situations where previously pixel metrics had to be manually computed in order to get pixel-aligned UIs on HiDPI.

jscipione fixed the layout of `BAlert`s when there is a large amount of content relative to the size of the window, ensuring that no part of the stripe or icon get cut off.

madmax added a new API to `BView` to get a transform to convert to/from the current drawing coordinate space relative to other coordinate spaces. This is now already used in HaikuWebKit, which fixes some rendering errors due to limitations in the more simple transforms API.

madmax adjusted `BAlert` to more properly handle icon changes while the alert is open.

### libroot & kernel

X512 adjusted the common `DoublyLinkedList` class to make some more methods `static`.

korli adjusted the included files of some POSIX locale-related headers to fix compatibility issues with some ported software.

X512 fixed a leak of virtual memory objects related to memory-mapped files in conditions relating to memory-only filesystems. (This bug was not encounterable without `ramfs` or another filesystem like it.)

korli added another mechanism for detecting TSC frequency on x86 used on newer AMD systems.

PulkoMandy adjusted the definition of the maximum integer constants to be more in accordance with the specification, and fix some `-Werror`s encountered on WebKit.

korli imported a fix for `itoa` from upstream glibc.

waddlesplash switched from using `malloc`/`free` to `new`/`delete` in various portions of kernel code. While this is mostly a non-functional change, it helped with adding code to check the state of certain structures on creation/destruction, which can only be done implicitly when `new`/`delete` are used.

korli added tentative support to the bootloader and kernel for loading CPU microcode updates on some AMD systems.

### Build system

waddlesplash made all the symbols of `libshared.a` (where various classes not yet API/ABI-stable are kept) "hidden" by default. This required the rebuild of a number of packages at HaikuPorts, but it should mean going forward we can break API/ABI in these classes without having to rebuild anything.

waddlesplash adjusted the dependencies of the `haiku` package to not depend on the `haiku_datatranslators` sub-package (which contains all the translators and media add-ons, and thus itself depends on FFmpeg, libpng, etc.) This means that constructing a minimal `chroot` (as HaikuPorter does for all builds) now requires many fewer packages than before. He also moved the print drivers to the `haiku_datatranslators` package, which cuts more dependencies out of the main `haiku` package.

waddlesplash made the necessary "housekeeping" changes, such as increasing version numbers, adjusting states, etc. and cut off the `r1beta4` release branch near the beginning of last month.

kallisti5 increased the default size of Haiku nightly and release images following the growth of the system and various packages. Previously it was possible to build a `release` image that still fit on a CD as long as source packages were not included (which they need to be according to a strict interpretation of the GPL), but now this does not seem like it will be possible anymore. Nightly builds still fit on a CD, for now.

davidkaroly removed some unused scripts.

waddlesplash refactored the definition of `_BOOT_MODE` and other flags applied to the bootloaders, which had been scattered and inconsistent previously.

waddlesplash updated the base set of packages Haiku is built against, and made some slight modifications to the TIFFTranslator to work with the newer version of `libtiff`.

### Documentation

waddlesplash improved the documentation on how versioning constants in libroot are changed during releases, and how branches are cut off.

madmax edited some of the introductory matters to the Haiku Book for readability.

kallisti5 updated and added more documentation on infrastructure-related tasks during the release process.

### HaikuPorts

davidkaroly did a lot of work on the recipe for Audacity, which more or less works at this point and might appear in HaikuDepot before too long.

3dEyes committed recipes for the new Wayland compatibility layer (!) written by X512, and adjusted GTK3 to build against this instead of against waddlesplash's X11 compatibility layer. He then updated or added a lot of other GTK-related recipes, culminating in the addition of `gtkwebkit` and Epiphany (aka. "GNOME Web"), which is the most capable browser seen on Haiku yet: it is much more stable than Falkon, and supports complex but common websites with YouTube without much ado (and without crashing or hanging frequently like the other browsers available before this were generally prone to.) It does require installing quite a lot of packages (as GTK is not especially lightweight), however. Other GTK-based applications have been trickling in to HaikuPorts as well.

### Are we beta4 yet?

*Very soon.*

Last month was mostly spent on testing, fixing bugs, and general polishing towards the release. There were some blocker issues remaining which plenty of users noticed (like all web browsers failing to start on the 32-bit builds) which have been resolved or will be resolved within the next few days. Following that, a "Release Candidate" build should be generated, and barring any other problems, the release will then be imminent.

### That's all, folks!

Thanks once again to all the donors who make my contract possible!
