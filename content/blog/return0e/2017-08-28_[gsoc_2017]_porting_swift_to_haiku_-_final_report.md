+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Final Report"
author = "return0e"
date = "2017-08-28 07:15:32+01:00"
tags = ["haiku", "swift", "gsoc17","software"]
+++

Hello everyone!

This blog-post marks the final report on bringing Swift to Haiku in the Google Summer of Code period. My introductory post on this project can be found [here](https://www.haiku-os.org/blog/return0e/2017-05-10_gsoc_2017_porting_the_swift_programming_language_to_haiku) for a brief overview of the project.

## Summary
In the last 3 coding periods, my contributions to Haiku's LLVM and Clang ports plus reporting some bugs with the Haiku developers have made it possible for the Swift toolchain to be built on Haiku. With this, it opens the possibility to use cross-platform Swift libraries used on other platforms and also allows to directly use the libc/glibc libraries via the GlibC module. I have already done an initial port of Foundation and libdispatch on Haiku as specified in the previous blog-post, but they still need to be polished for general use. As for upstreaming my patches for Haiku support, I've sent my patches to apple/swift and they are currently under [review](https://github.com/apple/swift/pull/11583).

Here's a short review below on what has been completed and still outstanding on this project and you can find the project [right here](https://github.com/return/swift-haiku-build) with the [documentation included](https://github.com/return/swift-haiku-build/blob/master/README.md) to building Swift on Haiku.

## What has been completed:
* Building Swift 3.1 and Swift 4 on Haiku:
   * [Added support for x86_64-unknown-haiku.](https://github.com/return/swift/commit/afca67566b0ed82f80ded873417a03392b6ff3df)
	* Built swiftc and its standard library via [patching the build-script.](https://github.com/return/swift/commit/2154afed52e3cda1f3cf4a5ec5d4cb9d136bb44c#diff-65b44eb6cb88af2161d8e1176231aad0)
	* [Updated and upstreamed LLVM port to build upstream swift.](https://reviews.llvm.org/D36814)
* Executing simple Swift programs (compiled or interpreted).
   * [Ability to compiler Swift programs](https://github.com/return/swift/commit/19eebee324bcdb1284cdb9b089027411c2854ca2) 
	* [Implemented ImageInspection for Haiku](https://github.com/return/swift/commit/2378d462cca3226761f9e866ced88c21af1eab3a)
	* Added support for REPL (non-LLDB version) by [enabling wide character support](https://github.com/haikuports/haikuports/pull/1536).
* Initial port of [Foundation](https://github.com/return/swift-corelibs-foundation/commit/97e0ca6424bcc19847a57f3f5cb2f2bff8ea376b) and [libdispatch](https://github.com/return/swift-corelibs-libdispatch/commits/swift-3.1-haiku).
* Swift 3.1 recipe is available at [HaikuPorts](https://github.com/haikuports/haikuports/pull/1383).
* Run tests against the newly built standard library and swiftc. 
	* [Normal test results for Swift 3.1](https://gist.github.com/return/6af6bbf84fa507d9ad6043fb593942b7).
	* [Detailed test results for Swift 3.1](https://gist.github.com/return/0ff2de707abdfe0bc2da33058071025c)
* Sent pull request upstream to apple/swift [(PR #11583)]((https://github.com/apple/swift/pull/11583))

 
## What needs to be done (After GSoC):
* [Package Manager](https://github.com/swift-package-manager) support via [llbuild](https://github.com/apple/swift-llbuild).
* Debugging Swift via porting [LLDB](https://github.com/apple/swift-lldb).
* Building [SourceKit](https://github.com/apple/swift/tree/master/tools/SourceKit) for Haiku.
* Update the Swift 3 recipe to Swift 4.
* More testing support.


## Contributions:

* [(1) Add Initial platform support for Haiku.](https://github.com/apple/swift/pull/11583)
* [(2) swift-lang: WIP new recipe.](https://github.com/haikuports/haikuports/pull/1383)
* [(3) Define OS Check for Haiku.](https://reviews.llvm.org/D36814)
* [(4) unistd.h: define \_POSIX_BARRIERS.](https://dev.haiku-os.org/ticket/13601)
* [(5) libedit: enable wide-character support.](https://github.com/haikuports/haikuports/pull/1536)
* [(6) clang: Enable thread-local storage in clang.](https://github.com/haikuports/haikuports/pull/1362)
* [(7) libexecinfo: fix symlink paths.](https://github.com/haikuports/haikuports/pull/1350)


## Difficulties:

There were some difficulties encountered when working with platform-specific APIs. For instance, whilst I was porting the CoreFoundation and libdispatch libraries, many functions such as kqueue(), epoll() and ppoll() were unavailable on Haiku and I had to stub out any code containing them.

One other difficulty I had to deal with was keeping my branches synced with upstream, so that my changes can be merged cleanly without any conflicts. The importance of regularly rebasing your work always helps when planning to support a new OS platform; which reduces the maintenance effort and to some extent, won't be easily susceptible to 'bitrot'. This was one of the methods that helped me cleanly upstream my GSoC work.

## Achievements and Thanks:

I've gained a lot of knowledge in understanding the internals of Haiku's POSIX layer and implementing missing features found in 3rd-party software requiring OS-specific code. With this experience, contributing to Haiku during the GSoC period has increased my confidence in submitting better patches to other projects and more importantly to the Haiku sources. I will still continue to contribute to porting more essential open-source software to the platform and will also get more familiar with the lower-level side of Haiku (the kernel, device drivers and porting to more embedded platforms) if time permits.

I would really like to thank my mentors **jua** and **korli** and all of the Haiku developers in helping me overcome the obstacles in my project and making this possible to complete. Thank you for reading this blogpost, it has been great to be part of Haiku in GSoC 2017!