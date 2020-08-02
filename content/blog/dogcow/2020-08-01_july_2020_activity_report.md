+++
type = "blog"
title = "July 2020 Activity Report"
author = "dogcow"
date = "2020-08-01 15:53:09-06:00"
tags = []
+++

Welcome to the July, 2020 Activity Report for the Haiku project!

This report covers hrev54370 through hrev54484.

## Applications

KapiX added a "Set target to parent folder" option in the TextSearch application, making it easy to move one directory up.

Humdinger fixed bug #16321 in the ShowImage application. The timer now responds properly to user input.

Andrew Lindesay added support for HaikuDepot Server repo meta-data to be artificially matched against multiple repos. Improvements were also made in HaikuDepot's logging mechanism to de-clutter the code and enable better systematic logging.

pulkomandy fixed bug #8702, allowing the system to better distinguish video Ogg files from audio.

## app_server

Extra Bview drawing modes required for WebKit canvas support were implemented by KapiX.

## ARM and ARM64

kallisti5 continued work on the ARM architecture, specifically the ARM64 EFI bootloader. EFI CPU code was refactored to be architecture-specific, allowing CPU init code to be properly called, further progressing the EFI bootloader, which is now building and running.

## Bootloader

Kallisti5 added support for 32-bit kernels to the EFI bootloader. Heinrich Schuchardt made a debugging improvement to the EFI bootloader, allowing a efi.map file to be available when linking. 

## Documentation

Máximo Castañeda has greatly improved the JavaSript and CSS of the QuickTour. It's now possible to show it as a proper slide-show, as was intended with the original QuickTour package. The result is a much nicer experience of this piece of documentation that is directed especially at new users.

## Drivers

mmlr reworked 64-bit PCI base address register handling by moving the entirety into \_GetBarInfo() and applying it to the PCI address and size, where previously it was only applied to the RAM address. Fixes were also made to the i2c, xhci, hda, and pch\_thermal drivers to ensure prefetchable 64-bit BARs are properly identified as 64-bit. The FreeBSD network compatibility layer was updated to handle 64-bit memory BARs plus apply empty size and type checks to I/O ports as done in FreeBSD.

### Graphics

kallisti5 imported a significant number of PCI IDs into the radeon_hd driver for Hawaii, Vega, Arctic Islands / Polaris, and Volcanic Islands GPUs.

### Sound

mmlr committed numerous improvements to the Intel HDA audio driver. mmlr also fixed a bug in multi\_audio that resolved a number of situations where users experienced no audio until a certain amount of time passed after boot. All multi audio drivers were affected, most notably HDA.

## Filesystems

CruxBox added code allowing xfs to read short form directories and laid the groundwork to begin reading block directories.

Suhel Mehta implemented open\_dir and read\_dir functions for ufs2 and committed changes enabling DirectoryIterator to successfully read all directories.

brjhaiku added partial support for btrfs\_write\_stat.

## Networking

waddlesplash cleaned up code related to the DNS resolver.

Leorize contributed improvements to the FileRequest, DataRequest, GopherRequest, and HttpRequest APIs. These improvements result in more accurate progress reports as well as performance increases.

### Wi-Fi

waddlesplash made several improvements to Wi-Fi:

* dualwifi7260: No longer causes KDLs
* atheroswifi: Build options changed to match default FreeBSD options. Supported Atheros cards will now have 802.11n support in Haiku, where previously they only had 802.11b/g.

## Preferences

X512 fixed a bug #16317 that caused the mouse image in the Input preferences to be drawn incorrectly.

JadedTuna fixed a bug in Screen preferences related to brightness settings.

Oishika Pradhan fixed the default window size for Keymap preferences so it is usable on low-resolution displays.

## Printing

pulkomandy made improvements to the IPP code for handling URLs in a standard fashion, removing a custom implementation, as well as better handling printers that don't include a <content-type> header in their replies.

## User Interface

waddlesplash made improvements to various UI components that improve the look on high-DPI systems:

* Alert icons (BAlert) on high resolution displays now use fractional scaling
* Menus look better on font-scaled systems
* Insets look better on high-DPI
* Buttons are more proportional on high-DPI systems, though not yet perfect
* Improvements to BScrollBar and BScrollView that result in most applications having properly scaled scrollbars on high-DPI systems
* Tracker count view width, height, and font size are now properly proportional in the container window
* Spacing between elements in a Tracker list view are now properly spaced on font-scaled systems

X512 added gradient and fill rule support to BPicture, as well as Flatten and Unflatten methods to BGradient.

pulkomandy unified the 'Settings' menu shortcut key to be `,` (comma) for all built-in apps, bringing them into compliance with existing human interface guidelines.

## Thank you!

Thank you for reading, and thanks to all the developers and contributors who dedicate their time and energy to the project. 

Please feel free to report any omissions, errors, or work you'd like to see featured in next month's activity report to me via email: cwr < -at- > sdf (dot) org or via IRC: dogcow
