+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #48 - More Locale Kit, buildbot and upstreaming efforts"
date = "2014-10-10T06:44:52.000Z"
tags = ["WebKit", "locale kit", "buildbot", "contract work"]
+++

Hello world!

<h3>Localekit and ICU migration</h3>

Last week I wrote the report while I was debugging a deadlock in ICU 53.1. I spent some time debugging this and I found the issue. ICU calls native functions to handle some aspects of timezones (tzset, localtime, and a few others). However on Haiku we implement these functions using ICU. This didn't work too well as ICU tried to lock a lock it was already holding during the initialization of timezone data. Fortunately the calls can easily be disabled in ICU, and that was enough to fix the issue.

While I was working on this, ICU version 54 was released. So I reworked my patches on that new version (fortunately not too much work was needed), and I uploaded the ICU 54 packages to the repositories.

With this updated version, I could continue work on improving the Locale Kit. I added parsing support to BDateFormat and BTimeFormat, which I needed for the data/time picker in WebKit. I finished the implementation of the BMessageFormat class for a first version (this raised a few concerns about design choices in the Locale Kit which may need some rework wrt locking and thread safety). I started making use of BMessageFormat in some places, and soon the translations will provide correct plural support.

I also made some other changes to the APIs, such as the addition of a format generator to ICU. This allows applications to ask things like "I want to know the appropriate date format to show only hours, minutes, and day of week". The Deskbar clock makes use of this now, and should put the fields in the correct order in all locales.

<h3>WebKit buildbot and upstreaming effort</h3>

You may know that Haiku, Inc. is the owner of 15 Mac Minis donated by the Mozilla fundation and used as build and test bots. They power most of our buildbot infrastructure. One of them was assigned to the WebKit porting effort and this week I worked on setting it up. Since our port isn't upstreamed yet, I have set up my own build master for this, and you can visit it at http://build.pulkomandy.tk . Unfortunately, the build times out because the machine is too slow (we are running Haiku in a virtual machine on rather old hardware there). We will see if the build can be made faster, or a more powerful machine found.

The build bot was a requirement for considering upstreaming our WebKit port. So I started discussing this on the WebKit mailing lists. They decided that it is not time for a complete upstreaming yet, however they suggested we start sending patches to the core parts of WebKit we had to change to get it working on Haiku. There aren't many of those, but the goal is granting one or ideally, two Haiku developpers commit access on WebKit repositories. No one else could review the Haiku specific parts of our code.

I spent part of the week reviewing our changes and submiting the relevant ones. Two small patches were already upstreamed, a tird one is still being discussed, and I will continue this work next week.

<h3>Random debugging</h3>
Using Haiku as my main system is sometimes a bit of an adventure. I had to fix some annoying issues before I could get work done:
<ul>
<li>Bash was crashing when parsing haikuports recipes with utf-8 characters. This was tracked to a missing bounds check in our widechar type management (wctype).</li>
<li>Our buildbot slave package was badly rebuilt after the Python 2.7 update and failed to run. Now it works again.</li>
</ul>

<h3>Bonus material</h3>

Here are some tasks I did outside of my paid work time for Haiku this week. They deserve some public announcement.
<ul>
<li>fRiSS, the RSS and ATOM feed reader for Haiku, was fixed for the current network kit APIs and moved to http://github.com/pulkomandy/fRiSS . Fork it and improve it!</li>
<li>I started working on the slides for my talk about WebKit at BeGeistert. I hope to meet you all there.</li>
<li>I did some work on getting DocumentViewer to run with a current version of MuPDF.</li>
<li>I fixed a BeOS compatibility issue in unarchiving BMenuFields, to get VNC Viewer running on Haiku. It seems much slower than the Linux version, however.</li>
<li>I added an haikuports recipe for mksh. In these days of shellshock, it may be a good idea to use an actively developped shell with a clean codebase.</li>
</ul>

... and that closes the report for this week.