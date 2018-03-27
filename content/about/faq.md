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
    * [I've never seen Haiku. What does it look like?](#ive-never-seen-haiku-what-does-it-look-like)
    * [Can I use Haiku as my primary Operating System?](#can-i-use-haiku-as-my-primary-operating-system)
    * [Can Haiku connect to the Internet?](#can-haiku-connect-to-the-internet)
    * [What is the status of wireless internet connections?](#what-is-the-status-of-wireless-internet-connections)
    * [What license is Haiku released under?](#what-license-is-haiku-released-under)
    * [What is Haiku Inc.?](#what-is-haiku-inc)
    * [What platform(s) is Haiku targeted to run on?](#what-platforms-is-haiku-targeted-to-run-on)
    * [Will there be a 64-bit version of Haiku?](#will-there-be-a-64-bit-version-of-haiku)
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
    * [Is there python, ruby, perl?](#is-there-python-ruby-perl)
    * [Will GoBe Productive work in Haiku?](#will-gobe-productive-work-in-haiku)
  * Technical
    * [When is the next release?](#when-is-the-next-release)
    * [I heard Haiku still uses GCC2, is that true?](#i-heard-haiku-still-uses-gcc2-is-that-true)
    * [Is there support for newer GCC compilers?](#is-there-support-for-newer-gcc-compilers)
    * [How do I use the different GCC versions?](#how-do-i-use-the-different-gcc-versions)
    * [What is Kernel Debugging Land?](#what-is-kernel-debugging-land)
    * [This sounds cool. How do I enter Kernel Debugging Land?](#this-sounds-cool-how-do-i-enter-kernel-debugging-land)
  * Hardware
    * [What are the minimum hardware requirements to run Haiku?](#what-are-the-minimum-hardware-requirements-to-run-haiku)
    * [Why doesn't Haiku let me use my monitor's resolution?](#why-doesn-t-haiku-let-me-use-my-monitors-resolution)
    * [How can I check which graphics driver is being used?](#how-can-i-check-which-graphics-driver-is-being-used)
    * [Haiku seems to be using VESA, what am I missing?](#haiku-seems-to-be-using-vesa-what-am-i-missing)
    * [What graphic cards are supported?](#what-graphic-cards-are-supported)
    * [Is there multiple monitor support?](#is-there-multiple-monitor-support)
    * [How come there is no sound?](#how-come-there-is-no-sound)
    * [Why is there no network access in VirtualBox?](#why-is-there-no-network-access-in-virtualbox)
    * [Is there a list of working hardware?](#is-there-a-list-of-working-hardware)
  * Installing
    * [Where can I get Haiku from?](#where-can-i-get-haiku-from)
    * [Is there a live CD available?](#is-there-a-live-cd-available)
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
Haiku is a fast, efficient, easy to use and lean open source operating system inspired by the BeOS that specifically targets personal computing. It is also the name of the project that develops and promotes Haiku the operating system.

### Why isn't it called HaikuOS?
The name of the project is simply "Haiku". Unfortunately, despite numerous attempts, the registration of haiku.org has not been possible; hence the reason for haiku-os.org.

### Where does the name Haiku come from?
Haiku is named after the classical three-line Japanese poetry form. Haiku poetry is known for its quiet power, elegance, and simplicity - among the core qualities of BeOS which we aim to recreate in Haiku. BeOS included some haiku in its user interface, in the form of network error messages displayed by its web browser. A list of most of the haikus is available at [http://8325.org/haiku](http://8325.org/haiku).

    Sites you are seeking
    From your path they are fleeing
    Their winter has come.

While there are no current plans to include poetic messages in Haiku, we consider this another subtle way of proudly cherishing our BeOS roots.

### Is Haiku based on Linux?
Haiku is not a Linux distribution, nor does it use the Linux kernel.

### Why not Linux?
Linux-based distributions stack up software -- the Linux kernel, the X Window System, and various DEs with disparate toolkits such as GTK+ and Qt -- that do not necessarily share the same guidelines and/or goals. This lack of consistency and overall vision manifests itself in increased complexity, insufficient integration, and inefficient solutions, making the use of your computer more complicated than it should actually be.

Instead, Haiku has a single focus on personal computing and is driven by a unified vision for the whole OS. That, we believe, enables Haiku to provide a leaner, cleaner and more efficient system capable of providing a better user experience that is simple and uniform throughout.

### Is Haiku then based on BeOS?
Haiku reimplements both the BeOS technologies as well as the end user experience, but it is far from being based on BeOS from a code base perspective. The only BeOS code that has made it into Haiku are Tracker and the Deskbar (the file manager and the equivalent of the start menu/taskbar, respectively). These were open sourced by Be Inc. back in 2001, later forked under the [OpenTracker project](http://www.opentracker.be/main.html), and eventually merged into the Haiku code base. The rest is either homebuilt code or derivatives of existing open source software.

### I've never seen Haiku. What does it look like?
Check out our [Haiku Slideshow](/slideshows/haiku-1) and the [Haiku Movies](/about/movies) pages.

### Can I use Haiku as my primary Operating System?
Yes! Although the OS is still considered in "alpha" stage, it is reasonably stable and can be used to perform most daily tasks such as browsing the web, writing and reading e-mails, or listening to music and watching videos. Making regular backups is recommended, of course.

### Can Haiku connect to the Internet?
Yes! We reuse network drivers from FreeBSD, so most network adapters will work on Haiku out of the box. Haiku includes an e-mail client and a web browser, and you can install other network-enabled applications.

### What is the status of wireless internet connections?
Wireless drivers are supported by our FreeBSD compatibility layer as well, and they should also work fine. You can connect to WPA, WEP and open networks easily using the GUI.

Some wireless network adapters require installation of a firmware file, which must be installed by running the install-wifi-firmwares script (see the guide [Connecting to wireless networks](/guides/daily-tasks/wireless).

### What license is Haiku released under?
Most of the Haiku code is released under the very liberal [MIT License](http://www.opensource.org/licenses/mit-license.php). Some third party components (e.g.: some media codecs, libraries, etc.) may use other licenses. Our HVIF icons are also made available under the MIT License, [without trademark claims by Haiku, Inc](http://www.haiku-inc.org/haiku-icons.html). See also the [Haiku, Inc. website](http://www.haiku-inc.org/trademarks.html) for the Haiku trademarks and their usage requirements.

### What is Haiku Inc.?
Haiku Inc. is the non-profit organization based in the United States whose goal is to support the development and success of Haiku. For more information, [check out this page](http://haiku-inc.org)

### What platform(s) is Haiku targeted to run on?
The main target for Haiku R1 is the x86 (Intel, AMD, and compatible) platform. There are ports to other platforms underway, such as PowerPC, MIPS, and ARM. However, it is not clear whether these will be supported or not. What platforms we support in the future will heavily depend on the availability of resources to support their development.

### Will there be a 64-bit version of Haiku?
Yes. For R1 we are targeting two architectures, 32-bit x86 (i586 and newer) and 64-bit x86_64. The 32-bit release is compatible with the BeOS at a binary and API level. The 64-bit release is _not_ binary compatible with BeOS, but still enjoys compatibility with the powerful BeOS API (while offering modern features). The 32-bit Haiku release can run most BeOS applications without modification or recompiling.

## Package Management
Some common questions around the installation of software packages under Haiku.

### Is there a package manager?
Yes! Haiku comes with a powerful package management system which makes it very easy to install applications and keep them up to date. Applications are distributed as package files which can either be installed from HaikuDepot, the graphical package management application, or downloaded directly from websites or other sources.

### How do I update my installation of Haiku?
All installed packages, system as well as third-party, can be updated with the SoftwareUpdater application.

### Where can I get more software for Haiku?
The HaikuDepot application is the main entry point to discover Haiku software. It allows you to install many applications and libraries packaged by the [Haikuports project](http://haikuports.org)

There are also some [alternative places](https://www.haiku-os.org/community/software) to get packages.

## Applications

### Is there an instant messenger client?
Yes! You'll find a package for Caya, the multi-protocol IM client. Several alternatives are also available.

### Is there Java support?
Yes! The OpenJDK virtual machine is available and enables you to run applications such as Netbeans, JDownloader, and much more.

### Is there Flash support?
Not at the moment. Flash is proprietary technology from Adobe, making it difficult to support for a small open-source operating system such as Haiku. However, there are ways to enjoy the web without Flash, such as using HTML5 compatible versions of webpages (youtube and grooveshark support this for example).

### Is there an office suite?
There are several options:

  * You can run GoBe productive, the office suite for BeOS, if you have a copy of it. Unfortunately, it is not distributed anymore.
  * You can buy a copy of [ThinkFree](http://thinkfree.com) office, which runs fine on Haiku using the OpenJDK virtual machine.
 * You can find the [Caligra](https://www.calligra.org/) office suite at HaikuDepot.
  * You can use an online tool such as [Google Docs](http://docs.google.com)
  * You can use native applications, such as Sum-It (spreadsheet), WonderBrush (drawing and graphical design).

### Are there any games for Haiku?
Yes! HaikuDepot offers a selection of open source and freeware games. Most games written for BeOS will also run fine, and you can use emulators such as DOSBox to run games originally written for other systems as well.

### Is there python, ruby, perl?
Yes! Haiku includes these common scripting languages and many more.

### Will GoBe Productive work in Haiku?
Yes! Haiku's 32-bit installation is binary-compatible with BeOS R5, which means applications designed for BeOS R5 will run. There may still be a few drawing bugs and other glitches, remember Haiku is still in alpha stage. But overall GoBe Productive should be usable.

## Releases
### When is the next release?
You can check the status of the releases at the [roadmap page](https://dev.haiku-os.org/roadmap).

## Technology
### I heard Haiku still uses GCC2, is that true?
Our own internal fork of GCC2 is used to compile the x86 32-bit release to maintain BeOS binary compatibility. While GCC2 is the primary compiler for the x86 32-bit release, it also includes GCC 5.4.0 which can be leveraged to compile newer applications requiring it.

Other architectures (including x86_64) don't leverage GCC2.

### Is there support for newer GCC compilers?
Yes! In order to provide support for a modern version of C++ and up to date libraries, the official versions of Haiku come with both gcc2 and gcc5 installed, and a set of libraries suitable for use with each compiler. If you are not interested in BeOS support, we also provide an (unsupported) version of the system that uses only gcc4.

### How do I use the different GCC versions?
The ``setarch`` command can be used to switch between different architectures. On 32bit Haiku the default architecture is "x86_gcc2", secondary architecture is "x86".

### What is Kernel Debugging Land?
The Haiku Kernel comes with a powerful and user-friendly on-screen debugger. There you can enter commands investigate the problem and collect information in order to [write a bug report](https://www.haiku-os.org/docs/welcome/en/bugreports.html).

You can also reboot the machine, [generate QR codes](/blog/mmlr/2012-07-01_qr_encode_your_kdl_output), or play a game of hangman. :)

### This sounds cool. How do I enter Kernel Debugging Land?
Unfortunately, the most common way to enter the kernel debugger is on a crash of the Haiku kernel. Whenever the kernel thinks something is wrong, it will call the kernel debugger and stop all userland applications.

You can also invoke the kernel debugger manually:

  * You can use the ``kernel_debugger`` command from Terminal.
  * Or you can use the special shortcut {{< keyboard ALT >}}+{{< keyboard SysRq >}}+{{< keyboard d >}}.

The SysRq key is usually the same as "print screen", but may need to press an extra function key on some laptops.

## Hardware
### What are the minimum hardware requirements to run Haiku?
The x86 32-bit release of Haiku will run on a Pentium or better CPU with 192MiB of RAM (as long as virtual memory is activated), 1GiB of storage space and a VESA compliant video card.

However, for a satisfactory user experience, we recommend **at least** a Pentium4 with 512MiB of RAM and 2GiB of storage space.
For compiling Haiku within itself, 2GiB of RAM is recommended.

### Why doesn't Haiku let me use my monitor's resolution?
Most likely, Haiku is using the VESA driver. As with any other VESA driver, it has limitations. The problem is that the VESA driver cannot configure an arbitrary resolution. Even if it recognizes the needed one from the monitor info.

It can only *pick* (quite literally) one resolution from a fixed list, the VESA BIOS list as manufactured in your graphics board. It cannot configure the mode on the chip as a special graphics driver can.

### How can I check which graphics driver is being used?
There are two common ways to check. First, the Screen preferences shows this information at the top left of the window.
Alternatively, from within Terminal, you can run

``
listimage | grep accel
``


If ``vesa.accelerant ``is shown amongst other text, then Haiku does not have a dedicated driver for your graphics card and instead is using VESA.

### Haiku seems to be using VESA, what am I missing?

### What graphic cards are supported?
The VESA driver provides a fallback and works with the vast majority of video cards.

Haiku also provides drivers for several other card families. There is a [list of video card drivers](https://dev.haiku-os.org/wiki/HardwareInfo/video) currently available.

### Is there multiple monitor support?
Some drivers (non-HD Radeon and Matrox) have experimental multi-monitor support, which allows both a clone and an extended desktop mode. However, applications are not made aware of the fact that the display is split across multiple monitors, which leads to issues such as windows opening in the middle of the desktop, split between the two monitors.

### How come there is no sound?
First of all, check that your sound card is visible in the Media preferences (this means there is a driver for it). If the card is detected but there is still no sound, this is a problem with our audio drivers.

Most modern PC hardware uses sound devices compatible with the Intel HDA (high definition audio) specification. Unfortunately, the specification leaves the routing of the audio signals to the different outputs not completely specified, making it difficult to write a driver that works out of the box on all machines.

### Why is there no network access in VirtualBox?
The default network adapter type in VirtualBox is known to not work well with Haiku.

Fortunately, VirtualBox provides several alternatives, which work much better. Try configuring your machine to use one of those, see the guide [Emulating Haiku in VirtualBox](/guides/virtualizing/virtualbox)

### Is there a list of working hardware?
The development wiki has a [list of drivers](https://dev.haiku-os.org/wiki/HardwareInfo)

## Installing
### Where can I get Haiku from?
You can download an ISO which can be burned to a CD, or written to a USB flash drive, of the current version of Haiku from our [Get Haiku!](/get-haiku) page.
Official Haiku Installation CDs are available from [Haiku, Inc.](http://www.haiku-inc.org/order-disc.html).
The latest and possibly unstable nightly images are [available here](https://download.haiku-os.org/).

### Is there a live CD available?
The installation CD is also a Live CD.

### How do I build Haiku from source?
Instructions for [building Haiku](/guides/building) from source are documented in our guides.

## Using
### Why doesn't the tilde key work properly?
The tilde {{< keyboard "~" >}} key is a dead key, used to type characters like ñ. To type a standalone tilde, you need to either press the tilde key twice or press it followed by space. If you don't like this behavior, you can customize your dead keys in the Keymaps preferences panel. You can also use the "US" keyboard layout which doesn't include this feature.

### How do I change my keyboard layout?
Use the Keymaps preferences. If your preferred layout is not available there yet, you can customize an existing one by drag'n'dropping the keys around.

### Is there some kind of failsafe mode I can boot into? How do I get to it?
You can get to the boot menu by holding {{< keyboard SHIFT >}} or pressing {{< keyboard SPACE >}} before the Haiku boot screen shows. From there you can toggle several safe mode settings, such as forcing a lower video resolution, preventing drivers from getting loaded, or disabling some hardware features by blacklisting its driver. See the [user guide's Boot Loader](/docs/userguide/en/bootloader.html) chapter.
