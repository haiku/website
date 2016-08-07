+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #25"
date = "2014-03-28T07:40:31.000Z"
tags = ["contract work", "WebKit", "webpositive"]
+++

Hello world!

Support for html5 audio makes slow progress, but progress nonetheless.

Last week I was struggling with the build system. These issues are solved now, and I have a WebKit build which recognizes the &lt;audio&gt; and &lt;video&gt; html5 tags. This is not quite enough to get the sound and video output going, however. I have started plugging some parts of it to the media kit. We now download the audio files, and try to decode them with Media Kit. However, I found a bug with our ffmpeg add-on, that doesn't properly report the list of formats it can decode. I could work around that (but I'll try to fix it properly instead). However, we also have a problem with using BMediaFile and BMediaTrack in hybrid applications, as the ffmpeg decoder add-on is not available for those, and it needs to be instanciated in the application side. Moreover, the media server doesn't seem to handle hybrid paths properly, so the app tries to load the non-hybrid version of the add-on. So, I'll have to work on the media kit itself, earlier than I expected.

I also merged the latest version of WebKit, with the usual set of cleanup, optimization and bugfixes. The GTK port completely switched to CMake, and the autotools based build system is now gone. CMake is now the standard way of building WebKit, with only Apple port using something else (but they are considering to make the switch as well).

I'm also watching the testsuite results. I fixed some bugs in our font code again (mainly mixum of characters vs bytes), fixing some crashes. There is one crash (related to iframes) and one assert (related to cached resources) that I'd like to fix, as they cause most of the testsuite crashes. There are also a lot of rendering bugs, and fixing them will likely help with the rendering issues on real-world pages (but the pages in the testsuite are much simpler, making it easy to find where the bug comes from). I'll continue to review these.