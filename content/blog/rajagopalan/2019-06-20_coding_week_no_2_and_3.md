+++
type = "blog"
title = "Coding week no 2 and 3"
author = "rajagopalan"
date = "2019-06-20 17:11:01+05:30"
tags = ["haiku", "software","gosc2019","webkit"]
+++
<h1>Report for Coding Week #2 and #3</h1>

<h3>Love that your beautiful face is reading my Blog today ❤️.

First all I would like to ask sorry to my fans (if any 😅😂) for delaying the posts. Prepare to get blown away🎉🎉💻

Ok let's all jump into the world of webkit shall we?</h3>

<h2><u> History is awesome (just kidding 😉😉)</u></h2>
<h3>Lets rewind a bit!

* Getting stuff to compile and build (painful but totally worth it)
* Oh ya not to mention >:making friends!:<
* Taming git and messing up with the repo.
* Phew and finally getting the processes to get to know about each other (duh by making them talk).</h3>

<h2><u>Living in the Present</u></h2>

<h3>Ah yes after completing these I feel totally awesome and stepped up the game, And that brings us to the latest progress....

Now the main feature of a browser is to show webpages. hell no!! It has got other cool stuff too.

So first I did easy things like showing the status of the progress, keeping track of history( to go back and forward 🚗). For this I had to complete implementing Shared memory :heavenly tones play: . Sounds cool eh? Yes Shared memory is about allocating memory and sharing it with other processes, this is done to keep track of visited links.

![](zeus-1.PNG)

![](zeus-2.PNG)

![](zeus-3.PNG)


Yeah that's right we have loaded a blank url completely, I bet your mind is blown 🤯.

Oh ya totally forgot about the cool debugging system we use. We use [BeDC](http://pulkomandy.tk/drop/BeDC-1.0.zip) to get outputs from different process in cool colours(its magical trust me or take a look 

![](zeus-4.PNG)

Now before we get to rendering we need to get the webpage of source cause nobody is ever going to load about:blank. duh!
So we started working on NetworkProcess and hey I managed to make Http requests using BHttpRequest and BUrlRequest and got the html in bits and pieces. Few parts from the well maintained WebKitLegacy port were stolen and used in NetworkProcess. So we are doing some more work to make it "usable". All pray for it to go really smooth 🤞🏻.</h3>

<h2><u>Hey look its already Future</u></h2>

<h3>So once the network process is done completely done. Pulkomandy asked me to play with View and drawing and how the stuff works to get better understanding. Later then try to use Sharable Bitmaps and use the idea on webkit(not as easy it sounds😂🙊). Voila.... That's webkit for you haikuites💕💾😍.


That's all for now peeps. Hope you enjoyed reading make sure to drop a comment below stating how you feel about the work and yeah about me too( Hey I can take constructive criticism). Thanks for scrolling By...

P.S . By default sorry if my English is funny, cause I speak from my heart and not from my brain(my heart is dumb!).
</h3>
