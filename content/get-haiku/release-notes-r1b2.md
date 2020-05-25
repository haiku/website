+++
type = "article"
title = "R1/beta2 – Release Notes"
tags = []
date = "2020-05-24 11:43:16+01:00"
draft = true
+++

The second beta for Haiku R1 marks twenty months of hard work to improve Haiku's hardware support and its overall stability. Since Beta 1, there have been 101 code contributors with almost 2800 code commits. More than 900 bugs and enhancement tickets have been closed for this release. 

Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide assurances against data loss.

*To download Haiku, see "[Get Haiku!](/get-haiku/)". You may also upgrade an existing Beta 1 installation using the [instructions](#upgrading-from-beta-1). For press inquiries, see "[Press contact](#press-contact)".*

## Table of Contents
 - [System requirements](#system-requirements)
 - [Upgrading from Beta 1](#upgrading-from-beta-1)
 - [Beta 2 Highlights](#beta-2-highlights)
 - [Other enhancements](#other-enhancements)
 - [Changes for Developers and Porters](#changes-for-developers-and-porters)
 - [New Contributor](#new-contributor)
 - [Source Code](#source-code)
 - [Reporting Issues](#reporting-issues)
 - [Press contact](#press-contact)

## System requirements
This release is available on the x86 32-bit platform, as well as the x86_64 platform. Note that BeOS R5 compatibility is only provided on the 32-bit images.

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

SSE2 support is required to use the WebPositive web browser. On machines where this is not available, it is recommended to install the NetSurf browser instead.

Haiku takes advantage of modern hardware and will run faster on newer machines. 

## Upgrading from Beta 1

There is an upgrade path available for users that are currently using Haiku R1 Beta 1. If you want to do this upgrade, you will have to use the Terminal to issue some commmands.

*Warning: only upgrading from Beta 1 is supported. It may be possible to upgrade from other intermediate development images, but this is untested and you may run into unknown problems.*

### Step 1: Getting the Latest Updates

You need to make sure that you have all the package updates that are available for your current release. You can do this by running the following command in Terminal:

```shell script
pkgman update
```

### Step 2: Switch to the new repositories
After this we will switch the package manager to point to the new repositories for Beta 2. This will allow the package manager to find the new packages. Run the following commands in Terminal.

```shell script
pkgman drop Haiku
pkgman drop HaikuPorts
pkgman add-repo https://eu.hpkg.haiku-os.org/haiku/r1beta2/$(getarch)/current
pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/r1beta2/$(getarch)/current
```

### Step 3: Installing the new packages and reboot

Now it is time to download and install the packages. You can do this by issuing the following command in Terminal:

```shell script
pkgman full-sync
```

After that step has been successful, you should immediately reboot the system. You can do this from the Deskbar, or by running ```shutdown -r``` in Terminal.

## Beta 2 Highlights

This release contains 20 months worth of improvements. Below you find some highlights.

### New Input Preferences

The Mouse, Keyboard, Touchpad and Joystick preferences have been consolidated into one Input preferences panel.

<img src="/files/get-haiku/input_preferences.png"/><br>
<small><i>The consolidated Input preferences, including support for mice with 5 buttons.</i></small>

Additionally, there is now support for mice with more than three buttons.

### DeskBar improvements

The Deskbar has had various improvements. It now has a mini-mode, where the icons on the shelf expand leftwards. You can activate it by dragging the shelf space by the right handle to the top of the screen.

<img src="/files/get-haiku/deskbar_minimode.png"/><br>
<small><i>New mini-mode to put the Deskbar at the top of the screen.</i></small>

Furthermore, there are more options for showing larger icons, which is especially useful on screens with a higher DPI.

<img src="/files/get-haiku/deskbar_icon_sizes.png"/><br>
<small><i>A new slider to change the icon size in Deskbar</i></small>

### Hardware Support: xHCI, hda, intel_extreme and NVMe

Haiku's contributors have improved on xHCI, the host controller for USB3. This should make USB3 devices more stable. It also fixes some issues with booting Haiku from a USB3 storage device.

Likewise, the Intel High Definition Audio (`hda`) driver has received some improvements, increasing the number of chipsets that it supports.

The driver for Intel graphics chipsets (`intel_extreme`) has had various improvements. It supports more chipsets, as well as blacklists chipsets that are known not to work. The advantage to the latter is that a user will no longer have to manually disable the driver in the boot menu when their system uses one of the blacklisted chipsets.

Finally, initial support for NVMe storage devices has been implemented. This is a protocol for modern SSD drives, which takes advantage of the properties of this modern storage medium to improve I/O performance. Reminder: Haiku is still in beta quality, and there may be bugs in these storage drivers that could cause data loss. 

### Installation Improvements

There are various improvements in the installation process. The first is that there is better support for EFI, though work remains to be done. Additionally, the Installer now supports optional packages that are included on the installation medium. 

DriveSetup will now display more information about the drives in your system. It will show the used space of existing partitions, and it is now also able to identify encrypted volumes.

Finally, there is  an upgrade path available from Haiku R1 Beta 1 to Beta 2.

<img src="/files/get-haiku/installer_optionalpackages.png"/><br>
<small><i>Optional package selection in the Installer.</i></small>

### Emulated Meta-key in Terminal

Certain early workstation keyboards included a key labeled "Meta" that functioned as an extra modifier key alongside Shift and Control. Its purpose was to give users an easy way of entering special characters: When held down it caused the eighth bit to be set on all characters read from the keyboard, allowing access to ​the "extended" portion of the ASCII character set (character codes above 127). 

Although the Meta key is absent from modern keyboards, two major pieces of UNIX software still rely on it being present: GNU Emacs and the GNU readline library, which is used by bash and a wide variety of other software to read input from the terminal. (Python's interactive shell uses readline, for instance.) These applications use the Meta key as a "command" key and provide additional editing features when it's available. 

In beta 2, the Terminal will have functionality like macOS': It adds a configuration option to the "Settings..." dialog that, when enabled, causes the left Option key (only) to function as a Meta key. The right Option key retains its normal function, and can be used to enter special characters at the keyboard. 

<img src="/files/get-haiku/terminal_metakey.png"/><br>
<small><i>Enabling the Meta key functionality in the settings.</i></small>

## Other Enhancements

### Applications
**Deskbar**
 - [#4971](https://dev.haiku-os.org/ticket/4971) Resize Deskbar by using  CTRL-ALT-right click drag
 - [#8537](https://dev.haiku-os.org/ticket/8537) In menus, the size of the icon will now always be the same size as your chosen font size
 - [#8691](https://dev.haiku-os.org/ticket/8691) The icons of replicants running in Deskbar's tray now scale according to the font size
 - [#13304](https://dev.haiku-os.org/ticket/13304) Auto-raised Deskbar will now also 'auto-unraise'

**DriveSetup**
 - [#10098](https://dev.haiku-os.org/ticket/10098) Encrypted disks will actually display that they are encrypted instead of empty

**HaikuDepot**
 - [#10358](https://dev.haiku-os.org/ticket/10358) When a package is queued for download and installation, it will now have the status 'queued' in the interface.
 - [#11652](https://dev.haiku-os.org/ticket/11652) When showing all packages, the installed packages are part of the list by default. Before they were hidden by default. 
 - [#12198](https://dev.haiku-os.org/ticket/12198) HaikuDepot can now display multiple screenshots of a package.
 - [#12428](https://dev.haiku-os.org/ticket/12428) Switching between 'All packages' and 'Featured packages' is now done with tabs, not by ticking a checkbox.
 - [#13806](https://dev.haiku-os.org/ticket/13806) The application will now clearly show when it is downloading screenshots for a package.
 - [#13808](https://dev.haiku-os.org/ticket/13808) Overall, it is more clear when HaikuDepot is contacting the web to retrieve information or updates.

**Installer**
 - [#14310](https://dev.haiku-os.org/ticket/14310) The installer now supports showing and selecting optional packages, when available.

**LaunchBox**
 - [#11237](https://dev.haiku-os.org/ticket/11237) LaunchBox now has a setting to automatically launch at boot.
 - [#13835](https://dev.haiku-os.org/ticket/13835) Support for 96x96 and 128x128 pixel icons.

**MediaPlayer**
 - [#6628](https://dev.haiku-os.org/ticket/6628) Optionally, MediaPlayer will resume playback where it left off last time a file was played. 

**People**
 - [#9397](https://dev.haiku-os.org/ticket/9397) It is possible to quickly create a new Person file from Tracker, with the 'Create new...' feature

**SoftwareUpdater**
 - [#14002](https://dev.haiku-os.org/ticket/14002) When updating the system packages itself, SoftwareUpdater will now display a 'Restart' button to inform the user that a restart is necessary.

**Terminal**
 - [#15294](https://dev.haiku-os.org/ticket/15294) Support for an emulated Meta key

**Tracker**
 - [#1264](https://dev.haiku-os.org/ticket/1264) Multi-range selection in Tracker and list views
 - [#3011](https://dev.haiku-os.org/ticket/3011) Directories with a large number of files are now loaded quicker
 - [#5126](https://dev.haiku-os.org/ticket/5126) Improvements to the Tracker API
 - [#10529](https://dev.haiku-os.org/ticket/10529) The Info window now shows the originating package of a file (if applicable).

**WebPositive**
 - [#14845](https://dev.haiku-os.org/ticket/14845) Allow selecting any font size (was previously limited to 18pt).

**Command Line Utilities**
 - [#10288](https://dev.haiku-os.org/ticket/10288) `uname` now shows the specific revision of a Haiku nightly build.
 - [#12665](https://dev.haiku-os.org/ticket/12665) The builtiin `ftp` was replaced with [https://ftp.netbsd.org/pub/pkgsrc/current/pkgsrc/net/tnftp/README.html tnftp].

### Drivers

 - The `hda` driver has had some improvements to work properly on more devices. If you had problem in Beta 1, it is worth a shot to try again.
 - [#9910](https://dev.haiku-os.org/ticket/9910) NVMe device support
 - [#5056](https://dev.haiku-os.org/ticket/5056) Intel Extreme: support X4500HD
 - [#12723](https://dev.haiku-os.org/ticket/12723) Intel Extreme: support hardware panel scaling for chipsets that support it
 - [#13987](https://dev.haiku-os.org/ticket/13987) FreeBSD Network Drivers: upgrade network drivers to FreeBSD 11.1

### Preferences

 - [#10171](https://dev.haiku-os.org/ticket/10171) Support configuration of advanced mice and trackballs

### System

 - [#10139](https://dev.haiku-os.org/ticket/10139) Add UEFI Loader (the Beta 1 DVD image shipped with an EFI loader, but it was added manually to the release image)
 - [#15548](https://dev.haiku-os.org/ticket/15548) Remove flickering when drawing background

### Translator Improvements
 - [#10354](https://dev.haiku-os.org/ticket/10354) WebP images now support images with an alpha channel.

## Changes for Developers and Porters

For developers, the [Haiku Book](https://www.haiku-os.org/docs/api/apidoc.html) is a good starting guide for exploring the Haiku API. Recently, the documentation for the [layout API](https://www.haiku-os.org/docs/api/group__layout.html) has been revised.

Below is a list of detailed changes since Beta 1.

### POSIX

 - [fcntl.h](https://git.haiku-os.org/haiku/commit?id=38ce902686b9b6d4d19bfde134b18f997192ba01) A non-functioning version of `posix_fadvice()` has been added, to make it easier to port software.
 - [net/if_tun.h](https://git.haiku-os.org/haiku/commit/headers/posix/net/if_tun.h?id=b110fce124c8603201228da1b67119b56e41cf7e) A public API for the tun/tap device compatible with the Linux API has been added.
 - [net/if_types.h](https://git.haiku-os.org/haiku/commit/?h=hrev53087) Add some constants for `IFT_LOCALTALK`, `IFT_TUN`, `IFT_L2VLAN` and `IFT_BRIDGE`
 - [pthread.h](https://git.haiku-os.org/haiku/commit/?h=hrev52972&id=901c3d44b047f83b914f7a3cd1f532964255771a) Implement `pthread_attr_[get|set]stack()` 
 - [spawn.h](https://git.haiku-os.org/haiku/commit/?h=hrev52840&id=af615399189deeec8d412ec165ab638326471ab1) Add `POSIX_SPAWN_SETSID`
 - [stdlib.h](https://git.haiku-os.org/haiku/commit/?h=hrev53281&id=e1a822a95f318ca23e41a93d1416322dce439421) Make `putenv()` conform to POSIX standard (no source/binary change)
 - [ sys/resource.h](https://git.haiku-os.org/haiku/commit/?id=8ae2e95643ee7ba3f46b0e8a73df1466f23aa7be) Add `[gs]etpriority()` from the POSIX-1.2013 standard.
 - [unistd.h](https://git.haiku-os.org/haiku/commit/?h=hrev53464&id=af0281a8c20afe53d805b5f3f14935a59b214bdb) Add the `_SC_HOST_NAME_MAX`, `_SC_REGEXP`, `_SC_SYMLOOP_MAX`, and `_SC_SHELL` for `sysconf()`
 - [unistd.h](https://git.haiku-os.org/haiku/commit/?h=hrev52776&id=b9c25b0d0ec7bb16d72dca4b6f529af604e66df6) Add `nice()` from the POSIX.1-2008 standard.

### Game Kit
 - [FileGameSound.h](https://git.haiku-os.org/haiku/commit/?h=hrev53625&id=69f814cded60c5f977a61a2ab747e4456323e6f2) Allow initialisation of the `BFileGameSound` from a `DataIO` object, to allow for opening game sound files from sources other than files.

### Interface Kit
 - [Deskbar.h](https://git.haiku-os.org/haiku/commit/?h=hrev52499&id=efafab643ce980e3f3c916795ed302599f6b4f66) Add MaxItemWidth() and MaxItemHeight() as part of the work to support variable size icons for Deskbar replicants.
 - [View.h](https://git.haiku-os.org/haiku/commit/headers/os/interface/View.h?id=5bbf7f1be073d376e37da34681c8e6c7acfcf198) New `B_MOUSE_BUTTON` macro that helps you identify which mouse button was clicked on a mouse with more than three buttons.
 - [View.h](https://git.haiku-os.org/haiku/commit/headers/os/interface/View.h?id=47102c074278637c3b33935b451d53f7ad176658) Add a the new `B_TRANSPARENT_BACKGROUND`, to identify views that have a transparant background (i.e. the background will not be drawn for those views).
 - [View.h](https://git.haiku-os.org/haiku/commit/headers/os/interface/View.h?id=c67dde0f2ccb45d550af410cf6d73fee39d10504) Add Tiled Background methods to `BView` objects to asynchronously draw bitmaps as background tiles for the view, using the overloaded `DrawTiledBitmapAsync()` method.

### Locale Kit
 - [Country.h](https://git.haiku-os.org/haiku/commit/headers/os/locale/Country.h?id=70cdd7d4f5fc62e8b3e220646f84235ec3d444d5) Add a `SetTo()` and an `InitCheck()` method to the `BCountry` class.

### Package Kit
 - [PackageRoster.h](https://git.haiku-os.org/haiku/commit/headers/os/package/PackageRoster.h?id=e2c7bb900cf83fe0a3834ad2189577687ffaa03f) Add a `IsRebootNeeded()` method to the `BPackageRoster` class.
 - [PackageRoster.h](https://git.haiku-os.org/haiku/commit/headers/os/package/PackageRoster.h?id=b711002d345e2e9e0075be46a37492624f73ccdd) Add a `IsPackageActive()` method to the `BPackageRoster` class.

## New contributor

Since the last release, Kyle Ambroff-Kao received commit access.

## Source code

The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is contained within the release images as the `_source` packages (except on the "CD" image, where it was left out due to space constraints.)

## Reporting issues

There are almost  3200 open tickets on Haiku's bug tracker and over 12700 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta2/ReleaseAddendum>.

For more help, take the 'Quick Tour' and read the 'Userguide', both linked on the Haiku desktop. WebPositive opens by default with our 'Welcome' page which provides useful information and many helpful links, as does the Haiku Project's website at <https://www.haiku-os.org>.

## Press contact

Press inquiries may be directed to:

 * waddlesplash (English)
 * pulkomandy (French)
 * humdingerb (German)

All three contacts may be reached via `<nickname>@gmail`.
