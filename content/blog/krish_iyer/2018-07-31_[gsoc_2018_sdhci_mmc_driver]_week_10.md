+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #10"
author = "krish_iyer"
date = "2018-07-31 23:58:43+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

Hello everyone, this week we have tried to get the response from the command but unfortunately, it didn't work out. In the
meantime, I have submitted the code for review and PulkoMandy had already reviewed once. I have been going through Linux 
patches[1](https://patchwork.ozlabs.org/patch/279434/) [2](https://patchwork.kernel.org/patch/3181031/) which are related to 
the issue we are currently facing. 

I have done following improvements in the code
    
*    Disabled adding drivers to the kernel, removed statements from
    
        build/jam/images/definitions/minimum
        build/jam/packages/Haiku
* Removed whitespaces
* Maintained less than 80 characters in each line
* Disabled the code which was not required by #if 0 but can be used in future
* Added few error logs

We have also noticed an alteration in the 16-bit registers while binding it together with a 32-bit register(Interrupt status/
signal regs). We also did a bit of wrong padding while mapping the register set, hence interrupt handler is also working fine. 
Also, being confident that the register set has been altered, therefore we are receiving the following errors.
        
    command timeout error
    command completer error interrupt 
    
There hasn't been much progress in this week, apologies for the lag in the development of the project. Feel free to review the 
[code](https://review.haiku-os.org/#/c/haiku/+/318/). People are welcomed to compile and run the code and report any issue or 
can always ask for directions for running the driver in the system. Though driver will not be able to provide any user 
functionalities still it is always good to know the stability of code through different systems.