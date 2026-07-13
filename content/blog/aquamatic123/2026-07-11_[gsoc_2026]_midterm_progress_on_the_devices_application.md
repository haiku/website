+++
type = "blog"
title = "[GSoC 2026] Midterm progress on the Devices application"
author = "aquamatic123"
date = "2026-07-11 13:46:30-04:00"
tags = ["haiku", "software"]
+++

Hello Everyone! I have officially reached the midterm mark of my GSoC project, revamping the devices application. Over the past few weeks, I have made a couple of changes extracting more hardware information and presenting it cleanly to the user.

Here is a look at what has been accomplished so far.

## Extracting the device path and driver used

The first goal of my GSoC project was to determine which driver is loaded for a device, and display the device path as well if existent. To do this, I worked with the `device_manager` to get the driver path. I managed to get a hold of this in the app with a `dm_wrapper` call, and then display it in `DevicesView` by creating the devices with that new attribute. For the device path, I also used the `device_manager` to add the published path as an attribute, that would get fetched in `DevicesView` as well.

## A Cleaner Layout

I also had to make the device data easier to read. Previously, attributes were somewhat clumped together. I introduced a new tree-view layout that clearly separates Basic Information (like the device name) from the more advanced attributes. 

Building on that UI improvement, I also modified how attributes are displayed. Instead of just dumping all attributes into a single list, the application now generates an expandable tree structure. It looks for attributes containing a `/` in their name and parses them into nested folders, making complex configurations much cleaner to navigate.

## Extracting USB and HID Descriptors

A major focus of the first half of this project was bringing the Devices app to include specific information like the command-line tool `listusb -v`. 

I implemented a new `BuildUSBTree` structure that maps a device to its hardware path (using a `BUSBDevice` object) and recursively goes through the configurations, interfaces, alternates, and endpoints of connected USB devices. This allows the GUI to display almost all the USB attributes that a user would normally need the terminal to see.

I also added support for fetching HID report descriptors. When the application detects a class 3 (HID) USB device, it fetches the size and data of the HID report. Currently, the raw descriptor is appended as a string attribute. Fully parsing this data would probably require the use of the kernel's `HIDParser` or using an external library like `hidapi`, so I am leaving the actual parsing as a TODO for now, but the raw data is being pulled!

## Bringing Bluetooth to the Devices App

The latest feature in the works is adding support for scanning and identifying Bluetooth hardware. 

I have created a new `DeviceBluetooth` class and implemented inquiry scanning using `DiscoveryAgent` and `DiscoveryListener`. The application is now able to update the device outline when new remote Bluetooth devices are discovered in the area as well as the Bluetooth controller.

This specific pull request is still pending while we discuss the final design direction. We are currently deciding whether the Devices application should display all discovered remote Bluetooth devices, or if it should only display the local Bluetooth controller itself. Either way, the work for Bluetooth detection in the application is fully functional. The other GSoC contributors are also working on the Bluetooth stack, so this is subject to change.

## Next Steps

The next phase of this project will focus first on driver control, so blocking/disabling the driver of devices. After that is done, I will finalize this project by implementing a compatibility report for devices. I will also make sure everything is correctly implemented and fix bugs if necessary.

Thank you to everyone who has helped review these patches so far, and a huge thank you to my mentors, KapiX and Korli!
