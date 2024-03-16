+++
type = "article"
title = "Compiling Haiku for RISCV64"
date = "2020-01-19T10:18:09.000Z"
tags = ["compiling", "riscv64"]
+++

Haiku can be compiled for devices using the RISC-V 64bit processor architecture. (RV64GC)

Please ensure that you have obtained a copy of Haiku's source code as described in
[Get the Haiku Source Code](https://www.haiku-os.org/guides/building/get-source-git) 
if you have not already done so.

{{< alert-danger "Unstable" "The state of the RISC-V port is early. Only the bootloader currently runs." >}}

## Create a compiler toolchain

Building the RISCV64 compiler toolchain is quite easy using Haiku's ```configure``` tool.

> For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

1. Obtain a copy of [Haiku](https://cgit.haiku-os.org/haiku/) and its [buildtools](https://cgit.haiku-os.org/buildtools/).
2. Within the haiku source directory, create your workspace for RISCV64 via ```mkdir generated.riscv64; cd generated.riscv64```
3. Run configure to build your RISCV64 toolchain. ```../configure --use-gcc-pipe -j4 --cross-tools-source ../../buildtools --build-cross-tools riscv64```

## Building a filesystem image

Once you have a complete RISCV64 toolchain, you can build a Haiku filesystem image via ``jam -j2 -q @minimum-mmc``

{{< alert-info "UEFI Bios" "The generated filesystem image can be booted under a RISCV64 UEFI BIOS">}}

## Emulating Haiku

The RISCV64 images can be emulated in QEMU with an EFI firmware like [U-Boot](https://u-boot.org), or installed to physical boards.

### U-Boot

Haiku provides ready-to-use U-Boot binaries in the [haiku/firmware](https://github.com/haiku/firmware/tree/master/u-boot/) repository, as well as the commands that were used to build them.

If you're interested in digging deeper, the following resources can help you gain a more general understanding of how to work with U-Boot:
- [U-Boot README (github.com)](https://github.com/u-boot/u-boot/blob/master/README)
- [Build U-Boot (docs.u-boot.org)](https://docs.u-boot.org/en/latest/board)
- [QEMU RISC-V - Board-specific doc (docs.u-boot.org)](https://docs.u-boot.org/en/latest/board/emulation/qemu-riscv.html)

#### Running Haiku using U-Boot

After having successfully compiled Haiku and obtaining a suitable `u-boot.bin` file, copy `u-boot.bin` into the `generated.riscv64` directory and run the following command:

```sh
qemu-system-riscv64 -kernel u-boot.bin -M virt -m 2048 \
	-device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
	-drive file=haiku-mmc.image,if=none,format=raw,id=x0 \
	-device usb-ehci,id=ehci -device usb-tablet -device usb-kbd \
	-device ati-vga -serial stdio
```

Alternatively, you can replace `u-boot.bin` with the file path that the file `u-boot.bin` is located in.
