+++
type = "blog"
author = "sil2100"
title = "Usability goodness"
date = "2007-04-22T18:13:49.000Z"
tags = ["soc", "usability"]
+++

Who would have thought that something like me being chosen as a student for GSoC would actually happen. But it did. Blissfully indeed.

Anyway, designing a good user interface is not as easy as it seems. The truth is, not even for a second did I think it was, really. On my project road map, I've set designing the installer UI as my first task. Following the discussions with the Usability Team, a satisfactory concept came to life. The final result doesn't reassemble a bit what I imagined when writing my application - but it's much better than the latter. The major difference is in the approach - there's not much reassemblence left with the old Be's SoftwareWallet design. Even though their idea was quite intuitive and useful, there were many things that 'could have been done better'. Thanks to DarkWyrm and Waldemar for making me understand this better!

As for the design itself. We decided that the 'Groups' list view is quite unnecessary, since there's rarely more than two installation profiles available. Instead, a simple BMenuField would do the job better - renamed to a more appropriate 'Installation type' label. Beside rearrangements, the window title tab label naming was changed to 'Install PackageName' instead of 'PackageName'. We also came to a conclusion that having a 'Install' button is more informative than simple 'Begin'. The installation size and volume disk space information would be included beside the two drop down menu choices, so that the user would know this info immediately after dropping down the menu. An exemplary screenshot of how this would look like can be seen below.

<span class="inline center" style="width: 535px;"><a href="/" onclick="launch_popup(1653, 535, 210); return false;" target="_blank"><img src="http://haiku-os.org/files/screenshots/packageinstall_ui.png" alt="PackageInstall user interface design screenshot" title="PackageInstall user interface design screenshot" class="image img_assist_custom" height="210" width="535"></a><span class="caption" style="width: 533px;"><strong>PackageInstall user interface design screenshot</strong></span></span>

In user interface design every detail is important - this is what I came to understand during the past few months. A perfect solution does not exist. Good user interface design is a matter of choosing the most optimal 'design philosophy'. I believe this time we made a good choice. We will see in time if this is true indeed.
First stage almost clear, I'll try to move to the implementation stage as soon as possible. Beside this user interface, two more are waiting in line - the PackageInspector and PackageUninstall designs. Yes - there will be a native .pkg uninstaller this time. Stay tuned.