+++
type = "blog"
author = "tangobravo"
title = "Haiku Activity Update #1: 14-20 August 2007"
date = "2007-08-29T19:45:36.000Z"
tags = ["activity update", "progress"]
+++

A couple of months ago there was a debate on the mailing list about the openness of the Haiku project. I made the point that there was a lot of information in the public domain - SVN commits logs, bug updates, and a multitidue of mailing lists - the problem was that activity on these fronts was not obvious to more casual Haiku-watchers. I should have kept my mouth shut, because I ended up agreeing to write some summaries of this activity! This is the first of what will hopefully be weekly updates. Feel free to leave comments and suggestions below.


<!--more-->


<h3><a href="https://lists.berlios.de/pipermail/haiku-commits/">SVN Commit List</a></h3>
I'll start with Ithamar Adema who committed the first version of his legacy SATA driver just before the official start date of this update. Thankfully I'm allowed to mention it as he made some further changes to it during the period - adding nForce support to go along with the ALi and VIA support of the initial commit, and extending the driver to support 4-channel controllers. This driver is for "legacy" SATA chipsets - more recent controllers will implement the AHCI standard. Never fear though, AHCI chipset owners - Marcus is working on a driver for that. Obviously I'll keep you updated on progress in these blog posts.

Next I'll mention commits from new or occasional contributors, in the hope that the recognition will encourage them to continue working on Haiku! Ioan Molnar provided a patch to update the version of unrar in the tree to 3.76. Fredrik Ekdahl cleaned up the code to the glteapot app and applied the Haiku coding style. Andre Garzia (one of the GSoC students) has had the first version of his Network Preferences application committed along with some fixes to it from Stephan. Another GSoCer - Lukasz Zemczak - made the BStatusBar class work with the private layout API. Finally new contributor Justin O'Dell has produced a couple of patches fixing some of the interface bugs including default values for buttons in preference apps and menu accelerator drawing issues. Thanks Justin and welcome to the project.

Next up, the regulars. Stephan has been working on the app_server as usual - a new improvement is that buttons on window tabs scale with the font size. A bug in BShape was fixed which solves a FontDemo crash, and the addition of a lock in HWInterface hopefully fixes an issue with cursors being left behind. Finally there was some refactoring in the main Painter class which simplifies the code a bit and brings a small speedup. Resident Haiku build system guru Ingo added some build fixes and jamfile header changes. Stefano has done some work on terminal improving the tabbed terminal view, fixing the passing of arguments, adding a missing destructor (which should stop commands being left running), and some code cleanup. Stefano has also done work on BPicture adding some missing features and generally fixing issues revealed by the recent PictureTest application. Speaking of PictureTest - Michael Pfeiffer added that to the build in an attempt to get printing working under Haiku. Michael made a few bug fixes in the app_server and temporarily worked around a clipping bug with the result that the Preview printer now works under Haiku. Woo.

Finally to Axel who has done enough bits and pieces to be worthy of his own paragraph (I can see this becoming a regular occurrence). He added an auto raise feature to the Deskbar and Workspaces applet, so by moving the mouse to the corner of the screen the Deskbar will pop in front of any running apps. I can see that being really useful. He fixed a deadlock in the app_server and menus being closed on click incorrectly. Another bug that received his attention was copying an executable and running it before calling sync() corrupted the file - this was fixed in the VM (the pages were incorrectly moved out of the modified list and were thus never written back, if you really wanted to know...) Also in the kernel Axel did some work on the signal code to support changing the signal stack, added a test app for some signal features and fixed suspend_thread(). Finally, a really simple implementation for the POSIX memalign function was added - containing numerous issues pointed out by others, which Axel blamed on lack of breakfast...perhaps an "Axel's Breakfast Fund" should be started to ensure the quality of the code in the kernel?!

<h3><a href="https://www.freelists.org/archives/openbeos/">General Mailing List</a></h3>
Jorge (aka Koki) posted a link to a review of the community gathering and advocacy event, FalterCon. It sounds like a good day with a mix of socialising and introducing Haiku to some geeky Linux types. Good job to all involved. Read about it <a href="http://myhaiku.org/faltercon/forum/faltercon-2007/my-impressions-faltercon">here</a>. Urias posted a note that there is now a video available from the <a href="http://myhaiku.org/faltercon">main FalterCon site</a>.

After some discussion of how to configure grub to boot Haiku Fredrik Ekdahl managed to successfully boot Haiku using Ithamar's shiny new SATA driver.

<h3><a href="https://www.freelists.org/archives/haiku-development/">Development List</a></h3>
Ryan Leavengood is working on porting WebKit to Haiku and received advice on aligning memory. He also ran into some problems trying to compile the code with GCC 2.9.5, so is targetting GCC 4 Haiku at the moment.

A guy called Duane Ryan introduced himself to the list too. He seems excellently qualified (OK, so he's still a high school student, but has already written his own operating system!). Welcome to the community Duane, I hope you find something of interest here.

<h3><a href="https://dev.haiku-os.org">Bug Tracker</a></h3>
A lot of the bug activity is covered in the commits section, but I will just mention a few bugs of particular note this week.

Bug <a href="https://dev.haiku-os.org/ticket/1338">#1338</a> was closed - the reporter's machine would lock up within a couple of minutes after booting Haiku, but they now report uptime of 10 hours. That's a great demonstration of the huge strides in stability that have been made recently.

Stephan opened <a href="https://dev.haiku-os.org/ticket/1400">#1400</a> to receive advice on how to add nasm to the build to enable him to include his xvid decoder with the Haiku media kit.

<a href="https://dev.haiku-os.org/ticket/1403">#1403</a> is also worth mentioning to anyone using VMWare - the vlance driver in Haiku has been disabled as it is broken and slow. Urias suggests that VMWare users can still get on the net through Haiku by adding the line <br /> <code>ethernet0.virtualDev="e1000"</code> <br /> into their .vmx file, which will cause Haiku to use the much better ipro1000 driver.

<h3>Phew</h3>
Sorry this is already a few weeks behind - the next one should follow pretty quickly. In future these updates will probably be a bit shorter - but I suspect you, dear readers who have made it this far, would prefer that anyway!

As I said at the top, I'd be happy to hear comments and suggestions.

Until next time (probably tomorrow...)