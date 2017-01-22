+++
type = "blog"
author = "waddlesplash"
title = "'Packaging Infrastructure' Final Weekly Report"
date = "2015-08-07T20:27:23.000Z"
tags = ["contract work", "infrastructure", "package management"]
+++

Hello everybody (and goodbye, since this is the end of my contract)!<br>
<br>
The week has gone very smoothly for me. Dependencies are resolved, builds are created, secondary architectures are handled, and builders can now be updated on-demand by administrators. There probably are a few bugs left to be ironed out, but the bulk of the work is done, and I will have enough time to iron out the last kinks.

<!--more-->

<br>
<br>
The only thing that remains to be done at this point is to (abuse-)test it, and deploy it. I've already started talking to Oliver, Urias, and the other server administrators about the best way to incorporate it into our existing setup. Once that's done and it produces a stable set of packages, we will start using it instead of our hand-build packages as the default setup for Haiku.<br>
<br>
The Git repository also now has a permanent home at HaikuPorts on GitHub. There's a redirect in place from the old location, but you can find it <a href="https://github.com/haikuports/haiku-kitchen">here</a> in case you don't have the link saved.<br>
<br>
Thanks to everyone for donating to make this contract possible!