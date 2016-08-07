+++
type = "blog"
author = "stippi"
title = "Haiku at the Chemnitzer Linux Tage"
date = "2008-03-03T13:16:19.000Z"
tags = ["event", "exhibition", "chemnitz", "demo", "report"]
+++

<p align="justify">
The "Chemnitzer Linux Tage" (Chemnitzer Linux Days) was actually celebrating it's tenth anniversary. It started out as a kind of Linux install fest, but has since become a general Open Source event where all kinds of projects have a platform to demonstrate themselves. So despite the name, this event was perfect for Haiku.
</p>

<!--break-->

<p align="justify">
In the run up, I figured I should better get myself a mobile computer again. Previous experience has taught me that it is very beneficial to get the same hardware that Ingo and Axel call their own, and so I got a Lenovo/IBM T60. My old T40p was a really solid machine, so I was confident that the T60 would be a good laptop. It arrived pretty soon after I ordered it, so I could install Ubuntu as a build platform and set everything up that I needed for Haiku. Thanks to the helpful instructions on this site, it is pretty easy to get everything running on first try, to the point where Haiku is being installed, complete with optional application packages and other extras, ready for being demoed. Haiku on this notebook, even though it runs in VESA mode, is blazingly fast and responsive. The ipro1000 network works out of the box, even better than on Ubuntu, since I needed Haiku to figure out that I had the cable plugged in the wrong plug (Ubuntu would not show that the ipro1000 was even recognized, only after the cable was in the correct plug - it <i>needs</i> to be the docking station).
</p>

<p align="justify">
Contrary to on my regular development machine, Haiku works like a charm on the T60. I think the instability on my other computer comes definitely from the RTL8139 driver. Both the RTL8139 and ipro1000 driver are FreeBSD drivers which use the compatibility layer, but there are subtle differences. For example, the ipro1000 driver uses a proper interrupt handler, while the RTL driver does not.
</p>

<p align="justify">
I headed for Chemnitz Friday afternoon. While I had to wait at transfer stops, I walked my girlfriend back home through compiling me a Haiku version of Mindwork Clockwerk, which I thought would be nice to demonstrate on Haiku as well. I had forgotten to put that on my machine before I left.
</p>

<p align="justify">
When I arrived in Chemnitz, Denise, Daniel and Ralf picked me up from the train station. Daniel, who had attended almost all the Chemnitzer Linux Days in the past, was really good at being at the right places at the right time, and so we got perfect spots in the sports hall, where the majority of the exhibitors was sleeping. The hall was located about 20 minutes by foot from the University where the Linux Days were happening. Chemnitz is quite a nice city. We had some time left and went to the movies before going to bed on Friday night.
</p>

<p align="justify">
The dawn on Saturday got suddenly amplified by the spotlights of the sports hall, and so everyone got ready for the migration to the University building. It is quite impressive to see so many people spread out in a hall in sleeping bags. I vaguely remember some people arriving during the night who could not find a spot anymore. I think they slept on the banks in the shower room. That being said, I don't think there have been any people attending who would actually mind that very much. The organization of the Chemnitzer Linux Days was great. Everything was for free for the exhibitors. And we got served great breakfast.
</p>

<p align="justify">
Our booth was right next to GRML, a Linux LiveCD distribution and across from us were the OpenBSD, NetBSD and FreeBSD booths. The people at these booths were really nice and knowledgeable. And everyone was in a great mood. The organizers of the exhibition provided a web interface with default layouts for bigger booth posters and this contributed a lot to a unified look and feel and helped smaller projects to make a professional appearance. We used Koki's well known Haiku flyers in English and German and handed these out to a lot of people. The most important idea is to get these people to visit our site when they are back home and go through their stuff from the exhibition. Thanks Koki for all your work on useful Haiku exhibition artwork!
</p>

<p align="justify">
Visitors to our booth were very knowledgeable. Pretty much every single one had at least heard of BeOS before. Quite a few had actually used it and there were some who had even used it as their primary OS for a year or two. So it was easy to find an opening to the conversation, I could simply explain that Haiku was the open source reimplementation of BeOS and start from there. The reaction was generally very positive. Questions were mostly about existing drivers and hardware support. Some people wondered about application support, but I showed them Firefox, Vision, Pe and WonderBrush and they could immediately see how Haiku wasn't just an OS with nothing to do on. To tell you the truth, I was pretty impressed myself, since I booted Haiku in the morning, downloaded all software that I was going to need and then kept it running until the exposition was over in the evening. During the time, I was constantly launching apps to show how fast that was (always makes for a nice unbelieving expression on peoples faces), worked in WonderBrush, demoed Clockwerk. Vision was on for the whole time and I could check my email in Firefox. At the end of the day, Firefox could not connect to sites anymore, but Vision kept running fine. Also, Daniel said he saw a kernel panic on my machine when I was away, but one where he could type "continue". Maybe it was the "non maskable interrupt" panic which is more like a "warning", I don't know. The point is I didn't have to reboot for a whole day of heavy usage. And I wasn't sure this was even possible already. Though I think we do have a file system bug yet. For example, when I rebooted Haiku the next morning, Firefox would crash during launch, and I fixed it by re-downloading it. Maybe something from the cache was not written back to disk correctly. I realize we are not quite there yet. But still, having it run for a whole day without serious crash really impressed me. I want to thank everyone working on the kernel who made this possible! When I ran Haiku, I thought to myself, wow, the BeOS soul has found a new body again.
</p>

<p align="justify">
Denise had some fun with my Wacom Intuos2 which I brought along for use in WonderBrush. It did work in Gimp after installing a few more packages on Daniel's Linux box, but without pressure sensitivity and without subpixel precise pen tracking. I was satisfied that the hot-plugging in Haiku works so well by now, I could just plug in the tablet whenever I needed it without any hickups. Sometimes it wouldn't work when I didn't use it for a while, but unplugging it and plugging it back in would fix that. Something to track down later...
</p>

<p align="justify">
For much of the afternoon, we had an interesting visitor: Jörg Schilling, of cdrecord fame, chilled out at our booth! He informed himself of the state of Haiku and promised that if he could get it running in his virtual box, he would bring the Haiku platform support up to date. It was interesting to chat with Jörg as he had a lot of funny background anecdotes to tell about cdrecord, DVD support and support from hardware vendors. At the moment, he is working to improve Blueray support in cdrecord. He had spent a while on a feature in mkisofs where the tool collects files similar to the <i>find</i> command. So we showed him the query features of Haiku and the Tracker GUI for that and he could see a lot of potential there but wondered about the syntax and why it wasn't simply using <i>find</i> syntax. 
</p>

<p align="justify">
On Saturday evening after the visitors had left, the Chemnitzer Linux Days celebrated their tenth anniversary with a little show, live drum music, stories of the history of the event and a free, tasty five course menu. The motto of the show changed from "Innovation by Freedom" to "Innovation by Free Beer". They even had a really cool poster where the logo of the exhibition, which is a light bulb with a Tux inside, was transformed into a similar looking glass of beer (with Tux inside). The atmosphere was great and I enjoyed chatting to a lot of people. There are so many interesting projects going on. And of course with this audience, I could easily get someone to fix something in my fresh Ubuntu install, which has since become very snappy. Many exhibitors had run BeOS before and were eager to check Haiku out. It felt good to be able to show it in this nearly complete state and people were impressed. The questions were mostly about the state of drivers and technical differences to Linux. Nobody said what we are doing is stupid, why don't we just use the Linux kernel. Unfortunately, my voice was so broken from talking loudly all day, that I wasn't able to keep chatting any longer. Ralf, Daniel and Denise didn't mind heading back to get some sleep either.
</p>

<p align="justify">
The next day started with tasty breakfast again and continued very much like Saturday. The <a href="http://www.linaccess.org">linaccess project</a> wanted to talk to us about accessibility features and I had a long interesting conversation about what is important for people with disabilities using computers. I think it is technically quite easy to help already a large percentage of these people, while it is quite a challenge to effectively help for example completely blind people. I am certainly going to keep this in mind and I have an idea for a simple change in the app_server for a useful magnification feature which could help perhaps 80% of people with viewing disabilities to use any application on Haiku without further restrictions.
</p>

<p align="justify">
Daniel and Ralf did their part in talking to the visitors to our booth. Usually, we were all involved in conversations with more people joining in to listen.
</p>

<p align="justify">
After that, I had an interesting chat with the developer behind the <a href="http://pt-framework.sourceforge.net/">Platinum C++ Framework</a>. He already planned to do a port of his toolkit to the Haiku platform and asked me all kinds of questions about the Haiku API, mostly with regards to the Interface Kit. I showed him the respective headers in Pe and we researched stuff in Firefox (again without any hickup in Haiku).
</p>

<p align="justify">
At about 3 PM, I needed to pack up and start heading home. When I passed the GRML booth, I regretted having to leave already, since some people there said they wanted to get a demo of Haiku yet. The way home turned out to be pretty challenging, since Germany suffered from a heavy storm the day before, and the train route was served by bus. When I finally arrived in Leipzig, which is normally a 55 minute train ride, it was so late that there was not any other train going to Rostock that day. Luckily, my girlfriend was able to find me a car sharing offer and the guy happened to be already at the train station in Leipzig right when I called him. Going by car is also quite a bit faster than by train for this connection and so I was back home three and a half hours later. I just hope Ralf didn't have as much trouble. Denise and Daniel are from the area so I assume they got back home smoothly. The advantage of such situations like a dead train connection is that you get to meet the people who suffer with you. I think I got into conversation with something like 6 people going from Chemnitz to Leipzig and so the Linux Days feeling seemed to carry on...
</p>

<p align="justify">
I am really glad that I joined Daniel, Denise and Ralf for this event and I am firmly planning to go again next year. The audience was perfect for being introduced to Haiku in its current from. We have certainly succeeded in spreading mind share about Haiku with the right people. Haiku runs so stable now that I am about to switch. I have used Pe on Haiku to type this entire post and I will now use Firefox to post it on our site! :-) Thanks to everyone who made this possible!
</p>

