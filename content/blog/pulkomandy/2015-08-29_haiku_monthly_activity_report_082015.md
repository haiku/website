+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 08/2015"
date = "2015-08-29T09:32:29.000Z"
tags = []
+++

<h3>Statistics</h3>

This report covers commits hrev49500-hrev49593.
Detailed statistics: http://pulkomandy.tk/stats-201508/
<!--more-->
<h3>Packages</h3>

We are still uploading packages manually at the moment, as the Haiku Kitchen isn't live yet.

Korli updated packages for nano, mpg123, libmikmod, libpng, lz4, curl, openssh, cmake, yasm, tcpdump, libpcap, ncurses, unrar, bash, and libunistring.

PulkoMandy added packages for 2cdt, d52, radare2, xmlroff, GrafX2, and their dependencies.

Diver and Humdinger updated bepodder and added qbittorrent with its dependencies.

The LnLauncher package now includes a launch daemon script, so it will start itself at boot automatically when installed.

Jabber4Haiku, an XMPP client, is now available. It is probably the most complete client, including buddy icons, sounds, conference support, and a complete settings window.

<h3>Networking</h3>

The TCP stack in Haiku is not fully optimized. Over the years, other operating systems developed a lot of tricks and finetuning to get the most performance out of TCP and circumvent some limitations in the protocol design.

mmlr started reviewing our TCP code and found several problems, which would lead to useless retransmission of packets, and generally poor TCP networking performance. One case where this was very noticeable is when uploading big packages to the Haiku repositories. Now this, as well as anything involving sending TCP packets, will work a lot better.

Jackburton applied an improved version of a patch he wrote a long time ago, that should fix some race conditions and crashes when deleting network interfaces.

<h3>Media</h3>

Barrett continues his work on the media kit. He has rewritten parts of the BBufferProducer and BMediaEventLooper to fix some longstanding issues. He also continued his work on improving the "restart media services" process and making it safer.

DeadYak fixed the launch scripts so media_server is launched only after all volumes are mounted, allowing it to find and load sound effects that are not on the system disk.

Jackburton fixed the initial selection of a sound font for MIDI. There is no need to manually pick one in Media preferences now.

<h3>Interface kit</h3>

Jackburton removed some old non-BControlLook code. The BControlLook class is what implements the current look for all interface controls in Haiku. It is designed so it can be replaced with another implementation to provide theming support (or just a different look). However, there is also a lot of code in controls for when there is no control look at all, usually implementing a simpler look more similar to BeOS R5. We don't use this anymore, so it can be removed.

He also fixed an issue in app_server where it could crash if passed a NULL BBitmap in some cases. It is a good idea to not let the whole app_server crash because of one misbehaving application.

Axeld improved the layouting of BTextView so it can autosize itself in layout mode properly.

jscipione added a BSpinner class. This is a text control used to enter numeric values which also has "+" and "-" buttons. It replaces number-only text fields in several preference panels, and is an alternative to BSlider in some cases.

Jackburton fixed a BeOS compatibility problem in BBitmap archiving, which fixes some buttons in Sequitur not having a button.

<h3>Launch Daemon</h3>

The launch daemon is still getting some bug fixes.

It will now set the HOME environment variable properly. Before there was extra quoting there which would confuse applications.

mmlr also made several fixes to the launch daemon and BRoster to fix the intermittent boot failures. There was a change in the way the "servers" launched by launch daemon are created. The Launch Daemon first allocates a communication port for them, then passes it on to the actual server once it is launched. There were some problems in this approach leading to messages being sent to the wrong team, and deadlocking the boot process.

<h3>Applications</h3>

Ingo added support in Terminal to detect file paths starting with "~". These can now be alt+clicked to open them in Tracker like other paths andURLs.

DeadYak fixed a problem in Debugger where it would fail to save a debug report in some cases. He also added a status bar to let the user know when some long operations are taking place.

Andrew Lindesay made some changes to HaikuDepot to make it better interact with the web backend. HaikuDepot got its own user agent so the backend can easily identify it. Stippi merged a patch from TwoFX to list package contents as soon as it is known, when installing a package for example.

mmlr fixed a crash in Tracker. Axeld added a "skip all" button to the copy/move dialog when there are file name conflicts with the target.

humdinger improved the look of network preferences, avoiding controls jumping around when selecting different services.

PowerStatus will now show a different icon when the battery is being charged.

<h3>C library</h3>

DeadYak modified our implementation of fts.c (functions to traverse a directory hierarchy) to be more glibc-compatible. This fixes some crashes in the GNU coreutils which were trying to replace these functions with their own implementation, because ours didn't provide the appropriate weak aliasing system.

mmlr merged the "guarded heap" into libroot_debug and made some fixes to it regarding memory alignment. The guarded heap is an implementation of malloc that will always allocate memory as close as possible to the end of a physical page. This means that writing past the end of an allocated area will immediately crash the application. This can be used to spot out-of-bounds accesses right as they happen. The existing code in libroot_debug only detects the problem when the memory is free'd, and the non-debug allocator may detect it only even later.

mmlr also improved the leak_analyzer tool (used to analyze logs from the guarded heap and find memory leaks there) to filter out memory allocated for libicu. The tool has some limitations, and can not be used for debugging the memory allocated during early initialization of the libroot. Because we use libicu for locale support, it must be included there.

<h3>Filesystems</h3>

mmlr added a "negative entry cache" for file systems. We had an entry cache that would store disk pointers for file entries, allowing to quickly locate a file on disk without crawling the directory structure every time. However, this did not store anything when the file was not found. It will now store that information, so applications can know much faster that a file is missing. This improves performance, in particular in the case of running big compilations such as webkit, where there is a lot of activity on a limited set of files. It is currently used only by BFS, but other filesystems could get support as well.

<h3>ARM port</h3>

Kallisti5 started work on getting the userland to build on ARM platforms. Until now the ARM port was only including the kernel, which boots far enough to look for a BFS partition to mount. It is time to feed it with something.

<h3>Localization</h3>

I didn't talk about it much in these reports because updating of locale files from the translation server is automated, but we have several people working hard to translate Haiku in various languages. There are translations for 40 languages being worked on at http://i18n.haiku-os.org/pootle/ (this is more than the number of languages available for Windows 10). If you are looking for a way to get involved in Haiku, but you don't want to write code, this may be one. Translating in new languages or help keeping existing translations up to date is welcome.

The active translations this month are French, German, Hungarian, Japanese, Polish, Russian, Spanish. Last month the Maori language was added and the work started.

<h3>Various other things</h3>

Waddlesplash removed some now unused code from the tree: rman and services_daemon (which was an attempt at automatical relaunch of daemons in case of crashes. This will now be handled by the Launch Daemon instead). He also fixed a crash in Tracker and tweaked the look of BAlerts which had gotten some extra spacing last month, and fixed some memory leaks and missing error checks.

ttcoder found a problem in the "MouseDownThread" used in our BMenu code, which was exited by a kill_thread leading to a memory leak. He also identified a new problem in BLooper which would lead to a port leak. Since ports are a limited resource in Haiku (there are 4096 of them), and a core part of the system (BLoopers rely on them to send and receive BMessages), when running out of port the result would usually be an app_server crash, with Debugger failing to start because it also needs ports. The system would then appear to freeze as nothing would be drawn to screen anymore.

PulkoMandy improved the French keymap. The official layout for the keymap is missing some symbols that are required for typing French. There are non-standard extensions to it, and Haiku now provides one of these (using the same mapping as Linux where it makes sense).

jessicah fixed an off-by-one error in the package server.

Anarchos made some changes to the AHCI (SATA) driver to fix booting on his machine. Testing on this is welcome as it appears to break the boot in at least one case. We hope to hear from users on wether it helps or break things for them.

mmlr improved the look of the keystore_server dialog.