+++
type = "news"
title = "ReactOS gets USB Stack, with Help from Us"
date = "2012-02-20T23:22:36.000Z"
tags = ["USB", "USB stack", "ReactOS"]
+++

The <a href="http://www.reactos.org/">ReactOS</a> and Haiku projects have had a friendly working relationship for several years now, with each group helping the other whenever possible. These range from <a href="/news/2008-07-14/haiku_to_exhibit_at_linuxworld_2008">helping</a> <a href="/blog/mmu_man/2009-02-09/fosdem_2009_report">each other</a> with conference attendance at <a href="http://www.socallinuxexpo.org/">SCALE</a> and <a href="http://fosdem.org/">FOSDEM</a> to development related matters. Haiku was especially helpful during ReactOS’ successful application to <a href="http://code.google.com/soc/">Google Summer of Code</a> 2011, providing advice and feedback on ReactOS’ application efforts, and the ReactOS project remains grateful for the assistance.

The current ReactOS USB stack was started by Michael Martin, with Johannes Anderwald quickly joining in the development effort. Recently Johannes made <a href="http://www.reactos.org/en/newsletter_90.html#sec1">significant progress</a> in completing its USB stack, thanks to the reference Haiku's USB stack provided.
<!--break-->
Many of the definitions and data structures that represent USB protocols were borrowed directly from Haiku, though the differing operating system design necessitated a great deal of glue to be written to make use of the code. Johannes also referenced Haiku’s USB stack to better understand the behavior of USB devices and subtleties that might not be entirely clear in the USB specifications, and also provided feedback to Haiku as he worked through the code.

<p><a href="/files/images/rosusb.png"><img src="/files/images/rosusb.png" alt="ReactOS installed into an USB stick" width="50%" height="50%"></a><br/><em>ReactOS installed into an USB stick</em></p>

Due to the similar goals and constraints both projects have worked under for much of our histories, we have a fair understanding of the difficulties the other faces. Both the ReactOS and Haiku projects hope that this is merely another chapter in a long line of collaborations yet to come.