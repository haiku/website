+++
type = "blog"
author = "PulkoMandy"
title = "More news from WebPositive"
date = "2013-09-12T17:03:15.000Z"
tags = ["webpositive", "WebKit", "contract", "contract work"]
+++

Hi everyone,
It's been two weeks since the previous blog post, so here goes an update.

First of all, I wanted to make it clear that I haven't started to work on my contract, so the few things that happened in the last two weeks were done on my free time. Said free time was short, as I'm in the process of moving to another city and I've been packing a lot of stuff and cleaning my flat. Note I will be offline starting next week, and I hope to get internet access back as soon as possible. I won't start working on the contract before I'm back online, as testing a web browser without any internet access creates more problems than I'm willing to solve.
<!--break-->
Anyway, on to the work done !

I'll start on the Service Kit side. By testing some websites I often use, I found that chunked http transfers were not working properly. This was tracked down to the use of a static variable in the chunked transfer code, and was solved in https://cgit.haiku-os.org/haiku/commit/src/kits/network?id=2ec188b9032a9c642a27c26819d41c8311993492 .

Next was some work on cookies, which were not working at all so I couldn't login to anything. I found out that WebKit leaves handling of cookies that come inside the http headers to the http transport (in our case, the Service Kit), and handles other cookies (set from html tags or javascript function calls) itself, forwarding them to the transport layer for storage in the cookie jar.
So I went ahead and added support for http-header cookies in https://cgit.haiku-os.org/haiku/commit/src/kits/network?id=a8dd17c9b929dbe8e677238e6de088692a2cac27 . This solved some of the issues, but not all of them. For example I still can't log in to my google account. I guess this uses the latter kind of cookie and that part isn't working yet. I'll try to find some time.

On the WebKit side now, the first thing to notice is the availability of the official haiku-webkit repo at https://github.com/haiku/haiku-webkit . I will be pushing my changes there. I'm working in the <a href="https://github.com/haiku/haiku-webkit/tree/bnetapi">bnetapi branch</a>.

The work done is mostly small fixes and cleanup. It does gets forms working (this also helps with logging in to many websites).

So, that's it for now. I've uploaded a test build of HaikuLauncher (including the updated WebKit):
http://pulkomandy.tk/drop/libbnetapi.so
http://pulkomandy.tk/drop/HaikuLauncher.zip

Remember this is highly experimental, so don't replace your system libs with it. I'm waiting for your test reports, however.