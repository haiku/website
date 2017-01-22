+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #16"
date = "2014-01-22T11:33:10.000Z"
tags = ["contract", "app_server", "WebKit", "contract work"]
+++

Hello world!

As I said last week, the remaining drawing glitches are because of BView limitations. Well, it's time to solve those as well!

I'll start with what is now known as the "border bleeding" bug. You have encountered it if you tried opening the Haiku website, or the bugtracker, in Web+. You will easily notice that some items are completely filled with the border color, instead of the expected background one. To understand what's going on, let's have a look at the way WebKit draws things.

<!--more-->

<h4>WebKit drawing code</h4>
It's about time I give you a quick tour of WebKit source organization. Please open this page in a new tab: https://github.com/haiku/webkit.

So, the toplevel organization is fairly simple, with the most interesting directories being <b>LayoutTests</b> (the test suite I was working on some weeks ago), <b>Tools</b> (build tools, WebKit commit helpers, HaikuLauncher and its siblings for other platforms, and DumpRenderTree, the tool to run the testsuite), and of course, <b>Source</b>, which is what we'll look at today.

In the <b>Source</b> folder, we find several subdirectories. Not all of them have useful contents, some are even empty or deprecated. The useful things there are (in order of layering: each dir depends on the previous ones to build):
<ul>
<li><b>cmake</b> is the build system we are using. This is shared with the EFL port used for Tizen and mainly developped by Samsung and Intel. The blackberry port also used to use this, but it was removed from the tree recently as it was unmaintained. The GTK port is slowly switching from their old autotools build system to use cmake as well. Apple is still using XCode build files for both the Mac OS X and the iOS port of WebKit, so they don't use this folder. The OptionsHaiku.cmake file is the place where we tweak our global compilation flags, set the version of HaikuWebkit, and a few other relevant definitions. Each of the other dirs can have a PlatformHaiku.cmake file to add platform-specific source files and options.</li>
<li><b>WTF</b> is the WebKit Template Framework. This is a set of low-level utility classes to manage threads, locks, memory allocation and reference counting, and a lot of other things. As compiler support for C++11 improves, things from this directory get removed and replaced with their C++11 counterparts. Since Haiku is POSIX compatible, we have little changes to do here.</li>
<li><b>JavaScriptCore</b> is WebKit JavaScript engine. It has several implementation of JavaScript as interpreters and JITs, with different optimization levels. Again, this is all portable code, and Haiku POSIX compatibility allows us to not change it too much. The only thing that happened there is fixes for stack alignment (read some older blog post about that).</li>
<li><b>WebCore</b> is, as the name implies, the core of WebKit. This is where everything happens: HTML and CSS parsing, DOM model management, network support, and rendering to the screen. Most of this is portable, with the platform specific parts being split in the <b>platform</b> subdirectory. There are some exceptions to this, with some platform specific stuff being built in common headers using preprocessor guards.</li>
<li>Finally, <b>WebKit</b> is the API each platform exposes for WebKit. The APIs are completely platform specific, for example, in Haiku we have a BWebView class, while the EFL port has ewk_view and uses a C-only API.</li>
<li>In case you're wondering, <b>webKit2</b> is another API for WebKit. This one uses a separate process for each WebKit view, and then sends the result to a common process handling the user interface. This is similar to how Chrome works. We are not making use of it.</li>
</ul>

So, our drawing code is in <b>Source/WebCore/platform/graphics/haiku</b>. More specifically, we will be looking at the GraphicsContextHaiku.cpp file. This is the entry point to our drawing code. If you look at the drawing primitives, you'll notice that they seem fairly simple, and do things our BView can handle without any problems. But, there are some tricks to implement them right.

The one at the root of our problems is <b>void GraphicsContext::fillRect(const FloatRect& rect)</b>. If you have looked at cases where the border bleeding happens, you may have noticed that it always involves div with a border-radius set in css. How come we're not going to <b>fillRoundRect</b> then? Well, that's where the problem lies: WebKit doesn't use fillRoundRect to fill rounded rects! The main reason for this is it wouldn't be enough, as the content often isn't just a plain color. you could have a background image, or contents that expands outside of the div and needs to be clipped. And indeed, what WebKit does is it sends us a clipping shape that matches the div outline, and then expects us to clip all following drawings using this.

So, we have to look at the <b>void setClipShape(BShape* shape)</b> method, where the clipping shape ultimately gets. You can see there the current code, which just stores the clipping shape to the drawing state. The current code doesn't actually clip anything: it just detects the special case of a fillRect on a rectangle bigger than the clipping shape, and fills the clipping shape instead of the rectangle. This used to work with older WebKit versions, but now they changed the drawing code and it isn't working anymore. It seems they are now drawing smaller rects one at a time or something. Anyway, the result is either we draw too much, going outside the allowed clipping region, or not at all, in the case we're looking at.

If you read the <b>void setClipShape(BShape* shape)</b> code carefully, you have noticed there is a commented out implementation using BView::ClipToPicture(). Because yes, the BView API supports advanced clipping to arbitrary shapes, but, the implementation of this in Haiku is horribly slow, and doesn't handle the fact that the view can be scaled and translated. Time to fix this on app_server side!

<h4>app_server inner working</h4>

Before I get you lost into app_server code, here is a quick reminder of Haiku architecture as far as drawing goes.

As you know, each application has an application thread, and one thread for each window. This allows the application thread to do the actuall processing work, while the window threads are free to handle user events and repaint the screen. This is what makes Haiku able to react immediately to your input most of the time, and the windows redraw so fast you don't even notice it.

But, all those windows, even from different apps, are all drawing to the same frame buffer. How are we handling that? Well, the window threads themselves aren't actually doing any drawing. All they do is send messages to the app_server. We are not using BMessages here, but instead a special communication system called the app_server link. This is a bi-directional link, where BViews can send drawing instructions, or query about the view state. Most of the methods in BView are implemented as simple writes to the app_server link (this isn't completely true, BView also caches some of the data for faster oepration).

On app_server side of the link, there is also one thread for each window. Those threads are loops that get a message from the link, process it, and send a reply to the BView, if needed. This way, all the drawing actually happens on app_server side, where the frame buffer can easily be shared between all the drawing threads.

<h4>ClipToPicture implementation</h4>
So, let's look at the code for BView::ClipToPicture. We'd expect this to send the picture to the app_server, and let everything happen there. Our code isn't implemented that way, however. Instead, the view creates a BBitmap, then adds a new BView to it. It then draws the picture on that view, and finally iterates over the pixels of the BBitmap, creating a BRegion with 1x1 pixels rectanges for each pixels from the bitmap that aren't completely transparent. Finally, it uses the method for clipping on a BRegion that BView implements by sending the region to the app_server. There are several problems with this:

Creating a BBitmap that accept views is slow. This kind of BBitmap is special, as the view drawing has to happen just like for a regular BView. What happens is app_server creates an off-screen window, that is attached to the BBitmap. You can't access it from the application, but this requires spawning a thread on app_server side, processing the drawing events in it, and drawing everything to the BBitmap that itself lives in an area shared between the app_server and the application. This ends up requiring quite a lot of time.

Another problem is the use of BRegion. BRegion is a set of rectangles that is designed for simple clipping. It is used for excluding part of the window that are under other windows, or part of a view that are masked by children, from drawing. It works well with a small set of rectangles, but the performance when there is a huge list of very small rectangles like this code does is terrible.

Finally, the app_server doesn't know about the original picture, what it gets is essentially a bitmap (in an ineffective BRegion representation). Moreover, the bitmap can't have infinite dimensions, so it is clipped to the view size. When the view is scaled or translated, the clipping doesn't follow it, and weird things still happen.

To solve this, we have to implement ClipToPicture in a more effective way. On BView side, this is easy: just send the BPicture over the app_server link. Sending BPictures is already implemented, as the code for drawing them is also implemented on the app_server side.

This leads us to <b>ServerWindow::_DispatchViewMessage()</b> (in src/servers/app/ServerWindow.cpp). This is the method that gets called whenever a message is read from the app_server link. The message that we look for is AS_VIEW_CLIP_TO_PICTURE. As you can see, there is already an implementation of it, relying on the PictureToRegion method to do the work that was done on BView side. PictureToRegion, however, doesn't have an implementation yet.

<h4>server-side drawing</h4>

I decided to implement this method and get that working, before trying to modify the code to stop using a BRegion (more on that later). I went this way because the bitmap to region code is already written, and the picture to bitmap one will still be needed (again, more on that later).

However, I found out there was no way to work on a server-side only bitmap in app_server. All the drawing code relies on having a client-side BView to communicate with. While simple drawing operations can be performed using the Painter class, this doesn't support all the required features to render a Picture to a bitmap. It mainly misses the state tracking that View does. State tracking is exposed on user side with the PushState and PopState methods. While the most simple use of these is to just save and restore pen size and colors, there are other things happening, most importantly the correct stacking of scaling and translation. This means that <b>SetScale(0.5); SetScale(0.5);</b> only scales the view down by 1/2, while <b>SetScale(0.5); PushState(); SetScale(0.5);</b> scales it by 1/4.

To reuse this part of the code, I had to split this out from the View class in a generic DrawingContext. I also moved there the conversion from view to screen coordinates, as this doesn't work the same when drawing offscreen. I could then implement an OffscreenContext that can draw without requiring a view. It uses a DrawingEngine that draws on an OffscreenBitmap (these are app_server classes, you can look at the code for those).

I got this to compile, built a new image, rebooted, launched my test application... and app_server crashed. I didn't want to spend the week rebooting to a test image and debugging with the command-line debugger in consoled, which is all you can get when app_server crashes. So, it was time to turn to the test_app_server.

<h4>The test_app_server</h4>

The test_app_server comes straight from early OpenBeOS days, when Haiku app_server was still being written and not ready for production use. Back then it ran on BeOS R5, but later on it was modified to also run under Haiku.

There is a complete test environment, with a separate app_server (the test_app_server), registrar (test_registrar) and libbe (libbe_test). This allows working on both app_server and interface kit code, and testing the changes without having to reboot. The test environment can be restarted, and test applications run inside it. This means the actual app_server is protected from any crashing, and the code can be debugged using the GUI version of Debugger. A much more comfortable environment.

The problem with test_app_server is it is a rarely used feature. Only every few years a developer decides to run it, last time this happened as far as I know was the 2010 BeGeistert coding sprint, when I used it to test and fix the custom decorator support (opening the way for integration of Stack and Tile in our sources - before that it lived as a continuously out of date patch against app_server). Anyway, this means the test_app_server build isn't tested, and when you try it, you find that more often than not it won't build at all.

Quite a lot happened since 2010, so a whole day of work was needed to solve the issues. This included the merge of liblocale into libbe (it was missing from libbe_test), the move of some MIME management from registrar to the storage kit (test_registrar was failing to find them), and the introduction of improved hybrid build system as part of the package management work (libbe_test wouldn't build). There where some changes needed because of internal hackery inside the test_app_server, as well.

Anyway, try it while it's not broken! Setting up the test_app_server environment is fairly easy. Go to your usual generated directory and build it using this command:
<pre>
TARGET_PLATFORM=libbe_test jam -q install-test-apps
</pre>

If all goes well, the test_app_server is built, as well as several test applications to go with it. Some of these are part of the usual set of apps (Magnify, Screen preferences, ...), others are stripped down versions or small test cases (MiniTerminal, ShapeTest, and a lot more). To run those, go in the <b>src/tests/server/app</b> dir and use the <b>run</b> script:

<pre>
./run Screen
./run ShapeTest
</pre>

This will open an "Haiku App Server" window, which is the test_app_server "video card", and the apps will be running inside it. The Screen preferences allows you to resize the window (the default is 1024x768, which uses almost all of the screen space on my small laptop).

<h4>Rethinking clipping</h4>

With the test_app_server running again I easily spotted the bug in my code (I forgot to initialize the clipping for the offscreen context). So we now have the ClipToPicture code living on app_server side, just like it should. The result is still as aliased as before, as we're still doing region-based clipping.

But before doing further changes, it's time to stop and think for a bit: what is the API used for? Are our changes going to work for all the use cases? I discussed that with stippi (our app_server specialist) over IRC, and also booted my BeOS machine and did some tests there to see how ClipToPicture worked. I also did some research on the apps using the method and what they do with it. Here are the results and conclusions.

ClipToPicture (and ClipToInversePicture) was introduced in BeOS R4. The main use case was use with DrawAfterChildren. Before these methods were added to BView, all your views would look boringly rectangle. there was no way to have an ellipse shaped view, or anything more fancy. DrawAfterChildren finally allows a view to draw over its children, which means it can erase part of them and mask them out in such fun shapes. However, doing this without further precautions results in horrible flickering because both parent and child will be drawing to the same area.

The solution to this is using ClipToPicture: you can clip the child so it doesn't draw outside its boundaries, and you can clip the parent (using ClipToInversePicture) so it draws all other pixels. This was the reason for introducing those methods.

The support for ClipToPicture and ClipToInversePicture was meant only for this use case, so, they always work in view coordinates, and aren't affected by SetOrigin and SetScale.

This is a problem for WebKit, because it does scrolling on its own, instead of using ScrollBy (moving the view coordinates in the window or screen space), it uses SetOrigin (moving the objects inside the view), and hopes the picture clipping will follow. This isn't so much of a problem, translating and scaling the picture on WebKit side would be possible. However, we are going to also add arbitrary transformations to BView so you can rotate and distort objects in other ways. The clipping will have to follow this.

As a result, it is not possible to implement ClipToPicture in the simple way we are using. We need to keep the complete BPicture object in the view state, and generate bitmaps from it, applying the transform matrix as it changes. We also may have to intersect or blend clipping pictures from different levels of PushState/PopState. And even more important, we need to get all this shown on screen!

I already mentionned the app server currently does clipping with only a list of rectanges in a BRegion. This is fast when there are few rectangles, and worked well when the only clipping was from overlapping windows, and child views. However, we are now adding arbitrary shapes, and we also want to have partial clipping for antialiasing. This means we must change algorithms and use a pixel clipping strategy.

The region clipping strategy works well when there are few regions, hit-testing them is a cheap operation, and if you know which regions are close to the current pixel, you know you can keep drawing several pixels without having to perform any further test. Our app_server drawing code does this, BRegion allows it to know which rectangle it will hit next, and how much pixels it can draw without checking before this happens. The rectangles are sorted so even if there are a lot of them, the hit testing goes reasonably fast.

The pixel-clipping strategy works in a completely different way. For each pixel, you have to multiply the alpha channel value with the clipping mask, and use the resulting color (possibly completely transparent, now) to draw. This means computations happen for each pixel, instead of only at the edges of the region. However, the innerloop is actually smaller, and, this opens the possibility of antialiased clipping, which is what we're after with those changes.

So, we have to switch the app_server from region to pixel clipping. Fortunately, agg, our drawing backend, provides all the support we need for this. I have split the work in several steps:
<ul>
<li>Move the code rendering the picture to a bitmap to the server side (done, read above). At this point, no visible change.</li>
<li>Only for this picture, use pixel clipping, and keep using region clipping for everything else (this will be the slowest solution). At this point, WebPositive clipping can be done, until you try scrolling the page.</li>
<li>Add support for translating and scaling the clipping picture, and storing and restoring it with the draw state (the view PushState/PopState methods). At this point, the WebKit issue will be solved completely. Each time this happens, we must generate a new bitmap matching the new viewport.</li>
<li>Have the other clipping clip our generated BBitmap, instead of clipping the final drawing. This way, we can do all clipping operations with a single bitmap, making things fast again.</li>
</ul>

This should keep me busy for a while. Moreover, I still didn't talk about the possible problems with the arbitrary transforms. But that will be for a later report, as this one is long enough already.

<h4>app_server rendering pipeline</h4>

The second modification has some problems as well. I already said we use agg for drawing. This library is a bit special, as it makes use of a lot of C++ templates rather than usual inheritance. This means the generated code is very fast, but also completely static. This makes things as simple as changing the color depths (32, 16 or 8 bits) quite complicated, as a complete pipeline has to be statically-built at compile time.

Likewise, it's not easily possible to insert my pixel clipping in the current rendering stack, and even harder to insert it only when there actually is a clipping bitmap. This would have been better, because it would have avoided the pixel-comparing overhead I was talink about above for views not using ClipToPicture. By the way, it seems this is exactly what BeOS was doing, using region-clipping until it got into so much regions and rectangle that pixel clipping would be faster. With agg, doing htat would require building our custom clipping system that would do a test at each drawing command: am I pixel-clipping?

We don't want this (it would spend a lot of time asking this question instead of doing useful painting work), so switching completely to pixel clipping, always and everywhere, seems to be the best solution.

<h4>meanwhile, in the network kit...</h4>

I almost forgot: I finally found a way to fix the deadlock issue in Web+. It's not as clean as it could, but it works!
And, I fixed a problem with cookies: anything set to expire after year 2038 would not be accepted as a valid cookie. The year 2038 bug occurs because of the way most UNIX systems keep track of time. The time_t type is a 32bit integer, storing the number of seconds since january 1st, 1970. The maximum date it can store is january 19, 2038. We were a victim of that bug and thinking anything later was in the past. Well, this is now fixed and you can log into goodsearch again! (it was working when I wrote last week blog post, but they changed their cookie expiration date right after I did!)