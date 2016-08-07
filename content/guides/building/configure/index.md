+++
type = "article"
title = "Configure Options"
date = "2010-02-16T00:03:10.000Z"
tags = []
+++

As of February 2010, Haiku's `configure` has several interesting options.  These options are briefly explained by running `configure --help` on the command line.  Below, additional information will be discussed as a complement to the usage output text.

<ul>
<li><h4>--build-cross-tools &lt;arch&gt; &lt;build tools dir&gt;</h4>
Compile the build tools for one of the following &lt;arch&gt; [x86|x86_gcc2|x86_64|ppc|arm|m68k|mips]. "x86_gcc2" will build GCC 2 build tools. Using GCC 2 is only a concern if you require binary compatibility with BeOS. All other architectures use GCC 4. To build a supported hybrid combination you can repeat the --build-cross-tools for the secondary architecture, but without a &lt;build tools dir&gt;. A note about <a href="#buildtoolsdir">&lt;build tools dir&gt;</a>.
</li>

<li><h4>--cross-tools-prefix &lt;prefix&gt;</h4>
Point to pre-built binaries of the build tools. This can be used after the cross-tools have been compiled with a previous <code>configure --build-cross-tools ...</code>. The option can be repeated to specify the secondary build tools for a Hybrid.
</li>

<li><h4>--distro-compatibility &lt;level&gt;</h4>
The distribution's level of compatibility with the official Haiku distribution. The generated files will contain the respective trademarks accordingly. Currently supported values are:

official -- the official Haiku distribution.
compatible -- a Haiku Compatible (tm) distro.
default -- any other distro (default value).

</li>

<a name="gpl_addon"></a>
<li><h4>--include-gpl-addons</h4>
By default, Haiku does not include GPL-licensed programs. 
<a href="http://grok.bikemonkey.org/source/search?q=GPL_ONLY&defs=&refs=&path=&hist=&project=haiku">{OpenGrok Search for GPL Addons</a>
</li>

<li><h4>--include-3rdparty</h4>
Certain programs are capable of being built at the same time as Haiku. This option triggers the ability to build all the software inside HAIKU_TOP/3rdparty, assuming the software itself supports it.
</li>

<li><h4>--include-patented-code</h4>
Search the source code for <a href="http://grok.bikemonkey.org/source/search?q=HAIKU_INCLUDE_PATENTED_CODE&defs=&refs=&path=&hist=&project=haiku">HAIKU_INCLUDE_PATENTED_CODE</a> to see which code is affected by this setting.
</li>

<li><h4>--enable-multiuser</h4>
Enable experimental multiuser support. Since R1 is not actively targeting mulit-user functionality, this option has limited use.
</li>

<li><h4>--target=TARGET</h4>
Originally, Haiku was being developed such that certain components could be used as drop-in replacements in BeOS. This was to allow parallel development of both the underlaying core of Haiku and the userland programs. These days, being able to build Haiku as a BeOS binary has lost priority. Patches to enhance the code to restore this functionality are welcome.
</li>

<li><h4>--target-arch &lt;arch&gt;</h4>
This option is supported when building on Haiku only. &lt;arch&gt; is one of [x86|x86_gcc2|x86_64|ppc|arm|m68k|mips] and specifies the architecture of a compiler installed in the system to be used for building Haiku. The option can be repeated to specify the secondary compiler for a Hybrid build.
</li>

<li><h4>--use-gcc-pipe</h4>
This is a very useful option. It instructs the build system to pass some information through system pipes instead of writing everything as temporary files. As a result, the build system will utilize additional memory and shorten the time required to build Haiku. 
</li>

<a name="usexattr"></a>
<li><h4>--use-xattr</h4>
<p>Enables the ability to emulate the BFS attribute support on other filesystems via xattrs. When using a Linux or BSD derived distribution as your development environment, some of their filesystems may support the use of this option. There are a few conditions: the (Linux) kernel must be compiled to support xattr, the filesystem itself must support xattr, and the filesystem's implementation must be adequate. See <a href="/guides/building/configure/use-xattr">Configure Option : --use-xattr</a> for more information.
</p>
</li>

<a name="usexattrref"></a>
<li><h4>--use-xattr-ref</h4>
<p>Similar to --use-xattr, but also works when the underlying file system has a per-file attribute size limit (often 4096 bytes) that is insufficient for the --use-xattr emulation.
</p>
</li>

<li><h4>--update</h4>
In <a href="http://dev.haiku-os.org/changeset/34867">changeset 34867</a>, the ability to re-run configure with the options from a previous run was implemented.

<li><h4>-j&lt;n&gt;</h4>
This option allows the cross-tools to be built with similar jobs. Currently this only works when the GCC 4.x cross-tools are being built. See this <a href="http://www.freelists.org/post/haiku-development/Haikus-configure-jn-and-emulated-attributes,1">haiku-development mailing list post</a> for more information.
</li>
</ul>

<h3>Examples of configure</h3>
Here are some working examples for the different usage cases.
These do not display the use of advanced options such as "--use-gcc-pipe", "--use-xattr", or "--include-gpl-addons".
<ul>
<li><h4>Building the same GCC from Haiku</h4>
<pre class="terminal">
./configure 
</pre></li>

<li><h4>Building from BeOS or Zeta</h4>
<pre class="terminal">
./configure --cross-tools-prefix /boot/apps/haiku/cross-tools/bin/i586-pc-haiku-
</pre></li>

<li><h4>Building GCC 2.95 binutils (only for x86) from Linux/BSD/...</h4>
<pre class="terminal">
./configure --build-cross-tools x86_gcc2 ../buildtools/
</pre></li>

<li><h4>Building GCC 4.x binutils for x86 from Linux/BSD/...</h4>
<pre class="terminal">
./configure --build-cross-tools x86 ../buildtools/
</pre></li>

<li><h4>Pointing to recently compiled buildtools</h4>
<pre class="terminal">
./configure --cross-tools-prefix cross-tools/bin/i586-pc-haiku-
</pre></li>

<li><h4>Building x86 GCC Hybrids</h4>
<p>	Please see the page on <a href="/guides/building/gcc-hybrid">GCC Hybrids</a> for detailed information.</p>
</li>

<li><h4>Building GCC 4.x binutils for PPC from Linux/BSD/...</h4>
<pre class="terminal">
./configure --build-cross-tools ppc ../buildtools/
</pre></li>

</ul>

<h3>Some Notes</h3>
<ul>
<a name="buildtoolsdir"></a>
<li><h4>&lt;build tools dir&gt;</h4>
This refers to the directory that contains the buildtools source code.  It is usually represented by a relative path from where you are running `configure`.  Typically this is "../buildtools".
</li>
</ul>