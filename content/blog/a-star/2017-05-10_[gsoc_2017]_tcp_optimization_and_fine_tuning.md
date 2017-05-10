+++
type = "blog"
title = "[GSOC 2017] Tcp optimization and fine tuning"
author = "a-star"
date = "2017-05-10 13:11:55+05:30"
tags = ["haiku", "software"]
+++

Hello Haiku!

My name is Ayush (nick: a-star). I am really glad to have been selected for GSOC 2017 and I will striving to optimize the tcp implementation of Haiku this summer.

<h3>A little about me</h3>

<p>
I am in the junior year of computer science and egineering at VITCC, India.<br>

I am a profound Linux user. I have gained formal education on the subject while pursuing the Redhat certifications. I have always been fascinated with the intricacies behind the scene, the internal working of an operating system which makes you believe that the trivial program of ‘Hello world’ is actually trivial.<br><br>
</p>

<h3>Project Motivation</h3>

<p>TCP and IP together form the most ubiquitous pair of protocols used in the implementation of the internet stack. It’s really important to get them working at full throttle. When I was going through the list of issues at Trac, a lot of them complained about the network:<br>

<ul>
<li><a href="https://dev.haiku-os.org/query?id=1958&or&id=12815&col=id&col=summary&col=type&col=status&col=priority&col=milestone&col=component&order=priority">#1958, #12815</a> - slow speeds during file exchange using ftp, scp, sftp </li>

<li><a href="https://dev.haiku-os.org/query?id=10747&or&id=11066&or&id=1143&col=id&col=summary&col=type&col=status&col=priority&col=milestone&col=component&order=priority">#10747, #11066, #1143 </a> - network related KDLs </li>

<li><a href="https://dev.haiku-os.org/ticket/1073">#1073</a> - requesting implementation of path MTU discovery  </li>

<li><a href="https://dev.haiku-os.org/ticket/2967">#2967</a> - bug with getpeername() that succeeds on unconnected sockets  </li>

<li><a href="https://dev.haiku-os.org/ticket/1994">#1994</a> - requesting implementation of urgent data for TCP  </li>
</ul>
<br>
and more ...<br>

<a href="https://tools.ietf.org/html/rfc7414">RFC 7414</a> is a roadmap for implementors of TCP and I shall be following it closely, implementing features not already present or not fully implemented.
</p><br>

<h3>Current state</h3>

<p>The code for TCP can be found <a hreaf="https://github.com/haiku/haiku/tree/master/src/add-ons/kernel/network/protocols/tcp"> here</a>. It provides for all the mainframe syscalls like: bind, listen, sendmsg, etc. Needless to say, all the salient features of tcp like checksum, window, ack, fin are well implemented.</p>

<p>So what we have is a up and running tcp implementation but it lacks much of the extensions suggested by rfc 7414 like the timestamps option, window scale option, round trip time mechanisms involving timestamps, appropriate byte counting (ABS) for congestion control, Robust header compressions, etc.</p>

<p>I haven't had the time to go through the complete code for TCP so if I mistated something above, well sorry for that. I am currently busy with my college exams. They are ending on 24th of this month and only after that will I be able to completely devote my time to this project.</p>

<h3>What to expect</h3>

<p>For this month, I am mainly focused on porting a TCP profiler such as <a href="​https://github.com/fastos/tcpdive">tcpdive</a> to haiku. It will be necessary to benchmark the improvements I will be making in the subsequent months. There are other alternatives to tcpdive like <a href="​http://tstat.polito.it/overview.shtml​">tcpstat</a> and <a href="https://news.ycombinator.com/item?id=9857938"> google's packet driller </a>. Let's see which one turns out to be easily portable to Haiku. If anyone has any suggestions regarding any other profiler, I would be glad to try and port that as well.</p>

<p>During summer I will be implementing each section of rfc 7414 one after the other. There are majorly 3 sections and I will have 3 months to work on them:</p>

<ul>
<li>Section 2: describes the very fundamental functionalities of tcp. </li>
<li>Section 3: Strongly Encouraged Enhancements - describes recommended TCP modifications that improve performance and security</li>
<li>Section 4: Experimental Extensions - describes those extensions that are not widely but are gaining popularity </li>
</ul><br>

To more details on the timeline, you can refer to my <a href="https://docs.google.com/document/d/1-FlypLFN2c1OOSkwh9N72uuQWMbY3hHiTwhFSqPaJbM/edit"> proposal</a>.
<br>
Thnx...
