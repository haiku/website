+++
type = "blog"
title = "Haiku activity report - June 2021"
author = "PulkoMandy"
date = "2021-07-10 08:53:07+02:00"
tags = []
+++

Hello, it's time for the June activity report! (yes, not much innovation in the
tagline for these reports lately. I'm out of ideas, or maybe just lazy to find new ones).

Before we dig into the report, two important announcements (in case you are not
following the other news on the website, since both were already announced separately).

The beta 3 release process is going well, and there are some "testing candidate"
images available for testing. If you have some time to install one of these and
see if everything is running fine on your hardware, that would be great!

The second announcement is that Haiku inc recently funded RISC-V hardware for
two Haiku developers, X512 and kallisti5. They have both been working on the
RISC-V port and X512 got it booting to the desktop on virtual machines. The
next step is getting it to run on real hardware, and, as expected (if you already
have done similar things), the virtual and real hardware don't behave in exactly
the same way. Anyway, you can find progress reports on the forums if you want to
know more about the low level details of this.

Of course, this hardware sponsoring would not be possible without the donations
and sponsoring from the community. Thanks to everyone who made this possible!
See <a href="/community/organization/funding/">our funding page</a> for more
information about ways to donate money to Haiku.

If you are a Haiku developer or contributor, you can contact <a href="https://haiku-inc.org">Haiku inc</a> for your
funding requests, it can be for buying some specific hardware, or negociating a
paid contract if that allows you to spend more time working on Haiku or related
things. You can also join our <a href="https://liberapay.org/Haiku">Liberapay team</a>
to collect a part of the donations sent to the team, and make your Lierapay profile
more visible to donators if they want to target you directly. You need an invitation
to join the team, please contact one of the existing team members so they can invite you.

With that being said, let's look at what happened in Haiku sourcecode this month!
Of course with the release announcement, everyone has been scrambling to get their
changes in at the last minute, so it has been a bit more busy than usual (this
is only my arbitrary and subjective perception of things, with no statistics to
back it).

This report covers revisions hrev55130-hrev55223.

<h3>POSIX compatibility</h3>

The USER and GROUP variables (indicating the current user and group id) are now
set even for applications running outside of Terminal. This also fixes compatibility
with BeOS, which did this correctly.

korli modified the strace utility (which is used to log system calls made by an
application) to translate signal numbers to human readable names.

He also added an implementation of ppoll, which is not yet part of the POSIX
standard, but will be added in the next version of it.

korli (definitely our POSIX person) also added some commonly present fields in
the rusage struct. While we already implemented all the fields required by POSIX,
several other UNIX systems implement a few more, and it's very common that applications
will try to use these without testing if they are available. This results in annoying
build failures and requires custom patches. Currently, the new fields are always set
to 0, the plan is to implement some of them later. Even if this is not required by
POSIX, and potentially misleading, it seems a good idea to introduce all the fields
at the same time, so we only introduce one new version of the rusage structure, saving
us some complications in providing binary compatibility with previous applications.

He also added the __STDC_NO_THREADS__ define to our header files since we don't
currently have support for C11 native threads.

madmax fixed the behavior of the confstr function in some edge cases, improving
the behavior of the getconf command line utility.

<h3>Font rendering and text management</h3>

madmax has fixed several issues with font rendering. First, he fixed font metrics
for bitmap fonts (which are rendered using fixed bitmaps, rather than vector
graphics).

John Scipione largely reworked the code of BTextView to compute the text position
in the view. Mainly this avoids a problem in Tracker where the text would sometimes
be completely outside the view when trying to rename an icon.

PulkoMandy added the Noto Emoji font to the font fallback system, providing some
more of the missing characters commonly used in text and websites.

<h3>Drivers</h3>

kallisti5 fixed some problems in the XHCI (USB3) driver, making it better at
recovering from error situations.

rudolfc made a lot of progress on the Intel video card driver, improving support
for VGA, DVI and HDMI output on SandyBridge and IvyBridge systems, which was not
really working before. DisplayPort is also working on some devices already, but
may need a little more testing. This work also enables some machines to drive two displays, in clone
mode so far. Many parts of the driver were reworked to allow for this, and it
opens for support of more modern cards later on, as well as maybe more work on
actual dual screen (not cloned) support (but let's not get ahead of ourselves).

mmu\_man extended the "poke" driver to allow opening by multiple applications at
the same time, and to set the IOPL flag when the device is opened. This driver
allows any application to perform I/O access. It previously allowed that only
through dedicated ioctl system calls, but with the IOPL flag, it also enables
applications to directly use the IN and OUT assembler instructions on x86 CPUs.
This is similar to the equivalent driver in FreeBSD and can be used to port tools
like Flashrom, which requires such low level access to handle some devices.

The wavelan wifi driver is now completely removed. This driver was ported from
FreeBSD, and the FreeBSD version was removed in FreeBSD 13. After some investigation,
it seems this driver supports only very old hardware that couldn't connect to
WPA Wifi networks, so, it seems a bit useless in the modern days. There was no
reason to keep it up to date.

korli added suppot for controlling the keyboard backlight on asus laptops.

korli disabled the intel pstates (power saving/CPU idling) driver for Atom Silvermont
and Airmont CPUs, which are not compatible with the way the driver works currently,
resulting in unbootable systems.

PulkoMandy reworked the SDHCI (SD cards) driver which could in some cases try
to send a command to the hardware before the previous one was completed, resulting
in de-synchronization between the driver and the hardware, and the OS waiting forever
for a reply from the hardware. While the driver is still not working perfectly
with all hardware, at least it should now not freeze the system.

<h3>Kernel</h3>

korli fixed some permission flags on x86 processors related to handling of
signals, I/O access, and disallowing user threads to enable or disable interrupts.
This allows DosBox to run correctly (it unintentionally disabled interrupts, which
led to kernel panics later on). Besides this fix specific to DosBox, this led
to some other changes in related areas after studying what other OS are doing
there.

korli also improved the C++ demangler in the kernel debugger to handle some more
cases, allowing to get readable information from C++ symbol names in kenrel
panic backtraces.

<h3>Non-X86 architectures</h3>

Work continues on merging X512 RISC-V work in Haiku. This month, we merged some
parts of the virtio driver rework, updates to the uname command to report the
new CPU architecture, various initial patches to the kernel headers, addition
of the RISC-V architecture to our ELF handling code, implementation of the
system\_info function, data alignment problems in the AHCI (SATA) driver, and
made the classic ATI driver (for mach64 cards) work outside of x86 platforms,
so he could use it with QEMU emulating a RISC-V machine (a combination that
may be a bit unlikely on real hardware).

Han Pengfei continues the work on the ARM port. Starting with fixing some build
failures due to a change in the kernel console font (also used by the ARM
bootloader when there is no hardware textmode available and only a framebuffer).
He also rewrote the ARM linker script using the RISC-V one as a base, which
fixed some issues with the early initialization of Haiku. Now we finally have
some output on the UART port, making it much easier to debug the next issues
without being completely in the dark.

<h3>bootloader</h3>

The EFI loader now always include support for GPT partitions. Previously, this
support was only enabled for x86 systems (and the bootloader was not running on
anything else), but with the progress on RISC-V, kallisti5 could now find and
fix the problem.

X512 added support for the J and K keys to navigate up and down in the bootloader
menu. This is useful on platforms where the BIOS (or equivalent firmware) does
not provide a keyboard driver good enough to use the arrow keys.

kallisti5 packaged a copy of the EFI bootloader file in the system partition.
This makes it a bit easier to find it when preparing an EFI machine for booting
Haiku (previously it had to be copied from the EFI partition which is not mounted
by default). Later on this can be used to automatically update the bootloader,
whereas this currently needs to be done manually.

jessicah, kallisti5 and beaglejoe (almost a new contributor, they had submitted another patch in February but had not been properly greeted then, so, welcome!) reworked the enumeration of available boot partitions in the EFI
bootloader, which in some cases would find several partitions, but not manage
to decide which one to boot from. This was a long running problem and in fact
pre-dates the beta 2 release. tqh was also involved previously in reworking
various parts of the code to simplify it, and these last few commits completed
the work.

jessicah also modified the bootloader to always put the bootsplash icons at the same
position. Before this change, the official bootloader (with the Haiku logo) and
test builds (not using the logo) would align the icons differently. When using
mismatched kernels and bootloaders, this would result in a glitch with misaligned
icons. Not anymore!

<h3>File Systems</h3>

The ongoing GSoC project about XFS is going well, and finally all the remaning
patches from the previous years have been finalized and merged. The next phase
of the GSoC project will be on doing new development on access to filesystem
attributes, and then start the work on write support.

korli fixed handling of inodes with "metadata checksum" in the ext2/3/4 filesystem.
These inodes have a checksum covering more bytes than is the default in ext2.
The implementation in Haiku didn't agree with the Linux one on how much data should be used.

<h3>Applications and user interface</h3>

Jessica Tallon made her first contributions (welcome!) with automatic resizing
of the HaikuDepot screenshot window to always match the screenshot size, and
also added support for playing webradios from m3u playlists in MediaPlayer.

madmax fixed the scrolling of large menus that don't fit on screen, as well
as computation of the width of items in the menus.

korli fixed TextSearch to not attempt to open directories as files and search
for text in them.

nielx fixed problems with the recently added i18n (language translation) support
in the Cortex application (which is a bit specific because it reuses some strings
many times from different add-ons, and we didn't want translators to re-translate
them multiple times).

CodeForEvolution added an animated icon to the shutdown dialog when waiting for
applications to terminate. This was one of the nice little details from the BeOS
user interface that had been missing in Haiku for a long time.

apl-haiku continues his work on HaikuDepot, and moved several tasks to background
threads, to provide a more smooth running experience to users.

<h3>Documentation</h3>

John Scipione updated the documentation for BTextView with a general class overview.

AlwaysLivid updated the README to include a "getting involved" link. This is part
of a much larger ongoing work to completely reorganize the website and more clearly
separate user oriented and developer oriented documentation, to facilitate onboarding
of both new users and new developers.

<h3>Sourcecode cleanup</h3>

mt continues his work on running Haiku code through various static analyzers to
find and fix problems. This month the work includes removing some "set but never
used" variables, fixing some printf format strings, and correcting invalid
ASSERT calls in the gutenprint printer driver. He also fixed the
build in DEBUG mode for the new libnetservices library (providing an updated version
of our HTTP APIs).

AlwaysLivid removed a copy of the libunwind code that had been added to Haiku but
never used for anything.

David Sebek (another new contributor, welcome!) fixed some format string problems
in devfs when built in debug mode. This is part of a larger patch series to fix
"trim" support on SATA disks, the other parts are still being reviewed on Gerrit.

<h3>Media</h3>

PulkoMandy reverted an old change that broke listing of audio and video formats
in the Media Kit. This restored support for Youtube video playbacks (and unfortunately,
it is still possible to crash app\_server by playing a video in Youtube).

mt modified the cddb lookup tool (which allows to get album and track names online
for audio CDs) to point to a new online database, since the previously used freedb
is now offline.

CodeForEvolution added MIME types for Markdown files and fixed some other minor
issues in the MIME database.

<h3>Buildsystem</h3>

The usual work around a new release was done by kallisti5 (the release manager for the
upcoming beta3 release): updating the version reported in our system headers,
increasing the release image size to fit everything in, and switching our
package repositories to a new, less confusing identifier. Historically, repositories
were identified by their URL, but this proved problematic when attempting to set
up repository mirrors. The identifier and URL had been separated before the
beta2 release, but, in order to provide a smooth upgrade path to beta1 users,
the distincion had not been put into full use yet, and the identifier was still
an HTTP URL. It is now instead a "tag:" URI, following IETF best practises on
the matter.

jessicah replaced the use of mtools in building the EFI bootable images with our
own tool fatshell. This reduces our dependencies to uncommon 3rd party tools,
making Haiku easier to build on more platforms.

<h3>Networking</h3>

PulkoMandy fixed a bug in handling of HEAD requests and 204 responses in the HTTP
client. Both of these are special because the response has only headers and no
contents. The code was a bit confused about that and would return an error when
in fact, everything was fine. In particular, this made it impossible to load
some pages on the Gerrit code review tool, which is a bit annoying since that is
the main place where we handle patches and code review.

The web browser was finally updated to a more recent WebKit release. This was
made possible because the buildbots for creating haikuports packages are now
running a pre-release version of beta3. This was needed to build the latest versions
of WebKit, which rely on new APIs in the app\_server not yet available in beta 2.

This new WebKit version has some known regressions, that will be fixed in a later
update (some are already fixed thanks to the work of jessicah, nephele and PulkoMandy
to investigate the problems, but one important issue remains with text sometimes
completely disappearing from webpages).
