+++
type = "blog"
title = "NVMe Driver Now Available"
author = "kallisti5"
date = "2019-04-16 16:41:57-05:00"
tags = ["haiku", "software", "NVMe"]
+++

Due to the *awesome* [work](https://git.haiku-os.org/haiku/tag/?h=hrev53068) [by](https://git.haiku-os.org/haiku/tag/?h=hrev53069) [long-time](https://git.haiku-os.org/haiku/tag/?h=hrev53070) contributor waddlesplash, nightly images after hrev53070 have NVMe support built-in.

**What is NVMe?**
For those not keeping up with the latest advances in tech, NVMe is a M.2 form-factor flash-based storage device which attaches
directly to the system's PCI Express bus. These flash devices are present in modern desktops and laptops and offer transfer
speeds of **several GiB/s**.

These devices now show up in /dev/disk/nvme/ and are fully useable by Haiku (currently read-only during testing, nothing is
technically preventing them from being read-write besides us trying to avoid anyone losing data)

I've [personally tested](https://twitter.com/kallisti5/status/1117974903154565120) my Samsung 950 Pro and seen raw read speeds up to 1.4GiB/s.

Give our NVMe driver a test and let us know your own results!

(Standard disclaimer that while we haven't seen any dataloss, this is a brand **new** driver. Always have backups.)
