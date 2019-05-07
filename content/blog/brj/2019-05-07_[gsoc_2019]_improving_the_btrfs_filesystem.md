+++
type = "blog"
title = "[GSoC 2019] Improving the btrfs filesystem"
author = "brj"
date = "2019-05-07 23:57:25+05:30"
tags = ["haiku", "gsoc2019", "btrfs"]
+++

# Introduction
Hello, world!

As some of you might be aware, I'm one of the students selected for
GSoC 2019. My name is Bharathi Ramana Joshi. You may know me as brj, my
initials, from the mailing lists and IRC channel. I'm pursuing an underguate
degree in Computer Science and Engineering from Keshav Memorial Institute of
Technology, India.

# Project: Improving the btrfs filesystem
As the title suggests, I shall be working on Haiku's btrfs implementation for
most of the summer. Currently, it is possible to read and write directories but
only read from files. By the end of GSoC 2019, I aim to implement file writing.

## Overview
btrfs uses a modified b-tree (without linkage) suitable for high-performance
object store that can perform copy-on-write snapshots, while maintaining good
concurrency. These modified trees store generic *items* sorted on a 136-bit key.
The first 64 bits of the key are a unique *object id*, the middle 8 bits are an
item type field and the last 64 bits are used in type specific ways.

User-visible files and directories are contained in a file system tree. Within
each filesystem tree, each file and directory object has an *inode item*. Within
each directory, directory entires appear as directory items, whose right-hand
key values are a CRC32C hash of their filename and their data is a location 
key, or the key of the inode item it points to.

File data is kept outside the trees in extents, which are contiguous runs of
disk blocks. Extent blocks default to 4KiB in size, do not have headers and
contain only file data. Files have *extent data items* to track the extents 
which hold their contents. The item's right-hand key value is the starting byte
offset of the extent.

The *extent allocation tree* acts as an allocation map for the file system. 
Their left-hand and right-hand key values are the starting offsets and lengths 
of the regions they represent. The filesystem zones its allocated space into 
*block groups*, which are variable-sized allocation regions that altrenate 
successively between preferring metadata extents (tree nodes) and data extents 
(file contents).

The project can be conveniently divided into three parts for the three phases.

## Phase 1
Small files that occupy less than one block will be packed into the btree 
inside the extent item.

During phase 1, writing will be implemented for such files, along with 
Copy-on-Write (CoW) logging.

Testing will be done using btrfs_shell. This overcomes the tedious task of 
rebuilding entire source, generating an iso and booting it each time changes 
are made.

Another task during phase 1 would be to properly document the current 
implementation. Some documentation has already been written during initial 
contributions.

## Phase 2
The main task during phase 2 is implementing write supports for large files, 
albiet without Copy-on-Write de-duplication.

Extensive testing using btrfs_shell must be performed with extreme operating 
parameters. btrfs_shell will have to be modified to perform such testing.

Documentation must also be written for all work done upto this point

## Phase 3
Phase 3 aims at implementing what phase 2 doesn't - Copy-on-Write. Transaction 
handling must also be implemented.

Testing should be done to make sure transactions are correctly handled and CoW 
works without any problems. btrfs_shell must be modified appropriately.

Finally, documentation should be added, the project should be made more 
presentable for final evaluation and any left over work must be wrapped up.

# Miscellaneous
* I have set up a [blog](https://gsocbrj.blogspot.com/) on blogger where I 
shall be updated my progress on a daily basis, like a diary. My weekly posts on
this blog are the crux of all the work done in that week.
* For more details about my project, see my [proposal](tiny.cc/yq6b6y)
