+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #55 - GCI and more"
date = "2014-12-05T08:39:10.000Z"
tags = ["contract work", "beta1", "R1"]
+++

Hi!
So, this week marks the start of the Google Code-In contest. I've spent some of my time preparing some tasks for it as well as reviewing the work from students. Our IRC channel is incredibly busy, and there have been 110 tasks completed by 65 students already. You can currently watch the leaderboard here for unofficial stats: http://ematirov.tk/org/haiku/
<!--more-->
Anyways, I've also been working on my own, and continuing to fix issues currently set for the R1 milestone.

<h3>New and updated packages</h3>
The process of uploading packages to the HaikuPorts repository is still a manual one. This week the new packages are: BeMines (hrev48400), NetFS (hrev48410), vmware add-ons (hrev48428), mc, mtr, pecorename, colors! (hrev48438)

One that deserves a special mention is fontconfig. The package was added in hrev48412. Nothing special here, but this will soon be used to complete the implementation of BFont (still missing support for Blocks, and IsFullAndHalfFixed). This is one more step towards locale-sensitive selection of the default font, which is still a problem for all languages not handled by the default DejaVu Sans font. fontconfig can be used to know which fonts are suitable for which languages, allowing us to make better decisions for our default settings.

<h3>UI fixes</h3>
<ul>
<li>hrev48399 - FileTypes: It was possible to use a folder as the preferred app for a file type.
<li>hrev48409 - Mouse: further tweaks to the "preview" mouse to look nicer after comments from other devs.
<li>hrev48411 - Locale: Default button didn't work right because of a misuse of BOutlineListView
<li>hrev48416 - Screen: layout improvements, make the video driver used more visible
<li>hrev48417 - Decorator: about box is localizable (you can view it in the appearance prefs)
<li>hrev48422 - DiskUsage: drawing problem when keyboard navigating to the BTabView (using the tab key)
<li>hrev48424 - Network prefs: now can be localized (the Jam rule was missing)
</ul>

<h3>Not UI fixes</h3>
With the flow of activity from the GCI students it was hard to concentrate on anything more involved. So not much of those this week.
<ul>
<li>The disk image driver (the one used with the diskimage command line tool) now supports device icons. These are visible in DriveSetup and the mount menu in Tracker.
<li>A sniffing rule was added for the MP4 format.
<li>Synaptics touchpad probing improvements, merging an old patch from druga's "haiku-stuff"  repository. I didn't test this as my machine doesn't have a touchpad, but it seems it improves the detection of Synaptics touchpads. So if you had problems with yours, it is time to try a new nightly, and if yours worked it is time to test if it still does.
<li>Expander can extract files with a backslash in the path. Silly one-character fix but it can be handy.
</ul>