+++
type = "blog"
title = "[GSoC 2024] Improving the Userland Debugging Experience - Progress Report #3"
author = "trungnt2910"
date = "2024-08-11"
tags = ["haiku", "software", "gsoc", "gsoc2024", "gdb", "gdbserver"]
+++

# Project status overview

## Completed tasks

The goal of this phase was to stabilize GDB, making it suitable for debugging complex and
multi-threaded applications (including most Be API applications).

After clearing the first round of bug reports, the first revision of the GDB package is now online
on [HaikuPorts](https://github.com/haikuports/haikuports/blob/master/dev-util/gdb/gdb-15.1.recipe).

When attempting to use the published package to work on Debugger, I found a second round of bugs,
resulting in the pending [second revision](https://github.com/haikuports/haikuports/pull/10799) of
the port. This version of GDB is now stable enough to attach to and debug a copy of itself.

## Current plans

In the last week of GSoC, I plan to test debugging Debugger with GDB. While there might not be
enough time to work on the program itself, I hope this would allow me to either prove the port's
stability or reveal a third round of bugs to clean.

I also aim to respond to bug reports from the community as soon as possible.

# Technical details

## Fixed Bugs

The majority of this phase is bug fixes. I will document them here in case of regressions.

This section can get highly technical, feel free to skip if you are not ready to jump in as the
port's maintainer.

### Async & Non-stop

In the previous post, I have mentioned implementing a workaround for GDB's `async` mode through a
worker thread since the native `event_queue`
[does not support polling](https://dev.haiku-os.org/ticket/18954).

This workaround involves many decisions made as a result of trial and error. Changing these details
may result in GDB hanging completely.

#### First Version

This is the naive implementation I had while writing the second blog:

```cpp
// Worker thread loop
while (true)
{
  build a list of ports

  wait_for_objects(pipe_to_worker + the ports);

  flush pipe to worker

  remove invalid ports

  if (any ports are readable)
    pipe_to_event_loop.mark();
}
```

Two pipes are involved. `pipe_to_worker` is used by the main thread to signal the worker thread when
new teams are debugged and new ports need to be added. `pipe_to_event_loop` contains the FD we pass
to the main thread. The worker thread will mark the `poll`ed end readable when any ports the thread
managed has pending messages.

The issue with this version is that it does not give time for the main loop to actually read the
ports. Immediately after detecting a readable port, the worker thread marks the
`pipe_to_event_loop`, enters a new iteration, calls `wait_for_object` without getting blocked, and
marks the same pipe again. The main thread would get too busy flushing the infinite pipe and unable
to read the data.

#### Second Version

This version aims to solve the bug above. It is also the one used in the first revision on
HaikuPorts.

```cpp
// Worker thread loop
while (true)
{
  build a list of ports

  wait_for_objects(pipe_to_worker + the ports);

  flush pipe to worker

  remove invalid ports

  // This part is added.
  remove readable ports

  if (any ports are readable)
    pipe_to_event_loop.mark();
}
```

The ports removed by the worker thread are added again in `haiku_nat::resume` and `haiku_nat::wait`.
`resume` is what makes the threads start running and events rolling again, enabling us to resume
listening to the corresponding debugger port. However, for some events, such as thread and process
exit, GDB does not call `resume`, because there's nothing to continue! This is why ports are also
re-added in `wait`. We need to be careful though: When adding ports and marking pipes, we need to be
sure that GDB will call `wait` on the process again. In some cases, such as after the process is
known to have exited, GDB no longer calls `wait`, leaving the `nat` code no chance to flush the
pipe to event loop.

Whenever a port is added (either initially during attach or re-added through the methods above),
`pipe_to_worker` is marked, forcing a new iteration of `wait_for_objects`.

This is the first working version of `async` mode, solving mysterious `assert`s and bugs like the
[inability to view other threads' backtraces](https://github.com/trungnt2910/gdb-haiku/issues/2).

This version, however, still occasionally cause hangs in GDB. This happens for some asynchronous
events like `THREAD_EXITED`. The main thread might read this event right after consuming the
previous one. At the same time, the worker thread sees the port as readable, removes it from the
list, and marks the `pipe_to_event_loop`. The main thread would wake up again, only to find out that
there actually are no new events and not re-adding the discarded port. This makes the current team's
port "lost" to the worker thread.

#### Third Version

This is the current version of the worker thread logic.

```cpp
// Worker thread loop
wait_for_ports = true;
while (true)
{
  build a list of ports

  if (wait_for_ports)
    wait_for_objects(pipe_to_worker + the ports);
  else
    wait_for_objects(pipe_to_worker)

  if (pipe_to_worker is marked)
  {
    flush pipe to worker
    wait_for_ports = true;
  }
  else
    wait_for_ports = false;

  remove invalid ports

  if (any ports are readable)
    pipe_to_event_loop.mark();
}
```

To solve the "lost port" issue, we stop removing valid ports altogether. To prevent the initial
issue where the worker thread runs into an infinite loop, we now only allow the thread to wait for
ports when signalled by the main thread.

The `pipe_to_worker` is now used for general signalling that the worker thread needs to either
refresh its port list or start waiting for ports again. It is marked on `resume` and `wait`, similar
to the second version.

Unlike the second version, the this version no longer re-adds ports in `resume` and `wait`, reducing
mutex usage in the event thread.

This version has been tested with 100 runs of `Debugger`. So far I have not encountered any further
issue.

### Executable Relocation

In the previous blog, I have mentioned using `disable_breakpoints_before_startup` to mute
breakpoint-related functions before the main executable gets properly relocated.

However, it turns out that
[some components](https://github.com/trungnt2910/gdb-haiku/issues/4#issuecomment-2262975347) in GDB
does not respect the startup flag. Therefore, executable relocation has now been pushed as early as
possible, right after startup for inferiors we `fork`ed ourselves.

### Memory Access

#### Target Memory Regions

As previously mentioned, the regions reported by `info mem` determines whether GDB would attempt
to read/write a certain address. They have to be manually refreshed by the native facility.

Previously, these regions are only invalidated when an image event or `exec` occurs. However, there
are various more reasons mappings can change: threads being created, `[*]_area` or `mmap` called,
and so on. Without an updated view,
[stack traces and variable inspection](https://github.com/trungnt2910/gdb-haiku/issues/2) will not
work correctly.

The solution I have chosen is to invalidate everything whenever an event is read in `wait`. This
forces the debugger to refresh regions on every stop before poking around the inferior's memory.

Another solution (and the one used on Linux) is to not implement `memory_map` at all. Without this
method, GDB would assume every location is readable and writable, eliminating these artificial
read/write failures. However, this would break the `info mem` command, confusing new users.

#### Memory Read Limits

Debuggee address space access on Haiku is done through port messages, just like all other debugger
operations. To prevent messages from getting too large, Haiku imposes a
`B_MAX_READ_WRITE_MEMORY_SIZE` of 1024 bytes.

Attempts to read something larger than 1024 bytes result in an immediate failure instead of
truncation:

```cpp
			case B_DEBUG_MESSAGE_READ_MEMORY:
			{
				// get the parameters
				replyPort = message.read_memory.reply_port;
				void *address = message.read_memory.address;
				int32 size = message.read_memory.size;
				status_t result = B_OK;

				// check the parameters
				if (!BreakpointManager::CanAccessAddress(address, false))
					result = B_BAD_ADDRESS;
				else if (size <= 0 || size > B_MAX_READ_WRITE_MEMORY_SIZE)
					result = B_BAD_VALUE;
```

The first revision assumed that the nub thread would return a partial reply if a `size` of more than
1024 was passed. Therefore, all requests for memory blocks greater than 1024 would fail, preventing
the user from inspecting large structures.

The current version respects this 1024-byte cap, correctly handling larger memory requests.

### Attaching to Multithreaded Processes

#### Enumerating Threads

Previously, the port does not attempt to enumerate threads when debugging. Instead, the native
facility lazily adds threads when events are encountered there. This is done even when attaching to
multithreaded processes: `debug_thread` should force all threads (except the nub thread, which
should have been invisible but somehow still searchable through `get_next_thread_info`) to stop and
emit an initial event.

However, not making threads visible right after attach interferes with GDB's attach process. When
attaching, GDB would try to issue its own initial stop requests to all known threads, then only stop
once. Without a thread list, GDB would only know of the main thread and interrupt that. After that,
a bunch of `SIGTRAP` events emerge, which is annoying especially for teams with lots of threads.

Now, the `nat` code enumerates all threads during attach in two places. The first place is in
`team_debug_context::initialize` to ensure that the appropriate thread debug contexts are recorded,
allowing native facilities to work as expected. The other one is in `haiku_nat_target::attach` to
report these threads to GDB. The second enumeration also ensures that the nub thread is skipped,
preventing errors while trying to interrupt/resume the debuggee.

#### Stopping Threads

After a successfull attach, GDB's core code tries to stop all threads using `target_stop`, which
is implement using `haiku_nat::stop`, which then calls `debug_thread`.

This function is also used to emulate all-stop mode on non-stop targets like Haiku. When one thread
receives an event, all other threads are forced to stop using this function. To prevent the
subsequent stops from emitting a flood of events, in the first revision, threads receiving a stop
request will have a special flag set (`m_force_stopped`). When receiving a `THREAD_DEBUGGED` event
with this flag set, the thread will ignore that event and clear the flag.

However, ignoring the event will interfere with the attach operation, which expects an initial stop
event reaching the main loop. Looking more closely at the Linux code, I found out that these events
are meant to be translated into a stop event with a null signal (`GDB_SIGNAL_0`) instead of being
filtered away. This has been fixed in the current port version, allowing GDB to properly attach to
a copy of itself.

### POSIX Compliance of `errno`

Haiku uses negative BeOS-style error values as `errno` values. However, GDB
[relies](https://github.com/trungnt2910/gdb-haiku/issues/4#issuecomment-2266715098) on `errno` being
positive to signal error conditions using `-errno`. With negative `errno`, `-errno` would become
positive, confusing other code and causing mysterious crashes.

Luckily, Haiku comes with a built-in fix: `posix_error_mapper`. It is enabled by defining the flag
`B_USE_POSITIVE_POSIX_ERRORS` and linking to the `posix_error_mapper` library. The `Makefile`s for
GDB has been modified to link to this. However, for the compile macro to work, we would need to add
`-DB_USE_POSITIVE_POSIX_ERRORS` to the preprocessor flags. Adding it to just GDB's `Makefile`s will
not suffice since some `gdbsupport` code is also statically compiled into GDB, and these files are
apparently not affected by GDB's `CFLAGS`.

The recipe has been updated to handle this detail. For source builds, you would need to re-build
everything from a clean directory, and run `export CPPFLAGS="-DB_USE_POSITIVE_POSIX_ERRORS"` before
executing the `./configure` script.

## Debugging C++ Types

A common task while debugging C++ codebases is inspecting STL containers.

While the GDB that comes with popular Linux distros seems to have support for that built-in, we do
not get that for free in our Haiku port:

```
(gdb) thread 6
[Switching to thread 6 (team 371 (gdb) thread 381 (gdb debugger port listener))]
#0  0x000001302b72828c in _kern_wait_for_objects () from /boot/system/lib/libroot.so
(gdb) up 1
#1  0x0000020f32e269b7 in operator() (__closure=0x0, data=0x0) at ../../gdb-haiku/gdb/nat/haiku-nat.c:2132
2132                        event_count = wait_for_objects (wait_infos.data (),
(gdb) info locals
event_count = 0
wait_infos = {<std::_Vector_base<object_wait_info, std::allocator<object_wait_info> >> = {
    _M_impl = {<std::allocator<object_wait_info>> = {<std::__new_allocator<object_wait_info>> = {<No data fields>}, <No data fields>}, <std::_Vector_base<object_wait_info, std::allocator<object_wait_info> >::_Vector_impl_data> = {_M_start = 0x10efbc963c90,
        _M_finish = 0x10efbc963ca0, _M_end_of_storage = 0x10efbc963ca0}, <No data fields>}}, <No data fields>}
wait_for_ports = true
__func__ = "operator()"
(gdb)
```

The "pretty printers" for types living in `libstdcxx` does not come with GDB. It is distributed
along with
[libstdcxx](https://github.com/gcc-mirror/gcc/tree/releases/gcc-13.3.0/libstdc%2B%2B-v3/python)
itself.

For now, you can download
[this folder](https://github.com/gcc-mirror/gcc/tree/releases/gcc-13.3.0/libstdc%2B%2B-v3/python)
and place it anywhere on your Haiku system. Then, use the `python` command to open a Python shell
in GDB to import those scripts:

```py
(gdb) python
>import sys
>sys.path.insert(0, "/path/to/the/folder/you/saved")
>from libstdcxx.v6.printers import register_libstdcxx_printers
>register_libstdcxx_printers (None)
>end
(gdb)
```

After that, STL containers will be printed the way you expect:

```
(gdb) info locals
event_count = 0
wait_infos = std::vector of length 2, capacity 2 = {{object = 14, type = 0, events = 1}, {object = 242, type = 2, events = 1}}
wait_for_ports = true
__func__ = "operator()"
(gdb)
```

It would be nice to package these pretty printers into `.hpkg`s and publish them to HaikuPorts one
day. Another nice future idea is to build pretty printers for BeAPI types, such as `BLooper`s.

# Conclusion

Once again, I hope you find this blog useful!

I might have left some points behind, if there are any questions about any part of my port, please
leave them in the comments section.

### Appendix - Pull requests/patches

As usual, this is an overview of code submitted during this phase.

#### Merged

##### [haikuports/haikuports](https://github.com/haikuports/haikuports)
- [gdb: Add recipe for GDB 15.1 (#10727)](https://github.com/haikuports/haikuports/pull/10727)

#### Pending

##### [binutils-gdb](https://sourceware.org/git/binutils-gdb.git)
- [[PATCH v2][PR 30630] gdb/remote: fix assertion failure during startup](https://sourceware.org/pipermail/gdb-patches/2024-July/210771.html)

##### [haikuports/haikuports](https://github.com/haikuports/haikuports)
- [gdb: Improve GDB 15 stability (#10799)](https://github.com/haikuports/haikuports/pull/10799)
