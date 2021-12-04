+++
type = "blog"
title = "Haiku activity report - November 2021"
author = "PulkoMandy"
date = "2021-12-02 08:53:07+02:00"
tags = ["haiku", "software", "activity report"]
+++

Hello there, it's time for the monthly activity report!

This report covers hrev55609-hrev55687.

<h3>New architectures</h3>

Kallisti5 fixed some minor problems with the PowerPC port to keep it building and simplify it a bit.
Kallisti5 and waddlesplash  also continued cleaning up the RISC-V sources and fixing various minor issues there.

David Karoly is making progress on the 32bit ARM port, using EFI as a boot method. The previous
attempts for an ARM port used the linux style booting, where the firmware bootloader (usually uboot)
only does the minimal hardware initialization, and then hands over complete control to the operating
system. The Linux kernel is designed to work this way, but in our case, we actually rely a bit more
on the firmware, to run our stage 2 bootloader which provides an user friendly boot menu.

With the legacy u-boot system, this required writing specific code for each new ARM board, and the
bootloader had a lot of hardware-specific code. EFI solves this. When using EFI boot mode, we can
call into u-boot (or another EFI implementation) to do the hardware specific bits. And we can reuse
the code from the x86 and RISC-V ports, which boot in the same way.

With the bootloader issues fixed, it becomes a lot easier to debug the early steps of the kernel
boot, and this led to many fixes to the MMU driver as well as the FDT hardware discovery.

tqh is working on the 64bit ARM port, with some fixes to the math library code and to the compiler
flags.

David Karoly also started work on a 32bit x86 EFI bootloader. Until now the 32bit x86 version of
Haiku could only be run in legacy/BIOS mode, and the 64bit version required a 64bit EFI BIOS.
Some machines (from Apple, and some tablet PCs from other manufacturers) adopted EFI and dropped
BIOS support quite early, and still run on 32bit CPUs, or have only a 32bit EFI even if their CPU
is 64bit compatible. These machines could not be used with Haiku without this specific bootloader.

<h3>Filesystems</h3>

waddlesplash updated our NTFS driver to use the latest version of NTFS-3g, and rewrote the "glue"
code used to tie NTFS-3g with our kernel APIs. The original glue was written for BeOS and partially
updated to Haiku. Now the code is similar to our other filesystems and a bit cleaner. This also
helped identify and fix some bugs in the driver and in other places in the filesystem handling.

Waddlesplash also cleaned up the FAT driver and removed some useless locking.

<h3>Applications</h3>

Korli implemented escape sequences to let console applications get and set the cursor color, and
also added escape sequences allowing to specify custom colors in different colorspaces.

Waddplesplash improved the code that retries failed package downloads, to fix an issue where a
corrupt package would prevent downloading a new, valid copy.

<h3>Drivers</h3>

Korli implemented CPUID leaf 0x1f. CPUID is an instruction that allows software to detect available
features on the CPU. It is regularly updated as new instruction sets are added, and so we need to
follow on these changes to report the corresponding features in our corresponding APIs.

Korli also added information about the current CPU core frequency in cpu_info. This was already
available to the kernel, but not exposed to userspace.

Rudolfc made a lot of progress on the intel_extreme driver, adding support for modern Intel graphics
chipsets (haswell, skylake, coffeelake and kabylake are now recognized). He also fixed various issues
with existing devices, made the brightness slider in the preference panel only show for devices with
an internal display panel where the brightness can actually be configured.

Waddlesplash implemented trim for NVMe SSDs (so you can now use the fstrim command to tell the SSD
that some sectors are unused and can be reused for wear levelling).

Waddlesplash also reworked the kernel ConditionVariable implementation to simplify the code and fix
a bug in it that would sometimes trigger kernel panics.

<h3>Code cleanups</h3>

mt updated the LGTM scan, and fixed some issues found by it.

Coldfirex replaced all remaining references to "OpenBeOS" in the sourcecode to "Haiku". It was about
time.

PulkoMandy did some cleanups to the UDP socket code.

PulkoMandy also moved the jamfile engine to a separate repository. The jamfile engine is a build
system based on Jam (the tool also used to build Haiku) and is an alternative to the makefile
engine (used to build a lot of 3rd party Haiku software). It is now available in haikudepot, instead
of having to extract it manually from Haiku sources. If you want to build an application using Jam
instead of make, the jamfile engine can be a good starting point.

Waddlesplash started working on compiling Haiku with gcc11 instead of gcc8, which requires fixing
compilation issues (new warnings, nonstandard code that does not build anymore), and also debugging
places where new optimizations prevent code from working as expected.
