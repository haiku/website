+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 05/2015"
date = "2015-05-29T17:14:47.000Z"
tags = ["activity report"]
+++

Hello there, here comes the report for the month of may!

<h3>Statistics</h3>

Commit range: hrev49107-hrev4921

Detailed statistics: http://pulkomandy.tk/stats-20150529/
<!--more-->
<h3>Packages</h3>

ICU was updated to version 55.1. The new features are not yet used (we will be able to use it to replace our custom StringForSpeed implementation, as they added a specific formatting system for that), but it already fixes a few problems like strange entries in the Locale Preferences language and country list.

There are now packages for VLC (but it is quite buggy) and mplayer, as well as Critical Mass (puzzle game), dosbox (ms-dos emulator), Sawteeth (music synthesizer and composing tool), hub (tool to work with github from command line), libreCAD (CAD tool), Marble, gpgme, ArmyKnife (id3 tag <> attribute converter), HandBrake (video encoding system), Fossil (source version control).

Work is in progress to bring a package for the Arduino IDE as well. All the command line tool are now in place (the C compiler, library, and the tools to communicate with the board), and there is a recipe, but not yet a package, for the IDE itself.

<h3>Preferences</h3>

Installing translators by dropping them on the DataTranslations preference panel works again. Translators installed this way are put into the non-packaged folder.

Printer preferences now use the Layout Kit.

<h3>Apps</h3>

Waddlesplash continued his work on fixing Tracker regressions and cleaning up the code. He also put some work in making PackageInstaller show more useful warning when installing a package fails.

Zip-O-Matic will now warn if "zip" is not installed (it was moved to a package, so it can be uninstalled now).

Rene continues work on Debugger. This month we get support for more CPU registers for the x86 architecture (SIMD), and on CPUs lacking some of the registers, they will be completely hidden. He also added memory write support (see his separate <a href="/blog/anevilyak/2015-05-26_debugger_editing_memory">blog post</a> about this).

Janus worked on adding support for configurable colors (through Appearance) in a few place where it wasn't handled correctly. He also fixed PoorMan to autosize its window.

Hamish Morrisson made some fixes to mutexes and semaphores, fixing some issues which made them not behave as expected by the POSIX standards. He then released an updated version of Java, which works much better thanks to these fixes.

Axel continued his work on the Launch Daemon, which led to various fixes and improvements: fix of kernel port tracing, replies to KMessages (making it possible to use BMessage more easily for communicating with kernel and libroot.so, where BMessages can't directly be used). He also made the BJob and BJobQueue part of the support kit. These were originally developed for the package kit, but are more generally useful. They allow to schedule "jobs" to be run in a sequence by a single thread. He fixed some issues in app_server with mouse events when switching between windows; then jackburton fixed a related, but different issue, which led to "flat" BButtons sometimes staying highlighted when the mouse moved out of the window.

puckipedia added stack and tile support to the BeDecorator (which makes your window tabs look pixel-for-pixel identical to BeOS R5).

<h3>Drivers</h3>

More Intel wifi cards are supported, after backporting changes from a backport of a new driver to FreeBSD 9 (thanks to Dan MacDonald for investigating this and writing the patch!).

The radeon_hd driver got some fixes from the PVS analysis (see last month report).

Support for "eject when unmounting" was finally fixed.

mmlr did several fixes to the FAT filesystem, and made it work safely on 64-bit builds.

usb_modeswitch got support for some Huawei modems, thanks to a patch by haiqu and with some help from korli. This driver is used for devices with multiple interfaces, where you can switch from one interface to another (for example, when first plugged the device shows as USB mass storage with the drivers, and once the drivers are instaled, switches to a mode where the actual features are available).