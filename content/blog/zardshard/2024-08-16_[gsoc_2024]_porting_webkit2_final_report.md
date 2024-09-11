+++
type = "blog"
title = "[GSoC 2024] Porting WebKit2 Final Report"
author = "Zardshard"
date = "2024-08-20 10:55:20-04:00"
tags = ["WebKit", "gsoc", "gsoc2024"]
+++

The goal of this document is to be an overview of everything I did during GSoC. It should be readable even if you haven't read any of the previous blog posts and don't know much about Haiku or WebKit (I hope I succeeded!).

First, some background. Haiku's native browser is WebPositive.

![Screenshot of WebPositive](/files/blog/zardshard/WebPositive.png)

WebPositive's code mostly deals with the user interface. It uses our fork of WebKit, HaikuWebKit, to actually render the web pages, run JavaScript, process input, and so on. WebKit (and, by extension, HaikuWebKit) provides two API versions: WebKitLegacy, and WebKit (aka WebKit2). Unfortunately, we are still stuck using WebKitLegacy even though WebKit2 has been out for more than a decade.

The biggest immediate advantage of switching to WebKit2 is crash resistance. It manages this by splitting the browser into several processes. Each web page runs inside of a dedicated WebProcess. If a WebProcess crashes, all of the rest of the WebProcesses should still be fine and the browser should keep running. The NetworkProcess deals with networking. Finally, the browser's process deals with the UI. Another advantage of switching to WebKit2 is, as far as I know, its API is more up-to-date and will allow us to do more things than WebKitLegacy did.

Rajagopalan worked on porting WebKit 2 to Haiku for GSoC 2019 (if you're interested in that project, here is the [final report](https://www.haiku-os.org/blog/rajagopalan/2019-08-15_gsoc_2019_final_report/), the [PRs](https://github.com/haiku/webkit-old/pulls?q=is%3Apr+author%3ARAJAGOPALAN-GANGADHARAN), and the [commits](https://github.com/haiku/webkit-old/commits/webkit2)). Unfortunately, as the years have passed, the solution has bit-rotted.

My GSoC project for 2024 was to continue with the work on WebKit2. My first and longest task would be to get it back to a working state. I made it a goal to make the port easier to maintain so that it hopefully doesn't bit-rot again.

One final thing to know: rather than testing our implementation of WebKit2 with WebPositive, there is a very simple browser called MiniBrowser that we use that was made specifically for this purpose. Most likely, WebPositive would require several APIs that are currently not implemented. The advantage of using MiniBrowser is that it only requires a minimal set of APIs and the code for it is small enough that it can easily be updated if the API is changed.

![Screenshot of MiniBrowser. The UI is very stripped-down. It doesn't even have tabs!](/files/blog/zardshard/MiniBrowser_development/3.png)

What I did
==========

## 1. Compilation

The first step was getting WebKit, as well as MiniBrowser, to compile.

### The debug build had some errors

HaikuWebKit has often been built in release-with-asserts mode. But I chose to build it in debug mode. This revealed that debug builds had bit-rotted. Fortunately, it wasn't severe and I only had to make a few small fixes.

For completeness, I've included links to the PRs and commits in this report.

PR: [Fix broken debug build](https://github.com/haiku/haikuwebkit/pull/37)  
Commit: [Fix broken debug build](https://github.com/haiku/haikuwebkit/commit/e91178846d7ae1ee92b551eefb3453026dfd7f1c)

### Lld - linking doesn't have to take 30 minutes

Build times for WebKit were excruciatingly slow. One place I saw room for speeding it up was in linking. I did some experimentation with using mold for the linker, since I saw that it was the fastest linker. It took a bit of work to port it, but in the end, it worked reasonably well. But then I realized that even lld, which Haiku already had available, would be a significant improvement. Lld, unlike ld, pointed out some problematic multiple definitions. I fixed them, but by the time I was done I realized that PulkoMandy had already done it! I also discovered a [bug](https://github.com/haikuports/haikuports/issues/10445) in our port of lld. I developed a [workaround](https://github.com/haiku/haikuwebkit/pull/36) for the bug, but in the end, threedeyes fixed the bug very quickly and so the workaround was not necessary.

In one of my tests, using lld reduced linking times from 30 minutes to 1 minute! PulkoMandy added a [mention of lld](https://github.com/haiku/haikuwebkit/tree/6cfe3dd?tab=readme-ov-file#speeding-up-the-build-with-llvm-lld) to HaikuWebKit's README.

### Dealing with storage constraints

I had 20 GB to use for HaikuWebKit. To make WebKit fit into that space, I had to use several tricks, including using a shallow clone and a sparse checkout. I also selectively enabled debugging information for some subfolders while keeping it disabled in others (I've detailed how in a [blog post](https://www.haiku-os.org/blog/zardshard/2024-05-15_building_webkit_sensibly/)). In the end, if I were to set up an environment to develop WebKit again in the future, I would probably use 25 GB, or more if I didn't want to use a sparse checkout.

### MiniBrowser requires NetworkProcess and WebProcess

Once, I forgot to compile NetworkProcess and WebProcess along with MiniBrowser. It took a while to debug that crash. Fortunately, it was easy to tell the build system that MiniBrowser depends on WebProcess and NetworkProcess, so that they always compiled together in the future.

PR: [Compile NetworkProcess and WebProcess along with MiniBrowser](https://github.com/haiku/haikuwebkit/pull/38)  
Commit: [Compile {Network|Web}Process with MiniBrowser](https://github.com/haiku/haikuwebkit/commit/b544a009d3642b1c958ef1e94f3cb7408ce82810)

### Ccache

Early on, I tried to use ccache. It occasionally crashed and if it crashed on a certain file, there was a good chance that it would always crash on that file. I couldn't find a good workaround, so I stopped using it.

Later on during GSoC, annoyed by one too many rebuilds that could have been avoided, I tried seeing whether an updated version of ccache would help. It did! No more crashes from ccache. I believe that investment of time has paid itself off several times in saved building time since, not to mention the benefit that it will have for other developers.

PR: [ccache: bump version](https://github.com/haikuports/haikuports/pull/10616)  
Commit: [ccache: bump version (#10616)](https://github.com/haikuports/haikuports/commit/915fb893a7f4480cf0b2b35469c8f424ccd89681)

## 2. MiniBrowser crashes when loading a web page

Now, with a nice build system setup, I could finally address the bitrot!

So, MiniBrowser was starting up, but it would crash when trying to load a web page.

![An example of MiniBrowser crashing when navigating to a web page.](/files/blog/zardshard/MiniBrowser_development/1.png)

### Crash #1

The problem was a certain function needed to be implemented. So I had to make a choice: either go with an existing solution and risk needing OpenGL, or create my own implementation and risk it being difficult to create and maintain. This was a problem that required a lot of thinking on my part, but I believe I found the best solution: using the existing solution. A while later into GSoC, I found out that even though it uses OpenGL to compile, it can be made to run without actually using it!

My [blog post](https://www.haiku-os.org/blog/zardshard/2024-05-28_gsoc_2024_fixing_the_crashing) on this topic and its associated discussion goes deeper into the problem and my philosophy in trying to figure out how to solve it.

{{< alert-info ""
"A lot of my PRs included cleanup commits with them. I've given those commits their own section, so they won't be listed here.">}}

PR: [Enable coordinated graphics](https://github.com/haiku/haikuwebkit/pull/39)  
Commits: [Enable coordinated graphics](https://github.com/haiku/haikuwebkit/commit/e611ac85a6e0c36d4ed24368ada983103ff0a616), [Switch method of uniquely identifying BBitmaps](https://github.com/haiku/haikuwebkit/commit/6eb9661091e840ebe5112706a8a0fd0ce9d5a550)

### Crash #2 and #3

There were two more crashes that I addressed. Both of these were easy compared to the first one. For more details, see my [posts](https://discuss.haiku-os.org/t/gsoc-2024-fixing-the-crashing-haiku-project/15054/25) in the forum.

PRs: [Disable message attachments](https://github.com/haiku/haikuwebkit/pull/40), [Do not set drawing area size outside of main thread](https://github.com/haiku/haikuwebkit/pull/41)  
Commits: [Disable message attachments](https://github.com/haiku/haikuwebkit/commit/9f6f0f0fcfc0586a33904b30238e8e402f6fac49), [Do not set drawing area size outside of main thread](https://github.com/haiku/haikuwebkit/commit/4eaac5a387e667ba3c0f8190c1f4a97db02b3436)

## 3. Nothing is being displayed

Well, there were no more obvious crashes, but there were no web pages displaying either. MiniBrowser did not make any attempt at drawing them to the screen.

![A screenshot of a reproduction of the problem. MiniBrowser was navigated to https://www.haiku-os.org/ but made no attempt at displaying anything. The background stayed gray](/files/blog/zardshard/MiniBrowser_development/6.png)

Why? Well, some critical functions involved in drawing weren't being called. But why? Well, after [going up the chain for a while](https://discuss.haiku-os.org/t/gsoc-2024-fixing-the-crashing-haiku-project/15054/31), I was finally able to figure out what was going on. It turns out, in some situations, the run loop was failing to process tasks given to it.

<p><details><summary>What is a run loop?</summary>
The job of a RunLoop in WebKit is to receive and perform tasks. A thread with a RunLoop running will do nothing until it receives a piece of work to perform. It will then perform the work and go back to doing nothing. If multiple pieces of work arrive at the same time, RunLoop will queue the work and work on them one at a time. If this sounds like <code>BLooper</code>s, that's because they are! In fact, we use <code>BLooper</code>s to implement RunLoops on HaikuWebKit!
</details></p>

The problem was that the run loop should have been instructed to start processing the first message in the queue when it is started. Otherwise, it may never start processing the messages. Ironically, I thought the problem was something else until I started writing this blog post, which made me realize that the problem was somewhat different from what I thought it was. That allowed me to improve the code further.

PRs: [Fix some IPC messages not being processed](https://github.com/haiku/haikuwebkit/pull/42), and after realizing the true cause of the problem, [Attach handler to looper in RunLoop::run](https://github.com/haiku/haikuwebkit/pull/52)  
Commits: [Improve wrapping {Web|Network}Process in BApplication](https://github.com/haiku/haikuwebkit/commit/e2552027771e8eee9ca0cd67b92c8bbd1ef50045), [Fix Haiku's implementation of RunLoop](https://github.com/haiku/haikuwebkit/commit/83d94fe756320dce93331b95a98661c6629b81b5), and after realizing the true cause of the problem, [Attach handler to looper in RunLoop::run](https://github.com/haiku/haikuwebkit/commit/6cfe3dd9353ad4296b1b489dfb33801f32e6c871)

## 4. Fixing IPC

Still, nothing was being displayed on screen, but, fortunately, unlike the previous problem, the problem was obvious. WebProcess and Network were communicating perfectly well with MiniBrowser. However, they weren't capable of communicating with each other.

Here, once again, there were multiple methods of solving the problem. Eventually I realized that it would actually be possible to use plain old UNIX sockets. Previously, PulkoMandy and I were under the impression that UNIX sockets would not work well with the way Haiku sent messages. However, it turned out that WebKit used the sockets in such a way that it was compatible, and after some [discussion about which way to implement IPC](https://www.freelists.org/post/haiku-development/How-to-implement-the-addition-to-Haikus-API-for-WebKits-IPC), we concluded that using UNIX sockets was the best way.

While I was sad that we wouldn't be using Haiku's native API, I believe now that it was the best course of action, since we wouldn't need to do any maintenance of IPC for WebKit in the future. It also unlocked the ability to shed more Haiku-specific code from WebKit later on.

This [blog post](https://www.haiku-os.org/blog/zardshard/2024-06-28_gsoc_2024_fixing_ipc_in_webkit/) and associated discussion goes into depth on the problem and how I went about solving it.

PR: [Switch to UNIX sockets for IPC](https://github.com/haiku/haikuwebkit/pull/43)  
Commits: [Fix Haiku's implementation of IPCSemaphore](https://github.com/haiku/haikuwebkit/commit/40cc736d81e19810e96681e777c7a29b76952217) - miscellaneous bugfixes, [Switch to UNIX sockets](https://github.com/haiku/haikuwebkit/commit/73ffd68c24bad17a744eaa520626424e1ea45090)

## 5. Fixing shared memory

As a nice side-effect of using UNIX's IPC, we were also able to use the existing implementation of shared memory that used UNIX's shared memory. Once again, it's a bit sad that we're not using Haiku's native API for that (except for under-the-hood, since Haiku implements UNIX's shared memory using its own primitives), but, hopefully, there will be no more maintenance burden for us there either!

The only work that was needed to make shared memory work was to make our implementation of bitmaps that could be shared across processes work regardless of which shared memory API was being used. I also did some other miscellaneous tasks at the same time, each of which brought MiniBrowser closer the displaying the web page

PR: [Make ShareableBitmapHaiku not depend on SharedMemoryHaiku](https://github.com/haiku/haikuwebkit/pull/44)  
Commits: [Assume View is visible instead of invisible](https://github.com/haiku/haikuwebkit/commit/430d3923a48c2bae5271b01b2e523bcf3a835a46), [Shared memory should allow cloning](https://github.com/haiku/haikuwebkit/commit/e9ecc18c100b2b059b5e7f23dec2fe2341d30c1a), [Make ShareableBitmapHaiku not depend on SharedMemoryHaiku](https://github.com/haiku/haikuwebkit/commit/e2f3e0903999b239f875b706d901aa1778c22bd5), [Fix lifetimes of ShareableBitmap and BitmapRef](https://github.com/haiku/haikuwebkit/commit/6afeaa5c1775a51b4d7ce9845c4a72df5212e394), [Avoid copying bitmap data](https://github.com/haiku/haikuwebkit/commit/308c4dfe5873cb21853322769c11ef58e1b25688).

## 6. Why is the web page white?

With a bit more work, WebKit was finally going through all of the motions of rendering something on the screen, but all it did was display a white page.

![MiniBrowser navigated to https://www.haiku-os.org/, but only displaying a white page](/files/blog/zardshard/MiniBrowser_development/5.png)

It turned out that Haiku was clearing the bitmap! BeOS did not have that behavior nor did it make much sense for Haiku to clear the bitmap, so I submitted a [proposal](https://review.haiku-os.org/c/haiku/+/7899) to change that unexpected behavior. While I waited for it to be accepted, I (following one of PulkoMandy's suggestions IIRC) stumbled on a performance improvement that also just so happened to fix the problem. However, it was pure chance that the performance improvement fixed the problem. Fortunately, my proposal was also accepted later on, so the bug should never again appear.

With that, web pages were rendering!

![Screenshot of review.haiku-os.org. Every letter is rendered as a square indicating an unknown glyph.](/files/blog/zardshard/MiniBrowser_development/2.png)

Well, the text obviously wasn't displaying right. Nor was there any way to interact with the web page.

A [blog post](https://www.haiku-os.org/blog/zardshard/2024-07-17_gsoc_2024_drawing_to_the_screen/) and its discussion goes into more detail on this.

PR: [Implement displaying webpages on screen](https://github.com/haiku/haikuwebkit/pull/45)  
Commits: [Only use B_BITMAP_ACCEPTS_VIEWS where necessary](https://github.com/haiku/haikuwebkit/commit/1f043ddc908e29f707187013e2ae745ec97e2bad) - the performance improvement, [Implement displaying webpages on screen](https://github.com/haiku/haikuwebkit/commit/54f6bffbff1dd68bca158744fc99571c885ad239), [Rewrite RunLoop::TimerBase::isActive](https://github.com/haiku/haikuwebkit/commit/ab80c8ca87e574254641d1b00c2eee755433956f) - removes a deadlock, [ShareableBitmap::paint: Do not lock the looper](https://github.com/haiku/haikuwebkit/commit/7daf755588562cdc5f67b2e142d8972fa6d381ed), [Cleanup](https://github.com/haiku/haikuwebkit/commit/4ef89d5b3ee862dad06cb1798620e52d17f90a84)

## 7. Adding mouse support and fixing text rendering

Both of those problems turned out to be very easy to fix. Mouse support required just a routine implementation of a function or two, and I guessed what was preventing text from rendering relatively quickly.

And with that, we had a relatively functional WebKit.

![Screenshot of discuss.haiku-os.org. The page is scrolled down and some text is selected. Text is being displayed properly.](/files/blog/zardshard/MiniBrowser_development/4.png)

PRs: [Implement mouse support](https://github.com/haiku/haikuwebkit/pull/47), [Always use CodePath::Simple to render fonts](https://github.com/haiku/haikuwebkit/pull/49)  
Commits: [Implement mouse support](https://github.com/haiku/haikuwebkit/commit/6aad0fecc40005993d8a787a593be1bcf6026409), [Always use CodePath::Simple to render fonts](https://github.com/haiku/haikuwebkit/commit/b48c5543feba67f2c3d2857852521e8fd3d34d48)

## 8. Never use OpenGL, EGL, etc.

A large minority of sites, such as https://discuss.haiku-os.org/, were still crashing MiniBrowser. Why? It turns out, accelerated compositing wasn't being disabled properly. So if WebKit thought a site might perform better with accelerated compositing, it enabled it. Well, EGL doesn't work properly on Haiku, and there were things to be implemented in WebKit even if EGL was around. Needless to say, WebKit would crash. Fortunately, after [considering](https://www.haiku-os.org/blog/zardshard/2024-08-13_gsoc_2024_can_i_get_discusshaiku-osorg_to_work/) several ways of fixing it, I found an elegant solution for the problem as well.

I also found a crash while scrolling, and an assert that was failing for some reason (details are in the commit).

PR: [Fix crashes that occur when visiting discuss.haiku-os.org](https://github.com/haiku/haikuwebkit/pull/51)  
Commits: [Fix disabling of accelerated compositing mode](https://github.com/haiku/haikuwebkit/commit/991489cf11a8cc75c8cae0c82840cf3d47b73878), [Fix crash when scrolling on some sites](https://github.com/haiku/haikuwebkit/commit/a4f91475f48c7501f0d4bd13b4227fa02f0e7222), [Comment out failing assert](https://github.com/haiku/haikuwebkit/commit/e18c9c56ffcce94988f7eeac1acd950b5b26237d)

## 9. Cleanup

While making changes, I often found places in the code that could be cleaned up. Often, I included these improvements along with the PR of the other changes that I was making at the time. Some got their own PR.

Changes with their own PR: [Cleanup](https://github.com/haiku/haikuwebkit/pull/46), [Make WebView use C++ API instead of C API](https://github.com/haiku/haikuwebkit/pull/48)  
Commits: [Remove unused code](https://github.com/haiku/haikuwebkit/commit/75e1866e8f81d9bb3355a4013deb5864c795292b), [Cleanup WebViewBase](https://github.com/haiku/haikuwebkit/commit/7c3448810ce74a44ffccda3289bb6b34f5b52ccc), [Cleanup](https://github.com/haiku/haikuwebkit/commit/6f58a434bb62564a1630aaf2672c9ae0544d7ce7), [Remove WebView::initializeOnce](https://github.com/haiku/haikuwebkit/commit/7029c6b23e7efcb628febfafe0221d8f3190b679), [Mark some functions as unimplemented](https://github.com/haiku/haikuwebkit/commit/ad034fa52f973a0549ecd1c41ccd2a6c7276b774), [Remove Haiku's shared memory implementation](https://github.com/haiku/haikuwebkit/commit/884309b0f0c37ea297c53a855f7c2cdbaa5e4701), [Finish removing Haiku's shared memory implementation](https://github.com/haiku/haikuwebkit/commit/74feccc6fb7e946c114736b4d7b84543f434ed7c), [Cleanup](https://github.com/haiku/haikuwebkit/commit/9ef73271991f1735dd498d6b426f51d8205ad070), [Rewrite MiniBrowser's CMakeLists](https://github.com/haiku/haikuwebkit/commit/2def012cb79f18c886136fa78914f522b12cf310), [Make WebView use C++ API instead of C API](https://github.com/haiku/haikuwebkit/commit/2477e9fa22d3e2c8e411f42134bcaf63942e193f), [Send updated value along with DID_CHANGE messages](https://github.com/haiku/haikuwebkit/commit/7fe2fc3bf508a75da93e4c82d1babab4004ac81d), [Cleanup](https://github.com/haiku/haikuwebkit/commit/6eb67aa3be9f6c67c0a0a529644d024bd153b313), [Cleanup](https://github.com/haiku/haikuwebkit/commit/0d4b3f0d5d53fe260dd7bb67885451cd05d0fe3f)

Conclusion
==========

I'm somewhat surprised that I wasn't able to get further during GSoC. I thought at the beginning, that I had a chance of getting significantly further with my project because of the work done from the previous GSoC project. Reviewing what I've done, I think I know why. First and most obvious, I had to deal with bitrot. I had to spend a lot of time debugging things that should have been working but weren't. In the case of messages being stuck in the run loop, it took a week or two to figure out what the problem was. It doesn't help that our debugger is slow and buggy. Hopefully gdb will work well as a replacement in the future! It may have taken me less time had the run loop needed to be written from scratch in the first place, since at least then exactly what the problem was would have been obvious! Secondly, I revised and reimplemented several things. For example, I had to go through the whole implementation process again for IPC before I could realize that using UNIX sockets was a good idea. Finally, it took time to figure out how to do things well so that they would not be brittle or hard to maintain.

Anyway, I've intentionally prioritized the hard problems during GSoC, so hopefully most of what remains are the easier ones. Here's a list of things that still need to be done:

* MiniBrowser still has plenty of crashes
    * When closed after a web page has loaded
    * When being resized
    * When going backwards in history
* There are still some things that need to be implemented
    * Mouse scrolling doesn't work
    * There is no keyboard support
    * Context menus don't work
    * Copy-paste doesn't work
    * And probably more
* There are some things that would be nice to have
    * WebProcess and NetworkProcess shouldn't appear in the list of open applications; only the browser itself should.
    * Performance improvements - currently, WebKit2 is slightly slower than WebKitLegacy on most web pages. It is significantly slower on sites like youtube.com.
    * Videos -- Alas, switching to WebKit2 did not fix video playback on youtube.com. Most likely there is an API that we need to implement that isn't implemented.
    * Make the tests pass -- WebKit has tests available, but they're excluded in my sparse checkout, and, from what I've heard, they don't work on Haiku at present. The tests will probably tell us many other areas of improvement.
* Our WebKit2 API for applications to use needs to be improved. The API that currently exists is a bit messy.
* And last but not least, WebKit2 needs to be integrated with WebPositive.

For further reading into my project, my blog posts and their associated discussions detail my progress pretty well.

Thank you to Waddlesplash, PulkoMandy, and various others who offered suggestions, reviewed code, and just in general, made the community fun to be around. And definitely, a big thank you to Google Summer of Code. Without them, the project would not have been possible for me in the first place!
