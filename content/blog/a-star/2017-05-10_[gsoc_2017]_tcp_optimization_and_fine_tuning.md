+++
type = "blog"
title = "[GSOC 2017] Tcp optimization and fine tuning"
author = "a-star"
date = "2017-05-10 13:11:55+05:30"
tags = ["haiku", "software"]
+++

Hello Haiku!

My name is Ayush (nick: a-star). I am really glad to have been selected for GSOC 2017 and I will striving to optimize the tcp implementation of Haiku this summer.

##A little about me

I am in the junior year of computer science and egineering at VITCC, India.

I am a profound Linux user. I have gained formal education on the subject while pursuing the Redhat certifications. I have always been fascinated with the intricacies behind the scene, the internal working of an operating system which makes you believe that the trivial program of ‘Hello world’ is actually trivial.

##Project Motivation

TCP and IP together form the most ubiquitous pair of protocols used in the implementation of the internet stack. It’s really important to get them working at full throttle. When I was going through the list of issues at Trac, a lot of them complained about the network:

*#1958, #12815 - slow speeds during file exchange using ftp, scp, sftp 
*#10747, #11066, #1143 - network related KDLs 
*#1073 - requesting implementation of path MTU discovery  
*#2967 - bug with getpeername() that succeeds on unconnected sockets  
*#1994 - requesting implementation of urgent data for TCP  

and more ...

RFC 7414 is a roadmap for implementors of TCP and I shall be following it closely, implementing features not already present or not fully implemented.

##Current state

The code for TCP is found under src/add-ons/kernel/network/protocols/tcp. It provides for all the mainframe syscalls like: bind, listen, sendmsg, etc. Needless to say, all the salient features of tcp like checksum, window, ack, fin are well implemented.

So what we have is a up and running tcp implementation but it lacks much of the extensions suggested by rfc 7414 like the timestamps option, window scale option, round trip time mechanisms involving timestamps, appropriate byte counting (ABS) for congestion control, Robust header compressions, etc.

I haven't had the time to go through the complete code for TCP so if I mistated something above, well sorry for that. I am currently busy with my college exams. They are ending on 24th of this month and only after that will I be able to completely devote my time to this project.

##What to expect

For this month, I am mainly focused on porting a TCP profiler such as tcpdive to haiku. It will be necessary to benchmark the improvements I will be making in the subsequent months. There are other alternatives to tcpdive like tcpstat and google's packet driller. Let's see which one turns out to be easily portable to Haiku. If anyone has any suggestions regarding any other profiler, I would be glad to try and port that as well.

During summer I will be implementing each section of rfc 7414 one after the other. There are majorly 3 sections and I will have 3 months to work on them:

>Section 2: describes the very fundamental functionalities of tcp. 
>Section 3: Strongly Encouraged Enhancements - describes recommended TCP modifications that improve performance and security 
>Section 4: Experimental Extensions - describes those extensions that are not widely but are gaining popularity 

To more details on the timeline, you can refer to my proposal:
https://docs.google.com/document/d/1-FlypLFN2c1OOSkwh9N72uuQWMbY3hHiTwhFSqPaJbM/edit

Thnx...
