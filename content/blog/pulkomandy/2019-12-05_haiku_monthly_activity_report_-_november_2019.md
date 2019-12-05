+++
type = "blog"
title = "Haiku almost-monthly activity report - October and November 2019"
author = "pulkomandy"
date = "2019-12-05 12:14:07+02:00"
tags = ["haiku", "software"]
+++

The last two months have been quite busy for me and I had no time to write up a report. Remember
that everyone is welcome to contribute to the website and if you wand to write the report from time
to time, this would be much appreciated, by me because I wouldn't need to do it, and by others
because they will enjoy reading things written with a different style and perspective.

Anyway, let's look at what's going on!

Let's start with the non-technical side of things. The months of october and november are
traditionally quite active in Haiku (matching with our autumn-themed logo, of course).
There was no BeGeistert this year, but I attended Alchimie and Capitole du Libre with mmu\_man,
while Korli, scottmc and Hy Che went to the GSoC mentor summit, which was in Germany this year.

These events are an opportunity to advertise Haiku a bit, share ideas and projects with other
alternative operating systems such as MorphOS, ReactOS, FreeBSD, or RTEMS, and overall meet
other people working on open source software.

All while managing this, we also had to get ready for Google Code-In, which is celebrating its 10th
year. We are the only project with enough contributors and ideas to be able to participate every
year since the contest was established, and look forward to what our contestants will accomplish
this year. The first patches are already getting to our Gerrit code review.


On the coding side (we are looking at hrev53529-hrev536xx), let's breakdown in rough and arbitrary
categories as usual:

<h3>USB</h3>

korli added the definitions for VR headsets to the USB HID header file. No functional changes, but
one step less to perform if someone wants to do VR in Haiku.

A patch from brjhaiku (done during her application to GSoC) was also merged, which adds missing defines
to the USB video (webcam) definitions. No functional changes either.

<h3>Filesystems</h3>

Part of the work done by brjhaiku on btrfs write support for Google Summer of Code has been merged.
Nothing very exciting for end-users here, but at least we have a working and documented btrfs\_shell
to experiment with the code.

<h3>ARM64 support</h3>

Some time ago, a large set of patches preparing for ARM64 have been submitted by Jaroslaw Pelczar.
These are a rework of an earlier and more invasive porting attempt, which could not be merged as-is
because it had compatibility problems with other platforms. The code is slowly being reviewed and
merged a small piece at a time. So far, it is mostly changes required to get Haiku to compile,
without much in terms of actual added functionality or support.

kallisti5 started work on making our EFI support platform-agnostic, so the same code can be used
for x86\_64 and arm64. EFI is independant of the CPU it runs on, but so far we have made it work
only for x86\_64 machines, so we need to untangle the platform-specific bits in our code from
the shared EFI ones. He also started to rework our code for locating UARTs for serial console
output from the flattened device tree on ARM, which is currently not working.

<h3>m68k support</h3>


mmu\_man is working on the m68k port with various build fixes to catch up with other platforms.

<h3>PowerPC support</h3>

Ynoga fixed various problems with the PowerPC port.

<h3>Network</h3>

waddlesplash fixed several problems in the FreeBSD compatibility layer, making our network support
more reliable.

axeld fixed management of network interface settings to avoid mixups between interfaces when one is
added or removed.

<h3>Graphics</h3>

PulkoMandy revisited once again the intel\_extreme driver to identify the remaining regressions
introduced when adding sandy Bridge support. We believe all problems have been identified and
solved, so, if you have an intel graphics card, please test a recent nightly and report on what
happens.

axeld made some improvements to the HTML5 remote desktop client, allowing to use monospace fonts,
so that Terminal can be run there without too many glitches.

<h3>Terminal</h3>

Lukasz Towarek added support for extended mouse coordinate report, so using mouse with more than
240 columns of text in Terminal is now possible.

<h3>User interface</h3>

humdinger fixed some labels and localization problems in filetype preferences, tracker file info
dialog, GLife screensaver settings.

PulkoMandy fixed archiving of BTextControl, which was missing some fields (replicating what BeOS
did a bit too closely)

John Scipione is working on a control look closely imitating BeOS R5 (if you really want a pixel-for-pixel
dive into the 90s) and fixed various shortcuts in the existing control drawing that work with the
default look, but not that well with the others, as well as some fixes to the behavior of list
views in some preferences panels.

<h3>Various fixes</h3>

mt and korli are as usual keeping an eye on compiler warnings from clang and newer versions of gcc
to fix them before they are too much of a problem.

waddlesplash fixed a leak in the low-level "port" management code (ports are used to exchange data
between applications and are at the core of both BMessage and the media kit buffers).

PulkoMandy switched the main memory allocator back to hoard2

Andrej Antunovikj fixed minor issues such as unsafe use of sprintf in the runtime\_loader.

Joachim Mairböck fixed the hda driver to include a quirk for his soundcard.

<h3>Geolocation APIs</h3>

A new API was introduced that allows to convert a latitude and longitude into a country name.

<h3>Quick Tour</h3>

A new "quick tour" has been added on the release builds Dekstop, introducing various Haiku features.
It partially replaces the "welcome" page (which is still used as WebPositive start page, but not
linked from the desktop)

<h3>Are we in beta2 yet?</h3>
