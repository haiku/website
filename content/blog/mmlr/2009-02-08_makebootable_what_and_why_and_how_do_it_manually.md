+++
type = "blog"
author = "mmlr"
title = "makebootable - What and why and how to do it manually"
date = "2009-02-08T16:12:54.000Z"
tags = ["makebootable"]
+++

			<p>
				Usual question: "I've dd'ed the image to somewhere and now it doesn't boot". Usual advice: "You have to make it bootable by using makebootable". Usual reaction: "Ehm, ok how do I do that?". Since this type of question comes up quite frequently, let me try to explain a bit of background on that pseudo-mystical tool "makebootable", how you can get it and how you can manually make a partition bootable without even needing makebootable.
			</p>
			<h3>The Stage 1 Bootloader</h3>
			<p>
				Ok, what we are really talking about here is the stage 1 bootloader. It is a tiny bit of software that is written to the start of a partition or disk. It is where either the BIOS or the boot manager will jump to to get the OS booted. In the case of Haiku this stage 1 bootloader loads a bit of the BFS partition the installation is on and locates /beos/system/zbeos. zbeos is the stage 2 bootloader, which provides the boot menu and loads the kernel. In the case of a missing makebootable we never get to that stage 2 bootloader.
			</p>
			<p>
				If you want to look at it from the code side you should check out "src/system/boot/platform/bios_ia32/stage1.S". It's nicely commented and pretty straight forward to follow. But let me just explain the rough outline:
			</p>
			<ul style="list-style-type: none;">
				<li>1. Set up a few basics, clear registers and store the drive id</li>
				<li>2. Check if we have disk extension provided by the BIOS</li>
				<li>3. Load the rest of the stage 1 bootloader</li>
				<li>4. Validate the BFS superblock</li>
				<li>5. Search the stage 2 bootloader on disk</li>
				<li>6. Load the stage 2 bootloader into memory</li>
				<li>7. Run the stage 2 bootloader</li>
			</ul>
			<p>
				When we enter the stage 1 bootloader we have the following available: the first block of the stage 1 bootloader, so the first 512 bytes. What we do from there is execute steps 1-3. Even though the stage 1 bootloader is only a tiny bit of software, it's not tiny enough to fit completely into one 512 byte block. That's why it is split across the first and second block of a partition (with the BFS superblock sandwiched between the two parts at the start of the second block).
			</p>
			<p>
				Where we fail with a missing makebootable is step 3. This is the first time we need to load something from disk. To do that we use the BIOS disk services that provide us with a simple interface to load stuff from disk into memory. We are always accessing the disk here, and not the partition. This means, when we want to load the second part of the stage 1 bootloader, we need to instruct the BIOS to load the block "where we are" + 1. And that's exactly the important part here "where we are", i.e. where the first part of the stage 1 bootloader is. The thing is, we do not know where the first part of the stage 1 bootloader is on disk. We don't know the needed offset to get from the start of the disk to the partition we are booting from. Therefore we can't calculate the location of the second block and subsequently the location of the BFS structures.
			</p>
			<p>
				So how do we get to know that offset? Simple: it is written into the stage 1 bootloader using makebootable. The only thing makebootable does is to find exactly that partition offset and write it into the bootloader at a specific place (bytes 506-510 to be exact), so that the first part of the stage 1 bootloader is able to calculate the correct offsets into the disk.
			</p>
			<p>
				When you start out with a normal Haiku disk image, the offset is simply initialized to 0. With that background you should now be able to understand why it works to dd a raw image to a raw device and get it booted. It works because if you write the image at offset 0, this is the same offset that is present in the image. If you write it to somewhere else, i.e. you write the image to a partition instead, meaning the disk offset is not 0, the stage 1 bootloader will still try to read from offset 0 + 1, because that's what is written into the bootloader. So this won't boot.
			</p>
			<h3>The makebootable Tool</h3>
			<p>
				As mentioned the purpose of makebootable is to write a stage 1 bootloader to a partition and supply it with the correct partition offset. The problem makebootable has to solve is to be available on different platforms and be compatible with the different ways of finding the partition offset. Each OS has its own API for that, that's why makebootable has to be explicitly ported to make writing directly to a partition work. So far it's been ported to linux, FreeBSD, Darwin and of course BeOS and Haiku. On unsupported platforms (like on Windows or Solaris for example) you therefore can't use makebootable to do it automatically for you.
			</p>
			<p>
				On supported platforms however you can build makebootable using the command "jam run :\&lt;build\&gt;makebootable /dev/sdc4". This will build and run makebootable for your host platform, giving it the partition you want to make bootable ("/dev/sdc4" for example). This will output the partition offset that is written to the stage 1 bootloader.
			</p>
			<p>
				Note that if you have a BeOS or Haiku installation you can use makebootable from there. The BeOS stage 1 bootloader is a bit different, but it's compatible with the Haiku stage 1 bootloader, as it loads the stage 2 from /beos/system/zbeos as well. So on these platforms just run "makebootable /dev/disk/...". You can run makebootable with a path of a mounted volume as well, so if you mounted the target partition at "/HaikuStick" you can as well do "makebootable /HaikuStick".
			</p>
			<a name="manually"></a>
			<h3>If You Can't Use makebootable</h3>
			<p>
				If you can't use, or don't want to use makebootable, you can of course do the partition offset thing manually. For example if you are on Windows and want to make the second partition of your USB drive where you dd'ed the image to bootable. What you need for that is a hex editor. If you can get one where you can access the raw disk directly that's the best situation, otherwise you have a few steps more.
			</p>
			<p>
				The first step is to find out what the partition offset in blocks is. If you have some tool to get that information from, get it from there. You either need the offset in 512 byte blocks or the offset in bytes and then divide that by 512. If you don't have a tool that can display the offset, you should be able to read it from the partition table in the master boot record (MBR). If you have a hex editor allowing you to access the raw device at offset 0 (where the MBR is located) point it there. If not, use dd to read the MBR into a file (something along "dd if=/dev/sdc of=mymbr.bin bs=512 count=1" in case of Windows take the "Partition0" thing, they really mean raw device by partition 0) and open that in the hex editor. Now when you're looking at that MBR you gather the partition offset from the partition table. The layout is documented for example at <a href="http://en.wikipedia.org/wiki/Master_boot_record">Wikipedia</a>, but since that is a lot of info for a small task, let me explain that the partition table starts at offset 446 (0x1be) and has 4 entries of 16 bytes. Each entry being:
			</p>
			<ul style="list-style-type: none;">
				<li>1. Active flag (1 byte, 0x80 = active 0x00 = not active)</li>
				<li>2. Start offset in cylinder/heads/sectors (CHS) format (3 bytes)</li>
				<li>3. Partition type (1 byte, 0xeb for BFS, but it doesn't really matter)</li>
				<li>4. End offset in CHS format (3 bytes)</li>
				<li>5. Start offset in logical block address (LBA) format (4 bytes)</li>
				<li>6. Partition length in blocks (4 bytes)</li>
			</ul>
			<p>
				What we need from that is the partition start offset in blocks. This is exactly what field 5 holds for us. Note that this is a little endian 32 bit integer, but as the format is the same in the stage 1 bootloader it doesn't matter at all. Just note down that number for the partition you want to make bootable. The direct offsets to those numbers are 454, 470, 486 and 502 for primary partitions 1, 2, 3 and 4 respectively. If you're doing logical partitions here, you'll have to figure out how to get that offset yourself, sorry.
			</p>
			<p>
				When you finally have that offset, you can either patch it directly on the partition if you have a hex editor that allows that or you simply patch it in the haiku image you started with and afterwards dd it to your partition again. In any case you point the hex editor to the first block of the stage 1 bootloader (the first block in the image file or on the partition) and write down the partition offset number at offset 506, just so that you don't touch the 0x55 0xaa at the very end of that block. If you have the partition offset as a number read from a tool, convert it to hex and write it there as a 32 bit little endian integer (i.e. reversed so an offset of 0x01020304 would result in the bytes 0x04 0x03 0x02 0x01 at offset 506). Just to explain it a bit more graphically here's a screenshot of DiskProbe under Haiku with the two relevant parts selected. On the left the MBR and on the right the partition with the same offset.
				<a href="/files/screenshots/manual_makebootable.preview.png"><img src="/files/screenshots/manual_makebootable.thumbnail.png" alt="manual makebootable" title="manual makebootable" class="image thumbnail" height="100" width="200"></a><span class="caption" style="width: 198px;"><strong>manual makebootable</strong></span>
			</p>
