+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #53"
date = "2014-11-21T09:12:00.000Z"
tags = ["contract work", "cdda", "cd", "AHCI", "atapi", "userlandfs"]
+++

Hi!

After a great week-end at the Capitole du Libre showing Haiku to other people in the free software community (read <a href="/blog/mmu_man/2014-11-17_report_french_farwest_2">François' report</a> for more details - video of my talk should be available "soon"), I'm back to work on the code.

<!--more-->

<h3>More work on reading CDs</h3>

First, I found the problem with some (actually only one) of my old game CD-ROMs showing only the audio data. To understand what's happening you need some knowledge of how our CD system is designed and some general knowledge on CDs. Now is a good time to document this, so here we go.

You already know from last week's report that we handle audio CDs as a file system, and expose the CD tracks as WAV files. The filesystem generates the WAV header on the fly, and the remaining part of the file is the raw data from audio tracks. So far, all is well.

Data CDs usually have a single track, which uses the ISO-9660 filesystem. This seems to work well too.

CDs have not only tracks, but potentially also sessions. The concept of sessions was introduced with CD-R, and can be used to write a disk in several small chunks instead of once. A session can have multiple tracks, and a track can span multiple sessions.

Most of our problems are with mixed mode CDs, where there is a mix of data and audio. There are two kind of disks doing this. The "blue book" CDs are audio CDs with a data track at the end, in a second session. This is used for music CDs with an extra track providing, for example, video clips. When inserted in a standard Compact Disc player, the second session is ignored, and only the audio is played. The older "mixed mode" format was used for video games with CDDA music, on PC and PlayStation for example. In this case, there is a single session, and the data track comes first. When inserted in a standard Compact Disc player, the first track can't be played, and the player either skips to the second one or plays silence.

So, how do we handle all those formats in Haiku? Well, just like any other disk. When a CD is inserted, we ask all our file systems and partitioning systems to scan it and try to identify it. The important ones here are the CDDA filesystem, the ISO-9660 filesystem, and the "session" partitioning system. Each of these will read some sectors from the CD, try to recognize it, and give it a score. Then the one which gave the highest score handles the disk.

When we do this on a hard disk, things are simple. We have an Intel partition map partitioning system, which will look for the partition map marker in the first sector of the drive. And we have, for example, BFS, FAT, etc, which will see nothing useful on the first sector of the drive. These will be called again later to scan each partition, and the first sector of the partitions will make more sense to them.

The structure of a CD, however, is a bit different. The structure of track and sessions is not stored in a sector, but in a special out-of-band area on the disk. We can only read it by sending a special ATAPI command to the CD reader (ATAPI is an extension of ATA for CD drives). This is what the session partitioning system does: it sends this special "read table of contents" to the drive and gets the table of contents. It then scans the list of tracks and sessions, and creates a partition map for the CD out of this. You can see the result of this if you insert on of these mixed CDs in your Haiku machine and look at it with DriveSetup.

And this is where the tricky part starts. We also scan the full disc with the file system drivers. Since the track/session data is not reachable by a normal read of the disc, they don't notice that it's there, and they can find valid data in the first sector of the disc. In the case of mixed session discs, both ISO9660, CDDA and Session can report that they can handle the disc.

This is where our rating system comes in handy. Instead of returning just "yes" or "no", each file or partitioning system returns a score for the disc or partition they were asked to scan. The ISO-9660 and CDDA return 0.6 and 0.8 when they can handle a disc, respectively. The session partitioning system returns 0 if there is only one partition, and 1 if there are at least two. This way, on discs where two partitions are found, the session partitioning system "wins" and gets to handle the CD. It then exposes the two or more partitions, which CDDA and ISO scan again and can finally mount.

The "partitions" from the Session manager are computed in a special way, too. The first thing it does is looking for different sessions on the disc. This gives a good base to work from, but isn't perfect, for two reasons. First, a single session can have a mix of data and audio tracks, and in this case we will split it in two partitions (one data, one audio). Second, a data track can span multiple sessions (if it was burnt in several increments). In this case, the sessions need to be merged together so only the last version of the data is visible (more on that later).

When testing my CD collection for CDDA bugs, I found one CD where the data track wouldn't be visible. Only the audio part would appear. I spent some time debugging this, and noticed that the disc was shown with no partitions. This meant the "session" partitionning system had failed to identify it. After closer inspection, it turns out reading the table of contents had failed. CDs aren't the most reliable technology, and in that case, the first attempt to read the CD would fail because the drive wasn't ready. So I added code to the session manager to try reading the table of contents twice. This works much better, and now the CD is properly identified. So, we have working support for mixed mode CDs now.

But, that doesn't solve everything. As I already mentioned, there are two formats used for mixed mode CDs, the old non-standard one and the new "blue book". In blue book CDs, the data track is moved to the end of the disc so the audio tracks can be played in a standard compact disc player. Unfortunately, this exposes a special feature of the ISO filesystem which we don't handle well. ISO-9660 is designed to handle multi-session writing. As you know, each sector on a CD-R can be written only once, and there is no way to erase it. Still, the filesystem was designed to allow incremental writes to the CD until it is full (it wasn't expected in the early 90s that you would want to write 650MB of data at once on a disc). Since the filesystem header can't be rewritten, ISO9660 is designed to look for it at the start of the last session on the disc. This way, a new session can write a new header, and reference a mix of old and new files. For this to work, all offsets used in ISO9660 are relative to the start of the disc, not the start of the session. This means the new table of contents can still reference files that are in the previous sessions (and that were unchanged), while modified or added files are referenced in the current session.

While this is a good solution to the problem, it turns out 650MB of data is actually not that much and discs tend to be written in a single pass these days. Multi-session CDs are hard to come by, and the feature has seen little testing in Haiku.

So, what happens for "blue book" discs? The data track is the last one on the disc, and the ISO9660 filesystem uses offsets from the start of the disc to reference files. But these offsets go through the session partitioning system, which handles them as if they were relative to the start of the session. And this doesn't work at all: we try to read data far after the end of the disc, and in Haiku this results in an immediate kernel panic. We have discussed this on the bug tracker with other Haiku developers, and the best solution seems to be making data partitions always start from the start of the disc, meaning they would overlap. I'm not sure how DriveSetup is going to render this on screen, but it shouldn't be too much problems for Haiku to handle otherwise. However, if we tell the ISO-9660 filesystem that the partition starts from the start of the disc, how will it guess that the filesystem superblock is actually much further in the disc, right after the data tracks? Well, I still don't know, and that's why this issue is still open.

<h3>userlandfs makes a comeback</h3>

Last week I was trying to get the guarded heap working. It crashed on a 32bit system because it ran out of memory, as the guarded heap trades a much higher memory use for an extra safe operation. I tried running it on a 64-bit system, where memory and address space are not as much of a problem, but it didn't go much further, and still not far enough for me to test the CDDA code. So I had to find another way to debug this.

We have a dedicated tool called userlandfs. It is a way to run filesystem code from the userland instead of on the kernel side. The userlandfs itself is a kernel module, but instead of accessing discs directly, it forwards all requests back to an userland process (the userlandfs_server), which then feeds them to the actual filesystem (which then calls back to the kernel to read the data from disc). The userlandfs can handle 3 kinds of filesystems: BeOS-style, Haiku-style, and FUSE, which is the API used for a similar thing in Linux.

Userlandfs was not shipped in Haiku images. It was designed mostly as a debugging tool, because it has a big impact on filesystem performance and generalized use would make Haiku slow. However, as it was not used for some time there was a bit of bitrot, and I spent part of the week getting it to work again and easier to install. There is now a userlandfs package available in HaikuDepot. This was actually based on patches That Jalopeura (Sean Healy) contributed last year, which were waiting for some cleanup.

While I was working on this, I also merged the patch to include a NetFS package. NetFS is a networked filesystem designed specifically for BeOS and Haiku. It runs in userlandfs and allows sharing files between Haiku and BeOS installs, complete with support for attributes and queries. It is unfortunately not available yet for 64-bit installs.

Now that userlandfs is working, I could also make the required changes to CDDA to build as an userlandfs module, and will now be able to test it in userland. this means I can use libroot_debug instead of needing the guarded heap for the full kernel, and I can run it with all the userland memory protection and other features (so I can look at it in Debugger instead of the less friendly KDL).

No results out of this yet: I was using my girlfriend's laptop and running Haiku from an USB disc to test all the CDDA things, as my machines don't have CD drives anymore. However I would now need a copy of the Haiku sources on the same machine I'm debugging CDDA on, and I got bored of messing with the USB disc and moving it between my dev machine and the tested laptop. So I ordered a USB CD drive, which should be delivered next week for testing this on my own machine. I also want to see if using USB, rather than AHCI, is going to make a difference. Oh, and while I was at it I also ordered a USB gamepad, so I can finish the work on the Joysticks preferences panel.

<h3>CDDA and CD-Text support</h3>

Another special and not widely used feature of CDDA is support for CD-Text. CD-Text is a way to add some text data inside an audio CD. It uses a small area in the disc header to store the album and track names. We support this, and expose the data as the file and volume names in CDDA-fs.

The specification says the encoding used is either ISO8859-1, or Shift-JIS. We still don't support Shift-JIS (none of my CDs have that, we probably need help from a Japanese user willing to send us a CD with such data). However, we support Windows CP1252.

And here comes some information on text encodings. You probably all know about ASCII, which is the original 7-bit encoding designed in the USA, which can only really be used for English. ASCII has 32 control characters and 96 printable ones. ISO8859-1 is an extension to it allowing to encode some more languages. It still only supports the latin alphabet, but adds some accents and other useful symbols. It is an 8-bit encoding and adds 96 more symbols to the character table (leaving 32 codes unused).

ISO8859 defines several other encodings (-2, -3, etc) for other languages, each compatible with ASCII and adding 96 extra characters.

Windows CP1252 is designed by Microsoft (you guessed from the name). It is an extension of ISO8859-1, and replaces the 32 unused codes with 32 more characters allowing for slightly better typography (opening and closing quotes, for example).

While the CD-Text standard says that ISO8859-1 should be used, one of my CDs makes use of CP1252 characters. So I added support for those. The main problem here is we have to transcode them to UTF-8, which is what we use as much as possible in Haiku. The transcoding was easy to do for ISO8859-1 (UTF-8 has some backward compatibility with it), but less direct for CP1252. So I used a lookup table for the 32 extra characters. This was also an occasion to fix a possible buffer overrun in the CDDA code (but still doesn't fix our crashing issues...).

<h3>UI improvements</h3>

While working on this, I had to generate clean Haiku images on my test USB drive. This means I got to see the FirstBootPrompt more often than usual. I noticed a fairly annoying issue, the list of languages was not focused so it was not possible to easily pick a language from it using only the keyboard. Now this is fixed, and you can use down, down, enter to pick a French locale and keymap. This makes installing Haiku even faster!

I also fixed more problems in DiskProbe (layout issues and a crash when opening a package-folder), tweaked some shortcuts for MediaPlayer, made the print setup dialog use vector icons, added a "Quit" button to the BootMan install wizard, updated grep so grep -i doesn't crash anymore (also fixes TextSearch), changed the debug server so that the escape key on the program crash alert kills the program rather than opening debugger, added mouse wheel zooming (and zoom-out) to Mandelbrot, and updated localization credits in AboutSystem.

And that's it for this week. I will now fix some issues in the new network preferences, which still doesn't work perfectly, and then continue scanning the R1 tickets and trying to fix more. Oh, and I'm also tagging some more tickets as "easy", so if you are looking for some tasks to start contributing to Haiku, have a look at the easy tickets list and join the fun!