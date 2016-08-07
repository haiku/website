+++
type = "blog"
author = "axeld"
title = "Why BFS needs chkbfs"
date = "2007-10-05T09:16:12.000Z"
tags = ["bfs", "chkbfs"]
+++

<p>
You are probably aware of the existance of <i>chkbfs</i>. This tool checks the file system for errors, and corrects them, if possible.
Nothing is perfect, so you might not even be asking yourself why a journaling file system comes with such a tool.
</p>
<p>
In fact, it wasn't originally included or planned in the first releases of the new BFS file system. It was added because there is a real need for this tool and you are advised to run it after having experienced some BeOS crashes.
</p>
<p>
The reason you need this tool is a feature of the VFS and a design problem in BFS: if you delete a file which is still in use by another application, the file's disk space won't be freed until the last user closed its reference to it - until then, only the inode is marked as deleted, and removed from the	parent directory, so that it can't be found or opened again anymore.<br>
Since BFS supports only sequential transactions<sup>1)</sup>, it needs two transactions to delete the file in that case: one to remove it from the parent directory, and the other one to free the space occupied by the file. If it would let the first transaction open, you couldn't do any write accesses (which would require a new transaction to be started) to the disk until the other application closed the file, which is clearly not desirable.
</p>
<p>
If the system now crashes after the first transaction has been completed, and the second hasn't started yet, BFS cannot know that there is any space left to free - the system won't tell it on next boot (it had already fulfilled its job by telling the file system to delete that file).
</p>
<p>
So the main reason for the <i>chkbfs</i> tool is to detect this unclaimed free space and put it back to the available free space. If you would never use it, you would waste all the space which is occupied by those gone files (which can of course range from some kB to some GB).
</p>
<p>
There are two ways to solve this issue: BFS could maintain a special action log where it remembers which files should be deleted, and could completely delete the file on next boot. The other solution would be to allow multiple transactions at once.<br>
Both are very desirable goals, and could be combined to improve the speed of BFS in several cases: the former could speed up any index (or directory) updates, because they could be batch processed, and independently from the action that triggered those updates. The latter because it could greatly improve throughput if you have several drives together in a RAID - which is currently not even possible in BeOS or Haiku.
</p>
<p>
Unfortunately, the solutions to this problem would require to break compatibility with BFS - and that's why we won't do this for R1 and we will still need this tool, even with the latest (and only) reincarnation of the BFS. Also, in future releases, it's desirable to have tool to restore a BFS disk in case there were failures the journaling mechanism does not and cannot avoid: corrupt memory, bad blocks, etc. <i>chkbfs</i> is currently not able to fix issues like these, and might never be, as they might become quite complex and might also require user interaction. For cases like these, I've written a tool called <i>recover</i> which should be able to recover your data - and it's currently freely available, too (just not very convenient to use).
</p>
<p>
For later releases of Haiku, we plan to develop a successor to BFS which no longer retains binary compatibility. Although both solutions could be explained in very few words, they are actually very complex to implement.
</p>
<p>
You may also know (or were forced to use) the <i>forcerm</i> command which is able to delete files you can't access or remove in any other way - this one is not necessary in the sense of <i>chkbfs</i> but is obviously a work-around for some kind of bug in BFS - it won't be necessary under Haiku.
</p>
<p>
<i><font size="-2">1) transactions are atomic operations on the disk: they are either done completely or not at all. A journaling file system achieves to guaranty consistent file system structures by performing only atomic operations.</font></i>
</p>
