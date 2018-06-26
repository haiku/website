
+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #4"
author = "krish_iyer"
date = "2018-06-03 21:11:13+05:30"
tags = ["haiku", "software", "driver", "SDHCI", "MMC", "GSoC 2018"]
+++

Hey everyone! here I am with another update. Last time I had concluded-"PCI class is not discoverable to device manager", it was actally a bit wrong.
So korli explained that device manager won't load a driver which system
doesn't know so in order for device manager to consider sdhci bus device, it has to
be added under a condition of the devices of same type. So we added it under
"disk"[1]. With that he also committed PoC[2] which came out to be very useful but
still I took sometime to really understand it.

So next thing which we intended to do is to register a child device or a node
which is our picked up device out of all the device which were there on the PCI
bus. Now we have to attach these devices on a mmc bus and then we have to
configure interrupts and commands for data transfer(Programmed I/O method). 

So there's is something like a bus and bus manager, I really want to clearify
these two things now because in next few weeks we will be working on bus
manager and we should avoid confusion of any kind. So till now we told
device manager that if a sdhci-pci device is attached to the system then it
should load the driver from mentioned path unlike PnP devices. Now we have got
the driver loaded also we have filtered out the device. Now we have to initiate a
bus(mmc) and attach device to it. This will be the role of a bus, now we need
to set up a bus manager in order deal with storage(read, write, data transfer
etc). It will mainly deal with the commands and expose some API's for the user
to do the operations and build application on top of it.

For the bus we have init_bus(), unint_bus() and bus_removed() under a global
structure(gSDHCIPCIDeviceModule). Before explaining about init_bus() I wanted
make you notice of something, "cookie" or "bus_cookie". It is a opaque pointer, we can't see
through this pointer but we can provide our implementation. This makes the code
robust accross different platforms. In this particular case init_bus() will
attach some useful data about the device via this cookie. 

I have successfully registered the child device and also attached it to the
bus(mmc). We thought that it would be better if we could divide our module into
two for more clearity:

* device: supports_device(), init_device(), register_device(),
	register_child_device()
* bus: init_bus(), uninit_bus(), remove_bus(), other functions for interrupts
	
But it became difficult to manage modules and module_dependencies because these
are single entry point for a module(binary). You can have any number of files
and have a single binary, you just have to mention those in the Jam file. In my
case it would be like
	
	KernelAddon sdhci :
		sdhci_pci.cpp
		sdhci_device.cpp
	;
Then you just have to do 
	
	jam -q sdhci

Also, this will update your binary with kernel 
	
	jam update-image kernel sdhci 

if you have added this
	
	AddFilesToPackage add-ons kernel busses mmc : sdhci ;

in build/jam/packages/Haiku

I have been trying to split the module into two but I think setting up
interrupts is more important and splitting can be done in parallel. 

Thanks to korli, PulkoMandy, phoudoin for helping me. I will be soon be ready
with a plan for bus manager after setting up the interrupts and registers etc.	

1. https://github.com/krish-iyer/haiku/blob/sdhci_mmc_driver/src/system/kernel/device_manager/device_manager.cpp#L1917
2. https://review.haiku-os.org/#/c/haiku/+/276/