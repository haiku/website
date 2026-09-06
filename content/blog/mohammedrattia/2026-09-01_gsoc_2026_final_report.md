+++
type = "blog"
title = "GSoC 2026 Final Report | Modernizing Haiku's Bluetooth Stack: HID Profile Implementation"
author = "mohammedrattia"
date = "2026-09-06 15:00:24+03:00"
tags = ["haiku", "software", "gsoc", "gsoc2026", "bluetooth", "hid", "input", "drivers"]
+++

Hello! Finally, GSoC is done for me. This is the final report for my project. The project was focused on improving the Bluetooth stack and making it useful. Hopefully, the Bluetooth stack is now in a much better state than before GSoC 2026. It still needs much work to be fully developed. However, currently Bluetooth mice and keyboards are functioning. In addition, the core of the stack is ready for implementing other profiles.

This report will include the following:
1. Project Overview
2. What I Did
3. Future Work
4. Conclusion

# Project Overview
## The State of Bluetooth on Haiku Before GSoC 2026
Although the Bluetooth stack was outdated (based on version 2.0 and 2.1 of Bluetooth) before GSoC, it contained many core components that helped us focus less on starting from scratch and more on making the already built stack useful. However, that's true only for BR/EDR (Basic Rate / Enhanced Data Rate) Bluetooth, not Low Energy Bluetooth, which isn't implemented yet in Haiku.

The BR/EDR Bluetooth core stack is divided into several core modules that provide services for the Bluetooth profiles, which in turn provide services to users like human interface devices, audio, file transfer, etc.

Some of those core modules and their state in Haiku are:
- **L2CAP:** Functional, but needed some fixes.
- **HCI (Host Controller Interface):** Functional, but on an old Bluetooth version, as stated above.
- **Transfer Layer (h2generic):** Functional, but required further extension to cover vendor-specific devices.
- **Preferences Application:** Functional, but it lacked some features, such as changing the Bluetooth friendly name, canceling inquiry and pairing, and adding devices to a block list.
- **Security Manager:** Not complete; it's blended into the Bluetooth Server, and most of its functions were missing.
- **Service Discovery Protocol (SDP):** Not implemented.

The state mentioned above meant the Bluetooth stack couldn't yet offer much practical functionality to users, because none of the Bluetooth profiles were implemented. In addition, the stack couldn't handle modern commands of BR/EDR.

## The Main Objective
I'll talk briefly about the objectives of the project. For more details, please refer to my first blog post on GSoC here: [GSoC 2026: Bluetooth HCI Improvements & HID Profile | Haiku Project](https://www.haiku-os.org/blog/mohammedrattia/2026-05-03_gsoc_2026_bluetooth_hci_improvements__hid_profile__haiku_project/).

My focus was to make the Bluetooth stack more stable and useful to Haiku users. First, to make the stack more stable, the HCI needed modernization, as many security features and mandatory commands were not supported. In addition, the Bluetooth stack didn't save any device data to survive reboots. So, the second objective was to implement Link Key storage and management. Moreover, Haiku lacked an SDP client to discover the services that other devices offer. SDP is a critical step before implementing any profile. Thus, it'd both make the stack stable and prepare it to be useful. Finally, to make the stack useful, I planned to implement the Human Interface Device (HID) profile. The HID profile imitates the USB HID specification to handle peripherals like mice, keyboards, and joysticks.

## Achievements
I'm happy to say I finished most of the main goals of the project. Here's a brief overview of what has been done before going into the technical details:
### 1. HCI Commands and Events Completion
I worked through the HCI ICS provided by Bluetooth to fulfill the mandatory commands. I didn't go through the entire document, but I verified a great deal of it to meet the BR/EDR Bluetooth requirements. I stopped here to prioritize other, more important objectives.
### 2. Link Key Storage
This was implemented and it's working normally. However, to implement Link Key storage, I needed to refactor the connection logic in the Bluetooth stack, which is the next achievement.
### 3. Connection Refactor
Most of the connection logic was being handled by the preferences application via the Bluetooth kit. Consequently, the Bluetooth Server didn't know anything about remote devices. I moved the logic of connection commands into the Bluetooth Server. In addition, I moved the saved data about remote devices into the Bluetooth Server, so it can be used as a single source of truth by the kit.
### 4. SDP Client
As mentioned above, the SDP client is important for service discovery of remote devices. After the connection is complete, the SDP client is used to query all services of the remote device and store them in the server.
### 5. HID Profile
This is a component of the Bluetooth Server that's responsible for initializing the L2CAP channels and the Bluetooth HID input driver.
### 6. Bluetooth HID Input Driver
This driver receives the data from the L2CAP channels (mainly the interrupt channel), then hands it to the HID Parser to follow the normal input path, the same as USB devices do.

# What I did in depth
Before digging into the details, the following diagram shows the important Bluetooth stack modules I worked with. Components with a green border are ones I either introduced to the stack or improved.
![Architecture Diagram of Bluetooth Improvements](/files/blog/mohammedrattia/arch_diagram.png)

## HCI Completion and Connection Refactoring
### HCI Reviewing
When I started preparing my proposal, I always referred to [Bluetooth Specification Version 6.1](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-61/out/en/index-en.html). Thus, I stuck with that version of Bluetooth while reviewing the commands and events. To make the process consistent, I referred to the [HCI Implementation Conformance Statement (ICS)](https://files.bluetooth.com/wp-content/uploads/dlm_uploads/2026/05/HCI.ICS.p34.pdf), which simply states which commands are mandatory, optional, etc. I started filling in the unimplemented mandatory commands and events. Two important commands I introduced are cancel inquiry and cancel connection.

Users had to wait for the inquiry timeout without being able to cancel it, even if the device they were searching for had already been found. Introducing cancel logic made this much more convenient. Currently, users can cancel an inquiry at any time, or simply close the inquiry window and it'll cancel the inquiry in turn. The following GIF shows the inquiry process in action.

![inquiry process](/files/blog/mohammedrattia/inquiry.gif)

Unfortunately, I wasn't able to review all the commands and events in the ICS. I'll try to mention the remaining parts in the Future Work section below, for future (or maybe for future me) contributors to refer to.

### Connection Refactor
#### Moving Connection Logic to the Bluetooth Server
One time, while I was trying to connect my phone to Haiku, it didn't respond for some time. Then, I found out that the preferences application had frozen for some time. My phone's Bluetooth was off, which caused Haiku to wait for the connection timeout while it tried to connect to the phone. However, the old connection handling lived in the Bluetooth kit, which was used directly by the preferences application. It was one function that sent a connection command to the Bluetooth server, waited for a response, then sent authentication, and waited for a response again. That meant the preferences application wasn't able to perform any other action while waiting.

Of course, it wasn't easy to just use asynchronous messaging, because the Bluetooth Server didn't have any saved information about the devices being connected. It was just handing out the commands to the kernel. That meant it wouldn't know what to do with the connection responses from the Bluetooth chip. Sending everything to the preferences application wouldn't be a good solution here, because the Bluetooth stack should support third-party applications in the future.

To solve this issue, I moved the connection logic and data to the Bluetooth Server. Then, I introduced a notification method to inform applications that need to know about changes happening in the server. This notification method can be used in the future for any other case where the Bluetooth Server needs to inform applications about a change.

After that, I refactored the Remote Device View to have three buttons: pair, disconnect, and connect, as shown in the following GIF. Each button is only enabled when applicable, which can help prevent incorrect commands and inform users about the state of the remote device without the need for other UI components.

![remote device connection](/files/blog/mohammedrattia/connection.gif)

### Link Key Storage
After moving the remote device data into the Bluetooth Server, it became easy to save them into a file in the user settings to keep pairing after a reboot. The Link Key storage still had some edge-case issues because not all link keys are the same. I may improve this later on; however, it functions normally. I used BMessage to save the data, then wrote it to a file, the same way settings are handled in other applications.

## Discovering Devices: Implementing the SDP Client
### SDP Client
The SDP client works on the L2CAP protocol, so I used socket programming to handle connections and requests. SDP's payloads are a stream of data that have custom specs for data elements. They should be read and written carefully to ensure correct communication. I built an `SDPDataIO` class for reading and writing data types into a buffer. Then, I used it in `SDPClient` to request the services from the remote device and parse the response. SDP specs have several ways to request services. I just implemented a function that gets all services from the remote device, so the rest can be handled inside Haiku. Other request types can be introduced later; I made sure it's easy to extend the client in the future by splitting logic when needed. As for parsing, I didn't completely parse the services, because it'd be a waste of computational power. Mobile phones, for example, provide lots of services, and services form an n-ary tree, so it can be very complicated. Thus, I parsed the services and their attributes, so each profile can use the SDP client again to parse its own service when notified later on. The following image shows a parsed payload of a Bluetooth mouse.

![Bluetooth mouse parsed services](/files/blog/mohammedrattia/SDP_parsed_services.png)

### Profiles Notifying
After querying the services, the Bluetooth Server uses the same class to notify the implemented profiles about the device found. Until now it only notifies the HID profile I made; however, it can easily be extended to notify other profiles in the future.

## Building the HID Profile
The Bluetooth HID profile imitates the USB HID specification, which makes it easier to integrate the profile into Haiku's input stack. However, initializing the driver and receiving the packets work differently. Thus, those are the two main things I've done to implement the profile.

To initialize the Bluetooth HID device, I used the SDP client to get the HID descriptor, which is a payload specifying how packets should be parsed. Then, I implemented logic to handle control and interrupt channels over L2CAP as both server and client. As stated in the HID profile, the device that initiates the Bluetooth connection should be responsible for connecting to the other device as a client. After getting the descriptor and both sockets, I sent them down to the kernel via `ioctl()` through a device node I made to handle Bluetooth HID device initialization.

Then, the kernel's Bluetooth HID input driver I made handles the rest of the work. It hands off the HID descriptor to the HID Parser and initializes the device handlers. It also gets a copy of the sockets to use them in the kernel. The flow of data then goes from L2CAP to the driver, then up into the Input Server's normal input flow.

After implementing the driver, the mouse worked normally. However, keyboards drop some packets while in use. I have yet to figure out why this issue happens with the keyboard, but it seems to be something that needs refactoring in the HID stack, as waddlesplash suggested.

<video src="/files/blog/mohammedrattia/hid_mouse_working.mp4" controls="controls"></video>

## Challenges That Faced Me
I can't list all the challenges that faced me during the months from the start of preparing for GSoC in February 2026 until now. However, I'll list the most important ones I can remember, along with how I solved them. I believe this may help future contributors facing the same challenges.
### Reading a Professional Codebase
GSoC was the first chance for me to get hands-on experience in a large professional codebase. Reading code snippets written by others is much easier; I do this a lot in competitive programming. However, I used to read the whole code to understand it, which can never happen in a large codebase. I tried, at first, following functions to understand the what they do, but most of the cases I ended up reading irrelevant files far from my goal. Because many utilities and data structures have it's own classes implemented in Haiku, I felt like I don't read C++ anymore.

Finally, I decided to focus on small FIXME or TODO items and start solving them first. It was a much better path. I improved a function in the Media Player. My code had many issues, but I fixed it until it got accepted and merged upstream. Máximo helped me a lot during this first commit, and even told me how to make a unit test for my function in Haiku's tests.

After that, I decided to work on the Bluetooth stack. I started doing the same in the stack: looking into a specific module, reading its code to know how things work, and noticing when I got out of the module. However, the Bluetooth stack was closely related, so I used another method alongside the former one. Sometimes I was following a data flow to find where things end up, from kernel up to userland, or the other way, from userland down to the kernel. I used to take a lot of notes to remember what I read.

Hopefully, the hard work paid off, and I was able to write some sort of documentation about the current state of the Bluetooth stack in my proposal.

### The Bluetooth Specifications
Bluetooth specifications are simply huge. It's thousands of pages that provide all the details about implementing Bluetooth in both chips and hosts (operating systems). It's hard to know where to start reading into it, especially when you don't know the terminology. I didn't write about it in my proposal until PulkoMandy told me that the proposal captured the current state very well but lacked details about Bluetooth itself.

I followed two paths to be able to dig down into the details of the specs. First, I tried to map the already implemented modules in Haiku to their part in the specs. For example, it's easy to know that L2CAP is implemented, so I needed to look into its specs in Volume 3, Host, Part A. Another method was to look for the architecture diagrams in the specification. Architecture diagrams give a big picture of how Bluetooth components and modules work together and the role of each one of them. Then, I could look into the codebase to know if this part is implemented.

After some days, I was able to write several pages in my proposal about Bluetooth and how it works together.

### Kernel Panics (a lot of them)
Before GSoC, I thought that linker errors were the most horrifying errors that one can find. However, that changed when I faced my first kernel panic. Kernel panics are just scary. They seem less scary now, as I got used to them, but they're still the scariest thing I've had to deal with so far, in my opinion. I'll write about some types of kernel panics I faced and how my mentor guided me through debugging them.

I don't remember all the kernel panics I got, but some of them are use-after-free, double lock, null pointer usage, and page fault. At first, finding the system frozen with very few commands to run in the Kernel Debugging Land (KDL) gave me few options to work with. However, one time I faced a kernel panic related to connection handling in `BTCoreData`. My mentor, waddlesplash, told me that I could attach the virtual machine to GDB, then debug it there. However, it was easy to catch this one just by looking into the functions in the stack trace, so I didn't bother debugging using GDB.

Then, along the project, I faced several other kernel panics that I needed to debug to progress through the project. I always referred back to waddlesplash, and he was always there to help. I learned several ways to debug. First, I could put print statements or even `panic()` into the places I suspected in the code, then build `haiku.hpkg` and install it. It updated the system with my patches, so I could find out the issue and patch it. I used this method a lot; it was very simple and very efficient.

Second, I could use GDB, as mentioned earlier. GDB gave much more control and dynamic information about data, but I wasn't very proficient with it. Another trade-off of using GDB is the long time it takes to set up. I would easily spend several minutes just trying it once before the panic occurred, and then I'd need to redo all of it again. I used it mostly for dealing with use-after-free panics, because the stack trace doesn't help here. The real issue in a use-after-free panic happens before the panic occurs, so I needed to stop the system before the object was destructed.

The third method I used, which was specific to network debugging, was Wireshark. I learned a lot of useful information simply by observing whether Bluetooth packets were working correctly or not.

### Driver Development
This wasn't a big challenge I faced, but rather a new way of programming I learned. Developing the Bluetooth HID input driver wasn't easy. I learned driver development by reading other input drivers and asking my mentor. Fortunately, `bluetooth_hid` was very much like `usb_hid`, so I could learn how to deal with the life cycle of the driver from there. After a while, I could navigate it very well and introduce new solutions into `bluetooth_hid` that aren't in the other input drivers, such as injecting data using `ioctl()` calls.

# Future Work
## Bluetooth Low Energy (BLE)
BLE isn't implemented in Haiku at all right now. Even though it shares some of the lower layers with BR/EDR, BLE has its own connection model, advertising, and GATT-based service discovery, so it would need a good amount of its own implementation rather than reusing what I built this summer. This would open up support for a much wider range of modern peripherals, since a lot of newer accessories are BLE-only.

## Introduce Other Profiles
Even when a generic radio successfully connects and pairs with a remote device, Haiku still can't make use of that connection unless the right profile is implemented. This is because the stack needs the specific Bluetooth profile, such as HID for input or A2DP/HFP for audio, to negotiate the right service channels and translate the incoming Bluetooth payloads into something the rest of the system can use. HID is done now, but audio profiles like A2DP and HFP are still missing, and they'd be a good next target since the SDP client and connection handling are already in place to support them.

## Supporting Vendor-Specific Dongles
Currently, the Bluetooth stack is unable to communicate with non-generic Bluetooth dongles, because it lacks the architecture to send proprietary firmware to the hardware during initialization. Testing on a virtual machine revealed that, despite having the ability to communicate with a RealTek dongle after Linux uploaded its firmware, Haiku can't independently use that same hardware on a bare-metal machine. Fixing this would need a way to detect the vendor and chipset, then upload the matching firmware before HCI initialization.

## Moving HID Parsing Out of the Kernel
As I mentioned earlier, keyboards currently drop some packets while in use, and waddlesplash suggested this might be related to how HID parsing is done in the kernel. Moving the HID parsing logic into userland could make the whole input path more robust, and it would also make it easier to debug issues like this one without needing to deal with kernel panics every time something goes wrong.

## Make a Separate Bluetooth Security Manager
As mentioned in the overview, the Security Manager doesn't have its own module right now; it's blended into the Bluetooth Server. Although important security commands and events (like Simple Secure Pairing and IO Capability) are currently supported, giving the Security Manager a dedicated module would make it easier to properly change the authentication state as needed for each profile. For example, SDP doesn't require encryption, while the HID profile enforces it. However, this refactor isn't urgent.

# Conclusion
Finally, I'm glad I had this opportunity working in Google Summer of Code 2026 on Haiku, and I'm glad to be part of Haiku's community. It was a great experience that I learned a lot throughout the journey. I plan to continue contributing at a lower pace when I have time, mostly on things related to Bluetooth. Maybe someday I'll have the time to be a consistent open-source contributor.

## Patches I made
Over the course of the project, I ended up with 18 patches merged upstream and 2 more still under review. Rather than listing them all here, you can find the full list on my [Gerrit](https://review.haiku-os.org/q/owner:mohammedrattia@gmail.com).


## Acknowledgements
- waddlesplash, for helping me a lot every time I got stuck in the project. I really learned a lot from him, and I appreciate this.
- PulkoMandy, for reviewing my proposal while I was applying.
- Máximo, for reviewing my first commit.
- Kitsune, for asking about my project several times during the process.
- GSoC Admins, for organizing Google Summer of Code.