+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #38"
date = "2014-07-25T07:37:55.000Z"
tags = ["WebKit", "webpositive", "app_server", "rmll", "contract work"]
+++

Hello there,

As mentioned in the previous report, two weeks ago I attended the RMLL conference. As usual this was quite interesting, and an occasion to show Haiku to more people in the free software community. We got only about 10 persons attending our conference and 4 attending our workshop on making Haiku packages. However, the main event was the "Libre Village" where we got to meet people and try to get as much of them as possible to try Haiku. I played Critical Mass with some people there, and also helped porting PyTouhou to Haiku.

<!--more-->

Last week I worked only 3 days (back on WebKit) so I'll be reporting about the changes made in these two weeks now.

First of all, there was a problem in the 1.4.1 release not working in the nightlies. olta, js and jessicah worked on sorting out the issues with our cross compiler and things should be working fine now. This new build of WebKit makes use of ELF TLS support which was added by pdziepak. This should slightly improve performance and startup time.

However, the performance drop in 1.4.1 is very noticeable, and most people have complained that it is very slow, especially on virtual machines. Moreover, there are some severe drawing bugs that I thought were fixed, but that are in fact still there, and a few new problems were reported.

So, during these two weeks I worked on many small fixes and improvements to the drawing code in order to improve the situation.

<h3>WebKit</h3>

The first fix is a more correct implementation of BLOB support. Blobs are used when uploading data in html forms and are a data structure allowing a mix of files and raw data to be uploaded. We didn't handle this properly, and websites trying to use it would crash.

Support for the Content-Disposition header was improved, so websites can now use it to force a file to be downloaded instead of shown inline.

I fixed a bug when converting a POST to GET when following HTTP redirects. Some headers were left in the request when they should have been removed, confusing some websites.

I modified the WebKit drawing code to more properly handle transparent drawing in some cases, leading to improved performance and more support for transparent images.

I fixed an important memory leak of BUrlRequest objects in WebKit. It should use less memory over time now. I also fixed some minor issues with the BUrlContext, but this only allows running Web+ with a debug mode BReferenceable.

<h3>Haiku</h3>

I fixed a bug in Web+ "open containing folder". It will work more safely now and select the downloaded item in the opened window.

I made a change to the service kit to send all the HTTP headers in one go instead of splitting them into many small packets (one for each header). This shouldn't be needed, but some buggy HTTPd didn't work otherwise.

I fixed an issue with chunked gzipped HTTP, where flushing the received data wouldn't work and pages would get truncated.

Our libbind will now allow underscores in domain name, as used by many CDNs over the internet. This may improve your ability to listen to online radio or watch videos on some websites.

Finally, I fixed two app_server issues with gradients. Gradients with an alpha channel would not work, and the radius of radial gradients was not actually used.

So, these two weeks I worked only on small things, but the overall result is a much improved browser on both the rendering and networking sides. I will continue to hunt down the bugs and add missing features (next up is dashed lines support and gradients on text to make our SVG rendering even better).