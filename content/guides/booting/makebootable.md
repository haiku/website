+++
type = "article"
title = "More on makebootable ..."
date = "2009-06-18T23:49:21.000Z"
tags = []
+++

<h3>Modifying the Boot Sector</h3>
<ul>
<li><h4>is not necessary when</h4>
<ul>
<li>dd:ing to an entire disk device and not a partition</li>
<li>using Qemu or other Virtualization Software</li>
<li>using Haiku's Installer program, as it is done automatically</li>
<li>using the build system to install directly to a partition from source, as it is done automatically</li>
</ul>
</li>
<li><h4>is necessary when</h4>
<ul>
<li>dd:ing to a partition</li>
<li>manually installing using Tracker</li>
<li>installing using BeOS/Zeta's Installer program</li>
</ul>
</li>
<li><h4>Ways to modify the boot sector</h4>
<ul>
<li>makebootable</li>
<li><a href="#makebootabletiny">makebootabletiny</a>  <a href="http://tinyurl.com/echelog-makebootablytiny">IRC Logs search for 'makebootabletiny'</li>
<li><a href="#zbeos_hack">zbeos hack</a></li>
<li><a href="http://www.haiku-os.org/node/2398#manually">manual manipulation</a></li>
</ul>
</ul>
<a name="makebootabletiny"></a>
<h3>makebootabletiny</h3>
<p>
<code>makebootabletiny</code> is a simple little program that can be compiled and ran, without needing any Haiku sources. It is ideal for people who write <a href="http://haiku-files.org/raw/">raw image files</a> to disk.
</p>
<p>
It reads out the offset of the specified partition and writes it into the boot record of this partition at a defined offset (506).
</p>

You can <a href="http://stefanschramm.net/dev/makebootabletiny/makebootabletiny.c">download the file</a>, compile it with:
<pre>
gcc makebootabletiny.c -o makebootabletiny
</pre>
Then run
<pre>
sudo chmod o+r /dev/sda2
sudo chmod o+rw /dev/sda2
makebootabletiny /dev/sda2
</pre>
and make sure you put the correct path to your Haiku partition.

In case someone is interested, HeTo made a version of makebootabletiny for BeOS, available here: http://www.students.tut.fi/~vettenrh/dump/ . makebootabletiny.c contains the source code, makebootabletiny_beos contains a binary for BeOS R5.


<a name="zbeos_hack"></a>
<h3>Bootstrapping from BeOS or Zeta</h3>
Mount your Haiku partiiton as /Haiku and then:
<pre>
cd /Haiku
mkdir -p beos/system
cp system/haiku_loader beos/system/zbeos  
</pre>
Reboot into Haiku and then:
<pre>
makebootable /boot
rm -Rf /boot/beos
</pre>

<h3>Running <code>makebootable</code> via the build system</h3>
Another option is to use the build platform built makebootable using the jam run target like this:
<pre>
jam run ":&lt;build&gt;makebootable" /dev/disk/path/to/partition
</pre>