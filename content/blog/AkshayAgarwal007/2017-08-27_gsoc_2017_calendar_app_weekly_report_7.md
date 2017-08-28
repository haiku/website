+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Weekly Report 7"
author = "AkshayAgarwal007"
date = "2017-08-27 03:45:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>In this post I would be focusing on the work done in the past two weeks.</p>

<p>I worked on Google Calendar integration and general improvements and bug
fixes in the Calendar App. I also worked on implementing a relative datetime
formatter and general enhancements/bug fixes involving the Haiku locale kit.</p>

<h3>Calendar App</h3>

<p>Fetching events using Google Calendar API and syncing with the database works
now. There are issues with sending JSON data in an http post request, which
always results in a parse error in the API response, as a result of which
adding/updating events to Google Calendar doesn't work currently. I would
be working to fix the same over the next few days. Deleting events from Google
Calendar works fine.</p> 

<p>Currently there is no DateTimeEdit widget. Time preferences has separate
DateEdit and TimeEdit widgets implemented. I would look into incorporating the
same or work on a DateTimeEdit widget having a calendar pop-up. Currently I have
implemented a temporary solution which provides a Calendar pop-up to select dates
and a simple text control where the time can be entered in 24-hour(HH:mm) format.
Parsing of the entered text is done using time parser implemented in BTimeFormat,
and results into 00:00 in case of error.</p>

<p>I also did some initial work on an Agenda view and improving event
notifications, but both of them required a Relative DateTime formatter, so
implemented one for Haiku as a part of locale kit.</p><br>

<p><b>Calendar Preview:</b></p>
<p><img src="/files/blog/AkshayAgarwal007/calendar_preview_3.png" alt="Calendar-Preview" class="img-responsive center-block"></p>

<p><i>The toolbar icons are just placeholder icons. Icons for the same are 
welcome. (Something on this line Day View Mockup ) 
Also improved icon for the main application icon are welcome.</i></p>

<p><b>Event Manager:</b></p>
<p><img src="/files/blog/AkshayAgarwal007/event_manager_2.png" alt="Event-Manager" class="img-responsive center-block"></p><br>

<p> These are two videos I recorded while testing the Google Calendar integration
in the app. It shows the entire flow from authorizing the app to access data from
Google Calendar to the events being synced and displayed in the app.
<br>
<a href="https://www.youtube.com/watch?v=UYJ18rEFAMI">
https://www.youtube.com/watch?v=UYJ18rEFAMI</a>
<br>
<a href="https://www.youtube.com/watch?v=qWKNSXoRG8I">
https://www.youtube.com/watch?v=qWKNSXoRG8I</a>
</p>

<p><b>Github Repo</b>: 
<a href ="https://github.com/AkshayAgarwal007/Calendar">
AkshayAgarwal007/Calendar</a></p>

<h3>Locale Kit</h3>

<ul>
    <li> Implemented a Relative DateTime formatter. This takes in a time_t 
    value and gives a formatted string such as '2 hours ago', 'in 2 hours',
    relative to the current time.<br>
    <a href="https://dev.haiku-os.org/ticket/13679">
    https://dev.haiku-os.org/ticket/13679</a></li>
    
    <li> Wrote tests for BRelativeDateTimeFormat, fixed bugs in tests for
    BDateFormat/BDateTimeFormat, and added test cases for changes I made in
    BDurationFormat earlier this summer. In the process I got familiar with how
    unit testing is done in Haiku.<br>
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
</ul>

<p>Thanks to PulkoMandy for his help in all the patches I submitted.
<br>
<p>Thanks for reading.</p>
