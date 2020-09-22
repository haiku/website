+++
type = "article"
title = "Compiling Haiku for x86"
date = "2012-09-09T15:36:52.000Z"
tags = ["compiling. x86"]
+++

<h3>gcc2h / gcc8 hybrid builds</h3>

<p>Haiku can be build as a hybrid image meaning that it contains gcc2 as well
as gcc8 binaries. More information on this can be found on the <a href='/guides/building/gcc-hybrid'>gcc-hybrid</a> page.</p>

<p>This configuration is the default and is required to run both BeOS legacy
applications as well as modern one using the recent programming language
features available in newer gcc versions.</p>

<h3>Building Haiku from Haiku</h3>

<p>When building from Haiku, all the required tools are already installed in
the release image, therefore you can run configure without any arguments:</p>

```sh
./configure
```

<h3>x86 Compiler Toolset for non-Haiku systems</h3>

<p>When building from another operating system (Linux, for example), you need
to compile the buildtools as well during the configure stage.</p>

<p>Building the x86 compiler toolset is quite easy and involves generating gcc
binaries for your platform. For a complete list of flags for the configure
script, see <a href='/guides/building/configure'>Haiku's Configure Options</a>

```sh
./configure --cross-tools-source ../buildtools --build-cross-tools x86_gcc2 --build-cross-tools x86
```

<h3>Compiling raw nightly disk images</h3>

This is the default nightly image build target. This contains a complete system with an included compiler. Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.

```sh
jam -q -j2 @nightly-raw
```

<h3>Compiling anyboot nightly disk images</h3>

You can also choose to build an anyboot image (`*.img`) instead, which is generally more useful for virtualization software.

```sh
jam -q -j2 @nightly-anyboot
```
