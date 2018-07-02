+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 06/2018"
date = "2018-07-02T13:26:14.000Z"
tags = []
+++

<p>Hi there, I'm back for an activity report!</p>
<p>Let's see what happened last month. This report covers hrev51986-52054</p>

<h3>Donations and funding</h3>

<p>I just wanted to note that the 5 Haiku contributors who joined <a href="https://liberapay.org">Liberapay</a>
are now part of a "team".</p>
<p>In case you missed it, Liberapay is a way to donate money to some Haiku contributors directly.
They are an open source project, funded themselves by donations from their users, and with an
interesting approach to funding free software and other commons creations. Your donations are
anonymous if you use this channel, which makes sure it isn't used as a hidden contract work or
bounty or any other kind of commercial system. So, have a look at the <a href="https://liberapay.com/Haiku/">Haiku team on Liberapay</a>
and consider funding the work of either the team as a whole, or one contributor in particular.</p>

<h3>Drivers</h3>

<p>Quite a lot going on on the drivers side this month with final fixes to the intel_extreme driver for SMAP support,
a working transport for printers plugged on a serial port (yes I own one of these back from 1994), and most importantly
a lot of progress on getting our network drivers in sync with FreeBSD11. Until now, we were using FreeBSD 9 driver for
Wifi support, but waddlesplash has been hard at work bringing them up to date. We are currently in an early access
phase, where users are required to report their hardware and current status on the forum and maybe test updated drivers
before they get merged into the tree. Your help testing the work on as much hardware as possible (both wifi and ethernet)
is welcome.</p>

<p>Korli also fixed an issue in the hda driver, where a quirk from the Linux driver had been badly
ported to our code, leading to several devices not working anymore. The quirk is now applied only
to the actually affected cards, and the others should work again</p>

<h3>EFI support</h3>

<p>Meanwhile, Jessica has resumed work on EFI booting support. Not all of her work is merged yet,
but there were some fixes to the boot menu and some fixes to the order of early boot steps, to
make sure the menu works correctly and with all the options one expects to find in it. She also
fixed some issues in libroot_build, the wrapper library we use to run Haiku programs on another
system when cross compiling (and even when compiling Haiku in Haiku, as it may require some special
handling as well). The library was implementing a function using... itself, which of course would not
work well. It now lets the real system_time function be called when building on Haiku (and uses the 
replacement on other OS, which don't have a system_time call).</p>

<h3>32/64 bit hybrids</h3>

<p>Korli started merging his work on allowing 32 bit applications to run on 64bit systems. His earlier
work on SMAP allowed to review most places where we share memory between userspace and kernel space,
making it much easier to identify the places where 32/64 conversions might be needed. The next step
was to review all system calls to detect places where we would use structures of different sizes on
32 and 64 bit systems, and add a different version of the syscalls for 32bit apps. However, this
exposed some more issues (for example in the NTFS driver) and the changes have been reverted for now.
They will be integrated again later, after they get more testing.</p>

<h3>Compiler updates</h3>

<p>Waddlesplash investigated various issues found after updating our compiler. He fixed frame pointer
alignment for syscall handlers, allowing gcc to access the stackframe using sse2 instructions (which
require data to be 16 byte aligned). He also cleaned up the buildsystem handling of compiler options
for easier management of clang and gcc7 compiler options, and fixed various warnings identified by
gcc7.

<h3>Applications</h3>

<p>DeadYak is working on our native Debugger. The main change this month is preventing the debugger
from downloading debug information for libraries when saving a debug report in the background. This
was a bit annoying because Debugger would download large files without user feedback, which made it
look like t had itself crashed or frozen.</p>

<p>HaikuWebKit 1.6.5 has now hit the repos for both 64 and 32 bit systems. It is a lot more stable
than 1.6.4, but there are still some issues. Another release will probably follow soon.</p>

<p>As his first contribution to Haiku, David Murphy limited the list of recent folders in Backgrounds
to 10 entries. This took a lot of discussions and bikeshedding, so congratulations for getting through
it and getting the changes merged!</p>

<h3>Are we released yet?</h3>

<p>The infra team is still working on migrating all our services to our new, powerful server and
securing everything so we can handle the avalanche of website trafic and people attempting to
download Haiku and a lot of packages when the release ships. They are also adding some signing
support to make sure our builders are doing what we expect (in the currently unlikely case that
someone would try to inject malware or spyware into haiku via our builders).</p>

<p>As soon as they are all set, we will create the release branch, where we will make some cleanup
and workarounds to some of the most embarassing bugs (while the trunk will not include them, and
will wait for actual bugfixes). And we'll ship once we are happy enough with the result.</p>
