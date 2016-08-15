+++
type = "blog"
author = "aldeck"
title = "October 2010 Code Sprint Report"
date = "2010-10-30T01:08:56.000Z"
tags = ["code sprint", "coding sprint", "begeistert", "october", "2010"]
+++

<span class="inline inline-right"><img src="/files/screenshots/66585_163601566992429_100000277599018_458760_6787768_n_0.jpg" alt="Fernsehturm Düsseldorf" title="Haiku coders bending the gravity field." class="image image-thumbnail" width="300" height="400"></a>
<span class="caption" style="width: 198px;"><strong>Düsseldorf</strong></span></span>

Preceding the BeGeistert 023 weekend was the usual weeklong Code Sprint (18.-22. of October 2010). Present to this year's coding sprint were (from left to right on the photo below):

Colin Günther (bosii)
Oliver Tappe (zooey)
Clemens Zeidler (czeidler)
Rene Gollent (anevilyak)
Alexandre Deckner (aldeck)
<!--break-->
Although we were missing a bunch of chocolate powered core members that were busy with real life, we had the rare pleasure to see Rene that flew from the U.S especially to join the code flurry.

As it's always difficult to know exactly what happened from a single point of view, i've asked each of the participants to send me a few lines about their work. Oliver added a nice intro to the mix!

<strong>Oliver:</strong>

After arriving in the youth hostel on Sunday eve, I handed out Rene the notebook I brought for him (which I borrowed from a friend - thanks Jörg!). We met Colin on our way to the trattoria and spend the evening chatting with him. On Monday, the basic setup was easily done, with the room being prepared already. So we started coding, which for me basically meant wrestling the Locale preflet into a working state. Chatting with other sprinters and the unmissable "Kicker"-sessions (is there an English word? (alex: table soccer?) were welcome distractions from the pretty much mundane task at hand. The work on the Locale preflet actually lasted until the very end of my BG23 experience, i.e. until Sunday 15:00, when I did my final monster commit.

<strong>Colin:</strong>

Well, I managed to port another WiFi-driver. It is for the ralink 2860 WiFi-chipsets, that are commonly found in the Eee PC 901 series. Besides that I was looking into a nasty bug in BTextView, where the text-caret gets out of sync with the displayed text. After getting nowhere near to a solution I involved Oliver and Rene into the search and finally Stephan. Though we didn't found a solution for it, we believe to know what the reason is.

<span class="inline inline-left"><img src="/files/screenshots/coding_sprint_october2010_small.JPG" alt="Haiku coders bending the gravity field." title="Haiku coders bending the gravity field." class="image image-thumbnail" width="300" height="400"></a>
<span class="caption" style="width: 198px;"><strong>Haiku coders bending the gravity field.</strong></span></span>

<strong>Rene:</strong>

I spent the week of the coding sprint divided between several different things. I had several Tracker bugs on my list to fix already, which were taken care of, along with some extras that were spotted during the code sprint itself such as on Clemens' machine with his mail. Besides those, I helped Alexandre with his layout tracker branch here and there, and spent a good amount of time attempting to familiarize myself with the Debugger that Ingo began work on quite some time ago. The hope is to be able to work on it some more so as to make it reasonably feature complete and usable as a replacement for gdb in the near future. Some smaller fixes were done to it during the week + weekend to get it functional again with binaries from gcc 4.4, and I have more work in progress pending that will see a commit in the coming weeks once I find enough time to finish it.

<strong>Clemens:</strong>

Because IMAP isn't really working for me on Haiku I tried to improve the MDR IMAP implementation. For example, I miss a proper synchronization with the server. The first idea was to use an external library to save some work. I took a look at etPan which looks fine on the first glance but after playing a bit with it I decided to not use it. E.g. the api does not support life updates and is more a wrapper for a pop3 style mailbox. After all I think writing an own solution would be easier than using the quite heavy etPan solution (~1MB library plus dependencies).

One thing I always wanted to implement since I learned about BeOS and the bfs file system is an index server. I directly fell in love with the indexed attributes but missed the feature to automatically read information (like id3 tags) from new files and write them to the according attributes. I have an index server prototype running on my machine and on BeGeistert I implemented some low level virtual file system stuff to be able to watch fs operation on a complete volume. This has not been possible before, especially file renames, deletes and moves were difficult to track (you had to use some query tricks). To get the changes I add a new function watch_volume which is similar to the watch_node function. To get all file modifications its now possibility to get intermediate query updates. For example when running a last_modified live query, previously you only got a message when a file has been modified the first time, all subsequential modification to the same file were not reported by the query.

<strong>Alex:</strong>

I arrived on Tuesday afternoon and after some quick chatting, i went on updating my laptop for proper development. My goal for this sprint was to continue the work on the tracker_layout branch. First struggle, merging changes from trunk that happened during the last ~1000 revisions. The svn merge itself was very painful and time wasting due to svn slowness and weaknesses with an unstable network. But i didn't feel discouraged and after some manual porting of some changes i was ready to go. First task was to update some code to the latest Layout Kit updates from Alex Wilson. I've then continued on the menu code rework with a blessed "listener mechanism" and fixed a few UI glitches. There's still some work to do, and that's just the menu management part. You can have a look at the <a href="http://dev.haiku-os.org/log/haiku/branches/developer/aldeck/tracker_layout?rev=39143">commit messages</a> for more details and future directions.

As always, it was a lot of fun to spend the week with Haiku coders and i hope to see more and more people attending to this great event over the years!


<em><strong>Many thanks to:</strong>
 HSA, Andre and especially Charlie
 Haiku Inc.
 Jugendherberge Düsseldorf, its nice staff and facilities (especially the indispensable kicker/table soccer)</em>