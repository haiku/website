+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 8"
author = "hrily"
date = "2018-06-25 18:24:36+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

This is the eighth progress report for TrackGit project. I did the following in last week.


## Implemented Commit command

I implemented the equivalent of `git commit` in TrackGit. The implementation was a little bit trickier because libgit2 used a different logic when the commit is first or non-first. The [link](https://github.com/Hrily/TrackGit/commit/f8f133a21c340f18e5596e2d84b73ccd1fec53fa) to commit.

Below is a screenshot of Commit window.

![Commit Window](/files/blog/hrily/Commit.jpg)

## Added test for commit command

I also added the test case for commit command. This simply makes a commit and checks if the commit is made via status command.