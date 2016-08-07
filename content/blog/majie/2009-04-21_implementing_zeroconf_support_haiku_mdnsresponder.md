+++
type = "blog"
author = "majie"
title = "Implementing ZeroConf support for Haiku with mDNSResponder"
date = "2009-04-22T03:43:33.000Z"
tags = ["gsoc", "zeroconf", "mDNSResponder", "gsoc2009"]
+++

<h3><b>Personal Profile</b></h3>

<ul>
<li>Ma Jie</li>
<li>Brief bio</li>
My name is Ma Jie, And Jie is my given name. I'm a senior college student from China. Although not majored in Computer Science, I still love to do computer programming in my spare time. I have a National Computer Rank Examination certificate on computer network technology and got third prize of a national Java programming competition. The PoorMan server of Haiku is my first contribution to the open source world. I learned a lot from it, and I think it's time to contribute my knowledge back.
</ul>

<h3><b>Project idea information</b></h3>
<ul>
<li>Project title</li>
Implementing ZeroConf support for Haiku with mDNSResponder
<li>List of project goals</li>
<ol>
<li>porting mDNSResponder to Haiku</li>
<li>a mDNSResponder configuration preflet, which can be integrated into the network preflet in the future</li>
<li>a services browser and notifier, which may be integrated into the Deskbar</li>
<li>making PoorMan server utilize the ZeroConf network</li>
<li>writing test cases and running the tests</li>
</ol>
<li>Project description</li>
There are two major implementations of zero configuration networking, Avahi and Apple's Bonjour. mDNSResponder is the underlying component of Bonjour. There are several reasons for me to choose mDNSResponder as the Haiku's ZeroConf engine. First, as Avahi is mainly designed for linux and BSDs, it uses GNU Autotools, while mDNSResponder uses handmade makefiles. Since Haiku's build system consists of a lot of Jamfiles, mDNSResponder will be easier to integrate into the source tree. Second, Avahi lacks porting directions. Finally, Haiku prefers Apache license that is more compatible with Haiku's MIT license to LGPL.

There may be some difficulties when porting mDNSResponder to Haiku, because the cross platform support is abandoned and some gcc incompatible codes was added to the sources. I need to fix the broken codes during the porting procedure. mDNSResponder will run like other Haiku components. A server runs in the background and clients that want to use the ZeroConf services can communicate with the server by a library.

Goal 4 not only lets the PoorMan server broadcast its service to a local network, but it can be a demonstration to other Haiku services on how to use the ZeroConf network.
<li>Why do you want to work on this project?</li>
I think I can work on this project, because I ported thttpd as the backend of PoorMan server to Haiku and I learned some useful skills on porting codes to Haiku. If I can work on this project, with these experiences I can do better in my future contribution to the Haiku project.
</ul>
