+++
type = "blog"
title = "[GSoC 2017 - BTRFS Write Supports] Week #4 #5"
author = "HyChe"
date = "2017-06-14 22:28:49+07:00"
tags = ["haiku", "gsoc", "gsoc2017", "filesystem", "btrfs", "driver"]
+++

### Hello everyone,

I spent last 2 weeks mainly for researching and forming an complete idea so that something will not be changed much in the future and some coding. These things are what I did in the previous 2 weeks:


I implemented a "cat" command in **btrfs_shell** for testing, since current **fs_shell** misses read file content command.

Refixed ticket #12788<sup>3</sup>. This is the ticket I fixed as a proof to attend GSoC for Haiku, but it is hardcoded. I simply changed the block size to node size (the old block size is sector size), so that block\_cache can cache the whole node instead of caching multiple blocks with old block size, and reverted back the old code. I misunderstood in the past that block is sector but that is not always (at least in BtrFS case). In BtrFS, metadata is in tree block (node) and file data is in extent (a continous run of sectors), so with block\_cache API I can easily manipulate tree node and with file\_cache API for read/write files. I had a hard time to figure out how to write with cache, but after reading BFS and block\_cache codebase, it can be done easily with **memcpy** for copying data to cache and **block_cache_sync** for flushing to disk.

This is the main goal in the preivous 2 weeks. I modified some parts of the source, specially I renamed **BPlusTree** to **BTree**, because BtrFS uses a variant of BTree and it should not have links between leafs to prevent copy-on-write the whole tree. I added new structures **BNode** and **BPath**. The BNode contain a cache for node (**btrfs_stream**), so that it can do r/w easily instead of doing directly on disk and the BPath is for manipulating tree. You can read more details in my commit history<sup>1</sup>.

I started to look into linux code base, but it is still too complicated for me. Therefore I asked for help in BtrFS's IRC (freenode **#btrfs**) and mailing list<sup>2</sup>. There is a guys in IRC who helped about the transactional and journal concept. BtrFS is based on **Copy-On-Write** (COW), so it does "logging" differ from other filesystems that write log directly to disk. There are 4 roots backup (include the current root) in BtrFS superblock, with each successful transaction the oldest root will be replaced, so whenever there is a corruption in a system, it just changed the current root to the previous root. In the mailing list, I received an recommendation that I should read **btrfs-progs**<sup>4</sup> codes instead of BtrFS in linux kernel. btrfs-progs is a collection of userland tools, it has codes similar to main BtrFS but less complexity and smaller so that very easy to read.

I had a small conversation with *tqh*, he helped me with locking teachnique in Haiku, testing correctness and gave me some helpful documents. About locking, this is the hard concept, I just know about basic stuffs that I already learnt at school. I think I will try to implement with no locks first and test to see what will happen.

Figured out some additional works, they are merging nodes, handling transactions and allocating blocks...


### This week works
I continue do things as planned: Splitting node. Also, I will try to do the additional works in between weeks.

Thanks for reading, see again next weeks!


### References

1.	[My commit history](https://github.com/hyche/haiku/commits/btrfs)
2.	[BtrFS mailing list](https://marc.info/?l=linux-btrfs)
3.	[Change block size to node size](https://github.com/hyche/haiku/commit/0a408d7be124bb89a39426931ec24a5502483e5a)
4.	[btrfs-progs](https://github.com/kdave/btrfs-progs)
