+++
type = "blog"
title = "Haiku monthly activity report - 12/2019"
author = "reds"
date = "2020-01-15 20:17:00+00:00"
tags = ["haiku", "software"]
+++

Hello and welcome to the (almost) monthly activity report for December 2019! December wasn't the busiest for Haiku code-wise, but nonetheless we saw a lot of Google Code-In contributions. This year marks the 10th anniversary of GCI, in which Haiku has participated since the very beginning.

On the non-coding side, GCI participants wrote new virtualization guides: alwayslivid wrote a guide on AWS and rewrote the old Xen one, trungnt2910 wrote a guide on qemu, and redsPL's (hey, that's me!) wrote guides on VMware ESXi and DigitalOcean. Other than that, Vrondir made a KVM tutorial video and Zotyamester made a VMware Workstation video.

On the coding side, from around hrev53618 to hrev53714 Haiku had seen a lot of fixes and improvements, biggest of which are as always listed into arbitrary categories below...

<h3>Terminal</h3>
The Terminal app saw a lot of fixes during December. Jérôme Duval fixed the encoding problems with TermView scripting and Zoltán Szatmáry went on a coding spree - he fixed double freed memory while changing keymaps, a few window resize problems and a lot of other minor bugs.

<h3>Interface</h3>
The UI libraries saw a few fixes - X547 fixed focusing on windows with a special flag, flickering while drawing the background and transparency errors in the app_server.

Kacper Kasper added new bitmap drawing routines.

<h3>Game Kit</h3>
Raheem Idowu rewrote the PushGameSound and WindowScreen headers, amongst other minor fixes.

<h3>Filesystem</h3>
Pulkomandy fixed the resizefs command and added an allocation hint while moving inodes.

<h3>Various</h3>
X547 fixed Haiku3D crashing on exit.

Waddlesplash rewrote a part of math.h to use GCC built-in functions where possible, which in effect should make future application porting much easier.

mmlr fixed FFmpeg's leaky input buffer.

<h3>are we in beta2 yet?</h3>