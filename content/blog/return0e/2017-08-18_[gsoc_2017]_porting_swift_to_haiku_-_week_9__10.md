+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #9 / #10"
author = "return0e"
date = "2017-08-18 05:56:22+01:00"
tags = ["haiku","swift","gsoc","gsoc17"]
+++

Time for another update on the swift port, which covers the last two weeks of my activity, So here it goes!

### Week 9 - My Findings on Porting libdispatch 

On the 9th week, I added early support for building libdispatch aka 'Grand Central Dispatch (GCD)' which is Apple's event-driven concurrency framework which allows executing high performance code via asynchronous task queues or I/O file descriptors (including sockets), which enables programs to take advantage of multi-core systems and to run Swift programs that utilises this. After that, I've began porting the core-foundation-libraries aka 'Foundation' framework to Haiku, which is needed to support the package manager and other cross-platform swift libraries.

Although these libraries are available on certain platforms such as Linux and FreeBSD, porting the lower-level variant of Foundation, 'CoreFoundation' and as well as libdispatch require platform-specific implementations; thus any functionality requiring this must be implemented for Haiku. Due to this [pull request](https://github.com/apple/swift-corelibs-foundation/pull/338), libdispatch was integrated into the core-foundation project, which means it has to be ported first. 

For GCD to operate in a event driven manner on another operating system, there are several components and APIs it requires, the use of kqueues or eventfd/epoll (Linux only) which are unavailable on Haiku. While support for the former can be achieved using [libkqueue](https://github.com/mheily/libkqueue), this uses the queuing macros found in 'sys/queue.h' on Unix-like platforms, but is also non-existent in Haiku but support for it could be integrated into the sources. Using a local queue.h header worked around this issue and stubbing out more platform-specific APIs allowed libdispatch to build successfully, but this port still needs to be tested.

### Week 10 - Progress on CoreFoundation

On the 10th week, I worked on several parts of the swift toolchain, mostly with porting CoreFoundation and slightly worked on adding more tests for Haiku. When initial support for Foundation is complete, it should be possible to port the package manager (SwiftPM) and it's dependency, llbuild to Haiku. Other than the smaller issues in some header files not being imported properly, the swift compiler itself under Haiku works fine. Over at my swift branch, I've rebased and cleaned up my work prior to a brief review by my mentor and I've started sending some patches over to the LLVM project for [review](https://reviews.llvm.org/D36814).

### Preparations for next Week
My next focus will be finishing and testing both swift and the foundation port as well as documenting the progress done on each of them. Afterwards, I'll send smaller chunks of my swift patches to be reviewed and upstreamed by the maintainers. Optional support for the package manager and lldb can be done after the GSoC period and patches for improving Haiku support which may regress on other platforms will stay at haikuports until a complete fix is available.

### Goals Achieved:
   * Initial port of libdispatch and Foundation to Haiku.
   * Cleaned up Swift 4 patches.
   * Sent initial patches to LLVM upstream.

### Goals for next Week:
   * Write up documentation, and prepare final weekly report.
   * Complete supporting tests for Swift and Foundation.
   * Investigate missing POSIX headers.
   * Fix outstanding bugs in the swift port.
   * Review and send swift patches upstream.