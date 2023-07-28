+++
type = "blog"
title = "[GSoC 2023] VPN Support Project Update #3"
author = "Pairisto"
date = "2023-07-15 01:19:01-05:00"
tags = ["haiku", "software"]
+++

Sorry for the late blog post everyone! Personal life and some roadblocks on the project got in the way but I am proud to say that the driver is up and working!

## Problems, Problems, and more Problems
I got the semaphore problem settled, but I then ran into a problem where the data that the application on the interface side sends a packet was then not receiving the packet. Through some debugging I found out that the interface, when it goes into `device_consumer_thread` for getting the receive function, it fails [here](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/stack/device_interfaces.cpp#n119). Looking deeper into when that `interface->receive_funcs` element gets assigned I found the function [here](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/stack/device_interfaces.cpp#n648) which I realized is never called when I call `ifconfig` to set up the interface. I ran into the solution to the problem by just changing the type of datalink frame from loopback to an ethernet frame that the interface will be using from now on. That brought the packet to an interface and I started to get a new problem of course :)

## Testing the Driver
One of the 2 types of test programs that I have been running on the driver is a ping reply program ([here](https://github.com/Swangeon/HCC/blob/main/tests/icmp_reply.py)) which waits for the interface to write the byte stream representation of a packet so that the application, in this case my test program, can read the driver to get the byte stream, modify it, and then write that back to the driver for the interface side to then read the driver and send it off to its original program. This worked fine after a bit of tweaking but the problems started to come in through my next test being a UDP Client and Server test ([client](https://github.com/Swangeon/HCC/blob/main/tests/udp_client.py) | [server](https://github.com/Swangeon/HCC/blob/main/tests/udp_server.py)). This one is particularly important due to how most VPNs actually use UDP as their de facto protocol of choice with OpenVPN being a part of that group. The server was not an issue and if you look at the code itself, I have it receiving on the interface side instead of on the driver side since I wanted to make sure the driver could instead send first and then receive. But the biggest roadblock I had so far was the client. See the client (application side) was able to forge a packet and send it to the driver fine, the interface would read the data fine, and then the interface would then send the data fine. The problem came when it was time for the client to then read the data from the driver as I kept getting kernel panics with the reasoning being `vm_page_fault: unhandled page fault in kernel space at 0x90` which was cryptic. After I used the `dis` command I found that it was a `call`  to `rax+0x90` at `ff9090000000` which was within the BufferQueue.Get call that I make to grab a packet from the interface BufferQueue. It took me a very long time to even know where to start with debugging this, but, something I remembered was a tool called [ghidra](https://github.com/NationalSecurityAgency/ghidra).  It's used for reverse engineering binaries to figure out ways to hack said applications more so than debugging but it has really nice tools like a built in objdump and decompiler that REALLY help with the debugging process and found this:
```
    	00100537 ff 90 90    	CALL   	qword ptr [status + 0x90]
             	00 00 00
```
Which decompiled into `status = (**(code **)(_gBufferModule + 0x90))(buffer,source,0,size);`

Looking at the decompiled code (the decompile wasn't perfect but, I managed) I noticed it was from `gBufferModule` which is something that is defined in many pieces of the source code but never actually gets defined within the [BufferQueue.cpp](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/protocols/tcp/BufferQueue.cpp) source code since it gets defined and used in [tcp.cpp](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/protocols/tcp/tcp.cpp#n46) where it gets used. SO, following along with the source code I found where I was getting the kernel panic being [here](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/protocols/tcp/BufferQueue.cpp#n379) and realized... I never defined a `net_buffer_module_info` struct as gBufferModule...

Now one question that you might have that I had was "Why does it fail with UDP and not ICMP when I ran the ping reply program???". Couldn't tell yeah -\_- Anyway, after switching that up I was able to get all tests working fairly smoothly so thumbs up I guess?

## Looking Forward
<<<<<<< HEAD
While the driver is working, it is far from done as things like how ioctl is not operational yet. Though there are 3 main problems still at play here:
1. When the interface goes up, a packet from [here](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/stack/device_interfaces.cpp#n70) gets received and I am not quite sure how that is supposed to be handled as I don't see it happening with ethernet.cpp?
2. The driver can kind of handle more than two sources sending packets from the interface for one or two seconds but then the application can crash hard but I think a fixed for this might be having a write semaphore like a [RNDIS device](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/drivers/network/ether/usb_rndis/RNDISDevice.cpp#n99) or comes from a solution to the next problem.
3. Every time the driver is opened, any first read call will always send some form of invalid data and skip the read semaphore which the application side can't use to write it back.
These are problems but for now I can continue with the project as a whole and try to get OpenVPN to start working with the TUN driver. Also, as I am writing this, I have not committed any code of the working version since I am trying to refactor and clean it up more but I will update the post when I commit the code which should be soon. You can follow the commit [here](https://review.haiku-os.org/c/haiku/+/6608).
=======
While the driver is working, it is far from done as things like how `ioctl` is not operational yet and that the driver will just be in /dev/misc/ instead of /dev/net since it tries to bring it up immediately which we don't want. Though there are 3 main problems still at play here:
1. When the interface goes up, a packet from [here](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/stack/device_interfaces.cpp#n70) gets received and I am not quite sure how that is supposed to be handled as I don't see it happening with ethernet.cpp?
2. The driver can kind of handle more than two sources sending packets from the interface for one or two seconds but then the application can crash hard but I think a fixed for this might be having a write semaphore like a [RNDIS device](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/drivers/network/ether/usb_rndis/RNDISDevice.cpp#n99) or comes from a solution to the next problem.
3. Every time the driver is opened, any first read call will always send some form of invalid data and skip the read semaphore which the application side can't use to write it back.
These are problems but for now, I can continue with the project as a whole and try to get OpenVPN to start working with the TUN driver. The commit [here](https://review.haiku-os.org/c/haiku/+/6608) has the full code that works now.
>>>>>>> 4080616f45fa17ce3e707396896de680057cb654

I hope you all enjoyed reading this VERY long overdue update that I hope was comprehensible but I thank everyone for all the support I've gotten on the project!

