+++
type = "blog"
title = "[GSoC 2023] VPN Support Project Update #5"
author = "Pairisto"
date = "2023-08-05 00:38:29-05:00"
tags = ["haiku", "software"]
+++

## Tempered Optimism
So great news everyone, OpenVPN and the TUN/TAP driver is working on Haiku! While this is great news for the development of the project, I need to temper it with some problems that the project has encountered now. So first thing that I had to change first was going from TUN to TAP since OpenVPN wanted a Point-to-Point connection for the TUN driver and Point-to-Point isn't quite a thing on Haiku yet. I had a lot of trouble with routing with TUN, so I moved onto TAP, and that seems to work... sort of. The main thing is that Haiku can be a client fine but it has some trouble being a server as OpenVPN can set the server up, and have a client OpenVPN connect to it (let us say the client is running Linux), but the client cannot ping the Haiku server. When I try to ping the server, ping will just say `Destination Host Unreachable`. Looking further into it using tcpdump, I realized that the client is trying to send ARP request to try and find the server and the Haiku server isn't responding. Checking the Haiku side of things, I noticed that it wasn't receiving the ARP requests to begin with so I have a hunch it might be the VirtualBox NAT Network I am using but I am not ruling out the possibility of the TAP driver or the TAP interface.

## New Problems Going Forward
Along with the problem mentioned above, there are also some more peripheral issues that I want to solve as well including but not limited to:
1. If you `ctrl+c` during something on TUN/TAP interface
2. Interface does not go down and can stall the system for some reason if you do `ifconfig delete tap0` for instance
3. Driver needs to be assigned dynamically
4. OpenVPN seems to run at 99% CPU usage

I am not particularly worried about issue 1 since that doesn't seem to affect too much to begin with but problems 2 and 3 are of concern since they should be done before my time at GSoC is over. Unfortunately with problem number 4, that's going to require a deeper dive into OpenVPN source code to find where it could be more efficient with the operating system which I don’t know I’ll have the time for.

I am happy to share that my project has made some really big progress, even if it brings up some more issues in the process but I felt that I was stuck in a rut with this project for a while so progress is progress! Thank you for reading my blog post and as always if you have anything to say then I would be happy to read it in the comments :)


