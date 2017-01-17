+++
type = "blog"
author = "zooey"
title = "Package Management - Present and (hopefully near) Future"
date = "2011-02-01T14:27:10.000Z"
tags = ["package management", "contract work"]
+++

One month has passed (too fast), so it's time to summarize the developments 
in the fields of package management for Haiku.
<!--more-->
<h2><b>Where we are now</b></h2>

Implementation has been started, the following is a list of more or less 
working elements of the package kit and accompanying tools:

<ul>
 <li>infrastructure classes for translating package management requests into individual jobs and execution support for those jobs</li>
 <li>request- and job-classes for managing package repositories (adding, updating, removing)</li>
 <li>classes maintaining and representing package-specific information (package-provides & -requires, package-versions, ...)</li>
 <li>pkgman - a (console-)binary implementing package management on top of the package kit</li>
 <li>support for parsing ".PackageInfo" configuration files during package creation, a .PackageInfo file looks like this:
<pre>
name = mytool
version = 0.9.8i-1
architecture = x86
summary = "mytool is cool"
description = "the mytool package
is a very nice package"
packager = "me"
vendor = "my company"
copyrights = [ "(C) 2010, My Company PLC" ]
licenses = [ "GPL v2", MIT ]

provides = [
    lib:libmytool = 0.8.5,
    cmd:mytool
]

requires = [
    haiku >= r1,
    libssl == 0.9.8
]
</pre></li>
</ul>

<h2><b>Filesystem structure</b></h2>

Following is the current version of the filesystem structure as it would be with package management active:

<pre>
+-boot
  |
  +-apps ->             [symlink to /boot/common/pkg-tree/apps]
  |
  +-common
  | |
  | +-cache
  | |
  | +-packages          [dropping a package here will activate it system-wide,
  | | |                  most packages' contents will appear in 
  | | |                  /boot/common/pkg-tree, but specially marked system
  | | |                  packages will appear in /boot/system]
  | | |
  | | +-history         [contains info required for rolling back in time, used
  | | |                  by package manager]
  | | |
  | | +-jailed          [dropping a package here will make its contents appear
  | |                    in a package-specific folder under pkg-tree (a 'jail'),
  | |                    from where only packages that were marked as depending
  | |                    on this one specifically will be able to access it]
  | |
  | +-pkg-tree          [mountpoint of system package-fs, contents of the 
  | | |                  packages in /boot/common/packages appear here, the 
  | | |                  folders follow "Haiku filesystem hierarchy" (to be
  | | |                  defined, an example given below)]
  | | |
  | | +-add-ons
  | | |
  | | +-apps
  | | |
  | | +-bin
  | | |
  | | +-boot
  | | |
  | | +-data            [+ what used to be in 'share']
  | | |
  | | +-documentation
  | | |
  | | +-include
  | | |
  | | +-lib
  | |
  | +-settings          [+ what used to be in 'etc']
  | | |
  | | +-backup          [room for setting backups - used by package manager
  | |                    to backup settings during an upgrade]
  | |
  | +-var
  |
  +-home
  | |
  | +-config
  | | |
  | | +-packages        [dropping a package here will activate it for user]
  | | | |
  | | | +-history       [contains info required for rolling back in time]
  | | | |
  | | | +-jailed        [dropping a package here will activate it jailed for 
  | | |                  user]
  | | |
  | | +-pkg-tree        [mountpoint of user package-fs, contents of the 
  | | | |                packages in /boot/home/packages appear here]
  | | | |  
  | | | +- ...
  | | |
  | | |
  | | +-settings
  | |   |
  | |   +-backup        [room for setting backups ...]
  | |
  | +-mail
  | |
  | +-people
  |
  +-system              [any system-packages found in /boot/common/packages
    |                    will appear here - those contain either a complete
    |                    "system" or small, sequential "system-fix" updates]
    |
    +-develop           [moved here from /boot/develop (except for the 'tools'
    |                    folder), as it depends on the current system - the
    |                    tools subfolder (gcc & binutils) will be spread out
    |                    over /boot/common/pkg-tree]
    |
    +-optional          [moved here from /boot/optional, as the contents depend
                         on the system]
</pre>

In contrast to the last one presented in my blog, there no more is a separate "ports" tree, ported packages will just be treated as haiku-native packages (the line between these two classifications is too hard to draw). As a result, ports would have to follow some set of Haiku policies, defining where any package may (and may not!) put files. There will be a tool that will check any package against these policies and only packages complying with them will be made part of the official Haiku repositories.


<h2><b>Bits and Pieces</b></h2>

Package "Jailing"

One concept for dealing with ABI incompatibilities is to allow packages to be "jailed": a jailed package will not be activated in the usual manner, but its contents will appear completely separate somewhere in a folder specific to that package. Jailed packages will not take part in package management at all, i.e. the will usually be other (newer) versions of jailed packaged installed on the system.
 
Now if an update of a (supposedly compatible) library package is found to break one or more applications, the package manager can be asked to jail the last working version of that library package. Additionally, an attribute would have to be added to broken application(s) referring to the jailed version of the library. Upon activation of the application package(s), the package-fs would create links in a package-local 'lib' folder to the jailed library.

<h2><b>What's left to do?</b></h2>

A lot ;-), I'm afraid [in planned implementation order]:
<ul>
 <li>the 'package' tool parses .PackageInfo, but doesn't actually write any of these package attributes to the package file yet (I plan to to work on that later today)</li>
 <li>the repository format needs to be defined and implemented. It's pretty clear that the repository format will follow the example set by Ingo's hpkg format, i.e. it will contain package-attributes in a very compact format that's fast to read.</li>
 <li>tools for setting up a package building environment need to be created, which will basically setup a chroot environment containing just the packages required for building a specific target package, enter the chroot, build the software and package it.</li>
 <li>Haiku's package policies (rules about where files of specific types have to go) need to be defined and a tool needs to be implemented that checks hpkg files against those policies.</li>
 <li>supporting tools for creating a package repository from a set of packages (and uploading that repository to some server) need to be implemented</li>
 <li>the package-fs needs to support an ioctl that returns information (package attributes) about the currently active packages - this is required by the package kit's solver when it needs to compute the required actions for any package action request.</li>
 <li>the package kit's solver needs to be implemented, which basically means collecting package attributes from active packages and all repositories and passing them to libsatsolver (the same solver library that's used by openSUSE's zypper).</li>
 <li>the package kit (and pkgman) needs to gain more requests and jobs, implementing addition, update and removal of packages</li>
 <li>the bootloader needs support for package-fs, in order to be able to actually find the system (as that's contained in packages, too)</li>
 <li>a caching mechanism should be added to the package-fs, such that it doesn't need to parse all the hpkg files individually, but instead can store its state and restore it after a reboot (unless the state of packages has been altered, of course).</li>
 <li>support for package jailing needs to be implemented in the package kit</li>
 <li>[ probably some more stuff I forgot ]</li>
 <li>finally, when the package kit itself is working as intended, a graphical package management tool would be cool</li>
</ul>

That's it for now - I'll try to continue working on this stuff during the next weeks ...