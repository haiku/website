+++
type = "blog"
title = "[GSoC 2017] Calendar Application: Weekly Report 3"
author = "AkshayAgarwal007"
date = "2017-06-21 04:41:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>In this post I would be focusing on the work done in the past two weeks,
issues faced and how I went about resolving them. Also, since the first
evaluation is near, the post also contains a brief analysis of the current
progress with respect to the deliverables mentioned in the proposal.</p>

<p>Issues faced and how I went about resolving them:</p>

<ol> 
    <li> I wasn't able to set the day names header in the calendar view based on
    the locale preferences, the day names always showed up in English no matter
    which language is selected in locale preferences. The Calendar view uses
    BDate::ShortDayName() which in turn uses strfime to get the day of week
    names, and it uses LC_TIME to decide which locale to use. By default it is
    set to use the "C" locale set which is a rather neutral locale with minimal
    locale information. In order to use the locale set selected in the
    environment, setlocale(LC_ALL,"") has to be called. But still work has to be
    done to update it with live changes in locale preferences.</li>

    <li>This was not an issue but still I have to look into several
    implementations in order to find a proper way do this i.e updating the date
    headers with changes in system date. I'm making the MainView in the calendar
    app accept pulse messages(using B_PULSE_NEEDED) and every time the Pulse()
    method is called I'm checking the system date and sending the state change
    message using SendNotices() to all the other subscribers(currently there is
    only one- SidePanelView that contains the date header and calendar views)
    and calling the method to update the date header in the SidePanelView class
    on receiving the message. Instead of using pulse, BMessageRunner can also be
    used to send periodic messages.</li>

    <li>There was a bit difficulty in updating the date headers and calendar
    view day name headers with live changes in locale preferences as I was
    unsure about how the handle B_LOCALE_CHANGED message. When locale preference
    are changed BApplication gets the B_LOCALE_CHANGED message, I am forwarding
    the message to SidePanelView and updating the headers based on the new locale
    preferences. Work has to be done in updating the day name headers in the
    calendar view on locale preferences change.</li>

    <li>I explored the Haiku message-passing system in details and had a few
    doubts regarding how to post and forward messages as there are similar ways
    of doing itand used interchangeably in the existing applications. Stippi and
    PulkoMandy helped me in understanding it better.</li>

    <li>In the calendar view when I change the selected day, the current day 
    doesn't remain highlighted. Also if a day which is not in the current month
    is selected, then I cannot bring the focus back to the current day
    programmatically i.e the CalendarView::SetDate() doesn't work. I am working
    to fix this.</li>
    
    <p><img src="/files/blog/AkshayAgarwal007/calendar-focus.png" alt="Calendar" 
    class="img-responsive center-block"></p>
    
    <li> This is more of a learning than an issue. Haiku uses a 32-bit time_t 
    and therefore is vulnerable to the Y2038 problem</li> So if events are set 
    to happen after the date 19-January-2038 3:14:08 AM GMT, they would cause 
    problems. Moreover the system date cannot be set to a date after Y2038
    currently. Waddlesplash has recently worked to switch to a 64-bit time_t
    and that is applicable for x86_64 build and not for 32-bit x86 and the Y2038
    will remain the same for it. We will hopefully drop 32-bit support by 2038.
    So for 32-bit x86 the calendar would not support dates after Jaunary 19th
    2038.</li>
</ol>

I also implemented preferences settings for the app. The user can enable/disable
week number and set the first day of week(which can be set to locale based first
day of week or any specific day.)

<p>Current progress with respect to the deliverables mentioned in the proposals:</p>

<h4>Community Bonding period</h4>

<ol>
    <li>Getting familiar with the community. ✓</li>
    <li>Getting familiar with the entire Haiku API: I'm getting better at it 
    as I work on different parts of the project and also my C++ skills are
    improving.✓</li>
    <li>Coming up with final wireframes: The wireframes already there are good
    for a base. Slight modifications as required can be made afterwards. ✕</li>
    <li>Look into the storage kit and explore how storing and retrieving events
    from the disk would be done. I looked into how the existing calendar app
    does that. Most are using flatfiles and messages for storing events. I also
    explored how eventual is making use of BFS attributes to store events and
    the use of SQLite3 in Haiku-TODO by Adrian.✓</li>
    <li>Look into the Weather and Haiku-TODO app(APIs for HTTP requests and json 
    handling.) This is something I did before GSoC started. ✓</li>
    <li>Begin coding as early as possible. ✓ 
        <ul>
            <li>A base app with menu bar, calendar view and locale aware date
            headers.</li>
            <li>Fix issues with BDurationFormat/BTimeFormat and BDateFormat.</li>
        <ul>
</ol>

<h4>First Month of Coding</h4>

<ol>
    <li>Write the main calendar class: For this I'm making use of the calendar
    view class from the shared kit. Noted some issues while integrating it into
    the application and would be working on fixing it. ✓</li>
    
    <li>Working on GUI for 'day view' and working on the 'Add Event' feature. In
    progress.....</li>
    
    <li>Implement app preferences settings. Not fully done. In progress....</li>
    
    <li>Debugging and resolving the issues (1-6) as mentioned earlier in the
    post. Though the 'Add Event' feature should have formed the main part of 
    the first month of coding, working on these issues took much more time than 
    expected. ✓</li>
</ol>

I would be updating my master branch. My last commit dealing with updating date
headers based on time/locale and app preferences is in the dev branch.
Github Repo: <a href="https://github.com/AkshayAgarwal007/Calendar">
https://github.com/AkshayAgarwal007/Calendar</a>

Thanks for reading.