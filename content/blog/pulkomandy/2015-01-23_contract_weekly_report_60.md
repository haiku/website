+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #60"
date = "2015-01-23T07:39:32.000Z"
tags = ["contract work", "dns", "network kit"]
+++

Hello world!

Not much commits from me this week, as I'm still working on the libbind update, and I'm also doing some work for other customers. I got netresolv to build after implementing the missing getifaddrs function in Haiku - this is a non-POSIX function, but it is available in Linux and all major BSDs. It enumerates all network addresses for all network interfaces on the system, similar to our BNetworkRoster and BNetworkInterface classes.
<!--break-->
netresolv (the libbind replacement) uses this to properly implement address resolution in an RFC-compliant way. I got the thing to compile and resolve DNS requests, and all basic network tools are working properly again (FTP, telnet, etc). I have checked that the issue we were getting with connecting to GMail servers is fixed: when there is no IPv6 address configured, the DNS resolver now properly returns IPv4 addresses for the servers to connect to. However, I'm still working on some issues with apps using the "services kit" (HaikuDepot and WebPositive). These seem to hit some kind of deadlock waiting on replies from the DNS server or just be very slow (even worse than before). Things could be improved here to reduce interlocking between the different threads doing requests. The netresolv implementation of getaddrinfo and other resolution functions is based on a pthread lock, which means calling them from several threads is safe, but slow. There is a getaddrinfo_r function which is reentrant and avoids this problem.

To further improve the speed of services kit apps, I have also started work on a DNS caching system. This is something implemented in most modern web browsers (it is done for example in IE and Chrome). The idea is that in most cases, several network requests will be going to the same server. In the current situation, each of these requests will first require a request to the DNS server. The cache will avoid that by keeping the most recent replies from the DNS server and reusing them for several requests.

I have written a simple version of the cache to experiment with. While doing so I made some improvements to the BReference API to add a BConstReference class (which is a read-only reference to an object, useful for the cache). While testing this and the cache, I needed to build the BReference class in debug mode. Unfortunately, there is a bug in the Stack and Tile decorator code which makes the app_server crash when BReference is in debug mode, as soon as a window is opened. I will have to fix this before I can continue debugging my cache code.

I also did some work on the non-coding side: GCI finished last week, but it's already time to get ready for the Google Summer of Code and prepare our Ideas page: /community/gsoc/2015/ideas . There is still room for some improvement here and I'll continue working on it.