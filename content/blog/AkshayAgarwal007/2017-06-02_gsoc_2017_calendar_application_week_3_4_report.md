+++
type = "blog"
title = "[GSoC 2017] Week 3-4 of Community Bonding"
author = "AkshayAgarwal007"
date = "2017-06-04 08:41:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p> In this post I would be focusing on my last two weeks of community bonding.
The coding period has officially began on 30th, although I had already started
it in my second week itself.</p>

<p>I had one or two different things in mind for this week as I mentioned in my
previous post. But I ended up working on implementing a locale aware date
header, and the calendar widget, which is more important initially as to 
implement the basic functionalities of the calendar app, and is also the first 
goal. In the process, I also gained a better understanding of the locale kit 
and Haiku date/time classes.</p>

<h3>Things Done</h3>

<p>The BDateFormat class is used for formatting dates based on the locale.
For e.g if you have English(United States) selected in formatting options, for
a full format, it will give Saturday, June 3 2017 whereas for French(France) it
will give samedi 3 juin 2017. Note the difference in the fields order for the
two formatting options (in case of English, month comes before day whereas
it's the opposite in French). Also the order differs for the same language in
different countries. For e.g English(United Kingdom) will give Saturday, 3 June
2017 compared to the English(United States) one. Moreover the locale preferences
can be set to use a particular formatting style, but use the month/day names
from the preferred language.</p>

<p>So for splitting the formatted date string into separate strings for month,
dayofweek etc. knowing the order of fields and start/end offset of each field
in the string is necessary. I ran into an issue when I was implementing a
locale aware date header with splitting the string because in 
<a href="https://www.haiku-os.org/docs/api/classBDateFormat.html#a662050ad20c494ce4212b6d52135eda2">
BDateFromat::GetFields()</a> (the function that gives the field type) the day of
week case was not being handled. It took some time to understand the issue but
with help from Duggan and PulkoMandy I was able to resolve it. The
<a href="https://github.com/haiku/haiku/commit/ec6735b5961b68e85cfbafbcd5a0763cf43b519a">
fix</a> was a minor one though. I also explored the unit testing framework as
PulkoMandy suggested.</p>

<p>In the calendar widget the user can currently navigate through
months(month names are locale aware). It makes use of the calendar view from the
shared kit which is also used in the calendar widget in Deskbar tray and Time
preferences.</p>

<p><img src="/files/blog/AkshayAgarwal007/calendar-locale-header.png" alt="Calendar-Locale-Header" class="img-responsive center-block"></p>

<p><i>Screenshot of Calendar App showing the date header(locale aware) and
calendar widget.</i></p>

<p>The code for the same is here:
<a href="https://github.com/AkshayAgarwal007/Calendar">https://github.com/AkshayAgarwal007/Calendar</a></p>

<p>Also there are minor peculiarities I have noted with the calendar view i.e if
we change the selected day, the current day should always remain highlighted
(which should ideally happen) but it doesn't in the calendar view. Also maybe
the day of week header can be made locale aware.</p>

<p>Moreover none of the existing calendar apps for Haiku make use of the locale
kit, Haiku date/time classes and the calendar view.</p>

<p>Next I'll be writing the event class and would be working on GUI for Add
Event section as well as the Day View.</p>
