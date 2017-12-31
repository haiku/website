+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 12/2017"
date = "2017-12-31T20:26:14.000Z"
tags = []
+++

<p>Welcome to the last report for the year 2017!</p>

<h3>Stats</h3>

<p>Who doesn't like them? I updated the Haiku stats to keep track of
the <a href="http://pulkomandy.tk/stats">activity in our git repository</a>.
The overall number of commits is very similar to 2016 (which was our quietest
year so far) with more than 1300 commits (far from the 5555 commits in 2009).
Our author of the year is waddlesplash with 213 commitsi, followed by PulkoMandy,
Korli, Humdinger, Kallisti5, and Skipp_OSX. 65 different commiters
made changes to Haiku this year, a net increase from 48 in 2016, but not reaching
as high as 2012 (83 different committers). In the week-by-week graph you can
also clearly see the effect of the coding sprint, which is of course the week
with most commits.</p>

<p>Anyway, let's dig into this month changes to see what's cooking for 2018.
This report covers hrev51623-hrev51722 (exactly 100 hrevs!)</p>

<h3>User interface</h3>

<p>Lots of activity in this area, as polishing the UI is what makes the system
look smooth and finished. A subtle but important change was implemented by
Skipp_OSX, so that maximized windows will now avoid the deskbar. While maximizing
windows is not recommended (they should pick a size appropriate for their contents
instead), sometimes it does make sense to use as much screen space as possible.</p>

<p>Jua continued his work on improving HaikuDepot, with a better look for the
screenshot window (work he had started during the coding sprint).</p>

<p>Andrew Lindesay also worked on the network side of HaikuDepot, improving the loading of data from the haiku depot server.</p>

<p>The work on HaikuDepot spawned debate on the "barber pole" control, to use
as a progress bar when the total progress is unknown. Jua started designing a
new control for that, and Janus reworked the look and integrated it in places
where a barber pole was already used, such as Zip-O-Matic.</p>

<p>Janus also reworked the "key store" window (which you can see when saving a
wifi password to the keystore, for example). It now looks nicer with an icon and
other minor details.</p>

<p>Janus fixed a crash of StyledEdit when the search/replace window was open and the main window was closed.</p>

<p>Owen (one of our GCI students) made MediaPlayer accept URLs from the command line (not just from the GUI). He also worked on improving scripting support in MediaPlayer and Magnify, making it possible to control them using the "hey" command line tool, for example.</p>

<p>Hrishi Hiraskar (another new contributor) made it possible to move the notification window to different places. It does not need to be near the deskbar anymore.</p>

<h3>Legal</h3>

<p>Kallisti5 started a survey of licences used in Haiku. While most of our code
is MIT, some parts have a different history and for various reasons ended up in
our sources with different licences.</p>

<p>In the case of BFS recovery tools, they were integrated without a clear licence
mention. Axel confirmed that using MIT was fine, so this is now clearly indicated
in the files.</p>

<p>In the case of MediaPlayer, there was actually a different licence used.
However Kallisti5 contacted all authors who had edited the files since integration
in our source tree and they all agreed to relicence it as MIT.</p>

<h3>Package repositories and build infrastructure</h3>

<p>As mentioned in a separate news item, the package repositories are now
generated automatically. This means as soon as a recipe is added to the haikuports
repository, buildbots will make a package from it and upload it there, making
it available for everyone. This considerably reduces the workload in maintaining
the repositories, so Haiku developers can focus on more important tasks.</p>

<p>This led to a cleanup of the repositories as well as 3rd-party sources
included in the Haiku tree, making our codebase easier to manage as well.</p>

<p>Waddlesplash also cleaned up support for building Haiku with clang. While the
resulting images are currently unbootable, this allowed him to streamline support
for scanning our code at Coverity, and a new scan was finally made available, in
time for Google Code-In students to have a look at it.</p>

<p>mmlr did wome work on restoring support for "bootstrap" builds. These make
it possible to build Haiku witohut any binary downloads (normal builds rely on
pre-built packages for all 3rd party sources).</p>

<p>Waddlesplash cleaned up our configure script, made it autodetect some settings
(like host support for extended attributes), and made building on Haiku more
similar to cross-compiling, allowing simplification on the most ugly parts of 
our build system.</p>

<h3>Servers</h3>

<p>Axel added a test_launch_daemon, to help debugging launch_daemon problems.
Like the test_app_server, it allows to run the launch_daemon code in a somewhat
sandboxed environment, without interferring too much with the running system.</p>

<p>DeadYak worked on Debugger, with the ability to debug the runtime_loader, and
review of the code to track various memory leaks.</p>

<h3>Standard library</h3>

<p>As GCI is running and students are attempting to port all kind of software to Haiku,
some problems in our API were discovered.</p>
<p>Leorize added support for some secure BSD functions (explicit_bzero, readpassphrase, etc)
as a first step to porting LibreSSL. This is now pending a proper implementation of
arc4random (which needs a syscall and kernel-side entropy sources).</p>
<p>ohnx fixed a crash in calloc when called with strange parameters (such as negative sizes and item counts)</p>

<h3>Drivers and kernel</h3>

<p>Greg Cain continued his work on the USB3 stack, fixing some more problems
with it. While still not perfect, USB3 support is good enough for me to use my mouse
on an USB3 port (I ran into problems with usb to serial adapters last time I
tried, however).</p>

<p>Ayush contributed some more fixes to the TCP stack after his work done during
GSoC.</p>

<p>PulkoMandy fixed a corner case problem with stack alignments. The stack was
aligned only when entering the main() function, so use of sse2 functions in
early init code (static initializers) or late deinit code (static destructors)
could fail. This had already been fixed for 64bit architectures, but x86 32bit
had never been updated.</p>

<p>Hy Che's patches to btrfs (done this summer during GSoC) were merged. The btrfs write support is still incomplete and disabled,
but someone else can pick up the work from there, with a lot of the basic support already in place.</p>

<p>waddlesplash fixed some locking problems in the management of teams and their attached resources.</p>

<p>tqh fixed the UEFI build (still not included in anyboot images), fixed some
configuration issues in our ACPI port (some changes were overwritten last time
we updated from upstream) and he is now investigating some lockup on shutdown problems.</p>
