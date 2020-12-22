+++
type = "blog"
title = "Haiku activity report - November and December 2020"
author = "pulkomandy"
date = "2020-12-22 10:53:07+02:00"
tags = []
+++

Welcome to the November-December activity report!

This report covers hrev54716-hrev54805 (about 5 weeks of work).

<h3>Code cleanup</h3>

mt fixed various warnings, use-after-free, memory leaks, and dead code problems detected by the clang static analyzer.

X512 reworked app_server memory management to use owning pointers and avoid some
memory leaks and use-after-free cases. This led to a rework of the classes used for that
purpose, in particular AutoDeleter and its variants, to be more efficient and more flexible.

kallisit5 fixed a crash in the icon-o-matic save panel.

PulkoMandy fixed an ABI problem that resulted in crashes for the 64bit version of Wonderbrush.
Wonderbrush is now available in HaikuDepot for 64bit systems.

<h3>System APIs</h3>

waddlesplash added support for B_CURRENT_TEAM and other constants to create_area_etc,
making it easier to use for apps that want to create an area for themselves.

X512 added an API to get the parent PID of any given process, which allows to
build a tree of all system process (for utilities like pstree on Linux).

<h3>User interface</h3>

PulkoMandy fixed a graphic glitch in Tracker list view caused by a missing rounding.

Skipp_osx improved the behavior of BTextView that has some problems after recent refactorings.

nephele reworked the handling of menu colors in the haiku control look to better work in dark mode.

nephele and PulkoMandy modified the algorithm to decide the text color on the
Desktop and in other Tracker windows. Now the document background and foreground
colors are used by default, and the text automatically switches to white or black
when needed to make sure the text remains readable with a custom background color
(for example on the desktop).

Maximo Castañeda fixed the font fallback system, which was completely broken.
With the Noto fonts, this allows things such as the "return" or "backspace" key
symbols in keymap preferences and menus to show again, and fixes issues with
mixed latin and ideogram scripts in the same text. PulkoMandy added the
Noto Sans Symbols 2 font to the fallback system for even more complete support
of unicode symbol glyphs, making it easy to get mathematical symbols and so on.

PulkoMandy set a minimum size for scrollbars, which now scale with system font
size, but were too small with the smallest font settings.

kallisit5 updated the Bloetooth preferences to report the bluetooth version
of devices (it did not know any version past 2.1 and we are now at version 5.2).

Humdinger improved the introduction text in installer.

roired added a layout for the X-Bows Nature keyboards to keymap preferences.

<h3>ARM port</h3>

tqh and kallisti5 are working on the ARM port. The bootloader is now running
mostly fine in UEFI mode but there is some work to be done to set up the MMU before handing
control over to the kernel. There are problems related to the "hardfloat" and
"softfloat" ABIs on ARM, however. Until now we had worked with the "hardfloat"
ABI for Haiku, assuming floating point hardware was available (as is the case
on any modern CPU we could reasonably target). However, the EFI firmware does
not properly handle these registers, and this seems to result in some confusion
when passing data to and from the firmware. We may need to build the bootloader
in soft-float mode (not using the hardware floating point processing), but that
in turn creates some difficulties with properly configuring gcc.

On 64bit ARM, the floating point support is not optional, so it may be easier to
move forward with the 64bit port first.

<h3>POSIX compatibility</h3>

Korli added utmpx.h, tcsetsid, and fixed the definition of O_DIRECT.
He also added LOG_PRIMASK and LOG_PRI macros to syslog.h.

PulkoMandy (with help from korli and mmlr) implemented mlock and munlock.
These functions are used to lock memory and prevent it to be moved to swap space.
This is useful in security applications (gnutls, openssl, ...) to make sure
that secure data remains only in RAM and is not accidentally written to disk
where it would be easier to extract it.

<h3>Networking</h3>

PulkoMandy reworked the way certificate directories are managed for BSecureSocket and openssl.
Now, BSecureSocket uses the directories defined by openssl instead of overriding them. And
openssl is adjusted to include a non-packaged directory, allowing users to install their
own customized certificates and use them in native Haiku applications.

Korli improved support for multicast, fixing various problems in the IPv4 stack.
This work is still ongoing, but will eventually allow support for mDNS / bonjour,
a protocol used in particular to detect printers on the network.

kallisti5 and Mitsunori YOSHIDA fixed some issues in the NFS filesystem drivers.

kallisit5 also improved the services kit API for HTTP upload to allow for progress reports.

<h3>Mass storage</h3>

korli changed IOCache to make sure the buffer and size passed to the lower layers
exactly match. Before this change, it was possible to provide a buffer larger than
the size, with the extra space being unused. But that would confuse some drivers,
which want to make sure they wrote exactly as many bytes as requested.

Some changes to the XFS filesystem by CruxBox were merged, but a lot of the work is still waiting for review on Gerrit.
This work was done during this summer as part of GSoC.

PulkoMandy worked on the mmc/SD drivers, of which a part have been merged.
The patches enabling read and write support are however still waiting for review.

<h3>Sound and media</h3>

Maximo Castañeda fixed problems related to sound output in the game and media kits:
BFileGameSound would play garbage from an uninitialized buffer at the end of the file,
some sliders in media preferences had an incorrect range. The game kit code for pausing
and volume ramping was also not working very well, and the unsigned 8bit sound format
was broken.

Jaidyn Ann changed the behavior of MediaPlayer playlist to not automatically sort
the playlist when adding files by drag and drop. The old behavior of sorting the files
is preserved if you use shift + drag.

<h3>Drivers</h3>

Lt-Henry fixes the ACPI thermal driver, which can now be used to read the motherboard and CPU temperatures.

kallisti5 fixed the GLInfo application which reports information about OpenGL support.
