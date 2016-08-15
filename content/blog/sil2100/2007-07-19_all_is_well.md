+++
type = "blog"
author = "sil2100"
title = "All is well"
date = "2007-07-19T12:15:53.000Z"
tags = ["gsoc", "usability", "pkg", "package"]
+++

Even though I had some private issues this week, all is going well with the PackageInstall. In its current form it is able to properly install all 3 test BeOS packages I tried on it, creating files and directories along with their data and attributes without flaw. So, what's left to do right now?
<!--break-->
<ol>
<li>The package installer GUI right now is implemented using the traditional way - with font sensitivity in mind. Ryan proposed that this might be a good chance to start using the Haiku layout API to get things done better and more readable.</li>
<li>Package and file collisions. What to do when a package is already installed or a file from the package already exists in the given path? This was given some discussion a while back, but it's still not clear whether any complicated form of operations is needed. Would the standard 'Should I replace XYZ?' suffice?</li>
<li>Testing. I need to test the package installer on various different packages, whether attributes are inflated and added as they should and all the similar. With this, I will also try to clean up the code a bit, since there are places that could use some rewriting.</li>
<li>Writing missing support for some features. During the writing of the parser there were a few tags I ignored because of their low significance (e.g. the Plat tag, showing the platforms on which the package can be installed). Nothing that is not completely useless shouldn't be ignored.</li>
</ol>

After finishing more or less these four steps, I think PackageInstall would be very much ready for public testing. Hell; it's ready for such tests from the moment it 'worked', but it's better for me to first fix all issues I know about and only then let everyone search for all the bugs I left behind. 

<span class="inline right"><a href="/images/packageuninstaller_simple_concept_sketch"><img src="/files/screenshots/ui_proposition_01.thumbnail.png" alt="PackageUninstaller simple concept sketch" title="PackageUninstaller simple concept sketch" class="image thumbnail" height="139" width="200"></a><span class="caption" style="width: 198px;"><strong>PackageUninstaller simple concept sketch</strong></span></span>Also, I have already started implementing the user interface of the package uninstaller. There was a discussion about what design should be chosen at the Usability Team mailing list a while back, after which we came (more or less) to a satisfactory consensus. The same as before the chosen layout is simple, usable and very 'Haiku'. 
The sketch of the design in mind can be seen to the right. Of course, since the work on the application has not started full time yet, it's not final and can be changed. In fact, there was also another very nice proposition (made by Jonas) for the package uninstaller to look like most BeOS preference applications, meaning having the list of installed applications at the left border of the window. But as Stephan said - the layout is not as important right now, since we can easily change this later on. No one would like this to become the typical "bikeshed" argument ;-)

That's how the situation looks like. I will probably be busy during the nearest week, so I don't think some great progress will be made during that time. But as always - stay tuned.