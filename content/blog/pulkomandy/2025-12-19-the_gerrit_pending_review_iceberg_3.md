+++
type = "blog"
title = "The Gerrit code review iceberg, episode 3"
author = "PulkoMandy"
date = "2025-12-19 21:30:00+0100"
tags = []
+++

Recently some discussions on the forum led to asking about the status of our Gerrit code review.
There are a lot of changes there that have been inactive for several years, with no apparent
interest from anyone. To be precise, there are currently 346 commits waiting for review (note that
Gerrit, unlike Github and other popular code review tools, works on a commit-by-commit basis, so
each commit from a multiple-commit change is counted separately). The oldest one has not seen any
comments since 2018.

Let's look at the next set of changes. Note that these are from late 2020, so, while we covered
only 10 changes in this blogpost series, we have already covered a timespan of almost 3 years.

# [Change 3380](https://review.haiku-os.org/c/haiku/+/3380) and [Change 3391](https://review.haiku-os.org/c/haiku/+/3391) - Keybard settings handling in Input preferences

## What is this about?

These changes are part of a larger rework of the input preferences. Before 2020, Haiku used to have
separate preference panels for mouse, keyboard and touchpad. These have been grouped together into
a single panel listing all input devices. Ultimately, the goal is to allow different settings for
each device. For example, people may want to use different acceleration and speed settings for the
mouse and touchpad. In fact, the pointing devices part of this is already working.

The part that was not completed yet is keyboard preferences. These two changes are early work
towards that.

## Why is the change stalled?

While having different settings for different pointing devices makes sense, it is less so for
keyboards. People usually want the same key repeat rate and delay for all their keyboards (assuming
they even have multiple keyboards connected to the same machine).

One exception to that could be using different keymaps, but that isn't currently part of the Input
preferences. As a result, there is little interest in making setting for different keyboards possible
at all.

# [Change 3514](https://review.haiku-os.org/c/buildtools/+/3514) - jam: show build progress for each target

## What is this about?

`jam` is the tool used to compile Haiku. It is an alternative to the very popular `make`, with a
slightly different way of working.

When building, jam periodically prints the number of targets already built, but it does not provide
the total number of targets. This change attempts to add a total number (similar to how it's done
in cmake or ninja), allowing users to get a better idea of how far along the build is.

## Why is this change stalled?

The method used to compute the total number of targets isn't reliable in all cases. Providing wrong
information is worse than providing no information at all. No one has yet looked into generating
the correct numbers.

Moreover, there is a project called Ham that is meant to replace Jam (a new tool compatible with the
existing build files). This reduces the interest in digging into Jam's code, with which several
of the Haiku devs are not too familiar.

# [Change 3183](https://review.haiku-os.org/c/haiku/+/3183) - Initial implementation of BUrlSession

## What is this about?

Haiku comes wit a set of classes for running HTTP requests. These classes do not have the best
design, and in particular they offer no way to reuse the same TCP connection for multiple requests,
as is the case in HTTP 1.1 (sequentially) and HTTP 2 (in parallel).

This changeset changes the API to make this possible. It introduces the concept of an "URL session"
that can be used to perform multiple requests, possibly with the same TCP connection.

## Why is this change stalled?

This is only a first draft. It only fixes this one specific issue, while there is much more to be
improved about these classes. Moreover, experience shows that it is not such a great idea to try
to implement HTTP from scratch. The protocol looks simple at first, but there are many quirks,
performance issues, and so on. In the end it may make sense to use curl or some other existing
libraty as a backend, and only provide a C++, Be-API wrapper on top.

There are also other later changes exploring deeper changes to the HTTP support in Haiku. But it
may be difficult to replace the existing API now that several applications are already relying on it.

# [Change 330](https://review.haiku-os.org/c/haiku/+/330) - DriveSetup: add "Disk image menu"

## What is this about?

This change adds a new menu to DriveSetup to easily dump a partition to a file or write a file
to a partition (or entire drive). It was initially part of a larger set of improvements to
DriveSetup, with the other parts already having been merged.

This would for example make it easier to create new installation media from a downloaded Haiku
disk image.

## Why is this change stalled?

The menu allows to start multiple image read and write operations. But it shows the progress using
a single progress bar that pops up at the bottom of the window. This means the scrollbar will jump
all over the place if multiple operations are run in parallel. The panel showing the progress bar
is itself a bit glitchy, sometimes not hiding when the opeation is complete for example.

Overall, this just needs someone to spend a little bit of time polishing the user interface. The
backend of the code (actually reading and writing the disk images) is fine.

# [Change 60](https://review.haiku-os.org/c/haiku/+/60) - Icon-O-Matic: convert IOM to HVIF/RDef/SVG/source from command line

## What is this about?

This change adds command line options to Icon-O-Matic that allow batch conversion of Icon-O-Matic
source files to HVIF and other formats.

## Why is this change stalled?

This change just needs a little bit of code cleanup, that the original author never got around to
doing.

Bonus points for adding export to PNG (the current code does only HVIF and SVG), but that could
very well be a separate patchset.

If you are looking for an easy way to start contributing to Haiku, changes like this may be the
perfect place.

# The little note at the end

That's it for this time! And with these last two changes we are already up to may of 2021. Which
means there are not that many changes which are untouched for more than 5 years! However there
is obviously still a lot more to cover. See you in the next episode, with hopefully some news about
some of these old changes regaining some activity!
