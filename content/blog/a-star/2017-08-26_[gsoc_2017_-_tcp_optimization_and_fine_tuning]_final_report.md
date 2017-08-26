+++
type = "blog"
title = "[GSOC 2017 - TCP optimization and fine tuning] Final Report"
author = "a-star"
date = "2017-08-26 02:23:06+05:30"
tags = ["haiku", "software", "gsoc", "tcp", "gsoc2017", "network"]
+++

<h3>Hello everyone</h3>

<p>The end of the GSOC period is drawing near. In this blogpost I would like to summarize the work done during this period. To know where it all began, refer to my first blog post which can be found <a href="https://www.haiku-os.org/blog/a-star/2017-05-10_gsoc_2017_tcp_optimization_and_fine_tuning/">here</a>.</p>

<h4>Overview</h4>

<p>When I started, a running implementation of TCP existed in Haiku. My work was to read it, understand it and improve it. When I say improvement, I mean in terms of implementing new congestion control algorithms, updating the exisiting ones with recent request for comments documents (RFCs) and extending the current capabilities of the implementation. The roadmap to all this is <a href="https://tools.ietf.org/html/rfc7414">RFC 7414</a> itself.</p>

<p>I picture my work as having two distinct parts. The first part concerns the implementation of the changes while the second is about providing the proof of robustness and of improvement for these changes (testing in short). The work done for the first part is what will be or is merged with the Haiku source code. The work for the second part resulted in a new tool that can be used for performing black box testing on a TCP/IP stack by injecting packets and reading responses, plus, it generated various test metrics for Haiku to empirically describe it's TCP implementation.</p>

<h4>Part I - the patches</h4>

<p>Since I was working on a kernel module, I submitted my changes in the form of patches for e-mail submission (generated using the git format-patch command). They haven't been merged yet since they are still under review. Following are the hyper-links to these patches:

<ol>
	<li><a href="https://dev.haiku-os.org/ticket/13629">Slow start and Congestion Avoidance</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13630">Fast retransmit and fast recovery</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13631">Limited transmit</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13632">Protection Against wrapped sequences</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13633">Retransmission Timeout</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13634">Ideal Timer implementation</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13676">NewReno modification to TCP</a></li>
	<li><a href="https://dev.haiku-os.org/ticket/13681">Selective Acknowledgement</a></li>
</ol>
</p>

<h4>Part II - the tests</h4>

<p>I built a tool which uses the libpcap library to inject and read raw packets and transferred the repository's ownership to HaikuArchives. It was accepted and now its a part of the archive.
	<ol>
		<li><a href="https://github.com/HaikuArchives/pi">pi</a> : the tool I was talking about</li>
		<li>Throughput and other statisitcs : to know about the test setup refer to my blog <a href="https://www.haiku-os.org/blog/a-star/2017-08-14_gsoc_2017_tcp_optimization_report_5/">here</a>. The test outputs are placed in a folder named "tests" present in the same repo as above.</li>
	</ol>
</p>

<h4>What's left out</h4>

<p>Some of the extensions such as extended SACK, urgent data mechanism and Path MTU discovery are yet to be implemented. I will work on them shortly.</p>

<b> Thanks for reading. It's been awesome this summer.</b>


	