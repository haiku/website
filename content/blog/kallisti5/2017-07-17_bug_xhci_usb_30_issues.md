+++
type = "blog"
title = "Bug: XHCI (usb 3.0) issues"
author = "kallisti5"
date = "2017-07-17 15:59:34-05:00"
tags = ["haiku", "software"]
+++

As we work to stabilize Haiku and move closer to the R1 beta releases, USB driver issues are becomming more apparent.

At the moment, bugs with our XHCI _(usb 3.0)_ stack are high on the problem list. New hardware is beginning to ship
with XHCI-only controllers, which means we can no-longer fall back to our stable EHCI _(usb 2.0)_ stack.

A large number of bug reports have been opened around these kinds of issues:

* [QEMU XHCI Devices not bootable](https://dev.haiku-os.org/ticket/13343) *Most issues seem to be linked to this issue*
* [XHCI: vm_page_fault on AMD x370](https://dev.haiku-os.org/ticket/13372)
* [USB3 - device does not enumerate](https://dev.haiku-os.org/ticket/13062)
* [Support for PCIe USB 3.0 Cards](https://dev.haiku-os.org/ticket/13056)
* [XHCI: crash in LinkDescriptioinForPipe](https://dev.haiku-os.org/ticket/12929)
* [XHCI page fault under skylake](https://dev.haiku-os.org/ticket/12885)
* [usb_disk: command status wrapper is not valid](https://dev.haiku-os.org/ticket/12860)
* [USB isochronous streams](https://dev.haiku-os.org/ticket/1045)

These XHCI bugs frequenctly result in the following issues on real hardware:

* Problems booting from USB drives
* Crashes transferring data over the USB bus
* Crashes and kernel panics at boot while Haiku examines the XHCI bus.

Work-arounds can be easy (booting from non-USB media), or extremely difficult.
New users checking out Haiku will likely encounter these bugs, and may get a bad first-impression of Haiku.

**Call to help**

If you knowledgeable in low-level USB hardware (or have developed USB drivers for other other operating systems such
as FreeBSD or Linux), we really could use a hand in reducing the overall number of XHCI-related bugs.

Solving just few of these issues will help propel Haiku to our first R1 release and beyond.

**Resources**

* [Compiling Haiku](https://www.haiku-os.org/guides/building)
* [Intel XHCI specification](https://www.intel.com/content/www/us/en/io/universal-serial-bus/extensible-host-controler-interface-usb-xhci.html)
* [Haiku: Submitting Patches](https://dev.haiku-os.org/wiki/CodingGuidelines/SubmittingPatches)

