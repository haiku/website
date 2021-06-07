+++
type = "blog"
title = "GSoC 2021 Progress Update 1: Modernizing Caya"
author = "JadedCtrl"
date = "2021-06-07 09:19:49-05:00"
tags = ["gsoc", "gsoc2021"]
+++

It's the end of the first GSoC period, so it's about time I clutter the blog
again!

A good few changes have been made to Caya― most obviously support for
multi-user rooms and some UI changes. Multi-protocol add-ons are now supported,
the program is oriented around "Conversations" rather than "Contacts," basic
moderation (kicking, banning, muting) works, etc.

The [protocol API](https://github.com/JadedCtrl/Caya/blob/master/application/CayaProtocolMessages.h)'s
expanded because of these general changes, and I don't think it could be called
"stable" for another couple weeks at least― I still need to document it, and
some of the new additions might still be consolidated into others.

Anyway, it's sometimes better to show than tell. Here's before and after:

<a href="/files/blog/jadedctrl/caya_og.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/caya_og.png" /></a>
<br /><br />
<a href="/files/blog/jadedctrl/caya-1.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/caya-1.png" /></a>


… could you tell I'm going for "Vision-esque?" :P

I'm no UI designer, so any input's greatly appreciated, really. Right now I'm
thinking on moving the "send" textbox to between the user-list and chat-list,
and giving each user a specific in-chat color. There should be a way of visually
marking a user as an arbitrary rank (moderator, admin, etc) in the user-list,
but I'm not sure that might be best done. Maybe custom text-prefixes (e.g., "@"
with IRC), or having a rank-based name-color…?

There are a couple changes not shown in the screenshot, like displaying a user's
status. When a chatroom member is marked "available," "away," or "offline," the
color of their name in the user-list changes accordingly, from normal text color
to an increasingly lighter/darker tint.

Overall, I think some good progress has been made, and I'm on track to get
started on the libpurple add-on. Caya is a good base to work with, and Gloox has
been surprisingly pleasant to work with.

Next up on the agenda, though, are changes that'll give add-ons some much-needed
flexibility, as well as minor tweaks: Allowing protocols to define custom
commands/menu items for the room and user right-click menus, room creation with
custom slots dictated by protocol, room invitations, roster management, etc.

You can find the sources on [Github](https://github.com/jadedctrl/caya), and my
introductory post [here](/blog/jadedctrl/2021-05-18_gsoc_2021_project_modernizing_caya/).

Cheers!
