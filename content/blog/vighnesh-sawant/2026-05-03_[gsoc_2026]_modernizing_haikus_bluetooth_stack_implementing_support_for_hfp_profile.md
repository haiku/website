+++
type = "blog"
title = "[GSoC 2026] Modernizing Haiku’s Bluetooth stack: Implementing support for HFP profile"
author = "vighnesh-sawant"
date = "2026-05-03 12:07:41+05:30"
tags = ["haiku", "software"]
+++

# Introduction

Hello! I am Vighnesh Sawant, a first year Computer Science undergrad at the Indian Institute of Technology, Madras (IITM).  
I have contributed to the bluetooth stack before GSoC a little, enabling pairing with most bluetooth devices (before you could only really pair with Bluetooth 1.0 devices) 
although the implementation is not quite polished yet. Little trivia, my first patch to Haiku ended up breaking DNS resolution on nightly (sorry waddlesplash and Jerome!).  
I'll be working on implementing support for the HFP profile in Haiku's bluetooth stack, which enables audio streaming and
hands free voice calls while also laying the groundwork for further improvements of the bluetooth stack.
I'll be mentored by waddlesplash and scottmc.

# Project overview

Currently Haiku's bluetooth stack only handles pairing of devices, there are no profiles implemented. 
That is you can pair devices but would not be able to do anything with them.
It also lacks support for SCO (Synchronous Connection-Oriented) links which are necessary for low latency audio transfer.  
As part of this project I plan to implement SCO and RFCOMM support. RFCOMM is a profile that is a prerequisite to the HFP(Hands Free Profile) and also FTP(File Transfer Profile).
At the end of the project users will be able to use bluetooth earphones/headphones with Haiku.

# Goals

# Implement SCO support in the kernel stack
SCO (Synchronous Connection-Oriented) links are essential for low-latency audio transfer, implementing this will lay the groundwork required for implementing the HFP profile.

# Implement RFCOMM support
This is essential for the HFP profile and will lay the groundwork for a variety of other profiles like FTP, OBEX and others.

# Implement Serial Port Profile 
After addition of RFCOMM support this is a low-hanging fruit, also required for isolated testing of RFCOMM

# Implement the HFP profile for Bluetooth
HFP provides support for two-way voice calls and remote call control, like pickup call, cut call, increase volume, etc.

# Conclusion
Thanks everyone from the community for cheering us and looking forward to a productive GSoC.
