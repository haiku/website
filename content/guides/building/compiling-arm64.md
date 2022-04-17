+++
type = "article"
title = "Compiling Haiku for Arm64"
date = "2022-04-17T17:30:00.000Z"
tags = ["compiling", "arm64"]
+++

Haiku can be compiled for devices leveraging the ARMv8 64-bit processor architecture.

Please ensure that you have obtained a copy of Haiku's source code as described in
[Get the Haiku Source Code](https://www.haiku-os.org/guides/building/get-source-git) 
if you have not already done so.

{{< alert-danger "Unstable" "The state of the ARM64 port is extremely early. Roll up your sleeves and help out!">}}

## Create a Compiler Toolchain

Building the ARM64 compiler toolchain is quite easy using Haiku's ```configure``` tool.
For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

```sh
mkdir generated.arm64; cd generated.arm64
../configure -j2 --cross-tools-source ../../buildtools --build-cross-tools arm64
```

## Building an MMC (SD Card) Image

Once you have a complete ARM64 toolchain, you can build a Haiku MMC disk image via ``jam -j2 -q @minimum-mmc``
This will generate an MMC image suitable for booting Haiku on real 64-bit ARM hardware devices or in emulators like QEMU.

## Building raw disk images

It's possible to build separate disk images for the bootloader and Haiku software. The image ``esp.image`` contains the EFI system partition with Haiku bootloader.
The image ``haiku-minimum.image`` contains the BFS file system with Haiku kernel and software packages. These images are useful mainly for development purposes,
when running Haiku in an emulated environment.

```sh
jam -j2 -q @minimum-raw esp.image haiku-minimum.image
```

## Emulating Haiku

The ARM64 images can be emulated in QEMU with an EFI firmware like TianoCore or U-Boot.

Emulating Haiku with U-Boot firmware, using the unified ``haiku-mmc.image`` image file:

```sh
qemu-system-aarch64 -bios u-boot.bin -M virt -cpu max -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
	-drive file=haiku-mmc.image,if=none,format=raw,id=x0 \
	-device virtio-keyboard-device,bus=virtio-mmio-bus.1 \
	-device virtio-tablet-device,bus=virtio-mmio-bus.2 \
	-device ramfb -serial stdio
```

The location of the 64-bit ARM TianoCore firmware will vary based on platform. This example is for Fedora, with raw images ``esp.image`` and ``haiku-minimum.image``:

```sh
qemu-system-aarch64 -bios /usr/share/edk2/aarch64/QEMU_EFI-silent-pflash.raw \
    -M virt -cpu max -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -device virtio-blk-device,drive=x1,bus=virtio-mmio-bus.1 \
    -drive file=esp.image,if=none,format=raw,id=x0 \
    -drive file=haiku-minimum.image,if=none,format=raw,id=x1 \
	-device virtio-keyboard-device,bus=virtio-mmio-bus.2 \
	-device virtio-tablet-device,bus=virtio-mmio-bus.3 \
	-device ramfb -serial stdio
```

> Be sure to examine the uart console in QEMU for debug data from our bootloader / kernel.

