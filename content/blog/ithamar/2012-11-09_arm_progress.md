+++
type = "blog"
author = "ithamar"
title = "ARM progress!"
date = "2012-11-09T19:04:32.000Z"
tags = ["progress report", "kernel_arm", "port", "begeistert"]
+++

<strong>The ARM is moving</strong>

After porting the basic VM code from X86 to our ARM port, it has been pretty much 2 years since I worked on it. Last weekend, BeGeistert 026, gave me a chance to work on it again, for a couple of days (nights?) in a row, and I tried to make the most of it.

Besides working on Haiku/ARM it was great to meet up with many of the people I already knew but had not seen for a long time, as well as finally meet the new people behind the names and posts I had followed over recent times.

Anyway, with much help from the people around me I was able to bring Haiku/ARM to the point where it now boots, lights up a couple of icons, and then fails to boot as the boot disk is not found. This means that scheduling, interrupts, and basic vm operations all work!

However, in the process of getting it that far in fairly limited time I had to make a couple of shortcuts that really need to be cleaned up before trying to bring up userland, and see Tracker/Deskbar appear ;)

<strong>Hardware Variation</strong>

One of the obvious ones is the problem that currently, the kernel will only run so far on the Verdex (Gumstick) target. This is due to the fact that things like timers and interrupts are handled differently between different System-On-Chips. This means that even at this very low level, we'll need to introduce some type of abstraction to be able to run on more then just the Verdex/PXA270 SoC.

As people reading the commit list might have noticed, Francois has commited basic code to support Flattened Device Tree (FDT). This is a way of describing full hardware layout, in a standardized format. This format has been used by OpenFirmware implementations, like the PowerPC machines from Apple, the DEC Alpha machines, and many more.

FDT is becoming mandatory for Linux support on ARM as well, which means there are more and more of these board description files available for hardware we want to run on. The intent therefore is to implement FDT support, making it (theoratically) possible to support newer hardware with only a new FDT file, but also being able to build a single kernel that can run on any ARM device, assuming the necessary drivers are available ofcourse.

If I can find the time, I'll write up a post about FDT, if Francois does not beat me to it ;) In docs/develop/ports/arm/urls.txt Francois was so kind to store an extensive list of URLs about FDT, so feel free to browse if you are interested in helping out.

<strong>Where's that page?</strong>

Another thing that needs work is the ARM VM implementation. Currently, all it really does, is the page table bookkeeping, but permissions are not handled, memory/caching types are not handled, not to mention that ARMv6 and ARMv7 support will need more work as well. My idea is to finish the VM for ARMv5 first, and then implement v6 and v7 support in a proper OO manner, by making subclasses of the base ARM VM classes.

ARMv5 has no builtin support of tracking page status bits that our VM expects (dirty/accessed), so we'll have to work around that. However, ARMv7 (and some ARMv6) do have that, so there's a fair amount of work to do.

<strong>Drivers and Busses</strong>

No I'm not talking of public transport here :P For a properly usable embedded ARM target, there's a lot of things besides the kernel proper that will need implementing. There's SPI and I2C controllers to support, there's storage like raw NAND, or MMC/SD to support, many things that aren't support as of yet in Haiku for other architectures.

Some of these will present new features for our non-ARM targets too (SD/MMC support will make Laptop users happy, I imagine), but quite few will not but will be critical to get a seriously usable system on ARM devices...

<strong>Where to go from here?</strong>

As the current target is a QEMU supported platform, anyone who wants to can join in and help out. I invite anyone interested in helping out with Haiku/ARM to follow the guide for compiling for ARM and start poking at the code. I tend to have very little time in general, payed work taking up the most of my time, so don't just wait for me to complete the port!

However, feel free to contact me with questions/flames/anything if you want, as I'll try and help out as much as I can, there's nothing I want more then for this port to reach completion!