+++
type = "blog"
title = "[GSoC 2026] Expanding the functionality of the Haiku Devices Application"
author = "aquamatic123"
date = "2026-05-07 22:10:41-04:00"
tags = ["haiku", "software"]
+++

# Introduction
Hello! My name is Leo Rouleau, a first-year software engineering student at Polytechnique Montréal. I chose to apply for Haiku because of my interest in lower-level programming and operating systems. Having worked on projects involving microcontrollers and custom interpreters in C, C++, and Java, I've found systems-level development to be the most engaging challenge.

# Project Overview
Haiku’s current Devices application provides a basic list of connected hardware, but it lacks the features necessary to function as a true management utility. This project aims to transform Devices into a full-fledged hardware manager, allowing users to view detailed technical specifications and perform administrative tasks directly from the GUI.

# Goals

## Driver mapping
Display the active driver module name and its absolute path for the device (/dev). 

## State management
Implement a graphical toggle to block or blacklist drivers with warnings for system restarts

## USB and Bluetooth support
Increase the application’s ability to inspect dynamic buses. For example, USB devices will display deep interface descriptors and HID report formats, and Bluetooth would automatically be populated correctly within the tree.

## Compatibility Report
Develop a serialization logic to export the system’s hardware tree into a standardized report.

## Bug Tracker
Create a shortcut to open the Haiku Trac bugtracker with a report containing the hardware specifications of a selected device.

# Conclusion

This was a blog to introduce myself to the community and the project I will be taking on this summer for GSoC 2026.
Thank you for reading! 
