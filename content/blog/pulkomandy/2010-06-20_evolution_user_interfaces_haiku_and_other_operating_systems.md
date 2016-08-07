+++
type = "blog"
author = "PulkoMandy"
title = "Evolution of user interfaces in Haiku and other Operating systems"
date = "2010-06-20T16:11:14.000Z"
tags = ["ui", "intergace", "gui", "R2"]
+++

This blog post talks about the changes that have been hapenning in recent versions of others Operating Systems, and wether Haiku should copy them or not.
<!--break-->
A long time ago, in 1984, Apple designed the user interface of the Macintosh. This was not the first one, (the first was at Xerox PARC) but it was widely known and set the standard for many other OSes. Amiga Workbench and GEM borrowed the menu at the top of the screen, everyone started to use cursors and icons, and titlebar for windows with buttons to close and resize them. BeOS, of course, also got a lot of inspiration from this user interface being created partly by former Apple employees.

However, each of these systems grew up its own way, keeping many differences with the others. Amiga had a system of screens, where each application had a desktop on its own and windows inside it ; GEM kept single-task and most applications ran full screen instead of using windows, mac tried to integrate some multitasking while keeping the GUI as simple as possible.

In 1995, there was a new version of Windows, introducing a bar at the bottom of the screen, and allowing to switch between applications more easily. It also included a start button to run more apps, without having to find the "Program Manager". Most modern Linux Desktop Environments are based on this layout (Gnome, KDE, XFCE and LXDE, at least). The deskbar in BeOS and Haiku is also somewhat similar.

In 1999, Apple released Mac OS X, featuring a big update to the previous UI : the dock. It allowed to see all the available apps, and lauch them by a single click, or raise an existing instance if there was one. Note the dock had been available for several years in NextStep.

Finally, we now have Windows 7, which borrowed the dock idea from Mac OS X, but also brought in some other changes.

Over all these years, we can see that Mac OS and Windows have changed a lot, while Haiku is still really near to the old BeOS. Should we get some of the ideas from other OSes, or is it better to keep going our own way ?

<h1>Document-Centered interfaces</h1>
An important change in the way we use computer is that there is now a lot more multitasking. In the first days of the Macintosh, it was not possible to run more than one application at a time. It is now common to have a lot more. At the beginning, people used computers a bit like typewriters : only one document at a time, and the others available on the desktop for reference. But now, most documents are inside the computer, and you often have more than a single one open at a time.

This creates a distinction between an application, a window and a document. An application may have multiple windows open at a time, and each window can show one or more documents. For example, in a word processor, it is common to have one separate window for each document, while in a web browser, it's more common to use tabs inside the window.

To the user, it makes more sense to have a document-centered interface, where a window is bound to a document. However, this can quickly get messy on the desktop if one opens a lot of web pages. Fortunately, we already have a solution for that, one that most other operating system are missing : it's Stack and Tile. Stack and Tile will allow to stack a lot of windows to make them part of the same frame, and act like tabs. This allows each window to still be a document, while having the tabbing to keep them in a manageable order.

The other part of this is the adoption of the dock system. The dock is a fusion of the deskbar with launchbox. It hides the difference between a running application and a not running one. This distinction is not really important anymore, and it will disappear in the future. Applications are launching really fast in Haiku, so it doesn't matter if you have to load the app from disk or just raise a window. Moreover, we're going to a system where apps are always running. PalmOS has been doing it for years, when you quit an app, it's just snapshotted to disk, and you can reload it later to find it exactly like you exited it, even if you rebooted the computer in between. Speaking of rebooting, this also means that shutting down your computer will be the same thing as putting it in "deep hibernation" state.

<h1>The end of the Title and Menu bars</h1>
In windows 7, Microsoft decided to rework a lot the way things are working. The most important changes, apart from the adoption of a Mac OS X similar dock, is the removal of menus and, to some extend, of title bars. The idea behind the removal of menus is to give more exposure and easy access to the features of an application. You can immediately see what you can do. It makes the app easier to use if you're not at ease with a mouse. And it is also a lot simpler when you use a touchscreen, which is becoming more common every day. However, menus are still much more simpler to use so, I don't think this is a feature we should keep.

The other part of this change is that it allows applications to play a little more with the title bar. For example, the Opera web browser chose to draw tabs inside the title bar itself. This somewhat reminds Stack and Tile, and gets back to the idea that a window is a document, but that windows can be sticked together.

<h1>Features that got lost over time : Amiga Screens</h1>
I find the Amiga really interesting, because they really developped their own system about the same time the Macintosh was being created at Apple. The two systems are similar, but still different. And the guys at Commodore didn't always copy the features from Apple. One of the really interesting things in the Amiga is the screens. They are a bit like Haiku's workspace, but pushing it further, you can grab a screen and move it to see the one behind. An application usually runs in its own screen, but it is possible to move windows from one to another. Screens have an user-defined name and it is possible to cycle through them with a small button at the top right of the screen. This button is sometimes much more practical than the workspace switcher : it takes a lot less space, and allows you to reach your target easily. As apps always open in their own workspace, it's easier to make use of the feature : you don't have to think about it and decide where to put the windows yourself. The ability to split the dispay and see multiple screens at a time allows you to quickly navigate from one application to another, without having to endlessly switch workspaces. It is also possible to keep a small screen always on top, with some status info, and use the rest of the display space for the app you want to see.


Overall, Haiku has the chance of being a fully integrated system, so it can move a lot faster than most others, particularly UNIXes with a lot of different graphical toolkits. So, it's time we switch to a document-centered intreface and see where it brings us.

In the end, we're left with two things to look at : Smalltalk and NextStep. They already did most of what I'm talking about.