+++
type = "news"
title = "HaikuPorts Functionality Restored"
author = "jt15s"
date = "2021-06-23 09:22:18+10:00"
tags = ["haiku", "software", "repo", "haikuports"]
+++

Due to the [important change to repo identifiers announced earlier](https://www.haiku-os.org/news/2021-06-22_important_change_required_for_haiku_nightly_and_r1beta2_users/), the HaikuPorts repository was presenting users with an error `unarchiving the repo`.

While Haiku generates the repository tools on build, the HaikuPorts buildmaster is using an older binary (circa 2019) of the package_repo tool. In 2020, [a fix was applied to PackageKit to fix incorrect identifier forms](https://git.haiku-os.org/haiku/commit/src/kits/package?id=991d1a2097a6ada74b87dd53b83f6fc14093c76b) and thus this meant that the 2019 repository tools were rendered incompatible with the new changes and the new repository identifiers.

This resulted in package_repo generating invalid repository files.

A new set of package tools for the HaikuPorts buildmaster has been compiled and the issue has now been fixed.

{{< alert-info "Re-adding the HaikuPorts repository may be required for the repository to work." "Run `pkgman drop-repo HaikuPorts` and then `pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/master/$(getarch)/current`">}}

We apologise for any inconvenience experienced whilst HaikuPorts was non-functional. 
