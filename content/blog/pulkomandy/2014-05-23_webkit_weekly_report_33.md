+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #33"
date = "2014-05-23T06:28:19.000Z"
tags = ["WebKit", "app_server", "contract work"]
+++

Hello everyone!

Work on the new drawing code for WebKit continues this week. We have scrolling support again (this was a bug in app_server, which stippi helped to fix), the scrollbars are drawn in the view thread (we are still using the fake scrollbars from WebKit), and the screen is updating as it should, so we get animations to work much better (for example the 2048 game plays with animations now).

<!--more-->

Things are getting ready for a release, but there is still one annoying bug: only the first tile from the tiled backing store is rendered. This limits the viewable area of webpages to 4096x4096 pixels. So when scrolling down on some pages, at one point they stop rendering. I'm investigating the cause for this. DrawBitmap is called for each tile, but only the first actually manages to put something on screen. It could be a clipping issue again.

I'm still working with an offscreen bitmap for the rendering, I still plan to remove it but that needs some support for locking the relayout of the page during a draw. I will see if there is an easy way to do that.

I tested the new rendering more thoroughly, and it seems to work quite well. Scrolling on some pages got faster, pages that were not rendering at all (feedly, foxnews) are working, and a few more drawing glitches are fixed. There is also some improvements on rendering openstreetmaps.org and maps.yandex.ru: the maps are visible now, but they are shown at the wrong place. it seems there is a missing translation. I have an idea where this may come from, but I'll have to experiment with it a bit more.

Also, I will be on vacation next week, so there will be no work done and no report. See you in June!