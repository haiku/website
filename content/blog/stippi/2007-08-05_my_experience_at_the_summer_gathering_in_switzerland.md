+++
type = "blog"
author = "stippi"
title = "My experience at the Summer Gathering in Lucerne, Switzerland"
date = "2007-08-05T12:39:19.000Z"
tags = ["meeting", "gathering", "coding", "fun", "event"]
+++

<p align="justify">
My backpack turned out really heavy, because at the moment, I have no mobile computer. Luckily I have one of those "industry embedded" machines, as big as an external CD-ROM drive. But I still had to pack my 17" flat screen. The travelling by train was nice, although I almost got off at the wrong station in Basel. I mean, I did get off, but I got back in in time... turned out Ingo did it exactly as I before me. He, François and Michael Lotz were already there, and they waited at the train station to pick me up. They held up a paper with the Haiku logo, as if I wasn't going to recognize them... :-) One hour later, we picked up Axel, again with the help of the Haiku sign.
</p>

<p align="justify">
The first couple of days didn't go so well for me, because I left a mess at work and had to put all my time into work for my job. Luckily, Michael Lotz had a suitable mobile contract, with which we could go online. I don't know what I would have done without that, because I had to exchange tons of emails and some files. But then later I was able to rewrite the font caching in our app_server, which was something I kept pushing in front of me for a <i>long</i> time. So that was a relieve to finally have those changes in place. Basically, I removed the need for a global lock in the app_server, which was likely to be an important bottleneck.
</p>

<p align="justify">
Ingo and Axel were really productive in fixing some serious kernel bugs. They are great at pair programming. Sadly, the commit might then only be one line of code, and nobody might appreciate that they spent <b>hours</b> to produce it. Ingo did some changes to our build system also, which introduces Haiku itself as a supported host platform. Unfortunately, we didn't have enough time to get everything in place to build Haiku on Haiku. Would have been a cool result for the Gathering. Oh well, at least we should be close.
</p>

<p align="justify">
Michael Lotz was working on the USB stack all the time, the UHCI module in particular, which exibited some problems with our usb_hid driver. That one works on R5, but not properly on Haiku. I think he actually rewrote the locking system of UHCI, but he says there are still some problems. The last day, he and Ingo were trying to find a bug in our pipefs implementation. Axel and Ingo continued to look for it on the train back home, until they finally found it. Again, one line of code...
</p>

<p align="justify">
François was hacking away on his OpenSound media node the whole time. He poured endless hours into getting it to work, and it finally did. Sometimes, between all those stuttering media server startup sounds, it would come out smooth and we would be excited and shout "you got it!", but he would only say, "no, not yet" and the next sound would be stuttering again. But he finally made it. After that, he worked on getting all those mixer controls to display proberly in the Media Preferences. When that worked, he went on to support recording, which he got working too in the end.
</p>

<p align="justify">
One of my funniest developer experiences was trying for maybe two hours to debug an error in the app_server in my new BFont::GetBoundingBoxesAsString() implementation, always testing with our FontDemo app in the app_server test environment. When I was about to give up, I finally had the idea to compile FontDemo for R5 to see how it worked there, and surprise - it had the same bug. So I fixed FontDemo instead of app_server and then everything worked. One day, Michael Lotz showed me his Gnash port, and we transfered his build environment (all those dependencies) over to my computer, but I still had some stuff to do for work, and we didn't go through with it. The port compiles on my computer, but Michael had to actually fix some posix implementations in the R5 headers, which we didn't come around to transfer to my computer as well, so my binary of Gnash does not work. It had something to do with posix streams being broken in some way.
</p>

<p align="justify">
Other than that, we pretty much only went out to get some food in the "morning" (actually more the afternoon), and we did go out to see some of the city of Lucerne one night, and we also took a walk around the lake which the hostel was located at. Axel brought a camera, maybe he will put up some pictures somewhere. First of August was National Day for Switzerland, and there were a lot of fireworks, but somehow we went out a little too late and missed the big ones.
</p>


<p align="justify">
The gathering was a lot of fun and I am looking forward to doing it again, hopefully soon. It was a very productive week for Haiku.
</p>
