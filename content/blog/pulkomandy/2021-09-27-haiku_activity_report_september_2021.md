+++
type = "blog"
title = "Haiku activity report - September 2021"
author = "PulkoMandy"
date = "2021-09-27 08:53:07+02:00"
tags = ["haiku", "software", "activity report"]
+++

Hello there, it's time for the monthly activity report!

This report covers hrev55343-hrev55451.

<h3>app_server</h3>

PulkoMandy reworked the way the screen is taken out of DPMS power saving mode when app_server
first starts. This should have no consequences on most hardware since the screen will normally
already be up during the boot screen, but the way it was implemented led to some confusion in
existing drivers, as we tried to turn the screen on before the driver had a chance to set a video
mode on its own. So this code is moved a little later in the setup sequence.

John Scipione changed the behavior of the BBitmap SetBits method to remove some special cases
in place to implement exactly what was described in the Be Book for BeOS. This apparently fixes
at least one BeOS application, so maybe the documentation wasn't correct.

3dEyes fixed the generation of filenames when creating copies of a file in the same directory.

Korli added support for the RGB48 and RGBA64 color spaces in the interface kit. This allows
translator to return a full color resolution bitmap for image formats that can store that.
The interface kit itself still needs these images converted to 32bit before they can be displayed.

<h3>ARM64 port</h3>

tqh cleaned up several parts of the code for the ARM kernel and managed to get the bootloader to
completely run, and attempt to start the kernel. The next step is setting up the MMU to manage
virtual memory. This work includes a rework of the kernel linker scripts and executable header,
removal of currently unused support for direct booting from u-boot (we are going to use UEFI
instead, which provides an easier environment to work with), and preparing the haikuports pre-built
packages to ease creating an ARM64 build of Haiku without having to do a bootstrap everytime.

kallisti5 did some fixes to the UART management for the early console output from the kernel.

<h3>RISC-V port</h3>

kallisti5 cleaned preprocessor checks for the RISC-V architecture, which were using various
preprocessor defines, to settle on one single variant. Together with X512, they finalized support
for PCI on RISC-V architectures and merged most of the patches needed for the RISC-V port. Expect
testing images to become available soon.

<h3>Tracker</h3>

John Scipione's work to add thumbnail support in Tracker was merged. The option is still disabled
by default and there are some known regressions with normal non-thumbnail icons.

John also modified Tracker filename truncation to remove the middle of filenames, rather than
the end. This helps when you have similarly named files with different suffixes.

<h3>Preferences</h3>

Nephele removed the limitation in Time preferences that prevented setting the date later than
the year 2038 for 64bit systems, where this limitation does not apply. On the 32bit version of
Haiku this limitation remains to avoid problems with the time_t type in existing code.

kallisti5 fixed the Bluetooth Deskbar replicant to scale with the font size, as other Deskbar
icons already did.

<h3>Applications</h3>

Andrew Lindesay fixed installation of local hpkg files in HaikuDepot.

3dEyes improved the layout of the CodyCam application, converted Cortex to use vector icons,
and fixed the VideoWindow consumer in Cortex (which allows to view the output of a video media
node in a window).

<h3>System libraries</h3>

Waddlesplash replaced some libroot functions with faster implementations from the musl C library.
He also fixed the B_CURRENT_IMAGE_SYMBOL macro that was failing to compile with gcc2.

Nielx fixed the return value of posix_fallocate. There was some confusion between different error
codes from BeOS (B_UNSUPPORTED and B_NOT_SUPPORTED) and POSIX (ENOTSUP and EOPNOTSUPP) which are
currently not all identical.

<h3>Build system</h3>

Waddlesplash reworked some aspects of the Haiku package generation. The initial setup was done
with only two architectures in mind (gcc2 and gcc8, both for 32bit x86) but later on, Haiku
gained 64bit support and it is now being ported to more architectures (with the RISC-V port
making a lot of progress lately). As a result, there were a lot of duplicated files for each
of these versions, that have now been re-unified.

There is more work in progress to further simplify the generation of the Haiku package and make
it more similar between the "minimal" and "regular" versions, by having some of
the "regular" things moved to separate packages.

He also made some initial work on restoring support for packages compressed with ZSTD, a better
and faster alternative to zlib.

Waddlesplash also fixed some issues in Jamfiles and in libroot_build to improve build times and
better detect some errors that could go unnoticed.

Jessicah modified the haiku_devel package to use only relative symlinks when refering to files in
the main haiku package. This eases the use of the package outside of the usual /system/ installation
path.

<h3>Translators</h3>

Link Mauve added an AVIF translator, making it possible to open AVIF images in Haiku applications.

Korli modified the RAW translator (for "raw" image from picture cameras) to use libraw instead of
the older dcraw based implementation of the format, on platforms where libraw can be compiled
(it is not friendly with gcc2, which will retain the older code for now).

<h3>Code cleanups</h3>

Coldfirex and Franck LeCodeur fixed various compiler warnings in multiple places in the code,
as well as checking extra warnings such as -Wformat-security.

Nielx started work on a new iteration of the "Services Kit" that provides support for HTTP and
other high level network protocols. This work resulted in discussions on which direction to go
with modern C++ features in new APIs, and in particular, some discussion and experimentation on
adding more context to system errors. One problem with the existing kit is that some functions
can report errors only through a single status_t variable, and these errors often end up being
shown to the user (because network connectivity problems aren't uncommon). The limits of this
approach result in messages that are both confusing for end-users and insufficient for developers
to gather enough information about what has happened. Nielx plans to work in a branch for the
new kit itself, but some of the changes needed in other places may be merged earlier in nightly
builds.

Waddlesplash made static libraries use -fvisibility=hidden by default. In the Haiku build we use
static libraries as one of our mechanisms for providing a stable ABI. The code in static libraries
can change ABI, since it is copied into each executable using the library, this should be fine.
However, we now have a lot of code that's in this state, for example in libshared (with various
experimental user interface widgets) or in libnetservices (the HTTP and other network protocols
implementation), and this code is used a lot, not only by applications, but also by add-ons and
libraries. These ended up re-exporting some parts of the static libraries as publicly available
symbols, and one application could end up calling code from multiple versions of a static library.

Unfortunately, we were a bit late to act upon this, and the fix ended up breaking several
applications. The fix is not too complex, but requires recompiling each of the affected applications.

<h3>Kernel</h3>

Waddlesplash fixed various debug and instrumentation options that were not compiling or not working
properly.

X512 added information to device_manager nodes to indicate the corresponding kernel module and
path of published devices in /dev. This helps identifying if hardware is supported by a
device_manager driver, and the information is visible in the Devices application.

Waddlesplash reworked locking of virtual memory to allow some code paths to allocate memory as
needed. This allowed to fix a problem in WebKit where an mprotect call on a very large area would
fail as a temporary buffer allocation in the mprotect allocation would not be allowed.

<h3>Drivers</h3>

Waddlesplash fixed several issues in the XHCI driver (for USB3 controllers) and usb_audio, which
is now working but has several problems resulting in corrupt audio.

This work also led to investigate and cleanup various problems in the multi_audio add-on (which
manages soundcards at a high level), the system mixer, the Media Kit, and the media routing
application Cortex. These changes alltogether make it possible to bypass the system mixer and do
tests where the output of a Tone Producer media node is sent directly to the soundcard, bypassing
the system mixer. This may help clarify some of the existing issues where no sound is played,
and determine if problems are in the drivers, or in Media Kit.

PulkoMandy started work on improving support for ClickPad touchpads, which are commonly used on
new laptops. Unfortunately, unlike previous touchpad generations from Synaptics, there is no
public documentation, and the implementation is based on existing code and mailing list discussions
from Linux.

Rudolf Cornelissen improved the support for PCI-express card in the nVidia driver, and added
support for virtual screens (video modes larger than the actual display can handle, with scrolling
to follow the mouse cursor) and accelerant cloning (used to give BWindowScreen a direct access
to the video card without going through app_server) in the intel_extreme driver.

Lt-Henry reworked the HID parser (used for USB input devices) to allow keyboards using bitmap
reports to work. This way of reporting key presses is used by some "gaming" keyboards, and allows
to report any number of key presses and releases with low latency.
