+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 08/2019"
date = "2019-09-06T10:52:44.000Z"
tags = []
+++

<p>Hi there, it's time for the monthly report again! This report covers
hrev53338-hrev53461. It's been a busy month!</p>

<h3>User interface</h3>

<p>Andrew Lindesay continue his work on HaikuDepot, tweaking the BarberPole
look, adding a display of "usage conditions" (EULA, license, etc) from packages,

<p>Ryan Leavengood also worked in this area, making sure if you open an existing
hpkg file with HaikuDepot, it will offer you to uninstall the package if it's
currently installed.</p>

<p>humdinger improved the colors and icons used in DriveSetup to indicate
read-only, BFS, and encrypted volumes, after attempting to document the existing
ones and finding they didn't make that much sense.</p>

<h3>Package kit</h3>

<p>The package kit is still relatively new code, and its error handling is
showing its limitations as we investigate problems and often get bugreports
with not-so-helpful error messages. Kallisti5 fixed some of these, as part
of an ongoing effort, with some progress made every time a new unhelpful error
message is encountered.</p>

<p>Ryan Leavengood also optimized the way we handle "old" states (allowing to
rollback the system to an older state from the boot menu), so that a normal boot
avoids running this code and is now much faster.</p>

<p>AGMS is working on a pre-uninstall script feature, allowing packages that needs
to run some code on uninstall to do so. This requires an addition to the package
format, so this code is merged in gradually to avoid breaking installs. Make sure
your system is up to date to at least hrev53373 to avoid problems in the future.</p>

<h3>Keyboard management</h3>

<p>Pascal Abresch got the first part of his work to handle "media" keys (play,
pause, and other additional keys) recognised by Haiku. The PS/2 driver has been
adjusted, but adding all these new keys to the keymap means we now have more
than 128 possible keys, which the BeOS keymap format does not allow. So we will
need a new one, and this will break compatibility with old apps using the
keymap directly (as the API allows).</p>

<p>Simon South added a way to notify applications when the keymap is changed,
and used this in his work implementing "Meta" key support in Terminal (allowing
access to Bash line editing features as well as making emacs and other apps
usable to their full extent)</p>

<h3>Fixes and cleanups</h3>

<p>PulkoMandy continued his work on reviewing issues reported by PVS studio,
identifying minor issues in FreeBSD network drivers, a bug in the KDL command
to dump semaphores (it is possible to dump them by name again, now), a memory
leak in the Bluetooth preferences and confusing variable names in the boot menu
system.</p>

<p>CodeForEvolution made coding style cleanups in CodyCam and reworked the resource file a
bit. CodyCam is however still in need for a working UVC webcam driver.</p>

<p>MT improved support for keymaps and keyboard layouts localization, and fixed
various warnings in many places in Haiku codebase.</p>

<p>Another round of bugfixes from waddlesplash: his work on
optiminzing the kernel uncovered some bugs and introduced the occasional
regression (given our lack of automated tests, this is unsurprising). These
problems have now been solved and Haiku is running nice and stable (and faster
than before) again.</p>

<p>X512 fixed an off-by-one error in the BMenuBar class that led to a 1 pixel
glitch on the right side, that no one had noticed so far.</p>

<p>PulkoMandy fixed some error handling problems in BRoster leading to an
infinite loop, and reworked the way we handle launching applications from
symlinks, allowing the application to know when this happens and access the
symlink file to get information about it. Some applications rely on the name
they are launched at to behave differently, and other may also use FS attributes
from the symlink to do specific things.</p>

<p>oco fixed a crash that could happen when unplugging an USB midi device</p>

<h3>Network</h3>

<p>Kallisti5 reworked the handling of VPN and dial-up interfaces in the Network
Prefs. While these are still not supported fully, at least the UI is in place
for when we get them going.</p>

<p>Waddlesplash improved the BSecureSocket implementation to allow better hostname
validation on SSL sockets, and changed the API to reject untrusted certificates
by default (previously, apps were required to override a method if they wanted
that, the expectation being that they would in some way ask the user what to do).</p>

<h3>Architectures</h3>

<p>Some of the work for the SPARC port by PulkoMandy was merged, fixing most of
our OpenFirmware code to handle the 64bit version of it used on SPARC machines
(this code was initially written for PowerPC, which uses 32bit there).</p>

<p>On the RISC-V side, TLS was disabled in the buildtools by kallisti5 as we are
currently lacking the required primitives to support it.</p>

<p>Jaroslaw Pelczar has also started upstreaming his work on support for ARM64
CPUs. This led to a lot of cleanups in various part of the code for warnings that
had been previously ignored, and the initial work to add the new CPU in buildtools,
haikuporter, and the initial support files required to build a bootstrap image.
Jaroslaw is a new contributor, but not unknown to Haiku as he had already worked
on a proof of concept ARM64 port as well as an earlier one targeting the AVR32
architecture. This time with things being upstreamed, we hope that the port will
be more maintainable and reach an usable state.</p>

<h3>Security</h3>

<p>Waddlesplash has reviewed some parts of the code for the most obvious
security problems. This led to some improvements to the areas flag, making sure
it is not possible for a process to easily clone another one's areas without
specific flags being set. In particular, since the rpmalloc allocator is using
areas for the heap, it was important to provide some level of protection for
these. Note that apps compiled under BeOS will not benefit from this, as it is
not possible for them to use the new flag, and we automatically apply compatibility
fixes for them.</p>

<p>He also made the ioctl system call check if the argument is a pointer, and
if that's the case, wether it points into userland memory and is not a
(malicious or accidental) attempt to get an ioctl to read or write into kernel
memory. The check is imperfect because ioctl allows to pass both pointers and
plain integers, so drivers should also do some additional checks in their ioctl
handlers. But we now have at least a minimal level of safety for the most
common cases.</p>

<h3>Drivers</h3>

<p>Waddlesplash made some more cleanups and bugfixes to the XHCI stack, fixing
some stalls in USB3 devices.</p>

<h3>Tools</h3>

<p>Axeld added various options to the netstat tool to more easily filter data
to be analyzed.</p>

<p>Simon South fixed the "minimal" build profile to include OpenSSL and libedit
(the latter needed to run the Debugger). These are now considered required for
any build of Haiku.</p>

<p>CodeForEvolution made the test_app_server system build on 64bit Haiku. This
tool allows to run a secondary app_server in a window, allowing to easily experiment
with changes to the app_server itself, as well as window decorators, without having
to reboot the system to try changes.</p>

<h3>Media Kit</h3>

<p>Waddlesplash fixed a typo in the cleanup code that prevented node from crashed
apps from being removed from the media system. No more "ghost" sliders leftover
in media preferences from long gone apps!</p>

<p>Ryan Leavengood made some other changes, in particular to the handling of the
"port pool" used to optimize communication between apps and the media server,
and to the cleanup of BBuffer instances (fixing a 10 year old problem).</p>

<p>Extrowerk improved the support for tracked music "module" files (MOD, S3M, IT, ...)
in our ffmpeg plugin and in MediaPlayer and file types.

<h3>app_server and Interface Kit</h3>

<p>PulkoMandy worked on adding some error handling in app_server, which is
currently not really worried about going out of memory and will most likely
crash when it happens. Since it is a rather critical system component, we
should try to do better. These problems are currently hit pretty easily by
running the WebKit test suite, which hints at problems in our WebKit port,
but still, nothing should be able to take down app_server with it that easily.</p>

<p>Mikael Konradsson patched DiskUsage to look nicer when using a "dark" (light text
on darker background) color scheme, and made some fixes to various controls in
the interface kit to improve their looks in this case.</p>

<h3>Storage and Filesystems</h3>

<p>Some patches from GSoC projects for btrfs write support (from BRJ) and the much older
BFS partition resizer (from ahenriksson) were merged. There are still a lot of these
waiting on Gerrit for someone to adopt them and finish them up, so your help on
going through these is very welcome!</p>

<p>Likewise, the MMC driver stack originally developped by Krishnan Iyer is still
in need for a bit of cleanup and completing the implementation. This month, the
support in the Device Manager was merged, so the driver can be loaded as expected.</p>

<p>Korli added support for some EXT4 features, in particular support for 64bit filesystems
and metadata checksums, which tend to be enabled by default in current Linux distributions.</p>

<p>Following this, PulkoMandy hit a problem with some of his partitions being
recognized as both ext4 and BFS. It turns out each of these put their superblock
in different places on the disk, so the two superblocks can co-exist if a partition
has been switched from one to the other format. The EXT2 driver was fixed to not
crash in this case, and give priority to the BFS one. And the mkbfs tool now makes
sure to erase any leftover ext2 superblock from the disk when creating a new
BFS volume. This should avoid a lot of "no bootable volume" found problems for
disks where there previously was a Linux installation.</p>

<p>Waddlesplash made some fixes to the still new NVMe driver.</p>

<p>Waddlesplash also got the ramfs up and running again. This is a filesystem that
stores data directly into RAM. Unlike a ramdisk, it does not use a RAM-based block
device and a traditional filesystem above it, which means it only uses RAM for
allocated files and automatically frees it up when the files are removed. This
means it is even faster and more flexible than a RAMdisk. However, the implementation
is still not complete, in particular there seem to be issues with timestamps as well
as queries.</p>

<p>He also updated our NTFS tools to the latest version.</p>

<p>mmlr worked on the virtio SCSI driver, which can be used in virtual machines
to avoid emulating an actual storage device, and instead use a more appropriate high-level
interface. In particular, the driver is now able to handle timeout on requests if
they turn out to be too slow to complete.</p>

<p>Finally, mounting BFS partitions will now be read-write by default, and will
not anymore ask the user if they only want to mount read-only. The filesystem is
now stable enough that this should be fine to do.</p>

<h3>Tracker</h3>

<p>Ryan Leavengood investigated one of the long-standing problems in Tracker.
In this case, it was the rather slow display of query results, especially when
there were a lot of them. The issue turned out to be a regression dating back
to the early days of OpenTracker, before the Haiku project even existed, and
was eventually fixed by optimizing a case where a lot of redrawing on screen
was done when not needed. Displaying query results is now even faster than before.</p>

<p>PulkoMandy reworked the file information dialog to fix some glitches (which
were visible only in some font sizes and/or locales) and add a view of file
attributes (similar to listattr), so it is not needed anymore to resort to the
command line to explore these.</p>

<h3>CPU patching</h3>

<p>Waddlesplash added some errata patching in the 64bit version of Haiku for AMD
Ryzen CPUs. These have various problems that can be fixed by writing magic values
to internal CPU registers. This should make the system run a lot better on such
machines.</p>
