+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly(?) activity report - Jan/Feb 2016"
date = "2016-03-01T21:07:26.000Z"
tags = []
+++

Hello there, it's time for a new report!

There was no report in January as the month was somewhat quiet, with several of
the devs putting most of their effort in mentoring GCI students. But everyone
has recovered now and we are back to normal schedule.
<!--more-->
<h3>statistics</h3>

This report covers the range hrev500012-hrev50116.

<h3>User interface</h3>

In december, a large patch from Looncraz was merged, to allow live color updates when changing appearance settings. This introduced some drawing problems in the app_server, but most of them should now be fixed.

The handling of "zombie" replicants was broken. As you probably know, replicants allow to embed part of one application inside another (usually the desktop or the deskbar). However, this require the other app executable to be available.
If you add a replicant to the desktop, and at the next boot, the app is no more available (for example because it is not on your system disk), you will get a "zombie" replicant, that is, just an empty view. This makes sure you don't lose your carefully laid out desktop replicants setup just because one disk was not mounted. However, it didn't quite work and usually crashed the whole Tracker.

Another crash was fixed, this time on app_server side. It happened when drawing a single-pixel line on a layer (as introduced by Jua's work to speed up WebPositive drawing). The layer transformation was ignored in this particular code path which could lead to the line being drawn outside the buffer.

The BBox view can now behave better when mixing layout and non-layout views. This allows to use old non-layouted code in a more recent layouted window. While generally not supported, such a setup is required in some places, for example in the DataTranslations preferences. There the app is layouted, but translators from BeOS days may have a settings view which is not.

The addattr tool was slightly modified to allow easier specification of hardcoded types. The scheme used before required double-quoting which was not user friendly. Thanks to Peete Goodeve for improving this!

The locale preferences list of language was cleaned to avoid duplicate entries for languages written in two or more scripts (for example Cyrillic and Latin).
The missing glyph handling in app_server was also modified to tell applications when a character cannot be drawn. This allows the locale preferences to detect when a language name can't be displayed, and in that cases it uses the currently configured language instead.

<h3>Launch daemon</h3>

Axeld continues his work on the launch_daemon. He added support in the launch_roster command-line interface to enable and disable jobs, so you can now actually stop some servers without the launch daemon automatically restarting them.

The progress on the launch daemon allowed to get rid of several ways to manually restart the Deskbar and Tracker (from Deskbar menu as well as from TeamMonitor), as they will now restart automatically.

<h3>Mail daemon</h3>

Axel is also working on the mail daemon, with several fixes to the user interface of the preferences, continued work on fixing the IMAP support (deleting mail is possible again, folders from the server are created with the correct attributes).

There were several bugs in the IMAP code which have now been fixed, so it's getting in shape and may be included again in the next release.

The "mail" command (as available in BeOS) was also added to Haiku, and can be used from scripts for sending automated messages.

Finally, the mail_daemon is not run if there are no mail acounts configured, and this is now handled using the launch daemon.

<h3>Drivers</h3>

Rudolf Cornelissen did some work on the VIA K8M800 driver, fixing several old problems. The driver was added to the image as it is now stable enough, and comes complete with overlay support.

Viktor Müntzing contributed several smaller patches in various areas, to fix issues spotted by static analysis tools (intel_extreme, acpi, radeon, and virtio).

ACPICA, the library used for ACPI management, was updated to a newer version.

The screeninfo tool now lists overlay capabilities in each screen mode. This was contributed by Hannah, one of our two GCI winning students.

mmu_man resumed work on the PowerPC port of Haiku, with some changes to the debug message support for the u-boot bootloader.

PulkoMandy added support for arbitrary baud rates to the serial port drivers and APIs (termios.h). It is now possible to use USB to serial adapter at high speeds (3Mbps and more), which is useful in some specific cases.

<h3>Unit Tests</h3>

Kostadin Damyanov (MaxMight) fixed our jamfiles so it is now a bit easier to run the unit tests.

<h3>Media Kit</h3>

Barrett continue his work on the Media Kit, with cleanups of the code in various places and rework of the latency computation system.
A first visible consequence of this work is the restored ability to play with disconnecting and reconnecting media nodes in Cortex. Before it would often lead to locked nodes, but part of the issue has been fixed.

PulkoMandy worked on issues in the ffmpeg decoder and in WebKit, allowing Youtube videos to work again.

Korli adjusted the ffmpeg plugin sources for ffmpeg 3.0 support, which we are now using for gcc4 builds.

<h3>Packages</h3>

Several bugfixes and updates in various areas (too many to mention).
New packages include PonpokoDiff, a native application to compare files.