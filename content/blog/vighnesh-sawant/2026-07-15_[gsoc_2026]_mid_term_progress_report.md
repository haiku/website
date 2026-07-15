+++
type = "blog"
title = "[GSoC 2026] Modernizing Haiku’s Bluetooth stack: Implementing support for HFP profile - Mid-Term Progress Report"
author = "vighnesh-sawant"
date = "2026-07-15 20:02:12+05:30"
tags = ["haiku", "software"]
+++

# Introduction

Hello again! It has been a fun journey since the beginning of GSoC. My project focuses on modernizing Haiku's Bluetooth stack, specifically adding support for the Hands-Free Profile (HFP). HFP is a profile that allows operating systems to interact with Bluetooth audio devices, such as headsets, for two-way voice calls and audio streaming. Today, I'll be sharing a progress report on the work I have completed till now, and will outline my plans for the remainder of the project.

# Progress So Far

A significant portion of my work has been dedicated to laying the groundwork for the HFP profile. Because Haiku's Bluetooth stack previously lacked the necessary transport layers for real-time audio, I had to implement several underlying protocols. Here is a breakdown of the changes I've made:

* **USB and Driver Support (Isochronous Endpoints)**: I started off by adding support for isochronous USB endpoints to the `h2generic` Bluetooth driver. Isochronous transfers are critical because they guarantee bandwidth and timely delivery of data, which is a requirement for streaming real-time audio. Following this, I implemented SCO (Synchronous Connection-Oriented) handling within `h2transactions`, along with the proper scheduling mechanism..
* **Kernel Hooks**: I added the necessary hooks for SCO and HCI (Host Controller Interface) commands.
* **Protocol Implementations (SCO and RFCOMM)**: I successfully added the core implementations for both the `SCO` and `RFCOMM` protocols. 
* **RFCOMM** provides an emulated serial interface over L2CAP. It serves as the control channel for many higher-level profiles, including HFP.
* **SCO** handles the actual low-latency audio transmission needed for voice calls.

# What's Next?

### Short-term Goals: Serial Port Profile (SPP)
The Serial Port Profile sits on top of RFCOMM and provides a standard way to send and receive data.
* **Implement SPP API**: I will be implementing the JSR82 API methods for SPP in the Bluetooth kit.

### Implementing the Hands-Free Profile (HFP)
The remaining time will be fully dedicated to implementing the HFP profile itself:

* **Service Discovery Protocol (SDP)**: I will set up the SDP server to actively advertise the HFP profile so that devices know Haiku supports it. Conversely, I'll configure the SDP client to find Hands-Free units (like headphones) and integrate this discovery flow into the `bluetooth_server`.
* **AT Commands and State Machine**: HFP relies heavily on AT commands to negotiate features such as answering calls, hanging up, or adjusting the volume. I will implement a basic parser for these AT commands alongside an HFP state machine to keep track of the connection state.
* **Hardware Testing**: I will test this with actual headphones.

# Conclusion

Thank you to my mentors, and the Haiku community for their continuous support and guidance.
