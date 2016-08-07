+++
type = "article"
title = "Configuring GRUB"
date = "2010-03-08T19:02:09.000Z"
tags = []
+++

Booting Haiku alongside your other operating systems is easy.

<h3>GRUB</h3>
<p><a href='http://www.gnu.org/software/grub/grub.en.html' target='_BLANK'>GRUB</a> (GRand Unified Bootloader) is an open source and extremely flexible boot manager commonly used to boot Linux systems.

<div class="alert alert-info">Starting with <span class="app">os-prober v1.44</span> (e.g. in Ubuntu 11.04 or later), Haiku should be recognized out of the box. Just run <span class="cli">sudo update-grub</span> to add Haiku to the GRUB menu.<br><b>WARNING: Package Management versions of Haiku are not detected yet.</b></div><p>

<h4>GRUB 2 (version 1.96 and higher)</h4>
<p>
In the example below we will have the following setup:

hd0   -- <MBR, GRUB> first hard drive
hd0,1 -- first partition of first drive (sda1) Ubuntu Linux /
hd0,2 -- second partition of first drive (sda2) Ubuntu Linux Swap
hd0,3 -- <Haiku boot sector> third partition of first drive (sda3) Haiku partition

Adding Haiku to your <a href='http://www.gnu.org/software/grub/manual/' target='_BLANK'>GRUB 2</a> boot loader is as simple as adding a section to the files used to auto-generate your GRUB 2 menu configuration.

If you previously had only one operating system installed on your computer, GRUB 2 may be configured to wait for the Shift key to be pressed while booting, otherwise no boot menu may be displayed at all, since Haiku is not automatically recognized as a bootable operating system. To force GRUB 2 to always display the selection menu, and to add the Haiku entry in such a way that it will not be removed when the GRUB 2 configuration file is regenerated, perform the following steps:

<ul>
<li>Edit /etc/default/grub and make sure the line "GRUB_HIDDEN_TIMEOUT=0" is commented out.</li>
<li>Edit /etc/grub.d/40_custom and add the following entry:</li>
</ul>

<pre>menuentry "Haiku R1A2" {
set root=(hd0,3)
chainloader +1
}</pre>

Of course the partition in the entry (hd0,3) needs to point to the one where you actually installed Haiku. Now you can regenerate the boot menu configuration by issuing the command:

<pre>sudo update-grub</pre>
</p>

<h4>GRUB Legacy (version 0.97 and earlier)</h4>
<p>
GRUB Legacy differs in the numbering of the partitions compared to GRUB 2, starting at 0 instead of 1. The example below shows the naming scheme for GRUB Legacy:

hd0   -- <MBR, GRUB> first hard drive
hd0,0 -- first partition of first drive (sda1) Ubuntu Linux /
hd0,1 -- second partition of first drive (sda2) Ubuntu Linux Swap
hd0,2 -- <Haiku boot sector> third partition of first drive (sda3) Haiku partition

Adding Haiku to your <a href='http://www.gnu.org/software/grub/grub-legacy.en.html' target='_BLANK'>GRUB Legacy</a> boot loader is as simple as adding a new section to your GRUB menu configuration. After installing Haiku, you will need to boot into your Linux operating system and add the following block of code to your /boot/grub/menu.lst (your mileage may vary, this is the default location however).

<pre># for Haiku
title Haiku R1A2
root (hd0,2)
chainloader +1</pre>

</p>