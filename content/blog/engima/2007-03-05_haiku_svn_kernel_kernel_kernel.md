+++
type = "blog"
author = "engima"
title = "Haiku SVN: Kernel, Kernel, Kernel."
date = "2007-03-05T20:50:27.000Z"
tags = ["kernel", "vm", "usb", "resedit", "scheduler"]
+++

<h3>Quick Updates</h3>
<em>r19700-r19800</em>
<ul>
    <li>Addition of fortunes, including Haiku specific texts.</li>
    <li>Tweaked thread scheduler.</li>
    <li>Many VM enhancements and fixes</li>
    <li>Addition of resource editing tool, resedit.</li>
    <li>Addition of VMware graphics driver.</li>
</ul>

<!--more-->

<h3>Full Updates</h3>
Showing that an OS isn't complete without personality, DarkWyrm has committed a collection of BeDoper and HaikuWiki quotes to Haiku's 'fortunes'. The possibility of 'boot time' Haikus is intriguing.

Next we dive into kernel matters. Haiku previously had a small chance, 30%, that it would skip the highest priority thread to run when rescheduling. This has since been altered to skipping roughly 4%, now skipping to the first thread with a lower priority than the otherwise lucky thread.

There were many other kernel matters, too many to go into substantial details:
<ul>
    <li>Philippe Houdoin introduced his 'Deferred Procedure Call' module for the kernel.</li>
    <li>Many VM features including pre-committing pages for over commits.</li>
</ul>

Another useful tool, resedit, a work in progress, has been added to the source tree. Similar to quickres, it can currently view resources and attributes but shall be expanded in the near future.

USB queuing in particular received a workover. More stable packet sizes, more responsive 'finishing threads' and cleaner code were some of the results.

Small but interesting changes to NIC configuration changes. If a device lacks a configuration and there is an unused one available, it now takes it; Very useful for moving images between computers.

Erir Petit's VMware graphics driver was committed, a great bonus to testers everywhere. After a few minor additions this was added to the default image.

Updates to vendor libraries include coreutils v6.7 in addition to timezone files.