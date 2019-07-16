+++
type = "blog"
title = "[GSoc 2019] Weeks #4, #5 and #6 progress report"
author = "brj"
date = "2019-07-16 05:11:20+05:30"
tags = ["haiku", "gsoc2019", "btrfs"]
+++

Hello everybody! It's been a while since my [previous post](https://www.haiku-os.org/blog/brj/2019-06-17_gsoc_2019_weeks_1_2_and_3_progress_reports/).

This post is a short summary of all work done upto this point.

During the past few weeks, I was able to add the following features to the
current btrfs implementation

## Creating new files
The basic algorithm behind creating new files is allocating a new inode,
updating the fs tree to reflect this, creating a hard link in the directory
containing the file and finally updating the cache. However, we must make sure
to deallocate memory and clean up any partial changes in case of any errors.

## Unlinking files
In order to unlink files, we have to remove their inodes and delete their
hardlinks.

## Writing filesystem information
Much of filesystem wide information such as number of blocks, filesystem size,
various flags, filesystem name (a.k.a label) etc is stored in the superblock.
This feature is used to update this information.

## Current and future work
Currently, I am working on add node splitting and node merging to the BTree
implementation used by btrfs in order to make sure that overflow and underflow
of keys in a node does not happen.

By the end of 2nd month, I aim to add some more features to btrfs including, but
not limited to, renaming files, checksumming superblock (this has been left as
TODO in many places), adding touch command to btrfs_shell (I started working on
this but stopped abruptly to work on something else), writing file info etc.

On a side note, I stopped writing a daily report as it was unproductive.
