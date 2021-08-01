+++
type = "article"
title = "Network services"
date = "2010-05-11T15:29:32.000Z"
tags = []
+++

The basic installation of Haiku contains several standard system network services including a FTP, Telnet, and SSH Server.

<h3>Setting your user password</h3>
<p>A good first step is to set the password for your user account (default name is 'user'), in order to secure your system before opening it to the world.

<pre class="terminal">~> passwd
new password:
repeat new password:</pre></p>

<div class='box-info'>To access your Haiku system remotely, you will need to know its network address.
Haiku's default hostname is shredder. If shredder doesn't resolve, you can simply launch the
<span class='app'>Network</span> preference applet to find your system's network address.
You can change the hostname by editing /system/settings/network/hostname.</div>
<br>

<h3>ftpd - FTP server daemon</h3>
Haiku can easily be made to listen for incoming FTP connections to serve its files.

DISCLAIMER: ftpd does not support SFTP or FTPS so network traffic is unencrypted.

<p>To start the FTP server open the Network preferences, select **`FTP server`**  from its list of services and click **`Enable`**.</p>
<br>
<h3>telnetd - Telnet server daemon</h3>
Haiku can easily be made to listen for incoming telnet connections.

DISCLAIMER: telnet traffic is unencrypted.

<p>To start the Telnet server open the Network preferences, select **`Telnet server`**  from its list of services and click **`Enable`**.</p>
<br>
<h3>sshd - Secure shell daemon</h3>
SSH is a network protocol that allows for data to be exchanged using a secure channel between two networked devices. The most common use is shell access.

Starting the SSH server daemon in Haiku is easy:
<ol>
<li>Add the SSH server user: <pre class="terminal">useradd sshd</pre></li>
<li>Edit /system/settings/ssh/sshd_config and add the following option: <pre class="terminal">PermitRootLogin yes</pre></li>
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
