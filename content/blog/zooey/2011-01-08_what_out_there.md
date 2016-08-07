+++
type = "blog"
author = "zooey"
title = "What is out there?"
date = "2011-01-08T16:48:17.000Z"
tags = ["package management", "contract work"]
+++

<!--break-->
[Posted now since I had to retype the whole damn thing after (Linux-)Firefox died on me two days ago when I was nearly done ... sigh]

I've spent the last couple of days sifting through the existing package 
management solutions in order to learn how they work and to find concepts (or even whole components) which could be used as part of Haiku's own package management solution.

Here are my impressions on the systems I've tried out or read up about so far:

<strong>Application bundles [Mac OS X, (variants available in Nextstep, RiscOS, ...)]</strong>

Apple has introduced app bundles as a way to add new applications to the system easily. A bundle is basically a zipped folder containing everything the app needs to run (including all the libraries required by it). Settings and data files (like mails in case of an e-mail app) are being created outside of the bundle when the application is started. The "leading" application of a bundle can be started by double-clicking the bundle file.
There are ways to share parts of bundles (frameworks) between bundles, but I didn't get a clear idea yet about how that actually works.

<strong>apt [Debian, adopted by Fink, Cydia and many others]</strong>

Apt has been one of the first package management tools doing automatic dependency resolution. The tool is written in C++ and is heavily linked to dkpg, debconf and the general Debian build infrastructure. Ripping apt out of the infrastructure it expects to live in would be rather difficult. Being used by major Linux distributions since long, apt works reliably, but it does show its age. There are known problems with the (dependency-)solver and there are even comments in the code pointing out the bloatedness and high level of complication of the class implementing the solver. One negative effect of this is in case of problems, apt sometimes prints rather mysterious messages that do not help getting an idea about the actual problem.

<strong>conary [rPath Linux]</strong>

Conary is an interesting concept (combining package management with version control), but it is aimed at the technically *very* inclined, only. Just reading all the different concept names and explanations made me shy away. The concept sounds rather complicated and (judging by the goals listed) the tool is pretty complicated to use, too.

<strong>[gobo-linux]</strong>

Gobo-Linux does not have an interesting package manager as such, but it implements a noteworthy concept for package installation: all packages are being installed into specific folders under /Programs. Sets of links in /bin and /Libraries point to the active versions of binaries and libraries in the respective package folders. More than a single version of a package can be installed and one of each is being made active by a 'Current' link pointing to it. Some actions, like upgrading or removing a package, require the use of a central tool ("Manager"), in order to adjust/cleanup those links.

<strong>nix [research project demonstrated in nixOS]</strong>

Nix declares itself as a "purely functional" package manager, which basically aims at ensuring that no package has side-effects on other packages. In the end this means that nix installs all packages separately (in folders of their own) underneath a folder (the nix store). Different versions, platforms and variants of a package can all be installed side-by-side, since they are all identified by the package name plus a hash value that represents the dependencies that were used during the build of the package (uncomfortably, nix choses to list the hash first, then the name).
Contrary to what is being stated on some sites, nix does not include the dependencies of each package in its folder. The XXXXXXXXXXXX-subversion-1.6.5 folder for instance only contains files that are part of the subversion build. All the dependencies (libneon, apr, ...) live in their own folders.
Again, link farms (this time in /var/current_system/sw IIRC) make sure that programs are found and can load their libraries. Nix is written in C++ and builds on Haiku.

<strong>pacman [ArchLinux, adopted by other small distros]</strong>

Implements simple management of binary packages around a ports-tree concept, albeit still following the usual setup of having repositories, packages and dependencies. Pacman does not have to pay regard to the many different detailed requirements the large Linux distributors have put into their respective package management system. As a result, pacman may not be quite as advanced as apt, yum and zypper, but on the other hand the implemented feature set is small and easy to grasp.
When I tried it with the current version of ArchLinux, I immediately managed to bork the package manager itself by interrupting a running update job (with Ctrl-C). That shouldn't of course happen and, AFAICS, turned out to have been a caused by a missing dependency declaration. Interestingly enough, it was pretty straightforward to get the system back into a working state, by looking at the package cache (a simple set of files) and unpacking the missing package(s) manually. What I learned from that is that, whatever package management system Haiku uses, providing manual access to the package database and all packages' contents can help a lot should anything fall out of shape ...
Pacman builds on Haiku without much effort.

<strong>pacman-g2 [frugalware]</strong>

This is a fork of pacman which is supposed to be better modularized. However, I haven't yet managed to see that in code, on the contrary, actually, since I wasn't able to build it yet (since it depends an old version of liblzma that isn't available on Haiku). Looking at the code and at it's repository, development seems nothing more active than the original pacman, which has a larger following, too.

<strong>pkg_add [OpenBSD]</strong>

My somewhat superficial impression: a simplistic package manager that tries hard to avoid situations where it has to leave a system in an inconsistent state. Written in Perl, i.e. depends on the Perl runtime environment being in a working state.

<strong>pkgtool [Slackware]</strong>

My very superficial impression: not really a package manager, but rather a package activator only. No dependency resolution at all, meaning that one has to fetch all required packages manually. 

<strong>smart [supported as alternative by several major Linux distros]</strong>

A replacement for yum & apt which incorporates an improved dependency solver that avoids several problems of the solvers that were used by yum & apt at the time smart was started (and I have found no notes about apt's and/or yum's solver having been improved since then). Written in Python, i.e. depends on the Python runtime environment being in a working state.

<strong>yum [RedHat & friends]</strong>

A proven package manager which has a couple of problems in its solver and is known to use considerably more memory than some other package managers (esp. zypper).
Written in Python, i.e. depends on the Python runtime environment being in a working state.

<strong>zero-install [I tested the RPM for openSUSE-11.1]</strong>

A decentralized package management system designed to allow unprivileged users to install packages from verified sources and share the installed programs with other users, too. Installation of user packages takes place in ~/.cache, where placeholders for available packages (interfaces) are kept as well as the downloaded, runnable packages (implementations). Interfaces are identified not just by name, but by full URL instead, but there's a way to create aliases for reduced typing. Implementations are identified by hashes only - one is forced to use one of zero-install's tools in order to determine which folder actually contains the files of a specific package).
When I tried it, the decentralized aspect of zero-install showed immediately in a bad way: I was unable to install subversion, as some of it's dependencies were gone from the server(s). I was able to see the principle of the tool, but have encountered several problems (including python backtraces) and while the concept seems clear, the implementation felt somewhat undesirable.
Written in Python, i.e. depends on the Python runtime environment being in a working state.

<strong>zypper [openSUSE, adopted by Ark Linux]</strong>

Zypper is based on a C++-library (libzypp) which has been written in 2005 to overcome the drawbacks of the then available tools (apt, yum, smart). The main idea behind libzypp is to let a SAT-solver find solutions to the dependency solving puzzle. The result is a reliable, very fast and memory-lean solver that is capable of giving suggestions on how to change impossible dependency requirements into ones that can be solved, making zypper a very comfortable and effective tool in case of dependency problems. However, zypper and libzypp heavily depend on RPM and other parts of the Linux infrastructure, porting them would be a major effort. The SAT-solver, however, can be built on Haiku easily.

<h1><strong>First conclusions</strong></h1>

<ul>
 <li>The package management system should become an integral part of Haiku (i.e. live in /boot/system) such that its features are available on all Haiku systems.</li>
 <li>Clearly, it is possible to support self-contained application packages (bundles) as well as unixy software with large dependencies, Mac OS X supports both, albeit the latter requires installation of the "foreign" Fink/macports tree(s). An actual integration of these two concepts seems best.</li>
 <li>The design of Haiku's package management system should make it possible to look at the packages and their data even if the package management system itself is broken. Maintaining the set of installed packages in specific, closed formats (e.g. RPM database) is a pain if something goes wrong, so it should be avoided.</li>
 <li>If the package manager is written in a scripting language, it follows that this scripting language (and all required modules) would have to become part of core Haiku, too. For me, that's a pretty strong argument against all package managers that depend on a scripting language.</li>
 <li>On major challenge for package managers is how to avoid leaving the system in an inconistent state, should the updating process ever fail or be interrupted. Most of them apply some kind of transactional system, but it is very difficult to determine the best set of transactions for that purpose. Atomic updates would be nice, but I don't think any of the mentioned package management systems actually implements that. Restoring the previous state of the system doesn't seem to be supported directly by those systems, either. Most docs I've read sooner or later refer to a rescue CD - it would be cool if we could skip that ... </li>
</ul>

Later today, I will post a first draft description of how Haiku's package management sytem could look like.