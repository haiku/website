+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Final Report"
author = "AkshayAgarwal007"
date = "2017-08-28 11:55:10+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>Google Summer of Code 2017 is off to an end and in this report I'll
be summarizing the work done throughout the summer.</p>

<p><a href="https://www.haiku-os.org/blog/akshayagarwal007/2017-05-08_gsoc_2017_calendar_application/">
Introductory blog post</a></p>

<p> Source code: <a href="https://github.com/HaikuArchives/Calendar">
https://github.com/HaikuArchives/Calendar</a></p>
<p> List of all blog posts:
<a href="https://www.haiku-os.org/blog/akshayagarwal007/">
https://www.haiku-os.org/blog/akshayagarwal007/</a></p>
<p> List of all Commits:<br>
<a href="https://github.com/HaikuArchives/Calendar/commits/master">
https://github.com/HaikuArchives/Calendar/commits/master</a><br>
<a href="https://github.com/haiku/haiku/commits?author=AkshayAgarwal007">
https://github.com/haiku/haiku/commits?author=AkshayAgarwal007</a></p>

<h3>What has been completed</h3>

<p><b>Calendar App</b></p>

<p>The Calendar app currently has the following features implemented:</p>

<ul>
    <li>Create, modify and delete events.</li>
    <li>Generate notifications for events.</li>
    <li>Display Day Calendar view.</li>
    <li>Event categorization.</li>
    <li>Set all day long events.</li>
    <li>Fetching events from Google Calendar using Google Calendar API.</li>
    <li>SQLite backend for storing events.</li>
    <li>Setting preferences like 'First day of week',
    'Display week number in Calendar'.</li>
    <li>App localization: DateTime strings are localised and updates with
    locale preferences changes but GUI string still needs to be localised.</li>
</ul>


<h3>What's left to do (After GSoC)</h3>

<ul>
    <li>Localizing the app's GUI strings</li>
    <li>Implement month view</li>
    <li>Fix adding/updating events to Google Calendar</li>
</ul>

<p>There are many features that a Calendar app in the present world requires and
all of it couldn't be completed in the summer. Apart from the 'future features'
which I already mentioned in the proposal, throughout the course of the work I
came across many features (based on discussions throughout the project and
suggestions on my blog posts) which the app would require and I opened <a href="https://github.com/HaikuArchives/Calendar/issues">issues</a> for the
same in the repo so that they don't get lost.</p>


<h3>Other work</h3>

<p>Apart from working on the Calendar App I also submitted patches to Haiku mostly
involving the Locale Kit.</p>

<ul>
    <li> Implemented a Relative DateTime formatter. This takes in a time_t 
    value and gives a formatted string such as '2 hours ago', 'in 2 hours',
    relative to the current time.<br>
    <a href="https://dev.haiku-os.org/ticket/13679">
    https://dev.haiku-os.org/ticket/13679</a></li>

    <li> Wrote tests for BRelativeDateTimeFormat, fixed bugs in tests for
    BDateFormat/BDateTimeFormat, and added test cases for changes I made in
    BDurationFormat. In the process I got familiar with how unit testing is
    done in Haiku.<br>
    <a href="https://dev.haiku-os.org/ticket/13682">
    https://dev.haiku-os.org/ticket/13682</a><br>
    <a href="https://dev.haiku-os.org/ticket/13684">
    https://dev.haiku-os.org/ticket/13684</a><br>
    <a href="https://dev.haiku-os.org/ticket/13685">
    https://dev.haiku-os.org/ticket/13685</a></li>
        
    <li> I worked on parts of the existing codebase to make use of locale kit
    for doing relative datetime formatting. For e.g the Web+ downloads Window
    doesn't make use of it completely. This is still under progress.<br>
    <a href="https://dev.haiku-os.org/ticket/13686">
    https://dev.haiku-os.org/ticket/13686</a></li>
    
    <li> Fix style formatting issues in BTimeUnitFormat/BDurationFormat.</li>
    
    <li>Highlight the current system date in the Calendar View.<br>
    <a href="https://dev.haiku-os.org/ticket/13592">
    https://dev.haiku-os.org/ticket/13592</a></li>
    
    <li> Implement functions to get localized long/short dayofweek name and short
    month name in BDateFormat. Some other improvements that is required also
    came along is discussions which I would also be working on. This is still
    under progress.<br>
    <a href="https://dev.haiku-os.org/ticket/13606">
    https://dev.haiku-os.org/ticket/13606</a></li>
</ul>

<p> All my commits can be viewed here at a glance.
<a href="https://github.com/haiku/haiku/commits?author=AkshayAgarwal007">
https://github.com/haiku/haiku/commits?author=AkshayAgarwal007</a></p>

<h3>Plans after GSoC</h3>
<ul>
    <li>Fix adding/updating events to Google Calendar. </li>
    <li>Work on the features I have opened as issues in the repo and maintain
    the code.</li>
    <li>Complete the work left in the pending trac tickets. Work on improving
    the locale kit and pick some other areas concerning the Haiku source, and
    try to contribute to Haiku regularly.</li>
</ul>

<h3>Learnings</h3>
<ul>
    <li>C++ and coding skills in general have improved.</li>
    <li>Git skills have improved.</li>
    <li>Communications skills: Convey myself to the mentors properly.</li>
    <li>Localization and Internationalization.</li>
    <li>Good indentation practices while coding.</li>
    <li>Getting familiar with operating system internals.</li>
</ul>
    
<h3>Note of Thanks</h3>

<p>My sincere thanks to my mentors <b>Scott McCreary</b> and <b>Kacper Kasper</b>
for their support and help throughout the project. Special thanks to <b>Scott
McCreary</b> and <b>Adrien Destuges</b> to help me out in every issue I faced
right from day one(GSoC proposal period) from getting Haiku installed to be able
to complete the project. I'm very grateful to the Haiku members:
<b>Waddlesplash</b>, <b>Humdingerb</b>, <b>Brian</b> and everyone there,
community members and also my fellow GSoC mates for their help throughout.</p>

<p>Thanks for reading.</p>
 