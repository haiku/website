+++
type = "blog"
title = "[GSoC 2017] 3D Hardware Acceleration - Weekly Report 2"
author = "vivek"
date = "2017-06-04 23:00:26+05:30"
tags = ["haiku", "software"]
+++

### Hello again

Here goes my second weekly report describing my efforts and endeavours in the last two weeks. I haven't produced a lot of code, but I am not sitting idle.


### Technical Report

Firstly, as advised by Alex (*kallisti5*), I have a Technical Report<sup>[1]</sup> prepared - a rough outline of how and what all changes to the codebase are planned for this summer project. It is a very basic roadmap which I will try my best to stick to but cannot guarantee. 


### Conversation with Hamish

As you might already know, Hamish Morrison (*hamishm*) started working on DRM Drivers in Haiku about 2 years back. So, I decided to *interview* him about what all steps he took and what all problems he faced 2 years back. We had a long conversation about how the memory mapping technique of Haiku and Linux are very different. Adrien (*PulkoMandy*) told about a technique to allocate continuous physical memory as the kmalloc implementation in Linux. So what needs to be done now is figure out the places in the DRM code where we actually need a *physically continuous* block of memory and where we don't as allocating physically continuous memory everywhere won't be very efficient in Haiku.


### Decision to go for DRM2

I had a short conversation with the developers at #dri-devel. I asked them if anyone could help me with some reading material on how to implement DRM Drivers as documentation on DRM and DRI is very scarce and whatever exists is more like an API Documentation for using the DRM-DRI structure. I spoke to the guy who implemented DRM Drivers for NetBSD. He told me that it would be a better option to go for DRM2 and pointed me to their code implementation.

I spoke to Alex (*kallisti5*) and James Taylor (*Duggan*), and they would also rather go for DRM2 and DRI3. Alex said "DRM/DRI1-2 were not really that portable outside of X11. DRM2 and DRI3 are improvements around that portability. (once Wayland came to the scene, they had to quickly remove a lot of the X11 requirements which is actually good for us)".

So, I decided to go for DRM2 and have NetBSD and FreeBSD's implementations as reference. (DragonflyBSD doesn't have an implementation of DRM2)


### Reading

I have been doing some reading of whatever material<sup>[2-4]</sup> I could get hold of online. Most of them are from 1999 and 2000, but no harm knowing than to start changing a bunch of stuff without understanding what is going on inside.


### References

1. [Technical Report](https://docs.google.com/document/d/1lscvbOAp0pDt31D8pcAINTU13PXSxLepKcnpKVcKV8U/edit)
2. [Dave Barron, ExtremeTech 3D Card Guided Tour](https://www.extremetech.com/computing/49010-3d-card-guided-tour)
3. [Dave Salvator, ExtremeTech 3D Pipeline Tutorial](https://www.extremetech.com/computing/49076-extremetech-3d-pipeline-tutorial)
4. [Rickard Faith, The Direct Rendering Manager: Kernel Support for the Direct Rendering Infrastructure](http://dri.sourceforge.net/doc/drm_low_level.html)