+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - June 2016"
date = "2016-07-03T16:54:28.000Z"
tags = []
+++

Hey there,
<p>
Finally the reports are back to normal monthly schedule!
<p>
The summer is coming, which in my case means a little more free time for Haiku hacking. Anyway, on to the interesting facts. This report covers hrev50367-hrev50387 (yes, only 20 revisions this month, but some of them are large-ish with several commits from Barrett).
<!--more-->
<h3>TLS SNI support</h3>
Mark Hellegers contributed several patches which are getting merged. This one provides SNI support in BSecureSocket. SNI (Server Name Identification) is a feature of the TLS protocol which makes the client tell the server which domain name he wants to connect to. This is useful because a single machine may serve different hostnames, and, when a TCP connection opens, the server has no idea which of the names is being looked for.
<p>
The problem is, for the TLS connection to work securely, the server must send a certificate indicating the domain, and the client verifies that the certificate is for the right domain, and that it can be validated because it is signed by another already trusted certificate.
<p>
Anyway, our code didn't give the server name to OpenSSL, so this didn't work. In particular, it was not possible to connect to Freelists and some other websites which required SNI for use with HTTPS. And the issue is now gone.
<h3>Streaming support in Media Kit</h3>
Barrett's efforts in Media Kit land are now giving visible (or rather, hearable) results. The complete chain of required changes is now in place to allow MediaPlayer to play HTTP streamed radios. This is a bit rough at the edges, and the current focus is on making the whole thing more reliable, in particular when trying to seek on remote files, and when the bandwidth is low and there are problems fetching the data in time for playing.
<h3>Code cleanup</h3>
Murai Takashi is our main contributor when it comes to cleaning the code from warnngs introduced by new versions of the compilers. He usually helps with upgrading to newer versions of gcc, but this time he also had a look at warnings reported by clang over the Haiku codebase.
<h3>USB3 support</h3>
Korli has resumed his work around the USB stack and got one more USB3 controller working.