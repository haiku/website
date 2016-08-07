+++
type = "blog"
author = "alex_roman"
title = "Google Summer of Code: Zeroconf!"
date = "2008-04-23T18:13:11.000Z"
tags = ["soc"]
+++

This summer I'll be attempting to enable Zeroconf support in Haiku.

For those of you who may not be aware, Zeroconf enables Zero Configuration Networking, and it is aimed at simplifying the creation of small networks: no DHCP server, no pre-determined IP addresses, no need to know what host name your printer is on! How is this achieved? There are three components to it:
<ol>
<li>Addressing: handled by IPv4 Link Local Addressing</li>
<li>Naming: handled by multicast DNS</li>
<li>Service Discovery: also handled by multicast DNS</li>
</ol>

This project will have two main components:
<ol>
<li>Implement IPv4 Link Local Addressing</li>
<li>Port and integrate Apple's mDNSResponder (open source, under Apache 2.0 License, <a href="http://bonjour.macosforge.org/">public CVS server available</a>)</li>
</ol>

Right now I'm considering buying the <a href="http://www.amazon.com/Zero-Configuration-Networking-Definitive-Guide/dp/0596101007/ref=pd_bbs_sr_1?ie=UTF8&s=books&qid=1208972664&sr=8-1">Zeroconf book</a> written by one of the main authors of Zeroconf, Stuart Cheshire. However, Google may issue us O'Reilly Safari accounts where the book would most likely be available for viewing online... If nothing happens within a month or so, I'll just buy the book. From the reviews it seems like it's a good reference for both users and developers.

That is it for now... Until next time!