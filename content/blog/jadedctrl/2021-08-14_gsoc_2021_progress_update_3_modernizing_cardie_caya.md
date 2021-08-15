+++
type = "blog"
title = "GSoC 2021 Progress Update 3: Modernizing Cardie (Caya)"
author = "JadedCtrl"
date = "2021-08-14 20:07:25-05:00"
tags = ["gsoc", "gsoc2021", "software"]
+++

It's about time for another update, even if it's a tad past due!

For this last period, I've spent the bulk of my time on little QoL changes with
the UI, nothing too drastic on the protocol-side of things, aside from a new
IRC add-on.


<a href="/files/blog/jadedctrl/cardie-3.png"><img style="max-width: 80%" src="/files/blog/jadedctrl/cardie-3.png" /></a>

# IRC
During the past few days I've rewritten the native IRC add-on into something
pretty usable, barring some rough edges I hope to smooth out over the next week.
Since libircclient isn't used anymore, SSL networks work fine. Otherwise, the
only functional changes you might notice compared to the old version are that
user idents can be seen in the UI, and that text formatted with face character
codes (bold, italic) text gets properly formatted. 

Support for roles ("operator," etc) is still lacking, and commands aren't
overridden yet.

I mainly wanted a native IRC add-on to avoid depending on libpurple's
implementation― while libpurple-irc works well generally, it doesn't work on
x86, and doesn't support some of the features Cardie supports (e.g., moderation
through the GUI like in Cardie or Vision).


# libpurple
Protocols requiring SSL should now work (fixed by pointing purple to the
appropriate dir). In addition, libpurple protocols now follow the
"online-to-connect," "offline-to-disconnect" status model, which I'll get into.


# General tweaks
Account disconnection and management is now much more reliable― you can disable
and re-enable accounts at will, and a dedicated "Accounts" menu was added to
help that along. You can temporarily disconnect by setting an account's status
to "offline," (reconnecting with "online"). But where setting the status will
be reset on next launch, "disabling" the account through the "Accounts" menu
remains in effect until you manually toggle the account.

Setting your nickname through the GUI (in the bottom-left corner, with the
status menu) now works. And on a related note, the status and nickname of each
loaded account can now be set separately, rather than in bulk― I mean, who wants
the same nick in every account? That's not good for anonymity, not at all. You
can select which account you'd like to set through a small drop-down menu next
to the status menu, whose icon represents the currently selected account
(asterisk meaning "all").

Rooms also now have default icons determined by the amount of users in the
room― if there's one user, it shows a single person, if there's two users, two
people, etc. It's a small detail I doubt anyone'll notice, but I think it's
cute.

Basic support for receiving formatted messages is now added― right now, only
changes in font face are supported, but colors should be up next.

System messages now get printed to the chat for a wider variety of events, like
nickname-changes.

Tab auto-completion is now a little more reliable, and includes completion
for commands. When used on user names, it'll try to complete for both user IDs
(e.g., their ident or Jabber ID) and display names, since the one you want
varies depending on context.

Chat history is also a thing― you can use the up or down arrows to go through
previously-sent messages, like you might expect.

When a message is sent to a room not currently selected, the room's name in the
conversation list is highlighted, like in Vision. Same goes for when the user is
mentioned, but with a more vibrant highlight color.

Each account now has a "system buffer" (found by selecting the account's list
item, like in Vision), where messages pertinent to the connection or account
as a whole are sent from Cardie or the add-on.

Notifications are now sent on disconnects/connects/disabling, as well as text to
the accounts' system buffers.

Users other than contacts can now be selected in all roster-windows, used when
inviting users, starting chats, and editing contacts― by typing a user's ID
into the search bar (otherwise used for filtering among contacts), you can
select it through a dedicated "search result."

The window's frame and split-views' weights are now saved.

A room's name or topic can be changed through the UI (by clicking on the
text-view displaying them), if the user has sufficient privileges in the room.
URLs in the room topic are now clickable, too.

I think that just about does it. Sorry about the wall of text!


# And finally…
Some good suggestions came in on changing the name in the last thread, too, so
I'll add a poll to this post's thread on the forums with all the suggested names.
Please add your take!

You can find the current repository [here](https://github.com/JadedCtrl/Cardie).

Cheers!
