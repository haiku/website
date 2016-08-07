+++
type = "blog"
author = "xyzzy"
title = "x86_64 port: midterm report"
date = "2012-07-11T11:08:36.000Z"
tags = ["gsoc", "gsoc2012", "x86_64"]
+++

Since my quarter term report I have made a great deal of progress. The boot loader x86_64 support is finished, and the kernel can now be booted to the point of searching for the boot volume. A screenshot of this:
<!--break-->
<div align="center">
<a href="http://www.haiku-os.org/files/images/x86_64-midterm.png"><br />
<img src="http://www.haiku-os.org/files/images/x86_64-midterm.png" width="640px" height="435px" />
<br /></a>
</div>

This means that most of the major parts of the kernel functionality (e.g. virtual memory management, threading and interrupt handling) are now implemented. Since x86_64 is essentially an extension of x86, there is quite a lot of code that can be shared between them. What I have done is merge the x86 and x86_64 kernel code together: the arch/x86 directory contains the code for both. The parts which are completely different for 32-/64-bit are under 32 and 64 subdirectories, but most of the existing code is common to both architectures. Reusing the existing code has allowed me to progress as quickly as I have: getting hardware interrupts and timers among other things working was just a matter of compiling the code into the x86_64 kernel.

Along the way I have run into some interesting bugs, particularly with memory management. Memory management bugs are quite fun to debug. You can get ones that lead to random memory corruption, or even triple faults (if the CPU encounters another exception trying to handle an exception, you get a double fault which has a special handler, and if it encounters another executing that handler it will reset the machine, a triple fault). My usual testing environment is QEMU, however when I run into such bugs I usually switch over to Bochs, which although very slow in comparison to QEMU, has an excellent built-in debugger. It provides information on the cause of a triple fault, allows you to examine memory, registers, and virtual to physical memory mappings, and set watchpoints to find where a memory location gets written at.

The 2 most interesting bugs both arose from issues with the 64-bit paging setup code in the boot loader. The first was that when the VM initialization code was clearing the memory mappings created by the boot loader that are not needed by the kernel, the code was attempting to free a page that was still mapped elsewhere and causing a panic. I initially thought that this was memory corruption, as from debug output I couldn't see that the address the page was mapped at was being mapped anywhere. After spending a while using Bochs watchpoints to find where the page was being mapped, I found that the boot loader was creating invalid mappings in the 64-bit address space. The boot loader runs in 32-bit mode with 32-bit paging, so the 64-bit setup code converts from the 32-bit address space to the 64-bit one. When getting the physical address that a 32-bit address mapped to, it was not checking the page directory present flag, so it was pulling values out of a page table that didn't actually exist, resulting in the invalid mappings.

The second bug was spurious triple faults in the kernel's slab allocator. This bug couldn't be debugged in Bochs, because for some reason it was only occurring in QEMU. I ended up moving dprintf calls through the slab code to find exactly where it was breaking. The cause of the bug was the way that the boot paging setup code was creating 64-bit page tables. It was leaving them mapped in the virtual address space, but in the kernel no areas were being created to cover them, so they were getting unmapped and the pages freed during VM initialization. This meant that the kernel's page tables were freed and ended up being reused and overwritten by the slab allocator. As soon as that happened it would page fault, and because the kernel was no longer mapped the page fault handler would not be able to execute resulting in a triple fault.

That's all fixed now, though :) My plan for the next quarter term is to finish the remaining kernel functionality, listed below:

<ul>
 <li>Architecture hooks for KDL.</li>
 <li>SMP (not a great deal of work, just need to get the boot loader to switch the secondary CPUs to 64-bit mode).</li>
 <li>Module loading, and get some modules/drivers to work with x86_64.</li>
 <li>System calls.</li>
</ul>

After this I will spend some time hunting bugs and going through my TODO list. I may also be able to get started on porting userland. I am actually quite ahead on the timeline I included in my original project proposal: I estimated that by the midterm I would have only completed work on the boot loader. So, I think it is quite feasible to have started work on userland by the end of the coding period.

Finally, I have been granted commit access! You won't see my port merged in just yet, though, as I have made quite a few changes to the x86 port which could possibly cause issues. However, I am now able to commit fixes: my first commit was to fix compilation of GCC 4 Haiku on Mac OS X 10.7 hosts.