+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 04/2015"
date = "2015-04-25T17:59:47.000Z"
tags = []
+++

A new month, a new report!

<h3>Statistics</h3>

The commit range this month is hrev48952-hrev49106. I got bored of doing the statistics by hand, so I've run the repo through <a href="http://gitstats.sourceforge.net/">gitstats</a> instead. This gives more information than what I could do manually, including a listing of the most active commiters this month. Be sure to have a look at <a href="http://pulkomandy.tk/stats-201504">the results</a>!

<!--more-->

<h3>General news</h3>

Rather sad news this month: after years of service, bebits.com was put offline. This is another piece of the BeOS history disappearing from the web. However, there are some backups, and we'll see what can be done with them.

Another thing to mention is the analysis of Haiku sources by PVS-Studio. This is a static source analysis system similar to Coverity. It is commercial software, but they ran one analysis for free on the Haiku source (they did a similar thing for the Linux kernel already). They sent us the results, and the developers will be fixing the many stupid mistakes the tool detected. You can read more about it in <a href="/news/2015-04-22_analysis_haiku_operating_system_beos_family_pvsstudio">a separate news article</a>.

<h3>Outside the tree</h3>

Some developers are working on new features outside the main git repository (often for big changes that would break everything). This month, we saw commits from:

<ul>
<li>Axeld working on a "launch daemon" for Haiku. Inspired by Apple's launchd and Red Hat's systemd, this will replace our current boot script. The launch daemon will take care of starting all of the system servers, and making sure they are restarted in case of a crash, for example. Potential improvements are a faster boot process (using all CPU cores instead of just one with the sequential boot script), a more stable system (with automatic restart of the servers), and a more customizable boot process (packages will be able to add new servers, which was difficult with the previous boot script approach). It will also help handling services restart on system updates, if/when we consider doing that (this means, it would be possible to update some servers without needing to restart the computer).</lI>
<li>Jessicah and tqh are still working on UEFI boot support for Haiku. This would help supporting Apple machines, but could be useful on PCs as well to avoid booting through the legacy BIOS. The BIOS is generally available in current machines, but this will probably change over time, so we'd better be prepared.</li>
</ul>

<h3>Packages</h3>
3deyes worked on extending our set of translators and support for documents and images. Now available in HaikuDepot are DjVuViewer and DjVuTranslator (for djvu files, an alternative to PDFs), NanoSVGTranslator (for SVG graphics), jbig2dec, a new version of MuPDF and DocumentViewer as well as a new PDF Translator, openjpeg. He also added support for multiple page documents in ShowImage, which can now be used for PDF and DjVu files (and a few other multi-page formats).

With help from diver, he also uploaded packages for GenesisCommander and an updated version of Qupzilla. They also added new packages for BeZilla (Firefox 2.0) and MailNews (Thunderbird), as well as a set of VST instruments called mda_vst (to use with Cubase or similar apps).

korli worked on keeping the UNIX tools up to date, with updates to the ca_root_certificates (SSL certificates used to check which websites are "safe" for HTTPS, for example), patch, wget, which, coreutils.

PulkoMandy also uploaded several packages, including a complete GCC toolchain for AVR8 microcontrollers (if you want to do some Arduino development), as well as several old libraries needed to get VLC 0.8.6 in a package (work still in progress). He also worked on updating ICU to the latest release to provide even better internationalization support.

Olta released version 1.2 of Beam, with several fixes accumulated over the years.

Humdinger updated the cdrecord packages, however it is currently still broken. We have discussed this with the main cdrecord developer, and helped them identify some issues in their code. We also found some problems in Haiku. Once all issues are fixed, we will have a working cdrecord package again. Humdinger also uploaded a package for FilWip.

AnEvilYak updated packages for the gcc4 version of Haiku: BePDF, Pe, Vision, and added libsanta.

<h3>64-bit userlandfs</h3>
mmlr fixed some issues in userlandfs, making it 64-bit safe. The userlandfs allows testing of filesystem drivers without loading it in the kernel space, making it possible for developers to use all userland debugging tools to get a filesystem working (and avoiding the kernel debugger as much as possible). Userlandfs can also be used to run BeOS filesystem add-ons (they are not directly compatible with our kernel), as well as FUSE ones, coming from the Linux world.

<h3>Memory faults debug</h3>

mmlr also worked on several use-after-free and other memory usage problems using the guarded heap. This is a special memory allocator that will use a lot more memory than the normal one, but will catch programming errors (like accessing a memory segment after it was freed, or accessing memory outside the bounds of the segment) immediately; the normal allocator usually notices these problems only much later, when the memory is released.

malloc_debug can now display a stack trace to help the developer know where the problems are.

Using these new features allowed to find and fix problems in BShelf, BView, Tracker, media_addon_server, HaikuDepot, BPathFinder, libmedia, the input server Keyboard add-on, AboutSystem, Shortcuts, libicon, the network stack, B*Layout, usb_hid. Well, everywhere around the system.

mmlr also identified a bug caused by a class name conflict between libmedia and the input_server, which was causing the latter to enter an infinite loop as it tried to use a class from libmedia instead of its own code. He also fixed silent relaunch of applications with arguments (this allows to use the command line to call an already running application and give it new command line arguments).

Barrett worked on Deskbar, DeskBar replicants and the Media Kit to fix some memory leaks and other similar problems.

<h3>User interface</h3>

Waddlesplash added the "hide dotfiles" option to Tracker, useful if you want to browse the home folder from your Linux system. He also made some other cosmetic and bug fixes to Tracker. He also converted TextSearch to use layouted views, and cleaned up the code a bit.

Axel continued his work on the new Network preferences panel. Just like in BeOS, you can now configure services there (ssh, ftp, and telnet).

Janus was also quite busy this month, fixing a crash in BColumnListview, and also making it support bigger font sizes. He also fixed several apps and preferences panel to all have the same layout for their buttons (so "Apply" and "Revert" are always at the same place and always behave the same). He also improved support for changing colors in the Appearance preferences (not all apps and controls would use the colors where they would be needed).

Janus also fixed some problems with the image cache in ShowImage, which would sometimes crash.

<h3>Package management</h3>

Axeld implemented reporting the package size while installing packages, so applications can now report the download progress in bytes, instead of just a percentage. Stippi made some progress on HaikuDepot, allowing to show the "title" of packages, rather than the "name" (this means you can get  the correct name, with spaces, special characters, and uppercase letters, for your packages). The app is also showing the size of the packages now.

<h3>Architectures and ports</h3>

kallisti5 updated the Mesa package for x86_64 to version 10.5.2. But he is mostly working on the ARM port (and more specifically Raspberry Pi 2 and Cubieboard 4 support).

mmu_man resumed work on the PPC port and fixed several issues with the build tools. He got things far enough to get a bootable image (with just the kernel) to run on an old Macintosh system.

<h3>Drivers</h3>

Ithamar pushed several fixes to the USB driver to improve handling of stalled devices, making USB generally more reliable. He also changed the panic when the system is unable to write to a disk to a simple log message in the syslog, so unplugging a USB disk without unmounting it will no longer crash the whole system (you may still lose some of your data, however).

<h3>Documentation</h3>

waddlesplash made some improvements to the looks and typesetting of the Haiku Book.