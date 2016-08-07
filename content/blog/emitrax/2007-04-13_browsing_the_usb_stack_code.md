+++
type = "blog"
author = "emitrax"
title = "Browsing the USB Stack code"
date = "2007-04-13T21:49:47.000Z"
tags = ["usb", "soc", "code"]
+++

I said it already, but I'm going to say it a million of times, I've never EVER would expected to work on such a project for the Google Summer of Code, I actually didn't even think I would get in the soc. But anyway, here I am... so let's begin!

Last night after I got bored reading the Kernel Kit section of the Be Book (it was about threads and related functions), I opened my shell and I dived right into the USB stack code.

I tried to follow some functions with ctags, because I was interested about how the actual data is sent to the device, and here is what I found out.

This is the method used to send data to the device.
<b>GetBusManager()->SubmitTransfer(transfer);</b>

EHCI driver status...
<pre>
status_t      
EHCI::SubmitTransfer(Transfer *transfer)
{
...
if ((type & USB_OBJECT_INTERRUPT_PIPE) > 0
<                || (type & USB_OBJECT_ISO_PIPE) > 0) {
                TRACE(("usb_ehci: submitting periodic transfer\n"));
                return SubmitPeriodicTransfer(transfer);
        }
....
}

status_t
EHCI::SubmitPeriodicTransfer(Transfer *transfer)
{
        return B_ERROR;
}
</pre>

Ok this has to be implemented. I actually thought ehci and uhci were fully implemented as there is only a ticket about ohci. In the <b>UHCI::SubmitTransfer()</b> I actually didn't find anything about the isochronous stream. The OHCI is not even implemented, but that was known.


Anyway, let's back to how the actual data is sent to the device.
I followed the <b>EHCI::SubmitAsyncTransfer</b> since the periodic transfer
is not implemented. It start by creating a queue, which it fills with either  
<b>FillQueueWithRequest</b> or <b>FillQueueWithData</b> and then pass it to
<b>EHCI::AddPendingTransfer</b> but I get lost in this latter method in the main <b>if(directionIn)</b>.
I expected something like a write function, as I saw in other OS usb stack code.

I'll keep studying.