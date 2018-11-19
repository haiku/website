+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 04/2018"
date = "2018-05-05T07:26:14.000Z"
tags = []
+++

<p>Welcome to the fourth monthly report for 2018!</p>

<p>This report covers hrev51873-hrev51921.</p>

<h3>32/64 bit hybrid support</h3>

<p>Let's start with the most exciting developments this month: Korli started
work on a 32/64 bit hybrid. The idea is to run a 64bit system, but allow 32bit
applications to run on it. While we are just at the very first steps, it is a
good thing that this is being worked on, as it will allow us to move more
smoothly towards 64bit support.</p>

<h3>Filesystems</h3>

<p>Korli fixed yet another SMAP violation in the FAT filesystem, making sure
we have a clean separation between user and kernel space and no shortcuts
taken.</p>

<p>Axeld reworked the code for file locking, so that it can be implemented
directly by each filesystem if needed, rather than at the VFS level. This allows
locking to work on NFS shares (and also lock other computers from accessing
files, then). However this introduced a new panic which is triggered a little
too easily currently. It seems that we are in some cases forgetting to unlock
the files.</p>

<h3>Standard libraries</h3>

<p>krish_iyer reworked the BString unit tests to clean up various little
problems: style fixes, proper use of cppunit, and other fixes.</p>

<h3>Translators</h3>

<p>Alexander Coers removed some old hacks in the PNG translator configuration
view, to avoid layouting problems in various cases. The translator settings
are a bit difficult to get right because they can be embedded in other
application's windows, as a result they are one of the few places where we
must get layouted and old-style non-layouted controls living side by side in a
window.</p>

<p>The layout system is an Haiku extension to the interface kit, which allows
to let the OS figure out by itself the appropriate size and position of
views in a window. Before this, the application had to compute position and
size of everything by itself, usually leading to truncated text and other
similar issues when changing the font size or the system language.</p>

<h3>Drivers</h3>

<p>Korli added a blacklist to the usb_hid driver, so that wacom tablets are
handled by their dedicated drivers, and also blacklisted a temperature sensor,
which is not really an HID device (HID stands for Human Interface Device, and
the temperature sensor doesn't involve an human)</p>

<p>He also synced some ethernet driver with FreeBSD 11.1 (still no wireless
support for FreeBSD11 drivers at the moment).</p>

<p>Korli also worked on our virtio support, with many fixes to the core of it
(the virtio bus), and then much improved support for virtio network. He then
added support for the balloon memory virtio device, which allows to dynamically
change the RAM size of a virtual machine as needed, and give back unused RAM
to the host system.</p>

<p>miqlas added the PCI ID for his new wifi card to the list of supported ones,
as it seems to be working just fine with the existing driver.</p>

<h3>Kernel</h3>

<p>Korli reworked various modules to reduce their stack usage, by using dynamic
allocation instead. In some cases the issues were mostly harmless, but in others
the code could be used to trigger a stack overflow and used as an attack vector.
</p>

<p>He also made some cleanups to the PAE code, while investigating an issue with
AMD bulldozer and other pre-Ryzen systems. Haiku is very unstable on these and
the exact reason has not been identified yet.</p>

<h3>Build system</h3>

<p>Waddlesplash fixed the test for xattr support, which would not detect them
properly if run during a clean build because it forgot to create a directory
before using it.</p>

<p>He also tweaked once again the attribute emulation layer and the way we
intercept C library calls to achieve it, so it should now be possible to build
Haiku from Haiku again.</p>

<h3>Code cleanups</h3>

<p>tqh made various changes in many places to fix cppcheck warnings as well as
some of the problems reported by PVS-Studio when they ran a scan of Haiku.</p>

<p>Philippe Houdoin fixed an oversight in the "shutdown" program, which would
return an error even when everything went as expected.</p>

<h3>Servers</h3>

<p>axeld added a logging system to launch daemon, to allow debugging related
problems.</p>
