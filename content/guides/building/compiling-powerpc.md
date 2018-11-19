+++
type = "article"
title = "Compiling Haiku for PowerPC"
date = "2013-01-25T02:45:55.000Z"
tags = ["PowerPC compiling"]
+++

<h3>PowerPC Compiler Toolset</h3>
<p>Building the PowerPC compiler toolset is quite easy and involves generating gcc binaries for your platform. For a complete list of flags for the configure script, see <a href='/guides/building/configure'>Haiku's Configure Options</a></p>
<p>From the haiku source directory, run the following. (be sure to adjust the options to match your build environment.)
<pre class="terminal">./configure --build-cross-tools ppc ../buildtools</pre></p>

<p>If you want to run configure again to tweak some more options, you need to tell it to configure for PowerPC. This is done with the --cross-tools-prefix option:
<pre class="terminal">../configure --use-gcc-pipe --cross-tools-prefix cross-tools/bin/ppc-unknown-haiku-
</pre></p>

<h3>PowerPC Haiku Builds</h3>
<p>These builds require a valid PowerPC compiler toolset. The PowerPC port is in an <strong>extremely</strong> early state, don't expect these to work.

<h4>Compiling Haiku for Apple hardware</h4>
<p>Apple PowerPC hardware is starting to age. There was quite a bit of work on PowerPC code, however given the large amount of reliability issues with Apple PowerPC hardware and the large hardware cost, PowerPC development has slowed.<br/>

<b>To compile a Haiku boot cd for PowerPC:</b>
<pre class="terminal">jam -q haiku-boot-cd</pre>
<br/>
<b>To compile a Haiku network boot image:</b>
<a href="/guides/network_booting">Booting Haiku over a local network</a>
</p>
