+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #59"
date = "2015-01-16T08:11:38.000Z"
tags = ["contract work"]
+++

Hello world!

I have not given any news from the Google Code-In for some time. It ends this week, and students have completed more than 400 tasks for Haiku. While this includes a lot of simple tasks (the simplest "getting started" ones involved just booting Haiku and running StyledEdit), it means the students at least got to see what Haiku is. We have a more complete set of recipes in haikuporter waiting to be packaged.
<!--break-->
Talking about automating package building and uploading, there is ongoing work at http://haikungfu.net. If you want to help Haiku and know some Ruby on Rails, it may be a good opportunity to join this effort at https://github.com/kallisti5/haikeuken.

If your thing is Javascript, we also now have a buildbot dashboard at http://kallisti5.github.io/. This shows the build status from our buildbots in an easily readable way. I contributed some code to this dashboard, which is mainly based on work by the WebKit team (thanks!) and some hacking by kallisti5. If you think you can help with improving this code, your help is welcome.

Back to Haiku development now.

<ul>
<li>hrev48638 (from a GCI student) updates the Shortcuts preferences to use the current implementation of ColumnListView. This looks better and fixes a licensing issue as we used an illegally modified Santa's Gift Bag version of the class until now.
<li>hrev48639 fixes a missing initialization in BTextView.
<li>hrev48674: identify "host:port" URLs in WebPositive and do not trigger a search when they are used.
</ul>

I migrated the kernel code for several components from khash to BOpenHashTable. khash is a hash table implementation we inherited from NewOS. It is written in C and has some limitations, mainly, it is not type safe, and it is not autogrowing, which can create some performance problems. To address this, a replacement was written, called BOpenHashTable. This one is written in C++ and provides an optional "autogrow" mode. However several parts of the code were never migrated to the new implementation. Now they are, and khash was removed from the sources. The user visible consequence is a slightly faster Haiku, but mainly this is an effort to make the kernel code cleaner and more readable.

In hrev48676 I completed the "driver settings" implementation. This is a piece of code used to handle settings file in a common format. While originally designed for drivers, its use in Haiku was generalised to several other things like the network services settings. However, the implementation did not handle the case where the API would be used inside the kernel, but not in a driver. And we did use it this way, mainly in our file system code. This would result in memory leaks in the best case, and since there were some uninitialized values, it could also sometimes trigger a kernel panic or random memory corruption. Now it's fixed and these issues are gone.

I don't think this was announced yet, but Axel finally merged his "IMAP rewrite" branch. As you know, IMAP was left in a rather broken state after an unfinished rewrite attempt by Clemens. Because of this it was not included in the alpha3 and alpha4 releases. Axel worked on (another) rewrite in a branch, and we decided to merge this now. The IMAP code itself may not be stable enough for inclusion in beta 1, but this brings a lot of updates to the mail system in general. There are unfortunately also a few regressions, which I started fixing in hrev48678. I will have a look at the existing "mail" related bugs (not all of those are solved, yet).

While working on mail, I investigated the issues with GMail (which is still not working). Since this is a rather popular mail provider, we should fix this. The issue was quickly identified and is linked to a problem in our DNS resolver, which will return IPv6 addresses even when there is no IPv6 interface configured in the system. Our DNS resolution uses code from libbind. While this used to be the standard, there was no update to the library since 2009. glibc now has its own DNS resolution code. The *BSDs all use variants of the libbind code, with various fixes. In 2013, NetBSD took over development of libbind, but they haven't done a new release yet. They did, however, extract all the changes they made to it into a set of patches. I'm currently trying to merge this into Haiku. This should bring us several things:
<ul>
<li>Many 64-bit related fixes, including fixing function prototypes and bounds checking where needed
<li>Some sanity checks in various DNS related functions, so they crash in more understandable ways when given wrong parameters
<li>A more BONE-compatible API for the reentrant functions (gethostbyname_r, getservbyname_r, etc). For some reason our prototypes for those functions did not match BONE and some of them actually made the functions unusable.
<li>And a downside: possible ABI breakage for code using those functions with the wrong Haiku prototypes. But it's better to do this now, before R1 is out.
</ul>
The merge turned out a bit more complex than I expected, as over the years NetBSD rewrote the whole DNS code and made several other changes to libbind, some of them relying on BSD-specific system functions. Fortunately, our BSD compatibility wrapper comes to help here. I'm still working on getting the whole thing to compile. Once this is done, we will have more up to date code and it will be easier to compare with the other systems to see what we are still missing.