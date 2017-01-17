+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 02/2015"
date = "2015-03-02T09:38:13.000Z"
tags = []
+++

Hello there!

My contract has ended, but for now I have some free time to write a report every month about the ongoing development efforts from the Haiku team. I think this is a nice way to better see the work done, more so than looking at the roadmap progress bars which tend to not move much.

This month there were 91 commits (hrev48757-hrev48848). Let's see what's inside those.
<!--more-->
<h3>Preferences refactoring</h3>

During my contract, I got the new network preflet working well enough to replace the previous one. This is the 3rd rewrite of the network preferences since the Haiku project started. While the new preflet is a bit more extensible than the previous iteration, the code architecture isn't that great (mainly because the user interface evolved quite a bit since the initial design). Axel (axeld) is working on refactoring the code to work in a simpler and more reliable way.

The goal is to have a more complete network preferences panel, allowing to configure several interfaces (wired, wireless, and later PPP), as well as services (ssh, ftp, dns). Then, configuration presets can be stored as profiles, so you can setup your computer easily to work in several different places.

In the area of preference panels, there was also a fix by Josef Gadjusek (GCI contestant) as a follow-up to his work migrating it from Santa's Gift Bag to the new column list view API.

<h3>New architectures and tests</h3>

Alexander (kallisti5) is working on several things in this area: updated packages for LLVM and Clang, cleanup and fixes of our tests to work with these compilers and on 64-bit platforms.

mmu_man did some work to support the Efika MX board.

<h3>USB MIDI driver fixes</h3>

Adrien (PulkoMandy) fixed missing checks in the usb_midi driver, fixing kernel panics with some usb midi devices and making those usable in Haiku.

<h3>Fixes in the Interface Kit</h3>

From several authors:
<ul>
<li>string_for_rate will now make sure there are enough significative digits in the value shown. Before this change anything between 1 and 1.999 Mbps would show just "1", now it will use Kbps until 10 Mbps is reached.</li>
<li>BTextView now handles the B_FONT_FACE mask properly, so it is possible to change only the typeface. For example, you can ask to "use the same font, but make it bold".</li>
<li>BToolBar got several fixes and is now used in Tracker, as well as ShowImage. It will one day be made part of the public API.</li>
<li>BView::RemoveSelf would crash if re-adding the view to a window later on (axeld)</li>
<li>It is now possible (in BMenuPrivate) to change the layout of a BMenu after it is created. Deskbar uses this to switch between horizontal and vertical modes (before it would have to rebuild the whole menu, which had some bugs).</li>
<li>Drawing problem with rounded corner buttons (skipp_osx). Visible only in Keymap, since other apps don't use this a lot</li>
</ul>

<h3>Video drivers</h3>
<ul>
<li>The VESA driver doesn't reset the video mode if the requested one is the same as the current one, when switching workspaces for example (axeld).</li>
<li>intel_extreme handles the vertical blank interrupt on Ivy Bridge and later devices, making GLTeapot and other apps relying on vertical sync to work (and without tearing).</li>
</ul>

<h3>Packages</h3>
Aside from the already mentionned packages for LLVM and clang, there are several new packages:
<ul>
<li>lighttpd (PulkoMandy), used for WebKit HTTP tests</li>
<li>coreutils (korli), replacing the built-in Haiku version</li>
<li>BePodder, Photograbber, BeFAR (diver), classical and useful BeOS/Haiku native apps</li>
<li>bookmarkconverter (humdinger), converts bookmarks between Haiku and "netscape" standard format (for Qupzilla and other browsers)</li>
<li>sdl2, sdl2_image, sdl2_ttf (PulkoMandy), to be used by games as they migrate from SDL 1.2</li>
<li>gdb (waddlesplash), replacing the in-tree version. The gdb debugger isn't used much in Haiku, as the native Debugger is much better.</li>
<li>xmlto (waddlesplash), a new way to handle the generation of the HIG (Haiku Interface Guidelines) from the docbook sources.</li>
<li>patch, bonnie++, ocaml, unzip</li>
</ul>

<h3>Network kit</h3>

<ul>
<li>file and data requests now send a fake HeadersReceived notification. This makes them behave more like HTTP requests, allowing for simplifications in code allowing use of both HTTP and file or data requests, mainly WebKit for now (PulkoMandy)</li>
<li>getifaddrs is moved back to libbnetapi for now. The goal is to have it in libnetwork, but it needs to be rewritten to not depend on libbnetapi features first. getifaddrs is a BSD function (not POSIX standard), but is the only reasonably portable way to enumerate network interfaces and addresses. It is needed to replace libbind with netresolv (axeld)</li>
<li>Fixed behavior of HTTP redirects to more closely match what Internet Explorer does, fixing problems on several websites including github.</li>
<li>Some fixes to the POP mail fetcher (jua). There is ongoing work since Haiku alpha 3 to get the Mail kit fully working.</li>

<h3>Deskbar and Tracker</h3>

The code for Deskbar and Tracker in Haiku comes from the OpenTracker project, which itself is directly derived from the original BeOS code after it was released under an open source license by Be, inc. The code is showing its age and wasn't touched much over the years, but this is changing now. Waddlesplash converted Tracker to use the layout kit, making it much easier to change the code to add more features.

<ul>
<li>Deskbar does not show an empty menu anymore (Jessicah)</li>
<li>Several style fixes, cleanups, refactors and improvements to Deskbar (skipp_osx)</li>
<li>Tracker status window now uses vector icons (waddlesplash)</li>
</ul>

<h3>Apps and demos</h3>

Waddlesplash did some cleanup of Pulse, DiskUsage and Cortex. These were adopted by Haiku but come from other developers, and the integration in our build system and coding style wasn't always that good.

mmlr fixed StickIt to handle multiple joysticks.

axeld improved the formatting of window and tab titles in terminal, allowing to get rid of extra whitespace. Jackburton made Terminal properly default to VL-Gothic when it is the only monospace font (when DejaVu is missing).

HaikuDepot reviews editor got undo/redo support (stippi). The goal here is to develop a complete rich text editor framework, which will in the long term replace BTextView.

<h3>MIME database</h3>

The playlist filetype now has a default icon. New MIME types are available for PBM and PGM images, as well as Jar files.

And that's it for February.