+++
type = "article"
title = "R1/beta2 – Release Notes"
tags = []
date = "2020-06-09 00:00:00Z"
+++

The second beta for Haiku R1 marks twenty months of hard work to improve Haiku's hardware support and its overall stability. Since Beta 1, there have been 101 contributors with over 2800 code commits in total. More than 900 bugs and enhancement tickets have been resolved for this release.

Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide assurances against data loss.

*To download Haiku or learn how to upgrade from R1/beta1, see "[Get Haiku!](/get-haiku/)". For press inquiries, see "[Press contact](#press-contact)".*

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

## Highlights

This release contains 20 months' worth of improvements. Below you find some of the highlights.

### Improved HiDPI support

Begun but significantly incomplete at the time of Beta 1, this release sees a significant advancement in support for HiDPI monitors (and UI scaling in general.) Unlike other operating systems which largely enact a "device pixel ratio", that converts a number of "internal pixels" to "screen pixels", Haiku instead scales everything based on font size, and leaves pixels to mean "screen pixels" in isolation. This also means that one can effectively change the UI size and scale on any display by changing the system font size, and everything else should adjust to match it.

Below are two screenshots, showing ActivityMonitor and AboutSystem with a 12pt font size on the left (Haiku's default), and with an 18pt font size on the right (in other words, 150% of "normal.")

<style>td>img{max-width:400px;}</style>
<table><tr><td><img src="/files/get-haiku/r1beta2/normal-activitymonitor-aboutsystem.png"></td><td><img src="/files/get-haiku/r1beta2/hidpi-activitymonitor-aboutsystem.jpg"></td></tr></table>

There are still some bugs to be ironed out (such as scrollbars not drawing with proper scaling applied, as seen in this screenshot), but things are now generally usable under HiDPI. Other applications, such as Deskbar and Tracker, saw significant improvements to their behavior on HiDPI, as well.

### Deskbar improvements

The Deskbar has had various improvements. It now has a mini-mode, where the icons on the shelf expand leftwards. You can activate it by dragging the shelf space by the right handle onto the blue leaf.

<img src="/files/get-haiku/r1beta2/deskbar_minimode.png"/><br>
<small><i>New mini-mode to put the Deskbar at the top of the screen.</i></small>

Furthermore, there are more options for showing larger icons, which is especially useful on screens with a higher DPI.

<img src="/files/get-haiku/r1beta2/deskbar_icon_sizes.png"/><br>
<small><i>A new slider to change the icon size in Deskbar</i></small>

### New Input preferences

The Mouse, Keyboard, Touchpad and Joystick preferences have been consolidated into one Input preferences panel.

<img src="/files/get-haiku/r1beta2/input_preferences.png"/><br>
<small><i>The consolidated Input preferences, including support for mice with 5 buttons.</i></small>

Additionally, there is now support for mice with more than three buttons, including support for button remapping.

### WebPositive improvements

Haiku's built-in web browser, WebPositive, now uses a newer version of WebKit. Additionally, it contains a number of fixes to the Haiku backend, most notably to reserve significantly less memory, and to fix WebSockets, as well as a variety of crashes.

### More ported software

Thanks to Haiku's relatively robust POSIX compliance, as well as ports of open source GUI toolkits, even more pieces of popular open source software have been ported to Haiku since Beta 1 and are available in the package repositories.

### Installation improvements

Installer now supports excluding optional packages that are included on the installation medium.

DriveSetup will now display more information about the drives in your system. It will show the used space of existing partitions, and it is now also able to identify encrypted volumes.

Finally, there is an upgrade path available from Haiku R1 Beta 1 to Beta 2.

<img src="/files/get-haiku/r1beta2/installer_optionalpackages.png"/><br>
<small><i>Optional package selection in the Installer.</i></small>

### NVMe support

Completely new in this release is support for NVMe drives, including support for using them as boot devices (though this varies by BIOS support.) Multiple Haiku developers and users are now using an NVMe drive as their primary storage medium, so we are relatively confident in this new driver's stability at this point.

### Enhanced and stabilized XHCI (USB3) support

While present at the time of R1/beta1, support for USB 3 hardware was notably unstable; it was usually impossible to boot from, and devices would disconnect randomly or not function at all. THe XHCI driver saw a considerable overhaul since then, with nearly all USB3 devices now functioning as boot mediums correctly, and input devices operating properly.

### Kernel stabilization and performance improvements

A lot of general stabilization work was undertaken during this development cycle, with quite a lot of reproducible (and less reproducible) kernel crashes resolved, and some low-hanging fruit related to system performance resolved. The system is now noticeably more stable than it was at the time of R1/beta1.

### Emulated Meta-key in Terminal

Certain early workstation keyboards included a key labeled "Meta" that functioned as an extra modifier key alongside Shift and Control. Although the Meta key is absent from modern keyboards, two major pieces of UNIX software still rely on it being present: GNU Emacs and the GNU readline library, which is used by bash and a wide variety of other software to read input from the terminal.

In beta 2, the Terminal has functionality like macOS': It adds a configuration option to the "Settings..." dialog that, when enabled, causes the left Option key (only) to function as a Meta key. The right Option key retains its normal function, and can be used to enter special characters at the keyboard.

<img src="/files/get-haiku/r1beta2/terminal_metakey.png"/><br>
<small><i>Enabling the Meta key functionality in the settings.</i></small>

## More changes of note

Over 900 tickets were closed during this release cycle (and every one by a human, not by a robot or as a batch operation!), which is too many to list here. But here are a selected few, at least.

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

### Drivers

 - The `hda` driver has had some improvements to work properly on more devices. If you had problem in Beta 1, it is worth a shot to try again.
 - [#5056](https://dev.haiku-os.org/ticket/5056) Intel Extreme: support X4500HD
 - [#12723](https://dev.haiku-os.org/ticket/12723) Intel Extreme: support hardware panel scaling for chipsets that support it
 - [#13987](https://dev.haiku-os.org/ticket/13987) FreeBSD Network Drivers: upgrade network drivers to FreeBSD 12

### System

 - [#10139](https://dev.haiku-os.org/ticket/10139) Add UEFI Loader (the Beta 1 DVD image shipped with an EFI loader, but it was added manually to the release image)
 - [#15548](https://dev.haiku-os.org/ticket/15548) Remove flickering when drawing background

### Translator Improvements
 - [#10354](https://dev.haiku-os.org/ticket/10354) WebP images now support images with an alpha channel.

## Changes for Developers and Porters

For developers, the [Haiku Book](https://www.haiku-os.org/docs/api/apidoc.html) is a good starting guide for exploring the Haiku API. Recently, the documentation for the [layout API](https://www.haiku-os.org/docs/api/group__layout.html) has been revised.

Below is a list of detailed API changes since Beta 1.

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

Since the last release, Kyle Ambroff-Kao received commit access. Welcome!

## Source code

The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is contained within the release images as the `_source` packages (except on the "CD" image, where it was left out due to space constraints.)

## Reporting issues

There are almost 3200 open tickets on Haiku's bug tracker and over 12700 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta2/ReleaseAddendum>.

For more help, take the 'Quick Tour' and read the 'User Guide', both linked on the Haiku desktop. WebPositive opens by default with our 'Welcome' page which provides useful information and many helpful links, as does the Haiku Project's website at <https://www.haiku-os.org>.

## Press contact

Press inquiries may be directed to:

 * waddlesplash (English)
 * pulkomandy (French)
 * humdingerb (German)

All three contacts may be reached via `<nickname>@gmail`.
