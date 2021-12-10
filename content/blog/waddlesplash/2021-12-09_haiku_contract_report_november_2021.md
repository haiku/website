+++
type = "blog"
title = "Haiku Contract Report: November 2021"
author = "waddlesplash"
date = "2021-12-09 21:00:00-04:00"
tags = ["contractor"]
+++

PulkoMandy has already written the [activity report](/blog/pulkomandy/2021-12-02-haiku_activity_report_november_2021/) for this month, so now I am once again left to detail the work I have been doing thanks to the [generous donations](https://www.haiku-inc.org/donate/) of readers like you (thank you!).

<!--more-->

This report covers all of November 2021. There's quite a lot this month, and even more that I started on this month but was not merged or quite finished before the month was over.

Let's recap.

## End-user-facing changes

### "New" NTFS driver

I started on this in October, but it was only merged last month.

While the new driver still uses NTFS-3G internally, so in a sense it isn't at all "new", I did completely rewrite all the Haiku-specific code from scratch, making better use of NTFS-3G's code, and also utilizing our filesystem caching layers, more robust error checking and handling mechanisms, and plenty of other improvements.

All known kernel panics that were caused by the driver are now fixed (including the infamous ones related to file deletion), timestamp handling bugs are resolved, and performance is radically improved. The driver also now automatically falls back to mounting volumes as read-only if they cannot be mounted read-write (e.g. because Windows is hibernated to the partition. In addition, memory mapping files is now supported, so you should now be able to run `git` operations on NTFS drives.

I did not run any benchmarks, but I would bet that Haiku's "NTFS-3G-based" driver is considerably faster than NTFS-3G itself running in FUSE mode, as it is a full kernel-based filesystem driver and acts like it, which cuts out most of the downsides that it has on Linux. (Someone asked me about the new Linux in-kernel NTFS driver, and while I did glance at it, it seems to be highly tied to the Linux kernel itself, while NTFS-3G is already portable; and secondly, a good number of its performance advantages are likely due to being in the kernel in the first place. So at least for now, it makes much more sense to stick with NTFS-3G instead of trying to port something else.)

### NVMe TRIM support

This one is pretty straightforward: I implemented and enabled support for `fstrim` in the NVMe driver. I only did some *very* basic testing on it, and while it didn't destroy my data in those tests, I would advise some basic caution when using it "in the wild." (Our whole TRIM implementation at higher layers is itself a little experimental, for that matter!)

This means the NVMe driver is functionally "complete." While there are still things that could be done to improve it, it now supports all major I/O calls and seems to perform admirably on real hardware. (The machine I am typing this on has a Haiku install on its primary NVMe drive, for that matter.)

### A few FAT driver fixes

Spurred on by the NTFS overhaul and some of the other filesystem-related changes I did this month thanks to the GCC 11.2 upgrade (itself detailed below), I noticed some low-hanging fruit in the FAT driver that could be fixed without too much effort. Some of this was just code cleanup, but there was an obvious cause of deadlocks that I resolved (which closed an open ticket or two on the bugtracker) while I was at it.

### HaikuPorts: FreeRDP

I saw a commenter on a forum lamenting that they could not connect to some Windows machines via RDP from Haiku; none of the tools they installed seemed to work. I remembered we had a FreeRDP port, but indeed it was a few years out of date, so I spent about half a day cleaning up the port and bringing it in line with the latest version. (The port is "Haiku-native", and unfortunately not upstreamed, so things had diverged somewhat in the newer version.)

### HaikuPorts: Tk

I got a bit tired of only being able to use the Git CLI, so I took a look to see if `Tk`, the user interface system for `Tcl` which `git gui` uses, could be ported (I tried a few years ago and was unsuccessful.) Well, this time I managed to get the SDL-based version of Tk to start, and `git gui` works just fine, so I uploaded a new recipe and added a package for `git gui` too.

Working on porting Tk, though, sent me down a path investigating some rather curious things. Notably, Tk does not have "proper" GUI-toolkit abstraction internally; instead it just emulates Xlib, the X11 interface library, on platforms that are not X11. I had wondered if this was feasible previously, and had found some prototype implementations of such a thing elsewhere, but Tk clearly makes it work (and notably not with a particularly small subset of the Xlib API, either.)

So, I wondered if we might be able to do something similar on Haiku, in order to port X11 applications (or even entire toolkits...) without writing separate "native" backends for each and every one, and also without running an entire X11 server in the background. After some experimentation, I think this is indeed more than feasible, though we'll see how far I manage to take it and how quickly...

## Internals changes

### GCC 11.2 upgrade

This occupied probably the largest amount of my time last month (and it was not completed until just a few days ago, so, expect to see more about this in next month's progress report.)

While HaikuPorts has been building software with GCC 11 since the end of October, Haiku itself was still built with GCC 8.3. Upgrading the compiler used to build Haiku itself is much trickier, as usually there are new warnings and errors that must be fixed, compatibility flags that have to be adjusted, various slight differences in compilation that make not much difference to most applications but cause serious problems for kernels ... the list goes on.

Overall there were quite a lot of commits made, mostly by me, to fix the uncovered issues and bring our code in line with the newer compiler. One problem in particular was especially annoying: a crash caused by an "incorrect" string optimization (we were technically violating the specification, so, it is not entirely GCC's fault here), and this wound up resulting in changes to how our filesystem drivers pack `dirent` structures in order to try and catch the problem as an error instead of just a mild warning in the future. Then once images were built, they failed to boot due to optimizations in `libroot` causing infinite recursion. So on, and so forth, etc.

I had hoped that, once the errors were resolved and images booted, that we could just merge the new version and forget about all of this for another few years. Well, no such luck: it has now been reported that WiFi is broken on the nightly builds, and kallisti5 and I have determined that GCC 11 is definitely the cause of that. I have not even investigated this yet (and it seems Clang, which is what FreeBSD themselves use these days, does not cause this problem -- though, the FreeBSD developers noted when I mentioned this that, presuming the optimization is legitimate, eventually Clang will probably see it too.)

So, stay tuned for whatever the conclusion to this saga is next month, as it should all be resolved by then. Err, I hope it is, anyway... this is already the most time-consuming GCC upgrade I've ever had to deal with for Haiku.

### Kernel ConditionVariables refactor (round 2)

This one is "round 2" because round 1 was way back [in 2019](/blog/waddlesplash/2019-08-03_haiku_activity_report_july_2019/), when I first started investigating performance bottlenecks in the system. That resulted in a version of the ConditionVariables code with a spinlock not only for every Variable, but also for every Entry as well, which meant it became quite tricky to avoid deadlocks when both the Entry and the Variable were "awake" and trying to manipulate state!

It turns out, it was too tricky. The NVMe driver's extremely-low-latency use of ConditionVariables finally exposed some latent bugs in this implementation (though, strangely, only kallisti5 was able to reproduce them with any frequency, I'm not sure if anyone else ever encountered them.) So, armed with a few years' more knowledge and a better idea about how to think about multithreaded synchronization primitives, I set out to rewrite this critical piece of code once again. The new version merged last month eliminates the second lock, and greatly streamlines how synchronization works, even if it did take quite a bit of time to puzzle through.

There is a bit of history repeating itself, though, because just like last time, the version that first made it into the tree was not entirely polished. There was only one genuine implementation bug that sneaked in, which (hopefully) should be resolved at this point, (I have not heard back from the ticket reporter in question as to whether it is.) However, the new version of the code also contains "timeouts" that trigger (continuable) kernel panics when synchronization takes too long to complete, and on some lower-end systems, at least in VMs, these still fire.

Perhaps when the "book is closed once more", so to speak, I will take the time to write a blog post just about the ins and outs of ConditionVariables as thread synchronization primitives, and the implementation thereof. For now, you can read my (highly detailed) commit messages and then the inline comments on these changes themselves, which are relatively verbose, though they do assume a certain amount of knowledge about kernel programming.

### `B_CLONEABLE_AREA` no longer set by default

On Haiku, the basic unit of memory management is an "area" (well, there are lower-level ones, but those are only accessible in the kernel, and anything userland sees is going to be an "area".) POSIX memory routines, like `mmap`, will ultimately cause areas to be created and manipulated (whether they do so explicitly or ask the kernel to do so on their behalf.)

One feature Haiku inherited from BeOS was that areas can be cloned, whether to one's own process or a totally separate one. On BeOS, this was completely uncontrolled: you could clone any area into any other process, even if it was an area you didn't have any access to previously! That's not very secure...

Haiku developed facilities to prevent kernel areas from being accessed by userland years ago, but userland's areas were left unprotected. Some years ago I extended that protection to userland, but by default, this was disabled so that we could update the various applications that needed to be adjusted for this change.

Most of them have now been fixed, so now by default, we can block areas from being cloned that do not have the `B_CLONEABLE_AREA` permissions flag set. In the future we should of course extend these permissions checks even further, but while Haiku is a largely multi-user system, this is "good enough" for now.

### Miscellaneous cleanups...

As is usual during the course of development, I also made quite a lot of miscellaneous cleanups to various things around the tree. These were even more scattered and random than in previous months, thanks to the GCC 11 upgrade shaking all sorts of things out of the woodwork and leading to a variety of followup changes. Check the commits log for more information!

## What's next?

Too much! I reached the point last month where I realized that all the things I have stacked up on my TODO list (and elsewhere) that both need to be done and that I am capable of doing are more than multiple years of work (which, well, I already knew to be theoretically true, but now there practically are, as well.)

We will see where my experiments with trying to port more GUI toolkits (with an eye for one in particular...) lead.

Other than that, as X512's experiments with hardware 3D graphics acceleration seem to be working out (and I own some AMD Radeon hardware myself), it's likely that I will wind up helping him out with that in one way or another.

And then the holiday season is around the corner, which may put a bit of a damper on how much I do -- after all, as this is now my day job, I should take a break from it on the weekends and holidays, instead of before when I on breaks from my day job I did this stuff.  :)

### Whew...

And once again this report is over 2000 words. But all of you seem to have appreciated them thus far, so I'll stick to this style. Thanks once again for all your support!
