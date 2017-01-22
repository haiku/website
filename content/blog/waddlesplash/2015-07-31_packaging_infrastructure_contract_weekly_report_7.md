+++
type = "blog"
author = "waddlesplash"
title = "'Packaging Infrastructure' Contract Weekly Report #7"
date = "2015-08-01T01:00:40.000Z"
tags = ["contract work", "infrastructure", "package management"]
+++

Hello again!<br>
<br>
A lot has happened since last week. The DHCP bug that has been plaguing Haiku for over a month is now fixed, some various other issues have been cleared up, and the Kitchen has a lot of edge-cases fixed and properly parses dependencies.

<!--more-->

<br>
<br>
I didn't do very much work on Monday for various reasons. On Tuesday and Wednesday, I spent some time investigating the DHCP bug, which lead to some bugfixes in BNetworkAddress. I was working alongside a couple other members of the Haiku team, who were also investigating it. It was a rather hard bug to track, and PulkoMandy eventually fixed it late Wednesday, which meant that Haiku was finally stable enough for me to look into deploying Kitchen builders.<br>
<br>
With that bug fixed, I went back to working on Kitchen. Between Thursday and today, I finished work on the dependency system, which now can properly create a dependency list for the entire HaikuPorts tree. This was a very complex feat, as it required a properly working recipe parser (which I fixed a lot of edgecases in on the way), a properly working dependency generator, and properly written recipes (e.g. HaikuPorter doesn't care if a recipe depends on itself and will happily resolve that dependency with an older version of the package, but you can't do that when trying to build the tree in a linear manner). But the Kitchen side of things at least does work, and I hand-verified the first 20 or so listed packages, and it seems sane.<br>
<br>
So at this point, all that's left is to tie all the completed systems together, add a few last missing features (e.g. hybrid support -- should be < 20 LoC changed), and generate a HPKR file from the uploaded packages. I've got ~4 days of full-time work remaining, which is more than enough for all this -- I should have all of those things completed by the end of one day.<br>
<br>
See you next week!