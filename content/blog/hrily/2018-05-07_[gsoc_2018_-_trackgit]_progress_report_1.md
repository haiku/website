+++
type = "blog"
title = "[GSoC 2018 - TrackGit] Progress Report 1"
author = "hrily"
date = "2018-05-07 15:30:03+05:30"
tags = ["haiku", "gsoc", "gsoc2018", "tracker"]
+++

Hie

This is my first progress report. Following are the things I did in last couple of weeks:

+ Set up the Environment.
+ Started on Dynamic Tracker Menu.
+ Had a nice chat with my mentor Stippi.
+ Learnt how to build Haiku on Haiku. Especially, building and running the Tracker module.
+ Faced few difficulties in Dynamic Tracker Menu. Solved them with some help.


# About Dynamic Tracker Menu

![Dynamic Tracker Menu](/files/blog/hrily/Dynamic-Tracker-Menu.png)

Dynamic Tracker Menu lets addon add items to the popup menu of Tracker based on the files selected. I was able to implement this in Haiku. A small example of this can be seen in above image.

The source for this addon can be found here : [haiku_addon](https://github.com/Hrily/haiku_addon). The modified haiku source can be found here : [haiku](https://github.com/Hrily/haiku).

# How does it work?

![AddOn-Working](/files/blog/hrily/AddOn-Working.jpg)

## Tracker

### BContainterWindow::AddOnMenuGenerate

This function loads the addon image and calls `populate_menu` function of this addon if it has one. The parameters passed are a `BMessage`, `BMenu` pointer of the root menu of Tracker and `BHandler` to handle the message. The `BMessage` is of type `B_TRACKER_ADDON_MESSAGE`. Contents of `BMessage` are:

+ “dir_ref” : entry_ref of current directory.
+ “refs” : refs to selected files.

### BContainerWindow::MessageReceived

This function is called when user clicks on any item from addon. This function redirects the control to `_PassMessageToAddOn` which loads the addon image and calls `message_received` of addon. The parameter passed is `BMessage` which contains refs to current directory and selected items.

## Addon

### populate_menu

This function should add items to the `BMenu` pointer passed. The `BMessage` passed should be used for creating items. The necessary information should be added to `BMessage` of the item to distinguish it. This function should set target of the menu or items created as the `BHandler` passed. This should be done after adding the children.

### message_received

This function is called when user clicks on the addon item. The information added to the `BMessage` in the `populate_menu` can be used to determine the action needed to be taken.

