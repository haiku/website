+++
type = "blog"
title = "Haiku monthly activity report - September 2019"
author = "PulkoMandy"
date = "2019-10-03 13:14:07+02:00"
tags = ["haiku", "software"]
+++

Hi there, it's time for the monthly report!

This report covers hrev53461-hrev53529. Let's see what happened this month in Haiku.

<h3>Non-x86 support</h3>

<p>Some initial work for ARM64 was completed by kallisti5. This includes setting up the Haikuports
package declarations, writing the early boot files, and in general getting the buildsystem going.
Jaroslaw Pelczar also contributed several further patches (some of these still undergoing review),
providing the initial interrupt handling support, and various stubs to let things compile</p>

<p>kallisti5 did some work on 32bit ARM as well, cleaning up some of the code to better match
other platforms and preparing the reuse of EFI for ARM and ARM64 (as u-boot now implements an EFI
interface, which would make things much simpler for our ARM boot process if we manage to use it).

<h3>User interface</h3>

humdinger improved the handling of the toolbar in the Mail client, and fixed a missing localization
in the screen preferences (for the Brightness slider). He also fixed the "Leave as New" menu which
was not working as intended, and improved the shortcuts to make it easier to use quoting levels
(for quoting other people in the discussion).

Humdinger also fixed the People picture to not be distorted for square aspect ratio images.

Andrew Lindesay continues his work on HaikuDepot, this month with a rework of the user rating
system, as well as the user registration window.

Mikael Konradsson continues his work on improving the look of dark mode, this month he fixed the
"expander" knobs in Deskbar (when you use it with the list of windows shown in the Deskbar in vertical mode)
and in BOutlineListView. He also changed the look of CPU bars in ProcessController to look better in
large font sizes (although there is a regression for smaller font sizes currently, which should be fixed
soon).

PulkoMandy fixed some archiving problems in BTextView, which was not preserving some of its status
when storing it into a BMessage.

Axeld implemented basic monospace font support in the HTML5 remote desktop client, making Terminal
and other monospace application a lot more usable there.

<h3>POSIX compatibility</h3>

korli added some missing constants to the "sysconf" system, which allows application to query the
OS about various settings and limitations (default and maximal thread stack size, etc), so they
can self-adjust to it.

<h3>Kernel and drivers</h3>

waddlesplash reviewed the initial disk and partition scanning code, to make it more resilient to
invalid partitions. Before these changes, if any disk in the system looked like it had an invalid
partition scheme, the boot would fail, while now it continues as long as at least one Haiku
partition is found. When a partition is still not found, the kernel debugger now automatically print
a part of the syslog, as people tended to agregate all "cannot find boot partitions" issues in bug
reports while they can have many different causes.

korli added some test scripts to stress-test the EXT2 and FAT filesystem implementations. These
use a mix of existing benchmark tools to run the tests in a reproductible way, and identified various
issues, either in the filesystem implementation, or in the tools used. He also fixed the USB joystick
driver after the SMAP/SMEP changes, so that the driver correctly exchanges data with userland.

oreo639 imported the firmware for intel iwn-3168 wifi cards from FreeBSD, so these should now work
fine on Haiku.

waddlesplash continues his review of security problems in syscalls, adding all the required checks
to make sure the kernel does not accidentally access kernel memory instead of userland memory.

PulkoMandy started reviewing some of the remaining issues with the intel_extreme driver (again),
and the first patch was merged, disabling 15-bit colorspace support for cards that don't allow it
(8, 16 and 32bit modes are still available).

<h3>Libraries</h3>

Simon South fixed the window message handling in GLUT, which was not properly forwarding messages
to the standard BWindow handler.

PulkoMandy fixed a NULL pointer dereference in BMessage in low address space conditions, related to
the app_server fixes detailed below.

korli modified the runtime_loader to handle API versions (in addition to ABI version) and introduce
compatibility quirks for executables built with an old ABI. This is put to use to keep programs
affected by the B_CLONABLE_AREA security changes. On BeOS and previous versions of Haiku, any area
(part of the memory) was clonable, that is, any other program knowing (or guessing) the area identifier
could access it very easily. This made memory protection useless for security purposes. The API was
changed so that programs must now explicitly tag areas as "clonable" if they want to enable this.
However, existing programs do not do this, and if they try to share an area with someone else, it
fails. This change restores the old (unsecure) behavior only for old programs, as applications are
being rebuilt, they automatically become more secure.

jessicah set up a scan of Haiku using lgtm.com, which mt used to identify and fix some issues (mostly
malloc/new/new[] mismatches in memory allocations)

<h3>Debugging tools</h3>

KapiX fixed a SMAP violation in the "profile" tool, as well as a problem with Debugger failing to
parse column information (for now, it will only show the line of code where the error happens).

<h3>Servers</h3>

Waddlesplash changed some memory allocation paths in app_server to catch out of memory errors.
These are happening a lot more currently, due to the new rpmalloc allocator, which tends to fragment
memory over time. app_server is badly affected because it does a lot of allocations, and because it
runs for the whole machine uptime and is never restarted. The idea is to catch these errors and
never crash (instead, some drawing operations requested by applications will simply not work, and
if possible, an error will be returned to the application). This is an opportunity to increase
app_server stability, but we are also investigating the issue in collaboration with the rpmalloc
developer so the allocator can be improved and avoid running into this condition so easily.

<h3>Installer</h3>

Waddlesplash made Installer ignore special files (block and character devices, FIFOs, sockets),
so an install from a partition containing these still succeeds. These are not regular files and
cannot be copied by the usual means. They may appear for example in the tmp directory if you
install and run some software using them.

<h3>Documentation</h3>

There is an ongoing effort to update all the screenshots in the user guide to match the current
state of Haiku. The screenshots are currently done manually for each language, which is a lot of
work. mmu_man added a script that can help automating some screenshots, but this is an area our
development team needs help with. If you are interested in automating things, this may be a good
opportunity to help with Haiku.

nielx started working on the API documentation, which is on the TODO list for R1 (BeOS had the
Be Book, so Haiku should deliver the Haiku Book). He started a survey of which classes are missing
documentation and picked a few of the more pressing ones to work on, and created Doxygen file stubs.
Help documenting all the interfaces is welcome.
