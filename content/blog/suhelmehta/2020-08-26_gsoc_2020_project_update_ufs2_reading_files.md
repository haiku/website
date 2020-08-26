+++
type = "blog"
title = "GSoC 2020 Project Update(UFS2): Reading Files"
author = "SuhelMehta"
date = "2020-08-26 16:40:58+00:00"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello Everyone!

This is my third post related to my project, *Adding UFS2 file system in Haiku*

The link below provides the patches that I have worked on till now. 

[Know more](https://review.haiku-os.org/q/owner:suhelmehta%2540outlook.com)

## Work done till now
The following points briefly describes what I have done till now:

- Reading a file in a UFS2 formatted disk
    - Implemented *ufs2_open()*, *ufs2_read()* in kernel_interface.cpp

- Reading data from block pointers
    - Modified *struct ufs2_inode* in Inode.h
    - Implemented *GetBlockPointer()*, *GetIndirectBlockPointer()*, *GetDoubleIndirectBlockPtr()*, *GetTripleIndirectBlockPtr()* to get the block pointer from ufs2_inode

- Get the block from file offset
    - Implemented *FindBlock()* and *ReadAt()* in Inode.cpp

- Modified DirectoryIterator::GetNext() to use ReadAt()

---

### Reading files

UFS2 divides file system into blocks that are made up of fragments and size of block and fragments are written in super block(fs_bsize and fs_fsize in ufs2.h). Let us consider that the block size is 32 KB or 32768 Bytes and fragment size is 4 KB or 4096 Bytes. When ufs2_read() is called it is provided with a pos parameter (Or we can say the number of bytes already read in a file or file_offset). Now the content of the file is in direct blocks and each block is 32KB long. Now from file_offset we can calculate the number of direct block(file_offset / size_of_direct_block) at which content is present. If the number is greater than 11 then it means that content will move to a direct block but in order to reach that direct block we have to first reach the position of the indirect block that contains the pointer to the 12th direct block. Now the total number of direct block pointers in an indirect block can be  size_of_direct_block / 8 (let us say that 32768/8 is 4096, means 4096 direct block pointers in an indirect block, so file of size 128MB can be stored in indirect blocks). Hence the total file that can be stored in the first twelve direct blocks + indirect blocks is 128.384MB.

Similarly the double indirect blocks contain, size_of_direct_block / 8, indirect block pointers.

So, in order to reach the block we must multiply the fragment size with block pointer present in the inode.

## Learning new things

It is a great learning experience for me and I have learnt new things like

- Storage of data on the disk
- Datatypes of C++
- Git commands

## Resources

[File system implementation](http://www.cs.cornell.edu/courses/cs4410/2016su/slides/lecture18.pdf)

[UFS2 data blocks](https://cs.nyu.edu/courses/spring09/V22.0202-002/lectures/lecture-24.html)
