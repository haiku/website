+++
type = "blog"
title = "[GSoC 2022] ARM port and device tree support"
author = "Zhihong Niu"
date = "2022-05-30"
tags = ["haiku", "software", "gsoc2022", "arm", "device driver"]

+++

# Introduction

I am Zhihong Niu, an Computer science undergraduate student at the Xi'an Shiyou University.

This summer I will port Haiku to ARM and support some device tree-based storage device.

My mentors for this project are scottmc and David Karoly.

Here is the link to my [proposal](https://github.com/MRNIU/gsoc2022_haiku).

# Project

The project actually has three goals: run Haiku on ARM, device tree support and mass storage device driver based on device tree.

- ARM port

    This work will be done soon, I just need to do some testing and fix bugs along the way.

- Device tree support

    Under x86, the address of most hardware is fixed, but for architectures such as ARM/RISCV/MIPS, the address of the device varies according to the vendor. To solve the problem of device address, the concept of device tree was introduced. The human-readable format of the device tree is .dts, the bootloader passes dtb info to the kernel at system startup. The bootloader passes dtb info encoded according to the specification to the kernel at system startup, and kernel can access the device after parsing the device information according to the specification.

    Thanks to [X512](https://discuss.haiku-os.org/u/X512), X512 has done a lot of this, I thought I could help X512 get this done.

- Mass storage device driver based on device tree

    This is the main job for me, the goal is provide at least one mass storage solution to the ARM port of Haiku. The current plan is virtio_disk which use provided by qemu virtio.

# Thread

Progress will be updated [here](https://discuss.haiku-os.org/t/gsoc2022-arm-port-and-device-tree-support/12036).

