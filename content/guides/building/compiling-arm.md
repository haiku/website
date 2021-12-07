+++
type = "article"
title = "Compiling Haiku for Arm"
date = "2012-09-08T19:18:09.000Z"
tags = ["compiling", "arm"]
+++

Haiku can be compiled for devices leveraging the ARMv7 or later processor architecture.

Please ensure that you have obtained a copy of Haiku's source code as described in
[Get the Haiku Source Code](https://www.haiku-os.org/guides/building/get-source-git) 
if you have not already done so.

{{< alert-danger "Unstable" "The state of the ARM port is extremely early. Roll up your sleeves and help out!">}}

## Create a Compiler Toolchain

Building the ARM compiler toolchain is quite easy using Haiku's ```configure``` tool.

> For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

1. Perform a git clone haiku and buildtools
2. Within the haiku source directory, create your workspace for ARM via ```mkdir generated.arm; cd generated.arm```
2. Leverage configure to build your ARM toolchain. ```../configure -j2 --cross-tools-source ../../buildtools --build-cross-tools arm```

## Building an MMC (SD Card) Image

Once you have a complete ARM toolchain, you can build a Haiku MMC disk image via ``jam -j2 -q @minimum-mmc``
This will generate an MMC image suitable for booting Haiku on real ARM hardware devices or in emulators like QEMU

{{< alert-warning "Post-processing" "The generated MMC image only contains Haiku software. Most physical ARM hardware devices will require extra binary bootloaders (including u-boot). Users can leverage the Rune tool to post-process generic Haiku ARM images for their target ARM device.">}}

## Emulating ARM Image

The ARM images can also be emulated in QEMU ARM with an EFI bios like Tianocore.

> haiku-mmc.image contains our bootloader. haiku-minimum.mmc contains our filesystem. These need to be combined
> in the future.  You can remove the "-hdb haiku-minimum.mmc" to see our bootloader menu on arm (or theoretically tap space?)

The location of the ARM Tianocore bios will vary based on platform. This example is for Fedora:

```qemu-system-arm -M virt -m 1024 -bios /usr/share/edk2/arm/QEMU_EFI.fd -device virtio-gpu -hda haiku-mmc.image -hdb haiku-minimum.mmc```

> Be sure to examine the uart console in QEMU for debug data from our bootloader / kernel.

## Running on real hardware

{{< alert-warning "Dragons" "While the 'structure' has been setup to get Haiku booting on real hardware, more work needs to be done to make it work reliably.">}}

Generally, you'll need to "post-process" the Haiku MMC image for your target ARM device.
The [Rune](https://github.com/haiku/rune) tool was designed for this purpose. It will download the necessary binary blobs to get Haiku running and inject them to the MMC image.

### Provisioning an SD card directly

Be sure to replace /dev/sde with your SD card block device.

```rune -b rpi2 -i haiku-mmc.image /dev/sde```

### Creating an SD card image

```rune -b rpi3 -i haiku-mmc.image /home/alex/haiku-rpi3.mmc```
```dd if=/home/alex/haiku-rpi3.mmc of=/dev/sde```

### Adding support for additional ARM hardware

If upsteam u-boot supports your board, open a ticket to https://github.com/haiku/firmware with the details and help us expand our inventory of supported devices!
