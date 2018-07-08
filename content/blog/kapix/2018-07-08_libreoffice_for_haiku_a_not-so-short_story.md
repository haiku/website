+++
type = "blog"
title = "LibreOffice for Haiku, a not-so-short story"
author = "KapiX"
date = "2018-07-08 02:16:12+02:00"
tags = ["haiku", "software", "libreoffice", "port", "ports"]
+++

As many of you are already aware, LibreOffice is now available on Haiku. This has been a long journey that has started for me around 2014, when I was looking for things I could do for the project. LibreOffice port was one of those things. It seemed to need so much effort, most people didn't even want to start. That's understandable given people were busy developing the OS. However, it's not the first time someone tried to do it.

## Earlier effort

WebArchive has a copy of [a wiki page](http://web.archive.org/web/20131016171054/http://wiki.ooo4kids.org/index.php/EnvironmentSetup/HaikuOS) detailing how to build OOo4Kids on Haiku. It's so far in the past, that it says it can't be built on Alpha 2 because of some bugs. The person working on that was oco. But wait, what is OOo4Kids and why port that instead of full Open/LibreOffice?[^1]

It is a lightweight version of Open Office (it was before LibreOffice fork). At that time, it was better to start with that as some dependencies not available under Haiku were already removed, like Java

oco didn't [get very far](http://lists.ports.haiku-files.org/pipermail/haikuports-devs-ports.haiku-files.org/2014-July/003636.html) in terms of usability: he had everything compiling, with VCL (LibreOffice's GUI toolkit) being just an empty shell. However, looking at these instructions and considering this was before Haiku had a package manager, I'm guessing a lot of work and figuring things out were needed to get to that point. That being said, I ended up starting from scratch.

## Package management

You can see haikuporter being mentioned on that wiki page, so it couldn't be that bad, right? Well, yes and no. Haikuporter back then was a one way street: you could automatically build and install things, but it didn't create packages, it just copied stuff to (not always) appropriate places. It also used different recipe format (BEP files, some of them [hang around to this day](https://github.com/haikuports/haikuports/issues/1246)). I don't have too much experience with that incarnation of this system.

I do remember problems with libraries being put in the wrong place, though. These problems were a result of hybrid system architecture: GCC2 and GCC4 executables being put along side each other. Sometimes a GCC4 library was put where GCC2 version should have been or wrong path was set, and you would get mysterious linker errors that wouldn't even mention which file was a culprit. Since LibreOffice could not be built with GCC2 I decided to work on GCC4 hybrid system, with GCC4 as a primary architecture, where this problem would not happen. Figuring out how build system of such a big project works was hard enough, I didn't need additional obstacles.

Fortunately, my fears were not realized: package management was already merged; it was (and still is) so much cleaner and a pleasure to work with. I have started creating recipes for missing libraries LO's configure was complaining about. Not long after I got commit access to HaikuPorts.

Some recipes were easy; thanks to Haiku's POSIX compatibility and autotools portability[^2], most of them worked out of the box. [Document Liberation Project's](https://www.documentliberation.org/) libraries fall into that category and they were ~50% of the dependencies. Some not so much: I got stuck on NSPR and NSS and asked for [help on haikuports' ML](http://lists.ports.haiku-files.org/pipermail/haikuports-devs-ports.haiku-files.org/2014-July/003626.html).

That wasn't a blocker though: I could bypass the requirements by building each module by hand. It was tedious but I worked like that for some time. I managed to go as far as oco did; I could experiment with building VCL and writing Haiku backend for it.

That has stopped when I reinstalled Ubuntu only to find out, that it wiped out all my partitions due to [a bug in the installer](https://bugs.launchpad.net/ubuntu/+source/ubiquity/+bug/1265192). Most of my patches were backed up, but I lost some work as a result of this. 2015 has started.

## An editor! An editor! My kingdom for an editor!

Discouraged, I decided to tackle another issue that came up: lack of a code editor. Sure, there is Pe, but it has one dealbreaker when it comes to working on LibreOffice: it can't use spaces as indentation. LO uses 4 spaces and has a git hook which prevents commits that break this guideline from going in. It quickly got annoying. I have tried to add this feature to Pe, but after a few experiments gave up.

I wasn't comfortable with using vim back then; I remembered I saw an early [Scintilla](https://scintilla.org/) port somewhere. I took this code, polished it to the point of being usable and started working on an editor based on it. After two years, on January 1st, 2017 I released [Koder 0.1](https://discuss.haiku-os.org/t/koder-new-native-code-editor/4480) and I am using it for my Haiku coding needs ever since (actually even earlier).

Two years is a lot of time, but that's the reality of working on side projects in free time. Could it be spent better? No! Koder and Scintilla were a great exercise in using BeAPI, knowledge that is obviously needed when writing a GUI backend.

## Back on track

Editor woes out of my way, I could go back to LibreOffice. In the meantime, more libraries got ported, NSS among them, I learned a lot as well --- it made things easier going forward. Thanks to these new ports I no longer had to build modules and manage dependencies between them by hand. Many libraries were also available in the depot, so time to set up the development environment got cut too.

Learning from past mistakes, I have rebased the patches against 5.3 branch instead of master, to have a stable target. On January 3rd, 2017 I have pushed them out to my fork, and 10 days later I managed to have a first VCL window on my screen. Commits were flowing for about a month, with some more in April. At this point if ran soffice.bin you would see this:

<img src="/files/blog/kapix/lo_calc.png" title="Not quite there yet…" alt="Not quite there yet…" />

It's not entirely accurate, because one day after this screenshot was taken, I managed to get bitmaps working, which replaced all those nasty rectangles with nice Breeze icons. :)

## Sprint to the finish…

Fast forward to November 2017. PulkoMandy has organised a [Haiku coding sprint in Toulouse, France](https://www.haiku-os.org/conference/2017_kdc/). I didn't intend to work on LO there, but after [taking care of PowerStatus look](https://dev.haiku-os.org/ticket/7330) and fixing some minor bugs, I didn't want to start a new thing I could not finish there. I have resumed work on the port and a lot of progress was made, thanks to no-interruptions atmosphere. Three days later I got this:

<img src="/files/blog/kapix/lo_writer.png" title="That's not how finish looks like" alt="That's not how finish looks like" />

PulkoMandy gave me some tips how to alleviate constant crashing, which was caused by race conditions. Drawing from his experience with WebKit port, I rewrote the backend to use offscreen bitmaps. That made it crash much less.

mmu_man suggested that I should give a presentation about the port in Open Document Editors track at [FOSDEM](https://www.haiku-os.org/conference/2018_fosdem_2018/) in February. I didn't plan to go to Brussels, but I submitted a proposal and to my surprise, it got accepted.

## Final stretch

After [the presentation](https://fosdem.org/2018/schedule/event/ode_haiku/) I talked with [Michael Meeks](https://people.gnome.org/~michael/) about the port. He was very glad to see someone work on a new port and diving into VCL. He encouraged me to upstream my patches as soon as I can and suggested using Cairo for rendering [^3], which would save significant amount of work. I wanted to push LO out to users as soon as possible so I started pursuing that. I have cleaned up and [upstreamed](https://github.com/LibreOffice/core/commits?author=KapiX) the basics that enabled LO to compile on Haiku. GUI port was very hacky so I omitted that part of the code.

Somewhere around that time Qt port started taking shape and diver asked if that could be used. I didn't like the idea at first [^4] but intrigued I tried to build it. With my knowledge of the build system it was pretty easy and I didn't even have to write [any new code](https://github.com/LibreOffice/core/commit/99614e0a782a15749bdc3781d5319309c8d48b46). With that in place, diver and 3dEyes took it from there.

If there is something I wish I did differently, it's that I should've started working on using Cairo backend earlier. Maybe I would be done with the port by the end of the coding sprint, and make it available earlier. Hindsight is 20/20, as they say.

## What's next?

Although the code I wrote is not used in the end, it is a base that could be used by someone bothered by the fact, that our LibreOffice port is using Qt. There are two branches in my [repository](https://github.com/KapiX/libreoffice_core):

* haiku --- native BeAPI backend lives here, based on 5.3 branch
* haiku-6.0 --- my attempts to use Cairo, based on master branch

I will do some work on the native backend from time to time. First thing to do is merging these two branches, so Cairo and BeAPI backend can be compiled from one codebase. However, since it's not important to make it available quickly, I'd like to contribute to other things like WebKit. I also have my own projects to maintain now: [Scintilla port](https://sourceforge.net/p/scintilla/haiku/ci/default/tree/), [Koder](https://github.com/KapiX/Koder) (mentioned earlier) and [Polyglot](https://github.com/KapiX/Polyglot) (which I wrote to simplify management of localization files for apps).

During my efforts to get LO working I got commit access to Haiku itself, too. While I'm trying to not get sucked into the main project (Haiku needs app developers!), there are some interesting areas I'd like to work on. LibreOffice has uncovered [some bugs](https://dev.haiku-os.org/ticket/13159) in the OS and we're close to beta now, so all hands on deck.

## Special thanks to…

* bonefish and olta for an excellent package management implementation
* AnEvilYak for being very responsive when I had issues with Debugger
* korli for help with some library ports
* PulkoMandy for the coding sprint and tips
* diver and 3dEyes for their work on Qt and KDE ports for Haiku
* HaikuPorts team for making package management actually useful :)

[^1]: [Relevant reading](https://discuss.haiku-os.org/t/libreoffice-is-now-available-for-haiku/6917/28) about dependencies.

[^2]: As much as writing and setting up autotools scripts is a pain, it truly is portable. Just supply proper paths, add some cases in switches and you're set.

[^3]: Turns out waddlesplash [asked me](https://echelog.com/logs/browse/haiku/1491516000#bottom) about it as well in April 2017.

[^4]: LO->VCL->Qt->BeAPI --- that's a lot of abstractions…
