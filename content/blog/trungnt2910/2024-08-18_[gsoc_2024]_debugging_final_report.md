+++
type = "blog"
title = "[GSoC 2024] Improving the Userland Debugging Experience - Final Report"
author = "trungnt2910"
date = "2024-08-18"
tags = ["haiku", "software", "gsoc", "gsoc2024", "gdb", "gdbserver"]
+++

# Project overview

A part of Google Summer of Code 2024, this project aimed to improve the userland debugging
experience for Haiku app developers, boosting the process of building and porting complex
applications.

The first objective was to have a working build of a modern version of GDB running on Haiku
`x86_64` - the most popular architecture with stable Haiku. Using some ideas from the incomplete
[recipe](https://github.com/haikuports/haikuports/commit/985c28d7c71c911af2bf0b8b5984f32d5751fafc)
for GDB 8.1, I have ported GDB 15.1 to Haiku from the ground up.

During this process, I have detailed my implementation choices and some relevant internal parts of
both GDB and the Haiku debugger API through my
[blog posts](https://www.haiku-os.org/blog/trungnt2910/).

GDB 15.1 is now available on HaikuPorts, and can be installed using `pkgman install gdb`.

The original proposal also mentioned fixing the built-in `Debugger` and porting another popular
debugger, LLDB. However, multiple problems encountered when dealing with subtleties in the GDB
codebase have prevented this from happening in the project's timeline. I chose to prioritize
ensuring the quality of the GDB port, providing a stable tool for developers to connect to their
favorite IDEs, both on Haiku (Qt Creator) or other OSes (NetBeans, VS Code). This, I believe, should
deliever the greatest impact to the developer community.

## Completed objectives

I have built a stable version of GDB on Haiku:

- Had the latest GDB (15.1, instead of the then current 14.1) running with applicable local
debugging features (launching, attaching, breakpoints, memory, registers, and OS information)
working on `x86_64` Haiku.
- Ensured the port's compatibility with popular IDE frontends.
- Tested GDB's ability to debug typical Haiku programs, such as `Debugger` itself.
- Distributed the port as a HaikuPorts package.

## Unresolved issues

The project did not have enough time to move on to the next phases:

- `Debugger`: While work has been done to ensure GDB can consistently attach to `Debugger`, no
issues have been worked on.
- LLDB: The project ended before work is done on LLDB. However, the information in my blog posts
would greatly assist future LLDB porting attempts:
  + `Plugin/Platforms` corresponds to GDB's target-dependent `tdep` code.
  + `Plugin/Process` corresponds to GDB's native-dependent `nat` code. `NativeProcess` is similar
  to my port's `team_debug_context`, and `NativeThread` is similar to `thread_debug_context`.

## Future work

These are the work I expect to do in the near future after GSoC ends:

- Work with GDB developers to upstream the rest of the patches.
- Port GDB to other architectures with high interest, such as `x86` or `riscv`.
- Respond to any community requests through GitHub issues and the discussion forum.

I can also help with future attempts to port LLDB or to bring more GDB features to Haiku such as
automatically fetching debug information, if there is more community interest.

# Technical details

## Project structure

### GDB fork

For the project, I work on a fork of `binutils-gdb` on
[GitHub](https://github.com/trungnt2910/gdb-haiku).

The port is based on one of GDB's release branches, `gdb-{version}-branch`. The corresponding Haiku
branches are named `gdb-{version}-haiku`, including:
- `gdb-8.1-haiku`: Early attempts to fix the old patchset, now abandoned.
- `gdb-14-haiku`: My first functional port of GDB. Now abandoned after the release of GDB 15.
- `gdb-15-haiku`: My latest port with all the features and bugfixes during this project.

The commits are squashed to match what will be sent to HaikuPorts and upstream to GDB and do not
reflect actual development progress.

### HaikuPorts recipe

The correct commands to build the GDB port are located in the
[HaikuPorts](https://github.com/haikuports/haikuports/blob/master/dev-util/gdb/gdb-15.1.recipe)
recipe, `dev-util/gdb/gdb-15.1.recipe`. A patchset mirroring the `gdb-15-haiku` branch is also
included.

## List of contributions during GSoC

### haiku/haiku

Changes were made to the kernel to expose more debugging functionality or reasonably change some
behavior to match what GDB expects.

- [headers/bsd: Remove Haiku-specific include deps (#7642)](https://review.haiku-os.org/c/haiku/+/7642)
- [kernel/debug: Report team/thread exit status (#7736)](https://review.haiku-os.org/c/haiku/+/7736)
- [kernel/debug: Report killing signals (#7756)](https://review.haiku-os.org/c/haiku/+/7756)
- [kernel/signal: Make DEBUG_THREAD non-deferrable (#7796)](https://review.haiku-os.org/c/haiku/+/7796)
- [kernel/debug: Report new team before resuming it (#7797)](https://review.haiku-os.org/c/haiku/+/7797)

### haikuports/haikuports

This contains commands and source changes required to build the GDB port on Haiku.
A browsable version of the codebase is available on
[my GitHub repository](https://github.com/trungnt2910/gdb-haiku/tree/019ad2f8cffccb9ab8608034455165135d2e116c)

- [gdb: Add recipe for GDB 15.1 (#10727)](https://github.com/haikuports/haikuports/pull/10727)
- [gdb: Improve GDB 15 stability (#10799)](https://github.com/haikuports/haikuports/pull/10799)

### binutils-gdb

This patch is currently under review by GDB maintainers for upstreaming.

- [[PATCH v2][PR 30630] gdb/remote: fix assertion failure during startup](https://sourceware.org/pipermail/gdb-patches/2024-July/210771.html)

# Conclusion

That's the end of another Google Summer of Code season!

I hope the Haiku community finds my contributions useful, and I look forward to deliver more
interesting projects in the future as the OS reaches R1.

# Acknowledgements

First of all, I would like to thank my mentor, waddlesplash, for his help in demystifying the deep
corners of the OS and discussing solutions to more complex problems.

I would like to thank the Haiku organization for guiding me through the open source journey since
the days I started programming.

I appreciate all the community members who have tested my work and reported issues, especially X512
and my fellow GSoC participants dalme and zardshard.

And once again, I would like to thank my family for all the valuable support for my application and
participation in this program.
