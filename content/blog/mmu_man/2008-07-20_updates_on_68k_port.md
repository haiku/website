+++
type = "blog"
author = "mmu_man"
title = "Updates on 68k port"
date = "2008-07-21T02:17:15.000Z"
tags = ["port", "progress report", "m68k"]
+++

I've been getting further recently on the 68k port, as you may know already everything now compiles but the kernel is still largely stubbed, misses drivers, and the bootloader doesn't load it yet.
I've almost finished mmu setup, at least for the 040 ARAnyM emulates. 
<!--break-->

<h3>translucent translation</h3>

I actually spent some time trying to fix a bug which ended up being inside <a href="http://aranym.org/">ARAnyM</a>. 68030 and later mmu systems, except the 68851 that goes with 020, share a feature called transparent translation. Basically, 2 registers called TT0 and TT1 (on 040 they are split for data and instruction spaces), which each define a window of 16MB granularity in the virtual space which bypass the mmu translation. For simplicity in the bootloader I used those to map the first 32MB (which includes the slow ram, rom and beginning of fast ram) 1:1 into the virtual space, so that physical page addresses in the translation tree can be taken as virtual for lookups. 

On x86 the tree is first set up to identity map the first 8MB to do this, and other tricks are further done like a page hole that makes the x86 mmu maps all page tables linearly in a window in the virtual space. As 68k doesn't allow this (because the descriptor type depends on its content, unlike x86 which handles it differently depending on the level, but that allows other funky stuff like indirect descriptors), and to simplify stuff, I then tried to use TT0 for this. I also set up TT1 to map the last 16M of physical addresses, which contain the falcon board <a href="ftp://ftp.lip6.fr/pub/atari/Docs/hardware.txt">IO registers</a>, which are layed out there because of compatibility with the ST model which had a 68000 with 24 bit addresses, and where people used 16bit sign-extended references... 

But then after enabling translation, with an empty tree but TTx set, it double faulted in the emulator on the bootloader code. After adding and removing tracing code and several reboots, I noticed the registers were set correctly but not acted upon. Some more tracing, this time in ARAnyM, showed up it checked matches on them like:
<pre>
match_ttr(uint32 addr, int super) {
    int res;
    res = do_match_ttr(0, addr, super);
    if (res != TTR_NO_MATCH)
        res = do_match_ttr(1, addr, super);
    return res;
}
</pre>
So it was checking the second register <b>not</b> when the first one didn't match :)
Likely Linux-m68k doesn't use it to be able to support 68020, so noone found it yet.
But now that's <a href="http://cvs.aranym.org/cgi-bin/viewvc.cgi/aranym/src/uae_cpu/cpummu.cpp?r1=1.38&r2=1.39">fixed</a> in the aranym cvs as I found a committer on IRC.

<h3>elf segments</h3>
Then I went back to the point where it stopped before I had the mmu code working: it didn't find both the text and data segment for the kernel.
Oddly, unlike every other m68k binary produced (including linkhack.so, but excluding kernel.so), kernel_m68k only had a single program segment defined in the header.

<pre>$ readelf -l generated/objects/haiku/m68k/release/system/kernel/kernel_m68k | head -13

Elf file type is EXEC (Executable file)
Entry point 0x80034c1e
There are 4 program headers, starting at offset 52

Program Headers:
  Type           Offset   VirtAddr   PhysAddr   FileSiz MemSiz  Flg Align
  PHDR           0x000034 0x80000034 0x80000034 0x000a0 0x000a0 R E 0x4
  INTERP         0x0000d4 0x800000d4 0x800000d4 0x00009 0x00009 R   0x1
      [Requesting program interpreter: /foo/bar]
  LOAD           0x000000 0x80000000 0x80000000 0xcb2f8 0xd763b RWE 0x2000
  DYNAMIC        0x0cb258 0x800cb258 0x800cb258 0x000a0 0x000a0 RW  0x4
...</pre>

Where as usual executables, including all x86 and ppc ones have a separate text and data segment, each mapped to a different program header:

<pre>$ readelf -l generated/objects/haiku/m68k/release/add-ons/kernel/drivers/common/null | head -13

Elf file type is DYN (Shared object file)
Entry point 0x4c4
There are 3 program headers, starting at offset 52

Program Headers:
  Type           Offset   VirtAddr   PhysAddr   FileSiz MemSiz  Flg Align
  LOAD           0x000000 0x00000000 0x00000000 0x00658 0x00658 R E 0x2000
  LOAD           0x000658 0x00002658 0x00002658 0x00134 0x00150 RW  0x2000
  DYNAMIC        0x000668 0x00002668 0x00002668 0x000a8 0x000a8 RW  0x4</pre>

It seems ld doesn't like the kernel linker script much, even though it's ripped off the x86 version. Maybe it's an m68k bug in binutils, or maybe I forgot to set something in the configuration, but it's quite strange this only happens when linking the kernel. The workaround was to explicitely declare program headers in <a href="https://dev.haiku-os.org/browser/haiku/trunk/src/system/ldscripts/m68k/kernel.ld">kernel.ld</a>, and map text and data segment to them.

Now the elf code is happily finding both and tries to load them.

<h3>crashing?</h3>
So now someone must find why it crashes reading the kernel in:
<pre>load kernel...
elf_load_image(fd = 2, image = 0x0009ffe4)
segment 1: start = 0x80000000, size = 815104, delta = 80000000
segment 2: start = 0x800c7000, size = 77824, delta = 7ff39000
load segment 1 (811630 bytes)...
to 0x80000000
Panic: bus error. misc = 0x0505, address = 0x98800841
sr = 0x2008, pc = 0x00085b60
Aregs: 98800841 000006f0 98800841 0009ffc4  0007fea0 0000026e 0007fdd4 0007fd98
Dregs: 00000803 ffffb90f 00000000 00000800  00000000 000046f0 00000000 000c6000</pre>

An hour later, I can tell you that #defining SCRATCH_SIZE to 2*4096 and declaring uint8 gScratchBuffer[4096] in <a href="https://dev.haiku-os.org/browser/haiku/trunk/src/system/boot/platform/atari_m68k/devices.cpp">devices.cpp</a> likely didn't help...

<pre>load segment 1 (811630 bytes)...
load segment 2 (25388 bytes)...
loaded 4910 debug symbols
relocating kernel failed: ffffffff!</pre>
Seems better now. The 4910 figure is even consistent with what readelf -s says.

Now let's uncomment some more #define TRACE_FOO...

And guess what, I was too quick at hacking kernel.ld, the dynamic program header didn't receive the .dynamic section as it should.
Let's see what it gives now.
...patience...
...patience...
Ok, now the dynamic section is there, but it still fails, the dynamic section should contain 15 entries, but it finds a DT_NULL on the first one.
