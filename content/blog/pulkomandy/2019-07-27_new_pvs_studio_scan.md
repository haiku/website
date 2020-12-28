+++
type = "blog"
title = "new PVS studio scan"
author = "PulkoMandy"
date = "2019-07-27 10:18:34+02:00"
tags = ["haiku", "software"]
+++

PVS studio has just published a series of 3 articles looking over errors and
bugs they identified in our sourcecode. PVS is a code static analysis tool
that identifies code likely to be incorrect.

They had already run a similar scan back in 2015. At the time, their tools
ran on Windows only which had made this quite a challenge for them. They are
now more Linux friendly, so it was much easier for them to perform the scan.

Haiku developers were given early access to the scan results and have already
started fixing some of the problems found in this report. There are still
more to go over and investigate, however.

<ul>
<li><a href="https://www.viva64.com/en/b/0640/">First part of the report</a></li>
<li><a href="https://www.viva64.com/en/b/0644/">Second part of the report</a></li>
<li><a href="https://www.viva64.com/en/b/0645/">Third and last part of the report</a></li>
</ul>

It isn't always nice to see how many small issues like this are present in
the Haiku codebase. It turns out some of them are from code we imported from
NetBSD (ftp client, which has been replaced by a more up to date version from
NetBSD, DNS resolver, ...) or inherited from BeOS (in Tracker and Deskbar code).

That being said, we have our part of responsibility on this as well.

You can help investigate the issues by looking at the <a href="https://pulkomandy.github.io">complete report</a>.
Issues marked in green have already been fixed, but as you can see there is still
a lot to investigate.

PVS has offered to run a new scan after one or two months, to see how well we
did at cleaning up all of this. We are also discussing ways to setup a more
automated and frequent scan to avoid these errors accumulating again.

Thanks to PVS for providing their tool to open source projects in this way!
