+++
type = "blog"
title = "The Gerrit code review iceberg, episode 2"
author = "PulkoMandy"
date = "2025-12-05 13:30:00+0100"
tags = []
+++

Recently some discussions on the forum led to asking about the status of our Gerrit code review.
There are a lot of changes there that have been inactive for several years, with no apparent
interest from anyone. To be precise, there are currently 353 commits waiting for review (note that
Gerrit, unlike Github and other popular code review tools, works on a commit-by-commit basis, so
each commit from a multiple-commit change is counted separately). The oldest one has not seen any
comments since 2018.

Last time we looked at the 5 oldest changes. Of these, one has since been finished up and merged,
while the other ones remain untouched. Let's look at the next 5 and see if the same thing happens!

# [Change 1628](https://review.haiku-os.org/c/haiku/+/1678) - Menu tracking: Re-apply Stefano's patch from #1621

## What is this about

The implementations of menus in Haiku is a bit unusual: each menu is actually a BWindow. It is in
fact possible to hook into this and add random widgets to menus, in a way that will surely break
apps doing such tricks in the future.

Anyway, the downside of this is that each window in Haiku is also its own thread, which means if
the user is navigating deeply nested level of submenus (for example when using X-Ray navigation),
this results in creating and stopping a lot of threads, and of course, keeping everything
synchronized between all of them can get quite complicated.

This change was an attempt at reworking the whole thing and making it simpler.

## Why is the change stalled

The work is unfinished, and completely broken. A later, independant attempt already exists in a
more recent change, but is also not merged.

This one ends up in a weird place: the code cleanup would surely be welcome, but on the other hand
it is quite likely to bring some regressions that will then need to be fixed. It may be too large
or not well-defined enough for a GSoC project, and once someone puts the work to make it well-defined,
it may turn out that the implementing part is relatively boring and too small for an interesting
GSoC project. And no one is really interested in opening the can of worms of menu tracking, really.

# [Change 2468](https://review.haiku-os.org/c/haiku/+/2468) - makefile-engine: Fixes and Improvements

## What is this about

This changes makes some previously hardcoded things in the makefile engine be configurable.

## Why is this change stalled

The goal of the makefile engine is to make it really simple to build an application with a
standardized build system. Making it more configurable makes things less standardized and more
complex.

This can be useful in some cases (for example the change makes it easy to add custom attributes on
the generated executable), but for other things (installation directory, temporary objects
directory, ...) the gains seem unclear, and not worth the extra complexity.

# [Change 2479](https://review.haiku-os.org/c/haiku/+/2479) - libnetapi: Add initial support for FTP protocol

## What is this about

The "services kit" is an implementation of HTTP and HTTPS. Initially it was developped for WebPositive,
but since then, WebPositive has switched back to just using curl, a well-tested library implementing
things more efficiently.

This change attempts to add FTP support, so that some applications could use FTP through the service
kit.

## Why is this change stalled

The changes are not complete, and they highlighted places where the service kit APIs assume something
like HTTP is used. Fixing these issues would require a major rework of the service kit APIs.

Moreover, maybe we don't want to maintain our own FTP and even HTTP implementations, and we should
just use curl, possibly with a nice C++ wrapper instead.

# [Change 2784](https://review.haiku-os.org/c/buildtools/+/2784) - Add initial 64-bit PowerPC support.

## What is this about

Haiku does not currently have a 64-bit PowerPC port. This change is about adding the needed parts
in the buildtools repository (gcc and binutils configuration) to get started on one.

## Why is the change stalled

A few questions were asked during code review, but the original author of the changes never replied.

No one has picked up the PowerPC 64 port who could answer these questions. The change patiently
waits for someone to investigate porting Haiku to PPC64 again, but hardware to test that is not so common.

# [Change 1531](https://review.haiku-os.org/c/haiku/+/1531) - btrfs: implement btrfs_create

## What is this about

Haiku has read-only support for the btrfs filesystem. This is a first step towards write support,
by implementing the function to create and format a new btrfs volume.

## Why is this stalled

One of the original authors of the btrfs filesystem has made some comments, which have not been
answered by the patch developer.

Moreover, being able to format new btrfs volumes and then being unable to write anything to them
seems not so useful. The patch may be picked up by a developer wanting to continue work on write
support for btrfs, maybe as a future GSoC project.

That's all for this week! See you next time for the next level of the iceberg and hopefully some
news about resumed activity on some of these changes!
