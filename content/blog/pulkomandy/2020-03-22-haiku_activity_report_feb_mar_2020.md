+++
type = "blog"
title = "Haiku activity report - February and March 2020"
author = "pulkomandy"
date = "2020-03-22 10:14:07+02:00"
tags = []
+++

Hello!

The previous report involved a lot of travelling around and attending various
events and conferences. This month is quite different as some of us are locked
home due to the ongoing pandemic. We already know some of the next planned
events such as the JDLL and FLISOL are cancelled (for good reasons).

Anyway, the activity on Haiku has not slowed down, so let's see what's happening
there. This report covers hrev53875-hrev53995.

<h3>Unit tests</h3>

Kyle Ambroff-Kao continues the work on fixing and improving our unit tests.
The focus is currently on tests for the network kit, with a rework of the HTTP
tests to not rely on external servers, and instead run a local one using
Python.

<h3>Media and Audio</h3>

Korli fixed some issues in the media kit related to buffers ownership, making
things more reliable and fixing the crashes on shutdown for good.

He also updated the HDA driver to handle some "quirks" (that is, workarounds for
hardware that does not fully follow the HDA specification), extracting the
needed information from the ALSA Linux driver.

<h3>Bootloader</h3>

Kallisti5 worked on various bootloader things, fixing the generation of the
PowerPC bootable CD (the PowerPC still is not in an usable state, but at least
we can test it, now), added a volume icon to the EFI system partition so it
looks nice in Apple machines boot menu, and reworked the EFI code to not be
specific to Intel CPUs. The goal here is to reuse the EFI code also for ARM64
and possibly ARM, since U-Boot and other firmwares are standardizing on
providing the EFI API there.

We had problems getting the ARM port to run because U-Boot is a very minimal
bootloader, it only runs our executable and lets us figure out the hardware.
This means the bootloader would need to handle many platform-specific things,
such as UART drivers, framebuffer, etc. EFI on the other hand provides us with
a way to call back into the firmware and get it to do all that hard work for
us. It makes it significantly easier to get the bootloader up and running, and
pushes back the hardware-specific problems to the kernel (which can't call the
firmware after it starts handling the hardware by itself).

Kallisti5 also worked a bit on Risc-V support, but that will probably be
seriously worked on only after we get ARM64 running.

PulkoMandy received new SPARC hardware donations which led to various fixes to
the SPARC and OpenFirmware boot code. The openfirmware bootloader now manages
to find the network disk server, mounts the BFS and PackageFS inside it, and
starts to load the kernel. It should even be possible to attempt booting from
disk, as the openfirmware allows our bootloader to access disks without needing
custom drivers. This work also helps reviewing code common with other
architectures and led to at least one fix for the EFI bootloader as well.

<h3>Kernel and drivers</h3>

Korli implemented getting the current CPU number from the rdtscp instruction
on x86\_64 machines.

waddlesplash improved the handling of the KDL shortcut to make it work on PS/2
keyboards that don't properly implement the SysRq key (which has very special
handling in PS/2) and instead report a normal Print Screen press.

waddlesplash continues his work on XHCI and USB stack to improve compatibility
and fix bugs. He also improved the NVMe driver to use interrupts instead of
polling.

PulkoMandy continues working on the Intel grpahics driver, with some fixes for
SandyBridge cards, which should eventually lead to dual screen support (but we
are not quite there yet).

Korli improved the ACPI battery driver to handle "_BIX", which is a different
way to get the battery information. He also is working on loading microcode
updates at boot for Intel CPUs, but not all of the changes have been merged
yt to make this available.

Korli also implemented getting the MTU from virtio network interfaces.

<h3>User interface</h3>

X512 reworked the window focus handling in Tracker, fixed Haiku3D to render its
textures again; and fixed movement of the teapot in GLTeapot, as well as fixed
drawing glitches in replicants and flickering issues in various other places,
making some controls behave more closely to the BeOS version in small (but
nonetheless important) details.

X512 also reworked BMenu code to simplify it, and fixed some longstanding bugs,
for example with the "navigation area" handling which allows one to reach a
submenu without accidentally selecting other menu items. Eventually this
allowed to remove a now useless delay in opening menus, making them feel faster.

John Scipione reworked the Deskbar to fix various glitches and issues, reworked
the auto-raise and auto-lower code to be less annoying, and finally adding a
new mode for DeskBar where it shows as much information as possible while
using only a single "line", that is, fitting in the unused space at the right
of window tabs.

X512 also worked on Deskbar, adding new shortcuts: middle-click on an
application in the task list will open a new instance of it, and
shift + middle click will terminate the application.

There is ongoing work on menus from both X512 and John to allow better handling
of dynamically generated menus, improve scrolling when menus are too large to
fit on screen.

Preetpal Kaur fixed the layout of the default and revert buttons in Input
preferences to be consistent between all devices, and made the whole window
better handle different font sizes.

<h3>runtime_loader and application roster</h3>

waddlesplash reworked the termination functions handling. This is code in the
runtime\_loader that automatically calls destructors for statically allocated
objects, and similar functions. There is a very specific order in which these
functions must be called, and the way they are stored in the executables and
libraries changes with different gcc versions, so we have to implement this
carefully. He also fixed a memory leak.

PulkoMandy fixed a regression in the runtime\_loader that prevented running
single-instance apps from a symlink. A second instance would be started instead.

<h3>Applications</h3>

The Installer finally handles "optional packages" again. This functionality had
been lost with the introduction of hpkg-based packages, and it was a problem
because having lots of packages mounted prevents Installer to succesfully
install the system on low-memory systems (less than 256MB of RAM). This makes
it possible to move the source packages and some development packages out of
the live DVD/USB, but still have them available for installation.

CodeForEvolution added new scripting commands to MediaPlayer to allow
retrieving the current track number in the playlist.

<h3>PVS and Coverity scans</h3>

A new Coverity scan has been done. MT investigated some of the problems found
by either Coverity or PVS and fixed issues like missing NULL pointer checks,
memory leaks and allocator corruptions.

<h3>Documentation</h3>

Nielx updated our API documentation to the latest Doxygen version and fixed
some markup issues that lead to broken rendering of affected pages.

He then worked on documentation for BNotification, BKeyStore, and the old
layout builder classes.

<h3>app_server</h3>

Pascal Abresch fixed the font fallback system, which had been broken after
switching to Noto as the default font, because Noto is actually a set of
multiple fonts, making the code a bit more complex.

waddlesplash reviewed and simplified the BRegion code.

<h3>Filesystems</h3>

X512 added support in BFS for deleting corrupt files. It would otherwise not
be possible to do anything with them, and they would stay there forever.

Google Summer of Code students are also already starting to contribute, and
this month the first few lines of code for XFS filesystem implementation were
merged.

<h3>Cleanup</h3>

Not every code cleanup can be mentionned, but let's note the removal of
"atomizer" (an example kernel module that had been imported from a Be Newsletter
article and never used for anything), removal of deprecated C++ features
(auto\_ptr) and multiple implementations of hash maps (standardizing on a
single one instead), all done by waddlesplash.

Kyle Ambroff-Kao removed the "makeudfimage" tool which was not used in Haiku,
and for which 3rd party replacements are already available.
