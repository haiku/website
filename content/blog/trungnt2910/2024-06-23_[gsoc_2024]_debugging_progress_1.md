+++
type = "blog"
title = "[GSoC 2024] Improving the Userland Debugging Experience - Progress Report #1"
author = "trungnt2910"
date = "2024-06-23"
tags = ["haiku", "software", "gsoc", "gsoc2024", "gdb", "gdbserver"]
+++

# Project status overview

Despite being a bit silent on the blogs, the project is still alive and kicking.

## Completed tasks

I have completed a [port](https://github.com/trungnt2910/gdb-haiku/tree/gdb-14-haiku) of the
`gdbserver` component of GDB 14.

The port has the full capability of a regular `gdbserver` port, including:
- Attaching to new and existing processes.
- Manipulating CPU and memory state.
- Reading loaded libraries and symbol information.
- Setting breakpoints.
- Receiving events about breakpoints, teams, threads, images, and syscalls.

Connected to a GDB frontend on a compatible ELF-based system, `gdbserver` provides a nearly seamless
debugging experience. With the correct configurations, Haiku C/C++ applications can be built on
VSCode, deployed to Haiku, then debugged with the IDE's UI through `gdbserver`.

## Current plans

For the first few weeks, I decided to focus on `gdbserver` due to its simplicity. With `gdbserver`
running, I will start porting the full GDB. This should be relatively straightforward: Most GDB code
dealing with the platform's debugging APIs is shared with `gdbserver`. GDB requires some extra code
to recognize the ABI and identify loaded objects, which should not be hard either knowinng that
Haiku also uses ELF and Sys-V.

With `gdbserver` and GDB done, I will create a HaikuPorts recipe and move on to this project's next
stage (improving the built-in `Debugger`).

# Technical details

## `gdbserver` port structure

`gdbserver` (and the main GDB) shares a lot of code, hence the `binutils-gdb` repo name. For this
component to work, some C++ source files have to be added in the `gdb/nat` folder (code that will
also be used by the full GDB) and the `gdbserver` folder (code specific to the server only).

### `gdbserver/haiku-low.cc`

This file holds code for `gdbserver` that is shared across Haiku targets of different architectures.
It:
- Declares supported features.
- Adds a layer of `gdbserver`-specific bookkeeping before and after the corresponding implementation
in `haiku-nat.c` is called.
- Implement `gdbserver`-specific callbacks required for `haiku-nat.c`.

The buik of this file is the implementation for `haiku_process_target`. This class overrides methods
that `gdbserver` will rely on to interact with its target.

### `gdbserver/haiku-amd64-low.cc`

This file holds code specific to `x86_64` (registers, breakpoints). It overrides the remaining
virtual methods of `haiku_process_target`, then defines the actual object pointer
(`the_haiku_target`).

Currently, register manipulation on `gdbserver` does not support floating-point registers. Support
functions for handling these registers are only available on the full GDB. Furthermore, other
targets like NetBSD also lacks this feature for `gdbserver`, showing that this feature is not
critical.

### `gdb/nat/haiku-nat.c`

Despite the `.c` extension, these files are full-featured C++ files.

`haiku-nat.c` contains code that converts Haiku debugger events to GDB statuses and translates GDB
API functions into Haiku nub messages. More details on the conversion will be discussed below.

Due to name clashes, this is the only file allowed to include both GDB and Haiku headers.
Conflicting GDB symbols are masked away as macros in favor of the ones from Haiku:

```cpp
#define debug_printf haiku_debug_printf
#define debug_vprintf haiku_debug_vprintf

#include "gdbsupport/common-defs.h"

#define thread_info gdb_thread_info
#include "regcache.h"
#include "target.h"
#undef thread_info

#undef debug_printf
#undef debug_vprintf
/* Now we can safely include Haiku headers.  */
```

### `gdb/nat/haiku-debug.c`

Currently, this file only re-exports the masked `debug_printf` and `debug_vprintf` as
`haiku_debug_printf` and `haiku_debug_vprintf`. These functions are used during development for
debugging purposes.

### `gdb/nat/haiku-nub-message.c`

This file, along with its corresponding header `haiku-nub-message.h`, provides an easier way to
call Haiku nub messages. Using template specialization and SFINAE, nub operations can be done in
one line in a type-safe way. For example, to set the team debugger flags:

```cpp
haiku_send_nub_message<B_DEBUG_MESSAGE_SET_TEAM_FLAGS> (m_nub_port, { .flags = flags });
```

## Attaching

### GDB-created inferiors

Similar to UNIX-like OSes, new inferiors are created using `fork()`. After `fork()`, `gdbserver` on
Haiku additionally calls `wait_for_debugger()` to ensure that the parent has attached to it (using
`install_team_debugger()`) before giving control to the requested program.

### Existing processes

For existing processes, in addition to `install_team_debugger()`, `gdbserver` loops through all
running threads and call `debug_thread()` to interrupt all running threads. It also loops through
loaded images after attaching to allow the frontend to recognize mapped binaries and resolve
symbols.

### Children

Haiku ([later versions](https://review.haiku-os.org/c/haiku/+/7797) of Haiku in case of
`load_image`) ensures that a `team_created` event is fired before the child team's main thread gets
resumed. The debugger therefore has enough time to install itself and perform necessary setup steps
before continuing the debuggee, letting it continue the newly created team.

On Haiku, `fork()` when called from the userland causes most signals to be deferred. This used to
include `SIGNAL_DEBUG_THREAD`, a value used internally in the Haiku kernel to interrupt running
threads when requested by a debugger. This causes the debugger to miss a few instructions after
`fork()` and before the child undefers signals. [#7796](https://review.haiku-os.org/c/haiku/+/7796)
fixes this issue, stopping the child right when `_kern_fork()` returns.

## Message loop

Most aspects of the message loop are handled by `haiku-nat.c`.

### Receiving

When GDB calls `haiku_nat::wait` (corresponding to the POSIX `wait` in `ptrace`-based systems), the
`team_debug_context` (a class managing the debugging ports, threads, and other states) tries to
read an event from the port. The object may choose to drop that event or do some bookkeeping before
forwarding it to the `thread_debug_context` of the concerning thread. `thread_debug_context`s are
responsible for translating Haiku to GDB events and maintaining a thread-specific queue. Some Haiku
events may be pushed into the queue as two or more GDB events.

GDB may wait for events from one specific team, one specific thread, or any team.

#### One team

`team_debug_context` of the selected team waits for an event, enqueue it into the appropriate
`thread_debug_context`, then dequeue from it immediately.

#### One thread

`team_debug_context` waits for events until it finds one from the desired thread. Events from other
threads are pushed into queues in `thread_debug_context`s.

#### Any team

`haiku-nat.c` builds a list of processes and their corresponding debugger ports. It then calls
`wait_for_objects()` until the timeout is reached or a port becomes readable. After that, GDB
selects the port's team and continues reading events like in the first case.

When more inferior teams are present, this operation might benefit from Haiku's `event_queue` - a
currently private API that is only used internally to implement a subset of `kqueue()`.

### Resuming

GDB's resume operation corresponds to `PTRACE_CONT` on systems with `ptrace`. This operation allows
an optional signal to be delievered to the debuggee before resuming. Usually, GDB would forward the
same signal that was about to reach the traced child, but GDB could also send nothing or send a
different one.

My GDB port, taking from the old GDB port's idea, emulates this feature by tracing the signal
received by each thread when stopping. There are three categories:
- Faked: Haiku did not actually send a signal. The original event is a generic event causing a
break, and it was translated to a `stopped` status with `SIGTRAP`.
- Actual: This is an actual signal reported by a `signal_received` Haiku event.
- Forecasted: The signal will be sent to the team as a result of an exception event.

Based on the stored signal and the one GDB requests, the resume operation would then ignore the
pending signal, send a new one, or continue as normal.

## Termination

The GDB code treats a team or thread as deleted when:
- A deadly `signal_received` event is received, resulting in a GDB `signalled` status, or
- A `team_deleted` or `thread_deleted` is received, resulting in GDB's `exited`/`thread_exited`.

In either case, the GDB events are queued as usual in the `thread_debug_context`. When these events
are dequeued, we dispose of all related `thread_debug_context` or `team_debug_context` objects,
since `gdbserver` does not care about threads or processes that have exited or been signalled.

Previously, Haiku `team_deleted` and `thread_deleted` events did not report the status code that
GDB needs. [#7736](https://review.haiku-os.org/c/haiku/+/7736) adds this field to the messages.
Furthermore, to differentiate `SIGKILL`, a signal that does not generate a `signal_receieved` event,
from a normal exit, [#7756](https://review.haiku-os.org/c/haiku/+/7756) adds another `signal` field
to the `team_deleted` message.

# Conclusion

Hope you enjoyed this blog!

With exams settled, I believe the next phase of this project can proceed a bit faster.

I might have left some points behind, if there are any questions about any part of my port, please
leave them in the comments section.

### Appendix - Pull requests/patches

As usual, here are a few patches I have upstreamed during the first phase of this project.

#### Merged

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [headers/bsd: Remove Haiku-specific include deps (#7642)](https://review.haiku-os.org/c/haiku/+/7642)
- [kernel/debug: Report team/thread exit status (#7736)](https://review.haiku-os.org/c/haiku/+/7736)
- [kernel/debug: Report killing signals (#7756)](https://review.haiku-os.org/c/haiku/+/7756)

#### Pending

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/signal: Make DEBUG_THREAD non-deferrable (#7796)](https://review.haiku-os.org/c/haiku/+/7796)
- [kernel/debug: Report new team before resuming it (#7797)](https://review.haiku-os.org/c/haiku/+/7797)
