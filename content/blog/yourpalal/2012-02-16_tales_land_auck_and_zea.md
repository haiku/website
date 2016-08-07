+++
type = "blog"
author = "yourpalal"
title = "Tales From the Land of Auck and Zea"
date = "2012-02-16T21:42:05.000Z"
tags = []
+++

As was announced a little while ago, I recently got the opportunity to travel to Auckland, New Zealand to do some Computer Science research at the University of Auckland (UoA) with Christof Lutteroth and Gerald Weber (two professors here). Actually, it's not so much 'recently' as it is 'currently', since I'm still here! Christof has been interested in Haiku for a while, and has already done some research using Haiku. Stack and Tile, for instance, started as a research project here, as did the BALMLayout layout class. Furthermore, I'm not the only Haiku-er here, as Clemens Zeidler is currently working on his PhD in CS under the supervision of Christof and Gerald.

My supervisors have been very flexible with what I can work on, and we decided the first thing I should do is work on the BALMLayout. BALMLayout (ALM = Auckland Layout Model) is based on the idea of a constraint-based layout, where the programmer doesn't explicitly position elements, but rather describes how they must be positioned relative to each other or the layout area, and ALM figures it out. Since the code for BALMLayout was written before I started working on Haiku's layout API, BALMLayout had fallen behind a bit. So one thing I worked on was getting it up to date with the API. There were also a few things that BALMLayout was doing a bit differently from the other layout classes, which I've now normalized. I've also implemented a layout builder class for ALM, like the ones that exist for other layouts. The end goal is to have BALMLayout promoted to be a first-class layout, included in libbe.so, like the Grid, Group, and Card layouts. Although I've already written a bunch of code, I haven't yet pushed it to the main Haiku repo, but that's something I hope to do soon.

The next project I'm working on is pretty interesting in a few ways, as it includes running and compiling Java code on Haiku (using JamVM, GNUClasspath, and Eclipse's ecj compiler), and calling Java code from C++ as well (using JNI). Although this work is more experimental, it should pave the way for using  PDStore, a triplestore database developed at the UoA on Haiku, basically making it available to C++ programs as a library.

Now that you guys know what I'm up to, I want to thank everyone who helped make this trip possible: Haiku folks, UoA folks, my family and also Google (especially Carol Smith at the Open Source Programs Office), who provided me with a grant to keep things running smoothly.