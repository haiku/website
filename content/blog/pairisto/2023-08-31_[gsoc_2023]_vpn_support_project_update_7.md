+++
type = "blog"
title = "[GSoC 2023] VPN Support Project Update #7"
author = "Pairisto"
date = "2023-08-31 20:10:19-05:00"
tags = ["haiku", "software"]
+++

## Where We Last Left Off
Last post, I left off on the problem where the select functionality was working but there are some problems as it works but not well as the average latency is above 2000ms and when using ping it drops more than 60% of packets on average. For two weeks I was working on this issue but I couldn't figure out what was wrong with select and given that I was coming up on the deadline of my project, I decided to go with a condition variable approach when reading data from the driver for both the application and interface side. For the application side, it does have a timeout on it so that write can also take place since OpenVPN uses select/poll which will check if both read and write can happen at the same time, and since I am blocking one of them, it would just infinitely block both operations until read was fine. While select functionality is something that should be implemented with the driver, timing was not on my side with this issue so for those who want to take more of a crack at finding out what the problem is, here was how I tested it:
- The main way I tested this issue was by setting up a OpenVPN client on Haiku and then trying to connect to a server instance of OpenVPN on Linux (since this select issue also happens when you run a server instance of OpenVPN on Haiku) 
	- From there, I use ping on both the client and server side to ping each other
- Another test to run if you don't have the ability to do the prior you can do `./openvpn --remote any.ip.addr.here --verb 9 --ping 1 --dev tap0`
- There are also the unit tests found in the OpenVPN repo [here](https://github.com/OpenVPN/openvpn/tree/master/tests) though some of them might require a client/server setup.

For the code I worked with that was producing this issue, you can find it [here](https://github.com/Swangeon/HCC/blob/main/select/select-implmentation.cpp).

## Looking Forward
Looking forward, I want to try and get my main commit [here](https://review.haiku-os.org/c/haiku/+/6608) through before I continue to add more features to the driver to setup a good base for those who will work on this project after me. I am also working on in-depth documentation about how the TUN/TAP Driver and Interface work for those same people who will be here after me. Other than that, however, have a working build of the dynamic driver loading feature that I talked about last time as well that uses the `devfs_rescan_driver` function has been the life saver for this feature to work and I am just on the feature of uninitializing the driver entry's in devfs. Ideally, for the future, after the TUN/TAP driver base commit gets accepted then I will immediately put the dynamic driver loading feature commit up to then get that feature on the driver.

Thank you all for reading all my posts over this summer and man, time goes by fast. I am so grateful that I got this opportunity and for you guys to be here along the journey with me. Will update for one last time about GSoC next week!
