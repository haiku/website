+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #39"
date = "2014-08-01T08:13:18.000Z"
tags = ["WebKit", "webpositive", "contract", "Services Kit", "contract work"]
+++

The quest to provide a better web browsing experience continues this week with some small fixes which result from hours of tracking down bugs.

<!--more-->

On the Haiku side:
<ul><li>The HTTP port is properly added to the "Host" HTTP header, making it possible to access websites on a non-default port.</li>
<li>Data URI decoding was improved, and urldecoding made safer.</li> <li>More fixes to the HTTP protocol handler for gzipped data. This works reliably again.</li></ul>
Oh, and mmu_man finally provided the gopher protocol handler, so Web+ can now browse the gopherspace!

On the WebKit side:
<ul><li>Downloads (as opposed to showing pages in the browser) will properly send cookies to the server. This makes it possible to download things that are behind a login-wall of some sort, for example gmail attachments, google drive files, dropbox private files, and so on.</li>
<li>Fixed a missing javascript file for html5 audio/video which would make the browser crash when using the standard video or audio controls (the play/pause buttons and progress bar). There are still some drawing issues (and I may have a fix for that soon) with those but at least they don't crash any more.</li>
<li>The file panel for uploading files now remembers the last used directory.</li>
<li>Fixed yet another tricky crash when a request was cancelled and we received an HTTP redirection for it at the same time. This makes Microsoft OneDrive not crash the browser any more.</li></ul>

So, this is a fairly short list of fixes, but the browser should now be more stable. This was made possible by all the bug reports sent on the bugtracker. Please continue reporting issues, as having a list of known problematic websites helps a lot with fixing the issues.