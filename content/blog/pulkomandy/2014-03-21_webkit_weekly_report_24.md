+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #24"
date = "2014-03-21T08:31:46.000Z"
tags = ["contract work", "WebKit", "webpositive"]
+++

Hello world,

The report is going to be sort this week, for several reasons:
<ul>
<li>I was not at home for the week-end, and didn't get any Haiku work done,</li>
<li>As announced last week, I'm currently working only part-time for Haiku,</li>
<li>And, not much happened anyway. There are weeks like that.</li>
</ul>
<!--more-->
However, this doesn't mean there is nothing happening. First, this week I uploaded the 1.2.5 release of WebKit, fixing the most visible drawing bugs. I planned to do this last week, but found some compilation problem when using haikuporter to generate the final build, so this was delayed to this monday. There were some new bug reports on this new release, I'll be looking into the new issues.

Some other people are joining the fun. Js hacked an ugly patch that lets WebKit compiles on x86_64. We're stil llooking for a proper solution, but in the meantime we will be able to provide a WebKit build for 64 bit systems. Two GSoC candidates have also submitted patches. We just got a Javascript error console in Web+, and we will soon get Web Sockets support (that latter patch still needs some improvements, but there is at least a working version).

On my side, I started the work on HTML5 audio. I'm starting with audio, because unlike for video, the streaming part (for which we need media kit changes) is not a requirement. Playing streamed music is only one part of web audio, which also has support for sound effects in games (these are pre-downloaded, not streamed), and procedural sound generation (this doesn't need the media kit to decode anything, just play the generated buffers). So, I started work on this, but I spent most of the week getting the build system part of things working. And while doing the initial tests, I found HaikuLauncher is now very easy to crash, probably because of the latest merge from WebKit sources. I'll have a closer look at this issue.

And, that's all for this week. Next week, I plan to continue the work on web audio, fix the new crashes, and have a look at performance problems. Since the introduction of the new clipping code, some pages have become very slow to redraw, which makes it a bit difficult to use them (my webmail has trouble with that). I'll have to examine the way the clipping is used, and how we can make this faster.