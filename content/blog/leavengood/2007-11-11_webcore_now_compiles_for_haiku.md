+++
type = "blog"
author = "leavengood"
title = "WebCore Now Compiles for Haiku"
date = "2007-11-12T05:40:29.000Z"
tags = ["development", "porting", "WebKit", "haikuware bounty"]
+++

I know I have been very quiet for a while in regards to my Haiku WebKit port, but that is because I've been in a long session of coding. I am happy to report that this weekend I finally got WebCore compiling for Haiku:

<pre><pre>
Link ../../../generated/objects/haiku/x86/release/WebKit/WebCore/libwebcore.so 
Chmod1 ../../../generated/objects/haiku/x86/release/WebKit/WebCore/libwebcore.so 
SetType1 ../../../generated/objects/haiku/x86/release/WebKit/WebCore/libwebcore.so 
MimeSet1 ../../../generated/objects/haiku/x86/release/WebKit/WebCore/libwebcore.so 
SetVersion1 ../../../generated/objects/haiku/x86/release/WebKit/WebCore/libwebcore.so 
</pre></pre>

So what does this mean? Does it mean the port is now complete? Unfortunately, no it doesn't.

There are still some "stubbed out" classes in the Haiku platform code in WebCore, which means they don't do anything and just exist to make the code compile. Fortunately I have coded a lot of the needed platform files, but the ones which are stubbed out are some of the more complicated ones.

But I am very eager to finally get a simple web launcher running on Haiku to test the port, so I plan to work on this project after work this next week. For those not aware my (self-assigned) deadline for the <a href="http://www.haikuware.com/bounties/webkit-port-bounty">WebKit Port Bounty on Haikuware</a> is November 15th, which is this next Thursday. I think this deadline was a good motivator so I am glad I have it, but I don't think the port will be rock solid and "complete" by then. Keep in mind that the Qt port of WebKit is also missing a lot and has been worked on by many developers for more than a year. In addition WebKit originally came from KHTML which was a Qt-based HTML engine, so they have another advantage in that the design is Qt-friendly. Even the Windows port which is done by Apple employees who are experts on WebKit is still missing things that the main Mac OS X port has.

I don't say all this as some big excuse. I just want people to realize this is quite a big project and involves my learning the design of WebKit as well as aspects of the Haiku API I am not aware of. Plus as I have discussed before I have had to set up a new cross-compiler environment, port and then build four external libraries WebKit needs (CURL, ICU, SQLite, and libxml2), and write new Jamfiles for JavaScriptCore and WebCore so they can be built with the Haiku build system. I have also added missing features to Haiku that WebKit needed. In the end I think I will be a much better developer after doing all this, but it does involve a lot of work. I expect that once I get over this first hump of the main work for the port, other people will be able (and hopefully willing) to help. I do know at least one Haiku developer who has interest in helping a bit.

So what do I plan to deliver to satisfy the bounty? Well I have started working on "HaikuLauncher", inspired by the QtLauncher, which will be a very basic browser shell to drive the WebKit engine. I would like this to be able to load a web page and render it properly. Beyond that I'm not guaranteeing anything, at least for another few months until I can write a full browser (which is outside the scope of the bounty.)

Given this I hope the folks who contributed to the bounty can feel satisfied that their money was well spent.