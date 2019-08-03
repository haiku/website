+++
type = "article"
title = "Using Jam"
date = "2009-05-04T18:01:07.000Z"
tags = []
+++

<p>
Haiku uses a custom fork of <a href="http://www.perforce.com/jam/jam.html">Perforce's Jam</a>. This <a href="https://www.freelists.org/post/haiku/New-Build-System"> mailing list thread</a> helps to explain the decision to fork jam.
</p>
As of August 2019, this is the current version. If a different version is reported, then you will need to build and install jam from source. 
<pre class="terminal">
jam -v
Jam 2.5-haiku-20111222. OS=LINUX. Copyright 1993-2002 Christopher Seiwald.
</pre>
<a name="build_jam"></a>
<h3><a href="#build_jam">Building Jam from Source</a></h3>
Haiku's version of jam lives inside the <a href="https://cgit.haiku-os.org/buildtools/">buildtools repository</a>. If you need to, see this page on <a href="/guides/building/get-source-git">Getting Haiku Source Code</a>.
<pre class="terminal">
cd  /path/haiku/buildtools/jam/
make
&lt;jam-install-command&gt;
</pre>
<h4>&lt;jam-install-command&gt;</h4>
To install jam you can use one of two commands:
The first requires administrative privilege, as jam will be installed to '/usr/local/bin/'
<ul>
<li><span class="cli">sudo ./jam0 install</span></li>
<li><span class="cli">./jam0 -sBINDIR=$HOME/bin install</span></li>
</ul>
Note, you may need to use `gmake` instead of `make`

<a name="jam_options"></a>
<h3><a href="#jam_options">Command Line Options</a></h3>
Only some of the options are being discussed here. See <span class="cli">jam -h</span> for a full listing of available options.
<ul>
<li><h4>-q</h4>
Typically jam will attempt to build all targets, even if an error is encountered.  '-q' instructs jam to quit immediately upon encountering an error. This is preferred, as it helps to find the actual cause for build failure.
</li>
<li><h4>-j#</h4>
Where # represents the number of threads to use. This is useful when building on SMP or multi-core machines.
<div class="alert alert-warning">Jam suffers from a <a href="https://dev.haiku-os.org/ticket/4091">bug</a> that might make your build fail when using this option.</div> 
</li>
<li><h4>-a</h4>
Build all targets, even if they are current. Normally, this is not necessary.
You may need to do this once in a while because some of the jam rules are not perfect and does not set the dependencies between files properly. The most frequent case is when we update our copy of Freetype : this will prevent anyone to build without the -a switch.
You can also use this switch if something does not seem to get updated after some change you made. This is the case when you modify a jamfile : Jam does not check for that and will not rebuild things that should be affected by the changes.
</li>
<li><h4>-sx=y</h4>
Set variable x=y, overriding environment. One example is :
<pre class="terminal">
    jam -sHAIKU_IGNORE_USER_BUILD_CONFIG=1 -q @release-raw
</pre>
This will ensure that the release-* targets are built to the exact specifications of Haiku's <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/DefaultBuildProfiles">DefaultBuildProfiles</a>.
</li>
<li><h4>-dX</h4>
Enables debug output, where X can be one of the following:
<ul>
<li>(a)actions</li>
<li>(c)causes</li>
<li>(d)dependencies</li>
<li>(m)make tree</li>
<li>(x)commands</li>
<li>(0-9) debug levels</li>
</ul>
</li>
<li><h4>-n</h4>
Don't actually execute the updating actions. This seems to be useful for testing Jamfiles.
</li>
</ul>

<a name="jam_targets"></a>
<h3><a href="#jam_targets">Possible Targets</a></h3>

<h4>Official Release Targets</h4>
<p>The following targets are defined in <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/DefaultBuildProfiles">build/jam/DefaultBuildProfiles</a></p>
<ul>
<li><h4>@release-raw</h4>
Builds a pre-release image as a raw image. This can be written directly to disk or used with Qemu
</li>
<li><h4>@release-vmware</h4>
Builds a pre-release image for use with VMWare. This can also be used with VirtualBox.
</li>
<li><h4>@release-cd</h4>
A single track ISO CD. `mkisofs` is needed to build this. 
</li>
<li><h4>@release-anyboot</h4>
A custom file that can be burned to CD or written directly to disk or used with Qemu.
It is comprised of an Master Boot Record (MBR), El Torito boot image, and a BFS raw image.
The MBR occupies the first 512 bytes of the El Torito image, which is usually empty.
The BFS image is simply concatenated at the end. Inside the MBR is a partition table entry, which maps to the BFS image.
</li>
</ul>
<h4>Non-Release Targets</h4>
<p>In addition to looking at <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/DefaultBuildProfiles">DefaultBuildProfiles</a>, there is also a way of finding possible targets by looking at the various <a href="http://grok.bikemonkey.org/source/search?q=NotFile&defs=&refs=&path=%2Fbuild%2Fjam&hist=&project=haiku">"NotFile" statements</a>. A "NotFile" statement is usually used to create a build target with a more user-friendly name. Targets such as these should be viewed as a minimal base.</p>

<h3>Customizing the build, enabling debug, etc.</h3>

<p>Various aspects of the build system are customizable through the <a href="/guides/building/userbuildconfig">UserBuildConfig file</a>.</p>

<h3>Some Notes</h3>
<ul>
<a name="sudo_jam"></a>
<li><h4><a href="#sudo_jam">sudo jam &lt;options&gt;</a></h4>
<p>
<div class="alert alert-warning">You should not be using the sudo command when running jam.</div> 
First of all, any and all files in $(HAIKU_OUTPUT_DIR)--typically /path/haiku/haiku/generated/ will only be accessible to root. To fix this, it is necessary to run <span class="cli">chown -R &lt;user&gt;:&lt;group&gt; &lt;path&gt;</span>. Secondly, user errors become much more damaging when `sudo jam` is used, as you could easily overwrite the wrong partition.</p>
<p>The preferred method is to apply permissions to your device first.</p>
<pre class="terminal">
sudo chmod o+r /dev/sda
sudo chmod o+rw /dev/sda2
jam -q @walter-sda2
</pre>
This example uses the Build Profile 'walter-sda2', which is defined on the <a href="/guides/building/userbuildconfig#sample">UserBuildConfig &amp; BuildProfiles</a> page.

For Linux distributions that make use of udev to maintain /dev, this will only work until you reboot. To allow your user permanent read access to the full disk and write access to the Haiku partition, you need to ask udev to do that for you after every boot. In order to do that, create a udev rule file for local changes (for openSUSE, the file could be named '/etc/udev/rules.d/99-local.rules') and add this to it:
<pre class="terminal">
KERNEL=="sda", MODE="0664"
KERNEL=="sda2", OWNER="your_username"
</pre>
In order to activate the changes for the current session, please invoke <pre class="terminal">sudo udevadm trigger</pre>
</p>
</li>
<a name="emulated_attributes"></a>
<li><h4><a href="#emulated_attributes">Cleaning up emulated attributes</a></h4>
When building Haiku on a filesystem that is not BFS nor uses a <a href="/guides/building/configure/use-xattr">sufficient implementation of xattr</a>, the build system will emulate attributes. An <code>attributes/</code> folder will be created in your generated folder. It will be necessary to manually remove the emulated attributes folder, ideally before each build cycle. Otherwise some issues may occur.

Note: This assumes your HAIKU_OUTPUT_DIR is <code>generated/</code>!!
<pre class="terminal">
cd /path/haiku/haiku/
jam clean
rm -Rf generated/attributes/
jam &lt;options&gt; &lt;target&gt;
</pre>
</li>
</ul>

<h3>Miscellaneous Links</h3>
<ul>
<li class="icon-document">
<a href="http://www.perforce.com/jam/jam.html">Jam's Perforce Homepage</a>
</li>
<li class="icon-document">
<a href="https://cgit.haiku-os.org/buildtools/plain/jam/Jam.html">The Jam Executable</a>
</li>
<li class="icon-document">
<a href="https://cgit.haiku-os.org/buildtools/plain/jam/Jambase.html">Jambase Reference</a>
</li>
<li class="icon-document">
<a href="https://cgit.haiku-os.org/buildtools/plain/jam/Jamfile.html">Using Jamfiles and Jambase</a>
</li>
</ul> 
