+++
type = "blog"
author = "zooey"
title = "Package Management, First Draft"
date = "2011-01-08T19:38:59.000Z"
tags = ["package management", "contract work"]
+++

The following is a first draft of how package management on Haiku could look like. I'm more than sure that there are aspects missing here, but we need to start the discussion somewhere ...

Several people have already added their ideas on package management to the <a href="https://dev.haiku-os.org/wiki/PackageManagerIdeas">wiki article</a>. Additionally, many opinions have been stated in comments to my first blog entry. 

I have tried to incorporate most ideas mentioned into this draft, but due to the sheer amount of contradicting views, some sacrifices have to be made.
<!--more-->
<strong>HPKG and Package-FS</strong>

Haiku's package format (hpkg) has been designed explictly to support swift access to the contained file-hierarchy and -contents in order to facilitate mounting one or more folders containing such packages via Haiku's package-fs.

What happens if you mount a folder full of *.hpkg files is that the package-fs will combine all those packages to construct a (read-only) hierarchy of files and directories at the mountpoint. Moving packages into/out of the package-folder will adjust the mounted hierarchy accordingly (live). 

In order to see how well this concept scales, I have experimented with two sets of hpkgs, which were converted from pacman packages: the small set had 168 packages amounting to 260 MB and the large one had 1052 packages amounting to 2.4 GB (all sizes refering to the compressed package files). On my testing machine, package-fs managed to populate the small tree in 2 seconds with an empty file cache and in 0.6s with a full cache. The large set took 16 seconds to populate after boot and 3.2s on second try. With keeping in mind that package-fs currently doesn't do any caching by itself whatsoever, these are very promising numbers. I'm pretty positive that with added caching, we could bring down the delay for mounting a large package-fs to levels which are acceptable as part of Haiku's boot process.

<strong>A modified folder hierarchy</strong>

In order to be able to support user-specific as well as system-wide activation of packages, and in order to clearly separate the cumbersome, dependency-ridden ports hierarchy from the rest of Haiku, I've found it necessary to remodel Haiku's basic folder hierarchy to some extent.

Here's my filesystem layout suggestion (please excuse the ascii-art):

<pre class="terminal">
/boot
|                     [/boot/apps is gone - system-wide applications now appear
|                      in /boot/common/tree/apps]
|-common
|---develop           [moved here from /boot/develop]
|---packages          [dropping a package here will activate it system-wide]
|---settings          [common settings]
|-----backup          [room for setting backups - used by package manager to backup settins during an upgrade]
|---tree              [mountpoint of system package-fs, contents of the packages in /boot/common/packages appear here, the 
|                      folders follow "Haiku filesystem hierarchy" (to be defined, an example given below)]
|-----add-ons
|-----apps
|-----boot
|-----data
|-----documentation
|-home
|---packages          [dropping a package here will activate it for user]
|---settings          [user-specific settings (N.B.: may come from apps that live in /boot/common/tree)]
|-----backup          [room for setting backups ...]
|---tree              [mountpoint of user package-fs, contents of the packages in /boot/home/packages appear here, the 
|                      folders follow "Haiku filesystem hierarchy"]
|-----add-ons
|-----apps
|-----data
|-----documentation
|-ports
|---packages          [dropping a (port) package here will activate it]
|---tree              [mountpoint of ports package-fs, contents of the packages in /boot/ports/packages appear here, the 
|                      folders follow whatever facilitates easy porting, i.e. the hierarchy basically is unixy - what's shown below
|                      is just an example]
|-----bin
|-----boot
|-----etc
|-----include
|-----lib
|-----share
|-----tmp
|-----var
|-system              [unchanged, contents can be updated via package manager by actual installing (unpacking) of either a complete
|                      "system" package or sequential "system-fix" packages]
|---optional          [moved here from /boot/optional, as the contents depend on the system]
</pre>

The most obvious change is the ripping out of the ports-related stuff from /boot/common into a separate hierarchy. Basically, this means that /boot/common no longer has to contain Unixy paths like 'etc', 'share', 'var' and the like. After all, Haiku isn't Unix and we can chose our own folder layout. The ports subhierarchy can be modeled such that doing the actual porting of Unixy software is as easy at it can be.

Early during the boot process, Haiku would populate the three package-fs mountpoints and could then use all the software contained in any of them. Inter-dependencies between these the four sub-systems (/boot/sytem and the three package-fs mountpoints) are as follows: 

- /boot/system does not depend on anything else.
- /boot/common/tree contains Haiku-specific applications/frameworks and may depend on anything in /boot/system, but not on anything in the /boot/ports. If any software requires Unixy components (libraries), it must bring them along as part of its own bundle.
- /boot/home/tree is the same as /boot/common/tree only for a single user
- /boot/ports/tree will most probably never depend on anything else but the POSIX-/libc-specific parts of /boot/system, i.e. libroot.so & libbsd.so. Unixy software doesn't know about Haiku kits, so it won't use them.

<strong>So how would this be used then?</strong>

Judging by the comments to my initial blog entry, it seems clear that many people do not want to have anything to do with the package management system at all. They'd like to be able to download Haiku-apps from any odd website and then start them by double-clicking the downloaded file. 
Fair enough, when you invoke a package, Haiku would temporarily mount this package by means of package-fs and then start the application.

Installation of a downloaded bundle would mean to drag'n'drop it into /boot/common/packages or /boot/home/packages, depending on whether it shall be available system-wide or just for per-user.

Unixy software with dependencies on other packages demands for support by a package management tool, so if you'd like to install such software, you start that tool (either the console- or the GUI-version), search and select the software and then tell it to install it. Taking Subversion as an example, the package management tool would automatically download APR-util, Neon, LibIconv, LibXML2, OpenSSL and SQLite and place all of these packages into /boot/ports/packages. Unpacking would be done by package-fs and the 'svn' command would be available immediately (in /boot/ports/tree/bin).

Since the package-trees are immutable, you can no longer simply fiddle with any of the files. In order to change something manually, you'd have to find the hpkg containing the specific file you'd like to change, move that hpkg to some place else, unpack it, change the contents, repack it and then move it back to the .../packages folder.

<strong>System Upgrades</strong>

System upgrades would be done by the package management tool (maybe with a separate UI just for that task). A system upgrade would be executed by downloading a single package that contains the whole /boot/system folder. This package would be unpacked to /boot/system_next, /boot/system renamed to /boot/system_last and /boot/system_next to /boot/system. These renames aren't atomic, but the bootloader could surely be adjusted to cope.

For bug- & security-fixes, small "system-fix" packages could be created, which contain changed files that would be unpacked on top of the existing /boot/system folder.

<strong>The package management tool</strong>

The package management tool, as I imagine it currently, would know about all the available and installed hpkgs (by means of queries), but clearly separate Haiku applications from ports. 
When updating any software, the pm-tool could zip an eventual settings folder of that software and store that in a backup folder, such that these settings can be restored when a downgrade should ever be done.

The implementation details of the actual tool are still vague (to say the least), but it is clear that it will only ever be relying on the actual hpkg files that live on the system. Any special markups like locking of specific packages (in order to keep them from being upgraded) will be done as attributes on those hpkgs. For performance reasons, it may be necessary to use some kind of cache for the info contained in all those packages and probably a service that manages the cached info and answers requests for that data to any interested party. 

Many other aspects (handling of drivers, support for application-mimetypes via package-fs, writable folders in /system/ports) are explicitly not mentioned here. 
First we need to settle on the general idea, so please attach your flames as comments or send them my way ;-)