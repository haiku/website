+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Weekly Report #1"
date = "2016-03-09T23:26:54.000Z"
tags = ["media_kit", "streaming contract", "media server"]
+++

Hello, as you may have seen from the news on the front page of the website, the contract I proposed has been accepted. This contract relates to development in the media_kit area. While there is more than one goal, the first part will be dealing with streaming support. I would like to thank all the donors that made this contract possible.

The first week has been something like slow start; I expect to spend an increasing number of hours the more I get into the contract. As the official announcement hinted this is an initial contract for 120 hours. My intention is to get the media_kit in good shape to eventually concentrate on other things. The tasks I put into my contract proposal are important for more than one reason:
<!--break-->
Hello, as you may have seen from the news on the front page of the website, the contract I proposed has been accepted. This contract relates to development in the media_kit area. While there is more than one goal, the first part will be dealing with streaming support. I would like to thank all the donors that made this contract possible.

The first week has been something like slow start; I expect to spend an increasing number of hours the more I get into the contract. As the official announcement hinted this is an initial contract for 120 hours. My intention is to get the media_kit in good shape to eventually concentrate on other things. The tasks I put into my contract proposal are important for more than one reason:

Recent developments in the media_kit shown that there are a handful of features available that just aren’t used yet. That's a problem as it's limiting our software pool. There's no reason to develop an operating system if no applications are around to use its capabilities. What I'm trying to do is to make the media_kit ready for a release and at the same time fill in the functionality holes that have been around since BeOS times. I'm myself an application developer, so I hope this contract will help me to concentrate on working on them some more and also help with the push to a beta release of Haiku.

Part of my time so far was spent on documenting and investigating the actual status of the existing problems. Some discussions on the developer mailing list have been of great help in finding the right direction of my work. I already started to work on the actual code with a focus on the ffmpeg add-on.

The first problem we have to face is that network streams aren't always seekable. And often if they are so, there's a non avoidable quantity of latency to take into account. The same problem happens for example for DVD playback, since its own native format is way bigger than a normal video, we can't expect the normal way to handle things will work. The discussed solution for this problem has been to implement BMediaIO. It's a new interface deriving from BPositionIO that allows applications to access files and streams data in a more controllable way.

The second problem is to work on the plugins and allow them to support the new interface. Backward compatibility is guaranteed thanks to the fact that BMediaIO inherits from the old interface. If a plugin doesn’t support it, it will see the object just as a BPositionIO and will continue to work reliably. We decided subsequently to move the actual complexity to an internal class. This class is a BMediaIO wrapper that allows us to apply different kinds of buffering and management depending on the source properties. For example, if a source is just a seekable file, we just keep using the code we used before. What really changes is that the wrapper allows us to better thread with non-seekable data and network streams.

At this point, the initial work on modelling this task is done in the streaming branch. With it we’re able to address the actual source of problems. So, the next step was to discuss how our codec plugins should interact with network streams. The proposed solution has been to make apps able to open streams just like files. This will give us a great degree of compatibility and extendability, because existing apps will have to add only a few lines to, for example, listen to audio from a network.

While originally I wanted to focus on codec plugins supporting it directly, Axel suggested to supply a new API for doing that. It will allow existing plugins to avoid having to provide functionalities they don't want. The new API will provide system level plugins to be able to look at some URL, and once it’s recognized as a supported stream, will return in exchange a BMediaIO. Our plugin manager, much like a normal file, will pass it to the codecs that will be able to detect the container and the decoder so that the final application will be able to play it. As initial test case I'm implementing an RTSP streamer plugin using curl.

The next week I plan to finalize that work and modify MediaPlayer to support playing streams from the network.