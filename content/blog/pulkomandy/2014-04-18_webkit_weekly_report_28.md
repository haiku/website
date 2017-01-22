+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #28"
date = "2014-04-18T08:13:08.000Z"
tags = ["WebKit", "contract work"]
+++

Hello everyone,

Slow progress on the code this week...

I fixed two small issues in the video decoding code: a useless notification was sent, leading to very high cpu usage on jamendo.com (and possibly other places). And, the video drawing was not always using B_OP_COPY. This led to CPU waste as the mode used could be slower (B_OP_OVER has to scan each pixel to see if it is transparent), and created some drawing glitches on some videos.

<!--more-->

Another optimisation was in the copying from the rendering bitmap to the view. We always copied the whole bitmap at the slightest change. Now we copy only the part that needs updating. This doesn't help with slow scrolling, but it helps in a few other cases such as a link getting highlighted when the mouse hovers it (only the small rectangle around said link is copied, instead of the whole window). This should make the browser feel slightly faster, but still not as much as we'd like.

I implemented scaling using the transform support, which will also slightly improve performance (the transform matrix was used anyway, so merging the scaling into it makes one less operation). It also allows different scaling on X and Y axis, allowing distorting objects.

As usual, WebKit was updated to the latest version, with cleanups and optimizations from the WebKit team. No breakthrough change.

Most of my time this week was spent on the testsuite. I ported libexecinfo from FreeBSD, which allows WebKit (and other programs that wish to use it) to get their own backtrace. WebKit uses this in the assertion failure handler, making it a bit more easy to debug those. I tweaked our MIME sniffing rules to get better results (some HTML files were detected as SVG, for example). This slowly improves our testsuite results, but there are still a lot of failures (about 11000 tests out of 36000 don't give expected results). The good news is very few of these (12) are crashes, in only 2 places, which is a good sign for the stability of the port (there are more real-world crashes, but they are related to network problems, which the testsuite currently doesn't check).

And that's it for this week.