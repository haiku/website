+++
type = "blog"
title = "[GSoC 2024] Improving the Userland Debugging Experience"
author = "trungnt2910"
date = "2024-05-12 16:13:32+10:00"
tags = ["haiku", "software", "gsoc", "gsoc2024", "gdb", "lldb", "debugger"]
+++

# Introduction

Hello again! I am Trung Nguyen (a.k.a [@trungnt2910](https://github.com/trungnt2910)). You might
have already known me as the maintainer of the
[.NET 8 Port for Haiku](https://github.com/trungnt2910/dotnet-haiku) since last year's GSoC program.

I am delighted to be accepted into GSoC again! This year, under the guidance of
[@waddlesplash](https://www.haiku-os.org/blog/waddlesplash/) - one of the experienced Haiku devs
that I admire the most, I will work on one of the core issues of software development on Haiku: the
debugging experience.

# Project overview

Currently, the native `Debugger` app is the only known working tool for local userland debugging on
Haiku. However, this tool has various bugs and limitations,
[hindering](https://discuss.haiku-os.org/t/progress-on-porting-firefox/13493/28) the process of
building complex applications, especially ports.

Moreover, for many developers working with a UNIX-like environment, the most familiar debugger
would be either GDB or LLDB. These two programs also come with lots of features that are not
present in Debugger, such as Python scripting. The debuggers (along with some library components
they provide) are also the
[building blocks](https://discuss.haiku-os.org/t/gsoc-2024-proposal-improving-the-userland-debugging-experience/14681/15)
of IDEs and other developer tools.

Providing an alternative debugger choice would also speed up the process of fixing Debugger bugs,
especially cases when Debugger crashes when trying to debug itself.

Previous attempts have been made to bring
[GDB](https://github.com/haikuports/haikuports/commit/985c28d7c71c911af2bf0b8b5984f32d5751fafc) and
[LLDB](https://github.com/kenz-gelsoft/llvm-project/commits/haiku12) to Haiku, neither of which has
produced working debuggers.

For GSoC 2024, I aim to bring a modern debugger for the first time to `x86_64` Haiku. Using the
tools I build and the knowledge I learn, I will go on to improve Haiku's native `Debugger` and the
infrastructure surrounding it.

# Goals

## Porting GDB

I will first start by examining the existing GDB 8.1 port. If some small bugs get uncovered, I will
spend a bit of time trying to fix them and see if `gdb` could launch and debug programs.

Most of the time though, I will focus on creating a new fork of GDB 14. Starting a new port from
scratch has proven to be effective in my last project by allowing me to have a fresh look at the
codebase and freeing me from potential long-standing bugs. Furthermore, the internal GDB interface
has significantly changed, moving from C to C++, requiring major refactorings if the current
patchset is to be reused.

## Fixing Debugger issues

With a stable GDB, I will go on to fix `Debugger` issues. For this phase, I will prioritize those
that has greatly affected my past experience ([#8877](https://dev.haiku-os.org/ticket/8877),
[#11596](https://dev.haiku-os.org/ticket/11596), and
[#15087](https://dev.haiku-os.org/ticket/15087)), as well as those with more interest from the
community depending on the time available.

## Porting LLDB

LLDB, unlike most other tools in the LLVM project, provides a completly different debugging
interface compared to its GNU counterpart. Some tools also depend specifically on LLDB. Therefore,
along with Haiku's native `Debugger` improvements, I will also work on a port of LLDB 18.

# Updates

Like the previous years, a real-time overview of my work can be found on my
[GitHub profile](https://github.com/trungnt2910/) on the "Contribution activity" section.

I will also start technical discussions on the `#haiku` IRC channel.

When progress is made that might interest users, I will post an update on
[this forum thread](https://discuss.haiku-os.org/t/gsoc-2024-proposal-improving-the-userland-debugging-experience/14681).

This blog will also be updated once a month with the project's progress, challenges faced, and some
insights on the undocumented Haiku Debugger API. Previews of my upcoming blog posts may also be
available on [my Reality blog](https://trungnt2910.com).

# Conclusion

Once again, I would like to express my gratitude for the continued trust and support from Haiku and
everyone from the community during the last two years. I wish to have another productive coding
adventure this year!
