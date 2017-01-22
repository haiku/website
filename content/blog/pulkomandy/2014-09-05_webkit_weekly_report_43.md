+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #43"
date = "2014-09-05T07:20:46.000Z"
tags = ["WebKit", "webpositive", "contract work"]
+++

Hello there,

This week most of my time was spent on debugging. My new machine is running fine, and now building WebKit takes a little more than an hour, which is much better than the 4 hours I was getting on the old laptop. With a 4 thread CPU machine some concurrency and locking issues became much easier to reproduce. This led to identifying and fixing a bug in our BSecureSocket class, which was not properly setting up SSL for thread-safe operation. I think this will fix most of the remaining memory corruption problems.

<!--more-->

Some of the other bugs fixed include not updating the URL bar when navigating to an anchor in the same page (we were waiting for a network load to start to update the URL, but that doesn't happen when navigating inside the same page), not resetting the page title when opening a page without title (wrong variable name was used...), another concurrency issue in the video drawing code, and a crash because of an enabled, but not properly implemented, WebKit feature (now disabled). These minor bugfixes make use of WebKit and Web+ much better.

More important is the debugging of the remaining drawing issues. As I mentioned in last week report some drawing issues that were fixed in the 1.4 release were back in 1.4.3 as I had to switch back to the previous drawing mode for performance reasons. However with all these experiments I got a better understanding of how the drawing is supposed to work, and with all the work done in app_server to support picture-based clipping I could fix the remaining issues. So we now have proper alpha-channel composited layer supports, and also (partial) rendering of "3D transformed" objects.

The alpha channel layers are implemented using clipToPicture with a partially transparent picture (filled with transparent white), effectively multiplying the layer alpha channel with the picture one. This code was written some time ago, but was disabled because it didn't work as expected. I could identify the problem this week, it was a bad computation of the layer position that didn't take scrolling into account at the right place. We would end up drawing the layer content outside of its bitmap, and thus not drawing anything.

The "3D rendering" part is related to the use of 3D transformations from CSS (using the -webkit-transform property). This is meant to be used for actual 3D transforms of HTML blocks, but the most frequent use is with an identity transform (that does nothing). Web designers found out that doing this would force most browsers to render affected blocks using the GPU, making them render faster. The problem is we had this feature disabled, and as a result, WebKit would not even try to draw these items for us. In release 1.4 I had the feature enabled, but also enabled a default implementation for it that was quite slow, and required all web pages to be rendered as if they were 3D. This was useless and very slow. However it helped setting up the separate rendering path for the so-called 3D stuff. With this in place, I now have the pages rendering the old (fast) way again, with just the 3D parts going through the new code path. Moreover, I have implemented the rendering to plug into the existing code for Haiku so it is not too slow. The drawback is that app_server currently doesn't support 3D transforms, so instead we compute a roughly matching affine transform. While this works well for the common use case of an identity do-nothing transform, the results for actual 3D rendered items will look wrong. But at least we display something, now.

To close this report, I must also mention that I merged the current WebKit code (as I do every week) and enabled the parallel garbage collector for Javascript, which may improve performance and smoothness of Javascript stuff as it doesn't need to stop the whole script execution when garbage collecting.

The plan for next week is investigating some of the remaining drawing and crashing issues, fixing as much as possible of them, and do a new release. I think we will then have a stable and well-working browser ready for the alpha 5 release. I also need to implement proxy support and the warning message for unknown SSL certificates for the alpha. This should close this bugfixing sessions so I can spend time on the more "future" oriented work: WebKit2 and OpenGL, for example.