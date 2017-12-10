+++
type = "blog"
title = "New package repositories are now enabled by default"
author = "waddlesplash"
date = "2017-12-10 12:14:41-05:00"
tags = ["package management", "r1beta1"]
+++

During this year's coding sprint in Toulouse (which I was able to attend, thanks to being in Europe on a study-abroad program), I spent a lot of time massaging HaikuPorts to generate a consistent-enough state of packages for us to switch to them by default, and then making the in-tree changes necessary for the switch. Thanks to this and mmlr's comprehensive overhaul of the HaikuPorter Buildmaster over the past couple months, we have finally switched to the new repositories by default as of <a href="https://cgit.haiku-os.org/haiku/tag/?h=hrev51620">hrev51620</a>. If you've installed a <a href="https://download.haiku-os.org/">nightly image</a> from after this, you should be able to just `pkgman full-sync` and upgrade away.

I've now turned my attention to preparation for beta1. Already talk has resumed on the mailing list of a tentative schedule; there still remains too much to do to expect it before the new year, but with the list of blockers now reduced effectively to two (one relating to installing source packages on the actual release image, which I intend to look into solving soon; the other is about clashing mime supertype declaration and may prove trickier to solve), the actual "release branch" is hopefully not more than a month away.

I've already begun drafting release notes and making build system cleanups as part of preparation. There is finally light at the end of the tunnel – don't give up hope yet. :)
