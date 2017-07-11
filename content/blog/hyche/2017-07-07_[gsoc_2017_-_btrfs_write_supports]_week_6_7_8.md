+++
type = "blog"
title = "[GSoC 2017 - BTRFS Write Supports] Week #6 #7 #8"
author = "hyche"
date = "2017-07-07 23:15:13+07:00"
tags = ["haiku", "software"]
+++

### Hello again,

Sorry for late report, things are not going as I planned. In order to implement tree manipulation or copy-on-write function, I must first have a blocks/extents allocator that works well. Also, those things need to handle transactions as well.

In the previous weeks, I did some "edgy" works that are supported functions, add some on-disks structures, modify some parts of the source code, etc. Currently, I am implementing the extent allocator, it can now dump all the free extents and used extents for all roots, included backup roots. The goal is allocating continuous extents and preventing external fragmentation, but I'm stuck at it. My initial idea is using AVLTree that is existed in Haiku for tracking extents, and from that I can find a next necessary extent for allocating, but I'm not sure it is the right way. You can read all the works in my commit history[1].

If I can make the allocator work and also the journal, things would be easier, as because the rest is greatly dependent on those two. For example, the copy-on-write function is simply allocating a extent, copy old data with some changes to new allocated extent and it is roughly the same as splitting nodes. Therefore, in the second coding period I will work hard with the mentor and focus on doing extent allocator, journal.

Thanks for reading, see you again.

1.	[Commits history](https://github.com/hyche/haiku/commits/btrfs)
