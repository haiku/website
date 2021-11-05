+++
type = "blog"
title = "Haiku Contract Report: October 2021"
author = "waddlesplash"
date = "2021-11-04 21:00:00-04:00"
tags = ["contractor"]
+++

Just like [last month](/blog/waddlesplash/2021-10-02_haiku_contract_report_september_2021/), while we already had an [activity report](/blog/pulkomandy/2021-11-01-haiku_activity_report_october_2021/), the work I have been doing thanks to the [generous donations](https://www.haiku-inc.org/donate/) of readers like you (thank you!) deserves its own report.

<!--more-->

This report covers all of October 2021, which was indeed a "shorter" work-month than September was, as I was "away from keyboard" as planned for over 10 days of it. Nonetheless, I still completed quite a substantial amount of work, and got the ball rolling on some of the larger items.

So, let's recap.

## End-user-facing changes

### Environment fixes in launch_daemon & app_server

That's right, the (previously) most-upvoted ticket on the Haiku bugtracker, [#12534](https://dev.haiku-os.org/ticket/12534), has been fixed! (Though perhaps in a "temporary" fashion for now, while a more permanent fix to how we handle environments and the GUI is still being discussed.)

### NVMe driver fixes

The `nvme_disk` driver (which I wrote almost all of a few years back) had accumulated some tickets over the past year. Chief among these were some KDLs related to misaligned buffer addresses -- ouch! After a [few rounds](https://github.com/haiku/haiku/commit/69880fc7cb8a103979c9deb2fbc61181ea0b9de3) of [fixes](https://github.com/haiku/haiku/commit/52f94eb19e7e1fcb52d1a517070f5e2069c9b43c), those are now all resolved.

I also fixed some problems related to interrupt initialization which were causing boot hangs on QEMU and at least some real hardware systems. korli also submitted a change after I wrote up details on a problem with MSI-X on QEMU, which seemed to fix even more of these problems.

And, while I was at it, I changed I/O scheduling to better account for multi-core lock contention, which might improve performance (though on the already most-performant disk driver by quite a large margin, that may be difficult to notice!)

### Some FreeBSD ethernet driver upgrades

As mentioned last month in "What's next?", I intended to take a look at upgrading our FreeBSD ethernet drivers, and potentially importing a new one for the latest line of Intel ethernet controllers.

Before I could do that, though, I had to update our port of FreeBSD's `iflib`, a library which handles a lot of the basic logic that ethernet drivers for recent (relatively complex) hardware need (at present it only is used by the `ipro1000` driver.) That took most of the time spent on this, but it was ultimately not too difficult (certainly easier than when it took me multiple weeks in 2018 & 2019 to port it the first time!)

After that was done, I upgraded `ipro1000` (which brought in support for some new families of hardware already), and reported some issues to the FreeBSD developers that I noticed while doing it. I then imported `intel22x`, the driver for the newest line of Intel ethernet chipsets, and made a build for testing. But, as I don't have this hardware to check with, and nobody else has tested with it yet either, I didn't include it in nightlies by default just yet. If you have some of this hardware, you can visit [ticket #17212](https://dev.haiku-os.org/ticket/17212) and download the experimental new driver.

I also made some fixes to Haiku-specific code in our port of FreeBSD's older `ipro100` driver, which might fix some long-standing problems (as well as some very recently reported problems) related to and caused by it.

## Internals changes

### Newer compiler for the 32-bit x86 kernel

Like last month, in addition to the end-user-facing changes, there were a lot of "internal" changes that improve developer ergonomics or pave the way for future changes, but are not (yet) that visible to end-users.

The first of these last month was to drop GCC 2 for compiling the kernel. (We only used it on 32-bit x86 already, of course, with x86_64 and all other architectures using a more recent GCC 8.) There already had been a general consensus for some time that this was a logical step to take and would not cause any harm (we no longer care about preserving BeOS driver ABI compatibility, and indeed have already broken it in some ways), and would in fact provide some serious benefits (e.g. no longer having to patch FreeBSD's drivers to compile as C89 for GCC2 compatibility, the ability to use some newer C++ features, using Zstd in the kernel packagefs -- which was the original motivation for this work, etc.)

This change required a lot of fiddling around with core build system logic to have a separate `KERNEL_ARCH` from the general build `TARGET_ARCH`, and lead to some simplifications and clarifications in the Jam scripts across all architectures, not just for x86, as well as a small number of fixes to actual kernel code that did not initially compile with GCC 8 (mostly related to 32-bit x86 paging code which is not compiled anywhere else.)

After a few rounds of changes and review (and recompiling things multiple times in various ways to make sure nothing broke), the changes were merged at the beginning of last month, and the 32-bit x86 nightly kernels and drivers have been compiled with GCC 8 ever since. A small performance improvement, as expected with using a newer compiler, is one of the benefits you might potentially have noticed in certain circumstances; otherwise, this was entirely an internal change.

### Deprecated error messages removal

BeOS R5 had two error codes that basically meant the same thing: `B_ENTRY_NOT_FOUND` and `B_FILE_NOT_FOUND`. They had already marked the latter as deprecated ... but over two decades later in Haiku, we still had it. Very little actually used this error code, so it was rather short work to clean up the remaining usages and then remove it outright.

I also submitted changes to clean up `B_UNSUPPORTED` and `B_NOT_SUPPORTED`. BeOS R5 technically also had both of these, but the latter was always called `EOPNOTSUPP` (the POSIX name), and there was no Be-equivalent name (which is our own introduction.) `B_UNSUPPORTED` is marked as a "Storage Kit" error, and as such is returned by most things related to storage (e.g. filesystem drivers), and so we cannot remove it on 32-bit x86 in order to keep to BeOS ABI compatibility. On other systems, we could potentially do so, and so I submitted changes to do just that, which are now under discussion in Gerrit.

### zstd package compression

As mentioned in the "What's next?" in the last contract report, I spent some time working on getting Zstd compression for Haiku packages working further. Now that x86 32-bit is compiled with a newer GCC, it was possible to enable Zstd compression support there, and then to add it to the bootloader.

We also were not properly setting the "highest" compression level in Zstd when it was requested in the `package` command (Zstd considers `22` to be the highest level, while `zlib` has it at only 9.) This is also now fixed.

So, at least across x86, Haiku itself is now ready for Zstd-compressed packages, and in fact you can start making and using them yourself right now, if you want to. However, Haiku will probably not start using them by default for a bit longer just yet, as you cannot upgrade from a system without Zstd support to one that has been compressed with Zstd in one go; and while x86_64 has had that support for a while, x86 32-bit has only had it for less than a month. It seems we may enable this by default only shortly before the next release ... time will tell.

### Return of the `framebuffer` driver

With the addition of the UEFI bootloader years ago, Haiku gained a dumb `framebuffer` driver (as x86 had, until then, always had access to a VESA BIOS and used that driver instead.) But owing to problems in app_server, it was removed in 2017, and instead the `vesa` driver gained support for operating in "framebuffer" mode (without a BIOS.)

With other platforms now being brought up that have no VESA BIOS, and with PulkoMandy's upcoming changes to support some more advanced VESA usage (including live-patching the BIOS to get support for more video modes), the `vesa` driver is about to get much more complicated, so it seemed to make sense to try and split the `framebuffer` driver back into a separate one again.

So, I brought back the old driver from Git history, fixed it to run on recent systems, patched app_server to properly handle both drivers, and removed the now-unneeded logic from the VESA driver. Following some testing by various users, all of these changes were merged into the nightly builds, and so far as I know, no regressions were yet reported due to them.

### bootloader `frame_buffer_console`

Most hardware has a "text mode" that bootloaders will use to display whatever they need to before switching to "graphics mode" during the actual boot process. However, on some hardware (e.g. some ARM devices), there may not be a text mode (or it may be extremely primitive and not at all friendly to use, as is the case on SPARC apparently.) In these cases, the bootloader will need to be able to draw graphics on the screen to display its menus instead.

We already have a mechanism for a "framebuffer console" in the kernel; it's used for KDL, app_server crashes, and so on, and there was already a bit of work from long ago to use it in the bootloader as well. But the bootloader also assumed that any individual boot platform will only have one kind of console, not more; and at least on EFI, we may attempt to use one or the other depending on what is available.

So, I spent some time refactoring the bootloader to support more than one kind of console, and then added a console implementation that uses the kernel's `frame_buffer_console`. It is still pretty primitive (the color handling is not quite right and makes this rather illegible on the main bootloader menu), but it does already work on EFI.

### app_server graphics copy refactors

Many years ago, app_server gained some custom functions to copy memory that were better optimized for the video cards at the time (which were in those days often "AGP" cards.) These functions were used (often in some interesting ways) for copying pretty much *all* pixels from any output buffer to another, even if those buffers were really in main memory and not video memory. They also did not handle pointer alignment properly, which caused problems on RISC-V (and how this issue came up in the first place.)

After conferring with kallisti5 and PulkoMandy, I [replaced](https://github.com/haiku/haiku/commit/778706215d4614789202d0800d7b6c53973fc9e3) these custom functions with the standard `memcpy` and `memmove`, instead (which for us are faster than these custom functions were, at least on main memory), as well as adding even more optimized cases for when we know we are not operating on graphics memory (which, as it turns out, is most of the time.) This is some kind of performance improvement in most respects, though likely it is so small that it will not be visually noticeable, I think.

### Miscellaneous cleanups...

As is usual during the course of development, I also made quite a lot of miscellaneous cleanups to various things around the tree, including some additional unit tests, refactoring ControlLook code, deleting lots of unused constants from the Radeon HD headers, string-handling logic in Tracker, removing the old `termcap` files, etc.

## What's next?

Well, already last month I started work on refactoring our NTFS driver. We use NTFS-3G internally to perform actual I/O operations, but of course we have to interface with Haiku's APIs from there, and our "glue code" which does that is rather old and somewhat outdated; and not very optimized (it does not use any of the file or VFS caches at all, for instance!)

So, I have begun rewriting it from scratch, making use of NTFS-3G's "lowntfs" code where appropriate. Already support for reading is basically completed, with major performance gains over the current driver (the code can be found on Gerrit), and I have some work offline towards write support. A complete draft of that should be done in the next few days, and after my own testing, I intend to turn that over to the users who have reported NTFS issues on the bugtracker to see if it indeed resolves the various KDLs and other issues that presently plague the driver.

I also noticed some problems with the FAT driver while working on NTFS, so I will probably look at that once the NTFS work is done and merged.

After that, probably I'll switch to working on one of the other things from the "What's next?" of last month: perhaps USB WiFi support...

### Whew...

Not quite as long as last month, this report has "only" come out to about 2100 words. See you next time!
