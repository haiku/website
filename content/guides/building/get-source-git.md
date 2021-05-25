+++
type = "article"
title = "Getting the source code"
date = "2011-06-13T16:07:27.000Z"
tags = []
+++

<span class="right"><img src='/images/archive_64.png'></span>

Haiku's source code is currently being hosted in a <a href="http://git-scm.com/" target="_blank">Git based repository</a> with <a href="https://gerritcodereview.com">Gerrit code review</a>.
Anonymous access will allow anyone to download Haiku's source code; However, the authenticated (non-anonymous) method is required for submitting patches.

Although most contributors tend to disclose their real names, we do not currently have a real name policy and
a couple of contributors contribute to Haiku pseudonymously. That means that it's possible for anyone to contribute.

<div class="alert alert-warning">
<strong>The buildtools are not needed when building from within 32-bit Haiku</strong>. Pre-built images of 32-bit Haiku already come with suitable buildtools pre-installed.
</div>

<a name="anon_access"></a>
<h3>Git Access - Anonymous testers</h3>

<div class="alert alert-warning">
<strong>Anonymous access is read-only.</strong> If you want to submit changes to
Haiku, you need to follow the instructions for patch submitters, in the next
section.
</div>

<h4>Build Tools:</h4>

```sh
git clone https://review.haiku-os.org/buildtools
```

<h4>Haiku:</h4>

```sh
git clone https://review.haiku-os.org/haiku
```

If you don't care about the commit history and want to keep the download small,
try using the parameter `--depth` when cloning. `--depth 10` limits the history
to the last 10 commits, for example.

<a name="dev_access"></a>
<h3>Git Access - Contributors and patch submitters</h3>

<div class="alert alert-danger">
<strong>Configure your git!</strong> Before making any commits to the Haiku repository (local even), be <strong>sure</strong> to <a href="#configure_env">configure</a> the git environment on your local system! Failure to configure git properly before a commit will result in incorrect naming in your commit, making it impossible to give you well-deserved credit for your work.</div>

<h4>Configure Git on your system:<a name="configure_env"></a></h4>

Before making your first commit on a new system, be <strong>sure</strong> to configure Git. These global settings are stored in your git configuration directory (`~/.git/` or for Haiku: `~config/settings/git/`) and will be appended to <strong>each</strong> commit as your personal information.

```sh
git config --global user.name "John Doe"
git config --global user.email "john.doe@developers.com"
```

On Mac OS X, you must set the following option in order to avoid problems with the unicode representation of filenames:

```sh
git config core.precomposeunicode true
```

<h4>Setup an account on Gerrit</h4>

<p>Log in to <a href="https://review.haiku-os.org">Gerrit code review</a>. You currently need a <a href="https://github.com">Github</a> account for logging in.</p>
<p>Upload your SSH public key in <a href="https://review.haiku-os.org/settings/#SSHKeys">Gerrit SSH keys settings</a> page. If you don't have a key yet, you can generate one using ssh-keygen.</p>
<p>If the e-mail address used in your commits does not match the one in your github account, you will need to add and verify it in <a href="https://review.haiku-os.org/settings/#EmailAddresses">Gerrit E-Mail address settings</a>.</p>

<h4>Build Tools:</h4>

The `<login>@` is only needed if your currently logged in username doesn't match your `review.haiku-os.org` username.

```sh
git clone "ssh://<login>@git.haiku-os.org/buildtools"
scp -p <login>@git.haiku-os.org:hooks/commit-msg "buildtools/.git/hooks/"
```

<h4>Haiku:</h4>

The `<login>@` is only needed if your currently logged in username doesn't match your `review.haiku-os.org` username.

```sh
git clone "ssh://<login>@git.haiku-os.org/haiku"
scp -p <login>@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
```

<h4>Switching from read-only to write access</h4>

Want to submit your first patch? Thanks, that's great! You don't need to checkout the sources again. Instead you can update your existing copy of the source to use the commiter access. Just change the remote URL:

```sh
git remote set-url origin ssh://<login>@git.haiku-os.org/haiku
```

You also should install the <a href="https://review.haiku-os.org/Documentation/user-changeid.html">Gerrit hooks to generate Change-Ids</a>:

```sh
scp -p <login>@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
```

<h3>Some Notes</h3>

<h4>Case Sensitive Filesystem</h4>

<div class="alert alert-warning">
Haiku's source code needs to reside on a case sensitive file system.
</div>
In short, such a file system recognizes "ThisIsAFile.txt" and "THISISAFILE.txt" as two different files. Some file systems that are (or could be) case in-sensitive include, FAT32, NTFS, and HFS+. Mac OS X's HFS+ is case in-sensitive by default. For more information regarding how to create a case-sensitive HFS+ volume, see <a href="/documents/dev/how_build_haiku_mac_os_x#part_diskimage">this article</a>.

<a name="proxy_access"></a>
<h4>Getting the source code through an HTTP proxy</h4>

<div class="alert alert-warning">
Haiku's main Git repository does not allow HTTP access, which is a problem if you are accessing the Internet through a proxy server that only permits HTTP (port 80) traffic.
</div>

Instead, use one of our mirror repositories at GitHub or Gitorious for anonymous HTTP access, they are both kept in sync with the main repository. First, set Git to connect through your proxy server:

```sh
git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080
```

Then clone the repositories from GitHub:

```sh
git clone http://github.com/haiku/buildtools.git
git clone http://github.com/haiku/haiku.git
```

Please note that these repositories do not contain any `hrev` tags, which are used by the Haiku build system to determine the Haiku revision. To work around this limitation, use the <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/UserBuildConfig.ReadMe" target="_blank">HAIKU_REVISION build variable</a> when building Haiku.

<h3>Common tasks</h3>

If you are already familiar with the pull request workflow as used, for example, at GitHub, you
can find an overview of the differences in <a href="https://gerrit-review.googlesource.com/Documentation/intro-gerrit-walkthrough-github.html">Gerrit user's manual</a>.

<h4>Example git workflow</h4>
<img src='/files/gitProcess_0.png'>

<h4>Updating the Sources</h4>

<div class="alert alert-danger">
Be sure to use the <span class="cli">--rebase</span> argument while doing a pull prior to a push to avoid confusing nonlinear histories! ("Merge 'master' on ssh://git.haiku-os.org/haiku" messages showing your name and others changes) Do <b>NOT</b> however use <span class="cli">--rebase</span> on branches you have shared with other people! (rebase re-writes the local history. If your local history doesn't match people who cloned off of you, and they want to push to you, they will have <b>major</b> problems.)
</div>

```sh
cd haiku
git pull --rebase
```

You can make git take care of this automatically for you, so that "git pull" does the right thing for Haiku:

```sh
cd haiku
git config pull.rebase true
```

Alternatively, a single path or multiple paths can be given to <span class="cli">git pull</span>. This will allow you to run the following command from any directory. This becomes extremely useful if you use an <a href="/guides/building/configure/different-generated">external object directory</a> or if you wish to update both the buildtools and haiku directories at the same time.

```sh
git pull --rebase ./haiku ./buildtools
```

<h4>Making local commits</h4>

In Git, you make commits to your local tree, then push the final results to the
central remote Haiku repository. Split your work in not too large commits, but
remember that each commit will be reviewed separately, so don't make them too
small either.

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

* Ensure cats in computer are fed.
* Clean up white space.
* The retroencabulator needs to be adjusted to accept input from
  multiple sources of data and ensure the buffer is free for
  shenanigans.
* No functional change.
```

<h5>Short commit comment</h5>

If your commit is very short, you can include it directly on the Git command line:

```sh
git commit -a -m "WebPositive: Style cleanup, no functional change"
```

<h5>Long commit comments</h5>

If your commit message is longer, you can put it in a file and use it this way:

```sh
git commit -a -F ~/mycommitlog
```

Alternatively, you can use "git commit -a", which will open a text editor and
let you write down the message when you commit your changes.

It may be a good idea to check <a href="https://review.haiku-os.org>Gerrit</a>
as a point of reference when

<h4>Pushing changes for review</h4>

```sh
git push origin HEAD:refs/for/master -o topic="something"
```

After your changes are complete, the push command will push your local tree to the remote Haiku repository.
The commits will be added to the review page and people will review them. You can then amend your commits
and push them again, until they are reviewed and merged.

It is recommended to set a topic - a single keyword that can easily be searched
for in the web interface and help categorize commits.

<h4>Taking review comments into account and updating a commit</h4>

Usually your changes will not be accepted on the first try. Other developers
will review it, making sure they understand what you are doing, and maybe
help you find better ways of doing it. They will also check that your code
follows the coding guidelines, which are important to make sure the code is
easy to read and uses the same conventions in all the codebase.

<h5>Single-commit change</h5>

To update an existing commit, you need to download it locally, modify it,
and send it again. When your change consists of a single commit, you can
cherry-pick it.

First make sure you start from a clean working tree with the latest Haiku changes
(note that this will remove all your work in progress commits from the working
copy, make sure they are in a branch. Git will remind you about this if it's the
case).

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
git fetch "ssh://user@git.haiku-os.org/haiku" refs/changes/28/3228/4
git cherry-pick FETCH_HEAD
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
git fetch "ssh://user@git.haiku-os.org/haiku" refs/changes/99/1299/5
git checkout FETCH_HEAD
```

You can then rebase your changes on the current version of Haiku:

```sh
git rebase origin/master
```

You can use git commit --amend to edit the latest commits and add more commits
to the branch. To modify the previous commits, you need to use git interactive
rebase (git rebase -i). See <pre>git help rebase</pre> for more help on rebasing.

Once you are done, you can update your patches on Gerrit:

```sh
git push origin HEAD:refs/for/master
```

Read the <a href="https://review.haiku-os.org/Documentation/user-upload.html">Gerrit documentation</a>
for a more detailed overview of the process.

