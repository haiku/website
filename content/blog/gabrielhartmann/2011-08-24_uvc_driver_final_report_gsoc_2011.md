+++
type = "blog"
author = "gabrielhartmann"
title = "UVC Driver: Final Report GSoC 2011"
date = "2011-08-24T21:53:48.000Z"
tags = ["UVC", "driver", "gsoc", "gsoc 2011", "gsoc2011"]
+++

The Google Summer of Code for 2011 is over now for me.  The final state of the UVC driver project while very far from perfect is at least at a point where incremental improvement can be made.  Literally the day (maybe 2 days, depending which timezone you're in) before the "firm pencils down" date I finally managed to get data all the way from the camera to the screen.  The decoding of that information is totally wrong at this point, but coloured pixels show up on the screen and they appear to react when things move in front of the camera.  Success?!

Beyond the relatively simple task of writing a colour decoder that actually matches the format of the data being provided by the camera, there remains a whole lot of work to be done.  The work comes in three major categories: the application layer, the driver layer, and the USB layer.  

By the application layer, I mean the interface between the driver and applications.  The two major webcam applications for Haiku Cortex and Codycam both primarily request and accept frames at 320x240 resolution.  Allowances have been made in the driver for this behaviour.  The current code should allow other resolution requests to be negotiated successfully, but without application testing, it's likely that resolution negotiation will have some bugs.  Also this tendency on the part of applications ignores camera preferences for default resolutions.

At the driver layer the UVC driver does not even attempt to support all the features of the specification yet.  In particular no attempt has even been made to deal with compressed video frames.  The MJPEG frames that uvc cameras normally provide haven't yet been touched.  The specification also allows for other proprietary formats.  Again this is unexplored.  Finally, the driver to camera resolution negotiation is not particularly robust and assumes to some degree that applications are going to request reasonable resolutions (from the camera's perpsective).  This portion needs to be looked at again.  This will be a time consuming process because camera stalls in negotiation lead to unrecoverable crashing of the media_addon_server.  A camera stall occurs on the slightest provocation.  Learn to love rebooting.

At the USB layer, ehci isochronous transfers tend to crash Haiku into KDL.  There are probably a series of reasons for this, but at least one known issue is that ehci doesn't deal well with a large number of queued transfer requests.  For this reason, there is currently artificial waiting time ( snooze(for a for a little while) ) in the generic CamDevice so that the queue doesn't get to backed up.  Of course this makes a decent frame rate impossible.  At least the more or less random pixels now displayed don't appear to have a very quick frame rate.  Even with the artificial delay you only have about 20 seconds of video frames (if you're lucky) before crashing into KDL.  Again, learn to love rebooting.  There is a newer version of ehci available which deals with this issue, but I couldn't get it to play nice with my system. 

In short, to use a transportation metaphor, a trail through the jungle has been beaten from camera to display.  Technically one can get from point A to point B.  However if you want to do this easily, quickly, and reliably you're going to need a super-highway.  Expansion and improvement of the route is needed at all levels.

I had a great time with this, my first GSoC and learned a lot about USB which was something I didn't really know a lot about before.  I'd like to thank my mentors Jerome and Philippe for their time and patience.