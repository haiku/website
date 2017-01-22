+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #29"
date = "2014-04-25T07:26:51.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello world!

Work continues on the testsuite: I found one bug in the testsuite system that greatly improved the results. Things are now properly reset between each test, which avoids many of the issues I was having. The last test run breaks down as follows:

<ul>
<li>2 unexpected crashes</li>
<li>2300 unexected failures</li>
<li>400 unexpected successes</li>
<li>5000 tests have no reference</li>
<li>And the remaining 30000 or so tests are now properly tagged</li>
</ul>

I will continue marking the failing tests as expected to fail, and review them in case I find one that's easy to fix. The 5000 "no references" tests are easily fixed, we just need to generate a reference rendering of the page. This is because these tests have platform-specific results, so there is no common reference for all platforms, and we need a haiku-specific one.

<!--more-->

A lot of the remaining failures are problems of different font sizes, and various other things we don't support.

During this test review, I found (and fixed) two potentially crashing bugs. One was a missing null termination in a string when encoding a canvas image as a data URL. The other was when extracting a rectangle from an image to copy it to a canvas. We didn't properly handle negative coordinates for the rectangle, which javascript allows, and we ended up writing data outside of the allocated memory for the image, corrupting the memory allocation structures with weird effects. Fortunately, libroot_debug was helpful in finding this.

There was some progress on features for WebKit and WebPositive as well. I reworked the web socket patch provided by one of our GSoC students Akshay, who will be working on the LibUSB port. His patch was mostly working, but had trouble with receiving data from the network after the web socket had been closed by WebKit (for example when leaving a page). This means we now have a fully working Web Sockets implementation.

I made many smaller changes, such as adding the accept-language header so pages will show in your native language (as set in the locale preflet) whenever possible ; the download directory is created when it doesn't exists (download would not start if Web+ was set to a non-existent directory before that change) ; HPKG files are recognized by extension and downloaded (until web servers become aware of the HPKG mime type, this has to be worked around in the browser...). I will also soon be adding the "save page" menu, I have it working in HaikuLauncher, and the code will be added to Web+ as I release HaikuWebKit 1.3.1.

There were several changes on Web+ side as well. The download window is activated when starting a new download if it was already open in the background, making it easier to see that the download did start. Finished downloads pop up a notification, and the progress bar turns red on failure, and green on success, making it easier to identify failed and finished downloads. While working on this, I also changed the look of the notification window, which has a red stripe on the left side for error notifications, instead of the whole background being red.

The tab list button got a small usability fix, and I also added a bookmark bar. While these are all small changes, I believe they add up to a great usability improvement for Web+. Thanks to all the people who took the time to open bug reports about these missing features, and please continue doing so. It may take some time for these to be implemented, but they will come one day or another.