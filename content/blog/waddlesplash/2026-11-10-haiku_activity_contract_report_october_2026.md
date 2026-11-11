+++
type = "blog"
title = "Haiku Activity & Contract Report, October 2026"
author = "waddlesplash"
date = "2026-11-10 21:00:00-05:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev60193 through hrev60317.

<!--more-->

### Applications

rain5409 fixed issues with drawing rounded rectangles in Playground.

phoudoin fixed Expander to expand .bz2 and .gz archives into the selected destination folder, instead of the current folder. nipos fixed Expander's controls being enabled even when the source or destination was invalid.

nipos fixed a minor bug in the Screenshot tool. He also fixed the build of the "SimpleClock" screensaver.

jscipione fixed a regression in Icon-O-Matic where the drag & drop indicator wouldn't always be drawn.

phoudoin improved DiskUsage to show the size for the current directory and not just the top one. He also made the menu icons display properly under HiDPI.

nipos made the "problem" and "result" windows of `package_daemon` closable with the `Escape` key.

nipos fixed ProcessController's alerts to display in front of Deskbar.

nipos fixed some crashes in MediaPlayer on keypresses when the playlist is empty.

apl fixed install progress display in HaikuDepot, some problems where cancelling an install wouldn't re-enable the install button, and some problems with filtering.

AutumnMeowMeow continued working on fixes to Terminal, including fixes to VT100/Xterm sequences and more.

jscipione implemented an "increase quote" shortcut in Mail. raus7n added some provider information to the build (it's used for automatic setup of parameters when configuring Mail accounts.)

aquamatic123 continued work on the Devices application and the device_manager, making `B_RAW_TYPE` attributes visible in the user interface, and fixing some safety problems in the kernel-userland interface.

### Command line tools

OscarL fixed pkgman to return an error if `pkgman info` couldn't find a matching package.

### Kits

nipos changed BSpinner to inherit its colors from the parent view.

KapiX refactored the Storage Kit and Translation Kit tests to use the new testsuite architecture. He also improved `status_t` assertions, merged some disparate `BUrl` tests, cleaned up the BlockCache tests, fixed issues caused by the refactoring, and more.

nipos fixed the shared Settings handler to use `vsnprintf` instead of `vsprintf`.

apl fixed handling of `_source` packages in the Package Kit, allowing them to be installed and uninstalled.

Coldfirex fixed some typos or other spelling errors in various parts of the codebase, and also bumped some copyright dates.

phoudoin gave `BMidiLocalConsumer`s better thread names, for easier debugging.

jscipione fixed a parameter mixup in keypress handling in `BWindow`.

phoudoin fixed the spacing in "About" windows when there's no icon.

jackburton79 fixed a variety of problems in the FFmpeg media addon, fixing encoding on various formats as well as a variety of other issues.

### Servers

nathan242 implemented support for 2- and 3-finger tap (right click and middle click) gestures to touchpad handling.

phoudoin fixed some leaks of buffers in the MIDI server, improved efficiency in its I/O operations, and removed a confusing suffix from endpoint names.

Coldfirex made power_daemon log to syslog when the AC adapter is plugged or unplugged.

jackburton79 fixed some lock handling problems when errors occur.

axeld fixed some problems with job management in `launch_daemon`, fixing some crashes.

### File systems

waddlesplash dropped the `mime_ext_table`, a holdover from BeOS that mapped file extensions to MIME types for various filesystems that don't support extended attributes. Nowadays, Tracker can handle sniffing of MIME types on such filesystems instead of needing to guess based on their file extension. FAT was the last driver that made use of this table (and also the FUSE support), so they now don't report extended attributes at all, and just let Tracker figure things out.

phoudoin imported some changes from NTFS-3G upstream to NTFS partition formatting, fixing some issues reported by Windows `chkdsk`.

axeld improved the BFS superblock validity check to catch more invalid superblocks.

sleipbyte implemented support for big timestamps in the XFS driver, and also an SMAP violation when reading attribute data.

axeld fixed the Intel (MBR) partition manager to properly detect the "active" state, fixing spurious detection of MBR partitions and thus booting BFS without a partition table at all.

### Drivers

phoudoin fixed the IPP driver on 64-bit platforms. He also rewrote the setup window of the JetDirect driver to use layouts.

kallisti5 fixed tracing for some registers on "Evergreen+" cards in radeon_hd.

korli made a number of fixes and improvements to the USB stack's handling of hubs, including fixes for USB 3 hubs that fixed some long-standing tickets. He also fixed an alignment check in the EHCI (USB 2) driver.

phoudoin adjusted the USB controller drivers to use dedicated spinlocks instead of shared ones, improving performance on systems with multiple USB controllers. He also made processing of some USB descriptors more robust, shifted some definitions to public headers, fixed a "time-of-check to time-of-use" issue in the USB memory allocator, and added some stronger checks in the USB-to-userland interface.

waddlesplash fixed some handling of USB 2 and 3 device endpoint parameters.

korli enabled the `acpi_ac` and `acpi_lid` controller drivers.

korli made a fix to the `virtio_gpu` driver for big-endian systems, which may be helpful when experimenting with Haiku on PowerPC or other such architectures in QEMU.

phoudoin adjusted the `usb_midi` driver to allow for reading more than one byte at once, improving efficiency.

waddlesplash fixed a memory leak on quitting VMs in NVMM.

waddlesplash finalized and merged a driver written by Goldfish64 to add keyboard support on "Generation 2" Hyper-V virtual machines.

PulkoMandy continued work on making the FreeBSD compatibility layer work on ARM and for FDT devices.

korli fixed some problems with interrupt handling on earlier `intel_extreme` devices. jackburton79 fixed brightness control on Broadwell devices.

waddlesplash fixed the PCI bus manager to ensure that "bus mastering" (for DMA) is enabled on parent bridges of downstream devices, fixing a variety of "network card doesn't work" and other such problems. (This change was prompted by an LLM-generated submission: while we don't accept any LLM-generated code, we don't reject issues discovered with the aid of LLMs out of hand, either.)

dridiha implemented a driver for the "Universal Flash Storage" interface, a SCSI-based interface for flash storage devices intended to replace eMMC.

SED4906 implemented DPMS-based brightness control in the VESA driver. (Many displays or devices might not support this, however.)

korli merged a change from FreeBSD to the `iprowifi4965` driver which may fix traffic stalls in some circumstances.

### libroot & kernel

korli implemented `kill(0)`, which sends signals to all processes in the process group, and `kill(-1)`, which sends signals to all processes. He also improved error handling in process group signaling.

waddlesplash improved the fallback logic in some I/O routines to handle more cases.

waddlesplash fixed some locking problems related to multicast support in the IPv4 module. Coldfirex fixed a copy/paste problem in IPv4 multicast support.

korli switched the network stack to default to blocking sockets, simplifying some code. He also fixed a teardown problem in the TCP module.

X512 fixed some problems with the validation of user memory ranges passed to the kernel via syscalls, fixing some problems observed on RISC-V.

waddlesplash fixed some problems with the fallback path in file cache I/O operations, which were leading to read and write operations on files into other memory-mapped files failing unnecessarily. (This fixed some intermittent problems seen with the Rust compiler on Haiku.) He also wrote and committed a testcase for this behavior.

phoudoin implemented sending of "gratuitous announcements" on ARP when interface addresses change. waddlesplash came by later and cleaned up the code a bit.

phoudoin fixed some problems with `fparseln`'s thread safety, fixing crashes in libraries that make use of that call.

Sathwik-88 implemented `getrlimit` for `RLIMIT_FSIZE`. waddlesplash came by later and fixed some other problems with `rlimit` handling, including a too-low `RLIM_INFINITY` value on 64-bit.

waddlesplash implemented a new SMP probing method in the EFI loader which is needed on newer Intel CPUs.

Sathwik-88 restricted `mount` and `unmount` syscalls to root.

axeld fixed a missing initialization in the UNIX domain socket handler. He also fixed some problems with spawning sockets in the TCP module.

nathan242 fixed a reference counting problem when calling `unlink` on a file but with a path containing a trailing slash, fixing the code to return `ENOTDIR` instead.

### Build system

korli began work on making Haiku build with GCC 15, adjusting compiler flags and fixing various errors and warnings that it generates in many different parts of the code.

### ARM, RISC-V, SPARC

smrobtzz made a number of fixes to the build for SPARC in various components.

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!
