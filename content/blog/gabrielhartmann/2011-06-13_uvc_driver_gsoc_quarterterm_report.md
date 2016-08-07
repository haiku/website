+++
type = "blog"
author = "gabrielhartmann"
title = "UVC Driver -- GSoC Quarter-term Report"
date = "2011-06-13T20:45:16.000Z"
tags = ["gsoc", "gsoc2011", "UVC", "driver"]
+++

On June 7, I turned in my dissertation and my semester ended.  On June 10, I had my first final exam.  Now it's time to produce a progress report for Haiku.  Almost miraculously, I've actually managed to squeeze some Haiku development time in and am making progress of a kind.

The most tangible progress is mostly in the form of debug messages and crashes into Kernel debug land, but I consider anything that I do which has a measurable effect to be progress.  So far all my efforts are aimed at trying to understand how all the different pieces of a userland driver component come together.  I've had a lot of help with this from my mentors and from people in IRC and on the haiku-development mailing list.  Michael Lotz and Anevilyak (IRC nick, I don't know a real name) were particularly helpful.

My current understanding of the task is this:
1. I should detect the connection of a camera.
2. I should detect its capabilities.
3. I should expose those capabilities in a MediaNode.

In reality two and a half out of three of these have already been done for me.  The USBKit is successfully detecting my camera.  Furthermore listusb lists all the relevant interfaces, configurations, and endpoints the camera provides (there are many).  In a similar way, a first draft of the UVCCamera driver (written by Jerome Duval) is also parsing this information and placing it in appropriate data structures.  These data structures even make their way to encapsulation in a MediaNode which is visible to the Media server...sometimes.  No capabilities are presented to the media server and CodyCam still claims that no video device is available, but I have seen something named "USB USB[sic] Video Device" in the Media preferences menu.  However the behaviour of the node is a little strange.  It's appearance is not stable at all.  It tends to appear on an initial media server restart, then never appear again.  This isn't always the case, so it's not exactly a reproducable bug which is irritating.  Also attempting to test code by plugging and unplugging my camera or even a flash drive is a bad idea as it leads to Kernel panics and trips to a frozen Kernel debug land.

I do not yet understand the precise journey information takes from its extraction in the current UVC driver back to a Video Provider MediaNode.  I know that a VideoProvider constructor takes a CamDevice.  I know that a UVCCamDevice extends CamDevice.  So presumably passing a UVCCamDevice to the VideoProvider constructor is how a MediaNode is created.  I even see code which could do this in the USB webcam add-on directory, but I'm a little fuzzy on the exact set of operations which lead from the current UVCCamdevice code back to MediaNode creation.  I'd like to understand exactly how that works.

Now that I've got a clearer if still hazy view of what's going on and what's needed I have some short term goals.  First of all I'd like to understand exactly what a VideoProvider node needs in order to expose capabilities to interested applications.  So far all my reading of code and documentation has focused on USB, but I really need to understand what the ultimate goal is before extracting data from the camera.  Second (or perhaps in a shared first position), I'd like to not only detect camera capabilities but actually invoke a command which returns some data.  I understand that Jerome Duval has done this recently and I'd like to either reproduce what he has done or extract some new kind of data.  Third I'd like to actually expose whatever capability I am able to extract to the media server.  My thinking is that if I can expose a single feature from end-to-end then the repitition of this task for more features should be fairly straightforward.

I'll be spending all day today working on the first two goals.  Tomorrow I have to study for an exam as it takes place on the day after tomorrow.  Then I've got a long break before my last exam in which to focus on the UVC driver.  I feel like I am starting to get a handle on the structure of the problem and am able to poke and prod the current code to learn new things.  That makes the problem solvable.  I suppose my biggest medium-term worry is how to deal with compressed video streams.  I don't know what decompression facilities are available or if they're applicable to this situation, but that's a problem for later.