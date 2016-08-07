+++
type = "blog"
author = "PulkoMandy"
title = "WebKit weekly report #6"
date = "2013-11-08T07:32:34.000Z"
tags = ["WebKit", "webpositive", "contract", "contract work"]
+++

Hello world!

Sorry for no report last week, I was not in front of the computer on Friday.

Anyway, I got the HTTP authentication working last week. This was the last missing feature in the Services Kit version of WebKit when compared to the current cURL one. The next step is to fix the new rendering bugs.

The rendering side of things is mostly built into WebKit, so I didn't want to fix it on the old version we are still running. So, I have started merging WebKit changes all the way to the current revision. Unfortunately, our WebKit repository wasn't created the right way, and the commit hashes for WebKit commits didn't match the ones for the official WebKit repo. I had to create a new repository, and manually match the commits and play with git rebase, merge and cherry-pick to rewrite all ourwork against the official WebKit commits. This took some time, as there are 120000 WebKit commits in our repository, plus our own changes.

I have removed the old repository and uploaded a <a href="http://github.com/haiku/webkit">new one</a>. My work happens in the 'rebased' branch, which is the default one.

With the repository rebased onto the official WebKit, it is now possible to use git merge to merge commits directly from the <a href="http://github.com/webkit/webkit">official WebKit mirror.</a>. Our port was about 2 years behind, in WebKit world that's more than 30000 commits. I didn't merge those all at once, instead I'm working with ranges of about 2000 to 3000 commits. While one range is merging and compiling, I can review the commits for the following one, and take note of the important changes. This helps a lot knowing what happened when I need to do a merge or fix the build.

I have merged commits up to april 2013 so far. This is the point where the Chromium port gets removed, and later on the wxWidgets port. The GTK one switches to CMake as a build system (the same we use now). These are the changes that creates more conflicts with us, so I'm going to merge this part in smaller chunks (I tried a big one and got a build error I didn't know how to solve).

Following the removal of the Chromium port, WebKit entered a phase of cleanup and simplification. This includes removing Chromium-specific stuff, making the code simpler in some places, and also using some C++11 features that help with detecting errors at compile time.

One important change is the introduction of "platform strategies". Before that, porting webKit involved implementing many classes where the header file was shared accross platforms, but not the C++ sources. This led to a lot of #ifdefs-guarded platform-specific code all over the place. The platformStrategy class makes all the platform specific code located in the same place, and the shared code go elsewhere. Our port will be much easier to keep working this way.

So, which new features are brought in by this huge merge ? Well, none so far. Most of the features in WebKit are optional, and to keep things easier, we disabled most of them. As features are sometimes removed when no port uses them, I'm forst going to merge all the changes, then see what can easily be enabled. Some of the features involve only multi-platfomr code, but others require some porting.

Anyway, the up-to-date WebKit is faster, smaller, and has much less bugs, which are already very good things. When I'm done with the merge I will have a look at running the WebKit tests, as I'm pretty sure this will help catch some bugs and at least give us a better idea of the work left to do. Running a testsuite is now much easier thanks to the use of CMake, where the guis working on the EFL port made some changes to the build system to help with setting this up. I will also test all the websites I have listed on my TODO/check list, to make sure things that used to work are still working.

I hope to have something in shape for a merge next week or the one after that. The remaining part of the month will be dedicated to enabling some of the extra features, but with only 2 or 3 weeks left I will not be able to work on the most complex ones. Haiku, Inc currently can't fund another month of development, so it looks like I'll have to stop there, unless there are more people donating money this month.