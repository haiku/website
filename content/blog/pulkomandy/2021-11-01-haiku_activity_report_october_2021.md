+++
type = "blog"
title = "Haiku activity report - October 2021"
author = "PulkoMandy"
date = "2021-11-01 08:53:07+02:00"
tags = ["haiku", "software", "activity report"]
+++

Hello there, it's time for the monthly activity report!

This report covers hrev55452-hrev55608.

<h3>Kernel</h3>

Waddlesplash made the kernel always build with gcc8, even on 32bit systems. It was built with gcc2
until now, but it was not possible to use BeOS drivers anymore since the introduction of SMAP and
other features, which led to slight changes in the driver ABI. No one complained, so there is no
reason to preserve BeOS driver compatibility further. This should result in performance improvements
for 32bit installations, as the new compiler is much better at optimizing code. And it will allow
kernel developers to use more modern C++ features.

Korli made some optimizations to syscall entry and exit, where the manually written assembler code
had some useless synchronization instructions (needed only for hardware interrupts and not for
syscalls).

<h3>Code cleanups</h3>

Korli fixed warnings in video_producer_demo.

Waddlesplash made Keymap preferences and Virtual Keyboard share their code for displaying a keyboard
on screen. The code in Virtual Keyboard was initially a copy of the Keymap one, but they had
diverged from each other.

Waddlesplash made the syslog and power daemon and mount_server use the BServer class to establish a
link to app_server. This helps making the boot process more reliable and removes some unneeded
dependencies between services. He also reworked the launch daemon to fix an issue where the desktop
would sometimes not start at all.

Cassisian, Coldfirex and MT continue their work to fix compiler warnings in all parts of the code,
this month looking into the network stack, EFI bootloader, netfs, media plugins, translators, the
kernel, drivers, and many other places.

PulkoMandy unified the way to define weak symbols, aliases, hidden functions, etc in a single place.
Previously, very similar macros were defined and used in several different places where weak symbols
were needed. The common macros include support for gcc2 (which does not directly support all of
this, but it can be done with some inline assembler).

PulkoMandy also improved the error message from runtime_loader when a library cannot be found. It
now tells which other library tried to load it, which helps when debugging unwanted dependencies.

<h3>Packaging reorganization</h3>

Waddlesplash moved the translators and media add-ons in a separate package from the main haiku one,
and simplified the package declaration in Haiku to avoid duplicating some informations for all
architectures, and also moved wifi firmwares outside of the Haiku packages (they are still
preinstalled, but in a different package that will be regenerated and updated a lot less often,
saving on download times for updates).

nthello made the flat control look available in the haiku_extras package. If you think the default
look has too much gradients and 3D effects, you can try this one as an alternative.

Waddlesplash updated the build package repository to enable libavif (used by the AVIF translator)
and ZSTD. ZSTD will replace zlib as the default compression algorithm for hpkg files, making them
smaller and faster.

<h3>Tests and Tools</h3>

Waddlesplash added a copy of the sources for Container and ShelfInspector, useful utilities for
testing replicants without adding them to the desktop. They allow to run a replicant in a dedicated
window. Various implementations of this exist since BeOS days, but none had been included in Haiku
sources so far.

AGMS imported in Haiku the os-prober scripts used on Linux to detect and add Haiku to GRUB
automatically. These were only available in Debian bug tracking system and Debian had never merged
them, and the information was not well known. Now they are easier to find on our side, and
hopefully Debian will soon merge them in the official releases of os-prober.

<h3>Drivers</h3>

Rudolfc continues his work on improving the intel video driver:

<ul>
<li>Fixes to screen panning on older generation of devices,</li>
<li>Fixes to "cloned accelerants" (applications making use of the accelerant
directly without going through app_server, for example by using BWindowScreen),</li>
<li>Allow using custom refresh rates (the driver would always force a standard one before), with fixes to the allowed frequency ranges (we used the ones from Intel documentation, but that does not always match the hardware, so we now use the ones from the Linux driver)</li>
<li>Progress on support for modern Skylake and Haswell chipsets</li>
</ul>

Waddlesplash fixed some bugs in the handling of fragmented USB transfers, fixed some locking
problems in the XHCI driver,

Waddlesplash also worked on the NVMe driver, with some rework of interrupt handling, optimization
of transfers when the memory buffers passed by userspace are already aligned, and better use of
multiple threads. This should make the driver both faster and compatible with more hardware.

Korli fixed SMAP errors in the USB mass storage and the matrox graphics driver.

Kallisti5, Coldfirex and jessicah made some small improvements to the Intel HDA audio driver.

PulkoMandy reviewed the code for TTY handling and made some progress to re-unify the tty driver
(used for pseudo TTY and Terminal) and the tty module (used by physical serial ports). Analysis
of the code allowed to identify some locking issues in the tty module that were resulting in a
kernel panic when using serial ports.

Korli reworked the handling of TCP options to put them in the same order as other operating systems.
In theory this shouldn't matter, but some implementations of TCP are not expecting options in a
different order. Thanks to Sikk who provided a detailed analysis of the problem in a bugreport.

Korli also added support for MSI-X interrupts that have a 64bit PCI BAR address.

Waddlesplash split the VESA and Framebuffer driver and accelerant into two separate drivers and
accelerants. They had been merged together to be used as the "default" driver, but the VESA driver
will become more advanced and the two drivers did not actually share a lot of code.

Waddlesplash also started synchronizing network drivers with FreeBSD 13.

Kallisti5 made some improvements to the Radeon HD driver to support some newer cards.

<h3>Applications</h3>

Andrew Lindesay continues improving HaikuDepot, this month fixing the language filtering used to
show software reviews only in languages the user can understand, and adding a column showing
when a package was last updated.

Coldfirex updated the thttpd server used by Poorman to the latest version.

KapiX improved caching of song durations in the MediaPlayer playlist window for files stored on
disks where the duration can't be stored as an attribute (read-only or using filesystems without
attributes). This makes it possible to scroll the list without lag in that situation.

Felix Ehlers improved the hexadecimal viewer in DiskProbe to tint each row differently and add some
vertical bars to visually separate data.

PulkoMandy released a new version of HaikuWebKit (including work by nephele, madmax and waddleplash)
which should improve performances and fix several crashes.

<h3>Non-x86 Ports</h3>

Some more patches from X512 for the RISC-V port were merged, with some linker script fixes, a fix
for a crash when threads terminate execution,

tqh is working on bringing up the kernel on ARM64.

David Karoly fixed various issues in the ARM (32bit) port and got the kernel starting again. This
involves cleaning up the early boot process, adding some support for the ARM MMU and handover from
the EFI bootloader to the kernel, fixes to linker scripts, more complete handling of ARM specific
ELF sections, and various other problems.

Waddlesplash started working on enabling the bootloader to use either a text console (serial port,
or textmode on a VGA display) or a framebuffer with direct pixel drawing. On some ARM machines there
may be no native textmode, and so only the framebuffer version could be usable. This could also
work nicely on sparc, where a textmode is available but is a bit limited (no color support, no
arrow keys to navigate the boot menu).

PulkoMandy made some progress on the SPARC port, with early work on MMU support. Unfortunately on
SPARC, the MMU was changed several times accross different CPU generations, and it is a quite
simple design which requires a lot of software support. This means the first step to get anything
done is to have the kernel handle the "traps" (exceptions) generated by the MMU to feed it with
the correct data. But since the kernel runs in virtual memory, it needs the MMU to be working.
While this is all possible to do and planned in the SPARC architecture design, it requires lots of
specific code for the initial setup (locking certain memory areas in the MMU to make sure the
trap handler and the data it needs is always mapped in). Some of this code must be written directly
in assembler, making this a not so fun step for the SPARC port of Haiku.

<h3>Servers and libraries</h3>

Korli added some initial support for the newly introduced RGB48 and RGBA64 colorspaces to app_server.

tqh added some function annotations to let gcc know that certain functions return pointers always
aligned to some multiple of 2 bytes. GCC can use this information to generate faster code, for
example using SSE2 instructions that require such an alignment.

Madmax improved the handling of clipping and reverse clipping in app_server.

Korli added some missing posix errors in Errors.h. Waddlesplash removed the B_FILE_NOT_FOUND error
code from the Storage Kit, that had been deprecated in BeOS R5 and replaced with the more general
B_ENTRY_NOT_FOUND.

John Scipione added methods in BMenu to sort and swap items without deleting and recreating them.
These are used to sort the list of wifi networks in network preferences (the way it was done
previously could delete items while the menu was open, causing a crash).

Waddlesplash (after some discussion with X512, kallisti5 and PulkoMandy) removed some custom memory
copy functions from app_server. They were introduced to workaround limitations of the AGP bus and
are not needed anymore, especially as our implementation of memcpy should now perform just as well.
