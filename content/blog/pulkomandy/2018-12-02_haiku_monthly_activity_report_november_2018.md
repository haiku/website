+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 11/2018"
date = "2018-12-01T13:26:14.000Z"
tags = []
+++

<p>Welcome to the last activity report in 2018!</p>

<p>I notice that I have not written any report since july. Thanks to the other
community members who took care of them during that period, as I was busy
moving (again) to a new flat, and then visiting the USA for the GSoC mentor
summit and germany for BeGeistert.</p>

<p>Anyway, this report covers hrev5263-hrev52615. We are past the beta release
now, so unsurprisingly, the activity is mostly focused on bugfixes, but there
are always some new things going on.</p>

<p>The report includes work done during BeGeistert, which partially explains the higher
than usual commit count. But we also got some new contributors, which is great!</p>

<h3>runtime_loader</h3>

<p>Korli fixed detection of gcc version 7 in the runtime_loader (the program
that loads and runs other programs). This needs to know the gcc version in
order to load the correct libraries, and we forgot to adjust it when starting
to use gcc7.</p>

<h3>Localization</h3>

<p>PulkoMandy adjusted BDate to use the Locale Kit for date parsing and
formatting, rather than relying on strftime. This makes sure BDate use the
locale settings, even when used in GUI apps where the locale environment
variables are not set.</p>

<p>KapiX added the -a option to the locale command line tool. This tool must
follow POSIX conventions, and is used in some buildsystems, for example to
make sure an UTF-8 locale is available.</p>

<h3>User interface</h3>

<p>Axeld is running Haiku on his new computer with high resolution display. So
his current work is on making the user interface scale properly according to
the font size. This month he fixed the sound voume replicant, including a new
"muted" icon designed by stippi, adjusting the size of icons in tracker list
mode, allowing replicants in the deskbar to resize, and also adjusted the
DeskBar leaf.</p>

<p>KapiX added support to BStringView for multiple line strings. He also made
ProcessController handle up to 12 CPUs, now that its icon can be larger than
16x16.</p>

<h3>Debugging tools</h3>

<p>Waddlesplash fixed strace to not crash when attempting to display an invalid
syscall number. Strace is a tool that runs an executable and traces all calls
to the kernel. It allows a form of black box debugging, by just looking at the
interface between the program and the system. It was found that OpenJDK would
sometimes try to call non-existing syscalls (this should not happen...), and
strace would then crash, which is a problem for debugging.</p>

<p>oco made some changes to the "Start team" window in debugger to make it easier to use (window size adjustments, remembering the last used file path, etc).</p>

<h3>Build system</h3>

<p>Waddlesplash started work on cleaning up our Jam rules. He started by
changing them so that the compiler will be called with file paths relative to
the repository root. This helps creating reproducible builds, because gcc
stores the file path in the generated object files. He then cleaned up some
rules related to building the kernel and bootloader. Eventually a lot of
obsolete rules were removed, and some of the overrides in Haiku source have
been upstreamed in our fork of Jam (unfortunately the real upstream Jam at
perforce is not maintained anymore so we can't upstream there).</p>

<p>Kallisti5 started improving the bootstrap process (used to rebuild haiku
entirely from sources, without relying on download of pre-built packages for
dependencies). He started experimenting with a docker container to run the
bootstrap in. The goal is to provide a more reliable setup for these builds,
as they are currently very sensitive to the host configuration (CPU arch,
Linux distro, etc).</p>

<p>KapiX made the makefile_engine process .cxx files as C++ as expected.</p>

<p>PulkoMandy introduced an haiku_extras package to the Haiku depot, including
code from Haiku that we don't think needs to be in the default image. Currently
this includes the partition handlers for Amiga RDB and Apple partitionning
systems, which are rarely needed (but still possibly useful) on x86 systems.</p>

<p>Kallisti5 started an experiment to rewrite the configure script in Python,
without usable results yet.</p>

<p>Waddlesplash also resumed the work on building Haiku with clang, fixing some
extra warnings found along the way.</p>

<h3>General code cleanups</h3>

<p>Waddlesplash cleaned up BeOS legacy code in various places, and some where
tests for PowerPC architectures were not written properly and the PowerPC code
ended up being used also for x86_64 and ARM.</p>

<p>Murai Takashi started reviewing all issues in the PVS scan from a few years
back. He started fixing some of them, but there is a lot more work to do to
get everything triaged. PVS is focused on detecting typical mistakes such
as suspicious operator precedence, missing pointer dereferences, etc.</p>

<p>extrowerk fixed some missing prototypes in math.h to ease his work porting
more software to Haiku, and fixed the signature of the screenmode command so
it can reliably be used as a shortcut handler.


<h3>Drivers</h3>

<p>kallisti5 made some cleanup work on the ARM port to make it at least
buildable. This includes work on the "mailbox" driver for the Raspberry Pi
videocore communications.</p>

<p>Peter Kosyh fixed a logic error in the PS/2 mouse driver, which could lead
to problems when resetting the mouse. He also fixed a crash in the net_server.</p>

<p>tqh improved the Elantech touchpad driver, but not enough yet to enable it
in the standard builds.</p>

<p>PulkoMandy added a command line tool to change the display brightness
(when the driver supports it, currently only intel_extreme on laptops). It
can be bound to keyboard shortcuts for easily changing the brightness. He also
removed the "Not Implemented" mention in the Devices preferences, which would
mislead people into thinking there was no driver for there hardware.</p>

<p>waddlesplash continues his work on freebsd 11 network drivers, implementing
mtx_trylock, curcpu, and enabling a faster TX path for the ipro1000 driver.
He also continues the work on setting the proper flags on areas for SMAP and
SMEP to work as intended. There were also some drive-by patches for Bluetooth, NetFS, and a few other things.</p>

<p>mmlr fixed issues in the virtio and virtio_net drivers which would lead to
frames being sent with a lot of padding bytes at the end. It still worked,
but limited performance and used a lot of memory for no reason.</p>

<p>waddlesplash also fixed the hda driver to work in vmware and virtualbox.</p>

<p>Nathan Sashihara fixed a copypaste error in IPv6 handling macros.</p>

<h3>Applications</h3>

<p>Peter Kosyh did a lot of work on the IMAP and SMTP handling, initially
started on a small patch by Kuroneko but he ended up reworking a lot of the
code and fixing many problems all over the place. Mail should now work a lot
more reliably.</p>

<p>François finished his "Shelf" screen saver, which can show replicants when
the computer is idle, providing a nice informative dashboard/lock screen.</p>

<p>Andrew Lindesay fixed a crash in HaikuDepot when a repository is missing identity URLs.</p>

<p>kerwizzy rewrote the core of the Mandelbrot app to not crash when the window
is resized.</p>

<h3>Media</h3>

<p>PulkoMandy did some work updating the ffmpeg add-on to current ffmpeg APIs,
mostly using a new producer/consumer API and reworking management of timestamps.
However, this still does not solve ongoing problems with the ffmpeg add-on.
Still, some crashes were fixed.</p>

<p>Barrett is reworking the encoding/decoding side of the media kit. He
introduced a new "codec kit" to share more easily the functions needed on that
size. The plan is to completely rework format negociation and storage access
APIs, to make the whole thing better suited to non-file media (streams, podcasts,
but also later on Blueray or DVDs). The new API already exposes the file
metadata (ID3 tags, etc), which were not exposed before.</p>

<h3>File systems</h3>

<p>It is now possible to disable CDDB lookups for the CDDA filesystem. The option
was already documented, but not working.</p>


<h3>Documentation</h3>

<p>Following a complaint on hackernews, the Haiku Interface Guidelines were
reworked to become gender-neutral. They were already for the most part, but
not everywhere.</p>
