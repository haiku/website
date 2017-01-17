+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - August 2016"
date = "2016-09-06T20:10:23.000Z"
tags = []
+++

Hello there, it's time for the monthly activity report again!

This report covers hrev50456-hrev50528

<h3>Video drivers</h3>

The work on the intel_extreme driver continues. In the previous month there was a large refactor, merging an old branch originally started by mmlr. kallisti5 updated it and tested it on the early intel models (everything up to SandyBridge).
<!--more-->
Unlike the Radeon-HD driver, which implements an AtomBIOS VM and then lets the card BIOS run inside it and perform a lot of the hard work, the Intel driver must include the code for everything. And it doesn't help that Intel keeps changing the registers of their video hardware from one generation to the next.

This month there has been work on IronLake and SandyBridge FDI training (to connect the display to the video controller on these chipset generations).

PulkoMandy contributed some fixes to get SandyBridge fully working, including DPMS (power saving) and wait for retrace support. The driver should now be compatible with apps using BDirectWindow again.

PulkoMandy also fixed a problem in the VESA driver which would make it work only when forcing a video mode from the boot menu. The cost is an extra mode setting between the initial setup of the frame buffer by the boot loader and the takeover by the kernel, but compatibility seems worth it.

<h3>OpenSound</h3>

mmu_man fixed a KDL on shutdown, caused by a subtle difference between Haiku and BeOS in the way drivers de-initialization is handled.

<h3>Network boot</h3>

Network boot is still broken, but it is at least possible to buil a network bootable image again thanks to PulkoMandy.

<h3>ACPI</h3>

The power button driver is now available for 64bit machines. ACPICA was updated to version 20160729.

<h3>User interface</h3>

Waddlesplash made several small changes, such as replacing "y/n" with "yes/no" in pkgman prompts, making sure Web+ download window is visible on-screen, and removing an alert when modifying the tmp directory from Tracker.

skipp_osx introduced a new BColorMenuItem, which is a menu item with a color (shown in a rectangular box next to the label). This is used in various places to pick colors from a menu, including in StyledEdit and some screensaver settings.

It is now also possible to drag and drop colors from the Appearances list items and color preview box.

PulkoMandy added icons to more of the servers in /src/system/servers. A lot of them were using the generic "app" icon, making them hard to identify in ProcessController.

pulkomandy added some more definitions to elf.h to make it more similar to the one available on Linux, making the file actually usable by more libraries.

Skipp_OSX added the 'auto scroll' feature to BListView, allowing to scroll lists while selecting items with the mouse just as in BeOS. He also fixed the sorting of the keyboard layout menu in keymap preferences.

KapiX fixed cosmetic issues in Expander which was not always sizing its window properly. He also made a middle click on PowerStatus icon quickly open the detailed window, instead of opening the menu like the two other buttons already do.

PulkoMandy removed the arbitrary limitation to 6 open tabs maximum in each Terminal window. We still need a way to scroll the tab list when there are more than that, but at least it's possible to see the problem, now.

skipp_osx made the Deskbar sort its items in a locale sensitive way. So if you enable application name translation, the sorting will make more sense to an human searching for an app there. He also made it possible to use 32x32 icons in Tracker list view, for thos of you with high DPI displays.

<h3>Debugger</h3>

DeadYaK continues his under the hood work for remote application support in Debugger. Ultimately this will allow running the crashing app on one machine, and Debugger on another. This can be useful to debug important system components such as app_server, and also to allow debugging through the internet when an user hits a crash that can't be reproduced locally by one of the devs.

<h3>Style fixes and cleanups</h3>

waddlesplash removed some old system headers, some of which were just including another one.

skipp_osx worked on some cleanup of BMenu and the helper classes as part of his work on BColorMenuItem.

waddlesplash added empty libpthread and libm libraries for POSIX conformance. While these are not required in Haiku, the POSIX specification says that the compiler must handle them no matter what. This is one less thing to patch away when porting software to Haiku.

PulkoMandy fixed the definition of _setjmp, which was also a missing bit for POSIX compatibility. It is rarely used, but adding it was relatively easy, so why not have it?

mt contributed several patches to improve gcc6 compatibility, sometimes spotting actual bugs with the new warnings introduced.

<h3>app_server</h3>

axeld reviewed his old "background drawing" branch, and found some things that should be merged even if the rest of the branch is not ready yet. These are mostly safety fixes to more gracefully handle failed memory allocations.

<h3>Packages</h3>

libsamplerate, itstool, gtk_doc and docbook are now available for x86 images. fluidlite is available as a smaller replacement for fluidsynth. As usual the work on these packages was made by Korli.

Korli also updated libwebp and libvorbis.

pulkomandy updated a new version (9b) of the libjpeg packages to fix a dependency declaration problem in the previous version.

humdinger updated youtube-dl and added a new package for TimeTracker and the FontAwesome font, which makes browsing the new Haiku forums much more comfortable.

<h3>Security fixes</h3>

The package daemon did not handle chroots properly, leading to a way for applications to escape the chroot and get access to the main filesystem. Not only a security issue, this was also preventing haikuporter to work correctly in some cases.

Another issue was unsafe string manipulations in FontDemo which could lead to an overflow with broken translation files. Now the safe BString API is used instead.

<h3>Outside the tree</h3>

Not all the activity is happening inside Haiku git repositories. Currently, work is ongoing in several areas.

Jessicah is working on support for UEFI. UEFI is a replacement for the BIOS bringing some modern features. It needs some rework of the early boot process as well as removal of some "legacy" drivers (for example, VESA is replaced by something else).

Kallisti5 has been exploring some improvements to the package repository format and playing around with the package kit code.

PulkoMandy continues his work on creating a release branch for haikuports. The goal here is to have a branch with just the recipes needed to create a repository similar to what we have in the official haikuports repository currently. That branch will then be used to automatically populate the repository, removing some work from Haiku developers who are currently tasked with keeping this up to date. The problem is a lot of the recipes don't build working packages anymore for various reasons: source compatibility breakage, compiler version changes, missing files, broken patches, changes in version of dependencies,etc. Fixing all of these problems is a time consuming iterative process, but progress is ongoing.

And of course, there are many more 3rd party projects, some of which you can learn about in our new forums. I should also note that the haiku-web team is currently working on replacing also the website engine with Hugo, which will allow easier maintenance of the website and maybe some evolution of the design.

That's all, see you next month!