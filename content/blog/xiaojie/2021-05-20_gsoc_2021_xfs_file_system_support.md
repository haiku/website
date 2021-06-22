+++
type = "blog"
title = "GSoC 2021: XFS file system support"
author = "Xiaojie"
date = "2021-05-20 14:19:33+08:00"
tags = ["haiku", "software"]
+++

# About me

I am Xiaojie Yi, currently majoring in Data Science and Big Data technology in Central China Normal University, China. I am happy to be selected as GSoC student this year and can work for Haiku to get more XFS filesystem support done. My mentors are CruxBox and Rene.

When I decided to choose this project at the end of March, I knew very little about how everything works. Thanks for everyone's help here! And I have finally got some basic things about git, gerrit, os, and filesystems(especially xfs). I will do more this summer and it would be challenging but enjoyable to learn new knowledge.   

# About the project

XFS is a great filesystem and it is widely used on Linux. This year, we want to improve XFS support for Haiku. The current state is still several patches need to be finished, and it would be the most important thing during this period. According to my investigation, it could be like this:

- Directory

    - Short format directories, Done
    - Block directories, Done
    - Leaf directories, Done
    - Node directories, Done
    - B+Tree based directories, patches wait to be merged([#3119](https://review.haiku-os.org/c/haiku/+/3119) , [#3124](https://review.haiku-os.org/c/haiku/+/3124), [#3143](https://review.haiku-os.org/c/haiku/+/3143))

- File

    - Extent based files, patches wait to be merged([#3154](https://review.haiku-os.org/c/haiku/+/3154))

    - B+Tree based files, patches wait to be merged([#3170](https://review.haiku-os.org/c/haiku/+/3170))

Some basic features have done:

- xfs_shell work and initialize work done

- Inodes can be read from disk

- Short format directories can be read

- Block directories can be read

- Leaf directories can be read, binary search works here as we need lower_bound

- Node directories can be read

    (All “can be read” would get further tests as we can.)

Some patches cannot be merged yet since some problems remain:

- \#3119: Original problem is memory leak, and there are debates on heap or stack allocation, xfs should support large data/file without problems and this really needs to be investigated and considered carefully.(After some changes focus on the function angle by me when I am new to haiku, not memory leak any more. But it is a little chaotic now :(, anyway I will solve this problem later.) 
- \#3124: Meet problems when implemented and optimized B+Tree in hook GetNext() and this one is to solve this. It should be functional except format problems. Need to investigate, test and fix.
- \#3143: No more functions added. It should be done after fixing #3119 and further tests over.
- \#3154: What we deal with is to read a linear data structure here, but have met some detailed problems(allocation way again and accurate implementation), need further discussion and confirmation here.
- \#3170: It would be better to get B+Tree directories and extent based files done first. Then fix and check is there anything missing.

I am trying to clean them during my application period, but I found it is not good and impossible to try to fix all things just in logical ways. When I came to the B plus tree structures, I found I needed to know how things work on disk and get full tests after change. So at that time I briefly interrupted my attempt and learned more about on-disk structures of XFS. Fortunately, CruxBox had shared his image and I believe it would help a lot in my early work. (We plan to get test tools later.)Thanks for your help again!

I plan to create a topic on our forum later. Everyone who has interests can track progress of this project there and any help would be appreciated. That's all. Hope I can post more about my work next time! Bye.
