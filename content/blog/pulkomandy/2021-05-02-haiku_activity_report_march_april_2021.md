+++
type = "blog"
title = "Haiku activity report - March and April 2021"
author = "PulkoMandy"
date = "2021-05-02 08:53:07+02:00"
tags = []
+++

This report covers revisions hrev54979-hrev55069.

<h3>HaikuDepot</h3>

Andrew Lindesay continues his work on HaikuDepot, fixing a glitch in redrawing
of featured packages. He completed the removal of the custom list class, so
HaikuDepot uses standard container classes from C++ or Haiku APIs. This makes
the code more similar to other parts of Haiku and easier to maintain.

With this rework done, Andrew is now working on new features. The first of these
is a counter for views of packages, which will allow to imrpove the way we decide
which packages are "featured" in HaikuDepot home screen.

humdinger reorganized the menus and fixed some localization problems. Joachim
Mairböck added a missing keyboard shortcut to open the application settings.

<h3>WebPositive</h3>

humdinger improved the deug console window to help copy-pasting multiple messages from it.

<h3>People</h3>

bitigchi added the "mobile phone" field to People files. Somehow we had missed
this aspect of the XXIst century until now.

<h3>Character Map</h3>

An old patch by dsizzle was finished and merged, it adds a larger preview of
a character by clicking on it.

<h3>Preferences</h3>

The selection of focus mode in Input preferences works again.

PulkoMandy fixed various problems in DriveSetup (and the underlying partition
editing code), allowing to change some partition parameters of an already
existing partition. It is now possible to change the active partition after the
fact.

Fredrik Modéen started fixing somme issues in the Bluetooth preferences. This
led to a new addition to the "shared kit" (a static library with work-in-progress
APIs that are made available to Haiku application developers): the SettingsMessage
class, which allows storing settings in a BMessage, with implementation of the
"Defaults" and "Revert" behavior as often used in Haiku.

Maciej Bałuta fixed the error message when trying to change the video mode for
the framebuffer driver (it now says "operation not supported").

Shannon Mackey made the printers preferences remember its window size and location.

CodeForEvolution fixed and documented watch_input_devices to behave like on BeOS.
He updated the Input preferences to use the new API.

<h3>Debugger</h3>

KapiX fixed an infinite recursion when trying to debug programs using lambdas.

<h3>Locale Kit</h3>

Andrew Lindesay added support for formatting percentages (used in progress bars
and a few other places).

KapiX fixed catalog loading to behave the same in all API usage cases (the code
was not behaving the same when loading a catalog from an image_id and from an
explicit MIME type). With this problem fixed, he finished the work on an old
patch by Dancsó Róbert, to translate the Cortex application.

<h3>Media Kit</h3>

3deyes implemented some missing functions in DefaultMediaTheme, which allows to
expose sound and video input and output device parameters. He used this to
implement support for IP cameras, making it possible to use an Android phone
as a webcam with a dedicated application running on the phone.

kallisti5 and PulkoMandy reworked the MultiAudioNode code (the interface to sound cards)
to add some checks for unexpected conditions such as a card using a negative frame
rate or number of channels.

<h3>Package Kit</h3>

The work by AGMS to run post-install scripts at first boot of a freshly installed
system has finally been merged. This took some time (work started before the beta2
release) in order to avoid introducing backwards compatibility problems.

<h3>Tracker Kit</h3>

Jaidyn Ann fixed hardcoded colors in tracker "Open With…" window. It now uses
the tooltip colors.

jiceland fixed issues with the "less than" and greater than" operators in Tracker
Find panel (they would always be "less or equal" and "greater or equal").

<h3>App server</h3>

An old patch by Tri-Edge AI was reworked and finally merged to implement B_OUTLINE_RESIZE.
This is a window flag that prevents a window from live redrawing while it is being resized.
It is useful for windows that are very slow to redraw. You can see its effect for example
in the Magnify app.

<h3>POSIX compatibility</h3>

nielx fixed the prototype of readv and writev which used different types from
what is specified in POSIX. This helps with the Rust port, which is very picky
about types.

korli added ut_host in utmpx.h (not in POSIX, but common in other UNIX-like systems).

He also ported a fix from current glibc versions to allow use of "e" flag to
fopen (translated as O_CLOEXEC for the underlying call); and fixed some problems
with closed sockets not returning the correct error codes.

korli also fixed the behavior of mprotect on areas mapped from a read-only file
(to make sure it's not possible to force these areas to be writable when the file
backing them is not).

<h3>Filesystems</h3>

Some more XFS patches by CruxBox were merged. More of them are still waiting on
Gerrit for someone to finish doing the required small cleanups and merging them.

tqh fixed a place where the CDDA driver would return error codes in a float value,
which cannot store them correctly.

<h3>Boot loader</h3>

tqh modified the UEFI bootloader to not set the "booted from image" flag. The
use of this flag was not very well documented, the BIOS bootloader used it to
notify the OS that it was booted from a floppy disk image (for example this is
the case when booting from the network, or from a CD). It is not clear why the
UEFI bootloader was always setting this flag, when it in fact never boots from
a floppy image, but always from a real partition.

He also removed a non-working check for the
number of partitions in the fallback code that attempts to find the Haiku boot CD
when it can't be identified from information provided by the BIOS.

Han Pengfei updated the EFI headers from the versions in Zircon, which led to
fixing some 32-bit EFI compatibilityt issues.

<h3>Drivers</h3>

PulkoMandy fixed a deadlock in the SD/MMC driver stack when initialization of
the controller fails, as well as a bug in the computation of slot indexes for
multi-slot devices.

korli fixed a SMAP violation in the USB MIDI driver.

rudolfc resumed work on the NVidia driver and fixed several bugs in it. The driver
now supports GeForce 6000-6200 cards.

PulkoMandy made a partial fix for stalling USB transfers. Now if you have an USB
device that is blocking an application, it can be unblocked by removing the device.
Before, the application would be stuck forever and not killable.

madmax fixed the intel_extreme driver to correctly configure the display clock
on Ibex Point devices.

<h3>Kernel and system</h3>

korli fixed the alignment of thread local storage areas, which prevents a crash
if these areas are accessed with SSE instructions.

He also fixed dlopen management of RPATH (making the way we load libraries behave
more like other OS).

<h3>Code cleanup</h3>

mt continues his work on running various analysis tools on Haiku and fixing the
problems found while doing so. This month the changes include a missing error
check in BMessage, a double delete in app_server, a memory leak in the Icons
screensaver.

mt also fixed the "lgtm" configuration file so he could run the lgtm static analyzer
on Haiku code again. This allowed to find various printf string format problems which
he is now fixing.

Saloni Goyal, HrithikKumar49 and Siddhant Gupta fixed some code formatting problems in the Mail application
and Input preferences. Saloni is working on improving haiku-format to provide
more reliable automated code formatting.

nielx removed a leftover debug message about file locking.

extrowerk and korli are working on updating our compiler from gcc 8.3 to gcc 11.
This is still a work in progress, and so far only early work on getting gcc 11
to build under Haiku has been merged.

<h3>Documentation</h3>

nielx added documentation stubs for BGradient and its subclasses, as well as
B_AFFINE_IDENTITY_TRANSFORM. Your help is welcome in filling in these files with
actual documentation.

He also added some missing documentation to BWindows.
