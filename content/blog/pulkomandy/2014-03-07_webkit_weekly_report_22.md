+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #22"
date = "2014-03-07T07:58:33.000Z"
tags = ["contract work", "webpositive", "WebKit"]
+++

Hello there!

First of all, thanks to everyone who donated some money to make yet another month of contract work possible. This weekend I uploaded a release as announced in last week post. As expected, after this long overdue update, testers quickly found many small problems, so this week my work was mainly hunting these small bugs. Fortunately, none of them was too hard to fix. The fixes include:
<!--break-->
<ul>
<li>Text was disappearing when a box used both a scrollbar and css border-radius. (missing a PushState/PopState in scrollbar drawing code, leaving the view in the wrong state)</li>
<li>Downloads were not working (again, one case of changed method prototype. Override keyword added to the affected class, so this won't happen again)</li>
<li>Keyboard scrolling would not always work (the keyboard events need to be handled by either WebKit or our own code. In this case we were sending them to WebKit but the scrolling is happening on our side). I fixed the condition to decide where to dispatch events, but this could be improved further.</li>
<li>Some new crashes, related to the bug fixes from last week (WebKit was telling us to draw stuff on a 0-pixel bitmap, and the interface kit doesn't like that).</li>
</ul>

While I was at it, I also made some other changes, for example using keyboard shortcuts (such as cmd+C) in fullscreen mode won't make the menu show again. I have also updated WebKit to the latest version (released just yesterday). This seems to be working as good as before, but I had to disable an ASSERT to get there. It seems our C++11 threads support isn't working as well as it should (this is a problem with comparing instances of std::thread::id, I'll investigate it today, I don't know yet why it isn't working). Fixing this could improve the stability of the system, as having this non-working means there could be some problems in the locking between threads...

I've been researching one of the crashing bugs in the testsuite, which is a stack overflow. I got some hints from the WebKit developpers on this. While the bug isn't fixed yet, they at least told me how to enable the x86 disassembler in WebKit (yes, there is such a thing!), so it's now possible to use the JSC_showDisassembly environment variable to view the x86 code that the JIT generates. This should help tracking the bug and understanding why the stack usage is so huge (at least 16 megabytes when the program crashes). There should be a limit on stack usage by the JS engine, but it doesn't seem to be working.

I also did some work on the development tools. When building haikuwebkit 1.2.4 for Haiku-gcc4, AnEvilYak noticed that our CMake port wasn't compiling anymore, because of the cpu information API change in the Scheduler work (the 9+ CPU support). We fixed this, and while I was working on that, I updated our haikuports recipe to CMake 3.0.0-rc1. I'm currently working with CMake people to get all our changes upstreamed, so CMake 3.0.0 should compile on Haiku without any patch. I have also uploaded a package for vim 7.4, and some other unrelated software I happened to have built in my hikuporter repository.

Haiku hacker Arfonzo provided us with a new Haiku server. This is a very powerful machine with lots of CPUs and RAM. The idea is to use it as a build bot for various projects. I started testing this with a CMake build bot. We will need some more work before this is running as smoothly as we want, so far the network access to the server has been a bit unstable, and we need some extra tools to turn Haiku into an useful server (I started with doing a recipe for dcron, a cron implementation). The plan is to use that server to also run a WebKit build bot, and probably also a NetSurf and an Haiku one. But, the first step is getting reliable network connections... Anyway, thanks for hosting the hardware and setting up the server. This helps a lot with getting our project considered seriously when upstreaming our patches.

I almost forgot: you may have noticed there are still some cases of "border bleeding", for example on haikuports.org and dev.haiku-os.org. Well, I finally identified the issue. The problem is lack of support in app_server for the "even-odd" polygon winding rule. In this case, that winding rule is used to draw the borders as a rounded rectangle, with another smaller rounded rectange carving a hole in it. for this to work in our current "non-zero" rule, one of the two rounded rectangles would have to be described counter-clockwise, so that it compensates the other, instead of adding to it. Well, read about polygon winding, I don't explain this very clearly. I wanted to discuss this with Stippi before doing changes to the app_server, but, he doesn't seem to be around IRC this week. Anyway, this issue is reasonably easy to fix now that I have identified it, so in the next release, border bleeding will no more happen!

I'm still investigating some other issues, one of them being problems rendering some gradients. I'm not sure what's happening yet, but I'll have a closer look at the code for this. I also startd some changed to add transform matrix support and enable the web inspector, but these aren't quite working yet. I'll probably do a release without finishing those things, because the drawing issues, crashes, and lacks of downloads in the current version are really crying for a quick fix.