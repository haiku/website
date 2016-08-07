+++
type = "blog"
author = "stpere"
title = "Alpha release coordination / plan"
date = "2009-04-06T19:03:19.000Z"
tags = ["release", "alpha", "Marketing"]
+++

Greetings,

I'm proposing myself as a release coordinator for the upcoming Alpha Release, and here are the highlights of the plan.

First, this plan shouldn't be applied before those conditions are met :

<ul>
<li>the LiveCD works quite good (with no major issues left).  My understanding of that topic is that we still need the FS overlay (that allows attributes over iso9660) to support live queries.  If there is anything more to add to this point, please comment.  Plus, the ioscheduler should be tweaked to enhance the user experience using that media.
</li>
<li>
all the criticals (blockers) issues already identified are fixed.  I see that a lot of them have already been taken care of; that's good! :)
</li>
</ul>
So basically, my plan tries to moderate the pressure on the developper workforce while at the same time optimize the benefits from the release (attention from the community at large, etc..)

What I propose is to set a condition list, that when all met, will trigger the countdown.  So here is the basic timeline I propose :


<h3>RELEASE -4 weeks : Trigger</h3>

All conditions are met according to the release comitee. Feature freeze is announced to start after this week.


<h3>RELEASE -3 weeks : Feature freeze is effective</h3>

Bugfixes only. Medium tolerance to regressions.
First release of a preview livecd at the end of the week.
QA team gets the livecd to play with.  Basically, we try to boot it from everywhere :) But at this step, it shouldn't be the firsts steps of the livecd, so should be somewhat useable already.

We tag/branch/(whatever it is called under svn) the repository.. all work that might "break" things temporarely are done on the new "unstable" branch.  Fixes to what will become the release goes to the "stable" branch.

We put a countdown on the website, with a hot-linkable banner so that fans can blog about it and displays the countdown on their site.

<h3>RELEASE -2 weeks :</h3>

Bugfixes only. Low tolerance to regressions.
Call to test the livecd newest release.

Backport the main fixes that have been tested in unstable.

<h3>RELEASE -1 week :</h3>

Bugfixes only!! No tolerance for regressions.

Major Fixes regarding LiveCD are still accepted.
 
At this point, there should only be trivial bug fixes on other components. Of course the software is still alpha, but we have to get ready for the R-Day..

Special attention is paid to documentation and website..

<h3>RELEASE -3 days :</h3>

Past this point, the alpha tree is frozen.. the final images are in production

<h3>RELEASE -2 days :</h3>

Images are uploaded, seeded, ... we get the md5sum of the images..

<h3>RELEASE -1 day :</h3>

QA team test a final time the images. There is not much to be done at that time.

<h3>RELEASE!</h3>

Press releases are sent! Website is switched in release mode! The webserver braces itself!! :)

Okay, comments welcome..

Keep in mind that it's a draft ;-) On future posts, I will start the discussion regarding the formats we will distribute in (LiveCD, UsbStick, VMWare Images, etc...)