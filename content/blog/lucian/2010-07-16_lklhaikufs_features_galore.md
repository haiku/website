+++
type = "blog"
author = "lucian"
title = "lklhaikufs: features galore"
date = "2010-07-16T21:02:30.000Z"
tags = ["lkl-haiku-fsd", "gsoc", "gsoc2010"]
+++

The LKL-based Haiku driver has progressed well in the last few weeks.

The set of features already implemented:
<ul>
<li>mounting and unmounting ext3, ext4 disk images*, both read-only and <b>read-write</b></li>
<li>listing file system attributes (read-only/read-write, file system size, number of files created, number of files remaining to be created, etc.) </li>
<li>browsing the contents of any folder on the file system</li>
<li>listing file permissions, owner, group, type (directory, symlink, regular file, etc.)</li>
<li>opening/closing existing files, and <b>creating</b> new files</li>
<li>reading and <b>writing</b> data into files</li>
<li>creating new directories</li>
</ul>


What still needs to be done:
<ul>
<li>renaming files</li>
<li>deleting files and directories</li>
</ul>


* I only tested ext3 and ext4, other should work as well. There's a limitation in the ext4 support in LKL, not related to this driver in particular that needs to be fixed.
