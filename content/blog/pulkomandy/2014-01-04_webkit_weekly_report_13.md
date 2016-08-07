+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #13"
date = "2014-01-04T12:16:26.000Z"
tags = ["webpositive", "WebKit", "contract", "contract work"]
+++

Hello everyone!

You probably already read the news on the homepage: I'm continuing to work on WebKit for January.
Maybe you noticed there was no report last week, as I was visiting family and didn't get much work done. I'm not counting that week as paid work for Haiku.

Most of the work I did during the last two week revolves around the testsuite stuff. The testsuite engine got support for tests that need some time before the reports are parsed. We used to dump the page right after loading, but in some cases the test wants us to wait a bit and notify us when it's done. The test uses Javascript to notify the testsuite system of this. We now get better (and more reliable) results for many tests that run some javascript code before giving their results. On the downside, the testsuite now needs more time to run, about 3 hours on my computer (using 2 cores).

I also added some support for dumping pages with frames. Only the top level would be dumped before, and of course that didn't quite match what the references for the tests expected.

I'm now starting to get a list of mostly actual test failures. A lot of them are because our font metrics aren't exactly the same as on other platforms. This leads to slightly different size for some text runs, and ultimately a different dump for the page. Some of the tests use the Ahem font to get predictable results, but not all of them. The ones that don't may need platform-specific test results to avoid the problem.

We are also failing a lot of the tests that use SVG. While the fixed gradient support improves things, it's not quite enough. The SVG drawing in WebKit is one of the places where transform matrices are used to scale, pan and rotate objects when drawing them to the view. This is another thing our BView can't do yet. I started looking at what's needed for this, and briefly discussed with stippi, our app_server expert, over IRC. However, I think it's better to get the testsuite ready before I do the change. This will allow seeing how much tests we can get to pass, and if it breaks other things (giving me an hint on what to work on next). The testsuite will also be useful when merging changes from WebKit again. We're now some month behind, but our current builds are fairly stable, and I don't want to break everything by merging the latest changes without having a way to track the regressions (and possibly the bugfixes).

I'll be uploading a new webkit build next week. This will include the gradient and box-shadow fixes, as well as the web worker crash fix, and some other things I did since last time. This should be a "reasonably good" version with enough stability to last for some time. I'll try to fix the remaining issues with the border color bleeding on the background, and the broken back/forward management, as these are the most visible and annoying of the remaining problems. I'll have to learn about the back/forward code, which, as you expect coming from WebKit, is more complicated than you'd think, for performance reasons. There is an in-memory cache for recently viewed pages, that avoids reloading everything when you press the "back" button. This includes the page itself, but also the position of the scrollbars and a few other things. While this seems very natural when using the browser, it's actually quite tricky to implement. The page can't be easily snapshotted because of JavaScript and other things that may be running, and the anchor used for restoring the scrolling may itself point to javacript-generated (or otherwise dynamically added) content.

Well, quite a lot of work to do, still.