+++
type = "article"
title = "Getting the source code"
date = "2011-06-13T16:07:27.000Z"
tags = []
+++

<span class="right"><img src='/images/archive_64.png'></span>

<p>
Haiku's source code is currently being hosted in a <a href="http://git-scm.com/" target="_blank">Git based repository</a>. Anonymous access will allow anyone to download Haiku's source code; However, only Haiku contributors with commit access should use the authenticated (non-anonymous) method.
</p>

<div class="alert alert-danger">
<strong>Configure your git!</strong> Before making any commits to the Haiku repository (local even), be <strong>sure</strong> to <a href="#configure_env">configure</a> the git environment on your local system! Failure to configure git properly before a commit will result in incorrect naming in your commit and public humiliation on the mailing list.</div>

<div class="alert alert-warning">
<strong>The buildtools are not needed when building from within Haiku</strong>. Pre-built images of Haiku already come with the buildtools pre-installed.
</div>

<a name="anon_access"></a>
<h3>Git Access - Anonymous testers</h3>
<ul>
<li><h4>Build Tools:</h4>
<pre class="terminal">
git clone https://review.haiku-os.org/buildtools
</pre>
<!--
or (if you have a problem with https)
<pre class="terminal">
git clone git://git.haiku-os.org/buildtools
</pre>
-->
</li>

<li><h4>Haiku:</h4>
<pre class="terminal">
git clone https://review.haiku-os.org/haiku
</pre>
<!--
or:
<pre class="terminal">
git clone git://git.haiku-os.org/haiku
</pre>
-->
</li>
</ul>
<p>If you don't care about the commit history and want to keep the download small, try using the parameter <tt>--depth</tt> when cloning. <tt>--depth 10</tt> limits the history to the last 10 commits, for example.</p>

<a name="dev_access"></a>
<h3>Git Access - Contributors with commit permission</h3>
<ul>
<li><h4>Configure Git on your system:<a name="configure_env"></a></h4>
<p>Before making your first commit on a new system, be <strong>sure</strong> to configure Git. These global settings are stored in your git configuration directory (~/.git/ or for Haiku: ~config/settings/git/) and will be appended to <strong>each</strong> commit as your personal information.</p>
<pre class="terminal">
git config --global user.name "John Doe"
git config --global user.email "john.doe@developers.com"
</pre>
If you were used to the short version of the svn commands (st, di,... instead of status, diff,...), you'll also want to set up similar shortcuts as aliases for the respective long git commands:
<pre class="terminal">
git config --global alias.st "status -s"
git config --global alias.di "diff"
git config --global alias.ci "commit"
git config --global alias.co "checkout"
</pre>
On Mac OS X, you should always set the following option in order to avoid confusion about the NFD and NFC representation of filenames:
<pre class="terminal">
git config core.precomposeunicode true 
</pre>
</li>

<li><h4>Build Tools:</h4>
The &lt;login&gt;@ is only needed if your currently logged in username doesn't match your git.haiku-os.org username.
<pre class="terminal">
git clone ssh://&lt;login&gt;@git.haiku-os.org/buildtools
</pre>
</li>

<li><h4>Haiku:</h4>
The &lt;login&gt;@ is only needed if your currently logged in username doesn't match your git.haiku-os.org username.
<pre class="terminal">
git clone ssh://&lt;login&gt;@git.haiku-os.org/haiku
</pre>
</li>
</ul>

<h4>Switching from anonymous to developer access</h4>
<p>Just got commit access to Haiku? Congratulations! You don't need to checkout the sources again. Instead you can update your existing copy of the source to use the commiter access. Just change the remote URL:</p>

<pre class="terminal">
git remote set-url origin ssh://&lt;login&gt;@git.haiku-os.org/haiku
</pre>

<h3>Some Notes</h3>
<ul>
<li><h4>Case Sensitive Filesystem</h4>
<div class="alert alert-warning">
Haiku's source code needs to reside on a case sensitive file system. 
</div>
In short, such a file system recognizes "ThisIsAFile.txt" and "THISISAFILE.txt" as two different files. Some file systems that are (or could be) case in-sensitive include, FAT32, NTFS, and HFS+. Mac OS X's HFS+ is case in-sensitive by default. For more information regarding how to create a case-sensitive HFS+ volume, see <a href="/documents/dev/how_build_haiku_mac_os_x#part_diskimage">this article</a>.
</li>
<ul>
<a name="proxy_access"></a>
<li><h4>Getting the source code through an HTTP proxy</h4>
<div class="alert alert-warning">
Haiku's main Git repository does not allow HTTP access, which is a problem if you are accessing the Internet through a proxy server that only permits HTTP (port 80) traffic.
</div>
Instead, use one of our mirror repositories at GitHub or Gitorious for anonymous HTTP access, they are both kept in sync with the main repository. First, set Git to connect through your proxy server:
<pre class="terminal">
git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080
</pre>
Then clone the repositories from GitHub:
<pre class="terminal">
git clone http://github.com/haiku/buildtools.git
git clone http://github.com/haiku/haiku.git
</pre>
Note however that these repositories do not contain any hrev tags, which are used by the Haiku build system to determine the Haiku revision. To work around this limitation, use the <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/UserBuildConfig.ReadMe" target="_blank">HAIKU_REVISION build variable</a> when building Haiku.
</li>
<li><h4>Updating the Sources</h4>
<div class="alert alert-danger">
Be sure to use the --rebase argument while doing a pull prior to a push to avoid confusing nonlinear histories! ("Merge 'master' on ssh://git.haiku-os.org/haiku" messages showing your name and others changes) Do <b>NOT</b> however use --rebase on branches you have shared with other people! (rebase re-writes the local history. If your local history doesn't match people who cloned off of you, and they want to push to you, they will have <b>major</b> problems.)
</div>
<pre class="terminal">
cd /path/haiku/haiku
git pull --rebase
</pre>
Alternatively, a single path or multiple paths can be given to <span class="cli">git pull</span>. This will allow you to run the following command from any directory. This becomes extremely useful if you use an <a href="/guides/building/configure/different-generated">external object directory</a> or if you wish to update both the buildtools and haiku directories at the same time.
<pre class="terminal">git pull \--rebase /path/haiku/haiku /path/haiku/buildtools</pre>
</li>
<li><h4>Making local commits</h4>

In git you make commits to your local tree, then push the final results to the central remote Haiku repository. The comment quality of commits should be high, explaining changes in as much detail as possible.

<h5>Short commit comment</h5>
Short commit messages are best utilized for small changes or changes that hold a simple ideal.
<pre class="terminal">
git commit -a -m "WebPositive: Style cleanup, no functional change"
</pre>

The short commit message should be a summary no longer than 64 characters, no returns

<h5>Long commit comments</h5>
Long commit messages are best used to explain what was changed and why on new code, rewrites, or other tasks that may need explanation.

<pre class="terminal">
git commit -a -F ~/mycommitlog
</pre>

The following commit message format is recommended:
<pre class="terminal">kernel: Perform the usual early morning tasks

* Ensure cats in computer are fed.
* Clean up white space.
* The retroencabulator needs to be adjusted to accept input from
  multiple sources of data and ensure the buffer is free for
  shenanigans.
* No functional change.</pre>
The first line should be a summary no longer than 64 characters, separated from a detailed description by a blank line. The description lines shouldn't be longer than 72 characters.

</li>
<li><h4>Pushing changes remotely</h4>
<pre class="terminal">
git push
</pre>
After your changes are complete, the push command will push your local tree to the remote Haiku repository.
</li>
<li><h4>Example git workflow</h4>
<img src='/files/gitProcess_0.png'>
</li>
</ul>
