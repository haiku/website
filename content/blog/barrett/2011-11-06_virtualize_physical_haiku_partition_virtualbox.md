+++
type = "blog"
author = "Barrett"
title = "Virtualize a Physical Haiku Partition With Virtualbox"
date = "2011-11-06T17:54:54.000Z"
tags = ["virtual machine", "virtualbox"]
+++

In some situations, for example when we are using linux, can be extremely annoying to reboot into Haiku every time we need something (for example when we have a ppp connection).

I've written this article and i decided to post it here, in the hope that will help users and developers to have the life a bit simple.

There's a fast method to boot a physical Haiku partition using VirtualBox, it require only a few commands.
My commands refers to linux, anyway the operation is possibile under Windows (and presumably all supported platforms), changing the disk path. Remember also that you don't have to set permissions under Windows.

<ol>
 <li>Open Terminal and log in as root (or use sudo before every command) using "su" </li>
 <li>Type fdisk -l and choose the target device (for example /dev/sda) </li>
</ol>

Add to your own user the needed permissions :

<pre class="terminal">usermod -a -G disk,vboxusers username
</pre>
Then create the vdmk file using this command :

<pre class="terminal">VBoxManage internalcommands createrawvmdk -filename file.vdmk -rawdisk /dev/sda
</pre>
Where file.vdmk is the file that will be used to set up the virtual machine and /dev/sda your device, it can be an hard disk, usb drive and any other mass storage device.

If our command worked as well, we'll have a new file for example "file.vdmk".

Now you should set the file permissions, type into terminal :

<pre class="terminal">chmod 777 file.vdmk</pre>

At the end open VirtualBox, create a new virtual machine and set the file as master storage.

If you have a bootloader, you will choose the operating system as when you boot the device, in the case you need a bootloader you can use an Haiku's livecd adding it in VirtualBox and pressing shift or space to boot from another partition before the bootscreen.

This method is also useful when you have a BFS disk with a lot of files and you want to transfer it to your physical partition.

<strong>Note : </strong>the created file can be used as well with VMWare.

It's available an italian version of the tutorial at this <a href="http://www.haiku-it.org/wiki/doku.php?id=virtualizzare_una_partizione_fisica_di_haiku">link</a>.
Enjoy!