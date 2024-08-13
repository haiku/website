+++
type = "blog"
title = "[GSoC 2024] Can I get discuss.haiku-os.org to work?"
author = "Zardshard"
date = "2024-08-13 08:58:24-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

So I've implemented mouse support. It also turned out to be really easy to fix text rendering. So, what's next? Well, some websites like https://discuss.haiku-os.org cause WebKit to crash. This crash also seems to affect other websites. Really, it seems to occur anytime WebKit decides to use multiple bitmaps (actually, in WebKit lingo, backing stores) to render a web page. Rendering a single bitmap is easy, just display it! But when you have multiple, you need to composite them together. It seems like WebKit currently requires EGL and maybe OpenGL to do this.

So what will it take to fix it?

1. Maybe a simple hack or two can stop WebKit from using multiple bitmaps in the first place. This would be the simplest if it works. There may, however, be situations were compositing is absolutely necessary, and so those hacks would cause WebKit to crash.
2. Maybe I can get it to composite the bitmaps without EGL by making my own implementation. Of course, that means we would need to maintain our implementation as WebKit receives updates.
3. Maybe EGL works well enough on Haiku that I can use it. This may require us to use OpenGL as well to do the final compositing. This would likely be the easiest to maintain.

Let's hope I can get this done before the end of GSoC!

