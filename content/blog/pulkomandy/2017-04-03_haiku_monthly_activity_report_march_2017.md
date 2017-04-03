+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 03/2017"
date = "2017-04-03T20:26:14.000Z"
tags = []
+++

<p>The spring is comming, the GSoC applications closed just today, and it is time for a new monthly report!</p>
<p>This report covers hrevs 50989 to 51063</p>

<h4>Drivers</h4>

<p>tqh is working on improving wifi performance. He identified some sub-optimal
code in the FreeBSD compatibility layer which he replaced by much simpler and
faster functions that the compiler can actually inline. This improved performance
of all IO access to network devices, fixing some real time problems.</p>

<p>tqh also tweaked some DHCP timings to have a faster initial setup of wifi connections.</p>

<p>Kallisti5 added support for AMD Ryzen CPUs.</p>

<p>Hy Che (one of our GSoC applicants) fixed mounting of btrfs volumes. Our code
was quite old and did not handle some features properly.</p>

<p>Kallisti5 updated acpica to the latest release, possibly fixing some issues
with power management, power buttons, and other ACPI things.</p>

<p>Kallisti5 also fixed some PCI IRQ routing problems to get his new motherboard working.</p>

<p>wangxingdsb (another GSoC applicant) made some cleanups in our ext2 driver to prepare for ext4 support.</p>

<p>axeld fixed an issue in the VFS that was causing rather frequent panic on our package build slaves.</p>

<h4>Network apps</h4>

<p>Dave Thompson fixed handling of the INBOX folder for IMAP.</p>
<p>Kevin Wojniak fixed an issue with HEAD requests in PoorMan, and cleaned up some of the code while he was at it.</p>
<p>Alexander Andreev (one of our GSoC applicants) fixed a KDL in the IP stack, caused by mixup of different hash tables.</p>

<h4>User interface</h4>

<p>PulkoMandy did some rework of the support for font fallbacks. The support is
still rather primitive, but it should behave a little better with the Noto font
used now, which comes packaged as multiple font files for different scripts.</p>

<p>Waddlesplash merged in several patches from AGG, our graphics rendering library,
of which development has resumed on the 2.4 branch (there was a 2.5 release
some years ago, but under a different licence so it didn't gain much traction).</p>

<p>Dariusz Knociński fixed the layout of the df command line tool, to have enough
space for mount points of the package managed volumes.</p>

<p>Axeld fixed some drawing glitches in the BBox code.</p>

<h4>Media</h4>

<p>Barrett continues his work on the BMediaClient.</p>

<p>Vivek Roy (one of our GSoC applicants) added some error handling in MediaConverter, which will now complain if it can't write to the output directory.</p>

<p>Humdinger fixed a crash in the MIDI preferences when the settings file was missing.</p>

<p>PulkoMandy fixed an issue in the ffmpeg plug-in preventing to play some MP3 files.</p>

<h4>Package management</h4>

<p>The work on package management continues, mostly on the side of the "Software Updater".
This is a graphical tool to update your system.</p>

<p>Anirudh (one of our GSoC applicants) made a small change to remove "Haiku"
from the text, when distro compatibility isn't enabled.</p>

<p>Brian Hill is doing the bulk of the work here and merged in several UI cleanups</p>

<h4>Other stuff</h4>

<p>mirabilos (the main developer of MirBSD) submited a patch to get our /etc/profile
to play well with his mksh and other non-bash shells.</p>

<p>PulkoMandy updated the WebKit port to merge a few month of changes from upstream. This is still a work in progress, no release yet.</p>
