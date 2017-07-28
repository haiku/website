+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #6 #7"
author = "return0e"
date = "2017-07-11 23:20:21+01:00"
tags = ["haiku", "gsoc17", "swift", "software"]
+++

TL;DR: Compiling Swift programs works, added C library interoperability and adding support for running the test-suite.

Hello Everyone,
This report covers my activities done since the first evaluation of GSoC. I spent the first week looking into the most critical aspects of the compiler and focused my attention on the TaskQueue class. Whenever a task is executed, the TaskQueue tries to read its data via a pipe and it was found that it read 0 bytes from it, despite poll() reporting that there is still data available for reading. Therefore, the compiler fails to output a executable and becomes stuck in a infinite loop; at least with the Unix implementation.

After some days debugging/tracing the TaskQueue child processes [1] and having discussed this with the Haiku developers on the mailing list, it was suggested that a file-descriptor created from a pipe was being read from inside readFromAPipe()[2] which returned 0 bytes, while poll() kept returning POLLIN (meaning that there is more data available to read) rather than sending a POLLHUP or POLLERR. Therefore, the parent process will assume that the tasks pipe hasn't closed or hung up yet and will loop back on to this line [3]. With this known, it wouldn't be necessary to solve this issue via implementing ticket (#13446), as the TaskQueue can use fork()+exec() to run subsequent tasks instead. For the time being, I switched to the default TaskQueue implementation and it successfully compiled a hello world into a binary. The drawbacks of using the fallback implementation are that the compiler won't support parallel compilation nor will it support output buffering.

Aside from that, I've added initial platform support for testing and fixed small linker issues in the clang module-maps used for importing glibc into swift. As expected, Haiku failed nearly all the test cases, likely due to the missing $SDKROOT variable and other environment variables. According to this swift-dev post[4], these variables were intentionally omitted to prevent testcases from reporting erroneous results that pass or fail depending on the environment configuration. Solving this would include adding the "-sdk "" " flag into the testcases to properly find the swift toolchain folder on a given platform.

With the exception of some small hacks which will be eventually removed and apart from testing, the Swift 3.1 port seems to be nearly complete. After this, I will be porting the Foundation libraries as mentioned in my proposal.

References:

[1] [strace of swiftc](https://gist.github.com/return/73b9adbd1466255c7c9d06e8f58aac8e)

[2] [readFromAPipe function](https://github.com/return/swift/blob/swift-3.1-haiku/lib/Basic/Unix/TaskQueue.inc#L247)

[3] [TaskQueue execute loop](https://github.com/return/swift/blob/swift-3.1-haiku/lib/Basic/Unix/TaskQueue.inc#L326)

[4] [stdlib tests under FreeBSD](https://lists.swift.org/pipermail/swift-dev/Week-of-Mon-20160104/000737.html)
