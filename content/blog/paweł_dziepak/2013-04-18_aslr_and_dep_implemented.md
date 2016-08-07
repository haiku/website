+++
type = "blog"
author = "paweł_dziepak"
title = "ASLR and DEP implemented"
date = "2013-04-17T22:37:35.000Z"
tags = []
+++

<p>Starting with hrev45522 address space layout randomization (ASLR) and data execution prevention (DEP) are available in Haiku. These two features, which have actually become a standard in any modern OS, make it much harder to exploit any vulnerability that may be present in an application running on Haiku thus generally improve system security.<p>
<!--break-->
<p>DEP requires hardware support, but since it is not a cutting edge technology anymore any Athlon 64 (or later) or later versions of Pentium 4 would suffice. Haiku automatically determines whether it is available. The main advantage of DEP is that, very common in the past, attacks based on stack buffer overflows are no longer trivial virtually making system safe against such kind of vulnerabilities.
<p>Second feature, ASLR, does not require hardware support and is always enabled. All areas in application address space are at random locations making stack based overflows even harder to exploit. Moreover, ASLR is very good at making return to library attacks impractical and in general making the system behavior less predictable for the potential attacker.</p>