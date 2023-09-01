+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Final Report"
author = "Trung Nguyen"
date = "2023-08-20"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet"]
+++

# Project overview

This project, a part of Google Summer of Code 2023, aims to port the .NET Developer Platform - a
popular open-source framework - to Haiku, following various requests from the community to have a
way to build C# or run .NET applications on this OS.

The project picks up an incomplete port in 2022 by myself -
[@trungnt2910](https://github.com/trungnt2910) - and [@jessicah](https://github.com/jessicah) and
brings essential components of the .NET platform (its runtime and SDK) to Haiku. It also provides
infrastructure to continuously build and distribute the Haiku version of .NET, and an additional
workload allowing developers to build Haiku-specific applications.

While working on the port, I also explained my implementation choices as well as provided an
insight on how .NET interacts with the Haiku ecosystem through my five progress
[blog posts](https://www.haiku-os.org/blog/trungnt2910/).

It is possible to download and try .NET for Haiku by following the instructions at my
[dotnet-builds](https://github.com/trungnt2910/dotnet-builds) repository. The Haiku workload can
be installed by following the steps at [dotnet-haiku](https://github.com/trungnt2910/dotnet-haiku).
My code contributions span a wide range of commits and repos, and are listed
[below](#list-of-contributions-during-gsoc).

## Completed objectives

I have completed most of the objectives mentioned in my original proposal:

- Rebased the existing .NET 7 port to the latest version of .NET 8.
- Ported the CoreCLR, system libraries, .NET SDK and `dotnet` CLI to Haiku.
- Tested .NET with some popular third-party libraries like `GtkSharp` and `FNA`.
- Generated .NET bindings for Haiku API kits, allowing developers to create Haiku-native apps with
C#.

## Unresolved issues

There are still a few problems I cannot solve as the GSoC period ends:

- Unmerged patches: Many patches to .NET have not been accepted. This might be because the GSoC
coding period lies in the later stages in preparation for .NET 8 - a LTS release.
- Inability to build .NET from source on Haiku: Currently, building .NET requires certain binary
dependencies which may not exist on Haiku yet. `clang` support on Haiku is also poor, causing
problems when building native components.
- Lack of testing: Tests for native components run well on Haiku, but other tests require the
ability to build the whole framework from source.
- Unimplemented features: Some less essential yet complicated portions are not implemented, most
notably `System.Net.NetworkInformation`.
- Lack of HaikuPorts recipe: .NET 8 is still in prerelease, so it cannot be packaged on HaikuPorts
yet.

## Future work

These are the work I expect to do in the near future after GSoC ends:

- Continue working with .NET developers to upstream patches. There might be more chance for major
changes like this to land on .NET 9, being a STS release.
- Provide .NET builds until at least the release of .NET 8.
- Watch for updates at [dotnet/dotnet](https://github.com/dotnet/dotnet). This is the official way
to build .NET entirely from source. It currently only supports Linux, but when support grows to
other platforms, this may be the solution for some issues faced when trying run a .NET source build
on Haiku.
- Respond to any community requests through GitHub issues.

If there is more community interest, I can also continue to polish the .NET Haiku workload by
extending support to more kits, generating documentation, and adding more Haiku-specific
functionality like compiling resources definitions or generating HaikuPorts recipe files.

## Experience gained during GSoC

- Kernel and system software development:
    + Fixed 6 different kernel memory bugs.
    + Implemented UNIX domain datagram sockets, an important missing feature.
    + Made 8 other patches fixing problems and improving system software.
- Debugging: Fix a variety of problems, including 3 bugs overlooked by Microsoft, using a creative
combinations of tools and techniques, in environments lacking a good debugger.
- DevOps: Set up infrastructure surrounding the project, including 2 CI workflows, a NuGet feed,
and a webhook connecting repositories together.
- Working with code without documentation: Analyzing undocumented code from both .NET and Haiku to
solve problems as well as writing 5 blog posts (around 1500 lines) documenting the solutions.
- Communicating with different parties and stakeholders: Actively working with 3 different
organizations to ensure functional software, and frequently engaging with the community during the
project.

# Technical details

## Project structure and infrastructure

This project mirrors some of the complexity of the official one from .NET. It spans across multiple
repositories and makes extensive use of free infrastructure provided by GitHub.

### Forks of .NET repositories

Each repository of `dotnet/{repo_name}`, when ported to Haiku, is forked to
`trungnt2910/dotnet-{repo_name}`. There are currently four of these repos:
- [trungnt2910/dotnet-runtime](https://github.com/trungnt2910/dotnet-runtime): The core runtime.
- [trungnt2910/dotnet-sdk](https://github.com/trungnt2910/dotnet-sdk): The SDK.
- [trungnt2910/dotnet-msbuild](https://github.com/trungnt2910/dotnet-msbuild): MSBuild.
- [trungnt2910/dotnet-arcade](https://github.com/trungnt2910/dotnet-arcade): Some build scripts
synchronized across multiple .NET repositories.

For each of these repos, the default branch `haiku-dotnet{latest_version}` is updated with the
changes in the `main` branch upstream. Currently, this branch is `haiku-dotnet9`.

Older versions like `haiku-dotnet8` are updated with .NET's `release/{version}` stable release
branches.

For repositories with more than one patch applied, such as `trungnt2910/dotnet-runtime`, each patch
is kept in a separate branch, `dev/trungnt2910/{feature_name}`. Currently, the active branches are:
- `dev/trungnt2910/haiku-config`: Tracking unmerged pull request
[#86391](https://github.com/dotnet/runtime/pull/86391).
- `dev/trungnt2910/haiku-pal`: Native (C++) support for the runtime on Haiku.
- `dev/trungnt2910/haiku-lib`: Managed (C#) support for system libraries on Haiku.

This separation of branches makes opening and keeping track of pull requests easier.

### Automatic .NET builds

The forks mentioned above are configured to trigger a webhook on push. Whenever the push is
detected to be on any of the `haiku/dotnet{version}` branches, a CI run is triggered on
`trungnt2910/dotnet-builds`. This produces a complete build of .NET for Haiku, containing
the runtime and the SDK, cross-compiled from Linux.

The same CI is also triggered when:
- Some script has been modified in the `trungnt2910/dotnet-builds` repository.
- A new week has started according to GMT time. These weekly builds helps detect any potential
problems caused by updates on the Haiku side.
- A request from the owner of the `trungnt2910/dotnet-builds` repository has been received.

When the CI run succeeds, artifacts are uploaded, NuGet packages are pushed, and a release
containing a downloadable tarball is created. The custom `dotnet-install.sh` script included in
this repository relies on these releases.

### .NET SDK workload for Haiku

The .NET SDK workload for Haiku (`trungnt2910/dotnet-haiku`) is built (nearly) from scratch by
me and is not based on an existing repository by `dotnet`. It is built separately from the rest of
the runtime.

The CI for this repository only triggers whenever a new push is done to `master`. (This might
be problematic when Haiku makes a header change, potentially breaking `CppSharp`, but suffices
for now).

### .NET Haiku NuGet feed

Each GitHub account has a free NuGet feed associated with GitHub packages. Both `dotnet-builds`
and `dotnet-haiku` push their resulting NuGet packages to my personal feed,
`https://nuget.pkg.github.com/trungnt2910/index.json`. Many core functionality of .NET requires
certain NuGet packages to be available. For Haiku, these packages are downloadable from the
mentioned feed.

I cannot upload the packages to the default public feed, `nuget.org`, because:
- Most packages published on NuGet are there forever. They cannot be removed. This can be
undesirable as the packages I am working with are unstable and are for testing purposes only.
- Many packages' names start with `Microsoft.`, which is reserved for official Microsoft packages
only. (If Haiku decides to make my C# bindings official, we could also reserve the `Haiku` prefix
on NuGet when our packages are ready for release).

## List of contributions during GSoC

### haiku/haiku

#### Virtual memory management improvements

.NET makes complicated use of its virtual memory pages to store its JIT'ed code and its heap. This
reveals a lot of bugs as well as a few missing features on Haiku.

- [kernel/vm: Fix area_for with PROT_NONE address (#6388)](https://review.haiku-os.org/c/haiku/+/6388)
- [kernel/vm: Allow more maximum protection for mmap'ed areas (#6389)](https://review.haiku-os.org/c/haiku/+/6389)
- [kernel/vm: Make cut_area respect overcommitting flag (#6391)](https://review.haiku-os.org/c/haiku/+/6391)
- [kernel/vm: unlock cache before unmapping addresses (#6392)](https://review.haiku-os.org/c/haiku/+/6392)
- [kernel/vm: handle page protections in cut_area (#6395)](https://review.haiku-os.org/c/haiku/+/6395)
- [kernel/vm: check if page is in area (#6496)](https://review.haiku-os.org/c/haiku/+/6496)

- [kernel/vm: Add clone_memory syscall (#6616)](https://review.haiku-os.org/c/haiku/+/6616) (Unmerged)

#### Socket improvements

Haiku's implementation of UNIX sockets was incomplete, most notably `SOCK_DGRAM` datagram sockets.
This prevented some .NET applications from functioning properly.

- [unix: Implement datagram sockets (#6617)](https://review.haiku-os.org/c/haiku/+/6617)
- [unix: Implement SO_RCVBUF (#6816)](https://review.haiku-os.org/c/haiku/+/6816)

#### Terminal

Some terminal features that will reduce the need of Haiku-specific compile-time workarounds.

- [termios: New ioctl: TIOCOUTQ (#6386)](https://review.haiku-os.org/c/haiku/+/6386)
- [tty: Implement exclusive mode (#6387)](https://review.haiku-os.org/c/haiku/+/6387)

#### Miscellaneous

- [headers/bsd: Export pthread_attr_get_np](https://review.haiku-os.org/c/haiku/+/6383)
- [headers/posix: Add TIOCM_RNG as a synonym for TIOCM_RI (#6385)](https://review.haiku-os.org/c/haiku/+/6385)
- [kernel/team: Allow retrieving more attributes (#6390)](https://review.haiku-os.org/c/haiku/+/6390)
- [libroot: fix pthread_[g/s]etschedparam (#6556)](https://review.haiku-os.org/c/haiku/+/6556)
- [headers/os: Make headers generator-friendly (#6716)](https://review.haiku-os.org/c/haiku/+/6716)
- [headers: Explicitly hide BAlert functions (#6718)](https://review.haiku-os.org/c/haiku/+/6718)

### haiku/buildtools

- [gcc/config: Drop cdecl and stdcall built-in defines (#6384)](https://review.haiku-os.org/c/buildtools/+/6384)

### dotnet/runtime

The pull requests below adds support for Haiku and fixes some bugs overlooked by .NET engineers
that only surface when running on this OS.

- [Initial build configuration for Haiku (#86303)](https://github.com/dotnet/runtime/pull/86303)
- [[VM] Fix potential double free (#86207)](https://github.com/dotnet/runtime/pull/86207)
- [[libs] Fix poll events conversion (#86843)](https://github.com/dotnet/runtime/pull/86843)
- [[VM] Fix potential undefined behavior (#87119)](https://github.com/dotnet/runtime/pull/87119)

- [Haiku: Configuration support (#86391)](https://github.com/dotnet/runtime/pull/86391) (Unmerged)

Apart from the pull requests, the repository also contains a few commits, regularly rebased on top
of the latest commits from upstream. At the time of writing, these commits are:

- [Haiku: Initial CoreCLR support (ba3315a5)](https://github.com/trungnt2910/dotnet-runtime/commit/ba3315a5)
- [Haiku: Initial managed libraries support (62f9a0a8)](https://github.com/trungnt2910/dotnet-runtime/commit/62f9a0a8)

### dotnet/arcade

- [Haiku: Fix infrastructure support (#13437)](https://github.com/dotnet/arcade/pull/13437)

- [Haiku: Update arcade support (#13755)](https://github.com/dotnet/arcade/pull/13755) (Unmerged)

### Other .NET repositories

As the pull requests in `dotnet/runtime` are still pending, it does not make sense to open patches
to these higher-level repositories that depend on the runtime. The commits below are therefore kept
in my personal forks.

They are all small patches to make the corresponding components aware of Haiku.

- [dotnet/sdk: Add support for Haiku (103b9510)](https://github.com/trungnt2910/dotnet-sdk/commit/103b9510)
- [dotnet/msbuild: Add support for Haiku (55321f23)](https://github.com/trungnt2910/dotnet-msbuild/commit/55321f23)

### mono/CppSharp

These commits are related to bugs encountered when generating C# bindings for the Haiku API.

- [CSharpExpressionPrinter: Wrap expression in parenthesis (#1741)](https://github.com/mono/CppSharp/pull/1741)
- [CSharpExpressionPrinter: Recurse into operands (#1745)](https://github.com/mono/CppSharp/pull/1745)
- [CSharp: More default parameter fixes (#1747)](https://github.com/mono/CppSharp/pull/1747)
- [Array marshalling (#1748)](https://github.com/mono/CppSharp/pull/1748)
- [SymbolResolver: Use filename when path cannot be found (#1752)](https://github.com/mono/CppSharp/pull/1752)
- [CSharpSources: Dereference pointer variables (#1753)](https://github.com/mono/CppSharp/pull/1753)

### trungnt2910/dotnet-builds

This repository contains CI scripts, installation scripts, and some documentation.

The last commit done within GSoC 2023 is
[363e1db6](https://github.com/trungnt2910/dotnet-builds/tree/363e1db6).

### trungnt2910/dotnet-haiku

This repository contains binding generators for the Haiku API, source code for the .NET workload
for Haiku, CI scripts, installation scripts, and some documentation for this component.

The last commit done within GSoC 2023 is
[46876b14](https://github.com/trungnt2910/dotnet-haiku/tree/46876b14).

# Conclusion

Time really flies, and now my project finally has to end.

While multiple factors have prevented an ideal outcome presented in the original proposal, I hope
my work would still help the Haiku community gain access to more applications and develop native
software in more innovative and modern ways.

Google Summer of Code has surely gave me invaluable experience that cannot be replaced by any
university courses. I look forward to participating this program for the coming years, and continue
contributing to open source in general.

# Acknowledgements

Firstly, I would like to thank my mentors, nielx, and especially jessicah, for connecting with me
before the project and providing me with various help.

I would like to thank the Haiku organization, which has guided me to open source ever since I
started coding in 2019, and its members, especially waddlesplash, pulkomandy, axeld, and korli, for
spending time reviewing my thousands of lines of changes.

I appreciate all the responses and help I received from members on Haiku's IRC channels, especially
X512. I appreciate all the supportive comments and reactions from every Haiku community member.
Special thanks to begasus who always follow every of my progress reports!

I would also like to thank the members .NET Foundation, in particular
[@am11](https://github.com/am11), for always supporting the Haiku port effort, despite not having
direct responsibility in this GSoC project.

Last but not least, I would like to thank my family for all the valuable support for my application
and participation in this program.
