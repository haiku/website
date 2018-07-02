+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 9"
author = "hrily"
date = "2018-07-02 18:00:27+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

This is the ninth progress report for TrackGit project. I did the following in last week.


## Implemented Pull command

I implemented the equivalent of `git pull`. The implementation was a little trickier as there was no direct API for pull in libgit2.
The git pull command is combination of a fetch and then a merge.
In merge there are three cases:

1. Repository up to date
2. Fast forward
3. Merge commit

The merge commit can lead to conflicts. In such case user is shown with the list of conflicting files. I'm going to implement the flow of resolving such conflicts in coming days. 

I had to implement all these cases. [Link](https://github.com/Hrily/TrackGit/commit/a2c2d4c71c6e4755625e912350e7a33a728ec935) to commit of pull command implementation.

The following screenshot shows working of pull command:

![Pull Window](/files/blog/hrily/Pull.jpg)


## Implemented Conflicts Window

As mentioned above, I implemented a Conflicts Window which shows user with list of conflicting files. [Link](https://github.com/Hrily/TrackGit/commit/e8fd5cf607299382349bbebb6ff5aee186523390) to commit. The following screenshot shows Conflicts window:

![Conflicts Window](/files/blog/hrily/Conflicts.jpg)