+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 03/2015"
date = "2015-03-29T12:55:35.000Z"
tags = []
+++

Hello there, here comes the activity report for the month of march 2015.

This month there were 104 commits (hrev48848-hrev48952), 5 more than in the previous month.

<!--more-->

<h3>General news</h3>

First of all, some news not directly related to the commits which happened this month.

As there was no release of Haiku for more than 2 years since Alpha 4, people at TuneTracker Systems decided to release their own distribution of Haiku. It comes as an USB stick you can order at http://discoverhaiku.com/ . TuneTracker Systems is one of the profesional users of Haiku, and they contribute to the project by providing a lot of testing and feedback, donate money to Haiku, inc. whenever possible (all their computer purchases are done using goodshop, for example), and pay developers directly when they really need a problem solved (this year they paid mmlr to work on the CDDA issues).

izcorp (http://www.izcorp.com/) is another company is planning to use Haiku in a commercial product. Their line of studio recording systems is currently running BeOS and Zeta, but they are working on an update to Haiku. Ithamar is working with them to get their hardware fully supported, and the changes will be upstreamed to Haiku in the coming weeks. This includes several fixes to the USB stack, the intel_extreme driver, and there could be more to come.

We have also reached the mark of 50 tickets left before beta1 happens.

<h3>User interface</h3>

Waddlesplash continued his efforts on cleaning up the Tracker code and fixing several minor problems with it. It is nice to see someone taking care of Tracker and cleaning up the code. While there aren't much functional changes yet, having
a clean code base is important for future improvements. John Scipione also helped with this, and cleanups in various Tracker add-ons, Deskbar, and the storage kit.

John also fixes DiskUsage to give more useful results, as it was a bit confused by the package filesystem. This also included some minor ui and code style fixes. He also improved the look of radio buttons and checkboxes with bigger font sizes.

Janus contributed several user interface fixes. Showimage, mail preferences, appearance, printers, media, got small interface changes. The goal is to make the apps all use the same conventions, for example the same positionning and ordering of default/revert buttons, and some behavior fixes (disabling the buttons as appropriate).

Axel merged his work on the network preferences. Most of the issues with the new preflet are now fixed (there are some left), and the interface between the app and the network kit was cleaned, which could make things simpler for alternative network managers as well. This work also includes a more complete "services" tab allowing to configure SSH and FTP. This is one more feature from the BeOS we were still missing.

Jessicah and waddlesplash made some small improvements to pkgman console output. The progress bar will work properly when the terminal is less than 80 chars wide, and it will show "update" instead of an "install/remove" pair when updating a package.

<h3>New functionality</h3>

3deyes contributed a translator for DejaVu files, as well as a viewer for the DjVu format.

<h3>Packages</h3>

Korli continued his work on outsourcing packages from Haiku sources. We are now using external packages for zip, netcat. Existing packages for wget, dtc, lzo, libssh2, mpg123, harfbuzz, nasm, libvorbis, openssl, libxml2, llvm, nano, icu, libpng were also updated.

Humdinger also contributed some packages (additions and updates) for Haiku native apps and ports: yab, unrar, befar, beae, weather, beezer, desknotes, documentviewer, MeV, seeker, slayer.

Joe Prostko added packages for Fossil, which are the result of a long term effort to get the tool running on Haiku and upstreaming the changes to Fossil.

Waddlesplash added packages for LMMS, a Qt-based digital audio workstation.

<h3>Drivers and kernel</h3>

Jérôme Leveque contributed patches to fix the ice1712 sound card driver which would play garbage on system with more than 256MB of RAM. The hardware can only address the first 256MB of memory, and the driver would not make sure the buffer were allocated in that area. It does now, so the correct data is sent to the souncard.

Korli also worked on some improvements to the AHCI (SATA hard disks) support, which still has problems on some machines. He also fixed an issue in our C library which would trigger a crash when using threads with libroot_debug.

A series of patches from Barrett were pushed, which improves several aspects of the Media Kit. Besides the usual round of cleanups, this improves the shutdown/restart process of the media servers, and includes a rework of the BTimeSource class. There are more patches being reviewed on Trac.

Axel added support for B_TIME_TYPE in listattr and addattr, so you can now use these to manipulate the mime type of files.

mmlr fixed a problem in the rootfs where renaming an entry to a longer name would overflow a buffer and corrupt memory. This was probably the cause for at least some of our CDDA issues. This was a longstanding problem for TuneTracker Systems, as they use CDDA a lot.

Kallisti5 started work on Raspberry Pi 2 support. The first version of the Pi was hugely popular, and one of the devices that people wanted to run the ARM port of Haiku on. However, it used an ARMv6 CPU, while every other modern system uses version 7 (or 8). The support for ARMv6 needs some extra work in the kernel, which wasn't worth the effort, even for a target as popular as the Pi. But the new Raspberry Pi 2 comes with an ARMv7 CPU. This means we will be able to use the same ARMv7 system on it as on all other ARM devices. This makes it a much more interesting target. The work done involves some cleanup of the existing Raspberry Pi support (since some of the hardware is similar, that part of the work is not lost), as well as general work on FDT support (the FDT is a way to get the same kernel to run on all ARMv7 devices, like we do for x86, instead of having a specific kernel for each board with hardcoded hardware support). Pawel Dziepak also helped improve some of the drivers for the Raspberry Pi 2, using C++14 features to make the code simpler (we can do this on the ARM code since there is no gcc2 legacy there). mmu_man also helped untangle the u-boot entry points (we still have some code left from his early u-boot experiments there, not all of which is useful with more recent versions of u-boot).