+++
type = "blog"
title = "GSoC 2020 Project Update(UFS2): First Evaluation"
author = "suhelmehta"
date = "2020-07-10 00:57:38+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++

Hello Everyone!

This is my second post related to my project, *Adding UFS2 file system in Haiku*

The link below provides the patches that I have worked on till now. 

[Know more](https://review.haiku-os.org/q/owner:suhelmehta%2540outlook.com)

## Work done till now
The following points briefly describes what I have done till now:

- Mount the root directory of a UFS2 formatted disk
    - Implemented *ufs2_mount()* in kernel_interface.cpp

- Reading inode from disk
    - Implemented *struct ufs2_inode* and *class Inode* in Inode.h and Inode.cpp
    - Implemented code to convert inode number to disk offset in Inode.cpp in *Inode::Inode()*

- Publishing the inode
    - Implemented publishing of root node in Volume.cpp in *Volume::Mount()* using *publish_vnode()*

- Important hooks implemented in kernel_interface.cpp
    - *read_stat()*
    - *fs_info()*
    - *open_dir()*
    - *read_dir()*
    - *lookup()*

---

### Directory Structure

UFS2 keeps the name of directory or file in direct blocks. The block number is stored in inode. In order to get the disk offset, the block number must be multiplied with *MINBSIZE* (defined in ufs2.h).

At that offset, information about the current directory(.) along with the parent directory or previous directory(..) is present. The structure for that is *dir_info* in DirectoryIterator.h and the information about directory will be _inode number, length of record, type(file or directory or symbolic link) and name of directory_.

After that name of sub directories or files with inode number would appear (structure implemented is *dir* in DirectoryIterator.h).

### Solving file or directory name bug

While implementing code to read file or directory name there was an issue that, due to less buffer size, the code did not read whole name of file or directory. To resolve it, the approach I used was that, before name of a file or directory there is a number that tells the length of name.

I took mod of that number with 4 and if that result is 0 then length of name is multiple of 4 otherwise the remainder obtained is subracted from 4 and the result is added to the length of name. It is done because the bytes allocated for name will be always multiple of 4 i.e. if name is "ab" then there will be 4 bytes allocated for name similarly if name is "Haiku" then 8 bytes will be allocated and so on.

I used above method and managed to get the next offset from where I read next directory or file name from disk.

## Making code efficient

Right now ls command is working fine and my current approach is explained by the following example.

Consider that there are 2 directories in root directories.

1) Haiku
2) FileSystem

Now consider that we run ls command in root directory the outcome is, it reads name from root directory which is passed to *lookup()*, which initiates a loop that reads data from disk offset and continues adding value to offset, to read next directory name and it goes on until the name in lookup and anyone name read from disk matches.

The problem is that, if it has read "Haiku" directory from disk offset - 20742168(just assuming a number) and now it wants to read next directory, then it again start reading from offset 20742168(where "Haiku" directory is present) and then it adds 16(calculated with help of name length) to previous offset and reads from there this happens until the name in lookup matches name read from disk in the loop.

So right now I am working on making code efficient. I would love to have feedback about my blogs and my way of implementing the code. :)

## Learning new things

It is a great learning experience for me and I have learnt new things like

- Time is stored in the form of timeval or timespec in file system
- Datatypes of C++
- Git commands
- Filessystem other than UFS2

## Resources

[UFS2 Inode](https://flylib.com/books/en/2.48.1/ufs2_inodes.html)

[Cylinder Group Summary](https://flylib.com/books/en/2.48.1/cylinder_group_summary.html)

[UFS2 Directory Information](https://github.com/freebsd/freebsd/blob/master/sys/ufs/ufs/dir.h#L79)
