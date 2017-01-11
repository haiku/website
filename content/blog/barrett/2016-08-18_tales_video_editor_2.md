+++
type = "blog"
author = "Barrett"
title = "Tales of a Video Editor #2"
date = "2016-08-18T22:32:27.000Z"
tags = ["media_kit", "video editing", "UltraDV"]
+++

Hi there, we're now in the last part of the summer.

A lot happened in the UltraDV source. The code is gradually maturing and a lot of components have been replaced and implemented among more than 30 commits.
<!--break-->
<strong>Phase One</strong>

In the first phase of the development I continued with various code massagement. It started from cleaning the tree to massive style fixes, ended up with a refactor of the directories structure.

<strong>Phase Two</strong>

At this point I've been happy, the source finally had some meaning of maintanability.

So the most obvious thing to do was to begin removing some dust.

The first issue coming almost immediatly to eyes was some proliferation of multiple inheritance with BMediaNodes. The avi_nodes were unneeded, there was a lot of code handling with threads and BLoopers in a custom way. Almost all of this, such as the TTimer class, has been replaced with modern components from the app_kit. Once this has been done I moved into refactoring some GUI parts, removing dead code and unneded inheritance as well as some workarounds for the old metrowerks compiler bugs. A lot of fixes resulted from this work :

<ul>
 <li> Fix drawing artifacts (most notably the Browser's one)</li>
 <li> Fix the app locking on exit</li>
 <li> Fix various crashes</li>
 <li> Fix time palette flickering</li>
 <li> Remove a lot of unneeded threads causing lockups</li>
</ul>

So, at this point I started looking into how to get some playback/export functionality.

The old custom codecs other than supporting just a very old flavour of mpeg, were not complete. So I started reworking the low level code to use BMediaFile. This allow now UltraDV to read any media supported by the operating system.

<strong>Phase Three</strong>

At this point the crowdfunded week ended. I decided to continue voluntering.
The new bridge code with the Haiku's codecs wasn't perfect, it needed some work to get proper seeking on compressed formats.

That phase related some general fixes such as correctly initializing the time at app start and make the Stage window bigger. I reworked the drawing system that was in need of some rewiring such as using the Invalidate() mechanism and avoid unneded updates.

In the meantime I started working on the PlaybackEngine, once realized it wasn't functional at all, I decided eventually to rewrite it and introduce an initial support to playback.

The real goal of this phase was to get in control of the bitmap rendering. Before the changes there was a mess preventing to implement the playback/export functionality.
<strong>
What's then?</strong>

Andrew Hudson is trying to handle with Haiku Inc. to get me work another week on the app by providing funds himself and considering I will soon move to a new job there's not much time remaining. The only problem is that apparently Haiku Inc. isn't anymore prone to do that. We will see what happens ;-)

I've actually received 265$ of 400$ from the donors, but I'd like to thanks everyone who contributed or helped the UltraDV development, I'm honoured of that!