

+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #3"
author = "krish_iyer"
date = "2018-05-28 20:35:18+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Driver"]
+++
Sorry folks! for the delay in the updates. I was pretty much occupied by end term exams. After initial setup, we divided the our initial plan in following steps.

* Discover PCI bus
* Filter out SDHC device from the connected devices on the bus.
* Register the device as the child node.

As I was able to load the driver, it exited in between somewhere from the supports_device(). So I broke the conditions where it checks for the bus, device ID and vendor ID, in order to see where exactly it was not satisfying the condition. I also printed bus value, we got to know that the driver was not able to access PCI bus and it's hidden by default. To enable it we need to mention the bus manager(*"mmc":location://src/add-ons/kernel/busses/mmc*) path in the device manager(*location://src/system/kernel/device_manager/device_manager.cpp*) where few more busses's paths were hardcoded.

In between this we also did a little hack kinda thing. We knew that virtio can access PCI bus so we changed the driver module name(busses/virtio/sdhci_pci/driver_v1) and manually placed in ~/config/non-packaged/add-ons/kernel/busses/virtio. After which the supports_device() got access to PCI bus. 

I resumed the work on adding bus manager(mmc) path in device manager(). After making changes to kernel we need to update the image with the new kernel.

From the host:

    cd haiku/generated.x86_64
    jam -q update -image kernel
you can also do that in the haiku guest:

    cd haiku/generated.x86_64
    jam haiku.hpkg
    pkgman install haiku.hpkg

this will update the kernel but certainly, my system went out of cache memory and got stuck. So I updated from the host and it worked pretty well, you can confirm it by last created or updated date..

    ls -l /boot/system/kernel_x86_64

After updating the kernel we expected our bus manager to now be able to detect the PCI bus but it still didn't happen. So I tried print debug messages from device manager checking for each condition in _GetNextDriverPath(), later I figure out it's not accepting the condition for PCI_base_peripheral 0x08(defined in PCI.h) class. 

So, for now, I can interpret that the PCI class is not discoverable to device manager too.

In between the printing debug messages from supports_device(), I crashed the OS due to printing some invalid values(*like: gDeviceManager->get_attr_uint16(parent, B_DEVICE_ID, &deviceID, true)*). It will directly boot to kdebug log, I knew that I placed the binary in ~/config/../add-ons so I had to disable loading of drivers from that part.

For recovery, I followed the following steps:

* In order to boot into the boot menu, press and hold space bar or shift(space bar worked for me), you should be really fast in this. I took more than 40 mins to really get used to it. 
* Then go to safe mode and disable add-ons.
* Come back to the main menu and click on "continue booting".

At last thanks to Driver1, korli, phoudoin, Pulko Mandy, Alex, axeld for helping me figuring out all of these problems :).
