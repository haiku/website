+++
type = “blog”
title = “GSoC Bluetooth Improvement Midterm Recap”
author = “mohammedrattia”
date = “2026-07-18 02:06:42+03:00”
tags = [“haiku”, “bluetooth”, “gsoc”, “gsoc2026”, “software”]
+++

Hello! The GSoC's midterm (at least for me) has just passed, so I thought of making a recap post about the improvements I've made so far. I’ll try to keep the post brief to make it easier for readers (foreshadowing: I realized that’s impossible :P). I’ve already posted an introduction about me and the project. You can read it [here](https://www.haiku-os.org/blog/mohammedrattia/2026-05-03_gsoc_2026_bluetooth_hci_improvements__hid_profile__haiku_project) if you haven’t already.

## Host-Controller Interface (HCI) Commands and Events
The Host-Controller Interface (HCI) is the specification for how the operating system (the host, in our case, is Haiku) communicates with the Bluetooth controller. The Bluetooth controller is basically the firmware on the Bluetooth chip. So, it’s vital to implement at least most of the mandatory HCI commands and events from the Bluetooth specification for Bluetooth to function properly. HCI commands and events were mostly outdated, dating back to version 2.0 or 2.1, so updating them was the first step to get the Bluetooth stack back to life.

The Bluetooth SIG provides an Implementation Conformance Statement (ICS) for HCI, which can be used as a checklist for what’s mandatory and what’s optional. So, I started by completing what Haiku’s Bluetooth stack lacked from the mandatory list. I’ll mention here the features that users will be using without getting into internal details, so please feel free to contact me if you want to know more.

### Set Friendly Name
Honestly… I personally don’t think this would affect the user experience that much, but it’s not me who decides anyway. It was mandatory in HCI, so I implemented it in the Bluetooth settings. Anyway, users can now set any name they want for their Haiku’s Bluetooth device. Thanks to Máximo for solving a crash this caused later on and to KitsunePrefecture for reporting the crash :)

### Cancel Inquiry
Discovering Bluetooth devices in Haiku wasn’t working before the GSoC application phase. It lacked the handling of critical events needed to understand modern devices. Some GSoC applicants had already fixed a great part of it during the application phase. However, it lacked both the logic and UI for canceling an inquiry, which is critical because Bluetooth devices don’t respond to anything by default for about 11 seconds until the inquiry finishes or they receive a cancel command. Thus, canceling an inquiry would be useful for:
(1) canceling early if you already found the device you want.
(2) canceling if you don’t want to continue the inquiry anymore.
(3) helping developers like me test features faster :D

### Connection Handling Refactor
Connection handling and the rest of the introduced features (except maybe the SDP Client) are part of the HCI commands and events. However, I’d prefer splitting things up.

#### Connection Cancel
At first, I didn’t know why this would be mandatory because the device was just connecting normally. Then, I tried to connect to my phone when its Bluetooth was off. The Bluetooth preferences just froze until the connection timeout, which took several seconds. Introducing a cancel button here wouldn’t solve the issue because I can’t press a button on a frozen window :P. Still, the button is necessary for the same reasons I mentioned in the inquiry section. Solving the freeze issue needed a large refactor in connection state management, which is the next part.

#### Remote Device State Management
Without going into details, a Bluetooth device from Haiku’s perspective can be either disconnected, connected, or connecting. Previously, the connection and authentication were put together in one function, and it was waiting for responses in the same function, which caused a UI freeze if the response was late. Connection isn’t a synchronous feature, so the logic was converted to: sending a connection command, then the local Bluetooth device would later inform the UI what happened to the connection without the need to wait. After that, the Bluetooth stack starts the authentication automatically, and similarly, the controller informs us later what happened.

This logic was easy to implement on Haiku's end without much refactoring, but the architecture didn't have the ability to route events initiated from the remote device (like remote disconnection) to the UI. So basically, if the remote device disconnected, the users would never know. Unfortunately, this one wasn’t that easy to make because:
(1) The bluetooth_server didn’t have information about remote devices.
(2) We can’t route this to Bluetooth preferences only, because many applications will be using Bluetooth later on.

#### A New Way for Notifying Apps
To solve this, I made a watching system to send notices to all applications that subscribe to the bluetooth_server. This helped move the connection handling into the server to make it more consistent. Now, the bluetooth_server knows which devices are disconnected, connected, or connecting, and which applications are interested in knowing the state changes of those devices. This refactor also prevented UI freezes because the preferences won’t need to wait to receive the response.

#### UI Connection Buttons' States
The UI had only pair and disconnect buttons; when I introduced a cancel button, I added state management for buttons to be enabled only when useful. Also, I saved the state of the remote device, so the preferences would only enable the disconnect button when the selected device is connected. Similarly, it would enable the pair button only when the device is disconnected, and the cancel button would be enabled only during the connecting phase.

## Link Key Storage
Link Keys are like internal passwords that Bluetooth devices share to recognize each other later. Haiku was just ignoring those, so a full connection flow with authentication was needed each time a device tried to reconnect. In addition, Haiku wasn’t saving any information about the remote devices. That meant a new inquiry was needed each time after closing the preferences app. So, after moving remote device management to the bluetooth_server, I made the Bluetooth preferences get the remote devices from the server when it opens; also, the server saves them into a file to load them when it restarts.

## Service Discovery Protocol (SDP) Client
For Bluetooth to be useful, it needs to know what services connected devices offer to use those services (this is done by the SDP client), or to answer requests about its own services (SDP server). Because the Bluetooth feature I am targeting in GSoC, HID (Human Interface Device), only needs the SDP client, I started making that. I’ve just coded the SDP client for a day or two, but the code still causes some problems, so it needs some time before merging.

## What’s next?
After finishing the SDP client, the next step will be to finally start making the HID Bluetooth profile.

## Conclusion
We haven’t fully covered all mandatory modern HCI commands and events yet, but we’re on good working ground (and here I am talking about BR/EDR, not Low Energy). Bluetooth devices can now be discovered and connected normally. Then, the SDP Client will allow Haiku to know what services other Bluetooth devices offer. Hopefully, after this summer, Haiku users will enjoy their Bluetooth mice and keyboards. Thanks for reading!