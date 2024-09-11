+++
type = "blog"
author = "mmadia"
title = "Further improvements to package management and related technologies"
date = "2014-02-23T00:07:27.000Z"
tags = ["package management"]
+++

<p>
Since the package management feature branch was merged into HAIKU's
master repository, numerous issues were uncovered. As with any large
feature, an influx of regressions and other issues should always be expected.
Most of the issues revolved around not being able to install or even
run certain software, which for an operating system is a big deal.
Luckily, with any actively developed software such as Haiku, bug fixes
continue to happen. This article will go into some of those issues, what
has been done to fix them, and what other improvements are in the pipeline.
</p>

<!--more-->

<p>
There were several factors that led to some software not being able to be installed.
They included a minimally functional PackageInstaller (for installing BeOS Software Valet packages),
directory layout changes, and making other folders read-only.
</p>
<p>
To handle the installation of BeOS Software Valet packages, Haiku has PackageInstaller.
For a long time this application was neglected. To begin with, it never even worked properly for some software packages.
(As an example, the only way to get Gobe Productive installed was to manually copy it from a BeOS installation.)
However, over the past few days Stephan Aßmus (with initial help from Puck Meerburg) has been <a href="https://cgit.haiku-os.org/haiku/log/src/apps/packageinstaller">working on PackageInstaller</a>.
This work centered around dynamically replacing the destination folders with the appropriate Haiku equivalents.
It can now install Gobe Productive 2.0 (Trial) and reports from IRC mention many other packages working properly!
</p>
<p>
Another factor that prevented older software from installing and running were changes to the directory layout.
The directory /boot/common was removed, or more correctly it has been merged into /boot/system [<a href="https://dev.haiku-os.org/wiki/PackageManagement/DirectoryStructure">1</a>].
</p>
{{< alert-info ""
`This directory was physically added in Haiku (in BeOS, it existed only as the B_COMMON_*_DIRECTORY file mappings).
It was originally planned to help ensure /boot/system (B_SYSTEM_DIRECTORY) would only contain the essentials needed by Haiku.
Everything else would be in /boot/common (B_COMMON_DIRECTORY) or in /boot/home (B_USER_DIRECTORY).
Unfortunately this never worked out as planned.
One of the contributing factors was that more and more software moved out of Haiku's repository and become 3rd party packages.`>}}
<p>
Removing /boot/common simplified some things, such as package dependencies between software provided by Haiku (e.g., git)
and user-installed pacakges (e.g., git_svn). [<a href="https://www.freelists.org/post/haiku-development/Removing-bootcommon">1</a>]
</p>
<p>
The changes involving /boot/common mostly affected software built for Haiku R1 pre-beta.
Any software that hard coded paths to it (either as a zip that extracts to boot or explicitly uses /boot/common/...) broke.
Using hard coded paths is always ill-advised.
Those applications need to be updated to rely upon FindDirectory or to be <a href="/guides/daily-tasks/install-applications">re-organized as an HPKG</a>.
Applications that used the FindDirectory C/C++ function calls to determine the paths continued to work.
Though for a brief time, software that used the shell command `finddir` to locate the B_COMMON_*_DIRECTORY was unintentionally broken.
This has since been fixed by modifying the finddir shell command to redirect B_COMMON_*_DIRECTORY to their system non-packaged directory counterparts.
</p>
<p>
Several folders were changed to a read-only status, so as to contain the "expanded" HPKG file contents.
This cleanly separates (and identifies) which files are provided by HPKGs and ones that are not.
The complexities of implementing and actually using a UnionFS 
(which merges package-provided files with non-package-provided files in a single directory)
are mind boggling. To reduce the problems to the simplest terms, it becomes increasingly difficult to manage when 
real files are overlayed on top of package-provided files. For instance, which takes priority? What happens if a user tries to delete a (package-provided) file? 
While this can take some getting used to, having read-only folders is the sanest (and safest) approach to having real files exist alongside package-provided files.
</p>
<p>
One complaint was the inability to remove package files (such as conflicting drivers from haiku*.hpkg).
The <a href="/guides/daily-tasks/blacklist-packages">ability to blacklist entries in packages</a> was introduced to resolve this.

While this is more involved than simply deleting a driver, it has the added bonus of allowing you to easily revert the modifications.
Perhaps in the future, an application could be made that would streamline the process and remove the need to edit a text file.
Possibly an HPKG utility that would allow individual files to be marked as such (as well as other features as viewing the HPKGs contents as if it were already mounted).
</p>
<p>
For anyone developing on Haiku, they may have realized that setgcc was removed.
The setgcc command was a method for switching the compiler from GCC 2 to GCC 4 and vice versa.
However, it was crudely implemented, as "it changed on disk structures to switch the compiler, which means that you couldn't use setgcc in one shell while already having a build running in another." [<a href="https://dev.haiku-os.org/ticket/10014#comment:1">1</a>]
The initial idea was to simply call the appropriate compiler.
Though this too had confusion, as `gcc` was the host native gcc command.
This has been resolved with the introduction of a new shell command, `setarch` (and supports running toolchains for other architectures such as ARM).
Unlike setgcc, setarch modifies only the current command shell, which allows you to run compilation tasks for different architectures at the same time.
</p>
<p>
Another complaint is the inability (or rather difficulty) to modify Deskbar. Haiku now utilizes automatic Deskbar management.
Basically, HPKGs can specify which symlinks should be added to Deskbar and where.
People are still able to add their own links in the usual place, /boot/home/config/settings/deskbar/menu (B_USER_DESKBAR_DIRECTORY).
If desired, it is possible to disable the automatically created links. In the B_USER_DESKBAR_DIRECTORY, create a symlink named "menu_entries" that points to "menu".
Then manually populate "menu" however you desire. To note, this entire feature is still being implemented. For more information on how the implementation will most likely work, see <a href="https://dev.haiku-os.org/ticket/10557#comment:5">Ingo's comment on ticket #10557</a>
</p>
<p>
Being able to easily discover, view, and (un)install HPKGs files is another concern.
HaikuDepot has been created to manage this from within Haiku. It is functional, but not feature complete.
For a web-centric approach, haiku-depot-web is being implemented.
They already have a <a href="https://depot.haiku-os.org">running test installation</a> and could use feedback on the <a href="https://www.freelists.org/list/haiku-depot-web">[haiku-depot-web] mailing list</a>.
</p>
<p>
These are just some of the issues that have been resolved. Undoubtedly there are more. This is where we need you, yes YOU!
Use a nightly image and give it a run around the block. Once something breaks or even feels a bit odd, file a bug report on dev.haiku-os.org
That is the only way that issues can reliably be tracked, organized and eventually resolved.
</p>
<p>
Some issues are still waiting to be resolved.
They include having a utility program to handle double-clicking HPKG files. Currently Expander opens, which has limited usefulness.
The ability to update Haiku from within Haiku sort of works, but a formalized process has yet to be ironed out.
Being able to easily add additional software repositories, let alone for users to upload files to a repository needs to be addressed.
But again, Haiku keeps moving forward into the future, one commit at a time.
</p>
