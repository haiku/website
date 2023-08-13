+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Progress Report #5"
author = "Trung Nguyen"
date = "2023-08-13"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

# Project status overview

The long awaited [stateful FD monitoring](https://dev.haiku-os.org/ticket/16846) has finally been
implemented on Haiku, and there now is a partial implementation of `kqueue` usable in `libbsd`.
Therefore, `Release` builds of .NET can now work properly (after some more hacks) and have been set
as the default in my custom `dotnet-install.sh` script.

Due to some technical difficulties in parsing Doxygen documentation and converting it to the XML
format used in C#, I have delayed my effort to generate documentation for the Haiku API bindings.
Instead, I am going to resume my effort of bootstrapping .NET on Haiku, as mentioned in my
[second report](https://www.haiku-os.org/blog/trungnt2910/2023-05-28_gsoc_2023_dotnet_port_progress_2).

There are still a few more obstacles preventing from the most basic components (`clr.runtime`) from
being built natively on Haiku: one is related to sockets, another related to the recent GCC 13.2.0
update for Haiku.

# Technical details

## `kqueue`-related hack

`kqueue` for sockets now works properly in the scenario previously covered by the `poll` hack.

However, in the .NET codebase, there is
[another component](https://github.com/dotnet/runtime/blob/af651f48d07c87c94e1225859e63e919719b687b/src/coreclr/pal/src/configure.cmake#L82)
that checks for `kqueue` and uses it when available.

This component used to work just fine on Haiku. Now, with `kqueue` detected, it also makes
intensive use of the `.data` field of `struct kevent`. It even has an
[assert](https://github.com/dotnet/runtime/blob/af651f48d07c87c94e1225859e63e919719b687b/src/coreclr/pal/src/synchmgr/synchmanager.cpp#L2349)
related to this field. The field is supposed to report the number of bytes that could
be read, but Haiku
[does not support](https://github.com/haiku/haiku/blob/0d07b1d98a7c4595b39324f0603d3b3005ad38d9/src/libs/bsd/kqueue.cpp#L198)
such information yet.

Therefore, I am currently explicitly disabling `kqueue` support for this component on Haiku:

```cmake
if(CLR_CMAKE_TARGET_HAIKU)
  # kqueue is broken on Haiku and does not provide the required information in the data field.
  set(HAVE_KQUEUE 0)
else()
  check_function_exists(kqueue HAVE_KQUEUE)
endif()
```

A better solution might be to detect a broken `.data` field using a CMake check, and then use
`ioctl` with `FIONREAD` to replace that field, but that would result in a few hundred lines of
configuration and code, so I am sticking to this hack for now.

## MSBuild parallel builds

For some time, bootstrapping .NET would reach the `CMake` step if parallel builds is disabled
(`-maxcpucount:1`). However, using the default settings, MSBuild would try to spawn a few
child processes to build sub-projects, leading to various problems.

### Mysterious build failures due to missing `SO_RCVBUF`

All MSBuild child processes would fail with something like this:

```
OutOfProc Endpoint Packet Pump (TID 5) 638273229199490970 +     6.185ms: Waiting for connection 900000 ms...
OutOfProc Endpoint Packet Pump (TID 5) 638273229203017890 +   352.692ms: Client connection failed.  Exiting comm thread. System.AggregateException: One or more errors occurred. (Unknown socket error)
 ---> System.Net.Sockets.SocketException (0xFFFDFFFE): Unknown socket error
   at System.Net.Sockets.Socket.UpdateStatusAfterSocketErrorAndThrowException(SocketError error, Boolean disconnectOnFailure, String callerName)
   at System.Net.Sockets.Socket.UpdateStatusAfterSocketOptionErrorAndThrowException(SocketError error, String callerName)
   at System.Net.Sockets.Socket.SetSocketOption(SocketOptionLevel optionLevel, SocketOptionName optionName, Int32 optionValue, Boolean silent)
   at System.Net.Sockets.Socket.SetSocketOption(SocketOptionLevel optionLevel, SocketOptionName optionName, Int32 optionValue)
   at System.Net.Sockets.Socket.set_ReceiveBufferSize(Int32 value)
   at System.IO.Pipes.PipeStream.ConfigureSocket(Socket s, SafePipeHandle _, PipeDirection direction, Int32 inBufferSize, Int32 outBufferSize, HandleInheritability inheritability)
   at System.IO.Pipes.NamedPipeServerStream.HandleAcceptedSocket(Socket acceptedSocket)
   at System.IO.Pipes.NamedPipeServerStream.<>c__DisplayClass25_0.<<WaitForConnectionAsync>g__WaitForConnectionAsyncCore|0>d.MoveNext()
   --- End of inner exception stack trace ---
   at System.Threading.Tasks.Task.ThrowIfExceptional(Boolean includeTaskCanceledExceptions)
   at System.Threading.Tasks.Task.Wait(Int32 millisecondsTimeout, CancellationToken cancellationToken)
   at System.Threading.Tasks.Task.Wait(Int32 millisecondsTimeout)
   at Microsoft.Build.BackEnd.NodeEndpointOutOfProcBase.PacketPumpProc() in /_/src/Shared/NodeEndpointOutOfProcBase.cs:line 379
OutOfProc Endpoint Packet Pump (TID 5) 638273229204260550 +   124.266ms: Changing link status from Inactive to Failed
 (TID 1) 638273229204477430 +    21.688ms: Shutting down with reason: ConnectionFailed, and exception: .
 (TID 1) 638273229205082240 +    60.481ms: Changing link status from Failed to Inactive
 (TID 1) 638273229205192820 +    11.058ms: Shut down complete.
```

In the end, it was because `setsockopt` with `SO_RCVBUF` always returning an error for `AF_UNIX`
sockets:

```cpp
status_t
UnixBufferQueue::SetCapacity(size_t capacity)
{
// TODO:...
return B_ERROR;
}
```

The function in question has been implemented and is now under code review.

### Deadlock on `free()` in child process

This is a very rare condition where a `dotnet` child process would hang while trying to call
`free()` before it could reach the `_kern_exec()` syscall.

It used to be a bit more common before waddlesplash re-initialized some of the locks in
[#6777](https://review.haiku-os.org/c/haiku/+/6777).

Now, the deadlock occurs when trying to
[acquire](https://github.com/haiku/haiku/blob/0d07b1d98a7c4595b39324f0603d3b3005ad38d9/src/system/libroot/posix/malloc_hoard2/processheap.cpp#L203)
the lock for a superblock.

waddlesplash has suggested that a master lock for `fork` will be needed, since resetting all
superblocks is not an efficient task.

While the issue still exists, it is much rarer, so I will ignore it for now.

## Toolchain errors

### `clang` errors

When bootstrapping .NET on Haiku, I tried to build it using `clang`, since it is the default
compiler on all platforms (probably except Windows).

However, `clang` (at least the one from `llvm12_clang` from HaikuPorts) seems to be unable to
compile Haiku's GNU extensions, even when `_GNU_SOURCE` is properly defined. This causes unexpected
compilation errors in some files that use the `sincos()` function.

This bug has been reported to HaikuPorts as
[#9198](https://github.com/haikuports/haikuports/issues/9198).
[#9217](https://github.com/haikuports/haikuports/pull/9217) should fix the problem by adding the
required headers directory for `clang12`.

With this fixed, builds with `clang` would fail the same as GCC builds below, as on Haiku, `clang`
still requires `gcc` for its linker functionality (`lld` is
[broken](https://github.com/haikuports/haikuports/issues/7016) on Haiku).

### Latest GCC toolchain errors

GCC has been recently updated to 13.2.0. This causes a regression, both in the cross-compilers and
the `gcc` package found on HaikuPorts.

```
g++: error: unrecognized command-line option '-rdynamic'
```

`-rdynamic` is a compiler option that makes executable binaries export their symbols. Haiku already
does this by default, so jessicah added a patch to make this flag a no-op for Haiku's GCC 11.

Despite the changes being left
[unmodified](https://github.com/haiku/buildtools/blob/0bb5624b57443c11551842230b12cdf65488f72f/gcc/gcc/config/haiku.opt#L29C1-L30C7)
in the latest commit, the regression still occurs, affecting both the CI for `dotnet-builds` (as
well as all cross-compilation efforts) and bootstrap builds on Haiku.

If the error still persists, I will have to add a few more lines of hack in `dotnet`'s CMake files
to remove `-rdynamic` for Haiku.

# Conclusion

You might notice that this blog is much shorter than my previous ones. You might also notice that I
am a bit less active than the few previous months. A new, and rather chaotic, term has started, and
I am getting busier and busier with tasks from university.

This is, however, still conforming to my original proposal (which states that my commitment hours
per week would half starting from July, yet still fulfilling the 350-hour workload). Major goals
have also been fulfilled:

- The .NET runtime and SDK has been ported. `net8.0` applications can be developed and run on
Haiku.
- The `net8.0-haiku` workload has been built and works.
- Some .NET-based frameworks like `GtkSharp` and `FNA` has been tested.

The other goals, making a HaikuPorts recipe or allowing cross-compilation from Windows/Linux,
requires my patches to be accepted to the official repo, and are relatively easy when that happens.

### Appendix - Pull requests/patches

Like the previous blog, I will have a list of pull requests/patches. Those that have been included
in the previous blog (pending and still pending now, or already merged) are not displayed here.

#### Merged

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)

- [unix: Implement SO_RCVBUF (#6816)](https://review.haiku-os.org/c/haiku/+/6816)

#### Pending

No new pending pull requests at the time of writing, though
[haiku/haiku#6616](https://review.haiku-os.org/c/haiku/+/6616) ("Add clone_memory syscall") and
[dotnet/runtime#86391](https://github.com/dotnet/runtime/pull/86391) ("Haiku: Configuration
support") have both been pending for quite a long time.
