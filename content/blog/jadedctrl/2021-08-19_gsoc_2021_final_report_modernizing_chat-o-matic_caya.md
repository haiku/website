+++
type = "blog"
title = "GSoC 2021 Final Report: Modernizing Chat-O-Matic (Caya)"
author = "JadedCtrl"
date = "2021-08-19 22:02:15-05:00"
tags = ["gsoc", "gsoc2021", "software"]
+++

GSoC's coming to an end, so it's time for a final update: An overview of
what I've been working on this summer.

# Project
My project was to "modernize" and write a libpurple add-on for
[Caya](https://github.com/Augustolo/Caya), a multi-protocol chat program.
Ultimately, I hard-forked Caya into
[Chat-O-Matic](https://github.com/JadedCtrl/Chat-O-Matic) at the request of a
previous maintainer― with the name being suggested by win8linux. :-)

"Modernization" here means three things: Allowing multiple accounts in use
at once, re-orienting the program to support multi-user chats, and giving
add-ons some more flexibility.


# Work done
To start off, here's a before-and-after picture. (Aren't I lucky this is the
sorta project where progress can be shown through screenshots?)

<a href="/files/blog/jadedctrl/caya_og.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/caya_og.png" /></a>
<br /><br />
<a href="/files/blog/jadedctrl/chat_o_matic-3.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/chat_o_matic-3.png" /></a>

… and an obligatory note: You can find sources and all commits on
[GitHub](https://github.com/JadedCtrl/Chat-O-Matic/commits/master). Everything
between [c6c1bb3](https://github.com/JadedCtrl/Chat-O-Matic/commit/c6c1bb349a3578525413e4c2859e451333f30cfb)
and
[6e67401](https://github.com/JadedCtrl/Chat-O-Matic/commit/6e67401018ed3860807c3eb1abce9486a6885532)
are commits pertaining to this project.

I'll sum up some of the bigger points I've addressed over the summer.


## General
"Multiples" were made of a few things― multi-account support, multi-user chats,
and multiple protocols per-addon.

With a new focus on rooms, rather than one-on-one chats, the door to a few
more features was opened: chat commands, moderation, subjects, room
logging, and better notifications. 

Management and loading of accounts was also overhauled to be a little more
friendly, in that they can now be disabled and re-enabled at a whim, rather
than requiring a restart― and they spam with more status notifications, which
is always reassuring to see.


## UI
The UI has been changed a good bit, mainly to accommodate the new focus on
multi-user rooms― most obviously join/create/invite dialogues were added,
the room-list became the focus rather than the contacts list, and a user-list
is added to each chat.

Several parts of the GUI have been readjusted for multi-account support, like
an accounts drop-down menu in particular dialogues or account-selection in the
status area (bottom-left corner).

The design's also been changed to take after
[Vision](https://github.com/HaikuArchives/Vision). The UI is single-window,
an Accounts menu takes place of the Server menu… you can probably see the
resemblance.

Other general changes include moderation items, nick/subject changes through
the GUI, and receiving of formatted messages (foreground color or font-face).


## Add-ons
General changes impacted the add-on
[messages API](https://github.com/JadedCtrl/Chat-O-Matic/blob/master/application/ChatProtocolMessages.h)―
several new messages have been added, and others had to be changed to
distinguish between chats and users or for semantic reasons.

The GUI templating system was generalized, expanding how settings dialogues were
populated into some other areas. Add-ons can also specify custom pop-up menu
items, commands, etc.

But the dust has settled, and at this point, the API is stable: I won't be
making any compatibility-breaking changes in the foreseeable future (only
additive ones), and have started
[better documenting it](https://github.com/JadedCtrl/Chat-O-Matic/blob/master/README.ADDON.md).


### libpurple
libpurple is a chat library used by [Pidgin](https://pidgin.im), another
multi-protocol chat client. 

Writing a libpurple add-on was one of my main goals for GSoC, and there is now
a full-featured libpurple add-on included with the program. Most things you'd
expect are supported― chat commands, room invitations, contact management,
etc. Common Notify and Request UI ops (GUI notifications/dialogues) are
supported, as well.

libpurple protocols can be used just like any other, and look the same from
the user's perspective. 


### IRC
During the last couple weeks, I spent some time writing a native IRC add-on.
It supports all of Chat-O-Matic's features, including auto-join, contacts,
and text color/face-formatting.

Funnily enough, this means there are now _two_ protocols that can be used
either through libpurple _or_ through native add-ons― XMPP and IRC plugins are
included with libpurple, and XMPP and IRC add-ons are included with
Chat-O-Matic. Take your pick!

I'd recommend sticking with the native add-ons, as they can take advantage of
some of Chat-O-Matic's features better than libpurple, but if you're not having
luck with one, you could always give the other a try. No harm done. :P


# Undone work
A couple things I planned on doing in my proposal and introduction didn't come
to pass, mainly in relation to libpurple plugins. Originally, I planned on
removing the native XMPP add-on in favor of libpurple's built-in― but my
perspective here has changed.

When I first set out on this project, I saw libpurple as a main driver for
protocol support, but I'm realizing that might not be a good role for it.
libpurple plugins just can't have the integration of native add-ons, nor can
they be used on x86 systems (at least for now)― and in some cases they are
inadequate (one example being
[purple-matrix](https://github.com/matrix-org/purple-matrix)).

My new perspective on the relation between libpurple and native add-ons is this:
libpurple is good to use for particularly difficult or niche protocols (like
[purple-discord](https://github.com/EionRobb/purple-discord)), but native
add-ons might generally be preferred. libpurple is a back-up and a convenience,
not a basket to put every egg into.

That's my take on it, at least.


# Future work
There's still work to be done on Chat-O-Matic, like file-transfers,
replacing the BTextView-based chat buffer with a more modern view, libpurple
support for ChatBuddies and more UI ops, etc.

Personally, my next priority is going to be a Matrix add-on, which was one of my
primary motivators for this project in the first place. … Though I might take a
bit of a break before getting started. :P


# Trying Chat-O-Matic
Having dogfooded Chat-O-Matic as my only IRC/XMPP/Discord client for the past
couple weeks I think it's fair to say it's in a usable state. It should be safe
to try, and I sure hope it won't bite. If you'd like to have a go, you can build
it [from source](https://github.com/JadedCtrl/Chat-O-Matic).

As far as packages go, I'm hoping to have a recipe committed to HaikuPorts soon
(where it'll be available as `chat_o_matic`), but for now you could use the
x86_64 HPKG built for the
[v0.0.1 release](https://github.com/JadedCtrl/Chat-O-Matic/releases/tag/v0.0.1).
See the README for prerequisites.


# Final note
I've had fun the past couple of months, and I've learned a lot I'd like to
apply elsewhere. I had trouble using add-ons with another project before
GSoC, for instance… and after working with them so much recently, I don't
think it'll give me as much trouble. :P

I've worked with a couple really nice codebases this summer― mainly Caya's― 
and it's been a good time. Thanks for all the feedback and friendliness,
especially from my mentors!

Sorry for the block of text, though, it's a little much. I guess it didn't end
up being so "quick."

Cheers!

- [Introduction](/blog/jadedctrl/2021-05-18_gsoc_2021_project_modernizing_caya/)
- [Update 1](/blog/jadedctrl/2021-06-07_gsoc_2021_progress_update_1_modernizing_caya/)
- [Update 2](/blog/jadedctrl/2021-07-09_gsoc_2021_progress_update_2_modernizing_cardie_caya/)
