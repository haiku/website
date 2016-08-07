+++
type = "blog"
author = "bebop"
title = "Finishing up extended partitions"
date = "2009-08-14T13:12:42.000Z"
tags = ["DriveSetup", "disk_device", "gsoc 2009"]
+++

Aloha Haiku Land!

I have been putting the finishing touches on support for Extended Partitions today. For those of you who do not know the Master Boot Record or an MBR can only contain 4 primary partitions. This leaves something to be desired when you want to run a bunch of operating systems or split your install across multiple partitions. There is a way however to get as many partitions as you want however by creating what is called an Extended Partition.

Extended Partitons are interesting because unlike the MBR that is just a table, Extended Partitions (actually Logical Partitions) form a Link List structure on the physical media. While this makes them more flexible it also adds a little more complexity to the scheme. So things took a little longer than I thought they would. I have however become pretty good using a hex editor (HUGS DiskProbe) which is something I have never used before.

The good news is that everything seems to be working well. There are probably still bugs. This is something that will need more testing so I would urge anyone who wants to test this out, to do so somewhere that does not contain critical data or make sure you have backups. *THIS COULD DESTROY EVERYTHING* -or at least you partition tables- but hopefully it will work as expected. On that note I have been able to use logical partition that DriveSetup created to install and run Haiku! It also seems to work pretty well with parted (gparted).

So to wind up my final days as a GSoC student I will be fixing UI bugs and looking for more bugs and starting on GPT write support.

Happy Hacking,
Bryce