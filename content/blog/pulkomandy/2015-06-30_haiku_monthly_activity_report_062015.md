+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 06/2015"
date = "2015-06-30T19:40:23.000Z"
tags = []
+++

Hi there, it's time for the monthly report!

<h3>Statistics</h3>

Commit range scanned this month: hrev49209-hrev49344.

There are currently 38 tickets open in the beta 1 release. For the first time, we are below 40.
<!--more-->
<h3>Packages</h3>

Humdinger: The CatKeysEditor application is now available. It can be used to translate applications, just like the Pootle website. This can be used to translate Haiku itself, but also 3rd party applications that are not hosted on Haiku servers.

Humdinger: update ubertuber and quicklaunch.

Humdinger: update of mplayer package.

3deyes: add QMplay2 and dependencies.

Jessicah: Libxml2 can now properly use XML catalogs.

Jessicah and Anarchos: port TeXLive and LyX.

hamishm: Fix Ruby 2 port by removing several old BeOS hacks which made it crash. Since Haiku is more POSIX compatible than BeOS, it is now possible to share more code with the other ports.

korli: update gzip, expat, bash, dos2unix, freetype, readline, cmake, openssl, cdrtools. This is part of the effort to remove code from Haiku that was copied from these project, and use the originals instead, reducing the work our developers have to do.

3deyes: Add the Arduino IDE. You can now program Arduino devices from Haiku.

3deyes: update nanosvgtranslator, a translation add-on for SVG images.

<h3>System libraries</h3>

AGMS: Fix BMessage::SetCurrentSpecifier which would allow out of bounds access.

mt: Fix some compilation issues with GCC 5. Fix a memory leak in app_server.

hamishm: allow chmod() to NOT change user or group. Before it would always reset them both, and you may want to change only one.

hamishm and axeld: fix thread ID of forked children. fork() is a system call at the core of UNIX systems, as it is the way to create new processes. While Haiku has different ways to do this through BeOS APIs, the POSIX ones are used a lot in ported software. There was a bug there where the created process would still use the parent's ID, breaking most of pthread support. Other issues were also fixed in that area, which relate to using the BeAPI from the child application. Since applications are usually started using the Be API, this was not easily noticed, but things didn't work quite right when a BApplication tried to fork itself, then execute another app.

axeld: work on the JobQueue. This is a new class in Haiku that was developed as part of the package kit. It allows to run a set of "jobs" one after another, with dependency tracking. This will be part of the support kit and be used in the launch daemon.

korli: implement malloc_usable_size, an extension provided by Linux and FreeBSD and required by Blender. It allows to know how big a block allocated with malloc() is, and the implementation is quite simple.

<h3>User interface</h3>

Janus: StyledEdit gets some attention. It now has a navigation menu in the status bar just like Tracker, allowing you to explore things around the text file being edited.

Janus: The printer preferences got a cleanup as well, and is now using vector icons. The BootManager installer also saw some fixes.

Janus: fix infinite loop in Backgrounds, remember the directory to use for the file panel.

Janus: make Icon-O-Matic lists use colors from Appearance.

Janus: use a more reasonable window position when opening an hpkg file with Haikudepot

Janus: fix sorting package by size in HaikuDepot.

Janus: improve look of Tracker, especially with big font sizes.

waddlesplash: don't scroll output in Expander automatically. Allow user to navigate the window while it's still being populated.

humdinger: improve look of Network preferences.

jessicah: fix handling of duplicate MIME types in Find panel.

waddlesplash: improve layout and wording of the timezone change prompt.

<h3>Applications</h3>

DeadYak: Cleanups and refactors in Debugger, work in progress to allow editing of variables.

jessicah: fix setarch so it works even when called recursively, and make it start a login shell so bashrc is read.

jessicah: make sure post-install scripts from packages are run when packages are activated at boot. This makes it possible for packages to run a script when they are installed, the script can be used to migrate or cleanup old setting files, for example.

pulkomandy: rewrite top() in C++. We use an old version of this that once was a sample from BeOS R3, and it was time for an update. The new code is simpler and has less bugs.

skipp_osx: revert breakage of tracker add-ons. An attempt to improve things for one of the add-ons broke everything else.

<h3>Networking</h3>

Hamsihm: Work on improving behavior of sockets to improve compatibility with other POSIX sockets implementations.

PulkoMandy: implement MSG_NOSIGNAL flag in send(). This is one addition in the latest POSIX spec, and allows send() to not send a signal if the socket is closed. This makes it easier to write threaded code using sockets.

PulkoMandy: add a DNS cache to BNetworkAddressResolver. This avoids querying the DNS server several times for the same website, by storing the IP address returned the first time then using that for all requests. It can speed up loading of web pages if you have a slow DNS server.

PulkoMandy: replace libbind with netresolv. netresolv is a project from NetBSD to continue development of libbind. They both provide DNS resolution through the POSIX APIs such as getaddrinfo, gethostbyname, etc. Unfortunately, this update created several regressions, some of which are still being worked on. We may need to merge further changes from either Android or FreeBSD to get a completely working solution.

<h3>Drivers and hardware support</h3>

lioncash: Fixes in the 53c8xx driver.

jessicah and kallisti5: Support booting from GPT disks. The master boot record is a small piece of code that is written to the first sector of an hard disk. It is read by the BIOS at boot and executed. Its work is to find the operating system and run it. To do this, the MBR must know about the partition layout of the disk. Until now, Haiku's code would only handle the MBR layout, and would not find the OS on GPT disks. This is now fixed, making it possible to boot Haiku on GPT system without installing another MBR. Jessica also made other fixes, especially in the GPT partitioning add-on and in makebootable.

pulkomandy and puckipedia: don't crash in case of GPT partition pointing to itself. Puck (in his typical hacker spirit) managed to partition an USB drive so that a GPT entry would point to offset 0 in the volume. Since Haiku allows recursive partition maps, it would detect the GPT header again, and recurse until it overflows the stack. The result is an USB drive that reboots any Haiku computer when plugged to it. 

mmu_man: work on getting the PPC port to compile again.

<h3>Documentation</h3>

waddlesplash: lots of small cleanups and deleting of outdated information from the developer documentation.