+++
type = "blog"
author = "paweł_dziepak"
title = "NFSv4 client finally merged"
date = "2013-03-15T17:09:10.000Z"
tags = ["NFS"]
+++

<p>Earlier this week NFSv4 client I have been working on during the last year Google Summer of Code has been merged into the main Haiku repository and is now available in nightly images. The client supports all caching mechanisms available in the version 4 of NFS what means that it can get the most out of network connection and the server. Unfortunately due to limitations of the NFS protocol itself extended attributes are not supported yet.</p>
<!--more-->
<p>In order to mount a NFS share you need to type the following command:</p>
<pre>mount -t nfs4 -p "server_address:path flags" directory</pre>
<p><code>server_address</code> may be either an IP address or a host name. Flags are optional, the default configuration should be appropriate in most cases and should be changed only if problems appear. The available flags are:</p>
<ul>
<li><b>hard</b> - if no valid reply to a RPC request was received the request is retried indefinitely.</li>
<li><b>soft</b> - if no valid reply to a RPC request was received the request is retried no more than <b>retrans</b> times. This is set by default.</li>
<li><b>timeo=X</b> - request time limit before next retransmission (default: 60 seconds).</li>
<li><b>retrans=X</b> - retry requests X times (default: 5).</li>
<li><b>ac</b> - use metadata cache (enabled by default).</li>
<li><b>noac</b> - do not use metadata cache.</li>
<li><b>port=X</b> - connect to port X (default: 2049).</li>
<li><b>proto=X</b> - use transport protocol X. UDP and TCP are available. If this flag is not specified TCP is used. Note that some servers does not support open delegations if the client connects via UDP what may reduce performance.</li>
</ul>
<p>Since the NFS client requires now much less attention than earlier, I have concentrated on data execution prevention (DEP) and address space layout randomization (ASLR). This two features when enabled will make exploiting vulnerabilities in any Haiku application significantly harder.</p>