+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Third Phase Outline"
author = "krish_iyer"
date = "2018-07-12 10:52:58+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++

So here we are in the final week of the second phase of this project. I would like to address what was planned 
for this phase and what we have achieved and will proceed to plan for the third phase. 

## Second Phase Highlights

* We were successful in register mapping through MMUIO.
* We have created a bus manager but not linked with controller ATM.
* Interrupts have not been implemented but also not required in this phase.
* Separating controller(device) and MMC bus(child device) but in a single module is still needed to be done.
* mmc_disk being running multiple times is fixed now.

## Plan for the Third Phase

I have already addressed the issue of reading OCR value in my most recent blog post. The issue was, even after 
setting up the command register we were not able to get the response from response register after reset. When 
we enabled timout error status, it automatically turned the error bit to 1 and which says that it failed to get 
any response in 64 cycles of SDCLK. It will the foremost task 
and will be reading the response of commands. To proceed further in sequences it's necessary that we should get 
the responses of the commands.

### Sequences

#### Bus Power Control sequence

Currently working on to get the OCR response. For this, we need to go through modes like SD and SPI also 
asserting CS signal i.e host to card chip select signal which is already been set in transfer mode register.  

SD memory card SPI channel consists of four signals

1. CS: host to card chip select signal
2. CLK: host to card clock signal
3. DataIn: Host to card data signal
4. DataOut: card to host data signal

This will also take us into distinguishing between SD memory card and MultiMedia card, that can be done with 
CMD1 and ACMD41(command is CMD5) as mentioned in [SDIO spec](https://www.sdcard.org/downloads/pls/pdf/index.php?p=PartE1_SDIO_Simplified_Specification_Ver1.00.jpg&f=PartE1_SDIO_Simplified_Specification_Ver1.00.pdf&e=EN_E1100). Also qemu is by default getting a response which I was not able to produce(after reset). Currently, we are 
facin responseg the timeout error which is set for 64 SDCLK cycles. For this, we will be executing Timeout 
Setting on DAT Line sequence. DAT bus Line is actually the physicall data line on which data is being
transfered, turning it low and high determines the start bits and end bits respectively. The payload for block 
oriented data transfer is protected by 1 or 4 bits CRC check sum.

#### Changing Bus Width

Again reading the response is a must for proceeding for this sequence. Distinguishing between SD memory card 
and the MultiMedia card is also a key element in this sequence.  

#### SD Transaction Generation

To proceed further we should be through with [SD memory card spec](https://www.sdcard.org/downloads/pls/click.php?p=Part1_Physical_Layer_Simplified_Specification_Ver1.01.jpg&f=Part1_Physical_Layer_Simplified_Specification_Ver1.01.pdf&e=EN_P1101) and [SDIO spec](https://www.sdcard.org/downloads/pls/pdf/index.php?p=PartE1_SDIO_Simplified_Specification_Ver1.00.jpg&f=PartE1_SDIO_Simplified_Specification_Ver1.00.pdf&e=EN_E1100). This will be 
basically implemented in mmc_disk or we can say that the job of data transfer will be managed by MMC disk 
driver. For now, virtio disk driver is using IOScheduler and DMA resource class(device_manager/..) I am not 
sure that how much of that we can use of how similar DMA transfer and Polling is similar to SD transaction.

##### Transaction Control without Data Transfer Using DAT Line

* **Sequence for the issue of SD command**
* **Sequence for complete command**

##### Transaction with Data Transfer Using DAT Line

SD transfers are classified into three kinds

1. Single Block Transfer
2. Multiple Block Transfer
3. Infinite Block Transfer

There are implemented by two different methods

* **Not using DMA**
* **Using DMA**

That 'll be all the milestones which will be implemented in the third phase, hopefully :). The driver will be 
favorable to SD memory card rather MultiMedia card. MultiMedia support can be added later.
 
I think the only big obstacle, we need pass through is reading the response for a particular command. Rest all 
things and implementation of sequences will go smooth. It is going to be a big challenge to implement these 
within 3 weeks of time but still if some delay comes up then I would like to extend the internship period and 
at least complete third phase plan. 

Thanks for reading :)