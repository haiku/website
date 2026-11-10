+++
type = "blog"
title = "Coding sprint report - Gdansk 2026"
author = "PulkoMandy"
date = "2026-11-10 13:30:00+0100"
tags = ["coding-sprint"]
+++

Haiku used to have coding sprints once or even twice a year. Unfortunately, after the end of the
BeGeistert conference, we have lost the habit of doing that. The previous ones in 2025 and 2022,
organized just after FOSDEM, were not hugely successful, with few people attending or staying for
only part of the week, and, as you can see from the date, they have not been a regular occurrence.

This year the idea to run a coding sprint was prompted by Waddlesplash traveling to Europe to
attend the GSoC mentor summit. KapiX stepped in to organize the logistics and host the sprint.
At first it looked like it would be only the 3 of us, but eventually more people decided to join:
Korli, as well as Dridiha and Zeldakatze, both of whom had never joined a sprint before.

If you're not familiar with the idea of coding sprints, the idea is to gather several developers
in the same room and spend as much time as possible working on Haiku. It is an opportunity for
collaboration and discussions, which are easier to do when we are all in the same room than through
online mediums.

KapiX hosted us in his apartment in Słupsk, northern Poland. We started on tuesday as we were all
coming from somewhat far away and had to set aside some time for travelling, after the end of the
GSoC mentor summit or other non-Haiku related events (by train for most of us).

We all met in Gdańsk train station and then KapiX drove us to his flat, about 1 hour away. During
this trip we discussed the GSoC mentor summit events, as Waddlesplash had attended it the weekend
before. Unsurprisingly, a lot of the discussions at the summit were about the use of LLMs and how
it affects GSoC and open source projects in general. But we quickly agreed that we have had more
than enough discussions about that already, and that we should try to talk about something else
for the week.

Anyway, enough talking about the setting, let's see what work was actually done!

# ARM port

PulkoMandy is experimenting with a device based on the Allwinner V3s chip for the ARM port. This
is a small chip meant for applications like digital picture frames, and restricted to 64MB of RAM,
making it likely not a very good target for Haiku. However, it has the advantage of being a bit
simpler than other devices. The focus for the sprint was to try to port FreeBSD's driver for the
ethernet controller, which seems to be the easiest way to get a boot partition mounted (through
network booting). Using local storage would require either an USB controller or SD/MMC controller
driver, and would be less convenient for experimenting (network boot allows for very quick
iterations when porting to a new device or writing a driver).

During this work, the FreeBSD network driver compatibility layer was adjusted to handle FDT based
devices (in addition to PCI and USB which it already supports). However, this driver highlights
the limitations of the current approach, as it turns out, porting the network driver itself is not
enough: it depends on other drivers to configure various aspects of the hardware, such as a
"system controller", clock control, and power supplies configuration. Moreover, FreeBSD does not
support the V3s chip that was the target for this experiment. It has a driver for the ethernet part
(which is shared with other chips), but not for the system controller and other parts of the device.

As a result, it would be easier to port the NetBSD driver, and in this case, in the form of a native
driver, rather than writing yet another version of the compatibility layer for NetBSD drivers.

The experiment can still be considered a success: the FreeBSD compatibility layer is ready to receive
other FDT based drivers, and this gives a concrete example of the work needed to support such system
on chip devices, where clock control, power management and GPIO configurations have to be sorted out
before other components of the chip can be used.

This discussion also relates to a pre-existing forum thread about upgrading the device manager,
which should not only solve these problems, but also speed up device enumeration and driver loading
at boot time.

During this work, PulkoMandy noticed that the kernel is making heavy use of PLT on ARM, which seems
unnecessary and results in harder to read assembly code, as all jumps become indirect. Waddlesplash
then reviewed and cleaned up compilation flags to improve this a bit.

# USB_NCM driver

USB_NCM is yet another way to implement Ethernet over USB. It complements ACM, ECM and RNDIS, which
all allow sharing the connection from a mobile phone to a computer over USB.

PulkoMandy had started an NCM driver but it was not finalized yet. During the sprint, the last few
remaining problems were fixed and a comparison with an USB capture from Linux confirmed that the
behavior is the same.

If your phone wasn't recognized for USB tethering before, you may try recent nightlies and see if
this driver fixes the problem for you.

# Dual display support

KapiX decided to have a look at multiple displays support. To prototype that, he used QEMU's support
for multiple displays via virtio graphics, which allowed to work on the app_server side of things
without worrying too much about drivers.

He managed to demonstrate Haiku running on two displays, with a very simplified approach at first:
the displays have fixed resolution of 640x480, and are always located in the same position (display
0 on the left, display 1 on the right). Nevertheless, this initial implementation allows for some
testing and already identified some problems. For example, the input_server prevents the mouse
cursor from moving outside of the first display at the moment.

We could also discuss how to handle displays with different resolutions and DPI settings, the needed
changes in app_server, in the API, and in the accelerant hooks, that would be needed. We also
reviewed the existing code in the screen preferences that drives the old, hacky "multimon" support
available in the legacy Radeon and Matrox drivers. These drivers can surely be adjusted to use the
new, cleaner API when it becomes available.

After and during this work, KapiX and Waddlesplash also worked on improving his development
workflow with QEMU and real hardware. We could test the EFI network booting with an implementation
other than U-Boot, and found a bug with ethernet buffers management. Unfortunately, fixing the bug
appears to have made network booting much slower, to the point that it is not so interesting
anymore to speed up the development workflow.

The investigation into the problems shows that adding a cache to the bootloader filesystem access
wouldn't be very helpful, as it doesn't do that many repeated reads of the same blocks. The other
options are improving the remote disk server protocol to have it use less network packets, or
changing our network booting model to be more similar to the one used by PXE where the needed
drivers are loaded in RAM from a tar.gz archive prepared on the server machine, rather than having
the bootloader access them from the remote_disk_server.

KapiX then went back to QEMU for his experiment. He finished his virtio_console driver which allows
to have a serial port like communication between the device and host machine, that can be also used
as a base for clipboard sharing and other integration protocols. This work highlighted the need to
improve the documentation on virtio, not necessarily because of Haiku specific things, but also
because the official virtio specification is very terse and expects people to already have some
understanding of virtio general principles.

With the QEMU setup working, KapiX then experimented with sharing a graphics card from the host
with the guest machine, so that this setup can be used to work on graphics drivers. He updated the
existing documentation for this setup, and started researching what's needed to support some of
his Intel and AMD graphics cards which are not currently recognized by Haiku.

# Virtio_balloon fixes

Dridiha started exploring various parts of the Haiku codebase, looking for more things to experiment
with after finalizing the first version of the UFSHCI driver (which he had done before the sprint).

He identified some strange behavior in the virtio_balloon driver (which allows to dynamically resize
the RAM of a guest virtualized system), that led to finding and fixing some bugs in the code for
that driver and relaxing its limitations a bit. The virtio_balloon protocol works by exchanging lists
of physical page addresses with the host, which is quite verbose as you have to provide a very long list
of 4 kilobyte pages to make up any significant amount of memory. But it works a bit better now.

# btrfs write support

Dridiha then started looking into adding write support to the btrfs driver. He set up an fs_shell,
and started implementing all the needed operations. btrfs is not the simplest filesystem, and adding
write support will require some groundwork before we can see the first successful write operation
from the fs_shell level.

A lot of the work is reading about btrfs to understand the underlying algorithms and data structures,
which are quite different from what you would find in a more traditional filesystem design.

# i2c touchpad support

PulkoMandy and Korli discussed and explored i2c touchpad issues. A first problem was tracked down
to a bug in the SMBIOS driver when SMBIOS data sin't found, which ultimately caused Haiku's ACPI
implementation to pretend to be Mac OS instead of Windows.

With that fixed, the other part of the work was exploring ACPI resources for touchpads and
identifying how we are supposed to wait for events from the driver. At the moment, our touchpad
driver is continuously trying to read from the touchpad, it should instead use a polling period,
or ideally use an incoming interrupt signal from the touchpad, which in turn can be routed either
directly to the interrupt controller, or through a GPIO controller which would then also need a
specific driver.

With the SMBIOS issue fixed, PulkoMandy could finish his pending patches to the i2c touchpad driver,
which results in it working, but using a lot of CPU because of the lack of a polling delay or
interrupt system. There is also one race condition remaining, with one specific debug trace being
necessary to cause a small delay and make everything work.

# GNU_HASH support in the kernel and drivers

GNU hash is a new format for the symbol tables in ELF files. It provides faster symbol resolution
by the use of a better hash function and of a bloom filter for quickly identifying if an ELF file
contains a specific symbol.

Korli implemented support for this new format in the kernel and drivers, which requires some changes
in the bootloader to handle kernels using that new format.

# General bug fixes and code review

As Waddlesplash had been traveling for a few days, he had not taken a look at recent bug submissions
and incoming patches (and neither had any other devs). So he started the sprint by checking these
and clearing up the backlog of several relatively easy fixes.

Korli worked on various problems as well, including:

- Wrong management of CPU load that led to threads not being migrated to other CPUs when they should,
- Better handling of errors in unlock_memory_etc and bugfixes in the set_memory_protection syscall, with accompanying test,
- Change the behavior of segmentation faults and other signals when the applications configures itself to ignore them. The POSIX specification says that the behavior is implementation specific, but in Haiku we were getting an infinite loop as the failing operation would be retried over and over again. Now the signal will be delivered and stop the application with the expected crash dialog.

# Use of Windows hypervisor with QEMU

Waddlesplash experimented with using the Windows hypervisor to accelerate QEMU. This setup results
in the Haiku guest crashing, but also there isn't currently a way to attach a debugger to investigate
the problem. He then moved his setup for cross-development from Windows to instead use a KVM based
QEMU inside WSL2.

# Live font updating

For some time now, Haiku is able to update colors in the entire user interface in real time when
they are changed in user preferences. This provides immediate feedback and removes the need to
restart applications or the entire system when changing settings.

Waddlesplash started experimenting with doing the same for font and font size updates. The initial
implementation is working, but there will be more work to resolve all edge cases. This is made
more difficult by the direct access to BFont object for the system fonts, which, until now, were
considered immutable and could not change during the application lifetime. We discussed various
options to keep these changes as transparent as possible to existing apps without creating
unexpected situations.

# Legacy hardware support

Zeldakatze brought some old laptops, a Pentium II based one as well as a PowerPC Macintosh.
These machines are a good way to test old drivers as well as identify performance problems that
are less obvious in modern, faster systems.

This led to investigating a hang in the kernel low memory handler (fixed with Waddlesplash's help),
and fixes in the Neomagic graphics driver that had not been tested on real hardware for some time
and was broken due to a previous refactoring. Looking at the Neomagic graphics driver sourcecode,
Zeldakatze also found some BeOS R4.5 compatibility code that wasn't necessary anymore, and removed
it, as well as identical code found in the Matrox, NVidia and VIA drivers, as they were all built
from the same driver template.

# Shutdown and power saving support

Zeldakatze experimented with power management support on old (pre ACPI or early ACPI machines).
She could put the computer to sleep, but then it turns out that the more difficult problem is waking
up and resuming operations. On these older machines, this requires installing some code specifically
in the first megabyte of memory, where it can be found by the BIOS while running in "real" mode.

Waddlesplash looked at shutdown, where the Haiku kernel just stops all applications, then powers
the machine down. This is missing steps to unmount all disks cleanly, and shutdown all drivers
by calling their shutdown hooks.

However, implementing this revealed some resource leaks that means some file systems remain referenced
and in use after all applications are closed, making this process fail to complete. This led to a
review of the VFS and FD management code, which ultimately concluded that the bug doesn't seem to
be at that level.

# Chipass haikuports recipe

Zeldakatze worked on finishing the recipe for Chipass, an LLM-free fork/replacement for Keepass.
It is now available in Haikudepot and can replace Keepass (the keystore and configuration files are
compatible).

# Build system improvements

Waddlesplash also fixed the build when building Haiku by reusing the host's Haiku build tools instead of compiling new
ones. This setup saves a bit of time, but due to slightly different configuration of the tools, it's
not possible to build the 32-bit bootloaders from a 64 bit system in this setup. This used to make the
build fail, now the bootloader will simply be missing from the generated image (which is not a problem
if you are using this to update a working system, or if you are booting from EFI).

# Stability improvements

It wouldn't be a good coding sprint without a completely unexpected kernel crash prompting a debug
session. This time the opportunity came from Zeldakatze's machine, which triggered a VFS crash
in the EXT2/3/4 driver. Waddlesplash and Korli both reviewed the code, and after some incorrect
initial diagnostics, finally found the root issue and prepared a fix.

Another problem came from outside the sprint, as one of the Haikuports builders crashed with a
problem not seen before. mmlr sent the stacktrace to waddlesplash, who could then develop a fix for
the problem.
