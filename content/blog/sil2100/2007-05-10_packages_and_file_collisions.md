+++
type = "blog"
author = "sil2100"
title = "Packages and file collisions"
date = "2007-05-10T18:29:30.000Z"
tags = ["soc", "usability", "pkg"]
+++

Finally back with a proper development environment.

Seizing the opportunity of having some free time, I finished implementing the user interface and prepared everything for package file parsing. Since I have yet to analyze the .pkg format throughout, I'd rather have everything prepared for this to come. From what I see from the materials sent by Ryan, the format itself doesn't seem to be as complicated, but there are still quite some unknowns. I will have to do some tests on a BeOS platform to see how a few other things work. For instance - unknown various bytes between the package description and the package author and name. Probably unessential though...
I will look into this more as soon as possible.

In the comments of my previous blog entry, the topic of package file collision handling was moved. Even though this is not a very important issue, it's certainly worth some thought. For now, we decided that this will be either left as it is or probably handled in a backup preservation flavor. After adding some attribute goodness (as proposed by Ryan), the result might be quite practical. Let me explain the idea on a simple example.

Let us suppose that the user has CoolApp1 installed on his computer. Now he wants to install package CoolApp2, which has some colliding files with the ones coming from CoolApp1. What will the installer do with such files in this situation? The original ones from CoolApp1 would be renamed as backups and left in the same directory they were in the beginning - with an attribute added to indicate from which package they come from exactly. Then the new ones, from CoolApp2, would be copied in their place.
Now, let's suppose the user uninstalls CoolApp2. The uninstaller would first remove the files belonging to the actual package - in this case, the actual files, not backups. In the next step the previous version of the file, saved as backup till now, would be renamed back to the original name and put in its place as if nothing happened.
If, however, the user would first want to uninstall CoolApp1, the uninstaller would - as previously - remove <b>only</b> the files belonging to the package. In this case, this would mean the backups. Easy.

What are the benefits of such approach? There would be no collisions, having all previous versions properly preserved. Of course, the implementation details are still unknown, as well as the possibility of how the user could have control over this process. PackageInspector, for instance, could then be able to manipulate which version (from which of the installed packages) of a file would be currently in use. Certainly a thing worth discussing.