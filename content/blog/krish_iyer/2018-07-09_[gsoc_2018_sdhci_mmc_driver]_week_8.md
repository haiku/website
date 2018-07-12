
+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #8"
author = "krish_iyer"
date = "2018-07-09 20:09:54+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

Hey guys! Last week we have improved the code and made it more readable. We have completed the reset and clock sequence and 
proceed with power sequence. In the 4th step of the sequence, it asks to get the Operation Conditions Register(OCR) value of SD card. In the SD host controller spec, in command register there is command index bits which mention about setting up command number specified in bits 45-40 of the command-format in [SD Memory Card Physical
Layer Specification](https://www.sdcard.org/downloads/pls/pdf/index.php?p=Part1_Physical_Layer_Simplified_Specification_Ver1.10.jpg&f=Part1_Physical_Layer_Simplified_Specification_Ver1.10.pdf&e=EN_P1110). Hence, in command format they mentioned about 
command index, there we figured out that our command of interest is CMD58 which has following config

1. SPI mode
2. Response register->R3
3. Abbrevation->READ_OCR 
4. Description->Reads the OCR register of a card.

From the details, I have set the command index bits to 58, response type to 10 and rest all bits are set to 0 after the RESET_ALL command. After setting up the command register, we read the R3 register i.e response registers and it was showing no response(0). For the more specific step of setting up command bits, there's a flow chart on the page: 97 figure: 39 but still I was not sure about the SPI mode operation and for that, we enabled 4-bit mode in host control register and still it didn't work.

Keeping that aside, as suggested by @phoudoin I tried setting up the bus manager and creating the SDHCIBusController object to
perform the sequences. For setting up the bus manager I have referred virtio bus manager and created a mmc_module.cpp for
creating a module, I have described a bit about the module in my previous blogs. Like any other module I need minimum 
functions, in this case, it was

	mmc_bus_init() // creates an object of the class(MMCBus) and binds with a pointer *_device
	mmc_bus_uninit() // delete the object created by init() 
This module also has a device like any other module which has the function

	mmc_bus_added_device() // confirms the device and register the node
You might have notices which creating the object with have used the operator new[], it actually returns a null pointer instead 
of a throwing an exception.

For defining the class we have created a file mmc_bus.cpp which currently only have few data members and member functions, 
it's pretty much functioning. Now I need to bind the sequence functions like set_clock(0, reset() to the class. We have
defined a pointer of structure sdhci_mmc_bus_interface which is defined in sdhci_pci.h, which will do the trick and can access 
the function pointers. For now, it's like bus_manager if not attached to the main driver code. That leaves with our OCR issue 
incomplete. I will try to complete the power sequence and attach the bus manager to main driver code.

I have pushed the code to [gerrit](https://review.haiku-os.org/#/c/haiku/+/318/), feel free to review it. I will improving the coding style more by this week :).
