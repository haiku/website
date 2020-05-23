+++
type = "article"
title = "Accessing BFS outside of Haiku"
date = "2010-02-15T23:56:29.000Z"
tags = []
+++

<h3>Accessing BFS outside of Haiku</h3>
What is FUSE? FUSE is an acronym for "Filesystem in USErspace" and in essence 
allows an operating system to communicate with a file system through a 
userland progam. By providing this functionality outside of kernel space, 
adding support for a new filesystem is a simple matter of installing the 
respective FUSE module. As a comparison, the typical paradigm involves 
altering the operating system's kernel to support the filesystem. 
For more information, visit the <a href="https://github.com/libfuse/libfuse">FUSE project page</a>.

The initial implementation of a BFS FUSE module was added in 
<a href="https://dev.haiku-os.org/changeset/31409">r31409</a>

<h3>Pre-requisites</h3>
<a name="linux"></a>
<a name="linux_apt"></a>
<h4>APT-based GNU/Linux Distribution (Debian, Ubuntu...)</h4>
<pre class="terminal">sudo apt-get install libfuse-dev</pre>

<a name="bsd"></a>
<h4>BSD Based Distribution</h4>
<pre class="terminal">sudo portinstall sysutils/fusefs-kmod sysutils/fusefs-libs</pre>

<h3>Building the BFS FUSE module from source</h3>
<pre class="terminal">cd /path/haiku/haiku/
jam '&lt;build&gt;bfs_fuse'</pre>

<h3>Mounting your BFS partition</h3>

In this example, ```/dev/sdaX``` is the BFS partition you wish to mount.
<pre class="terminal">
mkdir /path/to/mountPoint
/path/to/bfs_fuse /dev/sdaX /path/to/mountPoint
</pre>

At this point, your BFS partition should be mounted at ```/path/to/mountPoint```.

