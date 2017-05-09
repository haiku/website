+++
type = "blog"
title = "[GSoC 2017] Calendar Application"
author = "AkshayAgarwal007"
date = "2017-05-08 06:51:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<h3>Introduction</h3>

<p>Hello I'm Akshay (IRC/Trac: akshay, GitHub: AkshayAgarwal007) from Kolkata, India. I would be working on developing a native <b>Calendar Application</b> for Haiku as a part of Google Summer of Code 2017. My mentors for the project are Scott McCreary and Kacper Kasper. I am very excited for this project.</p>

<h3>Why a Calendar Application? Isn't there already one?</h3>
<p>A Calendar application is a must have application for any operating system and would be beneficial for end users as well as developers. Haiku doesn't have a calendar application yet. There are a few existing 3rd party Calendar apps out there, but none are close to a simple and elegant Calendar app that an end user would like to use, with all the necessary features a modern Calendar app should have.</p>

<p>Also the existing ones (<a href ="https://github.com/HaikuArchives/Borg"><b>Borg</b></a>, <a href="https://github.com/HaikuArchives/A-Book"><b>A-Book</b></a>, <a href="https://github.com/HaikuArchives/Organizer"><b>Organizer</b></a>, <a href="https://github.com/HaikuArchives/Eventual"><b>Eventual</b></a>) have issues of their own and hence I would be writing one completely from scratch, referring them wherever required.</p>

<h3>Features the Calendar app would have</h3>
<p>I reviewed a bunch of Calendar apps on other platforms and came up with a subset of necessary features to be implemented:</p>
<ul>
    <li> Create, modify and synchronise events.</li>
    <li>Set event reminders.</li>
    <li>Display Day, Month Calendar views.</li>
    <li>Set event color.</li>
    <li>All day long events, recurring events.</li>
    <li>Google Calendar integration.</li>
    <li>A minimal look with intuitive UI design.</li>
</ul>

<h3>Future features</h3>
<p>These are the features that I plan to work upon after GSoC:</p>
<ul>
    <li>Support for alternate calendars.</li>
    <li>Categorize events.</li>
    <li>Search for events.</li>
    <li>Week, Year View.</li>
    <li>Timeline view for a single day/week.</li>
</ul>

<h3>Google Calendar Integration </h3>
<p>This is one of the most important feature the Calendar app would have. It is a must have so that the users can get their events synchronised between devices and other platforms they use. Since almost all the calendar apps have a Google Calendar integration, this would be the best way to achieve event synchronisation.</p>
<p>A Google Calendar API client would be written using Haiku APIs and would be integrated into the application.</p>

<h3>Wireframes</h3>
<p>These are some tentative designs for the Calendar application.</p>

<h4>Add Event</h4>
<ul>
    <li>I would be coming up with a final design for this, incorporating all the options required for supporting recurring events and an event color picker.</li>
</ul>

<p><img src="/files/blog/AkshayAgarwal007/add-event.png" alt="Add Event"></p>

<h4>Day View </h4>
<ul>
    <li>All day long events would be pinned to the top.</li>
    <li>Right click on an event will open a context menu with three options (View, Modify, Delete)</li>
    <li>View will open the entire event details in read only mode. Modify and Delete options would also be available inside View mode.</li>
    <li>Using the calendar widget in the side panel, user can navigate through months. Buttons to navigate one month at a time can be replaced by a dropdown to simply select month+year for user's ease.</li>
</ul>

<p><img src="/files/blog/AkshayAgarwal007/day-view.png" alt="Day View"></p>

<h4>Month View</h4>
<ul>
    <li>Clicking on a particular day in month view will show events of that day in side panel.</li>
    <li>Again the buttons to navigate one month/year at a time can be replaced by a dropdown to simply select month+year for user's ease.</li>
</ul>

<p><img src ="/files/blog/AkshayAgarwal007/month-view.png" alt="Month View"></p>

<p>I would be finalising the user interface design in the upcoming week and suggestions from you all would be highly valuable for the same.</p>

<h3>Icons</h3>
<p>I plan to use the following icons in the application (icons be Michele Frau [Zumi] are really cool):</p>
<ul>
    <li><b>Main Application</b> icon: <br>http://zumi.xoom.it/myhaiku/3rd%20party%20apps/schedule%20r3.png</li>
    <li><b>Add Event</b> toolbar icon: <br>http://zumi.xoom.it/myhaiku/btoolbar/document%20open%20recent.png</li>
    <li>I would be needing a <b>Calendar</b> toolbar icon similar to one in the wireframes.</li>
</ul>

<p>Apart from this I would also be working on to improve date/time classes in Haiku as required for the application.</p>

<h3>References</h3>
<ul>
    <li><a href="https://drive.google.com/file/d/0BxAs33Lm1mJwNkItUnFoWGlRZnc/view?usp=sharing">PDF copy of my GSoC Proposal</a></li>
    <li><a href="https://sourceforge.net/projects/eventual/files/Documentation/">Eventual Documentation</a></li>
    <li><a href="https://wiki.gnome.org/Design/Apps/Calendar">GNOME 3 Calendar App Design</a></li>
</ul>