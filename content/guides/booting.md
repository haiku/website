+++
type = "article"
title = "Booting Haiku"
date = "2026-11-19T14:50:50.000Z"
tags = ["booting","grub","disk server"]
+++

There are a wide range of options and configurations available to boot Haiku, from from modifying the boot sector, to configuring (and possibly installing) a boot manager.

This page is about setting up some of these options. Once set up, the bootloader provides a menu allowing to control the next steps of the boot proces. For an overview of these booting options, please check out [this page of the Haiku User Guide](/docs/userguide/en/bootloader.html)

## Configuring a computer for running Haiku only

The boot process for computers is quite complex and not fully in the control of Haiku developers.
There are also many possible ways to set up Haiku, depending on what the machine supports and if
other operating systems should also be installed. As a result, this process requires some manual
steps and the errors can be difficult to identify.

### BIOS systems

On BIOS systems, the boot process starts with a piece of code called the Master Boot Record (MBR),
which is stored in the first sector of the hard disk. This piece of code should select the partition
to boot and hand control over to the bootloader found in that specific partition. Unfortunately, that
handover process is not fully standardized, and the existing MBR code on your disk can be incompatible
with Haiku. To avoid this problem, the following procedure recreates the partition table and writes
Haiku's version of the MBR code on the disk.

  * Open the DriveSetup application
  * Select the disk you want to install Haiku on
  * In the menu select Disk -> Initialize -> Intel partition map (this will delete all existing partitions, make sure the disk does not contain any important data)
  * Select the newly created "empty space" for the disk
  * Select Partition -> Create
  * Create a primary partition of type "Be filesystem" and activate it
  * If you want to split your disk into several partitions, you can do that now
  * Select Partition -> Initialize -> Be File System
  * Keep "query support" enabled for your boot partition

Once the partition is created and initialized, you can proceed to install Haiku on it.

### EFI systems

EFI systems use a more elaborate firmware, which can load the bootloader from a file in a dedicated
boot partition. This still requires a specific partition layout to be followed closely.

  * Open the DriveSetup application
  * Select the disk you want to install Haiku on
  * In the menu select Disk -> Initialize -> GPT (this will delete all existing partitions, make sure the disk does not contain any important data)
  * Select the newly created "empty space" for the disk
  * Select Partition -> Create
  * Create a partition of type "EFI system partition". Make it small, around 100MB should be enough if you don't plan to install many operating systems.
  * Select the partition then Partition -> Initialize -> FAT. This will be your EFI system partition
  * Create another partition of type "BeOS", using the remaining space on the drive
  * You can make this partition smaller if you want to spare some space for other partitions or other operating systems
  * Select Partition -> Initialize -> Be File System
  * Keep "query support" enabled for your boot partition

Once the partitions are created and initialized, you can proceed to install Haiku.

From the Installer application, use the menu to copy the EFI bootloader into the EFI system partition after completing your installation.

## Configuring a boot manager for multiple systems booting

Haiku is often installed alongside other operating systems. In this case, it can be added to an
existing boot manager setup following the instructions below.

### ![harddisk](/images/harddisk_32.png) Configuring rEFInd (EFI only)

For EFI systems, rEFInd provides a graphical boot screen allowing to run several operating systems.

  * Install rEFInd by following the official installation instructions
  * Copy haiku_loader.efi from your Haiku installation to a Haiku subdirectory in your EFI partition
  * rEFInd should detect Haiku automatically and offer it as a boot option

### ![harddisk](/images/harddisk_32.png) Configuring Bootman (BIOS only)

Bootman is Haiku's own boot manager. It provides a simple text based menu allowing to boot several
partitions. Bootman only supports chainloading: it can load Haiku and Windows installations, but it
cannot load Linux directy. If you want to use bootman with Linux, you will have to arrange your
Linux install so that GRUB is installed in one of the partitions, and not at the start of the disk
as is the case by default.

Bootman installation is available from the Installer application menu. A "wizard" type application
will guide you through the configuration steps: choosing the disk you want to configure, and
selecting which partitions should be listed as boot options.

### ![harddisk](/images/harddisk_32.png) Configuring GRUB boot manager

GRUB is a common boot manager used on other open-source operating systems. (Including Linux)

In the example below we will have the following setup:

  * hd0 – first hard drive
  * hd0,1 – first partition of first drive (sda1) Ubuntu Linux /
  * hd0,2 – second partition of first drive (sda2) Ubuntu Linux Swap
  * hd0,3 – third partition of first drive (sda3) Haiku partition

Adding Haiku to your [GRUB 2](http://www.gnu.org/software/grub/manual/) boot loader is as simple as adding a section to the files used to auto-generate your GRUB 2 menu configuration.

If you previously had only one operating system installed on your computer, GRUB 2 may be configured to wait for the Shift key to be pressed while booting, otherwise no boot menu may be displayed at all, since Haiku is not automatically recognized as a bootable operating system. To force GRUB 2 to always display the selection menu, and to add the Haiku entry in such a way that it will not be removed when the GRUB 2 configuration file is regenerated, perform the following steps:

  * Edit /etc/default/grub and add or uncomment the following option: `GRUB_HIDDEN_TIMEOUT=0`
  * Edit /etc/grub.d/40_custom and add __one of the following two entries__, depending on your system:

```
# for BIOS systems
menuentry "Haiku" {
	set root=(hd0,3);
	chainloader +1
}

# for EFI systems
menuentry "Haiku" {
	load_video
	insmod part_msdos
	insmod chain
	search --fs-uuid --set=root <EFIBOOT partition UUID>
	chainloader ($root)/EFI/BOOT/BOOTX64.EFI
}
```

Of course, the partition in the entries needs to point to the one where you actually installed Haiku. On Linux you can get the `UUID` values of all the partitions and disks in use by using the `sudo blkid` and `sudo fdisk -l` commands.

{{< alert-info "" "The EFI entry above assumes you've created the `EFIBOOT` partition and put the boot loader inside it as explained [in the official guide](/guides/uefi_booting). If you didn't, you need to check the path of the `chainloader` directive and fix accordingly.">}}

{{< alert-info "" "The EFI entry above assumes that your disk is partitioned using the intel/mbr partitioning system. For systems using GPT partitioning, replace the line `insmod part_msdos` with `insmod part_gpt`.">}}

On Ubuntu (and other Linux flavors), you can eventually customize the GRUB setup further in a GUI environment using __Grub Customizer__ and following this [getting started tutorial](http://tipsonubuntu.com/2018/03/11/install-grub-customizer-ubuntu-18-04-lts/).

Finally, you can regenerate the boot menu configuration by issuing `sudo update-grub` and reboot.

### Adding Haiku to the Windows bootloader using EasyBCD

**Note:** Multiboot works only on BIOS systems. EFI systems do not support it. On Windows PCs booting in EFI mode, Microsoft blocks loading legacy or non-Windows operating systems from the BCD menu.

* First get EasyBCD from [this site](https://neosmart.net/EasyBCD/)
* Install it as you would install any windows software
* When you launch it you'll see 2 panels
* On the left panel click on "Add new entry"

![](/files/guides/booting/AddNewEntry.png)

* On the right panel click on the "Linux/BSD" tab
* Leave the "Type" section as GRUB (leagcy)
* In the "Name" section type Haiku
* In the "Drive" section choose your haiku partition which will have the "0xEB" ID in its string, if you have multiple haiku partitions, you would have to figure out which one by its size.
* Click on the "Add entry" button

![](/files/guides/booting/EditHaikuEntry.png)

* On the left panel you have the "edit boot menu" option

![](/files/guides/booting/MakeDefaultEntrySaveSettings.png)

* Click on it and in the right panel  you'll see the list of your OS's
You can make one of them the default by checking its checkbox

* Below you have the timer radio button, either check the "wait for user selection" one, so that the bootloader will wait until you make a choice and hit enter, or choose the amount of seconds the bootloader should wait before launching the default OS.


## ![folder](/images/folder_config_32.png) Using Makebootable

`makebootable` is a low-level Haiku tool to enable x86 MBR (legacy bios) systems to boot from the active Haiku partition.

{{< alert-danger ""
`It is extremely likely that you don't need makebootable. Please read this paragraph carefully
to determine if you need it.`>}}

Makebootable is **not** needed when any of these is true:

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

<pre class="terminal">jam run "<build>makebootable" /dev/...</pre>

**Running under Haiku**

<pre class="terminal">makebootable /dev/disk/...</pre>

