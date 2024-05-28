+++
type = "blog"
title = "[GSoC 2024] Fixing the crashing"
author = "Zardshard"
date = "2024-05-28 10:06:53-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

![MiniBrowser crashed after attempting to visit a website. Only MiniBrowser and WebProcess show up in the Deskbar.](/files/blog/zardshard/MiniBrowser_development/1.png)

Currently, MiniBrowser (the simple browser that we use to test WebKit2) crashes rather easily. It crashes when it is closed, but that's not *too* bad. Unfortunately, it also crashes when trying to navigate to a website (shown above)! I will be working on fixing this crash first.

For those who aren't familiar with WebKit's code, that's all I can really say. But if you are familiar, then keep reading. WebKit wants to know how I will fundamentally approach porting WebKit2.

## The technical details

So why does it crash? It's because we return a nullptr in the following function:

```c++
// Comments have been added/removed for clarity.
std::unique_ptr<DrawingAreaProxy> PageClientImpl::createDrawingAreaProxy(WebKit::WebProcessProxy& processProxy)
{
#if USE(COORDINATED_GRAPHICS) || USE(TEXTURE_MAPPER)
    // We don't have coordinated graphics or texture mapper enabled, so
    // this code isn't run.
    return std::make_unique<DrawingAreaProxyCoordinatedGraphics>(*fWebView.page(), processProxy);
#else
    // Behold, we return a nullptr. The code will crash because of this!
    return nullptr;
#endif
}
```

How will I fix it? The most obvious method, as hinted by the code above, is to enable coordinated graphics. But what is coordinated graphics exactly? Does it require OpenGL? Can't I just copy whatever the legacy version does and move on?

I've got an idea about the answers to some of these questions. But the codebase is *massive* and I still don't know exactly what is going on, so take what I say with a grain of salt.

Coordinated graphics appears to be a way of coordinating rendering between the UIProcess and the WebProcess. It wasn't necessary in WebKitLegacy since everything lived in one process. But, now that the web page is split into its own process, the UIProcess needs a way to coordinate with the WebProcess to do the rendering. The UIProcess needs to notify the WebProcess whenever the window gets resized, scrolled, zoomed, etc. The WebProcess then needs to do the actual drawing, and tell the UIProcess to display the result.

What a complicated process! But it doesn't seem to inherently involve OpenGL, so it seems okay to enable. So I enabled coordinated graphics and recompiled WebKit. Unfortunately, it failed to compile since, these days, it seems coordinated graphics also wants the TextureMapper to be enabled. What's that? Does it require OpenGL? It seems TextureMapper is an abstraction layer to make supporting different forms of compositing easier. Different GPU APIs have their own unique quirks and optimizations that can be performed, so making an abstraction layer can hopefully hide this complexity. Luckily, texture mapper also appears to support software rendering, so enabling it should be fine.

Will the code now compile successfully? I don't know yet, it is still compiling!

### Navigating the jungle

WebKit's code presents many options of doing things. Some of them may simply be illusions from my lack of experience working with WebKit. Others may be insanely hard to make work. So how do I choose the path to take going forward? For example, do I enable coordinated graphics, or do I not?

So far, one guiding principle has emerged: try to stay on the beaten path as much as possible. Other developers have forged paths that are relatively clear of obstacles, and we don't have the time or the energy to maintain our own path.

For example, using coordinated graphics without texture mapper may be possible and may be better than using it with texture mapper, but that would require spending a lot of time investigating the possibility, determining if it is actually beneficial, creating the code for the path, and maintaining it as WebKit changes. Yikes! that's a lot of work.

Of course, we may still want to make some small deviations where appropriate. For example, it would be nice to avoid using OpenGL, and if it takes some small deviation, I would be fine with that. But the deviation had better not be too big, or I will run out of time and maintainers will have a difficult time maintaining it.

The jungle may be large, but there is hope: WebKitGTK's MiniBrowser works on Haiku and appears to be just as fast as WebPositive, so there should exist at least one path created and maintained by WebKitGTK through the jungle. And even if this path happens to rely on OpenGL, WebKitGTK shows us that it isn't too bad. Thanks WebKitGTK!
