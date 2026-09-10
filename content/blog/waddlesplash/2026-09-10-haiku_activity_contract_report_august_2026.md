+++
type = "blog"
title = "Haiku Activity & Contract Report, August 2026"
author = "waddlesplash"
date = "2026-09-10 16:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev59922 through hrev60059.

The main news, of course, is that R1/beta6 was released last month. You can read the [announcement](https://www.haiku-os.org/news/2026-08-26_haiku_r1_beta6/) for more details. Many of the changes in this report made it into R1/beta6 (but not all of them.)

<!--more-->

### Applications

waddlesplash fixed a file-descriptors leak in Tracker's query code, fixing a number of open tickets. jscipione changed Tracker to not start editing file names while dragging, re-enabled sorting of poses when adding is completed, implemented undo of creating new files from templates, made the drag-and-drop context menu live-updating, and more.

aquamatic continued work on the Devices application. (You can read more about that in his [final report](https://www.haiku-os.org/blog/aquamatic123/2026-08-21_gsoc_2026_expanding_the_functionality_of_the_haiku_devices_application_-_final_report/).) humdinger also made a small patch to use a translatable application name.

humdinger fixed the background of the optional package list in Installer.

jscipione fixed the Deskbar preferences window incorrectly moving the Deskbar itself when it was opened in certain modes.

madmax fixed a Deskbar crash when applications quit very soon after launching.

nephele and jscipione fixed ProcessController to load the "Power saving" setting when started, instead of when the menu is first opened.

jscipione updated the Apple keyboard layouts used in Keymap preferences to the "Apple Magic" layouts.

### Command line tools

waddlesplash fixed a number of authentication problems in `su`.

### Kits

KevinAdams improved Intel CPU "brand strings" detection some more, trimming more extraneous details off the strings displayed in AboutSystem.

przemub fixed a crash in the Locale Kit when a time unit formatter failed to initialize.

jscipione fixed some minor issues in spinner button drawing.

waddlesplash refactored `BBitmap` to use 64-bit-safe types. This allows for bitmaps over 2GB in size on 64-bit systems, but it also allows for an application's total size of all bitmaps to go over 2GB, which wasn't properly supported before either.

### Servers

mohammedrattia continued work on Bluetooth HID support. (You can read more about that in his [final report](https://www.haiku-os.org/blog/mohammedrattia/2026-09-01_gsoc_2026_final_report/).)

vighnesh-sawant also continued work on Bluetooth audio support. (You can read more about that in his [final report](https://www.haiku-os.org/blog/vighnesh-sawant/2026-08-21_gsoc_2026_modernizing_haikus_bluetooth_stack_implementing_support_for_hfp_profile_-_progress_report/).)

phoudoin implemented support for custom MIDI endpoint names and icons in the MIDI server.

waddlesplash (plus also some patches from vighnesh-sawant) implemented support for live output switching in the Media Kit and media_server. Hot-plugs (e.g. of USB audio devices) still aren't detected without restarting the media server, but after they are, it's now possible to change the default system output "live" and it will take effect in just a few seconds, without restarting the media services. waddlesplash also implemented "auto-stop" of outputs when no audio is playing, reducing CPU, power, and other usage.

phoudoin fixed screensavers not properly handling DPMS (monitor auto-shutoff) not working.

### File systems

waddlesplash made the UTF-16 to UTF-8 conversion routine accept zero-byte inputs, fixing some problems in the exFAT driver.

nathan242 changed the Intel partition manager to immediately reflect any changes made to partition "Active" states, instead of needing a reboot for them to show up in DriveSetup. He also fixed a file descriptor leak upon creating partitions.

waddlesplash fixed `attribute_overlay` (an overlay that adds temporary attributes to filesystems that don't otherwise support them) to read and write user data with the proper routines.

waddlesplash made `unmount` automatically call `sync`. This reduces the amount of work that has to be done during the unmounting phase, and fixes some assertion-failure KDLs.

waddlesplash fixed a rare race condition in the filesystem entry cache that was causing KDLs under some circumstances.

### Drivers

SED4906 tried to implement detection of write-protected devices in usb_disk, but unfortunately this broke too many USB controllers and had to be disabled. waddlesplash came by later and cleaned things up a bit in the usb_disk uninitialization logic (and some corresponding problems in the kernel device manager), fixing some KDLs.

kallisti5 fixed the build of `virtio_block` (as it had broken due to some header changes since it was disabled by default.) He then re-enabled it for non-x86 architectures, as it's more important to have it there, even if it doesn't work quite right.

korli changed the EHCI (USB2) driver to use more macros to get and set register values, instead of inline shifts, fixing some of the logic and making it easier to follow.

waddlesplash adjusted XHCI (USB3) to be able to restart halted/stalled endpoints even if no transfers were queued on them. He also refactored it to use the standard C++ linked-list class instead of hand-rolling lists. vighnesh-sawant fixed support for variable-length isochronous transfers.

waddlesplash reinstated a missing flag in the Wi-Fi drivers that had been missed during the last synchronization with FreeBSD.

SED4906 fixed the `intel_extreme` driver for Cherry View and Braswell devices. They also added some more device IDs that "almost" work, but don't just yet and are still disabled. neoman added a device ID that does work.

smrobtzz made the ACPI module pretend to be macOS on Apple hardware, enabling support for more hardware.

waddlesplash refactored the `pch_i2c` driver to wait for data transfers more efficiently and with fewer races. PulkoMandy made a number of improvements to the driver in an effort to get it working on his hardware (however, it doesn't just yet.)

smrobtzz implemented PCI resource allocation, fixing the two oldest open tickets on the bugtracker, and paving the way for support of more hardware.

SED4906 added support for the Surface Go 3 to the ACPI battery driver.

przemub made a lot of fixes and improvements to the `virtio-input` driver (including some old patches from X512), greatly improving its compatibility and features. He also fixed some problems in the virtio bus itself that were affecting it, including race conditions that may have also been affecting `virtio-block`.

PulkoMandy implemented support for USB 2 audio devices that still use the USB Audio 1 specification, adding support for a lot more devices.

PulkoMandy updated ACPICA to a more recent version.

PulkoMandy added support for more device types in the "RNDIS" network driver (mostly used for USB tethering from phones.) OscarL added support for another set of Samsung phones.

brendan (a new contributor!) added some quirks to the HDA driver to fix audio output on his MacBook.

waddlesplash merged many changes from NVMM upstream.

### libroot & kernel

waddlesplash added some missing handling for freeing pages that are in state "modified".

waddlesplash adjusted how the I/O scheduler keeps track of its state, fixing some kernel crashes under specific circumstances. He also added some array sizing assertions to related classes, to prevent misuses of the API.

waddlesplash adjusted some logic in the thread scheduler to improve the NVMM integration code somewhat.

waddlesplash made the `pthread` code add the start routine's image name to the thread name (e.g. `pthread: libWebKit.so`), to make it easier to identify who started a pthread. (`mmap`'ed areas have already done the same for a long time.)

VoloDroid fixed the EFI bootloader fetching the "load options" passed in from the EFI firmware. He also implemented support for passing options to the EFI bootloader, which makes it possible to launch the loader directly into the boot menu without needing to spam the spacebar.

waddlesplash implemented a "vnode undertaker", a kernel thread that is responsible for deleting vnodes. This was done to avoid deadlocks with the page writer, but it may also improve performance a bit.

waddlesplash changed the kernel's per-CPU IRQ management system to use the C++ linked-list class instead of the C one, for more inlining and better error checking. He also changed how IRQ rebalancing works, to avoid unnecessary rebalances, fix races, and more. (He also added some more assertions to the C linked-list class while at it.)

waddlesplash fixed a minor memory leak in the page writer.

dridiha fixed some tracing code in the kernel virtual memory manager.

smrobtzz refactored the bootloader to select what disk blocks to use to identify partitions deterministically, instead of needing random values. This removed a significant dependency on knowing the amount of time since boot from the bootloader, allowing timer calibration to be moved entirely into the kernel.

waddlesplash cleaned up the x86 CPU features detection code, to reduce code duplication and improve readability.

waddlesplash fixed the "get/set thread affinity" routines in the kernel to tolerate more kinds of bitmasks being sent from userland (and the kernel), fixing some applications that use these to detect how many CPUs are active.

waddlesplash made a number of fixes to the ABI of kernel mutex objects, to reduce the differences between nightly and release builds. This required some changes to how threads are initialized in very early boot, to make sure that `0` is always an invalid thread ID.

waddlesplash reworked some kernel debugger functions to de-duplify code and enhance the `calling` KDL command (and made the USB module call it automatically for one kind of KDL.)

waddlesplash refactored the some timeout handling APIs in the network stack, to reduce complexity and avoid code duplication.

### Build system

KapiX refactored the tests for the Locale Kit, Media Kit, Shared Kit, and Applications, modernizing them and removing lots of unnecessary boilerplate code. He also wrote tests for the Intel "brand string" parsing code.

waddlesplash synchronized the base package sets from HaikuPorts used to build Haiku on x86 and x86_64, in preparation for the beta6 release.

jmairboeck added some missing version constraint declarations to the requirements of the base packages.

waddlesplash deleted the old version of `hoard` that was previously the default `malloc` implementation in libroot. It was replaced last year with a new allocator which seems to be working just fine, so we don't need the old code anymore.

<!--

### Documentation

-->

### ARM, RISC-V, PPC

zeldakatze added an EFI path prefix for PowerPC to the Installer, to get the PowerPC build further. They also added support for "secureplt"-style PPC binaries, which are much more like regular binaries from other ELF architectures than the older type of PPC binaries.

przemub implemented fetching the CPU state in userland debug routines on ARM64, allowing stacktraces to be fetched from userland crashes.

przemub implemented an ACPI method for setting up SMP on ARM64. He also reworked the interrupt controller and timers initialization for some hardware, improved `system_time`, fixed some lock handling, and more.

przemub did a bunch of work towards improving bootstrapping on ARM64, including porting some tools to Python 3, adding missing packages to the bootstrap set, and more.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
