+++
type = "blog"
author = "kfx"
title = "GSoC: IPv6 implementation for Haiku "
date = "2010-04-28T08:17:33.000Z"
tags = ["gsoc2010", "gsoc", "ipv6"]
+++

With the exhaustion of IPv4 addresses that is expected to happen soon, the next Internet protocol version IPv6 has become more important than ever. All major desktop operating systems (Windows, Mac OS, Linux) already have IPv6 support. The main objective of this Summer of Code project is to create an IPv6 implementation in Haiku kernel. This work will allow user-space application developers to add IPv6 support to their programs, and Haiku users to have IPv6 connectivity to the Internet or other networks.

The full proposal follows.
<!--more-->
<h4 class="icon-person-medium">Personal Profile</h4>
<ul>
<li><strong>Full name:</strong> Atis Elsts </li>
<li><strong>Preferred email address:</strong> the.kfx at gmail.com </li>
<li><strong>Trac username:</strong> atis.elsts </li>
<li><strong>Summer Education:</strong> No. </li>
<li><strong>Employment:</strong> Yes, I have part time (20 hours in week) employment as researcher in Institute of Electronics and Computer Science, Riga, Latvia </li>
<li><strong>Previous Years:</strong> Have never applied. </li>
<li><strong>Brief bio:</strong>
I am a PhD student in University of Latvia. My research interests at the moment are Wireless Sensor Networks, specifically adding IP support to Low power and Lossy networks. As part of my research, I am participating in the development of a WSN operating system MansOS. I have significant experience in industry. For 4+ years I worked for Latvian software and hardware development company Mikrotikls as C++ programmer. My tasks there chiefly consisted of development and research of network protocols. I feel enthusiastic about participating in Open Source development and have contributed some (small) patches to some well-known open source projects, for example: to the Linux kernel, Quagga, and IPSec-Tools.</li>
</ul>

<h4 class="icon-kernel-medium">Project idea information</h4>
<ul>
<li><strong>Project title:</strong> IPv6 implementation for Haiku</li>
<li><strong>List of project goals:</strong>
<ul>
<li>to create an IPv6 implementation in Haiku kernel, including support for IPv6 addresses and routes;</li>
<li>to implement a subset of ICMPv6 protocol that is required to function as IPv6 host;</li>
<li>to implement support for TCP and UDP protocols over IPv6;</li>
<li>to implement IPv6 support in userspace utilities (e.g. ifconfig, route) that are necessary for testing the implementation in kernel;</li>
<li>test the new features, and integrate them in existing Haiku codebase.</li>
</ul>
</li>

<li><strong>Work plan:</strong></li>

<i>April 26 - May 24</i>
Read Haiku source code and documentation, make more detailed work plan and breakdown in tasks, discuss the tasks with Haiku community.

<i>May 24 - July 12</i>
Start coding.
Implement support for IPv6 packet sending and receiving.
Implement support for IPv6 addressing and routing.
Implement support for the following subset of ICMPv6:
 - Echo Reply Message
 - Echo Request Message
 - Neighbor Solicitation Message
 - Neighbor Advertisement Message
 - receiving ICMPv6 error messages

<i>July 12 - July 16</i>
Work related to mid-term evaluation (e.g. writing progress report, incorporating mentor's suggestions after code review).

<i>July 16 - August 9:</i>
Implement support for TCP and UDP protocols over IPv6.
Implement support for dynamic (automatically created) link-local addresses.

In parallel to the kernel side support, IPv6 support will also be introduced in userspace utilities to allow the testing of the kernel side implementation. The necessary utilities:
 - ifconfig utility - for working with IPv6 addresses
 - route utility - for working with IPv6 routes
 - ping6 - for testing IPv6 connectivity and ICMPv6 support

<i>August 9 - August 20:</i>
Work on testing, bug fixing, incorporating mentor's suggestions, possibly also work on documentation.

<li><strong>Project description</strong></li>

To achieve the goals of the project, new code must be added to the Haiku kernel. This includes:
- a new protocol module (struct net_protocol_module_info) for IPv6, similar to gIPv4Module structure for IPv4
- a new address family module (struct net_address_module_info) for IPv6 address family, similar to gIPv4AddressModule.
- a new protocol module (struct net_protocol_module_info) for ICMPv6, similar to sICMPModule structure for ICMP.
- modifications in TCP  and UDP modules to incorporate changes necessary for IPv6 specific TCP and UDP processing
- modification of ifconfig and route utilities - adding new address family support there
- new ping6 utility, similar to ping, but using AF_INET6 sockets and based on ICMPv6 echo request and echo response messages

<li><strong>Why do you want to work on this project?</strong></li>

There are multiple reasons for wanting to do this work. First, I want to get an a complete and detailed understanding of the inner workings of IPv6 protocol. This task is also related to my for my research, which has the objective to help to bring IPv6 to the world of low power embedded devices. Second, to contribute to an Open Source project that has a good potential (while at the same time is small enough for me to allow to make a significant difference). Then, to maintain and sharpen my skills as a programmer. I believe that participating in serious programming projects like Haiku is absolutely necessary for this. Also to get some new work experience.

I believe I can do the work well, because I have relevant work experience with IPv6 and with operating systems. In my work at MikroTik, one of my tasks was to add IPv6 support to the router operating system RouterOS (based on Linux kernel) we were developing. This included writing support for userspace address and route management utilities, RADVD (router advertisement daemon), dynamic routing protocols, as well as some kernel modifications. In my work at university, I have had to research newer developments based on IPv6, like 6lowPAN, and to think about how to incorporate such developments in embedded device operating systems.
</ul>