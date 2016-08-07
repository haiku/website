+++
type = "article"
title = "--use-xattr"
date = "2010-02-15T23:19:09.000Z"
tags = []
+++

<p>
Due to the various ways that xattr is implemented in the various file systems, some will present issues that need to be considered and others will simply be unusable. This page aims to clarify which file systems are capable of being utilized by the --use-xattr option when building Haiku.  Please keep in mind that best results are generally obtained by using a filesystem natively, as compared to using it via a userland implementation like FUSE.   All filesystems listed below are assumed to be utilized natively, unless otherwise noted.
</p>

<h3>Known Working File systems</h3>
This is an incomplete list of file systems whose implementation of xattr is known to work with Haiku's build system.
<ul>
<li><h4>JFS</h4>(Note: JFS may exhibit instability and out-of-memory errors when --use-xattr is utilized.)</li>

<li><h4>NTFS (via NTFS-3G)</h4></li>
<li><h4>ReiserFS v3</h4></li>
<li><h4>Reiser4</h4></li>
<li><h4>UFS2</h4></li>
<li><h4>XFS</h4></li>
<li><h4>ZFS</h4></li>
</ul>

<h3>Unconfirmed File systems</h3>
<p>
According to this page on Wikipedia, <a href="http://en.wikipedia.org/wiki/Extended_file_attributes">Extended file attributes</a>, the following file systems support xattr. However, it is not confirmed if their xattr functionality can be used by Haiku's build system.
</p>
<p>
Note that the amount of data stored in attributes may be limited by the used file system.  Any filesystem which stores attributes in hidden files should be fine.
</p>
<ul>
<li><h4>UFS1</h4></li>
</ul>

<h3>Troublesome File systems</h3>
These file systems cannot be used with the --use-xattr option.
<ul>
<li><h4>Btrfs</h4>
<p>Building Haiku on Btrfs with extended attributes does not work.  Utilizing it will give an error like the following, which was encountered when building Poorman.</p>
<p><em>mimeset: "/btrfs/haiku/haiku/generated.x86gcc2/objects/haiku/x86/release/apps/poorman/PoorMan": No space left on device</em>
</p>
<p>Btrfs will need to be explored again in the future as it matures, since currently it is still a fairly young filesystem.</p>
</li>
<li><h4>Ext2, Ext3, Ext4</h4>
<p>Ext has a limit of one block, which is typically 4KB for reasonably large volumes. Since all attributes of a file need to be stored in this single block, it often is not large enough. Specifically, Expander is one application that is known to fail compiling when the block size is 4KB or smaller.
</p>
<p>
&lt;mmu_man&gt; it fails here on ext3 on Expander IIRC, which has many supported types = too large xattr <b>& you need to explicitly enable it in fstab</b>
</p>
</li>
<li><h4>HFS+ (case sensitive)</h4>
<p>HFS+ fails just like Btrfs does, with a nearly identical error message.</p>
<p><em>mimeset: "generated/objects/haiku/x86/release/apps/poorman/PoorMan": Argument list too long</em></p>
</li>
</ul>


<h3>Some Notes</h3>
<ul>
<li><h4>How can you check for xattr support?</h4>
<p>
There are command line tools for setting/getting attributes. You can just
try them on a file:
<pre>
    touch tt
    setfattr -n "user.testAttr" -v "attribute value" tt
    getfattr -n "user.testAttr" tt
</pre>
If they fail, you can check, whether your FS is mounted with xattrs enabled.
"mount" should list "user_xattr" as mount option for your FS. 

If it doesn't you can try adding it in your /etc/fstab. After that it might still not
work, which probably means that the kernel has been compiled with that feature disabled.
<a href="http://www.freelists.org/post/haiku-development/Problem-generating-Haiku-VMWare-image,6">Problem generating Haiku VMWare image</a> mailing list thread.
</p>

<p>On some Linux distributions (Debian Lenny for example), you may also need to install the attr and attr-dev packages first:</p>

<pre>
sudo apt-get install attr attr-dev
</pre>

</li>

<li><h4>How can you check the block size of an (ext3) partition?</h4>
Some Linux or BSD based distributions include `tune2fs`
<pre>
    tune2fs -l /dev/...
</pre>
</li>

<li>
<p>
This <a href="http://www.freelists.org/post/haiku-development/Problem-generating-Haiku-VMWare-image,7"> mailing list reply</a> seems to have better information.</br>
You can check the xattr support on your partition with
<pre>
    mount | grep devicename
</pre>
where "devicename" is the device of the partition you want to check. For example, on a Gentoo box checking hda2 you may get:
<pre>
    /dev/hda2 on /home type ext3 (rw,noatime,user_xattr)
</pre>
and you can see xattr support is enabled here.

If you need to enable xattr on your partition you just need to remount it with:
<pre>
    sudo mount -o remount -o user_xattr devicename
</pre>
and if you want to enable xattr at the next boot edit /etc/fstab at the line of devicename. It would look something like this:
<pre>
/dev/hda2       /home   ext3    noatime,user_xattr      0 3
</pre>
</p>
</li>

<li><h4>What does the build system do when --use-xattr isn't used?</h4>
<p>
Under BeOS incompatible platforms that cannot make use of xattr, the build system is restricted to the generic attribute emulation (using separate files). This is likely slower and also requires you to <a href="/guides/building/jam#emulated_attributes">clean up the $(HAIKU_OUTPUT_DIR)/generated/attributes directory</a> from time to time. If you're only doing full builds that doesn't matter at all, since you would delete the generated/{attributes,objects,tmp} directories before a build anyway. 
<a href="http://www.freelists.org/post/haiku/buildmirrortorrent-host,1"> build/mirror/torrent host</a> mailing list thread.
</p>
</li>

<li>
<p>From <a href="http://dev.haiku-os.org/ticket/2772#comment:1">Ticket #2772</a>,
Attribute mixups are known to happen when building without xattr support (i.e. configuring without --use-xattr) and when not building from the scratch (i.e. after deleting generated/objects and generated/attributes).
</p>
</li>

<li><h4>The alternative --use-xattr-ref</h4>
<p>As of hrev46113 (the package management merge) the alternative option --use-xattr-ref is available. It uses the generic attribute emulation mechanism, but tags files that have attributes with a single unique ID xattr attribute that references the corresponding separate attribute files. This prevents the attribute mix-ups the generic attribute emulation suffers from. The option requires working xattr support, but it can be used with file systems that have a per-file attribute size limit, like ext4.
</p>
</li>

</ul>