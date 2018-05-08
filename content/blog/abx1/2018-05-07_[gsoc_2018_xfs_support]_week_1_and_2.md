+++
type = "blog"
title = "[GSoC 2018: XFS support] Week #1 and #2"
author = "abx1"
date = "2018-05-07 21:30:08+05:30"
tags = ["haiku", "gsoc2018", "xfs", "gsoc"]
+++

Hey everyone, I have been working on the project for the past two weeks and would love to share my update here as well.

My first task is to create an empty file system module and test the same on fs_shell. As fs_shell provides an interface to build and test the file system in a commandline tool, it will be easier to test the file system module.

I made an XFS image file using the following commands:

	dd if=/dev/zero of=somefile bs=1M count=128 
	mkfs -t xfs filename

This file can be further used to test the working of xfs_shell within the host machine that I am using now.

## Writing Jam file for xfs_shell

I created a Jam file at `/src/tools/xfs_shell`. `SubInclude` commmand was added to the Jam file to include xfs_shell during the userlandfs build.

	SubInclude HAIKU_TOP src tools xfs_shell ;

`SEARCH_SOURCE += [ FDirName $(HAIKU_TOP) src add-ons kernel file_systems xfs ] ;` is used to verify that only one instance of the xfs module is embebded while building the userland xfs_shell tool.

## Building xfs_shell

As the Jam files were ready for now, I tried to build xfs_shell using 

	jam run ":<build>xfs_shell" /testxfs

But I was encountered with an error saying missing modules. For which I had to create an empty file system module. I created a file_system_module_info and export it via module_info* modules[] array.

I am still trying to get the stubbed module working by passing every callback as NULL. As I had some academic work in between, I was not able to completely work on fixing the same. I happen to talk to some devs in the community, but not all, and would love to get to know all of you.



