+++
type = "blog"
author = "mmu_man"
title = "getting to the kernel, 68k way"
date = "2008-07-22T00:50:37.000Z"
tags = ["port", "progress report", "m68k"]
+++

Someday I should write about the start of the 68k port, there is plenty to talk about...
Today^Wnight^Wmornin erh, hmm well, now, I'll try to do a live report on the issue I left you with last time: getting the kernel to load correctly.
<!--break-->

I was at the point where it reads the 2 program segments into memory and start with digging symbols and relocation entries.
I actually spent some time adding an hex dumper to <a href="https://dev.haiku-os.org/browser/haiku/trunk/src/system/boot/loader/elf.cpp">elf.cpp </a> to see if the loaded segments were correctly read, by diffing the debug output and the hexdump of the original binary.
Well it seems I messed up the kernel linker script once again.

Here is the current kernel_m68k as per readelf -l:
<pre>Program Headers:
  Type           Offset   VirtAddr   PhysAddr   FileSiz MemSiz  Flg Align
  PHDR           0x000034 0x80000034 0x80000034 0x00080 0x00080 R   0x4
  LOAD           0x000000 0x80000000 0x80000000 0xc62f2 0xc62f2 R E 0x2000
  LOAD           0x0c7000 0x800c7000 0x800c7000 0x0628c 0x1267b RW  0x2000
  DYNAMIC        0x0cd28c 0x800cd28c 0x800cd28c 0x000a0 0x000a0 RW  0x4</pre>
And the bootloader debug output:
<pre>
elf_load_image(fd = 2, image = 0x000a0fe8)
segment 1: start = 0x80000000, size = 815104, delta = 80000000
segment 2: start = 0x800c7000, size = 77824, delta = 7ff39000
load segment 1 (811762 bytes)...
load segment 2 (25228 bytes)...
</pre>
Then the dynamic section is searched for entries... at 0x800cd28c which is right after the end of the part read from file (the mem size is larger because it also comprises the BSS section that is initialized to 0).
Let's compare to an x86 kernel:
<pre>  LOAD           0x000000 0x80000000 0x80000000 0xd4d69 0xd4d69 R E 0x1000
  LOAD           0x0d5000 0x800d5000 0x800d5000 0x06480 0x1f6ad RW  0x1000
  DYNAMIC        0x0db400 0x800db400 0x800db400 0x00080 0x00080 RW  0x4</pre>
The second (data) program segment overlaps the dynamic segment here (0xd5000+0x06480 = 0xdb480 = 0xdb400+0x80).
Now I know why the .dynamic section had both :dynamic and :data segment qualifiers in linker script examples I read, it's supposed to be both declared as a separate program header and part of the data segment!
Let's fix <a href="https://dev.haiku-os.org/changeset/26558">kernel.ld</a> again:
<pre>  LOAD           0x000000 0x80000000 0x80000000 0xc62f2 0xc62f2 R E 0x2000
  LOAD           0x0c7000 0x800c7000 0x800c7000 0x0632c 0x1267b RW  0x2000
  DYNAMIC        0x0cd28c 0x800cd28c 0x800cd28c 0x000a0 0x000a0 RW  0x4</pre>
Let's ask bash just in case:
<pre>$ printf '%x %x\n' $((0xc7000+0x0632c)) $((0xcd28c+0x000a0))
cd32c cd32c</pre>

Great, it should work now, let's try!

<pre>
load kernel...
elf_load_image(fd = 2, image = 0x000a0fe8)
segment 1: start = 0x80000000, size = 815104, delta = 80000000
segment 2: start = 0x800c7000, size = 77824, delta = 7ff39000
load segment 1 (811762 bytes)...
load segment 2 (25388 bytes)...
loaded 4910 debug symbols
elf_parse_dynamic_section: dyn 0x800cd28c
elf_parse_dynamic_section: d[0].d_tag 1
elf_parse_dynamic_section: d[0].d_tag 1
elf_parse_dynamic_section: d[1].d_tag 4
elf_parse_dynamic_section: d[2].d_tag 5
elf_parse_dynamic_section: d[3].d_tag 6
elf_parse_dynamic_section: d[4].d_tag 10
elf_parse_dynamic_section: d[5].d_tag 11
elf_parse_dynamic_section: d[6].d_tag 21
elf_parse_dynamic_section: d[7].d_tag 3
elf_parse_dynamic_section: d[8].d_tag 2
elf_parse_dynamic_section: d[9].d_tag 20
elf_parse_dynamic_section: d[10].d_tag 23
elf_parse_dynamic_section: d[11].d_tag 7
elf_parse_dynamic_section: d[12].d_tag 8
elf_parse_dynamic_section: d[13].d_tag 9
total 72 plt-relocs
          (here some undisplayable chars... someone played nasty with debug output)
total 15 rela relocs
elf_load_image(directory = 0x01008be0, "ahci")
elf_load_image(fd = 3, image = 0x8013a000)
segment 0: start = 0x00000000, size = 36864, delta = 0
segment 1: start = 0x0000a000, size = 4096, delta = ffff6000
load segment 0 (32812 bytes)...
load segment 1 (2344 bytes)...
loaded 179 debug symbols
elf_load_image(directory = 0x01008be0, "bfs")
elf_load_image(fd = 3, image = 0x8013ba03)
segment 0: start = 0x00000000, size = 167936, delta = 0
segment 1: start = 0x0002a000, size = 4096, delta = fffd6000
load segment 0 (164720 bytes)...
load segment 1 (2972 bytes)...
loaded 720 debug symbols
elf_load_image(directory = 0x01008be0, "block_io")
elf_load_image(fd = 3, image = 0x8013baa9)
segment 0: start = 0x00000000, size = 12288, delta = 0
segment 1: start = 0x00004000, size = 4096, delta = ffffc000
load segment 0 (9088 bytes)...
load segment 1 (560 bytes)...
loaded 105 debug symbols
elf_load_image(directory = 0x01008be0, "config_manager")
elf_load_image(fd = 3, image = 0x8013c6aa)
segment 0: start = 0x00000000, size = 4096, delta = 0
segment 1: start = 0x00002000, size = 4096, delta = ffffe000
load segment 0 (3112 bytes)...
load segment 1 (400 bytes)...
loaded 72 debug symbols
elf_load_image(directory = 0x01008be0, "ehci")
elf_load_image(fd = 3, image = 0x8013cf82)
segment 0: start = 0x00000000, size = 65536, delta = 0
segment 1: start = 0x00011000, size = 8192, delta = fffef000
load segment 0 (65052 bytes)...
load segment 1 (856 bytes)...
loaded 342 debug symbols
elf_load_image(directory = 0x01008be0, "generic_ide_pci")
elf_load_image(fd = 3, image = 0x8019b67b)
segment 0: start = 0x00000000, size = 4096, delta = 0
segment 1: start = 0x00002000, size = 4096, delta = ffffe000
load segment 0 (3040 bytes)...
load segment 1 (464 bytes)...
loaded 77 debug symbols
elf_load_image(directory = 0x01008be0, "ide")
elf_load_image(fd = 3, image = 0x8019bf2a)
segment 0: start = 0x00000000, size = 32768, delta = 0
segment 1: start = 0x00009000, size = 4096, delta = ffff7000
load segment 0 (29320 bytes)...
load segment 1 (976 bytes)...
loaded 200 debug symbols
elf_load_image(directory = 0x01008be0, "ide_adapter")
elf_load_image(fd = 3, image = 0x801aa64c)
segment 0: start = 0x00000000, size = 8192, delta = 0
segment 1: start = 0x00003000, size = 8192, delta = ffffd000
load segment 0 (7820 bytes)...
load segment 1 (580 bytes)...
loaded 94 debug symbols
elf_load_image(directory = 0x01008be0, "intel")
elf_load_image(fd = 3, image = 0x801ab1e5)
segment 0: start = 0x00000000, size = 45056, delta = 0
segment 1: start = 0x0000c000, size = 4096, delta = ffff4000
load segment 0 (41680 bytes)...
load segment 1 (1364 bytes)...
loaded 259 debug symbols
elf_load_image(directory = 0x01008be0, "it8211")
elf_load_image(fd = 3, image = 0x801c0d85)
segment 0: start = 0x00000000, size = 4096, delta = 0
segment 1: start = 0x00002000, size = 4096, delta = ffffe000
load segment 0 (2876 bytes)...
load segment 1 (456 bytes)...
loaded 76 debug symbols
elf_load_image(directory = 0x01008be0, "legacy_sata")
elf_load_image(fd = 3, image = 0x801c165f)
segment 0: start = 0x00000000, size = 8192, delta = 0
segment 1: start = 0x00003000, size = 4096, delta = ffffd000
load segment 0 (4612 bytes)...
load segment 1 (512 bytes)...
loaded 81 debug symbols
elf_load_image(directory = 0x01008be0, "locked_pool")
elf_load_image(fd = 3, image = 0x801c1f57)
segment 0: start = 0x00000000, size = 8192, delta = 0
segment 1: start = 0x00003000, size = 4096, delta = ffffd000
load segment 0 (4464 bytes)...
load segment 1 (396 bytes)...
loaded 82 debug symbols
elf_load_image(directory = 0x01008be0, "ohci")
elf_load_image(fd = 3, image = 0x801c2843)
segment 0: start = 0x00000000, size = 69632, delta = 0
segment 1: start = 0x00012000, size = 4096, delta = fffee000
load segment 0 (66160 bytes)...
load segment 1 (908 bytes)...
loaded 345 debug symbols
elf_load_image(directory = 0x01008be0, "pci")
elf_load_image(fd = 3, image = 0x801e4802)
segment 0: start = 0x00000000, size = 516096, delta = 0
segment 1: start = 0x0007f000, size = 237568, delta = fff81000
load segment 0 (516012 bytes)...
load segment 1 (232436 bytes)...
loaded 182 debug symbols
elf_load_image(directory = 0x01008be0, "scsi")
elf_load_image(fd = 3, image = 0x8029fc3c)
segment 0: start = 0x00000000, size = 28672, delta = 0
segment 1: start = 0x00008000, size = 4096, delta = ffff8000
load segment 0 (26140 bytes)...
load segment 1 (1216 bytes)...
loaded 206 debug symbols
elf_load_image(directory = 0x01008be0, "scsi_cd")
elf_load_image(fd = 3, image = 0x802a155f)
segment 0: start = 0x00000000, size = 8192, delta = 0
segment 1: start = 0x00003000, size = 4096, delta = ffffd000
load segment 0 (6448 bytes)...
load segment 1 (436 bytes)...
loaded 81 debug symbols
elf_load_image(directory = 0x01008be0, "scsi_disk")
elf_load_image(fd = 3, image = 0x802af54c)
segment 0: start = 0x00000000, size = 8192, delta = 0
segment 1: start = 0x00003000, size = 4096, delta = ffffd000
load segment 0 (4244 bytes)...
load segment 1 (440 bytes)...
loaded 76 debug symbols
elf_load_image(directory = 0x01008be0, "scsi_periph")
elf_load_image(fd = 3, image = 0x802aff39)
segment 0: start = 0x00000000, size = 16384, delta = 0
segment 1: start = 0x00005000, size = 8192, delta = ffffb000
load segment 0 (16320 bytes)...
load segment 1 (648 bytes)...
loaded 115 debug symbols
elf_load_image(directory = 0x01008be0, "silicon_image_3112")
elf_load_image(fd = 3, image = 0x802b0c75)
segment 0: start = 0x00000000, size = 12288, delta = 0
segment 1: start = 0x00004000, size = 4096, delta = ffffc000
load segment 0 (8648 bytes)...
load segment 1 (760 bytes)...
loaded 95 debug symbols
elf_load_image(directory = 0x01008be0, "uhci")
elf_load_image(fd = 3, image = 0x802b173b)
segment 0: start = 0x00000000, size = 69632, delta = 0
segment 1: start = 0x00012000, size = 4096, delta = fffee000
load segment 0 (68428 bytes)...
load segment 1 (832 bytes)...
loaded 357 debug symbols
elf_load_image(directory = 0x01008be0, "usb")
elf_load_image(fd = 3, image = 0x802b2e32)
segment 0: start = 0x00000000, size = 57344, delta = 0
segment 1: start = 0x0000f000, size = 4096, delta = ffff1000
load segment 0 (53680 bytes)...
load segment 1 (596 bytes)...
loaded 319 debug symbols
elf_load_image(directory = 0x01008be0, "usb_disk")
elf_load_image(fd = 3, image = 0x802ec2ef)
segment 0: start = 0x00000000, size = 12288, delta = 0
segment 1: start = 0x00004000, size = 4096, delta = ffffc000
load segment 0 (11448 bytes)...
load segment 1 (584 bytes)...
loaded 112 debug symbols
elf_load_image(directory = 0x0100a018, "file_systems/bfs")
kernel entry at 80034ffe</pre>

The last line is spit right before calling the kernel, and it just gets stuck there. But at least we loaded the kernel and all the modules \o/

<h3>Update</h3>

It seems I forgot to use -fno-pic for building arch_elf.cpp, which was the cause of the undisplayable characters in debug output, now the dprintfs get the correct pointers :)