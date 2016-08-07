+++
type = "blog"
author = "engima"
title = "Haiku SVN: Build & Syscalls"
date = "2007-03-22T10:30:04.000Z"
tags = ["VMWare", "CFLAGS", "syscall", "benchmark"]
+++

<h3>Quick Updates</h3>
<em>20000-20100</em>
<ul>
<li>Addition of class screensavers</li>
<li>Customisable CFLAGS</li>
<li>Useful URI to application redirects</li>
<li>Syscall benchmarks and results</li>
</ul>
<!--break-->
<h3>Full Updates</h3>

<p>In a nod to the old days of BeOS Ryan Leavengood checked in an implementation of the 'Buy Now' and 'Message' screen savers.</p>

<p>Users of VMware will note that the VMware graphics driver, recently added, was removed until remaining issues can be worked out.</p>

<p>Waiting on processes and children is significantly more robust and standards compliant Be's implementation.</p>

<p>Those compiling their own images will be most pleased to see the addition of the HAIKU_BASE_CCFLAGS variable containing parameters added to all C/C++ compilations. Uncomment it to add '-pipe' to see a potential 25% build speed improvement!</p>

<p>If you have not had to opportunity to compile your own image as above the updated cross compile readme could go some distance to helping you. Check it out at /trunk/ReadMe.cross-compile</p>

<p>François Revol added his 'url_wrapper' utility, useful for redirecting common URIs types to useful applications, eg telnet:// opening telnet, similarly for ftp, finger, file, beshare, rtsp and more ...</p>

<p>The syscall benchmark received an overhaul from Geist, including Haiku's implementation of that most important of syscalls, 'is_computer_on' (Currently work is in progress to implement it's sibling, 'is_computer_on_fire'). After some short tests the current timings clock in at roughly:
<ul>
<li>haiku 6800 nanosecs</li>
<li>beosr5 2200 nanosecs</li>
<li>linux 680 nanosecs</li>
</ul>
While slow, they were not unexpected as optimisations have not been applied. Watch for these numbers to decrease in the future.</p>