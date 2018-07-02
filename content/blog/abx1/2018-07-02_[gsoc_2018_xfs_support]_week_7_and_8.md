+++
type = "blog"
title = "[GSoC 2018: XFS support] Week #7 and #8"
author = "abx1"
date = "2018-07-02 21:28:28+05:30"
tags = ["haiku", "gsoc2018", "xfs", "gsoc"]
+++

Hi all,

I have been reading through the XFS documentation and looking more into the on-disk structures. Previously, I had looked into AG inode management, but not inode core structure. So I thought it would be better to look into how files, directories and links are stored on disk with inodes. 

I implemented struct xfs_dinode_core, the core part of the inode, which includes stat data information about data and attribute forks. Data fork and attribute fork comes after core. The following struct is used by the class inode to get the information such as modification time, user ID, no of links from directories. 

 Data fork holds contents based on the inode type and includes either of the following
 * files data extents 
 * directories entries and associated data
 * contents of symbolic link

Attribute fork holds the location of extended attributes. Also implemented xfs_agi which points to the xfs_inobt_block, which is the B+tree that keep track of the inodes.
