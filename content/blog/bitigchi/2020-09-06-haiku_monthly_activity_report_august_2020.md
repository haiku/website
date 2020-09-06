+++
type = "blog"
title = "Haiku Activity Report - August 2020"
author = "bitigchi"
date = "2020-09-06 13:00:00+03:00"
tags = ["monthly activity report"]

Welcome to the Haiku Monthly Activity Report for August 2020. This report covers revisions from hrev54480 to hrev54538.

This month is not active as the last one, but we have exciting improvements in the pipeline, since GSOC 2020 is coming to an end, and our developers are working hard to review GSOC projects at a fast pace.

## Applications

Humdinger improved accessibility on WebPositive by adding a missing tooltip on Settings window.

PulkoMandy and nielx worked on making the Installer more reliable by refining CopyEngine and post-install scripts.

PulkoMandy worked on fixing Pulse issues, now it is scales nicely on modern systems. Previosly, the CPU image was not readable due to bitmap issues. PulkoMandy also improved battery detection for PowerStatus.

PulkoMandy also contributed some nice interface fixes to Icon-o-Matic, it uses more native Haiku widgets, and supports longer filenames.

## arm

kallisti5 continued working on making Haiku working under arm architecture. Currently Haiku is crashing early in the boot process, and it is being investigated.

## Deskbar

John Scipione has re-implemented the old vertical Deskbar mini mode. This version was deprecated in favor of the new horizontal mini mode, which uses only a tab-height of space. With this addition, it is now possible to use Deskbar in 4 different modes:

- Default mode
- Horizontal mini mode
- Vertical mini mode
- Expanded mode

## Drivers

Michael Lotz continued working on audio drivers. Specifically:

- ac97/es1370 audio driver
- ac97/auich audio driver
- multi_audio buffer keeping has been improved

## ffmpeg

PulkoMandy has improved ffmpeg support in Haiku, fixing multiple memory leaks, asserts, and deleting unnecessary code.

## GSOC 2020

Following students wrapped up their work on their respective areas:

- Preetpal Kaur, worked on improving input devices support, including Joysticks, tablets, pens, and multiple mice
- leorize, worked on improving Haiku networking code, which will lead to faster page loads in WebPositive and better communication in other networking tasks
- Cruxbox, worked on adding XFS file system read support to Haiku
- SuhelMehta, worked on adding UFS2 file system read support to Haiku

## Kernel

Michael Lotz continued improving the Haiku kernel, fixing exception handlings, security issues, and improving address space support, allowing more than 32TB.

## m68k

mmu_man improved m68k boot loader support, contributed some build fixes and refactoring, so that it can fit in a boot floppy.

## POSIX

rofl0r has fixed the prototype of gethostbyaddr to be more in-line with FreeBSD and Linux.

## RISC-V

kallisti5 continued working on the RISC-V architecture. The initial work on an EFI loader is complete, and u-boot is working.

## System Kits

PulkoMandy has contributed a fix that allows creating a strings catalog just with a MIME-type, there is no need for a separate entry_ref from now on. This will allow localising strings that are not linked to an application or library.

## Tracker

PulkoMandy fixed a resizing issue on Tracker info windows, making it possible to resize info windows without visual glitches.

## Translators

PulkoMandy fixed a locking issue on TranslatorRoster, helping avoid deadlocks if be_app is not yet running.

If you would like to try out these changes right away, grab a copy of the latest [nightlies](https://download.haiku-os.org) and give it a go!

Haiku Project always welcomes new faces. If you are a developer, sysadmin, designer, or a writer, we will always appreciate your support. Come meet us at the [Freenode #haiku IRC channel](irc://chat.freenode.net/haiku),  [forums](https://discuss.haiku-os.org) or introduce yourself in the [Haiku mailing list](https://www.freelists.org/list/haiku).

See you next month!
