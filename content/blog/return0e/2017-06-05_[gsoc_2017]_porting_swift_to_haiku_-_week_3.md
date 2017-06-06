+++
type = "blog"
title = "[GSoC 2017] Porting Swift to Haiku - Week #3"
author = "return0e"
date = "2017-06-05 17:10:09+01:00"
tags = ["haiku", "swift", "language","software"]
+++

Hello everyone! This is a rather short update on the Swift port and since the last blog post, I've worked around a small issue that prevented the compiler from importing libraries by specifying the -sdk parameter with a '/' which passes the correct header search paths to swiftc. This issue also existed on other platforms such as FreeBSD according to this thread in the swift-dev mailing list [1]. Whilst researching around the frequent swift interpreter crashes when opening a swift source file, the fault lies in libswiftCore being unable to extract type metadata from swift-generated dynamic libraries when calling these functions specified in the [ProtocolConformance](https://github.com/apple/swift/blob/7a4c7614267f13b5e9d86966da2118c2a353479f/stdlib/public/runtime/ProtocolConformance.cpp#L228) and [Metadata](https://github.com/apple/swift/blob/cc6045b45afdfdb345431929769f4ce85bbe8aef/stdlib/public/runtime/MetadataLookup.cpp#L85) classes. It is also evident that whenever swift attempts to load this metadata at runtime, it uses 'dl_iterate_phdr()' to iterate over every ELF object loaded into the process address-space and will initiate a callback that will emit internal ELF information defined in the [dl_phdr_info* struct](https://www.freebsd.org/cgi/man.cgi?query=dl_iterate_phdr&sektion=3). I will spend this week with my mentors to implement a Haiku replacement for this function.

During the coding period of June, I will be focused on bringing a working swift toolchain to Haiku and afterwards, the newly built toolchain will be put through a series of tests via the built-in test-suite. Also at HaikuPorts, I added thread-local storage support in clang and my mentor (korli) advised me to disable building position-independent executables (PIE) by default. By using llvm-4.0.0-2 from HaikuPorts, I successfully built swift from source and even published a WIP recipe for anyone to try out [2]. (It still cannot build/interpret swift source files yet.)

Over at the Haiku source tree, My patch to ticket [#8798](https://dev.haiku-os.org/ticket/8798) about a missing pthread_rwlock macro wasn't suitable for Haiku's current pthread_rw_lock design. Specifically, the values defined in my PTHREAD_RWLOCK_INITIALIZER patch were incorrect and initialising a rwlock_t variable with them, may cause undefined behaviour (potentially data races) when used later on. For now, this macro has been commented out, until it is properly implemented in Haiku. As for testing the compiler, this isn't possible at the moment as swiftc cannot compile/run a simple hello-world yet. Therefore, I pushed back testing/validation support once a working executable can be generated.

## Goals For Next Week

* Implement dl_iterate_phdr() equivalent for Haiku.
* Investigate issues in regards to compilation.
* Refactor swift recipe.

## References
[1] [Mailing list thread on FreeBSD Swift port](https://lists.swift.org/pipermail/swift-dev/Week-of-Mon-20160104/000680.html)

[2] [Swift 3.1 recipe](https://github.com/haikuports/haikuports/pull/1383)