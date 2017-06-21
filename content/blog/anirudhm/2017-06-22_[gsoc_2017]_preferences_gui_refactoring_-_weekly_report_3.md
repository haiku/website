+++
type = "blog"
title = "[GSoC 2017] Preferences GUI Refactoring - Weekly Report 3"
author = "anirudhm"
date = "2017-06-22 03:06:12+05:30"
tags = ["haiku", "gsoc", "gsoc2017", "preferences"]
+++

Hello World.

Now that we're almost near to the first evaluation, and also it's been 2 weeks since my last blog post. The last blog post had a plain vanilla GUI without any elements apart from the listview of the applications.
I worked on  adding icons to the GUI, under respective categories. I've hardcoded the categorization part, after the first evaluation, I'll work on categorizing the applications.
I used IconView.h along with some functions from LaunchBox. waddlesplash told me to go with BButton, so will be replacing the IconView with BButton soon as it provides easier handling of labels.

<p><img src="/files/blog/anirudhm/Report3.png" alt="Report 3" class="img-responsive center-block"></p>

This is the current preview of the application. Some formatting work of the labels and icons are to be done still. Only few of the preferences have been added, more thoughts have to be put in categorization, the implementation of the same, and then the rest of the preferences will be added as well.

I'm updating the code progress along with the preview of the application status in the GitHub repo: [AnirudhMurali/SuperPrefs](https://github.com/AnirudhMurali/SuperPrefs).

That's it for now, Thanks for reading. 😄
