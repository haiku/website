+++
type = "blog"
title = "Haiku activity report - January 2021"
author = "PulkoMandy"
date = "2021-03-08 08:53:07+02:00"
tags = []
+++

This report covers revisions hrev54947-hrev54978 (that was a quiet month in Haiku)

<h3>HaikuDepot</h3>

Andrew Lindesay continues his work on cleaning HaikuDepot sources and removing
a custom-made List class to use standard (BeAPI and C++ stl) containers. There
were some regressions in the process, that were found and identified.

He also fixde various other bugs.

<h3>non-x86 ports</h3>

tqh is working on the 64bit ARM port, doing the package bootstrap, fixing the
compiler configuration, and adding missing pieces of platform specific code.

Daniel Schaefer fixed the PE header of our EFI bootloader for RISC-V, to
improve compatibility with various EFI firmware implementations (it turns out
u-boot, which we did our initial testing with, is very forgiving and does not
validate all of the header).

<h3>Applications</h3>

kerwizzy added a fullscreen mode and an option to save pictures to Mandelbrot.

Jaidyn Ann fixed the DNS settings in Network preferences to disable some buttons
when they would do nothing.

mt fixed memory leaks in MediaPlayer and ProcessController, as well as other
problems found by the clang static analyzer in various places in the kernel,
the freebsd driver compatibility layer, and the filepanel command line tool.

nephele switched the default search engine in WebPositive from Google to DuckDuckGo.

<h3>Bootloader</h3>

beaglejoe added a "reboot" entry to the boot menu in the EFI bootloader.

<h3>System libraries</h3>

korli removed the "unichar" type from SupportDefs.h. It was present in BeOS,
but it was not used anywhere, and it was conflicting with similar types
defined in applications.

PulkoMandy fixed (again) an occasional freeze of Tracker on boot, when translation
of application and folder names was enabled in Locale preferences.

korli added an implementation of the POSIX function timegm() in libroot.

nielx finished merging leorize's work on improvements to the HTTP support in
network kit. The new and improved APIs are now available as a separate static
library. The previous version of the API remains in libbnetapi for now, but
will be deprecated in beta3 and removed in beta4. It will then be re-introduced
when the API is stabilized. This allows us to make changes to this API without
breaking existing apps that make use of it.

PulkoMandy merged leorize's work in haikuwebkit as well, but this will only be
available during the beta3 release preparation, because the current buildbots
at haikuports (still running beta2) are too old to build the current webkit
version.

Overall, these changes provide a big performance boost to our HTTP code,
make the code simpler, and fix various issues like the ability to download files
larger than 4GiB.

extrowerk added wavpack support in the Media Kit.

korli fixed the application exit code that was destroying TLS storage before
calling thread exit hooks, which could result in a crash on exit of some applications.

<h3>Drivers</h3>

PulkoMandy fixed a SMAP violation crash in the Virtio random number generator
driver (which is used in some virtualization environments to get entropy from
the host machine, useful because it is difficult to collect entropy from hardware
sources in a virtual machine).

<h3>app_server</h3>

Maximo Castañeda fixed a crash when rendering bitmap fonts which don't allow
subpixel rendering.
