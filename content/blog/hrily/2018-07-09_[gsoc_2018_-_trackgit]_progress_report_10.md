+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 10"
author = "hrily"
date = "2018-07-09 18:05:52+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

This is the tenth progress report for TrackGit project. I did the following in last week.


## Implemented Show conflicts Window

Last week I implemented Pull command. While pulling changes, sometimes there might be conflicts while merging the changes. These conflicts are shown when pull command execution is finished. In addition to that, I implemented a "Show conflicts" option to see the current conflicting files in the repository. This option is only shown when there are conflicts in the repository. [Link](https://github.com/Hrily/TrackGit/commit/e44ce22afaaaef96ee79c6447a691e64f52b9118) to the commit.

Now the user can resolve the conflicts. Following is the workflow of conflict resolution in TrackGit:

1. Whenever there is any conflicting file in repo, libgit2 helps us in knowing it. So we show a "Show conflicts" options in TrackGit menu.
2. "Show conflicts" will list all the files and tells user this "Resolve the conflicts and add files to mark them resolved."
3. The user then resolves and adds the files.
4. The marked files will now no longer be in "Show conflicts".
5. If all files are marked, "Show conflicts"  will no longer be 
in TrackGit menu.


## Implemented Push command

I implemented equivalent of `git push` command. It uploads the changes to the remote. User credentials are asked to the user when required for uploading changes. [Link](https://github.com/Hrily/TrackGit/commit/2b79f9014500418d1fb0cf808d984b989d4d64b1) to commit.