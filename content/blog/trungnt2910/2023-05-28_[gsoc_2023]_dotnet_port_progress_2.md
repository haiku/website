+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Progress Report #2"
author = "Trung Nguyen"
date = "2023-05-28"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

# Project status overview

## Completed tasks

The .NET SDK has been ported to Haiku after a few hacks. .NET on Haiku now has the ability to run
Roslyn and build a simple console application.

.NET latest builds for Haiku are being provided at
[trungnt2910/dotnet-builds](https://github.com/trungnt2910/dotnet-builds). You can follow the
instructions there to install and try out .NET.

## Current plans

Before proceeding to the next step, I want to ensure the stability of the current SDK by
bootstrapping .NET on Haiku.

Having a working .NET SDK also means that more tests, particularly managed library tests,
can be run.

# Technical details

## Updates from previous post

### `MALLOC_SIZE`

After my previous blog was published waddlesplash pointed out that `malloc_usable_size` was
[available](https://github.com/haiku/haiku/blob/86574d08dda8976f2fe406fee0ccd1febe3aeb77/headers/posix/malloc.h#L24)
on Haiku. After more investigation it seems that the CMake configure scripts failed to detect this
function due to it being guarded under `_GNU_SOURCE`. This has been addressed in my latest branch.

### Process unique identifiers

Haiku had a recent change (which will be discussed later) that allows processes to retrieve the
start time of each other. The `area_id`-based hack has therefore been removed.

## New work

### `System.Diagnostics.Process`

This is an important core library required by the `dotnet` CLI tool. Despite being written in C#,
it contains a lot of direct "interop" calls to native system APIs. Its implementation is therefore
highly specific to each OS.

#### Thread priority conversion

[Windows](https://learn.microsoft.com/en-us/windows/win32/procthread/scheduling-priorities#base-priority)
uses a scheduling system with two priority values: One priority class for the process, and another
priority level for each thread. These two values are then combined to determine the kernel's
scheduling strategy.

.NET on Unix does not seem to distinguish between process and thread priorities. On Linux, it
simply reads the `nice` value from `procfs`.

On Haiku, process priority is obtained using the `getpriority` POSIX function. Haiku uses a
complicated
[algorithm](https://github.com/haiku/haiku/blob/402b41562c95a677085bbbc82b0d20b2283d9385/src/system/libroot/posix/sys/priority.c)
to convert between BeOS priority values and POSIX nice values.

For thread priority, .NET uses the native Be API, `get_thread_info`. The raw BeOS values are then
converted to .NET Windows-style values:

```cs
    (info.priority >= (int)Interop.OS.BPriority.B_REAL_TIME_DISPLAY_PRIORITY) ? ThreadPriorityLevel.TimeCritical :
    (info.priority >= (int)Interop.OS.BPriority.B_URGENT_DISPLAY_PRIORITY) ? ThreadPriorityLevel.Highest :
    (info.priority >= (int)Interop.OS.BPriority.B_DISPLAY_PRIORITY) ? ThreadPriorityLevel.AboveNormal :
    (info.priority >= (int)Interop.OS.BPriority.B_NORMAL_PRIORITY) ? ThreadPriorityLevel.Normal :
    (info.priority >= (int)Interop.OS.BPriority.B_LOW_PRIORITY) ? ThreadPriorityLevel.BelowNormal :
    (info.priority >= (int)Interop.OS.BPriority.B_LOWEST_ACTIVE_PRIORITY) ? ThreadPriorityLevel.Lowest :
    ThreadPriorityLevel.Idle;
```

This yields a different result from what would be obtained from converting a converted `nice` value
to a .NET Windows-style value, but these two values are not designed to be on the same anyway.
Processes use the `ProcessPriorityClass` enum while threads use the `ThreadPriorityLevel`
enum.

Another thing to notice is the way process priorities and thread priorites work. On Windows, you
can get a thread with medium priority by first setting the thread priority to `Highest`, and then
set the process priority class to `BelowNormal`. The two values are then combined to form a
priority value of 8.

On Haiku, you will receive a low priority thread instead. The first call is passed to
`set_thread_priority` to promote the target's priority. Then, the second call is passeed to POSIX
`setpriority`, which is implemented by `set_thread_priority` in a `get_next_thread_info` loop.
Haiku/BeOS has no concept of a Process/Team level priority, instead, all member threads have their
priority values changed.

#### `team_info` extensions

`struct team_info` has [recently](https://review.haiku-os.org/c/haiku/+/6390) been modified into
this:

```cpp
typedef struct {
	team_id			team;
	int32			thread_count;
	int32			image_count;
	int32			area_count;
	thread_id		debugger_nub_thread;
	port_id			debugger_nub_port;
	int32			argc;
	char			args[64];
	uid_t			uid;
	gid_t			gid;

	/* Haiku R1 extensions */
	uid_t			real_uid;
	gid_t			real_gid;
	pid_t			group_id;
	pid_t			session_id;
	team_id			parent;
	char			name[B_OS_NAME_LENGTH];
	bigtime_t		start_time;
} team_info;
```

This change allows `System.Diagnostics.Process` to retrieve most of its important properties. Some
missing attributes, which are not supported on many other platforms as well, will be listed below.

The related syscalls, `_kern_get_team_info` and `_kern_get_next_team_info` are also modified to
take a `size_t` parameter. This maintains binary compatibility with applications using the old
`struct`, but also makes these syscalls more versatile by allowing uses such as:

```cs
/// <summary>
/// Gets team IDs.
/// </summary>
/// <param name="cookie">A cookie to track the iteration.</param>
/// <param name="team">The integer to store the retrieved team ID.</param>
/// <returns>Returns 0 on success. Returns an error code on failure or when there are no more teams to iterate.</returns>
internal static unsafe int GetNextTeamId(ref int cookie, out int team)
{
    fixed (int* p = &team)
    {
        return _get_next_team_info(ref cookie, p, (nuint)sizeof(int));
    }
}
```

The official macro,
[`get_next_team_info`](https://github.com/haiku/haiku/blob/402b41562c95a677085bbbc82b0d20b2283d9385/headers/os/kernel/OS.h#LL275C1-L276C56),
is not available to C# code, so usage of the symbol `_get_next_team_info` is inevitable. When this
internal function is used though, we can save a few dozen bytes when we only need to enumerate
PIDs.

### Haiku virtual memory bugs

Haiku had quite a few memory bugs related to area cutting (caused by `mmap(... MAP_FIXED ...)`)
and partial area protections (caused by `mprotect`). Fixing these bugs was a significant portion
of the project's time and effort.

If you are curious about the technical details of these bugs, check out the patches with
`kernel/vm` in the appendix below.

### Stateful polling

Haiku does not support a [stateful object monitoring](https://dev.haiku-os.org/ticket/16846)
syscall such as `epoll` or `kqueue`. We therefore have to maintain the monitored file descriptors
on the userland and pass it to `poll` every time we need to wait for an event.

Luckily, the API exported by .NET does not assume file descriptors but passes `intptr_t` handles.
This means we can pass handles to this `struct` instead of FDs:

```cpp
typedef struct
{
    pthread_mutex_t Lock;
    pthread_cond_t Cond;
    size_t Count;
    size_t Capacity;
    struct pollfd* Fds;
    uintptr_t* Data;
} SocketEventPort;
```

The mutex is used to guard the interest list on modifications. Each time the application wants
to wait, the lock is also acquired, the interest list is copied, and then the lock is released
before `poll` is called.

The condition variable allows this implementation to satisfy a condition that comes naturally
with `epoll`: When the interest list is empty, the thread should be blocked until another thread
adds an `fd` _and_ an event occurs on that descriptor.

### `struct dirent`

Haiku's `struct dirent` is declared as:

```cpp
typedef struct dirent {
	dev_t			d_dev;		/* device */
	dev_t			d_pdev;		/* parent device (only for queries) */
	ino_t			d_ino;		/* inode number */
	ino_t			d_pino;		/* parent inode (only for queries) */
	unsigned short	d_reclen;	/* length of this record, not the name */
#if __GNUC__ == 2
	char			d_name[0];	/* name of the entry (null byte terminated) */
#else
	char			d_name[];	/* name of the entry (null byte terminated) */
#endif
} dirent_t;
```

Because `d_name` is declared as a variable length array, `sizeof(struct dirent)` does not represent
the size of a buffer required to safely pass to `readdir_r`. We therefore have to add `NAME_MAX`
bytes to get the actual required buffer length:

```cpp
int32_t SystemNative_GetReadDirRBufferSize(void)
{
#if HAVE_READDIR_R
    // dirent should be under 2k in size
    assert(sizeof(struct dirent) < 2048);
#if HAVE_DIRENT_NAME_SIZE
    // add some extra space so we can align the buffer to dirent.
    return sizeof(struct dirent) + dirent_alignment - 1;
#else
    // add some extra space for the name.
    return sizeof(struct dirent) + NAME_MAX + dirent_alignment - 1;
#endif
#else
    return 0;
#endif
}
```

Failure to do this would result in strange behavior such as managed heap corruption.

## New stubs

### `RLIMIT_RSS`

Haiku does not support `RLIMIT_RSS` (a BSD extension), therefore
`System.Diagnostics.Process.MaxWorkingSet` and
`System.Diagnostics.Process.MinWorkingSet` are left unimplemented on Haiku.

### Processor affinity

Haiku does not seem to provide an API to set which processor cores a process is allowed to run on,
making it impossible to implement `System.Diagnostics.Process.ProcessorAffinity`.

### Thread start time

The changes mentioned above only tracks team/process start time and not thread start time.
`System.Diagnostics.ProcessThread.StartTime` is left unimplemented on Haiku.

### `getdomainname`

Haiku does not support NIS domain names. Furthermore, on my test WSL instance, `getdomainname`
returns an empty string and .NET still works fine. Therefore, I believe it is safe to stub this
function on Haiku.

### `SOCK_DGRAM`

Haiku [does not support](https://dev.haiku-os.org/ticket/18204) datagram UNIX domain sockets. .NET
would then
[think](https://github.com/dotnet/runtime/blob/e96321db982c3add192381f6ea4ff0a999ee1410/src/libraries/Common/src/System/Net/SocketProtocolSupportPal.Unix.cs#LL22C1-L27C14)
that the whole `AF_UNIX` family of sockets are unsupported on Haiku.

The workaround currently used is to check for `SOCK_STREAM` in addition to `SOCK_DGRAM` if the
returned error is `EPROTONOSUPPORT` or `EAFNOSUPPORT`.

### IPv6

Despite defining all the standard constants in compile-time, Haiku does not have full IPv6 support.
Some operations that .NET requires (`setsockopt` with
[`IPV6_V6ONLY`](https://github.com/haiku/haiku/blob/86574d08dda8976f2fe406fee0ccd1febe3aeb77/src/add-ons/kernel/network/protocols/ipv6/ipv6.cpp#LL1089C1-L1090C22))
is currently stubbed.

Luckily, .NET already exposes a switch to disable IPv6, `DOTNET_SYSTEM_NET_DISABLEIPV6=1`, so no
ugly source changes are required.

### Double mapper

.NET has a strange feature that allows mapping the same physical pages once with read-write and
another time with read-exec called the "double mapper". On macOS, it is cleanly implemented using
`vm_remap`. On other UNIXes, a workaround using a shared memory file is used instead.

The implementation for Haiku currently follows the shared memory file path, but this causes
problems on `fork` and also somehow makes the system unstable after multiple usage.
Haiku has a method to clone virtual address pages (`clone_area`), but this function only allows
cloning one area at a time, while .NET needs to atomically clone arbitrary ranges of pages.

In my opinion, the ideal fix is a new syscall,
[`_kern_remap_memory`](https://www.haiku-os.org/blog/trungnt2910/2023-05-14_gsoc_2023_dotnet_port_progress_1#solution-with-requested-syscall),
that I have mentioned in my previous blog. For a while I thought I could make an attempt to
implement this, but I was stuck on the problem of potentially having to merge two `VMCache`s.

For now, I will just disable this feature to focus on the main goal of this project. This
is done by applying the environment variable `COMPlus_EnableWriteXorExecute=0`.

If anyone is interested with the problem on `fork`, this is the trace generated by running
`dotnet build` with double mapping enabled:

```
[  3707] fork() <unfinished ...>
[  3696] <... mutex_switch_lock resumed>  = 0x80000009 Operation timed out (100353 us)
[  3696] mutex_switch_lock([0x1], [0x1], "pthread condition", 0x10, 0xb832be1) <unfinished ...>
[  3707] <... fork resumed>  = 0xe7f (119574 us)
[  3711] area_for(0x11353d60e000) <unfinished ...>
[ The usual ritual of a newly forked process that 3711 is doing... ]
[  3707] --- SIGSEGV (Segmentation violation) {si_signo=SIGSEGV, si_code=SEGV_ACCERR, si_errno=0x80001301, si_pid=3689, si_uid=0, si_addr=0x19bd45bb438, si_value=(nil)} ---
[  3711] map_file("dotnet_seg1rw", [0x75da827000], B_EXACT_ADDRESS, 0x1000, B_READ_AREA
```

The latest reference to the faulting address before crashing:
```
[  3689] set_memory_protection(0x19bd45b8000, 0x4000, B_READ_AREA|B_EXECUTE_AREA) = 0x0 No error (199 us)
[  3689] set_memory_protection(0x19bd45bc000, 0x4000, B_READ_AREA|B_WRITE_AREA) = 0x0 No error (188 us)
```

`si_code` is `SEGV_ACCERR` so the pages have not been unmapped. It has something to do with the
protection of these pages. Also, note that the crashing process is the **parent**, not the newly
`fork`ed child.

# Conclusion

The past few weeks have been quite challenging, one bug after another. I started writing this
blog on 28/05/2023, but one bug came after another, all of which touch delicate aspects of either
Haiku or .NET.

On the bright side, a factor that I was worried about in my proposal - the rapid change of .NET -
did not seem to affect the Haiku port. Sure, `dotnet/runtime` still gets thousands of lines of diff
daily by numerous contributors, but these changes do not seem to touch core infrastructure like
what I experienced in my .NET 7 port. Perhaps the team does not want to add too many major features
before a long term support release?

So, hopefully, despite of all the unforeseen bugs, I hope that this project can still proceed
according to the original plan.

Once again, I might have left some points behind, if there are any questions about any part of my
port, feel free to leave them in the comments section.

### Appendix - Pull requests/patches

Like the previous blog, I will have a list of pull requests/patches. Those that have been included
in the previous blog (pending and still pending now, or already merged) are not displayed here.

#### Merged
##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/team: Allow retrieving more attributes (#6390)](https://review.haiku-os.org/c/haiku/+/6390)
- [kernel/vm: Make cut_area respect overcommitting flag (#6391)](https://review.haiku-os.org/c/haiku/+/6391)
- [kernel/vm: unlock cache before unmapping addresses (#6392)](https://review.haiku-os.org/c/haiku/+/6392)

##### [dotnet/runtime](http://github.com/dotnet/runtime)
- [Initial build configuration for Haiku (#86303)](https://github.com/dotnet/runtime/pull/86303)
- [[VM] Fix potential double free (#86207)](https://github.com/dotnet/runtime/pull/86207)

#### Pending
##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/vm: handle page protections in cut_area (#6395)](https://review.haiku-os.org/c/haiku/+/6395)
- [kernel/vm: check if page is in area (#6496)](https://review.haiku-os.org/c/haiku/+/6496)

##### [dotnet/runtime](http://github.com/dotnet/runtime)
- [Haiku: Configuration support (#86391)](https://github.com/dotnet/runtime/pull/86391)
- [[libs] Fix poll events conversion (#86843)](https://github.com/dotnet/runtime/pull/86843)
- [[VM] Fix potential undefined behavior (#87119)](https://github.com/dotnet/runtime/pull/87119)

##### [dotnet/arcade](http://github.com/dotnet/arcade)
- [Haiku: Update arcade support (#13755)](https://github.com/dotnet/arcade/pull/13755)
