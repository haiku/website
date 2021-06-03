+++
type = "blog"
title = "Haiku activity report - May 2021"
author = "PulkoMandy"
date = "2021-06-03 08:53:07+02:00"
tags = []
+++

Hello, it's time for the May activity report!

This report covers revisions hrev55070-hrev55129.

<h3>Sourcecode cleanup</h3>

mt is still hard at work fixing bugs found by various static analysis tool.
This month he fixed various format strings in userlandfs BeOS filesystem driver
support, as well as a misaligned structure in cpu.h, and multiple definition
of functions in various places.

kallisti5 added some debug traces to the NFS4 filesystem driver to help
investigate bugreports related to it.

<h3>Build system</h3>

extrowerk made some fixes to the configure script.

PulkoMandy updated the repository of packages used to build Haiku images. This
is a mirror of some packages from the Haikuports repository, at fixed versions
to avoid build breakages caused by too frequent haikuports updates.

AlwaysLivid updated some of our example dockerfiles which show how to set up
an environment for building Haiku or for cross-compiling applications from
Linux.

<h3>User interface</h3>

nephele added a new method to BControlLook to get the scrollbar width. This
will be used for example in HaikuWebKit, which draws its own scrollbars, to
keep the size synchronized with native applications. Until now, this required
having a real BScrollBar to compute the correct width.

The scrollbar width is adjusted according to the font size (as it already was),
but now, different control look implementations can decide to have different
rules for how wide a scrollbar should be.

John Scipione is still working on improving our BTextView implementation, and
made some changes to StyledEdit to fix some issues with the text area management
there.

nephele added a large font for the KDL console, which is enabled automatically
on high resolution displays (more than 1080p) where the default font is likely
to be too small. The new font is Spleen, an opensource monospace bitmap font
designed by Frederic Cambus.

<h3>System libraries and security</h3>

korli implemented stack protection support in Haiku (currently disabled by
default, configurable at compile time). The idea of stack protection is to
insert some markers in the stack, whenever a function is called. When the
function exits, there is a check to make sure the marker was not overwritten.

This can catch some buffer overflow bugs (although it would be more helpful for
this on architectures where the stack grows towards higher addresses), but is
mostly used for detecting malicious code trying to inject itself into the system
by exploiting bugs in a clever way.

korli also fixed a case where we accidentally allow kernel to access userland
memory, defeating the SMAP protection.

<h3>Preferences</h3>

PulkoMandy fixed a regression in Input preferences related to changes in the
API for live detection of added and removed input devices.

Fredrik Modéen updated the Bluetooth preferences to store the settings in a
BMessage instead of writing the raw data of a structure directly to disk. This
makes it a lot easier to change the settings format later on.

<h3>C and POSIX compatibility</h3>

extrowerk fixed our features.h header to support C11 correctly. This header is
used to hide some parts of our system libraries to provide strict conformance
to C or POSIX APIs (providing none of the BSD or GNU extensions if strict mode
is enabled). It also now handles enabling or disabling some functions that are
specific to a given version of the C language.

korli and PulkoMandy reworked the ioctl implementation to avoid undefined
behavior related to the use of variadic arguments. The ioctl function is from
POSIX and allows to configure file descriptors and communicate with drivers.
The POSIX version gained extra arguments over time: initially it allowed to
pass just an int, but then it was extended with some extra arguments. In other
POSIX systems, it's possible to know the number of arguments from the first
integer argument. But in BeOS and in Haiku, a lot more freedom is left to
driver as to how they use ioctls, and each driver is free to allocate values
as it wants. As a result, we were always trying to get all possible arguments,
even when they didn't exist. This works on x86 CPUs due to the way they pass
arguments, but could be a problem in other systems.

The new implementation of ioctl uses C++ or some tricks in C with structs and
macros to implement the function without variadic arguments. As a result, the
value of the unused parameters is forced to 0 now.

<h3>Networking</h3>

kallisti5 added more details about 10Gbps ethernet interfaces in ifconfig output.
Now you can know which type of link ou are using (there is a bit more choice there
than for slower speed at the moment, hopefully things will become more standardized
when 10GBps links become more popular).

korli started updating Wifi drivers to FreeBSD 13. He also finished the work
(started by A-star-ayush dusing a previous Google Summer of Code project) to
implement TCP selective ACK. This should improve the performance of
TCP, especially on lossy connections such as Wifi.

korli also disabled the wavelanwifi driver (it only supports very old wifi cards,
mostly PCMCIA ones which never worked in Haiku anyway), as well as the Firewire
support (which has been incomplete for a very long time and is now unlikely to
exist on modern hardware).

<h3>Package system</h3>

AGMS and PulkoMandy moved some work done on first boot of Haiku to compile
time. This will make the first run of Haiku boot a little bit faster.

<h3>Other platforms ports</h3>

X512 has made major support on RISC-V support, with Haiku fully running in
TinyEMU (no actual RISC-V hardware is supported yet). This work is currently
being submitted and reviezed on Gerrit, some of the first patches have already
been merged.

This work resulted in cleanups in various places all around the system:
removal of unneeded includes, conversion of code from C to C++, progress on
virtio drivers which are heavily used by the emulator, etc.

The work from X512 also includes several other not obviously related fixes,
such as simplifying the code in OpenTerminal, fixing of scripting in BTextView,
and many other small fixes.

PulkoMandy added the RISC-V logo to Pulse so it can properly show the results
of this porting effort.

Han Pengfei fixed some issues with device tree initialization in the EFI
bootloader, which will help with the ARM port and possibly the RISC-V port as
well if it is used on UEFI platforms later.

tqh is also helping on the ARM work and fixed some compiler warnings.

<h3>Drivers</h3>

An experimental driver for i2c input devices (mainly touchpads) was added but
disabled by default. Unfortunately it doesn't work reliably yet. This led to
some refactoring of the existing USB HID input driver to separate the HID part.
HID is a standard originally developped as part of USB for all sorts of input
devices (keyboards, mouses, joysticks, tablets, ...) but it is now also used by
I2C devices (embedded in laptops) as well as Bluetooth. So it made sense to
have this code shared between the drivers.

kallisti5 fixed some bugs in the XHCI driver to improve error handling and recovery.

Rudolfc is currently reworking the intel\_extreme driver to finally support
devices newer than Sandy Bridge. A small part of his work was already merged,
but he is currently running a testing campaign with help of our forum users to
validate some larger changes.
