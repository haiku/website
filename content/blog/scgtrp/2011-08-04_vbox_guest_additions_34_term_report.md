+++
type = "blog"
author = "scgtrp"
title = "VBox guest additions: 3/4 term report"
date = "2011-08-04T04:12:46.000Z"
tags = ["virtualbox", "gsoc2011"]
+++

New status report:
major feature dropped; bugs fixed;
did some screen research.

At the start of the third term, it was pointed out to me that Haiku does not actually support hardware 3D acceleration, and to add it would be a larger project than I have the time (or knowledge) for. Therefore, I've had to drop host-accelerated OpenGL from the planned features. I'm somewhat annoyed by this, but looking back it was probably a bit too ambitious anyway, and I'm not convinced I could have finished it in time.

As a result of this quite large decrease in scope, I decided to mentally revise the timeline and spend most of my coding time in the third quarter fixing some of the annoying bugs that had been following me around for a while:
<ul>
 <li>Icons can now be dragged around without having to disable MPI first.</li>
 <li>VBoxService no longer implodes on exit.</li>
 <li>vboxsf no longer refuses to load on hosts that are running VBox 3 (but symlinks will not work properly as VBox 3 didn't support them).</li>
</ul>
I've also added guest control support for executing programs - see $(VBoxManage help guestcontrol) for usage instructions. Note that you'll have to set a password on your Haiku user account to use this if you haven't already, as VBox's guest control requires authentication.

This leaves screen resizing, which will be my primary focus in these last few weeks, followed by a bit of cleanup and finally sending a patch off to the VBox people.
