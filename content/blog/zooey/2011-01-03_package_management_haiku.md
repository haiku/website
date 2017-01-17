+++
type = "blog"
author = "zooey"
title = "Package Management for Haiku"
date = "2011-01-03T18:49:43.000Z"
tags = ["package management", "contract work"]
+++

<em>"Make everything as simple as possible, but not simpler."</em>

Starting my month of paid Haiku-work today, I was quite astonished to see the many emotional comments that have been added to the announcement. Clearly, the topic seems to be one of heavy likes and dislikes ...

Having read all those comments and most of the discussions we had earlier (on the wiki and on the mailing lists), I felt the need to start my blog with the quote given above - as, for me, that pretty much summarizes what there is to say about package management ...
<!--more-->
<h1><strong>Package Management - what is it?</strong></h1>

Basically, package management is the means to tame and control that flee circus of all the different software components that make up your running system. Without any package management, each computer user would have to maintain those software components yourself, which after some time pretty much unavoidably leads to a more or less inconsistent (if not completely borked) system. In order to circumvent this, most OSes these days incorporate some kind of package management. Most Linux distributions come with pretty elaborate package managers, the BSDs have their ports tree, which is just another (albeit a bit simpler) way of managing packages. OSX pretends to do without package management only to rely on fink (plus others) to provide support for managing packages through the backdoor. With all those modern mobile OSes managing their software through a 'market' application, that pretty much leaves Windows as the lonely OS without package management (unless you consider Windows updates just that). But even on windows, many applications have chosen to implement an update service all by themselves, in effect providing a (rather crude) form of package management.

<h1><strong>The parts of a package management system</strong></h1>

Here's a list of the components that usually make up a package management system:

<h2>PACKAGE BUILD RECIPE (examples: .bep, control, .spec) </h2>
One or more files containing info about a specific package that describe how to to create a binary package from the sources. A recipe contains info about the dependencies the software has and which files (programs, libraries, data files) should be put where during installation.

<h2>PACKAGE BUILDER (examples: apt-build, haikuporter, rpmbuild)</h2>
A program used for building a specific package from its source, carefully following the actions defined in the recipe in order to convert the sources into a binary package.

<h2>PACKAGE FILE (examples: .deb, .ebuild, .hpkg, .pkg.tar.xz, .rpm)</h2>
A file type and data format that contains all the files and meta information that make up a specific binary software package.

<h2>PACKAGE ACTIVATOR (examples: dpkg, rpm, pkg_add, Haiku's package-fs)</h2>
A program that can activate/deactivate one or more packages (activation may involve actual installation of files, but not necessarily so). Keeps track of which packages have been activated.

<h2>REPOSITORY</h2>
A place where to store info about the available packages, usually along with the packages themselves, too. 

<h2>PACKAGE MANAGER (examples: apt, emerge, pacman, smart, yum, zypper)</h2>
The heart of it all - a program which reads one or more given repositories (usually over network) and can be asked to download and activate available packages. It will automatically resolve any dependencies those packages may have on other packages. Additionally, the package manager can update packages and even complete systems.

These days, it is common to only ever communicate with the package management system through the GUI of the package manager - all the other components need not be visible to a user at all (depending on the involvement the user wants to have with system administration and/or development).

<h1><strong>So why do some people hate package management that much?</strong></h1>

Honestly, I don't really know - I'm using package management nearly on a daily basis (e.g. during my administrative work on the Haiku infrastructure). Without a package management system helping me out, many of my everyday tasks would be much more complicated and error-prone.

I reckon most of the agitation around package management stems from the fact that package management is a complicated matter. One can try hard to hide this fact, but in the end, it will always show through that some hard work has to be done behind the scenes (usually by the people packaging the software). People wish it were simpler and complain loudly, pointing at solutions that most of the time just hide the problems instead of solving them.

Of course, several earlier implementations of package management were really a PITA, I remember having to hunt for RPMs on the net that were dependencies of some other program I just wanted to try out. Doing that once can be frustrating already, but having to do it repeatedly made me want to wipe the dust of my C64 ...

But today, package management usually is unobtrusive and just works. However, I am still seing problems here and there, which I would like to avoid on Haiku, of course.

<h1><strong>Requirements for each component</strong></h1>

In order to get a baseline for my research work on the existing implementations, I thought it'd be a good idea to start with a list of requirements for all the individual components. I am then going to look at each implementation and determine just how well it fits Haiku's needs. 

I am pretty sure I am going to miss a few requirements here, so please comment if you think anything is missing!

<h2>PACKAGE BUILD RECIPE</h2>
<ul>
 <li>preferably contains info about from where to download the sources from</li>
 <li>specifies which patches to apply</li>
 <li>contains several basic attributes of the software (name, version, description, homepage, supported target platforms, ...)</li>
 <li>specifies the build options and build script</li>
 <li>specifies the dependencies of this software for several stages/scopes (build, install, test, ...)</li>
 <li>specifies the set of resolvables that the resulting package provides (which may depend on the build options given)</li>
 <li>supports giving different info for some target platforms (x86-gcc2 vs. ppc)</li>
 <li>contains info about the licenses applicable to the software</li>
</ul>- 

<h2>PACKAGE BUILDER</h2>
<ul>
 <li>uses a recipe to create a binary package for a given target platform</li>
 <li>sets up a chroot()-like environment for each build, containing only the software's build-dependencies</li>
 <li>enters the chroot()-env for the build in order to reduce the risk of the build process "picking up" installed software, which would create unintended (and untracked!) dependencies.</li>
 <li>must support signing the resulting package with a given GPG-key</li>
 <li>nice-to-have: support a mode for automatically invoking the test suite of the software and checking the result with expectations</li>
 <li>nice-to-have: provides a helper program to convert any buildable software into a package file (by means of a trivial recipe or without any recipe whatsoever) - the resulting "faked" package can then be activated and will take part in dependency resolution</li>
</ul>

<h2>PACKAGE FILE</h2>
<ul>
 <li>a single file containing all the info required for installing (i.e. activating the software contained in) the package</li>
 <li>must support signatures with one or more GPG-keys</li>
 <li>contains hashes for all files contained in the package in order to be able to validate installed files againts the original package contents</li>
 <li>should be perfectly tailored for the requirements of the package activator, i.e. the activator dictates the format, not the builder</li>
</ul>

<h2>PACKAGE ACTIVATOR</h2><ul>
 <li></li>
 <li>show list of installed packages</li>
 <li>install/update packags</li>
 <li>remove/purge packages (remove keeps config files, purge deletes those, too)</li>
 <li>verify packages against status quo</li>
 <li>activate packages system-wide or per-user</li>
 <li>nice-to-have: support installation of multiple versions of a package on the same level (system or user) - this probably needs to be supported by the individual packages in order to work</li>
 <li>nice-to-have: automatically make backups of config files before package update</li>
 <li>nice-to-have: show list of config files for a package (and allow to backup/restore/purge them)</li>
</ul>

<h2>REPOSITORY DETAILS</h2>
<ul>
 <li>has name, description and URL</li>
 <li>a repository must provide concise info about the packages it contains and their dependencies</li>
 <li>provides a (GPG-)key used for signing all the packages in the repo</li>
 <li>should preferably be accessible by a web-browser</li>
 <li>there may be a correlated website, which offers additional services on top of the technical requirements, e.g. screenshots, reviews, user comments, etc.</li>
</ul>

<h2>PACKAGE MANAGER DETAILS</h2>
<ul>
 <li>maintains (add, list, remove) a set of prioritised repositories (including user-defined repos)</li>
 <li>show list of files contained in package</li>
 <li>show the package owning a specific file</li>
 <li>show all attributes (origin, version, release, resolvables, dependencies) of    all packages</li>
 <li>supports all actions of the package activator, with additional dependency resolving</li>
 <li>supports activation of local packages (that were created locally or downloaded by some other means) with full dependency resolution</li>
 <li>always computes all required actions and shows them to user before applying them</li>
 <li>can search for packages with given attributes (name, resolvables)</li>
 <li>can verify validity of whole dependency tree and offer actions to solve any problems</li>
 <li>automatic update interval for repository information can be configured and switched off</li>
 <li>supports listing and getting rid of dependency-only packages (which were being activated only as dependencies of some other package)</li>
 <li>supports system updates (nice-to-have: actively, by offering to switch to a new release)</li>
 <li>nice-to-have: supports limiting actions to a specific repository</li>
 <li>nice-to-have: supports packet "pinning", i.e. specifying restrictions for specific packages with respect to their origin, release or version</li>
</ul>

<h1><strong>Which implementations to look at?</strong></h1>

I have currently planned to look at the following package managers (and their associated repository format[s]) in detail:

<ul>
 <li>apt (with dpkg and rpm backends)</li>
 <li>pacman</li>
 <li>smart (support for many package formats)</li>
 <li>yum (supports rpm only, AFAICS)</li>
 <li>zypper (supports rpm only, AFAICS)</li>
</ul>

Additionally, I'll inspect at least these package formats and package activators:

<ul>
 <li>dpkg/deb</li>
 <li>hpkg/package-FS</li>
 <li>rpm</li>
</ul>

Finally, I will spend some time with the different package build infrastructures, especially the ones used by Debian (apt-build), openSUSE (rpmbuild) and Arch Linux (pacman).

The special focus during these investigations will be on how easily each of those tools could be adjusted to work on/for Haiku - after all, many of these tools have been designed for a specific Linux distribution, which Haiku simply isn't (and doesn't want to be). On the other hand, I really hope that at least one of the package managers proves to cater for most of our needs, as writing one from scratch would be a *lot* of work.

<strong>Please do not hesitate to send your ideas my way ...</strong>