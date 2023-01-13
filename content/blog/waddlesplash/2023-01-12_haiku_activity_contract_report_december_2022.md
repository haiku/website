+++
type = "blog"
title = "Haiku Activity & Contract Report, December 2022"
author = "waddlesplash"
date = "2023-01-12 23:30:00-04:00"
tags = ["contractor", "activity report"]
+++

As is the usual way of things, the monthly Activity Report is hereby combined with my Contract Report.

This report covers hrev56627 through hrev56681.

<!--more-->

### R1/beta4 released

Of course, the biggest news last month was that [R1/beta4 was finally released](https://www.haiku-os.org/news/2022-12-23_haiku_r1_beta4/) just a few days before Christmas. I spent most of my time last month working on the release in various capacities: final polishing, system stabilization, and then of course writing the release notes, creating the various release pages on this website, ensuring proper distribution of the release (which kallisti5 did most of the work on, so big thanks to him!), and more.

Then, of course, once the release was out, I kept an eye on various news aggregators, forums, and other places as word of the release spread, and chimed in with comments and replies to people with questions or interests in the release. There is [a page on the Trac wiki](https://dev.haiku-os.org/wiki/R1/Beta4/InThePress) where I and the other developers have collected links to the various places the release was reported and discussed around the internet (if you know of one that is not linked from there, please inform us!)

But there were still developments in and around Haiku besides the release itself. So, let's look at those...

### Applications & Command Line Tools

humdinger fixed an off-by-one problem in Tracker's thumbnail logic which manifested when writing out the image sizes into extended attributes.

PulkoMandy made Tracker always use the thumbnail attribute for an icon if there is one, even if Tracker does not know how to generate that thumbnail. This makes it possible for other applications to save previews viewable in Tracker for any filetype they want.

OscarL fixed detection of keypresses in Shortcuts even when the lock keys are set.

korli added options to the `setvolume` command to mute, decrement, and increment the volume rather than just changing it to a specific value.

jessicah updated Terminal to load themes from settings files (including user settings files) instead of having only a small hard-coded set of them.

humdinger fixed the buttons in Expander's BAlerts to be in a more logical ordering and have more consistent text.

korli fixed Shortcuts to accept "consumer keys" (i.e. ones outside the keymap) as shortcuts, and then added default shortcuts for the HID media keys. This means that on many systems, you can now use the volume keys to actually control the volume, though at present there will not be any visual indicator for when this happens, and it may require copying some new data files for existing installs. Clearly some polishing is required, but this is a big improvement.

SamuelDCrow contributed a change to make PowerStatus exit cleanly when no batteries are detected.

KapiX adjusted HaikuDepot to use correct plural forms in some text.

OscarL adjusted `dstcheck` and `fortune` to use the `B_BACKGROUND_APP` flag, which will hide them from Deskbar by default.

korli added a facility for `listdev` to also list USB devices. This allows one to see all devices at once, and where they are in the hierarchy; it is not a proper substitute for `listusb`, which can dump USB descriptors and other details `listdev` does not know about.

korli & PulkoMandy added a feature to `strace` that allows one to filter out what syscalls one would like to see traced, instead of having to see all of them. korli also adjusted `strace` to be able to print values for the `create_pipe` and `socketpair` syscalls.

kallisti5 fixed the window scaling dynamics in the Network preferences window.

humdinger fixed the view colors of DiskProbe not being live.

PulkoMandy fixed a memory leak in MediaConverter.

### Drivers

korli fixed a hang and a use-after-free in the `usb_raw` driver (which is used to allow userland direct access to USB devices.)

Zelenoviy contributed a fix to the USB stack to handle a "busy" condition from the kernel device manager more properly.

korli changed the PS/2 keyboard driver to report "media keys" the same way the USB-HID driver does, in tandem with his Shortcuts changes.

### Servers

X512 improved debug_server's stack trace printing by ensuring the image name, not just the symbol name, is printed.

OscarL moved the `XDG_...` environment variable initialization into `SetupEnvironment`, so all things started by `launch_daemon` (including Tracker and Deskbar, and all applications launched from them) will have access to them. This improves the situation for ported software somewhat.

Dale Cieslak contributed a change (in the works and then review for a long time!) to support loading fonts from memory in app_server (not just from files.) This required a large refactor of app_server's font handling to implement properly, and it seems it still has some issues to be worked out (there are some new crashes now reported on the bugtracker related to this feature.) But this will allow for proper webfont support in WebKit.

### File systems

X512 contributed a change to have the `ramfs` automatically mounted on boot on top of `/var/shared_memory`. This means that all applications which use the POSIX `shm` file-mapped shared memory system will no longer have such memory written out to disk, which could (and did) cause performance problems in many applications. Most notably, this change provided a massive performance improvement to GNOME Web (Epiphany) and anything else using the Wayland compatibility layer. (waddlesplash's work on `ramfs` the month before was mostly so that this change could be merged without fear of causing further system instabilities.)

OscarL changed some of `ramfs`' exported flags to prevent it from appearing in parts of the user interface where it shouldn't (e.g. in VirtualMemory.)

PulkoMandy fixed `packagefs` to not provide "default" attributes for the root node, which just led to strange errors when invoking `listattr` or other such functions on it as they did not really exist.

PulkoMandy refactored `googlefs` to run in userland on top of `userlandfs`, and also to use the Network Services Kit to perform internet requests. However, it does not work at present to actually run queries, and there is some debate about whether there is any web search engine which it could be adapted for in a way that does not violate the search engine's ToS.

Jim906 fixed file modification recording times in the FAT driver.

kallisti5 fixed the permissions and permission checking of the kernel `rootfs` (the virtual filesystem that handles `/`.) This problem was discovered by OpenSSH, which complained about the permissions being too liberal.

### Kits

mt contributed a fix for a use-after-move problem in the new `libnetservices2` pointed out by Clang Static Analyzer. nielx fixed some other issues in it, as well.

PulkoMandy fixed some incorrect string and structure copies in the Media Kit and various media plug-ins. He also fixed a bad memory leak in the FFmpeg plugin.

PulkoMandy added a rule to the MIME sniffer for CSS, so it can at least have a chance of being properly recognized now.

Jim906 adjusted how "updates" mode was handled for `BWindow`s, fixing broken drawing to `BBitmap`s after `Invalidate` had been called. (This actually fixed an incompatibility with BeOS, in addition to being an annoying corner case of the API on Haiku.)

### libroot & kernel

waddlesplash made the kernel more properly verify that a valid set of `O_` flags are passed when opening a file descriptor. (This was discovered after enabling `ramfs` and trying to change keymaps in the Wayland compatibility layer.) Now it will return an error instead of behaving strangely when two different write flags are specified.

waddlesplash fixed a typo in libroot's `shm` functions which was uncovered by the previously-noted change to the kernel, which was the ultimate cause of the keymap problems.

PulkoMandy fixed an alignment problem in libroot's allocator on 32-bit systems that was causing crashes in WebKit (both GTK and Haiku ports) and other applications that made use of newer CPU instructions.

X512 replaced all the usages of the non-standard GNU inline structure assignment syntax with the standard version, instead, across the kernel.

korli fixed the reserved-memory checks in the EFI loader, making it possible to boot Haiku on systems with much more RAM than before.

congocongocongo contributed a patch to add a lot of missing `posixoptions` and `sysconf` constants and values, bringing Haiku more in line with POSIX.

X512 fixed an order-of-operations problem in the runtime_loader's image-unloading logic that could lead to crashes or infinite loops.

### Build system

xoblite updated the PCI and USB device ID lists to the latest upstream versions.

waddlesplash synchronized the set of HaikuPorts packages that Haiku is built against with the current ones from HaikuPorts, following changes to some of those packages critical for the release.

nielx updated the cross-compiling Dockerfile and build script.

### Documentation

PulkoMandy added a list of "media" keycodes to the public keyboard documentation, now that they are generally available and can be detected by applications.

### RISC-V

X512 refactored the Sstatus bit manipulations to be atomic and use helper routines, which simplified the code and made it more correct at the same time.

X512 improved the FDT bus_manager's compatibility.

X512 contributed a driver for the `ocores` I2C interface.

### HaikuPorts

Various changes were made to HaikuPorts to stabilize things for the release somewhat.

The other big changes were mostly to remove static libraries from all packages that also provide shared ones; we only want to provide one or the other, and nearly always the shared library. This has been a problem for many years, but now HaikuPorter checks for it during the post-`INSTALL` phase and will throw an error if it detects a policy violation.

### That's all, folks!

Thanks to all the developers, contributors, community members, and of course the donors that made 2022 such a great year for Haiku! There sure were some pretty big changes to the world of Haiku last year, and things look brighter than ever in many ways. Here's to an even better 2023!
