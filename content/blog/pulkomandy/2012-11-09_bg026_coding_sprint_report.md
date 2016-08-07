+++
type = "blog"
author = "PulkoMandy"
title = "BG026 Coding Sprint report"
date = "2012-11-09T08:49:35.000Z"
tags = ["begeistert", "report", "coding sprint"]
+++

Hi there !
This week was the BeGeistert coding sprint. I assume you already read the great <a href="http://www.iscomputeron.com/index.php?option=com_content&view=article&id=1215:begeistert-026-report&catid=1:latest">report at IsComputerOn</a> about the conferences for this week-end, so here's just a summary of the work done durint the coding sprint.

<h3>ARM Port - Ithamar Adema, René Gollent, Adrien Destugues</h3>
Ithamar was holding the keyboard on this one. He's working on low-level Android stuff as his paid job, so he has a good understanding of the hardware and the Linux kernel that serves as a reference.

The ARM port was started as a Google Summer of Code project <a href="https://www.haiku-os.org/tags/arm">back in 2009</a>. The project got the kernel compiling, and the bootloader working. Things more or less stayed there after that. However, with the recent release of the Raspberry Pi and some other cheap ARM-based hardware, there is interest for ARM again.

Ithamar is working with the Gumstix Verdex board. This is what was used for the work in 2009. That board is quite old by now, but it has a complete emulation in QEmu which is very useful for debugging the kernel.

We worked on getting interrupts, context switching, and page faults working. This brings the kernel to the point where it says "Cannot find any boot partitions", because there is no mass storage driver yet (it also lights 4 icons on the bootscreen, which is also working). We tried to add the usb mass storage driver, but that reliably triggers a panic which also happens, but only sometimes, on x86.

We also did some work (with remote help from Oliver Tappe) in getting the ARM toolchain working on Haiku. The compiler can now be built, and u-boot tools are ported (they are required to build a bootable image that the u(boot bootloader can work with). The build of an ARM version of Haiku still requires a tool to create partitions from the command line, and some scripts changes to use our own mkdos command instead of dosfstools mkdosfs. Ithamar may work on this since he now has installed Haiku on his laptop.

<h3>FDT support - François Revol</h3>

As part of his work on the PowerPC port, François is working on Flattened Device Tree support. The FDT is a data structure passed by the u-boot bootloader to the booted kernel. It describes the hardware the kernel is running on, and allows to find where are the serial port, frame buffer, keyboard, mass storage, RAM, etc. needed by Haiku. This avoids hardcoding drivers to fixed addresses for these peripherals. Since u(boot is also used on ARM devices, this work will be reused there as well. This will make it easier to port Haiku to more hardware with PPC and ARM chips.

<h3>BMenu tracking code rework - Alexandre Deckner</h3>

The code in BMenu is one of the most messy parts of the interface kit. Each menu is actually a BWindow, which means it gets its own thread and event loop. As a menu tends to share a lot of data with its submenus, the code is very messy and has a lot of small bugs. Alexandre is reworking this code to use a better solution.

<h3>WebPositive service kit network backend - Alexandre Deckner</h3>

The <a href="https://www.haiku-os.org/tags/services_kit">Services Kit</a> is another of our past GSoC projects (2010). The plan is to have a full-featured http API for getting information from web services more easily. The kit has been merged into Haiku but is completely undocumented, so it's not seeing much use.

Alexandre started by merging some patches for better https support. He then tested the kit by writing a weather deskbar replicant that makes use of it.

But the core of this work was on the WebPositive broser. The browser currently uses WebKit's default Curl backend. While being the default, this is not used by most WebKit based browsers and has a number of problems with cookies, caching, and https connexions, as well as being quite slow. The idea is to replace this with a backend relying on the services kit, to avoid this problem. This means the cookies and other information will be shared with other applications using the kit.

<h3>Debugger improvements - René Gollent</h3>

René worked on watchpoints support in Debugger. That's one more step on making it a suitable replacement to GDB.

<h3>Stack&Tile fixes, ALE, and more - Clemens Zeidler</h3>

Clemens is currently working on his phd at the <a href=http://www.cs.auckland.ac.nz/uoa/home/about/ourresearch/">university of Aukland</a>. The research department has some projects focused on improving user interface interaction. They use Haiku as a prototype for their research, as it is easier to modify things that affect the whole system. You already kow their work as the Stack and Tile support and the Aukland Layout Model.

This year Clemens showed us the Aukland Layout Editor which is a drag and drop tools for laying out an user interface. It can be used at runtime on ALM-based windows to freely alter the layout. Clemens asked each of us to go through a set of test applications to see if we managed to use the feature to make our work more efficient. There is also support for graphically routing events (such as a button click) to actions, in a way similar to the Cortex application. That stuff looks very promising.

Clemens also fixed some Stack and Tile related bugs in Haiku.

<h3>fRiSS user interface update - Adrien Destugues</h3>

<a href="http://pulkomandy.tk/projects/friss">fRiSS</a> is an RSS and ATOM feed reader for Haiku. It just displays news items from your favourite websites in a window or a desktop replicant. fRiSS is available in Haiku as an optional package, and I'm working on improving it.

With the apha 4 release around the corner, I wanted to improve the user interface that was quickly hacked together. I cleaned up the code and improved the drwaing so it looks more like a regular Haiku application. This was finished right in time for the Alpha 4 code freeze, so people installing alpha 4 will get the very latest version of fRiSS.

<h3>NetSurf browser improvements - Adrien Destugues</h3>

<a href="http://netsurf-brower.org">NetSurf</a> is a web browser. Originally developped for RiscOS, it has a focus on being very fast and lightweight. The BeOS port was started by François Revol with the target of replacing NetPositive. His main use for that was using Netsurf as a replicant inside the BeHappy application. this means while the html rendering works very well, the UI shell around it stayed very basic.

My work included adding graphical toolbar buttons, a download window (not saving the file to disk yet !), some event loop fixes to avoid network activity freezig when the UI is not doing anything, and updating the port to the latest sources from NetSurf git tree. I also added the support for automatically stacking windows using Stack&Tile, which removes the need for any in-application tabbing. I hope to see more applications supporting that soon, maybe starting with Terminal.

NetSurf is a very nice browser and much faster than the alternatives on Haiku. Its main drawback is the lack of JavaScript support, but the developpers are actively working on that. I think this browser has some potential for becoming the standard choice in Haiku. It is also much faster to compile than WebPositive with the whole WebKit framework, which makes it a lot easier to improve on it.


One last mention : I also did some work on <a href="http://pulkomandy.tk/projects/APlayer">APlayer</a>, a release should not be too far but there are some issues I'd like to solve first.

<h3>The end.</h3>

Overall, this was a pretty good coding sprint with lots of stuff going on. We also saw some remote activity as the Alpha 4 release saw his code freeze happen during the week and is now in final testing stage. If all goes well, it will be available on monday.