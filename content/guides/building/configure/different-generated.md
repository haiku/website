+++
type = "article"
title = "Building from a Non-Standard Object Directory"
date = "2009-05-04T00:54:24.000Z"
tags = []
+++

<p>Like many other software projects, Haiku allows a user to run configure from a directory outside of the source tree. This will cause the build system to use that current directory as the target location for storing the output from compiling, otherwise known as objects.</p>

<p>There are a few reasons for doing this. Multiple products, such as x86_gcc8, x86_gcc2, or arm can all be built from the same source tree, which reduces disk space usage. The object directory can be placed on a completely different partition or disk for that matter. This helps to minimize data loss in the event of file system corruption. Granted, this shouldn't occur but Haiku is still pre-R1. Another reason, albeit trivial in functionality is that this will keep your source directory clean and free of any generated files. This could be useful for people who keep the sources on a USB stick or SSD and want the compiled objects to be built on a mechanical hard disk or ram drive.</p> 

<p>Once this concept is understood, it is very easy to use. In essence inside your object directory, you run configure with an absolute or relative path to the location of Haiku's source directory.  After that you run jam from within the object directory.</p>

<p>Let us imagine this file system layout:</p>

<pre>
/path/haiku/buildtools/
/path/haiku/haiku/
/path/haiku/haiku/generated.x86_gcc2/
/path/haiku/haiku/generated.x86_gcc8/
</pre>

<p>These would then be the commands to build Haiku x86_gcc2:</p>

<pre class="terminal">
cd /path/haiku/haiku/generated.x86_gcc2/
../configure --cross-tools-source ../../buildtools --build-cross-tools x86_gcc2
jam -q @alpha-raw
</pre>

<p>Once configured, another option is to run jam within $(HAIKU_TOP) and specify the value for HAIKU_OUTPUT_DIR, by utilizing the -s parameter. One use is to quickly test to make sure the application builds without error for both gcc2 and gcc4.</p>

<pre class="terminal">
cd /path/haiku/haiku/
jam -q -sHAIKU_OUTPUT_DIR=/path/haiku/haiku/generated.x86_gcc2 AboutSystem
jam -q -sHAIKU_OUTPUT_DIR=/path/haiku/haiku/generated.x86_gcc8 AboutSystem
</pre>

<p>The above example will build AboutSystem inside the generated.x86_gcc2 directory and then the generated.x86_gcc8 directory</p>
