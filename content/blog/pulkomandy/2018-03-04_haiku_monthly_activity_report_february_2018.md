+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 02/2018"
date = "2018-03-04T17:26:14.000Z"
tags = []
+++

<p>Welcome to the second monthly report for 2018!</p>

<p>This report covers hrev51791-hrev51882</p>

<h3>Infrastructure</h3>

<p>There is a lot of invisible work in progress on getting the HAiku infrastructure
migrated to a new server and streamlined to use containers and standardized setup.
This will eventually allow to better share the work of system administration in
a larger team, allowing to scale up the infrastructure.</p>

<p>Part of this work is updating our Pootle install, which will soon have a new
version up in production.</p>

<h3>Address space protection</h3>

<p>Korli is still working on better protection of the kernel memory by using user\_memcpy
as appropriate. This month he worked on usb (raw and hid) drivers, PCI msix, SCSI driver,
write\_overlay, ACPI button and battery drivers,</p>

<h3>Media Kit</h3>

<p>Barrett resumed his work on the BMediaClient. The goal is to introduce a new
class that will greatly reduce the amount of work needed to build a media node.
The original Be design for the Media Kit is rather low level, and will let
application developers do a lot of the work. While this should provide some
flexibility, eventually most common media nodes will just repeat the same
standard boilerplate code from Be Sample Code examples. So it makes sense to
provide a class already doing all that piping work and letting people writing
media nodes focus on the important part of their signal processing.

<h3>User interface</h3>

<p>Janus made a slight change to HaikuDepot to completely hide the "barber pole"
when it is not needed. Previously, a border would remain.</p>
<p>I would like to mention that Janus is also working a lot on refreshing the UI
of several old applications at HaikuArchives. So if you haven't checked out BePodder,
Slayer, or a few other of these in a few months, have a look to see the progress
he made on making them look more in line with Haiku and behave better with different
fonts and font sizes!</p>

<p>Hrishi Hiraskar made pkgman inform the user when a package is already installed.
The previous "nothing to do" message wasn't very clear.</p>

<p>KapiX made ProcessController work with up to 12 CPUs. While Haiku itself got
support for more than 8 CPUs a few years ago, it was not really getting much
testing until now. And there was a drawing problem here because ProcessController
tried to fit too much data into a 16x16px icon.</p>

<p>Humdinger modified HaikuDepot to show either the full list of packages, or
just the featured packages, and allow searching in either. Before these changes,
the application would always show only featured packages at start, but switch to
complete list mode when searching for something. We got many users confused by
this, as it wasn't obvious that searching would reveal more packages than were
shown initially. However, this makes HaikuDepot look more like a boring package
manager, rather than an application store, so we will probably need to revisit
this at some later time.</p>

<p>Andrew Lindesay also integrated some changes to continue iproving performance
and reliability of HaikuDepot and in particular the integration with the server
which provides icons, screnshots and user ratings. He started provisioning for
future API changes and continued the work on getting notifications in batches,
rather than one package at once.</p>

<h3>Kernel</h3>

<p>Xiang Fan fixed a bug in the way we handle poll()ing on /dev/null. This problem
was initially discovered while porting gsasl, which relies on proper behaviour
of polling /dev/null in their configure script.</p>

<h3>C library</h3>

<p>Kallisti5 added an mkstemps function, which is a BSD extension but commonly
available on other operating systems.</p>

<h3>Build system</h3>

<p>kallisti5 made some fixes to try to get the PowerPC bootstrap running. He also
found some problems with the scripts not checking hard enough to make sure that
a toolchain was available.</p>
