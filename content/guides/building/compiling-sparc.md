+++
type = "article"
title = "Compiling Haiku for SPARC"
date = "2020-01-19T10:18:09.000Z"
tags = ["compiling", "arm"]
+++

Haiku can be compiled for devices using the SPARC 64bit processor architecture.

{{< alert-danger "Unstable" "The state of the SPARC port is early. Only the bootloader currently runs." >}}

## Create a compiler toolchain

Building the SPARC compiler toolchain is quite easy using Haiku's ```configure``` tool.

> For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

1. Perform a git clone haiku and buildtools
2. Within the haiku source directory, create your workspace for SPARC via ```mkdir generated.sparc; cd generated.sparc```
2. Run configure to build your SPARC toolchain. ```../configure --use-gcc-pipe -j4 --cross-tools-source ../../buildtools --build-cross-tools sparc```

## Building a filesystem image

Once you have a complete SPARC toolchain, you can build a Haiku filesystem image via ``jam -j2 -q @minimum-raw``

{{< alert-warning "Post-processing" "The generated filesystem image is not sufficient for booting a SPARC machine. Work is ongoing to generate a bootable CD image in a suitable format.">}}

## Building the bootloader

You can build the bootloader using ``jam -q haiku_loader.openfirmware``. It can
then be run on real hardware for example using network booting, or once copied
to a suitable disk accessible from open firmware.
