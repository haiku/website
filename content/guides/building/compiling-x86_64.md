+++
type = "article"
title = "Compiling for x86_64"
date = "2012-11-21T08:54:31.000Z"
tags = ["compiling", "x86_64"]
+++

x86_64 Compiler Toolset
=======================

Building the x86_64 compiler toolset is quite easy and involves generating GCC
binaries for your platform. For a complete list of flags for the configure
script, see <a href='/guides/building/configure'>Haiku's Configure Options</a>.

x86_64 exclusively uses gcc7, this differs from our 32-bit x86_gcc2 builds which
include both gcc2 (for BeOS compatibility) and gcc7 as a secondary architecture.

From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

**Working in a clean build directory:**
```
mkdir generated.x86_64; cd generated.x86_64
../configure --build-cross-tools x86_64 ../../buildtools
```

**Working in the top level:**
```
./configure --build-cross-tools x86_64 ../buildtools
```

x86_64 Haiku Builds
===================

These builds require a valid x86_64 compiler toolset (see above), and might also
need additional software packages installed -- see the
<a href="/guides/building/pre-reqs">pre-requisite software</a> page for more details.

These commands should be run from the same path you ran your configure in above.

Compiling a nightly anyboot Haiku iso image
--------------------------------------

This is the standard build which which results in a live ISO that can be burned
to an optical disc, or that can be written directly to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```
jam -q -j2 @nightly-anyboot
```


Compiling a nightly raw disk images
---------------------------------

This generates a simple raw disk image of Haiku which can be booted directly in
a VM or written directly to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```
jam -q -j2 @nightly-raw
```

