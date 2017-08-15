+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Weekly Report 6"
author = "AkshayAgarwal007"
date = "2017-08-11 02:41:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p> Hello Everyone!</p>

<p>In this post I would be focusing on the work done in the past two weeks.</p>

I implemented a database backend and worked on generating notification for
events. Currently, I am using SQLite3 for data storage, but I would be implementing
a BFS backend for the same sooner. Google Calendar integration is currently in
progress. Also there is an issue with date/time parsing and formatting in the
app which I would be fixing.

I also worked on fixing several issues (bugs/enhancements) which were
opened by Humdingerb, Brian, and Scott and few more that came up when I was
testing the app myself.

I also opened some issues as a reference to mark the features and enhancements
that I would be working on (based on discussions throughout the project
and suggestion on my blog posts) after the end of GSoC and if time permits
before it. You can have a look at the same and the ones that are already
resolved <a href= "https://github.com/AkshayAgarwal007/Calendar/issues">
here</a>. Also new issues for features that you want to get implemented or if I
have missed any are welcome. :)

<h3>Current state of the app:</h3>

<p><b>Calendar Preview:</b></p>
<p><img src="/files/blog/AkshayAgarwal007/calendar_preview_2.png" alt="Calendar-Preview" class="img-responsive center-block"></p>

<p><i>The toolbar icons are just placeholder icons. Icons for the same are 
welcome. (Something on this line Day View Mockup ) 
Also improved icon for the main application icon are welcome.</i></p>

<p><b>Event Manager:</b></p>
<p><img src="/files/blog/AkshayAgarwal007/event_manager.png" alt="Event-Manager" class="img-responsive center-block"></p>

<p><b>Category Manager:</b></p>
<p><img src="/files/blog/AkshayAgarwal007/category_manager.png" alt="Category-Manager" class="img-responsive center-block"></p>

<p><b>Preview of Event Notifications and changes in date/time strings on system
locale preferences change.</b></p>

<p><img src="/files/blog/AkshayAgarwal007/notification_locale_preview.gif" alt="Notification_Locale_Preview" class="img-responsive center-block"></p>

<p><i> Event notifications in general requires a lot of improvement and I would
be working on the same. Discussion on the same. https://github.com/AkshayAgarwal007/Calendar/issues/28</i></p>

<p> This is a short video I recorded while testing the app. You have to be
patient while watching the video.<br>
<a href="https://www.youtube.com/watch?v=yvVP2VliCNA">https://www.youtube.com/watch?v=yvVP2VliCNA</a></p>

<h3>Next Goals</h3>

<ul>
    <li> Google Calendar Integration (Currently in progress)</li>
    <li> Cleaning up the code </li>
    <li> Writing documentation and a blog post summarizing all the work
    done during GSoC.</li>
</ul> 

<br>
<p><b>Github Repo</b>: 
<a href ="https://github.com/AkshayAgarwal007/Calendar">AkshayAgarwal007/Calendar</a></p>
<br>
<p>Thanks for reading.</p>
