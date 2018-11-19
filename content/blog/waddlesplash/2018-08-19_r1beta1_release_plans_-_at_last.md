+++
type = "blog"
title = "R1/beta1 release plans - at last"
author = "waddlesplash"
date = "2018-08-19 23:16:19-04:00"
tags = ["r1beta1", "releases"]
+++

At last, R1/beta1 is nearly upon us. As I've already explained on the mailing list, only two non-"task" issues remain
in the beta1 milestone, and I have prototype solutions for both. The
buildbot and other major services have been rehabilitated and will
need only minor tweaking to handle the new branch, and mmlr has been
massaging the HaikuPorter buildmaster so that it, too, can handle the
new branch, though that work is not quite finished yet.

So essentially all that stands between us and the release itself is a
lot of testing, and more testing, and polishing all the little bits
and pieces we've neglected along the way. I've already begun drafting
the release notes, and the i18n translation tools have been
synchronized with master, so even though the string freeze hasn't
happened yet, the bulk of the translation work can begin.

The <a href="https://dev.haiku-os.org/wiki/R1/Beta1/Timeline">current release timeline</a> is this:

  * **18 Aug - 25 Aug**: last minute scramble.
    * We (hopefully) won't commit anything too risky
    * Testing should start ramping up.
  * **25 Aug**: branch!
    * Buildbot and Buildmaster will be generating beta1 release candidates
  * **25 Aug - 7 Sep**:
    * *All hands on deck* testing release candidates.
    * Unless any unfixable showstoppers are found, the release won't be halted.
  * **7 Sep - 10 Sep**
    * Finalization of the "golden masters" (should just be images picked from the buildbot)
    * Final translations synchronization and lock.
  * **10 Sep - 18 Sep**
    * Release when ready, with some window to account for unexpected delays.

Onward!
