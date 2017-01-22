+++
type = "blog"
author = "stippi"
title = "WebPositive emerges"
date = "2010-03-02T21:18:00.000Z"
tags = ["native browser", "WebKit", "webpositive", "contract work"]
+++

Wow, it's been 10 days already since I posted my first blog entry on my work on WebKit and the native web browser. Of course my continous updates to the package I posted in my first article will probably have spoiled most of the surprise, but HaikuLauncher has been reduced again into just a bare browser shell, while a new codebase, WebPositive, has been split off from it. Using WebPositive has become a whole lot more pleasing in the meantime. For those of you who have not followed the comments to the original blog, these are the things implemented since my first post on the project:

<!--more-->

<ul>
<li>Big WebKit API cleanup (BWebView, BWebPage, etc).</li>
<li>Fixed crashes and oddities with downloads.</li>
<li>Fixed various other crashing bugs.</li>
<li>Fixed rendering bugs with transparent text.</li>
<li>Vastly improved desktop integration.</li>
<li>Big improvements in rendering efficiency.</li>
<li>Handling of WebCore navigation events has been greatly improved which results in a lot more sites working.</li>
<li>Added stop loading button.</li>
<li>Mouse wheel event fixes (Michael Lotz).</li>
<li>Fixed dispatching keyboard events to the correct frame (Michael Lotz).</li>
<li>Completely rewritten tab view.</i>
<li>Favicon support.</li>
<li>Many more keyboard shortcuts and some convenience mouse actions (in part by Ryan Leavengood).</li>
<li>Rewritten timer implementation has vastly improved redraw lags.</li>
<li>Autocompletion for the URL text field (using, with his permission, great quality code from Beam by Oliver Tappe).</li>
<li>Smooth scrolling by avoiding to redraw the whole frame on each scroll.</li>
</ul>

So far, I've been working fulltime on WebPositive, often from ninish in the morning to about midnight, with some pauses in between of course. Except for missing bookmark support and an almost useless browsing history menu (because seemingly unsorted), WebPositive has become quite usable - which makes me very happy of course. Some stuff doesn't work yet, like sending mails in the advanced GMail interface, or clicking links which open new pages from within sub-frames. There need to be application settings, like download location or default fonts. Context menu support is completely missing yet, although some work has already been done to implement them in the original WebKit port. There needs to be persistency across WebPositive sessions. And of course once these more basic features are all in place, I would like to tackle plugin support or maybe HTML5 audio/video support even before that (unless Ryan beats me to it :-). And the browser needs to become an optional package when building Haiku.

All that will probably take the better half of tomorrow, but I should still have some time left for web surfing as a reward.

The feedback I have gotten to my first blog post, but also via mail and in IRC, has been overwhelming! I am glad for the useful feature requests, some of which have been low hanging fruit and I tried to implement them quickly. From what I hear, the donations to Haiku, Inc. have increased a lot, and this makes me feel very glad! Without the sponsoring, I wouldn't be able to work on WebPositive as much as I am right now, and progress would be much slower. Some bugs are really hard to track down and it can be frustrating and take hours. WebPositive would be nowhere as nice to use as it already is without your support! So thank you!

The next days I will just continue by working on any random missing feature that will make basic browsing more usable. Thanks for reading and all the encouragement already given! Oh and I almost forgot:

<a href="http://www.yellowbites.com/downloads/WebPositive.zip">Download WebPositive</a> (svn revision 444)

Have fun!