+++
type = "blog"
author = "meianoite"
title = "Introduction to the new Haiku scheduler, and other tidbits"
date = "2007-06-17T21:33:50.000Z"
tags = ["scheduler", "gsoc", "scheduling algorithm", "algorithm", "O(1)", "complexity", "data structure", "multiprocessor", "affinity", "fairness", "real time", "CFS", "Linux", "comparison", "threads", "responsiveness"]
+++

Hi, folks!

For those who don't know me (or my GSoC assignment) already, I'm the one assigned to <a href="http://dev.haiku-os.org/ticket/1069">ticket #1069</a>, namely:

<blockquote>Create an O(1) thread scheduler with CPU affinity and soft real-time support which targets desktop responsiveness.</blockquote>

I'd like to dedicate my next few blog entries to introducing myself and discussing how I got here, why I wanted to tackle this specific task, what background I have regarding the subject of thread scheduling, how I failed miserably to realise that my first attempt at designing an algorithm suitable for Haiku's needs had fundamental flaws, how far I am at my second attempt, and the obligatory comparison to <a href="http://people.redhat.com/mingo/cfs-scheduler/sched-design-CFS.txt">Ingo Moln&aacute;r's Completely Fair Scheduler</a> that has been making the news in the Linux world. <!--break--> Later on, I guess it would be nice to use this space for progress reports and further discussion with the community as questions and suggestions arise.
<br>
<a name="disclaimer"></a><blockquote><b>Disclaimer</b>
I'm not a native English speaker. I'm <b>completely hopeless</b> regarding correct usage of <a href="http://owl.english.purdue.edu/handouts/esl/eslprep2.html">prepositions of location</a>. And I'm no grammar expert in any capacity. I kindly request you, the reader, to gently <a href="/user/1164/contact">point me</a> to any linguistic mistake I happen to make, with suggested correction, if possible.
Sincerest regards,
Andr&eacute;</blockquote><br>
Without further ado, here we go! I hope you enjoy the ride :)
<br><br>
<b>Introduction</b>
<i>(Or: how I got here)</i>

The story goes roughly like this: I had my first contact with BeOS when I was still attending high school. Unfortunately I didn't experience what I perceived as being the Golden Years, namely the R4 era. My first real contact with BeOS was with R5 PE; then I bought the Gobe Productive + R5 Pro bundle, and BeOS was my main OS for quite some time on my Pentium 133. Ah, nostalgia :)

I'm a Computer Science student now. Circa 3 years ago I designed a thread scheduler as an assignment for the Operating Systems class. It fared pretty well in artificial benchmarks with purely CPU-bound simulated threads. I was excited. Seemed like I did something really cool :D

Right after that semester finished, I contacted Axel and told him about the scheduler and asked him if there was interest in using it on Haiku. He was pretty open-minded, and I promised him I'd translate the documentation written for that assignment into English. I never did.

Why? Well... I burned out. <i>Back in the day</i>, I used to be quite active in BeShare and IRC, even compiled stuff on my trusty old Pentium 133 (if Fyysik is reading this, he'll remember that Pentium immediately ;))... But by then college was eating most of my energy. And I was just getting out of a troubled relationship. And it all coincided with a hard drive failure. I lost almost no valuable data, but the excitement was just... gone.

Anyway, the scheduler plans were on the back burner for roughly the mentioned 3 years. And you might remember that before the Haiku project got accepted in the GSoC, I mailed the list asking about <a href="http://dev.haiku-os.org/ticket/1069">ticket #1069</a>, hoping that I could still participate. <a name="bench"></a>Then I spent some days digging up the sources for the scheduler and re-doing some benchmarks on my current computer. Things still looked nice :)
<br>
<blockquote>Don't miss the next chapter in the Scheduler saga! Tomorrow (hopefully), same bat time... Same <a href="/blog/meianoite">bat channel</a> (powered by <a href="/blog/1164/feed">RSS feeds</a>!)... <a href="/blog/meianoite">Right here</a>. Stay tuned.</blockquote>