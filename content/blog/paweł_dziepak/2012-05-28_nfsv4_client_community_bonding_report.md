+++
type = "blog"
author = "paweł_dziepak"
title = "NFSv4 client: community bonding report"
date = "2012-05-28T10:59:03.000Z"
tags = ["gsoc", "gsoc2012"]
+++

<p>During community bonding period, apart from reading specifications, I also analyzed other NFSv4 client implementations, looking for interesting ideas and solutions. One thing I noticed which may be worth using in my NFSv4 client implementation is caching of some parts of generated RPC request.</p>
<p>In addition to that I also got more familiar with what Haiku expects from file system modules. I have written a very simple dummy file system and check how things work. The problem I encountered here is that Haiku when creating a vnode identifies the file using its inode number. NFSv4 server provides its clients inode numbers but does not provide any way to get file using its inode number. That is why the client will have to keep some cache of inode numbers it is aware of in order to map them to NFSv4 file handles. Self-balancing BST seems to be a good idea.</p>
<p>I started working a few days before May 21st and the day the official coding started I already had a module that was able to generate and send NFSv4 null request and receive a reply using either TCP or UDP as transport protocol. In the first weekend I polished that code, added proper error handling, interpret RPC errors that might happen, made the client use only one TCP connection or UDP socket per server no matter how many file systems are mounted and added support for AUTH_SYS authentication flavor. Public backup of my work is available <a href="https://github.com/pdziepak/Haiku/tree/nfs4">here</a>.</p>
<p>Since most of RPC and XDR code is complete (apart from few issues I need to address) my next goal is to write NFSv4 request generation and reply interpretation. That will allow me to start writing hooks a FS module should provide. According to my initial timeline I had to have all mandatory hooks written by June 25th. However, now I think there is a big chance I will have that done by June 11th (quarter term).</p>