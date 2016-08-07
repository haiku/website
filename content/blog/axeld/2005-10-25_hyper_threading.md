+++
type = "blog"
author = "axeld"
title = "Hyper Threading?"
date = "2005-10-25T23:03:00.000Z"
tags = ["smp", "hyper threading", "app_server"]
+++

Tomorrow, I'll have a short look at implementing Hyper Threading support - not the full monty, but it would still be nice to have it start using the two logical processors in my system; after all, I bought this system with enabling Hyper Threading in Haiku in mind.<br /><br />After that excursion, I will start looking at the app_server again. I had started to refactor the code some weeks ago, but got interrupted, and didn't find the time to continue this effort. I hope to make the app_server stable in the next few weeks - it's one of the biggest show stoppers for Haiku right now: the kernel should decide when the time for a reboot has come (read KDL), not some bloody userland application :-)<br /><br />Anyway, the app_server is the single most important application running under Haiku, and it's in many regards as critical as the kernel. When the Application Kit/Interface Kit/app_server triumvirate works as expected, we should be able to run almost every R5 or Haiku application under Haiku. And that should enable us sooner or later to start distributing official alpha releases - not that we'll be able to work with these in a productive manner, but it'll be a major step forward.
