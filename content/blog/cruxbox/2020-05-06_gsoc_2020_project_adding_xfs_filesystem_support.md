+++
type = "blog"
title = "GSoC 2020 Project: Adding XFS file system in Haiku"
author = "CruxBox"
date = "2020-05-11 23:35:56+05:30"
tags = ["haiku", "software", "gsoc", "gsoc2020", "file system"]
+++


Sorry for the late post, but here we go!

# Introduction:

I am Shubham Bhagat, a sophomore, currently majoring in Computer Science Engineering from Indian Institute of Information Technology, Sricity, India.
I came across Haiku, last November (2019), while I was looking for an operating system I could contribute to. My interest to contribute came from a mini college course. I knew Haiku was also part of GSoC for many years now, so getting the chance to work as an intern and learn here was a no brainer. So THANK YOU for selecting me as a mentee!

---

# About the project:

My project proposes to begin support for the v4 of XFS File System. We currently have no support for it. The goal is to get the read-only part setup for now. If time permits we can do more :)

# Project plan:

I was spending time reading a lot of the specs and the code I had written for the past few days(it's been over a month since I did any work because of university commitments). At the moment, I think the initial step is to be able to read small directories. The way the inode manages data is in a hierarchical way depending on the size of the data. For example, directories, depending on the number of entries, could be:

- Completely stored in the inode (unsorted linear fashion)

- Extents could be used (Similar to block_run in BFS)

- Use B+Trees instead of extents (records are still the same though)

This applies for files as well (except that files can't be stored completely in an inode. It's a proposed feature though). Likewise, links have their own story as well.
So at the moment it makes sense to be able to read the root dir, and maybe some more directories inside it. I could then work on the files and move back to bigger directories. This makes sense to me but if you have other suggestions please let me know in the comments :D

# Work done till now:

- Built Xfs_shell

- The FS can be mounted, superblock check passes

- read_fs_info() works.

- Some code on the Free Space Management (Only to now realize that it's not needed :man_facepalming: )

You can find it here: https://review.haiku-os.org/q/owner:shubhambhagat111%2540yahoo.com

---

# Expectations from myself:

I hope to be a great mentee and hope that this period will make me turn from a kid with few months of experience with OS to a Haiku Developer :) (Yeah one would say FS is quite high level but I have to start somewhere right? :P)

## Proposal link:
- [Proposal](https://storage.googleapis.com/summerofcode-prod.appspot.com/gsoc/core_project/doc/6304642104819712_1585373457_Proposal.pdf?Expires=1589306631&GoogleAccessId=summerofcode-prod%40appspot.gserviceaccount.com&Signature=f%2BCOrZ5NeZykbTRhb7F%2FH5SDX%2FLcdNCGt21B4QPs4VcZsVjwG3iV9qwvqCCY%2Bq1tbZL%2FdYdlI0WuCNgucUHNlDXL2nQ2yvsCe2M0S3S6XCh9HlzldJd0GwKd1xFFU4N0WysPxBet9SRLg7x11eMQ3x7cEWLAZar%2F1v%2Fib0RYpl2TLsh0D3dBOuUHYTbbY%2FKBEBRh0lckTN47LhLeJzlRBCMcFmUyP1zlWAhL6kycLZUtpOuo1fptgdZWSggQJaU6rPwqmRrUqDfdi7pobHFputVkNhcJI0cpGCe2hdCvCxChUvX7w8yTnh7S9VSnzlS8MgyM%2F9HMrFpsv%2FCCIP5FYQ%3D%3D)

