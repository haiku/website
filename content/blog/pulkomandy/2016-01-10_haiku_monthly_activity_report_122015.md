+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 12/2015"
date = "2016-01-10T10:45:12.000Z"
tags = ["activity report"]
+++

Hello everyone, welcome to 2016!

After a break in November because of BeGeistert, the monthly reports resume on
almost normal schedule (yes, I start with this one being two weeks late!).

Anyway, let's see what happened during the last two months in Haiku.

<h3>Statistics</h3>

This report covers the range hrev49750-hrev50011. We just passed the 50000
revisions range, which mmu_man celebrated with a birthday cake icon in hrev50000.
2016 will also be the year of Haiku 15th birthday, but this will happen a bit later,
in August.

Detailed statistics will be available soon.

<!--more-->

<h3>User interface</h3>

hrev49750, hrev49809: Skipp-OSX fixed some drawing glitches in Tracker.

hrev49761: humdinger reworked the UI of several applications to make better use
of the layout kit and standardize the spacing between nterface elements. This
should give an even more integrated look to Haiku applications, setting an example
for 3rd-party developers. This also changes the way we layout windows when there is
a "global" tab view, removing some useless spacing and boxes. One example is the
appearance preferences.

<h3>Kits and APIs</h3>

hrev49751: mmlr changed BLocker behavior to be closer to BeOS R5. BeOS R5 allows unbalanced
unlock, which means the recursive lock count can become negative. This is quite
unusual, but some applications actually rely on it. This gets SDL+OpenGL games
running as expected again (but we still should review the locking in our OpenGL
port, which is doing strange things).

hrev49756, hrev49798: mmlr fixed some issues in BPathMonitor leading to path corruption because of
incorrect locking, which led in particular to several problems in input_server, such as
a crash during initialization, or unability to use USB input devices.

hrev49788, hrev49789, hrev49790, hrev49791: Improvements to the BCertificate API to manage SSL certificates,
use of said API in BHttpRequest to allow adding temporary exceptions when an untrusted certificate is encountered.
This makes surfing websites with untrusted certificates more reasonably possible, as the warning message will only
happen once, instead of once for each request.

hrev49800: BSecureSocket uses a new way to validate certiciates introduced in OpenSSL 1.0.2, allowing us to use an up to date "ca_root_certificates" package again. We were stuck with an old version of that package because of compatibility issues between the new versions and older versions of OpenSSL.

hrev49808, hrev49811: preliminary support for HTTPS with proxies in BHttpRequest.

hrev49839: fixes in BHttpRequest to improve compatibility with various websites.

hrev49807, hrev49810, hrev49843, hrev49850: Jua did a lot of work during 2015 to improve drawing performance in WebPositive. This led to introduction of new APIs in BView for masking and compositing, and the matching implementation in app_server.

hrev49837: Patch by TwoFx, one of last year GCI students, to rework the translator system and fix a crash when a translator is removed (for example when uninstalling the package that contains it).

hrev49893: Barrett continues his work on the Media Kit, fixing several issues, and also reworking the "watchdog" system to use the launch daemon (no more "restart media services").

hrev49898, hrev49900: implementation of BMediaEncoder, which was still missing.

axeld continues his work on updating the mail kit and improving it. During these
two months he reworked the user interface for the preferences window, and continues
cleaning up the code in various areas of the mail kit.

hrev49943: TwoFx added a BCardView and support for BCardLayout to BLayoutBuilder,
making it easier to use the BCardLayout.

hrev49954: waddlesplash fixed a crash in BTextView when trying to open an empty file with it.

<h3>Launch daemon</h3>

hrev49753: The Launch Daemon now supports automatically restarting services. For
example, if the DeskBar or Tracker crashes, they will be restarted automatically.
This means there is no need to go to the TeamMonitor and "Restart the Desktop"
anymore. This also applies to several other servers (notification, print, midi, etc),
making crash recovery in these areas more easily possible.

hrev49768, hrev49772, hrev49781: API and command line tool for controlling services, making it possible
again to stop a server after the above.

<h3>Low-level application support</h3>

hrev49754: Patches from a new developer in Haiku land. Simon South is working on
getting Emacs to run on Haiku. His work involves some changes to rather low level
parts of the OS, including:
<ul>
<li>Addition of a public elf.h header for applications which want to manipulate ELF files directly. ELF is the file format for executables and libraries, used by Haiku, Linux, and several other operating systems. Notable exceptions are Apple systems (which use Mach-O) and Windows (which uses PE).</li>
<li>Addition of an implementation of brk and sbrk, allowing apps to provide their own memory management if they don't want the traditional malloc (hrev49872)</li>
</ul>

hrev49944: mmlr fixed some issues in the runtime_loader, which could lead to memory allocation issues.

<h3>Applications</h3>

hrev49760: Sudoku now uses the layout kit (axeld)

hrev49801: SerialConnect can now convert the line ending characters, allowing to use it for sending AT commands to modems and mobile phones, for example.

hrev49805: DeadYak continues his work on the Debugger, with expression evaluation.

hrev49827, hrev49838: WebPositive now has a cookie editor window, and will restore your browsing session when you quit and re-launch it.

hrev49840: Fix the IP address controls to avoid freezing network preferences.

hrev49863: pkgman can now search for packages which requore a given one. This is useful for exploring dependencies and deciding if breaking a package will create many problems or not.

<h3>Drivers and Kernel</h3>

mmu_man fixed his googlefs filesystem, which allows you to use Haiku queries to make requests to Google's search engine (hrev49779). In the process he found and fixed a bug in the VFS layer common to all filesystems (hrev49778).

hrev49816; hrev49817: mmu_man added support for fomatting disks using the FAT filesystem. This is the standard filesystem for SD cards and USB drives, so you can now format such drives in a way that other operating systems understand better than our BFS.

mmlr fixed a crash in the debug build caused by different C++ classes in the kernel having the same name. In release mode, everything was inlined and there was no problem, but in debug mode, the classes where mixed up and methods from one would be called when the other was expected (hrev49787).

hrev49845: the XHCI (USB 3) driver is now included in the default image, with only a few select controllers enabled. While it is still not quite ready, this will make testing it a bit easier.

hrev49859: Jessicah continues her work on EFI and GPT support.

hrev49942: After a few years away from Haiku, rudolfc is working again on the (old) NVidia driver, with the addition of simple dual-head output support (hrev49980), and on the VIA display driver (hrev49983).

hrev49969: an old patch to make our PPP support work again was finally merged. PPP is the protocol used to connect to internet with an old-style modem, but also for USB tethering with some mobile phones (such as mine), and some DSL modems which are not routers.

hrev49977: looncraz contributed a patch providing live update of the whole OS when you change colors in the user preferences. Before this, all windows had to be closed and opened again for this to work.

<h3>Locale support</h3>

hrev49757, hrev49765: New icon for the Catalan and Breton language flags. Help translating Haiku to these languages, and more, is welcome.

hrev49780: Localization of the Network Preferences works again.

<h3>Packages</h3>

As usual, several packages were updated, and this time I'm too lazy to build a complete list.

OpenSSL was updated to 1.0.2, which required a rebuild of several packages which depend on it.

ffmpeg for gcc4 is updated to version 2.8, from the old 0.11 we were using (hrev49802). This is generally more stable and faster, however, there are still some issues with it, which lead to 2x speed video playing in Youtube, and hashed sound in MediaPlayer if you run a gcc4 build of it. Several follow-up fixes to update our use of ffmpeg to this new version (hrev49844, )

New packages for fossil (a source control system not unlike git, hrev49785), Sanity (a tool for using scanner in Haiku, hrev49842), hdialog (a tool similar to xdialog, allowing to build complex user interface dialogs from a shell script, hrev49866)

<h3>Ports</h3>

js made some work on getting the ARM port working with the clang compiler as well as gcc (hrev49762, hrev49763, hrev49764, hrev49766, hrev49769, hrev49770, hrev49771, hrev49773, hrev49775, hrev49776, hrev49777, hrev49782, hrev49783, hrev49784, hrev49786, hrev49792, hrev49793, hrev49794, hrev49795, hrev49796, hrev49797).

korli is working on updating our sources to support gcc5, which we will eventually migrate to as a replacement for gcc4 (gcc2 will be kept, for now). (hrev49774,