+++
type = "blog"
title = "Booting our RISC-V images"
author = "kallisti5"
date = "2021-11-07 07:29:13-06:00"
tags = ["haiku", "software"]
+++

Thanks in large part to the hard work by X512 and everyone developing on Haiku, our nightly RISCV64 images are now functional.

RISC-V marks Haiku's first functional non-Intel/x86 port!

## What is RISC-V?

[RISC-V is a modern, fully open CPU instruction set](https://riscv.org/about/) which can be implemented, customized, extended, and sold without royalties. Designs exist for a 32-bit, 64-bit, and even a 128-bit processor design.

You can [emulate RISC-V in qemu](https://wiki.qemu.org/Documentation/Platforms/RISCV), [design your own CPU and synthesize it for an FPGA](https://aignacio.com/posts/hdls/mpsoc_riscv/), or you can purchase a [commercially built and designed computer with a RISC-V processor](https://www.sifive.com/boards/hifive-unmatched).

## Why not ARM?

Haiku developers are continuing to work on ARM and ARM64 ports of Haiku, RISC-V just finished first :-)

## Running nightly RISCV64 images in qemu

![RISCV64 in qemu](/files/screenshots/riscv64-qemu.png "RISCV64 in qemu")

{{< alert-info "Beware of bugs" "There are multiple lingering bugs ([#17379](https://dev.haiku-os.org/ticket/17379), [#17380](https://dev.haiku-os.org/ticket/17380)) in RISCV64 Haiku running under QEMU. If you don't make it to the desktop, try again.">}}

To boot Haiku in qemu (qemu-system-riscv64), you'll need the following:

* qemu 6.0.0 or later
* [Nightly riscv64 Haiku image](https://download.haiku-os.org/nightly-images/riscv64/) (hrev55624 or later)
* [u-boot binary for qemu riscv64](https://github.com/haiku/firmware/tree/master/u-boot/riscv64/qemu)

Once you have the above two items, then booting Haiku is as easy as running the following command:

```
qemu-system-riscv64 -M virt -m 1G -device ati-vga -kernel u-boot.bin \
	-drive file=haiku-mmc.image,format=raw,if=virtio \
	-usb -device usb-ehci,id=echi -device usb-kbd -device usb-tablet
```

* You can watch technical serial output via ```view->serial0```
* The eventual Haiku desktop will be available via ```view->ati-vga```

## Running nightly RISCV64 images on the SiFive Unmatched

To boot Haiku on the SiFive unmatched, you will need the following:

* [SiFive Unmatched board](https://www.sifive.com/boards/hifive-unmatched)
* A Radeon HD graphics card which works with our radeon_hd driver
* [SD Card prepared as a "u-boot uefi bios"](https://git.haiku-os.org/haiku/tree/3rdparty/kallisti5/unmatched-uboot.sh)
* [Nightly riscv64 Haiku image](https://download.haiku-os.org/nightly-images/riscv64/) (hrev55624 or later) written to a USB Flash drive
  * ```dd if=haiku-mmc.image of=/dev/sdXX bs=4M```

{{< alert-info "Serial Debugging" "In the event of trouble, attaching a Micro-USB cable to the Unmatched allows you to see serial output during startup.  (minicom, 115200 8N1, no flow control)" >}}

Once you have all of the requirements above, the following process will get you booted into Haiku:

1. Plug the SD Card into the SiFive Unmatched
2. Plug the USB Flash drive into the SiFive Unmatched
3. Power on the SiFive Unmatched. You should be greeted with a desktop within a minute or two

## Wrapup

Overall, RISC-V offers an exciting opportunity for us to grow our non-x86 architecture support.
A lot of work still remains on RISC-V including support for SMP (multi-processor), however this
is a massive first step.
