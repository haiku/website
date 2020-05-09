+++
type = "blog"
title = "[GSoC 2018: XFS support] Week #3, #4 and #5"
author = "abx1"
date = "2018-05-28 22:19:10+05:30"
tags = ["haiku", "gsoc2018", "xfs", "gsoc"]
+++

Hey everyone,

I was not able to put in complete effort into GSoC, as I was having exams in my University during the past few weeks. I'll be regular with the updates starting with this one.

I was encountering issues related to header files and xfs_shell wasn't bulding properly. It was the problem in JamFile that FS_SHELL wasn't added as an additional define. Doing so made sure that fs-shell wrappers are properly loaded.

### Implementing superblock

I had to revise the on-disk structure of XFS and read through the implementation. I started with the implementation of XFS superblock, which is needed for identify_partition. Here is implementation

	struct xfs_sb {
	    uint32            sb_magicnum;
	    uint32            sb_blocksize;
	    uint64            sb_dblocks;
	    uint64            sb_rblocks;
	    uint64            sb_rextents;
	    uuid_t            sb_uuid;
	    uint64            sb_logstart;
	    xfs_ino_t         sb_rootino;
	    xfs_ino_t         sb_rbmino;
	    xfs_ino_t         sb_rsumino;
	    uint32            sb_rextsize;
	    uint              sb_agblocks;
	    uint32            sb_agcount;
	    uint32            sb_rbmblocks;
	    uint32            sb_logblocks;
	    uint16            sb_versionnum;
	    uint16            sb_sectsize;
	    uint16            sb_inopblock;
	    uint16            sb_inodesize;
	    char              sb_fname[12];
	    uint8             sb_blocklog;
	    uint8             sb_sectlog;
	    uint8             sb_inodelog;
	    uint8             sb_inopblog;
	    uint8             sb_agblklog;
	    uint8             sb_rextslog;
	    uint8             sb_inprogress;
	    uint8             sb_imax_pct;
	    uint64            sb_icount;
	    uint64            sb_ifree;
	    uint64            sb_fdblocks;
	    uint64            sb_frextents;
	    xfs_ino_t         sb_uquotino;
	    xfs_ino_t         sb_gquotino;
	    uint16            sb_qflags;
	    uint8             sb_flags;
	    uint8             sb_shared_vn;
	    uint32            sb_inoalignmt;
	    uint32            sb_unit;
	    uint32            sb_width;
	    uint8             sb_dirblklog;
	    uint8             sb_logsectlog;
	    uint16            sb_logsectsize;
	    uint32            sb_logsunit;
	    uint32            sb_features2;
	} _PACKED;

#### Explanation for few are as follows
* sb_magicnum - value = 0x58465342, identifies the filesystem
* sb_blocksize - usually 4096 bytes
* sb_dblocks - no of blocks available for the data
* sb_rblocks - no of blocks on real-time device
* sb_uuid - Universal Unique ID for teh filesystem
* sb_logstart - (internal log) first block number for journaling log
* sb_rootino - 128 when using blocksize is 4096 bytes
* sb_agblocks - size of allocation group (in blocks)
* sb_agcount - count of AG
* sb_sectsize - disk sector size in bytes
* sb_inodesize - size of inode in bytes
* sb_inopblock - no of inodes in block
* sb_icount - count for no of inodes allocated on the filesystem(only in the first superblock)
* sb_ifree - count of free inodes on the filesystem
* sb_fdblocks - count of free data blocks on the filesystem

Thanks
Abhinand