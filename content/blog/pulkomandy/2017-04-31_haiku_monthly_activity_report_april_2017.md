+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 04/2017"
date = "2017-04-31T20:26:14.000Z"
tags = []
+++

<p>Once again I am out of catchy taglines to introduce the monthly report.
To apologize for that, I updated the <a href="http://pulkomandy.tk/stats">statistics about Haiku git repository</a>, and also added a similar <a href="http://pulkomandy.tk/stats_hp">statistics page for haikuports</a>.</p>
<p>This report convers hrevs 51064 to 51139.</p>

<h4>Network</h4>

<p>A lot of activity on this side with no particular reason, with kallisti5 and
waddlesplash working on the network preferences and underlying stack, towards
support for VPNs and PPP connections.</p>

<p>Axeld also did some work in the network stack, fixing some locking issues
and a memory leak.</p>

<p>Ayush (one of our GSoC applicants) fixed getaddrinfo to accept IPs in
unusual formats with only 3, 2, or 1 number, as required by POSIX.</p>

<h4>Media</h4>

<p>PulkoMandy removed some annoying assert() in the ffmpeg decoder, which were
there for safety, but prevented it to play some videos that would otherwise
work just fine. The list of problematic videos continues to shrink, but there
are still some files we get in trouble with. In at least one case however,
MediaPlayer is able to play a video that no other media player (including on
other platforms) could handle.</p>

<p>Barrett replaced the old playfile, playwav, playsound commands by a single
media_client test application, making use of all the new features in the Media
Kit he added over the past year.</p>

<h4>Drivers</h4>

<p>PulkoMandy made yet another fix to the intel_extreme driver, for another
case of failed initialization and black screen.</p>

<p>tqh started investigating our Elantech touchpad driver, which is currently
disabled and incomplete. This driver would provide multi-finger gestures on
such touchpads (apparently less common than the Synaptics one, which are
already supported).</p>

<p>kallisit5 fixed the ACM (generic USB serial) driver to handle some devices
with a broken USB descriptor, allowing him to use an USB modem to test the PPP
stack mentionned above.</p>

<p>He also continues investigating problems in our XHCI (USB3) driver, this time
by comparing to the one in Google's Fuchsia, which is a quite clean implementation.</p>

<h4>Filesystems</h4>

<p>Axeld fixed some compatibility issues with BeOS in our BFS implementation.
We allowed some things that BeOS does not handle the right way.</p>

<p>Axeld also added unit tests to KPath, the kernel-side counterpart to BPath.
The tests allowed to uncover a bug, which he also fixed.</p>

<p>The GPT partitionning system now has a lower score when only the start or
end of the disk has a valid partition table. This allows erasing just the start
of the drive with another file or partitionning system to override GPT, which
would otherwise continue to be visible until the backup table at the end of the
drive would be erased as well.</p>

<h4>User interface</h4>

<p>BListView can now more easily be used inside a BScrollView when horizontal
scrolling is needed. It did already configure the vertical scrollbar
automatically, but the horizontal one was never set. This was mostly visible
in the Locale preferences.</p>

<p>Brian Hill continues his work on the Software Updater, which is now included
in the default image, and almost ready for production. This tool will be used to
notify the user when updates are available in the repositories, and automatically
apply them. No need to go to pkgman in the command line for this anymore.</p>

<p>Humdinger tweaked the decision to use black text on the desktop when the
background color is light.</p>

<h4>Launch daemon</h4>

<p>It is not possible anymore to crash the system by restarting launch_daemon
manually.</p>

<p>The launch_daemon creates some important directories on startup, allowing
shared memory to work again.</p>

<h4>System headers and C library</h4>

<p>elf.h has a more complete set of ELF architecture constants, allowing to
compile tools like avrdude without the need for a 3rd-party libelf.</p>

<p>PAGE_SIZE is now only defined if the _XOPEN_SOURCE feature is enabled. This
allows plain standard C programs to use the name PAGE_SIZE for other purposes.</p>

<p>abort() will now call debugger(). This means applications which end up there
(by calling it directly, or because of an uncaught exception) will now offer the
usual crash dialog and option to save a debug report, instead of just disappearing
without any warning.</p>

<p>_POSIX_SEM_NSMES_MAX is now 256, allowing Python3 to use more semaphores.</p>

<p>PIPE_BUF is now defined in limits.h as required by POSIX.</p>

<p>The runtime_loader can handle library sonames of more than 32 characters</p>

<h4>Tracker</h4>

<p>Owen (one of our GCI contestants this year) and waddlesplash worked together
on various fixes and improvements to Tracker.</p>

<p>This work resulted in fixes to keyboard selection, freeze of BFilePanel when
using some keyboard shortcuts, and allowing multiple selection from the keyboard
while in a single selection file panel.</p>

<h4>Outside the tree</h4>

<p>Not all the activity around Haiku results in commits to the main git repository.</p>
<p>At HaikuPorts, Begasus is working on updating many recipes still using the old "bep" syntax from BePorts days, and making sure the software builds and runs on Haiku.</p>
<p>This month was also the the time for our GSoC mentors to review the GSoC applications and pick the selected students. The results will be announced by Google during the week.</p>

<h5>Are we released yet?</h5>

<p>Another step towards beta 1 was reached this month, with the official package
buildmaster now being ready to run both for x86_64 and x86_gcc2. The build master
is now set up on Haiku's own server and will soon start providing a package repository
for use with Beta1. You can watch the build bots run through the packages:
<a href="http://vmpkg.haiku-os.org/new/x86_64/build/28">for x86_64</a>
and <a href="http://vmpkg.haiku-os.org/new/x86_gcc2/build/6">for x86_gcc2</a>.</p>

<p>We are now looking for more machines building packages, in order to make the process
faster and more reliable. If you own a machine that you can keep online and running Haiku,
and would like to contribute it, let us know. In particular, if you own one of the
Mac Minis donated to Haiku by Mozilla, this is what they should be used for.</p>

<p>The next steps towards a release are connecting the buildmaster to git hooks on
haikuports so it automatically builds recipes added there, and publishing the
resulting package repository for testing by Haiku users. If the repository works
well and there are not too much regressions from the existing ones, we will then
proceed to making it the default repository for the beta1 branch.</p>
