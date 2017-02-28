+++
type = "blog"
author = "PulkoMandy"
title = "Haiku monthly activity report - 02/2017"
date = "2017-02-28T20:26:14.000Z"
tags = []
+++

Hello world!

Let's see what happened in Haiku this month. This report covers hrevs 50928 to
XXXXXX.

waddlsplash worked on enabling real subpixel rendering in Haiku. This used to be
protected by Microsoft patents, but they are all expired or will expire really
soon. So, it is time to start experimenting with this and getting ready for
enabling it.

waddlesplash also reworked the JSON API, and fixed several bugs found by the
"JSON Minefield" tests. This makes our parser more compatible with all kinds
of JSON data, and also easier to use.

humdinger added localization support to the package daemon and solver, allowing
for pkgman and HaikuDepot to be fully translated.

More patches from mt were merged, in order to make it possible to build Haiku with GCC 6.
This is still a work in progress, as GCC6 finds several new warnings also in
3rd-party code that was imported into Haiku. This code should be at least updated
to a newer version, and at best, moved to packages.

korli investigated and fixed some bugs in our pthread API, in order to increase compatibility
and make it easier to port software.

Dariusz Knociński improved the Polsih keymap, adding various special characters
(various kinds of typographic quotes, apostrophes, etc).

kallisti5 fixed a problem with host-only builds resulting in an infinite recursion in Jam
(it was trying to include the same jamfile over and over again because of an
 unset variable). Now it is possible to build Haiku host tools only, without targetting
a specific architecture. This is used by the package buildbots as they need the generic "package"
tool, but nothing arch specific.

hudinger reworked the layout of Tracker info window, to fix some overlapped text depending on font and font size.

axeld fixed a memory leak in bfs.

tqh tweaked our ACPI code to fix all warnings, and enabled Werror so the compiler
will now complain if someone adds warning-generating code in that area.

Skipp_osx added case insensitie comparison methods to BString, and used them to
fix some bugs in the legacy PackageInstaller (to install SoftwareValet packages
from BeOS).

kallisti5 worked on preparing support for AMD Ryzen CPUs (new cpuinfo fields)
and reviewed XHCI/USB3 code for potential issues.

nielx worked on updating our Pootle install and cleaned up some problems with
deprecated catalogs, missing languages, etc.

Lioncash fixed some memory leaks and late NULL pointer checks.

jua made many improvements to our FUSE layer, and used it to implement an SMB
filesystem, allowing to access Windows network shared drives (or anything using 
the same protocol). This is nicely integrated in the Network preferences thanks
to the add-on support there.

Kyle Ambroff helped investigate and fix a freeze of the network preferences, when
trying to configure a network in static mode.

<h3>Are we released yet?</h3>

There are some good news about the beta1 release this month.

First, not mentionned above are a lot of package updates in the repositories, in
order to keep them close to the release branches at haikuports.

But more importantly, the move of the haiku website and forums to new hosting was
completed, freeing some space on our servers. kallisti5 used that space to set
up a new buildmaster instance (much better than the half disassembled laptop
in my basement I used for testing until now).

We are now working on connecting everything together: exposing a web interface
shwoing the status of the builders, making changes to haikuports git repos trigger
an automated build of the changed packages and update of the repos, etc. Having
the server hosted on Haiku controlled infrastructure helps collaborating on that
and should also make the builds faster, as the build master can upload packages
to the slaves, and download from them, at a more decent speed than my home
internet access allowed until now.
