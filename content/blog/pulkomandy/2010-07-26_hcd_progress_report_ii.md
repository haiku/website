+++
type = "blog"
author = "PulkoMandy"
title = "HCD : Progress report II"
date = "2010-07-26T14:44:00.000Z"
tags = ["hcd", "locale", "localekit", "contract work"]
+++

So, I'm still working on the locale kit. Here are some things I did since last time :

<!--more-->

* ICU was updated from 4.2 to 4.4. This update includes fixes to the data (for example timezones rules change over time), but also new functions I needed for the time preflet.
 * The time preflet now formats the date and time using the local format. The display is still somewhat imperfect, but it is already more intuitive for people using format different from the US one. Getting it right took quite some time and required changes and additions to the Locale API, as thiswas an use case no one thought of before.
 * As I was a bit tired of messing with locale stuff, I took a break and fixed some unrelated things. I added the gcc version to the kdl command sysinfo ; and I fixed the Classic Be and Macintosh decorators, that were broken following some API cleanup in this area.
 * The haiku translation assistant was finally put back online by dancxjo, so I synced all the catalogs laying there. The new version makes this process much more easier than before, so I should be able to keep a schedule of weekly sync from hta to svn.
 * Some bugs in collectcatkeys were fixed, so some strings that couldn't be translated now can.
 * I also made some cleanup on the work already mentionned in my last post and made it more robust.
 * I improved the locale preflet to save the settings and make the interfacing with the locale kit more cleaner. Before it was not possible to save the custom settings to disk, and they tended to get out of sync with the actual settings, which made the preflet do weird things.
 * Big changes in the structure of the BCountry class were made, which allowed for a big performance improvement. The locale preflet will display much faster in newer builds. It used to take about 15 seconds to start on some machines, and now needs less than 2 !
 * Time preflet again : I then worked on the timezone part of the time preflet. This one used the tzdata database, and I wanted to use ICU instead. This decisionwas made because ICU embeds the data anyway, so it makes no sense to add a second version of it. Also, while I was working on all this, Oliver Tappe made some progress on the "posix locale" branch. This branch was finally merged into trunk and allows using ICU also with the standard Posix-API. We did so for the same reason : it allows to remove a lot of legacy code we had gathered from glibc that was mostly not working. This improves our posix compatibility a lot in the locale area. However, it means all the configuration is done on ICU side, so we have to rework part of the system. The time zone example is a good one. The preflet previously messed with symlinks to tell the system what the default timezone was ; now it just have to tell it to ICU (through the locale roster).

Well, that's about all for these 12 days. Now I'm not yet sure what I will work on next... I'll have to check my todo-list.