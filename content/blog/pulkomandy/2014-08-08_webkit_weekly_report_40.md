+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #40"
date = "2014-08-08T07:13:27.000Z"
tags = ["webpositive", "WebKit", "contract work"]
+++

Hello world!

This week most of my time was spent working on getting WebKit2 compiling on Haiku. WebKit2 is the new multi-process model for WebKit. It replaces the old WebKit1 that our port uses currently. WebKit2 spawns a new process for each tab, and possibly more (for network access, etc.). The key features are:
<ul>
<li>When a webpage crashes WebKit, only the tab showing this page is lost, not the whole browser</li>
<li>The use of more processes makes the application feel more reactive. As you know, the threading model in WebKit is not a perfect fit with Haiku's one, but splitting things in a separate process allows us to have a standard Haiku application as the visible browser shell</li>
<li>All the tricks of getting WebKit running (specific tweaks to BApplication and BWindows) are moved to the rendering process. This makes the BWebView API much simpler, as it will become just a plain subclass of BView, with no expectations on the BApplication or BWindow</li>
<li>The WebKit2 API is where all current WebKit development happens. WebKit1 lacks support for some features</li>
</ul>
<!--more-->
However, there is quite a lot of code to write before WebKit2 can be run. For a lot of things we can use our UNIX compatibility (threading, spawning processes, and IPCs). But some other things will be Haiku specific. This starts with the "run loop", which will be a BLooper receiving BMessages in our case. I also started implementing add-on support (a first step towards Netscape-style plugins support), and early support for using BBitmaps to send rendered page images from the rendering process to the browser shell. However, this is not quite enough to get things compiling yet, and it may be another one or two weeks before I have a binary to show.

I did some early work on OpenGL support, however I left this aside for now. The simplest way to plug WebKit to OpenGL is using EGL, which we should really add to our Mesa port as it's becoming the standard for allocating GL contexts. This used to be taken care of by platform specific APIs (for example GLX was used on X11), but with the Linux desktop switching to Wayland, and Android and iOS both using EGL, we have little choice but follow the trend here. We will of course keep the existing BGLView API, but EGL support would bring us a more up to date and more flexible solution. Once again, there is some work to do there before we have something to show.

WebKit developers have suggested we try to do this as soon as possible to avoid writing custom rendering code for Haiku, even if our OpenGL is currently software rendered, it would avoid writing and maintaining a lot of custom code for the rendering part. However, I don't know if the performance of software rendered OpenGL would be acceptable. In any case, working on EGL would benefit some other apps as well, and once running, testing the OpenGL enabled WebKit would be much easier.

I also did some work on the existing WebKit1. Only two small changes this week however: waddlesplash provided an improved CSS style for the directory listing (used by the file and gopher protocols, and soon by FTP), which I integrated ; and I fixed yet another bug in the networking code that removed another possible crash. I made the changes to the rendering code in WebKit 1.4 fully optional again, as there were many complaints that they make browsing much slower. I'm still not sure which is the best way to go with that, however. The two rendering modes have drawing glitches in different places and I don't think there is a way to dynamically switch between them depending on the page being rendered.