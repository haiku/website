+++
type = "blog"
author = "darkwyrm"
title = "R2 R&D: The Filer"
date = "2008-08-09T21:55:19.000Z"
tags = ["usability", "R2"]
+++

Being a go-getter kind of person has, on occasion, actually gotten me somewhere besides into a mess. With having significantly more free time than usual because of being on summer vacation, I decided to work on a document which combined two RFCs I have already written, which can be found <a href="/glass_elevator/rfc/one_desktop_to_rule_them_all_a_proposal_for_revisions_to_tracker">here</a> and <a href="/glass_elevator/rfc/3d_accelerated_haiku_desktop">here</a>. Knowing how it seems like discussions on R2 usability seem to be both endless and unproductive, I decided to put some the ideas into code before publishing it in an effort to demonstrate that most, if not all, of the ideas I propose are practical, reasonable, and worth implementing for the second version of the community's beloved OS. The first of these to see public eye is the Filer.
<P>

<!--more-->

The Filer is an implementation of the <a href="/glass_elevator/rfc/sorting_chute">Sorting Chute</a> RFC on this site with a few small changes. While it is not quite complete, almost everything detailed in the document is in place with a few small changes.
<P>
What's different?
<UL>
<LI>It's currently not possible to call Tracker add-ons, but while it wouldn't take much work to add them, I think that the current implementation makes adding Tracker add-on support unnecessary.</LI>

<LI>Also, the syntax for rules in the document is similar to that used by the Find window in Formula mode. This is good for people who understand the syntax already, but, unfortunately, the syntax is similar to C / C++, which makes the learning curve steep for anyone except power users and developers. As a result, the Filer builds rules like the Attribute mode in the Query window.</LI>

<LI>There's no replicant. It's actually more flexible this way. It can be invoked by dropping files onto a symlink, starting it up from the Terminal, or from the Open With... menu.</LI>

<LI>No drop folder. Actually, there is no single drop folder. The soon-to-be-released version also has a watcher daemon called AutoFiler which can be set to automatically process files that appear. As such, you can have about as many drop folders as you want</LI>

</UL>

If you haven't tried out this incredibly useful tool, give it a try. Its BeBits page can be found <a href="http://www.bebits.com/app/4567">here</a>. Later on we'll see other useful projects like this one. :)