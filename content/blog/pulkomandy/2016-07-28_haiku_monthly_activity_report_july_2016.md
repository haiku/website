+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - July 2016"
date = "2016-07-28T18:03:46.000Z"
tags = []
+++

Hey there!

Here comes the activity report for July of 2016. It covers hrev50388-hrev50455
<!--break-->
<h3>USB3</h3>

(USB 3 introduces a new family of hardware controllers, which we need to support).

Starting from hrev50451, XHCI (USB3) support is now enabled by default. The implementation of USB3 support started in 2012 as part of the Google Summer of Code, but was left in an incomplete state for some time. After fixing several issues, we have decided it is time for it to get more exposure, so it is now enabled by default for all XHCI controllers (instead of a small selection of "known to work" ones).

Your help in testing this is welcome, so please download a nightly and see if you can get it to boot from an USB drive connected to an USB3 port.

The support is a bit early, so using it to manipulate your important data is not recommended.

<h3>AHCI</h3>

(AHCI is the driver taking care of SATA hard disks and CD drives)

kallisti5 improved the way we convert the AHCI description to SCSI vendor+model. The previous algorithm tried to fit as much as possible of the 40 byte description returned by the hardware into the 20+8 bytes available in SCSI reports. Now the splitting is a bit smarter.

He also disabled full tracing by default, to avoid spamming the log with "AHCI port reset" messages when there is a removable media drive available (for example a CD drive). Haiku is currently a bit confused as trying to access a removable drive with no disc will result in errors.

<h3>cddb_lookup</h3>

(cddb_lookup is the tool used to query the CDDB and set tracks and volume name when you mount an audio CD).

axeld added support for multi-line track titles, which apparently happen. He also did several cleanups and sanity checks to make the code more solid.

<h3>ffmpeg add-on</h3>

(the ffmpeg add-on wraps the ffmpeg library into an API suitable for use in the media kit. Media Kit enabled applications can thanks to it decode and encode many audio and video formats).

kallisti5 fixed some compiler warnings, in particular when building on 64bit machines.

<h3>Packages</h3>

(Haiku currently has a package repository that is manually populated with packages built from HaikuPorts recipes)

Several packages were updated including llvm, cmake, libogg, icu, and a lot more. This is mostly thanks to the hard work from Korli to keep things up to date, with some contributions by other Haiku developers.

<h3>Media Player / Media Kit</h3>

(well… this is the media player application. Media Kit is the support library for all audio and video processing needs)

Barrett continued his work with some cleanup of the MediaPlayer, and improved handling of URLs (auto-paste of URLs from the clipboard, allow to close the open window with the enter key).

The "playfile" command line tool also now accepts URLs, so you can use it as a very simple and crude player for webradios (or for testing purposes).

The backend for URL support also saw some improvements (in the http_streamer and BAdapterIO classes), for more reliable operation and handling of HTTP errors, redirects, and other important details.

<h3>GCC6 support / warning elimination</h3>

(several components of Haiku are set to build without any warnings, this must stay true even across compiler updates).

A set of patches by mt were merged, fixing several warnings detected by GCC.

The JPEG, PNG and Wonderbrush translator are now compiling without any warnings.

<h3>Preferences</h3>

(Haiku preferences are implemented as a set of small apps, each dedicated to a specific group of settings).

humdinger made the keyboard shortcuts preferences resizable, making it much easier to browse a large list of shortcuts.

<h3>WebPositive</h3>

(Web+ is the native web browser for Haiku)

The session management was improved by Paradoxon to avoid unwanted restoration of the previous session when clicking an URL or a bookmark to open a new Web+ window.

<h3>Network kit</h3>

(the network kit provides a C++ API for all network related operations, from DNS requests to HTTP connections)

BSecureSocket, used for SSL/TLS connections, was modified by waddlesplash to not allow the CRIME attack. He also disabled several old cipher suites which are known to be rather weak, and improved error output in case of problems.

<h3>intel_extreme</h3>

(the intel_extreme driver provides support for a wide range of video cards and chips manufactured by Intel)

kallisti5 continues his work on refactoring the driver, with a little more support for SandyBridge devices.

<h3>Interface kit</h3>

(the interface kit provides an API for windows, views, and controls for applications user interface)

looncraz contributed several patches to fix remaining issues from his previous "live update" changes. jscipione also fixed some related issues.

<h3>Tracker</h3>

(Tracker is the file manager provided with Haiku)

Some legacy code to add a bitmap icon to the trah directory was removed (Haiku uses only vector icons). axeld also made the "open with" menu work better at non-default font sizes, which is relevant on high-DPI displays.

<h3>Deskcalc</h3>

(Deskcalc is a calculator with arbitrary precision)

Some improvements to the code, mainly to allow customizing the color of Deskcalc instances. You can now make it blend better on your desktop.

<h3>68000 CPU port</h3>

(the Motorola 68000 is a CPU used in early Macintosh, Atari ST and Amiga machines. This port of Haiku is mostly for fun and educative purposes)

mmu_man fixed several problems to get the m68k port up and running again.

<h3>Outside the tree</h3>

A lot of effort at the moment is geared at getting the package recipes at haikuports ready for release. An unfficial release branch was created by pulkomandy on his github fork, and a builder set up to build packages from that branch.

The goal is to have a set of packages similar to what is currently available in the repos. This should be easy, but a lot of the recipes have bitrotted a little, and for example, they will not build with GCC5, or a dependency was updated, etc.

So the recipes need to be reworked into a coherent set where everything can be compiled. This will serve as a base for future updates to the package repository, allowing for an easier to manage repo.

The work is going well, with dozen of recipes being fixed for various problems. The next step will be to setup the official Haiku package builder to work from this branch and generate an usable package repository, compatible with current Haiku versions.

Ultimately, this will reduce the burden of keeping the package repo up to date. The two consequences are that the Haiku devs will be able to focus more on the OS itself, rather than on the packages, and the second is that we can reasonably make the package repo become populated with more software. This is an important step towards our beta 1 release.