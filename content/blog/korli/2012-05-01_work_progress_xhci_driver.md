+++
type = "blog"
author = "korli"
title = "Work in progress on the xHCI driver"
date = "2012-05-01T22:23:38.000Z"
tags = ["xHCI driver qemu", "xHCI", "driver", "QEMU"]
+++

I started to work on the xHCI driver in late 2011: I found the code provided during the Google Summer of Code 2011 was promising and didn't get its full exposure. Another reason was Haiku Inc. provided me with hardware I needed to mentor the xHCI project by Jian Jiang.
<!--break-->
<h4>Background</h4>

<ol><a href="/files/xhci.png"><img src="/files/xhci.png" height="350" align="right"></a>
xHCI is a specification describing an interface of an host controller for USB 1.x, 2.0 and 3.0 compatible devices, also named USB 3.0. The xHCI driver is the USB 3.0 host controller driver. The driver initializes MMIO registers and host memory data structures for the xHCI devices, translates requests from the USB stack in Transfer Requests Blocks, then submits them to the hardware. It also listens for hardware events and propagates them to the stack. Device slots and endpoint contexts are managed by the driver.
xHCI is quite improved with respect to design of interfaces compared to previous versions of the specification. 
Devices, endpoints have one to one mapped structures easy to follow, a unique type of transfer, the Transfer Request Block, while keeping the legacy USB transfer types. Data buffers can be up to 64KB and directly point to USB stack buffers, potentially avoiding data copy.
Legacy USB 2 and USB 1 devices are supported nicely with the same structures as is. </ol>


The Haiku USB stack was modelled for USB 1.0 and USB 2.0 specifications. Sometimes the stack does things that xHCI now wants to do by itself like device addressing. Thus, I needed to add a controller cookie to the Device class, to more easily map with the xHCI device slot data structure. Understanding the miscellaneous structures for contexts, rings and such took me a lot of time. For instance, one of the first task after a device is attached is enabling a device slot and reading back the slot number for the device. I first expected the slot value to be in the wrong context. Quite the same happens for the device state, and then the endpoint state.

<h4>QEmu xHCI emulation</h4>
Beginning of April I decided to have a look at what was the state of xHCI emulation in QEmu. This could potentially speed up a lot debugging the ring and queueing code I added earlier. Why? As usual with emulation, no system reboot is required and updating the code is easy with the update-image jam target. And more, 

QEmu in the trunk includes a new xHCI bus device, which happens to not be integrated in the legacy USB framework. Building Qemu by the way requires GLib development package. For my testing, QEmu debug output was crucial, I enabled tracing in hcd-xhci.c. After finding out how to launch QEmu with this new bus (the command line option is -device nec-usb-xhci), I spent a bit of time to be able to add a device (the console command is device_add usb-mouse or device_add usb-keyboard). In fact, usb_add or usb-device only works with the legacy QEmu USB framework.

<pre>qemu-system-i386 -hda haiku.image -serial stdio -device nec-usb-xhci</pre>

Press Ctrl+Alt+2 to switch to the QEmu console. To add a HID device, just type one of these:
<pre>device_add usb-mouse
device_add usb-kbd
device_add usb-hub</pre>

When I was finally successful, I could now check how Haiku xHCI driver behaved. It crashed at the very beginning: The QEmu xHCI doesn't allow byte read in its MMIO registers, which by the way, works nice on real hardware. After fixing this piece of code, the thing was running OK without attached devices.
I remarked the test code NOOP wasn't working. Coincidentally, QEmu doesn't implement this command handling yet.

Surprisingly whereas it doesn't work on real hardware, the control transfer code was working out of the box on emulation: an event is sent even though the transfer request is badly formed: only setup and status stages were included. From this point, I could add a simple data stage and see the bus code was now copying the first eight bytes of the device descriptor I was asking for.
I then tried to attach other types of hid devices emulated by QEmu and got exactly the same bytes. Checking the QEmu code, HID descriptors are very similar. I tried with the emulated hub and found different but correct values.
I could then add the finishing transfer code. To ease things, a transfer that is supposed to be finished is just pushed in a queue that the finisher thread handles sequentially. At that moment, data copy only occurs to the transfer buffer for input transfers. AllocateDevice() was now happy, it could find out whether a hub is connected or not and instantiate the correct class Device or Hub.
Nonetheless the second control transfer request this time for the whole report was failing; the controller didn't send an event back. The consumer of the controller ring only found a zero TRB whereas it should have found a link TRB. Inspecting a bit revealed I was misusing arrays of pointers to TRB. I simplified this by keeping only pointers to the first and doing bookkeeping. The next try was better: the controller did find a link TRB and consumed the request successfully. From the debug output of QEmu, I noticed though that the dequeue pointer still was pointing to a now freed TRB segment, the one from the previous request. It seems wrong and could need further investigation as this could lead to ring misbehaviour or crash. Basic tests aka control transfer for some devices are now working nice, in an emulated environment at least.
<h4>
Next steps</h4>
Next should be passing the device to the configured state to be able to send requests to non-default endpoints, and check how interrupts transfers behave for HID devices.