+++
type = "blog"
title = "Notes on WebKit's Internals"
author = "Zardshard"
date = "2024-10-28 10:16:55-04:00"
tags = ["WebKit", "tutorials"]
+++

This document is largely an expansion of notes I wrote while working on HaikuWebKit. It is mostly arranged in no particular order, so feel free to skip around.

<div class="alert alert-info">
To those working on WebKit, welcome! This blog post is primarily for those working on HaikuWebKit, Haiku's fork of WebKit, but it may also be useful for you.
</div>

Prerequisites
-------------

If you want to contribute, you should know that WebKit is a large codebase and can often get quite complicated, so be prepared. If you're a beginner, there are other parts of Haiku that are easier to work on.

The components of WebKit
------------------------

WebKit has five major components

* WTF - A standard library of sorts made just for WebKit
* JavaScriptCore - Contains the JavaScript interpreter
* WebCore - Has almost all of the code to make web pages, render them on screen, process user interactions, etc. In theory, you could make a web browser use this directly, but that would likely be pretty difficult.
* WebKitLegacy - This is simply an easy-to-use API for WebCore. It runs everything in a single process so it’s relatively simple.
* WebKit2 (often simply called WebKit) - This is also meant to be an easy-to-use API for WebCore. It runs various parts of WebCore in different processes, which makes it more complex than WebKitLegacy.

WebKitLegacy vs. WebKit2
------------------------

WebKitLegacy puts everything in a single process whereas WebKit2 has multiple processes. IIRC, this splitting required a rather different API that was not backwards-compatible with WebKitLegacy and so required a rewrite, yielding WebKit2! The advantage of WebKit2 putting everything into different processes is that one part crashing won't crash the whole browser. Also, it is actively developed whereas, as far as I know, WebKitLegacy only receives bug fixes.

WebKit2's processes
-------------------

As mentioned before, the primary difference between WebKit2 and WebKitLegacy is that WebKit2 splits the browser up into several processes. We use three of those processes: UIProcess, NetworkProcess, and WebProcess. We do not use GPUProcess, PluginProcess, or ModelProcess at present.

### UIProcess

UIProcess refers to the process of the browser's UI. This process will be supplied by the browser, not WebKit. WebKit will simply run code from the UIProcess in the browser's process. It is responsible for drawing the web page to the screen after it has been rendered by WebProcess and notifying WebProcess of input events. If the user navigates to a new URL, it is UIProcesses's job to tell WebProcess to do that. UIProcess is responsible for starting WebProcess and NetworkProcess if necessary and closing them down if necessary.

### WebProcess

Each web page gets their own WebProcess. The WebProcess parses the HTML, calculates the layout of the page, reads CSS, and runs JavaScript code. It takes in inputs from the UIProcess and sends the rendered web page to the UIProcess using shared memory.

### NetworkProcess

NetworkProcess, naturally, is responsible for networking.

The files
---------

With that theory out of the way, it is relatively easy to understand the file tree. Some notable files are

* Tools/
    * HaikuLauncher/ - Test browser for WebKitLegacy
    * MiniBrowser/haiku/ - Test browser for WebKit2
    * Scripts/check-webkit-style - Checks coding style
* Source/
    * cmake/ - The core files of the build system
        * OptionsHaiku.cmake
    * JavaScriptCore/ - Runs JavaScript
    * WTF/ - A kind of standard library. Contains string utilities, random number generators, etc.
        * wtf/haiku/
            * RunLoopHaiku.cpp - Contains our implementation of the run loop
    * WebCore/ - The back-end for almost everything web-related
        * PlatformHaiku.cmake - The index to everything Haiku-specific in this directory
        * platform/haiku/
            * DragDataHaiku.cpp
            * MainThreadSharedTimerHaiku.cpp
            * PlatformKeyboardEventHaiku.cpp
            * PlatformMouseEventHaiku.cpp
            * SoundHaiku.cpp
        * platform/graphics/haiku/
            * BitmapImageHaiku.cpp
            * FloatPointHaiku.cpp
            * FontHaiku.cpp
            * ShareableBitmapHaiku.cpp
            * GraphicsLayerHaiku.cpp
    * WebKit/ - The new API that splits the engine across multiple processes.
        * PlatformHaiku.cmake - The index to everything Haiku-specific in this directory
        * UIProcess/ - Everything related to the ui process.
            * API/haiku/ - Home of WebKit2's API
                * WebView.cpp
                * misc. support classes
            * haiku/
                * BackingStoreHaiku.cpp - Holds the rendered web page
        * WebProcess/ - Everything related to the web process. The web page runs inside of this process.
            * haiku/
                * WebProcessMainHaiku.cpp - This contains is the entry-point for WebProcess.
                * WebProcessHaiku.cpp
        * NetworkProcess/ - Everything related to the network process. This does the networking.
        * Shared/ - Code shared across the three processes
            * CoordinatedGraphics/ - Allows WebProcess to draw and UIProcess to display
            * haiku/
                * NativeWebMouseEventHaiku.cpp
                * ProcessExecutablePathHaiku.cpp
        * Platform/ - Also code shared across the three processes?
            * IPC/ - Allows the three processes to communicate with each other
                * haiku/
                * unix/ - Yes, we use UNIX sockets for IPC.
    * WebKitLegacy/ - The old API. It runs everything in a single process.

[What is WebKit?](https://github.com/WebKit/WebKit/blob/main/Introduction.md#what-is-webkit) also has a nice explanation for some of the folders.

RunLoops
--------

WebKit needs to be cross-platform. So instead of using `BLooper`s directly like a native application, it uses a generic abstraction: `RunLoop`s. We implement `RunLoop` using our native classes.

Here's a good summary of what a `RunLoop` does:

> The job of a RunLoop in WebKit is to receive and perform tasks. A thread with a RunLoop running will do nothing until it receives a piece of work to perform. It will then perform the work and go back to doing nothing. If multiple pieces of work arrive at the same time, RunLoop will queue the work and work on them one at a time. If this sounds like BLoopers, that's because they are! In fact, we use BLoopers to implement RunLoops on HaikuWebKit!
>
> ([source](https://www.haiku-os.org/blog/zardshard/2024-08-16_gsoc_2024_porting_webkit2_final_report#3-nothing-is-being-displayed))

We implement RunLoops using `BHandler`s. If the thread has an existing `BLooper`, we attach the `BHandler` to that. If it doesn't, we create one.

**Code:**
* Source/WTF/wtf/haiku/RunLoopHaiku.cpp

### What events trigger a RunLoop to run code?

WebKit always runs code in response to something. Otherwise, it does nothing.

WebKit's UIProcess shares a looper with the BApplication. Code in the UIProcess therefore is run for one of two reasons: the BApplication called it, or it received a message that it decided to answer itself.

WebProcess and NetworkProcess each get their own BApplication, and so get their own BLooper. Code only runs there in response to being launched or because of receiving a message.

Now, WebProcess would like to rerender the WebPage 60 fps. How does it do that? With a timer! After a delay, the timer (BMessageRunner) sends a message to the WebProcess, letting it render everything again.

IPC
---

We use UNIX sockets for IPC. The reason we don't use `BMessenger`s is that the API isn't quite powerful enough (for details, see the thread starting [here](https://discuss.haiku-os.org/t/gsoc-2024-fixing-ipc-in-webkit-haiku-project/15190/3)). `BMessenger`s can be extended to have the capabilities required, but we decided to use UNIX sockets instead because they work and require very little maintenance on our part. When UIProcess launches a process, it will also create a UNIX connection to it (see Source/WebKit/UIProcess/Launcher/ProcessLauncherHaiku.cpp ProcessLauncher::launchProcess). Finally, WebProcess and NetworkProcess establish a connection directly with each other by passing a socket pair between themselves using UIProcess as the intermediary.

**Code:**
* Source/WebKit/Platform/IPC/unix/ConnectionUnix.cpp
* Source/WebKit/UIProcess/Launcher/ProcessLauncherHaiku.cpp

**Further reading:**
* [Fixing IPC in WebKit](https://discuss.haiku-os.org/t/gsoc-2024-fixing-ipc-in-webkit-haiku-project/15190)
* [Fixing IPC](https://www.haiku-os.org/blog/zardshard/2024-08-16_gsoc_2024_porting_webkit2_final_report#4-fixing-ipc)

The ports
---------

As you browse the directory tree, you'll see several folders over and over again in different directories. These contain technology-specific code. They can contain inspiration for how to implement unimplemented functions on Haiku.

Some of the folders you'll find repeated across WebKit relate to the ports of WebKit. They are

* haiku - that's us!
* gtk - https://www.webkitgtk.org/
* wpe - https://wpewebkit.org/
* playstation
* win - Windows
* ios
* mac

Here are some of the other folders. They don't relate directly with any of the ports, but are used in some of them:

* glib - Contains implementations of functions using the [GLib](https://docs.gtk.org/glib/index.html) library.
* unix - Contains implementations of functions using things available on UNIX.
* cocoa - Contains implementations of functions using the [cocoa](https://en.wikipedia.org/wiki/Cocoa_\(API\)) API.
* soup - Uses [libsoup](https://libsoup.org/libsoup-3.0/)
* curl - Uses curl
* skia - Uses [skia](https://skia.org/)
* cairo - Uses [cairo](https://www.cairographics.org/)
* and several others

**See also:**
* https://docs.webkit.org/Ports/Introduction.html

PLATFORM vs HAVE vs USE vs OS
-----------------------------

Quite often in the code, you'll see `#if PLATFORM(HAIKU)` or `#if OS(HAIKU)`. They're all quite similar, but there is a way to use them properly. Source/WTF/wtf/Platform.h's comments explain when to use these quite nicely.

Logging
-------

Logs are not printed to the console, but to a special program called DevConsole.

> To facilitate debugging with multiple processes, logging is done using the DevConsole tool. This allows clearly tagging each log with the originating process (especially useful for WebKit2 where there are multiple processes).
>
> Logging can be controlled using the WEBKIT_DEBUG environment variable. The default is to have all logs disabled. You can enable everythin by setting the variable to "all", or enable specific debug sources. Most logs require some compile time options as well.
>
> ([source](https://github.com/haiku/haikuwebkit/?tab=readme-ov-file#logging))

Building
--------

Some documents on this topic:

* https://github.com/haiku/haikuwebkit/blob/haiku/README.markdown
* https://www.haiku-os.org/blog/zardshard/2024-05-15_building_webkit_sensibly/

History
-------

HaikuWebKit has been moved across several repositories in its history.

1. Jul 17, 2009-Sep 25, 2011: Port was in the upstream WebKit.
   * First commit may be https://github.com/WebKit/WebKit/commit/f808a8e0712f3c2619e45c5e4aa6213ab0cf4b3c (aka https://github.com/haiku/webkit-old/commit/8630eaa003c63558969f14b36e91f5e32d8a506e)
   * Port was removed from upstream https://github.com/haiku/haikuwebkit/commit/a122030fdef455dcce362b8553cef6f85987f446
3. until January 17, 2021: Port continued at https://github.com/haiku/webkit-old
4. January 17, 2021-today: History was rewritten and port continued at https://github.com/haiku/haikuwebkit/

If you're ever git blaming, start with https://github.com/haiku/haikuwebkit/. If you encounter the commit [Haiku: New files making up the Haiku WebKit port ](https://github.com/haiku/haikuwebkit/commit/ee042b725ef38e8414dbbec767aaf5b573cb0dbc), move on to https://github.com/haiku/webkit-old.

**Note:** There's been a lot of rebasing in the WebKit2 branch, so the commits you see there won't necessarily reflect their original state.

Rendering
---------

### Coordinated graphics

As far as I've been able to figure out, coordinated graphics refers to WebProcess and UIProcess coordinating graphics with each other. The UI process has to tell the web process about resizing, scrolling, etc. and the web process has to do the actual painting and then tell the UI process to update what has been displayed.

A nice overview of coordinated graphics (and how rendering is done in general) is given at https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/. Yes, it's for chromium, but it matches what happens in WebKit *very* closely. Also see https://trac.webkit.org/wiki/CoordinatedGraphicsSystem

Further reading
---------------

* [Introduction.md in WebKit's source](https://github.com/WebKit/WebKit/blob/main/Introduction.md)
* https://www.haiku-os.org/blog/pulkomandy/2024-02-28_so_you_want_to_help_with_webkit#working-on-webkit2
* https://trac.webkit.org/wiki
