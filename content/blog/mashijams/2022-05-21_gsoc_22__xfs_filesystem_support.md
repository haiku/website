+++
type = "blog"
title = "[GSoC 2022] XFS Filesystem Support"
author = "Mashijams"
date = "2022-05-21"
tags = ["haiku", "software", "gsoc2022", "xfs", "file system"]
+++

# Introduction :

I am Raghav Sharma (Mashijams), an Electronics and Instrumentation Engineering undergraduate student at the Shri Govindram Seksaria Institute of Technology and Science ( SGSITS ) pursuing a Bachelor of Technology in my second year.

I am selected as GSoC 2022 student for adding more xfs support for Haiku.

My mentors for this project are Pulkomandy and Saloni.

Here is the link to my project [proposal](https://drive.google.com/file/d/19G6SUUh4HUKpvAoEg6C0fHsDqBvVbfLa/view?usp=sharing)

# Current status of xfs on Haiku :

As of now we have read support for xfs version 4.

Inodes, short directories, leaf directories, and node directories can be read successfully.

I also did some testing for xfs during my application period, details for which can be found in this forum [post](https://discuss.haiku-os.org/t/xfs-file-system-testing/12094)

# Project Plan : 

I will begin my project by adding xfs version 5 read support, Its long time since version 5 support is available on linux so it will be good if we have same for Haiku as well.

Then I will start working on Extended Attributes, Symbolic Links and write support for xfs.

At present I will : 

- Implement xfs version 5 superblock.

- Get crc32 checksum table and implement ck_sum (I will take inspiration from its linux implementation) function for metadata checksumming.

- Test if we are getting valid version 5 superblock on mounting filesystem image and fix bugs/issues that comes.

After this I believe we should be able to detect valid super block for both xfs version 4 & 5.

# Conclusion :

I will be very active on this [Forum](https://discuss.haiku-os.org/t/gsoc-22-xfs-project-progress/12205) Thread where I will post small updates about my project and take help from mentors.

I will also make blogs frequently to give community Idea about my work done and upcoming plans for xfs project.

It will be an amazing learning experience for me so thanks for selecting me as mentee.




