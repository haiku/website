+++
type = "blog"
title = "[GSoC 2017] Preferences GUI Refactoring - Weekly Report 2"
author = "anirudhm"
date = "2017-06-06 23:55:16+05:30"
tags = ["haiku", "gsoc", "gsoc2017", "preferences"]
+++

Hello World.

This is my first blog post after the Coding Period officially began, I've started to write code for the application. During the Community Bonding period, I got the menu listing for **SuperPrefs**. My last exam got over on June 6. I worked on the basic application layout during the beginning of June. This was how the application looked initially:

<p><img src="/files/blog/anirudhm/week0.png" alt="Week 0 work" class="img-responsive center-block"></p>

The application hosts seperate sections for holding the Preferences based on their category. I also added a Search field for searching the contents of an application, though this has not been implemented yet.

Now, in order to feed the contents of the app, i.e, the Preferences icon and to launch the respective application. I looked for samples in Haiku, and found axeld has done a good job in building the application **FileTypes**, I made use of MimeTypeListView and IconView for integrating the list of preferences in the app.

<p><img src="/files/blog/anirudhm/week1.png" alt="Week 1 work" class="img-responsive center-block"></p>

Also I had to make use of is_application function from FileTypes.h, I'll now have to work on just keeping the Preferences related apps and removing other entries, and make use of BRoster class to launch the respective application. Then have to work on categorising these apps into their categories. Now that my exams are done, I can dedicate more time for this project. I'll be updating the code progress along with the preview of the application status in the GitHub repo: [AnirudhMurali/SuperPrefs](https://github.com/AnirudhMurali/SuperPrefs).

That's it for now, Thanks for reading. 😄
