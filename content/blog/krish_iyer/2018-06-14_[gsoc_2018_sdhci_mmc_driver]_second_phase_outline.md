+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Second Phase Outline"
author = "krish_iyer"
date = "2018-06-14 11:51:57+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

Hey, folks! So we are at the end of first phase of the project and I had expected that I would be able to implement PIO but it 
seems that I have lagged a bit. Till now we have got our controller driver setting up the mmc bus and mmc disk driver to 
publish a slot. To implement PIO before DMA, also requires register mapping which we are currently working on. We tried it 
though but didn’t turn out well. 

For second phase first and the foremost task, also on which I am currently working is to check whether the mapped registers(
MMIO)[1] or accessing the registers through read/write_io_(x) is really working. Once it’s working then we will prefer mapping 
through MMIO and we can set up the register values and follow the specification.

Setting up the DMA will again be a challenging task and also it seems that it will consume a lot of time but I am haven’t 
looked much deeper into the code[2]. 

MMC disk story will be awaited till we really have something to hook into the published slot(/dev/disk/mmc/..). Later in this, 
operations on block will be implemented like block capacity, io scheduling for read and write etc

Bus manager will come into picture when interrupts and data transfer will be setted up and only thing will be left i.e created 
an instance for particular job to be get it done and return back.

Still there are two things more to figure out, one is controller and bus(mmc) separation(currently both in sdhci_pci.cpp), 
like just into two file but a single module and another one is, figuring out the reason behind mmc disk being run multiple 
times. 

In second phase we will be mostly working on the controller and later I hope we will finish up with io scheduling in mmc disk 
and class for creating instance, in bus manager.

I will also be referring FreeBSD’s driver code. I will read and try to understand how to they have implemented register 
mapping. Also currently there are not separate functions for mapping and other operation, once we get this working we will add 
these to the controller interface structure.

Thanks to all the developers who were part of this project and helping in every way possible. I am looking forward to see this 
driver working well for Haiku :).
[1]:https://github.com/krish-iyer/haiku/blob/ed7af1a07453e98fba370eb0a0a01eb4bb3cc6a1/src/add-ons/kernel/busses/mmc/sdhci_pci.cpp#L107
[2]:https://svnweb.freebsd.org/base/head/sys/dev/sdhci/sdhci.c?revision=327924&view=markup#l719

