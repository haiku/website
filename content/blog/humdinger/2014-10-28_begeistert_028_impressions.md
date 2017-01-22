+++
type = "blog"
author = "humdinger"
title = "BeGeistert 028 impressions"
date = "2014-10-28T07:01:33.000Z"
tags = ["BG 028", "events", "begeistert", "HSA"]
+++

After a nice short walk through the light drizzle of the slowly condensing mist that completely shrouded the top of Düsseldorf's landmark Rhine Tower, I arrived pretty early at the Youth Hostel. Entering our conference room I was greeted by its single occupant: Matthias, who I haven't seen at a BeGeistert for some years. We were chatting while I was setting up my gear and one by one more people entered our conference room. Most of them coming from breakfast; they already arrived the day before. I was glad to see most of the regular core developers did manage to come to BeGeistert after all!

<!--more-->

While setting up my notebook and mouse was naturally done quite quickly, I wondered about the madman, that provided a scene I haven't seen since BeGeisterts form over ten years ago: Someone brought a bloody desktop tower with not one, but two LCD!

<div align="center">
<p><img src="/files/BeGeistert028-1.jpg" title="Left to right - Stephan, Oliver, Ingo, Axel, Ithamar, Puck"></p>
</div>

Turns out, the maniac was Colin Günther. Another one I haven't seen at BeGeistert for some time. In his deranged mind it all made sense of course: He's working on DVB-T and has some PCI cards to work with. One more of those was donated by Mark Erben who had one in storage since the BeOS days. So, maybe not so deranged after all...
In any case, I've seen Colin's progress first hand, when he demonstrated Haiku's TV app showing a DVB-T stream. The aspect ration wasn't correct yet, but he's working on it.
Colin will join our Haiku friends Jessica, Christof, Clemens and Andrew early next year when he and his family emigrate to New Zealand! Time for a "BeGeistert NZ", don't you think?
Everyone was asked to put their signature on the desktop cover (I promptly bungled mine a bit), either as a souvenir or to auction off... not sure what Colin has decided.

There were a few new faces this BeGeistert as well. I may have met Eddy Groen before, he was very active in BeOS' days, but I couldn't remember him if I had. Anyway, he seems to be back in the saddle again, and it was a pleasure to meet him and his wife Sofie. And while we were geeking out in the evening, he took her to see the Shrek musical. Reportedly, they had "groen" fun!
Another long time Haiku user finally made it: Zoltan Mizsei, didn't come all the way from Hungary, as he's currently working in Germany, if I remember correctly. Very nice meeting him. He was one of my roomies in the Youth Hostel, together with Puck and his father Erik. And I feel, now that I'm safe at home, I should apologize for my potential snoring (I can't hear it, naturally, but I've had complains in the past...). Puck and Zoltan both looked quite well-rested on Sunday, even though both turned in well after me. So... hmm... on the other hand both were very polite, they may hate my guts secretly... better not dwell on it.

So, the morning passed quickly and it was time for our talks.

<h3>1st talk: Webkit</h3>

Adrien Destugues was first, and gave an overview of his recently completed first year of almost-fulltime work, paid by donations through Haiku Inc. As he focused mostly on porting and maintaining WebKit, he started by presenting the history of the Haiku port of it. The beginnings in 2007 by Ryan Leavengood, the work of Maxime Simon for GSoC 2009, improvements by Stephan Aßmus and Alexandre Deckner, and his own efforts with it since then.
It followed an overview of the components of the WebKit port, the improvements of WebKit2 and the advantages and disadvantages of not going with a port of Firefox or Chromium. One advantage of doing the massive work of the WebKit port stuck out for me, and becomes apparent when following the <a href="https://cgit.haiku-os.org/haiku/log/">commit log</a> over the past years: The WebKit is touching many aspects of the whole operating system. Pretty much every API kit has benefitted from bugfixes and new features, from network to services and support to media and the app_server.

Adrien uploaded his <a href="http://pulkomandy.tk/BG2014/">slides</a> and the <a href="http://youtu.be/sWJ1kDPWq-s">video recording</a> is also online.

<h3>2nd talk: HaikuDepot</h3>

Next up was Stephan Aßmus, who lately became the main driving force of "HaikuDepot", the Haiku GUI application that interfaces with the backend <a href="http://depot.haiku-os.org">Haiku Depot Server</a> that is the work of Andrew Lindesay (check out the <a href="https://www.freelists.org/list/haiku-depot-web">haiku-depot-web</a> mailing list to keep track of developments there).
Stephan starts off by thinking about how the Haiku Depot Server infrastructure and the involvement of users to test and rate application could be leveraged not only to provide a nice user experience for everyone to easily search and install software, but to help filling that depot with high quality packages. Through user ratings, packages (and their dependencies) could migrate from a "bleeding edge" into the "stable" depot.
Next, Stephan showed off the interface of the Haiku Depot Server and its possibilities for users to upload icons and screenshots and localizing package  descriptions etc. Then he switched over to the HaikuDepot application, created an account for a new user and submitted a rating that promptly appeared on the server.
It all works already pretty nicely! Now it depends on the Haiku user community to fill it with life. There'll be an official announcement when everything's ready and people can get cracking. Keep an eye on the front page!

Stephan didn't use slides, but there's a <a href="http://youtu.be/EQC-5NGtkcM">video recording</a> of his talk.

Next was lunch in form of spaghetti with either tomato, cheese or bolognese sauce. Let's say the salad and pudding came to the rescue...

The afternoon was filled with the usual BeGeistert activities: the core devs exchanging occult incantations and spells, people showing off their latest projects, fighting their touchscreen in the case of Puck, or starting to work on the video footage from the two earlier talks in case of me.
By the way, to improve sound quality, I decorated all speakers with my cell phone on a leash and recorded the audio separately. Big improvement, though it adds complexity when having to sync with the video. I do the arranging in Clockwerk, but have to boot into Linux to grab the video from the camera and process the audio tracks in Audacity...

For dinner we decided not to tempt the weather by crossing the Rhine and marching for 45 minutes to Old Town. Instead we all went to a nearer restaurant in the building of an old train station. The food was good, the Alt beer tasty...

Back in the BeGeistert den, the above mentioned BG activities continued. I peppered Adrien with questions regarding secondary architectures in haikuporter recipes and Charlie tried to explain to me his python script to create the BeGeistert name badges. The thing I remember most of it is that python is weird... :)
Anyway, like everyone else at BeGeistert, I used the chance to speak to the experts directly. Much easier than over IRC or email...

The Sunday was more of the same, only that this time I didn't have to get up at 5 am to catch a plane...

<h3>3rd talk: ARM</h3>

Before lunch we had a final talk: Ithamar Adema showed the current status of the ARM port and the difficulties to get there and to go farther. While it was an interesting talk, it's not easy to summarize it here. Get Ithamar's <a href="http://cola-coder.com/begeistert/028">ARM slides</a> and watch the <a href="http://youtu.be/ll-TqNIWw3I">video footage</a> that became an audio footage after 20 minutes when the battery of my camera silently died. That idea of a secondary audio recording via cell phone wasn't a bad one...
From what I understood, ARM SoCs are quite different from the usual PC desktop environment. Lots of different implementations and hardware combinations that only very slowly seem to consolidate into more standardized architecture. One problem seems to be that the peripheral hardware isn't easily probed via a bus, so the OS needs to know what hardware it is dealing with on the particular SoC. This is done via a so-called "flattened device tree", which is one area Ithamar planned to work on in the code sprinting week.
In his closing demonstration in QEMU, we watched the Haiku bootloader lighting up a few icons and then... the kernel visiting its debugging land. As unexciting as it sounds to the layman, it's already quite some achievement, having the kernel come as far and being able to debug things. By the end of the day, Ithamar got all the icons to light up, by the way. So... progress! :)

Then lunch, and shortly after, our group began shrinking as one by one had to leave.

<h3>A new HSA e.V. board</h3>

We did have one more important topic on the agenda: the future of BeGeistert.
Over the years the board of the <a href="http://haiku-support-association.org/index-eng.html">Haiku Support Association (HSA)</a> that is organizing the event, slowly shrank until Charlie Clark was the last man standing. And he's been wobbling for a few years now. So, the first order of the day was to elect new members to the board, so BeGeistert can continue.
Ithamar was to be the election supervisor calling the vote. All votes were unanimous: Charlie stays 1. chairmen, Eddie Groen becomes 2. chairman and Matthias Spreiter is our new treasurer. Congrats to all!

So, technically, BeGeistert can continue. There is, however, still the continuous struggle to finance the event. With only roughly 20 attending BeGeistert we currently rely on Haiku Inc. to step in. While we're very grateful for that, it's not a situation we're hugely fond of. What if Haiku Inc. can't or won't donate the needed funds? And anyway, we'd prefer Haiku Inc. to funnel that money into development contracts.
Long story short, if you see the benefits of BeGeistert and the Code Sprint, you may want to consider becoming a HSA member for only 3 EUR/month. Or, even better, try to come yourself next time.

While we're on receiving support, here's a big thank you to Andrew Hudson, who made a generous donation that we're using to pay for all drinks of the code sprinters. What's left will be added to the funds for next year's BeGeistert. Thanks a bunch, Andrew!

Adrien will write up a report of the Code Sprint once they've crossed the finishing line. The number of sprinters increased slightly, by the way: Jonathan Schleifer was able to eek out 2 days of vacation from his new job (well done, mate!), and joins Adrien, Ithamar, Ingo, Colin and Oliver.
The sprinters in Düsseldorf are joined by virtual BeGeistert Code Sprinters (vBGCS) Rene Gollent and, by taking off early from work when possible, Michael Lotz. Michael already committed a nice fix for a <a href="https://cgit.haiku-os.org/haiku/tag/?id=hrev48100">bug</a> I ran into a few times and Rene is still busy improving the Debugger. And the other Devs that had to leave on the weekend seem to keep it up as well.
Everyone, feel free to join in the fray!


Maybe some of the BeGeistert attendees would like to write about what they were doing that weekend or what I have missed in a little comment below? Add links to photos, if you can...

<h4>Resources of the talks</h4>
<ul>
<li>Adrien's talk on WebKit: <a href="http://pulkomandy.tk/BG2014/">slides</a> and <a href="http://youtu.be/sWJ1kDPWq-s">video</a></li>
<li>Stephan's talk on HaikuDepot: <a href="http://youtu.be/EQC-5NGtkcM">video</a></li>
<li>Ithamar's talk on ARM: <a href="http://cola-coder.com/begeistert/028">slides</a> and <a href="http://youtu.be/ll-TqNIWw3I">video</a></li>
</ul>