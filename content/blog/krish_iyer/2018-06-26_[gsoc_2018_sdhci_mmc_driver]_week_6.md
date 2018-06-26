+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #5"
author = "krish_iyer"
date = "2018-06-26 15:04:41+05:30"
tags = ["haiku", "driver", "SDHCI", "MMC", "GSoC 2018"]
+++

Hello everyone! Here's the update of week #6, in the last update we were not able to access the registers. When we tried 
mapping it, there were all zeros. so we knew there's something wrong in  the way we were accessing the register and in between 
this we got to know that qemu emulation for sdhc hardware[1] only supports spec version 2[2] and 3 and the spec which we 
intended to implement was 4.2[3].
Later, we got to know that this[4]
	
	pcicmd &= ~(PCI_command_memory | PCI_command_int_disable);
was disabling PCI I/O decoding and ensuring that PCI_command_memory is set but it turns out that on haiku the PCI bus let the 
driver to decide whether what kind of support it need from the device. Which kinda should be automatic and restricted for a 
driver. Soon after commenting out the clearing command we got some value in the register mapping through MMUIO and that also 
confirmed that mapping of registers is working, that was a relief. My next objective was to detect the card some how by 
enabling few bits. So I thought it better and easy to use test registers without much complication. 

So I enabled **card detect signal** and **card detect test level** in *Host Control 1* and checked the bits in *Present state 
register* and *Normal interrupt status register* (acc. to spec 4.2). Also, I have checked specification version 2 and was 
similar. But this configuration didn't worked and registers didn't responded and it seems it's not that easy, so better we 
will try by enabling and polling interrupt registers. 

We also made few changes in the code[5] and made it **slot** and **BAR** dependant, so each node(child device) will be registered 
at each slot and each alot will be having a base address which will be mentioned in BAR(first_bar_index + slot). Hence, there 
will distinct register mapping for each slot. And on the later part each slot will be hooked to something like /dev/mmc/.. by 
mmc_disk driver. 

We were trying to install the interrupt handler and tried to figure out which level of interrupt is supported by the hardware

	if
		get_msix_count() or get_msi_count()
gives zero everytime and thus it means that we are left with pin-driven interrupt but there might be a possibility that we might have to enable msi in qemu. We still have to look into this.

In this I was also explored an interesting aspect which I haven't looked into, thanks to PulkoMandy to bring it up. I have 
attached link to mail archive[6] and tried to explain. Please comment below if I have missed something or any different idea 
in which it could have been explained. Recently, there was also a commit[7] regarding register definition for sepc version 4.2 
in qemu. Let's see in this week if get card detection working. 

[1]: https://github.com/qemu/qemu/blob/bec9c64ef7be8063f1192608b83877bc5c9ea217/hw/sd/sdhci.c#L72
[2]: https://www.sdcard.org/jp/developers/overview/host_controller/simple_spec/Simplified_SD_Host_Controller_Spec.pdf
[3]: https://www.sdcard.org/downloads/pls/pdf/index.php?p=PartA2_SD%20Host_Controller_Simplified_Specification_Ver4.20.jpg&f=PartA2_SD%20Host_Controller_Simplified_Specification_Ver4.20.pdf&e=EN_SSA2
[4]: https://github.com/krish-iyer/haiku/blob/5abb958dec121d202e3f71450d41acff063d5393/src/add-ons/kernel/busses/mmc/sdhci_pci.cpp#L116
[5]: https://github.com/krish-iyer/haiku/commit/5abb958dec121d202e3f71450d41acff063d5393
[6]: https://www.freelists.org/post/haiku-development/SDHCI-MMC-Driver-Trouble-in-Mapping-the-Registers,1   
[7]: https://github.com/qemu/qemu/commit/1e23b63f022ae79d7a5c535fe549127ad52d5ba6