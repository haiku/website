+++
type = "article"
title = "Compiling Haiku for Arm"
date = "2012-09-08T19:18:09.000Z"
tags = ["compiling", "arm"]
+++

Haiku can be compiled for devices leveraging the ARMv7 or later processor architecture.

{{< alert-danger "Unstable" "The state of the ARM port is extremely early. Roll up your sleeves and help out!">}}

## Create a Compiler Toolchain

Building the ARM compiler toolchain is quite easy using Haiku's ```configure``` tool.

> For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

1. Perform a git clone haiku and buildtools
2. Within the haiku source directory, create your workspace for ARM via ```mkdir generated.arm; cd generated.arm```
2. Leverage configure to build your ARM toolchain. ```../configure -j2 --build-cross-tools arm ../../buildtools```

## Building an MMC (SD Card) Image

Once you have a complete ARM toolchain, you can build a Haiku MMC disk image via ``jam -j2 -q @minimum-mmc``
This will generate an MMC image suitable for booting Haiku on a real ARM hardware device.

{{< alert-warning "Post-processing" "The generated MMC image only contains Haiku software. Most ARM hardware devices will require extra binary bootloaders (including u-boot). User-run automated post-processing tools are being developed to automate these steps.">}}

## Emulating ARM Image

The ARM images can also be emulated in QEMU. In the example below, we emulate a Raspberry Pi 2.

```sh qemu-system-arm -M raspi2 -kernel haiku_loader.ub -initrd haiku-floppyboot.tgz.ub -dtb rpi2.dtb -m 2G```
