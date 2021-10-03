+++
type = "blog"
title = "Haiku Contract Report: September 2021"
author = "waddlesplash"
date = "2021-10-02 19:14:33-04:00"
tags = ["contractor"]
+++

We already had an [activity report](/blog/pulkomandy/2021-09-27-haiku_activity_report_september_2021/) for this month ... but [as I am now working on Haiku full-time](/news/2021-08-25_hiring_waddlesplash/) thanks to the [generous donations](https://www.haiku-inc.org/donate/) of readers like you (thank you!), a second report is in order, containing more detail on what (and some of the 'why') I worked on that the activity report merely summarizes.

<!--more-->

Besides being the first in a series, this blog post is also a bit of a "return to form." I have not written on this blog [since a long activity report about performance improvements in 2019](/blog/waddlesplash/2019-08-03_haiku_activity_report_july_2019/). While I was the release coordinator for R1/beta2 in 2020, my contributions to Haiku kind of fell by the wayside since then as other things in my life have gotten busier. Now, thanks once again to the generosity of donors to Haiku, Inc., I'm back, and more active than ever -- and hopefully to stay that way!

So, without further ado, let's get into what I worked on, and what's up next.

This report covers all of September 2021, as well as the last few days of August 2021.

## End-user-facing changes

While most of my changes this month where "under the hood" and would not be immediately visible to end users (and I will detail those in the next section), a handful of my changes were, should be, or will eventually be immediately apparent to end users. Those include:

### WebKit-related changes

The two most common sources of WebPositive (WebKit) crashes were actually bugs in Haiku, and I resolved both of them this past month.

**The first of these,** which happened whenever WebKit tried to run WebAssembly (which is increasingly common on the web these days) was a problem in the kernel related to page-level memory permissions. WebKit has some reasons to use these on some rather large areas (hundreds of MB or more), and when it tried to do that, the kernel returned `ENOMEM`. PulkoMandy had already put a bit of time into investigating this and had resolved some potential problems, but the issue remained.

With an `strace` of the problem occurring in hand, PulkoMandy and I guided `nephele`, a now-frequent contributor to Haiku, in turning it into a minimal testcase; and from there, we combed through the source until the problem became apparent: the kernel was being too restrictive in how it could allocate memory for the page-protections arrays for userspace processes, and giving up too soon. [The fix](https://github.com/haiku/haiku/commit/60fee365f5670c1e13cc259ab1a026b16b0c5d44) was pretty easy from there, and while scanning through the kernel memory management code after fixing the immediate change, I [resolved](https://github.com/haiku/haiku/commit/2f001d82b64327046b0a7d563bf221b4d2c38242) some potential (unrelated) issues I spotted in there at the same time.

**The second,** and much more common, WebKit-related crash occurred when trying to play any media. This one only occurred on 64-bit nightly builds, and not the beta or 32-bit systems; and it had started occurring at a time rather distant from the last release of a new WebKit build; and even more strangely, it seemed to be a `NULL` dereference crash in a place where no `NULL` references should have been possible. Perusing the commit log around the date the crashes began to be reported, I noticed a change to virtual symbols in the HTTP client APIs -- but these APIs are in a static library, so how could there be any incompatibilities here?

Well, it turns out that all of our static libraries were not compiled with symbol visibility defaulting to hidden... whoops. That meant that the HTTP client symbols from WebKit were getting used by the linker when loading the HTTP media streaming plugin, which then crashed when accessing a virtual table it did not expect.

To start with, I just changed the symbol visibility of the HTTP library and that fixed the initial problem. But following on some suggestions from other developers, I went ahead and enabled private symbols by default for all static libraries, though with a few exceptions for now to avoid breaking too much software in HaikuPorts (though some were still affected by this change.)

In addition to making crashes due to incompatible symbols less likely, this change also may improve performance in, for example, `app_server`, as now the compiler and linker can be somewhat more aggressive in optimizing or eliminating the now-private symbols of `agg`, the rasterization library `app_server` uses.

In addition to these fixes to Haiku itself, I also wound up debugging and then proposing some changes to our WebKit port that will show up in its next release. These include a change to [avoid leaking threads and ports](https://github.com/haiku/haikuwebkit/commit/9a2ba62671e24f6967f9932b38d49112f06be78d) which (hopefully) will fix the strange crashes on Google Maps and other such resource-heavy sites, and a change I guided nephele on making to [reserve less memory for the WebAssembly heap](https://github.com/haiku/haikuwebkit/commit/44871cb0e724924eb5128ada6aa2c8dacd8b42b8).

### USB-related changes

Aside from the WebKit-related changes, the biggest set of user-visible changes I made this past month was to the USB stack and the XHCI (USB3 bus controller) driver. The XHCI driver had quite the rocky start when it was first introduced in default builds some years ago, and it was not until I "adopted" it in 2019 and began learning the ins and outs of USB that it started to make significant progress towards general usability. By the time of R1/beta2, it at least "mostly" didn't crash, and USB input and disk devices, the most common uses of USB, usually worked acceptably.

Except when they didn't, of course; and pretty much anything besides those devices was spotty at best when attached to an XHCI-owned port (USB ethernet devices were usually totally broken, for instance), and hubs caused even stranger behavior if not outright crashes.

Well, with thanks to the dedication of KapiX and also a few other people who tried a vast array of experimental patches I sent them over the course of a few weeks, I am happy to report that basically all of those issues have been resolved! Gone are the strange "Divide Error Exception" panics that occurred when unplugging hubs or even just trying to use some devices, or all USB devices suddenly no longer functioning when unplugging a hub. Further resolved are the issues with USB ECM ethernet devices (and pretty much all multifunction devices), and at least some of the random "USB disk unmounts due to transfer errors" are also now fixed.

You may be happy to hear that I was not just fixing USB issues due to user complaints about their annoyance (though that was certainly a large part of it), but also because I have some more USB work coming down the pipe. More on that in following sections...

### Other changes

While investigating the most-voted ticket on the bugtracker (["Apps started via Shortcuts prefs don't get env variables"](https://dev.haiku-os.org/ticket/12534) -- for which I submitted at least one potential fix for review, but it is still being discussed, and another approach may be taken instead), I ran into (and unfortunately caused most other users to run into for one day's nightly build ... sorry about that) and then [fixed](https://github.com/haiku/haiku/commit/ce308ddc6bfc5188aff0746314853397f9c62e5a) some race condition problems in `launch_daemon` that could lead to the (somewhat infamous) "blue screen with mouse cursor and no desktop" or (worse) "boot hangs on rocket."

## Internals changes

Aside from the changes listed above that end-users will probably take note of, I made quite a lot of changes to Haiku's internals, build system, miscellaneous "infrastructure", and other matters that improve developer experiences or pave the way for future changes.

First among those were a variety of changes to simplify or clean up the process in the build system that creates the packages for Haiku itself. I [merged together](https://github.com/haiku/haiku/commit/ece327f1066f8d6a720f786a592410dffccf29f7) most of the separate PackageInfos for various architectures into a single `generic` one (and later managed to do the same for the remaining architectures, after some cleanups).

On a more general level within the build system, I completely reworked path handling inside `libroot_build`'s filesystem remapping functions. This code is needed for emulating Haiku's "extended attributes" on operating systems that do not have them (for cross-compiling Haiku from other OSes, though it is also used on Haiku itself for various reasons), most especially the support for `open`ing a symlink itself (which most other OSes simply do not support, or support with major caveats, as in recent Linux versions.) I have known this code was a performance problem for [some time](https://dev.haiku-os.org/ticket/16288), but previous attempts never succeeded in improving it. Well, after some trial and error, I managed to come up with a version that is *much* faster: so much faster, it shaves multiple minutes off of package creation by itself -- let alone full rebuilds, where it can shave off dozens of minutes from build times. What a difference!

While working on that and some related matters in the build system, I noticed that we were not catching errors properly in the case of build system actions that run multiple commands; only the last command failing would actually cause the whole action to fail. That is now corrected, though in practice, it may not have mattered much (as most commands with multiple actions rely on the actions all completing properly for the final command to work, anyway.)

I [tracked down and fixed](https://github.com/haiku/haiku/commit/0945c7e4e6b52126886ef81d8f217690f0dbe7e6) an issue that was causing blanks to be printed instead of function names and arguments in kernel panic stack traces.

I also spent a bunch of time cleaning up our USB Audio driver. It no longer causes frequent KDLs, and actually does output audio on most systems. However, the audio glitches rather frequently (every 1-2 seconds), making it practically unusable at present.

While working on the USB Audio driver, I ran into a wide array of problems in the Media Kit and possibly also the Mixer, some of which I spent time resolving, and some of which I have not yet investigated. In the course of investigating these problems, though, I implemented support in Media Server and Cortex to connect "ToneProducer" test nodes directly to "audio output" nodes, allowing audio output to be tested bypassing the "mixer" node entirely.

(If you want to try this yourself, to see if your problems may be related to the mixer, try these steps precisely in Cortex on a recent nightly build: 1. Disconnect the Mixer from your Output. 2. Create an AudioAdapter node and connect it to the Output. 3. Create a "Demo audio producer" node and connect it to the AudioAdapter node. 4. Press "Start" in the node, and see if you hear anything.)

Some of the fixes I made may have already fixed audio output for some users. So, do re-test audio output on your system, either just normally or by following the above steps, and see what happens.

I also revived a port I did some time ago for [KUBSAN](https://github.com/waddlesplash/haiku-analysis/blob/master/kernel-undefined-behavior-sanitizer.patch), the "kernel undefined behavior sanitizer", a runtime analysis feature from GCC, and fixed a few minor issues it detected. I also experimented with GCC's [object size checking features](https://github.com/waddlesplash/haiku-analysis/blob/master/memcpy-etc-bounds-checking.patch) but they did not seem to find any problems (or I was not using them correctly...)

On the userland side of things, a user posted some small benchmarks they wrote in the IRC channel that showed some pretty bad performance disparities between Linux and Haiku (where Linux took a fraction of a second, Haiku took multiple minutes!) After some confusion on my part, I made two performance improvements to our C library that almost completely close the gap: one to [replace our C tree-search implementation](https://github.com/haiku/haiku/commit/abe937985ddadcf52b2dc7cb8bc6466cff85c86a), and a second to [our strndup implementation](https://github.com/haiku/haiku/commit/522c74f3e7916a63a22fd78ecd41af7e1f2b3911).

Over at HaikuPorts, I added an `all` keyword for `ARCHITECTURES` to HaikuPorter. This was partially prompted by the `riscv64` and upcoming `arm64` work that required editing quite a lot of base recipes to add these architectures as supported. Now most of those recipes just declare `ARCHITECTURES="all"`, and only HaikuPorter needs to be changed when new architectures are introduced.

Also on HaikuPorter, I added some checks to verify that CMake or Meson-based projects are always built with some kind of build type specified -- because if the tye is not specified, you get a debug build with no optimizations, which is not what we want in a production package repository! In fact, the newer `glib2` recipes had this problem, as did some other recipes in the repository; this should prevent that going forward.

I also [dug up](https://github.com/haiku/haiku/commit/d5f7f40504e748e09ba11018bd09ef6468da2c59) (from the Wayback Machine; they had previously been thought lost) some old test applications originally from Be's sample code, later adapted for Haiku, to test replicant "shelves."

Finally, I moved most WiFi firmwares out of `haiku.hpkg` and into their own packages at HaikuPorts (they have been in the tree since the WiFi stack was introduced over a decade ago, before the package manager came to be.) This reduces the size of `haiku.hpkg` by about 9MB or so, saving time and disk space for updates.

There are quite a lot of other, smaller, changes along these lines that I simply do not have time or space to write about here (one month is a lot of work, even after all the major items I have listed out here!) But I do make a point of explaining even the smallest of my changes in commit messages; so if you are interested, feel free to read those, or ask more questions about them.

## On the mailing lists

Besides code changes, I also started two major mailing list threads this month: one about [HiDPI strategies](https://www.freelists.org/post/haiku-development/HiDPI-strategies-current-and-future) and the other about our [80-columns limit in the coding style](https://www.freelists.org/post/haiku-development/The-80-columns-limit). Both were quite productive; the HiDPI one ended with a basic consensus on a new strategy to take (and now I have to go implement it), and the second ended with the line length limit [raised to 100 columns](https://www.freelists.org/post/haiku-development/Was-The-80-columns-limit-Now-The-100-column-limit) (which may not sound like a lot, but 20 extra columns is nothing to sneeze at, especially when we are quite particular about our `VerboseDescriptiveClassAndVariableNames`!)

## Whew....

That was a lot of things that I did this month! This article is already over 2300 words long, and I haven't even gotten to the part where I talk about what comes next.

Before I get to that, though, I should mention that this upcoming month I will (hopefully) be "away from keyboard" for about a week and a half. (I was gone for a week in September, too, but factoring in the days in August, that was less noticeable.)

On a different note, what would you like to see from me *besides* direct work on Haiku, if anything? Maybe I should be less verbose in these contract reports...? (I've heard that some of the SerenityOS developers do some kind of "office hours" livestreaming... maybe that's something you might find interesting?)

## What's next?

I paved the groundwork this past month for a number of things I hope to do in the coming one. I'll mention a few of them briefly:

 * **zstd compression for packages.** This has already been supported on x86_64 for some time, but not on x86_gcc2, and not in any of the bootloaders (so it cannot be used for the main system packages yet.)

 * **USB audio work?** Despite my status as the *de facto* USB stack lead developer, I actually do not know nearly as much about actually developing USB device drivers, or audio drivers. While already I have made some significant improvements to this driver, the knowledge to fix its remaining bugs as yet eludes me ... but seeing as it is a popular request, I should likely put the time in to acquire it.

 * **FreeBSD ethernet driver upgrades.** While I think our (PCI) WiFi drivers are presently up to date, FreeBSD has some new ethernet drivers (such as for Intel's newest line of gigabit controllers) that we do not yet have, and some users are requesting. This should be a relatively simple task.

 * **USB WiFi drivers.** This one may take a bit. I have a branch from before R1/beta1 where I started work on these, but I never went back to it and really tried to work on it, because I got bogged down in USB stack issues (or then simply had no time.) Now that the USB stack and the XHCI driver are pretty solid, I think it's time I returned to this one, and actually got it to work. Especially as more recent PCI WiFi devices are not supported by FreeBSD's drivers...

 * **HiDPI work.** Now that there is some consensus about what might be a good idea to implement based on the mailing list thread, I have to actually go and ... implement it.

### What's "later"?

While I don't expect to get to them this month, I have these things on my radar to be done "eventually":

 * **NTFS driver overhaul.** Our NTFS driver is a wrapper around libntfs3g, but that wrapper leaves much to be desired: it is totally uncached (not even the basic filesystem cache is used), it does expensive lookups for every operation, it frequently causes KDLs when deleting files that are in use... Given that NTFS is probably the filesystem people interface most with after EXT4 and FAT, this one deserves some attention.

 * **device_manager overhaul**: the kernel's device manager could use some serious rethinking. It does not accomodate USB devices, it has a lot of hard-coded logic for scanning the device trees, and it is pretty verbose to program for. Once those issues are resolved, it could gain some more power management logic, so we could have a more graceful shutdown process, and maybe even sleep support...

### *Whew!*

Well! That's all for this month. See you next time ... or in the replies below, on the forums, on IRC, on the mailing lists, on Gerrit, on the bugtracker -- after all, I'm pretty easy to reach these days. :)
