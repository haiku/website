+++
type = "blog"
author = "axeld"
title = "Network Stack Update"
date = "2010-07-27T10:20:41.000Z"
tags = ["network stack", "icmp", "contract work"]
+++

First of all, thank a lot for your generous donations! It was really stunning to see how much money could be raised in such a short time. And since it's been some time since my last commit, I thought it would be a good idea to report what I'm currently up to. But first, let's have a look at what I did last week for the most part:

<ul>
 <li>I started to fix some annoying bugs in the FreeBSD compatibility layer. Now it's possible to unload the networking stack completely again, and the "callout" implementation should provide more accurate timing. Oh, and booting over the network didn't work either anymore with FreeBSD drivers. Originally, I wanted to find out why Haiku would instantly reboot on one of my machines, but the problem mysteriously vanished once I started looking into it.</li>
 <li>Next on the list were some minor bugs, mostly having to do with routing, some could crash the system, others would just render your network unaccessible. Most of those bugs were reported by Atis Elsts, one of our current GSoC students that works on implementing IPv6. I've recently committed his work in progress to our repository in order to ease reviewing his patches, and give what he has done so far a bit more exposure.</li>
<li>Then I started to integrate the ICMP patches that two former students (Ivo Vachkov GSoC 2007, and Yin Qiu HCD 2008) produced by pretty much rewriting it. Looking back, it was not well spent money: neither student joined the project, nor was the quality of their work really acceptable. It took me 3 days to rework it, and it still has some issues like introducing an IPv4 specific error mechanism to the protocol agnostic stack. I doubt it would have taken much more time to write it from scratch. I will continue to work on this later, though, and address its remaining shortcomings. The current state is that we can produce ICMP error messages (and will in most appropriate places), and also forward those errors to userland applications. For example, if you send a UDP packet (through a connected socket) to a port that is not served, the server will answer with an ICMP port unreachable error (even if that server would be Haiku), and your application would retrieve the appropriate error code from its next socket interaction.</li>
</ul>
<p>
Since the last three days, I'm working on changing some stack internals that caused a bit more work than I originally anticipated: the network stack that is currently in Haiku only allows a single address per interface. This is something that was quite okay with IPv4, but starts to be problematic with the adoption of IPv6, since it's common there for an interface to have more than a single address (this feature is also requested by the RFCs that cover it). Originally, I had thought that simple aliasing of interfaces would do it (the plan was that several interfaces could use the same driver, but had different names that would only be joined for displaying them through <i>ipconfig</i>), but even though other systems seem to actually do that, it's quite a limited approach. Besides, the network stack support for this was utterly broken. That's probably what you get when you don't consider a feature important.
</p>
<p>
Now that I learned that aliasing the way it was planned and implemented won't do it, and since Atis would welcome the ability to have several addresses per interface, as this would ease (or rather, due to the brokenness of the current solution, make possible) implementing Neighbor Discovery for IPv6 (a.k.a. NDP, see RFC 4861), I thought it would be a good idea to spend my contract time to implement this.
</p>
<p>
The rest of this blog entry will detail the technical details of this, so if you're not interested in those, feel free to skip the rest.
</p>
<p>
Each net_interface can now have any number of net_interface_address items, each of which stores a local interface address, as well as its network mask, and broadcast address (if any). Therefore, a net_buffer, and a net_route can no longer point directly to the net_interface. Instead, they now have a pointer to the net_interface_address structure which also features the pointers to its net_interface, as well to its net_domain so that no information is lost. The net_protocols (the transport, and network layer in OSI speech) were therefore very easy to port to the new architecture, besides the little annoyance that the datalink layer can no longer figure out the interface address a buffer belongs to.
</p>
<p>
The meaty bits were hidden in the data link layer, and the stack internals. Before, the net_datalink_protocols were instantiated for each interface. Since an interface had one address, and one specific domain (like IPv4), this worked out nicely. However, now, an interface is domain agnostic, so this nice and simple model was not adequate anymore. Furthermore, modules like ARP have to know and maintain the local addresses of the interfaces so that they can be used for outgoing ARP requests, and replies. This requires a more flexible approach, and the net_datalink_protocols are now instantiated per domain per interface. That means, whenever the first address of a specific domain is added to an interface, the protocol chain is created, and attached to the interface for that domain only. I've currently implemented this with a simple array lookup per interface, but it will do the job. I've also taken the opportunity to slightly introduce a bit more C++ into the stack internals, there is now an Interface class that takes over the private parts of a net_interface. I've also changed interfaces, and their addresses to a reference count based solution, which was still on my TODO list from when I originally implemented the stack. Furthermore, the datalink module needed a number of new methods in order to give the other layers enough information to deal with the new situation.
</p>
<p>
The next problem was the ioctl interface that is used to configure the stack. With more than a single address per interface, it's no longer adequate. In FreeBSD, for example, there is no direct way to iterate over the addresses of an interface due to this. You can collect the information by looking at the routing table, though, and that's what each application interested in this data has to do (luckily, they provide a non-POSIX extension getifaddrs() that does the job for you). I haven't decided yet what I will do in Haiku, but I guess I will add some dedicated ioctls for this issue.
</p>
<p>
I'm still kind of in the middle of the changes, but I hope that I can start to commit the first bits later today, or tomorrow. Likely, those commits will break the network stack, Haiku in general, and introduce severe regressions. I will then start looking into WPA, and see if I can make enough time to apply for the WiFi bounty at Haikuware, leaving the regressions in place to prepare for my future contracts. You know the deal :-)
</p>
<p>
Once I'm done with the current rework (currently I need to adapt the routing code to the other changes), I would continue completing the error mechanism, and introduce a nice C++ API to access the stack internals in order to hide the ioctl interface to those that really want it. I will probably do the latter only after having had a look at WPA, though, since that might bring further API needs to the table.
</p>
