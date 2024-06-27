+++
type = "blog"
title = "[GSoC 2024] Hardware virtualization: Progress Report #1"
author = "dalme"
date = "2024-06-27 02:47:54+02:00"
tags = ["gsoc", "gsoc2024", "qemu", "nvmm"]
+++

When the coding period began I was expecting to publish a progress report every week. However, we've reached the end
of the first month of the coding period and this is my first update: This probably tells that there hasn't been as
much progress as I expected, although progress have been made.

## What works
- The library was one of the first things I got done, because it consists of very portable
code, which made it very easy to port, while allowing me to test the (still reduced) driver
capabilities much easier as I could use already existing code examples for NVMM instead of
trying to talk directly to the driver.

- The driver can be loaded and talked to (through ioctl), but capabilities
are reduced: A fully working driver should support the 16 IOCTL calls the
driver defines. Our current driver only supports 4 of them so far (and only the VMX backend,
the SVM backend is at a much early state).

Right now I'm working to get the ```calc-vm.c``` example [from NetBSD to work](https://blog.netbsd.org/tnf/entry/from_zero_to_nvmm). It's a very
simple program that simply creates a virtual machine that only adds two integer and returns
its result.

## What doesn't work
- The other 12 IOCTL calls
- QEMU (I won't get to it until NVMM is working)

On a more optimistic note I should say that I believe most of the work needed for getting the missing IOCTLs is done.
The [nvmm_os.h](https://github.com/dalmemail/haiku-nvmm/blob/master/src/add-ons/kernel/drivers/nvmm/nvmm_os.h) file contains much of the OS-dependent logic of NVMM and as you can see almost all the parts have
already NetBSD, DragonFlyBSD and Haiku definitions. I expect once the last big thing (handling VM guest address space)
is done it'll be easy to get the rest of NVMM to compile. Then I'll have to fix every kernel panic
that appears (I've had some panics fixed already) and then make sure not only it doesn't panic
but that behavior is as expected.

So, what's so hard about handling the guest address space?

When the guest tries to access a memory location this triggers (in VMX) a VM exit: That is,
the control is returned to the host OS (to the VMM, here NVMM), which then handles this memory access: If it's a read then the hypervisor (NVMM)
executes the memory read (if it's a legal memory read), puts the result on the register where the guest is expecting it and
resumes execution of the virtual machine. This is called memory emulation, because we're emulating each memory access so it feels
real to the guest while it's not really accessing memory directly. The obvious problem that arises here is that memory
emulation is very slow compared to a real memory access. Think about it: Instead of just one memory access, we have a VM exit
(quite similar to a context switch), then some checks and then the memory access. And all this without accounting for the
virtual to physical address translation, which the guest does through pages tables hold into its physical memory, which
we've just said has to be emulated...

To avoid this, since we need to store the guest memory as part of the host memory
a "simple" way to do it is to store every physical page (those are the
addresses we get when a VM exit happens) of the guest as a page of the host. So, the million dollar
idea here is: Why instead of emulating memory accesses (which is very expensive) don't we just tell the host MMU that the guest physical address
X is at host physical address Y so that we can safely allow the guest to access memory directly, thus eliminating the need to emulate memory
acceses? This is called [Second Level Address Translation (SLAT)](https://en.wikipedia.org/wiki/Second_Level_Address_Translation) also called nested paging. Intel has its own thing, called
EPT (Extended Page Tables) which provides hardware assisted SLAT, while AMD's is called NPT.

Anyway, those two work by allowing you to set page tables for nested pages. The page structures have the same format and layers as in virtual memory page tables.
In the case of EPT there exists a register called EPTP where you have to put a pointer to the physical page that contains the top table of the
hierarchy, just as you would do with virtual memory on CR3. Everything else needed to have EPT working is handled by NVMM, with the exception of
keeping the tables pointed by EPTP updated.

It took me some time to get the big picture of all this, since, I had no idea about how EPT and NPT worked. Also, it wasn't so obvious why we would
need any changes on the kernel, when you would expect NVMM to handle SLAT, but the DragonFlyBSD commit history clearly showed they did changes to their virtual memory
subsystem to explicitly support EPT and NPT on their kernel.

So, what do we need?
- We need a way to handle the pages that form the guest physical memory. We're gonna have a lot of them usually, so we need something to hold all of them
together
- We need a way to handle the mapping from guest physical address to host physical address, to know where each page from the guest is on the host.
- We need a way to keep the page tables pointed by EPTP updated

Since guest physical addresses are like virtual addresses we may want to use a VMAddressSpace (VMUserAddressSpace) but that poses a couple of problems:
- It woudn't handle the EPT tables correctly, as a top area in every VMUserAddressSpace maps into kernel pages (to allow user processes to make system calls, for example).
- Ugly hacks to fix the first one while still using VMUserAddressSpace.

The solution is to make a VMVirtualAddressSpace subclass of VMAddressSpace to handle EPT and NPT memory maps. That way we can handle EPT tables correctly and the address space.
We'll have our EPT tables handled by VMTranslationMap in every case (page insertion, page deletion, page swapped out to disk, ...)
without further work.

Useful links regarding EPT:

- [MMU Virtualization via Intel EPT: Technical Details](https://revers.engineering/mmu-ept-technical-details/)
- [Hypervisor From Scratch – Part 4: Address Translation Using Extended Page Table (EPT)](https://rayanfam.com/topics/hypervisor-from-scratch-part-4/)
- [Introduction to IA-32e hardware paging](https://www.triplefault.io/2017/07/introduction-to-ia-32e-hardware-paging.html)
- [Hypervisor From Scratch – Part 7: Using EPT & Page-Level Monitoring Features](https://rayanfam.com/topics/hypervisor-from-scratch-part-7/)

