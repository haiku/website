+++
type = "article"
title = "Get the Haiku Source Code / Pushing Patches to Haiku 101"
date = "2011-06-13T16:07:27.000Z"
tags = []
+++

 <!-- NOTE: This article should be eventually split in two parts. -->

<span class="right"><img src='/images/archive_64.png'></span>

Haiku's source code is currently being hosted on a
<a href="http://git-scm.com/" target="_blank">Git-based repository</a> using <a href="https://gerritcodereview.com" target="_blank">Gerrit</a>.

If you are already familiar with the pull request workflow as used, for example, on GitHub, you
can find an overview of the differences in <a href="https://gerrit-review.googlesource.com/Documentation/intro-gerrit-walkthrough-github.html" target="_blank">Gerrit user's manual</a>.

Anonymous access will allow anyone to download Haiku's source code; However,
the authenticated (non-anonymous) method is required for submitting patches.

<a name="anon_access"></a>
<h3>Git Access - Anonymous testers</h3>

<div class="alert alert-warning">
<strong>Anonymous access is read-only.</strong> If you want to submit changes to
Haiku, you need to follow the instructions for patch submitters in the next
section.
</div>

<div class="alert alert-info">
<strong>The buildtools repository is not needed when building from within 32-bit Haiku</strong>.
In that version, the tools required to build Haiku are included by default.
</div>

<h4>Build Tools:</h4>

```sh
git clone https://review.haiku-os.org/buildtools
```

<h4>Haiku:</h4>

```sh
git clone https://review.haiku-os.org/haiku
```

If you don't care about the commit history and want to limit the download size,
use the parameter `--depth` when cloning. For example, `--depth 10` limits the
history to the last 10 commits.

<h4>GitHub</h4>

If your Internet provider limits the websites you are allowed to use, you can use
our mirror repositories <a href="https://github.com/haiku/haiku" target="_blank">on GitHub</a>
instead.

They are kept in sync with our main repository, however, these repositories do
not have any Git tags, which the compiler uses to determine the revision of
Haiku. To work around this limitation, you can use the
<a href="https://cgit.haiku-os.org/haiku/tree/build/jam/UserBuildConfig.ReadMe" target="_blank">HAIKU_REVISION build variable</a>
when building Haiku.

The commands for cloning the repositories from GitHub are:

<h4>Build Tools:</h4>

```sh
git clone http://github.com/haiku/buildtools.git
```

<h4>Haiku:</h4>

```sh
git clone http://github.com/haiku/haiku.git
```

<a name="dev_access"></a>
<h3>Git Access - Contributors and patch submitters</h3>

So, you want to contribute to Haiku. That's awesome, thank you for your
interest! This section will include instructions for setting up your local Git
environment, an account on our Gerrit instance, as well as some guidelines on
how to work with other contributors to get your changes included. This guide
assumes that you are new to contributing to open-source projects. If that
is not the case, you can skip some of the sections.

<h4>A visual overview of our Git workflow</h4>
<img src='/files/gitProcess_0.png' alt='A diagram describing the way our Git workflow works. This picture is there for aesthetic purposes and can be skipped. After a repository is cloned locally, if you have an idea, you can convert that idea into a commit using food (a pizza is depicted in the diagram). That commit will receive some change proposals, which will result in some further changes. The circle continues until the change is ready to be included in Haiku itself.'>

<h4>Configuring Git locally<a name="configure_env"></a></h4>

<div class="alert alert-danger">
<strong>This section is important!</strong> Failing to configure Git properly before a commit will result in an incorrect name being used in your commit, making it impossible to give you well-deserved credit for your work.</div>

A global Git configuration is stored in Git configuration directory (`~/.git/` or for Haiku: `~/config/settings/git/`) and will be included in <strong>every</strong> commit.

```sh
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

Although most contributors tend to disclose their real names, we do not have
a real name policy and plenty of contributors contribute to Haiku using a pseudonym.
You are not required to use your "real" name, a pseudonym is fine and several Haiku contributors chose to do that. However, make sure the e-mail address is correct and working, it is what we will use if we need to contact you later.

On macOS, you must set the following option in order to avoid problems with the
unicode representation of filenames:

```sh
git config core.precomposeunicode true
```

<h4>Setup an account on Gerrit</h4>

<p>Log in to <a href="https://review.haiku-os.org" target="_blank">Gerrit code review</a>. For the time being, using a <a href="https://github.com">GitHub account</a> is necessary.</p>

<div class="alert alert-warning">
Make sure your SSH key is generated using <code class="code">ed25519</code>. RSA keys will <strong>not</strong> work with Gerrit.
</div>

<p>Upload your SSH public key in the <a href="https://review.haiku-os.org/settings/#SSHKeys" target="_blank">Gerrit SSH Keys settings</a> page. If you don't have a key yet, you can generate one using ssh-keygen.</p>

<h4>Cloning repositories from Gerrit</h4>

<p>If the email address used in your commits does not match the one in your Github account, you will need to add and verify it in <a href="https://review.haiku-os.org/settings/#EmailAddresses" target="_blank">Gerrit email address settings</a>.</p>

<div class="alert alert-warning">
You may need to replace the <code class="varname">$USER</code> parameter in the following commands.
</div>
<p>This can happen if the username on your Gerrit account does not match the username that you use to log in to your computer. This would be the case in Haiku itself, as the default username is <code class="code">user</code>.</p>
<p><code class="varname">$USER</code> is an environment variable that is specific to Unix-like operating systems (e.g. Haiku, Linux, FreeBSD, etc.). If your system does not fall under that category, you will probably have to replace it.</p>

<h4>Build Tools:</h4>

```sh
git clone "ssh://$USER@git.haiku-os.org/buildtools" && scp -p $USER@git.haiku-os.org:hooks/commit-msg "buildtools/.git/hooks/"
```

<h4>Haiku:</h4>

```sh
git clone "ssh://$USER@git.haiku-os.org/haiku" && scp -p $USER@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
```

<h4>Preparing your first patch</h4>

Before making a commit, install a Git hook that will automatically
<a href="https://review.haiku-os.org/Documentation/user-changeid.html" target="_blank">generate Change-Id's</a>
for you:

```sh
scp -p $USER@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
```

If a maintainer asks you to correct something later on, Gerrit will use that
Change-Id to keep track of your newest changes.

<div class="alert alert-warning">
You should review our
<a href="https://www.haiku-os.org/development/coding-guidelines/" target="_blank">Coding Guidelines</a>
before making a commit and submitting a change.
</div>

If you wish to change something in your commit, you can amend it in retrospect
making them using <span class="cli">git add .</span> and <span class="cli">git commit --amend</span>.

<h4>Case Sensitive Filesystems</h4>

<div class="alert alert-warning">
Haiku's source code needs to reside on a case sensitive file system.
</div>

In short, such a file system recognizes ThisIsAFile.txt and THISISAFILE.txt as
two different files. Some file systems that are (or could be) case insensitive
include FAT32, NTFS, and HFS+.

macOS's HFS+ is also case insensitive by
default, but that can be changed: See
<a href="/documents/dev/how_build_haiku_mac_os_x#part_diskimage" target="_blank">this article</a>
for more information.


<h3>Commit Message Standards</h3>

<h4>Making a new commit</h4>

In Git, you make commits to your local tree, then push the final results to the
central remote Haiku repository. Split your work in commits that are
not too large commits, but remember that each commit will be reviewed
separately, so don't make them too small either.

The commit message will also be reviewed, and should describe the change in
as much detail as possible. You can refer to other commits by either their hrev
tag or their SHA1 hash, and to bugs using the #number notation. Gerrit and cgit
will then automatically add an hyperlink to the relevant place.

The commit message should include a short description on the first line (ideally
less than 64 characters), then a blank line, and a more detailed explanation.
The short message is visible in "git log", the web interface, and many other git
tools, and allows to know what the commit is about. The details are available
separately (for example in git log -p or when looking at the commit directly in
the web interface), so they are both important.

Here is an example of a good commit message:

```
kernel: Perform the usual early morning tasks

* Ensure cats are fed.
* Clean up white space.
* Adjust retroencabulator to accept input from multiple sources of data
  and ensure the buffer is free for shenanigans.
```

<h4>Short commit messages</h4>

If your commit is very short, you can include it directly on the Git command line:

```sh
git commit -a -m "WebPositive: Style cleanup, no functional change"
```

<h4>Long commit messages</h4>

If you want to make a longer commit message, you can put it in a file and use it this way:

```sh
git commit -a -F ~/mycommitlog
```

Alternatively, you can use "git commit -a", which will open a text editor and
let you write down the message when you commit your changes.

It may be a good idea to check <a href="https://review.haiku-os.org" target="_blank">Gerrit</a>
as a point of reference if you are not sure how you should format your
commit message.

<h4>Amending commits</h4>

Commit messages, as well as the contents of a commit itself, can be corrected
using <span class="cli">git commit --amend</span>.

<h3>Common tasks</h3>

<h4>Updating the source code</h4>

This section assumes that you are actively working on new commits and need to
test them on a newer revision of the source code.

<div class="alert alert-danger">
When using <span class="cli">git pull</span>, use the
<span class="cli">--rebase</span> argument while doing a pull prior to a push
to avoid confusing non-linear histories! (<span class=cli>"Merge 'master' on
ssh://git.haiku-os.org/haiku"</span> messages showing your name and changes
that are not related to yours)

Do <strong>NOT</strong> use <span class="cli">--rebase</span> on branches you
have shared with other people! (rebase re-writes the local history. If your
local history doesn't match people who cloned off of you, and they want to push
to you, they will have <strong>major</strong> problems.)
</div>

You can make Git take care of this automatically for you, so that
<span class="cli">git pull</span> does the right thing for Haiku:

```sh
cd haiku
git config pull.rebase true
```

Alternatively, a single path or multiple paths can be given to
<span class="cli">git pull</span>. This will allow you to run the following
command from any directory. This becomes extremely useful if you use an
<a href="/guides/building/configure/different-generated" target="_blank">external object directory</a>
or if you wish to update both the buildtools and haiku directories at the same
time.

```sh
git pull --rebase ./haiku ./buildtools
```

<h4>Pushing changes for review</h4>

Assuming that your local repository's remote URL points to Gerrit and that you
have configured your environment as previously described in this document,
this should work:

```sh
git push origin HEAD:refs/for/master -o topic="something"
```

After your changes are complete, the push command will push your local tree
to the remote Haiku repository. The commits will be added to the
<a href="https://review.haiku-os.org" target="_blank">review page</a> and
people will review them. You can then amend your commits and push them again,
until they are reviewed and merged.

It is recommended to set a topic - a single keyword that can easily be searched
for in the web interface and help categorize commits.

<h5>GitHub</h5>

<div class="alert alert-danger">
<strong>Do not send pull requests using GitHub!</strong> Pull requests for the
Haiku operating system using GitHub cannot be accepted for technical reasons.
However, this may not be the case with some other repositories.
</div>

To submit a patch, you can change the remote URL of the Haiku repository to
Gerrit using this command:

```sh
git remote set-url origin ssh://$USER@git.haiku-os.org/haiku
```

<h4>Assessing review comments and updating a commit</h4>

Usually, your changes will not be accepted on the first try. Other developers
will review it, making sure they understand what you are doing, and maybe
help you find better ways of doing it. They will also check that your code
follows the <a href="https://www.haiku-os.org/development/coding-guidelines/">coding guidelines</a>,
which are important to make sure the code is easy to read and uses the same
conventions that other contributors use as well.

<h5>Single-commit change</h5>

To update an existing commit, you need to download it locally, modify it,
and send it again. When your change consists of a single commit, you can
cherry-pick it.

First make sure you start from a clean working tree with the latest Haiku changes
(note that this will remove all your *work-in-progress* commits from the working
copy - make sure these commits are in a branch. Git will remind you about this
if you haven't done so).

```sh
git fetch
git checkout origin/master
```

Then you can download your commit from Gerrit. To do this, use the Gerrit
web interface and the Download -&gt; Cherry Pick button, which allows you to
copy the required git command. It looks like this, but it is different for
each commit and each version of a commit so make sure to get the correct one
from Gerrit:

```sh
git fetch "ssh://user@git.haiku-os.org/haiku" refs/changes/28/3228/4 && git cherry-pick FETCH_HEAD
```

You can now edit the files to make the needed changes. Once you are done, edit
the commit to include your changes:

```sh
git add a/modified/file.cpp another/modified/file.h # you can use wildcards, or just 'git add .' to add everything modified
git commit --amend # modify the commit
```

Make sure the commit message contains the change-id for the commit. If it doesn't,
copy it from Gerrit and add it at the end of the commit message.

Finally, send your work for review:

```sh
git push origin HEAD:refs/for/master
```

`HEAD:refs/for/master` means that your change was built on top of the master
branch and that your changes are meant to be applied to the master branch.

<h5>Multiple-commit change</h5>

The process is similar when your change is split into multiple commits, but
you can't as easily use cherry-pick since it would have to be done once per
commit. So, a different process can be used instead.

First of all make sure you have the latest version of the Haiku source code:

```sh
git fetch
```

Then go to the latest commit of your change in progress and use the
Download -&gt; Checkout menu to get all the changes at once. Again, note that
the command changes for each commit, so be sure to get the correct one from
Gerrit. The one below is only an example.

```sh
git fetch "ssh://user@git.haiku-os.org/haiku" refs/changes/99/1299/5 && git checkout FETCH_HEAD
```

You can then rebase your changes on the current version of Haiku:

```sh
git rebase origin/master
```

You can use git commit --amend to edit the latest commits and add more commits
to the branch. To modify the previous commits, you need to use git interactive
rebase (git rebase -i). See <pre>git help rebase</pre> for more help on rebasing.

Once you are done, you can update the patches that you have previously
submitted for review:

```sh
git push origin HEAD:refs/for/master
```

### Read more:

- [dev.haiku-os.org - Submitting Patches](https://dev.haiku-os.org/wiki/CodingGuidelines/SubmittingPatches)
- [Gerrit Code Review - Uploading Changes](https://review.haiku-os.org/Documentation/user-upload.html)
