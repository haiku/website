+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Progress Report #3"
author = "Trung Nguyen"
date = "2023-07-02"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

# Project status overview

During this period, I have been working to get the Release build of .NET SDK to work more stably.
I have identified some issues related to POSIX thread scheduling in Haiku in the process. Sadly,
I cannot deliver stable builds of the SDK at the moment because that depends on edge-triggered
file events.

As mentioned on my
[forum thread](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/73), I have ported some
sample applications of popular C# frameworks such as GtkSharp or FNA. Some other apps are a bit
tricky since they rely on native components. I will not explore these ports as part of GSoC; it is
the HaikuPorts community's job to port native libraries.

On the .NET side, my pull requests to `dotnet/runtime` are starting to be reviewed. I am still
keeping my code for both repos up to date.

I am also working on generating Haiku API bindings for .NET. This is quite a complicated task
because of the reasons explained below.

# Technical details

## POSIX thread scheduling

Previously, `pthread_getschedparam` would always return `SCHED_RR`. Applications would then
attempt to get the scheduling parameter ranges using `sched_get_priority_*` APIs. When setting
these priority values, some threads would unintendedly become realtime threads. Having many
of these threads can make the system unstable.

I have fixed `libroot.so` to return `SCHED_OTHER` if the target thread's priority is not a
BeOS-style realtime priority, `SCHED_RR` otherwise. This makes `pthread_[g/s]etschedparam` more
consistent with `sched_get_priority_*`.

## Edge-triggered file events

It seems like .NET uses edge-triggered polling with `EPOLLET`, or the equivalent `EV_CLEAR` for
platforms with `kqueue`.

This means after an event has been read by the user, it will not be returned by the polling
function a second time, even when there is more data to be read from/more data can be write to the
file descriptor. The event will only be re-triggered when another write/read actually occurs on the
other end.

This property cannot be satisfied by the current `poll` workaround. For `poll`, it is not possible
to distinguish between two different events in two calls and the same unchanged event in two calls.
Therefore, .NET tries to loop again and again and handles the same event over and over, starving
CPU resources and preventing other threads from running.

Implementation of a `epoll`/`kqueue`-like API seems to require some breaking changes in the kernel
driver API, as described in a WIP [patch](https://review.haiku-os.org/c/haiku/+/1742) by
waddlesplash. I do not understand all the delicate details of it, so I decided not to attempt it on
my own. Furthermore, waddlesplash said on the IRC channel that he would come to implement this
soon some day; I will wait for his works before finalizing Release builds of the .NET SDK.

## Network status watching

In the previous blog, I mentioned using `start_watching_network` to implement .NET's
`NetworkChange`.

It turns out to use this class, a lot of other APIs need to be present; otherwise, .NET would just
throw a `PlatformNotSupportedException`. These APIs are used to retrieve IP statistics and
enumerate network adapters.

Haiku supports some of BSD's network APIs such as `AF_LINK` sockets and certain `ioctl`s. However,
other APIs are hidden in private headers for some reasons, or simply do not exist. BSD also uses
`sysctl` to retrieve various attributes, for which I do not know the Haiku equivalent.

Therefore, I have removed the entire network status watching code. A branch containing my WIP
effort is available
[here](https://github.com/trungnt2910/dotnet-runtime/tree/dev/trungnt2910/haiku-networkinformation),
if anyone ever needs to use `System.Net.NetworkInformation` on Haiku.

## UNIX datagram sockets

While waiting for new file descriptor monitoring APIs, I have implemented `SOCK_DGRAM` for
`AF_UNIX` on Haiku. Details can be found on this
[patch](https://review.haiku-os.org/c/haiku/+/6617) and the discussion that follows.

## Memory region cloning

I have also submitted a patch that adds a `_kern_remap_memory` syscall to Haiku that solves
the problems mentioned in the previous blogs. The syscall has been tested to work with a
special build of .NET.

The syscall (renamed to `clone_memory` after some suggestions) is currently under review and
debate.

Arguments against it include it being unnecessary, which is surely not the case in my opinion
becasue there are certain tasks .NET needs to to (mentioned in the previous blogs) that no
other Haiku APIs provide.

There are also concerns about security (as it can operate on multiple address spaces) and the fact
that this API does too many tasks. For this, I have
[proposed](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/68) an alternative method of
splitting this API into BSD-style `mremap`, GNU extension `process_vm_readv`, and a custom syscall
to commit memory.

## Haiku API bindings

After considering various previous efforts to generate Haiku API bindings to other languages
(mainly Perl, Python, and Ruby, but no C#/Java), I decided to use
[`CppSharp`](https://github.com/mono/CppSharp/) instead of SWIG.

`CppSharp` takes care of all ABI and marshalling details. What I need to do is to run custom
passes to remove problematic symbols (mainly anonymous enumerations and non-member functions).

A proof-of-concept app has been built. However, to make the bindings truly usable, I need to find a
way to convert macros into constant variables, which I am currently doing. This task is a bit more
complicated than it seems because macros can expand into more macros or even the results of inline
functions. For example:

```cpp
const uint32 _VIEW_TOP_					= 1UL;
const uint32 _VIEW_LEFT_				= 2UL;
const uint32 _VIEW_BOTTOM_				= 3UL;
const uint32 _VIEW_RIGHT_				= 4UL;
const uint32 _VIEW_CENTER_				= 5UL;

inline uint32 _rule_(uint32 r1, uint32 r2, uint32 r3, uint32 r4)
	{ return ((r1 << 12) | (r2 << 8) | (r3 << 4) | r4); }

#define B_FOLLOW_NONE 0
#define B_FOLLOW_ALL_SIDES	_rule_(_VIEW_TOP_, _VIEW_LEFT_, _VIEW_BOTTOM_, \
								_VIEW_RIGHT_)
#define B_FOLLOW_ALL		B_FOLLOW_ALL_SIDES
```

`B_FOLLOW_ALL` is an important macro as it is the default value of some parameters, such as
`BTabView::BTabView()`:

```cpp
    BTabView(BRect frame, const char* name,
        button_width width = B_WIDTH_AS_USUAL,
        uint32 resizeMask = B_FOLLOW_ALL,
        uint32 flags = B_FULL_UPDATE_ON_RESIZE
            | B_WILL_DRAW | B_NAVIGABLE_JUMP
            | B_FRAME_EVENTS | B_NAVIGABLE);
```

It would be nice for Haiku to make its headers a bit more binding-friendly by:
- Convert all macros to `const` (or `constexpr` if C++11 or later is detected) variables.
- Give all enumerations a name.
- Remove all non-literal default parameters. There are certain parameters that use a `struct` as
the default value.

# Conclusion

The original plan was to ensure a stable runtime, libraries, and SDK before proceeding to ports
and bindings. However, with `epoll`/`kqueue` blocking stable SDK builds (which are required to
bootstrap the runtime and run library tests), I have to proceed with ports and bindings. This also
means that all .NET applications on Haiku need to be cross-compiled for a while.

Once again, I might have left some points behind, if there are any questions about any part of my
port, feel free to leave them in the comments section.

### Appendix - Pull requests/patches

Like the previous blog, I will have a list of pull requests/patches. Those that have been included
in the previous blog (pending and still pending now, or already merged) are not displayed here.

#### Merged
##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/vm: handle page protections in cut_area (#6395)](https://review.haiku-os.org/c/haiku/+/6395)
- [kernel/vm: check if page is in area (#6496)](https://review.haiku-os.org/c/haiku/+/6496)
- [libroot: fix pthread_[g/s]etschedparam (#6556)](https://review.haiku-os.org/c/haiku/+/6556)

##### [dotnet/runtime](http://github.com/dotnet/runtime)
- [[libs] Fix poll events conversion (#86843)](https://github.com/dotnet/runtime/pull/86843)
- [[VM] Fix potential undefined behavior (#87119)](https://github.com/dotnet/runtime/pull/87119)

#### Pending
##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/vm: Add clone_memory syscall (#6616)](https://review.haiku-os.org/c/haiku/+/6616)
- [unix: Implement datagram sockets (#6617)](https://review.haiku-os.org/c/haiku/+/6617)
