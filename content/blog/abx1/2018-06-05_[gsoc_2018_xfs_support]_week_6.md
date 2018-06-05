+++
type = "blog"
title = "[GSoC 2018: XFS support] Week #6"
author = "abx1"
date = "2018-06-05 13:48:45+05:30"
tags = ["haiku", "gsoc2018", "xfs", "gsoc"]
+++

Hey folks,

After implementing the superblock structure, my next task was to get the identify_partition hook working. I implemented dummy hooks (xfs_identify_parition, xfs_scan_partition) which logs some keyword so that I can trace how it's working and in what order hooks are being called. I didn't focus on mount hook at this point. While building I was getting the segmentation fault and wasn't able to proceed. Adrien suggested to use GDB and try to debug and see what wrong. From the xfs_shell commands, it was clear that the xfs_shell binary was located at [/haiku/haiku/generated.x86_64/objects/linux/x86_64/release/tools/xfs_shell]. This way was to run the xfs_shell in GDB:

	gdb --args xfs_shell /testxfs

Ran the binary file and used "bt" to get the backtrace. This was the debug output:

	#0  0x0000000000000000 in ?? ()
	#1  0x000000000041917d in FSShell::_kern_mount(char const*, char const*, char const*, unsigned int, char const*, unsigned long) ()
	#2  0x0000000000403f92 in main ()

With Adrien's help, I managed to find that it's calling mount hook in the first place rather than xfs_identify partition (as kern_mount calls null pointer). After which, my task was to implement the class Volume, as mount hook uses the same and also volume forms the instance of the filesystem which assigns a unique ID and handles in virtual filesystem layer.

I used BFS and BTRFS filesystem implementations, as a reference, to get an idea of what all Volume should manage and what should be implemented which are needed for the functioning of mount hook.

Also, I used a TRACE macro, similar to what used in BTRFS, to get the log and understand how it works. Now I am in the process of implementing Mount() in Volume which in turn is used in xfs_mount hook. In this week, I will try to see if I can implement the Volume and get mounting, identifying and scanning to work.

Thanks 
Abhi
