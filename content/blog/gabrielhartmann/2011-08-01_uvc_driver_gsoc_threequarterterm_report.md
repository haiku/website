+++
type = "blog"
author = "gabrielhartmann"
title = "UVC Driver -- GSoC Three-quarter-term Report"
date = "2011-08-01T20:25:57.000Z"
tags = ["UVC", "driver", "webcam", "gsoc 2011", "gsoc", "gsoc2011"]
+++

Not so long ago, at the half way mark of the GSoc, I was optimistic that I was near to actually interpretting data from the camera in such a way as to produce images on screen.  I was successfully grabbing payload data from the camera, the camera's in-use light was on, things were looking good.  Since that point, progress has been repeatedly stalled by strange and difficult to debug behaviour.

The first problem which I encountered was that the vast majority of the data received from the camera consisted only of headers with very little actual image data ever attached.  In a few seconds of contact with the camera as an example, only 6 out of 7714 packets (0.000778%) contained content.  That was worrying.  Furthermore the bit indicating an error was often set in the headers, although not perpetually.  Investigation of that problem has revealed one of two possible scenarios.

1)  Protected content -- This situation occurs if the data source device detects that the video or still-image data is protected and cannot be transmitted.  In this case, empty packets containing only headers will be sent for the duration of the protected content.

2) Input buffer underrun -- If the data source device is not able to supply data at the requested rate, it will transmit empty packets containing only headers for the duration of the buffer underrun.

There are other possible error modes, but these are the only two described in the specification which indicate the empty packets with only headers behaviour.  Both I and my mentors believe that the second scenario is most likely.  However we do not know for certain, which leads to another problem.

Requesting information about what error mode exactly is being encountered of the camera, should be very nearly in exactly the same format as the probe / commit routine which directly precedes the initiation of data transfer.  However, whenever the camera is asked for further information about the error mode it is indicating, both the media_addon_server and the camera lock up.  Now, it is far from abnormal for the media_addon_server to lock.  This has happened countless times during development.  But the camera has never locked up befor.  Even after a restart, the camera remains locked.  A full power cycle is required to bring things back to relative normal.  So that's one major intractable issue at the moment, but it is not the only one.

Another major issue was an essentially infinite loop in the VideoProducer's Datapump thread.  A division by zero was causing a very large negative number to be included in a sum.  The result of this sum was supposed to be a time in the future for which a semaphore grabbing loop should wait.  However since the time was hugely negative, at no point could a constantly positive and climbing system time reach this "future" date.  Investigations into this issue were going on at the same time as I was investigating the empty packets error.  Because my camera was locking up, I had been unplugging and replugging my camera repeatedly.  In order to make this easier I had started using the usb plug on the front of my machine.  This movement has, I believe, solved the division by zero problem.  I haven't done rigorous testing yet, but it was a consistent problem before, and now that I've switched usb plugs, it has gone away.  Do you see what I mean about strange and difficult to debug behaviour?

Finally, in an effort to see if the empty packets problem was confined to the beginning of data transfer, and perhaps worked itself out later, I began watching printouts of actually full packets being received.  After about 20 seconds of this, Haiku reliably crashes into Kernel Debug Land (KDL).  I'm now looking into kernel debugging advice my mentors have given me.  Just judging by the kernel debug messages, it looks like an inappropriate NULL pointer problem in the ehci isochronous transfer code.

So, while it would be nice to be writing a deframer or some code for negotiating resolution between the user applications and the driver, with a view towards getting images on the screen at user requested qualities, I think it's probably more important to get the back end working properly.  There are only about 3 weeks until the firm pencils down date and I haven't entirely given up hope of one day seeing images, but at the very least I'll hope to have made thorough informative investigations into a series of problematic behaviours that would certainly not be acceptable for end-users to encounter.