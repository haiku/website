+++
type = "article"
title = "UEFI Booting Haiku"
date = "2018-09-18T00:00:00.000Z"
tags = ["booting","uefi","efi"]
+++

## UEFI Booting the anyboot image

64-bit release images (such as Haiku R1/beta3) can be directly booted from UEFI when the system's hardware supports it.
While Haiku's UEFI bootloader is at an early stage, it can be leveraged to boot a stable system.

## Installing UEFI to disk

Haiku *can* be installed to a system with an UEFI bootloader, however it is a manual process as of R1/beta3.
If you boot the anyboot media from UEFI (and install as usual) your system will boot via the legacy BIOS loader.

Future releases of Haiku should have this process more refined.

### Partition Layout

During the installation, you will need to do some planning to properly leverage the Haiku UEFI bootloader.

  * Choose a GPT disk system on the target device.
  * Create a small (64 MiB is generally enough) partition at the start of the disk.
    * "EFI system data" type.
    * Format as FAT32, label "EFIBOOT"
  * Create a Haiku partition (generally > 8 GiB is a good size)
    * Format as BeFS, label "Haiku"

At this point, continue the installation as usual to the 'Haiku' filesystem.

## Installing the EFI Loader

In R1/beta3, the Installer does not yet automatically install the EFI loader, so it needs to be done manually.

After the installation is successful (but before rebooting), return to the live desktop and mount the "EFIBOOT" partition from the desktop.

{{< alert-info "Haiku Platform Loaders" "As of R1/beta3, all of the available bootloaders can be found in (/boot)/system/data/platform_loaders">}}

### Basic Install

To have Haiku the default (and only) EFI operating system, these basic steps will get you setup.

The EFI system data partition should be laid out as follows:

  * **EFI** (directory)
    * **BOOT** (directory)
      * **BOOTX64.EFI** (Haiku's UEFI loader, aka haiku_loader.efi)

### Advanced Install

To have Haiku on a system shared with multiple EFI operating systems, you can use the more advanced layout.

  * **EFI** (directory)
    * **HAIKU** (directory)
      * **BOOTX64.EFI** (Haiku's UEFI loader, aka haiku_loader.efi)
    * **BOOT** (directory)
      * **BOOTX64.EFI** (boot mananger such as [rEFInd](https://www.rodsbooks.com/refind/))

In this configuration, rEFInd will boot first by default, and will detect HAIKU as a boot option.
