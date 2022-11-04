+++
type = "blog"
title = "Registering your nickname for IRC"
author = "humdinger"
date = "2021-05-26 19:55:20+02:00"
tags = ["IRC", "Nickserv"]
+++

We recently moved our IRC channels from Freenode to OFTC. I almost forgot to register my IRC nickname at the new service, and having just done that, I take the opportunity to describe how that's done for my fellow - maybe newbie - IRC user.

### Configure Vision

First, you'll have to configure Vision (or another IRC client) to connect to the OFTC network.   
Enter the *Network setup* and add a new network with the popup menu at the top. Fill in your personal details, including the desired nickname. You can add commands that are automatically executed when connecting to the network, like joining the #haiku channel and identifying/authenticating yourself, see further down.

<img src="/files/blog/humdinger/Vision_network_setup.png"/>

Now click on the "Change servers..." button, add a new server, and enter the following settings:

<img src="/files/blog/humdinger/Vision_server_settings.png"/>

### Registering your nickname

After connecting to the OFTC network, you'll see if your nickname is already in use in the server's welcome message. If so, you'll have to find another nickname...

Otherwise, it's time to register your nickname. That isn't mandatory, but if you don't, anyone can log on under that name and sully your reputation. :)   
"Nickserv" is the IRC bot you have to address with all account related things.

`/msg Nickserv register` *SuperSecretPassword YourEmailAddress*

From now on it's simply following the instructions in the Nickserv output:

* Follow the link to verify your nickname and password. (If you miss verification time window, do a `/msg NickServ reverify` to get a new verification link.)
* Back in Vision, do a `/msg Nickserv identify SuperSecretPassword` to authenticate yourself and follow it with `/msg Nickserv status <InsertYourNickname>` to make sure all went OK.

### Identify yourself on every connect

To automatically identify yourself every time you connect to the OFTC network, put a `/msg Nickserv identify SuperSecretPassword` into the *Automatically execute* text box under *Network setup*. Best before joining your regular IRC channels (see first screenshot in this post).
