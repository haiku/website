+++
type = "blog"
author = "tangobravo"
title = "Haiku Activity Update #2: 21-27 August 2007"
date = "2007-08-30T18:48:09.000Z"
tags = ["activity update", "progress"]
+++

Hot on the heels of yesterday's post, here's the summary for last week's activity in Haiku-land.

This week saw the driver for AHCI SATA controllers begun in earnest, the beginnings of job control support in the shell (and associated kernel stuff), a Sudoku game added to the image, and more bugs squashed.

There was also a discussion on the development mailing list about "hybrid" images of Haiku, allowing both GCC 2 and GCC 4 compiled apps to work on the same system.

<!--break-->

<h3><a href="https://lists.berlios.de/pipermail/haiku-commits/">SVN Commit List</a></h3>

<em>AHCI SATA Driver</em>
Marcus started working on the AHCI SATA driver. Axel provided some guidance on the expectations the Disk Device Manager has for the driver and modified the skeleton so that it is loaded by the kernel. Marcus added some debug output to various parts of the tree to aid further work on the driver.

<em>App Server</em>
Stephan has fixed the broken resizing of scrolling views - I certainly noticed that weird behaviour in Tracker and it's nice to see it fixed.
Another change by Stephan is to outline names of files on the desktop rather than drawing a solid background, which looks better if an image is used for the desktop wallpaper.

<em>Other Internal Changes</em>
Ingo made a few design changes to the Disk Device Manager. He also changed the condition variable implementation, allowing threads to wait on more than one condition. Finally he began work on job control - the feature that allows tasks from terminal to be paused and continued, backgrounded, and other stuff.
Michael Lotz did some work on BMessage - fixing behaviour in low-memory situations, and renaming message fields (which was entirely broken before).

<em>Applications</em>
Axel added a Sudoku game that includes a puzzle generator and solver with multiple difficulty levels.
Stephan made some changes to the LaunchBox applet.
Stefano continued his work on Terminal, doing some more code cleanup.
Justin O'Dell produced another patch fixing the behaviour of "Defaults" buttons in preflets.

<em>Build System</em>
Samuel Rodriguez Perez provided a patch, slightly modified by Ingo, which allows a 32-bit build of Haiku to be made on a host system with a 64-bit compiler.

<h3><a href="https://www.freelists.org/archives/openbeos/">General Mailing List</a></h3>

There was some discussion on the networking support under various Virtual Machines. Virtual PC is now supposedly available for free from Microsoft and networking is supported by the tulip driver from BeOS. Personally I use VMWare Server (also available for free) which has networking supported through the ipro1000 driver (just make sure the device is set to e1000 in your .vmx file as I mentioned <a href="/blog/tangobravo/2007-08-29/haiku_activity_update_1">last time</a>) and also supports booting from physical partitions.

Jorge aka Koki (that's his full name now, I think :)) posted a link to a poster in case people want to set up a presence at a conference or other meeting. On a related note he announced he is organising a presence at the Kansai Open Source conference on 9-10 November in Osaka, Japan. 

<h3><a href="https://www.freelists.org/archives/haiku-development/">Development List</a></h3>

Ryan Leavengood's WebKit work threw up another interesting discussion - there is a non-standard macro that doesn't compile with GCC 2.95. It was suggested he produces a more standards-compliant version and provide that back to the WebKit people.

The main discussion during the period was about "hybrid" images which include libraries built with both GCC 4 and GCC 2.95 allowing applications built with either compiler to be used side-by-side on the same system. Michael Lotz put together a system as a proof of concept and showed that it was indeed possible to run apps from both compilers. The solution he used of placing the libs for the non-standard compiler into a /lib subdirectory of the application could not really be used in a production system, but it is interesting nevertheless.

An advantage of a hybrid image is it would be possible to have Haiku applications and the main system components built with GCC 4 but still be binary compatible with the old GCC 2.95 binaries from BeOS. There are downsides to a hybrid image too though - potentially more confusion for users, perhaps some interoperability issues with addons or replicants, and lack of a clean milestone for breaking binary compatibility in the R2+ timeframe. The discussion wasn't finished as of 12:01am Tuesday, so I'll bring you more on this next week.

<h3><a href="http://www.bug-br.org.br/pipermail/glasselevator-talk/">Glass Elevator</a></h3>

Christof Lutteroth introduced a paper he had written on a new way of specifying the layout of controls in windows, leading to some discussion of different types of layout managers. Christof's uses a generalised tabular approach (aligning controls to x and y "tabs") and a constraint solver that enables it to use multiple potentially conflicting constraints to evaluate the layout. It's an interesting approach to the problem but I'm not sure how likely it is to be taken up by Haiku.

<h3><a href="https://dev.haiku-os.org">Bug Tracker</a></h3>
Perhaps next week I'll start a bugs opened/bugs closed count to stick in this section too. I generally find I've covered most of the interesting bits already.

One enhancement request that caught my attention: <a href="https://dev.haiku-os.org/ticket/1420">#1420</a> deals with changing Tracker's behaviour moving or copying files to match that of other systems - in other words merging the contents of the source folder with whatever is there already. Actually I quite like the BeOS way of doing it but I can see how it could lead to data loss for people used to the behaviour of other systems.

<h3>The End</h3>

That's it for this update. I haven't read any emails yet for the current week - but it looks like it may be a busy one. There are 75 mails in my bug-list folder in under 3 days. Sometimes I wish the project wasn't quite so active... :D