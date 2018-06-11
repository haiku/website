+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 5"
author = "hrily"
date = "2018-06-04 20:02:08+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

This is the fifth progress report for TrackGit project. I did the following in last week.


## Status Test

Added test for status command. [Link to commit](https://github.com/Hrily/TrackGit/commit/5225d24342b672e17b4be0ce87423a1a00f97baa).


## Status window

Previously, the status was shown in a BAlert. This was not good if the status text was long. So, I implemented a Status window with scrollable text view. [Link to Commit](https://github.com/Hrily/TrackGit/commit/4faa45cabc15c58697bd667ceffc79e3096a319c).


## Implemented TrackGit Application

The major change in the TrackGit till now is the implementation of TrackGit Application. Previously whenevere user clicked on same option twice, say status, then two windows were opened, even if repo for checking status was same.

In ideal case, the addon should move the previous status window to front whenever such scenario happens.

To implement this behavior, Stephen suggested me to implement an Application which takes care of such scenario.

Now, whenever a status window is created, the application will take a note of this window and the repo which it was called for. Whenever a new status request comes for same repo, it already knows that there is a window related to this repo and it then simply brings it to the front.

The basic implementation of the application is done, [link to commit](https://github.com/Hrily/TrackGit/commit/89f3da9b2cbd75e40d0f9615ce1c0ab563600426). I'm currently addressing the suggestions of Stephen on my commits.

