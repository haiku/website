+++
type = "blog"
author = "axeld"
title = "Analyze This"
date = "2005-10-18T10:00:00.000Z"
tags = ["bfs", "journal"]
+++

This morning, I went through analyzing the BFS log area structure. Turns out it's very different from what I did for our BFS.<br />Our current log structure looks like this:<br /><pre><br />block 1 - n:<br /> uint64      number of blocks<br /> off_t[]     array of block numbers<br />block n+1 - m:<br /> real block data<br /></pre><br />While the one from BFS looks like this:<br /><pre><br />block 1:<br /> uint32      number of runs<br /> uint32      max. number of runs<br /> block_run[] array of block runs<br />block 2 - m:<br /> real block data<br /></pre><br />BFS only has one header block, so it can only store a certain number of blocks per log entry. On the other hand, it uses block runs instead of single block numbers which potentially compacts the size of the block array, but also makes lookups a lot more expensive.<br />Like a block number, a block run is 8 bytes wide, and is a composed data type that looks like this:<br /><pre><br />uint32  allocation_group;<br />uint16  start;<br />uint16  length;<br /></pre><br />BFS divides the whole volume into allocation groups - each of which can combine up to 65536 blocks. This way, it can also represent a number of sequential blocks. This structure is used a lot throughout BFS, so it's not surprising to find it again in the log area.<br /><br />So I will now convert our BFS to use that same format, so that you can safely mount uncleanly unmounted volumes from both operating systems, BeOS and Haiku, and in both directions.
