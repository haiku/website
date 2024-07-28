+++
type = "blog"
title = "[GSoC 2024] Improving the Userland Debugging Experience - Progress Report #2"
author = "trungnt2910"
date = "2024-06-28"
tags = ["haiku", "software", "gsoc", "gsoc2024", "gdb", "gdbserver"]
+++

# Project status overview

## Completed tasks

The GDB port is feature-complete. A recipe has been submitted to HaikuPorts.

This took a bit longer than expected due to complexities in building the full GDB compared to
`gdbserver` - all of which will be covered in the [technical details](#technical-details) section
below. Subtle bugs revealed by invoking the debugger in different use cases delayed the project
even more.

Despite being off schedule, I believe delivering a fully-functional GDB along with comprehensive
documentation around it would benefit the community much more in the long run.

## Current plans

Due to the massive queue of bug reports (thanks waddlesplash and X512 for helping me test GDB
beyond the common use cases in the CLI), I will continue focusing on fixing the port. With the
recipes already created, the project can move on to the next stage when the bug queue clears.

# Technical details

## Native-dependent vs. Target-dependent

Unlike `gdbserver`, which is designed to only run natively on the "target" OS/architecture
combination, the full GDB can run either natively or as a frontend to a remote `gdbserver` or other
programs using a compatible protocol.

Code that is designed to run only when GDB is using the native target is called "native-dependent"
code, or `nat`. These files are either named `"$os-nat.c"` or `"$arch-$os-nat.c"`. Files that
implement a major feature, such as forking a new process or reading OS data, are located in a
separate `nat/` folder, in which case they may be named differently. Files designated as
"native-dependent" are handled specially in GDB's build scripts, since only these files are allowed
to call the OS's native facilities.

All the other OS-specific code in GDB is "target-dependent". Target-dependent code can be located
in files with `tdep` in its name, but they can also be elsewhere, such as `solib-haiku.c`.
Target-dependent code will be compiled for all OSes GDB supports (e.g. `haiku-tdep.c` gets built
on Linux) and therefore cannot directly access OS-specific native facilities like
`get_next_image_info`. The previous GDB port did not respect this design, potentially causing issues
with remote debugging.

`tdep` code mostly relies on information left in the address space: Magic symbols/sections in loaded
binaries or pages loaded at fixed addresses. Haiku has none of these: Image and area information is
stored in the kernel and the whole address space (including the `commpage`) is randomized by
default. Image information is also kept by `runtime_loader` in an undocumented `_rld_debug_` area,
which is a potential gold mine of debugging info if the data could be parsed. However, getting
the address of the page would require access to `get_next_area_info`.

Another way to overcome this restriction is to indirectly access native facilities through `xfer`
queries. Depending on the inferior type, the replies will come from the `nat` code in GDB itself or
from the remote `gdbserver`. This is how `solib-haiku.c` works - issuing `xfer` queries for the
library list. For categories not predefined in the `xfer` interface, `osdata` queries can be
(ab)used. This will be covered in the sections [below](#os-data).

GDB selects the correct target-dependent implementation through a series of "ABI sniffers". These
functions typically detect traces left by compilers in the loaded executable. On Haiku, the `tdep`
code checks for `_gSharedObjectHaikuVersion` - a private variable attached to all images, used by
`runtime_loader` for handling ABI compatibility.

## Shared object handling

On other UNIX-like OSes, the list of shared objects is retrieved from certain magic symbols present
in the dynamic loader.

Haiku's `runtime_loader` actually _does_ store such information in `runtime_loader` in the
`_rld_debug_` page, but for reasons discussed above, it is hard to harvest information there.

We therefore rely on the target to indirectly call `get_next_image_info` and serialize that into
`xfer` packets. Most callbacks in `solib-haiku.c` are just calls to the counterparts in
`solib-target.c`, except when the special `commpage` image is involved.

## Signal frame stepping

GDB has the ability to step past signal frames, revealing the stack trace before being interrupted
by a signal. To do this, the `tdep` code must tell GDB how to:
- Determine whether the current instruction pointer lies in the signal handler trampoline.
- Determine where on the stack (or other process memory) the signal context information is.
- Determine the offsets of CPU registers from the start of the signal context information.

### Signal frame handling on Haiku

For most architectures, when a signal handler is called, the kernel gives control to a trampoline
on the `commpage`. The trampoline is a C++ function baked into the kernel image, which is then
copied into the `commpage` and registered as `commpage_signal_handler()`.

The function is given an argument of `struct signal_frame_data`, a private structure:

```cpp
struct signal_frame_data {
	siginfo_t	info;
	ucontext_t	context;
	void*		user_data;
	void*		handler;
	bool		siginfo_handler;
	int32		thread_flags;
	uint64		syscall_restart_return_value;
	uint8		syscall_restart_parameters[SYSCALL_RESTART_PARAMETER_SIZE];
	void*		commpage_address;
};
```

This structure is pushed on the stack. Below the structure, the kernel pushes the instruction
pointer of the previous frame. After that, the signal handler pushes an additional 8 bytes for the
base pointer (`rbp`).

Therefore, given the frame's stack pointer, the offset to the context we need would be
`rsp + sizeof(addr_t) + sizeof(addr_t) + offsetof(signal_frame_data, context)`. However, being
private, the layout of `signal_frame_data` may change anytime. `siginfo_t` may also potentially
enlarge, shifting the `context` member, what we need, away. That said, GDB is known to store magic
offsets of private structures for other targets as well, so I believe doing the same for Haiku is
fine, at least until it breaks.

### Synthesizing the commpage image

Most OSes implement signal frame detection by searching for a specific function name. On Haiku, we
can search for `commpage_signal_handler` on `commpage`. However, `commpage` is not a normal ELF
image and cannot be parsed by GDB's binary format library, BFD.

To register `commpage` as a shared object and allow the instruction pointer to symbol functions to
work, we need to synthesize the `commpage` BFD object. We do so by hooking the `bfd_open` callback
in `solib-haiku.c` when the filename matches `commpage` instead of an absolute path.

We also need to write symbols to this artificial image. The `commpage` itself has no symbol
information. Symbols are registered to the kernel when the system's copy of the `commpage` is
initialized. We therefore need to ask the target to report this information through a special OS
data query.

## OS data

This functionality powers the `info os` command in the GDB frontend. As discussed above, this is
also a powerful interface allowing `tdep` code to retrieve arbitrary system information from the
target. Therefore, this functionality plays a vital role in the port for Haiku.

The `nat` code of each OS can determine which OS data categories are avaiable. For Haiku, this
is declared in `nat/haiku-osdata.c`.

```
(gdb) info os
Type        Description
areas       Listing of all areas
comm        Listing of all symbols on the system commpage
cpus        Listing of all CPUs/cores on the system
files       Listing of all file descriptors
images      Listing of all images
ports       Listing of all ports
sems        Listing of all semaphores
sockets     Listing of all sockets
teams       Listing of all teams
threads     Listing of all threads
```

The `nat` code is free to decide which attributes to report for each category. However, its reply
must be serialized into XML.

### Private syscalls

`nat/haiku-osdata.c` serializes data by providing a callback to a very clean-looking `for_each_*`
function. For example:

```cpp
        for_each_commpage_symbol ([&] (const commpage_symbol_info &info) {
          std::string type;
          if (info.is_function)
            type += "f";
          if (info.is_object)
            type += "o";

          string_xml_appendf (buffer,
                              "<item>"
                              "<column name=\"name\">%s</column>"
                              "<column name=\"value\">%s</column>"
                              "<column name=\"size\">%s</column>"
                              "<column name=\"type\">%s</column>"
                              "</item>",
                              info.name, pulongest (info.value),
                              pulongest (info.size), type.c_str ());

          return 0;
        });
```

Some of these `for_each_*` functions are wrappers to `get_next_*`. Recall in the last blog post
that, because of name clashes, only `nat/haiku-nat.c` is allowed to call `get_next_*` and other
Haiku-specific funtions. Therefore, all the `for_each_*` are implemented in `nat/haiku-nat.c`.

However, some of `for_each_*` might have something much more evil under the hood: Raw `_kern_*`
syscalls. `_kern_*` functions are normal functions exported by `libroot.so`. Pulling raw syscalls is
as simple as copying the prototype from `headers/private/system/syscalls.h`. However, while less
volatile than syscall numbers, the names of `_kern_*` functions may change anytime, such as during
the great `user_mutex` refactor renaming `_kern_mutex_unlock` to `_kern_mutex_unblock`. This causes
`runtime_loader` to refuse all previous direct consumers of updated raw syscalls - a huge issue if
the binary is to be distributed on HaikuPorts.

To avoid this, references to raw syscalls in `nat/haiku-nat.c` are imported as weak symbols. If they
update, outdated ports of GDB will get a null pointer, allowing optional features to gracefully
fail. For example:

```cpp
extern "C" status_t _kern_read_kernel_image_symbols (
    image_id id, elf_sym *symbolTable, int32 *_symbolCount, char *stringTable,
    size_t *_stringTableSize, addr_t *_imageDelta) __attribute__ ((weak));


/* Consumer.  */
int
for_each_commpage_symbol (
    const std::function<int (const commpage_symbol_info &info)> &callback)
{
  if (_kern_read_kernel_image_symbols == nullptr)
    {
      haiku_nat_debug_printf (
          "Failed to issue read_kernel_image_symbols syscall.");
      errno = ENOSYS;
      return -1;
    }
  /* More code...  */
```

### Commpage

The `commpage` contains functions useful for certain debugging scenarios. When creating the original
`commpage` (the "system" `commpage` image belonging to the kernel team), the kernel registers these
functions as symbols.

The Haiku internal syscall `_kern_read_kernel_image_symbols` can be used to read these symbols from
the system `commpage`. This is also what Haiku's internal
[Debug Kit](https://github.com/haiku/haiku/blob/9d18e521912c94c839a2c0bec57bca5c681dd030/src/kits/debug/Image.cpp#L464)
is using when dealing with the `commpage`.

Note that for the syscall to work, the _system_ `commpage` (obtained by looping
`get_next_image_info` on `B_SYSTEM_TEAM`) needs to be passed. Using the `image_id` of a regular
team's `commpage` would fail.

### Files

Haiku has an undocumented syscall, `_kern_get_next_fd_info`, to obtain information about open file
descriptors:

```cpp
/* Derived from headers/private/system/vfs_defs.h.  */
struct fd_info
{
  int number;
  int32 open_mode;
  dev_t device;
  ino_t node;
};

status_t _kern_get_next_fd_info (team_id team, uint32 *_cookie,
                                 fd_info *info, size_t infoSize);
```

This call is the core of Haiku's `fdinfo` tool.

The syscall works exactly the same as other `get_next_[*]_info` syscalls, filling in `fd_info`
structures. However, these structures do not contain the open file's path, a detail developers
usually pay attention to.

`nat/haiku-nat.c` currently tries to obtain the path from the `device` and `node` fields using
`_kern_entry_ref_to_path`. However, this syscall only works on directories. On any other files, the
call would fail with `B_NOT_A_DIRECTORY`. Therefore, only the paths of open directories are
displayed when the user issues a `info os files` command.

### Sockets

Another similar undocumented syscall on Haiku is `_kern_get_next_socket_stat`, powering Haiku's
implementation of `netstat`:

```cpp
/* Derived from headers/private/net/net_stat.h.  */
struct net_stat
{
  int family;
  int type;
  int protocol;
  char state[B_OS_NAME_LENGTH];
  team_id owner;
  struct sockaddr_storage address;
  struct sockaddr_storage peer;
  size_t receive_queue_size;
  size_t send_queue_size;
};

status_t _kern_get_next_socket_stat (int family, uint32 *cookie,
                                     struct net_stat *stat);
```

Unlike many of the `get_next_[*]_info` calls, this syscall does not take a `team_id` parameter,
despite these sockets still having an apparent "owner" team. When `-1` is passed to the `family`
parameter, the syscall loops through all socket families (`unix`, `inet`, `inet6`).

Depending on the socket family returned, `nat/haiku-nat.c` applies the appropriate conversion to
format the addresses to human-readable strings.

### CPUs

No more hacky private syscalls - CPU information on Haiku can be fetch using `get_system_info` to
get the system CPU count followed by a call to `get_cpu_info`. However, `get_cpu_info` only returns
a few generic fields:

```cpp
typedef struct {
    bigtime_t  active_time; /* usec of doing useful work since boot */
    bool       enabled;
    uint64     current_frequency;
} cpu_info;
```

Many details like the architecture or vendor are not included. To do this, we would need to use the
`get_cpu_topology_info` syscall. This would give the caller a flattened version of the CPU topology
tree with the following levels:
- `B_TOPOLOGY_ROOT`: The top level. One for the system. Contains the CPU architecture.
- `B_TOPOLOGY_PACKAGE`: One for each physical core. Contains the vendor and L1 cache size.
- `B_TOPOLOGY_CORE`: One for each logical core. Contains the default CPU frequency.
- `B_TOPOLOGY_SMT`: The leaf level.

### The rest

The rest of the OS data (areas, images, ports, sems, teams, and threads) are retrieved using the
corresponding standard `get_next_[*]_info` syscalls.

To prevent name clashes, the info `struct`s' fields are copied to similar `struct`s defined in
`nat/haiku-nat.h`. The new `struct`s also use GDB-native data types, such as `CORE_ADDR` instead of
a `void*`.

### Caveats

While `osdata` seems to be a powerful method to overcome the restrictions in `tdep` code, this
functionality should be used with caution due to the performance impact. `osdata` fetches
information of all images, areas, and other objects _system-wide_, instead of just the one process
we are interested in. On top of that, all of that data needs to go through a round of XML
serialization and deserialization.

When invoked by the user, many `osdata` queries also have formatting issues due to GDB not handling
column widths correctly. A similar issue also occurs on Linux, and there is no way for the `nat`
code handling `osdata` to specify the column width.

## Memory maps

### `info mem`

`haiku-nat.c` implements a target operation named `memory_map`. This operation is what powers the
`info mem` command in GDB.

All memory regions returned by this implementation is marked read/write. Despite many of the regions
are read-only from the inferior's perspective, from GDB's perspective, all valid mappings can be
read from and written to. For the purpose of `memory_map`, read-only mappings refer to actual
read-only _hardware_ rather than just protected RAM regions.

GDB uses the result of this function to check whether it could perform an operation on the target's
address space. Failing to report a mapped region or reporting it as read-only would affect the
ability to set software breakpoints.

GDB does not refresh its view of memory regions unless this view is explicitly invalidated using
`invalidate_target_mem_regions`. This function should be called when a significant change in memory
regions potentially affects breakpoint locations, such as during image loaded/deleted events.

### `info proc mappings`

`info_proc` is also implemented for Haiku. `info proc mappings` should be the preferred way for the
user to get an up-to-date list of mappings. The command also reports correct area protections
instead of just `rw` for everything.

## Thread creation

When a debugged team spawns a new thread, Haiku issues a `B_DEBUGGER_MESSAGE_THREAD_CREATED`. The
origin is the _caller_ thread, not the new thread itself. If the `B_TEAM_DEBUG_STOP_NEW_THREADS` is
set on the team, Haiku will then issue a `B_DEBUGGER_MESSAGE_THREAD_DEBUGGED` message as the first
event originating from the new thread.

Previously, `nat/haiku-nat.c` converted the Haiku `THREAD_CREATED` event directly to a GDB
`THREAD_CREATED` event of the same thread, and the `THREAD_DEBUGGED` event directly to a trap. This
causes the event loop to receive a bogus `THREAD_CREATED` event (because the thread reporting it
should have been running) and an unwanted `SIGTRAP` every time a new thread actually starts.

Now, new threads that are referenced in a previous `B_DEBUGGER_MESSAGE_THREAD_CREATED` event will
have a special flag set. If this flag is set, the first `B_DEBUGGER_MESSAGE_THREAD_DEBUGGED` event
on the thread will be translated to `TARGET_WAITKIND_THREAD_CREATED` instead of a trap.

## Relocation & Breakpoints

All Haiku executables are compiled as ELF shared objects, requiring relocation at runtime.

Many GDB use cases involve setting breakpoints on the main image before execution. Without knowing
the offsets, GDB would try to insert breakpoints at addresses relative to `0x0`. When the target
starts execution, the debugger would try to write to these invalid addresses. It would then fail,
preventing execution from continuing.

To prevent this issue, for targets with relocatable main executables, GDB provides
`disable_breakpoints_before_startup` to delay committing breakpoints into the target address
space. When relocation is finished, the handler can call `enable_breakpoints_after_startup`.

Haiku's `nat` code calls `disable_breakpoints_before_startup` right after a new inferior is created
and when the main executable is unloaded (which usually means an upcoming `exec` event). Then, after
the debugger successfully attaches or handles the `exec` event, the `nat` code will re-enable the
breakpoints. This will only be done if the current executable reported by the target's OS matches
the one known by GDB. Otherwise, if the inferior if executed through a wrapper shell, GDB might
commit the breakpoints too early, corrupting the address space of that shell.

## "Non-stop" and "All-stop" debugging

By default, GDB functions in "all-stop" mode. When a thread hits a debugger event, the whole process
is stopped. When the user wishes to resume, the whole process is resumed.

["Non-stop"](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Non_002dStop-Mode.html#Non_002dStop-Mode)
mode does not stop the whole process when a thread hits an event. All non-signalled threads continue
running as usual. Because the other threads are still running, many operations such as inspecting
registers or the stack trace would not work.

Haiku's Debugger API only works in non-stop mode. However, debugging in non-stop mode or emulation
of all-stop on top of non-stop in GDB is tied to another feature, asynchronous event handling. This
feature requires all debugger events to be representable as a `poll`able file descriptor. The `wait`
`target_op` method will not be called unless `poll` marks the provided FD.

On `ptrace`-based OSes, this is done by handling the `SIGCHLD` sent to the tracer every time a
tracee hits an event. The signal handler writes a pipe, marking the FD as ready for the next `poll`
in the event loop.

Haiku does not send the debugger `SIGCHLD` or similar signals. Furthermore, ports are used instead
of FDs for communicating with the debugger. A potential solution is to put all open debugger ports
into an `event_queue`, then return the file descriptor of that queue to the event loop. However,
this file descriptor type on Haiku currently
[does not support polling](https://dev.haiku-os.org/ticket/18954).

Initially, I intended to leave this unimplemented until doing such a thing is possible. However, the
feature turned out to be essential. Trying to run with a non-stop backend while claiming to be
all-stop would trigger various subtle bugs and assertion failures. Therefore, for now, I am
implementing asynchronous mode using a worker thread with a `wait_for_objects` loop. Every time
a port is reported to be readable, the thread writes to a pipe whose read end is polled by the main
loop.

Implementing this feature leads to more subtle bugs which are still under investigation.

## Debug logging

To aid debugging the debugger, GDB does not remove debug logging from release builds. Verbose
logging can be enabled using `set debug [categoryname] on`.

In the previous phase and in the original port, a `TRACE` macro was used to debug Haiku-specific
code. This macro is set to do nothing in release builds.

Now, the macro has been replaced by a `haiku_nat_debug_printf` macro which conditionally prints
information if logging for Haiku's `nat` code is enabled. This information contains all debugger
events GDB receives, all converted events returned by `haiku_nat::wait`, and other traces useful
for debugging.

To enable logging for Haiku's `nat` code, use:

```
set debug haiku-nat on
```

# Conclusion

I hope you enjoyed this blog! Or at least, I hope this can serve as a good reference for any future
maintenance.

I might have left some points behind, if there are any questions about any part of my port, please
leave them in the comments section.

### Appendix - Pull requests/patches

As usual, this is an overview of code submitted during this phase.

#### Merged

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [kernel/signal: Make DEBUG_THREAD non-deferrable (#7796)](https://review.haiku-os.org/c/haiku/+/7796)
- [kernel/debug: Report new team before resuming it (#7797)](https://review.haiku-os.org/c/haiku/+/7797)

#### Pending

##### [haikuports/haikuports](https://github.com/haikuports/haikuports)
- [gdb: Add recipe for GDB 15.1](https://github.com/haikuports/haikuports/pull/10727)
