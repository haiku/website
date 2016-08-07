+++
type = "blog"
author = "mmlr"
title = "Using the Haiku USB stack"
date = "2007-04-20T08:30:26.000Z"
tags = ["usb", "USBKit"]
+++

			<p>
				<b>This article contains outdated information, please read with caution.</b>
			</p>
			<p>
				Mainly in the second half of the last year the Haiku USB stack has matured a great deal. Not only has it stabilized a bit, it has also seen the addition of an EHCI driver to support USB 2.0 devices. A rewritten UHCI driver and a new implementation of the USBKit library are other steps to a complete stack.
			</p>
			<p>
				The reason to write about that is the following: An increasing number of people apparently get interested in the progress of Haiku USB and they start to ask questions about the completeness and usability of the stack. Also whether and how to use the Haiku USB stack under R5 is an interesting question. Instead of telling the story individually it probably makes more sense to sum everything up in a post for everyone to read. I'll try to show what is currently implemented and working and where missing parts or possible problems could arise.
			</p>
			<p>
				Here's an overview about everything USB that is available from Haiku:
			</p>
			<ul style="list-style-type:disc">
				<li>The USB bus manager module(s) - They provide the unified interface to the USB from the driver perspective</li>
				<li>The UHCI/OHCI/EHCI bus modules - Provide the hardware specific interface to the USB bus manager</li>
				<li>The USBKit library and its raw driver - Provide an interface to use the USB from userspace</li>
				<li>USB drivers - They use the USB bus manager or the USBKit to support specific devices</li>
			</ul>
			<p>
				As you can see there is more to USB than just the busses or drivers. The good thing is that most of the parts are quite independent of Haiku and can be used under R5 and up as well. The components are mostly independent of each other too so that it's not an all or nothing thing if you want to profit from Haiku USB. I've split the following discussion into the parts that can be installed separately and list for each one what you can gain or lose by installing it and how to do it.
			</p>
			<h3>The USB stack</h3>
			<p>
				The stack alone only consist of two components, the bus manager and the bus modules. As mentioned above the bus manager is the module that provides the USB interface to the kernel level drivers. Actually the Haiku USB bus manager provides two modules, the "bus_managers/usb/v2" and the "bus_managers/usb/v3". Internally both use the same code and most of the v2 functions are mapped directly to the v3 functions. The two modules are provided so that drivers that were developed under R5 and use the v2 API can work beside drivers written for the newer v3 USB API of Dano and up. Both APIs are very similar in general. The biggest difference between the two is that the v3 API uses usb_ids to identify handels to internal stack objects instead of giving out direct pointers. This serves stability and eases debugging of stack and driver problems.
			</p>
			<p>
				The bus modules namely UHCI, OHCI and EHCI can be counted to the USB stack as well. They are the parts that implement the hardware specific interfaces and provide things like the virtual root hub. The bus manager will search for these bus modules on bootup. Each one will initialize and register itself (if it finds supported hardware).
			</p>
			<h4>Pros and cons of installing</h4>
			<p>
				When you replace the R5 USB stack with the one from Haiku you can gain USB 2.0 support through the EHCI module. On the other hand you will lose support for OHCI as, at the time of this writing, the OHCI host controller driver is not yet implemented. That means if you have an OHCI controller installed and use low or fullspeed USB devices (mice or keyboards most of the time) you will not want to install the Haiku USB stack just yet. You can find out what devices are present in your system by using a command like "listdev | grep USB". This will list all the installed controllers in the format "PCI bus, device #_: Serial Bus Controller (USB) [c|3|x]", where x is the PCI class_api field indicating 0 = UHCI, 10 = OHCI or 20 = EHCI.
			</p>
			<p>
				Also note that none of the bus modules currently support isochronous transfers. If you have working USB video or audio hardware (webcams, mics), it most likely uses isochronous transfers. Such devices would cease working when you switch to the Haiku USB stack.
			</p>
			<h4>Getting the binaries</h4>
			<p>
				See below if there are prebuilt packages for your platform. If not, you will need a checked out Haiku tree and the corresponding build tools to produce the binaries. From the base directory you can build the individual components for your platform by a command like "TARGET_PLATFORM=r5 jam usb \&lt;usb\&gt;ehci \&lt;usb\&gt;uhci". You need the backslashes to escape the less and greater than signs and you should replace the "r5" platform by "bone" or "dano" as required. This command should build the modules that can then be found under "generated/objects/&lt;platform&gt;/x86/release/add-ons/kernel/".
			</p>
			<h4>Installing the binaries</h4>
			<p>
				The first thing you should do before installing the new binaries is to archive the old ones. The original USB stack components can be found at "/boot/beos/system/add-ons/kernel/bus_managers/usb", "/boot/beos/system/add-ons/kernel/busses/usb/uhci" and "/boot/beos/system/add-ons/kernel/busses/usb/ohci". You need to move all of these files out of the add-ons tree and archive them in a zip somewhere.
			</p>
			<p>
				You can now go to "generated/objects/&lt;platform&gt;/x86/release/add-ons/kernel/bus_managers/usb" and copy the "usb" bus manager module to "/boot/home/config/add-ons/kernel/bus_managers". Also the bus modules "uhci" and "ehci" need to be copied from "generated/objects/&lt;platform&gt;/x86/release/add-ons/kernel/busses/usb" to "/boot/home/config/add-ons/kernel/busses/usb". After that you can reboot and see if anything still works. I've been using this stack for months now without problems (or at least without problems I couldn't fix), but your system might just be unsupported. Be sure to leave a report in the comments or open a bug report if you encounter problems. If everything works you can of course leave a note too. If you are unable to boot after installing the new stack you should disable user add-ons in the bootmenu and then remove the binaries and move the old ones back in.
			</p>
			<h3>USB mass storage module</h3>
			<p>
				There is the USB mass storage module (or rather USB-SCSI bus module) that exposes mass storage protocol compliant USB devices as normal SCSI disk to the system. They can then be mounted or partitioned as normal drives.
			</p>
			<h4>Pros and cons of installing</h4>
			<p>
				The USB mass storage driver should bring you mountable USB memory sticks, working card readers and access to MP3 players if they use the USB Mass Storage protocol and are compliant enough. There shouldn't be any downsides when installing this module.
			</p>
			<h4>Getting the module</h4>
			<p>
				Use "TARGET_PLATFORM=&lt;platform&gt; jam usb_scsi" to generate the usb_scsi bus module. The built module can be found under "generated/objects/&lt;platform&gt;/x86/release/add-ons/kernel/busses/scsi/usb/".
			</p>
			<h4>Installing the module</h4>
			<p>
				If you have any other USB mass storage module installed currently you should first store it away to reduce the risk of problems. You can then go to "generated/objects/&lt;platform&gt;/x86/release/add-ons/kernel/busses/scsi/usb" and copy the "usb_scsi" module to "/boot/home/config/add-ons/kernel/busses/scsi". After a reboot you can try out your mass storage device and see if it works.
			</p>
			<h3>The Haiku USBKit</h3>
			<p>
				Haiku includes a rewritten USBKit implementation. It should be fully compatible with the existing implementations, but fixes some bugs and enables getting more information from some devices. If you are currently using the USBKit (i.e. the USBKit.a static library) you can try to replace the implementation you have with the one from Haiku. When you do this you should also install the usb_raw driver from Haiku.
			</p>
			<h4>Pros and cons of installing</h4>
			<p>
				If you are implementing software that uses the USB from userland you can profit from some fixes in the Haiku USBKit. As a normal user you should not really notice a difference in using a different usb_raw driver and you cannot change the USBKit that is used by software as it is linked in statically.
			</p>
			<h4>Getting the binaries</h4>
			<p>
				You can use "TARGET_PLATFORM=&lt;platform&gt; jam USBKit.a" to generate the USBKit static library. It will be placed into "generated/objects/&lt;platform&gt;/x86/release/libs/usb/". Use the "headers/libs/usb/USBKit.h" header from the Haiku tree with this library. Most of the functionality the library provides is documented in that header file.
			</p>
			<p>
				Note that you will also need the usb_raw driver for the USBKit to work. It is encouraged that you use the Haiku usb_raw driver with the Haiku USBKit, but it is not mandatory. The Haiku USBKit should work with the older usb_raw drivers from Be as well. To build the Haiku driver use "TARGET_PLATFORM=&lt;platform&gt; jam usb_raw" which will place the driver into "objects/&lt;platform&gt;/x86/release/add-ons/kernel/drivers/bus/usb/".
			</p>
			<h4>Installing the driver</h4>
			<p>
				Installing the usb_raw driver is as easy as copying it from "objects/&lt;platform&gt;/x86/release/add-ons/kernel/drivers/bus/usb/" to "/boot/home/config/add-ons/kernel/drivers/bin" and creating a link to it in "/boot/home/config/add-ons/kernel/drivers/dev/bus/usb". You can verify that the driver is installed correctly by "ls /dev/bus/usb" you should then see some numbers and the "raw" entry.
			</p>
			<h3>Other USB drivers</h3>
			<p>
				There are other USB drivers in the Haiku tree that could just be useful to you. There is the usb_hid driver and things like usb_midi. I don't know how well they will work if they build for R5 at all as I didn't test them. You will have to try and see for yourself here. For other non Haiku USB drivers you should be able to install them as normal. Usually you will have to put them under "/boot/home/config/add-ons/kernel/drivers/bin". They should work with the Haiku USB stack the same as before. If they don't please let me know.
			</p>
			<h3>Prebuilt packages</h3>
			<p>
				There are packages available with the Haiku USB stack and mass storage module as well as a standalone source package with the Haiku USBKit. These will only work with R5 or BONE installations respectively. The USBKit source archive includes a makefile that should build a USBKit.a that can then be used with the included USBKit.h header. To install one of the binary packages make sure you follow the steps above to archive your existing USB stack and mass storage module. Then unpack the package to "/boot/home" this will put the binaries at the right place. The USBKit sources can be unpacked and used anywhere.
			</p>
			<ul style="list-style-type:disc">
				<li><a href="http://haiku.mlotz.ch/haiku_usb_r5_20070419.zip">Haiku USB stack built for BeOS R5</a></li>
				<li><a href="http://haiku.mlotz.ch/haiku_usb_bone_20070419.zip">Haiku USB stack built for BeOS R5 with BONE</a></li>
				<li><a href="http://haiku.mlotz.ch/haiku_usbkit_source_20070419.zip">Standalone USBKit sources and headers</a></li>
			</ul>
			<h3>Problems and Bugs</h3>
			<p>
				If you encounter problems with the Haiku USB stack please open a bug report at <a href="http://dev.haiku-os.org">our bug tracker</a>. When making a bug report please try to be as specific as possible and include syslog output, hardware configuration and other information that might be relevant for finding the problem at hand.
			</p>
