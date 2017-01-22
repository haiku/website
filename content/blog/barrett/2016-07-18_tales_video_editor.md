+++
type = "blog"
author = "Barrett"
title = "Tales of a Video Editor"
date = "2016-07-18T22:00:25.000Z"
tags = ["video editing", "UltraDV", "media_kit"]
+++

Someone might have already noticed there's some ferment around <a href="https://github.com/Barrett17/UltraDV">UltraDV</a>, originally supposed to be a BeOS killer app then it stalled down. It was finally open sourced under MIT license around 2013 and today we are trying to find a path to see it's <a href="https://freedomsponsors.org/issue/767/port-ultradv-over-to-haiku">development continue</a>. Today I'm going to show the good points as well as the hard ones.

<!--more-->

UltraDV is a video editor, from the code point of view it's an huge program, one of the biggest I've personally seen around the open source ones.

As already stated in past I'm particularly interested in promoting software development for Haiku and being a media_kit developer I'd like to see the potential applications of this API on the road. A project like this isn't a downhill, it needs a certain care in how the development should be carried down and a long term roadmap to ensure maintanability. So first of all I would like to show the fundamental points, specifically what UltraDV is and what is not.

What UltraDV is/has :

<ul>
 <li> Designed as a professional software</li>
 <li> Well thought UI</li>
 <li> Aimed at mixing different kinds of media</li>
</ul>

What UltraDV is not :

<ul>
 <li> A complete application</li>
 <li> Up to nowadays coding standards</li>
 <li> Up to nowadays design standards</li>
 <li> Updated to modern R5 APIs (specifically it's freezed to somewhere after R4)</li>
</ul>

Anyone can verify this by looking at the repository, I strongly suggest everyone to clone the source and test the application itself to evaluate the current state.

<strong>So What's The Plan?</strong>

Let's go into it more deeply. I've already started to develop it since a few months now, and I think I have a decently clear idea of what to do to have some hope of finally seeing it used for some productivity. What I've done in my free time :

<ul>
 <li>Move it to a modern buildsystem</li>
 <li>Fix some archaic/obsolete defines that were causing problems</li>
 <li>Cleanup the source from extraneous and duplicated files</li>
 <li>Begin to work on a more organized and compact directory hierarchy</li>
</ul>

I think at this stage of the development the only thing to do is  to continue the code massagement. Before to fix any bugs and try to restore the lose functionality.

The second step would be to begin removing code which can be replaced due to new APIs present in R5 and Haiku that weren't available at the time. For example UltraDV isn't BMediaEventLooper aware so the nodes present are implementing, in a terribly duplicated way, their own control thread.

When UltraDV was developed the general trend was focused to making media_nodes able to do
everything. Today we know that media_nodes are good for live things such as recording from the soundcard, but we are also aware that using BMediaFile is much more convenient and performant when we have to encode and/or write media data to the disk.

If we are lucky enough, at this point the code quality would be increased considerably.

From this point onward, will be finally possible to restore and reimplement features. Another milestone will be when the GUI will be rewritten with layouts, this is a really hard task, something I don't plan to look at anytime soon. In fact one of the aims of the massagement phase is to try to remove as much old code as possible replacing it with newer one.

It's hard to say how much of that can be done in one week, and how much will take to release a stable version but I hope with my work to finally pave the way so that also other people will be able to contribute and make improvements.