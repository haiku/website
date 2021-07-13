+++
type = "news"
title = "Important Change Required for Haiku Nightly and R1/Beta2 Users"
author = "jt15s"
date = "2021-06-22 09:55:21+10:00"
tags = ["haiku", "software", "repo", "nightly", "beta2"]
+++

<div class="alert alert-info">
    <p>
    <strong>HaikuPorts functionality restored</strong>
    <br>
    Due to the <a href="https://www.haiku-os.org/news/2021-06-22_important_change_required_for_haiku_nightly_and_r1beta2_users/">important change to repository identifiers announced earlier</a>, the HaikuPorts repository was presenting users with an error reading <code>unarchiving the repo</code>. This issue has now been fixed and users may need to re-add the HaikuPorts repository again.
    </p>
</div>

Nightly and Beta2 users will need to “re-add” their release repositories to update to newer versions of Haiku and beyond. This change is part of a long-term improvement of our Haiku/HaikuPorts repository identifiers.

These commands need to be run in the terminal.

Check your current repositories:

```
pkgman list-repo
```

## Nightly Users

Nightly users will need to "re-add" both their Haiku and HaikuPorts release repositories to be able to update to hrev55184 and beyond.

### Re-add HaikuPorts repository

```
pkgman drop-repo HaikuPorts
pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/master/$(getarch)/current
```

### Re-add Haiku repository

```
pkgman drop-repo Haiku
pkgman add-repo https://eu.hpkg.haiku-os.org/haiku/master/$(getarch)/current
```

## R1/Beta2 users

Beta2 users will need to "re-add" their HaikuPorts release repository to be able to continue installing and updating apps from HaikuPorts.

### Re-add HaikuPorts repository

```
pkgman drop-repo HaikuPorts
pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/master/$(getarch)/current
```

{{< alert-info "R1/Beta3 users"
"This change will not be required for r1/Beta3 users as the changes will be built into the Beta3 release." >}}

## Summary

The “identifier” will change from `https://hpkg....` to `tag:haiku....` for both Haiku, and HaikuPorts on nightly installs (this identifier will only change for HaikuPorts on R1/Beta2 installs). Once you see the new identifiers, you have been successfully changed over to the new repository ID.
