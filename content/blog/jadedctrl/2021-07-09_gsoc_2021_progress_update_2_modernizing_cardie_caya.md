+++
type = "blog"
title = "GSoC 2021 Progress Update 2: Modernizing Cardie (Caya)"
author = "JadedCtrl"
date = "2021-07-09 11:58:06-05:00"
tags = ["gsoc", "gsoc2021", "software"]
+++

Looks like it's time for me to clutter the blog again!

To start: Since the last update, Caya has been hard-forked and renamed to
["Cardie"](https://github.com/jadedctrl/cardie) (short for "cardinal"),
which at least fits the "bird theme" of libpurple clients.

… And the name's fitting, since it's now a fairly functional libpurple client.
:-)

<a href="/files/blog/jadedctrl/cardie-2.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/cardie-2.png" /></a>


# libpurple support
There are a few features not implemented yet, which keeps it behind the XMPP
add-on in terms of functionality, but the core is there: Configuring
and managing accounts for any protocol, joining/creating/leaving rooms,
chatting, sending/receiving your own status, room invitations, managing roster,
purple-side chat commands, etc.

This means Cardie is now (at a base-level) usable for just about any protocol
that purple supports, even through third-party plugins.

Getting started on the add-on was a bit tricky, and it took a few days to
get things working― libpurple didn't take too well to multiple instances
running simultaneously (as the other protocols do, in dedicated threads), and
symbols failed to load with the add-on― leading me to take a _slightly_
different approach compared to the other add-ons: A background process runs in
parallel to Cardie when purple account(s) are used, and each account's thread
exchanges messages with that process.

Aside from that, it's gone fairly smoothly― libpurple's pleasant to work with,
and the folks over at #pidgin are friendly and helpful.


# Add-on changes
In add-on news that's dyed something other than purple, I got together a
native IRC add-on within a day. It isn't polished by any means, and was done
more as practice and proof of concept: Writing a protocol add-on really doesn't
take that long. I'd recommend using libpurple's IRC plugin if you can though,
it's definitely more featureful― though in both cases, you might want to use
ZNC as a go-between, since SSL in both the native add-on and with libpurple
isn't quite working yet.

As for more underlying changes to the add-on spec, protocol add-ons can now
specify custom chat commands, "templates" for certain parts of the GUI (for
contacts' "edit" window and room joining/creation), and custom items in the 
user-list right-click menu. These are optional, only there if you need/want
the flexibility.


# UI changes
As far as general UI/functionality goes, user commands are now supported
("/help", "/kick", "/ban", etc), there is tab-completion for usernames,
time-stamps with messages, unique color per chat-user, roster management,
and the room list is now organized by associated account.

Finally, windows/dialogues with a "neutral" context have a drop-down menu where
the user can select the account they'd like to deal with― for example, you can
select the correct account in the "Join a room" window, among others― but in
contexts tied to a specific account (inviting someone to a room), the option is
unavailable.


# Next up
For the last phase of GSoC, I'm planning on finishing off the last few bits
unsupported by the purple add-on (getting SSL working foremost, remote logs,
user statuses, contact images, roster saving), and writing ports for a couple
plugins. (On that note, I'd like to thank Begasus for updating the
libpurple port and kindly reporting some compilation errors with Cardie!)

Aside from that, I'm going to focus on some well-needed polishing and bugfixing―
there are some usability/UI tweaks that especially need to happen, much of
which I've put into the
[issue tracker](https://github.com/JadedCtrl/Cardie/issues). If there's any
problems you notice, or anything you'd like to see, please pop it in.

Cheers!
