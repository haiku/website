+++
type = "blog"
title = "GSoC 2020 Project Update(UFS2): Reading Symboliclinks"
author = "SuhelMehta"
date = "2020-08-26 16:37:13+00:00"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello Everyone!

This is my another post related to my project, *Adding UFS2 file system in Haiku*

The link below provides the patches that I have worked on till now.

[Know more](https://review.haiku-os.org/q/owner:suhelmehta%2540outlook.com)

## Work done till now
The following points briefly describes what I have done till now:

- Reading a symbolic link in a UFS2 formatted disk
    - Implemented *ufs2_read_link()* in kernel_interface.cpp

- Reading data from block pointers
    - Modified *struct ufs2_inode* in Inode.h
    - Modified *GetBlockPointer()*, *GetIndirectBlockPointer()*, *GetDoubleIndirectBlockPtr()*, *GetTripleIndirectBlockPtr()* to get the block pointer from ufs2_inode

- Implemented *ReadLink()* in Inode.cpp

---

### Reading symbolic links

UFS2 keeps the orignal file's path in the inode and it can be found in the 15 block pointers. In case of a symbolic link the characters or string is present at the block pointers but in case of file or directory there will be integer value.

I have modified the ufs2_inode stucture in the following way

```
union data_blocks{

    struct ptr_blocks {
		int64_t directBlkPtr[12]; /* 12 direct block pointers */
		int64_t	indirectBlkPtr;  /* 1 Indirect block pointer */
		int64_t	doubleIndriectBlkPtr; /* 1 Double Indirect block pointer */
		int64_t	tripleIndriectBlkPtr; /* 1 Triple Indirect block pointer */
	}get_blocks;

	char symlinkpath[120];

}_blocks;
```
