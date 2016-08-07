+++
type = "blog"
author = "maximesimon"
title = "Haiku Native Browser and WebKit port progress"
date = "2009-06-19T20:34:15.000Z"
tags = ["WebKit", "browser", "gsoc 2009"]
+++

After a month of work, it's time to take a break and a step back to check on our progress.
And after a month what we have is a prototype of a multi-process browser.
<h3>Haiku Native Browser</h3>
Ryan and I had a dilemma: <i>Where to start?</i> In fact, there is a lot to do on this project.
So we decided to start with a multi-process browser prototype.
<!--break-->
When I arrived on the project, Ryan had already started and had created an application that displays a bitmap rendered in another application. ( You can easily see here the basic architecture of a multi-process browser, a rendering engine detached from the browser. ) I had also made a similar prototype, but as Ryan's one was most advanced (especially the bitmap renderer), we began to develop the prototype based on his work.

Our work up till now:
<ul>
<li>diverse forwarding from main process to render process (mouse move, mouse click…)</li>
<li>a bookmarking library</li>
<li>a toolbar</li>
<li>support for multiple rendering processes</li>
<li>tab management</li>
</ul>

You may easily guess that we divided these tasks.

I was in charge of desiging and implementing the bookmarking library. I tried to make something like in NetPositive. In fact this work was finished at the end of May. :)
For the toolbar,  I did some research and found that the toolbar from the walter library is pretty good. That was the first implementation we did. After a while I tried to add a text field. At that time I had to abandon the walter toolbar. Indeed it was easier to design our own toolbar than integrating a text control box. But we keep the walter library for the buttons in our toolbar.

<span class="inline inline-right"><a href="http://www.haiku-os.org/files/screenshots/Tranquility_0.png" onclick="launch_popup(2561, 518, 536); return false;" target="_blank"><img src="http://www.haiku-os.org/files/screenshots/Tranquility_0.thumbnail.png" alt="Haiku Native Browser Prototype (aka Tranquility): Our prototype: a simple toolbar and a bitmap" title="Haiku Native Browser Prototype (aka Tranquility): Our prototype: a simple toolbar and a bitmap"  class="image image-thumbnail " width="193" height="200" /></a><span class="caption" style="width: 191px;"><strong>Haiku Browser Prototype (aka Tranquility) </strong></span></span>

As you can see the icons are far from beautiful but they are temporary. (Any constributions or ideas from a graphic artist are welcome.)
As we liked the menu bar background in Haiku, we used the same for the toolbar.

Since Ryan made the basic structure of the browser (renderer/browser), I designed the multiple rendering processes support, so that I can decently understand how our prototype works.
I had fun designing a sad tab <i>à la Chrome</i>. When a RenderBoy (that's the name of our rendering engine) quits, the browser (or browser tab when tab management will be complete) displays a  'sad tab' bitmap.

<span class="inline inline-left"><a href="http://www.haiku-os.org/files/screenshots/Tranquility - SadTab.png" onclick="launch_popup(2562, 516, 535); return false;" target="_blank"><img src="http://www.haiku-os.org/files/screenshots/Tranquility - SadTab.thumbnail.png" alt="Tranquility - Sad Tab" title="Tranquility - Sad Tab"  class="image image-thumbnail " width="193" height="200" /></a><span class="caption" style="width: 191px;"><strong>Tranquility - Sad Tab</strong></span></span>

As for the forwarding from the main process to the render process, it was Ryan's job. And he did well using BMessage. And what about tab management, Ryan is currently working on it. And I'm pretty excited to see what he will come up with.

<h3>WebKit port</h3>
We have reached a point where work on the browser prototype can't really progress (improvements will be done later, but none of them is enough important for now), and it is time to consider porting WebKit.

So, for a week now, I've been trying to build Webkit. It doesn't matter if it works (or not) for the moment.
In fact, WebKit is divided in two main parts:
<ul>
<li>JavaScriptCore</li>
<li>and WebCore</li>
</ul>
( the repo contains much more code for test purpose, website, and other platforms support ).

And we can easily divide my work in three parts:
<ul>
<li>get JavaScriptCore to build</li>
<li>get WebCore to build</li>
<li>get all this stuff to link</li>
</ul>
The first task was in fact the easier. The JavaScriptCore code is rather platform independant, so it didn't need a lot of work to make it build.

The second was a bit harder. WebCore is indeed much more platform reliant. Thankfully, Ryan did some good work with his last Webkit port. And I can easily reuse his code. In two years the WebCore code has changed, but not so dramatically. And I finally succeed in building it.

The third part… is the third part.
I'm currently working on it. And I avoided a lot of “<code>undefined reference to</code>”, but not all of them. ( Linking around 1300 objects isn't such an easy task. ) So I hope to finish this very quickly, to keep things moving.

<h3>What now?</h3>
We still have a lot of things to do:
<ul>
<li>make WebKit work ( some essential functions specific to the platform have to be implemented ),</li>
<li>integrate it into the browser,</li>
<li>port the Chromium networking code ( this could be an article on this blog. ),</li>
<li>improve the back and forward buttons,</li>
<li>create an omnibox-like url field,</li>
<li>and other mysterious things…</li>
</ul>