+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #26 - Video support!"
date = "2014-04-04T07:02:52.000Z"
tags = ["Videos", "media_kit", "media kit", "webpositive", "WebKit", "video", "contract work"]
+++

Hello everyone!

The good news first: I'll be working on WebKit for another month. Thanks to everyone who donated some money to make this possible. As said in the previous weeks, I'm now working part-time on another project to make this last longer.

And then, the very good news: HTML video is working!
<!--break-->
<h3>Bugfixes in Haiku</h3>

Last week I mentioned two problems in Haiku: one in the ffmpeg add-on and another in the media kit design. Both are now fixed. The ffmpeg add-on now reports the formats it can read. While the Media Kit API from BeOS allows to return readable and writable formats, it turns out all the plugins in BeOS only reported writable ones. Some apps (MediaConvert and BeScreenCapture) didn't check for the B_WRITABLE format, and because our ffmpeg port doesn't work very well for encoding, we have a lot of read-only formats reported. Well, these two apps were fixed (by Jessica Hamilton, thanks!) so things are working as expected again, and everything is fine.

On the other bug, the problem was the lack of hybrid-aware design in the media kit. The code in the media kit wasn't touched in a while, and was never updated for proper hybrid support. In this case, it's about media plug-ins used to encode and decode video and audio files. As you know, the design of Haiku is modular, and the idea is you can add and remove support for new media formats by adding and removing media plug-ins. This is similar to translators, but the API for translators isn't appropriate for the realtime processing needed by media things.

So, the way this was done, the media_server was responsible for node-monitoring the plugins directory. When a plug-in was added there, it would load it (as an add-on), identify it (is it a decoder; encoder; reader; or writer?), and store it in the appropriate lists. Whenever an app needed to do something with plugins, it queried the media_server (using a BMessage) for the list of plugins, and kept a local copy. The app could then instantiate the add-on and use it to decode, encode, read or write something.

There are two problems with this design when using hybrid applications. First, the media server did not scan the hybrid plugins, which are in a separate directory. This is easily fixed by adding it to the list of watched directories. The second, and more annoying, issue, is that for this to work, the plugin must be loaded both in the media_server (to identify it) and in the application (to make use of it). As the media_server is present only for the main architecture, there is no way it can load an hybrid plug-in.

I solved this by moving the plugin scanning completely to application side. There is a (theoretical) downside: when an application first uses the media plug-ins, it must perform a scan of all the available plugins, making it take more time before it can start actually playing or encoding (before it got an up-to-date list from the media_server without having to access the disk). There is one regression for now, as well: I removed the node monitoring code, so the scan is done only once at application start. This means when installing a new plug-in, applications would need to be restarted to make use of it.

These two issues are not a real-world problem, however: we provide only one plugin (the ffmpeg one), which makes loading it not so expansive, and needed for access to any media file. And there currently aren't any other plugins elsewhere, because we don't export our plugin interface as a public API. Anyway, there was some discussion on the mailing lists, and one possible solution is to reintroduce the node monitoring on media_server side, but let the applications instantiate and test the plug-in.

On the upsides of this change now: hybrid applications can successfully decode media files. This helps for WebKit on a gcc2hybrid install. And another upside of the current code is, as the list of add-ons is currently fixed, the application doesn't need to worry about synchronizing it with the media_server. This was done before by a BMessage and reply to media_server, every time a method from the BMediaFormat class was used. I think avoiding this makes up for the performance loss of the initial plugin scan in each application, instead of once in media_server.

<h3>Media architecture in WebKit</h3>

With these issues out of the way, WebKit could finally load the ffmpeg plug-in and feed it with some data to decode. But how to do that, exactly?

The media interface in WebKit consists of 3 classes. There is the HTMLMediaElement, a subclass of HTMLElement that's inserted in the DOM tree. This one handles the media controls (play/pause button, volume control, fullscreen button), and makes sure there is space on the page for displaying the video. This communicates with MediaPlayer, a class that keeps track of the current state of the media (is it playing or paused, is it downloading, etc). Finally, MediaPlayer delegates the actual work to MediaPlayerPrivate. This is the only class we have to implement, the two others being generic cross-platform code.

By looking at the <a href="https://github.com/haiku/webkit/blob/rebased/Source/WebCore/platform/graphics/haiku/MediaPlayerPrivateHaiku.h">header</a> for this class, you can see there's nothing too complicated. WebKit will first call load(), giving us the URL of the media we will be working with. It will then call prepareToPlay, signalling that the user has clicked the play button or there was an autoplay triggered. We start downloading the file at that point. As the download progresses, we send back notifications to WebKit. The most important ones are sent when there was enough data downloaded to read the file header, and we know about the video resolution, duration of the clip, and a few other important data (this happens in IdentifyTracks). The second (in DownloadProgress) is sent when we decide we have buffered enough data to start playing the video (it's called HaveFutureData). We currently send it after downloading 512K of data, which is not an optimal strategy, but more on that later.

When WebKit gets this second notification, it reacts by calling the play() method. And we start playing. To keep things simple, the replay is done with a BSoundPlayer. This is the easiest way to play media files in the Media Kit, and as we'll see, it's possible to abuse it also for video replay. The BSoundPlayer works in a separate thread and calls a function when it needs its audio buffer to be filled. We do that by using BMediaFile and BMediaTrack to decode the audio track into the buffer. And that's it we're playing HTML5 audio.

In the BSoundPlayer callback, we now compare the current playing time for audio and video. If video is late, we decode one frame to a BBitmap buffer, and send a BMessage to the application thread. There, the bitmap is drawn on WebKit offscreen view, and we notify WebKit that it should update the on-screen window. This is not the most optimal solution (the data is copied from the bitmap, to the offscreen view, to the screen back buffer in app_server, to the screen front buffer), however it makes sure the video is shown at the right place in the view, and that it does the right thing when scrolling around, for example. Later on we may change this to use a separate BView, and use the same strategy as MediaPlayer to support overlays and fast rendering. This may also avoid the BMessage based notification, which can be late and cause some frame skips.

<h3>Streaming and buffering</h3>

It's a well-known problem that the Media Kit doesn't work well with streaming. The problem is that the media kit (and the ffmpeg plugin) expect all data sources to be seekable. It will read bytes at different places to identify the file, then go back to the start of the first frame to actually decode things.This is a problem with network based sources, because these aren't usually seekable.

The current implementation in WebKit uses a BMallocIO as a buffer, the whole file is downloaded to memory as fast as possible, then played from there. For this to work, you must have enough free RAM to store the whole video. Moreover, there isn't any checking of what the decoder reads, and if the download isn't fast enough, it will try to read parts that aren't downloaded yet. This of course doesn't work very well.

To improve on this, the buffer should be made aware of the fact that some parts of the data are missing. It can then make the decoder wait for them (by making the read blocking), and use HTTP range requests to fill the buffer from the place that the decoder wants to read. The buffer being aware of the current read and write positions, it could also be used to decide when to start playing, having estimated the download speed and media bitrate. This is what I'm going to work next, also bringing more reliable seeking support.

This smart buffer will also be able to delete old, already replayed data from memory, making it possible to play videos bigger than your free RAM.

<h3>Where is the release?</h3>

Not yet!

I ran the WebKit test suite tonight and found a lot of new crashes in the media tests. This doesn't sound good. I'll have a closer look at the results today and fix the crashing issues (at least), before I do a release of this. I also found that some websites still aren't working, but this isn't a regression from previous versions, so I don't think it should delay the release further.

See you next week!