+++
type = "blog"
author = "sil2100"
title = "Bits and Pieces: Notifications and Menu Builders"
date = "2011-07-27T17:59:11.000Z"
tags = ["interface kit", "application kit"]
+++

It's been a while since I last wrote something here on Blog-O-Sphere. Probably most of you don't remember me anymore - but I'm still around, still experimenting with things Haiku in my free time.

During the weekends, I'm working on enhancing a very old BeOS application long lost in time. While browsing the Haiku kit and application source tree, sometimes I stumble upon some new (at least for me) but also interesting small elements that Haiku added to the Haiku API during its development. I like to try these elements out. Most of these API additions might change or even disappear in the nearest future, since I understand their development process is not yet finished, but they're interesting to know nevertheless.

I know some of these additions might be obvious to those up-to-date with the Haiku source code. But maybe some readers will find this at least a bit informative.
<!--break-->
Just recently I have noticed that already since some time, Haiku has a built-in notifications system present, exported directly through the Application Kit. The class responsible for this functionality is BNotification, included through the Notification.h header file (present in headers/os/app). It's a very easy to use and Be-friendly class.

<pre>#include <Notification.h>

// (...)

BNotification notify(B_INFORMATION_NOTIFICATION);
notify.SetApplication("TokuToku");
notify.SetTitle("The title");
notify.SetContent("The contents. Here we can notify about something important!");
notify.SetOnClickApp("application/x-vnd.TokuToku");

be_roster->Notify(notify); // Optional timeout parameter</pre>

Screenshot of the resulting notification: <a href="http://sil2100.vexillium.org/content/notify.png" title="BNotification">here</a>.


Its usage: create a BNotification object with the given notification type as a parameter (similar to the BAlert alert types), set up the application name, title, content and any additional parameters and all that's left is sending the notification to a selected BRooster. Depending on the notification type, the notification icon will be different (along with some colors).
The BNotification is sent to the system using the Notify() BRooster call - usually we can use the globally defined be_rooster object for this. The method requires two arguments: the notification to be shown and a timeout value. The timeout value is the time, in microseconds, of how long the notification should be visible to the user. If timeout is a value less-or-equal 0, the default timeout is used.

Another element that caught my eye while browsing the Haiku application tree is the menu builder - an useful subset of the BLayoutBuilder functionality. Using this builder, we can easily create different, even complicated menu structures with ease, similarly to building layouts.

<pre>BPopUpMenu *menu = new BPopUpMenu("popup_menu", false, false);

// POPUP_* are BMessage-specific int32 command constants
BLayoutBuilder::Menu<>(menu)
	.AddItem("Status", POPUP_STATUS)
	.AddItem("Send message", POPUP_MSG)
	.AddItem("Log", POPUP_LOG)
		.SetEnabled(false)
	.AddSeparator()

	.AddMenu("Additional") // A sub-menu
		.AddItem("Subitem 00", POPUP_00)
		.AddItem("Subitem 01", POPUP_01)
	.End()

	.AddItem("Remove", POPUP_REMOVE)
		.SetEnabled(false)
	.AddItem("Ignore", POPUP_IGNORE)
		.SetEnabled(false)
;

// (...)</pre>

Screenshot of the resulting pop-up menu: <a href="http://sil2100.vexillium.org/content/menubuilder.png" title="Pop-up menu">here</a>.

After creating the containing menu object (here, the BPopUpMenu), we can build the menu item hierarchy by using Haiku layout API-like specific calls. For these purposes we have the following methods available: AddItem(), AddMenu() and AddSeparator(). Each adds respectively: a new menu item, a new sub-menu and separator object to the menu structure. The base AddItem() method accepts the same arguments as a BMenuItem constructor, with an additional variant accepting a BMessage command constant instead of a BMessage object.
You can read more details here about available methods here: <a href="http://api.haiku-os.org/classBLayoutBuilder_1_1Menu.html" title="The Haiku Book">The Haiku Book</a>.

As I said, these things might be obvious to some and unimportant to others. Or even inaccurate. It was just nice seeing new things in the Haiku API.