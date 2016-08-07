+++
type = "blog"
author = "nielx"
title = "Git for Haiku (#1)"
date = "2008-04-21T14:25:12.000Z"
tags = ["development", "git", "port"]
+++

<p>I would like to announce the availability of the git revision control system. The <a href="http://git.or.cz/">git website</a> describes it as:</p>

<blockquote>
Git is an open source version control system designed to handle very large projects with speed and efficiency, but just as well suited for small personal repositories; it is especially popular in the open source community, serving as a development platform for projects like the Linux Kernel, WINE or X.org.

Git falls in the category of distributed source code management tools, similar to e.g. Mercurial or Bazaar. Every Git working directory is a full-fledged repository with complete history and full revision tracking capabilities, not dependent on network access or a central server. Still, Git stays extremely fast and space efficient.
</blockquote>

<p>This document describes how to install the git binary, and how to get the source.</p>

<!--break-->

<h3>Installing the binary distribution</h3>

<p>The <a href="http://www.haikuware.com/view-details/development/miscellaneous/git">most recent binary distribution</a> is hosted by <a href="http://www.haikuware.com">Haikuware,</a> thanks! Have a look at the overview page to see the requirements, especially check if you installed Haiku revision matches the required revision.</p>

<p>After you fetched the binary, you can install it by entering the following commands in the Terminal:</p>

<pre>
cd /boot/
tar xvfj <i>path-to-download</i>
</pre>

<p>Git should then be installed.</p>

<h3>About the Git Port</h3>

<p>I attempted a port of Git to Haiku for several reasons, one of them being that I wanted to do some work on <a href="http://cairographics.org/">Cairo</a> which uses git for revision control. The actual porting was not too bad. Git heavily relies on the POSIX standard, and a lot of it is implemented on Haiku. The only issues were finding out where Haiku fails. At the same time I was investigating the port, James Woodcock was also working on git. He filed some bug reports on Haiku issues that needed to be fixed. So it is a team effort.</p>

<p>There are two types of changes needed to build git. The first type consists of the hacks that are needed to work around flaws and limitations in Haiku's interfaces. There are currently four commits of this type. The other type are additions that should eventually be contributed back to the git repository. The most prevalent one is an update to the build system for systems dat only support symbolic links and not hard links.</p>

<p>Currently, there is a repository that you can check out with git. It is located at <code>git://ksctrre.speed.planet.nl/git/git.haiku</code>. It has two branches. The <code>master</code> branch contains a currently a recent clone of the git repository. It will contain the patches that should be contributed back to the git project. It currently will not build on Haiku without some manual tweaking. The second one is the <code>hack</code> branch, which should work on Haiku. It will be kept up to date to whatever improvements are made to Haiku. Eventually this branch should be deprecated.</p>

<h3>Getting and Building the Source</h3>

<p>After installing the binaries, you can get and update the source from the repository. To build the source, you need Haiku's development tools, including perl. You can add them when you are building Haiku. Look at the section on the development tools in the <a href="http://www.haiku-os.org/blog/nielx/2008-03-31/haiku_alpha_1_status_update_2">second alpha newsletter.</a></p>

<pre>
# to get the 'hack' branch
git clone git://ksctrre.speed.planet.nl/git/git.haiku hack

# and to keep it up to date
git pull
</pre>

<p>To build the source you should perform the following steps:</p>

<pre>
# create the configure script
autoconf

# run configure
./configure --prefix=/boot/home/config
</pre>

<p>The configure script autodetects almost everything, but to the <code>config.mak.autogen</code> file you should add:</p>

<pre>
NO_TCLTK=YesPlease
PERL_PATH=/boot/home/config/bin/perl
</pre>

<p>Then you can build the source using the regular commands.</p>

<p>If you would like to submit patches to the Haiku port, please send me an email.</p>