+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 01/2018"
date = "2018-02-05T17:26:14.000Z"
tags = []
+++

<p>Welcome to the first monthly report for 2018!</p>

<p>This report covers hrev51723-hrev51790</p>

<h3>Switch to Gerrit</h3>

<p>The Haiku git repository is now running <a href="http://review.haiku-os.org">Gerrit</a>. Gerrit is a tool designed
to help with code reviews. The idea is to review the code before it is integrated
in nightly builds, instead of reviewing after the fact as it was done for Haiku
until now.</p>
<p>This should make it easier to track pending patches, and increase the stability
of the nightly builds and development branch.</p>
<p>Developers are getting up to speed with the new system and experimenting with
the workflow. There are also some missing bits, for example you may have noticed
the lack of updates to the package repos this month. This will be fixed eventually
(once kallisti5, our main sysadmin, is done moving houses).</p>
<p>Gerrit will be a very useful tool for reviewing what gets into the Beta branch,
and will make the release process a lot easier to manage as it will be possible
to share the work of reviewing changes between several developers (for the past
release, due to lack of an appropriate tools it was all the responsability of the
release coordinator).</p>

<h3>Debugger</h3>

<p>DeadYak continues his work on Debugger. This month saw first a review of the
code for memory allocation problems, leading to plugging various memory leaks
and object ownership problems.</p>

<p>He also improved parsing of DWARF (debug information) from executables to
provide more information on debugged data.</p>

<p>Finally, "type handlers" were reworked. This allows specific code to be used
to show some data structures in a more user readable form. In particular, it
opens the way for showing a BMessage content into Debugger, instead of only a
raw memory dump of it.</p>

<h3>C library</h3>

<p>mmlr fixed various subtleties and corner cases of the various wait*() APIs.
This avoids some deadlocks and unexpected return values, improving our POSIX 
compatibility.</p>

<p>During GCI, ohnx investigated our coverity issues and eventually found one
that needed an actual fix. This was in our implementation of printf_size, and
after investigation korli found out that the problem had already been fixed
in glibc back in 2004 (we are using an old version of the glibc in order to
stay strictly binary compatible with BeOS, but usually we can backport such
fixes).</p>

<p>Andrew Aldridge fixed another similar issue in strtod, where failing to
parse an hex number could still eat some characters from the input.</p>

<p>leorize introduced an uchar.h as specified in C11. He also added the memmem
function, with an implementation borrowed from OpenBSD.</p>

<p>Ho Tuan Kiet reviewed several CIDs about unsafe use of strcat or strcpy,
and fixed them all to use secure functions to avoid accidentally corrupting
memory.</p>

<h3>Kernel</h3>

<p>korli reviewed all system call interfaces to properly access data from
userland. When an application needs the kernel to do something, it will make a
"system call". This is not implemented as a standard function call, because
it is the boundary at which we enable the kernel to do kernel stuff (accessing
hardware, etc) which is normally not accessible directly to applications.</p>

<p>The userland application may however need to pass pointers to its own memory
to the kernel. We must then be careful in handling those, because the kernel
can only "borrow" them to access the userland address space. We protect this
through specific functions (user_memcpy and similar). However, in several places
we just forgot to use these, thus missing the protection they bring (in particular,
making sure the pointer is indeed pointing to the userland memory and not a
malicious attempt to write into the kernel address space).</p>

<p>Once the checks were added in all needed places, korli also enabled
<a href="https://en.wikipedia.org/wiki/Supervisor_Mode_Access_Prevention">SMAP
and SMEP</a> which are ways to further protect the code from unintentional or
malicious access to userland code and data from the kernel. This makes Haiku
a little more secure against this type of attack.</p>

<p>It is also worth mentionning that the kernel will self-modify itself to
enable or disable these extra checks depending on wether the CPU actually
supports them, and wether the feature is enabled in safe mode settings.</p>

<p>mmlr fixed the scheduler tracing code (used to examine the decisions made by
the scheduler), and eventually fixed a panic that would trigger after several days
of uptime because of an overflow in some computations. This should help keeping
the haiku build bots more stable, for example.</p>

<p>mmu_man tweaked our pthread_create to set the thread id before resuming the
thread. While this is not required by POSIX, Linux does it and some apps rely
on it, and it does not cost much to implement it this way anyways.</p>

<p>An old patch from Korli was merged to fix remaining stack alignment issues
on x86_64 platforms. In some cases, signal handler or thread stacks could end
up misaligned, leading to crashes when using sse2 instructions there.</p>

<p>Finally, Korli also enabled X2APIC by default on recent Intel CPUs. This is
yet another rework of the interrupt management hardware (the original programmable interrupt controller (PIC)
was replaced by the "advanced" APIC, then xAPIC, and finally x2APIC). Supporting
this should allow better dispatching and handling of hardware interrupts.</p>

<h3>Filesystems</h3>

<p>ohnx fixed some memory leaks and missing error checks in the FAT initialization
code.</p>

<p>Some patches from Hy Che were merged to clean up and polish his work on btrfs.
There are more to come but they are still being discussed on Gerrit.</p>

<h3>ACPI</h3>

<p>tqh reworked the latest ACPICA update to fix some locking problems. We use
upstream ACPICA sources but there are some changes we need to make, and these
were accidentally removed the last time we updated our version. This resulted
in bogus or missing battery information, for example.</p>

<h3>Applications and Preferences</h3>

<p>Owen started adding a scripting interface to MediaPlayer, so that it is
possible to remote control it using hey (or other scripting tools). There are
more changes to come in that area, but they are still being discussed on Gerrit.</p>

<p>Filip Maryjanski made the Screensaver preferences automatically update its
list of screensavers when one is installed or uninstalled.</p>

<h3>Documentation</h3>

<p>waddlesplash started reorganizing our docs to keep everything in a single place.
Some documents were moved from the trac wiki to the git repository.</p>

<h3>Packaging</h3>

<p>Korli fixed the bootstrap process and reviewed the list of included packages
in standard images, to make sure Haiku comes "batteries included". For example,
libedit was added to the minimal image because it is required for the Debugger
to start.</p>

<h3>Be API</h3>

<p>Axeld added Get/SetPointer to BMessage. The functions were declared in the
header file but were not implemented.</p>
