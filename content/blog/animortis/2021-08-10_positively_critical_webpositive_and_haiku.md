+++
type = "blog"
title = "Positively Critical: WebPositive and Haiku"
author = "Animortis"
date = "2021-08-10 18:55:15-04:00"
tags = ["haiku", "software", "WebPositive", "promotion"]
+++

Few components of Haiku are as important to the operating system and its functionality as the preferred web browser and internal project: WebPositive.  

In recent days, some users have expressed concern about a “disappearing text” bug, where some text on web pages will disappear for undetermined reasons. This issue is now fixed, but highlights the reason why WebPositive is so important.  

The history of WebPositive is as intricately woven into Haiku as BeOS was, and has served as a major effort for all the programmers and users of the operating system even as other web browsers are successfully ported, work for a little while, then, unfortunately, lose functionality and are abandoned.  

Developer PulkoMandy, whose real name is Adrien Destugues, lives in France and has been a key developer for Haiku and WebPositive since joining the team in 2009.  

WebPositive, sometimes called “Web+,” uses the WebKit1 engine. This engine was originally ported from KDE’s KHTML by Apple for their Safari browser and later brought into Google’s Chrome, Samsung’s phone browsers and more.  

“Few other browser engines have such portability and utility,” PulkoMandy said.  

Haiku developer Ryan Leavengood started efforts to port the engine to create WebPositive in 2008. In 2009, WebPositive won a slot as part of the Google Summer of Code, and student developer Maxime Simon was able to get the browser in a “mostly usable” state while developer Stephan Aßmus (stippi) built the browser framework itself.   

When PulkoMandy was hired, first as a paid developer before switching over as a volunteer to work on the WebKit port under WebPositive, there wasn’t a ton of new development going on with the software.  

WebPositive wasn’t the only browser for Haiku, but with the additional portability and power of the WebKit1 engine as it existed at the time, the team decided to build it into WebPositive and make it the official browser for the OS.

“Right as I started my contract, Google announced that they would be forking the WebKit project and created Blink, the engine now used in their Chrome browser,” PulkoMandy said in an email interview. “After studying the state of our port, we decided that it made more sense for us to remain with the original WebKit which was closer to what we wanted to do.”  

And so the work of keeping WebPositive updated began. To his surprise, every change modified how the OS worked, too. Applications that used SSE2 instructions like WebKit could crash if there wasn’t enough alignment for the stack all the way down the OS.  

“An unexpectedly low-level problem to hit when working on a web browser,” he said.  

Since then, most of the development in regards to WebPositive is porting: building new versions of WebKit into WebPositive in a way that the software continues to work while squashing any translation bugs that come up for an entirely unique operating system.  

“Maybe surprisingly, I actually did very few changes myself to WebKit core and the web-related parts in the last few years,” he said. “My work is simply getting the latest version of WebKit from the official repository, merging it with our version, and solving any git conflicts and compiler errors that result.”  

Any of the issues that come up can usually be managed pretty easily, he said. The challenge for the future is moving the WebKit engine up to a more powerful version and maximizing its usability within Haiku itself.  

“There is nothing really challenging in that, anyone with some knowledge of C++ can do it. From time to time, there is a refactor that requires rewriting or reworking some parts of the Haiku specific code. The main challenge is to keep doing this regularly (every month or so), otherwise we end up with thousands and thousands of things to merge, and it requires months of work to get through it all.”  

The hard work of volunteers like Rajagopalan, jua, KapiX, nephele, kallisti5, jessicah, shisui, nielx, korli and madmax have made a huge difference, too. PulkoMandy likened his work to just the tip of their iceberg.  

“I think both of these are a bit ‘under the hood’ changes,” he said. “There could be many things to do on WebKit in terms of relatively easy to implement features (gamepads support for HTML5 games, geolocation for websites which can use that, …). Not to mention all the work needed on the web browser itself, which has a quite minimal user interface at the moment.”  

PulkoMandy expressed hope that others would be able to come in and provide more development for additional features, like porting the browser to WebKit2, improving drawing performance, improving beyond bug fixes, and even more into the future.  

WebKit2 would significantly improve stability, for example. Though this presents a considerable challenge, as replacing any major software component could be, it is feasible.  

WebPositive currently matches Haiku’s version, and the latest stable version was released with Beta 3 on the 25th of July, 2021.  

Contributors are always welcome to help not only tackle many of the problems facing WebPositive today, but to expand it into the future as the primary browser of Haiku. Goals include further stability and rendering improvements, JavaScript compatability improvements, plus a plug-in and add-on system.  

For those who wish to contribute, visit the forums or the “Get Involved” page at [https://www.haiku-os.org/community/getting-involved/](https://www.haiku-os.org/community/getting-involved/).
