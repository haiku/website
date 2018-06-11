+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 6"
author = "hrily"
date = "2018-06-11 19:10:45+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

This is the sixth progress report for TrackGit project. I did the following in last week.


## Addressed Stephen's comments

My mentor Stephen had put up few comments on my commits so far. I addressed them earlier this week. You can have a look at the comments thread [here](https://github.com/Hrily/TrackGit/commit/89f3da9b2cbd75e40d0f9615ce1c0ab563600426) and [here](https://github.com/Hrily/TrackGit/commit/662b023eab75368746e78b47b53fffc1786dac15).

## Made clone process threaded

The initial implementation of clone was blocking the UI thread. I used the pthread library to make the clone processes threaded. Now the clone command does not block UI.

## Implmented Clone progress Window

In addition to making clone progresses threaded, I also implemented the displaying of clone progress. Unfortunately, the progress text is not displayed correctly, which should be solved soon.
