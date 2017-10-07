+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 09/2017"
date = "2017-10-07T20:26:14.000Z"
tags = []
+++

<p>I was kindly reminded over the IRC channel that it's time for the monthly report once again. So, there we go!</p>

<p>This report covers revision 51402 to 51464.</p>

<h3>Graphics</h3>

<p>Some efforts this month on the radeon_hd driver, as kallisti5 and jessicah have teamed up to identify
remaining issues with displayport and started working towards multi-head support.</p>
<p>Kallisti5 also cleaned up the remote app_server as well as the HTML5 drawing backend (which should allow to have Haiku run remotely and render the user interface in a web browser).</p>

<h3>Network</h3>
<p>Korli reverted some changes to the ipro1000 driver, which accidentally changed files for the old Haiku-native driver instead of the current FreeBSD-ported one. The two drivers would then both try to drive the same network card, leading to confusion and non-working network.</p>

<h3>User interface</h3>

<p>John Scipione removed the tooltip about WebPositive tabs close button which would sometimes read "New tab"</p>
<p>John also added a resize knob to Deskbar, so you can now use it with your preferred width (or height, for those running Deskbar in horizontal mode).</p>
<p>Waddlesplash removed some legacy code from app_server and prepared BControlLook so it can be overriden by add-ons. The long-term goal is to provide themability to Haiku, similar to GTK engines.</p>
<p>A drawing bug in the Mac decorator was also fixed, so windows without title look better now.</p>
<p>PulkoMandy fixed DiskUsage to give correct results on the /system volume, where both packages and their content (which is not actually extracted on disk) would be taken into account.</p>
<p>Perelandra completely reworked the Notification preferences, with the goal of turning them into a true Notification Center (with history and everything).</p>

<h3>C library</h3>

<p>Jessicah implemented BSD extensions to endian.h, allowing to swap various integer types from one endianness to the other.</p>
<p>Korli added posix_spawn and wait4 implementations, which will help with the ongoing port of the Swift programming language.</p>
<p>Some changes from the "TCP improvements" GSoC project were found to create regressions in some cases (stalled network transfers or no network at all), they have been reverted for now while the problems are being investigated.</p>

<h3>Cross compilation tools</h3>

<p>As part of her efforts on keeping the Haiku port of Rust up to date, jessicah introduced a Dockerfile and shell script to ease set up of a cross-compiler
for Haiku applications. This will be used to build Rust, but is also being considered by the Netsurf team as they need Java 8 to run the latest version of
Jenkins, and that is not possible with their current setup of running the build inside Haiku. A cross compiler would allow them to use a Linux machine for
the same purpose.</p>

<h3>Locale Kit</h3>

<p>some patches from Akshay Agarwal were merged to fix some errors in Haiku's calendar view, which would offset the start of week by one day (so monday would show as sunday, and so on)</p>

<h3>Terminal</h3>

<p>Terminal now advertises itself as xterm-256color. This leads to more console applications trying to use extra features, and uncovered some bugs in escape sequences parsing.</p>
