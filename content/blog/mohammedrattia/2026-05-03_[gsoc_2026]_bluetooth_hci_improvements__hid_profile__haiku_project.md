+++
type = "blog"
title = "[GSoC 2026] Bluetooth: HCI Improvements & HID Profile | Haiku Project"
author = "mohammedrattia"
date = "2026-05-03 16:46:03+03:00"
tags = ["haiku", "gsoc", "gsoc2026", "software", "bluetooth"]
+++

Hello! I’m Mohammed R. Attia, a 2nd-year Computer Science Student. I’ve been accepted into Google Summer of Code (GSoC) 2026 with Haiku, with my proposal titled “Modernizing Haiku’s Bluetooth Stack: HCI Completion and HID Profile Implementation.”

## About Me
I consider myself a competitive programmer and a software engineer. I haven’t decided on a specific specialization in software engineering just yet; rather, I’m interested in systems development and low-level programming. You can check my GitHub for more information about my latest projects. I go by the handle mohammedrattia in many places on the internet, so feel free to reach out :).

### How did I get here?
I first learned about Haiku while searching for GSoC organizations to contribute to. It was my first time learning about a desktop operating system other than the famous trio: Windows, macOS, and Linux. So, I started by reading the GSoC guide and joining IRC. I remember that the process was smooth because the guide contained everything, and people on IRC were welcoming and supportive. Then, I started working towards building Haiku, and I got my first commit merged into Haiku after several days.

## Current Goals
The main goal of my proposal in GSoC is to modernize the Bluetooth stack. Currently, the Bluetooth stack in Haiku can’t communicate effectively with modern Bluetooth devices because of the outdated standards it uses. However, making the Bluetooth core perfectly align with modern standards won’t benefit Haiku users because it would still need a Bluetooth Profile to perform a useful task. One of the most common uses of Bluetooth is Human Interface Devices (HID) (e.g., keyboards and mice). Accordingly, this project will build the HID Bluetooth profile to provide useful functionality for Haiku users.

The following three sub-sections contain a brief specification for the goals of the project from my GSoC proposal.

### Modern HCI Event & Command Handling
Build upon the recent SSP/EIR groundwork by implementing the remaining missing HCI commands, which should fix core use cases of any Bluetooth system, including: inquiry, make discoverable, pair/forget, set local device, start/stop Bluetooth service, and connect/disconnect. This includes handling complex pairing edge cases, implementing persistent Link Key storage and retrieval (so devices do not have to re-pair on every reboot), and handling modern disconnection and timeout events gracefully.

### SDP client
After successfully pairing Bluetooth devices, the Bluetooth stack should be able to communicate with other devices to discover what services they can provide. That’s done using the Service Discovery Protocol (SDP), which is currently not implemented on Haiku (except for code that spawns a dedicated new thread for SDP). Implementing an SDP client is critical for any Bluetooth profile to work.

### HID Bluetooth Profile
This objective is to develop a working standard Bluetooth profile to make the stack useful for Haiku users. The primary target will be the Human Interface Device (HID) profile to support modern Bluetooth keyboards and mice. Implementing a profile would prove the stack’s end-to-end functionality by translating Bluetooth payloads into actual Haiku system input events.

For more information about the project please refer to my proposal at the following topic on Haiku's forum:
https://discuss.haiku-os.org/t/gsoc-2026-modernizing-bluetooth-stack-and-adding-hid-profile-3rd-offering/18924?u=mohammedrattia

## Conclusion
This was a brief blog post to introduce myself and my project to the community. Mostly, I’ll publish other posts to talk about the technical details of this. Finally, I’d like to thank Haiku’s community and developers for their support during the application process and my first contribution to Haiku, specifically nephele, waddlesplash, PulkoMandy, and Maximo Castaneda. I’d also like to thank phschafft for the cookies he gave people on IRC ;).

Thank you for reading!
