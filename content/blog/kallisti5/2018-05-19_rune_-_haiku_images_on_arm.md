+++
type = "blog"
title = "Rune - Haiku Images on ARM"
author = "kallisti5"
date = "2018-05-19 15:33:42-05:00"
tags = ["haiku", "software"]
+++

Up until recently, Haiku builds for ARM have targetted individual ARM boards. The compile process for ARM images required two things: an architecture, and a target board (such as the Raspberry Pi 2). This board setting adjusted a large number of defines throughout Haiku at compile time to set the operating system up for the target ARM device. The board selection also handled placing all the propriety bits (a lot of which have sketchy licensing) into the Haiku image during compile. Haiku would then has to distribute these files. (sketchy licensing and all)

Over the past few years, François Revol, Ithamar R. Adema, and others have worked to add [Flat Device Tree (FDT)](https://elinux.org/Device_Tree_Reference) support to Haiku. FDT's enable operating systems to obtain core knowledge of the devices they run on by simply swapping one or more compiled binary files. These files describe critical things the operating system needs to know about the hardware they run on. *Really* important things such as what devices exist at what memory locations. (Think video frame buffers, serial ports, etc)

In a series of cryptic commits in July 2017, I removed these board-centric build steps with grand plans of making testing (and running) Haiku on ARM devices *easier*.

# Strange Inspirations

Inspiration comes from strange places. In 2016, I started playing around with [Fedora on ARM](https://arm.fedoraproject.org/).  Fedora instructs you to download a generic ARM Image. With my experience and pains with Haiku on ARM, this seemed odd to me.  How can they give you "one image" which works on all devices? There are a huge number of properitery bits which you need to include in boot partitions for each board... some ARM boards even require binary blobs copied to special offset addresses outside of the filesystem. Fedora's answer (and magic) lies in their "arm-image-installer" script.

Fedora's arm-image-installer tool:

  * Takes the Fedora ARM image you download
  * You specify the target board (Like the Raspberry Pi 3)
  * Takes the properiety bootloader artifacts from your local system
  * Selects the correct FDT file
  * Burns all of this to an SD card ready to boot on your device

So, end users use the "arm-image-installer" tool to "burn" the ARM image to an SD card (and doing a bunch of magic under the covers)

{{< alert-warning "Spoiler" "Haiku on ARM is in its infancy. Don't expect any magic. 'rpi2' will likely work the 'best' which involves loading out kernel and spitting out information to the serial uart.">}}

# Rune Image

With arm-image-installer in my mind, I went to work on "Rune Image". Rune is a tool written in Rust which:

  * Takes a generic ["Haiku ARM" image](https://download.haiku-os.org/nightly-images/arm/) you provide (hrev51955 or later)
  * Reads a JSON document in one of our [git repositories](https://github.com/haiku/firmware) via HTTP
  * Grabs the needed prioperitery bits (as well as u-boot binaries + documented source locations) via HTTP
  * Selects the correct FDT dtb file
  * Burns all of this to an SD card (or modifies an existing image) ready to boot on your device.

As long as our ARM build architecture (currently ARMv7) is compatible with the hardware, generic images can run on any ARM hardware as long as we have driver support, a valid Device Tree binary for the board, and the requirements defined in our [repository manifest](https://github.com/haiku/firmware/blob/master/manifest.json).

A quick (poorly edited) [demo video](https://vimeo.com/271101255).

You can find a pre-compiled binary for Linux x86_64 [here](https://github.com/kallisti5/rune-image/releases/tag/v0.1.0).

# Why Rust?

I've had a few people ask why I wrote rune in Rust when Haiku is 99% C++. I actually have a lot of good reasons...

  * Cross-platform.
    * Rune compiles on Linux, OS X, Windows (untested), and Haiku (our Rust port needs work though).
    * This tool is intended to be run by end users. It needs to be portable to their operating systems.
  * Low-level.
    * Rune doesn't need mtools or other external requirements.
    * Rune writes to FAT partitions in our images _directly_.
  * Minimal requirements.
    * Easy HTTP, JSON, etc, with built-in libraries.

# Future

Lets avoid the sensational "Haiku now runs on ARM" news.
Haiku has run on ARM for quite some time, these changes simply enable us to increase our development velocity while simplifying the distribution of Haiku ARM images to a single "generic ARMv7" image.

I am hopeful though that this will place some more excitement on running Haiku on ARM, and lure in more interested developers and testers. :-)
