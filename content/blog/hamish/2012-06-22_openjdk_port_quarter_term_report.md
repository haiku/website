+++
type = "blog"
author = "hamish"
title = "OpenJDK port: quarter term report"
date = "2012-06-22T01:32:54.000Z"
tags = ["gsoc", "gsoc2012", "OpenJDK"]
+++

Since my last blog entry I have mostly completed the implementation of the AWT/Java2D port. It is still in need of a lot of testing, but it is stable enough to run a lot of Swing apps out of the box. For example, here's jEdit and SwingSet:
<!--more-->
<div align="center">
<a href="/files/images/haikuswing.png">
<img src="/files/images/haikuswing.png" width="640px" height="480px">
</a><p><em>... the killer apps of the Java platform</em></p>
</div>

AWT drag and drop support is still missing because Haiku lacks some of the functionality required to implement it. Discussions on the design of a more fully featured drag and drop API are ongoing on the Haiku GSoC mailing list. Over the next week or two I will continue to polish the AWT/Java2D port with an eye to improving performance and weeding out bugs. Once I've fixed the more glaring issues I will upload binaries so anyone interested in trying out the new port can do so.

At half term I will start on the implementation of the jsound port, which will provide support for audio and MIDI.