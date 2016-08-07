+++
type = "blog"
author = "generalmaximus"
title = "ZFS Port: Three-Quarter Term Report"
date = "2011-08-06T04:46:25.000Z"
tags = ["zfs gsoc gsoc2011"]
+++

<p>Briefly, my goals for the three quarter term were: port libzfs, port the commandline tools <em>zfs</em> and <em>zpool</em>, and write a kernel module to communicate with userland tools via ioctl() calls on a /dev/zfs. Another goal was to make sure our port of ZFS passes all tests in <em>ztest</em>.</p>

<p>With the exception of a few missing routines, libzfs builds fine on Haiku. So does <em>zpool</em>. <em>zfs</em> requires some love, but nothing major remains to be done. In fact, with the exception of a few routines that I need to implement in libsolcompat (our Solaris compatibility library), the port builds almost perfectly on Haiku. But getting it to build is only half the battle ;)</p>

<p>The issue that's holding me back at the moment is that our port fails <em>ztest</em>, and the multithreaded nature of ZFS makes bugs extremely hard to track down and fix. For example, about a week ago <em>ztest</em> would fail when trying to write to disk. That turned out to be a fairly trivial issue -- wrong flags passed to an open() call because my definition of a constant was wrong -- but took me four days to track down. Now I'm facing an issue where all the threads in <em>ztest</em> deadlock after while and the program sits there forever, doing nothing. Since the ZFS code spawns so many threads, it's very hard to figure out where the problem originates.</p>

<p>I wanted to get <em>ztest</em> under control this week, but I failed. Now I've been studying how Solaris expects threads and synchronization primitives to behave from the excellent <em>Solaris Internals</em> book. I will hopefully be able to fix <em>ztest</em> before the next week ends and wrap up the missing routines in libsolcompat. If we pass <em>ztest</em>, it means the code we ported works perfectly.</p>

<p>My goal for the final stretch of the GSoC was to implement the ZFS POSIX Layer. That would allow us to actually perform read/write operations on ZFS partitions. Sadly, I might not have time to do this before the coding period ends, but I'll give it my best shot.</p>

<p>I hope to get back here with good news soon.<p>