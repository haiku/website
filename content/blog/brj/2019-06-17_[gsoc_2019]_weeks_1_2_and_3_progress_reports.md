+++
type = "blog"
title = "[GSoC 2019] Weeks #1, #2 and #3 progress reports"
author = "brj"
date = "2019-06-17 22:43:10+05:30"
tags = ["haiku", "gsoc2019", "btrfs"]
+++

Hello everybody! It's been a while since my [previous post](https://www.haiku-os.org/blog/brj/2019-05-07_gsoc_2019_improving_the_btrfs_filesystem/).

This post is a short summary of all the work done upto this point. For a
detailed report of every day, visit [this blog I set up using Blogger](http://gsocbrj.blogspot.com/).

## Week 1
As mentioned in my [proposal](https://tiny.cc/yq6b6y), the target for week #1
was document the current btrfs implementation. As part of this, I documented
the following classes
* Chunk
* Inode
* BTree
* Attribute
* AttributeIterator
* DirectoryIterator

Week #1 went smoothly without any problems.

## Weeks 2 and 3
The target for weeks 2 and 3 was to implement write support for files that
occupy less than one block. However, it turns out that before implementing
this, creating files must be implemented. Therefore after a discussion with my
mentor (Hy Che) over IRC, I decided to work on implementing file creation first.

Also during this week I learnt various advanced git concepts such as stashing,
refspecs, rewriting history, filter branch etc. Before Google Summer of Code I
just knew the basics like commit, clone and pull. For this used the textbook _Pro Git_. 
I would like to thank Haiku for this wonderful opportunity to improve my git 
skills.

I also went through the Haiku API documentation (a.k.a Haiku Book) during these
two weeks. In particular, I thoroughly studied the documentation under Storage
Kit and Device Drivers.

However, not all things went smoothly. In order to learn how to implement file
creation, my mentor (Hy Che) suggested that I go through Linux's btrfs
implementation. I spent most of week #3 going through Linux's btrfs code for
creating, modifying, writing and linking files (see [Blogger blog](http://gsocbrj.blogspot.com/)
for detailed reports, including pseudocode I was able to deduce based on the C
code). Even after looking into Linux's btrfs implementation, I wasn't confident
enough to code up my own implementation. As a result, I might have to do things
differently from what I mentioned in my proposal.

That brings me to what I'm currently doing - reading up the papers published
by Ohad Rodeh on btrfs. So far I've read the following papers
* _B-trees, Shadowing, and Range-operations_
* _B-trees, Shadowing, and Clones_
* _Deferred Reference Counters for Copy-On-Write B-trees_

I plan on finishing reading  _BTRFS: The Linux B-tree Filesystem_ by tomorrow.

After reading these papers, I definitely feel more confident about my
understanding of btrfs. I will try to finish implementing creating new files
by the end of this week.

So far the learning curve has been quite steep, if I say so myself. I find GSoC
to be both challenging and fun. Once again, I'd like to take a moment to thank
the Haiku community for giving me this amazing opportunity.

# Miscellaneous
* [Link](https://tiny.cc/yq6b6y) to my proposal
* [Link](http://gsocbrj.blogspot.com/) to blog with daily report
