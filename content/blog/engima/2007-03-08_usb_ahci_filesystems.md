+++
type = "blog"
author = "engima"
title = "Haiku SVN: USB, AHCI, Filesystems"
date = "2007-03-08T13:02:16.000Z"
tags = ["usb", "AHCI", "NetPositive", "NTFS", "NFS", "GoogleFS"]
+++

<h3>Quick Updates</h3>
<em>r19800-r19900</em>
<ul>
<li>Beginnings of AHCI support</li>
<li>Hardware cache flush for SCSI</li>
<li>Stability fixes for the USB stack</li>
<li>Port of the following filesystems
<ul><li>GoogleFS</li>
<li>NFS</li>
<li>NTFS</li>
</ul>
</ul>
<!--break-->
<h3>Full Updates</h3>
<p>After a few minor fixes NetPositive shows the first sign of (networked) life under Haiku. Followed by performance fixes, caching referenced modules for example, IPv4 and ICMP should have gained some speed. All this can be experienced now that the NetServer is started on boot.</p>

<p>Owners of SATA disks will be shaking Marcus' hand after he started work on the ACHI module. Now present in the default image, it should be able to detect devices. In other bus related news, BGA has committed hardware flush for SCSI devices based on his previous yellowTab work.</p>

<p>After a large collection of fixes to the USB stack from Michael Lotz users should find it substantially more stable. It should no longer crash on disconnect and replugging a device should be noticed by all drivers.</p>

<p>'The mighty GoogleFS' which some will remember from BeOS has been ported to Haiku. Allowing the normal filesystem queries to query over Google, there should be a number of funky apps coming from this. See <a href="http://blubinc.net/revision/show/19874">r19874</a>.</p>

<p>In other filesystem news the venerable nfs has been ported to Haiku. While mount support is not quite there yet it is being actively developed and should not be far away.</p>

<p>Lastly, yet another filesystem has been ported. This time the NTFS implementation 'ntfs-3g' thanks to Troeglazov Gerasim. Thanks to his work we have read support for our Windows disks (Currently write support is disabled for safety reasons. If you feel adventurous and have backups though ...)</p>