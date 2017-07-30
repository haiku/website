+++
type = "blog"
title = "[GSoC 2017] Preferences GUI Refactoring - Weekly Report 5"
author = "anirudhm"
date = "2017-07-30 19:19:39+05:30"
tags = ["haiku", "gsoc", "gsoc2017", "preferences"]
+++

Hello World.

The second evaluation got over recently, and wanted to update my progress. My last blog post had discussion
that custom preflets wanted to be added into SuperPrefs. It has been implemented now. Along with the exisitng
boxes for specific categories, there's now a box for Custom preflets, which includes third party preflets which
come along with installation of apps. I also was working with implementation of Sorting of the entries in boxes,
users can sort it based on Category, or Alphabetically, both has been done now. Followed with some alignment of icons, and the buttons in the UI to look more uniform.

I planned to extend SuperPrefs to support apps too. There's now a checkbox to display the apps installed, with no categorization though. It does support localized search similar to preferences. Few bugs are ought to be fixed in the case of apps section as some apps get installed in respective folders and not just in root of Applications folder.

Below is a GIF demonstrating the work so far:

<p><img src="/files/blog/anirudhm/gif_preview2.gif" alt="Report 5 work" class="img-responsive center-block"></p>

I'll now work on making the code ready for production, and give a test build as soon as possible. This will most probably be integrated into Deskbar menu, and appear when the Applications and Preferences entries are being selected.

Up-to-date code is available at the repository: [AnirudhMurali/SuperPrefs](http://www.github.com/AnirudhMurali/SuperPrefs).

That's it for now. Thank you for reading. 😄
