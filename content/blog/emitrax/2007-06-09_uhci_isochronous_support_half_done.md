+++
type = "blog"
author = "emitrax"
title = "UHCI isochronous support half done"
date = "2007-06-09T21:29:54.000Z"
tags = ["usb", "gsoc", "uhci"]
+++

Actually is more than half. This quick post is just to inform you that I wrote the part that schedule an isochronous request in the UHCI driver. I've already sent the patch to Michael for his review. The only part that is missing is the code that remove the request once it has been processed or canceled, which is not as trivial as I thought.