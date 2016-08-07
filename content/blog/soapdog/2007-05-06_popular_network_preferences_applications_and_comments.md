+++
type = "blog"
author = "soapdog"
title = "Popular Network Preferences applications and comments."
date = "2007-05-06T20:56:13.000Z"
tags = ["soc", "gsoc", "network", "preferences"]
+++

The idea today is to compare and comment on popular network preferences apps. I'll pick Mac OS X, Windows, Zeta and Linux and comment on what we can learn from each and think about how can we design a successful network preferences application for Haiku. I will not focus on the eye candy or widgets, the focus is on the user experience and features.

Lots of shots of different OSes and some opinions by yours truly.
<!--break-->

<h3>Mac OS X - Network Preferences Application</h3>
Mac OS X uses an unified preferences application like the one in Zeta. This application is called <i>System Preferences</i>. Mac OS X uses different applications for setting network preferences and setting network services.

<h4>Main Status Display</h4>

<img src="http://andregarzia.com/haiku/MacOSX_net_status.png" />

The MacOS X network preferences application starts displaying a window with a summary about your adapters and their status.

Points of interest:
<ul>
<li><b>Location selector:</b> On the top of the window one can see the <i>Location</i> selector. This is used to create and manage the current profile being used. One can have as many profiles as he wants, this is specially good for users that use mobile computers and need to switch from networks often. Example of use of profiles is storing settings for home, work and school network.</li>
<li><b>Show selector:</b> This allows you to select what is displayed on the unified preferences application window, you can select individual adapters and show their properties for editing. You can also select <i>port configuration</i> that allows you to enable or disable a given adapter (or change their order of importance).</li>
<li><b>Adapter list:</b> This shows a summary about your current network adapters. It shows the adapter name, some useful info on the adapter such as current IP or wifi network that he is a currently connected and a little colored icon (green - working, red - not working, orange - disabled). Double clicking an item on this list will display it's properties for editing or check.</li>
<li><b>Configure button:</b> The same as double clicking an adapter or selecting it thru the <i>Show selector</i>, it changes the window to the property editing one and allows you to manage your stuff. Pretty obvious for power users but normal users actually like buttons like that.</li>
<li><b>Disconnect button:</b> Quick and easy way to disconnect the selected adapter.</li>
</ul>

The idea of a simple network general status view such as this one is <u>very good</u> for it allows you on a quick glance to understand what is going on, for example check if the IPs are being handled correctly by the DHCP server. As one can see there's a lot of redundancy on this window. The colored icon just supports what is being displayed on the info text on the adapter window. There are three different ways to access the properties for a given adapter (show selector, configure button, double click the adapter), this can lead to confusion, I personally don't like the <i>Show selector</i>.



<h4>Ethernet Settings Display </h4>

<img src="http://andregarzia.com/haiku/MacOSX_net_settings.png" />

This is the network adapter properties editor window. It can be accessed by double clicking an adapter on the adapter list, selecting it from the <i>Show selector</i> or clicking the <i>Configure button</i>. As you can see the profile manager (<i>Location selector</i>) and the <i>Show selector</i> both keep being displayed and just a portion of the screen changes.

Points of interest:
<ul>
<li><b>Tab panel:</b> Using tabs for splitting the different family of settings is nothing new but when used correctly can lead to <u>good organization</u> and improve the overall user experience.</li>
<li><b>Configure IPv4 selector:</b> Here you can set if your connection should be set using DHCP, static ip, bootp. Depending on your selection the text fields below become editable or not.</li>
<li><b>Renew DHCP lease button:</b> Quick and dirty way to request a new ip from the DHCP server. This button is hidden if the <i>Configure IPv4 selector</i> is not selected for DHCP. <u>Grouping common needed actions in easy to find and access buttons is a good idea</u>.</li>
<li>The fields for editing IP, Gateway, DNS and search domain, all become editable or fixed depending on your previous choices.</li>
</ul>

MacOS X TCP/IP tab panel is a very elegant and easy to use one. Things are on sane places, I like it but again, advanced users will feel that some features are missing for example editing <i>Hosts</i> info.

<h3>Linux (Ubuntu Dapper)</h3>
<b>The Ubuntu shots were provided by a friend of mine, my linux box crashed. His linux is localized for portuguese, I'll translate where necessary.</b>

Talking about Linux is always a difficult thing because there are so many ways to do anything. What I will talk about here is the way to set network preferences using the Gnome network preferences app that is bundled in Ubuntu which is a popular Linux distribution that is attracting lots of switchers. Since our focus is on the normal end user experience, this panel is probably the one that new Ubuntu users will meet first.

<h4>Gnome Network connections</h4>

<img src="http://andregarzia.com/haiku/Gnome_net_status.png" />

Just like the case above, the first thing we see is a summary with info about your adapters. Gnome allows you to have different profiles for your network connections, you can select different profiles using the <i>Local selector</i>. 

points of interests
<ul>
<li><b>Local selector:</b> Just like with other popular systems, Gnome allows you to have different profiles, you can manage them by using the buttons next to the selector. I find it strange that the default name is empty in this shot, maybe, if you haven't added more than one profile, the thing is empty, I think that is ugly.</li>
<li><b>Tab panel:</b> Grouped in different tabs are popular network setting families, one for DNS (unique DNS for all adapters?!), general settings, connections (the one being displayed), machines.</li>
<li><b>Property button (propriedades in portuguese):</b> clicking this button pops up the property editor for the selected adapter.
</ul>

The connections tab (conexões in portuguese) shows a summary on your adapters. It shows the method for configuring the adapter but nothing more, no IP info. I think it could be better. If you want to manage or check the properties for a given adapter, you can simply click the properties button. 

<h4>Ethernet Settings</h4>

<img src="http://andregarzia.com/haiku/Gnome_net_settings.png" />


Gnome network preferences application will pop a new window for the ethernet settings. You can see the settings are the basic ones, the ones that you actually needs. I think that leaving the IP and gateway fields editable when you select DHCP is bad practice.

I actually don't know what the <i>"roaming mode"</i> does, I know what roaming is, but what this setting does I don't know.

You can see that you have features such as setting the machines on the main tab panel. <u>This is very useful for setting up a home lan IMHO</u>.

I don't like it popping a new window, I like when prefs apps work as a single window unit.

<h3>Windows XP</h3>
Windows XP uses a centralized place for the user to find and manage his computer settings, this place is known as the control panels. If I start talking about the windows control panel, I'd stay here forever, so let us just focus on the network side of the thing.

<img src="http://andregarzia.com/haiku/winxp_net_panel.png" />

This is what you see as soon as you get to the network and internet connection preferences. I find it very confusing. Let us jump to the ethernet status, details and properties.

<img src="http://andregarzia.com/haiku/winxp_net_status.png" />&nbsp;<img src="http://andregarzia.com/haiku/winxp_net_status_detail.png" />

after selecting the desired adapter, Windows XP will pop up a new window with a tab panel displaying some useful info. If you want to change anything you're supposed to click the properties button.

<img src="http://andregarzia.com/haiku/winxp_net_props.png" />

The property window is really non-intuitive and not friendly. I don't want to talk much about windows for this is not the path I plan to choose and I don't think there's nothing on windows control panel that I'd like to use. I've included this on this article just to show how bad implemented preference applications can really spoil the end user experience.

<h3>Zeta</h3>
Zeta like MacOS X uses a centralized preferences app that groups everything together.

<h4>Network profile menu</h4>
<img src="http://andregarzia.com/haiku/zeta_net_status.png" />

The first thing Zeta network preferences shows is the profile manager.

points of interest:
<ul>
<li><b>Profile manager:</b> Zeta offers an easy to use profile editor with the management buttons below the list of profiles, simple and easy.</li>
<li><b>Profile summary:</b> A quick way to learn about your network status with useful info such as IP, Gateway and the like.</li>
</ul>

The only bit I don't like about Zeta network preferences window is that it gives the profile manager to much real state and that the profile summary is shrunk to the right side of the window. I don't think the profile manager needs that much space and a simple selector plus the needed action buttons would be better, I'd like the network status to be the focus of attention, not the profiles. Clicking <i>Edit</i> will take you to the network settings editor.

<h4>Network settings</h4>
<img src="http://andregarzia.com/haiku/zeta_net_props.png" />

points of interest:
<ul>
<li><b>Tab panel:</b> Zeta uses a simple tab panel to group related settings, the basic ones are the default, for power users an advanced tab is provided allowing settings for machines, search domain and the like. Zeta also offers basic services setup in their network preferences application.</li>
<li><b>Basic settings editor:</b> Quick and easy way to edit your network settings, very simple and elegant.</li>
</ul>

Settings are live in Zeta, changing them is enough, no need to force network to update, this improves the user experience, no such thing as the user saying: "but I changed it." and you replying: "but you clicked apply?".

<h3>Plans for Haiku Network Preferences Application</h3>
I plan to make our preferences app work with add-ons. Two add-ons are planed from the start, one is the summary add-on and the other the basic settings add-on. The application would provide a simple profile management feature and it would load add-ons on demand. It would launch displaying the summary add-on, this way you'd see your network status like the MacOS X one. 

Summary add-on features:
<ul>
<li>List adapters displaying useful info on them like IP, status.</li>
<li>Provide quick way to activate or deactivate each adapter</li>
</ul>

Basic settings add-on features:
<ul>
<li>A simple editor for basic network settings such as configuration method (DHCP, Static), IP, Gateway, Subnet, DNS...</li>
<li>All changes are live, you change and the network updates itself.</li>
</ul>

By using add-ons we can make everything display on a single window without the bad part of managing a monolithic bloated bag of code. By making the preferences app, single window application we get the solid felling that you're seeing all you need. I am trying to avoid the windows control panel fragmented felling, for me it feels as if  a completely different team coded each window and didn't talk to each other. I like the user to be able to change his settings easily, not showing stuff that is not related to the task at hand.

I don't plan to put services and advanced features from the start, since we're using add-ons we can simply create such add-ons later.

I am looking into the <i>Data translators</i> preferences app to learn more about add-ons and into ifconfig and networkstatus app for learning more about setting and querying network configuration in Haiku. If anyone that read this far wants to share opinion or point me to source files, please do so!

Well, I think that is all for now, I'll keep updating this blog as I advance this project.
Andre


