+++
type = "blog"
author = "ahenriksson"
title = "BFS Partition Resizer: Quarter Term Report"
date = "2012-06-25T10:58:26.000Z"
tags = ["gsoc", "gsoc2012"]
+++

For the 1/4 term milestone, my goal was to have inode-moving working. This is mostly completed, you can view the code at http://web.student.chalmers.se/~andrhen/move_inode_v2.patch

For this period, I have the following things planned:

<b>Allocation of new block positions:</b> I have a good grasp of what needs to be done for this, and it's not a lot of work.

<b>Moving file data:</b> Last week I thought I had this nailed down, but it turned out to be a little more involved than that. Still, there has been some good progress made, and I'm sure it'll be completed within the period.

<b>Doing the actual resizing:</b> This step involves a few sub-steps: traversing the file system to move things out of the way, possibly moving the file system journal, resizing the block bitmap and updating the file system header. None of it should be that complicated (in theory), however it's likely that the more thorough exercising of the rest of the code will reveal problems with it.

<b>Testing:</b> I obviously test code as I write it, but I probably won't have time for a more rigorous approach in this period. I have a lot of time allocated for that in the next period, so it's not a disaster.


As it looks right now, things seem to be on track with the timeline in my proposal (which is actually not that great, as the timeline was a bit pessimistic).