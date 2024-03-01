+++
type = "blog"
title = "So you want to help with WebKit?"
author = "PulkoMandy"
date = "2024-03-01 12:00:00-05:00"
tags = ["WebKit", "webpositive"]
+++

<div class="alert alert-info">
This blog post was originally <a href="https://discuss.haiku-os.org/t/my-progress-on-webkit2-port/11653/64">a forum post</a>. It is reproduced here on the website to make it easier to find and reference.
</div>

I heard that some more people may be interesting in helping with WebKit. So here is a summary of the current state, the things I think need work, or the possible future paths to explore.

### Keeping WebKitLegacy up and running

The Web moves fast these days. So we have to stay very up to date with upstream WebKit. Until we have a nice and shiny WebKit2 browser, and, anyways, even after that, we need to keep things up to date.

Currently I take care of this myself. The reason is, it involves merging changes from upstream with our branch, and that’s pretty much impossible to review as a Github pull request (it would show everything that’s changed in the upstream WebKit code, which is usually a lot).

Anyways, here’s how I do it:

* Get the latest commits from upstream webkit
* Looks for commits with a message saying “Versioning.” in the main branch. These are internal commits from Apple changing some version numbers, but I found that these are usually stable versions of WebKit that will at least compile without too much problem
* Pick the next such commit, merge it with our branch (using “git merge”).
* Try to build, fix any issues that show up
* Make sure the browser still runs.

There are usually some function that have changed prototype and the Haiku implementation needs to be updated, and the occasional merge conflict in one of the few files that have specific code for multiple platforms (typically we just add `|| OS(HAIKU)` to existing cases, but there are a few places where we have to do our own thing.

This brings me to the next two topics…

### Upstreaming our changes

A lot of Haiku specific code is maintained in our fork of the WebKit repository. The reason for this is I never took the time to upstream all these things. There are no easily extracted commits (because the only way to keep up with upstream is to use merge instead of rebase), and as a result, the relevant changes have to be manually re-done as separate, nice and clean commits that upstream will accept (hopefully).

The process is something like this:

* Do a “git diff” between our fork and the last upstream commit we merged
* Look at the differences, find something that can easily be upstreamed
* Create a nice patch and submit it to WebKit bugtracker or GitHub (there is an helper script in the repository to prepare and submit a patch)
* Follow up on feedback from code review
* If there is no one reviewing the code, I found that complaining about it on social networks might work (because some WebKit devs are watching my social network account, I guess). There are maybe more reasonable ways.

Where to start with the upstreaming changes: probably WebCore, WTF and JavaScriptCore. If we start submitting anything substantial, the WebKit upstream will require us to provide a buildbot to build our code. That is then used to build patches submitted to their bugzilla or github, and verify that the code does not break our build.

Until we get this working, we can still submit changes that fix cross-platform code (there are a handful of these in our fork), or that just add Haiku to the list of OS using a specific codepath. Which are also the ones more likely to cause problem when merging upstream changes, so that would still be very helpful.

Merging the code in the WebKitLegacyDirectory is probably not going to happen since upstream is slowly removing that directory (only the iOS port still has it, to run very old iOS apps that need the legacy API).

### Fixing and improving the test suite

This is a bit more complex work and requires in-depth investigation of problems.

WebKit comes with several thounsands of tests. Normally, every bug fix or change should be submitted with a corresponding test.

These are non-regression tests, and, in the cross platform and configurable nature of WebKit, there is no hope that all tests will ever run on all platforms and configurations. So, the idea is that there is a “TestExpectations” file for each platform, that can define which tests to skip (because the feature is not implemented and there’s no point), which are expected to fail, which are expected to pass. After making a change, a developer can then run the tests and see if anything was broken or fixed. The bots on WebKit build infrastructure also check for this, and when someone submit a patch, they will warn if tests were broken (or fixed without updating the TestExpectations files).

The testsuite used to run on Haiku, but last time I tried it it completely crashed my machine (probably an app_server crash), and also I ran into problems with Debugger. The testsuite runs one process per core, and configures debug_server to save debug reports if any of them crash. However, Debugger gets very confused if we ask it to save multiple debug reports at the same time. As a result, we end up with several instances of Debugger trying to save debug reports, and eventually the system runs out of memory. Fixing this would be great, because then, the testsuite would have more chances to run.

### Experimenting with cross-platform code

The current implementation of WebKit for Haiku tries very hard to use the native APIs for everything. We have scaled back for now on the HTTP implementation, and are using cURL for that (it fixed several bugs compared to our own HTTP library). But for everything else, and in particular for all graphic rendering, we use offscreen BBitmap and BView.

It would be interesting to experiment with using cairo. This can easily be done beind a compile time option (mainly disabling the Haiku specific drawing code when the Cairo one is enabled). There is some integration needed so that in the end, cairo renders to a BBitmap that can be send on screen as usual.

It would be interesting to have this as an option, even if only to compare the rendering and decide if bugs are on WebKit side or in our platform specific code. But it would also fix several problems/limitations of the current drawing code: lack of support for shadows, for font ligatures, for some drawing compositing modes, etc.

### The web inspector

WebKit codes with a web inspector. This is mostly implemented as an html/javascript app, that interfaces with the WebKit core and allows to inspect the content of pages. Surely this would be helpful to debug some of the rendering issues. It is “almost completely” implemented, I am not sure what is missing, but I think not a lot.

There is also a “remote inspector” that allows to connect from another machine (used on the iOS version, because running the web inspector on an iPhone is no fun, and similarly in game consoles, embedded systems, …), maybe that is worth exploring too but I have not researched it a lot.

### Working on WebKit2

WebKit2 is a new interface to the WebKit engine that runs several parts of the code in different processes. There is at minimum a “web” process that does the html/css/javascript, an “UI” process that does the display (that’s the actual web browser), and a “network” process that does, well, all the network things.

This allows the web browser to be a lot less complicated and just communicate with the other processes. It also means the browser is unlikely to completely crash, instead, most likely the web process will crash, which does not imply losing your list of open tabs, non-saved cookies, etc. It also allows to run multiple web processes, for example, one per browser tab, so the whole browser is not completely frozen when one tab crashes.

Most of the work to get this built and a simple testing browser on top of it has already been done (by Rajagopalan Gandhagaran in Google Summer of Code). However, the code needed a lot of cleanup, and is now several years behind. I have a branch that I rebase every few months with an up to date but non-working version of this code. The main problem is the way the different processes establish connections between each other. Basically the expectation is that the web process creates a socketpair() (similar to a pipe(), but with UDP-like datagram behavior), and then passes each end of the socketpair to the two other processes, and the connection between the UI and network process is establised in this way. Passing file descriptor to the other processes is possible, but in the current attempt to implement WebKit2, we had decided to use BLooper/BMessage instead. So, it would mean that the web process needs to create a BMessenger targetting a BLooper in another app that it knows nothing about (and the other app may even not be running yet). This seems just about possible, but we may need some new APIs here or just do some workaround/hack instead.

Unfortunately, I am busy with many other things and I have been unable to work at this problem long enough to fit it all in my mind and find a solution. I can only look at it every few months, and by the time I have reloaded all the info in my mind, I run out of time again. So, help on investigating this and getting it up and running would be great.

There is also another option here: as mentioned, the other platforms use a socketpair(). We have an implementation of that now, so we could just as well stop trying to push BMessage beyond what they are supposed to do, and use socketpairs like everyone else. This would allow to run WebKit2 with a lot less platform specific code to write, since we could use the “Unix” variant of most stuff (MainProcessUnix, etc) instead of having to write our own. However, it creaet the possible issue that the main thread will not be a BApplication, and, at least for the UI Process (the web browser, that needs to open BWindows to interact with the user), that might be a problem. Or maybe it will work just fine, I’m not really sure.

### Continuing the work to merge the webkitlegacy and webkit2 branches

There is normally no conflict between WebKit2 and WebKitLegacy. They can be enabled separately or together, and the cmake build will take care of configuring and building everything. However, our current WebKit2 branch also has a number of hacks and work-in-progress things in shared directories (for example, adding a lot of tracing in WebCore classes around the process initialization). It would be great to get all this code cleaned, rebased, and ready for merging into the WebKitLegacy branch. This way we would have only one branch to maintain, instead of two, making both the upstream merging/rebasing and the submission of patches to upstream a lot easier.

The indentation is also all over the place (in both branches, really) due to Haiku and WebKit not agreeing on the Great War of Space vs Tabs, and I think the decision that all .h files for WebKitLegacy providing the public API that Haiku apps can use would follow Haiku coding guidelines, while everything else would follow WebKit style. This is a bit confusing and hard to maintain.

Certainly not the most exciting work: rebasing changes, cleaning indentation, cleaning commit history and removing debug traces or splitting them to separate commits. But, it would be very helpful.

I hope this gives a good overview of the needed work, and also that a lot of it is caused by decisions and problems on our side, and not at all the fault of WebKit upstream. I also hope it inspires more people in having a go at it and see if they can fix one or two small things.

In any case, thanks for reading this to the end! 🙂
