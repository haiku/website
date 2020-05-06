+++
type = "blog"
title = "GSoC 2020 Project: Adding UFS2 file system in Haiku"
author = "SuhelMehta"
date = "2020-05-06 14:20:56+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello everyone!
I am one of the selected students for this year Google Summer of Code(GSoC). This is my first blog on Haiku website and in this post I will introduce myself and share details about my project.

## Introduction
My name is Suhel Mehta and my name on IRC channel is suhel. I am studying Computer Science and Engineering(CSE) at GNDEC(Guru Nanak Dev Engineering College) in Punjab, India. I am also a part of Development team of college that do technical work. In order to complete the task given by them I use Linux for most of the time but I am using Haiku on my virtual machine and learing about it. I have applied for GSoC this year in Haiku and got selected :-)

## Information about project
Haiku has support for a number of file system but it is completly missing support for some file system. In this project I will add a file system called UFS2. It is also called Unix file system or Berkeley Fast File System. It is a file system supported by many Unix and Unix-like operating systems. It Allows files of about 1 terabyte in size in a file system that can be up to 16 terabytes in size.

### Project plans
1) Implementing mount() function.
2) Implementing inode and directories.
3) Implementing symbolic link.

### Work done till now
1) Built UFS2 shell.
2) Identified superblock of UFS2.

## References
<ul>
<li><a href="http://ptgmedia.pearsoncmg.com/images/0131482092/samplechapter/mcdougall_ch15.pdf">Implemented in Solaris</a></li>
<li><a href="https://elixir.bootlin.com/linux/v5.5.13/source/fs/ufs2">Code implementation</a></li>
<li><a href="https://github.com/freebsd/freebsd/tree/master/sys/ufs/ufs">FreeBSD Implementation</a></li>
<li><a href="https://people.eecs.berkeley.edu/~brewer/cs262/FFS.pdf">Information about file system</a></li>
<li><a href="https://www.usenix.org/legacy/events/bsdcon03/tech/full_papers/mckusick/mckusick_html/">General Content about file system</a></li>
</ul>

## Conclusion
Thank you to the Haiku community for selecting me this year. I will give my best to make this project successful. ;-)
