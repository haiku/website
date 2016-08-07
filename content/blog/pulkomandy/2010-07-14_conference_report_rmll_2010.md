+++
type = "blog"
author = "PulkoMandy"
title = "Conference report : RMLL 2010"
date = "2010-07-14T09:14:54.000Z"
tags = ["rmll", "conference"]
+++

Hello readers !
Last week we were at the RMLL (Libre Software Meeting) in France, with François (mmu_man) and Olivier (oco). Haiku has beed holding a booth and giving some talks in this conference for some years now, and it's nice to go and meet people again.
<!--break-->
The event lasts 6 days, from tuesday to sunday. The 4 week days are dedicated to conferences, and the week end is targetted at a broader audience of people who doesn't know free software at all.

This year we had some new things to show up : two alpha versions, whereas there was none last year. A lot of people had tried them or heard of them, and wanted to know more, so they came to our booth to ask for a live demonstration. Some of them told us they were happy that Haiku is not just another random alternative OS, but has real potential for getting his place in the real world. They were impressed by our wifi support, because "the Hurd project didn't even start to think about it".

This year, the booth were really small, but it was interesting, because it "forced" us to communicate a lot with our neighbours. We were installed between FreeBSD and Arch Linux, in front of the entrance door, which was quite a good place for everyone to see us, and also to try to get some fresh air, because the weather was quite hot.

We showed Haiku to a lot of people, and most of them were impressed, as usual, by the things one can do with attributes. François made an interactive slideshow using a workspace switcher script on his old laptop, and I was coding things for the Locale Kit, but occasionally used my computer to show some things (demoing attributes is much more impressive when you search in a 1000+ list of mails than 3 or 4 people files), and showing at the end of the demo that I had gcc building the full os in the background (on a single core machine) was quite fun too.

It looks like most people wanted to use Haiku to bring old computers back to life. They asked for the minimal system requireents. But the lack of office suite meant such computers couldn't be used to help people get started with computers. The Arch Linux booth had an old laptop (AMD K6 based) to demo their OS, and they were proud of using only 37 megabytes of RAM with the desktop loaded. We tried to install Haiku on this machine tosee if it performed better. The livecd mode worked fine but was very slow because of the CD reader (only 4xspeed). We ran the installer, but some files got corrupted during the installation so we were unable to boot on the hard disk and we gave up. This machine revealed some bugs in Haiku, however : apparently the BIOS needs a reboot after a change of the partitiontable, and this made the computer crash when we tried to initialize a partition in drivesetup, corrupting the whole partition table. Fortunately, we found some linux tool to rescue it.

We burned some CDs of alpha 2 and also installed it on people's USB keys. One of the guys at the Bépo keyboard layout booth installed it and contributed a Bépo keymap for Haiku (it's a keymap similar to dvorak, but designed for typing in French).

With all the activity on the booth, I didn't find time to attend any of the conferences, except François's one on Haiku. It took place in an amphitheater and the room was quite full, which was unexpected because the talk was the first one on friday, early in the morning. There were some problems with the beamer, so he had to do the talk under Mac OS X, but otherwise it went fine.

I spent some time with the Arch Linux people, and they showed me how their package manager works. It seems to be really simple to build a package (the process is quite similar to writing a bep file), and the system is quite powerfull, allowing easy rollback of any package to an older version. We talked about our needs in Haiku, and one of them decided to make a Arch-Haiku distribution, instead of playing with Arch-Hurd. I'm waiting to see what comes up from this.

As I said, the week-end was targetted to a wider audience, so we had to move somewhere else to get more exposure, as the university is quite far from the city center. The move went fine, and we held the booth for two more days under tents, near a marketplace. During the week-end, there was much less people at the HAiku booth than during the week, apparently most people were more interested by the strange Bépo keyboard and the 3d printer at the HackableDevices booth. Some people from the mozilla booth came to see our system, one of them wanted to install Haiku on his computer but it didn't work, likely because there was nohard disk. The syustem freezed right after the boot screen showed up, and didn't even let us get in to KDL, so we couldn't do much. It's a bit sad, because he was motivated to try porting Firefox 4 to Haiku. Maybe next year.

We had to close the booth on sunday afternoon to get back home. Overall, I think people wer equite happy to see us making progress and notdisappearing like a lot of projects, after some years. Unlike last year, we saw people interested by Haiku, but not knowing BeOs, which is a good sign : the system is getting live on its own, and not only because of nostalgy. We still miss WPA and an Office Suite to really get people to switch to Haiku, however. It's nice to demo all the tech features, but if you can't do the most basic tasks, people aren't going to join...