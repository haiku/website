+++
type = "blog"
author = "stippi"
title = "The new WonderBrush"
date = "2012-10-25T10:59:14.000Z"
tags = ["wonderbrush", "graphics", "agg", "multithreading", "qt"]
+++

Some of you may know that for quite some time, on and off, I am working on a rewrite of WonderBrush, the graphics tool that comes bundled with Haiku releases. Since I have last demonstrated the prototype publically, I have occasionally found the time to work on it some more. I've ported over most brush tool related code from the original WonderBrush. And in the past weeks, I have specifically worked on a new text tool (written from scratch).
<!--more-->
The new text tool will address some of the shortcommings of the one in the original WonderBrush: On canvas editing and support for style ranges. In the current WonderBrush, a text object has one global font, font size, color and so on. And editing text works indirectly by entering it into a separate BTextView in the tool setup area. Both of these issues will be addressed by the new text tool. Different fonts, font sizes, colors and so on can be applied to individual ranges of the text and editing can happen directly on the canvas. Generally, I think a separate, regular text widget to enter the text is not such a bad idea. The text object on the canvas may be hard to see and read, either because it is partially behind other objects on the canvas, or because of applied effects or simply the current zoom setting of the canvas. So there is still a dedicated text entering widget inside the tool configuration area.

But progress on WonderBrush comes also from another direction. Ingo is on bord again :-). He recently picked up a lot of experience coding in the Qt framework, and is working on a port of WonderBrush to the tool kit. To keep the effort of this undertaking in check, he is often directly importing public Haiku classes into the port. The majority of the WonderBrush code stays unmodified, targeting the Haiku API only. Some of that API may just be implemented on top of Qt where it is necessary for the port. It's a very practical approach that is already showing good results, although the Qt port is still far behind the Haiku version.

During the <a href="/conference/2012_begeistert_026_marathon">upcoming BeGeistert event</a> in Düsseldorf, I plan to demonstrate the progress on the WonderBrush rewrite and the Qt port.

Unfortunately, at the current rate of development, it will still be a while before the new WonderBruch can replace the old one. But when it does, it will offer some cool professional features that are lacking from a lot of graphics tools for other platforms:
<ul>
 <li>Nested layer tree</li>
 <li>Full 16-Bit per color channel, linear RGB internal color format</li>
 <li>Heavily multi-threaded design from the ground up</li>
 <li>Powerful document model featuring global styles and global resources</li>
</ul>

I look forward to meeting fellow Haiku enthusiast and developers at BeGeistert, to celebrate the old times and the future! :-)