+++
type = "blog"
title = "[GSoC 2017] 3D Hardware Acceleration in Haiku"
author = "vivek"
date = "2017-05-05 04:41:03+05:30"
tags = ["driver","gsoc2017","gsoc",]
+++

### Hello everyone

My name is Vivek (Trac: vivek-roy, IRC: vivu). I have been selected for Google Summer of Code 2017 to work with Haiku on the project **3D Hardware Acceleration in Haiku**.

The Mesa renderer in Haiku presently ventures into software rendering. Haiku uses software for rendering frame buffers and then writes them to the graphics hardware. The goal of my project is to port **Direct Rendering Manager (DRM) Driver** for i915, from the Linux kernel to Haiku with the help of DragonflyBSD’s Linux Compatibility layer, so that those drivers can be later extended to add OpenGL support (Mesa3D) for hardware accelerated 3D rendering.


### Present Scenario

Haiku presently uses software rendering to draw graphics to the screen. The rendering is done to a frame buffer which is then written to the graphics hardware’s memory. This offers acceptable performance for 2D rendering and to some extent light 3D rendering, but it is not good enough for intensive 3D applications like games that require rendering large amounts of 3D primitives while maintaining high frame rates. Hardware acceleration is critical in such cases.


### 3D Hardware Acceleration
For achieving hardware accelerated 3D rendering, the following things are needed:

* **Direct Rendering Manager (DRM):**  Direct Rendering Manager or DRM is the interface for the software to communicate with the graphics hardware of the device. It consists of two parts - a generic DRM Core and a hardware specific DRM Driver. DRM core provides the basic framework where different DRM drivers can register, and also provides to user-space a minimum set of ioctls with common, hardware-independent functionality. A DRM driver, on the other hand, implements the hardware dependent part of the API, specific to the type of GPU it supports; it should provide the implementation of the remaining ioctls not covered by DRM core, but it may also extend the API offering additional ioctls with extra functionality only available on such hardware. It is responsible for handling sensitive aspects like hardware locking, access synchronization, video memory etc.
* **libDRM:**  It provides the user-space with an API that can be used to submit commands and data in a format that is adequate for modern GPUs, which effectively allows the user-space to communicate with the graphics drivers.
* **Mesa:**  Mesa is a free software implementation of the OpenGL specification, and as such, it provides a libGL.so, which OpenGL based programs can use to output 3D graphics. Mesa can provide accelerated 3D graphics by taking advantage of the DRM architecture to gain direct access to the underlying graphics hardware in its implementation of the OpenGL API.
The very first step to achieving 3D Hardware Acceleration is porting DRM to Haiku.


### DRM Driver and DRM-Auth

**DRM drivers** reside in the kernel-space, so the user-space programs must use kernel system calls to request it services. The drivers itself are kept relatively simple and well tested because any error in the kernel-space will cause a full system crash. In order to make DRM drivers, we will also need to make a **DRM Core** which will export several interfaces to user-space applications. Together DRM will be responsible for memory management, context management, DMA operations, AGP management, vblank control, fence management, memory management, and output management.

DRM also implements an authentication system for security purposes as well as concurrency issues to limit the number of user-space processes to one per graphics device. To implement this restriction, DRM limits such ioctls to be only invoked by the process considered the "master" of a DRM device, usually called **DRM-Master**. Any attempt to use one of these ioctls without being the DRM-Master will return an error. The display server is usually the process that acquires the DRM-Master status. For the remaining user-space processes the way to invoke some operation on the DRM device is called **DRM-Auth**. It is basically a method of authentication against the DRM device, in order to prove to it that the process has the DRM-Master's approval to get such privileges. DRM-Master privileges are granted on a first-come-first-serve basis. Whichever process demands first, is granted the DRM-Master privileges. What I intend to do is make the app_server the first process which will request for DRM-Master privileges. Thus, every other process will have to work through the app_server (indirect rendering) or demand restricted ioctl privileges using DRM-Auth from the app_server to be able to directly invoke libDRM functions.


### The Project

Porting kernel drivers itself is a lot of work to be completed in 3 months time. Also, the DRM Core has to be ported, which will provide the basic ioctls and allow the different DRM Drivers to structure themselves on top of it. So what I expect is a working **DRM Core** and **i915 DRM driver** with a working framebuffer by the end of this summer. This also includes the **DRM-Auth** mechanism of authentication which checks whether the user-space processes have the permissions of the DRM-Master. The reason for choosing i915 is that it covers a lot of Intel GPUs. Haiku, being an operating system targeting personal computing, is expected to run on a lot of laptops, and a lot of laptops use Intel’s integrated GPUs which in a lot of cases is the i915. Also, I do have an Intel GPU which is covered by i915 and thus I will be able to check/debug the drivers I plan to introduce.


### References

* [PDF copy of my GSoC Proposal](https://drive.google.com/file/d/0ByGctK8IITzaZFpIajJHWVBrVEE/view?usp=sharing)
* [Direct Rendering Manager wikipedia.org](https://en.wikipedia.org/wiki/Direct_Rendering_Manager)
* [Direct Rendering Manager (DRM) freedesktop.org](https://dri.freedesktop.org/wiki/DRM/)
* [Introduction to the Linux Graphics Stack](https://blogs.igalia.com/itoral/2014/07/29/a-brief-introduction-to-the-linux-graphics-stack/)
