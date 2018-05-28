+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 4"
author = "hrily"
date = "2018-05-28 18:18:25+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++


This is the fourth progress report for TrackGit project. I did the following in last week.

## Status Command

I implemented the status command. This will pop up a window showing status of the current repository. This menu item will be shown only when the current directory is in some repo path.

The following screenshot shows the Status Window:

![Status-Window](/files/blog/hrily/Status-Window.jpg)


## Solved a bug in Status

While implementing Status commmand, I ran into a bug which took some of my time. But I was able to solve it with the help of Haiku Debugger.


## Learnt to use Haiku Debugger

As I was telling above, Haiku Debugger was realy helpful to me. Because of the necessity of solving the bug, I got familiarized with Haiku Debugger. And thus I
got to learn it.


## Solved Clone command ssl error

I mentioned in my last progress report about being stuck in Clone commmand due to ssl error. I was finally able to solve it. The problem was, I wasn't initializing the libgit2.
