+++
type = "blog"
author = "andrewbachmann"
title = "OpenJDK Hotspot libjvm.so built on Haiku"
date = "2009-12-20T23:49:51.000Z"
tags = ["java", "hotspot", "OpenJDK", "haiku"]
+++

As my first blog entry, I present a set of instructions for building the OpenJDK "hotspot" repository on Haiku.  The product of this process will be a partial jre, including the libjvm.so libraries.
<!--more-->
The Haiku alpha already has installed some of the required software, such as mercurial, gcc 2.95.3 and gcc 4.x.

To build OpenJDK on Haiku some extra files are required.  By default the build will attempt to use xsltproc for xslt transforms.  It can alternatively use xalan.  The xsltproc program is available for download as part of HaikuPorts, or individually here:

http://www.haiku-ports.de/packages/dev-libs/libxslt/libxslt-1.1.24-gcc2-haiku-2009-07-06.zip

Install xsltproc by unzipping it to /boot.

OpenJDK uses the forest extension of mercurial.  To retrieve it, do the following:

<pre class="terminal">/boot/develop> hg clone http://hg.akoha.org/hgforest/</pre>

This will create a new subdirectory hgforest which has the forest.py file in it.

Follow the instructions here http://openjdk.java.net/guide/repositories.html and configure your .hgrc to point to the forest install.  For example:

<pre>[extensions]
forest=/boot/develop/hgforest/forest.py
fetch=
</pre>

Next you should fclone the haiku repository.  This will take a while.

<pre class="terminal">/boot/develop> hg fclone http://hg.openjdk.java.net/haiku/haiku openjdk-haiku
</pre>

Next set up the environment and select gcc4.

<pre class="terminal">/boot/develop> mkdir bootdir
/boot/develop> export ALT_BOOTDIR=/boot/develop/bootdir
/boot/develop> setgcc x86 gcc4</pre>

I haven't yet integrated jvmtiEnvFill into the makefile, so you have to compile it manually.

<pre class="terminal">/boot/develop> cd /boot/develop/openjdk-haiku/hotspot/src/share/tools/jvmti
/boot/develop/openjdk-haiku/hotspot/src/share/tools/jvmti> g++ -o jvmtiEnvFill jvmtiEnvFill.cpp
</pre>

Finally, run the make.  This will really take a while.

<pre class="terminal">/boot/develop> cd /boot/develop/haiku/hotspot/make
/boot/develop/openjdk-haiku/hotspot/make> make
</pre>

The outputs will be in a "build" folder in the hotspot directory.