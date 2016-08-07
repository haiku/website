+++
type = "blog"
author = "mmu_man"
title = "Even more themes"
date = "2008-02-01T15:21:50.000Z"
tags = ["gui themes", "theme manager", "3rdparty"]
+++

What to do when you are bored at 1 am, and you see noone sending in new themes ? Make sure you can use more of the existing ones :)

I've never used <a href="http://www.bebits.com/app/1381">BeTheme</a> myself, but it <a href="http://www.bebits.com/search?search=betheme&x=0&y=0">seemed to have gained some fans</a>. So hoping it would bring newer ideas I added some code to the Theme manager to import those themes. It currently supports background pictures, deskbar position and R5 decor. Icons aren't handled yet, but that will have to be done someday.

The structure of BeTheme data is quite simple, a folder contains mime (bitmap) icons as attributes to files (named from mime type with | replacing the /), a TrackerTheme resource file containing replacement bitmaps for Tracker, and a Settings folder containing other files.
The Settings folder can contain a Preview.jpg, several BackgroundN.jpg with N counting from 0, and plain text files (Description, Deskbar and WorkSpaces files). Some themes contain extra files like Settings/WindowShade.
The importer code just queries for "TrackerTheme" files, which worked for all but one themes I could find (but that buggy one also had Settings files in the base folder so it was quite screwed).
It then tries to parse the settings files to add fields by hand to a theme message, and adds it to the list.
Currently it only sets the R5 decor field, and the addons only care of either this field or the dano one but not both, we'll need some fallback method there. WindowShade handling is missing also, for now.

So it's now possible to reuse those existing themes, add colors and save them as native themes.
You really have no excuse now, go make yours!