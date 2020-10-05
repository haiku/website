+++
type = "blog"
title = "Haiku Activity Report - September 2020"
author = "bitigchi"
date = "2020-10-01 13:00:00+03:00"
tags = ["monthly activity report"]
+++

Welcome to the Haiku Monthly Activity Report for September 2020. This report covers revisions from hrev54539 to hrev54608.

## System Sounds Contest

We've started a contest for the system sounds, and currently it's ongoing. For more details, see the [contest post](https://www.haiku-os.org/news/2020-09-11-system-sound-contest/).

## Applications

AlwaysLivid improved the after-install UX via a bunch of Installer and FirstBootPrompt fixes. Now it is possible to exit the FirstBootPrompt to Desktop without having to restart the system.

AlwaysLivid added Mail auto-configure data for mailbox.org and riseup.net.

bitigchi fixed the redundant reboot confirmation in SoftwareUpdater.

Pascal Abresch made TeamMonitor and AboutSystem compliant to the system colours; previously the text colours would not react properly to dark system themes.

PulkoMandy fixed various issues with MediaPlayer and ffmpeg implementation that caused high CPU usage and problems with seeking audio files with cover art.

Murai Takashi made some code cleanups in various system parts.

syedsouban and bitigchi implemented custom search engine shortcuts in WebPositive. Currently following shortcuts are supported:

- Google (g)
- Bing (b)
- Wikipedia (w)
- DuckDuckGo (d)
- Baidu (a)
- Yandex (y)
- Ecosia (e)
- Qwant (q)

## Compatibility

CodeForEvolution implemented the `qsort_r` function.

## Documentation

John Scipione improved the documentation for BMessage and AppKit.

nielx implemented layout customisations for the Doxygen stylesheet.

## File Systems

brjhaiku implemented the initial methods required for btrfs write support. This was originally introduced during GSOC 2019 program, and still being merged gradually.

## Kernel

Jerome Duval implemented support for more CPU power modes and functions that allows the system to use the CPU power more efficiently. This fixed an issue where on some hardware the system clock speed was stuck at 1.5 GHz, and improved performance on other systems.

## Package Management

Andrew Lindesay fixed a crash in HaikuDepot whilst synchronising package metadata, also greatly improved icon caching, therefore speeding up the sync process during application start and memory consumption.

## Preferences

Preetpal Kaur's GSOC project work on Input preferences panel has been merged, and she continues to work on final polishing and bug fixes. Thanks to her work, now it's possible to have different settings for each different mouse.

Preetpal will be continuing working on Input preferences and other Haiku things during her industrial training for the next 3 months.

## POSIX

rofl0r has fixed the prototype of gethostbyaddr to be more in-line with FreeBSD and Linux.

## RISC-V

kallisti5 added u-boot support for RISC-V.

## System Kits

John Scipione fixed a regression that prevented character drawing when a tab is inserted.

Pascal Abresch implemented enabling adding custom user TLS certificates.

PulkoMandy implemented creating catalog files from external source files. This will allow localising applications written using any interpreted language.

## System Servers

PulkoMandy implemented support for saving brightness settings when rebooting the system, and polished the code for handling screen brightness.

## System Translators

Gerasim Troeglazov fixed a crash that occurs while displaying `.icns` files.

------

If you would like to try out these changes right away, grab a copy of the latest [nightlies](https://download.haiku-os.org) and give it a go!

The Haiku Project always welcomes new faces. If you are a developer, sysadmin, designer, or a writer, we'd appreciate your support. Come meet us at the [Freenode #haiku IRC channel](irc://chat.freenode.net/haiku),  [forums](https://discuss.haiku-os.org) or introduce yourself on the [Haiku mailing list](https://www.freelists.org/list/haiku).

See you next month!
