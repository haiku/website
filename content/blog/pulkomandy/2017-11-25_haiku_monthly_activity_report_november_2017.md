+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 11/2017"
date = "2017-11-25T20:26:14.000Z"
tags = []
+++

<p>Hi there,<p>
<p>This month has been quite filled with Haiku events, including two conferences
and a coding sprint.</p>
<p>Read on for our adventures climbing over a gate, planespotting, and
eventually troubleshooting a real-scale flight simulator!</p>

<p>This report also covers hrev51518-hrev51622.</p>

<p>In order to better keep track of what happened during the sprint, this report is
roughly in time order, rather than the usual categories.</p>

<h3>Week 1</h3>

<p>Korli fixed a bug in the newly implemented posix_spawn, allowing the fish shell to use it without freezing.</p>
<p>Andrew Lindesay reworked the logging system in HaikuDepot to ease debugging.</p>
<p>Humdinger cleaned up the property_info lists used for scripting with hey, fixing some missing terminators which would lead to various failures when trying to script the applications.</p>
<p>mmlr fixed a bug in package_repo (the tool used to create package repositories) when used with relative paths.</p>
<p>John Scipione fixed various bugs in DeskBar and replicants, making it possible to resize the deskbar with automatic relayouting of the replicants.</p>
<p>Philippe Houdoin reworked TextSearch to use xargs, making it a lot faster and more reliable.</p>
<p>Greg Cain (a new contributor) fixed several problems in the XHCI driver, meaning we now have much better support for USB3 ports. There are still some problems and he is investigating them, however it is already enough to use USB3 ports with an HID mouse, and on some machines, even <strong>boot to the desktop from an USB3 port</strong>.</p>
<p>John Scipione continued his work to document the API, this time focusing on the Locale Kit and number and duration formats.</p>
<p>A-star-ayush fixed some issues in the TCP work he did during GSoC. He is currently busy with exams, but should be soon back with more work in that area.</p>
<p>Andrew Lindesay reworked the data download in HaikuDepot to improve the initial startup time of the application, as a lot of data (screenshots, icons, descriptions) have to be downloaded from the server.</p>

<h3>Alchimie</h3>

<p>Alchimie is a demoparty around alternative computers. It takes place every 2 years near Valence. This year I attended it for the first time, mostly as an Amstrad CPC demomaker (my other hobby when I'm not doing Haiku things). However, mmu_man asked me to give a talk about Haiku, as he is usually doing it and everyone was joking that he was the only contributor. Since I was preparing a talk for the Capitole du Libre anyway, I gave mostly the same.<p>
<p>I focused on all the issues the Haiku project is facing in many areas. The conference area was mostly full, with several devs from MorphOS and AmigaOS lands. They found it quite interesting that we are all facing very similar problems. It also led to some other interesting discussions and comparisons (we have SMP, but they have 3D acceleration!), and discussions about code review tools, the possibility for them to also reuse FreeBSD drivers, etc. Overall a quite succesful talk.<p>
<p>Later on I also attended a talk about yearly news in AmigaOS 4, then another showing the work in progress in porting or rewriting games for AmigaOS4, which involves stripping the shaders from unsupported stuff to get them running. We could also see the AmigaOne X5000, the latest Amiga machine, which surprised me by taking about a minute just to get to an u-boot prompt. AmigaOS itself still boots quite fast, but I don't know what they are doing before reaching the OS.</p>

<h3>Week 2</h3>

<p>waddleplash reviewed and merged several patches which were pending on the bugtracker, including work by Dale Cieslak to speed up the character map application, old patches from Andreas Faerber to clean up the kernel network stack (used for network booting) on PowerPC, and a patch by Owen to improve keyboard shortcuts in file panels.</p>

<p>Korli started work on the FreeBSD11 compatibility layer, bringing several wired network interfaces up to date. The work on wireless ones remains to be done.</p>

<p>kallisti5 introduced lutimes, a function required by POSIX which was not available yet.</p>
<p>korli fixed the shm_open function to set the FD_CLOEXEC flag. POSIX compatibility subtleties again.</p>
<p>John Scipione tweaked the look of BSpinner</p>
<p>Janus fixed various problems in the PowerStatus replicant, mainly to allow replicating it on the desktop after resizing (if you want that huge battery gauge, now you can).</p>
<p>Kallisti5 got the UART output working again on the Raspberry Pi 2, allowing for debugging the kernel and boot process (it still crashes early on, but at least we can try to investigate now). He also cleaned various things in our shared UART code.</p>
<p>John Scipione fixed alignment of Tracker column titles with the scrollbar arrow.</p>

<h3>Capitole du Libre</h3>

<p>The Capitole du Libre is an event around free software (and hardware) in Toulouse. We were there with a Haiku booth for the 3rd (or 4th?) year. The event is a great success and keeps growing every year. As mentionned above, I gave a talk there. It was much less succesful than at the Alchimie, with maybe 4 or 5 people attending. This seems to be a combination of lots of interesting talks happening at the same time, and being scheduled as the first talk on sunday morning, after everyone had a busy night talking, eating, hacking, and doing whatever they do instead of sleeping.</p>
<p>Besides the talk, the event is also an opportunity to meet and discuss with people from other projects. I had a try at porting Poezio, an XMPP command-line client, and got one of the developers to finally submit patches to haikuporter that we had started working on together back in july at the RMLL, and were sleeping on his laptop since then. I still hope to get him to boot is Haiku VM more often.</p>
<p>This year our booth was just next to Purism, who were demoing their laptops and advertising their upcoming phone. Their goal is to provide devices which don't need any closed source software to run: no binary blobs, open source BIOS, etc. We wanted to try running Haiku, but their laptops boot straight into coreboot which can only load a Linux kernel, or maybe, possibly an UEFI executable. Since we only had a BIOS-based USB drive, this did not work. We will try to have at least an EFI one ready next time.</p>
<p>I made some demos of Haiku, the usual things with filesystem attributes, playing several videos, plugging a MIDI keyboard (but several people complained about the latency), and showing CPU load on USB blinkenlights. François also had the usual 800MHz demo laptop, which still doesn't want to die after all those years.</p>
<p>On sunday morning, KapiX joined us and helped give some demos on the booth, explaining the goals of the project, and so on. It meant it was a little easier for us to visit other people, and I tried to convert people to Haiku by giving them home-made cookies. We'll see if new contributors pop-up thanks to this!</p>
<p>In the evening, Hy Che joined us as the event was closing. He found his way thanks to helpful people around the tramway and metro lines. Thanks to them :)</p>

<h3>KDC - Coding Sprint</h3>

<p>As you may have noticed, there was no BeGeistert this year. The increasing costs of the Düsseldorf youth hostel and the declining attendance meant that it was not worth it anymore to make that happen. However, the coding sprint that usually went with it is an important event in the Haiku project, so we decided (during last year sprint) that it should continue nonetheless.</p>
<p>After some research, I found a suitable place, just 2 kilometers away from my city. So I booked a conference room there and tried to get people to register.</p>
<p>It was a bit of a challenge to get things going, but eventually (and after some last minute changes) we had 7 developers attending the sprint: oco, hy che, kapix, mmu_man, jua, waddlesplash and myself.</p>
<p>The hosting place had warned me that the reception would be closed on sundays, so I had already got the room keys from them. However, when we got to the place (thanks to an helpful free software supporter who drove us there, as it is not easily reachable by public transport), we found the main gate closed, and no way to open it. Eventually, mmu_man climbed over it to open it from the inside, before we finally managed to contact someone who gave us the code.</p>
<p>We were about to leave and find some place to eat, when we found out that the restaurant was lit up and just waiting for us. So we eventually had dinner there.</p>

<p>On monday morning, I got a phone call from Jua who got to the place sooner than I expected, and also found the gate locked. I gave him the code, expecting that he would find the other code sprinters at the restaurant having breakfast (I was still at home getting ready to join). However, he somehow missed the main building and was still wandering around in the park when I got there. As the reception opened, we got the key for the meeting room so we could finally set up our hardware.</p>

<p>After moving tables around and starting to plug our laptops, we noticed that the room assigned to us had no working ethernet plug. We tried to fix that, but the wiring looked clean. So eventually we moved to another room with a working ethernet plug.</p>

<p>After these little initial troubles, the week went quite smoothly. The internet access was stable (but there was some strangeness going on as we noticed DHCP floods as well as very slow DNS resolution) and needed no login wall, which was quite nice for us. The food was also very good, which made everyone happy.</p>

<p>We worked almost uninterrupted until friday, as while going to lunch, one of the people there asked us for help with some computer problems. He drived us to another building where he had trouble setting up a graphics card. While the problem was easy to fix (just missing a power plug on the card), we also got to visit the flight simulator they were working on, using prototypes of a full-size A350 cabin from the nearby Airbus factory. A quite nice way to end the week!</p>

<h3>Week 3</h3>

<p>So, what did we work on during the sprint?</p>

<p>I started by cleaning up and pushing some changes to BSecureSocket to relax the constraints on allowed SSL cipher suites. During the Capitole du Libre, Web+ would not load the login portal web page without these changes.</p>
<p>Right after this, I started investigating problems on a laptop I was recently donated. It works, except the backlight doesn't turn on.</p>
<p>I was trying to use an ExpressCard to serial adapter, but could not get that working. After some investigation and help from mmu_man, we found out that there were two bugs in the serial debug code which made it impossible to change the base address for the serial port. After fixing these, we got serial output working... and the laptop booted to a fully working display!</p>
<p>It seems that the problem is timing related, and the extra time spent sending serial debug message makes things slow enough that the initialization succeeds.</p>
<p>While working on this, I noticed that SerialConnect was pretty sluggish (but my laptop was building WebKit in the background). I reworked the code to optimize drawing, making it about as fast as the existing code in Terminal.</p>
<p>I then downloaded Intel datasheets and tried to find what could be broken in the Intel driver. I did not find what I was looking for, but I found that changing the backlight was pretty easy to do, so I went ahead and added that. It is now possible to adjust it from the Screen preferences on Intel video cards.</p>
<p>Meanwhile, KapiX finished his changes to PowerStatus and reworked the battery info window to use a vertical BTabView. It looks much better now, even if on most machines you will ever see only one single tab.</p>

<p>I then investigated problems with FirstBootPrompt, which would not layout properly. Eventually I found the explanation for the problem we were having, and the solution was just to force a minimal size on some of the widgets to make sure everything would fit, no matter the language used. It took some iterations to get everything right, but we now have a nice and working boot prompt. It was quite embarassing to have bugs in the first window shown to users when they start Haiku for the first time.</p>

<p>While playing with FirstBootPrompt, I managed to repeatedly crash the deskbar due to a race condition: it is not a good idea to change the current language while Deskbar tries to use it to format the time for the clock. I reworked DeskBar to cache some information and not re-create a time format object everytime it formats something.</p>

<p>I also reworked TeamMonitor, which had the same kind of bug as FirstBootPrompt and got similar fixes.</p>

<p>I also reworked waddlesplash's new progress bar in pkgman, to limit problems when resizing the window while a download is in progress. It will still produce some glitches, but on just 2 or 3 lines instead of filling screens and screens as it did before.</p>

<p>KapiX fixed some drawing problems in DeskCalc, and missing translations in ICNS translator. He also made DeskCalc accept dropped files to load their content as an expression.</p>

<p>Janus fixed a crash in PowerStatus when removing it from DeskBar with the window still open.</p>

<p>mmu_man fixed some mixup of physical and virtual addresses in the PCI and ISA bus managers, making them more safe to use in PAE environments. He then fixed various places where drivers tried to workaround this problem.</p>

<p>I found a locking problem in BNetworkAddressResolver which could lead to a crash when multiple threads would resolve addresses at the same time. Since BNetworkAddressResolver implements a cache to avoid repeating the same DNS requests over and over again, it needs some locking to make sure the cache is safe to access.</p>

<p>mmlr reworked the remote app_server support and started work on an HTML5 client for it. This replaces the earlier existing attempt at an HTML5 backend for app_server, with a more modern one using canvas and websockets. There is still some work needed to get everything working properly, and this is quite complex to set up with no easy frontend, yet.</p>

<p>I fixed an app_server crash when setting an empty drag bitmap, for example this could happen in the Locale preferences when dragging or double clicking items around.</p>

<p>mmu_man fixed a NULL pointer dereference in the UVC webcam driver. However, we were still unable to get it to display a picture.</p>

<p>waddlesplash fixed a bug in the runtime_loader that led to problems with LD_PRELOAD on secondary architecture applications.</p>

<p>After spending some time investigating Pe sources and keyboard shortcuts management, Hy Che dug into BTextView and fixed various problems there. It is much appreciated, as no one is currently maintaining this code. While doing all this he got to better know the debug tools we have available: malloc_debug, Debugger, and the test app_server.</p>

<p>While trying to run the WebKit test suite, I several time hit a panic in the UDP code, which I eventually fixed (there was a TODO about it already). I also found that the LC_* variables were not set right, which confused Python date and time formatting functions.</p>

<p>I also fixed the password management. We switched to a more secure passord algorithm some month ago, but it led to larger password hashes in /etc/shadow, and there was a fixed size buffer in the code to load that file that was not adjusted. As a result, passwords would not be reloaded on reboot.</p>

<p>Waddlesplash worked on running a new Coverity scan, and while doing so also improved the support for clang as a compiler to build Haiku. He then reviewed the new issues found by Coverity and fixed several obvious problems.</p>

<p>Jua spent most of the week working on HaikuDepot and investigating the general slowness and various other problems. This involved extensive use of various debugging tools, including the test app_server, system profiler, malloc_debug, as well as extensive manual testing and investigation with Debugger. Eventually, several issues were identified and fixed. He then went on with polishing the UI, adding a global progress bar and supporting multiple screenshots in the screenshot window.</p>

<p>Korli added support for the Zstd compression algorithm. This could be used for better (and faster) compression of packages.</p>

<p>Waddlesplash completed the final steps to switch Haiku to use automatically generated repositories, instead of the manually populated ones used until now. New nightlies are using these new repos, however, there currently is some breakage there due to premature removal of supposedly deprecated packages. So it is recommended to wait a little more before updating.</p>

<p>KapiX spent the week working on his port of LibreOffice, fixing the text rendering code and then reworking things so that LibreOffice draws to offscreen bitmaps, fixing many locking and ownership problems. He made impressive progress to getting the Writer user interface to show, however, it is still not possible to load documents yet. But the port is taking shape, step after step.</p>

<p>Oco worked mostly on getting FreePascal and Lazarus into packages. It took some experimentation and thinking about the secondary architecture system (which the Pascal compiler doesn't really need, as the same compiler can link with either version of the C environment), but eventually he managed to get a first set of packages built. There are still some path issues to debug, but Lazarus should be available soon as another way to do graphical UI design in Haiku (using Qt and the Pascal language).</p>
