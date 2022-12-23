+++
type = "article"
title = "R1/beta4 – Release Notes"
tags = []
date = "2022-12-23 00:00:00Z"
+++

The fourth beta for Haiku R1 over a year and a half of hard work to improve Haiku's hardware support and its overall stability, and to make lots more software ports available for use. [Over 400 bugs and enhancement tickets](https://dev.haiku-os.org/query?milestone=R1%2Fbeta4&group=component&status=closed) have been resolved for this release.

Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are increasingly confident in its stability, we cannot provide assurances against data loss.

For most of this release cycle, waddlesplash was [employed as a contractor](https://www.haiku-os.org/news/2021-08-25_hiring_waddlesplash/) to work on Haiku. His contract is presently ongoing, supported by the generous donations of readers like you to Haiku, Inc., a 501(c)3 non-profit.

*To download Haiku or learn how to upgrade from R1/beta3, see "[Get Haiku!](/get-haiku/)". For press inquiries, see "[Press contact](#press-contact)".*

## System requirements

This release is available on x86 32-bit and 64-bit platforms.

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

<!--{{< alert-info "SSE2 support" "SSE2 support is required to use the WebPositive web browser. On machines where this is not available, it is recommended to install the NetSurf browser instead." >}}-->

## New features

### Improved HiDPI support

<a href="/files/blog/waddlesplash/2022_09-unscaled.png"><img src="/files/blog/waddlesplash/2022_09-unscaled.png" width="49%"/></a>
<a href="/files/blog/waddlesplash/2022_09-hidpi-after.png"><img src="/files/blog/waddlesplash/2022_09-hidpi-after.png" width="49%"/></a>
<i><small>On the left: various applications on Haiku at standard DPI. On the right: those same applications, at "200%" scale (24pt font size.)</small></i>

Previous releases of Haiku partially supported HiDPI scaling merely by changing the system font size; however, not all metrics were actually tied to the font size as they should be, and not all applications actually obeyed the system-set font size. Much work over the past release cycle has gone into rectifying these problems, and as you can now see in the above screenshots, most native applications now scale sufficiently well. There are still some weak spots, but these should be resolved in time.

Additionally, on first boot Haiku now attempts to automatically detect if you are on a HiDPI display and set appropriate sizes. These can of course be adjusted with the font size settings of the Appearance preferences. For now, it is not possible for changes to these settings to take effect without a reboot.

Some ported applications have already been patched or updated to correctly read and use Haiku's own settings, but not all of them yet.

### Flat decorator

<img src="/files/get-haiku/r1beta4/flat-light.png" width="49%"/>
<img src="/files/get-haiku/r1beta4/flat-dark.png" width="49%"/>

For those who find Haiku's use of gradients a little "much", there is now a "flat" decorator & control look available. It does not come installed by default, but can be added via the "Haiku Extras" package, and then enabled in the Appearance preferences. (The colors shown are not yet included by default; you will have to use ThemeManager or adjust some preferences manually in order to get a like appearance.)

### Thumbnails in Tracker

<img src="/files/get-haiku/r1beta4/tracker-thumbnails.jpg">

Requested for many years and now finally a reality: "Tracker", Haiku's native file manager (originally inherited from BeOS), now supports generating and displaying image thumbnails. The thumbnails themselves are stored in extended attributes of the files themselves, which means applications can create their own thumbnails for custom filetypes, if they want (for example, a screenshot might be the thumbnail of an emulator's save-state.)

### Support for (some) USB WiFi devices

Most "RTL" and some "RA" USB WiFi devices (the two most common device families, very often repackaged under other names) are now supported in Haiku thanks to the import of the relevant drivers from FreeBSD, and the implementation of FreeBSD's basic USB-related APIs in Haiku's FreeBSD driver compatibility layer. There is one major limitation: these devices must be connected before Haiku is booted; they will not be detected if connected after the boot is finished.

### WiFi drivers from OpenBSD

The `iwm` and `iwx` drivers from OpenBSD, along with OpenBSD's 802.11 stack, have been imported into Haiku (and given the native names `idualwifi7260` and `iaxwifi200` respectively.) These provide support for Intel's "Dual Band" and "AX" families of WiFi hardware. FreeBSD's version of the `iwm` driver had been available on Haiku for years, but only supported 802.11a/b/g (not even 802.11n, much less 802.11ac!) and was not very reliable; meanwhile the `iwx` driver has no direct FreeBSD equivalent.

This means Haiku is only the third open-source operating system (to the best of our knowledge) after Linux and OpenBSD to support 802.11ac WiFi, as not even FreeBSD supports it (yet?) despite having worked on it intermittently for years.

Supporting these drivers required the addition of an "OpenBSD compatibility layer", which builds on top of the existing FreeBSD compatibility layer. OpenBSD supporting hardware that FreeBSD does not seems to be an increasing trend (there are some more ethernet and WiFi cards that OpenBSD has drivers for which Haiku could stand to gain), and this work paves the way for such future developments.

### USB-RNDIS tethering support

A new driver has been added to support "RNDIS" ethernet tethering, which is the most common kind Android phones use when selecting "USB tethering". It is enabled by default, and supports hot-plugging.

### New NTFS driver

The NTFS filesystem driver (which is a wrapper around the NTFS-3G library) was completely rewritten. The old one hearkened back to the BeOS days and had not kept up with development: it did not support any kind of caching, incorrectly handled file deletions in a way that caused kernel panics, did not support memory-mapping files (making `git` usage impossible on NTFS partitions), and had plenty of other issues besides.

The new diver is much more idiomatic, supports the major layers of Haiku's common filesystem caching mechanisms, and resolves all known issues and major missing features the previous one was plagued with. Since it is not FUSE-based (like NTFS-3G is on Linux) but runs in kernel-mode, it is competitive for performance with the other fully native filesystem drivers.

### AVIF translator

There is now an AVIF image translator available by default, providing both read and write support for this new and advanced image format for all native Haiku applications.

### WebPositive

HaikuWebKit has been synchronized to an up-to-date version of upstream WebKit, and contains many bugfixes since the previous release of Haiku. It also now uses the cURL networking backend, which resolved a large number of the network-related issues seen in previous releases.

### Bootloader

32-bit EFI support has been added (previous releases only supported 64-bit EFI.) It is possible to boot a 64-bit Haiku installation from a 32-bit EFI loader.

## Software ports

### GTK applications!

<img src="/files/get-haiku/r1beta4/gtk-apps.png" width="75%">

Thanks to (at first) the new X11 compatibility layer, and (now) the new Wayland compatibility layer (more details below), there is now a working GTK3 port for Haiku! Ports of **[Inkscape](https://inkscape.org/)**, **[GIMP](https://www.gimp.org/)**, and more are now available for immediate install, and more GTK applications are being added to HaikuPorts as time goes on.

One of the newly available GTK applications is **[GNOME Web](https://apps.gnome.org/app/org.gnome.Epiphany/)** aka. Epiphany, which is based on a very recent version of WebKitGTK. This provides an unfortunately non-native but largely functional web browser for Haiku for the first time in many years, with "just works" status for major websites like YouTube and others.

### GNU Emacs

<img src="/files/get-haiku/r1beta4/emacs.png" width="50%">

Haiku has had terminal-based GNU Emacs for some time, but now (thanks to Emacs developers!) has a fully-upstreamed, polished-to-a-shine native GUI. You can install it from HaikuDepot already, or check out a development branch of Emacs and build it yourself.

### WINE

<img src="/files/get-haiku/r1beta4/wine.png">

Thanks to community member & contributor X512, Haiku now has a port of WINE! Initially based on the X11 compatibility layer, it now has a fully native Haiku windowing & input backend.

It is somewhat limited at the moment, being available only on 64-bit Haiku and only supporting 64-bit Windows applications. It is also a bit inefficient performance-wise at present due to some limitations in Haiku, but that will likely improve with time as Haiku gains more I/O APIs.

### Xlib (X11) compatibility layer

There is now a native compatibility layer for X11 available in the package repositories. Instead of running a full X server as XQuartz or other X11 compatibility packages do on other operating systems, it directly handles Xlib API calls and translates them into Haiku API calls, instead. You can [read some more](https://www.haiku-os.org/blog/waddlesplash/2022-01-10_haiku_contract_report_december_2021/) about what and why this was done, install the package directly via `pkgman install xlibe_devel`, or [check out its source code](https://github.com/waddlesplash/xlibe/).

This was originally written to port GTK3, and so it may be missing some (or many) API calls needed by other applications, though it has been tested with a wide variety of X11 applications and most non-Motif ones seem to at least partially work already.

### Wayland compatibility layer

Yes, in addition to an X11 compatibility layer, we now also have one for Wayland! It is a little more complicated than the one for X11, running an "in-process Wayland server" for each application instead of translating C API calls directly. The GTK3 port now is built atop this instead of the X11 compatibility layer for both features and performance reasons.

## Changes &amp; bug fixes

Hundreds of bugs and other minor issues were resolved since the previous release, and there are simply too many to try and list them all here. Virtually every area of the system received some amount of attention, and the result is Haiku's most polished and stable release yet, even if some rough edges remain here and there.

### Improved POSIX compatibility

Haiku is always looking to see how we can improve our adherence to POSIX and make it easier for developers to port their software. There are too many changes in this area to individually list, but here are some highlights:

 * Addition and implementation of `locale_t` and related methods.
 * Support for C11 threads.
 * Increased maximum argument length to match FreeBSD (roughly doubled).
 * More portions of the C library taken from `glibc` replaced with `musl` equivalents
 * ELF "undefined weak symbols" now supported.
 * `dl_iterate_phdr` implemented.
 * Fixed behavior of `O_NOCTTY`, which GPG relies on.

### Boot failure fixes

Boot failures have wide and diverse causes, from USB driver bugs to race conditions in initialization and back again. Many problems preventing successful boots completely or intermittently both on real hardware and in virtual machines were tracked down and resolved, making it possible to at least start Haiku on a much wider variety of hardware than before.

### NVMe driver improvements

The NVMe driver now supports falling back to "polling" mode when interrupts are not working properly, handles "unaligned" transfers much more reliably, and had a number of performance improvements made to it. Support for TRIM was also implemented.

### Kernel always compiled with newer GCC

On 32-bit x86 systems, we still use the ancient GCC 2.95 to compile many parts of the system to maintain ABI compatibility with BeOS. However, in this past development cycle, changes were made so that the kernel and drivers are always compiled with the newer GCC version (presently GCC 11), even when building most of the system with GCC 2.95.

### General stabilization work

A significant amount of time has been poured into work on stabilizing the whole system, with a great many kernel and driver crashes, hangs, corruptions, and more tested, tracked down, and fixed over this release's development cycle. Overall, the system seems to be the most stable it's ever been, with plenty of feedback from the community to this effect.

## New contributors

Since the last release, there is 1 new Haiku developer with commit access: davidkaroly, who has already made significant contributions to Haiku's in-progress support for ARM. Welcome!

## Source code

The source code of Haiku itself can be accessed [from the GitHub mirror](https://github.com/haiku/haiku) or via [Haiku's own Git instance](https://git.haiku-os.org). Patches can be contributed [via Gerrit](https://review.haiku-os.org).

## Reporting issues

There are over 3,600 open tickets on Haiku's bug tracker and over 14,300 closed items.  If you find what you believe to be an issue, please search the bug tracker to see if it has already been reported, and if not, file a new ticket [on the bug tracker](https://dev.haiku-os.org/).

For information about major issues that have been fixed since the release, visit [the Release Addendum page](https://dev.haiku-os.org/wiki/R1/Beta4/ReleaseAddendum).

For more help, take the 'Quick Tour' and read the 'User Guide', both linked on the Haiku desktop. WebPositive opens by default with our 'Welcome' page which provides useful information and many helpful links, as does the Haiku Project's website.

For support and/or help with anything related to Haiku, feel free to post [on our forums](https://discuss.haiku-os.org), join one of our [IRC/Matrix/XMPP rooms](https://www.haiku-os.org/community/irc/), or send a message to one of our [mailing lists](https://www.haiku-os.org/community/ml) so our friendly community may assist you.

## Press contact

Press contact

Press inquiries may be directed to:

 * waddlesplash (English)
 * pulkomandy (French)
 * humdingerb (German)

All three contacts may be reached via `<nickname>`@gmail.
