+++
draft = true
type = "article"
title = "Release Notes"
tags = []
+++
date = "NEEDS_ACTUAL_DATE"

It's been just about a month less than six years since Haiku's last release in November 2012 &mdash; too long. Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide assurances against data loss.

As a result of such a long gap between releases, there are a lot more changes in this release than in previous ones, and so this document is weightier than it has been in the past. The notes are mostly organized in order of importance and relevance, not chronologically, and due to the sheer number of changes, thousands of smaller improvements simply aren't recognized here.

## System requirements

This release sees the addition of official x86_64 images, alongside the existing x86 32-bit ones. Note that these images are incapable of running BeOS (GCC2) applications, but they are as (or, in some cases, more) stable than the 32-bit ones.

<table><tr><td>
<h4>MINIMUM (32-bit)</h4>
<ul>
<li><strong>Processor</strong>: Intel Pentium II; AMD Athlon</li>
<li><strong>Memory:</strong> 256MB</li>
<li><strong>Monitor:</strong> 800x600</li>
<li><strong>Storage:</strong> 3GB</li>
</ul>
</td><td>
<h4>RECOMMENDED (64-bit)</h4>
<ul>
<li><strong>Processor</strong>: Intel Core i3; AMD Phenom II</li>
<li><strong>Memory:</strong> 2GB</li>
<li><strong>Monitor:</strong> 1366x768</li>
<li><strong>Storage:</strong> 16GB</li>
</ul>
</td></tr></table>

## New features

### Package management

<img src="https://www.haiku-os.org/docs/userguide/en/images/apps-images/haikudepot.png" alt="HaikuDepot, the GUI package manager"><br>
<small><i>HaikuDepot, the graphical package manager</i></small>

By far the largest change in this release is the addition of a complete package management system. Finalized and merged during 2013 thanks to a series of contracts funded from donations, Haiku's package management system is unique in a variety of ways. Rather than keeping a database of installed files with a set of tools to manage them, Haiku packages are a special type of compressed filesystem image, which is 'mounted' upon installation (and thereafter on each boot) by the `packagefs`, a kernel component.

This means that the `/system/` hierarchy is now read-only, since it is merely an amalgamation of the presently installed packages at the system level (and the same is true for the `~/config/` hierarchy, which contains all the packages installed at the user level), ensuring that the system files themselves are incorruptible.

Since packages are merely "activated", not installed, this means that <a href="https://www.haiku-os.org/docs/userguide/en/bootloader.html">the bootloader</a> has been given some capacity to affect them: you can now boot into a previous package state (in case you took a bad update) or even blacklist individual files. (Blacklists can be made permanent through a <a href="https://www.haiku-os.org/guides/daily-tasks/blacklist-packages/">settings file</a>.)

<img src="/files/get-haiku/bootloader_blacklist.png" alt="Blacklisting packages in the bootloader">

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

There were a lot of miscellaneous cleanups to various parts of the user interface since the last release.

<img src="/files/get-haiku/mail_and_people.png"/><br>
<small><i>Mail and Tracker, displaying some sample data.</i></small>

Mail and Tracker both received significant internal cleanup of their UI code, and as a result now sport Haiku-style toolbars and font-size awareness, among other applications. This makes future work to add proper DPI scaling (or, even further, right-to-left layouts)

In addition, the way most applications interact with system color settings has changed significantly. Instead of requesting a specific system color and then manipulating it, most applications now instruct their controls to adopt certain colors based on the system color set directly. This means that changing the colors in the Appearance preflet changes them across the system, live:

<video src="/files/get-haiku/live_color.mp4" controls="controls"/>

### Media subsystem improvements

Since the last release, there have been a substantial number of improvements to Haiku's media subsystems. These include a large number of cleanups to the Media Kit to improve fault tolerance, latency correction, and performance issues, meaning that the Media Kit is significantly more resilient than it was previously.

Among the new features and other provements are:

#### Streaming support

Previously, the Media Kit assumed that all media files were seekable, which of course streams are not. Now that assumption has been removed, and HTTP and RTSP streaming support integrated into the I/O layer of the Media Kit. Livestreams can now be played in WebPositive via HTML5 audio/video support, or in the native MediaPlayer.

#### FFmpeg decoder plugin improvements

Significant improvements to the FFmpeg decoder plugin were made, initially as part of the DVB tuner rework as mentioned below, and later on as part of the streaming work and others. Rather than the ancient FFmpeg 0.10, the last version that GCC2 can compile, FFmpeg 4.0 is now used all-around (even on GCC2 builds, thanks to some clever ABI trickery.) This means a much widened support for audio and video formats, as well as significant performance improvements (at least for those on newer CPUs.)

<img src="/files/get-haiku/mediaplayer_bbb.png"/><br>
<small><i>MediaPlayer playing a short test clip of Big Buck Bunny.</i></small>

#### HDA driver improvements

The driver for HDA (High-Definition Audio) chipsets, which constitute most audio chipsets in modern x86-based hardware, saw a good number of cleanups and wider audio support since the previous release. (It still has trouble initializing the hardware on some very recent devices, though, so for users with HDA chipsets and no audio output, a warm reboot from another OS may help for now.)

#### Miscellaneous

The DVB tuner subsystem saw a substantial amount of rework (though it still supports very few tuner cards). The APE reader (an obscure audio format that FFmpeg does not support very well) was also cleaned up and added to the default builds.

### RemoteDesktop

Haiku's native RemoteDesktop application was improved and added to the builds. Unlike VNC and other bitmap-based protocols, Haiku's RemoteDesktop forwards drawing commands from the host system to the client system, which for most applications consumes significantly lower bandwith, similar to how pre-compositing X11 operates and (partially) how Microsoft's RDP operates.

No special server is needed for RemoteDesktop; it can connect and run applications on any Haiku system you have SSH access to. The native client is of course included with Haiku by default, but there is also a HTML5-based client which can run in any web browser.

### EFI bootloader and GPT support

This was one of the most complex features to implement, but its actual description is rather simple: booting from GPT partitions and on EFI devices is now supported. The EFI bootloader is included in the default "anyboot" images (for 64-bit only), and should work on all specification-compliant EFI machines, which includes most mass-market consumer hardware from the last 5 years, and Apple products from even before that.

### SerialConnect

This is one of the last applications which came with BeOS, but we had not written replacement for at the time of alpha4. It's a relatively simple and straightforward graphical interface to serial ports, with support for arbitrary baud rates and certain extended features (e.g. XMODEM file transfers.)

In the process of developing and using it, various bugs in our USB and PCI/ISA serial port device drivers were found, and thus fixed.

### Built-in Debugger is now the default

Haiku's built-in <a href="https://www.haiku-os.org/docs/userguide/en/applications/debugger.html">Debugger</a>, experimental at the time of the last release, is now vastly improved and has replaced GDB as the default debugger.

<img src="/files/expression_variable_0.png"/>

In addition to the GUI, there is also a command-line interface for those who prefer it (and for handling crashes of critical userland services, such as `app_server`.) System-wide crash dialogs are also now serviced by Debugger, with the ability to save informative crash reports (<a href="https://dev.haiku-os.org/attachment/ticket/14232/WebPositive-942-debug-28-06-2018-05-33-35.report">example</a>), core files, or launch Debugger directly. This behavior can be configured to take one of these actions automatically via a settings file, if needed.

### New thread scheduler

Again thanks to the generous support of donors, Haiku, Inc. was able to employ a developer full-time to rewrite the system thread scheduler for <a href="https://www.haiku-os.org/blog/pawe%C5%82_dziepak/2013-09-07_enhancing_scheduler/">about</a> four <a href="https://www.haiku-os.org/blog/pawe%C5%82_dziepak/2014-02-18_new_scheduler_merged/">months</a>. As a result of this effort, Haiku's kernel thread scheduler is now `O(1)` (constant time) with respect to threads, and `O(log N)` (logarithmic time) with respect to processor cores, and the 8-core limit which was inherited from BeOS is now gone. The new limit is 64 cores, but this is now an arbitrary constant that we can increase at any time. Thread schedulers are important in general, but they are especially important for Haiku, as a running Haiku system can often have an order of magnitude more threads at any given time than other desktop environments, due to Be API convention of using a thread per user-interface window (and then some.)

As part of the same contract, there are new implementations of the `memcpy` and `memset` primitives for x86 which constitute significant increases to their performance.

### ASLR, DEP, & SMAP implemented and enabled by default

ASLR (Address-Space Layout Randomization) and DEP (Data-Execution Prevention, also known as the "NX bit") <a href="https://www.haiku-os.org/blog/pawe%C5%82_dziepak/2013-04-18_aslr_and_dep_implemented/">were implemented</a> for both the kernel and userland applications as part of the contract to rewrite the thread scheduler. Applications compiled on BeOS R5 will not be affected as these features are disabled for them; but otherwise, they provide a substantial increase in the difficulty of crafting exploits on Haiku.

SMAP/SMEP (Supervisor Mode Access Prevention / Supervisor Mode Execution Prevention) were implemented starting in late 2017, as part of the effort to add support for running 32-bit applications on 64-bit kernels, as they cause a system panic when the kernel tries to access userland memory without the proper checks. Implementing these caught over three dozen such missing checks in the kernel, which could have been potentially triggered by badly (or maliciously) written code to cause something more nefarious than an "assert failure"-style kernel panic.

In a related effort, some of the logic relating to kernel memory area protection was also cleaned up and tightened, meaning that most BeOS drivers will probably not work at all under Haiku without sizeable changes first.

### launch_daemon

The userland startup process, formerly a humble shell-script, has been completely rewritten in the form of the `launch_daemon`. It <a href="https://www.haiku-os.org/blog/axeld/2015-07-17_introducing_launch_daemon/">was inspired</a> by Apple's `launchd` and other related services systems.

It includes support for service dependency tracking, lazy daemon startup, and automatic restart of daemons upon crashes. As it is configured through the same standard settings text format that Haiku uses for most drivers and other system components, adding new configurations for custom services and the like is relatively easy. Controlling services at runtime can be done through the new `launch_roster` command line tool.

### `virtio` bus manager and drivers

In addition to improved support for "bare metal", Haiku R1/beta1 also adds improved support for running in virtual machines. The `virtio` bus and accompanying drivers, mostly supported by QEMU/KVM and other hypervisors, now has drivers in Haiku. These include `virtio_scsi`/`virtio_block`, `virtio_net`, and `virtio_rng`, and adding new device drivers that use the `virtio` bus should be relatively easy.

Thanks to this effort, Haiku can (and has) been run on most public clouds which use `virtio`.

### Updated Ethernet & WiFi drivers

Our ethernet & WiFi drivers, which are mostly taken from FreeBSD thanks to the use of a KPI compatibility layer, have been upgraded to those from FreeBSD 11.1. This brings in support for the Atheros 9300-9500 families, Intel's newer "Dual Band" family, some of Realtek's PCI chipsets, and newer-model chipsets in all other existing drivers.

Additionally, the FreeBSD compatibility layer itself now interfaces with Haiku's support for MSI-X interrupts properly, meaning that WiFi and ethernet drivers will now take advantage of it where possible, leading to significant improvements in latency and throughput. Most network drivers on Haiku now perform nearly identically well compared to how they do on FreeBSD.

Note that USB WiFi chipsets are still not supported as the compatibility layer does not support interfacing with USB devices yet; however, work to support these has begun, it just was not completed in time for the release.

### Updated filesystem drivers

The NFSv4 client, a GSoC project, was <a href="https://www.haiku-os.org/blog/pawe%C5%82_dziepak/2013-03-15_nfsv4_client_finally_merged/">finally merged</a> into Haiku itself, and is included by default. The `btrfs` driver gained read support for newer BTRFS partitions, and the beginnings of write support, though this is not yet utilized (also thanks to a GSoC project.)

Additionally, Haiku's `userlandfs`, which supports running filesystem drivers in userland, is now shipped along with Haiku itself. It supports running BeOS filesystem drivers (which are not supported in kernel mode anymore), Haiku filesystem drivers (mostly useful for debugging purposes), and provides FUSE compatibility. As a result, various FUSE-based filesystem drivers are now available in the ports tree, including FuseSMB, among others.

### General system stabilization

Thanks in part to more testers running Haiku full- or part-time, and also due to running Haiku on automated HaikuPorts package builders, a significant number of kernel panics, strange crashes, or other system instabilities especially related to long uptimes or heavy workloads were found and fixed since the previous release.

### 64-bit `time_t` (except on 32-bit x86)

On all platforms except 32-bit x86, `time_t` is now a 64-bit value. (The exception for 32-bit x86 is to preserve BeOS binary compatibility.)

### Experimental Bluetooth stack

This one is the last ... because it really is the least, and it isn't even included with the release images, only recent nightly images. It "works" in that on a variety of Bluetooth controllers it can successfully display and pair with devices, but it can't do much more than that (and it crashes rather often.) But it's a start, at least!

## New contributors

Since the last release, there are 6 new Haiku developers with commit access, who have all made significant contributions to Haiku already:

 * jessicah (EFI bootloader, GPT partitioning, general infrastructure work, HDA driver improvements)
 * puckipedia (replicant improvements, DriveSetup and partitioning improvements, Coverity warning fixes)
 * waddlesplash (release coordination, upgraded WiFi drivers, UI layout work, kernel panic fixes)
 * Barrett (MediaKit cleanup, streaming support)
 * looncraz (live color updates, other app_server improvements)
 * KapiX (InterfaceKit improvements and bug fixes, unit tests revival)

In addition to these, there are over a dozen individuals who have submitted patches for the first time to Haiku's codebase. Thank you very much!

## Source code

The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is contained within the release images as the `_source` packages (except on the "CD" image, which it was left out of due to space constraints.)

## Reporting issues

There are over 3200 open tickets on Haiku's bug tracker and over 11000 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta1/ReleaseAddendum>.

For more help see the 'Welcome' link on the Haiku desktop, or visit the Haiku Project's website at <https://www.haiku-os.org>.
