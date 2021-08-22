+++
type = "article"
title = "R1/beta3 – Release Notes"
tags = []
date = "2020-07-25 00:00:00Z"
draft = "false"
+++

The third beta for Haiku R1 marks twenty months of hard work to improve Haiku's hardware support and its overall stability. Since Beta 2, there have been 87 contributors with over 1,248 code commits in total. More than 251 bugs and enhancement tickets have been resolved for this release.

Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide assurances against data loss.

*To download Haiku or learn how to upgrade from R1/beta2, see "[Get Haiku!](/get-haiku/)". For press inquiries, see "[Press contact](#press-contact)".*

## System requirements

This release is available on the x86 32-bit platform, as well as the x86_64 platform. 

{{< alert-info "BeOS R5 Compatibility" "Note that BeOS R5 compatibility is only provided on the 32-bit images." >}}

<table><tr><td>
<h4>MINIMUM (32-bit)</h4>
<ul>
<li><strong>Processor</strong>: Intel Pentium II; AMD Athlon</li>
<li><strong>Memory:</strong> 384MB</li>
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

{{< alert-info "SSE2 support" "SSE2 support is required to use the WebPositive web browser. On machines where this is not available, it is recommended to install the NetSurf browser instead." >}}

# Highlights

## Installation process

* It's possible to use Installer to cleanly reset an existing system by installing over it.
* It's possible to go back to FirstBootPrompt from Installer if you change your mind and want to use live mode.
* Improvements to DriveSetup GUI and backend to make disk partitioning easier and more reliable.

## Package management

* The system update can now resume downloads in case it is interrupted.
* Support for running a script on package uninstall
* Performance improvements for package icons handling in HaikuDepot
* Numerous stability and user improvements to HaikuDepot
* Deprecated Python 2 and switched to Python 3.7 as the default version of Python shipped with Haiku

## User interface

* Implement center and right-aligned BTextView support and various fixes to BTextControl for better handling of cursor movements.
* Improved support for dark color scheme
* Integration of PadBlocker in Input preferences (disable touchpad when keyboard is used)
* Scale scroll bars according to UI/font size
* Several changes to make localization better
* Support of CPUs with more than 8 cores in ProcessController load graphs
* Display CPU manufacturer logo in Pulse
* Numerous stability and compatibility improvements to MediaPlayer
* The application icon in the shutdown dialog is animated when the application does not want to close

## app_server (graphics server)

* Various fixes for clipping and flickering problems in app_server
* Support for more composite drawing operations (used in the web browser for javascript canvas support)
* Fixed the font overlay/fallback system and added an extra font to it (Noto Sans Symbols 2)
* Reworked memory management and fixed some memory corruption bugs

# Web browser

* Accept-Language header was missing, breaking some websites
* A dark "Document Color" system theme color triggers "dark mode" on websites
* "Search the web" context menu works again
* Easy selection of default search engine from a list of common ones
* Search shortcuts, for example typing "w Haiku" in the address bar will open the Wikipedia article about Haiku.
* WebKit engine (haikuwebkit) upgraded to WebKit 612.1.21

# APIs

* Introduced a new version of the "net services" APIs (http and gopher clients). It is moved to a static library, allowing us to make changes without breaking applications. Existing applications can continue to use the old API (present until beta2) but that will be removed later. It is recommended to adjust and recompile such applications before the next Haiku release.

## Storage and file systems

* Improvements to XFS driver
* Fixed a kernel panic in the NFS driver
* Support Sun VTOC partition tables

## BeOS compatibility

* Reworked the initialization of the Locale Kit and Translation Kit to fix deadlocks when both are used (affected applications: BeLive, Tracker)
* Implemented B_OUTLINE_RESIZE to allow windows to stop redrawing during resize operations
* BeControlLook that alters controls to resemble BeOS R5.

## POSIX compatibility

* Added mlock and munlock.
* Removed a limitation on the number of dead joinable threads
* Fixed pselect interaction with signals
* Fixed the return code of fsync when called on fifo pipes
* asprintf is moved to libbsd because it is not a standard POSIX function
* Added exp10, exp10f and exp10l to math.h (only in {{{_GNU_SOURCE}}})
* Fixed behavior of write() in O_APPEND mode
* Implemented posix_fallocate
* Added ut_host in utmpx.h
* Added ppoll()
* Implemented a missing escape sequence in terminal to insert repeated characters

# System performance

* Optimize create_area to avoid O(n^2^) algorithm
* Optimize BMenuItem::RemoveItem to be O(1) instead of O(n)
* Improvements on cpufreq management
* Improve caching in MediaPlayer to allow playing 4K video
* Implement selective ACK (SACK) to improve TCP performance on lossy network links

## Internationalization

This release adds the Czech translation for all the system and bundled applications. With this addition, Haiku is now available in 28 different languages.

## Hardware compatibility

## Sound

* Improved es1370 audio drivers
* Improved hda audio drivers

## Mass storage

* Support for SD/MMC readers on the PCI bus (SDHCI)
* Improved ramfs driver stability
* Improved NVMe driver performance

## Network

* Improved virtio driver performance
* Updated wireless network drivers to match with FreeBSD 13
* Remove the "wavelan" WiFi driver which supported only some very old 11Mbps Wifi cards

## USB

* Improved USB 3 drivers

## Graphics

* Improved Intel_Extreme drivers (Gen4 through Gen7)
* Improved NVIDIA GeForce 6200-6400 drivers

## New Contributors

Haiku saw 34 new contributors to the source code since R1/beta2

* Máximo Castañeda
* Jaidyn Ann
* Han Pengfei
* David Sebek
* Coldfirex
* Lt-Henry
* Jeremy Visser
* beaglejoe
* Sylvain78
* roired
* Pawan Wadhwani
* Mitsunori YOSHIDA
* Jessica Tallon
* Andriy Voskoboinyk
* Anarchos
* syedsouban
* Siddhant Gupta
* Shannon Mackey
* Sean Long
* Saloni
* ROIRED XSoto
* rofl0r
* Oishika Pradhan
* Mark Barnett
* Maciej Bałuta
* jpdw
* jiceland
* JadedTuna
* HrithikKumar49
* Heinrich Schuchardt
* Daniel Schaefer
* Bailey Carlson
* Andriy Gapon
* Adam Fowler

## Source code

The source code of Haiku itself can be accessed from GitHub at <https://github.com/haiku/haiku> or via Haiku's Git instance at <https://git.haiku-os.org>.

## Reporting issues

There are almost 3,600 open tickets on Haiku's bug tracker and over 13,432 closed items.  If you find what you believe to be an issue, please search the bug tracker to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta3/ReleaseAddendum>.

For more help, take the 'Quick Tour' and read the 'User Guide', both linked on the Haiku desktop. WebPositive opens by default with our 'Welcome' page which provides useful information and many helpful links, as does the Haiku Project's website at <https://www.haiku-os.org>.

For support and/or help with anything related to Haiku, feel free to post on our forums at <https://discuss.haiku-os.org>, or send a message to our general mailing list at <https://www.freelists.org/list/haiku> so our friendly community may assist you.

## Press contact

Press inquiries may be directed to our team via email at contact&#64;haiku-os.org
