+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #4 #5"
author = "return0e"
date = "2017-06-22 19:08:28+01:00"
tags = ["haiku", "gsoc17", "swift"]
+++

Hello everyone! This report covers the span of the last two weeks of my porting efforts to get swift running on Haiku. I started debugging the runtime library 'libswiftCore' on both Haiku and Linux and focused my attention specifically to the ImageInspection logic in order to fully understand how the runtime extracts 'type metadata' from a swift generated shared object. My mentor korli, recommended me to use the get_next_image_info() function, which is the Haiku equivalent of iterating through the list of loaded libraries in a executable. Hence this, it was used to implement dl_iterate_phdr() in ImageInspection.cpp, taking some inspiration from the Cygwin port but parts were rewritten to be used on ELF based platforms.

But that however, wasn't enough to solve the MetadataCache concurrency issues. It still crashes when trying to acquire a lock on a uninitialised mutex handle when performing metadata lookup entries that need to be cached. I spent the second week debugging the swift build on Linux and tracing the concurrency issues present in the Haiku port. Afterwards, I decided to temporarily comment out the code responsible for triggering the [locking issues](https://github.com/return/swift/commit/b393b0c213da39a628c969959bf1d50cf7c53410) for now, to only show a functioning proof of concept that the swift interpreter is able to directly run simple swift programs.

So, here's a screenshot of the interpreter working in Haiku:

<center>
![](https://user-images.githubusercontent.com/7050293/27261158-e3c38764-5434-11e7-8f52-2b1c57cf9e31.png)
</center>

There's still more work to be done for getting a usable toolchain in Haiku. The compiler still cannot generate a executable, due to the way wait4() [1] in Haiku is handled when running the compilation jobs in TaskQueue.inc [2] and the port must be tested too. Later next week, I'll be asking my mentors for more information about the requirements for solving these particular issues #13446 [3] and #13546 [1].

* Goals Achieved:
	* Swift can directly interpret simple programs on Haiku.
	* Added support for Image Inspection by using get_next_image_info().
	* Refactored swift recipe to include latest changes.

* Goals For Next Week:
	* Address MetadataCache locking issues.
	* Fixup compiling swift code via issue (#13446).
	* Upstream initial Haiku platform recognition. (Swift 4.0)

References:

[1] [Ticket #13546 - wait4() functionality issue](https://dev.haiku-os.org/ticket/13546)

[2] [TaskQueue.inc](https://github.com/return/swift/blob/swift-3.1-haiku/lib/Basic/Unix/TaskQueue.inc)

[3] [Ticket #13446 - implement posix_spawn](https://dev.haiku-os.org/ticket/13446)
