+++
type = "article"
title = "Get Haiku!"
date = "2022-12-23 00:00:00Z"
tags = []
+++

{{< alert-donate >}}

<div class="box-release-info-right">
<p><strong>Current version information:</strong></p>
<ul>
	<li><strong>Version:</strong> R1/beta4</li>
	<li><strong>Release date:</strong> December 23, 2022</li>
	<li><strong><a href="/get-haiku/r1beta4/release-notes/">Release notes</a></strong></li>
	<li><strong>Supported platforms:</strong> x86, 32-bit and 64-bit</li>
</ul>
</div>

<!--
Disabled until we move away from R1/beta4
{{< alert-info "Nightly Images" "Looking for the Nightly Images? They can be found at download.haiku-os.org.">}}
-->

## Download a Haiku Image

<i>If you have an earlier version of Haiku installed, [see upgrade instructions below](#upgrading-from-r1beta3).</i>

<p>The provided images can be written directly to a <a href="/guides/installing/making_haiku_usb_stick">USB flash drive</a>, an empty disk, or <a href="/get-haiku/burn-cd">written to DVD</a> media.<br /> You can boot directly from your chosen physical media and try out Haiku without needing to install it.</p>
The images can be used "live" or used to install Haiku to another disk/partition of your choice.<br />
<p>
They can also be used in <a href="/guides/virtualizing">virtual machines</a> such as QEMU, VMWare or VirtualBox.
</p>

### Direct Download Locations

If you choose to download an image, please select from the list of available mirrors below. Mirrors are in no specific order.

{{< alert-info "Not all mirrors may be online" "Please choose another mirror if you encounter a failure. It is recommended you choose the mirror closest to your geographical location.">}}

<div class="nolinks">
<table id="mirrors" class="table table-hover">
<thead style="font-weight: bold;">
<tr>
<td>Mirror</td>
<td title="BeOS API + binary compatible">32-bit</td>
<td title="BeOS API compatible">64-bit</td>
</tr>
</thead>
<tbody>
    <tr class="link">
      <td class="location"><b>Location:</b> New York, United States <br/>Provided by: <a target="_blank" class="ext" href="http://www.rit.edu" title="RIT">Rochester Institute of Technology</a></td>
      <td><a class="track" href="http://mirror.rit.edu/haiku/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="http://mirror.rit.edu/haiku/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> Oregon, United States <br/>Provided by: <a target="_blank" class="ext" href="http://www.osuosl.org" title="OSUOSL">Oregon State University</a></td>
      <td><a class="track" href="https://ftp.osuosl.org/pub/haiku/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://ftp.osuosl.org/pub/haiku/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> North Virginia, United States<br/>Provided by: <a target="_blank" class="ext" href="https://haiku-inc.org" title="Haiku, Inc.">Haiku, Inc.</a></td>
      <td><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> Stockholm, Sweden <br/>Provided by: <a target="_blank" class="ext" href="http://www.tnonline.net" title="tnonline.net">tnonline.net</a></td>
      <td><a class="track" href="https://mirrors.tnonline.net/haiku/haiku-release/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://mirrors.tnonline.net/haiku/haiku-release/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> Chicago, United States (IPFS) <br/>Provided by: <a target="_blank" class="ext" href="http://www.cloudflare-ipfs.com" title="cloudflare-ipfs.com">cloudflare-ipfs.com</a></td>
      <td><a class="track" href="https://cloudflare-ipfs.com/ipns/hpkg.haiku-os.org/release/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://cloudflare-ipfs.com/ipns/hpkg.haiku-os.org/release/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> Australia <br/>Provided by: <a target="_blank" class="ext" href="AARNet" title="https://aarnet.edu.au">aarnet.edu.au</a></td>
      <td><a class="track" href="https://mirror.aarnet.edu.au/pub/haiku/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://mirror.aarnet.edu.au/pub/haiku/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
    <tr class="link">
      <td class="location"><b>Location:</b> Kemerovo Oblast, Russia <br/>Provided by: <a target="_blank" class="ext" href="http://www.truenetwork.ru" title="truenetwork.ru">truenetwork.ru</a></td>
      <td><a class="track" href="https://mirror.truenetwork.ru/haiku/release/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso">iso</a></td>
      <td><a class="track" href="https://mirror.truenetwork.ru/haiku/release/r1beta4/haiku-r1beta4-x86_64-anyboot.iso">iso</a></td>
    </tr>
</tbody>
</table>
</div>

### Torrents

<p>In order to assist with distribution, we have also created .torrent files that can be used to download and seed the release files for others.<br/>
<b>Please continue seeding the torrents if you can!</b></p>
<ul>
 <li><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_gcc2h.torrent">32-bit Torrent</a></li>
 <li><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_64.torrent">64-bit Torrent</a></li>
</ul>

### Checksums

<p>To make sure that you have got the right file and that it has not been corrupted during file transfer, it is always wise to ensure the integrity of your download. To that end, you can use the SHA256 checksums shown below to verify that what you have is the correct file.</p>

<pre>
6e4b33045a0c36efb2b8fe758ef3550bf87298a0c5a7c2fbdf4b155e19397ac7  haiku-r1beta4-x86_64-anyboot.iso
c184e609a6c0021f9acd2df9fc111c2e12d01107d01f943fbea66c936b063f88  haiku-r1beta4-x86_gcc2h-anyboot.iso
</pre>

<p>
	If you are in Haiku or Linux, you can use the <code>sha256sum</code>
	command from the Terminal to generate a checksum for your downloaded
	file and verify against those above. If you are in macOS, you can use
	the <code>shasum -a 256</code> command. If you are in Windows, you can use
	the shell command <code>certutil -hashfile</code> on the ISO file.
</p>

### Cryptographic Signatures

<p>
To further validate releases, you can also check the cryptographic signature of the release media against our public key using <a href="https://jedisct1.github.io/minisign/">Minisign</a> (available for Haiku, Windows, Linux, BSD, and OS X). The matching .minisig file needs to be placed next to the iso file on your filesystem.
</p>

<ul>
  <li><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_gcc2h-anyboot.iso.minisig">32-bit minisig</a></li>
  <li><a class="track" href="https://s3.us-east-1.wasabisys.com/haiku-release/r1beta4/haiku-r1beta4-x86_64-anyboot.iso.minisig">64-bit minisig</a></li>
</ul>

{{< alert-info "Haiku signing key" "Haiku's public signing key is also available at /boot/system/data/trust_db/haiku-2019.pub under recent versions of Haiku." >}}

```shell script
$ ls
haiku-r1beta4-x86_64-anyboot.iso
haiku-r1beta4-x86_64-anyboot.iso.minisig

$ minisign -Vm haiku-r1beta4-x86_64-anyboot.iso -P RWTPfbfFRi5b+T02aw733p5dp/UI/1Z946YWBInmkPmBlx2Zy1Vyw9kP
Signature and comment signature verified
Trusted comment: timestamp:1671733559	file:haiku-r1beta4-x86_64-anyboot.iso	hashed
```

## Upgrading from R1/beta3

There is an upgrade path available for users that are currently using Haiku R1/beta3. If you want to do this upgrade, you will have to use the Terminal to issue some commmands. To do so,

{{< alert-warning "Warning: only upgrading from Beta 3 is supported!" "It may be possible to upgrade from prior development images, but this is untested and you may run into unknown problems." >}}

The following commands will replace your existing "Haiku" and "HaikuPorts" repositories with their R1/beta3 equivalents:

```shell script
pkgman add-repo https://eu.hpkg.haiku-os.org/haiku/r1beta4/$(getarch)/current
pkgman add-repo https://eu.hpkg.haiku-os.org/haikuports/r1beta4/$(getarch)/current
```

If this is successful, you may then run a `full-sync` to perform the actual upgrade:

```shell script
pkgman full-sync
```

After that step has completed successfully, you should immediately reboot the system. You can do this from the Deskbar, or by running ```shutdown -r``` in Terminal.

### Acknowledgments

We thank all the individuals, organizations and companies who make it possible for the Haiku project to continue its development over the years, including:

 * generously providing the server space and bandwidth to mirror our releases;
 * donating to Haiku Inc. to allow a developer to work on Haiku, pay for our infrastruture hosting costs, and our real-life events like coding sprints;
 * or contributing in any other ways to the testing, advertising and development of Haiku.

Your help is very much appreciated!

If you are interested in mirroring our releases, Nightly builds or HaikuDepot packages, please don't hesitate to drop us a line on the <a href="https://discuss.haiku-os.org">forums</a>, or through our <a href="https://www.freelists.org/list/haiku">mailing list.
