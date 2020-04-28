+++
type = "blog"
title = "Haiku activity report - April 2020"
author = "pulkomandy"
date = "2020-04-20 10:14:07+02:00"
tags = []
+++

Welcome to the April 2020 activity report!

<h3>Are we released yet?</h3>

The big news first: a timeline has been set for Beta 2! If all goes well, it will
be released by the end of May. Of course, this means everyone has been scrambling
for last minute changes this month instead of stabilizing everything. We are now
in "soft freeze", and the branch will be created on Friday.

Now is a good time to test nightly builds on all your machines, help with the
translations, and make that bugreport you've been postponing for months.

We're quite off the initial schedule (we planned for a release every 12 months,
it will be more like 20 this time). Well, let's see if we can do better for the
next one!

<h3>Outside the source tree</h3>

To celebrate the new beta release, 3dEyes has been working on porting GTK
to Haiku. While of course our main focus remains on native applications using the
BeAPI, it's still a great help for new users if they can find some of their well
known apps at first. The port is nowhere near ready yet, but we've seen some
screenshots already...

Let's see what happens in Haiku itself, now. This report covers hrev53996-hrev54102.

<h3>Installer</h3>

Leorize fixed the remaining bugs in the handling of optional packages in Installer.
You will be able to customize your Haiku Beta 2 install to save some disk space.
This also allows us to reduce the memory requirements for the live DVD and the
installer, making Haiku easier to set up on low spec machines (we still have to
check how low we can go now, we're waiting for your experiment results!)

<h3>NVMe support</h3>

Haiku now has support for NVMe drives which are getting common in new machines.
Waddlesplash tracked some disk corruption bugs in this new driver, which led
to also identifying bugs and performance issues in other places in the storage
management code. 

<h3>Clang support</h3>

X512 fixed several problems which prevented building Haiku with Clang, which
raises some warnings where GCC doesn't see a problem, and probably fixing some
bugs in the process.

This also allowed experimenting with the use of Clang to build the ARM64 bootloader.
It showed that the current method to generate an EFI bootloader for ARM isn't
quite correct and that it's possible to get the bootloader to work a lot
better when built using Clang.

<h3>Microcode updates</h3>

Korli started the work on loading Microcode updates (Intel CPUs, for now)
in the bootloader. The code is now merged, but there is still work in
progress on integrating the Microcode files themselves into the Haiku package.

<h3>ACPI and SMbus Drivers</h3>

Korli worked on various low-level drivers: for PCI thermal sensors, for the I2C
based SMBus on Intel chipsets, and a work in progress for I2C touchpads (not
merged yet, because it requires refactoring of the Bluetooth and USB HID drivers
to share the HID code). Experiments are in progress with keyboard and screen
backlight control as well.

<h3>Video cards</h3>

Cleanup of the intel_extreme video driver continues with some regressions fixed.
The driver has been disabled for chipsets newer than SandyBridge, and the focus
currently is on getting more complete support for SandyBridge (the main reason
being that it's my laptop's chipset).

<h3>HaikuDepot</h3>

Andrew Lindesay worked on various issues around HaikuDepot: better handling of
read-only filesystems, various performance optimizations, and improved error handling.


<h3>Network</h3>

wpa_supplicant was updated to the latest version. Some problems in the FreeBSD
compatibility layer to reuse FreeBSD network drivers were also fixed.

We also updated from OpenSSL 1.0 to 1.1, as free support for 1.0 is no longer
available.

<h3>Documentation</h3>

Nielx worked on completing some sections of the Haiku Book. We now have documentation
for the new classes in the Layout API (allowing to easily code font-size-sensitive
views and windows).

<h3>Localization</h3>

The keymap lists in the FirstBootPrompt and Keymap preflets are now localized.
Some messages from the Package Kit also are translated.

Application and preflet names are now localized by default, as a poll on
the forums showed that this was the preference of a large majority of users.
And while talking about polls, we also asked about Deskbar settings, which
showed that the current default settings are mostly fine, except the
"Tracker always first" option, which is now enabled by default.

<h3>Unit Tests</h3>

Kyle Ambroff-Kao continues his work on getting the unit tests to run, with
fixes in the Network and Storage Kit tests. These led to the discovery of some
edge cases where Haiku behavior was different from BeOS. In some, the new
behavior is obviously better (we don't aim for bug-to-bug compatibility with
BeOS), but in other cases, we decided to follow what BeOS did.

<h3>Interface Kit</h3>

Support for "transparent" views was added. This allows for a view to let its parent
draw itself, allowing, as the name implies, for some transparency effects. This
is used in various places (replicant handles, ...) to fix drawing glitches.

We also now support more than 3 buttons on mice (the driver code was already
merged, but not the Interface Kit part). Buttons 4 and 5 are used to quickly
switch tabs in BTabView, as a first step, but can be used for more later on.

X512 also added multiple display support to the test_app_server, for experimenting
with multiple display support. As work on the intel_extreme driver advances,
we may soon have multi-monitor support again (it was implemented for old AGP-based
Radeon, GeForce and Matrox video cards, but none of the more recent video drivers
followed).

<h3>StyledEdit</h3>

nephele added new shortcuts to easily increase and decrease the font size.

<h3>Time preflet</h3>

Mogul identified and fixed a bug in the Time preflet that made it impossible
to select some timezones.

<h3>Translators and image formats</h3>

Haiku now ships the latest version of openexr and ilmbase, and switched from
libjpeg to libjpeg-turbo.

<h3>Filesystems</h3>

Early work for support of UFS2 (by Suhel Mehta) and XFS (by cruxbox) was merged.
While there is nothing usable yet, we hope to soon increase interoperability
with Linux, *BSD, and Solaris thanks to these.
