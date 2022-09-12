+++
type = "blog"
title = "GSoC 2022 Final Report: Improving the Calendar Application"
author = "HarshitSharma"
date = "2022-09-12 15:04:11+05:30"
tags = ["haiku", "software"]
+++

# Project Description

A Calendar application is a must have application for any operating system and is beneficial for end users as well as developers. Having a feature-rich Calendar might not sound like a big deal, but it can drastically impact your performance at work and personal life.  

The basic idea of my project was to improve the Calendar Application, by implementing the the following features:

* Filter Utility
* Reminders Utility
* Calendar Profiles (After some discussion, we decided not to work on this)

Hence, I ended up implementing the **Filters** and **Reminders**

My fork: https://github.com/harshit-sharma-gits/Calendar

# Work Done

## Filter Utility

Issue: https://github.com/HaikuArchives/Calendar/issues/119

PR: https://github.com/HaikuArchives/Calendar/pull/121

In this PR, we implemented the Filter Feature. It's UI and working can be seen [here.](https://drive.google.com/file/d/1DIrfn43473RxbImjlKKm0K4hkmvPBYTp/view?usp=sharing)

So, now we can filter out the events as per the keywords entered.

## Reminders

Issue: https://github.com/HaikuArchives/Calendar/issues/122

It was a more typical project and it required much more discussion, which we did on [this](https://discuss.haiku-os.org/t/gsoc-22-project-improving-the-calendar-application/12139/40) thread and with my mentors on emails.

We created a separate background application (*CalendarDaemon*) which:
* Searches for the events and stores them in a list, and keep the list updated with adding/removing the events.
* Then sends off an alert for the event, at the specified time

We also did some changes in the UI of the main Calendar Application along with the existing data model. The new UI can be seen here: https://drive.google.com/file/d/1aNvUciZ1uMDbn8Sn6ROJzSOQgHjGxw4b/view?usp=sharing

### PRs

Initially we started with only one PR, and did everthing in it. Not so surprisingly, the PR got way too big to handle. So, we broke the work into multiple PRs.

Here are the PRs:

| PR | Short Description |
| --- | --- |
| https://github.com/HaikuArchives/Calendar/pull/123 | Initial PR |
| https://github.com/HaikuArchives/Calendar/pull/124 | Code restructure for Daemon. Restructured the files, so there is a Calendar app and a separate Daemon |
| https://github.com/HaikuArchives/Calendar/pull/125 | Removed dependence of the DBManager on the Main Application |
| https://github.com/HaikuArchives/Calendar/pull/126 | Set up a basic daemon which node monitors the Events directory for events adding/removing. |
| https://github.com/HaikuArchives/Calendar/pull/127 | UI change in Calendar and data model changes |
| https://github.com/HaikuArchives/Calendar/pull/128 | Querying the DB for an updated list of events |
| https://github.com/HaikuArchives/Calendar/pull/129 | Getting alerts at the right time using `BMessageRunner` |

## What's next?

The work for Daemon is (almost) complete.
What remains is: Automatically starting the CalendarDaemon with the help of `launch_daemon`. I would definitely complete this.

I've decided to continue to contribute to open source in my spare time. And I'll continue to engage with the Haiku community as well. Projects here are really interesting!

---

# Final Words

I had a great and very productive time working on this project. Thanks to this project, I have learnt many things about Haiku, git, and even C++!

A special thanks to my mentors [Niels Sascha Reedijk](https://discuss.haiku-os.org/u/nielx) and [Humdinger](https://discuss.haiku-os.org/u/humdinger). They mentored me really well and were always ready to help me out. Thanks for being patient with me and clarifying my doubts.

Finally, I would like to thank this amazing community!

Have a great day!