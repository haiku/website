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
For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

```sh
mkdir generated.arm; cd generated.arm
../configure -j2 --cross-tools-source ../../buildtools --build-cross-tools arm
```

## Building an MMC (SD Card) Image

Once you have a complete ARM toolchain, you can build a Haiku MMC disk image via ``jam -j2 -q @minimum-mmc``
This will generate an MMC image suitable for booting Haiku on real ARM hardware devices or in emulators like QEMU.

{{< alert-warning "Post-processing" "The generated MMC image only contains Haiku software. Most physical ARM hardware devices will require extra binary bootloaders (including u-boot). Users can leverage the Rune tool to post-process generic Haiku ARM images for their target ARM device.">}}

## Building raw disk images

It's possible to build separate disk images for the bootloader and Haiku software. The image ``esp.image`` contains the EFI system partition with Haiku bootloader.
The image ``haiku-minimum.image`` contains the BFS file system with Haiku kernel and software packages. These images are useful mainly for development purposes,
when running Haiku in an emulated environment.

```sh
jam -j2 -q @minimum.raw esp.image haiku-minimum.image
```

## Emulating Haiku

The ARM images can be emulated in QEMU with an EFI firmware like TianoCore or U-Boot.

It is recommended to use u-boot binaries available from Haiku firmware repository in [u-boot/arm/qemu](https://github.com/haiku/firmware/tree/master/u-boot/arm/qemu) folder.

Emulating Haiku with U-Boot firmware, using the unified ``haiku-mmc.image`` image file:

```sh
qemu-system-arm -bios u-boot.bin -M virt -cpu cortex-a15 -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -drive file="haiku-mmc.image",if=none,format=raw,id=x0 \
    -device ramfb -usb -device qemu-xhci,id=xhci -device usb-mouse -device usb-kbd -serial stdio
```

The location of the ARM TianoCore firmware will vary based on platform. This example is for Fedora, with raw images ``esp.image`` and ``haiku-minimum.image``:

```sh
qemu-system-arm -bios /usr/share/edk2/arm/QEMU_EFI-pflash.raw \
    -M virt -cpu cortex-a15 -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -device virtio-blk-device,drive=x1,bus=virtio-mmio-bus.1 \
    -drive file="esp.image",if=none,format=raw,id=x0 \
    -drive file="haiku-minimum.image",if=none,format=raw,id=x1 \
    -device ramfb -usb -device qemu-xhci,id=xhci -device usb-mouse -device usb-kbd -serial stdio
```

> Be sure to examine the uart console in QEMU for debug data from our bootloader / kernel.

## Running on real hardware

{{< alert-warning "Dragons" "While the 'structure' has been setup to get Haiku booting on real hardware, more work needs to be done to make it work reliably.">}}

Generally, you'll need to "post-process" the Haiku MMC image for your target ARM device.
The [Rune](https://github.com/haiku/rune) tool was designed for this purpose. It will download the necessary binary blobs to get Haiku running and inject them to the MMC image.

### Provisioning an SD card directly

Be sure to replace /dev/sde with your SD card block device.

```sh
rune -b rpi2 -i haiku-mmc.image /dev/sde
```

### Creating an SD card image

```sh
rune -b rpi3 -i haiku-mmc.image /home/alex/haiku-rpi3.mmc
dd if=/home/alex/haiku-rpi3.mmc of=/dev/sde
```

### Adding support for additional ARM hardware

If upsteam u-boot supports your board, open a ticket to https://github.com/haiku/firmware with the details and help us expand our inventory of supported devices!
