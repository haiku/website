+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 06/2017"
date = "2017-07-03T20:26:14.000Z"
tags = []
+++

<p>Hey there, it's time for the monthly report again!</p>
<p>This report covers hrev51196-hrev51253.</p>

<h3>Kernel</h3>

<p>time_t now uses 64-bit on 64-bit systems. This fixes the year 2038 bug for
64-bit Haiku, so we can continue to run it after 2038.
This breaks the ABI, so all the 64bit packages were rebuilt.</p>

<p>Some bug fixes in packagefs, to avoid some annoying issues when updating the system 
or repeatedly installing and uninstalling packages without rebooting.</p>

<p>The PowerPC port is getting some attention again, with some fixes to get it to build after a few years of breakage.</p>

<h3>WebPositive</h3>

<p>The locking of hte URL bar was reworked to make more sense. Now the URL bar
should more reliably display the URL for the current page, and still be editable
while a page is loading.</p>

<p>There is work in progress on a new WebKit release, which will fix several
crashes, in particular when using html5 videos, and some drawing glitches in
javascript canvas.</p>

<h3>Mail kit</h3>

<p>The mail kit code was reworked to use BSocket and BSecureSocket instead of
OpensSSL directly, which should simplify a few things in the code and make it
easier to keep Haiku secure (as we manage OpenSSL APIs in a single central place).</p>

<h3>Drivers</h3>

<p>The VESA and framebuffer drivers were merged together, which means we now
have a single fallback driver for all architectures, and in particular for both
EFI and BIOS systems.</p>

<p>The serial port driver is now allowed to use the first COM port, if the kernel debugger does not use the serial output.
This allows to decide wether to use the driver at run time (before, you needed to rebuild the kernel with serial debug completely
disabled).</p>

<p>The hda driver has seen some bugfixes too, and is undergoing a larger cleanup.
This should increase compatibility and the work is not complete yet.</p>

<p>The old "ide" driver was removed, as it has been replaced with the new "ata"
one a few years back  This was just unused code and there will be no regressions.</p>
