+++
type = "blog"
title = "GSoC2020 Final Report: Input Preferences"
author = "PreetpalKaur"
date = "2020-08-31 21:15:52+05:30"
tags = ["haiku", "software", "gsoc2020"]
+++

# GSoC 2020 Final Report

This is the final report of the GSoC 2020 project
* [Input Preferences](https://summerofcode.withgoogle.com/projects/#6244788782759936)

The proposal is available here:
* [Proposal Link](https://docs.google.com/document/d/1WgHs9ZGMMxCZhHhy3BXZPtkht-aNvKEPA5fGTEfC82E/edit?usp=sharing">https://docs.google.com/document/d/1WgHs9ZGMMxCZhHhy3BXZPtkht-aNvKEPA5fGTEfC82E/edit?usp=sharing)

## Work Done:
- [x] Added the icons for each connected device in the input preferences application.
  * [Icons](https://drive.google.com/file/d/10-kJdE4G0rGWiPZi4rudt4Vy1sOb6vRS/view?usp=sharing)
- [x] Removed the unwanted devices from the device list when they are not connected to the computer.
- [x] Improved the look of 4th and 5th button of the mouse and added the 6th button of the mouse and its working.
  * [Buttons](https://drive.google.com/file/d/1TrRCrFDnQIOiZD6ZJItqmVlSddlVSbIq/view?usp=sharing)
- [x] Made the Joystick GUI.
  * [Joystick GUI](https://drive.google.com/file/d/1h5nhvRd1EY78UhtdQIePJoe4FzoyZ7XD/view?usp=sharing)
- [x] Made the Wacom tablet GUI.
  * [Pen GUI](https://drive.google.com/file/d/1CObvCO1vE6IQmY_r-Uwp0AKe9TClzTPg/view?usp=sharing)
  * [Mapping GUI](https://drive.google.com/file/d/1JIWRtd5ceK1Adyg2jWKBb8bM2RIgjdQw/view?usp=sharing)
- [x] Implemented the input preferences to hold settings for each mouse separately.

## Commits:
https://review.haiku-os.org/q/owner:preetpalok123%2540gmail.com

## Weekly Blogs:
http://preetpalk.wordpress.com/


## Work TO DO:

- [ ] Implement the settings of Joystick.
- [ ] Implement the working of a Wacom tablet.
- [ ] Implement the settings of each mouse from the back end.

## Struggles:

During the implementation of icons in the device list, I got the example from the media application and added the icons.

To add the 6th button of the mouse, I got the example from the other mouse buttons.

Implementation of mouse settings separately takes the time and it's still in process. There is no example where I can get an idea. It is the research work for me.

I used the mapping concept to store the settings for each mouse with its name and is working fine on the GUI basis. Back end implementation is time-consuming. I am one step behind to the solution because I am unable to get the names of the mice in the input server. If I get the names some how it's in the binary format!

While trying to solve this issue, if there is something happens wrong in the code the mouse and the keyboard stops working. To test the code each time I have to make the package and reboot the haiku. With that, the old packages also stops working due to the fault in the kernel.

Each time I have to need to re-install the haiku from the CD. It's not enough while booting the haiku from CD, it shows the debugger window because of kernel fault and unable to install it.

For the above issue, If I access the haiku from Linux, the Linux does not know how to write on haiku!

The last option is to use qemu. I accessed the haiku partition from the haiku installed in the qemu and replaced the packages from /system/packages with /boot/system/packages. After doing this, the haiku runs successfully. I need to re-build it and installed the packages, again the time-consuming task.

While trying to resolve the issue, I don't know whether the debugger window opens or not due to the changes added by me. Till now, I have to repeat the above steps about 5 times.

At the time of the timeline, I did not expected these type of issues. :(

I have learnt so many new things in these three months about haiku and git.

I am also working with haiku after GSoC as a part of my 6 months of industrial training. And also try to complete my project. :)

Thankyou :)