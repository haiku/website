+++
type = "blog"
author = "waddlesplash"
title = "'Packaging Infrastructure' Contract Report #5"
date = "2015-07-18T16:17:15.000Z"
tags = ["contract work", "package management", "infrastructure"]
+++

Hello again!<br>
It's been two weeks since my last report, as I wasn't working full-time these past two due to some outside appointments and other conflicts. I'll be back to working full-time next week. Despite this, I managed to make a lot of progress on a number of fronts.
<!--more-->
<br>
<br>
As mentioned previously, the next thing to work on in the build server was file transfers. These are now complete, and the build server is now capable of handling file transfers from the client to the server. This is a crucial feature, and it needs to work well, as essentially the whole function of the server revolves around transferring packages from the client to the server so they can be distributed. It took a bit of trial and error, but it now works well, and the transferred files pass checksum tests. All of the transfers occur over TLS, so integrity and security is ensured as well.<br>
<br>
Since I crossed the halfway point in the contract, I submitted an invoice to Haiku Inc. for the first half. Ryan Leavengood took the time to review the code I was writing and give suggestions on what to improve. I spent yesterday working on a lot of his suggested cleanups, and the code is significantly more understandable to others as a result.<br>
<br>
On the HaikuPorts front, I made some more progress in cleaning up HaikuPorter. At this point, there's not much else to do without a full refactor, and it's solid enough that running it on unattended build machines is probably fine. Most of my efforts here were focused on linting, as it's best if more problems can be caught before the build even starts, rather than try and handle a contingency after the build has already started (as there might be multiple machines working on a build of a set of packages at once.)<br>
<br>
Next week, I'll work on dependency solving, and HPKG repository management. This will enable Haiku Kitchen to detect when packages are out-of-date with the recipes, automatically rebuild them, and generate the HPKR file needed for <code>pkgman</code> and friends to be able to install them.