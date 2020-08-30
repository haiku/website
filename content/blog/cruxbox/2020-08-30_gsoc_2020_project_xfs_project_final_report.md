+++
type = "blog"
title = "GSoC 2020 Final Report: XFS File System"
author = "CruxBox"
date = "2020-08-30 17:58:00+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello there!
This is the final report on my project which aimed at initiating support for XFS Filesystem on Haiku, by first making a read only driver.  

---

## Work done during the program:

You can check for the patches here: https://review.haiku-os.org/q/hashtag:gsoc2020+owner:shubhambhagat111%2540yahoo.com

All directory and files work is completed and we should be able to read them from a version 4 XFS Filesystem. I've come to realize that we can now even try to read version 5 of XFS now that the ground work has been placed.

I suggest the reader to read the previous blog post to understand the work done for directories. Since, apart for testing, this month involved work mostly pertaining to files.  

Links:
1) https://www.haiku-os.org/blog/cruxbox/2020-06-06_gsoc_2020_xfs_project_update/
2) https://www.haiku-os.org/blog/cruxbox/2020-08-06_gsoc_2020_project_xfs_project_update/  

Detailed view at the work:  

1) B+Tree Directories:  

	In the last post I had mentioned that we need to test this more. I am glad I did. I ended up testing 100,000 directory entries and we were reading without any problems.  
	I then tried reading 200,000 entries and there was a small issue with obtaining the right address to the directory entry. This doesn't seem like a big problem in terms of how much needs to be fixed (maybe only a few lines of code) but the issue is that no one from #xfs could help and the documentation clearly wasn't as accurate. Perhaps, I'll see if I can get other developers to help me out in this (Axel you reading? :P)

2) Extent based files:  

	Files are stored in blocks and each block size is defined in the superblock. The inode, if is extent based, has the mappings to all these blocks. I simply had to read all these mappings, and start reading at the right block based on the offset that was given by the xfs_read() hook. It was pretty straightforward because I had understand the structures pretty well while I was working on the directories.

3) B+Tree based files:

	If the number of mappings increases to an extent that we no longer can store them in an inode, we end up using B+Trees. The leaves of the B+Trees now hold the mappings. So the goal was to simply get to the left most leaf and read all the mappings. We store these maps in a linear data structure, more specifically, an array, and given the small number of mappings (and hence short length of the array) it's okay to search for the right map linearly, which I did. Perhaps I'll implement binary search there (which will take a minute or two) for more efficiency but it really wouldn't show to be honest. But I'll do it anyway because we should if we can.  

Anyway I'll add some screenshots I took while using the xfs_shell in some time. Don't mind the directory names and file content :P!

---

## What's next for me with Haiku?

I definitely intend to explore a lot and try new things. Maybe port Go to Haiku or look at the network stack. There is a lot of work and I am excited to see what I end up doing next.  

I'll have to take some time off given my commitments to university and some other things. But I'll be very much available through mail and in the public channel (just mention me there).  

---

## Program experience:

The project itself was very cool and I got to learn a lot. I feel better about my abilities now than I did a few months back. But that is not only because of my efforts but also because of the amazing mentorship experience.

HyChe, my mentor, was never demanding and motivated me to work at my own pace and take breaks. He suggested a result oriented approach perhaps.

Also, I would like to thank Adrien (PulkoMandy) for his support ever since I joined Haiku. We have had crazy long conversions about many things. Him mentoring me has given me a lot of perspective that I had hoped for from GSoC. I'll always be grateful, friend! :')


