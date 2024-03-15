+++
type = "blog"
title = "Haiku Activity & Contract Report, February 2024"
author = "waddlesplash"
date = "2024-03-14 10:00:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57561 through hrev57615.

<!--more-->

### Applications

PulkoMandy fixed some UI issues in Screen preferences, including invalid Hz being displayed and a confusing translation string.

madmax fixed updating fields in the FileTypes "Application type" window, fixing a rather old bug.

bitigchi made some improvements to UI strings in Terminal (use of a Unicode multiplication sign instead of "x"), and added a "Make a donation" link to AboutSystem.

apl fixed a compiler warning in HaikuDepot.

humdinger made Tracker offer "Get info" as an option in the "Broken link" alert dialog.

humdinger fixed Installer and AboutSystem to pick light/dark versions of the main logo as appropriate.

OscarL altered some shortcuts in Terminal to try and allow Shift+{Arrow,Home,End} to be used in applications running inside Terminal. (However, this seems to have caused regressions in other areas, and a followup change is in the works.)

nephele fixed the text color in DeskCalc's expression view.

Calisto-Mathias fixed an alignment issue with the "Close window" checkboxes in MediaPlayer's settings. They also removed the now-unnecessary tab view from the Devices app.

### Command line tools

korli fixed `listusb`'s display of maximum packet sizes, added display of the `length` descriptor field, and fixed a crash which happened when printing information of some USB audio devices.

korli (after adding some necessary methods to `libbsd`) updated the `ping` command to the current version from FreeBSD, fixing a number of bugs and adding new features. waddlesplash followed this up with a similar upgrade to the `traceroute` command.

### Kits

trungnt2910 gave the layout spacing enum a name, so it can be more easily used in API bindings to other languages (e.g. .NET.)

PulkoMandy reworked some code in the FFmpeg plugin and added some code to support newer versions of FFmpeg.

ilzu contributed a fix to `BKeyStore` to make its behavior match the documentation.

korli fixed BMenu's `SortItems` routine, which had been broken after switching to using `std::stable_sort` internally.

waddlesplash fixed the "raw" media decoder to properly pass errors back up the chain (so that `B_LAST_BUFFER_ERROR` will actually be seen by applications.)

waddlesplash fixed the FFmpeg plugin's frame-count computation to be more accurate, fixing BePac Deluxe (a closed-source BeOS game) once more (it checks frame count values in its audio files are exactly correct, and errors out if they're not.)

nephele added a `Brightness` API to `rgb_color` (replacing the old `perceptual_brightness` standalone function), and added `IsLight`, `IsDark`, and `Contrast` utility functions to go with it. He also wrote documentation for these new APIs and applied them across the tree in places where they made sense to use.

waddlesplash fixed the "multi audio" media add-on (the main one used for communication with audio hardware drivers) to actually use the reported record channel count rather than assuming 2, fixing audio input for USB headsets.

PulkoMandy fixed a shadowed variable problem in `BSpinner`, fixing the values sent in the "invoke" messages.

nhtello made a number of improvements to styles and visibility of the "Flat" decorator in dark mode.

X512 fixed the build of the UVC webcam driver on 64-bit (however, it's missing a bunch of code necessary for it to actually be used with most webcams.)

bitigchi added support for setting the output precision of `BNumberFormat`.

### Servers

PulkoMandy turned off some unnecessary logging in the package server.

bitigchi added automatic percentage string formatting to `notification_server`.

korli switched the default UI font to "Noto Sans". Previously it was "Noto Sans Display", but the Noto fonts project is discontinuing this variant, and "Noto Sans" itself is not too much different. madmax updated the "Symbols" font name as well.

X512 fixed a use-after-free on deinitialization in `Screen` and a memory leak in `BitmapManager` inside `app_server`.

### Drivers

OscarL fixed the build of the `acpi_ac` driver, which detects if the system is connected to AC power. He also submitted a fix for some typos in log messages in the `usb_rndis` driver, fixed SMAP violations in `acpi_ac`, `acpi_lid`, and `acpi_thermal`, and added some sanity checks to `acpi_ac` and `acpi_lid`.

waddlesplash fixed a compiler warning in the usb_audio driver, and disabled USB 2.0 audio device support for now (as it does not work and causes problems.)

waddlesplash made loopback (and tunnel) devices' packets not have ethernet headers. Originally they never did; then, when packet capture was fixed for loopback, dummy ethernet headers were added; but after some suggestions from one of the `libpcap` developers, changes were made to `libpcap`'s Haiku support to make the dummy ethernet headers unnecessary, and so they were removed once more, simplifying things.

korli implemented `connect` for IPv4 and IPv6 raw sockets (and removed a workaround in the new `ping` command for this.)

X512 changed PCI MSI vector numbers to always be 32 bits, and adjusted all drivers using MSIs to match.

waddlesplash ported a small fix to the `idualwifi7260` and `iaxwifi200`	drivers from OpenBSD.

### File systems

InfiniteVerma contributed a `touch` command implementation to the `fs_shell`.

### libroot & kernel

X512 fixed the "DPC" (deferred procedure call) module to not cause problems when passed the same procedure to call multiple times in a row.

sunfishcode contributed a change to make Haiku's `AT_FDCWD` have a value of `-100` (much like other OSes) instead of `-1`, to allow for error values to be more clearly distinguished from it. (For the moment, the kernel accepts either value, so old applications won't break immediately; but in the future, this may be changed. BeOS did not have `AT_FDCWD`.)

korli made a fix to the device_manager to allow the virtio-GPU driver to actually be loaded properly.

waddlesplash fixed the virtual memory manager's "reserve memory" routine to return immediately without waiting when the amount requested to be reserved is greater than the total amount available. This fixes some stuttering in Falkon (Chromium) on systems with not-so-large amounts of memory.

### Build system

kallisti5 bumped the system ICU version to 74 (and rebuilt all packages that depend on ICU as well, so only ICU 74 is installed with the base system now.) waddlesplash made a followup fix to libroot's locale code that had been broken in the upgrade. (This is one of the things that needed to be done before beta5.)

nephele fixed the compilation of some tests, and deactivated a few others from the build.

### Documentation

InfiniteVerma contributed some minor improvements to the internals documentation on filesystems.

PulkoMandy added mention of `libnetwork` on the page about `libroot` in the Haiku Book, and added a "Storage Kit Introduction" page which gives basic details on the filesystem hierarchy.

### ARM & RISC-V

Nothing of note that was ARM or RISC-V specific in February... but there's already been some activity in March, so stay tuned.

### Are we beta5 yet?

A few more tickets in the milestone were fixed, including the "ICU upgrade" one, but a few were also added (some migrated from HaikuPorts that turned out to be regressions in Haiku or its buildtools, etc.)

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
