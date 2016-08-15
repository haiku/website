+++
type = "blog"
author = "bonefish"
title = "Package Management: The New Season Starts"
date = "2013-03-25T19:05:44.000Z"
tags = ["package management", "contract work"]
+++

<p>After quite some delay Oliver and I have finally started our contracts with Haiku, Inc. to continue our work on package management. Each of us will work 320 hours in total, i.e. the equivalent of 2 months of continuous full-time work.</p>
<!--break-->
<p>We probably won't quite work full-time, so it will take a little longer. One reason for that is that, due to delays on our customers side, we still haven't finished our previous contract. There're still a few things to do which depend on their feedback (bug fixing, documentation updates, etc.). But instead of further postponing the Haiku contracts we've decided it would be in everyone's best interest for us to start now and just pause (or reduce work hours) as needed.</p>

<p>Last Friday Oliver and I met up to discuss the state of things and how we intend to proceed. The run-time support for package management in Haiku (in the package management branch, of course) is in pretty good shape already. With the system itself and all the third-party software living in packages the system boots and is fully functional.</p>

<p>So first of all we're going to focus on the package building side of things. ATM all third-party packages are just repackaged versions of the ZIP files Haiku used before. Back in 2011 I started to extend haikuporter to produce actual packages instead of ZIP files and update the BEP files (build recipes) for some fundamental tools accordingly. My first task, now, is to continue updating BEP files until at least all the packages needed for building packages can be built this way. Then I will have enough packages to complete the work on libsolv and the dependency solving.</p>

<p>Oliver will start working on haikuporter itself and adjusting/rethinking the BEP file format. Since Haiku doesn't have (and probably won't have any time soon) a horde of developers continuously maintaining and testing all third-party software and their dependencies, we'll greatly benefit from borrowing important package meta information -- what dependencies packages have, what build features should be enabled/disabled, what bugs and quirks are to be considered, etc. -- from other, larger OSS projects. We (well, mostly Oliver) have checked out MacPorts, pkgsrc, Gentoo-Portage, and others for that reason and came to the conclusion that we can't copy any of those verbatim. E.g. because they lack resolvable declarations (instead only declaring dependencies between packages), because they include too many specifics for the respective OS/distribution, or both. Also, most of them provide a lot more features than we need for Haiku, resulting in more complicated build recipes. We also came to the conclusion that the Gentoo-Portage EBuild files allow the easiest extraction of the information we're interested in, since they are just shell scripts declaring variables and functions.</p>

<p>One thing we might change is to turn the BEP files into proper sourceable shell scripts -- we were surprised to notice they almost are, already -- and switch haikuporter from Python to shell and/or C++. ATM the tasks haikuporter performs -- parsing the bep files and executing commands -- benefit very little from being done in Python (turning BEP files into shell scripts, we even save the parsing completely). Python, however, is a complex dependency and removing it from the package building process might save us some trouble. Oliver will do some more research and work out a good solution.</p>

<p>Our first important common goal is a haikuporter that, given a package name, can automatically build this package and all its dependencies (the dependencies first, of course). Or consequently, given a list of package names, it can build a complete repository. After that we can work on the repository infrastructure, improve the run-time support (i.e. installing and removing packages), migrate the Haiku build system fully to package management (e.g. get needed packages from the correct repositories),...</p>

<p>Finally a few pointers for those who want to keep themselves informed:</p>
<ul>

<li><p><a href="http://github.com/olta/">Oliver's</a> and <a href="http://github.com/weinhold">my</a> GitHub repositories. The "Haiku" repository has a "pm-flat" branch (will probably be renamed eventually) which contains the latest PM version of Haiku. There are also the "buildtools" with a "package-management" branch matching the PM Haiku. The "libsolv" repository is a Haiku port of libsolv, the dependency solving library.</p></li>
<li><p><a href="http://ports.haiku-files.org/browser?order=name">The HaikuPorts repository</a> has modules "haikuporter" (the tool) and "haikuports" (the build recipes and patches), both featuring a "package-management" branch which reflects the current state of our work on those.</p></li>
<li><p><a href="https://dev.haiku-os.org/wiki/PackageManagement">The Haiku Trac Wiki</a> sports several PM related pages which we'll try to keep up-to-date and extend.</p></li>
</ul>