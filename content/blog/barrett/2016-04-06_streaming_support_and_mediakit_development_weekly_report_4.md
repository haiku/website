+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Weekly (?) Report #4"
date = "2016-04-06T14:39:54.000Z"
tags = ["media server", "media_kit", "streaming contract"]
+++

Good news everyone!

It was a very long week, having easter in the middle too. There are various news, but I want to begin with a summary of this month.

<ul>
 <li>42 commits have been included into the Haiku master branch</li>
 <li>More than 15 commits are still WIP among my branches</li>
 <li>2 commits have been put into haikuports</li>
 <li>4 tickets are now closed and a lot more are waiting my work to be complete</li>
</ul>

I submitted a request to Haiku Inc. to work for additional 240 hours, and I hope the project gets the needed funding to support my work. If you are interested in seeing my contract continue, please consider making a donation :-)

Let's talk about what happened in the meantime.
<!--break-->
Just after merging my work, I've decided that working on the same thing for too long was counterproductive, so I paused streaming work. The first thing I've done is to remove some dust from my branches. This led to the creation of three new public branches in my <a href="https://github.com/Barrett17">github</a> account:

<ul>
 <li>Streaming2, comprises work which hasn't been merged this month</li>
 <li>BMediaClient API</li>
 <li>MediaPlayer Plugin API</li>
</ul>
Since then, I continued to fix random media_kit issues, some of which have not been a success. Among them the AudioMixer rework I'm doing. Some may have already noticed that under very particular conditions the Mixer stops working. The real source of this problem is a bug in the “Shagadelic” thread that I'm trying to address. I really hoped to be able to merge this work, but it has not happened and I need more time to reconsider the issue.

Some may have noticed that since the latest revisions the reboot process got faster. This is because I finished some work started before this contract. The actual task was to provide a better way to synchronize media_kit threads to the audio card. Having it completed, possibly thanks to some improvements in media_kit, I was able to make the code use asynchronous notifications.

Another part of my work was to put in pieces enabling the media_server to regain control when something bad happens. The only big feature the media_kit still missing compared to BeOS: once the media_server or media_addon_server crashes, there's no way to restore media services except restarting every app. This time I've fixed a limitation that prevented the media_addon_server to overwrite the old system clock upon a restart. At this point I feel comfortable to continue with the plans I already had about introducing code allowing nodes to restore their status and regain control of its resources.

Other work is related to solve a few bugs. The first one was crashing XRS when attempting to export the project into a wav file, caused by a missing check in our ffmpeg glue code.

The second bug related to the VideoWindow consumer add_on you can find in Cortex. The purpose of this node is to consume video events and display them in a window. The problem was actually simpler than I thought at first, but subtle enough to require some time to be identified. Some people might be happy that this node is finally working as well. Other little improvements were made too, and I think you will notice the media_kit is step by step growing to be useable in production.

For the next month I plan to focus once more on streaming. This time I want to add a fully functional streamer based on the live555 library, which I already hinted at before. I plan to work on the server side reference management, solving the annoying bug that causes crashed applications to still appear under Media preferences and Cortex.

The BMediaClient API will be the next step on the roadmap. It is a plan to introduce a higher level API in the media_kit allowing developers to write any kind of media application without dealing with the complexity of the low level implementation.

Working on the media_kit is quite different than working on anything else. Being a very complex beast, it's very sensitive to minimal changes. Very often an improvement is good on certain hardware and terrible on another one. But other than that, past experience and community cooperation always help solving problems in the end. This is the real nature of Open Source development.

Hope to see you next week!