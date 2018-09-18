+++
type = "article"
title = "UEFI Booting Haiku"
date = "2018-09-18T00:00:00.000Z"
tags = ["booting","uefi","efi"]
+++

## UEFI Booting the anyboot image

64-bit release images (such as Haiku R1 Beta 1) can be directly booted from UEFI when the system's hardware supports it.
While Haiku's UEFI bootloader is at an early stage, it can be leveraged to boot a stable system.

{{< alert-info "Limitations" "Haiku's UEFI loader is only functional when the anyboot ISO is written to a hard disk or USB Flash device. Booting from UEFI when the anyboot is written to optical media is not currently supported. (However, should work by R1)">}}

## Installing UEFI to disk

Haiku *can* be installed to a system with an UEFI bootloader, however it is a manual process as of R1 Beta 1.
If you boot the anyboot media from UEFI (and install as usual) your system will boot via the legacy BIOS loader.

Future releases of Haiku should have this process more refined.

### Partition Layout

During the installation, you will need to do some planning to properly leverage the Haiku UEFI bootloader.

  * Choose a GPT disk system on the target device.
  * Create a small (32 MiB is more than enough) partition at the start of the disk.
    * "EFI system data" type.
    * Format as FAT32, label "UEFI"
  * Create a Haiku partition (generally > 8 GiB is a good size)
    * Format as BeFS, label "Haiku"

At this point, continue the installation as usual to the 'Haiku' filesystem.

### Installing the EFI Loader

After the installation is successful, return to the live desktop and mount the "UEFI" partition from the desktop.

The UEFI filesystem partition should be laid out as follows:

  * EFI (directory)
    * BOOT (directory)
      * BOOTX64.EFI (our uefi loader)
