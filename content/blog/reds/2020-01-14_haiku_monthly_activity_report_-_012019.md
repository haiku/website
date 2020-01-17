+++
type = "blog"
title = "Haiku monthly activity report - 12/2019"
author = "reds"
date = "2020-01-17 13:00:00+00:00"
tags = ["haiku", "software"]
+++

Hello and welcome to the (almost) monthly activity report for December 2019! December wasn't the busiest for Haiku code-wise, but nonetheless we saw a lot of Google Code-In contributions. This year marks the 10th anniversary of GCI, in which Haiku has participated since the very beginning.

On the non-coding side, GCI participants wrote new virtualization guides: alwayslivid wrote a guide on AWS and rewrote the old Xen one, trungnt2910 wrote a guide on qemu, and redsPL's (hey, that's me!) wrote guides on VMware ESXi and DigitalOcean. Other than that, Vrondir made a KVM tutorial video and Zotyamester made a VMware Workstation video.

On the coding side, from around hrev53618 to hrev53714 Haiku had seen a lot of fixes and improvements, biggest of which are as always listed into arbitrary categories below...

<h3>Terminal</h3>
The Terminal app saw a lot of fixes during December. Jérôme Duval fixed the encoding problems with TermView scripting and Zoltán Szatmáry went on a coding spree - he fixed crashes caused by double freed memory in case of changing active keymaps, a few window resize problems and a few other minor issues.

<h3>Interface</h3>
The UI libraries saw a few fixes - X547 fixed focusing on windows with a special flag, flickering while drawing the background caused by wrong window update order and transparency errors in the app_server.

Kacper Kasper added new optimized bitmap drawing routines, which will be used in webkit for faster rendering of lines and tiled images.

<h3>Game Kit</h3>
As a GCI task, R4H33M had rewritten the PushGameSound and WindowScreen headers as they were copypasted from old BeOS code.

<h3>Filesystem</h3>
Pulkomandy merged some code contributed by ahenriksson durign GSoC, which will one day allow for resizing BFS partitions.

<h3>Various</h3>
X547 fixed Haiku3D crashing on exit by moving the cleanup code to another class.

In an attempt to make Haiku's C library more modern, Waddlesplash rewrote a part of math.h to use GCC built-in functions.

mmlr fixed FFmpeg's leaky input buffer in the case that the file failed to load. This could've lead to leaking at least 32K of memory and potentially much more, depending on how much FFmpeg has already allocated for that file. In a production environment, this could easily lead to memory exhaustion, which could lead to further system instability.

<h3>Are we in beta2 yet?</h3>
Not quite, but we're getting closer; A quick look on the <a href="https://dev.haiku-os.org/milestone/R1/beta2">bugtracker</a> reveals that there are at least 32 issues left with the beta2 tag, but only 3 of them are blocking issues.

There's a bug in XHCI preventing USB storage devices from being detected at boot time, which means that some motherboards are unable to boot Haiku from USB 3.0 onwards.

Besides that, net80211's code needs to be tidied up for better future compatibility with wpa_supplicant ported from FreeBSD.

The last blocking issue is a regression in latest Haiku builds being unable to find its own partition on USB.

From the non-blocking issues, the most notorious one is the intel_extreme driver, which has problems on several machines with graphics chipsets ranging from the old GMA 9XX once popular in laptops and netbooks up to HD4400 from the Ivy Bridge generation of Intel CPUs.  Lastly, all files that contain permission syscalls need to be audited, and new security checks need to be implemented.