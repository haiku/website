+++
type = "blog"
title = "Report of BeGeistert 031 in Hamburg"
author = "humdinger"
date = "2018-11-09 19:26:25+01:00"
tags = ["haiku", "begeistert", "event", "meeting"]
+++

<div align="center">
<img width="100%" src="/files/blog/humdinger/BeGeistert_031/BG031_title.jpg" title="BeGeistert 031 in Hamburg " alt="BeGeistert 031 in Hamburg" />
</div>
<p>Only slighty bigger than 2017's "Kernel Debugging Camp" in Toulouse, this year's regular BeGeistert 031 (on its last day affectionately mottoed "The Dirty One") was held from November 1st to 4th in Hamburg.</p>

<p>As in the past when BeGeistert was in Düsseldorf, we had a nice conference room in a Youth Hostel, just with a slighty less nice bedroom. Toiletts and showers on the floor instead of in every room...</p>

<p><i>[Thanks to PulkoMandy for providing some photos in addition to my own. You can right-click and open them in a new window for a larger version.]</i></p>

<img width="33%" hspace="20" vspace="15" align="right" src="/files/blog/humdinger/BeGeistert_031/Youth_Hostel.jpg" title="The youth hostel" alt="The youth hostel" />

<p>The hostel is a bit outside the city center of Hamburg, directly neighbouring a racetrack. No horses around while we were there, but lots of dogs and their walkers and half a dozen lawn-mowing robots that keep the grass short when not on a quest for the nearest charging station.</p>

<p>Contrary to BeGeistert tradition there was no BG-weekend with a following/preceding week of code sprinting, but simply 4 days of Haiku hacking. In the past the general Haiku users came to meet the devs and each other on those weekends. Since attendance has been dwindling over the years, this distinction has dissolved and now it's mainly developers and dev-savvy users for all 4 days.</p>

<div align="center">
<img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/The_Guys_front.jpg" title="The guys I" alt="The guys I" /> <img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/The_Guys_back.jpg" title="The guys II" alt="The guys II" />
</div>

When I arrived on Thursday afternoon, Kacper and Adam were already there, together with our two hosts and organisers Christian and Lorenz. Adrien and Olivier arrived a bit later that evening. On Friday Axel made it to Hamburg and on Saturday Stephan completed the set of Haiku regulars.

While not the crowded event of 25+ people like 10 years ago, we did enjoy the quiet but friendly and open atmosphere. Where one might refrain from bothering someone if you see he's disturbed every other minute, it's very different when in such a small group.

<div align="center">
<img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/Hostel_at_night.jpg" title="Light it up" alt="Light it up" /> <img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/Outlook_favourable.jpg" title="Outlook? Favourable..." alt="Outlook? Favourable..." />
</div>

We did get out a little bit - a nice burger on Friday and a beer on the opening day of a Christmas market (on November 2nd!!) - but otherwise we were all pretty busy. There were no all-nighters like back in the old days, even though Christian and Lorenz donated a box of highly coffeinated cola. The "cola coder" Ithamar was sadly not among us... :)<br />
Directly across the street was a Lidl, where Adam and I cheaply secured a modest stock of beer for some late night relaxing. All around the clock we enjoyed too many biscuits that Lorenz brought from a "Balsen" outlet, together with apples and bananas to pay lip-service to a healthy diet.

<img width="33%" hspace="20" vspace="15" align="right" src="/files/blog/humdinger/BeGeistert_031/Hamburg_Tour_1.jpg" title="Peek-a-boo Elbphilharmony" alt="Peek-a-boo Elbphilharmony" />After lunch on Saturday, Christian and Lorenz took Adam, Kacper, Olivier and me on a sightseeing tour through the harbour. After a short ride with the underground we walked through a relatively new quarter where old warehouses were converted to appartments and offices. Which ironically enough, reverted the conversion of appartments and offices to warehouses in the 19th century...<br />
Soon we reached the new Elbphilharmonie. If Haiku Inc. had 1% of what the costs exeeded the planning we'd be using R2 now... But it sure looks (and supposedly sounds) nice.

<img width="33%" hspace="20" vspace="15" align="right" src="/files/blog/humdinger/BeGeistert_031/Hamburg_Tour_2.jpg" title="Ships in the harbour" alt="Ships in the harbour" />
As the ferries were rather crowded we decided not to wait and went on by foot. Unusually nice weather had us weaving through throngs of people crowding the dyke as we made our way along the shore until we reached the old Elbtunnel where we crossed under the river.

As it was getting late, we decided to skip the originally planned ferry ride and took the underground back to the hostel. Back there we were all glad to sit once more in front of our screens.<br />
Only the next day, when together with Stephan we were wandering through Hamburg while waiting for our train/plane/bus, Kacper mentioned that his boots were not really made for walking, so I guess he suffered in silence... :)

<img width="33%" hspace="20" vspace="15" align="left" src="/files/blog/humdinger/BeGeistert_031/Robert_selfie.jpg" title="Robert's selfie" alt="Robert's selfie" />
On Saturday, just before our group left for the harbour tour, another BeGeistert attendee arrived. Robert Kausch has followed Haiku for a while now, and since he lives in Hamburg he decided to come and present his application [fre.ac](https://www.freac.org/index.php/en). He did so on Sunday afternoon, when Axel and Adrien had already left unfortunately.
fre.ac is an audio file converter that uses its own GUI framework and optimized encoders. It's available for Windows, macOS, Linux, FreeBSD and now Haiku. It's a very nice and capable program, as is its developer. A very welcome addition to the Haiku software world. :)

We had other little presentations as well.
Kacper demonstrated his programming editor [Koder](https://github.com/KapiX/Koder). It uses the scintilla library which provides nice features like syntax colouring, line numbering, code folding and multi-line editing among much, much more. Koder uses automatic stacking of new files which is always nice to see in an app. Kacper and Adam work together to have the Paladin IDE (Adam's adopted project) and Koder work nicely together. Good thing they sat side-by-side this BeGeistert.

Stephan demonstrated his recently open-sourced "Next Generation" [WonderBrush v3](https://github.com/stippi/WonderBrush-v3). While not really usable for productive work yet, it shows much potential. The computing of effects is completely uncoupled from the drawing of the interface. There's no lag when an object is moved; the redrawing may be delayed when blending many layers, but the drawing path itself is always smooth. Objects can now share properties, a bit like Icon-O-Matic: if two objects share one path or colour, changing the path/colour will affect both. Text objects can now contain different fonts, styles, colours and can be edited on-canvas. And that's just the tip of the v3 iceberg...
<div align="center">
<img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/Presentation_1.jpg" title="Gather round" alt="Gather round" /> <img width="33%" hspace="20" vspace="15" src="/files/blog/humdinger/BeGeistert_031/Presentation_2.jpg" title="Huddle" alt="Huddle" />
</div>
I have asked all participants to write a few paragraphs about their work at BeGeistert:

### Adam Fowler aka adamfowleruk

I did a little but announced it already, see the post in the forums: [Paladin IDE release and next version plans](https://discuss.haiku-os.org/t/paladin-ide-release-and-next-version-plans/7809)

Also I've created a plugin concept, primarily for Paladin, but in future generally useful to allow app-to-library and library-to-library integrations to be done easier. Just planning the tests for it now. Have a working poem viewer program using it.

Kacper and I looked at a code editor protocol that is now in both Paladin and Koder. A double click on a build error will open Koder at the right line and column (assuming it's your default source code editor).

### Adrien aka PulkoMandy
Things accomplished on my side:

- WebKit is now up to date, bugfixed, and failing to play videos which explains the lack of a release.
- Cleanups in ffmpeg plugin to use the new APIs. Probably introduces some regressions.
- Experiments with brightness control for VESA (inconclusive).

### Axel aka axeld

I originally wanted to reverse engineer the Gobe Productive document format (to extract the data from it for something like OpenOffice). But other than finding the on disk format hard to grasp, I didn't get much done on that front. I then intended to improve DiskProbe with some utility functions for reverse engineering.

However, I finally ended up working on improving scaling Haiku to high DPI screen resolutions:

- The Tracker now scales its menu icons and list view icons with the font size.
- The Deskbar now scales its tray menu icons, too, but applications have to support this or their icons stay small. All apps in the repository now support this, though.
- The Deskbar also no longer uses a bitmap for its leaf logo, but a HVIF icon that Adrien extracted from the original WonderBrush file. That logo and the title bar now also scale with the font size.

It was really nice to meet you guys (again).

### Kacper aka KapiX

I have:<br />

* added -a switch to locale cmd because LibreOffice can't be built without it anymore.
* made BStringView handle multiline strings properly (and changed hacky BTextViews in SGI and PNG translators).
* done some bug squashing in Koder plus new feature development (specifically external lexers support and the Jam lexer).
* had some great discussions with Adam about development tools in Haiku and where our effort should go next.

It was really great to meet all of you and I hope we can see each other next year or sooner... Thanks!

### Lorenz aka Lorglas

First of all thanks to the developers and visitors.<br />
First I worked on my svn gui (written in YAB).
Then I worked on several imagemagick Tracker addons, as well as an ISO Tracker addon.<br />
On the second day, I reworked the old [BeSly ](http://besly.de/index.php/en/)site to fix broken links. Furthermore, I added error correction to YAB. With Stippi's help, the "drawcircle" bug has now been fixed: DrawCircle created ugly edges before. Also together with Stippi, we fixed the "tree menu" error: The entries from the second level were not sorted correctly bfore. Thanks a lot, Stippi!

It was great fun and I'm looking forward to a BeGeistert 2019.

### Me aka Humdinger
First I worked on [Quicklaunch](https://github.com/humdingerb/quicklaunch) to be more localization friendly. The current version creates a query to find all matching applications for every letter entered by the user. This only works for the English name of an application, i.e. its actual filename. If a user has set the "Translate application and folder names" checkbox in the Locale prefs, Quicklaunch ignores that as it keeps on looking for the English application filenames.<br />
This is now solved. I do just one query at the launch of Quicklaunch and create a list that holds the localized filenames which I then filter according to the user input.<br />
This change went remarkably smoothly. But if you consider the changes to string translations, collateral changes to some no longer needed options and ReadMe update, plus figuring in my bumbling approach to coding, it all took a while...

Next was [Clipdinger](https://github.com/humdingerb/clipdinger). I added the clip text to the tool tip, so you see what you'll paste even if the list shows only the start of the clip. Even with some help by Axel, I'm not happy with the result. I'll revert and try something else.<br />
The other feature I was working on is a filter so you can search the clip history. All is pretty much in place now, but I see some drawing issue where on first use: the strings in the list of clips aren't drawn for some reason. Needs some more investigation.

### Robert aka Robert Kausch

It was my first BeGeistert event and I really enjoyed it. Would have loved to spend more time there with all of you and I'm looking forward to attend again in 2019.

I ported the Monkey's Audio library and command line utility to Haiku (it's now available via HaikuPorts) and fixed a few bugs in the Haiku version of my [fre.ac](https://www.freac.org/index.php/en) audio converter. Also demonstrated fre:ac to those who were still there on Sunday afternoon.

### Stephan aka Stippi

I regret not having spent more time talking to everyone of you. The upside is of course that I spent more time coding.<br />
Most of the time I added features and fixed some bugs in the rewrite of WonderBrush which I am slowly working on over the last years. I noticed my last commit was from three years ago, I have literally done _nothing_ inbetween. At BeGeistert, I implemented a few more filters (Saturation, Brightness, Contrast) and features (Duplicate object, and "Duplicate linked" which works a bit like instancing objects that share resources such as vector paths). I also worked on showing the paths contained in a shape objects right within the layer/object tree and making drag&drop work for them.

Shortly before BeGeistert, I have released the source code of [WonderBrush v3](https://github.com/stippi/WonderBrush-v3), using the MIT license. I do all development "in public" now. If anyone wants to join in, I would be more than thrilled. I will also do my best to answere any question about the codebase and discuss my plans regarding the new WonderBrush.<br />
Since I'm back home, I also located the code to the old WonderBrush as it ships in Haiku. I have now also published the code of [WonderBrush v2.1.2](https://github.com/stippi/WonderBrush-v2). It does not build as is, but should be not too hard to fix. If anyone wants to do a 64-bit port, they now can. I would also accept pull requests which replace the build system if that is easier than fixing the existing one. The code itself should build without problems.<br />
It was a pleasure meeting you all and a big thanks to the organizers of the event!

---

<img width="33%" hspace="20" vspace="0" align="right" src="/files/blog/humdinger/BeGeistert_031/Blue_Leaf_Sticker.jpg" title="Roi Red's leafy sticker" alt="Roi Red's leafy sticker" />
Before everyone left, they got some nice blue leaf stickers that Roi Red has sent over all the way from Spain. Thanks very much, Roi! Here is Kacper's - slightly blurry - notebook where it fits in nicely.

All around a very nice BeGeistert, thanks to Christian and Lorenz and their smooth organizing. Let's hope we'll meet again in Hamburg or elsewhere, ideally with some more attendees!
