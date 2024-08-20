+++
type = "blog"
title = "[GSoC 2024] Hardware Virtualization: Final Report"
author = "dalme"
date = "2024-08-21 00:00:00+02:00"
tags = ["gsoc", "gsoc2024", "qemu", "nvmm"]
+++

## Project overview

QEMU is a virtual machine which allows running an operating system inside of another. While there already is a Haiku port, it currently does not support any acceleration system through native virtualization (through Intel VT-x and AMD SVM.) This makes it too slow for many uses.
This project aimed to bring hardware virtualization to Haiku by porting NVMM, a hypervisor that already has QEMU support, into Haiku from DragonFlyBSD. The project goals (as included on the proposal) were:

### Project goals
- NVMM driver ported to Haiku (VMX backend only)
- QEMU capable of accelerating virtual machines through NVMM

The project goals didn't change much during the project (although there were plans to get SVM backend working too, which didn't happen since I didn't got any time to get into it) and they've been completed to some extent: The driver (VMX backend) is almost completely ported (there are only a few details missing) and QEMU is capable of accelerating virtual machines but several bugs remain.

Now, the details:

## Completed objectives

- NVMM frontend ported
- NVMM VMX backend ported (with a couple issues remaining)
- libnvmm (& test suite) ported
- EPT support added to the kernel
- QEMU patched to support NVMM on Haiku and working

## Unresolved issues

- SVM backend not ported
- Some OSes don't work properly on QEMU
- Different behavior on real hardware
- QEMU crashes when SMP is enabled
- EPT translations not flushed from TLB on time

These are just the major issues, for a full list of incomplete stuff refer to [GitHub](https://github.com/dalmemail/haiku-nvmm/issues) (43 still opened while writing this post).
Here we can see QEMU virtualizing KolibriOS through NVMM (on nested virtualization):

![KolibriOS running on QEMU+NVMM (nested virtualization)](/files/blog/dalme/kolibri.png)

## Code

The code is available at [GitHub](https://github.com/dalmemail/haiku-nvmm) (commits dated May 13 and later in the master branch). None of it has been merged yet since the driver isn't fully working
and the kernel changes I made are only needed for NVMM.

## Completed objectives: Technical details

Some details about each thing I got done, in chronological order, with some of the more
relevant commits included. Some commits from the beginning of the project contain changes
to more stuff than what the commit message says since at the beginning I had to do lots
of changes in many different parts of the project and it was hard to split things into
separate commits.

### Importing missing BSD headers

While the NVMM code from DragonFlyBSD was more OS-independent than the NetBSD one it still
assumed a lot of BSD macros were available. Many of them weren't available on Haiku so we
brought some headers from DragonFlyBSD:

- [Import sys/specialreg.h from DragonFlyBSD](https://github.com/dalmemail/haiku-nvmm/commit/a66d31d7ef2077fc7b81c4b4b5808226b4c3a70c)
- [Add _IOR and similar macros to nvmm ioctl codes](https://github.com/dalmemail/haiku-nvmm/commit/dc0c22b790e7ec466b35f98317b2b30b194d9e39)

### Making Haiku headers C compatible

NVMM is written in C while huge chunks of Haiku are written on C++. We decided to keep NVMM in C (that is, compile it with gcc) and just
put C++ code into the `nvmm_haiku.cpp` file which holds any OS-dependent logic for the Haiku port, just like there are `nvmm_netbsd.c` and `nvmm_dragonflybsd.c`.
However, there are some Haiku headers we needed to include from NVMM C code. Those headers were actually supposed
to have a C-API but apparently the x86_64 versions of those headers didn't. I had to made them work with C:

- [Make arch/x86/arch_cpu.h kernel header C compatible](https://github.com/dalmemail/haiku-nvmm/commit/d0556daa6d757fd4f6b69c76ffb93e663fa2d937)
- [nvmm: stub driver working within whole NVMM codebase](https://github.com/dalmemail/haiku-nvmm/commit/3769a430544ed5941c4544b0aa10c97052ab81e0)

### SVM backend

Just for the sake of completion. The only commits involving the SVM backend:
- [nvmm: stub driver now supports AMD SVM](https://github.com/dalmemail/haiku-nvmm/commit/5f9a239c34e2873b8882fa7d8d1322cdee00a4e2)
- [init and fini also working on the SVM backend](https://github.com/dalmemail/haiku-nvmm/commit/ceb67a11c93c5d24f64ba878643038de01837830)
- [Implement os_pagemem_alloc/os_pagemem_free and modify SVM backend to avoid need of os_pa_zalloc/os_pa_free](https://github.com/dalmemail/haiku-nvmm/commit/740df4501a8a5ca90652f12a04a957ece5cbc2fe)

### Porting libnvmm

Porting libnvmm was straightforward and painless, although it required to remove some non-standard error codes.

- [libnvmm compiles](https://github.com/dalmemail/haiku-nvmm/commit/e4f51dac9bb0cea0ec6e1037c70e72e72e5df3d9)
- [Don't use EPROGMISMATCH](https://github.com/dalmemail/haiku-nvmm/commit/b2600d524f2a5e3cc80be86bf7d206be79ddfe14)
- [Add nvmm headers to haiku_devel package](https://github.com/dalmemail/haiku-nvmm/commit/406390221c026a52bc20480e58e39c9df6f26fa9)

### VMX backend

This was the part of the project that spans greater over time (I worked on it from May 13 to around July 16, and there were bugfixes after that).
It slowly gained functionality over time, each day adding a new feature until finally [the calc example](https://blog.netbsd.org/tnf/entry/from_zero_to_nvmm)
became the first VM to be virtualized by NVMM on Haiku.

The code contained here is very straight-forward since the hard part was getting the OS specific
functions that these IOCTLs needed working.

- [Getting vmx_init() to compile (not compiling yet)](https://github.com/dalmemail/haiku-nvmm/commit/97b04d055ab1cb984cebe3082ac710b2d1d8b46b)
- [Implement NVMM_IOC_CAPABILITY ioctl](https://github.com/dalmemail/haiku-nvmm/commit/f840ed632ca10ba52222bd7c1137c660deeb9468)
- [Implement NVMM_IOC_MACHINE_CREATE ioctl](https://github.com/dalmemail/haiku-nvmm/commit/038ac7c167a525aff7c4809ea414fb72cf6ae290)
- [Implement NVMM_GPA_MAP ioctl](https://github.com/dalmemail/haiku-nvmm/commit/a2588be1c3a0cd7550c3db29b7f74781eca78444)
- [Implement NVMM_IOC_VCPU_RUN ioctl](https://github.com/dalmemail/haiku-nvmm/commit/70fceb11ddd3019364bcbd41d580d0774954d505)

![calc-vm virtualized by NVMM](/files/blog/dalme/vm.png)

### Haiku specific driver

Implemented Haiku legacy driver API into the driver.

- [Driver ready to accept ioctl calls!](https://github.com/dalmemail/haiku-nvmm/commit/c081231b1ab7dc26c4d6f4297471b10a47f0335f)
- [Use user_memcpy() on ioctl data forwarding from userspace](https://github.com/dalmemail/haiku-nvmm/commit/a76e570e205a1edcad147e1ca4c6ae4c348387a2)
- [Make ioctl callback thread-safe](https://github.com/dalmemail/haiku-nvmm/commit/87f7960c478a4cc79ebe3f385dbea9f89d3ae466)

### Memory management

Arguably the hardest and longest part of the project since it was a prerequisite to implement almost everything (VMX backend and parts of NVMM frontend).
It required me to understand a big part of the virtual memory management code, how
NVMM handles memory and how QEMU maps it. Finally guest memory management is integrated into
Haiku virtual memory subsystem, as shown by the guest page fault handler which simply calls
Haiku page fault handler.

- [Implement os_contigpa_zalloc() and os_contigpa_free()](https://github.com/dalmemail/haiku-nvmm/commit/a44217b322966d0d25b4c0f38c941577c55a6a87)
- [Implement os_vmobj_t create(), ref() and rel() functions](https://github.com/dalmemail/haiku-nvmm/commit/d0492caaf1aac0381ef639241b788e256a31ef42)
- [Refactor os_vmspace_t, os_vmspace_create(), os_vmspace_destroy(), os_vmspace_fault() using VMCache instead of VMAddressSpace](https://github.com/dalmemail/haiku-nvmm/commit/c83a7188245cb46a7ab2c1c2f62fc5589b6e84db)
- [Implement os_vmobj_unmap() and os_vmobj_rel() properly](https://github.com/dalmemail/haiku-nvmm/commit/80810c681bc2dc54793dfbad66066dd253c920c3)
- [Implement guest page fault handler (os_vmspace_fault())](https://github.com/dalmemail/haiku-nvmm/commit/80b835b446e4ed936a486e9c3ee4e8126d52f357)

#### EPT (Extended Page Tables)

These tables handle the guest physical memory so our guest OS can access memory at nearly native speed. This meant adding `X86GPAtoHPATranslationMap` to the kernel:
a new type of translation map that handles GPA (Guest Physical Address) to HPA (Host Physical Address) translations.
`VMVirtualAdressSpace`, a new class of address space that handles the guest physical memory
address space was also added. It doesn't have any Haiku kernel pages mapped and uses `X86GPAtoHPATranslationMap` as translation map.
Finally we have `EPTPagingMethod` which creates, destroys and populates EPT tables. It's called from `X86GPAtoHPATranslationMap`.

- [Add X86GPAtoHPATranslationMap to handle EPT tables](https://github.com/dalmemail/haiku-nvmm/commit/466be08a7c70604351f5b00118610634f935a03b)
- [Add VMVirtualAddressSpace to handle guest OS address spaces](https://github.com/dalmemail/haiku-nvmm/commit/fe8e5b8c319f514b0b5ce047925cc2d09e619e0e)
- [Implement EPT tables (EPTPagingMethod)](https://github.com/dalmemail/haiku-nvmm/commit/94e2ab404893fb87dd69d8e175ce0550bee17d54)

### QEMU

Getting QEMU to work required a new patch since QEMU buildsystem only looks for NVMM on NetBSD.
In addition to that there were a few other issues:
- Non-standard error codes were used.
- QEMU couldn't find NVMM or libnvmm headers.

Since NVMM isn't ready to merge yet, QEMU recipe and patch aren't merged either. I've [pushed them to GitHub](https://github.com/dalmemail/haiku-nvmm/commit/c478b6b56fbe3cd0f2bc30f4730d32817f31f5c6).
- [QEMU 8.2.2 build recipe](https://github.com/dalmemail/haiku-nvmm/blob/master/qemu-8.2.2.recipe)
- [QEMU 8.2.2 patchset](https://github.com/dalmemail/haiku-nvmm/blob/master/qemu-8.2.2.patchset)

## Unresolved issues: Technical details

### Some OSes don't work properly on QEMU

![Haiku virtualized on Haiku](/files/blog/dalme/QEMU1.png)

As you can see it doesn't manage to virtualize Haiku correctly. It feels like some memory is copied wrong at some point. Xubuntu fails very early too.
Sortix appears to work fine (on nested virtualization) but that's likely just because it's a smaller OS and the live ISO loads almost everything using GRUB (which uses BIOS calls to do so). Other toy OSes appear to work fine. I never managed to get the time to debug this so I can't provide any more information.

### Different behavior on real hardware

One of the biggest bugs I have debugged during GSoC consisted on very poor virtualization performance
on real hardware. When running on nested virtualization (that is, executing QEMU+NVMM inside a VM running Haiku)
things would ran slow (as expected on nested virtualization) but with similar performance as
QEMU+NVMM on NetBSD. However, when running on real hardware performance
would be way worse than that. Loading GRUB alone took a couple of minutes (if not more).
There are a couple of reasons why this was happening but I didn't find the "big" one until
yesterday. To keep it short I was convinced by some reason that EPT tables format was the same
as in X86 page tables but it's not (although it's similar enough to work). This was preventing the TLB from caching any EPT stuff and thus causing a huge performance loss.

[I've written the correct EPT tables into the kernel](https://github.com/dalmemail/haiku-nvmm/commit/94e2ab404893fb87dd69d8e175ce0550bee17d54) and it finally runs fast. The problem (yes, there is always a new problem) is
that several new bugs have appeared. I've managed to fix a few of them, but others remain:
- The Space Invaders boot sector game [I showed on the forum](https://discuss.haiku-os.org/t/gsoc-2024-hardware-acceleration-for-haikus-qemu-port/14784/28) keeps working on nested virtualization but doesn't work anymore on real hardware. BIOS just hangs trying to load it.
- Sortix doesn't work anymore. It reboots while loading GUI (probably a triple fault). It seems to work fine if you disable GUI on GRUB.

Since I fixed the performance issue yesterday I just haven't had enough time to fix this yet.

### QEMU crashes when SMP is enabled

As the title says QEMU tends to get an invalid VM exit from NVMM which causes it to abort, when running on a multiprocessor machine. This happens when a VM is migrated
from one physical CPU to another, but it only happens sometimes. I prioritized fixing the performance issues and
getting QEMU+NVMM working correctly on one CPU before even trying to fix this. I took a look at the code I wrote in May to handle VM migrations and didn't see any obvious failure.


### EPT translations not flushed from TLB on time

This is one of the few missing things on the VMX backend. Cached values from EPT tables (aka host TLB) needs to be flushed everytime there is a change on the EPT
tables. On NetBSD they do this by installing a callback into the translation map. On DragonFlyBSD the translation map increments a counter everytime a flush is needed. On Haiku we
don't yet manage this in any way. This isn't a problem yet because everytime we do a context switch
we flush the whole TLB (by reloading CR3) but it'll be a problem for having VMs with more than one CPU since we should invalidate remote TLBs too. Both the NetBSD
and the DragonFlyBSD solution should be easy to add to the brand new `X86GPAtoHPATranslationMap`.

## Conclusion

Throughout this project I've learned a lot about VMX and virtualization in general. I've also learned
about paging and got some hands on experience doing kernel development on a well-established project.

I have also learned more about assembly and debugging (GDB scripts).

## Acknowledgements

This awesome summer wouldn't have been possible without my awesome mentors: waddlesplash and scottmc. Thank you!

I also want to thank Pulkomandy for checking my proposal draft back on March and trungnt2910 for fixing his GDB port so it would be able to debug QEMU. And of course all the people in the community that have been showing interest on this project in the forum and IRC.

I can't believe it's over. Time flies when you're having fun!

## Project links

- [GSoC project thread on Forums](https://discuss.haiku-os.org/t/gsoc-2024-hardware-acceleration-for-haikus-qemu-port/14784/9)
- [NVMM port code at GitHub](https://github.com/dalmemail/haiku-nvmm)

## VMX links

- [Hypervisor From Scratch](https://rayanfam.com/tutorials/)
- [5 Days to Virtualization: A Series on Hypervisor Development](https://revers.engineering/7-days-to-virtualization-a-series-on-hypervisor-development/)
- [MMU Virtualization via Intel EPT](https://revers.engineering/mmu-virtualization-via-intel-ept-index/)
- [Introduction to IA-32e hardware paging](https://www.triplefault.io/2017/07/introduction-to-ia-32e-hardware-paging.html)
