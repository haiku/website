+++
type = "article"
title = "Network services"
date = "2010-05-11T15:29:32.000Z"
tags = []
+++

The basic installation of Haiku contains several standard system network utilities including SSH and Telnet

<h3>Setting your user password</h3>
<p>A good first step is to set the password for your user account, in order to secure your system before opening it to the world.

<pre class="terminal">~> passwd
new password:
repeat new password:</pre></p>

<div class='box-info'>To access your Haiku system remotely, you will need to know its network address. Haiku's default hostname is shredder. If shredder doesn't resolve, you can simply launch the <span class='app'>Network</span> preference applet to find your system's network address.</div>

<h3>ftpd - an FTP server daemon</h3>
Haiku can easily be made to listen for incoming FTP connections to serve its files.

<h4>Start ftpd at boot</h4>
<p>Haiku will automatically start its FTP server daemon at boot if you remove the comment hashes (#) from the service ftp section of /boot/system/settings/network/services.

<h4>Start ftpd manually</h4>
<p>To start the FTP server daemon manually, simply execute ftpd.</p>

<h3>sshd - the secure shell daemon</h3>
SSH is a network protocol that allows for data to be exchanged using a secure channel between two networked devices. The most common use is shell access.

Starting the SSH server daemon in Haiku is easy:
<ol>
<li>Add the SSH server user: <pre class="terminal">useradd sshd</pre></li>
<li>Start the SSH server daemon: <pre class="terminal">/boot/system/bin/sshd</pre></li>
</ol>

After starting sshd, we should now be able to verify that the daemon is indeed running:
<pre class="terminal">ps | grep sshd | grep -v grep
/boot/system/bin/sshd          237     1     0     0</pre>

In the example above, sshd has the process id of 237 and is running. We can now connect to Haiku with the username of 'user' and the password which you set at the beginning of this article:
<pre class="terminal">alex@leenux-desktop:~$ ssh user@192.168.1.200
user@192.168.1.200's password: 

Welcome to the Haiku shell.

~> uname -a
Haiku shredder 1 r36769 May  8 2010 20:58:31 BePC Haiku
~> gcc -v
using priority 5
Reading specs from /packages/gcc-2.95.3_2013_08_15-2/.self/develop/tools/lib/gcc-lib/i586-pc-haiku/2.95.3-haiku-2013_08_15/specs
gcc version 2.95.3-haiku-2013_08_15
~> </pre>
