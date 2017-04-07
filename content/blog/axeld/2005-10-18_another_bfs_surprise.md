+++
type = "blog"
author = "axeld"
title = "Another BFS surprise"
date = "2005-10-18T23:25:00.000Z"
tags = ["bfs", "journal"]
+++

Turns out BFS logging code is not that intelligent - it uses block_runs in the log area, but it doesn't make use of them. In other words: it only accepts block_runs with length 1 - which effectively kills the whole idea of using them. It's now as space consuming as the single block number arrays I had before, but doesn't share the binary search capability we had earlier.<br /><br />While our code now could use block_runs how they should be used, I have disabled joining separate block_runs to make our BFS fully compatible to Be's in this regard. If we someday leave compatibility with the current BFS behind, we can enable it again, of course.<br /><br />While this is probably just a fault in the implementation of the original BFS, it's <a href="/blog/axeld/2007-10-05_why_bfs_needs_chkbfs">not the first time we have to live with a sub-optimal solution</a> in order to retain compatibility. The good thing is, since we should be 100% compatible to BFS now, it should also be the last of these surprises now.
