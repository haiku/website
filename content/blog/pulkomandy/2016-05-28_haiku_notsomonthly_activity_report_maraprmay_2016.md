+++
type = "blog"
author = "PulkoMandy"
title = "Haiku not-so-monthly activity report - Mar/Apr/May 2016"
date = "2016-05-28T10:25:37.000Z"
tags = []
+++

Hi there! Once again with about a month of delay, here comes the activity report.

This report covers the range hrev50117-hrev50336.

<h3>Command line apps</h3>
AGMS contributed some fixes to the "mail" command line app which can be now be used easily to send automated messages from a script. This is an useful tool to have in automated tasks to post status report, errors, etc.

<!--more-->

<h3>Graphics</h3>

Rudolfc fixed some issues with non-32 bit video modes. If you are still using Haiku in 256 colors, it is now possible to have video overlays on that.

kallisti5 did some minor fixes on radeon_hd, but more importantly a major rework of the intel_extreme driver based on work started by mmlr back in 2013. This will make it easier for the driver to support newer intel devices. There are some regressions with this, but hopefully they will soon be solved.

waddlesplash fixed the color of BStatusBar, which had been changed when merging looncraz's realtime color changes. He also fixed a problem with some replicants, caused by the Tracker refactoring to use Layout code.

jscipione made some changes to BTabView so it looks better when used to make full window width tabs (as in Terminal). This new appearance is now also used in several preference panels.

jscipione also worked on BColorControl, which is now able to switch between a 32bit mode (where it shows RGB sliders) to 256 color mode (where it shows color swatches), when the video mode changes.

<h3>Apps</h3>

jscipione made DeskCalc use an approximation when computing factorial for large numbers. Since DeskCalc uses arbitrary precision math, it could otherwise take a very long time to compute the factorial. There is now an approximation error, however, so don't trust it if you need exact results.

PulkoMandy added support in SerialConnect for custom baudrates. Support for this had been added to the FTDI USB-serial driver, but was not reachable yet from the UI.

humdinger made the Workspaces app quittable with a single press of the ESC key. You can now have a shortcut to start the app fullscreen, a nice way to get an overview of all your desktops and switch to the right one.

waddlesplash improved the PackageInstaller (used to install BeOS SoftwareValet files) to use the layout kit, fixing some rendering glitches. He also merged the InstalledPackage app into it, so there is now a single app to manage these legacy packages.

jscipione fixed the jumping window size in DataTranslations preferences. He also fixed some issues in Screenshot, and in ScreenSavers as well as the shipped screen saver add-ons.

<h4>Debugger</h4>

Quite a lot of activity around Debugger this time, as usual performed by DeadYak.

The expression window now follow the team state and enables/disables the relevant parts of the UI as the state changes.

An issue with the disassembler was fixed, so we get more correct return addresses in the disassembly view. Several other fixes were also added as well as some optimizations.

DeadYak also started work on adding remote debugging support. This include a new set of classes to easily use a network socket in combination with a BLooper and handling of BMessages.

bonefish also jumped in and added support for "core dump" files. When an application crashes, in addition to the usual "save report" option, you now get the choice to write a core file. This is bigger than the report, and contains the complete state of the application when it crashed. It can be loaded in Debugger to examine the state of the app as if it was still running.

<h3>Media Kit</h3>

As you should know, Barrett is currently on contract funded by Haiku, inc to improve the media kit and add streaming support. His work revolves around changes in the Media Kit and mainly the codec plug-in interface which was originally written only with files in mind. The interface is being extended to also allow decoding, for example, an HTTP stream.

Barrett also made the media_server a BServer managed by the launch daemon, which fixes several issues with the "restart media services" system.

Several more changes were done, including support for the live555 library and changes in the MediaPlayer. You can read more about this on Barrett's development blog.

<h3>Packages</h3>

Population of the package repos continues. This month humdinger brings us PadBlocker, an input_server filter which will block your touchpad while the keyboard is in use, avoiding accidental mouse moves while typing. He also added a package for Filer, a tool to rename, move, and otherwise manage files.

<h3>OS internals</h3>

The gcc compiler was updated to gcc 5.3. We are still using gcc2 for legacy apps. This new version of gcc has much better error messages, and allowed to catch some bugs in Haiku. As usual the migration was done by mt and Korli. Fixes for gcc 6 are already on their way.

Korli also provided packages for clang 3.8, but the work to make it possible to run Haiku without gcc has not made much progress.

mmlr fixed some bugs in the EHCI implementation, mainly to work around problems in VirtualBox emulation of EHCI. This makes it possible to share host USB devices with an instance of Haiku running in VirtualBox, which can be useful to debug USB drivers without actually rebooting your machine each time you need to test something.

He also fixed the USB ECM driver to not change the USB configuration, so it should be possible to use it on more devices. ECM is used for USB network tethering on recent mobile phones.

jua made it possible to disable wifi-N using ifconfig. While using wifi-N would be nice, it turns out some of our drivers can't run reliably with it. If you had problems with your wifi adapter not managing to connect to some access points, this may well be the problem.

axeld added support for recursive watching of a directory in the node monitor. Before this change, an application wanting to watch all files in a directory had to node monitor each of them. Now watching just the directory is enough to get notifications whenever any of the files is changed.

kallisti5 resumed work on the bluetooth support. This was initially started by Oliver Ruiz Dorantes around 2007-2008, but was left disabled back then. The code is still in an early state, but you can experiment with the Bluetooth preference panel.

<h3>Documentation</h3>

The Haiku Interface Guidelines now comes with a better stylesheet to match the style of our other documentation. This was provided by waddlesplash.

jscipione continues his work on completing the Haiku Book, the API reference for Haiku, with various fixes and beginning of a documentation for the Launch Daemon classes (which are still private, at the moment)