+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #1 and #2"
author = "krish_iyer"
date = "2018-05-06 17:58:47+05:30"
tags = ["haiku", "driver", "MMC", "SDHCI", "GSoC 2018"]
+++


Hey folks! here's the updates of past two weeks on the project!

I have cloned the latest haiku source and built the image file. With the generated image file I have emulated sdhci-pci device successfully. Following are the instructions to be followed:

## Cloning the source code

	git clone https://github.com/haiku/haiku.git
	git clone https://github.com/haiku/buildtools.git

## Compiling Source Code
Create a directory where you are going to save the build image and related files
	
	mkdir generated.x86_64; cd generated.x86_64
For compiling

	../configure --build-cross-tools x86_64 ../../buildtools

## Building Image
Before building the image you need to install some dependencies
	
	sudo apt-get install git nasm autoconf automake texinfo flex bison gawk build-essential unzip wget zip less zlib1g-dev libcurl4-openssl-dev genisoimage libtool

For creating nightly anyboot Haiku iso image

	jam -q -j2 @nightly-anyboot
## Error! while building 

Now if you getting an error while building, specifically about haiku revision. Then,

	cd haiku/build/jam
	cat UserBuildConfig
Now copy hrexxxxx, and change directory to haiku/generated.x86_64/build
	
	cd haiku/generated.x86_64/build
Then create and write into the file 

	echo -n "hrevxxxxx" > haiku-revision
After the building and emulation of the device, I have started finding out the device on the PCI bus so that I can add functionalities for data transfer and many more.

## Emulation with Qemu

### Installing Qemu

	apt-get install qemu
### Boot OS in Virtual Drive
First of all create a virtual harddrive in which you are going to boot the OS
	
	qemu-img create haiku-vm.img 10G
Now boot the OS in virtual drive 

	sudo qemu-system-x86_64 -boot d -cdrom haiku/generated.x86_64/haiku-nightly-anyboot.iso -m 512 -hda haiku-vm.img

Now you can simply run the virtual drive
	
	sudo qemu-system-x86_64 haiku-vm.img

### Emulation
For emulation a sdhci-pci device

	qemu-img create sd-card.img 10G
	qemu-system-x86_64 haiku-vm.img  -drive if=sd,index=0,file=sd-card.img,id=mydrive -device sdhci-pci 
	
## Creating Device Driver
I have referred device manager doc as it mentions following things:
* The object device_node describes the functionality and also specification of the device
device_node has modules and attributes. The node must have a module and other components are optional.
* When the system starts only a root node gets registered. The root node has hardware bus like PCI.
root node( PCI bus)-> parent node(devices on PCI bus)-> child node(specific to device and attach functionalities specific to device)
* Whenever a device is attached to PCI bus, it registers a child node for each device on the bus
For exploring the hardware in the computer, the system has device drivers.
* Now according to the system commands, the system will scan for the driver that provides that functionality.

### APIs implemented so far:
* supports_device(): It actually checks if the device belongs to PCI bus and filter out for sdhci-pci device out of all the devices on the pci bus.
* init_device(): it creates a private data structure(device_cookie) for uninit_driver(), register_child_devices(), rescan_child_devices(), device_removed(), suspend() and resume().

### To make the driver module loadable:
* Module name must end with driver_v1(SDHCI_PCI_DEVICE_MODULE_NAME "busses/mmc/sdhci_pci/driver/v1")
* Declaring module dependancy array(module_dependency module_dependencies[] = { { B_DEVICE_MANAGER_MODULE_NAME, (module_info**)&gDeviceManager }, {}};)

* Declaring structure for driver module info


## Loading the module
	jam -q sdhci_pci
will create a binary in 

	generated.x86_64/objects/haiku/x86_64/release/add-ons/kernel/busses/sdhci
You have to place it in 
	
	config/non-packaged/add-ons/kernel/busses/mmc 
After rebooting you can check debug messages in
	
	cat /var/log/syslog | grep sdhci_pci
Now I am working on finding out number of slots and registering them as child devices with their base adresses.  
I have been updating the code on my remote github repo[1] almost everyday, feel free to review it :). Thanks!

* https://github.com/krish-iyer/haiku/tree/sdhci_mmc_driver

