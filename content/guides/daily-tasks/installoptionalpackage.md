+++
type = "article"
title = "Installing optional packages"
date = "2010-05-10T19:19:54.000Z"
tags = []
+++

Haiku has a temporary script as a band-aid for the lack of a proper package manager. The script is named <span class="cli">installoptionalpackage</span> and allows the end user to easily download and install common pieces of 3rd party software compiled for Haiku.<br>

<div class="alert alert-info">NOTE: With the recent incorporation of package management, this software installation method is obsolete and removed. See <a href="/guides/daily-tasks/install-applications">Installing applications</a> for instructions.</div>

<h3>Pre-requirements</h3>
<ul>
<li><b>Required:</b> Recent Haiku version</li>
<li><b>Required:</b> An Internet connection</li>
</ul>
<br>

<h3>The command line options of installoptionalpackage</h3>
<p><ul>
<li><strong>-a</strong> Add one or more packages and all dependencies</li>
<li><strong>-s</strong> Show the final list of packages that would be installed</li>
<li><strong>-f</strong> Remove cached data and list installable packages</li>
<li><strong>-h</strong> Print this help.</li>
<li><strong>-l</strong> List installable packages</li></ul></p>

<h3>Running the script for the first time</h3>
<p>The first time you run the <span class="cli">installoptionalpackage</span> script, it will build a local cache of the available Haiku sanctioned 3rd party packages in <i>/boot/common/data/optional-packages/</i>. The local cache the <span class="cli">installoptionalpackage</span> creates can be cleared via the <span class="cli">-f</span> option.

<pre class="terminal">~&gt; installoptionalpackage -l
Fetching OptionalPackages ...
Fetching OptionalPackageDependencies ...
Fetching OptionalBuildFeatures ...
Generating a list of Package Names ...
...warning: Beam cannot be installed because of DevelopmentMin
...warning: Bluetooth cannot be installed
...warning: Development cannot be installed
...warning: DevelopmentBase cannot be installed
...warning: DevelopmentMin cannot be installed
...warning: ICU-devel cannot be installed because of DevelopmentMin
...warning: LibLayout cannot be installed because of DevelopmentMin
...warning: NetFS cannot be installed because of UserlandFS
...warning: UserlandFS cannot be installed
...warning: Welcome cannot be installed
...warning: WifiFirmwareScriptData cannot be installed


Available Optional Packages:
abi-compliance-checker apr apr-util beae bebook behappy beoscompatibility bepdf bezillabrowser
bzip cdrecord clockwerk clucene cmake curl cvs expat friss gettext git keymapswitcher libevent
libiconv libxml2 libxslt links mandatorypackages mercurial nano neon netsurf ocaml opensound
openssh openssl p7zip pcre pe perl python rsync sed sqlite subversion tar trackernewtemplates
transmission vim vision vlc webpositive wonderbrush xz-utils yasm
</pre></p>

<h3>Installing optional package</h3>
<p>As an example, below we will be installing the Vim optional package.  The installation process is easy, simply pull up the Haiku Terminal and execute <span class="cli">installoptionalpackage</span> with the <span class="cli">-a</span> option to install the specified package and all dependencies.

<pre class="terminal">~> installoptionalpackage -a vim
To be installed:  Vim LibIconv
Installing vim-7.2-r1a2-x86-gcc2-2010-05-07.zip ...
Downloading http://haiku-files.org/files/optional-packages/vim-7.2-r1a2-x86-gcc2-2010-05-07.zip ...
2010-05-10 17:02:43 URL:http://haiku-files.org/files/optional-packages/vim-7.2-r1a2-x86-gcc2-2010-05-07.zip [8519537/8519537] -> "vim-7.2-r1a2-x86-gcc2-2010-05-07.zip" [1]
Extracting vim-7.2-r1a2-x86-gcc2-2010-05-07.zip ...
Installing libiconv-1.13.1-r1a2-x86-gcc2-2010-04-21-a.zip ...
Downloading http://haiku-files.org/files/optional-packages/libiconv-1.13.1-r1a2-x86-gcc2-2010-04-21-a.zip ...
2010-05-10 17:02:50 URL:http://haiku-files.org/files/optional-packages/libiconv-1.13.1-r1a2-x86-gcc2-2010-04-21-a.zip [1559805/1559805] -> "libiconv-1.13.1-r1a2-x86-gcc2-2010-04-21-a.zip" [1]
Extracting libiconv-1.13.1-r1a2-x86-gcc2-2010-04-21-a.zip ...
</pre></p>