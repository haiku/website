+++
type = "blog"
title = "[gsoc_2018_sdhci_mmc_driver]_week_5"
author = "krish_iyer"
date = "2018-06-11 18:34:48+05:30"
tags = ["haiku", "driver", "SDHCI", "MMC", "GSoC 2018"]
+++

Hey, here I am with another update! Last time I mentioned about splitting up the module but due to time constraint we agreed to skip that currently and move 
forward. After setting up the bus, I thought it would be bus manager which needs to be setted up for data transfer and other read and write operations but it turns 
out to few things which need to be done before that and it's actually not the bus manager who do these operations, it will just create an instance of the 
interrupts and the operations to be done, and call back after it's done. I was referring to virtio subsystem's driver layout so wasn’t able to notice a difference 
between virtio and sdhc and i.e there are slots that needs to be attached to the bus(MMC bus) unlike in virtio where devices are attached.

So there are some slots which belongs to mmc bus and needs to published. So whenever a card is detected it will hook to one of those published slot. Bus manager 
will map physical address into virtual memory. Now there are two ways to do this one is MMU(memory management unit), this maps virtual memory addresses to physical 
addresses and another is IOMMU(input/output memory management unit), which maps device visible addresses rather than CPU visible addresses. The way we implement 
IOMMU is as follows:

	uint32 offset = fPCIInfo->u.h0.base_registers[0] & (B_PAGE_SIZE - 1);
	phys_addr_t physicalAddress = fPCIInfo->u.h0.base_registers[0] - offset;
	size_t mapSize = (fPCIInfo->u.h0.base_register_sizes[0] + offset
		B_PAGE_SIZE - 1) & ~(B_PAGE_SIZE - 1);

	fRegisterArea = map_physical_memory("SDHC memory mapped registers",
		physicalAddress, mapSize, B_ANY_KERNEL_BLOCK_ADDRESS,
		B_KERNEL_READ_AREA | B_KERNEL_WRITE_AREA,
		(void **)&fCapabilityRegisters);
So for publishing the slots we need a mmc disk driver[1], which will get the child device node which was registered by register_child_devices() in sdhci_pci.cpp, 
it is mmc bus in this case. As each slot is a mmc bus device, it will publish the slots in /dev/disk/mmc/…
The hierarchy will be something like:
	
	PCI bus
		PCI device
			SDHCI PCI controller
				SDHC slot 0 MMC bus
				SDHC slot 1 MMC bus
				....(max 6 slots)

create_id() will generate an unique id for publishing each slot. The mmc_disk_register_child_devices() will create the id, currently its working and you just need 
update the kernel with driver and you can see the slot in /dev/disk. You can see a registered slot in /dev/disk/mmc/

The issue I am facing currently with the mmc disk driver is, it's getting loaded twice and there's only one instance of the driver also the parent node value is 
also same even though I have registered only one child device(SDHC driver module).

This week while figuring out I also notice something like , "B_PRI(x)" which are used in printing some values in like TRACE() or sprintf(). It is used to handle 
the values across different architechtures like %d and %ld will be different for 32-bit and 64-bit.

Next, I will try to create a device module which will do MMC io, read, write etc on MMC media. Thanks to korli, DeadYak, PulkoMandy, phoudoin. 
[1]: https://github.com/krish-iyer/haiku/blob/3b142c3fdb0757065875e37ebdf6435898fbe15f/src/add-ons/kernel/drivers/disk/mmc/mmc_disk.cpp

 
  