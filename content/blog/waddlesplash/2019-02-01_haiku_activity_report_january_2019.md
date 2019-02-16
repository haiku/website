+++
type = "blog"
title = "Haiku monthly activity report, January 2019"
author = "waddlesplash"
date = "2019-02-01 19:00:00-04:00"
tags = []
+++

Welcome to the second monthly report for 2019! PulkoMandy and a few others are representing Haiku at FOSDEM, so, I'm covering for him yet again. (Hooray, more writing about myself in the third person!)

This report covers hrev52707-hrev52827 (213 commits.)

### Applications &amp; Libraries

jackburton patched Terminal to use a float when computing font widths. This fixes the use of non-fixed-width fonts in at least some scenarios, though there are others unsolved as of yet.

Rob Gill, a new contributor, submitted changes to support changing system hostname in Network preferences, preserve user-specified DNS settings instead of overwriting them, and a lot of small code quality cleanups. Welcome, Rob!

Leorize contributed a patch to make `getifaddrs()` a networking primitive, behave more in line with the POSIX specification, as part of his work to get `libuv` running on Haiku. He also completed the long-standing `get/setpriority` patches as part of the same effort, which are also now finally merged.

A new HaikuWebKit release is now available, which fixes quite a lot of crashes related to video playback, the "CryptoQueue", and numerous other problems. There are a few new instabilities, but these are already being looked into.

waddlesplash rewrote the Media Kit's parameter view system. Previously it was rather buggy and would create controls with incorrect sizes, leading to them being invisible or cut off. Now the standard layout APIs are used, for a much more consistent experience. This affects virtually all of the panes of the Media preferences, as well as any third-party software that allowed you to edit system parameters.

waddlesplash introduced a change to BScrollView behavior to get more consistent results when using layouted views in combination with BScrollView.

PulkoMandy made a variety of changes to the PPM translator to support more image types and improve loading performance.

waddlesplash reworked how static initializers are handled in `runtime_loader` and libroot, which should fix a number of issues with ported applications.

### Servers

Stephan refactored and fixed subpixel font rendering in `app_server`. It now draws glyphs properly, instead of causing overlaps or other rendering errors. After some testing and tweaking of the default fonts again (we now use "Noto Sans Display" instead of "Noto Sans"), we now enable subpixel font rendering by default (finally!).

The `Screen` preferences will now properly distinguish between `VESA` and `Framebuffer` devices (previously it would say `VESA` no matter which was actually active.)

tqh fixed the `registrar` to watch for team deletions instead of checking once a second for them, which should allow the CPU to idle more often, thus improving battery life.

### Drivers

waddlesplash spent a full week doing a major overhaul of the FreeBSD compatibility layer to port `iflib`, FreeBSD's new ethernet driver subsystem. (The `ipro1000` driver from FreeBSD 12 uses it now, so it had to be done sooner or later.) As a side effect of this work, PCI device probing and attaching for all FreeBSD-ported drivers is significantly faster and less error-prone (this probably trimmed ~half a second, and perhaps even more, off of boot time on *all* machines), and paves the way for eventual USB support.

After overhauling the compat layer itself, waddlesplash finished porting ethernet and then WiFi drivers from FreeBSD 12. Thanks to the refactor, he rewrote the initialization code in the WiFi layer during this effort, which seems to have resulted in all "spontaneous WiFi disconnects" or "no networks shown" tickets tested so far to be reported as fixed! So, if you were experiencing those errors and haven't retested, please do.

Most of the upgraded WiFi drivers are just incremental improvements, but some (e.g. `realtekwifi`) which were seriously unstable before, now work very well.

waddlesplash fixed a few annoying bugs in the XHCI (USB3) driver that would cause it to fail initialization or cause kernel panics on startup. It still doesn't work properly on a number of devices, but at least it should print proper error messages instead of crashing the kernel for these cases. (Kernel panics during use still remain, though a number of these were fixed also.)

### Kernel

waddlesplash fixed the EFI bootloader's menus to properly handle the `Esc` key (previously, it ignored it.) Now you can navigate menus the same way as the BIOS loader.

Following the FreeBSD driver refactor, waddlesplash made some improvements to various KDL commands, mostly thread-related ones, and added some more safety checks in context-switching functions to make driver development easier.

waddlesplash did a major refactor of the kernel thread structure handling code, making it use R/W-based locking instead of a simple spinlock, which results in a ~10% performance boost even on dual-core systems with a low thread count (on systems with more cores and more threads, this number will probably be very much higher.) He also added a lot of missing permissions checks in it.

After enabling some more warnings, waddlesplash fixed some long-standing TODOs in the bootloader and kernel to obey some of the ELF-related kernel settings, and then in the bootloader to not scan partitions twice needlessly.

leorize contributed a patch to check whether file paths passed to the kernel were too long to fit Haiku's path-name limits, and return an error appropriately.

### Build system

We now use `xorriso` instead of `genisoimage` or `mkisofs` to generate ISO images. This tool is nearly as widely available as `cdrtools` is, and has the significant advantage that EFI-related extensions (which we use to build the EFI loader) are always available in it, whereas `cdrtools` on some Linux distributions does not support those.

Now that the build system works almost exclusively on relative paths instead of absolute ones, it was almost possible to build in a path with spaces in it. waddlesplash made a number of changes that leave this nearly working, though there are still a few problems not solved yet.

---

Thanks for reading, and see you next month!