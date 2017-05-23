+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #1 / #2"
author = "return0e"
date = "2017-05-22 14:43:06+01:00"
tags = ["haiku", "swift", "gsoc", "gsoc17"]
+++

Hello everyone!

## Community Bonding period
Last week I introduced myself and my GSoC project on porting Swift to Haiku, which can be found [here](https://www.haiku-os.org/blog/return0e/2017-05-10_%5Bgsoc_2017%5D_porting_the_swift_programming_language_to_haiku/) in case if you missed it. The bonding period so far involved a mix of initial communication with my mentors **jua_**  and **korli** (Thanks for merging my HaikuPorter recipes!) alongside receiving assistance from other haiku-devs, notably PulkoMandy and waddlesplash. In addition, I mostly spent the week researching the swift front-end driver internals [1] by reading its documentation, patching more script files used for building swift and meeting several other GSoC students on IRC/mailing lists; and I wish them good luck with their projects. Shortly afterwards, I've made contact with the swift-dev mailing list about this project and asked about adding 32 bit support and both ideas are acceptable with the swift community [2]. But until the x86_64 port has a functioning toolchain, x86 support will be considered later.

## Porting progress
This week, early platform support has been added in various script files and those changes have made it possible to build the compiler inside Haiku by using clang++. While Haiku already had support for thread-local storage (TLS) for sometime, this was required for self-hosting the llvm/clang forks and the clang port had TLS support disabled upstream [3]. This briefly caused some build issues but was later fixed in my swift-clang fork. 

As expected, the swift front-end (swiftc), runtime (libswiftCore.so) and the standard library (stdlib) are very unstable, with the compiler instantly crashing when running swift source files. More work needs to be done in resolving these issues but apart from that, not much serious programming was done so far; only preparation work for building the compiler on Haiku for the coding period.

## Issues encountered so far
Swiftc and stdlib all contain allot of runtime bugs due to missing platform implementations at the moment. For example, directly compiling a source file causes the front-end to poll infinitely; thus never actually generating a executable. The runtime uses some platform-specific code to handle extracting metadata from dynamic libraries and this must be implemented in Haiku (dl_iterate_phdr() is used in ImageIntrospectionELF.cpp [4]), running swift programs won't be possible without this. I also tried importing C libraries such as math and stdio from the SwiftGlibc metaclass to test the ClangImporter tool, but it fails to import certain modules in the standard library despite correctly adding the paths to the POSIX headers. For now, I'll be investigating the compiler front-end and runtime issues in the swift port to enable compiling or running swift source files on Haiku.

## Goals achieved

* Support building Swift via Clang++ inside of Haiku.
* Refactor build-script to add initial platform support for recognising x86_64-unknown-haiku.
* Add x86_64-unknown-haiku target for swiftc front-end and stdlib.

## Goals for next week

* Investigate issues preventing source files being compiled or run by Swift.
* Complete Haiku support for validation tests.
* Add WIP recipe to HaikuPorts.
* Investigate swift-corelibs and libdispatch requirements.

The repository used for porting is over at [return/swift](http://github.com/return/swift). Hopefully a WIP swift recipe will be available on HaikuPorts in a few weeks, so that my mentors or even others can try it out.

[1] https://github.com/apple/swift/blob/master/docs/DriverInternals.rst

[2] https://lists.swift.org/pipermail/swift-dev/Week-of-Mon-20170508/004568.html

[3] https://github.com/llvm-mirror/clang/commit/ef7bceadf4b43c953855013577afac4c2fcb1d62

[4] https://github.com/return/swift/blob/swift-3.1-haiku/stdlib/public/runtime/ImageInspectionELF.cpp#L94
