+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 03/2018"
date = "2018-04-06T07:26:14.000Z"
tags = []
+++

<p>Welcome to the third monthly report for 2018!</p>

<p>This report covers hrev51833-hrev51872.</p>

<h3>System</h3>

<p>Hrishi Hiraskar (one of our GSoC applicants) reworked the management of the shutdown phase. This
revolves around both launch daemon and the BRoster, which collaborate together to coordinate
system shutdown. Things must happen in a specific order to make sure all apps are properly terminated
(leaving the user a chance to save his work if not done yet), and only then, system servers are
stopped. There were some problemw with the existing implementation where it would be possible to
start an application while another one was waiting for a save, and it could eventually lead to
loss of work (a little unlikely, but still). We now have a better shutdown process which will make
sure everything happens in the correct order.</p>

<p>Korli fixed yet another SMAP violation (see previous month reports for more about this).</p>

<p>mmlr helped fix some KDLs and in general sanitizing input to system libraries. One case of 
fixed KDL involves creating a memory area with a bogus size on 64bit systems because an overflow could occur. Another fix is checking and enforcing the maximum number of allowed file descriptors in a select or poll call according to RLIMIT_NOFILES. A similar change was done for wait_for_objects, which is a bit more complex as it can handle more than just plain files.</p>

<h3>Build system</h3>

<p>Kalisti5 got the PowerPC build working again. It is still not possible to boot PowerPC images very far, but at least it is now possible to compile them, and our buildbots are now happily doing so.</p>

<p>Korli fixed the gensyscalls tool to generate files in different directories for each architecture.
While this has little impact for now (because there is a single syscall set), it will be important
to have this working properly when we try to run 32bit applications on 64bit systems (then our kernel
will need a set of 32bit and a set of 64bit syscalls).</p>

<p>Waddlesplash and Korli did some cleanup and updates on the packages used for building Haiku.
These are not directly linked to HaikuPorts anymore but we use packages with fixed versions now,
so from time to time we need to re-synchronize things so that Haiku stays up to date.</p>

<p>Korli also fixed various issues preventing debug builds from working on x86_64.</p>

<h3>Drivers and Filesystems</h3>

<p>Korli fixed NTFS and FAT filesystems to properly handle permissions on read-only volumes. In some cases, copied files from a read-only volume would end up being marked as read-only on the target.</p>

<p>He also fixed an issue in the ATA driver where we would allow DMA transfers to happen when there
was nothing to transfer. This would for example crash the system when using the "readcd" command
(from cdrtools).</p>

<p>Korli also fixed the usb_raw driver, which is used to access USB devices from userland. This
was a regression introduced in february, and broke PhotoGrabber. Fortunately it was quickly catched
by Vidrep who does a lot of testing and bugreports, making it easier to identify and fix the problem.</p>

<p>He also synchronized the list of devices using the "sync snoop" quirk from ALSA. Quirks are
unusual specific handling for select devices, which don't behave as specified and require extra
actions to work. This may improve our support for soundcards (almost all PCs use an hda based sound card these days).</p>

<p>mmu_man fixed an use-after-free in recover, the tool used to scavenge files from corrupt BFS volumes.</p>

<p>Some btrfs patches from Hy Che contributed shortly after GSoC 2017 were finally merged. One of
the GSoC applicants from 2018 took the time to review them and finish the work.</p>

<h3>Applications</h3>

<p>DeadYak continues work on the Debugger and fixing missing bits to completely support GCC5
debug information.</p>

<p>Andrew Lindesay added some error handling to improve behavior when malformed repository URLs were used.</p>

<p>Kim Brown made Installer not copy the syslog from the installation medium to the final install. This saves some disk space, and more importantly some confusion when debugging boot problems after installing.</p>

<h3>Support kit</h3>

<p>Janus found a bug in BString (!). Even the most core classes in Haiku are not completely
finalized yet. The Split() method would fail when the separator was more than one character long.
This is now fixed and Korli also wrote new unit tests for this.

<h3>User interface</h3>

<p>Humdinger reworked the standard about window used by many apps. It now uses a smaller icon,
	and its size and looks were tweaked a little. This is all minor details, but such things make
	Haiku stay nice and shiny.</p>


<h3>Media</h3>

<p>Barrett made some changes to the ffmpeg plug-in to try improving the results of BeScreenCapture encoing. However, it looks like not much can be done and we will need to rework the plugin to use modern ffmpeg APIs (and keep a "legacy" version of it for gcc2, which is stuck with an old variant of ffmpeg).</p>
