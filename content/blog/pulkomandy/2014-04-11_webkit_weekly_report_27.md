+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #27"
date = "2014-04-11T06:54:31.000Z"
tags = ["WebKit", "webpositive", "video", "contract work"]
+++

Hello world!

Progress on WebKit this week happens in various areas.

On the testsuite first: I fixed several small issues that triggered asserts when WebKit was built with asserts enabled. This includes a problem with the sequencing of events when loading an invalid URL, and a double deletion of an object when iframes are involved. These two problems could have created some real-world issues, so WebKit should be a little bit more stable now. Another problem was the lack of "key up" events and mixup of keycodes vs characters in the testsuite keyboard simulator, which prevented us to test the editing code in an useful way. Another problem was some browser settings were modified by some tests (such as the text size, and page zoom factor), and not reset before running the following tests. This led to some unexpected errors which are now avoided. With these issues fixed, I can have a look at the remaining failing tests, knowing that they are more likely to uncover actual bugs.

<!--more-->

On the new features: I enabled MHTML support. The main goal for this is getting the MHTML tests to pass, but it can be useful to save HTML pages with their resources, too. MHTML is a multipart MIME file, which means it can store both an HTML file, and all the resources it needs (css, js, pictures, everything). This is, I think, better than putting them in a separate folder next to the html file. Such files could be used for application documentation, for example. I added MIME types and sniffing rules for this and XHTML to Haiku, so Web+ can now open those properly (before this it would identify XHTML files as HTML, which works unless you are using advanced XML features such as CDATA). The testsuite was complaining because of this.

I also fixed support for Javascript animations, making it possible to play the 2048 game (works well), as well as Clumsy Bird (with some bugs). Clumsy bird also needed rotation support, which was very easy to do with the affine transform code implemented earlier, but was left aside for lack of a test case. This is now implemented.

The JSC command-line interpreter will be provided in the webkit package. You will be able to write scripts in js for Haiku.

I continued the work on video support, also fixing many bugs. We now use a css+js implementation of media controls, which means less code to write (and it also looks better). The code for this is now completely shared with the EFL and Apple ports. I also started reworking the loading code to be safer, preventing the media kit from reading data from the buffer before said data is actually downloaded. This avoids some strange decoding errors. I fixed various issues in the media player events, which helped with the testsuite at areweplayingyet.org.

On Haiku side, there were some fixes as well. The network kit will now try to identify files when handling file:// requests, if the BEOS:TYPE attribute isn't set yet. This will allow apps loading files this way to get the proper MIME type. HTTP requests will automatically handle 302 and 307 redirects like they did for 301 (this makes Jamendo.com music player work). The ffmpeg plugin advertises decoding support for 3gp and webm videos, which helps with some Youtube videos that use those formats. I started work to support HTTP range requests, allowing to download only parts of a document. This will be used by the video playing code in WebKit, because ffmpeg identifies files by reading a few bytes at the start and at the end of the file. This means the download won't start until the end of the file is downloaded, and if we download in order, it means we have to wait for the whole file before we can start playing.

The idea is to download the start of the file, and ask ffmpeg (through the media kit) to decode that. The media plug in then tries to read from our buffer. At this point, we can detect where it is trying to read, and start a range request for that part of the file. We cancel the media decoding, and restart it after the missing bit of the file is downloaded (anothe rsolution would be to block the ffmpeg read request until the data is ready, but this doesn't work too well with the single-threaded design of WebKit). We repeat this until we have downloaded enough parts of the file for ffmpeg to identify it (and this would work with any other decoding plugin). Once the track is identified, the following reads will happen in-order from the start of the file, so it's not useful to start extra range requests, but we still can track the progress of the decoding, and pause it if it gets dangerously close to the not-yet-downloaded part of the buffer.

So, what comes next? I'm currently building the 1.3.0 release of WebKit featuring most of these changes (except the range request stuff). I will commit this today, including the needed changes to the services kit API for range request support (one of the methods got an extra parameter). Next week I'll continue work on range request support, try to get the remaining parts of areweplayingyet to pass, and fix some other bugs in the audio/video code. I will also spend some time reviewing the drawing code, which is still very slow in some cases, since the introduction of the clipping system.