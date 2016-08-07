+++
type = "blog"
author = "aldeck"
title = "Making it Build"
date = "2012-06-06T00:29:10.000Z"
tags = ["webkit webpositive contract", "webpositive", "WebKit", "contract", "contract work"]
+++

Hello fellow Haiku'ers, as promised I'm posting a quick update on my WebKit / WebPositive contract work. It's been a little more than a week already, and a small report is due!

Welcome WebKit r115944 ! As you may know, WebKit is a really big project, in the last two years, 70000 revisions have passed and the file count has almost doubled. The approach I took was to start by checking out a recent WebKit revision and try building the components one by one, re-applying our changes. The idea was to add only the strict necessary for Haiku and at the same time try to include as many features as possible, ignoring assumptions and workarounds that aren't needed anymore. As many things have changed in WebKit and as I needed to get familiar with this huge codebase anyway, I decided to dismantle our port and put it back together again, like one would have done with a complex piece of mechanics. Thus I did a Jamfile from scratch, based on other platforms buildsystems, and replayed our changes one by one, as the compiler asked. Each time trying to document my changes and research the reasons and implications of the changes.
<!--break-->
WebKit is composed of several distinct parts, as seen in the source tree:

WTF (Web Template Framework) provides base utility classes for all the project, it's pretty much platform agnostic and only few changes were needed to make it build again. It took me a day to get it to build again on Haiku.

JavaScriptCore, the default javascript engine took a bit more care, but a day was all that was needed. Tests run, at least as well as on other platforms it seems, but I'll get back to it later. The javascript shell 'jsc' works well too, and I could run http://v8.googlecode.com/svn/data/benchmarks/v7/run.html benchmark and be pleased with the results. It seems that the situation really improved, under Haiku at least. See for yourself:

<pre>
                    old       current
Richards:           784       5295
DeltaBlue:          726       4483
Crypto:             463       5305
RayTrace:          1985       8026
EarleyBoyer:       1803       6355
RegExp:            1121       2593
Splay:             2430       6723
NavierStokes:       780       4242
----
Score (version 7): 1091       5124
</pre>

Next is WebCore, where the real meat is. This one took me around ten days (yes, I had already started before posting my contract proposal, if only to estimate the work needed) to get it in back a buildable state, following the same approach, trying to understand even the smallest change. I have no way to test if it behaves as expected yet, but I'm at least confident that I haven't devied too much functionally-wise. I'll get back to it when I have a browser to play with!

And now the WebKit part, which mainly contains the client API to build browsers, HaikuLauncher test application and WebPositive sources (that will be moved in the Haiku source tree at some point). It contains some fat classes, but it's not as heavy as WebCore and when that one builds I'll be finished with this first phase of 'Making it Build'. 

So that's where I am, WTF and JavaScriptCore can be considered done, there's a lot more uncertainty on WebCore but I believe that when I've got libwebkit built and a test application running (in a couple of days hopefully), it shouldn't be too hard to bring it back to a more solid state.

You can follow my progress on my github repository https://github.com/aldeck/haikuwebkit (more a personal backup than a real collaborative repository as it's a git-svn clone of our current haiku-webkit svn repository)

Hope you enjoyed this piece of text, I'm for one really enjoying working on this project :-)

Best regards,
Alex