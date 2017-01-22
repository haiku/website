+++
type = "blog"
author = "mmu_man"
title = "BeGeistert soon, EuroSys 2010, and GoogleFS works again!"
date = "2010-04-08T00:19:42.000Z"
tags = ["begeistert", "eurosys", "GoogleFS", "google", "filesystem", "bookmark", "query"]
+++

<a href="http://begeistert.org/" title="BeGeistert">BeGeistert</a> is nearly on us, with the long awaited return of the ColaCoder™, and of course I must be there.

I didn't commit much recently since I started doing a Ph.D and it's, well, time consuming, so left Axel and Ingo alone in the race.

I won't be able to attend the coding sprint as well this time, but because I'll attend the <a href="http://eurosys2010.sigops-france.fr/" title="EuroSys 2010">EuroSys 2010</a> conference (a really <a href="http://citeseerx.ist.psu.edu/stats/venues?y=2007">highly ranked</a> research event about computers), and I'll have the honor of doing a demo about Haiku at the poster session (my poster was selected in the best 5 btw), and of course I had to get googlefs working again to show it.

<!--more-->

<img src="http://revolf.free.fr/beos/shots/shot_googlefs_works_again_001.png" alt="googlefs screenshot">

I managed to work around the changes in the VFS to get it working (opaque cookie vs. fs_vnode, argument changes...). It would really deserve a rewrite, possibly in C++ (yeah Ingo, doesn't mean I like the idea of C++ in the kernel :p), and maybe using userland API and userlandfs to provide more features, like publishing non-html entries (PDF, ...) with automatic download on copy... Note the queries are only accepted for bookmark files to make sure Google doesn't get all your searches (including checks for new mails), and for now only accept searches in the "name" attribute (but Google actually searches it everywhere). It should be possible to make the query code more complex to pick up other searches and convert them to google's keywords (filetype:, ...) to search for pdf files newer than 2 months for example. But at least it's working again in Haiku. 

In case you'd like to try it on your own, first make sure you have the latest image, then open a Terminal and type:

<pre class="terminal">mkdir /google
mount -t googlefs /google</pre>

You'll see a new volume on your desktop with some eyes watching you on the icon. Open it, and use the query template "Search Google". Just type your query in the dialog as you would in Google, and hit <span class="key">Enter</span>. You'll get a new Query window, with up to 50 results (the first 50 Google finds). It might not be 50 exactly since some results are skipped (like PDF files) for now.
Of course as with other queries, you can copy them (like on your desktop, or in the Leaf Menu!), and each time you use them they will return up to date results (but make sure you have googlefs mounted and a working connection...). you can also of course copy the found bookmarks as well, or the whole folder created in /google, which then will not be updated but on the other end won't need a connection to be used.