+++
type = "blog"
title = "[GSoC 2022] XFS : Final Report"
author = "mashijams"
date = "2022-09-09"
tags = ["haiku", "software", "gsoc2022", "xfs", "file system"]
+++

Hello!

Hope everyone is doing well.

GSoC 2022 is nearing its end so here is the final report on my project, which aims at adding more XFS file system support on Haiku.

You can see all my patches submitted during program [here](https://review.haiku-os.org/q/owner:raghavself28%2540gmail.com+gsoc2022)

---

## Work done during program

This is short overview of all the work I did during GSoC :

- XFS version 5 support
    - Implemented version 5 read support for all forms of directories
    - Implemented version 5 read support for all forms of files.
    - Added Metadata Checksumming feature for xfs.

- Testing xfs inside Haiku
    - Tested xfs directly inside Haiku as a kernel add-on.
    - Fixed some serious bugs encountered while testing xfs images.

- Documentation
    - Documented how to test xfs on both fs_shell and Haiku.
    - Documented Haiku API for implementing xfs.
    - Documented current status and what more work needs to be done.

- Extended Attributes
    - Implemented xattrs read support for both versions of xfs.
    - All formats of xattrs can be read now (Except B+Tree one).

- Symbolic Links
    - Implemented read support for local symlinks for both versions of xfs.
    - Implemented read support for extent symlinks for both versions of xfs.

----

## Detailed view at work
 
In my last blog I had written about adding V5 read support and my whole experience working on it, so if you haven't read it yet you can read 
it [here](https://www.haiku-os.org/blog/mashijams/2022-07-19_gsoc_2022_xfs_project_update/)
 
In this blog I will write mostly about what happened after mid term evaluations.
 
### Testing
 
So after I finished implementing V5 read support, PulkoMandy suggested that it is a good idea if I spend some time testing xfs inside Haiku or Userlandfs and fix bugs if encountered. <br>
Well I am glad I did that as there were many issues while reading some directories and files.

First issue I encountered was we were not able to read ShortForm entries at all, now that was unusual as we were able to read it completely fine inside fs_shell, some debugging and looking around code led me to a simple fix for this problem.

Second issue was occurence of infinite loop when trying to read files, this was a little serious as I really had no idea why that was happening.<br>
I did a lot of debugging and came to some conclusions that reading xfs files were implemented fs_shell compatible, cat_command() hook inside fssh.cpp returns remaining number of bytes we need to read something which doesn't happen inside Haiku kernel at all.<br>
So I made some small changes on how to read files and resolved this issue.

There were many minor details and errors as well which I fixed, the only issue remaining now is of Tracker one which doesn't list entries, let's see if we can 
solve that issue as well.

Thanks to Khallebal on the Haiku forum for helping me test my changes and report status if everything works fine :)

### Documentation

Well what's use of all the code when there is no documentation :P

Writing good documentation for xfs has been my priority since the beginning of GSoC, as a recent student working on xfs project I had a good idea on what someone may have struck while developing a file system on Haiku. 

So to avoid that and help mentors to not answer the same questions again and again I had written a good documentation on how to test xfs, its API on Haiku, how some implementation differs from linux-xfs and finally its status.

I realised some parts of that documentation will be useful for other file systems like btrfs, ufs2 etc.. as well.

### Extended Attributes

During my Testing period, I read linux-xfs documentation a lot and learned all the structures that I will need to add xattrs support on xfs.

Once I was satisfied with testing xfs, I began implementing its read support.

The first task was to get done with implementing various hooks for reading attributes in kernel_interface.cpp, it was nothing really complex. I took inspiration from ext2 implementation of hooks and manipulated it to our own xfs API. 

Since now we had read support for both versions of xfs, I implemented reading xattrs compatible with both versions.

So like directories xattrs are stored inside disk in various formats : 

#### ShortForm Attributes

When the number and size of xattrs are small enough to fit directly inside an inode buffer, we call it shortform attributes.<br>
This was probably the simplest one to implement, as all I needed to do was iterate over all entries and return its name/value.

#### Leaf Attributes

Of Course the number and size of xattrs will increase and we will no longer be able to hold all data inside the inode buffer, then the format will be changed to Leaf.<br>
This was an interesting one but as I was already very aware of structures and how to implement them it didn't take much hassle to complete it.

#### Node Attributes

When the number and size of xattrs increases even further the format is changed to Node. This is probably where I spend most of my time implementing as even though I was very aware of structure it was hard to implement it efficiently.<br>
I did tried to look for linux implementation but it was so messy and confusing that I gave up and implemented it in my own way.<br>
I also published a patch which will help us to increase efficiency by reducing disk seeks.<br>
Overall I completed node based xattrs support and was able to test positively reading 2000 attributes.

#### B+Tree Attributes

When the number and size of xattrs increases even further such that Node data couldn't be held onto a node buffer the format is changed to B+Tree.

Now here's the catch: I wasn't able to generate a test image with B+Tree format, possibly due to system limitations (We need a really large number of attributes for it) but I noticed another format : Multi Node attributes.

In this format multiple Node buffers are used which in turn act as Node Attributes format, this previously used to be in B+Tree format but I guess linux-xfs developers changed something to increase efficiency.

Anyways I will try to complete this format as well after I am satisfied with the design which will be efficient to implement. (Suggestions are always welcome :P)

### Symbolic links

This was last the feature remaining to complete read support so I finished this as well.

Symbolic links were stored in two formats :

- Local.
- Extents.

Implementing it was again very simple, all I needed to do was to read the contents from disk and return its buffer in kernel_interface read_link() hook.

I finished and tested support for both formats which marked the end of symbolic links read support.

----

## What's next for me on Haiku

One of the amazing things about Haiku is that there are lots of amazing projects people are working on and the community is helpful too, let it be ARM port or Wayland or WebKit and many more.<br>
I will try to explore such projects and see if I can make some contributions there.

Exploring Haiku and understanding its existing codebase is another idea I am looking forward to (hopefully writing more documentation along the way for everyone else as well :P )

Then there is ofcourse xfs project itself and adding more support for it, I want to import xfs-tests from linux on haiku which will be useful for performing torture tests for various file systems like xfs, btrfs, ext4 etc... Hopefully one day we will have stable support for all these major file systems.

----

## Overall Experience

It was so amazing working for Haiku this summer, I find myself more confident in my skills let it be to code or communicate with fellow community members.

Very thanks to my mentor PulkoMandy for helping me throughout this program, he was very supportive since the day I joined the Haiku community (It was March I guess? Time flies :P ) and answered a hell lot of my questions which were often silly though lol.<br>
Looking forward to have many such more amazing conversations with you my friend :`)

Also thanks to everyone on Haiku forum who left lots of amazing compliments and likes on my project progress, you guys are amazing.

---- 

Thanks for reading.
