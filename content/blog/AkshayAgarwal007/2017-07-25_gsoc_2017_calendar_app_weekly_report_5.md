+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Weekly Report 5"
author = "AkshayAgarwal007"
date = "2017-07-25 10:47:02+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>It's been more than a week since I wrote my last blog post. In this post I 
would brief you on the work done during this time.</p>

<p>I spent a little more time digging into the Haiku source (mostly the locale 
kit) to work on bugs and possible improvements as I came across quite a few
places that would require it, while working on the Calendar app.</p>

<p>The current date is now highlighted in BCalendarView. This can be seen in the
deskbar calendar. I fixed a few bugs with my first commit regarding the same.</p>

[Commit 1](https://github.com/haiku/haiku/commit/8013f2e07d73a3b754629cac1798f059ec20c38d)
<br>
[Commit 2](https://github.com/haiku/haiku/commit/b32b6a8633ac957ecc34f78c124768a4735f61f6)

<p>I worked on implementing functions in BDateFormat to fetch locale based
short/long day of week names and short month names which would be used
in the calendar app as well as to fix a bug in BCalendarView where the day names
doesn't update with change in locale preferences. The discussion came out with
more improvements that I would be working on.</p>

<a href="https://dev.haiku-os.org/ticket/13606">https://dev.haiku-os.org/ticket/13606</a>

<p>In the Calendar app I have been working on implementing event notifications
and month view and they are in progress. I also worked on storing and loading of
app preferences and refactored the way it was previously implemented. I also
improved the day view UI and included category indicator in event list items
(blue indicates default category). KapiX's <a href="https://github.com/KapiX/Koder">
Koder</a> and Humdingerb's <a href="https://github.com/humdingerb/quicklaunch">
QuickLaunch</a> were useful resoruces in implementation of preferences settings
and work on event list view respectively. Thanks to them.</p>

<p><b>Preview of current state:</b></p>
<br>
<p><img src="/files/blog/AkshayAgarwal007/calendar_preview.png" alt="Calendar-Preview" class="img-responsive center-block"></p>

<p><i>The toolbar icons are just placeholder icons. Icons for the same are welcome. 
(Something on this line <a href="https://www.haiku-os.org/files/blog/AkshayAgarwal007/add-event.png">
Day View Mockup </a>) Also improved icon for the main application icon
are welcome.</i></p>
<br>
<p><b>GitHub Repo</b>:
<a href="https://github.com/AkshayAgarwal007/Calendar">AkshayAgarwal007/Calendar</a></p>
<br>
<p>Thank you for reading.</p>
