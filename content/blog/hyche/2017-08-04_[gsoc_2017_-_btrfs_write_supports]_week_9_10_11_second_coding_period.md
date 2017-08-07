+++
type = "blog"
title = "[GSoC 2017 - BTRFS write support] Week #9 #10 #11 (Second coding period)"
author = "HyChe"
date = "2017-08-04 12:06:52+07:00"
tags = ["haiku", "gsoc2017", "gsoc", "filesystem", "btrfs"]
+++

### Hi there!

It has been 4 weeks since my last blog post. This blog post recaps what I have done in the second coding period and what I am doing and will do in the following weeks. Link to my previous blog post[1].

In the previous weeks I have been doing the implmentation for extent allocator and journal. About the extent allocator, the allocating strategy for now is "first fit" which means it allocates a first extent that after the address and has size that equal or larger the size we need. The allocator also handle extents that not present in the current tree because of the Copy-On-Write mechanism, so that the new allocated extent will not delete the old extent. The allocator can now allocate and deallocate extent, but it still need more testing though, it is hard to tell that it works well if is not actually in used (for examples making directories, writing files, etc).

About the journal, to me journal is fairly easy to implement, as the block api in Haiku handles it very well and BTRFS is not a log structured filesystem. Like I said in this blog[2], whenever a corruption occured, the filesystem automatically changes its current root to the previous root, in Haiku this can be done by "cache\_abort\_transaction". The issues here are performance and some hooks, functions triggered after some specific events, that are currently not implemented. I don't know when to use subtransaction for the current implementation of journal to enhance the performance, will discuss more with the mentors about this. Also, the hooks will be implemented when the journal is actually in used, now the journal only ends transaction and flushes data to disk.

In this third coding period, I will continue do the allocator and the journal, they can do most of the works now though, but not sure if something bad happened. Currently, I am implementing tree functions, fix some bugs and things get more complicated because I have to design new class, a lot of removing and inserting. I will narrow the goal that in the proposal as because there is not enough time to do, so that the final work will be the implementation for directory operations (making, removing), I will do the rest after Google Summer of Code.

Thanks for reading, see you again.

1.	[Report week 6, 7, 8](https://www.haiku-os.org/blog/hyche/2017-07-07_gsoc_2017_-_btrfs_write_supports_week_6_7_8/)
2.	[Report week 4, 5](https://www.haiku-os.org/blog/hyche/2017-06-14_gsoc_2017_-_btrfs_write_supports_week_4_5/)
