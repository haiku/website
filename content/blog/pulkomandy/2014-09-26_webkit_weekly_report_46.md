+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #46"
date = "2014-09-26T07:04:20.000Z"
tags = ["WebKit", "webpositive", "geolocation", "contract work"]
+++

Hello everyone!

This week most of my work went into improving our HTML5 support in WebKit. A lot of small issues and relatively simple features had piled up on my TODO list, and there weren't too much new bug reports so I spent some time to fix those. Here is a quick review of the features I added support for this week.
<!--more-->
<h3>range control</h3>

Range is a new input type in HTML5, which we implement as a slider. While WebKit has handling for it, and it is enabled by default, we never implemented the drawing code for this, and as a result the slider was not visible (but worked fine). I fixed this and gave the sliders a look close to the native ones thanks to BControlLook. There are some tweaks to do to get them to render at the proper size, however, but I will get back to that.

<h3>Color input type</h3>

Another new input type in HTML5 is color. We implement it as a preview of the color, which when clicked opens a floating window with a BColorControl to pick a new color. This is working fine and will be enabled by default from now on.

<h3>Datalists</h3>
Datalists are new HTML elements allowing to add a list of suggested value to form controls. They aren't visible by themselve, but are shown in various ways in different controls. On a text field they usually show as a popup list ; on a range, they are drawn as markers along the slider, and on a color control, they are available as suggestions in the color picker box.

Only the "range" kind is working completely. The color control shows the suggestions, but enabling them creates some unrelated drawing issue I'm still investigating. I haven't implemented the popup list for text fields yet.

<h3>Link prefetch</h3>

This feature allows web page to tell the browser to download some file and store them in the cache. This can be used for example on multi-page documentation, to prefetch the "next" page link. This allows the browser to prepare the files for the next page while you read the current one, making the flip to the next page much faster, even with a slow connection. There was no need for any change on our side, except turning the feature on, as this is all handled internally by WebKit in-memory cache.

<h3>Timeout support for XMLHttpRequest</h3>

This mechanism at the core of the "AJAX" system used on all modern web pages and web apps got some improvements in HTML5. One of them is support for a timeout. I added this to the NetworkRequest code in the network kit and implemented it. This may make some web applications work better.

<h3>Pointer lock</h3>

The pointer lock API allows html elements to lock the mouse pointer for themselves. This is used for example in html5 games, with a typical example of first person shooters where the mouse is used to pan the view. This was easy to implement using the BeAPI's SetEventMask to lock the mouse in.

<h3>Geolocation support</h3>

Another new feature in HTML5 is the possibility for websites to geolocate the users, that is, to know where they are, in order to suggest better search results, for example. On mobile phones this is often implemented using a GPS, but we don't have such hardware. I spent some time researching this issue and getting information on how other browsers are doing it, and they all work mostly the same.

The idea is to use an online database of wifi networks. The browser sends a request to the database through a web service, including the MAC address of all wifi networks in range. This can be matched against the known wifi networks to determine the likely position of the computer, with rather good accuracy (a few hundred meters in my case).

There are several databases of wireless networks online. The most well-known one is Google Maps, but they only offer this as a paying service. We don't want Haiku's money to be spent on this so I looked for other alternatives. I experimented with http://openbmap.org but their service was not really working (it locates everything in Paris, France), so I gave up on this.

We will be using the Mozilla Location Service. This is a project from the Mozilla fundation, to build a database of wireless networks with an open license and free access. Haiku was granted access to their web service, which is not openly available because there would be too much requests to it and Mozilla does not want to provide this for free to everyone. But we are a well-behaving open source project so they sent us an API key.

It will be some time before this goes live, as we need to make sure the key is kept reasonably safe. We can't just put it in our sourcecode, as it would be indexed by search engine and everyone could discover it and make use of it. It seems the best solution is to put the key on our buildbot slaves so it can be compiled into nightly images and stable releases.

The database for Mozilla Location Services is kept up to date by the community. If you find this interesting, you can contribute by running either Firefox Mobile or the dedicated MozStumbler application on your android devices. This will scan wifi and cellphone networks around you and populate Mozilla's database with the scan results.

If you think this is a dangerous attack to your privacy, don't worry, there are ways to protect from it. It will be possible to disable the feature in the new network preference panel. You can also suffix your wireless network SSID with "_noscan", which will prevent the scanners to collect data about it (both for Google Maps and MLS).

<h3>Rendering fixes</h3>

More annoying bugs related to scrolling were fixed. Scrolling on frames and vbulletin forums will work fine again in the next release. Some other problems with parts of the page not redrawing are also fixed.

<h3>Outside of WebKit</h3>

Tweaking these features made me spent a lot of time rebuilding WebKit. But now that I have two Haiku computers, I could use this time more efficiently by working on some haikuports recipes.

I added a package for DocumentViewer. This is an alternative to BePDF, with much faster PDF rendering but a rather unusual user interface. I continued the work on VLC, with help from Diver, to enable more modules and try to get it on par with the BeOS version. But a lot of things have changed in the dependencies and this is a lot more work than I thought it would. Maybe it is a better idea to extract the user interface from this old VLC version and port it to a newer one instead.

I also did a small fix to the Python 2.7 recipe to get youtube_dl working again.

I fixed various small issues and uploaded new packages for openttd, freedroidrpg, rocksndiamonds, allegro, smpeg, sdl_image. Munchausen did some fixed to fontconfig and freetype, which allowed me to resume work on the cairo recipe (which is not quite ready yet).

I also did some work on Haiku itself: writing a simple test for BTextView, adding the Aukland Layout Manager headers to the development package, and adding wifi network enumeration and connection to the new network preflet.