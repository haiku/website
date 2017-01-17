+++
type = "blog"
author = "paweł_dziepak"
title = "NFSv4 client: final report"
date = "2012-08-26T18:46:23.000Z"
tags = ["gsoc", "gsoc2012", "NFS"]
+++

<p>Since three quarter term I've added NFS-level support for named attributes what means that virtually all important NFS version 4 feature are now implemented, as I described them in my blog posts during the coding period. What still needs to be done is to improve support of Haiku's extended attributes and a lot of bugfixing. There is also a room for performance improvement and several possibilities to organize code in a better way.</p>
<!--more-->
<p>Currently, NFSv4 client supports both read and write operations, file locks and various caches (some of which can be disabled). In addition to that there is named attribute support code and extended attribute emulation implemented. However, in order to have extended attributes fully working regardless whether the server supports them or not some work still needs to be done.</p>
<p>I will continue to maintain NFSv4 client code, though, I won't spend as much time on it as I did this summer. Firstly, I want to separate NFS and RPC code as soon as possible (but not before all major bugs are fixed). This should not be to difficult, since very beginning I tried not to mix NFS and RPC code. There are few places that will need some refactoring, though. In addition to that I want to prepare current code for NFSv4.1 support. That will require several changes that will improve general code quality and will make their job easier for anyone attempting to implement minor version 1 (probably me), or any later one.</p>
<p>While in general current client takes advantage of almost all caching possibilities described in NFS specification it could however release some acquired shares earlier and make it easier for other clients of the same NFS server and locking requests could be simplified when the client holds an open delegation. Moreover, implementing minor version 1 of the protocol will make additional caching mechanizms available.</p>
<p>Summing this up, the most important now is to fix as much bugs as possible, then I would like to change code organization a bit and prepare it for new features that newer versions of NFS may bring.</p>