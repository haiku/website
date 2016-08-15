+++
type = "blog"
author = "tangobravo"
title = "Haiku Activity Update #3: 28 August-8 September 2007"
date = "2007-09-14T07:06:40.000Z"
tags = ["activity update", "progress"]
+++

I've decided to switch to an update every two weeks, which will hopefully prove more resilient to Real Life (TM).  I'll also start being a little more selective about the changes I report to make it at bit less work for me to write, and a bit less work for you to read!

In brief, this period saw a lot of bug fixing work from the core contributors. A first firewire implementation was committed to the tree, Ingo completed Job Control support, Mail received a much-needed code cleanup, and Marcus continued the initial work on the AHCI SATA driver.

Read on for more on those, updates on mailing list discussions, and to find out how I managed to include a reference to Shakespeare...

<!--break-->

<h3><a href="https://lists.berlios.de/pipermail/haiku-commits/">SVN Commit List</a></h3>

<em>Firewire</em>
JiSheng Zhang's Google Summer of Code work on a firewire implementation for Haiku was checked in. Some of the code for the modules has come from FreeBSD current. As JiSheng reported in <a href="/blog/absabs/2007-08-30/my_feelings_about_gsoc_and_firewire_status">a blog post</a> the implementation works with his DV camera and he intends to continue the work to support storage devices too. Great work, JiSheng!

<em>Open Sound</em>
François integrated the current version of his OpenSound media node to the tree and the build. This work should greatly increase Haiku's sound card support.

<em>Job control</em>
Ingo implemented the kernel support for Job Control, allowing tasks to be stopped and continued among other things.

<em>AHCI SATA Driver</em>
Marcus' work on the AHCI SATA driver has continued, with controller resetting and AHCI enabling written. He has also implemented a framework for interrupt handling and enabled interrupts in the driver. The driver work is showing up some <a href="https://dev.haiku-os.org/ticket/1434">bugs</a> in the device manager which Axel and Marcus are investigating.

<em>Mail</em>
Stephan checked in part of a big cleanup to the Mail application, fixed some issues with the toolbar, and some general issues with resizing menu fields. Spell checking now works too (the words file was not included in the Haiku image by default).

<em>Kernel</em>
Ingo made some fixes to the VM with regards to areas and caching. He also did some work on enabling hardware breakpoints to aid with kernel debugging.
Axel joined the VM work fixing some locking issues and committing the beginnings of a new page daemon which I believe is the part that will deal with keeping track of which pages should be swapped out to disk when memory gets low. I could be way off with this though. What I will say about it is what Axel mentioned in the commit log: "This should slow down Haiku a bit more, great, huh? :-)"!

<em>Other Applications</em>
Julun (aka "HOST", or at least one member of that team) appeared on the mailing list and offered a patch containing some style fixes for StyledEdit. Ryan Leavengood made a few fixes and committed the patch. Julun later provided a patch to fix style and font-sensitivity issues in time preferences (which Stephan committed with some additions). Thanks Julun!
Axel ported atftpd from Linux - this is a TFTP (Trivial File Transport Protocol) server. It is untested but not expected to work correctly on Haiku yet.
Stephan made some Icon-O-Matic changes, mainly improving its behaviour under R5.

<em>Build System</em>
Ingo added the ability to unzip archives onto the Haiku image, which people might like to do in their UserBuildconfig. Another rule for downloading a file with wget was added and there were also a couple of cross-compilation fixes, one of which involved defining Haiku's signal names rather than using the host platform's which makes Haiku build successfully under 32-bit FreeBSD.

<em>Misc. Fixes</em>
Stephano fixed the pen size BPicture test case.
Ingo fixed some issues with the condition variable implementation.
Axel fixed some problems with communication between app_server and input_server - input_server is now correctly restarted, and app_server no longer gets confused and kills itself (before it was almost like a scene from Romeo and Juliet with the app_server instantly committing suicide when it thought the input_server had died. If only Haiku was around in Shakespeare's day, he could have written a sonnet about it!)
Stephan improved BTextView layouting, fixing weird control placement in Beam.
Axel fixed keyboard input in menus by making them behave differently to normal windows. As a side-effect, BWindowScreen windows can now have menus attached.
Ingo made bash behave the same on closing the terminal window or typing exit - background processes are no longer terminated on either action.
A crashing bug in Tracker's sorting column functions was fixed.


<h3><a href="https://www.freelists.org/archives/openbeos/">General Mailing List</a></h3>

Someone asked if anyone had the open-sourced version of SampleStudio that Xentronix released after the community paid to have the sources released. Cian replied saying that he had uploaded one of the source tarballs to Berlios, under the name BeAE. You can find the project page <a href="http://developer.berlios.de/projects/beae/">here</a>.

Humdinger suggested some improvements to trac, including a mandatory field for the revision number of Haiku being tested. Charlie Clark, the unofficial trac maintainer (and long-time BeGeistert organiser), agreed with some of the suggestions but does not know when he will have the time to implement them.

Jorge continued his recent theme of encouraging community advocacy events. During this period he announced his <a href="http://myhaiku.org/haiku-related-artwork">Haiku Artwork Page</a> initially offering Haiku logos, a generic flyer, and a poster for download, and later adding a simple and elegant wallpaper set. The large 35"x23" poster is also available at the <a href="http://www.cafepress.com/haiku_os/">Haiku CafePress store</a> ($18). Koki encourages derivative work or translations - more details on the page.

Phil Greenway (aka Sikosis) attended HUMBUG - Brisbane's Unix User Group on September 8th. The plan was to record an episode of the <a href="http://www.pageflakes.com/HaikuPodcast">Haiku Podcast</a> from there. He wrote a <a href="/blog/sikosis/2007-09-12/haiku_at_humbug">blog entry</a> on how it went - sounds like a success!


<h3><a href="https://www.freelists.org/archives/haiku-development/">Development List</a></h3>

I promised an update on the Hybrid Image discussion last time - but there isn't much to add to the previous discussion. No official decisions have been made, though Michael Lotz is investigating possible compatibility problems in more detail. This one's definitely to be continued...

There was some discussion on clarifying parts of the coding guidelines, which will hopefully be reflected in an update to the official coding guidelines page.

There was a question from Ilya Pavlenkov about the possibility of porting Java to Haiku since it has now been open-sourced. Bryan Varner, known to many in the community as the driving force behind the last effort to port Java to BeOS (along with Andrew Bachmann), responded to give an update of the current status. Briefly - the current OpenJDK structure is not very well set up for platform ports, but there are changes coming in the future. In other news, his (private) 1.4.2 Java port for BeOS "nearly" runs on Haiku. Cool.


<h3><a href="http://www.bug-br.org.br/pipermail/glasselevator-talk/">Glass Elevator</a></h3>

Continuing the thread on layout managers I mentioned <a href="/blog/tangobravo/2007-08-30/haiku_activity_update_2">last time</a>, Christof Lutteroth set up <a href="http://www.cs.auckland.ac.nz/~lutteroth/projects/alm/">a website</a> for the .NET implementation of the Auckland Layout Model he has been working on, including some example layouts to show the engine in action. Fredrik Holmqvist (who definitely is aka tqh, now I've worked out my Fredrik confusion) has expressed an interest in porting the c# examples to BeOS C++, so something might yet happen on this for future Haiku. [Insert standard forward-looking-statement disclaimer here :D]

<h3><a href="http://dev.haiku-os.org">Bug Stats</a></h3>

The bug list is the hardest to read through and summarise and any major fixes will be reported in the commits section, so I've decided to retire this section. It's pretty easy to do a simple count though just to give a sense of activity - although don't read too much into this (sometimes a new bug is immediately closed as invalid, for example).

36 Bugs created, 39 bugs closed.

<h3><a href="http://www.haiku-os.org">Website</a></h3>

To make up for the sad demise of the bug section, I'll add one on the website. I won't promise to keep track of the forums - it's not something I do regularly - but if something there catches my eye I might mention it. What I definitely will mention is new and interesting blog posts and documentation updates.

Stephan has started an informative series about multithreaded programming, specifically aimed at people wishing to develop on Haiku, although the concepts discussed are applicable to any system. The <a href="/documents/dev/understanding_the_design_and_requirements_of_multithreaded_applications">first post</a> examines why locking is needed and how messaging can avoid deadlock situations, and <a href="/documents/dev/using_snapshots_for_short_locking_times">the second</a> looks at using "snapshots" to reduce the time locks need to be held for. They're both well worth a read if you're interested in programming in the modern multi-core world.

Other things of interests are Ryan's <a href="/blog/leavengood/2007-09-04/javascriptcore_runs_on_haiku_mostly">report of success</a> with JavaScriptCore on Haiku (mostly!) and a report from Salvatore Benedetto about <a href="/blog/emitrax/2007-09-05/impression_about_my_gsoc_with_haiku_and_usb_isochronous_support_status">the status of his GSoC project</a> about extending Haiku's USB support.

<h3>The End</h3>
That's it for another update. This post came at the transition between my original weekly idea and the new fortnightly plan, meaning that the next one really will be shorter!