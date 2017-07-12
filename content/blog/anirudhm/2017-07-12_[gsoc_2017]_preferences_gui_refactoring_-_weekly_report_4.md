+++
type = "blog"
title = "[GSoC 2017] Preferences GUI Refactoring - Weekly Report 4"
author = "anirudhm"
date = "2017-07-12 22:47:21+05:30"
tags = ["haiku", "gsoc", "gsoc2017", "preferences"]
+++

Hello World.

It's been almost 3 weeks since my last update. The first evaluation was complete, I'd like
to thank Haiku for recognizing my work so far. And here's an update on what I worked on for the past few weeks.

I replaced all IconView with **BButton**, since it has built in functions for label, icon handling.

I worked on categorizing all preflets based on their categories, and sorted them into
respective BBox.

Implemented **Localization** for the labels, BButton takes the localized app name, if there
exists no localized name, takes up the default English app name.

Worked on **Search functionality**, Search now works with the keywords of the app names.
Will extend this functionality to display according to the preflet's *related keywords* too.

The search results update as the user type their query, and the preflet is highlighted with
a color too.

Here's a GIF on how SuperPrefs is as of now:

<p><img src="/files/blog/anirudhm/gif_preview1.gif" alt="Report 4 work" class="img-responsive center-block"></p>

Currently am working on the Settings menu, which includes *Sort as Category*, and *Sort
Alphabetically*. Now that Category wise implementation is done, I'm working on providing Alphabetical wise sorting option.

### Upcoming goals:

* Implement Search functionality for related keywords too.
* An alternative to hardcoded preflet categories.
* Suggestions are welcome.

Up-to-date code is available at the repository: [AnirudhMurali/SuperPrefs](http://www.github.com/AnirudhMurali/SuperPrefs).

That's it for now. Thank you for reading. 😄
