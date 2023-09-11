+++
type = "blog"
title = "[GSoC 2023] VPN Support Project Final Report"
author = "Pairisto"
date = "2023-09-10 23:29:07-05:00"
tags = ["haiku", "software"]
+++

## Project Overview
This project, undertaken as part of Google Summer of Code 2023, sets out to implement a robust TUN/TAP driver for Haiku given the increasing demand from the community for a virtual network kernel interface. This project allows for VPN software and other network-related utilities that work with TUN/TAP driver to operate seamlessly on Haiku. Throughout the project's duration, I've documented the rationale behind key design decisions, and offered insights on the interplay between the TUN/TAP driver and Haiku's unique networking architecture in my series of seven progress blog posts. For those interested in trying out the TUN/TAP driver on Haiku (when the code is merged, more on that in a different section), you can use the port of OpenVPN that was made on haikuports [here](https://github.com/haikuports/haikuports/tree/master/net-vpn/openvpn). One last thing to say is that I could not get the TUN interface to work properly due to a lack of Point-to-Point being supported by Haiku but TAP works for both the interface and driver.

## What Was Done
1. Added the TUN/TAP driver and interface are in a state that works for tunneled networking communications over TAP (explained why TUN can't be used in the next section).
2. OpenVPN was ported over and modified to work on Haiku to work with the TUN/TAP driver created.

## What's Left To Do
1. Add dynamic driver loading so that we do not have a static devfs entry for the driver.
2. Finish the Point-to-Point Protocol implementation for the OS to get the TUN functionality for the interface working as there is no way to do the routing needed for TUN to work properly with an application.
3. Add a separate function for ethernet bridging for the driver.

## What Have I Learned
This summer taught me way more about programming concepts that I never really encountered before like mutexes, semaphores, condition variables,  networking, driver development, and even how to make my workflow more efficient and so much more than I thought it was ever going to teach me.

Kernel and system software development have been central to my project as it involved delving deep into thread safety mechanisms, how to write implementations of the common driver I/O functions for a driver, and understanding the intricacies of how an operating system's network stack functions and subsequently designing an interface to complement it.

On the debugging front, I acquired significant insights into addressing kernel panics and anomalies in the driver and interface behavior. This was achieved through innovative use of tools like `ghidra` and methods such as inserting debugging statements, especially given the absence of a robust debugger in our environment.

Another pivotal aspect of my experience was navigating and analyzing undocumented code, primarily from OpenVPN for application testing and from Haiku for driver development. This analytical process not only aided in problem-solving but also inspired me to pen down seven blog posts, capturing and documenting the solutions I discerned.

## Code Submitted
My main TUN/TAP driver/interface commit has yet to be pushed upstream due to waiting on feedback from one of my reviewers but from what I can tell it is mostly ready to be pushed. the commits that I have made are:
1. [Main Driver/Interface Commit](https://review.haiku-os.org/c/haiku/+/6608/)
    1. [Indirect Ancestor to add to build definitions](https://review.haiku-os.org/c/haiku/+/6898/2?usp=related-change)
2. [WIP Documentation for the Driver and Interface](https://review.haiku-os.org/c/haiku/+/6904/1?usp=related-change)
    1. Here is where you can find the documentation for the driver along with how to use it via OpenVPN though it is still in a heavy work in progress

## Usage
If you want to use my code now you can get it [here](https://haiku.movingborders.es/testbuild/I19f37ef75250526d7a7f9e254fd0bf3693582c92/2/hrev57265/) as it's not pushed to the nightlies yet, but whenever it does get pushed in the future then one of the best ways that I have found to test it is using OpenVPN. You can installing it by using `pkgman install openvpn` and once installed you can navigate to this link [here](https://openvpn.net/community-resources/how-to/#setting-up-your-own-certificate-authority-ca-and-generating-certificates-and-keys-for-an-openvpn-server-and-multiple-clients) from OpenVPN to help with setting up the environment. You can do either a Haiku to Haiku connection or Haiku to Linux connection, all up to you.

## Acknowledgements
Greetings once more, everyone! I've now reached the final evaluation of my GSoC Project, which centered on adding VPN support to Haiku. I'm deeply appreciative of this unique opportunity and the incredible support from this vibrant community that made tackling complex issues much easier thanks to your collective insights. A big thank you to my mentors, scottmc and korli, who played pivotal roles in my learning journey. Additionally, I want to acknowledge community members augiedoggie, pulkomandy, Begasus, x512, OscarL, axeld, and Waddlesplash for sharing their invaluable knowledge whenever I encountered challenges. Whether it was on the IRC or Mailing List, I still would not have been able to do it without all of you.
