+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - October 2016"
date = "2016-11-05T08:36:32.000Z"
tags = []
+++

Hey there!

Life continues in Haiku, with bugfixes and slowly getting prepared for the beta release. Not much in terms of new and exciting features, but Haiku is getting more stable and the bugs slowly fade away.

In terms of Haiku commits, this report covers hrevs 50577 to 50664.

<!--more-->

<h3>DriveSetup / Partitioning fixes</h3>

Getting Haiku installed and booted seems to be a recurrent problem for some new users. We have gotten multiple reports lately on the forums and the IRC channel. It was time to review some of the reported bugs and try to fix some things.

hrev50577: the CHS values in the MBR header are set to a different value. CHS (Cylinder, Head, Sector) is an old way of declaring partition sizes. It worked only for disks up to about 8GB. Since then, we are using LBA (logical bloc addressing), which just numbers the sectors sequentially without worrying about the disk geometry, and can address drives up to 2TB. In the partitions entries created by DriveSetup, we used to set the CHS values to 0. However, some BIOSes detect this as an unused entry and don't see the partition at all. We now set them to FFFF, which is an invalid value in the CHS standard.

hrev50656: Add support for de-initializing GPT drives. GPT is a replacement for the legacy MBR. It allows a lot more partition entries without having to use the "extended partitions" hack, and can handle drives larger than 2TB. However, you may want to convert a GPT drive back to MBR format. This didn't work, because the GPT is designed to not use the disk sectors used by MBR to prevent accidental overwrite. This means writing an MBR entry to the disk does not erase any of the GPT data, and Haiku (and your BIOS) still detects the drive as GPT. Now, the GPT sectors are erased before writing something else on the disk, so this works better.

<h3>App Server/Graphics rendering</h3>

hrev50579: The Noto font was added to the repository with all its local variants. We are considering it as a replacement for DejaVu as the default system font, because it provides better language coverage. We may also switch to a new version of Freetype with a re-designed hinting system. Test the font and tell us what you think about it. Should we use it? Does it create problems?

hrev50661: the Be Decorator is now actually installed and available. If you are nostalgic about the BeOS look, and Haiku doesn't quite cut it, you can try this.

<h3>Packages</h3>

hrev50578: Some fixes to the bootstrap repositories. These are used if you want to try building Haiku from scratch, without downloading any precompiled binaries for our dependencies. This is a quite complex process, and doesn't really work at the moment, but some fixes were pushed, at least.

hrev50580, hrev50581: New versions of BeScreenCapture and Einsteinium.

hrev50623: update Transmission and libuv to current versions.

<h3>Other platform ports</h3>


<h4>ARM</h4>

hrev50582: Update of the FDT for Raspberry Pi 1 and 2 from FreeBSD. It's nice to see some activity on the ARM port again, however the Pi 2 used for testing has not been very cooperative so far (serial output does not work, which makes it hard to debug anything).

hrev50608, 50609: Move board specific binaries (u-boot, early bootloader code) to a new "firmware" repository on Haiku's github. Clean up some of the target board names for clarity.

<h4>PPC</h4>

Every year during the Micro Alchimie meetup, mmu_man makes some progress on the PowerPC port.

hrev50595: remove an old hack from the PPC linker support, which should not be needed with current versions of binutils anymore.

hrev50605: Haiku's configure script can now be used to build an appropriate version of GCC for the host you are building on. This can then be connected to your target machine (or qemu) to see what the CPU is doing with the code.

hrev50612: Assorted cleanup and updates for the PPC port, bringing it more up to date with the other architectures. Mostly changes in memory pages management and U-Boot support.

<h3>Cleanups</h3>

The Haiku project takes clean and maintainable code seriously (if only because there is not enough developer documentation). Some of these changes are also enabling us to use newer compilers and build tools.

hrev50583: The PS/2 driver now compiles without warnings. There is an ongoing effort to fix warnings in all parts of the sourcecode, and this is a rather easy way to start contributing to Haiku if you are interested in doing so.

hrev50584, hrev50585: Fix more warnings in the MIME database and the Keyboard input device, which were detected by gcc6. As if our progress on fixing warnings wasn't already quite slow, the GCC team also likes to add more warnings in each new release of their compiler.

hrev50589: Implement ELF DT_INIT_ARRAY. This is a more compact way to declare functions to be called when a program or library is loaded (static C++ object constructors, for example). The new version (2.27) of binutils switched to this more compact code from the previous DT_INIT way. Our runtime_loader can now load programs lined with binutils 2.27.

hrev50593: Fix a problem in the Locale kit where a catalog for translations could be used before it was loaded. Now you can safely translate strings before the main function has started running.

hrev50594: libgnuregex, which is used to compile our build tools on BSD and macos, can now be built in debug mode.

hrev50596, hrev50599: Improvements to mouse management in Mandelbrot. Our example apps should always show the best way to achieve things, for other dev's inspiration.

hrev50598: Make sure kernel debugger stack traces don't read corrupt memory.

hrev50613: clean up some unused .h files inherited from OpenTracker.

hrev50615: various cleanups to PoorMan, Tracker, Login.

hrev50619, 50625: fix the detection of GCC version by the runtime_loader. Various things are scanned in loaded files to decide wether they are using the legacy GCC2 or the current C++ ABI, and load appropriate libraries. However, the markers in ELF files have changed a bit with GCC versions, and eventually this stopped working. The checks were improved to allow for newer binaries to be detected again. This fixes the "failed to get gcc version" message which you may have seen in some cases. This message was also confusing some compilation scripts. It is now possible to compile Cairo again, for example.

hrev50632: Enable symbol patching in the test suite, allowing to intercept calls to debugger() and checking they happen at the right place.

<h3>Apps</h3>

hrev50592, 50631, 50653: cosmetic fixes for CharacterMap, Notifications, CodyCam.

hrev50597: Tracker sometimes showed a list view header while in icon view mode.

hrev50616: Magnify can now save actual images, instead of a C++ header to include in sourcecode (why did it do that?)

hrev50626, 50657, 50662: Improvements to Terminal, fixing the problems with Curses applications. The Nano editor works fine again, for example. The main problem was missing handling for some escape sequences used by Curses, leading to a confused terminal state.

hrev50664: make the RAM Disk support in Haiku available. This can be used to create a volume whose data is stored only in RAM. You can use this to put source files for a project you are building, avoiding many disk accesses during compilation. The RAM disk supports flushing the data to a file, and also now supports TRIM, to reclaim memory used by empty dectors in it.

<h3>Media Kit</h3>

hrev50602, 50616, 50635: The work for support of HTTP streaming in the media kit continues. It is now possible to play internet radios in Media Player, with some stability problems. The issues are being ironed out.

hrev50603: change the latency computation in Media Kit again. This is a tricky part and difficult to get right in all cases.

hrev50639: rewrite the handling of planar audio formats without using ffmpeg's libswr. This fixes playing of various audio formats with the gcc5 version of ffmpeg.

<h3>Drivers</h3>

hrev50611, hrev50627: Efforts to improve the intel_extreme driver continues. All SandyBridge and older cards should now be working again as they were before the driver was refactored. Newer cards still need some work, unless we decide to blacklist them again and go back to using the VESA driver for them. Thanks again to miqlas, who let me debug this on one of the non-working machines.

hrev50622: Some fixes to the XHCI/USB3 driver.

hrev50633: some cleanups in the Radeon-HD driver

<h3>Network kit</h3>

hrev50634, 50636: Several fixes to cookie management, which led to cookies being rejected or not saved on exit. Now it should be easier to stay logged in on most websites.

hrev50637: rewrite the URL parsing without using regular expressions, making it faster and more easily portable to other platforms (it is used in our build tools).

hrev50644: fix a deadlock condition in the HTTP code. It should be a little harder to freeze Web+ now (but unfortunately still possible).