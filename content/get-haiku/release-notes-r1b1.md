+++
draft = true
type = "article"
title = "Release Notes"
tags = []
+++
date = "NEEDS_ACTUAL_DATE"

It's been almost six years since Haiku's last release in November 2012 &mdash; too long. Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide assurances against data loss.

As a result of such a long gap between releases, there are a lot more changes in this release than in previous ones, and so this document is weightier than it has been in the past. The notes are mostly organized in order of importance and relevance, not chronologically, and due to the sheer number of changes, thousands of smaller improvements simply aren't recognized here.

## System requirements

This release sees the addition of official x86_64 images, alongside the existing x86 32-bit ones. Note that these images are incapable of running BeOS (GCC2) applications, but they are as (or, in some cases, more) stable than the 32-bit ones.

<table><tr><td>
<h4>MINIMUM (32-bit)</h4>
 - **Processor**: Intel Pentium II; AMD Athlon
 - **Memory:** 256MB
 - **Monitor:** 800x600
 - **Storage:** 2GB
</td><td>
<h4>RECOMMENDED (64-bit)</h4>
 - **Processor**: Intel Core i3; AMD Phenom II
 - **Memory:** 2GB
 - **Monitor:** 1366x768
 - **Storage:** 16GB
</td></tr></table>

## New features

### Package manager

<img src="https://www.haiku-os.org/docs/userguide/en/images/apps-images/haikudepot.png" alt="HaikuDepot, the GUI package manager"><br>
<small><i>HaikuDepot, the graphical package manager</i></small>

By far the largest change in this release is the addition of a complete package management system. Finalized and merged during 2013 thanks to a series of contracts funded from donations, Haiku's package management system is unique in a variety of ways. Rather than keeping a database of installed files with a set of tools to manage them, Haiku packages are a special type of compressed filesystem image, which is 'mounted' upon installation (and thereafter on each boot) by the `packagefs`, a kernel component.

This means that the `/system/` hierarchy is now read-only, since it is merely an amalgamation of the presently installed packages at the system level (and the same is true for the `~/config/` hierarchy, which contains all the packages installed at the user level), ensuring that the system files themselves are incorruptible.

Since packages are merely "activated", not installed, this means that <a href="https://www.haiku-os.org/docs/userguide/en/bootloader.html">the bootloader</a> has been given some capacity to affect them: you can now boot into a previous package state (in case you took a bad update) or even blacklist individual files. (Blacklists can be made permanent through a <a href="https://www.haiku-os.org/guides/daily-tasks/blacklist-packages/">settings file</a>.)

<img src="/files/get-haiku/bootloader_blacklist.png">

And of course, since the disk transactions for managing packages are limited to moving them between directories and in and out of the "activated packages" listing file, installations and uninstallations are practically instant. You can thus also manage the installed package set on a non-running Haiku system by mounting its boot disk and then manipulating the `/system/packages` directory and associated configuration files.

In addition to HaikuDepot, there is also `pkgman`, the command-line interface to the package management system. Unlike most other package managers where packages can be installed only by name, e.g. `pkgman install rsync`, `pkgman install sdl2_devel`, Haiku packages can also be searched for and installed by provides, e.g. `pkgman install cmd:rsync` or `pkgman install devel:libsdl2`, which will locate the most relevant package that provides that, and install it.

Accompanying the package manager is a massively revamped <a href="https://github.com/haikuports/haikuports/">HaikuPorts</a>, which has moved from a organized array of build scripts to a well-oiled full-fledged ports tree, containing <a href="https://repology.org/repository/haikuports_master">a wide array</a> of both native and ported software for Haiku.

<img src="/files/get-haiku/ported-software.png" alt="A variety of ported software running on Haiku">

### WebPositive upgrades

Thanks to the generous support of donors, Haiku, Inc. was able to employ a developer to work full-time on enhancing WebKit port and areas of the system relevant to it (which turned out to be nearly everything) for <a href="https://www.haiku-os.org/blog/pulkomandy/2013-09-27_webkit_weekly_report_1/">over</a> a <a href="https://www.haiku-os.org/blog/pulkomandy/2014-10-24_webkit_weekly_report_50_one_year_webkit/">year</a>. As a result, the system web browser is much more stable than before, with various under-the-hood changes and a number of notable user-visible ones, such as YouTube now functioning properly:

<img src="/files/get-haiku/webkit.png" alt="WebPositive playing Rick Astley">

WebKit is a pretty hefty piece of software, and as a result working on bringing it up to speed meant also fixing a large number of bugs in Haiku itself that it exposed, such as broken stack alignment, various kernel panics in the network stack, bad edge-case handling in `app_server`'s rendering core, missing support for extended transforms and gradients, broken picture-clipping support, missing POSIX functionality, media codec issues, ... the list goes on.

For better or for worse, HaikuWebKit now also uses our own network protocol layer, which means that it now supports Gopher.

### Completely rewritten network preflet

The old network preflet was showing its age, especially following the addition of WiFi drivers some years ago. It has now been replaced with a <a href="https://www.haiku-os.org/docs/userguide/en/preferences/network.html">completely new preflet</a>, designed from the ground-up for ease of use and longevity.

<img src="https://www.haiku-os.org/docs/userguide/en/images/prefs-images/network-prefs-device.png" alt="new Network Prefs">

In addition to the (now-streamlined) interface configuration screens, the preflet is also now able to manage the network services on the machine, such as OpenSSH and ftpd. It uses a plugin-based API, so third-party network services (VPNs, web servers, ...) can integrate with it.

### User interface cleanup & live color updates

 - Tracker layout
 - Mail icons
 - Calendar https://www.haiku-os.org/files/blog/AkshayAgarwal007/calendar_preview_3.png
 - Decorators support S&T

### Media subsystem improvements

 - FFmpeg plugin refactoring
 - Streaming
 - DVB
 - HDA driver
 - APE reader (lol)

### RemoteDesktop

Remote drawing
HTML5 RD

### EFI bootloader and GPT support

This was one of the most complex features to implement, but its actual description is rather simple: booting from GPT partitions and on EFI devices is now supported. The EFI bootloader is included in the default "anyboot" images, and should work on all specification-compliant EFI machines, which includes most mass-market consumer hardware from the last 5 years, and Apple products from even before that.

### SerialConnect

 - New app
 - Improved USB + PC serial drivers to go with it

### New thread scheduler

also new memcpy/memset on x64
8 core limit from BeOS -> 64 cores; & this is arbitrary and easy to change

### ASLR, DEP, & SMAP implemented and enabled by default

### Built-in Debugger is now the default

Haiku's built-in <a href="https://www.haiku-os.org/docs/userguide/en/applications/debugger.html">Debugger</a>, experimental at the time of the last release, is now vastly improved and has replaced GDB as the default debugger.

SCREENSHOT!

In addition to the GUI, there is also a command-line interface for those who prefer it (and for handling crashes of critical userland services, such as `app_server`.) System-wide crash dialogs are also now serviced by Debugger, with the ability to save informative crash reports (<a href="https://dev.haiku-os.org/attachment/ticket/14232/WebPositive-942-debug-28-06-2018-05-33-35.report">example</a>), core files, or launch Debugger directly. This behavior can be configured to take one of these actions automatically via a settings file, if needed.

### launch_daemon

Replaces Bootscripts
services restart
user integrateable

### `virtio` bus manager and drivers

 - incl. virtio rng, net, block

### Updated Ethernet & WiFi drivers

Our ethernet & WiFi drivers, which are mostly taken from FreeBSD thanks to the use of a KPI compatibility layer, have been upgraded to those from FreeBSD 11.1.

MSI-X

### Updated filesystem drivers

NFSv4
BTRFS
UserlandFS+FUSE (and FuseSMB...)

### 64-bit `time_t` (except on 32-bit x86)

### Experimental Bluetooth stack

This one is the last ... because it really is the least, and it isn't even included with the release images, only recent nightly images. It "works" in that on a variety of Bluetooth controllers it can successfully display and pair with devices, but it can't do much more than that (and it crashes rather often.) But it's a start, at least!

## New contributors

<new-committers>

<new-patch-submitters>

<new-translators>







## Source code

The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is made available for download at: http://www.haiku-files.org/files/releases/r1alpha4/sources/</p>

## Reporting issues

There are over 3200 open tickets on Haiku's bug tracker and over 11000 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta1/ReleaseAddendum>.

For more help see the 'Welcome' link on the Haiku desktop, or visit the Haiku Project's website at <https://www.haiku-os.org>.
