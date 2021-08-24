+++
type = "blog"
title = "Haiku activity report - Summer 2021"
author = "PulkoMandy"
date = "2021-08-24 08:53:07+02:00"
tags = ["haiku", "software", "activity report"]
+++

Hi there, let's do another activity report! You may have noticed that there were a lot of news
since the previous one, but here's a recap in case you missed it: a new beta release, the
celebration of the 20th birthday of the Haiku project, the end of Google Summer of Code (final
evaluations are being filled in as I write this), and also news from the promotion team which was
re-launched a few months ago and is working on various things (read their own report for more details).

What's nice for me is that this was all already covered by various articles, which means I can focus
on what I know best, and take a look at what's happening in the got repository with the code.

This report covers hrev55224-55342.

<h3>Buildsystem</h3>

jessicah modified some Jamfiles to enable rpath when linking host tools during the Haiku build.
rpath is a field in ELF executables that allows to store a library search path. With this enabled,
it is much easier to run the generated tools directly on the host system. Previously, using
"jam run command" would be needed to set up the correct environment, now you can just run "command"
directly.

Semion Dimov and Przemysław Buczkowski fixed various issues that prevented building Haiku on MacOS
and on "Apple Silicon" ARM64 machines.

<h3>User interface</h3>

madmax fixed the font overlay system, so that if there are missing characters in a font, a small
rectangle is drawn as a replacement. Not only this lets the user know that there should be some
text, but it also fixes some confusion in WebKit font rendering, where the code does not expect
characters to just completely disappear.

John Scipione fixed some rendering glitches in Tracker when using "mini" icons.

PulkoMandy fixed the scrollbar and status bar size in ShowImage (based on previous work by Nephele
to make them scale with the rest of the UI)

mmu_man and PulkoMandy fixed some problems with DPMS setting, that would either blink the screen
off and on at every workspace change, or just fail to turn on the screen at all on app_server start.

PulkoMandy and KapiX added support for underlined text in app_server (using the B_UNDRESCORE_FACE
font face flag). This allowed to merge an old patch from Sambuddha Basu which underlines the hyperlinks
in AboutSystem credits text. PulkoMandy also added the needed menu in StyledEdit to allow underlined
text there.

X512 fixed a missing overflow check in app_server which would result in memory corruption and crashes
if trying to allocate too large bitmaps.

PulkoMandy fixed the computation of window preferred sizes, where in some cases, the height and
width could be mixed up, resulting in a window that would always want to be perfectly square, as well
as some confusion between the minimum and maximum size in layout computations.

<h3>Code cleanups</h3>

Coldfirex fixed typos in some comments, as well as problems in use of the va_start and va_end macros
in various system components and applications. He also updated the list of PCI and USB device IDs
(used to show the devices with a readable name instead of just a numeric identifier) and reviewed
and fixed several issues from the latest scan of Haiku sources by PVS studio.

This also led to identifying that Haiku FTPD server was a very old fork of the one in FreeBSD, and
it has now been synchronized with the current FreeBSD implementation.

PulkoMandy fixed the handling of HTTP errors in the package kit when a download fails because of an
error on the server's end. This could result in corrupt file being sotred on disk, and then reused
in the next run to attempt to resume the download, resulting in quite confusing behavior.

AlwaysLivid removed unused copies of libunwind and libcxxrt that were present in Haiku git repository,
replaced plain BAlert used as about boxes with proper BAboutBoxes in various servers and applications,
and clarified copyright and licensing on some files in the process.

Some documentation updates from Leorize's work during GSoC 2020 were merged, documenting various
parts of the HTTP client API in Haiku.

PulkoMandy fixed an off-by-one error in the code checking the validity of kernel and user space
address ranges in the syscall interface. The code would require that one byte after the end of
the range must also be valid memory. He also fixed problems in the implementation of XSI semaphores
that were found while running a system call fuzzer by thosewhowork.

<h3>Localization</h3>

madmax fixed the BCountry class to return the country name (without language or other indications)
as expected.

PulkoMandy added a GetPreferredLanguage method to BCountry, which can be used to attempt to guess
the language to use based on rough user localization. He also fixed a problem in the localization
of DeskCalc, where the translation of button labels would prevent the buttons from working.

mt added localization to the Shelf and Nebula screensavers, and improved the one in CharacterMap.

<h3>Installation process</h3>

AlwaysLivid improved some text in FirstBootPrompt when build without the Haiku branding.

Jessicah made sure that Installer works when using a fresh (never booted) disk image as an
installation source, as it would result in some missing directories in the installed system.

<h3>Kernel and Drivers<h3>

David Sebek debugged and finalized the implementation of fstrim, the tool used to free unused sectors
on SSDs and improve performances. The tool previously was available only for RAM disks and SD cards,
now it also works on SATA and NVMe disks.

korli imported some network driver patches from FreeBSD 13.

Lt-Henry rewrote parts of the USB/Bluetooth/I2C HID parser to use C++ containers instead of manually
managing memory with malloc and realloc. This opens the way to improving the parser to handle some
missing cases, and in particular fix support for keyboards with N-key rollover, which are currently
not compatible with Haiku.

<h3>Ports to non-x86 architectures</h3>

The patches for the RISC-V port submitted by X512 are being merged, thanks to kallisti5 who reviewed
them and made some coding style cleanups before the patches could be accepted. This is a large patch
set, so the code review is still ongoing and some changes need more discussion than others. The
changes not only add RISC-V support, but also improve the portability of the OS in general, add
new drivers or update existing ones to work in different contexts, etc.

tqh also started submitting his ongoing work to get an ARM64 version of Haiku up and running.

<h3>HaikuDepot</h3>

Andrew Lindesay continues to improve HaikuDepot, this month with live updates of the package
state during installation, switch to a new API to communicate with the HaikuDepot web server,
and improved the shutdown process of the application.

<h3>Applications</h3>

HaikuWebKit received a major update, fixing many bugs and bringing it more in line with modern web
standards. There are still a lot of problems to solve, however.

Zotyamester added an eject button to eject CDs and DVDs from MediaPlayer.

PulkoMandy improved the size computation of People window, making sure there is no scrollbar and
the whole list of attributes is visible, unless it can't fit on screen.

Jessicah made the 16 base colors in Terminal customizable, so that light and dark color schemes
can automatically configure them as appropriate to have readable text in all cases.
