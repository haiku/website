+++
type = "blog"
author = "zooey"
title = "Package Management: Getting Cross"
date = "2013-06-11T09:32:53.000Z"
tags = ["package management", "contract", "contract work"]
+++

The end of my first two-man-months contract has been reached, but I'll be diving right into the next 160 hours of working on package management. So, first of all: a big thank you to all the donors out there!

<!--more-->

Since Ingo's last blog entry from one week ago, he's spent some time on HaikuPorter, improving the dependency analyzer and implemented the requires updater, which adjusts a package with all the actual versions of dependencies that were used to build this package. Additionally, Ingo has enhanced the packaging policy checks, which are becoming a pretty thorough set of checks for ensuring that each package actually declares all the libraries and binaries it contains in the provides section. This is for instance important should we ever decide to split a package at a later stage, such that any packages depending on a specific library will just "move along". 

Furthermore, on the Haiku side of things, Ingo has generalized the support for user/global settings files to global writable files (stuff traditionally put into /var) and fixed a couple of problems in the build system.

I have spent most of the week working on the cross builds, i.e. to get the set of packages built that are prerequirements for building all the HaikuPorts which are necessary to build Haiku. As part of that, I've dropped a feature from the runtime loader: when loading an executable for the alternative ABI (e.g. gcc4 on a gcc2 hybrid), the standard system library paths would be considered as a fallback. This is no longer the case, as those two ABIs are now considered incompatible. 

Additionally, I adjusted the haiku_cross_devel packages created by Haiku's build system to support all architectures (not just x86_gcc2) and be easier to maintain with respect to the expected differences between the architectures. If installed, a haiku_cross_devel package just makes another package available in develop/cross/, which can be used to create the cross-build-sysroot for the corresponding architecture. When doing a cross-build, HaikuPorter will automatically create that sysroot at /boot/cross-sysroot/<architecture> and the cross compilers will look there for the required headers and libraries for the target architecture. This strict separation makes it possible to use HaikuPorter on (for instance) a gcc2-Haiku to build packages for a newer version of gcc2-Haiku that is binary incompatible. As part of that, building a cross-compiler on Haiku for the same architecture now works, too. All that was required is to tell the compiler's build system that it is building on 'i586-pc-haiku_build' and targetting 'i586-pc-haiku'.

Yesterday, I have started documenting the version of <a href="http://ports.files.haiku-os.org/wiki/HaikuPorterForPM" title="HaikuPorter for package management">HaikuPorter for package management</a>. It is currently only an outline, but I will try to finish work on that today.

After that, I will adjust our compilers to explicitly support a hybrid mode, which will cause them to only search in the hybrid-specific alternative library-/ and header-folders (e.g. develop/libs/gcc4 and develop/headers/gcc4). The latter example indicates another planned change: we intend to use compiler-specific header sub-folders, too.

So, we are making progress, but there's quite some more stuff to do ...
