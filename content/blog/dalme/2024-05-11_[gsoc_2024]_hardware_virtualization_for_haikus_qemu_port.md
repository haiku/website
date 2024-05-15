+++
type = "blog"
title = "[GSoC 2024] Hardware virtualization for Haiku’s QEMU port"
author = "dalme"
date = "2024-05-11 19:08:35+02:00"
tags = ["gsoc", "gsoc2024", "qemu", "nvmm"]
+++

# Introduction

Hi there! I'm Daniel Martin (aka dalme) and I'm a final year undergraduate student
at Complutense University of Madrid (Spain). I've been accepted into Google Summer of
Code and I'll be working to bring hardware virtualization to Haiku, a project that
has been in the GSoC ideas list for around a decade. I'll be mentored by scottmc and
waddlesplash.

# Project overview

QEMU is a virtual machine which allows running an operating system inside of another.
While there already is a Haiku port, it currently does not support any acceleration system
through native virtualization (through Intel VT-x and AMD SVM). This makes it too slow for
many uses, due to having to emulate the guest OS on software. Fixing this would allow Haiku
users to run another system, such as Windows or Linux, at almost native speed. This
would make using Haiku as primary operating system a viable approach for more people
since they could effectively run applications that are not yet available on Haiku.

Other operating systems achieve native virtualization by using a driver that turns the OS
into a hypervisor: Linux uses their own KVM (which has been ported to FreeBSD and Illumos),
FreeBSD has bhyve (this actually implements the whole virtual machine, not only the virtualization
layer. It was developed a few years after their KVM port), NetBSD and DragonFlyBSD use
NVMM and Intel released one called HAXM (although this one has been abandoned by Intel and
only supports their machines anyway).

Of all of this, NVMM is the simplest of them all and probably the easiest to port. Its written
in C and supports both Intel (VMX) and AMD (SVM) machines. QEMU already has support for it, so
that's another plus for it. Despite its simplicity it currently [supports any major operating system out
there](https://m00nbsd.net/4e0798b7f2620c965d0dd9d6a7a2f296.html) and it can support up to 128 virtual
machines, each having a maximum of 256 CPUs and 128GB of RAM.

# Goals

# Port the NVMM driver

The main component of NVMM is a 10k lines of code formed by a frontend and backend. The frontend just
allows to handle virtualization in a machine-independent manner, while the backend is essentially a driver
that talks to the virtualization hardware to run the frontend requests while dealing with
any implementation-specific details. Currently NVMM supports
two backends: Intel VT-x and AMD SVM (both for x86). This is a UNIX-style driver, so its interface is
a device file, that can be talked to using filesystem calls. In our case this is mainly
through ioctl().

My original proposal stated that I would be porting only the VMX (Intel VT-x) backend, since that's the
hardware I have, but waddlesplash owns an AMD machine so we'll be porting both.

# Port libnvmm

libnvmm is a C library that provides a friendly interface to talk to NVMM (instead of using ioctl()). In
addition to that it also brings an instructor emulator, an instruction decoder and a MMU. These components
are not necessary for the virtualization to work but are a great help for developing applications that
leverage NVMM's capabilities. In fact, QEMU uses libnvmm to deliver NVMM support.

The library comes with a small test suite that may help us debugging NVMM.

# Make QEMU port capable of accelerating virtual machines

As I already said [QEMU currently supports NVMM acceleration](https://www.qemu.org/docs/master/about/build-platforms.html).
At this point we'll have to do some extensive testing to make sure everything works as expected and fix any bug that
appears.

# Final remarks

There is [a forum thread for this project](https://discuss.haiku-os.org/t/gsoc-2024-hardware-acceleration-for-haikus-qemu-port/14784).
Also, because of the amount of commits this is going to involve we're conducting development at a
[GitHub repository](https://github.com/dalmemail/haiku-nvmm) instead of Gerrit (development branch is called nvmm).

Last but not least, I would like to thank Haiku for choosing me as a GSoC participant. I'm looking forward to a very productive summer!
