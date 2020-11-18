+++
type = "blog"
title = "Haiku activity report - October 2020"
author = "pulkomandy"
date = "2020-11-16 10:14:07+02:00"
tags = []
+++

Welcome to the October activity report!

I had managed to get other people to write the report for a few months, but
not for October, apparently. So, I'm back!

This report covers hrev54609-hrev54715 (about a month and a half work).

The focus is not much on new and exciting features this month, there is a lot
of bug fixing and cleanup work going on, as well as some performance improvements,
and compatibility fixes for easier application porting.

<h3>Code cleanup and other invisible changes</h3>

Korli has added support for detecting several CPU features (instruction set
extensions) which were added by Intel and AMD over the last few years.

Kallisti5 reworked the options to the configure script which were a bit confusing
since the introduction of hybrid builds (yes, that was about 10 years ago). Now
the path to the buildtools repo and the architectures to build for are specified
in two different options instead of being somehow merged into one.

mt has run the code through the clang static analyzing tools and is fixing many
small issues in the code, such as insecure printf format strings, dead assignments,
and various other things. The code will be more safe and will have less warnings.

Waddlesplash fixed the code to detect the gcc version to handle gcc 10 as a version
newer than 2 (it was only looking at the first character of the version and thinking
it was gcc1). He also fixed an issue in the stdbool.h implementation for gcc2, to
make sure it can be built with modern compilers.

Waddlesplash finished the work to relicense ProcessController under the MIT license.
All people who had contributed to work on the tool agreed to relicense their work,
except one. The remaining bit of GPL code (it was a trivial bugfix) has been
removed then reimplemented independently under the new license.

Leorize made the BUrlRequest constructor private, as it should have been.
Requests should be created only by the BUrlProtocolRoster. Enforcing this
will make it easier to migrate to his new services kit implementation, when
it's ready.

Kallisti5 fixed build of Haiku from a Linux install using gcc10.

apl continue his work on HaikuDepot with various code cleanups and optimizations.

Kyle Ambroff-Kao fixed Autoraise's icon loading.

Mark Barnett fixed the makefile_engine to allow building drivers for 64bit haiku.

Korli fixed a panic at boot on some CPUs where the XSAVE context length could
not be detected. We now use a safe default value in that case.

<h3>Documentation</h3>

Humdinger fixed typos and did some rewording in the Haiku Interface Guidelines.

Adam Fowler contributed some documentation for the accelerant interface.

Nielx continues his work on filling in the haiku book, with documentation for
BControl, hiding some private APIs that were not meant to be in the book (yet),
and added doxygen files for generating the internal documentation (meant to be
used as a reference by OS developers, but that would go too far into internal
details for someone looking into just using the APIs to write an application).

<h3>POSIX compatibility</h3>

korli added the dprintf function, which allows to do formatted prints directly
into a file opened with an unbuffered file descriptor (from open), similar to
fprintf (which works with files opened with fopen instead).

This had not been done before because the name of the function is conflicting with
our kernel debug function (also named dprintf, but doing a different thing).
The POSIX dprintf is not available in kernel mode, and various pieces of code
that can be built both for userland and kernel have been adjusted.

korli also added _SC_TTY_NAME_MAX to the supported sysconf parameters, added
tcgetsid, fixed the definition of in6_addr, improved strace output for termios
ioctls, and relaxed some checks in handling of network ioctls to fix
incompatibilities with old OpenJDK versions. He also fixed handling of O_APPEND,
added aligned_alloc (as specified in C11), made fsync() return EINVAL on fifos,
and moved asprintf and vasprintf to BSD extensions as they are not part of POSIX.

<h3>Graphics and app_server</h3>

Korli added a way to create a BCursor from an arbitrary BBitmap, allowing for
larger cursors (needed in Qt applications that use large custom cursors, for
example). The existing APIs allowed only fixed size bitmaps of 16x16 pixels.

John Scipione continues his work on the BeControlLook, making Haiku look
pixel-for-pixel identical to BeOS for maximal compatibility.

X512 fixed a drawing glitch in menus when their content is changed while they
are open.

<h3>Drivers</h3>

Korli added support for more devices to the i2c and thermal drivers, allowing
to access motherboard and CPU temperature information.

PulkoMandy fixed a bug in the USB HID driver that would lead to USB mouses
being listed as both a mouse and a keyboard in input preferences.

Anarchos fixed the handling of the Pause key on PS/2 keyboards.

X512 made several drivers properly report their names in the Devices preferences.
The plan is to reliably report in Devices preferences if a particular device
has a loaded driver or not.

<h3>Filesystems and storage</h3>

Parts of this summer GSoC work from cruxbox (on XFS) and Suhel Mehta (on UFS2)
were merged. The filesystems are still not quite ready for day to day usage,
however.

PulkoMandy's work on MMC and SDHCI (for eMMC and SD cards) has been merged but
is still incomplete and not enabled by default.

Korli added posix_fallocate with the matching syscall to preallocate disk space
before writing it, and also added an implementation for SEEK_DATA and SEEK_HOLE
in lseek.

kallisti5 changed the write() implementation to allow 0-byte writes, as needed
by the Go port.

<h3>Installer</h3>

Installer can be used again to erase an existing install while preserving user
data and settings. This can be used to restore an unbootable system while keeping
the user data.
