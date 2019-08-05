+++
type = "blog"
title = "Haiku Activity Report: Performance Edition"
author = "waddlesplash"
date = "2019-08-04 23:00:00-04:00"
tags = []
+++

Welcome to the monthly report for July 2019! Most of the more interesting changes this month have been from myself in the way of performance optimizations, so I'm writing the progress report this month so I can talk about those in some detail.

This report covers hrev53238-hrev53337 (158 commits.)

## Optimizations!

Now that Haiku has entered the beta phase, and after the work over the past year or so spent fixing the majority of known kernel crashes and other general instabilities, it is high time we start paying more attention to the whole system's performance.

Despite how "snappy" Haiku seems, most of its internals are really not so well optimized. This shows when running operations of any real intensity (disk, memory, or CPU.) While the new thread scheduler a few years ago removed some of the thread-related bottlenecks, in practice this just shifted the load to other bottlenecks.

So, let's take an overview of this past month's (and some earlier month's) changes, to see how one optimizes an operating system.

### Memory: Allocator pools

Most `malloc` implementations have built-in "size classes" to allocate objects from: e.g. 8 bytes, 16 bytes, etc. Then within a size class there will be "slabs" (or "spans") which can store some number of these allocations; and when `malloc` is called for that size, it grabs the next free item from the slab, and returns it.

Now, if an application allocates a lot of items of one size class all at once and frees them all at once, then the allocator can itself allocate a number of slabs for that size class, and release them when the application frees all the items. But what happens when a number of these items stay alive? Then we will eventually be left with a number of *partially* used slabs, where perhaps the equivalent of one or two full slabs is used, but there are really ten times that and mostly unused.

This is referred to as *memory fragmentation* or *allocator fragmentation.* In user-land applications, this occurs much more rarely than in the kernel, because there, the `malloc` implementations use *thread pools*, which reduces the fragmentation greatly by having different threads use different slabs when allocating.

But in the kernel, there *are not* thread allocation pools, primarily because *all* threads are "kernel threads" -- when one performs a syscall, e.g. `open()`, the calling thread in a way "becomes" a kernel thread temporarily in order to let the kernel directly handle the request. The kernel will need to allocate memory inside syscalls, in this case for the file descriptor structure it uses internally, and so keeping "kernel thread allocator pools" for every single thread on the system would have exponentially more overhead than benefit.

The kernel, however, more than makes up for the lack of thread allocation pools with object allocation pools: that is, rather than allocation pools for the general `malloc` on a per-thread basis, these are allocation pools for *objects* that are used globally. Facilities for these have long existed in the Haiku kernel, but were used primarily by the networking subsystem (to manage `net_buffers`) and the kernel `malloc` itself (as each size class is implemented with its own object cache.)

But these were greatly underutilized. There was [a ticket](https://dev.haiku-os.org/ticket/14451) about how after compiling large projects, Haiku's performance would be seriously and noticeably degraded and there was no apparent way to improve it. Some brief analysis of a system in such a state showed there was nearly 1.3GB (!) of allocator slabs, of which all but some 200MB (!!!) was unused -- but this was scattered all throughout the slabs, so the system couldn't release any of it, and as a result there was a huge amount of bookkeeping overhead each time `malloc` was called, as well as a large amount of RAM that was reserved and not being used.

So last month, I collected statistics on the use of the general kernel `malloc` during the system boot process, which hits most of the major subsystems and stresses them quite a bit, (and made some crude [tables of the data](https://gist.github.com/waddlesplash/da1327cc39cd6f84b50c57786afc175c)) and started analyzing these for consumers of `malloc` that really belong to their own object cache, and found a number of culprits that deserved such a cache:

1. `packagefs`. Due to the way it serves request for data, packagefs allocates a small structure for each and every node in all mounted packages, and then organizes these so it knows what package to serve any given file from, without having to do expensive disk lookups before reading the actual data. On a stock nightly image with only the default packages installed, this means it allocates almost *120,000 objects* to handle this bookkeeping! So, following [hrev53238~2](https://github.com/haiku/haiku/commit/d230b5fdd3722564c2ddd7186d60749932324006) and [hrev53238~1](https://github.com/haiku/haiku/commit/d387d8c5f47bf53be29d1fa8602dc0d267c4bf32), packagefs now uses object_caches for this data.
2. `block_cache`. The block_cache is used by the BFS driver to handle the journal and all on-disk blocks that are journaled (mostly, inodes.) It has already used the object_cache for its blocks for some time; but it turned out that transaction objects themselves were not cached. [This](https://github.com/haiku/haiku/commit/0e6ece91c81de4bb1056c4743c09d40d6106c4a1) moves some 20,000 objects to an object_cache; and unlike packagefs which has rather long-lived items (they are only deallocated when packages are uninstalled, which may not ever happen in a given boot), these items are extremely ephemeral and often are alive for less than a second; and these will continue being allocated for each inode or other journal transaction while the system is running.
3. `VFS` - Path objects. While processing filesystem requests, the VFS often needs to copy paths into a temporary buffer to normalize them or the like. It never knows how large the path is going to get, so it always allocates buffers of size `PATH_MAX + 1` (on Haiku, that's `1024 + 1`); these often are not "alive" for even a millisecond. So now those [have an object_cache](https://github.com/haiku/haiku/commit/42e3c6f97874f37701385e7027c77e4366d7c450), which saves a significant amount of overhead for every syscall involving a path, and avoids fragmentation at the same time.
4. `VFS` - File descriptors. Every time `open` is called to get a new FD, the kernel needs a structure associated with that FD. Now these structures [have their own object_cache](https://github.com/haiku/haiku/commit/62f06d86125fedd222617170f6df4890a5b84e7e), too. There were "only" ~11,000 file descriptors allocated during the boot, but of course during disk-intensive operations (like long compiles), they will be used at a dizzying rate; but of course they too are extremely ephemeral (as that commit notes, of the ~11,000 allocated during the boot, only 70-some-odd remained allocated after boot finished and the system sat at idle.)

The HaikuPorts team members re-compiled some large projects on a system with these changes, and found the performance degradation was indeed almost totally gone!

Besides improving allocator fragmentation, object_caches will of course use exact-sized objects, whereas when going through the general allocator they will just use the next-largest size class; so these changes will lower memory usage. So this is really a memory fragmentation optimization, a memory usage optimization, and a performance optimization all at once.

### Memory: Avoiding `malloc` entirely

Besides adding object_caches to handle lifetimes in a better fashion, another way to improve `malloc` performance is ... to avoid calling `malloc` entirely. There are two changes from this past month which do just that, to the [_user_get_cpu_info](https://github.com/haiku/haiku/commit/fa146526b6159f735c349b63d1d54c5bc61c522e) and [_user_get_extended_team_info](https://github.com/haiku/haiku/commit/f4e3bb1cc668e93c443d461d562eaa7526cc2f45) syscalls. The first of these is used to get CPU usage information and is called 60+ times per second to display the CPU meter in Deskbar, the second is called by Terminal about 30 times per second, per tab to check the status of the running shell session. Both were using the `malloc`'ed memory for a bounce buffer, which we can avoid and copy memory directly, at the cost of a bit more complexity.

I also [inlined](https://github.com/haiku/haiku/commit/39665db167ff705c851bac241db7e118c2a20116) a few other data structures into their parent classes, which merged previously separate `malloc` calls at some critical spots.

Similar to frequent `malloc` usage, I also came across a part of the BFS driver that was creating threads periodically when it should have just [created a single thread at startup](https://github.com/haiku/haiku/commit/14b62ae4dafb0bed95849aedef783268aa278a66), and then signaled it with a semaphore afterwards.

### Disk write: Dynamic timeouts

The block_cache, used (as noted above) for the filesystem journal, inodes, metadata, and other such things, could quickly turn into the major bottleneck when doing long-running inode-affecting operations (like a Git checkout, or emptying trash, for instance.) While switching the block_cache to use an object_cache for more items, I noticed that it had a hard-coded 2-second timeout in-between write-backs, to avoid disk congestion (and to avoid writing back blocks that were likely to be modified again). This meant it could fill up and then applications would be stuck waiting for it to write out the dirtied blocks (which was the cause of the long-standing "Tracker stops and starts while emptying Trash"), among other slownesses. (Probably when this code was first written over a decade ago it was not as much of a bottleneck. :)

Now we [instead](https://github.com/haiku/haiku/commit/6d336fda4aca32649de3e1d91403da4452f4bef8) compute a dynamic timeout based on how long the last block writes took, which can be a 10x performance difference (on HDDs) or even a 100-200x performance improvement (on SSDs). There is still room for improvement here, in connecting our IO-Scheduler to the block-cache to more intelligently schedule such transfers and eliminate the timeouts altogether, but the new limit is very difficult to hit anyway, so this can wait until we've completed more passes through the whole system.

### Locking: Be granular

Data which multiple threads could access or modify at once is usually protected by a lock (or multiple locks). This protects threads from corrupting the data by modifying it simultaneously, but of course can have a significant performance impact if a long time is spent waiting for the same lock. So, when there are a small number of locks that a large number of threads spend a long time waiting for, it may make sense to try and change the locking semantics (or even the underlying data structure) to reduce the amount of time spent waiting for locks.

These changes are the trickiest to get right, but usually have the largest performance impact. I did some of these changes early this year, beginning with the [kernel thread hashtable](https://github.com/haiku/haiku/commit/568bb7eeab4b485d19492b8415d858cf6297fb11), transitioning it from a spinlock to a rw_spinlock; allowing multiple threads to look up, uh, threads, at once under most conditions. This had a sizeable impact on performance, as quite a lot of operations depend on getting the internal thread structure from a thread ID.

There was only one major "locking granularity" change I made this month, but it had a pretty sizeable impact: [remove the global condition-variable lock](https://github.com/haiku/haiku/commit/37eda488be1c9fee242e8e4bf6ca644dd13441d8), and replace it with locks on individual condition variables. This seemed to have the most sizeable impacts inside VMs, where it is a nearly 10+% across-the-board performance improvement (as condition variables are used rather commonly throughout the kernel.) It also had the most fallout out of all the changes, with a number of further commits required to clean up even more edge-cases the original commit missed, as well as other oversights in the kernel that it uncovered.

### Userland: Avoid calling the kernel

This is an area I didn't focus on as much this month, but while poking at semaphore usage, I happened to notice that the app_server's read/write locking class used *3* semaphores per instance. We have a good set of (sadly underutilized, again) userland mutexes (our equivalent of Linux's "futexes"), and so dropping this ancient custom locking code [in favor of rw_lock](https://github.com/haiku/haiku/commit/fd97a8c7fe51576b851bc00ea6a49b76d4434dcf) was a relatively easy change with some immediate resource-use benefits (for instance, every BBitmap required one of these, so now there will be 3 fewer semaphores used per bitmap.)

Creating a `rw_lock` does not touch the kernel at all, and locking it only does if there is lock contention, otherwise `rw_lock` is an entirely in-userland lock class. So this saves quite a bit of overhead.

### What's the numbers?

With a hrev from today (`hrev53340+2`), compiling HaikuDepot on an AMD Ryzen 7 1800X (`-j16`) with a hot disk cache yields:
```
real    0m15.303s
user    0m21.187s
sys     0m13.549s
```
But this is still with a standard "nightly" build (i.e. `KDEBUG_LEVEL=2`, which implies quite a lot of paranoid checks that have a noticeable impact on performance.)

kallisti5, who ran the tests above, did not have an easy way to get a "fair" comparison with Linux (on this machine, Haiku lives on a SATA SSD, whereas Linux lives on an NVMe SSD, because Haiku's NVMe driver was not merged at the time the machine was built), but a quick test showed Linux as being 30% faster. Hopefully when a new `KDEBUG_LEVEL=0` build is made and the SSD difference is eliminated, that percentage will drop in half, at least? :)

At any rate, 15 seconds to compile ~85 C++ objects and the mime-database (~250 text files) is nothing to be scoffed at!

## "Everything Else"

Well, that's it for this month's performance-related changes; and I expect there won't be a month this significant in that department for a while (I intend to now focus a bit more on security, where we have been more than lacking, and perhaps virtualization... ;). But this was, for everyone else, an otherwise "normal" month, and I even got a number of significant non-performance-related changes in. So let's see what else happened!

### Applications &amp; Libraries

KapiX implemented the "standard" shortcuts for word-wise delete in BTextView.

A new strings export was (finally) pushed to Pootle for translation, and following that, Humdinger made some tweaks to some of the new strings to make them more easily translated; specifically to make more use of `BStringFormat`, which allows for proper translation of plural forms.

PVS-Studio, the commercial static analysis system, did another build of Haiku through their system (the last one was a few years ago) and posted the results. PulkoMandy spent a bunch of time combing through it and fixing most of the items it reported; you can read more about that [on his blog](https://www.haiku-os.org/blog/pulkomandy/2019-07-27_new_pvs_studio_scan/).

Calvin Buckley, a new contributor, submitted a patch to display a better "pretty name" for CPUs in the AMD Zen family. Thanks!

The first changes from preetpal, our Outreachy intern, towards a unified "Input" preferences panel were merged. The Mouse and Touchpad preferences are working in the new panel, and there are patches under review for Keyboard and then the "PadBlocker" (previously a third-party application, used to block touchpad input while typing.)

Some (rather old) patches to DriveSetup to add more information to the partitions view, cleaned up by PulkoMandy and kallist5, were finally merged. Now a drive's encryption status, as well as the partition types, are more clearly indicated.

mt819 submitted patches to localize AutoRaise, which is now included in builds by default.

Ryan Leavengood, a long-time developer who had not committed any code for the past 6 years (or so), made a comeback with some usability fixes to Tracker, StyledEdit, and ShowImage. Welcome back, Ryan!

### Servers

PulkoMandy made some fixes to the buffering and streaming logic in the media_server and Media Kit.

### Drivers

I tweaked some of XHCI's internal thread priorities (likely only a significant change under heavy load), and (finally) implemented isochronous transfers in XHCI. Unfortunately it seems in the long period without a USB stack driver with working isochronous transfers, our USB audio driver has bitrotted... so you can't quite use USB headsets under Haiku just yet.

### Kernel

simonsouth (a returning contributor, welcome back!) contributed a fix for a boot failure on certain VMs and bare-metal systems under obscure circumstances, related to `ioctl` size-passing in the kernel.

### Build system

PulkoMandy added some notes and utilities for his work on SPARC.

## Other items

Besides code, there were two items of interest in the Haiku world in July:

 * probonopd, one of the creators of AppImage, wrote a very nice [series of articles](https://medium.com/@probonopd/my-first-day-with-haiku-shockingly-good-8930cad4bbb0) of his first impressions of Haiku this past month. It seems we'll be seeing more of him... :)
 * Haiku, Inc. finally released its [2018 Financial Report](https://www.haiku-inc.org/docs/haiku_inc-financial-report-2018.pdf). Let's aim for a bit earlier in the year next time... ;)

---

Thanks for reading, and see you next month!