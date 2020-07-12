+++
type = "article"
title = "Pre-requisite Software"
date = "2010-02-15T23:51:25.000Z"
tags = []
+++

The tools you need to compile software for Haiku, or to compile Haiku itself, depend on the platform that is used for building.

Currently, Haiku is arguably the most convenient development environment. **A [nightly image](https://download.haiku-os.org) (or [stable release](/get-haiku)) of Haiku should contain all of the software needed to build its sources for x86.**

So while Haiku is not the fastest, being able to immediately test the freshly compiled binaries and having the tool chain pre-installed certainly reduces the chances of headaches. On occasion, building Haiku on Haiku can be problematic if the host version is significantly out of date compared to the version being built. In this case, cross-compiling from another OS, or updating to a newer Haiku may be required to get things working again.

Haiku currently supports building itself, or having itself *cross compiled* on another platform.

## Build platform support matrix

Below are common build platforms and their statuses. This is not meant as a complete list, and the build specifics might change with new versions of those platforms. Further below you'll find more specific help on how to set up the build.

Note that in addition to all the platform-specific packages, you will also need to [install Haiku's custom version of Jam](/guides/building/jam).

| Platform                           | Package Manager      | Supported | Notes               |
|------------------------------------|----------------------|-----------|---------------------|
| [Haiku](https://www.haiku-os.org)  | [pkgman](#pkgman)    | YES       | Easiest             |
| [ArchLinux](https://archlinux.org) | [pacman](#pacman)    | YES       |                     |
| [CentOS](http://centos.org)        | [rpm/yum](#yum)      | YES       |                     |
| [Debian](http://debian.org)        | [deb/apt](#apt)      | YES       |                     |
| [Fedora](https://fedoraproject.org)| [rpm/dnf](#yum)      | YES       |                     |
| [FreeBSD](http://freebsd.org)      | [packages](#bsd)     | YES       |                     |
| [Gentoo](http://gentoo.org)        | [Portage](#gentoo)   | YES       |                     |
| [Linux Mint](http://linuxmint.com) | [deb/apt](#apt)      | YES       |                     |
| macOS                              | [Homebrew](#osx)     | YES       |                     |
| [NetBSD](http://netbsd.org)        | [packages](#bsd)     | MAYBE?    | Untested.           |
|[openSUSE](https://www.opensuse.org)| [rpm/zypper](#zypper)| YES       |                     |
| [RedHat Linux](http://redhat.com)  | [rpm/yum](#yum)      | YES       |                     |
| [Ubuntu](http://ubuntu.com)        | [deb/apt](#apt)      | YES       |                     |
| Solaris                            | [solaris](#solaris)  | NO        | No longer supported |
| BeOS                               | [pkg](#beos_zeta)    | NO        | Once upon a time... |
| [Windows](http://microsoft.com)    | [see notes](#windows)| NO        |                     |
| Zeta                               | [pkg](#beos_zeta)    | NO        | Once upon a time..  |

<a name="pkgman"></a>
## ![pkgman](/files/os-icons/ubuntu-32.png) pkgman

**Basic requirements:**

```sh
pkgman install mtools python3
```

**Additional requirements for ARM:**

```sh
pkgman install dtc bc
```



<a name="apt"></a>
## ![APT](/files/os-icons/ubuntu-32.png) APT (Linux distributions such as Debian, Ubuntu, Mint...)

**Basic requirements:**

```sh
sudo apt install git nasm autoconf automake texinfo flex bison gawk build-essential unzip wget zip less zlib1g-dev xorriso libtool mtools gcc-multilib python3 gcc-multilib
```

**Additional requirements for ARM:**

```sh
sudo apt-get install u-boot-tools util-linux device-tree-compiler bc
```

<a name="pacman"></a>
## ![pacman](/files/os-icons/arch-32.png) pacman (ArchLinux)

**Basic requirements:**

```sh
sudo pacman -S base-devel bison git texinfo nasm openssh unzip curl wget flex xorriso bc mtools python
```

**Additional requirements for ARM:**

```sh
sudo pacman -S yaourt uboot-tools bc
```

<a name="yum"></a>
## ![yum](/files/os-icons/fedora-32.png) RPM-based GNU/Linux Distributions using yum (Fedora, CentOS...)

**Basic requirements:**

```sh
sudo yum install git nasm autoconf automake texinfo flex bison gcc gcc-c++ make glibc-devel zlib-devel xorriso curl-devel byacc libstdc++-static mtools glibc-devel.i686 libstdc++-devel.i686 python36
```

**Additional requirements for ARM:**

```sh
sudo yum install libfdt bc
```

<a name="zypper"></a>
## ![zypper](/files/os-icons/suse-32.png) RPM-based GNU/Linux Distribution using zypper (openSUSE, SLES)

**Basic requirements:**

```sh
sudo zypper install git nasm autoconf automake texinfo flex bison gcc-c++ make glibc-devel zlib-devel curl-devel xorriso python3
```

<a name="gentoo"></a>
## ![gentoo](/files/screenshots/gentoo-32_0_0.png) Portage based GNU/Linux Distribution (Gentoo)

**Basic requirements:**

```sh
sudo emerge -av dev-vcs/git autoconf automake texinfo flex bison gawk tar sys-libs/zlib libisoburn wget nasm net-misc/curl bc mtools
```

**Additional requirements for ARM:**

```sh
sudo emerge -av u-boot-tools util-linux dtc bc
```

<a name="bsd"></a>
## ![freebsd](/files/os-icons/freebsd-32.png) BSD Based Distribution (FreeBSD)

**Package based:**
```sh
sudo pkg install bison git nasm gawk texinfo xorriso wget u-boot-tools mtools linuxfdisk curl python3 gcc gmake
```

**Ports based:**
```sh
sudo portinstall devel/bison devel/git devel/nasm lang/gawk print/texinfo sysutils/xorriso ftp/curl ftp/wget devel/u-boot-tools emulators/mtools sysutils/linuxfdisk lang/python devel/gcc devel/gmake
```

<a name="osx"></a>
## ![osx](/files/os-icons/macosx-32.png) macOS

A case-sensitive file system is required to build Haiku. You can use Disk Utility to create a case-sensitive disk image and store the Haiku source tree on that. Case-sensitive HFS+ works fine.

First install Xcode via ```xcode-select --install``` and accept the license. ```xcodebuild -license```

Once you have installed XCode and the command line tools as well as agreed to the end user license you can install the prerequisite software either by using MacPorts or by using Homebrew.

**To install the prerequisite software using Homebrew:**

1. Install <a href="http://brew.sh/">Homebrew</a> using the ruby command line installer provided on the linked page.
2. Next install the prerequisite software to build Haiku using the following command via ```brew install autoconf xorriso gawk wget nasm less mpfr gmp libmpc bison mtools```
3. Force using the newer bison version. ```brew link bison --force```

Note: You'll need to install gnu less from the dupes repository as macOS comes with BSD less while Haiku requires GNU less.

**To install the prerequisite software using Macports do the following:**

1. Install <a href="http://www.macports.org/">MacPorts</a> (A standard Installer package is provided).
2. Close your Terminal, open a new one and type ```sudo port install autoconf xorriso gawk wget nasm less mpfr gmp libmpc bison mtools```

If you get an error “port: command not found”, the MacPorts shell configuration, stored in <code>~/.profile</code>, is probably not taken into account.
If you’re using Bash, you probably have a <code>~/.bash_profile</code> or <code>~/.bash_login</code> file, preventing bash to read <code>~/.profile</code>.
Check the file used by Bash (in the mentioned order) and add these lines to the used file:

<pre class="terminal">
export PATH=/opt/local/bin:$PATH
export MANPATH=$MANPATH:/opt/local/share/man
export INFOPATH=$INFOPATH:/opt/local/share/info
</pre>

If you are using another shell, take a look a the shell documentation to see which file is parsed at login, and add the required commands.
You can now retry the <code>port install...</code> command in a new Terminal.

<p>Note: the ARM port is not yet supported for OS X, MacPorts has mtools but is missing sfdisk at least.</p>

<a name="windows"></a>
## ![windows](/files/os-icons/package-32.png) Windows
{{< alert-warning "Warning" "Windows is not maintained as a development environment.">}}

It is possible to install Windows Subsystem for Linux and follow the instructions
for the appropriate Linux distribution (for example, Ubuntu is available this way
in the Windows store). However, this is currently slower than running Haiku in
a virtual machine and building from there.

<a name="beos_zeta"></a>
## ![beos](/files/os-icons/beos-32.png) BeOS & Zeta
{{< alert-warning "Warning" "BeOS and Zeta are no longer maintained or supported.">}}

<a name="solaris"></a>
## ![cygwin](/files/os-icons/package-32.png) Solaris

{{< alert-warning "Warning" "Solaris is not maintained as a development environment. These instructions are dependent on community contributions.">}}

* [[openbeos] Building Haiku on Solaris...](https://www.freelists.org/post/haiku/Building-Haiku-on-Solaris,2)

# Linux remarks - xattr

Building Haiku correctly currently requires proper xattr support on the file system you compile it with.
Currently, your options are unfortunately rather limited, as for example, ext4 does not sufficiently support this feature.
Recommended file systems to use under Linux are XFS, and ReiserFS at this time.

There is a fallback mechanism that is used otherwise, but this is known to be problematic sometimes.

In order to use xattr support, some distributions may need "attr" and "attr-dev" installed. See [Configure Option : \--use-xattr](/guides/building/configure/use-xattr)


