+++
type = "article"
title = "Building Haiku on Ubuntu Linux, Step by Step"
date = "2019-03-05T11:19:23.0530Z"
+++
# Architecture

To check whether your target architecture is support visit [Port status](https://www.haiku-os.org/guides/building/port_status).

# Pre-requisite Software

You need some tools in order to build Haiku. See [Pre-requisite software](https://www.haiku-os.org/guides/building/pre-reqs) and install the tools mentioned there.

# Getting the Source Code

To download Haiku's source anonymously, enter

```sh
git clone https://review.haiku-os.org/buildtools #needed for building
git clone https://review.haiku-os.org/haiku #actual source
```

If you'd like to learn more about downloading through git and git workflow, visit [Getting the source code](https://www.haiku-os.org/guides/building/get-source-git).

# Compiling for x86_64
x86_64 Compiler Toolset
=======================

Building the x86_64 compiler toolset is quite easy and involves generating GCC
binaries for your platform. For a complete list of flags for the configure
script, see Haiku's [Configure options](https://www.haiku-os.org/guides/building/configure).

x86_64 exclusively uses gcc8, this differs from our 32-bit x86_gcc2 builds which
include both gcc2 (for BeOS compatibility) and gcc8 as a secondary architecture.

From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

**Working in a clean build directory:**
```sh
mkdir generated.x86_64; cd generated.x86_64
../configure --cross-tools-source ../../buildtools --build-cross-tools x86_64
```

**Working in the top level:**
```sh
./configure --cross-tools-source ../buildtools --build-cross-tools x86_64
```

x86_64 Haiku Builds
===================

These builds require a valid x86_64 compiler toolset (see above), and might also
need additional software packages installed -- see the
[Pre-requisite software](https://www.haiku-os.org/guides/building/pre-reqs) page for more details.

These commands should be run from the same path you ran your configure in above.

Compiling a nightly anyboot Haiku iso image
--------------------------------------

This is the standard build which which results in a live ISO that can be burned
to an optical disc, or written to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```sh
jam -q -j2 @nightly-anyboot
```


Compiling a nightly raw disk images
---------------------------------

This generates a simple raw disk image of Haiku which can be booted directly in
a VM or written to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```sh
jam -q -j2 @nightly-raw
```
