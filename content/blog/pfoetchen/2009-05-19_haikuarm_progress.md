+++
type = "blog"
author = "pfoetchen"
title = "Haiku-ARM progress"
date = "2009-05-19T16:18:30.000Z"
tags = ["arm", "u-boot"]
+++

I got the kernel to boot "a bit" ;) but since u-boot does not pass the kernel arguments when loading with loadelf I had to fake some kernel arguments etc..
So it's not realy a working system but serial out works ;) (input does not work yet :( ) and I can see some stuff on my screen..
The kernel runs on a emulated gumstix verdex since there is no emulator for the gumsitx overo we will use and the beagleboard emulator did not really work (no sd card support for example) 

<pre>
[pfoetchen@styleoverfunction verdextest]$ qemu-system-arm -M verdex -m 512 -nographic  -pflash flash.img -sd mmc.img  -p 1234 -d in_asm
pxa2xx_clkpwr_write: CPU frequency change attempt


U-Boot 1.2.0 (May 10 2008 - 21:17:19) - PXA270@400 MHz - 1604

*** Welcome to Gumstix ***

DRAM:  256 MB
pflash_write: Unimplemented flash cmd sequence (offset 00000000, wcycle 0x0 cmd 0x0 value 0x90)
Flash: 32 MB
Using default environment

pflash_write: Unimplemented flash cmd sequence (offset 00000000, wcycle 0x0 cmd 0x0 value 0x90)
pflash_write: Unimplemented flash cmd sequence (offset 00000000, wcycle 0x0 cmd 0x0 value 0x90)
Hit any key to stop autoboot:  0 
GUM> mmcinit
Detected: 2097152 blocks of 512 bytes (1024MB) SD card.
Vendor: Man aa OEM XY "QEMU!" Date 02/2006
Product: 3735928559
Revision: 0.1
GUM>  fatload mmc 0:1 0xa2000000 kernel_arm
reading kernel_arm

1641609 bytes read
GUM> bootelf
Loading .interp @ 0xa2500000 (9 bytes)
Loading .hash @ 0xa250000c (22512 bytes)
Loading .dynsym @ 0xa25057fc (57168 bytes)
Loading .dynstr @ 0xa251374c (116718 bytes)
Loading .rel.got @ 0xa252ff3c (152 bytes)
Loading .text @ 0xa252ffe0 (725160 bytes)
Loading .rodata @ 0xa25e1088 (162176 bytes)
Loading .data @ 0xa2608a08 (24504 bytes)
Loading _haiku_revision @ 0xa260e9c0 (4 bytes)
Loading .gcc_except_table @ 0xa260e9c4 (124 bytes)
Loading .ctors @ 0xa260ea40 (120 bytes)
Loading .dtors @ 0xa260eab8 (116 bytes)
Loading .got @ 0xa260eb2c (88 bytes)
Loading .dynamic @ 0xa260eb84 (128 bytes)
Clearing .bss @ 0xa260ec40 (47812 bytes)
## Starting application at 0xa2541d5c ...
Welcome to kernel debugger output!
Haiku revision: 0
INIT: init CPU
INIT: init interrupts
INIT: init VM
PANIC: vm_init: go buy some RAM please.
Welcome to Kernel Debugging Land...
Thread 0 "" running on CPU -0
kdebug>
</pre>