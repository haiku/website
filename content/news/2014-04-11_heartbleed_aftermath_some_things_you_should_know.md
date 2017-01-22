+++
type = "news"
title = "The Heartbleed Aftermath... Some Things You Should Know"
date = "2014-04-11T17:28:16.000Z"
tags = ["website", "openssl", "security"]
+++

As most of our visitors have probably already heard in the last few days - one of the largest security disasters I can recall in modern internet history was discovered, and dubbed "Heartbleed".

<!--more-->

I'm not going to describe the technical details in this post.

What I am writing to let everyone know is that all of the Haiku-run servers were also affected.

I patched the OpenSSL on our servers the same day it came to my attention. Since then we also have created a new private key and requested a new SSL certificate from GlobalSign.

Anyone accessing the Haiku servers should assume that our old certificate from StartCom is invalid - if you see it in use, it suggests we either missed updating the cert somewhere, or it is being forged using a leaked private key from our servers (Unlikely, but possible, as mentioned by security experts.)

Since nobody knows if/when this bug may have been first exploited, everyone must assume that it's been exploited in the wild since it was first introduced over 2 years ago. I don't currently have specifics on when our servers began using an affected version of OpenSSL either.

While I personally doubt Haiku's servers were ever maliciously exploited, it would be prudent to change any passwords you are using on our servers (and others if you re-use credentials across multiple websites). Even if our site passwords weren't snooped, it's possible that anyone using the same usernames/passwords on multiple services may have had theirs compromised by other higher-profile servers affected by the same bug.

As a final note: we have not yet successfully revoked the StartCom certificate, and it seems they are making the process difficult by charging for certificate revocation. To keep track of our progress, you can follow <a href="https://dev.haiku-os.org/ticket/10742">Ticket #10742</a>.

Thanks for your patience while we work through this issue.

- Urias