+++
type = "blog"
author = "emitrax"
title = "Coding Style"
date = "2007-05-30T11:13:00.000Z"
tags = ["usb", "soc"]
+++

As many of you know, I've started working even before the SoC started officially. I've already sent two patches to both my mentor (Oliver R. Dorantes) and Michael Lotz for review. One of them has already been commited by mmu_man (thanks). The second one is under review. With this latest one, the usb stack manager should be complete, as the QueueIsochronous method has been implemented, along with the CalculateBandwidth. My next move is to implement the UHCI isochronous method. Once I've done that, testing can be made. As for now, there seem to be a lack of drivers with which I can test the code. Oliver has offered himself to write some simple bluetooth driver just to test the code. Isochronous UHCI Tester are obviously welcome.

Anyway, as the post title says, I just wanted to report the only problems I had so far: Coding style! :-) At first, I struggled a little to write the code in correct <i>Haikish style</i>, but thanks to Michael I think I got it correctly now.

I'm also planning to help with the documentation project. Someone contacted me some weeks ago about it, but I don't remember the name anymore. Sorry! So whoever it was, please contact me again and let's see if I can help you out, as I think I have a better understanding of the USB stack now.

Stay tuned.
Salvo