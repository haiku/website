+++
type = "blog"
title = "Haiku Contract Report: December 2021"
author = "waddlesplash"
date = "2022-01-10 18:00:00-04:00"
tags = ["contractor"]
+++

For the first time, most of the work I did as part of this contract was not in the month's [activity report](/blog/pulkomandy/2022-01-06-activity-report/) aside from a passing reference, as nearly all of it took place outside the main Haiku source tree. So, here I detail it; and thanks once again to the [generous donations](https://www.haiku-inc.org/donate/) of readers like you (thank you!).

<!--more-->

Nearly all of my work last month was spent on one thing, which was alluded to in the activity report:

## "Xlibe": an Xlib/X11 compatibility layer for Haiku

So, in my previous contract report, there was a note about the potentiality of writing an “Xlib compatibility layer”, that is, an implementation of the X11 APIs without an X11 server…

> So, I wondered if we might be able to do something similar on Haiku, in order to port X11 applications (or even entire toolkits…) without writing separate “native” backends for each and every one, and also without running an entire X11 server in the background. After some experimentation, I think this is indeed more than feasible, though we’ll see how far I manage to take it and how quickly…

As those of you who read the forums [already know](https://discuss.haiku-os.org/t/xlibe-an-xlib-x11-compatibility-layer-for-haiku/11692), the experiment has gone quite far, and in fact within a few weeks, will probably appear in the package repositories along with the primary impetus for the project in the first place: a GTK port.

<img src="https://discuss.haiku-os.org/uploads/default/original/2X/8/8be89428d627e61ca97a4036919c8fb6e6bea3c1.png">

(Some of the explanations that follow here will are lifted from the forum threads or other materials.)

### Why write an Xlib/X11 compatibility layer at all, instead of native backends?

“Native” backends for toolkits are obviously preferable, allowing for tighter integration with the system; the Qt port takes this approach, and it is proof enough that such things are both feasible and desirable. However, Qt is kind of an exception in many ways; Qt is well-abstracted internally in a way most other toolkits are not, and it has a wide variety of supported platforms even before it was ported to Haiku.

Not all toolkits are like this; in fact, very few are. GTK has backends only for X11, (now) Wayland, Windows, macOS, and "Broadway" (a HTML5 remote client system.) The macOS backend in particular was pretty poor for a long time; most users of GTK applications on macOS were stuck with using X11 via XQuartz. Other applications, like “AzPainter”, support X11 and only X11; or maybe they have support for Wayland, but not even a Windows or macOS port to speak of. Once software has been ported off of X11/Wayland, there is some hope that a native backend for a completely different architecture can be written, but oftentimes before that, the system will just make far too many assumptions about what it is running on to make rearchitecting it internally feasible.

So, even if writing a GTK backend for Haiku were feasible or doable, there is a separate, sizeable amount of Linux/etc. software that can really only be ported by bringing over X11 or Wayland.

### Why not just port an X11 server?

We could, as you can do on Windows or macOS, but considering the downsides of that approach and the flexibilities of the Haiku APIs, I realized that it was possible to re-implement the X11 APIs directly on top of the Haiku APIs (well, with some minor exceptions, of course), without an X11 server, and in fact provide a lot of the benefits that a “true” native backend would provide. For instance, "Xlibe" can directly translate X11 window properties and attributes into Haiku ones, and there is a possibility for even implementing drag-and-drop operations, whereas an X11 server port would likely have a hard time with fully natively integrating these things between X11 client applications and Haiku applications.

### Won't this make native backends obsolete?

Not at all; native backends for toolkits and applications will still have far greater integration than an X11 compatibility layer can provide. In fact, this opens the door to "incremental" porting: one might port a piece of software that mostly uses X11, and then incrementally replace portions of it to use the Haiku APIs directly instead of X11 ones (I imagine, or at least hope, that theming engines would be the first place Haiku-specific code would be introduced.)

### Why Xlib/X11 and not Wayland?

The Wayland APIs are very spartan and highly protocol-based; that is, there are more implementations of the protocol than just “libwayland”, making it basically impossible to write just one library for Wayland compatibility, but instead probably requiring a server implementation. While there are other X11 interface implementations besides Xlib (notably Xcb, which modern Xlib is based on), they are very rarely used, and in fact implementing an X11 server on top of Xlib is more than possible (Xnest, while very limited compared to Xephyr, is basically this, in fact), while implementing a Wayland server that runs on Wayland is experimental territory.

(To be fair, implementing an X11 compatibility layer is itself somewhat experimental territory. Tk re-implements a number of Xlib APIs internally as part of its cross-platform GUI code, and I've been informed there were some experiments with implementing Xlib on top of Wayland directly, but to the best of my knowledge, Xlibe is already the most advanced project in this area, and there are still a lot of things it does not yet do but could.)

### Beyond GTK...

I've also been testing with a variety of other applications and toolkits. Tk starts, but quickly runs into some rather baffling problems that I'm not entirely sure how to resolve (mainly, `BackgroundElement`s get placed in front of everything else.) Motif compiles and (with some hacks) starts, but runs into behavioral issues rather quickly. Basic Xt/XAW applications usually work (`xclock` does, for example, though it has rendering glitches because it assumes all drawing is not antialiased.)

Meanwhile, X512 made use of Xlibe in getting [graphical WINE to work](https://discuss.haiku-os.org/t/my-progress-in-porting-wine/11741/23):

<img src="https://discuss.haiku-os.org/uploads/default/original/2X/f/f4dabf5a007072669039395480b00c42e32c3b73.png">

(However, it seems like the better long-term solution will be to write a native Haiku backend for WINE, which X512 has already started on.)

## Internals changes

While working on Xlibe, there were a variety of minor items within Haiku itself I fixed. Among them were an app_server crash related to custom cursors, a sizing parameter confusion in `BBitmap` and some ambiguities in our API documentation, and some other related matters.

In HaikuPorts, I cleaned up and updated the existing X11 headers and libraries in preparation for Xlibe and GTK. (Xlibe itself is not yet in HaikuPorts, though; I still have a handful of things on my TODO list for it that need to be taken care of before that happens. With any luck, it should be before the next contract report, however!)

### GCC 11.2 upgrade

Technically the GCC 11.2 upgrade, which occupied a lot of November, was only completed and merged in the first weeks of December. Most of the initial regressions it caused were resolved or there is a stopgap in place (notably, the WiFi issues I mentioned in my last contract report have only a workaround and not a proper fix.)

## What's next?

Finishing up Xlibe and then getting it into HaikuPorts, of course!

And then, sometime in the next month or so, it seems we intend to start preparations for another beta release. (Maybe the last one before R1 itself?) I imagine that I will wind up picking up most of the "grunt work" that goes into a release, as well as tracking down the blocking regressions (and there are a handful this time.)

### That's all?

For once, this report is of a somewhat shorter length: "only" ~1300 words, instead of the 2000+ that the previous ones have been. (I could have written quite a lot about the internals of Xlibe and the mechanics of API mapping, but, well, for the few of you who are interested in such things, the source code is probably its own and a better explanation than I would write here.) See you next month!
