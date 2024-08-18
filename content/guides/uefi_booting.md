+++
type = "article"
title = "UEFI Booting Haiku"
date = "2024-08-18T00:00:00.000Z"
tags = ["booting","uefi","efi"]
+++

## UEFI Booting the Anyboot Image

Haiku also supports booting via the traditional [BIOS](https://en.wikipedia.org/wiki/BIOS) boot system. See the [regular install instructions](/get-haiku/installation-guide/) if your hardware requires a BIOS boot process. Use the instructions on this page should your hardware require a UEFI boot process. The instructions are somewhat manual at the present time (R1/beta5), but should be enhanced with a more guided process in the future.

### Install Steps

The following steps assume a fresh installation where the local disk will be used in its entirety for Haiku. The process below will completely wipe the target disk! Back up any data you still need.

1. Follow the instructions of the [installation guide](/get-haiku/installation-guide/) and instead of opting to begin the install, choose _Try Haiku_ and proceed with the instructions below.
2. Once the system has booted from the install media, open the [Drive Setup](/docs/userguide/en/applications/drivesetup.html) application.
3. Use the _Disk_ > _Initialize_ > _GUID Partition Map..._ option to initialize the disk.
4. Create a UEFI boot partition
   1. Create a 64 MiB partition of type _EFI system data_ with name `EFIBOOT` by choosing the _Empty space_ associated with the disk and choosing _Partition_ > _Create..._
   2. Format the partition as _FAT32 File System_ with a label `EFIBOOT` by choosing the partition and choosing _Partition_ > _Format_ > _FAT32 File System_.
5. Create a Haiku partition
   1. Create a large partition (> 8 GiB suggested) of type _Be File System_ with a name of your choice.
   2. Format the partition as _Be File System_ with a label of your choice.
7. Copy the boot software into the `EFIBOOT` partition.
   1. In the DriveSetup application, select the `EFIBOOT` partition and mount it by choosing _Partition_ > _Mount_.
   2. Open the [Terminal](/docs/userguide/en/applications/terminal.html) application.
   3. Execute the commands;
      ```sh
      mkdir -p "/efiboot/EFI/BOOT"
      cp "/system/data/platform_loaders/haiku_loader.efi" "/efiboot/EFI/BOOT/BOOTX64.EFI"
      ```
   4. Press `CTRL`-`D` to close the terminal.
8. Install Haiku onto the system
   1. Open the [Installer](/docs/userguide/en/applications/installer.html) application.
   2. Select your Be File System setup earlier as the _Onto_ field
   3. Choose _Begin_
   4. Once the installation is complete, choose _Quit_ to close the Installer.
9. Shutdown the system.
10. Remove the boot media; for example the USB key.
11. Restart the system.

### Advanced Install

To have Haiku on a system shared with multiple EFI operating systems, you can use the more advanced layout of the `EFIBOOT` partition;

  * **EFI** (directory)
    * **HAIKU** (directory)
      * **BOOTX64.EFI** (Haiku's UEFI loader, aka haiku_loader.efi)
    * **BOOT** (directory)
      * **BOOTX64.EFI** (boot mananger such as [rEFInd](https://www.rodsbooks.com/refind/))

In this configuration, rEFInd will boot first by default, and will detect HAIKU as a boot option.
