+++
type = "blog"
title = "Repository Update"
author = "kallisti5"
date = "2018-09-11 08:54:35-05:00"
tags = ["haiku", "software", "repository"]
+++

A small notification that we have updated our repository URL's in preperation for R1 Beta 1.
This change will ensure that repository links remain consistant through R1 Beta 1 and beyond.

<!--more-->

## nightly / master

* ```pkgman drop Haiku; pkgman drop HaikuPorts;```
* ```pkgman add https://eu.hpkg.haiku-os.org/haiku/master/$(getarch)/current```
* ```pkgman add https://eu.hpkg.haiku-os.org/haikuports/master/$(getarch)/current```

## r1beta1

* ```pkgman drop Haiku; pkgman drop HaikuPorts;```
* ```pkgman add https://eu.hpkg.haiku-os.org/haiku/r1beta1/$(getarch)/current```
* ```pkgman add https://eu.hpkg.haiku-os.org/haikuports/master/$(getarch)/current```

The "meta url" used for repository identification changed as as well, so running
through these steps at least once on historic installs will ensure continued
functionality.

* [Forum Announcement](https://discuss.haiku-os.org/t/important-repository-changes/7322)
* [Upgrade Guide](https://www.haiku-os.org/guides/daily-tasks/updating-system.html)
