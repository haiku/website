+++
type = "blog"
title = "Feb 2021 - Survey Results"
author = "kallisti5"
date = "2021-03-22 17:37:59-05:00"
tags = ["haiku", "software", "survey"]
+++

Earlier this month, I created a quick survey to gauge what topics are most important to the Haiku community.
We had 387 responses, resulting in a substantial amount of data which helps us keep focus on the most important todo items.<br/><br/>
Thanks to everyone who filled out this survey!<br/>
I'll be going over the results and adding a little commentary along the way. Let's go!

## Which version of Haiku do you normally use?

<img src="/files/survey_feb2021/1.png" alt="59.7% Nightly, 40.3% Stable"><br/>

So far, not too surprising. A lot of people value the stable R1/Beta 2 release, but most prefer the nightly images. This makes sense as R1 / Beta 2 was released around 9 months ago.

## What architecture do you normally use?

<img src="/files/survey_feb2021/2.png" alt="85.5% x86_64 (64-bit), 14.5% x86_gcc2 (32-bit)"><br/>

We continue to support the 32-bit version of Haiku for its BeOS binary compatibility. However, it appears the trend continues to be users gravitating to the more modern x86_64.
This further supports gradually deprecating 32-bit Haiku after the release of R1.

## How often do you use haiku on a virtual machine vs physical hardware?

<img src="/files/survey_feb2021/3.png" alt="41.3% of people never use Haiku in a VM. 32.3% of people never use haiku on physical hardware"><br/>

This one is interesting. It seems more users prefer running Haiku on physical hardware. Those who run Haiku on physical hardware also run Haiku daily more often then users who run Haiku in a virtual machine.

## What is the most "common problem" you see when using Haiku?

<img src="/files/survey_feb2021/4.png" alt="53.7% Hardware/Driver support, 37.7% Lack of software"><br/>

This one doesn't give a lot of interesting data. Hardware / Driver support in the top position isn't surprising. Haiku supports a large amount of hardware natively for our size... however we definitely stagger behind Linux and the BSD's on hardware support.

## What class of hardware has the most problems in your experience

<img src="/files/survey_feb2021/5.png" alt="45.5% Graphics, 19.6% Network, "><br/>

Not surprising.  While Haiku supports quite a few mainstream graphics cards, we are always finding edge cases and broken modesetting.
There are some long-planned projects trying to piggyback on Linux's graphics drivers... however nothing has even really taken shape beyond our native drivers.

Network is actually a little surprising to me here. I personally don't see too many issues with network cards.
I'm wondering if by 'Network' users actually mean our control panel / wifi network selection / etc?

## What class of software is the most lacking?

<img src="/files/survey_feb2021/5.png" alt="60.2% Web Browser"><br/>

Not surprising at all.<br/><br/>
The web browser has catapulted to the "most important" application in the last decade for pretty much all tasks. (checking email, news, char, multimedia, some gaming)<br/><br/>
WebPositive is based on the modern Webkit engine, however, WebKit relies on a rater large amount of platform specific code. On one side, this makes sure it integrates very well with the OS (using, for example, the same font rendering as other applications). On the other, updating WebKit requires some development on our side and continues to push it to improve our APIs (for both network and drawing code, as well as other parts of the system). This also resulted on WebKit development waiting on the availability of a new stable release of Haiku (including new features) in order to ship updates. Recently we have worked on improving the ABI stability of some parts of Haiku to make it easier to ship improved versions of WebKit more often.

## What kind of performance issues do you see?

<img src="/files/survey_feb2021/6.png" alt="44.4% Graphics, 28.9% None"><br/>

We still lack GPU accelerated OpenGL rendering support.<br/>
The Mesa project has been amazing helping us keep Haiku support upstream, however our graphics stack needs to be redesigned to allow some level of compatibility with the [Linux DRM API](https://en.wikipedia.org/wiki/Direct_Rendering_Manager).

Today we render using upstream Mesa via their llvm-accelerated software renderer. This allows you to "brute force" through OpenGL workloads with your CPU, but doesn't offer the extensive hardware OpenGL performance graphics cards are designed for.

## Freestyle answers

We received a *TON* of positive feedback from the community in the last freestyle comment box.<br/>
I'm omitting it here since we all know Haiku is amazing/great :-)<br/><br/>

I've chosen the more interesting comments to include here (for better or worse)

### If one sentence could summarize the biggest reason you don't use Haiku dailt, what would it be?

* "I want to use a large external display with my laptop but it doesn't work"
* "Lack of security: no disk encryption, no network security, no error-proof file system (all equal order of importance)."
* "Browsers are too slow"
* "N/A, it's my main OS"
* "The experience on mainstream operating systems (including Linux) is just much smoother."
* "For working from home: VPN (IPSec L2TP) and RDP"
* "i cannot use it to capture audio or video from any of my equipment, nor to edit photos, and so i cannot do my work."
* "Need VPN; want webcam (work teleconferencing) newer Go, better browser (Slack, Teams)"
* "No reason to switch to Haiku"
* "I don't use Haiku daily as a development platorm because of the VERY outdated GCC tool set."
* "I'm scared to run it on real hardware in case I lose data."
* "Lack of a programmers editor that fits my workflow"
* "I really want to use Haiku on Raspberry Pi 400."
* "I don't use haiku because it doesn't support my WiFi card driver."

### If one sentence could summarize the most difficult task you have experienced in Haiku, what would it be?

* "playing hi res video in media player."
* "Generally, Haiku is easy to use, but the installer only works for people which are into tech, not so for normal users."
* "Modern browsing. It's a pain!"
* "Installing Haiku on a UEFI system"
* "Getting old BeOS applications to run."
* "Trying to build GCC 10.2.0 in Haiku."
* "Trying to blacklist or replace a driver"
* "Figuring out how to get default video to start properly. "

## Any other feedback?

**Here are a few of my favorite positive messages :-)**<br/>

* "Besides the browser issues, I must admit that WebPositive had improved a lot in the recent times.  Several sites that didn't worked 6 months ago, now works."
* "Keep up great work! I love Haiku and I absolutely admire your work!"
* "Very nice OS with a helpful community. Thanks!"
* "its pretty cozy and i like how lightweight it is."
* "Keep up the good work."
* "Ship it!"
* "Keep up the great work!"
* "You did a great job!"
* "You guys do a great job, add better graphics support (from FreeBSD?)"


**Here are some of the random critical opinions**<br/>

* "Another problem is the lack remembering NFS mounts and not mounting NFS submounts. Also the BTRFS crashes the OS which makes sharing user files with Linux not possible."
* "I still think PM was a mistake, at least in this implementation because it caused too many divisions in the community."
* "Multi-monitor support is a must"
* "Need to start anticipating multi user support"
* "I'm a classroom teacher, so a single user OS is of little use for me on lab machines. I would love to use it on Raspberry Pi's, but it seems the Haiku community is not much interested in that.  Oh well."
* "Haiku team should prioritize on releasing R1 as soon as possible. Everything else can wait. It's important in order to attract new developers."
* "The Alt vs Ctrl issue is getting on my nerves, and I've used BeOS since 2001. Makes switching between Win/Linux/Haiku a pain in the ass everytime Haiku does it differently."
* "No working video playback in webpositive and otter browsers"


## Overall Summary

Looking at the big picture above, several things stand out.

1) We need to put a strong focus on continuing to improve WebPositive. 
2) We need to work on a roadmap of how Haiku could present Linux DRM/KMS compatibility API's to Mesa. We really can't make any accelerated graphics progress without this.

I personally think #1 is a lot more possible in the short term.<br/>
 #2 is going to be a *LOT* of work in the medium / long term.

What are your thoughts? Agree / disagree?  Let us know in the comment section below!
