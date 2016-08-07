+++
type = "blog"
author = "mmu_man"
title = "The return of the son of the demo CD"
date = "2008-03-04T02:13:06.000Z"
tags = ["obsolete"]
+++

<h3>Document Obsolete</h3>
<p><strong>2009-June: This document is now obsolete. We are in the process of consolidating and re-organizing the website documentation. For now please refer to <a href="http://svn.berlios.de/svnroot/repos/haiku/haiku/trunk/docs/userguide/en/installation/">one of these guides</a>. Alternatively, you can view the <a href="/node/2500">in-progress website documentation</a>.
</strong></p>
<br /><br /><br />

As everyone knows (or should), every BeOS install CD was actually a live CD (way before Linux "invented" it...). And of course so would be for Haiku.

While it used to work long ago, nobody actually tried to make one for some time, and some fixes were required to make it happen again.
Making an usable CD still requires some work (Bootscript.cd, ramdisk for settings maybe...), but it finally <a href="http://revolf.free.fr/beos/shots/shot_haiku_livecd_001.png">boots again</a>.
<!--break-->

One of the problems was a kernel argument that was passed as int32 and checked for as bool, obviously missing the int32 value.
The FloppyBootImage jam file I wrote also lacked the scsi_cd driver in the list of boot modules to be put into the gzipped tarball that goes on the floppy image. Since I used a copy-paste from the NetBootImage file I overlooked this.

It's still a bit early to distribute demo CDs, but just so you know when the time comes, let's see how to make one.

Creating a bootable CD requires burning 2 tracks on a single CD.
The first track is an El-Torito bootable ISO-9660 file-system containing a boot floppy image, and is created with:

<pre>jam -q haiku-boot-cd</pre>

This generates an image file named 'haiku-boot-cd.iso' in your output directory under 'generated/'.
The second track is the raw BFS image 'haiku.image' in 'generated/' created with:

<pre>jam -q haiku-image</pre>

Under Unix/Linux, and BeOS you can use cdrecord to create a CD with:

<pre>cdrecord dev=x,y,z -v -eject -dao -data generated/haiku-boot-cd.iso generated/haiku.image</pre>

Where x,y,z is the device number of your cd burner (get it with <code>cdrecord -scanbus</code>).

Windows users might have a look at the .cue files around used for BeOS distros, they should work as well for Haiku.