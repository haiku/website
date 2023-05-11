+++
type = "blog"
title = "[GSoC 2023] VPN Support Project | Haiku Project"
author = "Pairisto"
date = "2023-05-08 21:32:20-05:00"
tags = ["haiku", "software"]
+++

## About Me
Hello everyone! My name is Sean Brady, and I am currently in my Sophomore year at Oregon State University studying Computer Science. In early January of this year, I decided to become a contributor for a Google Summer of Code (GSoC) project focused on operating systems where I researched Haiku and its projects which interested me and the VPN Support Project in particular. From what I can tell, interest in bringing a VPN to Haiku has been in the works since the BeOS days and more recently the `tun.cpp` file about 4 years ago.

For reference, I also go by Swangeon on [Github](https://github.com/Swangeon).

## Current Goals
Here are the plans I have to achieve certain goals that I have for the project. As this is just the start of everything, they are subject to change as I go forward with the project.

### TUN Virtual Driver
The first part of the project that I have planned is the development of the TUN virtual driver which is used by VPNs to connect to remote servers. I want to use the `tun.cpp` file as a base for the TUN/TAP virtual interface that will also take inspiration from the `loopback.cpp` file since a loopback device is also a virtual device interface. However, the driver module does not have any way to receive data so that will have to be implemented through the `net_buffer` library.

Unit testing on this front will be a combination of `ifconfig`, `route`, and `ping` with a virtual network I have set up to test if the driver is functioning properly.

### VPN Implementation
Once done with the TUN virtual driver, I will then be moving onto the OpenVPN port which will be implemented through a recipe for any required packages and any changes needed to the source code to be able to find and use the TUN virtual driver.

I will most likely be porting over OpenVPN as that runs in userspace and for the most part I only have to deal with the interaction between the application and TUN virtual driver.

## Conclusion
Thank you to Google for hosting GSoC and my mentors, Scottmc and Korli. As I go about the project I will be trying to post my progress on everything at least once a month but I do want to try posting updates bi-weekly. Looking forward to working with my mentors and the community!

