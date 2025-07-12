+++
type = "blog"
title = "Haiku Activity & Contract Report, June 2025"
author = "waddlesplash"
date = "2025-07-12 19:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev58898 through hrev58945.

<!--more-->

### Applications

humdinger made some modifications to Mail to avoid showing empty, missing, or duplicate contact information or email addresses.

waddlesplash fixed the build of the "DebugAnalyzer" (a graphical tool to visualize system-wide scheduler profiling data) after changes to the `BObjectList` API.

nipos improved Expander's HiDPI scaling behavior and fixed the window sometimes getting cut off.

nipos made icons in Printers preferences scale with HiDPI.

### Command line tools

OscarL added an option to `pkgman` to not refresh repo caches on `install` (`--no-refresh`).

### Kits

waddlesplash refactored how control edge (borders, etc.) colors are computed inside HaikuControlLook (the class that renders UI controls under the default appearance), cleaning up a lot of convoluted computations. He also fixed some color handling in the progress bar control, and then along with nephele, refactored how control colors are used and computed across the system. The "Control background" color in Appearance preferences now has a new default and is much more properly used across the Interface Kit; under the default colors, renderings should be basically the same as before, but for users on "dark mode" or other custom color schemes, it will now be much easier to pick control colors.

jscipione implemented color drops on unselected items in the Color list view, as used in Appearance and elsewhere.

jscipione reverted a change to BWindow menu management that had caused a variety of bugs.

### Servers

madmax added a check in the UserBootscript to avoid trying to open files in the "launch" directory that don't exist, causing spurious errors.

PawanYr fixed some problems with workspace management in app_server that was leading to incorrect or invalid redraws after switching workspaces, fixing a very old (15 years!) bug.

waddlesplash revived, completed, and merged an old patchset by scph to render all the default cursors in app_server from HVIFs at startup, allowing them to be properly scaled on HiDPI.

### Drivers

waddlesplash replaced the "iprowifi3945" ("wpi" on the BSDs) driver with the version from OpenBSD, which seems to work much better than the version from FreeBSD.

### File systems

Jim906 fixed a problem with possible garbage values on file resizing in the NFS4 driver.

Jim906 added some more robust error handling in the FAT driver, potentially fixing crashes in some situations.

### libroot & kernel

korli fixed printing syscall parameters in `strace` on 32-bit x86.

korli added support for `O_CLOFORK`, `MSG_CMSG_CLOEXEC`, and `MSG_CMSG_CLOFORK`, all specified in POSIX-2024. He also added `closefrom()` and `closerange()` to `libbsd`, utility methods for file descriptors that are used in tests created on the BSDs.

korli added a missing check in the VFS to verify that the file is a directory when `open()` is passed a path with a trailing slash.

mbrumbelow cleaned up some unused variables in some stdio code imported from glibc.

korli added checks to the socket `shutdown` method to ensure that the "how" value is valid.

korli adjusted `kqueue()` to not keep queues after fork, the same behavior as on the BSDs.

waddlesplash wrote and committed a test for kernel handling of floating-point exceptions (combining testcases from a variety of tickets fixed recently).

korli adjusted the TCP layer to avoid notifying `EPIPE`/`ENOTCONN` on reads when no connect or listen had happened. He also adjusted `socket()` to properly return `EPROTOTYPE` and `EPROTONOSUPPORT`, not just `EAFNOSUPPORT`, improved error handling in `accept`, implemented some missing features like `bind` in UDP, and more.

waddlesplash tweaked the IPv4 driver to compute more checksums under `IP_HDRINCL` mode, as used by `traceroute` and other tools.

waddlesplash implemented and merged the necessary groundwork for Path MTU discovery, namely an `IP_DONTFRAG` socket option and the ICMP `FRAGMENTATION_NEEDED` information being passed up the stack. He pushed a draft implementation of Path MTU handling in the TCP layer for review, but it hasn't yet been merged.

waddlesplash fixed a potential minor memory leak and also a lock-order-inversion problem in the memory management code.

### Documentation

jscipione documented BButton's `AdoptSystemColors` and `HasSystemColors` in the Haiku Book.

### Build system

nephele changed the `configure` script to use `command -v` instead of `which`.

waddlesplash synchronized the `libbe_build` implementation of `BBitmap` with the main one in the Interface Kit.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!

If you've been following the forums, you'll know that I've been occasionally [streaming Haiku development on Twitch](https://discuss.haiku-os.org/t/streaming-haiku-development-on-twitch/16239) now and again. I have a bug to solve on my TODO list (a system-wide memory leak triggered by the Rust compiler) which I'll likely stream the investigation of sometime in the next week or two, so keep an eye on the forums and/or [my Twitch account](https://www.twitch.tv/waddlesplash) if you're interested in following along with that.
