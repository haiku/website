+++
type = "blog"
author = "leavengood"
title = "WebKit Port Complications"
date = "2007-08-20T23:31:52.000Z"
tags = ["development", "porting", "compiler", "gcc", "WebKit", "haikuware bounty"]
+++

<p>I have been documenting my progress on porting the <a target="_new" href="http://webkit.org">WebKit</a> project to Haiku on the <a target="_new" href="http://www.haikuware.com">Haikuware</a> site, but decided to also post information here. You may want to read my <a target="_new" href="http://www.haikuware.com/index.php?option=com_content&task=view&id=92">previous blog article</a> about this port and also the information at the <a target="_new" href="http://www.haikuware.com/index.php?option=com_content&task=view&id=54&Itemid=39">WebKit bounty</a> on Haikuware. Please consider <a target="_new" href="http://www.haikuware.com/index.php?option=com_content&task=view&id=47&Itemid=71">donating to a bounty.</a></p>

<p>Before I started work on this port I asked in the #webkit IRC channel what the mimimum version of GCC that was required to compile WebKit. The general consensus was 4.0. So what does that mean?</p>
<!--break-->
<p>Well let&#39;s talk a little bit about BeOS compilers. I won&#39;t go into too much history because I don&#39;t know it all. What is relevant to the current discussion is the newest GCC which can be used to compile BeOS-compatible programs is <a target="_new" title="GCC on BeBits" href="http://bebits.com/app/4011">GCC 2.95.3</a> . This version was released on March 16, 2001. Yes it is that old, older even than the Haiku project. The original GCC 2.95 was released on July 31, 1999. Of course this ancient GCC has been nicely maintained and updated as much as possible by <a target="_new" title="Oliver's Developer Profile" href="http://bebits.com/devprofile/3400">Oliver Tappe</a> and others.</p>

<p>The problem with using newer GCCs for BeOS programs is the GCC project changed various important aspects of the compiler which affects how C++ is compiled after 2.95.3. These changes were to fix bugs and design flaws, so they were necessary, but the end result is older C++ programs and libraries will not work with newer compiled code. This isn&#39;t a big deal on fully open source systems with well-maintained software. Projects like FreeBSD and Debian Linux went through the &quot;growing pains&quot; of changing to newer GCCs years ago. They had to make sure everything was recompiled and packages all updated, so it wasn&#39;t trivial, even for them.</p>

<p>Haiku, on the other hand, has a bigger problem: it needs to support very old, unsupported &quot;abandonware&quot; like Gobe Productive. Though we can dream, it is doubtful the Gobe Productive code will ever be released, or even that someone who has the code will recompile it for Haiku. There may be several other such applications that at least a few people find useful and would like to use on Haiku. So for Haiku to truly be the successor to BeOS which can support these programs, it must use the older GCC 2.95.3.</p>

<p>So how does all this relate to my WebKit port project? Well like I said above WebKit is a modern code-base and it requires a modern compiler, probably at least GCC 4.0 (released April, 20 2005, not exactly brand new.) In fact this weekend I attempted to compile JavaScriptCore with GCC 2.95.3 and it failed almost immediately. The preprocessor couldn&#39;t handle even a fairly simple macro in the Platform.h header file, where various parameters for the WebKit-supported platforms are kept. Now I know this problem can be worked around. I&#39;m sure the many other errors I would encounter could be hacked around too. So why don&#39;t I just do this? Several reasons:
<ul>
	<li>It will be tedious, frustrating and could take a very long time.</li>
	<li>The resulting mess would not ever be accepted by the meticulous developers on the WebKit project. This would turn my port into a fork, meaning I would have to manually integrate any changes from the &quot;real&quot; Webkit or maintain loads of patches. I do not want to do this. A clean port will most likely make it into the WebKit SVN repository.</li>
	<li>It is unnecessary because Haiku can already be built with GCC 4.1.2!</li>
</ul>
</p>

<p>That&#39;s right, the Haiku code-base was &quot;ported&quot; to compile on GCC 4.1.2 quite some time ago. Using GCC 4.1.2 requires Linux though, and in fact I had never bothered to use this GCC until I got my new Linux computer which became my default Haiku development machine. This is also why I decided to port WebKit to Haiku on Linux, not BeOS.
</p>

<p>So that solves this WebKit problem then, right? Well no, because as I said above a GCC 4.1.2 compiled Haiku would not be able to load older BeOS applications and the whole &quot;backwards compatible dream&quot; would be lost.</p>

<p>But wait, I forsee another solution, of course (hey I&#39;m a problem solver.) I believe it is possible to create a &quot;legacy&quot; sub-system in Haiku to run older BeOS applications. All the core libraries that programs need when running, like libroot.so, libbe.so, etc. would be compiled with both GCC 2.95.3 and GCC 4.1.2. Newer applications would have a special code embedded in their ELF header to indicate they are newer. The runtime_loader, which is responsible for loading applications, would detect this code and link the application with the newer GCC 4.1.2 libraries. If the application does not have this code, the loader assumes it is a legacy application, and it is linked with the older GCC 2.95.3 libraries. Now there may be a flaw in this whole idea, but I believe it is worth trying.</p>

<p>But for the moment this issue can wait, because my priority right now is to get WebKit ported. I can continue on this work by compiling my own Haiku with GCC 4.1.2 to test the port, which is exactly what I&#39;ve been doing.</p>

<p>My current issue is trying to figure out how to compile external libraries with the Haiku GCC 4.1.2 compilers. The Haiku build system is pretty well designed, but is specialized to do what it does: compile Haiku using the Jam build tool. I integrated WebKit into this system by writing Jamfiles for it, but that really isn&#39;t an option for all the various libraries WebKit depends on. So I need to find a way to either use the current compilers or compile my own for this specific purpose. Dealing with compilers isn&#39;t trivial so this may take me a while.</p>

<p>But I will report that I got JavaScriptCore to compile successfully last week. But I need to test it and that is what requires I compile external libraries (specifically I&#39;m trying to compile <a target="_new" href="http://icu-project.org/">ICU, the International Components for Unicode</a>  library.) If anyone has any tips or tricks, please let me know! :)</p>