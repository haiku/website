+++
type = "blog"
author = "PulkoMandy"
title = "Working on WebPositive"
date = "2013-08-30T00:56:03.000Z"
tags = ["webpositive", "Services Kit", "contract work"]
+++

As you may know, I'm going to spend some time again as a full-time Haiku developer. This time, I'll be working on improving WebPositive and the WebKit port to bring a better web browsing experience to Haiku users.

During the past weeks I've managed to spare some free time to get up to speed on the various pieces of code involved and how to work with them. This first blog post summarizes the current state of affairs and I'll set some goals (with your help) for the next monthes.

<!--more-->

<h1>Architecture overview</h1>
A web browser is not as simple as it looks. There are several different things working together to bring your web pages to the screen:
<ul>
 <li>A rendering engine: we use WebKit, the same engine used by Apple Safari. Google Chrome used to share this engine as well, but they now have forked it to something called "Blink".</li>
 <li>A network backend: the backend manages the http protocol, including cookies, and also the https stuff. The default network backend in WebKit uses the curl http library. This backend is designed for testing purposes, but it is what we currently use for the Haiku port of webkit. It has big performance problems and we had to disable any form of caching because of some bugs in it.</li>
 <li>A browser shell: the shell is just an user interface to the other components. We have two of them: HaikuLauncher is a very simple one used only for testing purposes, and WebPositive is a more complete one you all know and use.</li>
</ul>

The main performance bottleneck in the current implementation is the network backend. There has been some work, started in 2010 as part of Google Summer of Code by my then-schoolmate Christophe Huriaux (aka Shisui) to build a better backend API. This is known as the Services Kit.

The Services Kit currently handles HTTP and HTTPS requests in a way similar to what curl does. It is part of the APIs Haiku applications can use. The advantages of the Services Kit when compared to curl are:
<ul>
 <li>A better cookie jar: curl was not designed to power a complete web browser. Its performance decreases a lot when there are many cookies to manage. While it works well enough for simple automated tasks (downloading content from a web page after logging in, for example), after some time surfing the web you will have lots and lots of cookies and parsing them makes any http request very slow. The Services Kit cookie jar uses an algorithm that scales better and finds cookies much faster.</li>
 <li>Extensibility to other protocols: curl works only with http and https. A web browser will need support for FTP, and possibly other protocols such as gopher. In the future, more protocols may be needed as well. The Services Kit allows protocol add-ons to extend its functionality.</li>
 <li>Be-style API: the Services Kit can notify a BHandler of page events using BMessages. This makes it very easy to plug it into the typical heavily multi-threaded Haiku application, and lets the network activity happen in an internal worker thread. As a result, the UI is more responsive and any busy-looping is removed.</li>
</ul>

So, this all sounds amazing, but the Services Kit is not finished yet, and the integration with WebKit was started, but didn't went far enough to be made available to everyone.

<h1>Work already done</h1>

To get started with all this I have already done the following:
<ul>
 <li>Services Kit and WebKit integration: I have worked with some help from Hamish Morrisson (GSoC 2012 student who ported OpenJDK to Haiku) to bring the experimental WebKit/Services Kit integration back in working order. Hamish made some changes and improvements to the Services Kit, and the WebKit side had not been updated to match. With this fixed, I now have a WebKit version that does not use curl anymore. This build feels faster when loading web pages, unfortunately it also has some easy to trigger crashing bugs (when middle-clicking a link, for example) and missing features (such as file:// URLs support, and more importantly, cookies). So, no testing binary for you just yet. I started fixing some issues, such as POST data not being sent in the proper format.</li>
 <li>Update for fRiSS: as the current maintainer of the fRiSS RSS feed reader, I have also started updating it to use the Services Kit. The goal was to have a very simple testing application for basic Service Kit functionality, as debugging something as big as the web browser makes things rather complex. Smaller applications like fRiSS allow easier testing of some parts of the Service Kit.</li>
</ul>

The work also included a lot of boring tasks, such as locating the latest version of our webkit fork (currently on aldeck's github account), getting it to build (takes several hours on my current computer, I ordered an SSD for it to make this more workable), and updating some readmes and other documents that did not reflect the current state of things.

<h1>Work to come</h1>

With this ground work behind me, I plan to start with the following:
<ul>
 <li>Document the Services Kit: it is currently not documented in the Haiku Book. I will add it there to make it easier to understand it and help others start using it.</li>
 <li>Debug the webkit integration: make sure all websites are still working fine with the new backend.</li>
 <li>Improvements to WebPositive: search engine customization, and others</li>
 <li>WebKit upgrade: our WebKit port is not in sync with their trunk development. Updating it usually requires some work because they are changing stuff at a rate we can't follow.</li>
 <li>Setup a WebKit build bot: previous attempts to upstream our changes to WebKit were cancelled for lack of a build bot to test the port. Getting the build bot running should be easier as the work on package manager brings us (as a side effect) a cross compiler we can use for this.</li>
</ul>