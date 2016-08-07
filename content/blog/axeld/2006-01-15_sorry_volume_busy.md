+++
type = "blog"
author = "axeld"
title = "Sorry, Volume Is Busy! "
date = "2006-01-15T19:43:00.000Z"
tags = ["vfs", "unmount"]
+++

If you've used BeOS, you're probably familiar with the above message when trying to unmount a volume. From time to time, some application keeps accessing a volume, and you can't determine which application that is. It might be caused by a running live query, but it might also be caused by buggy background applications that forget to close a file.

I've just given you control over your volumes back again in Haiku: you can force unmounting such a volume -- applications still trying to access it, would get an error back. Forcing an unmount requires an extra user interaction, though, so it's not the preferred solution.

To remove one of the problems, live queries shouldn't bother unmounting a volume at all: it doesn't make any sense that they are preventing the normal unmounting process to stop. This can hardly be in the interest of an application that is querying for something.

On the other side, we should try to improve the user perception of a busy volume: instead of saying "sorry, busy" it should say something like: "Sorry, application Tracker is still accessing the volume." - for the user this makes an important difference, especially when he now has the power to force unmounting a volume, it gives him the information he needs to properly decide what he really wants to do.

As a side effect, we'd get a tool that can determine which applications have which files open - to be able to report misbehaviour of the application back to its developers. Or even better, to give the developer the possibility to monitor the performance of his application.

Well, at least you have the power now, control comes next :-)