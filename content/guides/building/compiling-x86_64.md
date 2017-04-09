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

x86_64 exclusively uses GCC 5, different from x86 which can be built with both
GCC 2 and GCC 5. From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

    ./configure --build-cross-tools x86_64 ../buildtools

x86_64 Haiku Builds
===================

These builds require a valid x86_64 compiler toolset (see above), and might also
need additional software packages installed -- see the
<a href="/guides/building/pre-reqs">pre-requisite software</a> page for more
details.

Compiling a basic raw Haiku disk image
--------------------------------------

This is the most basic build, it generally is good for quickly testing the OS
after making modifications as it doesn't contain a lot of extra applications.
Be sure to modify -j2 with the number of cpu cores on your build system to
ensure the fastest build times.

    jam -q -j2 haiku-image


Compiling raw nightly disk images
---------------------------------

This is the default nightly image build target. This contains a complete system
with an included compiler. Be sure to modify -j2 with the number of cpu cores
on your build system to ensure the fastest build times.

    jam -q -j2 @nightly-raw

