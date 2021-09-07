+++
type = "article"
title = "General FAQ"
date = "2009-09-09T21:30:50.000Z"
tags = []
+++

# Frequently Asked Questions {#top}
Here are some Frequently Asked Questions about Haiku. For development related topics, please check out the [Development FAQ](/development/faq).

  * Common Questions
    * [What is Haiku?](#what-is-haiku)
    * [Why isn't it called HaikuOS?](#why-isn-t-it-called-haikuos)
    * [Where does the name Haiku come from?](#where-does-the-name-haiku-come-from)
    * [Is Haiku based on Linux?](#is-haiku-based-on-linux)
    * [Why not Linux?](#why-not-linux)
    * [Is Haiku then based on BeOS?](#is-haiku-then-based-on-beos)
    * [I've never seen Haiku. What does it look like?](#i-ve-never-seen-haiku-what-does-it-look-like)
    * [Can I use Haiku as my primary Operating System?](#can-i-use-haiku-as-my-primary-operating-system)
    * [Can Haiku connect to the Internet?](#can-haiku-connect-to-the-internet)
    * [What is the status of wireless internet connections?](#what-is-the-status-of-wireless-internet-connections)
    * [What license is Haiku released under?](#what-license-is-haiku-released-under)
    * [What is Haiku Inc.?](#what-is-haiku-inc)
    * [What platform(s) is Haiku targeted to run on?](#what-platform-s-is-haiku-targeted-to-run-on)
    * [Is there a 64-bit version of Haiku?](#will-there-be-a-64-bit-version-of-haiku)
  * Package Management
    * [Is there a package manager?](#is-there-a-package-manager)
    * [How do I update my installation of Haiku?](#how-do-i-update-my-installation-of-haiku)
    * [Where can I get more software for Haiku?](#where-can-i-get-more-software-for-haiku)
  * Applications
    * [Is there an instant messenger client?](#is-there-an-instant-messenger-client)
    * [Is there Java support?](#is-there-java-support)
    * [Is there Flash support?](#is-there-flash-support)
    * [Is there an office suite?](#is-there-an-office-suite)
    * [Are there any games for Haiku?](#are-there-any-games-for-haiku)
    * [Are Python, Ruby, Perl and Rust available on Haiku?](#is-there-python-ruby-perl)
    * [Will GoBe Productive work in Haiku?](#will-gobe-productive-work-in-haiku)
  * Technical
    * [When is the next release?](#when-is-the-next-release)
    * [I heard Haiku still uses gcc2, is that true?](#i-heard-haiku-still-uses-gcc2-is-that-true)
    * [Is there support for newer GCC compilers?](#is-there-support-for-newer-gcc-compilers)
    * [How do I use the different GCC versions?](#how-do-i-use-the-different-gcc-versions)
    * [What is Kernel Debugging Land?](#what-is-kernel-debugging-land)
    * [This sounds cool. How do I enter Kernel Debugging Land?](#this-sounds-cool-how-do-i-enter-kernel-debugging-land)
  * Hardware
    * [What are the minimum hardware requirements to run Haiku?](#what-are-the-minimum-hardware-requirements-to-run-haiku)
    * [Why doesn't Haiku let me use my monitor's resolution?](#why-doesn-t-haiku-let-me-use-my-monitor-s-resolution)
    * [How can I check which graphics driver is being used?](#how-can-i-check-which-graphics-driver-is-being-used)
    * [Haiku seems to be using VESA, what am I missing?](#haiku-seems-to-be-using-vesa-what-am-i-missing)
    * [What graphic cards are supported?](#what-graphic-cards-are-supported)
    * [Is there multiple monitor support?](#is-there-multiple-monitor-support)
    * [How come there is no sound?](#how-come-there-is-no-sound)
    * [Why is there no network access in VirtualBox?](#why-is-there-no-network-access-in-virtualbox)
    * [Is there a list of working hardware?](#is-there-a-list-of-working-hardware)
  * Installing
    * [Where can I get Haiku from?](#where-can-i-get-haiku-from)
    * [Is there a live DVD available?](#is-there-a-live-dvd-available)
    * [How do I build Haiku from source?](#how-do-i-build-haiku-from-source)
    * [How do I install to a USB stick?](#how-do-i-install-to-a-usb-stick)
    * [Now that I have Haiku on a USB stick, how do I install Haiku to my system?](#now-that-i-have-haiku-on-a-usb-stick-how-do-i-install-haiku-to-my-system)
    * [I have VirtualBox. Which image should I use?](#i-have-virtualbox-which-image-should-i-use)
  * Using
    * [Why doesn't the tilde key work properly?](#why-doesn-t-the-tilde-key-work-properly)
    * [How do I change my keyboard layout?](#how-do-i-change-my-keyboard-layout)
    * [Is there some kind of failsafe mode I can boot into? How do I get to it?](#is-there-some-kind-of-failsafe-mode-i-can-boot-into-how-do-i-get-to-it)

## Common Questions
Questions most commonly asked about the Haiku operating system.

### What is Haiku?
Haiku is a fast, efficient, easy to use and lean open source operating system inspired by the BeOS that specifically targets personal computing.
It is also the name of the project that develops and promotes Haiku the operating system.

### Why isn't it called HaikuOS?
The name of the project is simply "Haiku". Unfortunately, despite numerous attempts, the registration of haiku.org has not been possible; hence the reason for haiku-os.org.

### Where does the name Haiku come from?
Haiku is named after the classical three-line Japanese poetry form. Haiku poetry is known for its quiet power, elegance, and simplicity - among
the core qualities of BeOS which we aim to recreate in Haiku. BeOS included some haiku in its user interface, in the form of network error messages
displayed by its web browser. A list of most of the haikus is available at [http://8325.org/haiku](http://8325.org/haiku).

    Sites you are seeking
    From your path they are fleeing
    Their winter has come.

OpenBeOS was eventually renamed to Haiku to avoid trademark conflicts. The name "Haiku" got the most votes in a public poll in late 2002. Competing
candidates were: Auros, Begin, Dysis, Firebox, Firefly, Forge, Indigo, Infinity, Jaffa, Mantis, Menlo, Nemo, Nova, Terra.

### Is Haiku based on Linux?
Haiku is not a Linux distribution, nor does it use the Linux kernel. Haiku is the spiritual successor to [BeOS](https://en.wikipedia.org/wiki/BeOS)
and it is derived from the [NewOS](https://newos.org/) kernel, which was authored by Travis Geiselbrecht (`geist`), who was formerly employed by
[Be Inc.](https://en.wikipedia.org/wiki/Be_Inc.) — the developers of BeOS.

### Why not Linux?
Linux-based distributions stack up software -- the Linux kernel, the X Window System, and various DEs with disparate toolkits such as GTK+ and Qt -- that
do not necessarily share the same guidelines and/or goals. This lack of consistency and overall vision manifests itself in increased complexity, insufficient
integration, and inefficient solutions, making the use of your computer more complicated than it should actually be.

Instead, Haiku has a single focus on personal computing and is driven by a unified vision for the whole OS. That, we believe, enables Haiku to provide a
leaner, cleaner and more efficient system capable of providing a better user experience that is simple and uniform throughout.

### Is Haiku then based on BeOS?
Haiku reimplements both the BeOS technologies as well as the end user experience, but it is far from being based on BeOS from a code base perspective.
The only BeOS code that has made it into Haiku are Tracker and the Deskbar (the file manager and the equivalent of the start menu/taskbar, respectively).
These were open sourced by Be Inc. back in 2001, later forked under the [OpenTracker project](http://www.opentracker.be/main.html), and eventually merged
into the Haiku code base. The rest is either homebuilt code or derivatives of existing open source software. Despite that, the [Haiku API](https://www.haiku-os.org/docs/api/)
is mostly compatible with the BeOS API. In other words, many applications that were initially developed for BeOS work flawlessly on Haiku.

### I've never seen Haiku. What does it look like?
Check out our [Haiku Slideshow](/slideshows/haiku-1/) and the [Haiku Movies](/about/movies) pages.

### Can I use Haiku as my primary Operating System?
Yes! Although the OS is still considered "beta", it is reasonably stable and can be used to perform most daily tasks such as browsing the web
 writing and reading e-mails, or listening to music and watching videos. We strongly recommend that you make backups of your personal files regularly.

### Can Haiku connect to the Internet?
Yes! We reuse network drivers from FreeBSD, so most network adapters will work on Haiku out of the box. Haiku includes an e-mail client and a
web browser, and you can install other network-enabled applications.

### What is the status of wireless internet connections?
Wireless drivers are supported by our FreeBSD compatibility layer as well, and they should also work fine. You can connect to WEP, WPA, WPA2,
and open networks easily using the GUI.

### What license is Haiku released under?
Most of the Haiku code is released under the very liberal [MIT License](https://opensource.org/licenses/mit-license.php). Some third party components
(e.g.: some media codecs, libraries, etc.) use other licenses. Please note that the Haiku name and logo are trademarks of Haiku, Inc.

Please visit the [Haiku, Inc. website](https://haiku-inc.org/trademarks/) for more information regarding the Haiku trademarks and their usage requirements.

### What is Haiku Inc.?
Haiku Inc. is the non-profit organization based in the United States whose goal is to support the development and success of Haiku. For more information,
[please visit Haiku Inc.'s website](https://www.haiku-inc.org).

### What platform(s) is Haiku targeted to run on?
The main target for Haiku R1 is the x86 (Intel, AMD, and compatible) platform. There are [ports to other platforms underway](/guides/building/port_status),
such as RISC-V, PowerPC, Sparc, and ARM. However, it is not clear whether these will be supported or not. What platforms we support in the future will
heavily depend on the availability of resources to support their development.

### Is there a 64-bit version of Haiku?
Yes. Please note that the 64-bit release does _not_ support BeOS binaries, but it is still compatible with the powerful BeOS API
(while offering modern features). The 32-bit Haiku release can run most BeOS applications without modification or recompiling.

## Package Management
Some common questions around the installation of software packages under Haiku.

### Is there a package manager?
Yes! Haiku comes with a powerful package management system which makes it very easy to install applications and keep them up to date. Applications are
distributed as package files which can either be installed from _HaikuDepot_, the graphical package management application, or downloaded directly
from websites or other sources. We also offer a package manager for the Terminal called `pkgman`, which is primarily intended for advanced users.

### How do I update my installation of Haiku?
All installed packages, system as well as third-party, can be updated with the _SoftwareUpdater_ application.

### Where can I get more software for Haiku?
The _HaikuDepot_ application is the main entry point to discover Haiku software. It allows you to install many applications and libraries
packaged by the [HaikuPorts project](https://github.com/haikuports)

There are also some [alternative repositories](https://www.haiku-os.org/community/software) to get packages.

## Applications

### Is there an instant messenger client?
Yes! There are actually multiple messaging applications available for Haiku for various protocols, such as IRC (Vision, Quassel, WeeChat, irrsi),
Matrix (Quaternion, nheko) and XMPP (Renga, Caya, Vacuum).

**Vision**, **Renga** and **Caya** were speciically developed for the Haiku operating system. They are being maintained by members of our community.

### Is there Java support?
Yes! The OpenJDK virtual machine is available and enables you to run applications such as Netbeans, JDownloader, and much more.

### Is there Flash support?
Not at the moment. Flash is proprietary technology from Adobe, making it difficult to support for a small open-source operating system such as Haiku.
However, there are ways to enjoy the web without Flash, such as using HTML5 compatible versions of webpages (youtube and grooveshark support this for
example). Besides, Adobe [deprecated Flash](https://theblog.adobe.com/adobe-flash-update/) anyway.

### Is there an office suite?
There are several options:

  * You can install [LibreOffice](https://www.libreoffice.org/) available at _HaikuDepot_.
  * You can find the [Caligra](https://www.calligra.org/) office suite at _HaikuDepot_.
  * You can use online tools, such as [Google Docs](https://docs.google.com).
  * You can use native applications, such as Sum-It (spreadsheet), WonderBrush (drawing and graphical design).
  * If you happen to own an old copy of GoBe productive laying around, you can use it on Haiku with the 32-bit version of Haiku.
    Unfortunately, it is not being distributed anymore.

### Are there any games for Haiku?
Yes! _HaikuDepot_ offers a selection of open source and freeware games. Most games written for BeOS will also run fine,
and you can use emulators, such as DOSBox, Dolphin, snes9x MAME and RetroArch, to run games originally written for
other systems and consoles as well.

### Are Python, Ruby, Perl and Rust available on Haiku?
Yes! Haiku supports these common languages and many more.

### Will GoBe Productive work in Haiku?
Yes! Haiku's 32-bit installation is binary-compatible with BeOS R5, which means applications designed for BeOS R5 will run.
There may still be a few drawing bugs and other glitches, remember Haiku is still in beta stage.
Overall, GoBe Productive should be usable.

## Releases
### When is the next release?
You can check the status of the releases at the [roadmap page](https://dev.haiku-os.org/roadmap).

## Technology
### I heard Haiku still uses gcc2, is that true?
Our own internal fork of gcc2 is used to compile the x86 32-bit release to maintain BeOS binary compatibility. While gcc2 is the primary compiler
for the x86 32-bit release, it also includes a modern version of gcc (`gcc8`) which can be leveraged to compile newer applications requiring it.

Other architectures (including x86_64) don't leverage gcc2.

### Is there support for newer GCC compilers?
Yes! In order to provide support for a modern version of C++ and up to date libraries, the official versions of Haiku come with both gcc2 and
gcc8 installed, and a set of libraries suitable for use with each compiler. If you are not interested in BeOS support, we also provide a
64-bit version of the system that uses only gcc8.

### How do I use the different GCC versions?
The ``setarch`` command can be used to switch between different architectures. On 32-bit Haiku the default architecture is "x86_gcc2",
secondary architecture is "x86".

### What is Kernel Debugging Land?
The Haiku kernel comes with a powerful and user-friendly on-screen debugger. There you can enter commands investigate the problem
and collect information in order to [send us a bug report](https://www.haiku-os.org/docs/welcome/en/bugreports.html).

You can also reboot the machine, [generate QR codes](/blog/mmlr/2012-07-01_qr_encode_your_kdl_output), or play a game of hangman. :)

### This sounds cool. How do I enter Kernel Debugging Land?
Unfortunately, the most common way to enter the kernel debugger is on a crash of the Haiku kernel. Whenever the kernel thinks
something is wrong, it will call the kernel debugger and stop all userland applications.

You can also invoke the kernel debugger manually:

  * You can use the ``kernel_debugger`` command from Terminal.
  * Or you can use the special shortcut {{< keyboard ALT >}}+{{< keyboard SysRq >}}+{{< keyboard d >}}.

The SysRq key is usually the same as "print screen", but may need to press an extra function key on some laptops.

## Hardware
### What are the minimum hardware requirements to run Haiku?
The x86 32-bit release of Haiku will run on a Pentium or better CPU with 384 MiB of RAM (as long as virtual memory is activated),
1.5 GiB of storage space and a VESA compliant video card.

However, for a satisfactory user experience, we recommend **at least** a Pentium4 with 512 MiB of RAM and 3 GiB of storage space.
For compiling Haiku within itself, we recommend using at least 2 GiB of RAM.

### Why doesn't Haiku let me use my monitor's resolution?
Haiku is most likely using the VESA driver. As with any other VESA driver, it has strict limitations. The problem
is that the VESA driver cannot configure an arbitrary resolution, even if it recognizes the correct resolution
from your monitor.

It can only *pick* (quite literally) one resolution from a fixed list, the VESA BIOS list as manufactured in your graphics board.
It cannot configure the mode on the chip as a special graphics driver can.

### How can I check which graphics driver is being used?
There are two common ways to check. First, the _Screen_ preferences shows this information at the top left of the window.
Alternatively, from within Terminal, you can run

``
listimage | grep accel
``

If ``vesa.accelerant ``is shown amongst other text, then Haiku does not have a dedicated driver for your graphics card and instead is using VESA.

### Haiku seems to be using VESA, what am I missing?

### What graphic cards are supported?
The VESA driver provides a fallback and works with the vast majority of video cards.

Haiku also provides drivers for several other card families. We maintain a [list of video card drivers](https://dev.haiku-os.org/wiki/HardwareInfo/video)
that are currently available on Haiku.

### Is there multiple monitor support?
Some drivers (non-HD Radeon and Matrox) have experimental multi-monitor support, which allows both a clone and an
extended desktop mode. However, applications are not made aware of the fact that the display is split across multiple
monitors, which leads to issues such as windows opening in the middle of the desktop, split between the two monitors.

### How come there is no sound?
First of all, you should check whether your sound card is visible in the _Media_ preferences. If it is, but there's still no sound,
this probably means that there is some sort of a problem with our audio drivers. Please [contact us if that is the case](https://www.haiku-os.org/contact).

Most modern PC hardware uses sound devices compatible with the Intel HDA (high definition audio) specification.
Unfortunately, the specification leaves the routing of the audio signals to the different outputs not completely
specified, making it difficult to write a driver that works out of the box on all machines.

### Why is there no network access in VirtualBox?
The default network adapter type in VirtualBox is known to not work well with Haiku.

Fortunately, VirtualBox provides several alternatives, which work much better. Try configuring
your machine to use one of those, see the guide [Emulating Haiku in VirtualBox](/guides/virtualizing/virtualbox)

### Is there a list of working hardware?
You can find a list of drivers in the [development wiki](https://dev.haiku-os.org/wiki/HardwareInfo).

## Installing
### Where can I get Haiku from?
At the [Get Haiku!](/get-haiku) page you can download ISO images which can be be burned to a DVD, or written to a USB flash drive.
The page has also information on how to order a physical Installation DVD. The latest and possibly unstable nightly images
are [available here](https://download.haiku-os.org/).

### Is there a live DVD available?
The installation DVD is also a Live DVD.

### How do I build Haiku from source?
Instructions for [building Haiku](/guides/building) from source are documented in our guides.

## Using
### Why doesn't the tilde key work properly?
The tilde {{< keyboard "~" >}} key is a dead key, used to type characters like ñ. To type a standalone tilde, you need to either
press the tilde key twice or press it followed by space. If you wish to change that, you can customize your dead keys in the
_Keymaps_ preferences panel. You can also use the "US" keyboard layout which doesn't include this feature.

### How do I change my keyboard layout?
Use the _Keymaps_ preferences. If your preferred layout is not available there yet, you can customize an existing one by drag'n'dropping the keys around.

### Is there some kind of failsafe mode I can boot into? How do I get to it?
You can get to the boot menu by holding {{< keyboard SHIFT >}} or pressing {{< keyboard SPACE >}} before the Haiku boot screen shows.
From there you can toggle several safe mode settings, such as forcing a lower video resolution, preventing drivers from getting
loaded, or disabling some hardware features by blocking its driver. See the
[user guide's Boot Loader](/docs/userguide/en/bootloader.html) chapter.
