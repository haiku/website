+++
type = "blog"
title = "XMPP Coding Sprint Berlin"
author = "Nephele"
date = "2024-07-21 12:09:39+02:00"
tags = ["haiku", "software"]
+++


Nephele's report:

This weekend in Berlin PulkoMandy and I attended an Coding sprint in Berlin to work on Renga, the xmpp client for Haiku.


On the first day we got settled first, had a nice introductory round and worked a bit on Renga. Everyone else seemed to want to work on end to end encryption, and then you have us: PulkoMandy improving the multi user chat experience, and me␚ deleting the settings menu. After all, quite a productive start!


At the end of the day we went to a restaurant and afterwards to get iceream.
tmolitor, maintainer of monal, showed me his application and I helped debug it a bit.


On day 2 I got into a discussion with developer of Dino (a GTk4 client), fiaxis, and developer of Prose, marc, about what we could all use for message styling, as in: what transport is used.


One problem in xmpp is there are often overlapping XEP␚s that provide similar functionality. In this case there was: XEP 0071 which provides a subset of xhtml, and the most comprehensive support for colors, text styling. etc. However this was deprecated: mosty because some clients would parse this as html without sanitizazion, and additonally violating the xml subset rules xmpp follows.
A related concern to this is that the legacy version of OMEMO encrypts only the message body: since XHTML-IM is not stored in the body element of messages, it would end up sending the message in plaintext anyway. But this is already solved by OMEMO 2.0 (however this is not widely implemented).


Since #71 was deprecated without a sufficient replacement, several clients continue to implement it, at least for receiving messages. In Renga's case, support for XHTML-IM is needed for use with IRC channels (Biboumi uses it for converting IRC colors) and also for use with some notification bots to include hyperlinks in messages.



Secondly there is XEP 0393, which uses a markdown-like format. It is a lot more limited than XHTML-IM (with only a small subset of Markdown commands available) and has the same potential security risks as XEP 0071, since Markdown allows inline HTML, a badly written client could put the whole message into a markdown interpreter and end up with unwanted HTML markup in the output. Implementing XEP 0393 is complicated, it requires a specific parser and a complex test suite. It also sometimes interferes with special characters used in a normal plain text context.


And thirdly XEP 0394, this specifies styles in manners of start and end positions.
For example (semantically): make this text bold from character 31 to 51.
The major disadvantage to this is that this specification defines way too little for our usecase. Currently no underlines, no destinction between italic and bold.
I was told that the haiku client can simply add more tags and add those to a haiku specific namespace, and then Renga can support it for itself.


So now we know which ones are available to implement, which one will we choose? Why all three at once of course! Biboumi the irc bridge we use uses xhtml-im; some clients like Psi can only display xhtml-im. On the other side Dino will not support xhtml-im, but will use 394, but with a fallback to 393.
So for that case we will need to support 394, and for 393 properly implement removing characters from a XEp we don␚t support from the string.



On day three I started working on some generall cleanup of Renga and hiding the superItems when they are empty (so no more online/offline categories if nobody is in them)
Most of the group went to a restaurant, I stayed behind with tmolitor to guard the door (of Wikimedia). He showed me a really nice logging application and explained how monal does remote logging. In the future it would be great to make the logging server of Haiku do structured logging in a similar fashion, and alsohave it talk over the same network protocol for some remote debugging!


There is already preliminary support for similar logging in webkit and Renga, with a devconsole log viewer written by PulkoMandy based on BeDC.
That already gives us some starting points, neat.




PulkoMandy's report:


On my side, my first goal with Renga was to build a replacement for Vision for my use in Haiku. I think this goal is almost accomplished already, I am using Renga for access to many IRC channels. My second goal is to implement the basics of XMPP instant messaging, following the recommendations of XMPP compliance suites. This is a set of recommended XEPs for various features (instant messaging, audio and video calls, etc) and multiple levels of compliance ("basic" or "advanced").


During this sprint I focused on the support for MUC (Multi-User Chat) which is how XMPP currently implements group chats. Renga of course already supports most of it, but not everything, as the specification has actually quite a lot of features. I started the weekend by implementing private messages in MUC (this allows to chat with other participants in a chatroom without having to reveal each other's JID address). I also implemented nickname changes, sending and displaying of "part" messages (a message sent when leaving a chat room), renaming of group chat bookmarks, and a new window for viewing each chat room privacy settings (wether your address is shared with other people, if there is apsword protection, who is allowed to talk, etc). Finally, I implemented displaying of status (away, do not disturb) and status message of group chat participants.


My next tasks will be to also allow changing room configuration, setting a custom status message, and adding all actions available for group chat administrators (kicking and banning users, granting permissions to other users, etc). And the last parts of MUC implementation will be: sending and receiving invitations to chat rooms, and listing of available chat rooms on the user's server (making it easier to discover new communities to chat with, directly from inside Renga).


While this is not the most exciting work, I think it is important to get these basic things done right before starting to implement too many new features. I also have quite some work to do to reorganize and clean up Renga internals and make it easier to implement htings "the right way" (mainly to avoid threading and locking issues).



Conclusion:

All in all it was quite fun! PulkoMandy mentioned to me that coding sprints used to be held for Haiku in Düsseldorf, and the location still exists and is available (In general). I also asked the wikimedia employee in Berlin about a coding sprint there, and we can request to use their offices for it. (They would then determine how much overlap wikimedia has with the project, if they rent it out or sponsor. etc)

Perhaps after Beta5 is released we could have a coding sprint again. I'd be excited!
