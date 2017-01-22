+++
type = "blog"
author = "mmu_man"
title = "Update on work done at FOSDEM: USB webcam & IM Kit"
date = "2008-02-25T17:08:22.000Z"
tags = ["USBKit", "FOSDEM", "webcam", "IM Kit"]
+++

Here are some screenshots of what I fixed at FOSDEM...

<!--more-->

<h3>USB webcam</h3>
As I said in my previous entry, I fixed a bug in my usb_webcam driver, and I wanted to test it ASAP.
Well it <a href="http://revolf.free.fr/beos/shots/shot_haiku_usb_webcam_001.png">seems to work</a> on my athlon tower.

The usb stack is currently too slow to keep up with the frames being sent, even without syslog output, so you only see strips from each of the frames it tried to transfer, but at least it gets data from it.

Hopefully the usb stack will work better soon and I'll get a complete picture.

<h3>IM Kit</h3>
As I said, IM Kit is mostly working (I only tried gtalk but others should work too; except yahoo messenger as it's missing a library), as <a href="http://revolf.free.fr/beos/shots/shot_haiku_im_kit_001.png">this shows</a>.
Some issues remain with setting the mime type of the people files but one can succesfully reply to a message sent to him.
