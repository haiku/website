+++
type = "blog"
title = "Coding week #1"
author = "rajagopalan"
date = "2019-06-04 17:04:02+05:30"
tags = ["haiku", "software"]
+++

 Hello everybody. This is me Rajagopalan working on getting webkit2 on haiku. Previously as you guys know we were trying to get IPC working. Well we have succeeded in that after hitting some obstacles.

 + Message passing should not involve mainloop it should be totally dependent on the workqueue only. As the mainloop can be blocked because of JS Execution which leaves slow performance or even crash.
 + Also we stumbled upon an IPC deadlock when we used mainloop (main application loop) as a proxy to send and receive messages.

 Thanks to BMessenger we were able to send messages to required place without any interference and problems (although we had to use mainloop once to establish connection). The initialization is bit slow although it works good now allowing us to focus on main part (Rendering).

 Once we could get webkit render on screen we will try perfecting IPC.

 Currently to pick a right path we want to enable all the asserts in release mode as debug build fails because gcc runs out of memory.

 So that's all peeps. Thanks for scrolling by!! 
