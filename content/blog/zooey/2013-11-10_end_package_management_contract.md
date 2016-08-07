+++
type = "blog"
author = "zooey"
title = "End of package management contract"
date = "2013-11-10T16:47:22.000Z"
tags = ["package management", "contract work"]
+++

From mid-June to early November, I have spent 320 more hours working on package management. After having worked on the bootstrap support in HaikuPorter (which Ingo has already mentioned in his blog entry), I have spent some time reworking the way how Perl and Pythong organize their modules: Scripting languages with module support usually expect to be able to build modules from source and install them somewhere into the hierarchy of the scripting language. In our case, they can no longer just put the built (site-specific) modules into the "standard" folder, as that one is read-only. So the configuration of Perl and Python had to be changed, such that modules built from source are being installed correctly into a writable folder (in the non-packaged hierarchy). Perl already supports the notion of a vendor-modules folder, where packaged Perl modules will be installed (an example of such a beast are the perl modules contained in the git package). That idea has been extended to Python (such that it will automatically pick up the python modules provided by the mercurial package). Separating packaged modules from local (built from source) modules is an idea that should be followed by all (not only scripting) languages ported to Haiku.
The updated perl, python, git, mercurial and scons packages that are the result from that work have not yet been published, but I will do that during the next couple of days.

The package management branches of both haikuporter and haikuports have been merged into the respective master, i.e. all porting work done in there will produce packages. Several new 'testing-<arch>' branches will be added to the haikuports repository soon in order to be able to separate work on the bleeding edge from the work that tries to stabilize a given set of packages for a release.

Finally, I have started with work on the infrastructure required for automatic building of repositories and (at a later stage) packages. The first effect of this is that whenever a developer changes the version of a package used by Haiku's build system, the respective repository will be created automatically. Those repositories are being published to http://packages.haiku-os.org/haikuports/master, from where pkgman will download packages.

Summarizing those months of work: I think we have managed to put most of the work behind us, but we haven't reached the goal just yet. There's still more work to do and I personally will return to continuing that work in my spare time.