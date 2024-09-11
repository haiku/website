+++
type = "article"
title = "Get Haiku: R1/beta1"
date = "2018-09-28 20:38:42-04:00"
tags = []
+++

{{< alert-warning ""
"This page refers to an outdated release of Haiku. For information on more current releases, please visit [Get Haiku](/get-haiku/).">}}

<div class="box-release-info-right">
<p><strong>Current Official Version Information</strong></p>
<ul>
	<li><strong>Version:</strong> R1/beta1</li>
	<li><strong>Release date:</strong> September 28th, 2018 </li>
	<li><strong>Release notes:</strong> <a href="/get-haiku/r1beta1/release-notes/">Release notes.</a> </li>
	<li><strong>Computer platform:</strong> x86, 32-bit and 64-bit</li>
</ul>
</div>

(If you are looking for the nightly images, they can be found at <a href="https://download.haiku-os.org">download.haiku-os.org</a>.)

### Installation DVD

You can order the <i>32bit version</i> of Haiku as an installation DVD. Please read the post <a href="https://discuss.haiku-os.org/t/buy-now-haiku-dvd/7861">BUY NOW - Haiku DVD</a> for all details. You can pay more than the suggested 3 to 5 €, everything exceeding the costs will be used by Haiku, Inc. to help speed up the release of Haiku R1.

### Download a Haiku Image

Actually, you download a ZIP archive that you'll have to unpack to get a ReadMe text file and the Haiku image.

These are `anyboot` images. They can be written directly to a <a href="/guides/installing/making_haiku_usb_stick">USB flash drive</a>, empty disk, or <a href="/get-haiku/burn-cd">written to DVD</a> media.<br />
The images can be used "live" or used to install Haiku to another disk/partition of your choice.<br />
They can also be used directly from QEMU or installed in a <a href="/guides/virtualizing">virtual machine</a>.

### Direct Download Locations

If you choose to download an image, please select from the list of available mirrors below. Mirrors are in no specific order.
<p><strong>NOTE: Not all mirrors may be online. Please choose another mirror if you encounter a failure.</strong></p>

<div class="nolinks">
<table id="mirrors" class="table thead-dark table-hover">
<thead style="font-weight: bold;">
<tr>
<td>Mirror</td>
<td title="BeOS API + binary compatible">32-bit</td>
<td title="BeOS API compatible">64-bit</td>
</tr>
</thead>
<tbody>
    <tr>
      <td class="location"><b>Location:</b> East Coast, United States <br/>Provided by: <a target="_blank" class="ext" href="http://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta1/haiku-r1beta1-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr>
      <td class="location"><b>Location:</b> Paris, France<br/>Provided by: <a target="_blank" class="ext" href="http://www.lip6.fr/" title="LIP6">Laboratoire d'Informatique de Paris 6</a></td>
      <td><a class="track" href="https://ftp.lip6.fr/pub/haiku/releases/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://ftp.lip6.fr/pub/haiku/releases/r1beta1/haiku-r1beta1-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr>
      <td class="location"><b>Location:</b> New York, United States <br/>Provided by: <a target="_blank" class="ext" href="http://www.rit.edu" title="RIT">Rochester Institute of Technology</a></td>
      <td><a class="track" href="http://mirror.rit.edu/haiku/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="http://mirror.rit.edu/haiku/r1beta1/haiku-r1beta1-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr>
      <td class="location"><b>Location:</b> Oregon, United States <br/>Provided by: <a target="_blank" class="ext" href="http://www.osuosl.org" title="OSUOSL">Oregon State University</a></td>
      <td><a class="track" href="https://ftp.osuosl.org/pub/haiku/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://ftp.osuosl.org/pub/haiku/r1beta1/haiku-r1beta1-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr>
      <td class="location"><b>Location:</b> Stockholm, Sweden <br/>Provided by: <a target="_blank" class="ext" href="http://www.tnonline.net" title="tnonline.net">tnonline.net</a></td>
      <td><a class="track" href="https://mirrors.tnonline.net/haiku/haiku-release/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://mirrors.tnonline.net/haiku/haiku-release/r1beta1/haiku-r1beta1-x86_64-anyboot.zip">zip</a></td>
    </tr>
</tbody>
</table>
</div>

### Torrents

<p>In order to assist with distribution, we have also created .torrent files that can be used to download and seed the release files for others.<br/>
<b>Please continue seeding the torrents if you can!</b></p>
<ul>
 <li><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta1/haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip.torrent">32-bit</a></li>
 <li><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta1/haiku-r1beta1-x86_64-anyboot.zip.torrent">64-bit</a></li>
</ul>

<h3>Checksums</h3>

<p>To make sure that you have got the right file and that it has not been corrupted during file transfer, it is always wise to ensure the integrity of your download. To that end, you can use the SHA256 checksums shown below to verify that what you have is the correct file.</p>

<pre>
297b1410dfd74f1a404c1d2d0e62beaee77ecde7711a71156e15f8d33f2899ed haiku-r1beta1-x86_64-anyboot.zip
142fa9341a360029115658cd81c96a134dc54cebbae85faf1c07e3ba6f33b812 haiku-r1beta1-x86_gcc2_hybrid-anyboot.zip
</pre>

<p>
	If you are in macOS or Linux, you can use the <code>sha256sum</code>
	command from the Terminal to generate a checksum for your downloaded
	file and verify against those above. If you are in Windows, you can use
	a tool such as hashtab to display checksums for files directly in explorer.
	<a href="http://implbits.com/products/hashtab/" title="Download hashtab">download from here</a>.
	</p>

<h3 class="App_People_32">Acknowledgment</h3>

<p style="padding-right:50px;">
	We thank all the organizations and companies who provide the server space
	and bandwidth to mirror our releases.<br />
	Thanks to PulkoMandy and Naria for handling everything needed to get R1Beta1 DVDs to our users.
</p>

<!--
<img src="/files/images/logos/logo_all-download-mirrors.png" halign="center" />
-->
