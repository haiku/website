+++
type = "blog"
title = "[GSoC 2022] XFS : Project Update"
author = "mashijams"
date = "2022-07-19"
tags = ["haiku", "software", "gsoc2022", "xfs", "file system"]
+++

Hello everyone.

It's been a month since I had written any blog on my project so here is the one.

You can see all my patches submitted [here](https://review.haiku-os.org/q/owner:raghavself28%2540gmail.com)

## Abstract

After completing a task for xfs V5 superblock I began my work on version 3 inodes and implemented new fields introduced in V5, Inode Verification functions, data fork verification function etc.. Soon we had a valid version 3 inode which passed all the checks. After that I moved to directories work.

XFS stores directory information in one of the five formats :

- Shortform directory.
- Block directory.
- Leaf directory.
- Node directory.
- B+Tree directory.

When the number of entries are small enough we can store all the metadata information in inode core data itself, we call it shortform directories. My first task was to test V4 support for shortform directories aggressively, since implementation was correct and simple enough it passed all my tests. Then I tried to read V5 shortform directories and ofcourse it failed and the reason was inode core size. Xfs V4 has 256 bytes while V5 has 512 bytes inode, so the offset at which metadata is stored is different for both the versions. I implemented some helper functions to give us the correct data fork pointer based on the version of xfs and soon we were able to read V5 shortform entries, Later I did some testing and it passed all my tests.

After that I began my work for block directory, ofcourse the number of entries would increase and we will no longer be able to store all metadata in inode itself so we use block directory and the format is changed to extents. Now things started to become interesting, there were new fields introduced in V5 block headers and I needed to elegantly handle it with V4 headers as well. <br>
PulkoMandy suggested I have two options for this: either go with virtual class or templates. I decided we will be using virtual class as it will be more consistent with our xfs code and implement as many methods as we need along with function to create class instance as per version of xfs mounted. Since now we have virtual class with vPtrs we need to be very careful with class and its on-disk structure, for example we now can't use sizeof() operator on virtual class to match with data stored on disk, I added warnings on code about this on function which should be used instead of sizeof() operator.

As the roadmap on how to handle both versions was clear to me I extended V5 read support for leaf, node, B+tree based directory and files as well.

## Current status of xfs

In my testing we successfully passed all tests for shortform, block, leaf based directories and extent, B+Tree based files.

There are some issues in reading node and B+tree based entries, I reported them on trac in the form of tickets so that I don't forget to fix them!

## Work done

Here is the brief for all work I did this month :

- XFS version 5 read support
    - Implemented version 3 inodes.
    - Added shortform directory support.
    - Added block directory support.
    - Added leaf directory support.
    - Added node directory support.
    - Added B+Tree directory support.
    - Added extent based file support.
    - Added B+tree based file support.

- Metadata checks for corruption
    - Implemented various Verify functions for checking metadata of all forms of data headers.

## Next Goals

I am happy to say we now have the same basic read support for xfs V5 as we had for V4, this also completes the first goal of my project.
 
I actually divided my project in three major goals :

- XFS version 5 read support.
- Attributes and Symlinks read support.
- Documentation and write support.

Now I am onto my next goal i.e Attributes and Symlinks read support, it's going to be so much fun!

In the meantime I will also give time to fix bugs and make read support stable, I am not focusing completely on fixing bugs as we don't know how much time it will take to fix them, it's best if I give time to my next goals along with fixing bugs so that we will have more xfs development as well.

---

Last month was amazing for me, I got to know more of C++ and B+Tree data structure. Thanks to my mentor PulkoMandy for helping me complete tasks.

Thanks for reading!
