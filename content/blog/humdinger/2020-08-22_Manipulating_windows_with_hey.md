+++
type = "blog"
title = "Manipulating window look & behaviour with 'hey'"
author = "humdinger"
date = "2020-08-22 10:01:02+02:00"
tags = ["haiku", "scripting", "hey", "look"]
+++

I have an ActivityMonitor replicant showing network receive/send info on the Desktop. I'd also like to have something showing cpu usage. However, a combined cpu usage ActivityMonitor doesn't show individual core usage, and having a graph of all cpus often isn't that informative either, because the 8 doodling lines of my cores are easily confusing. ProcessController's bars are too narrow.   
Here are both, showing their inadequacy:

![ProcessController to the left, ActivityMonitor to the right](https://www.haiku-os.org/files/blog/humdinger/ProcessController+ActivityMonitor.png)

Pulse (from the Demo folder) in mini-mode has everything I need: adjustable column width and colours. Only downside: The mini-mode isn't replicable, so it'll have to stay in its window. Far from ideal.

## 'hey' to the rescue!

LaunchBox has settings that I need, that Pulse doesn't provide: "*Show on all workspaces*" and a deactivated "*Show window border*". Both settings are scriptable via the "*Workspaces*" and the "*Look*" flags.   
How to get to the "magic" values to set those, though? By grabbing the values from an accordingly configured LaunchBox:

    hey LaunchBox get Workspaces of Window [0]
    Reply BMessage(B_REPLY):
       "result" (B_INT32_TYPE) : -1 (0x-0000001)

Aha: **-1** to be visible on all workspaces

    hey LaunchBox get Look of Window [0]
    Reply BMessage(B_REPLY):
       "result" (B_INT32_TYPE) : 20 (0x00000020)

Oho: **20** for a window without borders

One more thing to change: remove Pulse from the list of running apps in the Deskbar, it only wastes precious space there. Unfortunately, coming from a package, Pulse's flags cannot be modified (one of the bigger problems that need to be solved at some time IMO). So I just copied the Pulse app from `/system/demos/` to `/boot/home/`, opened it with the FileType Tracker add-on, and ticked its "*Background app*" checkbox.

Then I added this to my `~/config/settings/boot/UserBootscript`:

    # Launch Pulse, adjust Look & Workspaces flags
    $HOME/Pulse &
    waitfor "w>Pulse"                               # wait for the Pulse window thread
    hey Pulse set Look of Window 0 to 20            # remove window border
    hey Pulse set Workspaces of Window 0 to -1      # put on all workspaces

Here's the bottom right corner of my screen; Pulse to the left, ActivityMonitor to the right:

![Pulse to the left, ActivityMonitor to the right](https://www.haiku-os.org/files/blog/humdinger/Pulse+ActivityMonitor.png)

The nice thing with Pulse: I can still resize and position the window with {{< keyboard CTRL >}}+{{< keyboard ALT >}}+right/left click-drag.
