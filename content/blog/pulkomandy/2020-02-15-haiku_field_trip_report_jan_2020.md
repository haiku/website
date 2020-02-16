+++
type = "blog"
title = "Haiku field trip report - January 2020"
author = "pulkomandy"
date = "2020-02-15 12:14:07+02:00"
tags = []
+++

Hi there!

It's time for the monthly report for January (and half of February as well).
This report convers hrev53715-hrev53874 and some real world activities.

<h3>Unit Tests</h3>

It's about time the unit tests for Haiku get some serious attention and fixes.
Kyle Ambroff-Kao is currently working on them and fixing various issues.

This month he fixed problems in the app and support kits tests, identifying
deviations fro, BeOS, some on purpose, some that could be regressions.

This all started from investigation of a KDL caused by gnupg using the same
socket twice with different addresses, a test case for that was added and the
bug identified and fixed.

<h3>Interface Kit and app_server</h3>

X512 is investigating multiple issues, this month fixing drawing glitches in
BDragger and cleaning up code in applications that attempted to workaround the
drawing glitches.

PulkoMandy (working from a very old patch from Ryan Leavengood) reworked the
alignment of shortcuts and submenu arrows in Menu, to be more aligned and
visually pleasing.

<h3>Non-x86 ports</h3>

More of the work on the SPARC port has been merged, and the port is now
bootstrapped which means it is a lot easier to build it. The continuous
integration is now doing nightly builds for SPARC, although the resulting
disk image is not yet in an appropriate format for actual hardware to boot it
(early testing is done using network boot and loading just the bootloader
anyway).

Kallisti5 continues his investigations on the ARM port (which doesn't want to
send any output to the serial port for some reason, making early debug quite
difficult) and untangling the EFI code from x86, which would eventually make it
possible to boot on ARM and ARM64 machines using EFI (providing a friendlier
debugging environment).

More work from Jaroslaw Pelczar on the ARM64 port has been merged, but some of
the patches are still pending review on Gerrit. As part of this work, the
btrfs\_shell build has also been fixed.

The riscv64 and m68k ports also saw some fixes, but they are still waiting for
a complete package bootstrap. mmu\_man also worked on adding support for NeXT
machines to the m68k port.

<h3>Video drivers</h3>

PulkoMandy investigated the intel\_extreme driver to improve the compatibility
and start work towards dual display support. For now you can expect two displays
to work in clone mode only (and even that isn't completely stable yet).

<h3>C library</h3>

Waddlesplash replaced the math code in the C library with a version from musl.
Our C library is currently a mix of glibc (for BeOS compatibility), musl,
freeBSD, and our own code. We plan to remove the glibc parts because we would
prefer to use code under a BSD-style license, however there is a risk of
breaking BeOS compatibility (as BeOS used glibc as well).

<h3>Various fixes</h3>

As part of GCI and outside of it, there are always things to fix in Haiku.

Zotyamaster reviewed all uses of realloc() to better manage out of memory errors
(the API is a bit complicated to use correctly).

Kyle Ambroff-Kao fixed a crash in Terminal when unexpected modifier keys were
used (the bug had been introduced by code to handle a meta key, for running
emacs or other apps needing such a thing in Terminal).

mt reviewed problems found by the latest PVS scan in various parts of the
system.

A team effort by GCI student allowed to rewrite some headers for the Game Kit
that had been copypasted from BeOS in early days of Haiku. We only have two
such headers left, which will hopefully soon be replaced as well.

phoudoin fixed a command line handling problem in TextSearch which would make it
impossible to search for some strings. X512 helped integrate the patch.

Cruxbox started early work on adding an xfs\_shell to Haiku, allowing to start
work on adding support for the XFS filesystem.

JaniceTr added 96 and 128px icon size options to LaunchBox.

PulkoMandy fixed an issue in the BSecureSocket class that would not handle
UNIX signals properly, leading for example to a download error if you resized
a Terminal window while pkgman was downloading something in that Terminal.

PulkoMandy also reduced the polling frequency for low-speed USB devices,
improving compatibility with the slower ones.

<h3>Installer</h3>

The Installer now allows to select "optional packages" to install or not when
running it. This allows to have less activated packages in the release DVD,
making it possible to run Installer on machines with limited RAM (256MB or less).

This was also an opportunity to clean up the Installer GUI code a bit and fix
some drawing glitches in it. As one of the first applications the user will see,
we'd rather keep it as clean as possible.

<h3>EFI bootloader</h3>

Besides the already mentioned cleanup for allowing its use on ARM systems, 
the EFI loader was also reworked a bit to improve the boot process and in
particular get better at selecting the right partition.

This work includes adding easy access to the bootloader logs from the boot
menu, and then reworking how the partitions and devices are scanned. This code
is still being worked on as the new version is not working perfectly yet.

kallisti5 also added specific quirks to let Apple hardware think we are MacOS,
and enable all the hardware for us to use.

<h3>New Input preferences</h3>

The mouse, keyboard and touchpad preferences have been replaced with a new
common "Input" preferences panel. It lists all input devices and in the future
will allow each of them to have different settings.

In the process, support was added for mouses with more than 3 buttons (but the
4th and 5th are not used for anything in Interface Kit yet) and horizontal
scroll wheel (which was already supported, but only for mouses using the serial
port, now it's possible over USB as well).

<h3>USB3 support</h3>

waddlesplash continues his debugging efforts on the XHCI stack, making it more
reliable and compatible with more devices. He also fixed some problems in the
USB2 driver as well.

<h3>Media Kit</h3>

Korli investigated and fixed several problems in the media kit and related
applications to improve reliability.

<h3>Haiku field trip</h3>

As you can see already from the above report, this has been a busy month. But
that's not all there is to it! The first weekend of february is also the time
of FOSDEM, the largest european open source developers meeting. It's a very
large event (about 8000 persons this year) and of course Haiku had to be there.

As FOSDEM is big, they have to make a selection on who can have a booth, and
this year we had one only on saturday (ReactOS used the space on sunday).
Still, we got a lot of people visiting our table. Some had never heard of
Haiku, but this year I think we saw no one thinking that the project was dead,
so it seems the Beta release in 2018 at least helped with that. We handed out
all our remaining stickers and more than 100 DVDs in just a single day. We'll
see if this gets us some new users! We also had a piggy bank on the table and
collected about 100€ in donations.

On sunday, we were free of our table and could attend some talks out of the
hundreds available. I learnt about the use of sanitizers and fuzzing in the
\*BSDs, something we probably should investigate as well. mmu\_man also gave
a talk about new things this year in Haiku, playing new demo stunts such as
starting with showing how to install Haiku to a new disk image in less than
20 seconds, and famous quotes such as "we also have a Terminal, for people who
don't know how to use a GUI". The room for the talk was quite full and unlike
last year there were not too many problems getting a laptop connected to the
video system so the talk could start in time.

FOSDEM ended with a special conference for the 20 years of the event, with
a commemorative talk, showing pictures from the first editions, and a birthday
cake. Oco wore his oldest FOSDEM T-Shirt and helped complete a picture with
people wearing the T-Shirts from each FOSDEM edition.

This year we also had Preetpal Kaur, our Outreachy student, coming all the way
from India to visit FOSDEM and meet many developers from open source communities
as well as from the Haiku team.

After the FOSDEM week-end, we stayed in Brussels for a week and ran a coding
sprint. We had planned for about 9 persons to participate, but some of themc
couldn't stay so eventually we were only 4. Still, we got a lot done during that
week and it's nice to collaborate on some issues (part of the work done during
that week is still waiting for review and not merged yet so it's not all mentionned
in the report above).

We also went to visit Brussels a bit for half a day, as we go there for FOSDEM
every year but never take the time to go around the city. We even visited the
Atomium which has some nice blinkenlights inside, and the museum of design for
some inspiration (but it mostly shows objects made of plastic, probably not 
directly applicable to software design).

During the coding sprint we also received a visit from one Haiku user, P13, who
lives in Belgium and donated us a Sun SPARC T5120 server, which will be used to
work on the SPARC port using more modern hardware. This is a rather powerful
machine, with an Untrasparc T2 CPU and currently 16GB of RAM (but it can be
extended to 128GB). This donation was not exactly planned and I had to lug the
server around in my slightly too small bag for the remaining part of my trip.
Still, it made it safely (fortunately there was no rain while I was outside),
and I could carry something this heavy without problems as I was travelling by
train (I of course had to get it through security at the train station, the
first time I had to get an 1U server through an XRay scanning machine).

Anyway, after the coding sprint was over, I went to Paris and spent the week-end
there. I visited some friends, and on Monday went to the train station to see
the first TGV, which was put on the tracks 41 years ago and is now being retired.
It was repainted to the beautiful original orange color, so it was the opportunity
for many train lovers to take some very special pictures. Interestingly one of
them noticed my "Google Open Source" hoodie and asked about it, so I could explain
how Google funds open source projects and told them about Haiku, maybe we will
also get a new user or two there.

Finally, on thursday I was invited at the 42 school in Paris, by the 42L non-profit
which promotes open source and free software there. I gave a talk introducing
about 50 students to Haiku, and then a workshop about the use of Git and Gerrit
for team work for about 20 of them (it is unfortunately quite difficult to run
workshops for more than 20 people at once, but the demand was quite high).

After that quite busy week and a half, I got back home and had to process
several new orders for Haiku DVDs, as I mentionned on Twitter and Telegram that
I still have 400 of those still available. So that's some more space freed in
my flat, and some more donations for Haiku.

See you next month for a probably less busy report!
