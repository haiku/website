+++
type = "blog"
title = "[GSoC 2018] SDHCI MMC Driver"
author = "krish_iyer"
date = "2018-04-25 22:08:09+05:30"
tags = ["haiku", "software"]
+++

<p>Hello everyone! I am B Krishnan Iyer(irc: krish-iyer, telegram: krish_iyer trac: krish_iyer, github: krish-iyer), currently pursuing bachelor's in Electrical and Electronics Engineering at Amrita University. I am one of the three GSoC participants with Haiku. I am greatful to everyone for accepting me as an intern. This summer I will be developing SDHCI MMC driver.</p>

<h3>About Me</h3>
 
<p>My area of interest lies in Embedded system, apart from academics, I work on developing drivers for microcontrollers. I have also worked with different single board computers such as Raspberry Pi and BeagleBone and single board microcontrollers like Arduino(Atmega328P and ATmega2560), TI’s Launchpad(MSP430). Currently, I am developing drivers for ARM-Cortex M4 based boards to communicate to different sensors over different communication protocols(USART, I2C and SPI).</p>

<h3>Project Description</h3> 

<p>Haiku doesn't yet support PCI devices with class 8 and subclass 5 according to SD Host Controller Specification[1]. While not very common on x86 machines (SD drives are often wired using a USB controller instead), SDHCI is a lot more common on ARM devices, where currently it is not possible to boot Haiku for lack of a suitable mass storage driver.</p>

<h3> Project Goals </h3>

This project will involves:

<ul>

<li>Bus Driver for SDHCI controller: Which will discover the device in PCI bus and expose to MMC device Driver </li>

<li>MMC Device Driver: This will have the protocol implementation for enumeration and data tranfers to be communicated with the device </li> 

<li>MMC block device: This will recieve request for read/write/erase </li> 

</ul>

<p>So far we have build the dev enviornment and emulated a sdhci-pci device using Qemu. Haiku has sucessfully detected[2] it as an non vitio device.</p>


<h3>Suggestions!</h3>

<p>Any kind of suggestions or comments regarding this project are welcomed. I will be updating the code in a forked repository[3]. I am also sharing the link of the project porsal which has the brief description about the components to be involved in the project, you can refer and suggest changes regarding that too.</p>

<h3>References</h3>

<ol>

<li>https://www.sdcard.org/downloads/pls/click.php?p=PartA2_SD%20Host_Controller_Simplified_Specification_Ver4.20.jpg&f=PartA2_SD%20Host_Controller_Simplified_Specification_Ver4.20.pdf&e=EN_SSA2</li>
<li>https://imgur.com/a/IiHEqhA </li>
<li>https://github.com/krish-iyer/haiku </li>
<li>https://docs.google.com/document/d/1xSV9qI1IRuNvqBBXnRNVfp_VwAM31GF-4TeFifC0ih0/edit?usp=sharing </li>

</ol>
