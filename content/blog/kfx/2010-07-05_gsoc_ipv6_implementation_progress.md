+++
type = "blog"
author = "kfx"
title = "GSoC: IPv6 implementation progress"
date = "2010-07-05T10:15:43.000Z"
tags = ["gsoc gsoc2010 ipv6"]
+++

Up to now an initial version of the following functionality has been made:

- new address family module - struct net_address_module_info - for IPv6 implemented, based on code from haiku/src/add-ons/kernel/network/protocols/ipv4/ipv4_address.cpp
- new protocol module - struct net_protocol_module_info - for IPv6 implemented, based on code from haiku/src/add-ons/kernel/network/protocols/ipv4/ipv4.cpp
- a patch for the ifconfig tool, that allows to configure interfaces with IPv6 addresses. It works by adding new struct net_interface structures, in a way to similar to how IPv4 address aliasing works.
- a patch for the route tool, that allows to view and manipulate IPv6 routes.

The code supports the basic IPv6 data sending and receiving. There are some big limitations at the moment - communications must be be local, because Neigbor Discovery Protocol that allows to resolve link-layer addresses is not implemented yet; and raw sockets must be used for communication, since neither UDP nor TCP is supported yet.