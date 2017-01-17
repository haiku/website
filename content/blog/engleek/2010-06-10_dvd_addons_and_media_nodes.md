+++
type = "blog"
author = "engleek"
title = "Of DVD add-ons and media nodes"
date = "2010-06-10T14:44:02.000Z"
tags = ["gsoc", "gsoc2010", "dvd", "media kit", "media add-on", "media node"]
+++

Extending the media kit with the ability to read DVD is a challenge, but a unique opportunity to learn about the kit architecture and Haiku software integration. This time I'll be talking about my actual first development steps concerning DVD support.
<!--more-->
First of all, I needed several DVD related libraries. I presented thise in my last post, and they proved easy enough to integrate. Apart from some include path and endian switching issues, they compiled without any fuss.

Well I say it was easy, but the next step was to change the library build system from Automake to Jam (and learn how to use Jam) in order to build them with Haiku, and make them directly available to my add-on as static libraries.

Seeing that most of the add-ons using extra libraries were plug-ins, my first intention was to make a DVD plug-in, simple and versatile. However, that wouldn’t have worked: Plug-ins are called by the media server, and given a BDataIO, or at best a BPositionIO, to see whether the plug-in can do the job, and only  deal with these single data buffers, but libdvdnav treats the DVD as a whole, and needs a device path to function. The add-on would have to be fully-fledged.

Right now I’m working on that add-on, and specifically the actual media node, basing it on the video producer demo add-on. At the moment, it automatically tries to load a disk in the first disk drive, using some code from the cdplayer application, and sets up language and cache settings for reading.

My next step is to get that node to connect and produce basic video buffers that can be shown using the video window, and this is proving less than easy, mainly because DVDs use so many different formats.

To illustrate, here’s a quote from Wikipedia:

<em>“Although many resolutions and formats are supported, most consumer DVDs use either 4:3 or anamorphic 16:9 aspect ratio MPEG-2 video, stored at a resolution of 720/704×480 (NTSC) or 720/704×576 (PAL) at 29.97, 25, or 23.976 FPS. Audio is commonly stored using the Dolby Digital (AC-3) or Digital Theater System (DTS) formats, ranging from 16-bits/48 kHz to 24-bits/96 kHz format with monaural to 6.1-channel "Surround Sound" presentation, and/or MPEG-1 Layer 2 and/or LPCM Stereophonic.”</em>

Most media add-ons use only raw formats, and while there is quite a lot of code dedicated to non-raw media formats, learning how to use it, and adapting the node to such a media cocktail is another matter altogether. Tips and tricks are most welcome!