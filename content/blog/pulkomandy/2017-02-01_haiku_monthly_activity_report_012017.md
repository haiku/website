+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 01/2017"
date = "2017-02-01T20:26:14.000Z"
tags = []
+++

Hello world!

Let's see how 2017 goes in Haiku. This report covers hrev50830-hrev50928 (almost 100 or about 3 pushes per day).

<!--more-->

Drivers and hardware support
============================

UEFI support
------------

The work on UEFI continues and compatibility improves to reach more and more
machines. Note that it is not yet integrated in the default build, you have to
use jessicah's build to boot with UEFI. After installing, you can update as usual, however.

Video modes
-----------

Haiku now knows about 1360x768 and allows to use it when your display declares
support for it. This mode is used by some "HD ready" TVs as a compromise between
720p and 1080p.

Network
-------

The atheros813x driver is now up to date with FreeBSD 11. It is the first driver to be made up to date, and did not require too much changes.
We hope to see more people attempt to port drivers from FreeBSD, it shouldn't be too hard.

Package management
==================

Tools and infrastructure
------------------------

A new "Repositories" preference panel is available. It allows you to more easily manage your sources of software.
No need to revert to the command line to add (or remove) repositories.

Package updates
---------------

Package updates continue as haikuports slowly gets things in shape for beta1.
Several packages were updated to fix a broken dependency to libpng.

User interface
==============

Some polishing and fixing graphics glitches in various places, in particular to avoid text in different languages being truncated in BTabView.

Work in progress on cleaning up the print dialogs and making them more coherent accross different apps.

The download of application icons in HaikuDepot was reworked to be much faster, using a single archive with all the icons.

System internals
=======================

Axeld resumed work on BFS, adding several sanity and safety checks to make it
less susceptible to trigger the kernel debugger.

Jessicah fixed issues related to handling of UTF-32 and characters outside the 
unicode BMP. There was some mixup between UTF-16 and UTF-32 in our sources,
leading to various problems including broken display of file names, crashes in gawk, and probably several other problems.

Several small patches to fix style issues, memory leaks in rarely triggered error cases, and similar minor issues.

Tracker will not crash if you copy a special file (a device or a FIFO, for example).

A better implementation of scrypt was added for more secure password storage.

Media kit
=========

Barrett continues his work on the new BMediaClient API.

The volume control replicant now uses media server notifications instead of polling. This will avoid several problems where it would freeze (and the deskbar would freeze with it), and also help with power saving (one less reason to wake up the CPU).

Web browser and HTTP
====================

One case of deadlock, and the remaining problem with HTTP redirects, were both fixed. The web browser will no longer show the content of HTTP redirect pages, and should work much better.

Miscellaneous information
=========================

New contributors
---------------

A warm welcome to people who submitted patches this month: Kacper Kasper, Gabriel Maia, Andrew Aldridge, Murai Takashi, Sean Healy, Brian Hill, and Tsimblist. We hope to see more from you!

Google Summer of Code
---------------------

Haiku is applying to the Google Summer of Code. We were not selected the last two years, but we hope to be back this year with some new project ideas and a renewed mentor team.

Web services
------------

Now that the website migration is mostly done, waddlesplash is working on improving our Pootle (user interface translation) and user guide translation online tools. Both were largely unmaintained for the past few years, and it is great news that someone is taking care of them again.

Are we released yet?
--------------------

While the work on beta1 continues, we are not quite ready for a release yet. There is an accumulation of little problems that need to be solved one at a time.

First of all, we need to set up the "build master", a server that will control remote compilation of software packages. We want to set this up before the release, because the release will have a package repository separate from the one used for the master branch. Maintaining a single repository is a lot of work for Haiku developers, maintaining 2 in the current situation would use all the developer time. So, this system should bring some automation and make it easier to manage the package repositories.

In order to deploy this, we need a server with good internet access. While I made a prototype run on my own server, it is not meant for production use (I need my ADSL line and home-server for some other things). The plan is to set the master up on Haiku's servers. However, we need to make some space for it there. And for this, we have to wait on the migration of the website, which is complete, but the blog post comments from the old web site were not migrated yet. Once that is done, we can recycle the virtual machine formerly used for the website to run the package builder.

Another problem is that the machines doing the build are often hitting a kernel panic in BFS code. It tends to show up under workoads that create and delete lots of files, such as running a configure script. This is quite common in the usage pattern of the build bots, of course, and at least one of them will crash and stop building packages every few hours. Ideally we would fix this issue, but failing that, we will configure the bots to reboot automatically when such a crash happens, instead of waiting in the kernel debugger.

On the haikuports side, things are back to the usual quietness and people can focus on getting things ready for the release. This involves analyzing the output of the build bots, looking into why some builds fails, and fixing the recipes until we get everything building.

With these 3 issues fixed, we will be much closer to the release with a sustainable way to keep the repositories up to date. We can then move on to creating the branch on Haiiku side and making it use the generated package repository.
