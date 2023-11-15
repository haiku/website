+++
type = "blog"
title = "Haiku Activity & Contract Report, October 2023"
author = "waddlesplash"
date = "2023-11-14 22:30:00-04:00"
tags = ["contractor", "activity report"]
+++

This report covers hrev57309 through hrev57363 (again a bit of a shorter month than average.)

<!--more-->

### Applications

davidkaroly implemented DWARFv5 line-info in Debugger, allowing GCC 13-generated binaries to be debugged without needing to recompile them with specific command line flags, e.g. `-gdwarf-4`. He then proceeded to implement support for more DWARFv5 features (though there's still more to be done here before GCC can be allowed to generate full DWARFv5 by default without causing problems for Debugger), and fixed some typos along the way.

jscipione fixed Deskbar submenus to all use the "menu" font. Previously, some of them used the "plain" font and some the "menu" font, which made things obviously inconsistent when two different fonts were in use for these; now things should be properly consistent.

apl fixed some minor issues and improved the performance of HaikuDepot a bit, and also fixed a corner-case regarding invalid characters being entered into the username field. He also added more logging to allow for easier debugging of performance issues.

waddlesplash fixed color name handling in Terminal, which was incorrect for non-English locales and broke adjusting colors entirely. Now things should work properly.

waddlesplash fixed a buffer overflow causing corruption and crashes in People when very long filenames were used, and cleaned up the code a bit at the same time.

humdinger improved layouting in BootManager, addressing some problems reported on the bugtracker.

PulkoMandy fixed dangling reference issues with Transformer objects in `libicon`, fixing crashes in Icon-O-Matic.

waddlesplash fixed the build of DebugAnalyzer (a tool for visualizing kernel scheduling reports.)

nielx tweaked some UI text in mail_daemon, syslog_daemon, and Chart, upon suggestion of jt15s.

waddlesplash fixed Debugger attaching to another application upon request of `debug_server` while already running and attached to some other application (e.g. Debugger is already open, then a crash occurs and one selects "Debug" at the prompt.) This had been broken for multiple years, but apparently nobody noticed before now.

### Command line tools

zdykstra removed an old `whence` command implementation from the default `/etc/profile` that was causing problems when running `zsh`.

### Kits

humdinger fixed an edge-case in `BSpinner` where the increment/decrement buttons would remain incorrectly enabled or disabled when the minimum or maximum value was changed with a value already set. jackburton79 added some missing invocations of base class methods, also to the Spinner classes.

PulkoMandy refactored the FFmpeg media plugin to remove usages of deprecated methods. (This commit introduced a pretty bad memory leak which was only solved this month, however.)

### Servers

PulkoMandy added another Noto regional font to the app_server fallback list. (At present, characters not present in a specified font can only come from fonts in a hard-coded fallback list. Eventually this should be changed, but for now, we simply add whatever fonts are needed from the standard set into it.)

### Drivers

X512 refactored the PCI bus manager to dynamically register host controllers. This allows multiple PCI busses/domains to be used on a single system, which is needed on some RISC-V machines (and likely also some ARM machines, but we're not quite there yet.)

waddlesplash refactored the FreeBSD driver compatibility layer's `cvar` system to not need access to the C++ `ConditionVariable` structure size in a C-only header. This allowed for the removal of the `kernel_c++_structs` generated header system, which was used for only this one structure, and was known to cause issues with Jam dependency resolution.

kallisti5 added a missing connector type to the `radeon_hd` modesetting driver.

korli refactored the VirtIO subsystem to support "modern" devices (specification version 1.0 and following), which resolves some enhancement requests about problems running Haiku on QEMU-based virtualization that enabled this by default. He also fixed request serialization problems in `virtio_block`, fixing hangs and deadlocks when booted from that storage mechanism.

### File systems

phcoder fixed computation of partition sizes in UFS2, and also fixed compilation of the `ufs2_shell` test harness.

waddlesplash (following a patch from jackburton79) fixed some preprocessor checks in the `fs_shell` for 32 vs. 64-bit pointer sizes, which weren't correct for non-x86 platforms and were causing build failures.

korli made a number of fixes to the ext2/3/4 driver, resolving problems in the block-bitmap find-previous routine, directory iteration, rename incorrectly not invoking unlink when necessary, and adding missing metadata checksum recalculations.

### libroot & kernel

puckipedia fixed a bug in the kernel thread scheduler to only unassign a thread from a core if the thread is not pinned. This fixes some KDLs occasionally encountered when disabling CPUs (though not all of them.)

waddlesplash implemented TSC calibration via hypervisor CPUID leaves in the bootloader. At present, only the "VMware" mechanism is supported (however this mechanism is also implemented by QEMU/KVM, not just VMware itself.) The TSC is critical for measuring the system uptime, CPU time, sleep times, and more, and it is typically calibrated early in the boot by detecting how fast it increments in a busy-loop. However, on hypervisors (virtual machines), CPU cycles can sometimes be transparently "stolen" from a guest machine, causing such calibration to turn up incorrect results. So when the hypervisor itself specifies the TSC frequency directly, we can just read this instead of trying to detect it, which will be much more accurate.

waddlesplash fixed buffer overflows in the libroot ICU timezone handling and added more error checking as well, fixing crashes in some command-line tools when too-long timezone names/paths were specified.

korli changed the VM to always put memory pages into the clear page queue in-order. Previously they were added in reverse order, which wasn't technically a problem but caused inefficiencies elsewhere (as it meant page allocations across the whole system were typically not in order, unless they were specifically requested to be.) This could (among other things) improve DMA performance by making bounce-buffers unnecessary in more cases.

korli made a first round of fixes to x86_64 context switch handling for floating-point state, to fix some rare math-exception KDLs.

### Build system

waddlesplash (based on a patch from X512) adjusted the Jam header rules to only add C++ header directories to the command line when compiling C++ files. (This fixes problems encountered with some GCC headers that have two separate versions for C and C++.)

kallisti5 adjusted the file download process to automatically retry a bit harder when downloads during a build are interrupted (e.g. by bad internet connections.)

PulkoMandy enabled `-Werror` for use of deprecated functions.

nielx updated the Debian image used for the Docker cross-compiler image.

kallisti5 made some improvements to the Google Cloud Platform preparation script (i.e. for running Haiku inside Google Cloud VMs.)

### Documentation

PulkoMandy removed an obsolete comment from the MIDI kit.

### ARM & RISC-V (and PPC?)

Yn0ga (a new contributor!) submitted a few patches dusting off the basics of Haiku's PowerPC port, removing things that are no longer needed, adjusting spec files and flags, adding a few hook functions to the bootloader, and more.

X512 and kallisti5 bumped the RISC-V port up to GCC 13.

### HaikuPorts

There was a healthy amount of activity at HaikuPorts last month, with updates to quite a lot of ports, including Qt Creator, Python, FFmpeg, Wireshark, Git, LibreOffice, Node.JS (now the latest LTS version), and lots more, as well as quite a lot of entirely new ports of applications, games, tools, and libraries.

### Xlibe

I (waddlesplash) spent a few days working on parts of Xlibe, the X11/Xlib compatibility layer. Earlier in the year I'd implemented a few features needed by FLTK (which is now packaged in HaikuDepot and being used by a few ports), and last month I was CC'ed on the GNUplot port, which built against Xlibe but then always showed a blank window. I fixed the problems causing that, as well as some others surrounding GNUplot and also Conky, and so both of those should be able to be built against Xlibe to get a graphical environment now.

After that, I also took another look at Tcl/Tk, to see if I could fix the remaining problems and make that work, as there were some more requests for Python Tkinter (which doesn't work with the SDL2-based Tk) or simply a Tk that works without all the limitations of the SDL2-based one for `git-gui` and other such ports. I fixed a number of minor problems with the port (enabling the Tk automated testsuite to start and function), and based on some clues left the month before by X512 and PulkoMandy, managed to get a handle on the source of the drawing glitches in Tk running under Xlibe: it's related to overlapping sibling BViews.

Haiku allows child views to overlap parts of the parent (obviously) but it doesn't do anything about sibling views that overlap (and neither did BeOS.) Tk, however, seems to presume this is fully legal and does it quite frequently for drawing backgrounds. On other OSes, X11 supports it natively, Win32 supports it if a certain flag is enabled, and macOS doesn't support it at all (for which Tk has a platform-specific workaround in which it manually sets clipping regions for all areas.)

There was some subsequent discussion about whether or not to permit this in Haiku and thus give app_server defined behaviors when it happens (instead of behaving strangely and unpredictably), but it wasn't conclusive. I don't know if it makes sense to spend much time on it for one specific ported X11 application. More likely it makes sense to patch Tk, like is done for macOS, but I don't think that'd be a productive use of my time at the moment. Perhaps someone else motivated will eventually look into the problem (and I can of course give you pointers as to what I've tried already, both inside Tk and inside Xlibe.)

### That's all, folks!

Thanks again to all who contribute to Haiku, and especially those donors who make my contract possible!

There's starting to be talk about making another release, though nothing definite (and there's still tickets in the milestone, and potentially more tickets that should be added there.) So: What do you think belongs in the next Haiku release? Most of the changes over the past year since the previous release were relatively "non-flashy" (this report is a pretty good example of that), but make real contributions to the system's stability and usability nonetheless. What problems (beyond large and well-known missing features besides "3D acceleration") have you encountered running Haiku recently that stop you from using it more often?
