+++
type = "blog"
author = "maximesimon"
title = "WebKit port status update."
date = "2009-08-11T10:20:00.000Z"
tags = ["WebKit", "gsoc 2009"]
+++

<h3>We want news!</h3>
… or at least I suppose that some people want to know the progresses made on the WebKit port.
I think that we can split this work in two parts:
<ul>
<li>Improvements made on the port.</li>
<li>Landing in the official WebKit tree.</li>
</ul>
Ryan and I thought that the first part would have been a bit easier, but in fact since the previous port (by himself), many code in WebKit has changed. It is still a work-in-progress but I made some good advances.

As for the second part, it is also something that we are still working on. I can say that it is in great shape to be complete before the end of summer. ( The summer ends on the 21th of September… ;)
<!--more-->
<h3>Improvements made on the port.</h3>
<span class="inline inline-left"><a href="/files/screenshots/HaikuLauncher.png" onclick="launch_popup(2708, 629, 684); return false;" target="_blank"><img src="/files/screenshots/HaikuLauncher.thumbnail.png" alt="First screenshot of HaikuLauncher.: Screenshot of the first start of HaikuLauncher" title="First screenshot of HaikuLauncher"  class="image image-thumbnail " width="184" height="200" /></a><span class="caption" style="width: 182px;"><strong>HaikuLauncher:</strong><br/>First start.</span></span>
I do not know if you remember, but in my last blog post I just finished building WebKit. And in fact it was just the beginning of the beginning.
To test WebKit we have a “browser-shell” named HaikuLauncher that Ryan did 2 years ago. So my first step was to make this working. And it was not as simple as it sounds. As I said many parts of the WebKit code changed, so I had to adapt these parts of our port just to run HaikuLauncher.
As a great optimist, I assumed that, once HaikuLauncher started, the work was completed. Actually I was a bit too optimist. Near is a screenshot of what I got with a really simple html page (a h1, a hr and an image). With some little enhancements on the content size I got the hr to display correctly. But I did not finish my sentences.
<br/>
<h4>The great story of the font handling.</h4>
<span class="inline inline-right"><a href="/files/screenshots/HaikuLauncher (with better font!).png" onclick="launch_popup(2710, 698, 630); return false;" target="_blank"><img src="/files/screenshots/HaikuLauncher (with better font!).thumbnail.png" alt="WebKit font handling, at last something correct." title="WebKit font handling, at last something correct."  class="image image-thumbnail " width="200" height="181" /></a><span class="caption"><strong>Font handling:</strong><br/>At last something correct.</span></span>
My first task was to understand what I did not get any text (even texts in a paragraph tag did not displayed).
During the correction process I got some overlapping, some great issues with the font width etc… In short, it was not a funny task to correct this problem.
I finally succeed, and now our port displays the text without any problem ( in fact any problem we know for the moment ). As you may notice on the screenshot, the css was in good shape. And indeed I never ran into trouble with it.
<br/>
<h4>Flying with the bitmaps.</h4>
As you could have seen in the previous screenshot, images were not correctly displayed. This was the next battle.
I would like to thanks François who helped me on this issue. It was mostly a conversion problem between different bitmap formats. For the record, I got a sympathic headache: pictures were displayed “italic”. ( Here is a screenshot of it: <a href=http://picasaweb.google.com/lh/photo/Ixx-Io8UeGY--fxhTROE1A?feat=directlink>Italic bitmap</a>.) Of course we avoid it! ( Even if some people thought it could be cool to have all images displayed like that when surfing the internet. )
<br/>
<h4>And then?</h4>
<span class="inline inline-left"><a href="/files/screenshots/Bebook scrot.png" onclick="launch_popup(2711, 697, 671); return false;" target="_blank"><img src="/files/screenshots/Bebook scrot.thumbnail.png" alt="Extract of the BeBook." title="Extract of the BeBook."  class="image image-thumbnail " width="200" height="193" /></a><span class="caption" style="width: 198px;"><strong>Extract of the BeBook.</strong></span></span>
In the current state, our port can be used to navigate the web, but with some restrictions:
<ul>
<li>We have an issue with javascript, or rather, with pages which contains javascript. It is impossible to navigate these pages.</li>
<li>The scrolling is not correctly handled. Even if you can see the scroll bars in the screenshots, they do not work properly.</li>
<li>No JPEG images support, but who uses JPEG? Erm… Actually we should use Haiku translators to manage images, but that is not the case for the moment. And as there is no libjpeg in Haiku, there is no JPEG support.</li>
</ul>
Of course we are working on these issues to provide, as soon as possible, a fully working version of WebKit.

<h3>Landing in the official WebKit tree.</h3>
As part of our project, we wanted the port to be integrated in the official WebKit repository. The WebKit team is opened to new ports, as soon as they are maintained. And I would like to thanks them for accepting us.

Of course it could not be possible to enter the whole code in the tree as simply. All parts of our code need to be reviewed to be sure there is no coding style violation ( Hopefully they provide a tool to check the style of a given code. ), and to be sure that the code is clean of hacks or bugs.
And even if I cursed heavily against this reviewing system, I must say that this is a very good thing for the healthiness of the repository. 

<h3>But, but… and the web-browser?</h3>
Indeed I did not talk about the native web-browser.
As you may know, the renderer is an important part ( if not the most important part ) of a web-browser. So I think ( and I am pretty sure that Ryan will agree with me ) that we cannot incorporate WebKit in our brand new browser until it is stable enough. That is why Ryan and I did not make any enhancement on the web-browser.

There is still a week left before the end of the GSoC. Regarding to the status of the browser I would say that yet it would require some work. Of course I will continue this job with Ryan!