+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #12"
date = "2013-12-20T07:37:24.000Z"
tags = ["WebKit", "contract", "contract work"]
+++

Hello everyone!

I was a bit bored of messing with the testsuite so this week I looked into "real" issues. The merge of a new WebKit version to trunk last week led to a few more bugreports, and I also looked at some very old ones to see if I could do something. Turned out the answer is yes, and for some of them, the fixes were also rather simple. So let's see what we have:

<ul>
<li>Copy&Paste now doesn't add random text after the useful data</li>
<li>CSS box shadow doesn't leave an ugly artifact next to the box. It still doesn't draw the shadow, however.</li>
<li>Implemented a minimal version of "complex text layout". This gets "optimize-legibility" text to draw (for example on play.google.com). Most places where text wasn't showing were because of this.</li>
<li>Disabled scrollbars look as expected, instead of a strange grey rectangle with no buttons around it.</li>
<li>Web Workers don't crash the browser anymore.</li>
</ul>

That last issue is caused by a stack alignment problem. What happens is the stack in Haiku is aligned to 4 bytes (32 bits, or the size of a CPU register). This used to be enough. But, when compiling some parts of WebKit, gcc generates code that uses SSE2 instructions like MOVDQA to access data on the stack. This instruction, working with SSE registers, requires 16-byte alignment (128bits). Our stack isn't aligned this way, so the instruction triggers an hardware error and the application crashes. Fortunately, gcc allows specifying that some functions need to check that the stack alignment is correct before running, so I could avoid te issue.


While I was working on all this, AnEvilYak added a feature I was missing in debug_server: it is now possible to tell it to automatically save a debug report instead of asking the user what to do. This is very helpful for the testsuite, as it can now run without me having to click the "save report" button. I had tried to implement this from inside the testsuite app, by catching the signals and trying to run Debugger myself, but that wasn't working well. So, I removed that code and we're now using the new debug_server support, which works much better. The testsuite scripts know to look for the debug reports on the desktop, and will move them to the right place in the test results. With this new way to save reports, we have a disassembly of the exact place where the crash happened, making it a bit easier to understand the errors.

With this out of the way, I went back to analyzing the testsuite results. I made some progress in writing our TestExpectations file, and now the html report is small enough to be browsable in Web+, which makes it much easier to compare the test results. One of the problem I had was that the pixel tests often got out of sync, and the engine would compare the expected output from one test with the actual output of the previous one. I found the problem (we weren't syncing the offscreen view before getting the offscreen bitmap) and also fixed one memory leak in that part of the code.

I now have 6000 more tests to analyze before I finish the TestExpectations file. When this is done, I will have a try at updating WebKit against the trunk again (we're already 1700 revisions behind), and see if that triggers any regressions - or maybe, fixes some of our probems.