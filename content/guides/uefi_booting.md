+++
type = "article"
title = "UEFI Booting Haiku"
date = "2018-09-18T00:00:00.000Z"
tags = ["booting","uefi","efi"]
+++

## UEFI Booting the anyboot image

64-bit release images (such as Haiku R1/beta1) can be directly booted from UEFI when the system's hardware supports it.
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
    * Format as FAT32, label "EFIBOOT"
  * Create a Haiku partition (generally > 8 GiB is a good size)
    * Format as BeFS, label "Haiku"

At this point, continue the installation as usual to the 'Haiku' filesystem.

### Installing the EFI Loader

**Note:** Due to a [bug](https://dev.haiku-os.org/ticket/14539) in r1beta1, the UEFI loader isn't available during installation.
You can grab the UEFI bootloader [here](https://ftp.osuosl.org/pub/haiku/r1beta1/haiku-r1beta1-x86_64-efiloader.zip).

After the installation is successful (but before rebooting), return to the live desktop and mount the "EFIBOOT" partition from the desktop.

The UEFI filesystem partition should be laid out as follows:

  * EFI (directory)
    * BOOT (directory)
      * BOOTX64.EFI (our uefi loader)
