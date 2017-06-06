+++
type = "blog"
title = "[GSOC 2017] TCP optimization_Week #2 & #3"
author = "a-star"
date = "2017-05-29 11:24:19+05:30"
tags = ["haiku", "software", "gsoc", "gsoc17", "tcp"]
+++

<p>Hy there!</p>

<p>I am writing this blog as a combined report for the past 2 weeks. As I mentioned on the mailing this, I had college exams till 25th. Really hectic. But I have been able to get some work done from then.</p>

<h3>Community bonding</h3>

<p>Didn't get a chance to know a lot of them but I did break some conversation with a few people. My short talk with axeld on the IRC got me into knowing the names responsible for the current implementation of TCP in Haiku. Axel has also been helpful in pointing me towards some useful resoures. Also had a short talk with tojoko.</p>

<h3>Progress</h3>

<p>From the benchmarking tools I mentioned in week 1's blog, I tried compiling <b>tcpstat</b> on Haiku. I have been facing some issues in that regard. Therefore I started looking for some alternatives and I came across the following:</p>

<p>Benchmarking TCP by combining 3 tools: <b>tcpdump</b> (to capture the packets), <b>tcptrace</b> (to analyze the dump created by tcpdump) and <b>xplot</b> (to provide graphical summaries). The advantage of using this method would be that tcpdump is already available as a package in HaikuDepot and also comes pre-installed when installing from the iso. Once the packets are captured, they need not be analyzed on Haiku itslef. I can use my host system (ubuntu 14.04) to run tcptrace and xplot on the input data. An interesting article describing the procedure can be found <a href="https://fasterdata.es.net/performance-testing/network-troubleshooting-tools/tcpdump-tcptrace/">here</a>. Also the output of tcpdump can be read on wireshark - making it easy to isolate header information from the data stream.
</p>

<p>I have also made considerable progress going through the source code for TCP. I am about halfway through reading the code.</p>

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


<h3>Next week</h3>

<p>When I was going across the source files, I naturally came across the file <b>TCPEndpoint.cpp</b>. It lists out the things not currently implemented. Following the list sequentially, I will start with implementing <i>TCP slow start, Congestion Avoidance, Fast Retransmit, and Fast Recovery</i>.</p>

<p>These features have also been described under "core functionality" section of <b>rfc 7414</b>. To implement them, I shall be following <b>rfc 5681</b> as mentioned in rfc 7414. They together constitute what the community refers to as "Reno TCP".</p>