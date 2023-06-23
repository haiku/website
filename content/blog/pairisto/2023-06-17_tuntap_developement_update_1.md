+++
type = "blog"
title = "TUN/TAP Developement Update #1"
author = "Pairisto"
date = "2023-06-17 12:49:33-05:00"
tags = ["haiku", "software"]
+++

## Intro
Hello again everyone! I wanted to write a long overdue update on how everything is going and what I've been learning over the past couple of weeks.  Due to how my semester didn't actually end until the 16th, progress has been relatively slow but now that I have more time I can get started on more things with this project.

## Understanding the Project Better
(If I get anything wrong about anything I am about to say, please correct me!)
First things first, what are the actual specifics of what a TUN driver is (since I didn't go over it in detail last time)? TUN drivers are essentially virtual network interfaces and and a driver that is typically used to establish communication between the operating system and user-space applications.  For the network interface in specific, it is a virtual point-to-point connection that works at the IP level of the networking stack and routes all outgoing packets on the system through it where these packets are then sent to the driver. Looking at the driver element, you use your normal write and read syscalls on the driver to emulate the sending and receiving behavior respectfully. You can think of a TUN driver as part of the emulation of an IP interface.

So how do applications like OpenVPN use a TUN driver? Like this:
1. First let's say you have an application that can connect to the internet and for this example we will use `ping`.
2. Now you want to encrypt your traffic using OpenVPN so you run OpenVPN
    1. It will make sure that the end point that you want it to connect to is also a OpenVPN client/server
    2. Then it will create a new network interface called `tun0`(for example) using `ifconfig` commands. Keep in mind that `tun0` isn't what connects to the internet, it is exclusively used to internally handle packets to give to applications and the interface.
3. OpenVPN will also change the routing on your system to send any packet whose destination address is not within our local network to go through the `tun0` interface using the `route` command.
4. Back to `ping`, now when you send a packet to `google.com`, that packet will first go to the `tun0` network interface which will then get transformed into a stream of bytes like this: `0000000000000000000000000800450000549c720000fe01f80e0a0a0a0a0a0a0a0a0800097c57020000603ad8466efd050008090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f3031323334353637`
5. This would then be sent to the TUN driver using the `write` syscall to hold this data in a buffer somewhere in the driver that OpenVPN could then access using read.
6. OpenVPN will then use the `read` syscall to get the packet data in bytes, use ssl to encrypt the data, make a packet, and do all the fragmentation for it, and send it on an interface that has internet access like `/dev/net/ipro1000/0` for example
7. The server you connected to will then receive the packet, decrypt it, and forward it to `google.com`
8. `google.com` will then send a packet back to the server, the server will encrypts the data, fragments the packet, sends the packet back to you where you can receive it, decrypt it, have OpenVPN `write` to the driver in a buffer and the network interface will read that buffer which the interfaced will send it back to the application which sent the data.

## So Why Mention All of This?
I mention all of this due to a change in the project architecture much like I had determined might happen back in my last post. After talking it over with my mentors, we had decided on using both the current TUN interface and rewriting the already made TUN driver. Why? Throughout almost all applications that use a TUN interface, the read and write syscalls are the standard ways of communication for an application (like OpenVPN) to accomplish what it wants with a TUN device. While there is no technical standard for a TUN device, every other operating system (linux, freebsd, solaris, etc.) has it as a device driver. So the main reason for this switch is mostly for the sake of keeping to standards that are used across operating systems and the fact that I don't think there is a way to make a TUN driver that uses just a module as there is no way (at least that I've found) to directly read and write to it breaking standard. This standard that I talk about also helps with people porting over software as having the standard interface of the read and write syscalls is what every other piece of TUN using software does. Eventually, I would like to have the module and driver be one but for the sake of getting something that works keeping it as two separate pieces will be easier to code and debug for the moment.

## Well... What Progress Have You Made?

While I would like to say that I got a lot done, that is unfortunately not the case due to a mixture of school and learning more about the operating system itself. Though now I feel like I've gotten a better handle on turning the logic into workable code. A lot of what I will be using for setting up the interface will be done through [tun.cpp](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/devices/tun/tun.cpp) and it will then set up the driver being [driver.c](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/drivers/network/tun/driver.c) through the `tun_up()` function which is invoked after you make the driver and use `ifconfig tun inet 10.10.10.10 255.255.255.0 up`.  `ifconfig` is important here as it is the standard in which the networking interface is brought up and down. You can think of the TUN module being the same as the Ethernet module in terms of logic with reading, writing, opening, and closing. So far, I can get the interface up and I can use ping and route and all that on it and the driver appears in devfs which can be interacted with. Most of what I will be working on with the driver from here on is the logic of read and write along with using [BufferQueue.h](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/protocols/tcp/BufferQueue.h) to handle the packet as it is being transmitted through the driver to know which queue a packet needs to go to. I am planning on making two queues being the interface queue and the application queue. To determine which queue the packet should go to, I will have the driver check the destination address using something like [net_buffer](https://cgit.haiku-os.org/haiku/tree/headers/private/net/net_buffer.h).
Next up is that there is some good progress on the OpenVPN port as I am making the .recipe file for it. OpenVPN actually builds and compiles well on Haiku and will actually pass some of the tests that are defined on the [PORTS]() file on OpenVPN just not with the TUN driver enabled since that still needs to be worked out.

## Comments From The Last Post
Thank you all for commenting on my last post and I want to address your questions here.
First, will I be implementing TAP? Unfortunately, I would like to but one thing at a time. The TUN code will be a lot less heavy than the TAP code I would have to implement (at least the way it seems so far) but both may end up coming together due to the nature of them.

Second, why not port Wireguard over OpenVPN? Wireguard is very tied down to the Linux kernel so doing that would be a project on its own but why not use the Golang port? Haiku, as of time of writing, does not have functional Golang support so that is all the practical options we truly have dried out :/

Hopefully I will be making posts more often to tell you guys about the progress of the project as time moves forward. Thank you for reading!


