+++
type = "blog"
title = "The Gerrit code review iceberg"
author = "PulkoMandy"
date = "2025-11-24 13:45:00+0100"
tags = []
+++

Recently some discussions on the forum led to asking about the status of our Gerrit code review.
There are a lot of changes there that have been inactive for several years, with no apparent
interest from anyone. To be precise, there are currently 358 commits waiting for review (note that
Gerrit, unlike Github and other popular code review tools, works on a commit-by-commit basis, so
each commit from a multiple-commit change is counted separately). The oldes tone has not seen any
comments since 2018.

Today, let's have a look at some of these changes and see why they are stalled. Hopefully it will
inspire someone to pick up the work and help finishing them up.

# [Change 122](https://review.haiku-os.org/c/haiku/+/122) - BTab: decouple display label from view name.

## What is this about

In Haiku's Interface Kit, usually, views have a name that is not visible to the user. This is
mainly used when exploring an user interface with the scripting facilities (for example with the
`hey` command).

When we added localization to Haiku, we made the choice to not translate these view names. This
makes it possible to write `hey` scripts that will work across all machines, no matter which
language the user has selected in the Locale preferences.

There's one case where the view name gets exposed to the user, however: that is how the label of
a BTab in a BTabView is selected. This change attempts to rectify this, by adding a way to set the
tab label separately from the name of the view being used as the tab content.

## Why is the change stalled

The original behavior (using the view name to set the tab label) is what's documented in the Be
Book. Moreover, BeOS allows to use BTab::SetLabel to set a label, and that will also rename the
view. Changing this would risk breaking some BeOS applications.

The idea implemented in this change is to work differently only if the BTab is part of a window
using the layout kit. This is an indirect way to detect that we're not in a BeOS application, since
the layout kit didn't exist in BeOS. It would be better to test for that in a more direct way.

The code also implemented separate storage for the extra fields needed to keep track of the tab
name. This seems unnecessary, since there is reserved space in the BTab class to store the data
inline. It would avoid extra allocations and code complexity (at the cost of a little extra work
in the class header to preserve ABI compatibility on both 32 and 64 bit systems).

The original author lost interest as the changes ended up being a lot more complicated than what
initially looked like a simple two-line fix. However, the issues have been identified, and applying
the requested changes should be easy enough.

# [Change 859](https://review.haiku-os.org/c/haiku/+/859) - build/OptionalPackage: Use llvm/clang packages when using clang/llvm

## What is this about

A very simple change to not include GCC in the Haiku image when compiling it with llvm/clang, and
instead include llvm/clang.

## Why is this change stalled

No one reviewed this. The use of clang/llvm to build Haiku is still not fully supported, and this
change is not required for it. It may also make sense to include both compilers.

As long as the llvm build of Haiku doesn't fully boot, this change can't be tested.

# [Change 1353](https://review.haiku-os.org/c/haiku/+/1353) - GSoC 2019: Implementing PCID in x86_64

## What is this about

PCID is a way to tell the CPU about the currently executing process. It allows to improve performance
and security, by tagging the entries in the TLB (the structure used by the CPU to manage virtual memory)
with the identifier of the running process. The CPU makes sure processes can't access another process
entries, and so, the OS doesn't need to remove all entries from the TLB on every context switch.

## Why is this change stalled

This was a very early proposal of changes for a GSoC project. The GSoC project did not go on further.
The changes (and the comments) can serve as a base for anyone interested in implementing PCID support
in Haiku.

# [Change 1437](https://review.haiku-os.org/c/haiku/+/1437) - usb-hid: add quirk for decus gaming mouse

## What is this about

This change adds a quirk to entirely replace the HID descriptor for a specific mouse.

## Why is the change stalled

One part of the change is applied incorrectly to all HID devices. While it may fix the one affected
by the change, it would likely break many other devices.

It is also unclear if the fixes are correct, as we have not found similar changes in other operating
systems where the same hardware is working fine. The user reporting the initial issue attached some
dumps of their mouse data, but they do not match the changes they did to the code. They have then
stopped replying to our questions.

This change will remain stalled until someone with the same mouse can investigate the problem and
explain the changes that were made.

# [Change 2102](https://review.haiku-os.org/c/haiku/+/2101) - Interface kit: do not update size on redraw

## What is this about

This removes code to trigger an update to a window size in the interface kit, that may not be needed.

## Why is this stalled

The app_server designer reviewed the change and remains unconvinced that the code is not needed and
safe to remove in all cases.

Further inspection is needed to determine in which cases the code may trigger, and attempt to reproduce
the possible issues (both the one that the change is trying to fix, and the regressions that may
appear by removing that code).

The change is not very long, but reviewing it properly requires deep knowledge of app_server inner
workings.
