+++
type = "blog"
title = "GSoC 2020 Project Update: XFS"
author = "CruxBox"
date = "2020-11-08 17:58:00+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello there!
There is quite a lot to share about the work done this month.

---

## Work done so far:

You can check for the patches here: https://review.haiku-os.org/q/hashtag:gsoc2020+owner:shubhambhagat111%2540yahoo.com
In short: All directory work is done. This includes ShortForm Directories, Block Directories, Leaf Directories, Node Directories and B+Tree based Directories.

Detailed view at the work:  
(Some context: Leaf entries containt hash values of a directory entry name and also the address of that entry. We use this for fast lookups.)  

1) Leaf Directories:  

When a directory block (directory blocks are larger than normal file system blocks) isn't enough to hold all directory entries and the leaf entries within a single directory block, the block expands and now the directory entries and leaf entries stay entirely in different directory blocks. There could be many directory blocks but there is only a single leaf block.  

All block mappings are present within the inode itself. I made sure to use binary search (with a modified predicate, of course) within the leaf block to reduce the time complexity of Lookup(). It was interesting to see how different structures play here. The original docs were quite helpful.  

2) Node Directories:  

When a single leaf directory block can't hold all the hashes and address of all the directory entries, we need to expand it. Now Lookup becomes tricky here. There is another block which tells which tells the last hash value in every leaf block. And since the leaf block contains the entries sorted based on hash value, the task was to utilize this and find the right leaf block for our desired hash value so that we could go there, get the address and then get information about this desired entry.  

The docs were decent but I think understanding why these structures are placed the way they are was what helped my complete this task. In my test I was able to store and output around 1005 entries.  

3) B+Tree Directories:  

This is an interesting one. I think the docs just showed the structure and it wasn't informative. I have already encountered B+Trees in past so it wasn't a problem, but the layout wasn't given very well. I ended up using xfs_db, a debugging tool for an xfs image, a lot as it also comes with a hex editor. While talking to people at #xfs I figured out the structure after understanding their findings. I quickly implemented some functions and set the ground work. Soon we had a working GetNext() function.  

The hook that I think required more work was Lookup. The brute force solution to this problem was already quite complicated. I spoke to my mentor and added some optimizations which I think will definitely help save quite a lot of reads from the disk.  

I basically save all the blocks while going down the tree and hope that these blocks will be the ones (or at least some of them) that will be required when I try to go down the tree again. There is one more thing I added which I think will improve efficiency: saved 2 different paths. That is one path will save blocks when looking for a Leaf, and one path when looking for a directory entry. This is because, XFS B+Trees are more spread out than they are deep. And the directory entries will probably be far away from the leaf entries in most cases.  

I hope that makes sense? I am here to answer to questions if you have any. I was able to test 20,000 entries and the code works well. But I want to test more.  

---

## Next Steps:

Files are yet to be done but I understand the structure in which they are laid out and am positive that it can be done. But for that I first need to understand how the kernel interface works for it.  

I have tested the B+Trees directories with 20,000 entries. I want to test 100,000 entries or more now. It will help me create all potential scenarios and debug my code accordingly. But due to the limitations of my own system it's taking way too long to create these directories. I will have to give it a few hours perhaps.  

---

## What I learnt:

I enjoyed coming up with basic algorithms and then making more and more optimizations over them. It has been a great learning experience so far!  

Good day!  
