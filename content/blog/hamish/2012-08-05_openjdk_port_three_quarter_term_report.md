+++
type = "blog"
author = "hamish"
title = "OpenJDK port: three quarter term report"
date = "2012-08-05T22:03:19.000Z"
tags = ["OpenJDK", "gsoc2012", "gsoc"]
+++

Since midterm I have been working on the jsound port, which provides audio, MIDI input/output and the ability to control mixer volume and other parameters.

After getting my head around some of the media kit concepts the implementation has gone smoothly. I implemented audio output support first, as I guessed this would be the most used component. It works well. Then I implemented MIDI input and output support. This is untested so far because I don't have any MIDI hardware. In the end I will probably end up constructing some dummy MIDI endpoints in another app for rudimentary testing. Audio input support is awaiting the availability of the SoundConsumer class, which might be included as a private API in libmedia, as the file cannot be included in OpenJDK because of licensing restrictions. Once this is in place I'll get working on the audio input support.

After that I'll implement support for "ports", which gives Java apps the ability to configure parameters on the system audio mixer. I should be finished in time for the suggested pencils-down date, the 13th of August. I didn't have time to get a new build ready for this blog post, but it's not very difficult to build from source. Build instructions are here: http://pastebin.com/4FhDAnyg