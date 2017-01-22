+++
type = "blog"
author = "stippi"
title = "WebPositive gets polishing"
date = "2010-04-03T19:55:20.000Z"
tags = ["webpositive", "native browser", "WebKit", "contract work"]
+++

Hah, you wish! These blog titles are getting way ahead of the progress I make with WebPositive. Or let's say the title is truthful in some ways, but on the other hand perhaps suggesting more substantial progress than what was made. I did turn my attention to fixing a lot of little annoyances and bugs that were reported via various channels, the comments section of this series of blog entries being among the important sources of feedback. So keep the good feedback comming, it's very useful for me!

<!--more-->

Before I recap what stuff got done, let me quickly say that I didn't tackle most of the bigger TODO list bullet points I keep mentioning. I did start with getting affine transformation support into the BView graphics stack features, but BAffineTransform, which I reimplemented from it's previous incarnation in order to get rid of introducing Anti-Grain Geometry classes into a public header, is not yet used anywhere. Also I didn't upgrade the WebKit SVN revision that the port is based on. That's in part due to some emails on the webkit-dev list which suggested stability may have seen some regressions, at least in intermediate revisions. I shall review the WebKit change log and make an informed decision about upgrading, otherwise stability could be worse when I just use any random version. Also I did not yet investigate into using the WebCore internal allocator in order to perhaps get rid of some memory misalignment related crashing bugs. No clipping paths, no alpha masks, no advanced compositing modes.

But enough with the depressing tidbits of what I didn't get done and let's look at what I did get done since the last blog post. The last official package was SVN revision 333. Now we're at 382. Let's see...

<ul>
<li>Rendering of box elements with round corners tweaked. (May still render with hard corners due to missing clipping path support. Depends on how much of the box element is visible on the page.)</li>
<li>Fixed a crash on program start if you started typing into the URL field really fast.</li>
<li>Added General page in settings window with option to specify the maximum age of URLs in the browsing history and the download folder location.</li>
<li>Many bugfixes with downloads.</li>
<li>Downloads node-monitoring and indication when they are gone or have been removed. Stopping of a download when the file is moved to trash.</li>
<li>Display of download progress stats (speed and estimated finish time).</li>
<li>Some bugfixes with favicons and they should render better. Opening a link in a new tab will no longer remove the favicon from the current page. Research into some remaining problems suggests problems in the Haiku port of sqlite3.</li>
<li>Fixed some graphical glitches when scrolling sub-frames.</li>
<li>Fixed weird characters being copied to the clipboard which results into GCC errors when for example pasting code into an editor and trying to compile it.</li>
<li>Restoring of document fragments from the system clipboard when it has text/html data.</li>
<li>Pages which loaded in the background are rendered properly when switching to their tabs.</li>
<li>Text input fields have their frame now properly blended with the background of the page.</li>
<li>Custom border styles on menu list input fields have been turned off (as in other browsers) in order not to interfere with the BMenuField look.</li>
<li>Fixed problems with programmatic opening of new windows/pages. The GSoC Melange web app was unusable before. The Haiku User Guide translation site is working now. Closing programmatically opened pages will no longer close the entire browser.</li>
<li>Implemented better programmatic resizing behavior. Pages will never resize out of the screen space.</li>
<li>A fix to passing on mouse moved events to WebCore has enabled displaying URLs for hovered links and tool tips.</li>
<li>Implemented whole page zooming support. This option is not yet remembered across sessions, but the default of zooming text only seems to work better in practice anyway, at least IMHO.</li>
</ul>

As you can see, no big items really stick out, but I hope you still agree that the blog title is still somewhat deserved. :-)

Happy Easter: <a href="http://www.yellowbites.com/downloads/WebPositive.zip">Download WebPositive</a> (SVN revision 444)