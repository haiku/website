+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #45"
date = "2014-09-19T07:02:19.000Z"
tags = ["contract work"]
+++

Hello everyone!

As usual, after the 1.4.4 release there were some new bug reports for me to work on. So the first part of the week was spent investigating and fixing some of those.
<ul>
<li>Several problems were fixed in the video code, which are leading to deadlocks and/or crashes of WebKit after a video is done playing.</li>
<li>A problem with text not being drawn (seen for example on Trac) was fixed. This is apparently a new bug introduced on WebKit side, where small text with shadows ends up not being drawn at all. I'm not sure my fix is completely correct, but it seems to work.</li>
</ul>

<!--more-->

On Haiku side, we now have proxy support. I implemented only the most basic part of it: HTTP-only (no HTTPS) and without authentication. I will complete these two missing parts next week. Since this is implemented on the Services Kit side, it will be available to all applications using that API (currently WebKit and HaikuDepot for metadata fetching). There should be a system-wide setting to configure the proxy, but our current Network preflet is not really designed for this. So I will also have a look at finishing the rewritten version, which is basically working but needs some UI changes.

I also worked on the migration to Python 2.7, which went smoothly. We were using the long outdated Python 2.6, and migrating required rebuilding all Python libraries against the new Python version. This was also a good time to update some other packages, so we now have a more bugfixed git, and a newer subversion.

Finally, I also did some work on a VLC 0.8.6i package. This is the old version of VLC with a native BeOS interface. This is an attempt to solve the problem that there is no DVD playing application available in our repositories yet. However, the VLC code is rather old and needed updates in several places to build against the newer libraries we now package. I worked on this with Diver and we are re-adding support for each of the libraries, one at a time, to get a VLC build as complete as the BeOS version.