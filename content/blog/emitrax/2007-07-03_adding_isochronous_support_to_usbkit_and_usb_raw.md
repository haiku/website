+++
type = "blog"
author = "emitrax"
title = "Adding isochronous support to USBKit and usb_raw"
date = "2007-07-03T12:36:00.000Z"
tags = ["usb", "USBKit", "soc", "usb_raw"]
+++

Just to keep those of you interested updated, after discussing it with both my mentor and Michael Lotz, and after a very quick chat with Francois Revol, I am going to add isochronous support to both the USBKit and usb_raw driver. Meanwhile Francois, if time is on his side, should add isochronous support to his user space quickcam driver (see src/add-ons/media/media-add-ons/usb_webcam/). This way I can test my previous patches and perhaps everyone can start using his logitech quickcam with Haiku by using codycam. I don't know though for sure, what product id are supported.