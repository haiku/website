+++
type = "blog"
title = "[GSoC 2017] First two weeks of Community Bonding"
author = "AkshayAgarwal007"
date = "2017-05-18 08:51:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

<p>Hello Everyone!</p>

<p>In my previous post I introduced you all to the <b>Calendar Application</b>
project that I would be working upon as a part of GSoC 2017. In this post I 
would be focusing on my first two weeks of the community bonding period.</p>

<h3>Getting to know people</h3>

<p>The first few days were spent in exploring more about the Haiku community,
getting to know the mentors and fellow students, and learning in details
about their project through their blog posts. All the projects are geared to
take Haiku forward and it would indeed be an awesome summer for Haiku.</p>

<p>I would like to thank the community members for their feedback on my
introduction blog post. Their excitement for a Calendar application makes me
even more excited to develop a lovely Calendar application for the
community.</p>

<p>Haiku has a beautiful community. All the members are cool and helpful, I
would like to mention about a few of them.</p>

<ul>
    <li><b>PulkoMandy</b>: He's always there for you. Any issue you face and 
    he'll resolve it in seconds. I am getting to learn a lot from him.</li>
    <li><b>Scott</b>: Very helpful and motivating, will always point you to the
    right direction. I have a nice time talking to him.</li>
    <li><b>waddlesplash</b> and <b>humdinger</b>: Always ready to help, and
    have helped me a lot with my PRs to apps in Haiku Software
    Archives.</li>
    <li><b>anirudhm</b>, <b>digib0y</b> and <b>vivek</b>: Awesome guys, it's 
    nice discussing stuff with them.</li>
</ul>


<h3>Things successfully done</h3>

<p>I worked on fixing style formatting issue with BDurationFormat and
BTimeUnitFormat classes which are a part of Locale Kit.</p>

<p>BDurationFormat is used to format time intervals in a localised way i.e it
takes in a time interval and converts it to a string such as "10 hour, 2
minutes, 28 seconds". There are two formatting styles supported: full name and
abbreviated name. For example, for English, the full name for hour duration is
"3 minutes", and the abbreviated name is "3 min".</p>

<p>But the abbreviated style didn't work because the BTimeUnitFormat class 
didn't incorporate the same. I submitted a patch to resolve this and it got 
successfully <a href="http://cgit.haiku-os.org/haiku/commit/?id=hrev51173">
merged</a> (thanks to PulkoMandy). The abbreviated style works fine now.</p>

<p>Screenshot of <a href ="https://github.com/HaikuArchives/TimeTracker">
TimeTracker </a>app showing abbreviated style:</p>

<p><img src="/files/blog/AkshayAgarwal007/timetracker-abbr.png" alt="TimeTracker" 
class="img-responsive center-block"></p>

<p><b>Issues that I faced and how I resolved them:</b></p>

<ul>
    <li>I faced difficulties in pointing to the changed headers (rather than the 
    one in system/develop) while compiling the test application. I used the -I 
    flag with gcc pointing to the changed headers to get it done.</li>
    <li> I was not able to link the test application to the newly built
    libbe.so. I fixed it by adding the newly built libbe.so inside a <i>lib</i> folder 
    next to my executable.</li>
    <li> For getting a new build of libbe.so after my changes to files in the 
    locale kit, I simply did <i>jam libbe.so</i> from within root of my Haiku clone 
    instead of compiling the entire source. Initially I was compiling the entire
    source and it was taking a lot of time. 
    </li>
</ul>

<p> I was able to resolve the issues quickly with <b>PulkoMandy's</b> help.</p>

<h3>The Calendar App</h3>

<p>I have started experimenting with the GUI. I am currently putting my code here:
<a href="https://github.com/AkshayAgarwal007/Calendar">AkshayAgarwal007/Calendar
</a>. I started with adding a simple toolbar to a window and adding some vector
icons to the toolbar buttons.</p>

<p><b>Issues that I faced and how I resolved them:</b></p>

<ul>
    <li>I took one of the icons from 
    <a href="http://zumi.xoom.it/myhaiku/btoolbar/index.html">here</a>, exported 
    it as HVIF Rdef using Icon-O-Matic, copied the hex representation into a 
    .rdef file. Loaded the vector icon into a BBitmap object and passed it as a 
    parameter to BToolBar::AddAction(). But the icons were not aligning properly
    in the toolbar buttons.<br><br>The reason for the same was that the icons 
    have transparent area to the right and bottom i.e they are 32x32px in size 
    but only a 22x22px area in the corner is used.<br><br> So I rendered the 
    icon to a 32x32px bitmap and copied the required region in the corner to a 
    22x22px bitmap using BBitmap::ImportBits(). Finally, it got aligned 
    perfectly.</li><br>

    <li> Also I wasn't the handling the BBitmap object properly. BBitmaps are 
    expensive, since they create a full drawing context and thread in the 
    app_server. B_BITMAP_NO_SERVER_LINK flag can be used while creating a 
    BBitmap object to make it cheap to create but such a bitmap is not drawable. 
    BBitmap::ImportBits() would work fine with this bitmap.<br><br> The 
    following two commits can be helpful for anyone facing similar issues: 
    <a href="https://github.com/AkshayAgarwal007/Calendar/commit/3f565bdeda85cb6aa07ddb255a99ad808364a41f">AkshayAgarwal007/Calendar@3f565bd</a><br>
    <a href="https://github.com/AkshayAgarwal007/Calendar/commit/8b7128f76a6cdbb51eed3701a57d7dc65424762d">AkshayAgarwal007/Calendar@8b7128f</a></li>
</ul>

<p><b>Stippi</b> and <b>PulkoMandy</b> helped me in getting it done right.</p>

<p><img src="/files/blog/AkshayAgarwal007/calendar-toolbar.png" alt="Calendar" 
class="img-responsive center-block"></p>

<p><i>The icons are just placeholder icons.</i></p>

<p>Next I would be doing some more experimentation with the GUI, and dive into
doing some base work/research towards the Google Calendar integration and
storage part. Also would be working towards finalising the left mockups.</p>

<h3>Learnings</h3>

<ul>
    <li>Bitmaps are expensive and should be handled properly. While creating a 
    BBitmap object, B_BITMAP_NO_SERVER_LINK flag can be used when calling the 
    constructor to make it less costly, but they are not drawable.</li>
    <li>i18n and L10n in general, ICU, and Haiku Locale kit.</li>
    <li>Writing good software (source: 
    <a href="https://www.haiku-os.org/docs/HIG/index.xml">Haiku HIG</a>).</li>
    <li>Compiling Haiku components and testing them.</li>
</ul>

<p>Altogether, it's a nice experience till now, and I am enjoying working on the 
project very much.</p>
