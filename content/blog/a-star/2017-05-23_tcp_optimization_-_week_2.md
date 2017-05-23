+++
type = "blog"
title = "[GSOC 2017] TCP optimization - Week #2"
author = "a-star"
date = "2017-05-23 21:29:59+05:30"
tags = ["haiku", "software", "gsoc", "gsoc17", "tcp"]
+++

<p>Hy there!</p>

<h3>Community bonding</h3>

<p>Last week was filled with college exams for me. Truely hectic. But I was able to break some conversation with a few people. My short talk with <b>axeld</b> on the IRC got me into knowing the names responsible for the current implementation of TCP in Haiku. axeld has also been a good sport in pointing me towards some useful resoures.</p>

<p>Among the fellow gsoc participants, I had a chat with <b>anriudhm</b>. About others, you guys seems to be having a good time on the whatsapp group. The messages just keep popping as soon as I sit down to study. Wait till 25th - last exam!</p>


<h3>The Learning</h3>

<p>Nothing ventured. Nothing gained. I have been going through a couple of resources. To mention a few:</p>

<ul>
	<li><a href="https://www.haiku-os.org/legacy-docs/benewsletter/Issue4-26.html#Engineering4-26"> Kernel module development </a></li>
	<li><a href="https://www.quora.com/I-want-to-implement-a-little-TCP-IP-protocol-Where-can-I-start-from">Quora</a> ... why not!</li>
	<li>The network stack of haiku 
		<ul>
			<li><a href="https://www.haiku-os.org/documents/dev/haiku_network_stack_architecture/">architecture</a></li>
			<li><a href="https://www.haiku-os.org/docs/api/group__network.html">network kit</a></li>
			<li><a href="https://www.haiku-os.org/blog/axeld/2010-07-27_network_stack_update/">stack update</a></li>
		</ul></li>
	<li>Let's code a TCP/IP stack to learn network and system programming at a deeper level [<a href="http://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/">link</a>]</li>
</ul>

<p>If anyone wants to add something to the list above, it would be great. Frankly speaking, whosoever said <i>"If kernel programming was easy, your grandma would be doing me"</i>, was a very honest man. The details get confusing sometimes, but I think I have been able to get a good grip of it over the past week.</p>

<h3>Next week</h3>

For the upcoming week, I will be working to port one of the tcp benchmarking tools I spoke about in my first blog.