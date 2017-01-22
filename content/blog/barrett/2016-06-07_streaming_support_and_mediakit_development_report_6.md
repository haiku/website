+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Report #6"
date = "2016-06-07T14:29:12.000Z"
tags = ["media server", "media_kit", "streaming contract"]
+++

Finally a new report. The time since the latest report has been spent mostly into gaining a preliminary support to streaming and begin finalyzing the underlying support code.

This included documenting myself about the APIs and figuring out how to implement the functionality in a clean way. There are various additions, we are moving to the right place so we finally have a streaming infrastructure.

<!--more-->

In haikuports and HaikuDepot it's finally available the live555 package.

It's separated in two independant components, the live555 package providing some tools such as the streaming server and the OpenRTSP client. There's also a live555_dev package, providing headers and static libraries.

Let's go in a per hrev analysis of the work.

In hrev50321 there are mostly preliminary/cleanup fixes.

With this hrev I solved an issue with the streamer data ownership. I fixed also a problem with the AddOnManager causing some issues when loading plugins.

For hrev50322 and hrev50325, the most notable addition is the streamer_sniff_test commandline app.
This is just a simple test to verify that the initial codec sniffing process is successful.

I also solved a problem in ffmpeg preventing to compile it in debugging mode under x86_64, it was an annoying but simple issue relating integer values portability.

From hrev50330 to hrev50333 the changes related the introduction of the needed code in the haiku buildsystem to use the live555 library making me finally able to include the rtsp plugin in Haiku.

I also added both live555 and live555_dev packages for all archs.

hrev50337 seen the inclusion of at least two major pieces of my work.

The most important addition is BAdapterIO, an implementation of the BMediaIO interface allowing us to write easily code that interfaces with an external source or thread.
This is working by providing a BInputAdapter to the backend and BPositionIO-like interface to the client.

The class provide internal buffering and multithread protection too. There are obviously some caveauts into that and in any case the client is required to use the interface correctly to avoid everything lock up.

This change led me to finally improve our PluginManager code and provide a BAdapterIO targeted to BDataIO. BDataIO is an interface that doesn't specify any mean of positioning the stream, this was a problem for us as it prevented to correctly identify the stream format.

I included the http_streamer as a first example of streamer plugin implemented using BAdapterIO. The backend part is using the native services kit. I consider it a sort of milestone, as it allowed to finally demonstrate the ffmpeg plugin is enough mature to successfully complete a stream sniff.

There are also two fixes in the ape_reader related to better error handling and avoiding seeking the file to the end to know it's size. The code is now using BPositionIO::GetSize to accomplish that.

It was cause of a few problems with network streams as it's unlikely we can seek to the end of the file and if possible it would have been an operation with some cost.

BMediaIO on the other hand has been improved too. I decided to provide a GetFlags method that will be used by clients to fetch for the properties of the underlying stream.

In hrev50341/hrev50347 the rtsp_streamer has been finally included.

It's mostly a from scratch rewrite of the previous code. There's not much to say about that, except it uses live555 and BAdapterIO.

In hrev50355 I continued the development of BAdapterIO. The main limitation of the code was the lack of remote seeking support. When the client request a seek over the range we currently buffered, we will ask the backend with a SeekRequested. When the backend operation ended successfully, the client is required to call SeekCompleted before the function return. This will cause the buffering offset to change and the buffer is cleaned as result. Next data received will be considered to be at a position equal to the offset plus the relative position.

So what's then? As said we finally have a preliminary streaming support, so I will continue improving it, most notable limitations are poor timeout handling and need to implement the backend seeking interface in the streamers.

We still lack MediaPlayer integration with it. Unfortunately I figured out I need to look more deeply into the framework. While I have some workarounds locally and I was able to look at some movies with it, int the current form it's pretty unusable from the user point of view so I decided to don't commit anything relating that. The main reason is MediaPlayer being an app not designed to deal with some particularities a network stream have compared to a local file.