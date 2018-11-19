+++
type = "blog"
title = "[GSoC 2018: SDHCI MMC Driver]: Week #11"
author = "krish_iyer"
date = "2018-08-06 21:24:03+05:30"
tags = ["haiku", "software", "GSoC 2018", "SDHCI", "MMC", "Drivers"]
+++


Hello everyone, We are in the final week of GSoC'18 program and yesterday our [code](https://git.haiku-os.org/haiku/commit/?id=25b6a6f19b13680a759cffecebf60d0b7e76d3d3) has successfully [merged](https://review.haiku-os.org/#/c/haiku/+/318/). It got crashed in the first build because we thought we would add the code but disable the build currently but we didn't test the case when device manager will try to find the driver in a certain directory which we [hardcoded](https://github.com/krish-iyer/haiku/blob/sdhci_mmc_driver/src/system/kernel/device_manager/device_manager.cpp#L1899) at the time of loading the module. So we just changed it to an OR condition where it won't be able to find the driver binary but still be able to boot the OS in any case. 

I would like to elaborate where exactly the project is stuck now. In [Physical Layer spec version 1.10](https://www.sdcard.org/downloads/pls/pdf/index.php?p=Part1_Physical_Layer_Simplified_Specification_Ver1.10.jpg&f=Part1_Physical_Layer_Simplified_Specification_Ver1.10.pdf&e=EN_P1110)  pg 97 and section 7.2 has a flow chart which clearly specifies the to issue the command and 
read the OCR value from which will be able to estimate the exact supported voltage value. So for the start, we need to issue
CMD0 which will reset the card. In pg 54 and section 4.7.4, they mentioned the command which is as follows. 
| CMD Index    | SPI Mode    |Argument  | Resp    | Abbreviation | Command Desp|
| ----------|:---------:| --------:|--------|:-----------:|------------:|
| CMD0        |yes        | none       | R1        |GO_IDLE_STATE| resets the SD card|

So for this I did following things:

    // As  mentioned in command register desciption in [SD host spec ver 1.00
    command = SDHCI_RESPONSE_R1 | SDHCI_CMD_CRC_EN  | SDHCI_CMD_INDEX_EN | SDHCI_CMD_0;

But no response came up. Timeout error indicates that there should be some clocking issue. But I think 400kHZ is the ideal 
clock at which card should respond. For that again we read base clock value from the capabilities register and divided with 
the factor so that we get a value nearest to 400kHZ.

For this week I will be writing documentation and submitting the final evaluation. Feel free to review the code and share your 
views regarding the project :).
