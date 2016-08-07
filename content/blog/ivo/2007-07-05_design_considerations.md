+++
type = "blog"
author = "ivo"
title = "Design Considerations"
date = "2007-07-05T07:24:03.000Z"
tags = ["icmp", "network stack", "protocols"]
+++

Haiku's network stack follows a top-down approach with clear boundaries, pure object oriented design. However, TCP/IP protocol stack was designed more than 30 years ago with different idea in mind. It's mostly speed, fast processing and stability that designers were looking for back then. That's why many boundaries in the TCP/IP protocol suite design are blurred somehow. 

Basic hierarchy is established. Datalink layer protocol (Ethernet, PPP, etc.) is followed by a Network layer protocol (IP), which is followed by a Transport layer protocol (TCP, UDP, SCTP, etc). Those protocol often need to interact besides the limits of data transfer between two endpoints. Congestion control, error reporting, information exchange is needed. And with one exception (TCP) protocols lack that functionality.

The idea of simplicity in design leads to several other protocols that come to feel this gap. Most notably - ARP and ICMP. They both 'sit' somewhere between OSI model layers. ARP (Address Resolution Protocol) helps resolving IP addresses to a data link addresses. It's simple to understand yet hard to implement. In many OSs (esp. those with BSD derived network stacks) it's binded with the routing code. It's not object oriented design. No pure boundaries can be found. It's made for speed.

The other one, ICMP, is even harder to define in the terms of object oriented design. ICMP (Internet Control Message Protocol) comes in hand for several different tasks. It's designed to allow error and information message exchange between hosts and routers. One protocol to control them all :) That's why ICMP incorporates Datalink (Path MTU discovery), Network and Transport control mechanisms. 

Given that information and current code base of Haiku some decisions should be made. How to organize the ICMP code ? How should ICMP interact with the other parts of the network stack ? Where should ICMP stand in the "big picture" (TM) ?

My first approach was to examine other operating systems design. Most of them use BSD derived network stacks. All of them - not object oriented. Common idea is that the network stack should be fast. Many sacrifices are made for speed. One of them - the ICMP implementation. Usually you see the ICMP code just 'hacked in' here and there when needed. Fast, however, including only mandatory messages, no extra functionality, no fancy stuff, congestion control left to the TCP. I was first planning to follow that design.

Some thinking on that subject changed my mind. First of all, it'll be a mess to do it like this in Haiku's network code. It'll take to much time and too much code to 'fill in the gaps' of poor design. 

Hugo Santos than proposed a different approach. Each protocol module can return an error message and the error processing code could manage the ICMP traffic. Some central point can deal with that - for example, the IP's receiving_data() code. 'The other way around' communication can be handled with an extension to the net module structures. However, my mentor disagree with that concept. It does follow the object oriented design, although not that closely. 

Now I'm thinking on different approach. Instead of processing ICMP messages at a centralized point, I can probably do it in each protocol, when needed. TCP related messages processed in the TCP module, IP related messages in the IP module, and so on. There is one disadvantage however, current receiving_data() functions should be changed to allow passing of full IP packets instead of just the protocol header and the protocol data. 

And we come to a hard decision. With first approach I bind the ICMP processing code to the IP module. With the second, I break the 'send me only the data I need' paradigm in some way. 

If you have any ideas or suggestions, please share. I find it difficult to design it right. Yes, I can code it for a several days using one of the approaches above, but that's not the point, right ?! :)
