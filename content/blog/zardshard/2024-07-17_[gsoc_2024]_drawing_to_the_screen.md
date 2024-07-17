+++
type = "blog"
title = "[GSoC 2024] Drawing to the Screen!"
author = "Zardshard"
date = "2024-07-17 09:03:04-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

WebKit wasn't trying to draw anything to the screen. Turns out, it wasn't aware that it was visible. No use drawing a web page when you're invisible, right? Well, I told it that it is visible, and now it's trying to draw to the screen. Of course, it crashes while trying to do so. It hasn't tried to draw to the screen in ages. Everything is bit rotted!

So far, it looks like this will mostly be a collection of minor tasks. Nothing worthwhile to write about here yet, at least. If I'm lucky, it will stay that way and we can have a nice web page displayed by WebKit pretty soon.

In the past, it has looked like I would need to implement OpenGL or EGL before I could get things to display on-screen. I'm getting more hopeful that I can avoid those. Yes, it requires OpenGL and EGL to compile, but it seems as long as I never request "accelerated compositing mode", WebKit will stick to software rendering. But, at the end of the day, we shall have to see what happens with that.

So regardless of whether it will be smooth sailing or rough, I set out.
