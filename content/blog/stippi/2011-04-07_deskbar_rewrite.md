+++
type = "blog"
author = "stippi"
title = "Deskbar rewrite "
date = "2011-04-07T10:24:29.000Z"
tags = ["deskbar", "usability", "window", "application"]
+++

<p>
In recent times I have become much less of a BeOS/Haiku full time user and regularily use other systems such as Ubuntu, Windows 7, and sometimes even Mac OS X Leopard. After my very recent blog post on my impressions of the GNOME 3 Shell, I've narrowed down some ideas floating in my head about how Deskbar could be changed to improve it's usability. Let me list some things I like or hate in other desktops.
</p>
<!--more-->
<ul>
<li>I like how in GNOME 2, the top bar provides direct access to the application menu and system settings menu. The places menu is also pretty useful in this form. In the Haiku Deskbar, these entries are one or more levels deeper under the single leaf/feather-menu.</li>
<li>I hate how I have to decide which window I want when switching to a running application in Windows 7, in case that application has multiple windows open. I frequently close the Firefox download window because it prevents me from just clicking the Firefox icon in the taskbar to bring Firefox to the front. I cannot bear to use IE 9 since even when there is just a single window open, I am forced to decide which tab I want. I just want the last active one, damn it! I may have lots of other tabs open, some maybe opened several days ago and completely irrelevant to what I am doing at the moment! The Haiku Deskbar is even worse, clicking an application entry always opens a sub-menu with the open windows, even if there is only a single one. It's more consistent, but just too slow and optimizes for the less common operation. Switching back and forth between two or more apps is just something I do very often. The state of each application should be persistent, i.e. remember what the last active window was, and I should be able to go back to another app with a single mouse operation.</li>
<li>I like how in Windows 7, the taskbar holds just big icons. That leaves a lot of room.</li>
<li>I like the "Pin this task to the taskbar" feature that is also present in the Mac OS X Dock. I've already commented in a ticket how I would love to integrate LaunchBox into Deskbar via such a feature, resolving how to easily make applications launch at boot time along the way.</li>
<li>I hate how poorly workspaces are integrated in GNOME 2. The task entries just show you the ones on the current workspace. The Haiku and Mac OS X workspaces integrations are pretty good.</li>
<li>The Deskbar's default location does not encourage full screen application windows. For some types of applications, full screen is a rather useful way of operating. However, full screen apps should not have a one pixel border around the edge of the screen which essentially makes it impossible to quickly hit targets at the screen edge, which would otherwise be predetermined to be easily hit, like a scrollbar along a document... like is the case in GNOME.</li>
</ul>

This is how I digest all this into bullet points for a rewrite of Deskbar:

<ul>
<li>Quickly switching between tasks should not be left to Cmd-Tabbing alone. The GUI to manage running tasks and windows can be made pretty quick to use as well.</li>
<li>As is already the case in the current Deskbar, it would display all applications regardless of the current workspace.</li>
<li>My first change would be to make Deskbar run along the top or bottom of the screen, top probably being my preferred default location, as I find it easier to flick the mouse upwards.</li>
<li>I would extend the BScreen and BWindow class such that it is easy to go into full screen mode programmatically, while not covering up the deskbar. Obviously full screen video playback could still take over the whole screen, but I want something intermediate that embraces full screen windows more while still allowing the application and window management features of the Deskbar to be readily accessible.</li>
<li>The horizontal Deskbar position also gives room for bringing the Application and System preferences menu's up one level and make them directly accessible.</li>
<li>Then I would change the display of running apps to just their icons. Clicking an application icon would always do the same thing, which is to bring that application to front and switch to the workspace of its last active window.</li>
<li>Attached to each application's icon would be another icon to bring up the list of windows of that application. It could look like this when the mouse is not hovering: Icon v, and like this when hovering: [Icon|v]. I.e. just like a tool bar icon behaves that has an additional drop down menu attached to it.</li>
<li>Both these click targets would get a context menu. The application icon could offer options to permanently install the icon into the Deskbar, regardless of wether the application is running, or to launch the application at boot time. There could be an interface for applications via the BDeskBar class to install custom services into that menu (perhaps simply named BMessage commands to be send to some BMessenger). The window list icon would get a context menu with common window operations like "Hide all", "Close all", "Bring all to this workspace" and so on.</li>
<li>I would also like to integrate the Workspaces applet into the Deskbar, optionally enlarging when the mouse is over it. That would further emphasise the full integration of workspaces on Haiku.</li>
</ul>

For me, it would be a combination of the best application and window management features of all deskops that I frequently use, combined.