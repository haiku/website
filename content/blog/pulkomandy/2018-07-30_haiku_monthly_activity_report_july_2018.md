+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 07/2018"
date = "2018-07-30T13:26:14.000Z"
tags = []
+++

<p>Hi there, it's time for the monthly report! (yes, I'm still out of inspiration for catchy headlines)</p>

<p>This report covers hrev52055-52140</p>

<h3>Drivers</h3>

<p>waddlesplash completed his work synchronizing drivers with FreeBSD 11. The FreeBSD9 compatibility
layer is now gone and all drivers are up to date again.</p>

<p>jessicah fixed a problem in the UEFI framebuffer driver (most of the code is shared with the
"VESA" driver, although there is no VESA BIOS in this case). So you are more likely to see a
bootscreen on UEFI machines now.</p>

<p>waddlesplash and kallisit5 worked on the Radeon driver, getting it to play well with SMAP and
recognize a few newer devices.</p>

<h3>Media</h3>

<p>We are now using ffmpeg4, even on gcc2. This was made possibly by building ffmpeg with gcc7
with some hacks to include the missing parts of libgcc, so it would link inside a gcc2 app.
This is of course unsupported by the gcc team, but appears to work ok for C code (it won't for
C++, however). This solves several decoding issues and allows us to use ffmpeg modern APIs in
our media decoding plugin.</p>

<p>A very old patch by Julien Lepiller was merged, which lets MediaPlayer remember the volume and
position of each track. So you can quit MediaPlayer in the middle of watching a movie, and when
you reopen that file it will resume automatically from where you left.</p>

<h3>Interface</h3>

<p>The user interface was the main focus this month, with several contributions from David Murphy
and others.</p>

<p>David made it possible to select multiple items in a BListView and then drag and drop them
(the selection would be lost when you started a drag before).</p>

<p>David also fixed keyboard navigation in some menus, including DeskBar "recent items", and
changed the behavior of menus when opening too close to the bottom edge of the screen to avoid
popping a very small menu and forcing the user to scroll in it, instead allowing the menu to
open in a position higher up the screen.</p>

<p>John also fixed a longstanding issue in DeskBar, where the time view would not behave correctly
and sometimes overlap replicants. He also fixed some regressions in Tracker, in particular a
drawing glitch when using list mode with 32x32 icons (a new possibility in Haiku).</p>

<p>John also modified the BeDecorator to look even more pixel-to-pixel like the BeOS R5 one
(decorators provide the look of window tabs and borders, the BeDecorator provides an implementation
that look like BeOS, while the default decorator has more gradients and shine).</p>

<p>He also made it possible to Zoom a window to the whole display (not avoiding DeskBar) by using
shift + zoom.</p>

<p>waddlesplash reverted some changes to BTextView text rect calculations, which attempted to
fix some old bugs but introduced new, more annoying ones.</p>

<p>HaikuDepot also got various fixes and improvements from waddlesplash and Andrew Lindesay</p>

<h3>Preferences</h3>

<p>Janus fixed some issues in Shortcuts, where some menu shortcuts used to share the same keys.</p>

<p>John also implemented drag and drop of colors in the appearance preferences, so you can easily
copy a color to another.</p>

<h3>Switching to gcc8 (WIP)</h3>

<p>As usual mt is taking care of identifying the problems detected by newer versions of gcc and
trying to fix them. This often leads to uncovering deeper and non-obvious bugs, so the patches
often take a lot of time to be written, reviewed and merged.</p>

<h3>64/32 hybrids support</h3>

<p>After his early work on 64/32 bit syscalls support, Korli is currently working on the buildsystem,
and fixing several edge cases that prevent preparing a 64/32 bit hybrid.</p>

<h3>Filesystems</h3>

<p>Korli fixed several warnings and other issues in NTFS, bindfs, and exfat.</p>

<p>A patch from Matej Horvat was merged, which fixes the handling of 8.3 names in the FAT driver,
in particular the legacy encodings for all-lowercase names. FAT used to encode only uppercase names,
but this was changed with FAT32, however the encoding is a bit strange. The file name is stored
uppercase, and a flag tells the Windows driver to convert it to lowercase on display (while DOS
could still use the uppercase name happily). This should not be of much consequence since in most
cases, the actual filename would be stored in an LFN entry (which allows more than 8 characters for
the file name and uses a more sane text encoding)</p>

<p>Hrishi, one of our GSoC student, got a patch merged. While he is working mostly outside of Haiku
on integrating Git into a Tracker add-on, he needed the add-on to provide multiple menu entries
instead of just one. This is now possible thnaks to his work.</p>

<h3>Are we released yet?</h3>

<p>waddlesplash disabled fstrim in the SCSI driver to protect unsuspecting users from data corruption.
He disabled known-broken PCI IDs in the Radeon driver.</p>
