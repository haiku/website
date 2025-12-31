+++
type = "blog"
title = "The Gerrit code review iceberg, episode 4"
author = "PulkoMandy"
date = "2025-12-31 23:30:00+0100"
tags = []
+++

Welcome to most likely the last blog post of the year!

We continue our exploration of old change requests on the Gerrit code review tool that have been
waiting for several years for someone to pick them up and get them merged. There are currently
350 commits awaiting review in the code review tool. The oldest one is now untouched since
early 2019.

First of all, let's look at updates for the changes from the previous blog post in the series:
one of them has found a new owner, and DriveSetup may soon get its long awaited menu to read
and write disk images to partitions!

In this and the next blog post we will be looking at changes that have been untouched since late
may of 2021.

# [Change 430](https://review.haiku-os.org/c/haiku/+/430) to [Change 436](https://review.haiku-os.org/c/haiku/+/436) - Add beginnings of a Linux compat library

## What are these about?

These introduce a compatibility layer to port Linux drivers to Haiku, as we already do for OpenBSD
and FreeBSD. This involves reimplementing a lot of the logic present in the Linux kernel, or at the
very least, redirecting the needed APIs to use our existing equivalent code.

This part of the changes only added a few basic support classes, nothing that would actually allow
porting any useful driver from Linux, as there is no support for interfacing with the hardware.

The last two changes attempt to use that API to start porting the DRM kernel infrastructure from
Linux, with the idea to use it for 3D acceleration.

## Why are the changes stalled?

This is only a very early work, far from being useful for anything at all.

Porting drivers from Linux creates difficulties. The first one is legal: the drivers can be under
the GPL license, while Haiku prefers to use MIT or other BSD style licenses as much as possible.
The second and more important one is technical: Linux does not have a stable API between the drivers
and the kernel. Indeed, their policy is that all drivers should be upstreamed, so that kernel
maintainers can freely change the interface and refactor the drivers as needed.

This makes compatibility layers like this one usually tied to a specific version of Linux and the
corresponding drivers. Migrating to drivers for a newer version of Linux would need major changes
to the compatibility layer.

Finally, the DRM part looks like it may already be obsolete: the rendering stack has moved on from
DRM to other interfaces that may be easier to set up in Haiku. So this code explored a path that
ended up not being the right one. It may still be useful until another 3D acceleration solution
finally takes its place, beyond the proof of concept level.

# [Change 339](https://review.haiku-os.org/c/haiku/+/339) - A simple solution to the Shortcuts localization problem

## What is this about?

The Shortcut application stores shortcuts in its setting file with their localized names.

This means the settings become invalid if you change your system language, as the new translation
does not match the existing settings, and shortcuts may stop working.

## Why is this change stalled?

This change tries to fix that in a simple way, but it requires "reverse" translation (from a localized
string back to an English one). Ideally, this should not be necessary. The settings file could always
store english text, or some numeric values, for example. The translation should be done only at the
user interface level, when showing the shortcut actions to the user.

# [Change 477](https://review.haiku-os.org/c/haiku/+/477) - radeon_hd: testing framebuffer config

## What is this about?

A very simple change to tweak some bits in a video card register in the radeon_hd driver.

## Why is this change stalled?

The change lacks any explanation of why these bits should be changed. There is also no feedback
from users confirming if it fixes (or breaks) anything.

Someone should dig into the video card documentation to confirm what the register does and how it should be set.

# [Change 102](https://review.haiku-os.org/c/haiku/+/102) - EHCI USB: process the extended capabilities chain

## What is this about?

This adds support for multiple "extended capabilities" PCI registers in EHCI (USB2) controllers.

## Why is this change stalled?

The only comment (from the change own author) says "needs rework and testing". It seems no one else
has found a need for these registers so far.

# [Change 3355](https://review.haiku-os.org/c/haiku/+/3355) - fs_shell for ext2

## What is this about?

When working on filesystem code, it is sometimes useful to run the code outside of a fully running
Haiku environment. This is typically done by building an fs_shell, an application that embeds the
filesystem code and adds a simple command line on top of it to allow exercising specific parts of
the code.

This change adds one such shell for the EXT2,3,4 filesystem driver.

## Why is this change stalled?

This change actually contains only a few Jamfiles to prepare the build of the fs_shell. It does not
yet make any attempt to adjust the code to build in an fs_shell context, as was done for other filesystems. In its current state, it is not useful.

Moreover, the EXT2 driver is actually quite mature. It is uncleaar wether a simple command line
interface to it would be useful for anything, as issues are more likely to araise in "real world"
situations (such as performance problems with huge number of files). As a result, there has not
been a lot of interest recently for finalizing this.

# Conclusion

That's all for this time! The next episode will look at the remaining changes from may 2021, before
moving on to june. I should mention that these changes got some activity in 2021 only because that's
when the "commit checker robot" was introduced, and started checking every change for coding style
problems. That explains why there are so few changes marked as older than 2021. So we will spend quite
some time there.
