+++
type = "blog"
title = "[GSoC 2026] Modernizing Haiku’s Bluetooth stack: Implementing support for HFP profile - Progress Report"
author = "vighnesh-sawant"
date = "2026-08-21 23:34:07+05:30"
tags = ["haiku", "software"]
+++

# Introduction

The goal of this post is to document the changes I made during the GSoC period and the current state of the project.
I would also like to thank waddlesplash for his continued support throughout the project.

# Progress So Far

## RFCOMM Protocol
RFCOMM is now almost ready to be merged. It acts as the control channel required by HFP.

The implementation includes:

* RFCOMM socket addressing and connection management
* DLCI multiplexing over a shared L2CAP connection
* SABM, UA, DM, DISC, and UIH frame handling
* MCC commands
* Credit-based flow control

## USB and xHCI Improvements

During implementation, I found that the xHCI driver assumed all isochronous packets had the same size, which is not always true.
The xHCI driver now supports variable-length isochronous packets and processes completed transfers in FIFO order instead of LIFO order.

## Bug Fixes

A part of this period was spent fixing issues in the existing Bluetooth stack.

The main fixes include:

* Correcting ACL packet splitting when packets exceed the L2CAP MTU.
* Holding socket references while working on them.

Related changes include the [L2CAP refactor](https://review.haiku-os.org/c/haiku/+/11181),[send-status fix](https://review.haiku-os.org/c/haiku/+/11201), [socket lifetime changes](https://review.haiku-os.org/c/haiku/+/11531), and [MTU packet fix](https://review.haiku-os.org/c/haiku/+/11589)

## Media Stack Fixes

While working on Bluetooth audio integration, I found some bugs in the media stack.

After initial work, waddlesplash took over these changes and implemented the actual changes. The improvements landed in the [media auto-stop change](https://git.haiku-os.org/haiku/commit/?h=hrev59998&id=029b1139456a1b14fa2a10bda70dd064fd0084c9)
and the [live output reconnection change](https://git.haiku-os.org/haiku/commit/?h=hrev60005&id=12dd26265e29f7fe0151031205fe3aef9ccf2d30).

## Hands-Free Profile

The first pass for HFP is done.

It includes:

* Hands-Free service discovery through SDP.
* HFP session management.
* Basic AT-command parsing.

The implementation is functional but work is needed to split the changes, getting it reviewed and making it merge ready.

## Bluetooth SCO Media Add-on

The Bluetooth SCO Media Kit add-on has also been implemented.

It discovers Bluetooth audio devices, exposes them through the Media Kit, and creates media
nodes for headset playback and capture.

It includes:

* Bluetooth headset discovery.
* HFP state monitoring.
* SCO audio connection setup.

This change is in the same state as HFP.

# What’s Next?

Splitting the pending changes into small reviewable chunks and getting them merged.

# Conclusion

There has been a lot of progress in getting the bluetooth stack HFP ready.

RFCOMM and SCO is almost merge-ready.

The primary remaining task is organizing the HFP and media changes into smaller patches so they
can be reviewed and merged.

Thank you again to waddlesplash for his guidance, support, and feedback throughout this project.
