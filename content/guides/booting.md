+++
type = "article"
title = "Booting Haiku"
date = "2010-02-15T22:50:50.000Z"
tags = ["booting","grub","disk server"]
+++

There are a wide range of options and configurations available to boot Haiku, from from modifying the boot sector, to configuring (and possibly installing) a boot manager. For an overview of the various booting options available to Haiku, please check out [this page of the Haiku User Guide](/docs/userguide/en/bootloader.html)

## ![folder](/images/folder_config_32.png) Using Makebootable

`makebootable` is a low-level Haiku tool to enable x86 MBR (legacy bios) systems to boot from the active Haiku partition.

Makebootable is **not** needed when…

  * Haiku’s EFI bootloader is in use
  * dd’ing to an entire disk device and not a partition
  * using Haiku’s Installer program, as it is done automatically
  * using the build system to install directly to a partition from source, as it is done automatically

Makebootable **is** needed when...

  * x86 legacy BIOS booting is used
  * dd’ing to a partition
  * manually installing using Tracker
  * installing using BeOS/Zeta’s Installer program

### Makebootable Usage

`makebootable` should be run against a partition containing Haiku

**Running from build system**

Makebootable is included with Haiku. However, it can also be accessed from systems compiling Haiku.

    jam run "<build>makebootable" /dev/...

**Running under Haiku**

    makebootable /dev/disk/...

## ![harddisk](/images/harddisk_32.png) Configuring GRUB boot manager

GRUB is a common boot manager used on other open-source operating systems. (Including Linux)

<div class="alert alert-info">
**os-prober v1.44**  
Starting with os-prober v1.44 (e.g. in Ubuntu 11.04 or later), Haiku should be recognized out of the box. Just run sudo update-grub to add Haiku to the GRUB menu. (TODO: Was this fixed for PM versions?)
</div>

### GRUB 2 (version 1.96 and higher)

In the example below we will have the following setup:

  * hd0 – <mbr, grub="">first hard drive</mbr,>
  * hd0,1 – first partition of first drive (sda1) Ubuntu Linux /
  * hd0,2 – second partition of first drive (sda2) Ubuntu Linux Swap
  * hd0,3 – <haiku boot="" sector="">third partition of first drive (sda3) Haiku partition</haiku>

Adding Haiku to your [GRUB 2](http://www.gnu.org/software/grub/manual/) boot loader is as simple as adding a section to the files used to auto-generate your GRUB 2 menu configuration.

If you previously had only one operating system installed on your computer, GRUB 2 may be configured to wait for the Shift key to be pressed while booting, otherwise no boot menu may be displayed at all, since Haiku is not automatically recognized as a bootable operating system. To force GRUB 2 to always display the selection menu, and to add the Haiku entry in such a way that it will not be removed when the GRUB 2 configuration file is regenerated, perform the following steps:

  * Edit /etc/default/grub and make sure the line “GRUB_HIDDEN_TIMEOUT=0” is commented out.
  * Edit /etc/grub.d/40_custom and add the following entry

    menuentry "Haiku R1A2" {
       set root=(hd0,3)
       chainloader +1
    }

Of course the partition in the entry (hd0,3) needs to point to the one where you actually installed Haiku. Now you can regenerate the boot menu configuration by issuing `sudo update-grub`

### GRUB Legacy (version 0.97 and earlier)

GRUB Legacy differs in the numbering of the partitions compared to GRUB 2, starting at 0 instead of 1\. The example below shows the naming scheme for GRUB Legacy:

  * hd0 – <mbr, grub="">first hard drive</mbr,>
  * hd0,0 – first partition of first drive (sda1) Ubuntu Linux /
  * hd0,1 – second partition of first drive (sda2) Ubuntu Linux Swap
  * hd0,2 – <haiku boot="" sector="">third partition of first drive (sda3) Haiku partition</haiku>

Adding Haiku to your [GRUB Legacy](http://www.gnu.org/software/grub/grub-legacy.en.html) boot loader is as simple as adding a new section to your GRUB menu configuration. After installing Haiku, you will need to boot into your Linux operating system and add the following block of code to your /boot/grub/menu.lst (your mileage may vary, this is the default location however).

    # for Haiku
    title Haiku R1A2
    root (hd0,2)
    chainloader +1
