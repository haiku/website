+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - November 2016"
date = "2016-11-29T19:37:29.000Z"
tags = []
+++

Hi there!

The autumn season is here, and the winter is coming soon. For Haiku this means
several things. In particular, this month there was the Capitole du Libre with
two talks about Haiku (you can read more about that in mmu_man's short report),
and also the start of the Google Code-In, with the first students claiming their
tasks yesterday.

Anyway, let's have a look at what's cooking in the source tree. This report covers
hrev50665-50717.
<!--more-->
<h3>Networking</h3>

Some fixes to BUrl allow it to handle URLs without a protocol or authority. In
particular, this makes it possible to open local HTML files in Web+ again.

<h3>Media</h3>

Fixed a crash when playing HTML5 audio or video. There are still some rough
edges as this is now using the HTTP support in Media Kit directly, but the issues
are being worked on.

Barrett started working on a new BMediaClient class. This is currently a wrapper
around the existing media node system, with the goal of making the media kit
easier to use. This is a work in progress, so be careful when using it: the API
may change at any time. The goal is to convert all media nodes in Haiku to this
new API first, and then advertise it to other apps once we are satisfied with
the new design.

<h3>User interface</h3>

The bookmark bar in WebPositive was improved a little to fix some drawing glitches
and make it easier to use and configure.

The MIDI sound font settings were reworked to be more clear and simpler.

Janus is back with several fixes in different places. The success and failure
colors in Appearance work as expected again, Magnify got some cleanup and bugfixes,
the Windows and Mac decorators are building again.

<h3>E-Mail</h3>

There is some work on updating and completing the "provider info" database, to
allow easier configuration on more e-mail providers. This database provides
connection information (POP, IMAP and SMTP server addresses, ports, authentication
methods, etc) depending on the mail domain. When properly completed, all you need
to create an account is entering the mail address and the password.

<h3>Terminal</h3>

Some new escape sequences were implemented, to make Terminal properly handle
current ncurses versions. It is possible to use nano (and other ncurses apps)
without display glitches again.

<h3>EFI support</h3>

jessicah merged her branch with work on EFI support. This work was started by
tqh, with the goal of making it possible to boot Haiku on EFI machines.
While this is not working yet (the kernel crashes with memory access errors when
started that way), it is now available in the main development tree for people
to work on it.

<h3>Packages</h3>

Besides the routine updates (too much to mention), FreeType was updated to the
latest version (2.7) and the default system font switched from DejaVu to Noto,
which provides coverage of more languages.

The x86_64 version of Haiku got a mass-update, where all packages were moved to
the most recent available version.