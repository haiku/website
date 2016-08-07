+++
type = "blog"
author = "Barrett"
title = "Streaming Support And MediaKit Development - Weekly Report #2"
date = "2016-03-18T12:43:21.000Z"
tags = ["media server", "media_kit", "streaming contract"]
+++

Hello,
there are not a lot of news. This is mostly due to myself being occupied in the lastest two weeks with other commitments that I can't really avoid. The situation is going to change, and I plan to restore a normal working day since monday.

The hours in the latest week have been put in the development of the streaming infrastructure. Plugins are now correctly loaded by the app, and the internal classes now provide the needed exceptions to consider network streams. I've had to do some step back into the API desing reconsidering more carefully the caching policies offered to the final program.
<!--break-->
I completed a first draft of the rtsp plugin, as I anticipated this is planned to be just a test version. There are two major reasons for following this way, the first is that differently than the live555 lib, we already have in tree support for curl. Independently than how the protocol is handled, there are some challenges to face out. When a file is read the data is here, there's no need to receive it from another source. With network data we have to set up a background thread doing the job of buffering the data for the caller. In the end I plan to reuse this work to interface the plugin with live555.

Subsequently I started to look into this library and investigated making an Haikuports recipe for it. Like I expected, under gcc4 it compiled flawlessy with the proper compile flags set. The results are not the same for gcc2 where it needs a patch and until this issue is fixed it can't be used in Haiku stable releases. Additionally, this library isn't providing official releases but only "pick-up releases" that aren't warranted to be compatible. This means we will have to pick our one and host it ourselves. This can be done easily on github.

Since the user might want to watch a media file hosted somewhere without download, I decided to add another streamer plugin in my branch, this time handling with the HTTP protocol. Differently than the other plugin, it's using the Haiku's services_kit. I really liked to setup this code as I've never get in touch with the API.

The other part of the work is MediaPlayer. Before my changes, MediaPlayer considered almost any playlist item to be a file. Fortunately the code has been well-designed and I was able to add the needed glue to introduce a kind of url item.

The second part of this integration relates how MediaPlayer is supposed to handle URLs. Much like in the situation above, the app's service handling with external offers of media is just considering files. The Haiku design, in a lot of situations is focused in providing a common way to access certain features. Files are not an exception and developers before me already provided a way to add supported protocols in the MIME database and supposedly having apps to handle those requests correctly. For example, you might want to be able to open a certain link from WebPositive directly into MediaPlayer.

A sample code sitting in our tree has been linked to me by mmu_man and I'm going in those hours to make MediaPlayer support this protocol.

I regret being late in this report, but I have still circa 2/3 of the hours to put this month.

See you all next week.