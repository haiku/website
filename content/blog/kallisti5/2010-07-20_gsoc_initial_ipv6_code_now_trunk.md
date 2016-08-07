+++
type = "blog"
author = "kallisti5"
title = "GSoC: Initial IPv6 code now in trunk"
date = "2010-07-20T13:10:12.000Z"
tags = ["gsoc 2010", "ipv6"]
+++

There is great news from the 2010 GSoC midterms... Atis' GSoC work thus far on IPv6 has been merged into the main-line Haiku trunk by Axel due to its quality.

Apply the buildfile diff attached to this post, to any post-<a href='http://dev.haiku-os.org/changeset/37604'>r37604</a> <A href='http://www.haiku-os.org/guides/building'>sources</a> to give IPv6 a whirl. Please keep in mind the IPv6 code is still extremely early, using IPv6 may result in dreaded KDL's and other general bugginess.  See below for Atis' example usage of the IPv6 modules.

Bug reports on the new IPv6 support can be made on Trac under the Network &amp; Internet >> IPv6 component.
<!--break-->
<pre>
#
# IPv6 command quick demonstration.
# Note that for the last test to work, there should be 
# a host with address fc00::2 connected to the link.
# Ping from outside is also spprted but not shown here.
#

ip6demo()
{
	# configure IPv6 address on loopback interface
	ifconfig loop:0 inet6 ::1 up

	# remove existing IPv4 interface
	ifconfig -d /dev/net/etherpci/0

	# configure IPv6 address on ethernet interface
	ifconfig /dev/net/etherpci/0 inet6 fc00::1 plen 64 up

	# configure IPv6 default route
	route add /dev/net/etherpci/0 inet6 :: plen 0 gateway fc00::2

	# test ping to local address
	ping6 -c 3 ::1

	# test ping to remote address
	ping6 -c 3 fc00::2
}

ip6demo
</pre>