+++
type = "blog"
title = "Recovering from RMLL 2017"
author = "mmu_man"
date = "2017-08-15 00:00:00+01:00"
tags = ["haiku", "RMLL", "LSM", "conference"]
+++

<img src="/files/blog/mmu_man/RMLL2017_DSCN5675.jpg" title="RMLL booths during the week-end…" alt="RMLL booths during the week-end…" width="25%" height="25%" align="right" />It took me some time to write this report, between other stuff and a cold caught in July (WTF?). But still, plenty of stuff happened at this year's edition of [RMLL/LSM](https://2017.rmll.info/) so I had to let you know.

Since the RMLL didn't take place last year, as no city applied, I was quite impatient to see what this year's edition in Saint Etienne would bring. By the way, if your hackerspace, LUG (or HUG?) wants to organize the next edition, [you should apply quickly](http://comite.rmll.info/), but be warned, it's quite a job!

<!--more-->

The week-end was held in the town center, with a few booths to seek locals and entice them into visiting the university during the week. The organization team even made a [batucada](https://en.wikipedia.org/wiki/Batucada) to do some buzz!

<img src="/files/blog/mmu_man/RMLL2017_DSCN5683.jpg" title="Saint iGNUcius blessing the computers…" alt="Saint iGNUcius blessing the computers…" width="25%" height="25%" align="left" />On Sunday Richard Stallman gave a talk at the nearby cinema, with a full room to the astonishment of the owner of the place. While we're used to it after all those years, his speech has evolved with [his TEDxGeneva talk](https://www.youtube.com/watch?v=Ag1AKIl_2GM), now including nicely drawn slides, and the added fluidity and clarity makes it more understandable to non-techies. He also performed as his secret identity, [Saint iGNUcius](https://stallman.org/saint.html), which is always funny to watch.

There were several possible accommodations. Olivier and I both chose a (quite small) student room, while Adrien went for the other place. It seems most people actually rented flats in town instead of the proposed solutions. I hope the organizers didn't loose money due to this.

The booths for the week were set up in the building of the old weapon manufacture, next to the university where the talks were held. They were fewer than usual, I suppose some projects weren't sure about the attendance after the hiatus. Still, most regulars were here, along with some new ones like [Turris Omnia](https://www.turris.cz/en/), an open-source router. Another (huge) room (a whole floor actually) was available to lurk, with tables and power, and parts of a fablab, to make stickers and other funky stuff.

Next to the building we had several food sources, including a nice food-truck, as well as beverages.

As always the schedule was very busy, with many talks at once in different tracks. I co-chaired the Server track so I saw some of the talks. I also went to see one on WebExtensions, the new standard for browser addons (maybe someday for WebPositive?).

I spent some time working around a bug in the vCalendar export for the schedule. It seems UTF-8 is still wizardry to some even in 2017. After some `sed` magic I managed to import it in [Giggity](https://github.com/Wilm0r/giggity/), a generic Android app for conference schedules, as the custom RMLL-themed one was broken as well.

<img src="/files/blog/mmu_man/RMLL2017_DSCN5710.jpg" title="PAULA POWERED" alt="The PAULA POWERED band" width="25%" height="25%" align="right" />Late afternoon was the time to chill out and enjoy some music next to the building, like [PAULA POWERED](https://paulapowered.bandcamp.com/), a *digital-punk* band composed of two humans and one Amiga. The *Repas du Libre* on Wednesday evening happened there as well, and is the official socializing occasion.

My own Haiku talk ended up being scheduled on Thursday morning, after the repas du libre, so I was surprised to see ten courageous people in the audience. I ended up talking French, but [the slides](http://revolf.free.fr/RMLL/2017/RMLL2017_FR_Haiku.pdf) are in english. It wasn't very technical, rather discussing the history and evolution of the project.

The stand was not always busy but we did have interesting discussions there throughout the week. And we did several installs from a USB key, maybe some future contributors…

I didn't do much coding, on Haiku or elsewhere, hopefully I'll find some time this month. I did check if the latest version of [Ancestris](http://www.ancestris.org/) was properly packaged for Haiku, to reassure our booth neighbours. Adrien spent some time porting [QElectrotech](https://qelectrotech.org/). The [PyTouhou](https://pytouhou.linkmauve.fr/) port was also updated.

Friday was dedicated to the CHATONS workshop. [CHATONS](https://chatons.org/en) is a collective of independent hosters, which my LUG is participating in. We had brainstormings about technical and legal stuff, as well as communication, but I was so tired I only managed to work on [adding animation to their SVG logo](https://framagit.org/mmu_man/CHATONS/blob/animated_logo/docs/communication/logo/logo_chatons_v2.svg). It was also the occasion to discuss the future of the RMLL as an event, and a lot of people had suggestions about it.

<img src="/files/blog/mmu_man/RMLL2017_DSCN5715.jpg" title="Lots of stickers! Only missing a Haiku one…" alt="Lots of stickers…" width="25%" height="25%" align="left" />After a two hours ride in a hot and crowded train, I arrived back home just in time to join the LUG's last meeting of the year, and spread all the stickers I collected on the table for others to pick.


It was a really successful edition, let's hope next year's will be as nice!
I wish there were enough motivated people in my own town to apply but we're only two for now, so it'll have to wait.


See [more photos](http://photo.rmll.info/index.php/2017); [Some](https://www.balabit.com/blog/czp-rmll-libre-software-meeting-2017/) [other](https://philippe.scoffoni.net/rmll-rpll-2017/)(fr) [reports](https://www.nextinpact.com/news/104723-rencontres-mondiales-logiciel-libre-edition-2017-marquee-par-securite.htm)(fr); [my own report for the local radio](http://www.triplea.fr/blog/podcast/chronique-underscore-68-du-24-juillet-2017/) (fr); [Videos of the talks](https://rmll.ubicast.tv/channels/#2017-saint-etienne).

