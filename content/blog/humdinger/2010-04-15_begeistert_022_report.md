+++
type = "blog"
author = "humdinger"
title = "BeGeistert 022 Report"
date = "2010-04-15T13:45:44.000Z"
tags = ["begeistert", "conference"]
+++


<!--more-->

While the number of participants wasn't as staggeringly high as the last time in October after the R1/alpha1 was just out the door, about 30 people made it to the conference rooms of the youth hostel. Besides the usual suspects, a new developer, Sebastian, made his debut and fit right in.

As usual people seized the opportunity to show their newest projects and the progress they've made. Everyone had their notebook set up and small groups started to form and dissolve and wander along to the next computer to discuss the little presentations. When  Haiku showed some unusual behavior, say wander off to the kernel debugging land, a core developer could quickly be summoned to analyze and often fix the problem.

There've been a few talks in this casual atmosphere, starting with Colin Günther who already had to leave that Saturday afternoon. He described the progress of the WLAN system since R1/alpha1. Unfortunately there's not that much to report, as Colin was in the middle of his master thesis, which he'll start defending in May (good luck!). Since last BeGeistert Haiku gained 12 working FreeBSD drivers. Thanks to Alex Botero-Lowry (drax) there's now a tool called <tt>setwep</tt> which enables WEP encryption, which however, isn't considered to provide real security. WPA is therefore still the goal he'll be working on in the future. As is a GUI to detect and configure wireless networks. Special thanks went to Matt Madia who worked on integrating WLAN networking into the nightly builds and sorted out the licensing and installation of the different firmwares.

After that all attending Haiku developers had a chance to report on the progress made since R1/alpha1.
The biggest alpha2-blocker seems to be the missing IRQ routing which can lead to particularly WLAN drivers freezing the system. One idea that was briefly discussed, was to prevent these devices to share IRQs at all. (Looks like Michael Lotz started work on that during the Code Sprint, see <a href="https://dev.haiku-os.org/changeset/36225">r36225</a>.)
Stephan's success with the WebKit and WebPositive is plain to see for everone with a current <a href="http://haiku-files.org/">Haiku</a> and <a href="http://mmlr.dyndns.org/chrome/site/nightlies/index.html">Web+</a> build.
Ingo worked mostly on the kernel to remove locks that slowed Haiku down unnecessarily and on the vm caching. While Haiku and its BFS filesystem are still behind the highly optimized Linux components, the improvements have been quite substantial. Sponsored by the Haiku Code Drive he'll soon embark on extending Haiku's POSIX compatibility and, if it falls in that timeframe, coordinate the R1/alpha2 release.
Besides other smaller things, Oliver looked into POSIX integration of ICU with regard future localization efforts.
Michael implemented the idea of "anyboot", which simplifies installation by providing a single image that can be burned on CD or written to a USB stick.
Adrien kept working on the LocaleKit and managed to keep on top of things with regard to the massive amounts of localization files produced by the fine translators working with the <a href="http://hta.haikuzone.net/">HTA</a>. Further improvements are expected in the summer, when he'll spend two Haiku Code Drive sponsored months working full time on that.
Clemens' main focus was and is on ACPI for power management etc. Maybe he'll also have a look at that IRQ routing problem.
If in the past few months you haven't heard that much from François Revol - who was part of the usual French delegation together with Adrien, Olivier Coursière, Jerome Duval and Michaela - that's because, like Colin, he's focusing on his academic career at the moment. That's why he isn't at the Code Sprint this time either. However, he'll be presenting Haiku at the respected <a href="http://www.eurosys.org/">Eurosys</a> conference in Paris. In the future he plans to ease the use of extended attributes between different platforms.

Another BeGeistert veteran also made an appearance: Ithamar Adema, the "Cola Coder". He brought a bunch of code with him, which has been committed to Haiku's SVN by now. It's all about printing, enabling three big features: using printers over the network via CUPS, distinguishing an using several printers connected over USB and printing postscript on all kinds of printers using Ghostscript.
And that is just for starters. We'll see much more of Ithamar's code hitting the SVN in the future. All the things that have been developed especially for Zeta are to be adapted and improved to become part of Haiku.
That's because Ithamar is paid by a company planning to bring a Haiku compatible operating system to the market. All operating system relevant development is to be done in the official Haiku SVN repository; there's nothing like a fork planned. This operating system is also not supposed to be the base of that company's commercial interest. It's all still quite unofficial and Ithamar wasn't free to reveal too much detail, but it sounds like the money is to be made with specialized applications and niche products. The name of that company: yellowTab.

The Sunday saw two more talks. First Niels Reedijk's "<a href="/blog/nielx/2010-04-11_haiku_has_no_future">Haiku Has No Future</a>", which he first gave at the last FOSDEM.
Later Jan presented a CD burning project that is based on Zeta's yab application JABA. It consists of a C++ library that any application can use as an interface to the <tt>cdrecord</tt> backend and a Tracker add-on to quickly select and burn some files. It's not yet clear if there'll also be a stand-alone tool or if the yab application will be updated.

This BeGeistert had something new to offer its participants: an optional "Workshop Monday". Many who joined the workshop held at BeGeistert 021 expressed interest in having a whole additional workshop day after the regular BeGeistert weekend. So, this time people could book the Monday to enjoy a hands-on lecture on programming given by Stephan Aßmus. Unfortunately, it turned out only two guys took up that offer: Finn and me!
A shame really, as picking a core dev's brain for about 5 hours is easily worth the 75 EUR. Considering I have only slowly picked up programming last December, others could have profited much more than me. Stippi showed us how to implement several design patterns like notification via listeners, reference counting and actions. I admit, much of what Stephan showed was a bit above my head. But still, I think I've learned quite a bit and am fascinated how elegantly one can code with C++. Plus, after all, I still have Stippi's code to come back to once I'm ready for his code-fu.
Thanks again, Stippi, for taking the time. Hopefully next time, when there'll again be a Workshop Monday, more people show up to learn from a seasoned Haiku developer.

BeGeistert was once more a success and everyone seemed to have enjoyed it. Missed were our Italian friends who somehow missed the date this time and couldn't arrange reasonably priced traveling. The date for BeGeistert 023 isn't yet fixed, but should again be in October. Hope to see you all there!

A few pictures:
http://picasaweb.google.com/HumdingerB/BeGeistert022#