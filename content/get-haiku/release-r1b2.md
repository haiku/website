+++
type = "article"
title = "Get Haiku!"
date = "2018-09-28 20:38:42-04:00"
tags = []
draft = true
+++

<div class="box-release-info-right">
<p><strong>Current Official Version Information</strong></p>
<ul>
	<li><strong>Version:</strong> R1/beta2</li>
	<li><strong>Release date:</strong> September 28th, 2019 </li>
	<li><strong>Release notes:</strong> <a href="/get-haiku/release-notes/">Release notes.</a> </li>
	<li><strong>Computer platform:</strong> x86, 32-bit and 64-bit</li>
	<!--li><strong>Important:</strong> <a href="https://dev.haiku-os.org/wiki/R1/Beta2/ReleaseAddendum">Post Release Addendum</a></li-->
</ul>
</div>

<span style="font-size:1.1em;line-height:1.7em !important;margin-bottom:25px !important;">
Here you will find information on how to get Haiku, by either downloading
the latest official release. <!--or purchasing an installation CD from
Haiku, Inc. (not yet available). The proceeds from ordering CD's will be
used by Haiku, Inc. to help speed the release of Haiku R1.--> If you choose
to download an image, please select from the list of available mirrors
below.
</span> (If you are looking for the nightly images, they can be found at <a href="https://download.haiku-os.org">download.haiku-os.org</a>.)

These are `anyboot` images. They can be
written directly to a <a href="/guides/installing/making_haiku_usb_stick">USB flash drive</a>,
empty disk, or <a href="/get-haiku/burn-cd">written to DVD</a> media.
It can also be used directly from QEMU.
They can be used "live" or used to install Haiku to another disk/partition of your choice.

### Direct Download Locations

<p><strong>NOTE: Not all mirrors may be online. Please choose another mirror if you encounter a failure.</strong></p>

<div class="nolinks">
<table id="mirrors">
<thead style="font-weight: bold;">
<tr>
<td>Mirror</td>
<td>32-bit</td>
<td>64-bit</td>
</tr>
</thead>
<tbody>
    <tr class="odd">
      <td class="location"><b>Location:</b> East Coast, United States <br/>Provided by: <a target="_blank" class="ext" href="http://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta2/haiku-r1beta2-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr class="even">
      <td class="location"><b>Location:</b> Gunzenhausen, Germany <br/>Provided by: <a target="_blank" class="ext" href="http://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr class="odd">
      <td class="location"><b>Location:</b> Paris, France<br/>Provided by: <a target="_blank" class="ext" href="http://www.lip6.fr/" title="LIP6">LIP6</a></td>
      <td><a class="track" href="https://ftp.lip6.fr/pub/haiku/releases/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://ftp.lip6.fr/pub/haiku/releases/r1beta2/haiku-r1beta2-x86_64-anyboot.zip">zip</a></td>
    </tr>
</tbody>
</table>
</div>

### Torrents

<p>In order to assist with distribution, we have also created .torrent files that can be used to download and seed the release files for others.<br/>
<b>Please continue seeding the torrents if you can!</b></p>
<ul>
 <li><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip.torrent">32-bit</a></li>
 <li><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_64-anyboot.zip.torrent">64-bit</a></li>
</ul>

<h3>Checksums</h3>

<p>To make sure that you have got the right file and that it has not been corrupted during file transfer, it is always wise to ensure the integrity of your download. To that end, you can use the SHA256 checksums shown below to verify that what you have is the correct file.</p>

<pre>
LOLNOTACHECKSUM haiku-r1beta2-x86_64-anyboot.zip
LOLNOTACHECKSUM haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip
</pre>

<p>
	If you are in macOS or Linux, you can use the <code>sha256sum</code>
	command from the Terminal to generate a checksum for your downloaded
	file and verify against those above. If you are in Windows, you can use
	a tool such as hashtab to display checksums for files directly in explorer.
	<a href="http://implbits.com/products/hashtab/" title="Download hashtab">download from here</a>.
	</p>
	
<h3>After the Installation</h3>

<p>Once the installation has been complete, make sure that you get the latest bug fixes and new features by updating your system periodically. You can either use the "SoftwareUpdater" application, or use the `pkgman` command-line utility to keep your system up-to-date.</p>

<h3 class="App_People_32">Acknowledgment</h3>

<p style="padding-right:50px;">
	We thank all the organizations and companies who provide the server space
	and bandwidth to mirror our releases.
</p>

<!--
<img src="/files/images/logos/logo_all-download-mirrors.png" halign="center" />
-->
