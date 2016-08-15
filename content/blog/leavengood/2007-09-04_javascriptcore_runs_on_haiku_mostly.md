+++
type = "blog"
author = "leavengood"
title = "JavaScriptCore Runs on Haiku! (mostly)"
date = "2007-09-05T04:27:09.000Z"
tags = ["development", "porting", "WebKit"]
+++

So after a few frustrating weeks of very little progress on my WebKit port, I have finally gotten JavaScriptCore running on Haiku!
<!--break-->
As described <a href="/blog/leavengood/2007-08-20/webkit_port_complications">in my last blog entry</a>, the main show stopper was getting the ICU library compiled with the Haiku GCC 4.1.2 cross compiler.

After reading some documentation and a lot of trial and error, I finally got Haiku's GCC 4.1.2 to compile code outside of the Haiku build environment. I will document how to do this within the next week, as there are a few gotchas.

Once I had that working I was finally about to successfully run ICU's configure script, and most of the build went fine until the data directory. The data directory uses some code generators to do its work, but the code generators were compiled for Haiku, yet I was running them on Linux. I emailed the ICU mailing list for some help, but alas, received none. It seems I'm doomed to be a pioneer and figure out all my problems alone for this project.

Well it actually was pretty obvious to just build ICU for Linux and then copy over the needed code generators, and this is what I did. After this the build for ICU seemed to go fine.

But when I went to test, there was some odd error about a missing symbol in one of the ICU libraries! Argh! So I decided to take a break and sleep on it, and then today I looked again. It turns out the library from the infamous data directory did not compile right the first time, so I tried it again, and it finally worked!

The end result was I could finally run "testkjs" (the JavaScriptCore test program) on Haiku! Now some of you may have noticed that "(mostly)" on the title of this blog entry. Well since this was the first time running testkjs I got a segment violation related to the garbage collection in JavaScriptCore, so I still have some work to do before JSC is fully usable. But just getting the bugger to run is definitely a good milestone! And I'm only a month behind on my (clearly too ambitious) schedule :)

See the <a href="/files/screenshots/testkjs_working.png">attached screenshot</a> for some exciting textual output.

<a href="/files/testkjs_crash.png">Here is the crash :-D</a>