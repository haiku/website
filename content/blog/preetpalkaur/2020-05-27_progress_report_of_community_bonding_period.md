+++
type = "blog"
title = "Progress report of community bonding period"
author = "PreetpalKaur"
date = "2020-05-27 01:22:11+05:30"
tags = ["haiku", "software", "gsoc2020"]
+++


This blog will contain all the information about what I have done in the community bonding period. It's a bit late to post a blog because I have my exams from 29 May 2020 - 3 June 2020.

My first task was to add the icons to the device list which was completed from my side and now working on its backlogs.

[Please have a review](https://review.haiku-os.org/c/haiku/+/2722)

For completing this task first I understood the code of the icon that was used in the media preference. Then, by following the coding criteria I added the space for the icons on the left side of the items. But, while adding the icons to it. The icons were not present then, PulkoMandy told me the icons that were used in the media have fixed size. But here, the icons have a variable size. To get the icons in the list I have to use BIconUtils. After following the above idea I completed my task. :) 

Now, my second task was to add the 6th button in the mouse GUI and its functionality. For that, I have added the button in the mouse GUI.

[Please have a review](https://review.haiku-os.org/c/haiku/+/2509)

Now there is an issue that the mouse button numbers are not in sequence. The extra buttons taking the random numbers while mapping. For that, I need to add the default values for each as suggested by PulkoMandy on Gerrit. I resolved this issue by adding their default values by using the most common names as "B_FOUR_BUTTON_MOUSE" same for others. Can anyone suggest me the name for additional 3 buttons? Like button 4, 5 and 6.
For eg. Button 1 has the name 'B_PRIMARY_MOUSE_BUTTON' and so on.

And for the 6th button, Scott suggests me that it's will be to measure the DPI of the mouse(DPI is the standard used to measure the mouse sensitivity, expressed as the number of DPIs (dots per linear inch) that a device can detect.) used for gaming purpose.

In the meanwhile, I have made the GUI for the Wacom device as I have shown in the proposal. For the GUI part, just the Wacom device figure is missing. It's a WIP task and working on that also.