+++
type = "blog"
author = "engleek"
title = "GSoC: Improve and Extend Media Player"
date = "2010-04-28T19:24:19.000Z"
tags = ["media", "player", "dvd", "streaming", "gsoc", "gsoc2010"]
+++

As an operating system with a short boot time and a small footprint, Haiku is looking very interesting for the general public.

With WebPositive well on it's way to becomming a great browser, users will want a great media experience to go with it.

I propose to work on Media Player and the Media Kit, in order to improve it with new functionalities: DVD playback, streaming support, tray icon controls...
<!--break-->
<h4 class="icon-person-medium">Personal Profile</h4>
<ul>
 <li><strong>Full name:</strong> Christopher Humphries</li>
 <li><strong>Email:</strong> redeye4 (at) gmail (dot) com</li>
 <li><strong>Trac/IRC Username:</strong> Engleek</li>
</ul>

<h5>Summer Education</h5>

My course requires an end of year internship, which I hope is going to be working on Haiku with the Google Summer of Code program.

<h5>Employment, Timetables and Internet Access</h5>

As this internship is full time, I will not be seeking any extra classes or employment, and as far as I know, I don't have any foreseeable schedule conflicts for this summer, and communication will not be a problem, as I have a personal internet connection, and several back-up solutions.

As stated above, this internship is a full time occupation, and I will therefore treat it like any other serious professional placement with at least a full working week, which in France means 35 hours per week.

<h5>Past Experience with GSoC</h5>

I have previously been a Summer of Code participant, but my project for the Videolan organisation was not selected by the team.

<h5>About Me</h5>

I am an English student with dual English/French nationality, and I am currently studying for a masters degree in computer science at the Université de Rennes 1. My interests include reading, writing, photography, music and films, but my main interest lies in software development, which accounts for most of my free time, and quite often my sleep too.

My experience is mainly personal, and I often have several active concurrent projects. These range from simulators to chat programs using C++/Qt, to web applications in Python and Appengine, and are often public, open source projects, hosted on Github, Google Code, or Launchpad.

Over the past couple of years, I have enjoyed working on some of these projects with Maxime Simon, a fellow student at my university, and I have therefore been able to build my collaboration and team skills.

<h4 class="icon-ide-project-medium">Project Idea</h4>

<h5>Main Goals</h5>

<h6>DVD playing support</h6>

This goal implies both being able to play the video and use the in-film menus.
This seemed like a very hard task to begin with, but as libraries are already ported and available, it's more than possible.
A very simplistic development plan would be:

<ul>
 <li>Extend Media Players media abstraction layer with a producer node which will act as an interface with libdvdnav. To start with, this node will read DVD media and output audio and video buffers.</li>
 <li>Extend this producer node with user options for stream selection and navigation.</li>
 <li>Extend the Media Player Video View for multiple bitmap overlays, then extend the node to produce bitmap buffers for subtitles and menus. Extend the player for subtitle options alongside the stream options (David is working on a video mixing node at this very moment).</li>
 <li>Extend the node to decode navigation bytecode and add user options for menu navigation. As menu items are bitmaps, displaying them will be similar to displaying subtitles.</li>
 <li>This would also mean adding extra interaction for Media Player in order to use the menus, though as they are BBitmaps, this should only be a matter of reacting to B_MOUSE_MOVED messages.</li>
 <li>Adapt the node as an add-on to the Media Kit for widespread use.</li>
</ul>

<h6>Streaming support</h6>

A lot of music is being listened to and organised thanks to online services (Spotify and Last.fm for example).
Implementing support for streaming would make using these services possible, and extended to video, would also make technologies such as HTML5 video possible.
As above, I would first start by extending Media Player:
<ul>
 <li>Extent the FFmpeg plugin so that it provides another add-on for streaming (AVStreamReader)</li>
 <li>Modify the Media Kit to react to URI's and use streaming without seeking, this would also mean modifying MediaExtractor and MediaWriter in order to stop them from trying to write to the file (a kind of remote media mode maybe).</li>
 <li>Create a media producer node for Media Player capable of streaming from an online source, (This is tricky, because a browser has it's own network options, but Media Player doesn't. I would have to make it use either a Socket from the Network Kit, or directly use Curl), or from a file being streamed in real time.</li>
 <li>Modify Media Player to deal with lack of seeking and opening URI's.</li>
 <li>Adapt the node as an add-on to the Media Kit for widespread use.</li>
</ul>

<h5>Optional Goals</h5>

<h6>Easily and accessible controls</h6>

As a musical addict, I like to listen to music while I work, while I write, while I...all the time...so it is important for me to rapidly be able to pause the music, change the volume, change tracks...but also know what track is playing for example.
Right now, these actions feel a little clunky, and I would personally love to control Media Player using a tray icon.
<ul>
 <li>Determine a way to make a tray-icon work with the multi-threaded application</li>
 <li>Implement the functionality as an option (the SoundPlayer app sounds like a good place to find inspiration)</li>
</ul>

<h6>Current track functionality</h6>

A lot of instant messaging clients now offer the possibility to advertise the currently track that's being listened to, this functionality shouldn't be more complicated than just making Media Player script accessible.

<h6>User interface</h6>

The user interface as it is right now is usable but a bit barren and could do (in my humble opinion) with a little interface pimping.
Some examples could be:

<ul>
 <li>Improving the volume control (level label, animated icon, ease of use)</li>
 <li>Turning the favorites function into a real asset for the player</li>
 <li>Adding id3 tag data and album lists to the playlist window</li>
 <li>Adding album art/thumbnails and tags to the file info window</li>
 <li>Adding full screen overlay controls</li>
 <li></li>
</ul>

<h6>Settings and configuration</h6>

The settings window is kind of empty, and would need extra options for new functions, but also for missing configuration possibilities.

<h5>Motivations</h5>

My first intention was to improve the Haiku media experience solely by writing a native interface for VLC, and this seemed like a good choice.

My emails on the developer mailing list led to a conversation about Media Player and some very interesting and challenging ideas.

My course will largely be based around user experience and interfaces next year, so designing such a part for Haiku, which really is a breath of fresh air compared to other operating systems, really is interesting for me.

These ideas and growing personal inspiration, combined with a love for clean C++ and interface programming, fuelled my interest in this project and I would love to have my chance at implementing them this summer.