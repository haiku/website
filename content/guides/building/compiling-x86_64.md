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

Please ensure that you have obtained a copy of Haiku's source code as described in
[Get the Haiku Source Code](https://www.haiku-os.org/guides/building/get-source-git)
if you have not already done so.

These builds require a valid x86_64 compiler toolset (see above), and might also
need additional software packages installed -- see the
<a href="/guides/building/pre-reqs">pre-requisite software</a> page for more details.

The following commands should be run in the same directory as the one you
ran `./configure` on.

Anyboot (`.iso`) images
----------------------------------

This is the standard build which results in a live ISO that can be burned
to an optical disc, or that can be written directly to a USB stick. An
anyboot image should work with the overwhelming majority of virtualization
software out there.

{{< alert-info "Build Threads" "The 2 in `-j2` stands for the number of CPU cores that should be used. Make sure to modify that number in order to compile Haiku faster.">}}

```sh
jam -q -j2 @nightly-anyboot
```

Raw disk images
----------------

This generates a simple raw disk image of Haiku which can be booted directly in
a VM or written directly to a USB stick. Raw disk images generally consist of
exact, sector-by-sector copies of a disk. It may make sense to use those,
for example, if you are using QEMU from a command line interface (CLI).

{{< alert-info "Build Threads" "The 2 in `-j2` stands for the number of CPU cores that should be used. Make sure to modify that number in order to compile Haiku faster.">}}

```sh
jam -q -j2 @nightly-raw
```

