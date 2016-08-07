+++
type = "blog"
author = "ivo"
title = "Current ICMP implementation in HAIKU kernel"
date = "2007-06-09T22:27:31.000Z"
tags = ["haiku", "icmp"]
+++

Hi all,

According to current Haiku source ICMP implementation is only a ... framework. Only ICMP echo request messages are processed. 

There are essentially two RFCs that should be considered when implementing ICMP (for IPv4). RFC792 - 'INTERNET CONTROL MESSAGE PROTCOL' and RFC1122 - 'Requirements for Internet Hosts -- Communication Layers'.

According to RFC1122, paragraph 3.2.2. there are two types of ICMP messages a host must process:
1) ICMP Error Messages
- Destination Unreachable
- Redirect
- Source Quench
- Time Exceeded
- Parameter Problem
2) ICMP query messages:
- Echo
- Information
- Timestamp
- Address Mask

First of all, I plan to implement a generic icmp_send_data() that should be used whenever sending ICMP messages. Then implement processing of received ICMP packets accordingly.

Offtopic: please add a NOTE to the documentation that cross compiling Haiku on x86_64 linux host is not yet possible ;)
