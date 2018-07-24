+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #9"
author = "krish_iyer"
date = "2018-07-24 19:03:36+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

Hello everyone, here we are with another update on the project. Last week we have started with installing
interrupt handler, so basically we will pass the address of a function while installing the interrupt handler, 
later when an interrupt occurs that function will be called.

We opted for pin-based interrupt handler, which is one of the levels of interrupt handling. I have explained 
them in previous blogs.

### Instructions to install an interrupt handler:
    
    bus->irq = pciInfo->u.h0.interrupt_line; // driver needs to assign interrupt line to itself
    
    if (bus->irq == 0 || bus->irq == 0xff){ // checking if right interrupt value is assigned
        return B_ERROR 
    
    status = install_io_interrupt_handler(bus->irq, handler_function_name, bus, 0);
    
    if(status != B_OK) // check if interrupt handler is successfully installed
        return B_ERROR

Currently interrupt handler function can handle following interrupts(Referred: [FreeBSD code](https://github.com/freebsd/freebsd/blob/master/sys/dev/sdhci/sdhci.c#L2162))
    
        // card presence interrupt
        // command interrupt
        // bus power interrupt
    else
        // unexpected interrupt
    
So with this, we were successful in setting up the interrupt and it's working pretty well as expected. Now the 
upcoming task is to issue the command to the card and read the response which is again giving timeout error. We 
have installed a DELAY() function for giving delays but still didn't work.

We were trying to issue CMD0 which should reset the card registers and give the response at R1. There's also an 
error interrupt recovery sequence mentioned in spec version 4.20 but again to implement that we need to issue 
few commands.

Next, we will be focusing on cleaning the code and getting it reviewed. After that, we will work on getting the 
responses for the corresponding commands.

My guess! it will most likely to be clocking issue and frequency config. I will try to dig more into it :).
