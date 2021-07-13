+++
type = "blog"
title = "GSoC 2021: XFS support progress update"
author = "Xiaojie"
date = "2021-07-06 01:33:24+08:00"
tags = ["haiku", "software"]
+++

# XFS project progress

Hi, I am going to make a short summary of the XFS project work since last post.  

Anyway, you can find my post named [*'GSoC 2021 Project: XFS support progress'*](https://discuss.haiku-os.org/t/gsoc-2021-project-xfs-support-progress/10790)  on the forum. It records part of the work. Of course, the most is on Gerrit. [topic:"xfs" on Gerrit](https://review.haiku-os.org/q/topic:%22xfs%22+(status:open%20OR%20status:merged)) 

We could find all remaining patches are merged. But, by the way, not all problems. There is a problem leaving. To be honest, I just learned how to use GDB under linux to debug today... I lack big project experience before so it is also new skills for me. Now I need to fix it soon and then move to next step quickly, if there is no other changes, it will be attributes read support. So it is also why I choose to write summary at this time. I need to continue my attempt afterwards.

Above is current state about XFS work progress. Then, let me review my work and study.

Before I turn to fix the problems on Gerrit. I send many emails to CruxBox. That's not good. But I don't know how to do my work at that time and just want to solve all problems at once. So I  always want to find a perfect solution...and ask many 'strange' and not smart questions at that time, such as could we use smart pointers... :P Anyway, thanks for CruxBox's nice.

The turning point of the matter happened after CruxBox pushed a patch by himself. He made a start point for me. So I realized I should also do this. If I can fix all problems in one patch, it is good. If not, we could get it little by little. After that, we got several patches merged quickly. 

Then about the code, except for some minor errors, in my view the mainly things can be said to be memory management and code reuse. For memory stuff, we chose to allocate it on heap and then use AutoDeleter/StackOrHeap to manage memory, since it can free memory automatically. For code reuse, in my mind, actually it is because XFS use B+Tree in different parts and there are always some methods are as same between them. So we got this problem. I just did it by review the code, and tried many times. I think it is also I got from CruxBox, just keep hacking.

Then about XFS its own states on Haiku. From my view, it could be said like, now we can provide read support for XFS, incompletely. : ( 

More details I will post on the forum after we arrived phase goals. What's more, after we implement other part of read support basically, I guess we still need to find better way for tests. Now all our tests are based on images shared by CruxBox. Mainly for v4 linux kernel I think. So later we may need more check.  I have prepared this will be a long-term job.
