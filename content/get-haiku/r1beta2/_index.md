+++
type = "article"
title = "Get Haiku!"
date = "2020-06-09 00:00:00Z"
tags = []
+++

<div class="alert alert-info">
Haiku is developed by a small group of volunteers. To help with development and bandwidth costs, please consider <a href="https://www.haiku-inc.org/donate/">donating</a> a small amount. We rely on your support to carry Haiku into the future.
</div>

<div class="box-release-info-right">
<p><strong>Current Official Version Information</strong></p>
<ul>
	<li><strong>Version:</strong> R1/beta2</li>
	<li><strong>Release date:</strong> June 9th, 2020 </li>
	<li><strong><a href="/get-haiku/r1beta2/release-notes/">Release notes.</a></strong></li>
	<li><strong>Computer platform:</strong> x86, 32-bit and 64-bit</li>
</ul>
</div>

(If you are looking for the nightly images, they can be found at <a href="https://download.haiku-os.org">download.haiku-os.org</a>.)

## Upgrading from R1/beta1

There is an upgrade path available for users that are currently using Haiku R1/beta1. If you want to do this upgrade, you will have to use the Terminal (not SoftwareUpdater!) to issue some commmands.

*Warning: only upgrading from Beta 1 is supported. It may be possible to upgrade from prior development images, but this is untested and you may run into unknown problems.*

The following commands will replace your existing "Haiku" and "HaikuPorts" repositories with their R1/beta2 equivalents:

```shell script
pkgman add-repo https://eu.hpkg.haiku-os.org/haiku/r1beta2/$(getarch)/current
pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/r1beta2/$(getarch)/current
```

If this is successful, you may then run a `full-sync` to perform the actual upgrade:

```shell script
pkgman full-sync
```

After that step has completed succesfully, you should immediately reboot the system. You can do this from the Deskbar, or by running ```shutdown -r``` in Terminal.

### Download a Haiku Image

The provided images are in our `anyboot` format. They can be written directly to a <a href="/guides/installing/making_haiku_usb_stick">USB flash drive</a>, an empty disk, or <a href="/get-haiku/burn-cd">written to DVD</a> media.<br />
The images can be used "live" or used to install Haiku to another disk/partition of your choice.<br />
They can also be used directly from QEMU or installed in other <a href="/guides/virtualizing">virtual machines</a>.

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
      <td class="location"><b>Location:</b> East Coast, United States <br/>Provided by: <a target="_blank" class="ext" href="https://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://s3.wasabisys.com/haiku-release/r1beta2/haiku-r1beta2-x86_64-anyboot.zip">zip</a></td>
    </tr>
    <tr>
      <td class="location"><b>Location:</b> Amsterdam, Netherlands <br/>Provided by: <a target="_blank" class="ext" href="https://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip">zip</a></td>
      <td><a class="track" href="https://cdn.haiku-os.org/haiku-release/r1beta2/haiku-r1beta2-x86_64-anyboot.zip">zip</a></td>
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
FIXME haiku-r1beta2-x86_64-anyboot.zip
FIXME haiku-r1beta2-x86_gcc2_hybrid-anyboot.zip
</pre>

<p>
	If you are in Haiku, macOS or Linux, you can use the <code>sha256sum</code>
	command from the Terminal to generate a checksum for your downloaded
	file and verify against those above. If you are in Windows, you can use
	a tool such as hashtab to display checksums for files directly in explorer.
	<a href="http://implbits.com/products/hashtab/" title="Download hashtab">download from here</a>.
	</p>

<h3 class="App_People_32">Acknowledgment</h3>

<p style="padding-right:50px;">
	We thank all the organizations and companies who provide the server space
	and bandwidth to mirror our releases.<br />
</p>
