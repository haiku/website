+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 03 and 04/2019"
date = "2019-05-01T10:52:44.000Z"
tags = []
+++

<p>Hi there! We're back for monthly (or almost) reports! I was at the JDLL in
early april, and while preparing for that I didn't have time to write a report,
and no one else did it. So here we go with a 2 month report, prepare for something
a little longer than usual. This report covers hrev52945-hrev53094.</p>

<h3>Code cleanups</h3>

<p>mt fixed various places where -Werror=class-memaccess was breaking the build.
These are cases where we initialize a C++ object with memset, which is normally
not allowed. Usually this does not result in too much problems, but it could
bite us if we made the objects more complex later on.</p>

<p>He also reviewed several of the results from the PVS studio analysis, and
made fixes for the ones that pointed to actual bugs.</p>

<p>waddlesplash fixed various issues related to endianness management, unused
fields, a few cleanups in the buildsystem, and a lot more. He also removed
some remaining support for building parts of our code for BeOS or Zeta, which
we don't really need anymore, and removed support for "version 1" hpkg files
(we have never released any version of Haiku using it, the current format is
version 2).</p>

<p>Lee Mon ran parts of the code through cppcheck and fixed various warning found by the tool.</p>

<h3>New architectures</h3>

<p>PulkoMandy got the sparc build as far as bootstrapping a complete boot image.
The next step is getting the bootloader to actually run on the hardware.</p>

<p>Kallisti5 made some progress on getting the RISC-V build up and running as
well, work is currently in progress to backport RISC-V floating point math
support into our C library.</p>

<p>The work on both architecture also led to cleanup of various endianness problems,
as well as merging some old patches improving PowerPC support, and a cleanup of
the floating point support in the C library - but much remains to be done.
Waddlesplash was also involved in reviewing the changes and cleaning up the
use of byte swap functions to have a single implementation for them.</p>

<p>Along the way, fixes were also made to the bootstrapping support, making it
a little easier to use. This may be needed whenever we decide to have a major
ABI breakage and need to rebuild all packages from scratch.</p>

<p>mmu_man made it easier to build "big endian BFS" for x86 machines. This makes
it possible to mount PowerPC formatted BFS volumes on an x86 machine. For
performance reasons, the Be filesystem uses the native endianness of the machine
it runs on, and therefore there are two variants of the on-disk format.

<h3>Command line tools</h3>

<p>Andrew Lindesay fixed the output of pkgman --help.</p>
<p>mmu_man added support for webloc files to urlwrapper.</p>
<p>The in-tree implementation of uptime was broken, we are now using the one from GNU coreutils.</p>

<h3>Drivers</h3>

<p>Greg Crain improved timeout management in the XHCI driver.</p>
<p>Waddlesplash also put a lot of work into XHCI, fixing many issues and reworking
large parts of the driver, making it behave a lot better on most machines.</p>

<p>Thanks to Waddlesplash we also now have an NVMe driver, based on the existing
libnvme library. NVMe is a new way to connect SSD disks directly to the PCIe bus,
avoidsing much of the overhead and complexity of SATA.</p>

<p>Waddlesplash made the "disable user add-ons" setting also ignore files in
non-packaged, making it less risky and easier to test drivers by putting them
there.</p>
<p>He also fixed an issue in the BIOS bootloader, which would confuse some BIOS
versions by adding an extra field in requests to read data from disk. This should
fix booting with these picky BIOS implementations.</p>
<p>Waddlesplash also fixed the usb_audio driver for SMAP, so at least it won't
immediately trigger a kernel panic.</p>

<p>korli made minor fixes to the HDA driver.</p>

<p>PulkoMandy fixed timeout handling in the DHCP client, which would have trouble
synchronizing in some cases as it would timeout immediately and send a lot of
bogus packets to the DHCP server. This was especially visible on busy public networks.</p>

<p>SuperPower fixed the intel_extreme driver for the GMA960 chipset, where there
was some confusion about the use of video modes extracted directly from the video
card BIOS.</p>

<p>Calvin Hill added missing USB IDs in the Wacom tablet driver.</p>

<p>Les De Ridder and Hy Che worked on the btrfs code, cleaning various parts of
the code and adding initial support for initializing btrfs volumes.</p>

<p>mmu_man added a work in progress driver for TUN/TAP devices, which will eventually
allow support for VPNs, as well as sharing network interfaces with virtual machines running inside Haiku, when we get to that.</p>

<p>jessicah reworked the driver loading code in the bootloader, fixing a compatibility issue
with the UEFI implementation in VirtualBox.</p>

<p>waddlesplash synchronized some network drivers with the FreeBSD implementations.</p>

<h3>Tests</h3>

<p>Often an overlooked part of our codebase, tests are very useful to make sure
things continue working as expected. They allow to cover specific use cases for
the API, hopefully in a way that makes them easy to debug.</p>

<p>korli reworked some tests for dlopen support in runtime_loader.</p>

<h3>POSIX compatibility</h3>

<p>korli added various common pthread API extensions: pthread_attr_getstack,
pthread_attr_setstack, pthread_getattr_np. These will ease porting of software
written on Linux or BSD, since we now have similar APIs.

<p>He also worked on improving fcntl and in particular the support for duplicating
file descriptors.</p>

<h3>Applications</h3>

<p>Andrew Lindesay made some fixes to the buildsystem, making sure a version of
python is available before trying to use it.</p>

<p>mmu_man re-added AutoRaise to the image, it's a DeskBar add-on that will
automatically raise the active window to front after a short delay. This can
be useful for focus-follow-mouse users who do not want to manually raise windows.

<p>CodeForEvolution added a check in BPackageRoster to determine if a reboot
is needed after updating packages. SoftwareUpdater can now make use of this
and notify the user accordingly.</p>

<p>Jakob L Kreuze added support for M3U playlist in MediaPlayer.</p>
<p>Humdinger fixed some unusable keyboard shortcuts in Magnifier (they were
in the user guide, but did not work. This shows the need for a QA team doing
regression tests).</p>

<p>Waddlesplash fixed the launch process dependencies so that the system clock
is synchronized as soon as the network is up. No more offset clocks!</p>

<p>mmu_man made it possible to run multiple instances of GLTeapot. If you were
looking for an exciting demo of our software 3D rendering capabilities, this is it.</p>

<p>Some very old patches from Dancsò Ròbert were finally merged, bringing some
new functionalities to DriveSetup. These were submitted as a large patch with
many features and also several coding style violations. PulkoMandy split it into
smaller parts to ease reviewing. If there is a single disk on the system, it is
now enabled by default. A new menu allows to easily open a partition in DiskProbe
for inspection.</p>

<p>John Scipione added right click and middle click emulation to the default
window behavior, making it easier for users with 2 or 1 button mouse and touchpads
to get around the system.</p>

<p>Preetpal Kaur made the touchpad preferences disable itself when there is no
compatible touchpad found on the system.</p>

<h3>Debugging tools</h3>

<p>mmu_man added a "catarea" tool, allowing to peek at the content of a
particular area. Areas are shared memory allocations, to which any program may
get access, given that it knows the identifier for the specific area. This
allows sharing data between running programs in a very efficient way, since no
copy of the data is needed.</p>

<p>Waddlesplash added and reworked various error checks in the kernel locking
primitives, searching for a hard deadlock of the system where it wouldn't
even be possible to enter KDL.</p>
