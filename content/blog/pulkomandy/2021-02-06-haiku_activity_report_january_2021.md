+++
type = "blog"
title = "Haiku activity report - January 2021"
author = "PulkoMandy"
date = "2021-02-06 10:53:07+02:00"
tags = []
+++

Hello everyone, apparently we made it to 2021! This year we will see the 20th
anniversary of Haiku.

This report covers hrev54806-hrev54947.


<h3>Architectures, ports, bootloaders</h3>

<p>PulkoMandy fixed the build of the openfirmware bootloader for PowerPC. It had been broken by changes for SPARC support. The openfirmware code to set up the splash screen was also fixed to work on sparc.</p>

<p>tqh continues his work on cleaning and simplifying our EFI support. We have started from GNU EFI, which everyone seems to use as a reference project for how to do an EFI bootloader. However, their code is not very clear and it makes it difficult to improve it and make changes. So we are slowly rewriting parts in simpler and cleaner ways.</p>

<p>Kallisti5 continues his work on ARM and RISC-V, with support for getting the FDT from the EFI bootloader. On these architectures, it is usually not possible to discover the hardware directly (as is the case on a PC where you can simply enumerate devices on the PCI or USB busses). On ARM and RISC-V devices, there are many peripherals that are just mapped at a fixed memory address, and we have to know where to look for them, with no reliable way to detect or enumerate them. The way this is handled is using an FDT, a data structure that the bootloader passes to the kernel, which contains a description of such hardware. Several other things for both ARM and RISC-V were improved as well in various areas: ELF loading, early CPU setup, EFI portability issues, etc. The bootloader is now fully working on both architectures.</p>

<p>PulkoMandy added a menu to the openfirmware bootloader to go back to the openfirmware prompt. This is mainly useful to speed up testing of different versions of the bootloaders, by removing the need to reboot everytime.</p>

<p>Work on the SPARC port led to discovery and fixes of several issues in different places: problems with the bootloader ELF parser and the Be filesystem, inconsistencies between PAGESIZE and B\_PAGE\_SIZE (sparc uses 8K pages, where all other architectures Haiku was ported to until now use 4K pages). Finally the bootloader work for SPARC is done and we are now running kernel code. The next step is adding code to set up the MMU in the kernel and start allocating memory.</p>

<p>tqh improved the way we test for the space key in the EFI bootloader, so it should now be easier to reach the bootloader this way.</p>


<h3>Networking</h3>

Jeremy Visser continues his work on fixing problems with IPv6, this month with fixes to the PoorMan HTTP server which was hardcoded to use IPv4 addresses, as well as a fix to the net\_server that led to invalid masks being set for IPv6 addresses. He also improved NetworkStatus to allow printing multiple addresses for a given network interface.

korli enabled multicast support in the virtio\_net driver.


<h3>Crashes, bugs, and cleanups</h3>

Màximo Castañeda fixed crashes in Input preferences and BSoundPlayer. He then fixed rounding errors and overflows in the system mixer.

mt fixed some compiler warnings in various places, mainly in the mail kit.

X512 continues work on reference counting using BReference, AutoDeleter, MutexLocker, etc to simplify the code and make sure no resource leaks are possible.

PulkoMandy changed the way the locale kit initializes itself to fix a deadlock that happened in Tracker when attempting to load translators in one thread while initializing the locale kit in another.


<h3>Applications and preferences</h3>

nephele (with help from X512) converted StyledEdit to the layout kit and cleaned various problems in StyledEdit and DeskCalc.

Jaidyn Ann fixed MediaPlayer playlist handling on 64bit systems.

Axeld added support in BootManager boot menu for moving to the top and bottom of the list using the page up, page down, home and end keys.

jdpw added a menu in WebPositive for easily chosing a search engine.

kallisti5 tweaked the size of the realtime allocation buffer in media kit, allowing smooth playback of 4K video.

Korli implemented the "repeat" feature in Terminal which allows to display multiple copies of the same character (useful for fast line drawing, for example). This is used by ncurses, so this will fix display of some ncurses applications.

PulkoMandy fixed drawing of the return key in keymap preferences, as well as the separator between tabs in BTabView and a strange choice of colors to draw the selected item in Tracker that resulted in grey text on grey background.

kallisti5 fixed ProcessController to work with higher number of CPU cores.

PulkoMandy improved wording in DriveSetup to make it clear when a partition is not formatted or does not exist at all. He also made it possible to format a mounted partition (the partition is unmounted just before formatting).

X512 added some more well known attribute types to Tracker "Get Info" window.

PulkoMandy added AVX support to Debugger, so it's now possible to see the value
of all the YMM/ZMM registers.


<h3>Package kit and HaikuDepot</h3>

Andrew Lindesay continues his rework of HaikuDepot to remove use of a custom list container, replacing it either with BList/BObjectList or standard C++ containers, depending on the use cases.

<p>stippi fixed the handling of conflicts when applying package transactions. In the case where two package transactions try to install the same file, the transactions now both complete succesfully. The second transaction is rejected if it tries to overwrite an existing file with different content without explicitly announcing it.</p>

<p>PulkoMandy and stippi added a way to resume downloads when the network connection drops during a system update. It's now possible to restart pkgman or softwareupdater, and existing downloads will restart from where they had left off, instead of re-downloading everything (note that stippi had been inactive in Haiku for close to a year, but he managed to fix the two most upvoted tickets on Trac during his christmas break). This work also results in support for range requests in the HTTP code, and better error handling in BSecureSocket, that will also be useful to other applications.</p>


<h3>Kernel and drivers</h3>

<p>korli added 5-level paging for x86\_64, the first step towards supporting more than 256TB of memory (this is a bit forward looking, since we are currently limited to 512GB for other reasons).</p>

<p>3dEyes added support for a new Wacom tablet. Lt-Henry improved handling of USB HID tablets to allow buttonevents for tip and barrel switches.</p>

<p>korli and PulkoMandy fixed kernel panics found by thosewhowork, who is experimenting with fuzzing Haiku system calls (fuzzing consists in calling functions with random parameters and making sure they never crash the system). This also led to fixing a bug in strace.</p>

<p>The SD/MMC drivers are merged. It is now possible to read and write SD and SDHC cards using controllers compatible with the SDHCI specification.</p>

<p>korli also fixed a division by zero in the XHCI USB3 driver.</p>

<p>korli fixed DMA constraints for some HDA audio cards which are not able to use 64bit memory addresses for DMA.</p>

<p>tqh updated our ACPICA code to the latest version.</p>


<h3>POSIX compatibility</h3>

<p>PulkoMandy added some missing defines in elf.h to ease porting newer versions of GHC (the Glasgow Haskell Compiler) to Haiku.</p>

<p>He also fixed the definition of asprintf to be available only when \_GNU\_SOURCE is enabled. Following discussion about this, some documentation about feature defines (\_GNU\_SOURCE, \_BSD\_SOURCE) and how they are used in Haiku was added to the Haiku book.</p>

<p>korli fixed some subtleties with posix signals handling, in particular their interaction with select, EINTR and SA_RESTART.</p>


<h3>File systems and partitionning</h3>

<p>Kallisti5 made it possible to build the FAT driver as an fs\_shell executable.
This is then used to build the FAT partition needed for ARM devices booting, removing
the need for a 3rd party tool (mtools was used). He also added a new "mbrtool" to
generate partition tables easily. This allows to generate the ARM bootable SD images
in a simpler way and with less 3rd party code.</p>

<p>The work on SD cards allowed to test fstrim with a non-SATA device, and led to
finding a bug in the devfs where partition offsets were not taken into account.
So, the wrong parts of the disk would be erased. Now that this is fixed, we can
test fstrim on SATA disks again and see if it works well enough to enable it in
the next beta version.</p>

<p>PulkoMandy fixed initialization of partitions from DriveSetup. The changes were
not written to disk until a first partition would be created, resulting in some
confusion. In particular, in some cases the old MBR boot code would not be
replaced, leaving for example a partial version of GRUB in place and making the
system unbootable.</p>


<h3>Be API</h3>

<p>PulkoMandy fixed some typos in BNotification documentation.</p>

<p>The documentation for the find_directory functions now clearly says what's available in libroot and what requires libbe.</p>

<p>nielx started work on (yet another) rewrite of the HTTP API. This API had been introduced in libbnetapi.so but it is in fact not finalized yet. Having it in a .so library means changing the ABI will break existing apps. So there is now a copy of the API in a static library (as it should have been). We will rework the version in the static library until we are happy with it before we move it back to a .so file. The old API will remain in the next beta release but will be considered deprecated, and one of the later beta releases will remove it. The new API has already received some fixes that were held off by the ABI breakage, with more to come. All places in Haiku where the API is used are already converted to the new version.</p>
