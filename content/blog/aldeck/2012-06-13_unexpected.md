+++
type = "blog"
author = "aldeck"
title = "Unexpected"
date = "2012-06-13T01:32:23.000Z"
tags = ["webkit webpositive contract", "WebKit", "webpositive", "contract", "contract work"]
+++

After a week of struggling with my friend the compiler, I finally managed to bring the port into a buildable state again. Porting the latest changes to libwebkit, the last of the four WebKit subcomponents (libwtf, libjavascriptcore, libwebcore, libwebkit), took me more time than I anticipated but to my great surprise, after I fixed the first runtime crash, HaikuLauncher and WebPositive would run and be almost usable. Yes, there are visual glitches, and it is quite easy to crash, but you can search google, use maps, facebook, haiku-os.org and post this blog post.

This was totally unexpected, I would have considered it normal to struggle with numerous crashes on startup, but it seems that I didn't broke that many things in the upgrade. The first thing that I noticed was the overall snappiness even in debug mode and, after looking for a simple load time benchmark, I confirmed that first impression. This <a href="http://cache.lifehacker.com/assets/resources/stopwatch.php">benchmark</a> shows a ~3x improvement in load time. Javascript is substantially faster too, but you know that already if you read my last post.

This is really encouraging, especially for me, as I've now got something to click and play with... after discussing with a compiler for almost a month :-)

Now the real work begins, fix all regressions and provide a solid release, one that can run the most important sites correctly. And if I've got some time left, I'll look into bringing new features and enhancements. But don't count too much on that, if prefer concentrating on a solid base for now.

<a href="/files/images/aldeck_2012-06-12.png">Screenshot</a> (sorry I couldn't manage to embed the image)