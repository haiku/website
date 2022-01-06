+++
type = "blog"
title = "Haiku activity report - December 2021"
author = "PulkoMandy"
date = "2022-01-06 08:53:07+02:00"
tags = ["haiku", "software", "activity report"]
+++

Happy new year!

Note: this report covers changes only to the Haiku main git repository. There are many other things
going on for Haiku outside that git repository. In recent big news, we have an X11 compatibility
layer, and a running experimental Wine port. However, I cannot cover everything in these reports.
Help welcome if you want to contribute to our website with news announcements for such items.

That being said, let's see what's going on in Haiku itself!

This report covers hrev55688-hrev55768.

<h3>Contribution statistics</h3>

As the year ends, I have also updated the contribution statistics charts <a href="https://pulkomandy.tk/stats/">for Haiku</a> and <a href="https://pulkomandy.tk/stats_hp/">for HaikuPorts</a>.
There you can see the most active contributors over the lifetime of the project and for each year, the total number of people who have submitted patches, and several other interesting
graphs and statistics about our git repositories. Despite all the big news and progress happening,
this was surprisingly a slow year for Haiku, with the lowest number of commits ever, and also the
lowest number of contributors since 2016. Let's say we have quality over quantity?

No such worries on the Haikuports side, where both the number of changes commited and the number of
contributors is raising, reaching an all-time high of 75 persons contributing. There are currently
3037 recipes in Haikuports, packaging various pieces of software. We will see if the availability
of Xlib and Wine ends up increasing this next year.

The code size for Haiku remains stable since 2015, with around 30000 files totalling 5.5 million
lines. Of these, only 16000 are sourcecode (.c, .cpp and .h files), the remainder being documentation
(including several translations of the user guide), catalog files for the locale kit, buildsystem
scripts, and various data files for icons, application resources, etc.

<h3>Drivers</h3>

Rudolfc (with some help from Korli and KapiX) continues his work on the Intel graphics driver, with
support for PLL programming on Skylake chips, initial support for the DDI interface, and
implementation of interrupt handling for the newer generations of devices. This improves support for
modern Intel chipsets and various output types (DVI, DisplayPort, and eDP all require some specific
handling in the driver and it is not all in place yet).

Kallisti5 (also with some help from Korli) made some updates to the AMD Radeon graphics driver, with
various fixes for newer hardware and implementation of some missing parts. Anarchos and Nephele
added support for screen brightness configuration on Radeon based laptops.

Lt-Henry continues working on HID and input drivers, with some work to make the HID keyboard drivers
for USB and I2C be built from the same file. Previously the I2C file was a copy of the USB one, with
some changes. This will avoid the two implementations drifting apart as changes are made to one or
the other side. He also improved the output of the B_GET_DEVICE_NAME ioctl for these drivers, with
more improvements being discussed and worked on.

David Karoly is making progress on the ARM port, this month several patches to implement interrupt
handling were reviewed and merged. The set of bootstrap packages is now reasonably stable, and has
been uploaded to our buildservers. This means it is now possible to run a non-bootstrap build of
the ARM port for testing. Don't expect too much: currently this will only get you to the boot screen
with a few icons lit up, and was tested mostly in QEMU. The next step is adding some mass storage
driver to test the next part of the boot process. Work is ongoing to get the virtio driver running,
or maybe the SDHCI driver for SD/MMC cards will get there first.

X512 and Kallisti5 are working on the RISC-V port, with fixes to keep it building, as well as the
initial implementation of SMP (multi core support) being merged this month (this was already
implemented for some time by X512 but it spent some time in review and code cleanups).

<h3>Debugging tools</h3>

Korli added support for more things in strace: poll and select calls, as well as decoding of more
ioctl constants. He also added support for multiple syscalls (from different threads) being run
in parallel.

Strace is a tool that runs an executable and logs all calls to the kernel, allowing
to understand what the executable is doing.

<h3>Build system</h3>

David Karoly fixed several issues with the handlng of compiler flags for the bootloader. The
bootloader is a bit special in our build system because it is not built as an Haiku application,
but whatever is needed by the boot platform (an EFI executable, something that can be run by the
BIOS, or an OpenFirmware executable, depending on the target platform). This was not done correctly,
and some commands were run with the wrong flag or even with the wrong executable. In particular this
was creating problems for the ARM port, where the bootloader needs very different compiler flags.

Waddlesplash fixed various problems in the code to allow building Haiku with gcc11. This is now the
default and replaces gcc 8.3. Kallisti5 and David Karoly fixed some new compiler warnings found
after this transition.

Mt and Korli fixed some problems with our configuration for the LGTM static analyzer. LGTM is a tool
that scans our sourcecode and detects possible problems in it.

<h3>Kernel</h3>

Waddlesplash fixed several problems in the new condition_variable implementation. It should now
have less bugs and still perform a little better than the previous version.

Korli fixed an off-by-one error in the "metadata checksum" feature support in the ext2/3/4
filesystem driver.

<h3>Network stack and POSIX compatibility</h3>

Waddlesplash also fixed a double free in the UDP implementation.

Korli fixed a problem in the TCP stack and another in the XSI semaphore implementation, both found
by running the NSPR test suite.

PulkoMandy fixed problems with the timeout management in the DHCP client, which would not handle
lease times longer than an hour correctly, and sometimes end up flooding the network with DHCP
requests.

<h3>Boot loader</h3>

David Karoly made several fixes to the EFI bootloader, not only for the ARM port, but also to
enable building a 32-bit x86 version. This will be useful for some machines that don't provide
a 64bit EFI implementation: some early x86 Apple machines, and some x86 Android tablets. This
resulted in refactoring to make the EFI bootloader easier to port to new CPU architectures in the
future.

<h3>app_server</h3>

Waddlesplash fixed a bug in the handling of bitmap cursors. It was possible to crash app_server by
passing it invalid parameters in some cases when setting a custom cursor.

PulkoMandy fixed a bug in the B_OP_COPY drawing mode implementation, that would lead to the selection
rectangle in Wonderbrush being solid white instead of transparent.

Máximo Castañeda fixed a problem in the font management that led to incorrect font metrics being
used when unusual font styles are available (semibold and bold would be mixed up, for example).

<h3>User interface and applications</h3>

Alex Hitech fixed the ruble symbol being at the wrong place in the Russian keymap.

Nephele fixed the height of the loading bar in WebPositive to match with the status bar (depending
on the system font size).

PulkoMandy added a new data source to ActivityMonitor, to show the current CPU frequency. He also
improved the performance of ActivityMonitor so that it uses less CPU to redraw its graphs.

PulkoMandy fixed use of custom icons for directories in Tracker.
