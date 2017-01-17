+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Weekly Report #3"
date = "2016-03-25T22:27:23.000Z"
tags = ["media server", "media_kit", "streaming contract"]
+++

Hello, here a short report about how things are coming along.

<strong><em>Work continue on the curl streaming code</em></strong>

I've continued working on the network glue by adding a very basic locking using the RWLocker in Haiku's shared kit. This class allow multiple concurrent readers and an exclusive writer at one time.
<!--more-->
<strong><em>Added a live555 <a href="https://github.com/haikuports/haikuports/pull/517">recipe</a> to haikuports and Fixed live555 source to compile with gcc2</em></strong>

The live555 library recipe has been necessary for the next step which relates integrating it in the Haiku build system. Once this initial work has been completed I can begin to migrate the curl code to this library. To make this happen there was need of some fixes to make it compile under gcc2. Being added just a day ago, I expect the final recipe to be more sophisticated too.

<strong><em>Included parts of past weeks <a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev50164">work</a> into official tree</em></strong>

I've used some time to make the point and slim down my local branch.

This has been necessary to make way for the next step into the development and among the other things I wanted to submit for review my code. While I requested it, the tracking to make my work reviewed in the mailing list has not been set up, at this point I felt it was needed. I excluded from the changes the streamer plugin code as it was not worth of, I prefer to include the final version when it will be ready (and working). MediaPlayer changes are also out right now. To keep the stability, the intent of this merge is to begin testing for regressions rather than testing the actual features.

<strong><em>Plans for future caching implementation in the plugin manager</em></strong>

The general idea is to move out the complexity from plugins. My plan is to move away code from the curl streamer. Depending on what the upper level code want to do there might be different levels of caching needed. I'm studying how to develop the PluginManager further to supply different levels of caching and MediaIO to specify if the stream is seekable backward and/or forward.

The work on MediaPlayer has stalled a bit right now, the main problem being that the code is recreating the BMediaFile every time it needs access to. In the backend it results in the plugin trying to download the data twice and as you might imagine this cause various problems. There's probably a reason for having the code behave this way, so I decided to look a bit more in deep before to make this change in the MediaPlayer engine. In the meantime I've setup a little test program so that we can have a replicable test in our source tree.

See you next week!