+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 08/2017"
date = "2017-09-07T20:26:14.000Z"
tags = []
+++

<p>Hi there, it's time for a new monthly report!</p>

<p>This report covers hrev31437-hrevXXXXX</p>
<p>First of all, I have updated the git stats pages for <a href="http://pulkomandy.tk/stats">haiku</a> and <a href="http://pulkomandy.tk/stats_hp">haikuports</a>. These provide an overview of the overall activity with various graphs, author ranking, etc.</p>

<p>Anyway, let's see what happened in Haiku this month. As you know, it was the 3rd month of the coding period, and several patches from our GSoC students were merged in (and there is more to come as we continue reviewing their work). You can already enjoy a faster TCP stack, several improvements to the locale kit, and partial write support for btrfs (do not use in production, still experimental).</p>

<p>There are also some good news from the sysadmin team. They are slowly migrating our infrastructure from virtual machines to docker container, which will help using our main server (called "baron") more efficiently. The VMs allowed to separate various services, but they need a lot of RAM (about 2GB each). Docker containers will allow to have mostly the same separation, but they can share the host RAM dynamically as needed. This will allow us to run a separate container for each service, making things easier to manage, all while using less resources. However, the migration takes place without service interruptions so it is a bit tricky to handle.</p>

<p>The ongoing cleanup also helped make some space on the main server, which is now hosting an automated package build system. This takes recipes from haikuports and generates hpkg files automatically. This means once a recipe is merged, you do not need to get one of haiku devs to add it to the main repo. After a few initial issues with the generated packages, and since this makes it much easier to test them, it is now ready for a first experiment. If you are ready to get bleeding edge software and experiment with it (and report bugs as you find them), you can use <a href="http://eu.hpkg.haiku-os.org/haikuports/master/repository/">these repositories</a> as a replacement for the current HaikuPorts one. If user feedback is good, we will make the switch official, and set up the separate repositories for the beta release.</p>

<p>Before we dig into the changes in Haiku core, also a note about the Rust port, which thanks to jessicah's and kallisti5's hard work, is up and running again. Packages have started to land in the above mentioned automatically generated repository, however for now it is just the compiler. Other parts of the rust ecosystem should get in there soon. We should also hear more from the Swift port in the near future, as patches are being upstreamed for this one. We will see how and when these manage to integrate with the Haiku libraries and get to draw windows and widgets, often an interesting problem as it is harder to bind our C++-only APIs to other languages, which usually bind only with plain C.</p>

<h3>Documentation</h3>

<p>Well, after acknowledging the work of the sysadmin team in the paragraphs above, now it's time to talk about documentation. It is also an important part of Haiku and a place where people can contribute even if they don't have programming skills sharp enough to dive into operating system programming.</p>

<p>Humdinger refreshed the user interface guidelines to reflect some changes made to the code over the years. This should help getting all apps to use consistent rules, making the OS feel more integrated.</p>

<p>PulkoMandy documented parts of BLayoutBuilder::Grid. Unfortunately the BLayoutBuilder::* classes were introduced in the Layout kit at a rather late point, and the docs for legacy classes was already written and very detailed. As a result, the new classes see little use and are still not completely documented. This is another step towards fixing that.</p>

<h3>Localization</h3>

<p>Owenca added B_TRANSLATE_MARK_CONTEXT macros to allow marking a string within a specific context without collecting it, something that was not possible before. I'm not going into details here as this is a somewhat internal aspect of the locale kit and the way it extracts strings from sourcecode.</p>

<p>Akshay Agrawal (who worked on a calendar/agenda app for Haiku during GSoC) contributed several patches revolving around limitations in parsing and formatting dates in the Locale Kit. These include tools for fomratting relative dates (such as "2 days ago"), getting localized day names in short format, as well as fixing issues in the test suite which relied on the current locale to be set in a particular way. These changes also come with test suite updates, which is great (we need more unit tests!). Some applications are starting to benefit from these changes, for example there is now a better localization of the remaining time in Web+ download window.</p>

<h3>Network</h3>

<p>phoudoin continues his work on the virtio driver. This is a special network driver used only in virtual machines. virtio is a simplified bus which allows virtual machines to implement virtual, made up devices, instead of trying to behave like real ones. These devices are usually simpler to program than real hardware (as both ends are only software, things can be made quite a lot simpler than if actual hardware was involved), and are also designed so that they can offer better performance.</p>

<p>Korli fixed the connect() call to return the correct values in cases of using non-blocking connect and calling the function multiple times.</p>

<p>Patches from A-star-ayush were merged. This is the results of his investigations on Haiku TCP stack and implementing various RFCs. The result is a faster TCP implemenation (but we still haven't quite caught up with Linux yet), and possibly some fixed bugs in the process.</p>

<h3>System libraries</h3>

<p>The mktemp system call will now use really random file names. Before it used
the rand() function, which gives predictable results, and always the same results
if not properly initialized with srand() first. Now mktemp will use its own random sequence, 
which means it can seed it by itself (using the process ID and current time as entropy sources),
and it will also not use values from the rand() sequence, which the POSIX spec explicitly disallows (so applications using rand do not need to worry about other calls changing the sequence, and they can have predictable results).</p>

<p>Korli also implemented F_DUP_CLOEXEC support, which allows to set "close on exec" for duplicated file descriptors.</p>

<h3>Interface kit</h3>

<p>Wiktor fixed the rendering of BSpinner label, so that it is now always visible as expected.</p>

<p>Kacper Kasper reworked the rendering of BTabView to open the way for vertical tabs. They now render properly but the API isn't available to applications yet. PulkoMandy also fixed various other clipping issues in BControlLook, which mainly affected WebPositive as it uses a lot of transforms and clipping when rendering web pages. For example, it is now possible to draw scrollbars properly inside web pages (but changes on WebKit side are not yet released).</p>

<h3>Applications</h3>

<p>PulkoMandy fixed an hang of WebPositive at startup, when the cookie or session file is corrupt. Now Web+ will start, but the cookies (or session with opened pages) will be lost still. WebPositive will also avoid shiwing an empty window title when the document has no title, and use the page URL as a replacement.</p>

<p>PulkoMandy also fixed some remaining bugs in SerialConnect's XMODEM file transfers, in particular when using CRC instead of the traditional checksum. Moreover, it is now also possible to send raw files without any special protocol.</p>

<p>When DeskBar is used in "expando" mode (with windows visible directly in the deskbar, instead of as submenus), it will now filter out the application name from window titles. This saves space in the rather narrow deskbar to show actually useful information from the window title (channel names in vision, current directory in terminal, page title in web+, etc).</p>

<h3>Drivers</h3>

<p>The FTDI USB serial port driver now supports hardware flow control. If you don't know what this is, you probably don't need it, but I did.</p>
