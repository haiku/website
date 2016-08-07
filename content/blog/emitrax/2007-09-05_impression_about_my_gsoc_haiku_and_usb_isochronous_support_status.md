+++
type = "blog"
author = "emitrax"
title = "Impression about my GSoC with HAIKU and USB isochronous support status"
date = "2007-09-05T13:32:07.000Z"
tags = ["usb", "gsoc"]
+++

During this summer I had the chance to improve myself, and work on the USB isochronous support of HAIKU. I wrote some code for every layer of the HAIKU USB stack: USBKit library, usb_raw driver, usb bus manager and most of all the uhci driver. I also spent/waisted some weeks with the usb_webcam media addon, but sadly with not success. Anyway here is what I did.

UHCI driver: Basically I added all the necessary code to handle isochronous transfer in both direction (in and out).

USB stack manager: As above, I added the necessary code to handle isochronous request plus a feature that was missing in the stack and I needed in order to use my webcam. Basically the possibility to choose a different alternate settings for an interface was missing. The code that implements this feature, along with some more code, is still hanging in my computer as it has not been reviewed yet. Not worries though, it will soon be included in the main tree.

USBKit library: Same here. I've added the code to submit isochronous request from user space and to set a different alternate settings. I also modified Francois utility (usb_dev_info) to display all the info about different alternate settings. This code is also still in my computer, but as I said, don't worry ;)

usb_raw driver: like you can imagine, I've added the necessary ioctl commands to handle both isochronous request, and alternate settings feature.

The main reason why some code is still not included in the main tree, it's because it breaks binary compatibility with the USBKit, as I added some more needed command to handle the alternate settings feature.

The most difficult part of my work was the testing as there was not working driver that uses isochronous transfers. I first tried with adding the support for my webcam to the usb_webcam media addon, but it turns out to be more difficult than I thought, because it wasn't very easy to debug for me. So after waisting some more days trying to compile a messy kernel driver provided by my mentor :-) , I finally come up with the idea of implementing the driver for my webcam as user space utility by using the USBKit and so bypassing the media server. This time it was very easy to debug. I managed to get some data but I didn't write the part the actually parsed the data and decoded the frame, as I ran out of time. I though compared the data I was getting with the one sniffed with usbsnoop on linux while running XP on vmplayer and some long hex patterns matched, which are supposed to be some sort of sync pattern. Beside, when putting the camera under my white lamp I was getting 0xff data, which looked very clear to me.

Anyway, I must say that I'm not very happy about the testing, I hoped I could do more but as I said, I waisted some weeks trying with the wrong method to test my code. Sorry guys.

Anyway, I'll be off for some weeks now, as I have my last exams and then I'll probably move to Pisa (any BeOS/HAIKU user over there?). Then I should finally managed to finish reading the OHCI spec I printed out month ago, and I promised I would work on.

Salvo