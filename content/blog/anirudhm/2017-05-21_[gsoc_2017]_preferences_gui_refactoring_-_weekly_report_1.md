+++
type = "blog"
title = "[GSoC 2017] Preferences GUI Refactoring - Weekly Report 1"
author = "anirudhm"
date = "2017-05-21 01:32:01+05:30"
tags = ["haiku", "gsoc", "gsoc2017", "preferences"]
+++

Hello World.

This is an update to my previous blog post which dealt with the introduction to the GSoC project which I’ll be working this summer - *Preferences GUI Refactoring*. It's been two weeks since the first post went live, so here's the report for the weeks after that.
This being the *Community Bonding* period, I pretty much did what the title says. Got to know about fellow GSoCers, they really are friendly and helpful. Myself, my mentors (waddlesplash and Sean), PulkoMandy, jua_ and humdinger had our first meeting, infact a very long meeting. The meeting was more of a discussion on the last blog post's comments. Last blog post received so many suggestions and constructive criticisms, let me thank everyone for their valuable feedback. We did take everything into concern. The major changes that are done to the project after the blog post:

The control panel (we call it *SuperPrefs* for now) will be segregating preference panels category wise, along with an inner search implementation (as explained in last blog post). We're dropping off the _Preview pane_, at least for now, it doesn't seem to make many changes and there were more major things to be addressed. Incase you missed the last post, here’s a link to [that](https://www.haiku-os.org/blog/anirudhm/_gsoc_2017_preferences_gui_refactoring_intro/). Note that SuperPrefs is not the final name; the final name will probably just be "Preferences".

### Hurdle #1:

Last week, messed up my Mac by updating Xcode via App Store. I've never had problems with updating apps through App Store until last week. I had to pause my download couple of times in between the download progress, and resume it. I'm not sure whether it was because of that, the Command Line tools got messed up, and I wasn't able to even build Haiku. It seems that the compiler got crashed. There's even an article about this stating why not to update Xcode through App Store. [Xcode Upgrades: Lessons learned](http://ericasadun.com/2016/03/22/xcode-upgrades-lessons-learned/).
The solution was to completely uninstall Xcode and its Command Line tools and had to reinstall it from the Apple's developer site downloads page: developer.apple.com/downloads.
So, if any macOS users are reading this, do not pause or terminate it in the middle of the update, had to learn it the hard way.

### Progress:

Coming back to Haiku, I learned how the menu entries of the deskbar menu are being fed, and working of Jam. I did a small work on adding SuperPrefs to the menu entry list. Most probably, SuperPrefs will be getting a place in the main menu rather than amongst Preferences menu entries. Here's a preview:

<p><img src="/files/blog/anirudhm/menu.png" alt="Menu Preview" class="img-responsive center-block"></p>

In further weeks, I’ll be working on the implementation of the SuperPrefs' app window. The major learning and coding part is yet to come, and am excited about it as well. The changes will be going here at my GitHub profile: [AnirudhMurali](https://github.com/AnirudhMurali/haiku). No changes as of now, you can see changes in the coming weeks. Thank you!
