+++
type = "blog"
author = "stippi"
title = "Overdue progress report on Media Kit and MediaPlayer"
date = "2011-02-12T16:15:08.000Z"
tags = ["media", "ffmpeg", "contract work"]
+++

<p>
Going through some backup files on my hard drive, I discovered a blog entry about my work on the Media Kit and MediaPlayer, which I for some reason never published. Even though it's about work which happened some time ago, I am going ahead and publish it anyway, perhaps it's still an interesting read for some. Here it goes:
</p>

<p>
While I was contracted to work on the port of WebKit to Haiku, and later on WebPositive, I've written regular enthusiastic blog entries to report on my progress. This time around, I haven't felt confident in the results of my work up until now. Getting the FFmpeg plugin to perform decently was quite a piece of often frustrating work.
</p>

<!--more-->

<p>
Before I can explain what my work has been and the obstacles I faced, I should probably get some nomenclature out of the way. The FFmpeg software is composed of several libraries, of which the most important ones are libavformat, with many implementations for multi-media container formats, and libavcodec, composed of many encoder/decoder implementations, which can decompress and compress the media streams in those container files. In BeOS API slang, <code>BMediaFile</code> represents the container, and <code>BMediaTrack</code> the different streams of media within such a container file.
</p>

<p>
The Haiku Media Kit manages plugins, which expose the backends for <code>BMediaFile</code> and <code>BMediaTrack</code>. For reading files, those would be <code>Reader</code> plugins and <code>Decoder</code> plugins respectively. Previously I had also created the <code>Writer</code> and <code>Encoder</code> API for plugins. The FFmpeg plugin exposes all four kinds of plugins, mapping to libavformat demuxers and muxers (<code>AVFormatContext</code>), and to libavcodec decoders and encoders (<code>AVCodecContext</code>).
</p>

<p>
FFmpeg is written primarily with media players in mind. Media players don't have the same requirements on accuracy that the Haiku Media Kit needs to offer to more advanced applications. If an application asks to seek a multi-media stream to the nearest keyframe backwards from a certain position, it won't do to seek to a keyframe forward from that position. But that's exactly what FFmpeg will (sometimes) happily do, even if you specifically ask to seek backwards. Modern container formats like MP4 and MKV started to work pretty nicely early during my work. But some other containers worked so badly that seeking didn't work at all. Later while trying to get things to work I started approaching the problem much less elegantly than in my previous attempts: For every <code>BMediaTrack</code> exposed by the Kit, the FFmpeg plugin uses two independent <code>AVFormatContext</code> structures to exract the stream, one of them with the sole purpose of testing where exactly in the stream libavformat is able to seek to. FFmpeg does support an API for finding seekable positions in streams, but it simply does not work reliably for every supported container.
</p>

<p>
FFmpeg itself is designed with one <code>AVFormatContext</code> structure per file in mind, and a single thread extracting packets from the container and attaching them to individual packet queues per stream in the file. This design does not allow reading the streams independently - not something a media player needs, but something the Media Kit offers. Just imagine an audio/video composer, where you can simply move the audio and video track of the same file independently from each other on the timeline. The Haiku FFmpeg plugin supports this use-case. Each stream can be extracted and decoded on its own, within a dedicated thread, without disturbing the exraction and decoding of other streams, possibly from totally different positions in the container file. That's why it uses one <code>AVFormatContext</code> per stream. To support <code>BMediaTrack::FindKeyframeForFrame()</code> correctly (which does not change the current position of the stream), the FFmpeg plugin uses another separate <code>AVFormatContext</code> per stream which can be seeked without disturbing the main <code>AVFormatContext</code> used for extracting packets. This approach was finally showing reliable results across a broad range of supported container formats.
</p>

<p>
Another drastic and perhaps controversial change I did was to throw out pretty much every other plugin written during the early times of Haiku development, and in some cases even during more recent times (MKV, MOV, MP4, APE). The main reason was that some of these containers had problems of their own, and they were simply not maintained enough to justify keeping them when the quality of the FFmpeg plugin had surpassed them. Most of these plugins were themselves based on external libraries, which is no different or any more <i>native</i> than the FFmpeg plugin. Obviously FFmpeg is <i>the</i> Open Source project to implement multi-media codecs, most other projects are base on it. Personally I had no doubts that eventually, the FFmpeg plugin could be made to work so well, that the other plugins would become obsolete. It is difficult to judge whether any individual container or codec plugin should have been written, without at least attempting to utilize the full potential of the FFmpeg plugin. After all, FFmpeg has been around for ages in the Haiku tree as well. On the other hand some people may say that the Haiku kernel should not have been written without a serious attempt at utilizing the Linux or FreeBSD kernel either. Perhaps it's not directly comparable, but I can understand if some people think it is. I have no doubt that the choices made in the past were believed to be the best options. In any case, I am sad to throw out some hard work, but at the same time, I just want decent and reliable media file support in Haiku. Because of the marketing that Be got spinning for BeOS, a lot of people associate BeOS with "The Media OS". Even though this was not deserved in many ways, it still sets the expectations for Haiku. In some architectual ways, BeOS was indeed a solid Media OS and Haiku has inherited the same architecture, but in more practical ways, the multi-media support in BeOS was pretty lame. In Haiku, it has now become decent enough so at least I wouldn't call it a bad joke anymore, but it's of course still lacking in many areas. Even the old VLC port for BeOS will still play some files better than MediaPlayer in Haiku, let alone the awesomeness of contemporary VLC on other platforms. To get even close to playing in the same league, much, much work has still to be done. Sadly a lot of progress in Haiku happens in very small steps only, I wish the Haiku developer force would simply be bigger. But at least the <i>basic</i> functionality of MediaPlayer is now working reliably for a great variety of different multi media files thanks to unleashing more of the potential that slept in the FFmpeg plugin.
</p>

<p>
Another area of my contract work has been dedicated to the MediaPlayer itself. Most of it to the engine, some of it more visibly to its interface. The work on the backend was about improving efficiency and most importanlty seeking in files. The end result of that could be considered decent. Seeking is a lot more snappy than for example in VLC, on any platform actually. It depends a bit on the file format. MP4 and MKV work best, but most others work pretty fluent, too. A few new features got implemented as well. There is new winding support using the left/right arrow keys on the keyboard. The same keys will step single frames back/forth when the playback is paused. There is support for .srt subtitle files located along media files. There is a new Attribute menu, to be fleshed out much more, currently offering to set the Rating attribute of the active file. I even got some help from Axel who implemented support for loading Tracker queries as playlists.
</p>

<p>
That should be it, as far as I remember. Hopefully everyone was satisfied with my work. Unfortunately I persisted some approaches to fixing the FFmpeg plugin which turned out to be unfruitful. Perhaps I could have done more in the time, had I had some ideas earlier. Then again I probably wouldn't have had the ideas without walking some wrong paths first. The life of the programmer. 
</p>