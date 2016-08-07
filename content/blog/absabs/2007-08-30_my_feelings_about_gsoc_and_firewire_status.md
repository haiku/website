+++
type = "blog"
author = "absabs"
title = "My feelings about GSOC and Firewire status"
date = "2007-08-31T02:36:49.000Z"
tags = ["gsoc"]
+++

During this summer I was working under my mentor Jerome Duval's guidance. This is the first time I tried to be part of the GSOC program.

I started reading as many documents about HAIKU as I can find before I was accepted on 11th April. I checked out the haikus's source and built it and tested it on qemu. I was shocked by its clean and user-friendly desktop. I started reading its source after 1st May. I was shocked again by its wonderful design and implementation, I think I have fall in love with it:). I started coding on 28th May. During June, I had 4 exams, so the time spent on my project limited. I should started coding earlier just as what I answered the question:"If there was one thing you wish you had known before getting started in Summer of Code, what would it be?". I spent about 35 hours per week from 6th July when my summer begin on.

Currently, almost 100% of the revised project goals has been completed. The firewire stack such as link layer, transaction layer and bus manager has almost been completed. Isochronous transmission and asynchronous transmission works OK. I also tested my minidv :MV920, it works OK. The screen shot is attached, the received DV data can be found here. We may use mplayer to play it.
http://mail2.ustc.edu.cn/~jszhang3/mini.dv
The screen shot: 
http://mail2.ustc.edu.cn/~jszhang3/screen1.png

SBP support is still under development, this is one of my original project goals and is the only one I have not completed.

The following issues help me greatly:
First of all and the most important. My mentor-an experienced old hand gave me many many constructive suggestions on my project during this summer.

Second.I printed the IEEE documentations and datasheet related with my project, and commented on them. It is very helpful.

And. I made use of google search engine very well, a lot of issues about my project were got via google search

The last. I was almost always on IRC channel, I got many tips and help on Haiku's IRC

I have learned a lot about HAIKU's kernel and enjoyed adding firewire's support for HAIKU. I will continue my work on HAIKU's firewire stack and somethings else.

I really appreciate all the encouragement, help and suggestions I received from my mentor. Thank Jerome. :) Thanks to HAIKU and Google for allowing me to enjoy an entire summer of doing something I love! :)

Wishing the best to HAIKU