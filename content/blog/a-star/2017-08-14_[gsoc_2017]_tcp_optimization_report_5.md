+++
type = "blog"
title = "[gsoc_2017] tcp optimization report 5"
author = "a-star"
date = "2017-08-14 02:10:49+05:30"
tags = ["haiku", "software", "gsoc", "gsoc17", "tcp"]
+++

<p>Hello everyone.</p>

<p>After the second evaluation I have been carrying out various tests to compare the output characteristics of the current TCP implementation of Haiku against the one with my patches applied. I shared the links to my patches on the mailing list. They comprise of all ticket numbers in the range 13629 - 13634 [ <a href="https://dev.haiku-os.org/query?status=assigned&status=in-progress&status=new&status=reopened&reporter=a-star&order=priority">Trac link</a> ].</p>

<h3>Test Setup</h3>

<p>There are two systems:<br>
	<ol>
		<li>My Ubuntu 14.04 system running Haiku hrev51307 x86gcc2 inside Virtual Box.</li>
		<li>Raspbian pixel with 850 MB of RAM (it's based on Debian).</li>
	</ol>

	The Virtual Box was configured with a RAM of 4GB and video memory of 128 MB. Bridged Networking over wlan0 was enabled.<br>
	Both the systems were connected to a mobile hotspot so they were part of the same LAN.
</p>

<p>The following tools were used to conduct the test:<br>
	<ol>
		<li>The combination of <b>tcpdump, tcptrace and xplot</b> as I described in my second blog post [ <a href="https://www.haiku-os.org/blog/a-star/2017-05-29_gsoc_2017_tcp_optimization_week_2__3/"> link </a>]</li>
		<li><b>tc</b> to manipulate traffic control settings.</li>
		<li><b>nc</b> to transfer the test file.</li>
	</ol>

	Note: Even rfc 6349 (framework for TCP throughput testing) approves use of tcptrace under section 3.2.1 as an utility to extract the RTT values from captured packets.<br><br>

	Running Haiku under Virtual Box had a number of advantages. For example, it allowed running tc on Ubuntu to control the outgoing traffic out of Haiku (since the tool is not available on Haiku). Also when I was going through some articles, I discovered that its not a good practise to capture packets or run tc on the system directly under test.<br>

	<ul>
		<li>Guide to using tc can be found <a href="https://sandilands.info/sgordon/dropping-packets-in-ubuntu-linux-using-tc-and-iptables">here</a>. It also throws some light on the matter of local testing.</li>
		<li><a href="https://stackoverflow.com/questions/614795/simulate-delayed-and-dropped-packets-on-linux">Stackoverflow question</a> describing simulation of delays and drops.</li>
		<li>The drawbacks of <a href="https://blog.packet-foo.com/2014/05/the-drawbacks-of-local-packet-captures/">local packet capture</a>. The points here are not directly applicable in our case but it is a good read.</li>
	</ul>
</p>

<p>The test itself is simple. Server client model is used. The client uploads a file of 10MB onto the server. nc is used both at the client and the server end. At server: <i>nc -nvvlp portNumber > outputFile</i>, on client: <i>cat fileName | nc serverIP portNumber</i>. Haiku and raspbian alternately act as server and client.</p>

<p>While the test is trivial, the network conditions are tweaked using tc. Examples: dropping packets with a probability of 0.1, adding a constant delay of 200ms, adding variable delay etc. To closely simulate real networks, test involving adding delays (values of which came from a normal distribution) was also performed. Refer to the stackoverflow question mentioned above for more examples.</p>

<h3>Test Metrics</h3>

The test metrics from rfc 6349 alongside some other were used to compare results.<br>
<ul>
	<li>Actual TCP transfer time and throughput.</li>
	<li>TCP Efficiency % = [(Transmitted Bytes - Retransmitted Bytes) / Transmitted Bytes] * 100</li>
	<li>Buffer Delay % = [(Average RTT during transfer - BaselineRTT) / BaselineRTT] * 100</li>
	<li>Simple observations based on captured packets viewed in Wireshark</li>
</ul>

<p>Baseline RTT was estimated using ping requests.<br>Transmitted Bytes in TCP efficiency include the retransmitted bytes as well. One shouldn't simply look at one of these metrics and ignore the others. For example, TCP efficiency goes down due to the fast retransmit algorithm but at the same time it can cause the throughput to increase.</p>

<h3>Summary of the result</h3>

<p>A lot of stats were generated as a result of running the tests. I won't be able to describe the result in it's entirety. Therefore I will provide a link to my google drive for those who would like take a peek at the stats themselves or view the captured packets in Wireshark.</p>

<p>Speaking qualitatively, I observed the following:<br>
	<ul>
		<li>Under normal network conditions, the patched TCP had greater throughput although the difference was not much significant. It was in the order of 7000 Bps, which is like 3.6 KB per second. But the patched TCP also retransmitted a packet or two extra.</li>
		<li>Under lossy conditions, when the loss is small like 0.3%, the patched TCP provides way better result but the same is not true when the network is too lossy like 10% or so. [ Loss of x% tells that about x% of total packets are dropped by the network. ]</li>
		<li>When on the receiving end, on average, the patched TCP has a greater buffer delay which is not good. I suspect it to be due to the extra PAWS processing added and the increase in RTO computation. I will see if I can fix it but it's not a serious problem since the different is not too much. It can also be the TCP implementation in raspbian that is the problem. Because the patched TCP did generate more Duplicate ACKs than the unpatched one but the raspbian did not respond back with fast retransmits everytime.</li>
		<li>When on the sending end, the tests showed truely significant differences. There was a clear distinction. Under lossy network, the patched TCP had a higher throughput with the difference even reaching upto 30-50 KB per second and greater TCP efficiency as well. But it was just the opposite when delays where introduced in the network. With random delays being attached to each packet, the unpatched version performed better almost every time. The reason I could infer was that the unpatched version had a greater output window in this case. The patched version limited the increase in it's output window due to the security measures I applied as per the rfcs. I will have to look more into it.</li>
	</ul>
</p>

Link to the compressed file with test results: <a href="https://drive.google.com/open?id=0B3i8bvwOTQeDcTFfVlRjdG94LTg">Google drive link</a>

<h3>Other works</h3>

<p>Intially when I had set up the test environment and ran tests on the patched TCP, the file transfer would never end. The patched TCP silently kept dropping many packets and I wouldn't know why. I looked over and over my patches but coulnd't find the fault. It kept me stuck for 2 days. I had already figured out that the problem was with the PAWS patch since I removed one patch after the other till I could get the file transfer to work. I finally found out that the problem was with the already existing code which did not perform network byte order conversion for one of the fields of the timestamp option causing the timestamp values to behave non-linearly. I reworked my PAWS patch to include that change as well. It would be great if someone could review that change and let me know that it is okay.</p>

<p>I also reverted one of the small changes in my slowstart and congestion avoidance patch since it felt completely unnecessary after I inspected that traffic flow out of Ubuntu system to see how Ubuntu dealt with it.</p>
