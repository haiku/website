+++
type = "blog"
title = "[GSoC 2017 - BTRFS write supports] Third coding period - Final recap"
author = "HyChe"
date = "2017-08-25 21:48:17+07:00"
tags = ["haiku", "gsoc2017", "gsoc", "filesystem", "btrfs"]
+++

## Hello everyone,

Google Summer of Code 2017 is coming to the end. This is my final report which covers third coding sprint, also read my introduction blog[1] for a brief of my project.

Creating and removing directories are now working. Basically, creating directories involve in inserting new inode (metadata of file) and making links between file name and inode. Because directories don't hold any data so there isn't any links between inode and file data, creating new files need to handle it.

I separate the old Find() function into Traverse() and GetEntry(). Traverse fills in the Path along way its finding, GetEntry gets the data from the position got from Path after traversing. This makes more flexible for using, and also optimize finding process because Path caches the nodes from root to leaf.

CopyOnWrite(), which is the core function for any write operations, is finished and works well. It works like this.
	1. cache original block (block_cache_get).
	2. allocating new block.
	3. cache new block to be writable (block_cache_get_writable).
	4. copy original block to new block.
	5. make some changes (if neccessary) and then write back to disk (cache_sync_transaction).
Doing this way, somehow is not efficient because we have to copy the whole new block again. The reason is block cache api uses the cached block as write-back block to sync/flush data to disk. If we can separate them the CopyOnWrite() can be simplified, for example I can reimplement like this.
	1. allocating new block (e.g block b)
	2. cache original block.(e.g block a, and write to block b)
	3. modify on original block and then write back to disk.
block cache api provides good way to control blocks in-place and transaction, but in my opinion it is not efficient for COWing or mirroring data. I don't know if there is any workarounds, I have thought about writing a wrapper for this but it is not a goal for GSoC and also I would lose the transaction feature. So just let it there, if any devs interest :).

# What are left to do
1. Continue doing the allocator. Allocator now just record initialized chunks and block groups, we need to handle it when disk grows and exceeds the limit. Reading more about this[2].
2. Tree balance functions (split, merge, etc).
3. File operations.
4. Locks (for now BTRFS is testing only through fs_shell).
5. Ton of features of BTRFS.

# Gain
I learn lots of things in this summer!
1. My Git skills gets to next level and I made my first pull request.
2. My English is better, I guess, because I spent 3-5 hours for each blogs and have to communicate through email, IRC.
3. Contribute to opensource.
4. Learn about coding stuffs and some C++.

Also, thanks to Haiku's mentors, I very appreciate the time you take to mentor and give advices. Although I ran into problem that the abasence of my mentors, but the haiku-gsoc mailing list solved this, I think this is nice and it shows how opensource world operate.

# Code Archieve
1.	[Sources that are already be merged](http://cgit.haiku-os.org/haiku/log/?qt=author&q=hyche)
2.	[On-going ticket](https://dev.haiku-os.org/ticket/13612)


# References
1.	[BTRFS Introduction project](https://www.haiku-os.org/blog/hyche/2017-05-08_gsoc_2017_adding_write_supports_for_btrfs/)
2.	[Extent Block Groups](https://btrfs.wiki.kernel.org/index.php/Btrfs_design#Extent_Block_Groups)
