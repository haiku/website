+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Weekly Report 4"
author = "AkshayAgarwal007"
date = "2017-07-11 08:51:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>It has been three weeks since my last blog post. In this post I would update
you with the current progress on the Calendar Application.</p>

<p>I have been working on the following since the past three weeks:</p>

<ul>
    <li>Writing the Event and Category class.</li>
    <li>Working on UI of Event Manager.</li>
    <li>Working on UI of Category Manager and Category Edit Window.</li>
    <li>Working on a pop-up Calendar control to select event start and end date.</li>
    <li>Working on the Calendar View class to highlight the current system
    date.</li> 
    <li>Fixing bugs in the existing code and improvements.</li>
    <li>Working on Add/Modify/Delete events functionality.</li>
    <li>Exploring existing Haiku applications to look for widgets, trying to
    implement new ones(For e.g DateTimeEdit - to select calendar start and end 
    date)</li>
</ul>

<h3>Add/Modify/Delete events</h3>

<p>Basic Add/Modify/Delete events functionality is complete now. There has been
a little change from the initial mockups. Instead of switching views(I thought
of using the BCardLayout initially to switch been Day View and Add Event
section) and showing the Add Event section in the MainWindow, there will be a
separate Event Manager window for it. Event details such as Event's name, place,
description, start and end date/time can be filled. Also an event can be made
an all day event which will make it appear on the top of the Day View. Event
recurrence is not implemented currently and event category is not complete so
it's disabled for now. Because of not having a DateTimeEdit currently there's
just a text control that shows the date selected in Calendar View and a dummy
time. Also the calendar pop-up control is under work which would be a part of
DateTimeEdit. Currently, for storing purposes I am using BMessage and flat
files.</p>

<h3>Highlight the current system date in the Calendar View.</h3>

<p>In BCalendarView presently, there is no notion of a current date and the
current date is not highlighted. So in the deskbar tray calendar which uses
BCalendarView, we cannot know the current date once we change the selected day.
Also, in the Calendar app where the same BCalendarView is used, not having the
current day highlighted doesn't make it intuitive. I worked on it. Made the 
BCalendarView accept pulse messages, check for system date with every pulse
message and update the current date accordingly. Highlight the current date by
rendering its day number text in a different color
(keyboard_navigation_color).</p>

<a href="https://dev.haiku-os.org/ticket/13592">
https://dev.haiku-os.org/ticket/13592</a>

<p><img src="/files/blog/AkshayAgarwal007/calendar-highlight.png" alt="Calendar-View" class="img-responsive center-block"></p>

<p>A preview of the current state of the application.</p>

<p><img src="/files/blog/AkshayAgarwal007/add-event.gif" alt="Add-Event" class="img-responsive center-block"></p>

<h3>Next Goals</h3>

<ul>
    <li> Setting reminder and generating notification for events. </li>
    <li> Month View </li>
</ul>

<p><b>Github Repo</b>: 
<a href ="https://github.com/AkshayAgarwal007/Calendar">AkshayAgarwal007/Calendar</a></p>

<p>Thanks for reading.</p>
