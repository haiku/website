+++
type = "blog"
title = "Haiku activity report - May 2020"
author = "PulkoMandy"
date = "2020-06-28 10:14:07+02:00"
tags = []
+++

Welcome to the May-June 2020 activity report!

<h3>Are we released yet?</h3>

Yes! You probably already know, the Beta 2 version has shipped and is available for download.
There was a lot of work done towards the release, and then some of us decided to take a break
from Haiku for a few weeks to compensate for it.

<h3>Google Summer of Code</h3>

The Google Summer of Code is already reaching it's mid-point with the end of
the first month of coding period. Patches from our 4 students are getting merged
as they go. You can follow their progress on their respective blogs.

Let's now look at changes to Haiku code. This report covers hrev54103-hrev54369. Note that there were (as usual) quite a lot of changes, and this is only a brief summary of the most impacting ones.

<h3>Pulse</h3>

Pulse is one of the applications inherited from BeOS. Its design was a bit aged
and it was time for a little cleanup.

An extra border around the window was removed, the management of the replicant was cleaned up to make it more independant from the main window,
and the logos for CPU manufacturer were updated to the current ones and converted to vector graphics.

<h3>File systems</h3>

Kyle Ambroff-Kao continues his work on improving our unit tests, fixing some remaining problems with handling of symlinks.

The ext2 driver now properly report the filesystem name as ext2, 3 or 4 depending on which disk is mounted. This does not change the behavior, but avoids some confusion as previously it always said ext2. We have a single driver for all 3 versions of the filesystem as they are in fact quite similar and share a very large part of the code.

The work on XFS and UFS2 from our GSoC students is also being merged, with initial work towards listing the content of the root directory in progress.

<h3>Drivers</h3>

Korli has been quite busy with adding new drivers for WMI, SMBios,

Korli also worked on improving support for modern x86 CPUs, including the xsave instruction, and enabling use of AVX which requires saving more CPU registers during context switches.

A bug in the USB-Midi driver triggering a KDL when trying to write only a part of a MIDI event was also fixed.

RudolfC worked on allowing usage of secondary displays (in the case of multiple video cards, mainly) for fullscreen video playing. This also resulted to fixing somme issues in the ffmpeg add-on for video overlay support.

waddlesplash synchronized some network drivers with FreeBSD and finalized the NVMe driver.

bga fixed use of 64bit physical addesses in the HDA audio driver.

A combined effort by multiple people on the Wacom driver includes SMAP fixes, support for new devices, and improved mapping of buttons and pen pressure to mouse events.

<h3>Network</h3>

Some issues in the behavior of the network stacks were fixed, mostly around the implementation of getpeername(), but leading to a bit of refactoring to better manage the state of sockets.

Some very costly sanity checks in the network stacks are now disabled for release builds, resulting in 5x performance increase.

An use-after-free was also identified and fixed, fixing one of the most common KDL crashes.

<h3>Memory management</h3>

Korli and mmlr fixed various problems and suboptimal implementations in the memory handling, making it possible to reserve address space without immediately mapping memory to it.

<h3>User interface</h3>

Before the release, there was some focus on cleaning up the interface of Installer and FirstBootPrompt
to make the first experience with Haiku a bit better.

The flags for each language in FirstBootPrompt were removed, because it is not appropriate
to use flags (which are associated to countries) to represent languages. Some extra icons
were added to the window to make it look less boring, and to help navigate it even in
unknown languages. The way to select the keymap from the language was also improved with
more special cases. In particular, cyrillic languages will use a latin qwerty keymap, until
we finally integrate KeymapSwitcher properly into Haiku.

X512 improved the behavior of ScrollToSelection in BListView, and keyboard navigation in BOutlineListView and BColumnListView, and started adding missing scripting support to seveal Interface Kit components and applications.

The Find panel in Tracker was reworked a bit to clean it up. A larger refactor
with extra functionality is planned, but there were some annoying problems with
the existing layout which were fixed for Beta2, while waiting for the larger
rework.

Some drawing glitches when using stacked tabs were fixed.

Various localization problems were fixed as they were found during the QA phase of beta2.

Some fixes were also made to the UI of Appearance, Mail, DiskUsage, FileTypes, Time preferences.

HaikuDepot also received a lot of cleanups and optimizations.

The font selection system in app_server was improved and allows use of Thai text.

Input preferences now have icons for each device, and can handle mouses with up to 6 buttons. It also includes a way to block the touchpad when the keyboard is active.

<h3>Icon-O-Matic</h3>

The SVG parser in Icon-O-Matic was replaced with NanoSVG, fixing various problems when importing SVG files.

<h3>WebPositive</h3>

A new version of HaikuWebKit has finally been released after help from KapiX and X512 to fix the remaining bugs. It uses a lot less memory, crashes less often, and has better support for modern website. There is ongoing work for further updates and improvements.

<h3>app_server</h3>

X512 worked in various areas of app_server, using better ways to manage memory, improving performance, and fixing various bugs.

<h3>ARM and ARM64 ports</h3>

kallisti5 started the move from U-Boot to UEFI for the bootloader. This allows reusing more code from the x86 version of Haiku, and provides an easier environment for the bootloader to run in as it can rely on EFI doing most of the platform-specific work, removing the need for implementing our own serial and framebuffer drivers in the bootloader.
