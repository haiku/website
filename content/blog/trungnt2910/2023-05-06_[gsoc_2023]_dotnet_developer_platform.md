+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform"
author = "Trung Nguyen"
date = "2023-05-06"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

# Introduction

Hello everyone! I am Trung Nguyen, also known as [@trungnt2910](https://github.com/trungnt2910)
on GitHub and other social media sites. This year, I am a first-year computer science student at
the University of Wollongong in Australia.

I have been working with Haiku since 2019 as a Google Code-In participant, and since 2022 with
a few occasional contributions.

This summer (or actually, winter), as part of the GSoC program, I am very excited to work with
my mentor [@jessicah](https://github.com/jessicah), as well as the rest of the Haiku community,
to port the .NET Developer Platform to Haiku.

# Project overview

There has been interest in developing with C# on Haiku since at least
[2005](https://discuss.haiku-os.org/t/c/564), and some work seems to have been done in
[2017](https://discuss.haiku-os.org/t/porting-mono/5403) to port Mono to Haiku.

In [2021](https://github.com/dotnet/runtime/issues/55803), @jessicah started to lay the groundwork
for a port of .NET 6, but the port was blocked by some other dependencies not ported to Haiku yet.
Later, in 2022, I added missing dependencies to HaikuPorts and
[completed](https://github.com/dotnet/runtime/issues/55803#issuecomment-1163457992) the port of
CoreCLR (the low-level runtime of .NET).

However, due to the rapidly evolving nature of the .NET platform, after a period of inactivity,
this port is currently broken. Some lower-level tests still pass on
[HyClone](https://gist.github.com/trungnt2910/355b7e4486cbccf3c6c013981ca0d790#run-coreclr-pal-tests),
but are failing on a normal Haiku build.

For GSoC 2023, I aim to bring this port back to life, along with porting additional components to
Haiku to enable a full .NET developer experience on this operating system.

Some work has already started; at the time of writing I am waiting for approval from .NET members
for [this](https://github.com/dotnet/arcade/pull/13437) pull request.

# Goals

## Update and fix CoreCLR port

There is already some existing code to support CoreCLR, but as mentioned above, this code is
outdated and broken on the latest Haiku version. Furthermore, the codebase contains
[a lot of](https://github.com/trungnt2910/dotnet-runtime/commits/haiku-dotnet7?after=cedee6dbb1103fb4786f71638cf565a2c928c90d+34&branch=haiku-dotnet7&qualified_name=refs%2Fheads%2Fhaiku-dotnet7)
"hacks" and "temporary workarounds" that will need to be addressed.

This phase will focus on three subtasks:

- Rebase: Keep the source up to date with the huge amount of upstream changes.
- Refine: Visit all hacks and replace them with proper implementations (or clearly document the
reasons if this hack is inevitable).
- Restructure: Group a few dozen unrelated commits from the branch mentioned above into PRs that
can be opened and get reviewed by .NET maintainers.

## Port and test runtime libraries

This phase should contain a bit less work as the runtime libraries mostly depend on native
abstractions provided by the CoreCLR. However, a few C# classes, such as those managing processes,
call OS-specific APIs directly. For these classes, an implementation using the native Haiku API
should be provided.

The test suite that comes with these runtime libraries should be run to prevent any subtle
bug in the CoreCLR, or deeper down in `libroot.so` or even the kernel from unexpectedly affecting
.NET applications during runtime.

## Port and test the SDK

This phase should focus on getting the `dotnet` command line tool to work on Haiku. The work for
this should mostly involve fixing configuration files and packaging definitions.

## Test the runtime with cross-platform applications

GtkSharp applications would be an easy target given the availability of GTK3/4 on Haiku.

Some other applications will also be tested based on community interest, for example the game
OSU! based on SDL2#.

## Haiku-specific SDK

Should this project still have plenty of spare time, .NET bindings for the Be API can be generated.
It is theoretically possible to generate classes with `LibraryImport` functions from `libbe.so`.
Some other aspects such as member variables, inheritance,... can also be generated.

There might have to be some workarounds when dealing with `template`/`inline` classes/functions,
but these will be discussed later when the project reaches this state.

# Updates

My .NET port is located [here](https://github.com/trungnt2910/dotnet-runtime). Some work might be
spread out to other `dotnet`-prefixed repositories, such as
[dotnet-arcade](https://github.com/trungnt2910/dotnet-arcade).

A real-time overview of my work can be found on my
[GitHub profile](https://github.com/trungnt2910/) on the "Contribution activity" section.

Technical discussions will happen on the `#haiku` IRC channel if it is more related to Haiku,
and [this issue](https://github.com/dotnet/runtime/issues/55803) if it is closer to .NET.
This issue is also the place I post minor status updates.

When a major goal is reached that might interest users, I will post an update on
[this forum thread](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237).

This blog will also be updated once a month with the project's progress as well as challenges
by that time.

# Conclusion

Once again, I would like to thank Haiku for selecting me as a participant for the GSoC, as well
as everyone in the community for supporting my proposal. I am looking forward to a challenging
but productive coding season this year!
