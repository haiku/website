+++
type = "blog"
title = "Haiku monthly activity report - 05/2018 (ft. LibreOffice!)"
author = "waddlesplash"
date = "2018-06-06 17:51:30-04:00"
tags = ["monthly-report"]
+++

Welcome to the fifth monthly report for 2018! ... Yes, I know, <a href="/blog/pulkomandy/">PulkoMandy</a> usually does these. But he's got WebKit fixes to do, and not much spare time, so this month at least he gets a break while I cover for him.

This report covers hrev51922-hrev51985.

### Applications

PulkoMandy merged a bunch more changes from upstream WebKit and updated the version in the nightly builds. It's a little unstable at present as a result (though he has some fixes coming soon.) YouTube is unfortunately also broken, though this is due to YouTube serving videos differently than before, which we don't handle correctly yet. (It works properly in some of the Qt browsers that are in HaikuDepot...)

### Drivers

Korli merged more ethernet drivers from FreeBSD 11 (broadcom440x/570x, marvell_yukon, syskonnect, rdc, nforce).

Korli also made some fixes to the `usb_audio` (which is not included in the build), `console` drivers, and `device_manager` to make them work with SMAP, and fixed some bugs in the virtio disk layer.

PulkoMandy added support for "extended buttons" in PS/2 Synaptics devices. Some ThinkPads use the "extended" buttons to implement the real ones, so this is useful there. He also added back support for clickpads, which are also found on some newer machines, as a 1-button mouse ("We didn't really support this since the old
Macintosh ADB mouses, so let's see if that code aged well!")

### Servers

`mount_server` now has a better scoring mechanism to match volumes for automount, thanks to axeld.

### Kernel

Korli continued his work on 32-bit applications support for x86_64. He now has most of the binary-loading, commpage, signals, and syscall system changes merged, though there are still a lot of pending changes to fix individual syscalls and then start applications in 32-bit mode.

PulkoMandy and axeld fixed the locking-related KDL that was mentioned in last month's progress report, as it had become too annoying for just about everyone to be tolerated.

### Build system

The modern GCC has been upgraded from version 5.4 to 7.3, thanks to the work of kallisti5, mt, korli, miqlas, and waddlesplash. mt had submitted a significant number of patches over the past few months fixing compile errors and new warnings on the new GCC, while kallisti5 spent some time doing the initial merge of our changes in buildtools. korli and miqlas contributed the new HaikuPorts recipes. waddlesplash finished the buildtools changes merge and made tweaks to all the rest of the work, and spent a few days tracking down a [kernel crash on startup](https://dev.haiku-os.org/ticket/14160) that occurred on builds made with the new GCC.

The precise cause of the crash is still unknown, though it might be related to use of SSE registers. For now, the GCC optimization that causes it has been disabled on the problematic files, though eventually the true root cause of the problem should be found.

No other major adverse effects of the switch have been reported thus far. With this out of the way, waddlesplash has turned his attention to working on porting the FreeBSD 11 WiFi stack, as he's gotten tired of his laptop not having wireless support.

### Infrastructure

kallisti5 did some more work this month on infrastructure, some of which is ongoing and behind-the-scenes (new buildbot setup...), but one piece of it is already live: package mirrors.

There is no code in `pkgman` to handle mirrors automatically, so you will need to set them up manually by removing the default repositories and adding the mirrors. At present, the list of mirrors is stored in a `mirrors.txt` file alongside the repository information, e.g. here is [the mirror file for `HaikuPorts/x86_64`](https://eu.hpkg.haiku-os.org/haikuports/master/repository/x86_64/current/mirrors.txt).

At time of writing, there are two mirrors for HaikuPorts: kallisti5's (in USA-NYC) and jessicah's (in NZ). You can add whichever you'd like using:
```
# jessicah's NZ mirror
pkgman add-repo https://cdn.haiku.nz/haikuports/$(getarch)/current
# kallisti5's USA-NYC mirror (HTTP only...)
pkgman add-repo http://cdn.nyc1.terarocket.io/haikuports/master/$(getarch)/current
```
jessicah also has mirrors of the main "Haiku" repository (kallisti5 does not, yet), which can be added with
```
# jessicah's NZ mirror
pkgman add-repo https://cdn.haiku.nz/haiku/$(getarch)/current
```

### Ports

The big news this month, as forum posts and the title of this blog have already given away, is that LibreOffice has come to Haiku!

<img src="/files/blog/waddlesplash/libreoffice_haiku.png">

KapiX had been working on a Haiku-native backend for some time, but the progress of that was moving pretty slowly, so Diver attempted to build the Qt port instead:
```
<Diver1> Qt UI is a really new thing
<Diver1> I just noticed it and decided to build it and it turned out to work just fine
```
There are still a few caveats and bugfixes still going on; for details see <a href="https://discuss.haiku-os.org/t/libreoffice-is-now-available-for-haiku/6917">this forum thread</a>. But it is entirely usable for day-to-day work. As of writing, it's already in the `x86_64` package repository, and hopefully coming soon to the 32-bit one.

### Are we released yet?

No, not yet... but there are only one or two infrastructural issues remaining, and the bug list is slowly but surely shrinking. We are closer than ever before, though, and the end is, I think, finally in sight. Patience.
