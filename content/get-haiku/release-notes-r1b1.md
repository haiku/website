+++
draft = true
type = "article"
title = "Release Notes"
tags = []
+++
date = "NEEDS_ACTUAL_DATE"

It's been almost five years since Haiku's last release in November 2012 &mdash; too long. Most of the delay was due to a handful of infrastructural issues that took some time to get ironed out. Please keep in mind that this is beta-quality software, which means it is feature complete but still contains known and unknown bugs. While we are mostly confident in its stability, we cannot provide any assurances against data loss.

As a result of such a long gap between releases, there are a lot more changes in this release than in previous ones, and so this document is weightier than it has been in the past. The notes are mostly organized in order of importance and relevance, not chronologically, and due to the sheer number of changes, thousands of smaller improvements simply aren't recognized here.

## Variants

This release sees the addition of official 64-bit x86_64 images, alongside the existing 32-bit x86_gcc2 ones.

{{< alert-info "BeOS ABI" "64-bit releases are not capable of running BeOS (GCC2) applications without them being recompiled.">}}

### Haiku 32-bit

  - **Architecture:** x86_gcc2
  - **BeOS Binary Compatibility:** Yes
  - **Compiler:** gcc 2.95.3 (x86_gcc2) + gcc 5.4.0 (x86)
  - **Minimum system requirements**
    - **Processor**: Intel Pentium II; AMD Athlon
    - **Memory:** 256MiB
    - **Monitor:** 800x600
    - **Storage:** 1GiB
  - **Recommended system configuration**
    - **Processor**: Intel Core 2 Duo; AMD Athlon II
    - **Memory:** 2GB
    - **Graphics Card:** ATI/AMD, Intel
    - **Monitor:** 1366x768
    - **Storage:** 8GiB

### Haiku 64-bit

  - **Architecture:** 64-bit x86_64
  - **BeOS Binary Compatibility:** No
  - **Compiler:** gcc 5.4.0 (x86_64)
  - **Minimum system requirements**
    - **Processor**: 64-bit CPU. Intel Core 2 (2006+); AMD Opteron (2003+)
    - **Memory:** 2GiB
    - **Graphics Card:** ATI/AMD, Intel
    - **Monitor**: 800x600
    - **Storage:** 8GiB

## New features

### Package manager

By far the largest change in this release is the addition of a complete package management system. Finalized and merged during 2013 thanks to a series of contracts funded from donations, Haiku's package management system is unique in a variety of ways. Rather than keeping a database of installed files with a set of tools to manage them, Haiku packages are a special type of compressed filesystem image, which is 'mounted' upon installation (and thereafter on each boot) by the `packagefs`, a kernel component.

This means that the `/system/` hierarchy is now read-only, since it is merely an amalgamation of the presently installed packages at the system level (and the same is true for the `~/config/` hierarchy, which contains all the packages installed at the user level)

uncorruptible image
bootloader revert
fast install/uninstall times

### WebPositive upgrades

 - updated WebKit
 - HTML5 video
 - Gopher (lol)

### Completely rewritten network preflet

### Experimental Bluetooth stack

### Media subsystem improvements

 - FFmpeg plugin refactoring
 - Streaming
 - DVB
 - HDA driver
 - APE reader (lol)

### Live color updates & GUI cleanup

 - Tracker layout
 - Mail icons
 - Decorators support S&T

### RemoteDesktop

### SerialConnect

 - New app
 - Improved USB + PC serial drivers to go with it

### New thread scheduler

also new memcpy/memset on x64

### ASLR & DEP implemented and enabled by default

### Haiku Debugger now default

 - Existed before but vastly improved
 - Crash dialogs
 - Screenshot of UI

### launch_daemon

### `virtio` bus manager and drivers

 - incl. virtio rng

### NFSv4 filesystem driver

### BKeyStore

### 64-bit `time_t` (except on 32-bit x86)


## New contributors

<new-committers>

<new-patch-submitters>

<new-translators>







## Source code

The source code of Haiku itself, the source code of the required build tools and the optional packages (except for closed source ones) is made available for download at: http://www.haiku-files.org/files/releases/r1alpha4/sources/</p>

## Reporting issues

There are over 2400 open tickets on Haiku's bug tracker and over 6600 closed items.  If you find what you believe to be an issue, please search our Trac to see if it has already been reported, and if not, file a new ticket at <https://dev.haiku-os.org/>.

For information about major issues that have been fixed since the release, visit <https://dev.haiku-os.org/wiki/R1/Beta1/ReleaseAddendum>.

For more help see the 'Welcome' link on the Haiku desktop, or visit the Haiku Project's website at <https://www.haiku-os.org>.
