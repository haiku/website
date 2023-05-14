+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Progress Report #1"
author = "Trung Nguyen"
date = "2023-05-14"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

It is barely a week since the start of GSoC, but there has been so much progress on this port.
Ideally, this progress should be coupled with some documentation before my brain's garbage
collector reclaims the reasoning, so that future maintainers can have an easier time rebasing
and porting newer versions of .NET.

# Project status overview

## Completed tasks

[My current port](https://github.com/trungnt2910/dotnet-runtime/tree/dev/trungnt2910/haiku-dotnet8)
has achieved all the tasks that the partial .NET 7 port did last summer, including:
- Passing all PAL (Platform Abstraction Layer - this is the part of CoreCLR that translates system
APIs into Win32-style functions) tests.
- [Successfully](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/32)
running a simple "Hello, World!" .NET binary on Haiku.

It also surpassed the progress made last year by:
- Successfully [building](https://github.com/dotnet/runtime/issues/55803#issuecomment-1543604826)
the runtime libaries and
[producing](https://github.com/dotnet/runtime/issues/55803#issuecomment-1543604826) a
redistributable tarball.
- Successfully [launching](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/35) the
.NET CLI tool (`dotnet(1)`) and using it to
[execute](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/36) a .NET binary like the way it
is done on other platforms.

In terms of the goals mentioned in my previous blog, I have completed the
"Update and fix CoreCLR port" part. It will take a while for my work to get merged upstream, and
as with any ports, there will be a few minor bugfixes here and there in the future, but the most
important work has been completed.

## Current plans

The next step would be to
[run more tests](https://github.com/dotnet/runtime/issues/55803#issuecomment-1545055201) and port
the managed libraries. However, it seems that some of these tests
[require](https://github.com/dotnet/runtime/issues/55803#issuecomment-1545705050) support
from the .NET SDK.

I therefore decided to start porting [dotnet/sdk](https://github.com/dotnet/sdk) first. The SDK
itself consists fully of managed C# code, and is therefore also a good test for the runtime
libraries to hunt down missing/faulty Haiku implementations.

In other words, I decided to port and test the runtime libraries _and_ the SDK (steps 2 and 3
according to my previous blog) _at the same time_.

# Technical details

While porting .NET I made few technical decisions, which should all be documented for future
references. Some technical details I present here might be incomplete and/or incorrect; please
correct me in the comments section as I am still learning new things every day.

## Cross-compilation root build (`build_rootfs.sh`)

The build system of .NET uses MSBuild, which depends on... .NET itself. To solve this problem, a
cross-compilation environment on an OS that .NET already supports is required. For this purpose,
I chose Ubuntu 23.04 running on WSL1.

.NET provides an official way to generate a cross-compilation root using their script,
[`build_rootfs.sh`](https://github.com/dotnet/arcade/blob/main/eng/common/cross/build-rootfs.sh).
Support for Haiku has already been added as a part of
[last year's effort](https://github.com/dotnet/arcade/pull/10066).

However, the script uses the traditional approach of building a whole copy of the Haiku buildtools
and then create a full Haiku image, which can take a few hours. Before GSoC, I chose to use a
[`HPREFIX`](https://gist.github.com/trungnt2910/355b7e4486cbccf3c6c013981ca0d790#build-net), which
was created by extracting pre-built `.hpkg` files from Haiku servers. However, this approach
requires (unstable) third-party tools to extract the `.hpkg` files and would not have much chance
of getting accepted into .NET.

For this effort, I decided to work with jessicah to provide
["official"](https://github.com/haiku/haiku-toolchains-ubuntu) binary builds of the Haiku
package tool as well as its cross-compilers for various platforms. These tools can then be used to
extract Haiku packages and create a full cross-compliation environment.

The [pull request](https://github.com/dotnet/arcade/pull/13437) enabling this change has been
merged.

### Behind the scenes

- To be portable, the `package` tool has to be
[built](https://github.com/haiku/haiku-toolchains-ubuntu/blob/2c37e0db148bdc125a06c2f9ff6c57ed77a5820d/.github/workflows/hosttools.yml#L72)
on `/tmp` or any other folder that exists on all Ubuntu distributions. The problematic code can be
found [here](https://github.com/haiku/haiku/blob/master/src/build/libroot/fs_attr_generic.cpp#L69),
which tries to create a directory at
[`HAIKU_BUILD_ATTRIBUTES_DIR`](https://github.com/haiku/haiku/blob/master/src/build/libroot/fs_attr_generic.cpp#L39),
which depends on
[`$outputDir`](https://github.com/haiku/haiku/blob/master/configure#L538), which is determined using
[`$currentDir`](https://github.com/haiku/haiku/blob/master/configure#L532-L536).
- Most `.hpkg` files (those that come from the `HaikuPorts` repo) are fetched using an obscure but
[documented](https://github.com/haiku/haikudepotserver/blob/master/haikudepotserver-api2/src/main/resources/api2/pkg.yaml#L60)
API of HaikuDepot. Unlike installation using `pkgman`, no dependencies are resolved.
- Packages that come from the `Haiku` repo (namely, `haiku.hpkg` and `haiku_devel.hpkg`) are
obtained using an undocumented method:
    + It first fetches `https://eu.hpkg.haiku-os.org/haiku/master/$haikuArch/current` to get a
    payload in this format:
    ```
    Route { branch: "master", arch: "x86_64", version: "r1~beta4_hrev56995", path: "master/x86_64/r1~beta4_hrev56995" }
    ```
    The payload reveals the version of Haiku available on the repository.
    + It then downloads
    `https://eu.hpkg.haiku-os.org/haiku/master/$haikuArch/current/packages/$package-$version-1-$haikuArch.hpkg`.
    In this example for `haiku.hpkg`, it should be:
    ```
    https://eu.hpkg.haiku-os.org/haiku/master/x86_64/current/packages/haiku-r1~beta4_hrev56995-1-x86_64.hpkg
    ```
    This method was obtained by doing some reverse engineering on `pkgman` while I was working on
    HyClone.

## Configuration

This part is simply:
- Add Haiku to the list of supported platforms.
- Handle common Haiku-specific problems, such as the lack of `-ldl`, `ucontext.h`, and so on.

This should be easy to understand for anyone who has any experience with porting anything to Haiku.

The full code at the time of writing is
[here](https://github.com/trungnt2910/dotnet-runtime/commit/624bad0fd79e95bdc460ad7bbd6017240ad15310).

## CoreCLR native C/C++ code

Being a general-purpose framework, .NET consumes a wide range of system APIs to achieve its tasks.
Some of these APIs are GNU/BSD extensions; fortunately Haiku's diverse API surface can cover
(most) of the use cases of the missing APIs.

The following are major problems that have been solved. There are a few other changes, but most of
those are trivial and commonly seen in other ports as well.

### Drives and filesystems

#### File system type

Haiku's `statvfs` does not provide the non-POSIX field `f_basetype`. Fortunately, we can use
the [`fs_stat_dev`](https://github.com/haiku/haiku/blob/master/headers/os/kernel/fs_info.h)
API and retrieve the `fsh_name` field.

Haiku calls the Be File System `bfs`, but it is called `befs` on other Unixes to avoid confusion
with the Boot File System. Therefore the `fsh_name` will need to be checked for the value `"bfs"`
and changed to `"befs"` before being passed to other APIs.

#### Mount point enumeration

Haiku does not provide `/proc` so we cannot parse `/proc/mounts`. Instead, a loop with
[`next_dev`](https://github.com/haiku/haiku/blob/master/headers/os/kernel/fs_info.h#L46) is used.

The PAL's mount point enumeration requires the results to be provided as mount path strings, so
the device ID has to be converted into paths in some way. Haiku does not provide an API to directly
achieve this, but a workaround like this can be done:

```cpp
    struct fs_info info;
    if (fs_stat_dev(currentDev, &info) != B_OK)
    {
        continue;
    }

    char name[B_PATH_NAME_LENGTH];
    // Two bytes for the name as we are storing "."
    char buf[sizeof(struct dirent) + 2];
    struct dirent *entry = (struct dirent *)&buf;
    strncpy(entry->d_name, ".", 2);
    entry->d_pdev = currentDev;
    entry->d_pino = info.root;

    if (get_path_for_dirent(entry, name, sizeof(name)) != B_OK)
    {
        continue;
    }
```

[`get_path_for_dirent`](https://github.com/haiku/haiku/blob/master/src/system/libroot/os/fs_query.cpp#L89)
internally calls `_kern_entry_ref_to_path`, a non-public syscall that has the ability to transform
a `(dev, ino, filename)` tuple into a full path. We therefore pass the inode of the root (obtained
through `struct fs_info`) with the name `"."` and the current device ID to obtain the full mount
path.

### Network changes

On other UNIXes, network changes are watched using magic sockets. Haiku does not provide these
sockets, it does however provide `start_watching_network`.

`start_watching_network` differs from what other UNIXes provides in many ways:
- The magic socket returns a file descriptor that can be used with internal .NET classes. On the
other hand, the Haiku implementation uses creates a special `BLooper` (which is required for
`start_watching_network`) and returns a handle to it.
- Other UNIXes spawn a thread with a loop to read the magic socket. On Haiku, `BLooper` handles
the loop.

To minimize the number of additional APIs exported by the PAL, I have reused the names exported
by other UNIXes to provide a Haiku-specific implementation:

```c
// Despite the name, this function does not create a socket like on
// other UNIXes. Instead, it returns a handle to a NetworkChangeLooper.
Error SystemNative_CreateNetworkChangeListenerSocket(intptr_t* handle)
```

```c
SystemNative_ReadEvents
Since the CoreCLR's build scripts check that for all platforms the list of exported functions are
the same, if these two names remained unused they would have to be stubbed anyway.
```

### Error numbers

Haiku has different `errno` values from most other UNIX OSes. A
[file](https://github.com/trungnt2910/dotnet-runtime/commit/a5ce586adb0c5a9de1c54a4a64d9f42cec1260e9#diff-cef7ab5a4d4422a1cb898630331a3c5c21255da8e2cde1166532677cf5deb32b)
containing `errno` mappings has therefore been added.

### Process/system information

While not producing any compile errors, code that tries to access `/proc/**` to obtain
process/system information are problematic on Haiku.

For this reason, it is important to watch out for any references to `/proc` in the codebase and
provide alternative Haiku implementations, such as replacing `/proc/meminfo` with values obtained
by `get_system_info`.

A nice trick for files containing many `/proc/` references is to follow what Apple does, since
Darwin, like Haiku, does not provide `procfs`. Try to find `__APPLE__` and similar macros and add
Haiku-specific implementations next to them.

### Process unique identifiers

The PAL contains a function
[`GetProcessIdDisambiguationKey`](https://github.com/trungnt2910/dotnet-runtime/commit/a5ce586adb0c5a9de1c54a4a64d9f42cec1260e9#diff-236bca3ea8ce55b54c55c47ab9d21a4db9596eb3fbc6052565a81a2ebb3ee73f)
that tries to distinguish between a process with something that started a while ago but with the
same PID.

On most platforms, the disambiguation key is obtained by using the process start time. On Haiku,
such an API does not exist.

Instead, I took advantage of the fact that `area_id`s are unique across the system and never
gets reused until reboot or overflow (according to the
[Be Book](https://www.haiku-os.org/legacy-docs/bebook/TheKernelKit_Areas_Overview.html)). I used
the area id of the main application image as the disambiguation key.

There actually is a flaw in this approach: Some malware might be able to create a few billion
areas and then watch for the time the desired PID is available. This, however, requires
incredible timing and is very unlikely to occur.

### Getting a handle to an existing library

.NET uses the non-POSIX flag `RTLD_NOLOAD` to obtain a handle to an existing library without
loading it.

Haiku does not support `RTLD_NOLOAD`. Therefore, a solution using `get_next_image_info` and
looping through the names of existing libraries is used instead.

### Maximum application address

The magic value `0x7fffffe00000ul` was obtained by including this
[private header](https://github.com/haiku/haiku/blob/master/headers/private/kernel/arch/x86/arch_kernel.h)
and printing out `USER_TOP + 1`. To validate this result, try to `mmap` something with `MAP_FIXED`
there and assert that the mapping request failed.

### `termios`

Before the port Haiku was missing a few ioctls: `TIOCOUTQ`, `TIOCEXCL`, and `TIOCNXCL`.
These operations are important to provide .NET serial port support, and adding suppport for these
to Haiku was not too difficult so I patched the Haiku tty module instead of adding `#ifdef` blocks
to .NET.

In additions to the resolved issues above, there are also few problems in this port that I decided
to leave stubbed:

### `MALLOC_SIZE`

At the time of writing this was also
[stubbed](https://github.com/trungnt2910/dotnet-runtime/commit/a5ce586adb0c5a9de1c54a4a64d9f42cec1260e9#diff-a48ff8b65a23e204903dc25dba8f8432e202add2b0a1024c0af715393ef1ce16)
on SunOS. Furthermore, I did not know what this function does so I kept it unimplemented similar to
SunOS.

### Processor context

Haiku, unlike other UNIXes, does not provide a way to retrieve the CS segment register from its
`struct vregs`.

This register does not seem to be important for usermode applications and therefore adding it to
Haiku does not gain much benefits (other than
[removing](https://github.com/trungnt2910/dotnet-runtime/commit/a5ce586adb0c5a9de1c54a4a64d9f42cec1260e9#diff-eb14b2a3e90e2d0548c465157fcf8480b33fa3b83c1594c068486fe894d32bfe)
a few messy `#ifdef`s).

### Access to other process's address space

The PAL provides
`PAL_ReadProcessMemory`(https://github.com/trungnt2910/dotnet-runtime/blob/a5ce586adb0c5a9de1c54a4a64d9f42cec1260e9/src/coreclr/pal/src/debug/debug.cpp#L651),
which reads the memory of the target process. It does not seem to attach a debugger of any kind
on other platforms.

On Haiku, the only way of reading it is by attaching a debugger (but only one process can
attach a debugger at a time) or `clone_area` (which requires the target memory to have a
special `B_CLONEABLE_AREA` flag set by default).

The function is said to be
[non-critical](https://github.com/dotnet/runtime/issues/55803#issuecomment-1538466881) so
I am keeping it unimplemented on Haiku for the time being (It should fail when trying to
access `/proc/$pid/mem`).

I have requested adding support for a new
[syscall](https://discuss.haiku-os.org/t/new-syscall-request/13454) that can solve this problem
and another one below, but the proposal does not seem to be supported by Haiku developers.

### Memory reservation

.NET seems to use the two-step memory allocation process as on
[Windows](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualalloc):

> MEM_RESERVE:  Reserves a range of the process's virtual address space without allocating any actual
> physical storage in memory or in the paging file on disk.
>
> MEM_COMMIT: Allocates memory charges (from the overall size of memory and the paging files on
disk) for the specified reserved memory pages.
>
> [...]
>
> An attempt to commit a page that is already committed does not cause the function to fail.
> This means that you can commit pages without first determining the current commitment state of
> each page.

#### First potential solution: `mmap` and `mprotect`

This is the solution used on all other UNIXes.

`mmap` is called with `PROT_NONE` in order to reserve memory. Then, `mprotect` is called with a
non-zero protection to commit memory.

On most UNIXes, `mmap` with `PROT_NONE` does not cause the kernel to reserve any pages. This
behavior is crucial since CoreCLR regularly reserves huge chunks of memory, up to 256GB on
x86_64.

However, Haiku does not have this behavior. It tries to commit memory and reserve swap space
for all new mappings regardless of protection, unless a special flag `MAP_NORESERVE` is passed.

The `MAP_NORESERVE` workaround is currently used. This also means Haiku will
[ignore](https://github.com/haiku/haiku/blob/e82f2e19431b5797fd18c8d7bf0f677080894103/src/system/kernel/vm/VMAnonymousCache.cpp#LL724C1-L729C1)
any committing requests. Furthermore, Haiku
[does](https://github.com/haiku/haiku/blob/e82f2e19431b5797fd18c8d7bf0f677080894103/src/system/kernel/vm/vm.cpp#LL2843C1-L2858C5)
attempt to commit pages when the protection is changed from none to writable, but this only applies
to whole-area protection changes. It does not work for .NET, which tries to commit small chunks
as needed.

Having `MAP_NORESERVE` even on memory regions that should have been committed can cause problems
in low memory situations. While on other platforms, .NET should have failed to allocate memory
from the commit step and take appropriate actions, on Haiku the CLR will still seem to
successfullly "commit" the pages and then trip at a surprise `SIGSEGV` when trying to access the
seemingly committed pages.

For most use cases though, this is the simplest and cleanest implementation and is therefore
chosen.

#### Second potential solution: `_kern_reserve_address_range` and `mmap`

We can also use the private Haiku syscall `_kern_reserve_address_range` to reserve a block of
memory (this is already used somewhere in `libroot` for the heap) and then `mmap` with `MAP_FIXED`
for the commit step.

This sounds really similar to what Windows does, except for one important detail:

> An attempt to commit a page that is _already committed_ does **not** cause the function to fail.
> This means that you can commit pages without first determining the current commitment state of
> each page.

(Emphasis mine)

This means that to correctly implement this method, we have to use area management APIs like
`area_for` and `get_next_area_info` to scan for existing areas in the requested range. This opens
a chance for a race condition to occur if other threads and/or user code tries to do things with
the virtual memory in the process.

#### Solution with requested syscall

Like I said above, I am currently
[requesting](https://discuss.haiku-os.org/t/new-syscall-request/13454) a new syscall on Haiku:

```c
extern area_id _kern_remap_memory(const char *name, team_id targetTeam, void **address,
                                  uint32 addressSpec, size_t size, uint32 protection,
                                  bool unmapAddressRange,
                                  team_id sourceTeam, void* sourceAddress);
```

If implemented, this would become a god call serving many different memory manipulation needs,
from sharing pages, reading another process's pages, re-mapping pages with different protections
(not only regular protections like read/write/execute but also other Haiku's extended flags like
`B_OVERCOMMITTING_AREA`), combining the functionality of `clone_area`, `set_area_protection`, and
`_kern_transfer_area` without forcing the caller to be bound by area ranges.

There is already sufficient existing infrastructure in `src/system/kernel/vm/vm.cpp` to implement
this call; however, it seems like the addition of such a call is not so welcome by Haiku
developers.

So for now, beware that instead of having the garbage collection cleaning up stuff or at least
having a nice `OutOfMemoryException`, you can run into random crashes while busy
[clicking circles](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/21) 🙂.

# Conclusion

.NET is one tricky port, and getting such a thing to run on Haiku is a real lot of work. Bringing
the port back to life in just one week seems like magic to me.

I am sure that 99% of the readers would ignore the technical details and skip here, but I am still
including it to help any future maintainers of .NET for Haiku. This framework evolves rapidly; one
year or two later new Haiku-specific bugs are inevitable, and these details about the initial port
can help future devs make the correct choices.

I might have left some points behind, if there are any questions about any part of my port,
feel free to leave them in the comments section.

### Appendix - Pull requests/patches

Previous GSoC contributors seem to have been
[required](https://github.com/haiku/website/pull/606#issuecomment-1243781212) to include tags or
branches in their final reports.

My work is scattered among different branches, repos, and organizations, so I will instead
maintain a list of related pull requests/patches in each blog.

#### Merged
##### [dotnet/arcade](http://github.com/dotnet/arcade)
- [Haiku: Fix infrastructure support (#13437)](https://github.com/dotnet/arcade/pull/13437)

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)
- [headers/bsd: Export pthread_attr_get_np](https://review.haiku-os.org/c/haiku/+/6383)
- [headers/posix: Add TIOCM_RNG as a synonym for TIOCM_RI (#6385)](https://review.haiku-os.org/c/haiku/+/6385)
- [termios: New ioctl: TIOCOUTQ (#6386)](https://review.haiku-os.org/c/haiku/+/6386)
- [kernel/vm: Fix area_for with PROT_NONE address (#6388)](https://review.haiku-os.org/c/haiku/+/6388)
- [kernel/vm: Allow more maximum protection for mmap'ed areas (#6389)](https://review.haiku-os.org/c/haiku/+/6389)
- [tty: Implement exclusive mode (#6387)](https://review.haiku-os.org/c/haiku/+/6387)

#### [haiku/buildtools](https://review.haiku-os.org/admin/repos/buildtools,general)
- [gcc/config: Drop cdecl and stdcall built-in defines (#6384)](https://review.haiku-os.org/c/buildtools/+/6384)

#### Pending
##### [dotnet/runtime](http://github.com/dotnet/arcade)
- [[VM] Fix potential double free (#86207)](https://github.com/dotnet/runtime/pull/86207)
