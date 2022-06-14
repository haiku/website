+++
type = "blog"
title = "[GSoC 2022] XFS : Community Bonding Progress"
author = "mashijams"
date = "2022-06-14"
tags = ["haiku", "software", "gsoc2022", "xfs", "file system"]
+++

Hello!

Hope everyone is doing well.

Community bonding period ended, so here is the blog on my progress so far.

You can see all my patches submitted [here](https://review.haiku-os.org/q/owner:raghavself28%2540gmail.com)

## Abstract

I started my work with moving CRC calculation files from ext2 driver to shared folder (so that it can be used by every other filesystem that needs it) and made it fs_shell compatible. CRC's are used to detect minor corruption in filesystem and is one of the major features introduced for xfs version 5 as metadata checksumming.

Being a math nerd I was quite intrigued by how crc's are getting calculated, so I thought why not study about it in depth?

I referred to "A Painless Guide to CRC Error Detection Algorithms" book and got basic understanding of how crc is calculated, which polynomials are used, brute force method for computing crc and finally optimised tabular approach.<br>
Don't go by book title though, it was anything but painless :')

After that I quickly moved to implementing xfs V5 superblock fields, Macros, functions for checksum verification, and other essential stuff.

Soon I hit a bug in superblock CRC verification and it took me quite some time to get it all fixed, shoutout to PulkoMandy for helping me get all things right in crc verification for superblock and answering lots of my queries.

In the meantime I made trac tickets for xfs features which need to be implemented, it will be very helpful, as we can now see what more needs to be done/fixed for xfs driver. You can see all the tickets [here](https://dev.haiku-os.org/query?component=File+Systems%2FXFS&order=priority&group=component&col=id&col=summary&col=component&col=type&col=status&col=priority&col=milestone)

## Work Done

The following points describes briefly what I did till now : 

- XFS version 5 superblock
    - Implemented version 5 extra fields.
    - Implemented superblock->Verify() function.
    - Added necessary Macros for version 5.

- XFS checksum functions
    - Implemented xfs_verify_cksum for crc verification.
    - Implemented xfs_update_cksum for updating crc (It will be used in write support)

- Other
    - Crc calculation files are now fs_shell compatible and can be used by any filesystem that has its support.
    - XFS trac tickets are updated
 
 ---
 
 Last few weeks were full of learning experience for me, I got to know how on-disk structures are read, differences in C and C++, a lot about CRC's etc..
 
 Anyways it's time to gear up for more progress in xfs project.
 
 Thanks.
