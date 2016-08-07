+++
type = "blog"
author = "pfoetchen"
title = "Porting Haiku to ARM architecture"
date = "2009-04-21T23:35:47.000Z"
tags = ["gsoc", "porting", "arm", "gsoc2009"]
+++

<h4 class="icon-person-medium">Personal Profile</h4>
<ul>
<li><strong>Johannes Wischert</strong></li>
<li><strong>Brief bio</strong> - I'm a computer science student living in Germany. I'm 25 years old now. I wrote my first program with 8 or 9 years or so and never stopped since then... After my studies I want to work somewhere in the embedded systems development but by now I enjoy my studies and take my time to finish.</li>
</ul>
<h4 class="icon-app-medium">Project idea information</h4>
<ul>
<li><strong>Project title</strong> - Port the Haiku Kernel to ARM-Architecture</li>

<li><strong>List of project goals</strong> - <br />
<ul>
<li>generic u-boot Bootloader using the u-boot apis as far as possible to ease porting to other platforms that use u-boot</li>
<li>Kernel that runs on the arm-processor and supports all applicable features that the x86 kernel has</li>
<li>Device driver for at least the SD-card and the Serial-Port </li>
<li>Working system running on a Beagleboard or similar device</li>
</ul>
</li>
<li><strong>Project description</strong> - <br />

<ul>
<li>To get the system running on an ARM-CPU we first need a working Haiku ARM toolchain to compile the code I already got the toolchain to run and produce working binaries (tested under qemu) so this part of the system already works more or less. see: http://dev.haiku-os.org/ticket/3633</li>
<li>After that done the next step is the boot loader. Since the beagleboard I want to target already has "Das U-boot" bootloader installed I decided to use it to get the kernel loaded. Using the u-boot loader has some advantages since it already provides all the important data and functions for loading the kernel like builtin serial drivers and drivers for all kind of memory to boot from (including a TFTP client) these functions are exposed by a simple platform independent API. By using this API an architecture independent kernel loader could be build, so that porting to other architectures that use u-boot would be much easier.</li>
<li>The loader would run as a standalone application on top of u-boot to use it's features and then switch to direct access to the hardware to run the kernel.</li>
<li>To allow u-boot to boot the kernel I could either include bfs in u-boot or implement the bfs in the loader programm. If the bfs code is in the loader no change to u-boot is needed so I will probably take this way since changing the u-boot always has the risk to brick a device.</li>
<li>I know that this is not everything and I will probably have to ask a lot of questions to get everything right ;)</li>
<li>I must admit that I don't know to much about the ARM internals, yet so I can't give much details about how I will port the MMU dependent stuff etc.</li>
<li>The device drivers for the serial-port and the sd-card are quite straight forward to implement, since they are interfaced directly by the processor (at least on the beagleboard) and there are a lot of existing open source drivers (of course we would have to pay close attention to the licenses etc...)</li>
<li>Since the beagleboard does not have an isa or pci bus it could use code similar to the m68k port to put the onboard devices in the pci bus. Even better would be to write a sort of bus system for the onchip devices this would also help to port to other devices that do not realy have a bus system like many other embedded devices.</li>
<li>The next steps would be to write a driver for the onchip usb-controler and a Framebuffer driver if the porting goes much faster than I think ;)</li>
</ul>

</li>
</ul>
<ul>
<li><strong>Why do you want to work on this project?</strong> </li>
<ul><li> I love the whole concept of Haiku and would love to see it run on embedded hardware like all these planned linux+arm netbooks. Since ARM-CPUs are used in so many different devices and most of these devices are multimedia devices like netbooks/mediaplayers/smartphones it would make sense to port Haik as an multimedia OS to these devices.<br /></li>
<li>I already have experience in embedded programing for example I ported an OS from the MSP430 to the SuperH Architecture for university (it was a nano kernel OS called SmartOS there is a wiki about this project but for whatever reason they have the interesting parts hidden http://www5.informatik.uni-wuerzburg.de/snow5xoops/modules/dokuwiki/doku.php? ) so I know a bit about all the problems that could arise. </li>
<li>I know porting such a complex project is quite difficult but I have the time to concentrate on this project and it's not the first embedded project I work on (but probably the biggest ). </li>
<li>Other projects I worked on were a device driver for the r4ds flash card to use it under DSLinux on the Nintendo DS and some other smaller stuff like a stepper motor controler board that was controlled by an MSP430.</li>
<li>I know that this project is not really helpful to get closer to the first alpha release of haiku but I think an ARM port would be a interresting addition to the Haiku project and perhapse attract some more developpers.</li>
</ul>
</ul>
</li>
</ul>
