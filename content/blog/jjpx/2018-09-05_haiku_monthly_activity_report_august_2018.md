+++
type = "blog"
title = "Haiku monthly activity report - 08/2018"
author = "jjpx"
date = "2018-09-05 16:37:40-03:00"
tags = []
+++

Time has come and a new monthly activity report arrived with it. It is the first time I write something this long in english. Enjoy!

This report covers hrev52141-52310.

### Drivers

Now that GSoC is over [krish_iyer's](https://www.haiku-os.org/blog/krish_iyer) SDHCI MMC driver has been merged in master. There is still a lot of work to do and it is not enabled in automated builds yet, but should serve as a basis for any future related work. His commits include extensive documentation on how to setup a testing vm, what has been done and what is left to do.

There have been several contributions to the ARM port including work by kallisti5 on our implementation fo Flattened Device Tree (FDT) that should make it easier for Haiku to be run on more ARM hardware variants and a rewrite of the memcpy function for ARM devices by Augustin Cavalier based on Clang 8.

Finally on the driver related news korli fixed a bug on the s3 accelerant as a result of waddlesplash enabling the USER_CLONEABLE memory protection.

### Fixes

PulkoMandy fixed a bug in MediaKit where online radio streams would only play for a few seconds and then stop. You can now enjoy infinite music on Haiku.

phoudoin fixed a bug where the system became unresponsive when a textsearch is used in a big search.

jackburton fixed a 4 years old KDL that ocurred whenever ifconfig was used to remove an interface.

waddlesplash fixed for real an even older 5 years standing bug that prevented some extended attributes to be used by Tracker for filtering and sorting purposes.

### Others

waddlesplash fixed and enabled Reiserfs on x86_64 builds. Previously this filesystem was only available on x86 builds. Reiserfs is a filesystem originally developed by Hans Reiser for Linux. It was popular for Haiku users because it could be used to build Haiku without needing xattrs emulation, unlike ext3. However, development of Reiserfs has stopped and the focus in the future for Linux filesystems will be on XFS, JFS, or btrfs.

Haiku packages are currently compressed using zlib. This is a well-known and mature library, but it is not state of the art anymore. Korli added experimental support for Facebook's Zstandard compression library, which allows packages of a slightly smaller size and more important, is faster at compression and decompression (in the case of Haiku this will have an impact on boot time).

Thanks to 3dEyes who [enabled SubtleCrypto in QtWebKit](https://discuss.haiku-os.org/t/whatsapp-web/7165/13), **WhatsApp Web** is now available on Qt based browsers (Qupzilla, Otter and more).

New in HaikuDepot: **UploadIt** is a Tracker Add-On that uploads a single file to the online service The Null Pointer at https://0x0.st 5 . The URL for the uploaded file is put into the clipboard after the upload has finished, ready to be pasted into an email, a chat window or forum post.

### Are we released yet?

No, but real soon now! Thanks to some intense work done by waddlesplash and more important to all the hard work put in by the community through the past 6 years, including coding and non-coding tasks, we have now a R1 Beta 1 [release timeline](https://dev.haiku-os.org/wiki/R1/Beta1/Timeline). Note that they are not strict deadlines to favor a high quality release instead of a rushed one.

R1 Beta1 has already branched out in the repository and community is testing pre-release images and filling in bug reports. If you want to test just grab the [R1 Beta 1 testing image Pre RC](https://discuss.haiku-os.org/t/r1-beta-1-testing-image-pre-rc/7300) and install it. waddlesplash set up a [google form](https://docs.google.com/forms/d/e/1FAIpQLSclBAadiObzfHPXVKk4WGPoPuiB5ibmudXLj1uQn_lCzQZ_Zw/viewform) for anyone to fill in your results. **Note 1**: those images _are not EFI enabled_. **Note 2**: Regarding the form, _device name_ correspond to the model of the computer as a whole or to the motherboard if it is a custom one.

If everything goes well beta 1 image will be released this september.
