+++
type = "blog"
author = "czeidler"
title = "Status Report (Stack and Tile)"
date = "2012-05-14T23:31:03.000Z"
tags = ["Stack and Tile", "Session Manager"]
+++

Having started my PhD at the University of Auckland two years ago I think it's time to provide a brief overview for the Haiku community about what I am doing here. Since a complete overview would result in a pretty big post I intend to split it into multiple smaller posts. Fingers crossed that I remain motivated enough to keep writing :).

The topic of my PhD is "User Interface Customization" and covers three aspects. First, customization in the large which targets the management of multiple windows of different applications using Stack and Tile. Secondly, customization in the small. Here I take a look at how customization can be effected within an application, especially how the user can change the layout of an application at runtime, e.g. to optimize an application for his special use-cases. Finally, I'd like to take a look at how far it is possible to also let the user customize the functionality of an application, e.g. connect a button click event to a new component that plays a sound effect to emphasize the importance of the button clicked event.

<h4>Stack and Tile</h4>

Stack and Tile is now integrated into the Haiku app_server and is enabled on default. There are two main operations in Stack and Tile which are, guess what?, stacking and tiling. Stacking allows the user to stack windows on top of one another and tiling allows the tiling of windows beside each other. To do this, just press the Windows key while dragging a window:
a) by the tab onto another window tab to stack them or
b) beside another window to tile them. In this way it's possible to create complex groups of stacked and tiled windows.
 
The main purpose of Stack and Tile is to make window management easier and working with multiple windows more efficient. When using multiple windows on the same desktop the user frequently runs into the problem that windows occlude each other. To make the occluded parts visible the user has to move other windows aside or bring the occluded window to the front. All these operations can result in more occlusion of other windows. This problem can makes window management quite tedious. Another problem arises when working on multiple tasks in parallel. For example, if one task is a programming task and involves multiple editor windows and a terminal, and another task uses a browser and a mail application, while a third task has a word processor and tracker window with related documents. Switching from one task to another could make it necessary to activate all windows of a task. This can be done by bringing the windows of a task to the front or moving unrelated windows aside. The more windows which belong to a certain task, the more window operations are needed to bring all windows of that task to the front thus slowing down task switching.
 
Stack and Tile provides a solution to these problems. Windows in a Stack and Tile group are not occluded at all if they are tiled, and windows are completely occluded if they are stacked. This solves the first problem that windows are fully or partially occluded. Tiled windows in a Stack and Tile group are always visible and stacked windows do not occlude other windows unintentionally. Furthermore, the problem of task switching is targeted, activating one window in a Stack and Tile group brings the complete group to the front and thus switching between Stack and Tile groups is very easy.


<b>User Evaluation</b>
 
To evaluate how Stack and Tile performs compared to the traditional window system a user evaluation has been done. During BeGeistert10 many of the attendees participated in this evaluation. Thanks again for that! The results have been very positive. The measured task completion time and task switching time have been significantly lower using Stack and Tile than under non Stack and Tile conditions. Furthermore, the setup time to create a Stack and Tile group is acceptably low and does not outweigh the time saved while using a Stack and Tile group. 

There were four different groups of tasks:
1) Window switching between windows with unrelated content of the same application (e.g. a stacked group of pictures).
2) Window switching between windows with unrelated content of different applications (e.g. a stacked group of a pdf viewer, a browser and a text document).
3) Window switching between related windows (e.g. exchange data between text documents which are tiled beside each other).
4) Task switching between multi-window tasks.

In all tasks Stack and Tile was superior to the non Stack and Tile setup and on average  participants were able to complete the tasks much faster. If somebody is interested in more details I'd like to publish a more detailed summary at a later point.
 

<b>Future Work and Session Management</b>
 
Although I have finished working on Stack and Tile as part of my PhD there are still many ideas around to improve Stack and Tile and integrate it further into Haiku. There are, for example, ideas to show Stack and Tile groups in the Deskbar, merge two different Stack and Tile groups, or make the Stack and Tile key customizable. Moreover, there are still some drawing bugs which should be fixed one day.

Personally, the most important missing feature is to make Stack and Tile groups persistent. This means Stack and Tile groups can be reloaded or can be restored after a Haiku restart. To implement that functionality the states of all windows of an application in a group and the Stack and Tile configuration of these windows must be stored. At first, that sounds not very difficult but is actually quite complicated and can not be
implemented using the current Haiku API. The first problem is that a stacked or tiled window is not the main window of an application. Just starting an application would not give the right window in this case. The second problem is that windows in Haiku have no ID and cannot be identified after an application restart.
 
To solve these problems a new API has to be introduced that allows for storing and restoring an application state. When storing an application state each window of the application gets a unique ID which can be used by Stack and Tile to store the group configuration. To restore all Stack and Tile groups after a reboot, first all applications have to be restored and then all windows have to be stacked and tiled again.
 
A base implementation of a session manager that also is able to restore Stack and Tile groups can be found on github *) There was also some discussion about the session manager API on the developer mailing list a while ago **)
As I have not much time to work on any of these, volunteers are welcome!

*) github.com/czeidler/haiku (SessionManager branch)
**) http://www.freelists.org/post/haiku-development/session-manager