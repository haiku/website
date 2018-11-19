+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #7"
author = "krish_iyer"
date = "2018-07-03 18:27:58+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

Finally, we got the register mapping work and they are responsive, we have tested by enabling software reset bit and it has 
all the default values of registers which are set by Qemu except the present state register and capabilities register. These 
both should be left unaffected as mentioned in the [spec](https://www.sdcard.org/downloads/pls/pdf/index.php?p=PartA2_SD_Host_Controller_Simplified_Specification_Ver1.00.jpg&f=PartA2_SD_Host_Controller_Simplified_Specification_Ver1.00.pdf&e=EN_A2100). 
We are following SD Host specification version 1.00 for now, which also doesn't support UHS but Qemu seems to be supporting it 
well.

The register set of the SD controller has registers of sizes 8/16/32 bits and that also complicates the accessing of register 
with offsets(for eg: *(regs(*base address*) + offset)). Register mapping seemed to be changing with the data type of pointer 
which points to the register set([regs](https://github.com/krish-iyer/haiku/blob/9e22b58f38e801ddec397c0e643863a46d0d2397/src/add-ons/kernel/busses/mmc/sdhci_pci.cpp#L167)). So we thought of declaring a structure as follows

    struct somename
    {
        int data_memeber_1
        ------
        ------
        ------
    }__attribute__((packed))
Now there are two things to be addressed when you are dealing with declaring a structure, one is data alignment and another is 
data structure padding. Data alignment is way your data members are aligned in the memory according to the size of the data 
type for corresponding data member. To access the data efficiently it may be required to insert some zero bytes([example](https://sites.google.com/site/eganya/Home/links/gcc---packed-structures)), this is called data structure padding. To disable 
or in cases when zero bytes creates trouble, here it is the offset(we can't afford to give any extra bytes between offsets), 
we use 
    
    __attribute__((packed))
 Hence we got all the register values mapped to their corresponding register data members. It confirmed the card presence too. 
 After this, we have implemented few functions which are as follows
     
    static void sdhci_register_dump(uint8_t slot, struct registers* _regs)    
    static void sdhci_reset(volatile uint32_t* present_state, volatile uint16_t* clock_control, volatile uint8_t* power_control, volatile uint8_t* software_reset)
    static void sdhci_set_clock(volatile uint32_t* capabilities, volatile uint16_t* clock_control)
    static void sdhci_set_power(volatile uint32_t* capabilities, volatile uint32_t* present_state, volatile uint8_t* power_control)
    static void sdhci_stop_clock(volatile uint16_t* clock_control)
We feel that for now things can proceed without interrupt handling. Actually there are three levels of interrupt  available on 
x86.
1. Pin-based out of band signaling. This uses an extra pin to sending the interrupt
2. MSI(Message signaled interrupt), these are in band signaling which sends some special messages to send interrupts.
3. MSI-X is some advance form of MSI supporting large number of interrupts

So there's a lot on the later part for us to figure out on interrupt handling because not on all cases driver can watch at a 
particular register and inform the driver, this won't allow OS to boot(already there's a delay due to loops in the driver. So 
this job or receiving the interrupts and informing the driver about should be done by the CPU, hence we should install 
interrupt handler. 

For example in the very first sequence flow chart in the spec is about SD card detection, so suppose a card is being inserted 
and OS has been booted. So while driver must have been loaded and have detected the SD card(present state register). Now, SD 
card is removed but still, the driver won't know about it even if register value gets changed. If you think that we should 
constantly check that bit with a while loop in the driver then it won't let the OS boot until it comes out of the loop and 
loads the driver module. 

Hence, this job can only be done with the help of interrupt handler. I have pushed the code to [gerrit](https://review.haiku-os.org/#/c/haiku/+/276/), feel free to review it and comment down if you have any ideas. Special thanks 
to  @PulkoMandy for helping me with the register mapping and coming out with the idea of structure packing :).
