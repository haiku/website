+++
type = "blog"
title = "Haiku Activity & Contract Report: February 2022"
author = "waddlesplash"
date = "2022-03-07 15:00:00-04:00"
tags = ["contractor", "activity report"]
+++

Just like last month, the usual Activity Report is hereby combined with my Contract Report.

This report covers hrev55836 to hrev55916.

<!--more-->

The biggest news this month, though, deserves to be mentioned right up front:

## USB WiFi support

That's right, after many years of being requested, Haiku finally has support for USB WiFi devices! (Currently only Realtek controllers are supported, but Ralink and others should follow before too long; Realtek/"RTL" chips are generally the most common, however.)

waddlesplash had started experimenting with these as early as 2018, but ran into problems in the USB stack (and also confusion about how FreeBSD's USB APIs mapped on to Haiku's.) Now, after having stabilized the XHCI (USB3) support and made Haiku's USB stack more robust, it was time to have a look at this again; and now it has been completed and merged into the nightlies (but not before it uncovered a few last bugs in Haiku's USB subsystems.)

This also entailed making the FreeBSD compatibility layer somewhat less PCI-specific, which may come in handy for ARM when we will need it to support network controllers attached to the FDT "bus".

It also exposed some more weaknesses in Haiku's kernel-level device management system. That refactor has been due for quite some time (the USB stack does all its own device management because the kernel's one is inadequate for its purposes), but likely will have to wait a bit longer...

### Applications

waddlesplash fixed a crash in Debugger when trying to use the CLI with non-existent applications.

waddlesplash added a note in the `pkgman` help text to clarify that `full-sync` can and does down-grade versions, if applicable.

jscipione fixed Appearance failing to store decorator names correctly on localized systems.

Humdinger removed some more obscure and unneeded options from the Media Mixer's configuration interface.

### Servers

waddlesplash fixed a bug exposed recently in app_server which caused the installed fonts to be scanned rather late, which had caused the first applications launched to open with a delay instead of rapidly.

waddlesplash fixed a race condition in launch_daemon that was the major remaining (non-driver-related) cause of "hangs on rocket" / "blue screen with cursor" problems (which notably occurred rather reliably on QEMU.)

madmax fixed the render and pattern colors getting out of sync in app_server, causing incorrect drawing on certain occasions; he also deleted a variety of unused code in the pattern handler.

### Drivers

rudolfc continued his work on the `intel_extreme` video driver, improving support for (e)DisplayPort, especially on Sandy & Ivy Bridge devices.

korli added a few more device IDs to the `HDA` audio driver.

waddlesplash turned down tracing a bit on the XHCI driver. Now that it is more stable, there is less need to print so much information to syslogs.

waddlesplash added the `intel22x` driver to the default images. (This is the driver for Intel's latest line of ethernet controllers, found in very recent Intel devices and motherboards.)

korli added more methods for the PCI bus manager to find the ACPI root pointer on x86, which especially helps EFI-booted systems. (This adds better support for PCI Express under EFI.)

### Interface Kit

madmax updated the list of "ignorable code points," which fixes some Unicode text rendering glitches that could be seen in WebKit on occasion.

### libroot & kernel

X512 contributed a patch to add a "classical" lock-switching interface to the kernel `ConditionVariable`. (Unlike other OSes, Haiku's default ConditionVariable API allows one to execute arbitrary code between the "add" and the "wait" steps, which is much more powerful than the API as found elsewhere; this contribution adds a direct equivalent of the more common API for easier use.)

waddlesplash fixed another race condition in `ConditionVariable` that was causing hangs for some users.

waddlesplash refactored the `cv` (condition variable) code in the FreeBSD compatibility layer, fixing some race conditions and then removing the workarounds that had been introduced to mitigate them.

X512 contributed a small fix to actually add `timespec_get` (a new POSIX API) to the build. (The implementation was added some time ago, but it was not fully enabled.)

waddlesplash added proper support for "undefined weak symbols" (that is, symbols which are "optional" and need to get a default value in the case that they are) to runtime_loader, which closed a decade-old ticket and enables more straightforward porting of Vulkan add-ons (and potentially drivers). This required some careful investigation of a comment made by bonefish over 10 years ago about some things that needed to be taken care of in the runtime_loader API in order to not cause more problems when introducing this feature. (Once enabled, some other hacks could be removed.)

waddlesplash added some new assertions to `BReferenceable` and enabled them by default, to catch premature deletion of objects that still have references present. This exposed some bugs in HaikuDepot, package_daemon, packagefs, and other applications (most of which have been resolved already, and others at least improved.)

waddlesplash added some sanity checks to kernel memory allocation routines to make sure that incompatible flags were not passed in. Previously this could either deadlock or silently fail; now it will enter KDL.

waddlesplash fixed a 10-year-old memory leak in the block cache (which is used by BFS and other filesystem drivers quite extensively.) While the conditions for triggering it were not excessively common, it seems to have been the likely culprit for the "continually increasing, never decreasing cached memory usage," as well as the "BFS unmount KDL", both of which now seem to be resolved.

waddlesplash replaced and removed an old reference-counting API from before the days where BReferenceable was available in the kernel. He also cleaned up various bits of old code.

korli added support for the "clockwait" functions that will be introduced in the next version of POSIX.

waddlesplah fixed a race condition in the kernel `setpgid` implementation that caused KDLs when it was invoked on teams that were in the process of exiting. (This was reliably caused by the `stress-ng` test suite.)

kallisti5 added basic support for signing the EFI bootloader, so that Secure Boot can potentially be used (at present it requires installing Haiku, Inc.'s keys into your bootloader.)

kallisti5 increased the maximum process arguments size to 256KB, which is just slightly larger than the size used by FreeBSD. (Previously the size was half that, much less than FreeBSD, and very much smaller than Linux.) This should help with "argument too big" problems seen in build jobs of some more complex applications.

### ARM!

There were a few minor patches last month towards ARM64, and more work out-of-tree by some new(er) contributors.

Mostly, though ARM(32) received the most attention from davidkaroly's changes. The syscall implementation, userland entering from kernel, and runtime_loader all received a good bit of attention last month, as well as an initial implementation of thread context switches. Haiku on ARM in QEMU now attempts to start launch_daemon before crashes are encountered (which is quite a lot of progress, and much further than we've ever been before!)

### HaikuPorts

threedeyes improved the GLFW port substantially. Along with some other fixes, this makes it possible to run official builds of Minecraft Java Edition (albeit with a custom loader system.) He [posted a screenshot](https://discuss.haiku-os.org/t/minetest-and-minecraft-on-haiku/3597/21) of it on the forums.

### That's all, folks!

What's next? Well, at least I (waddlesplash) have now been looking into the tickets in the next release's milestone, and (as you can see based on the report above) have been tackling quite a lot of kernel-related issues. I intend to stick with that this month (memory leaks are up next), and then maybe work on some other, UI-related issues before starting work on the release itself.

Once again, to all of Haiku's supporters, and our wonderful community! We could not do all this without you.

See you next month!
