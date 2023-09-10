+++
type = "article"
title = "Pre-requisite Software"
date = "2010-02-15T23:51:25.000Z"
tags = []
+++

The tools you need to compile software for Haiku, or to compile Haiku itself, depend on the platform that you are using
for building Haiku.

The Haiku operating system can be a very convenient development environment for working on Haiku, but using
Haiku is not strictly necessary. It may also not be practical to use Haiku in some very special cases, 
such as when writing some drivers - using a virtual machine to test your changes may be much more practical.
It may also be a bit slower as far as compilation times are concerned, but performance has massively
improved over the years. Occasionally, building Haiku within Haiku can be problematic if the host
is significantly out of date compared to the version being built. In this case, cross-compiling Haiku
from another operating system, or updating Haiku to a newer version should fix that.

On the other hand, while Haiku may not necessarily the fastest, there's a huge advantage to being able to immediately
test the freshly compiled programs. Working from a Haiku environment is paramount in many cases, such as
when you're porting applications to Haiku or when you're working on desktop applications. Using the operating system
that you're working on is also very useful, because some of the difficulties that you may come across while using
the system, or just using the system without coming across any real problems, will lead to even more improvements
that everyone will benefit from. Haiku's a pretty good development platform on its own: There are IDEs (Integrated
Development Environments) that are exclusive to and deeply integrated with Haiku, such as **Pe**, **Koder**,
**microbe** and **Paladin**, as well as IDEs that were ported to Haiku and work perfectly fine with it, such as
**Qt Creator** and the **Arduino IDE**, all the way up to the world famous text-based editors, such as **vim**,
**nano** and **emacs**.

If you'd like to have the best of both worlds, you could also use Haiku in a virtual machine and use that as a
development environment. If you are using text-based IDEs, you could also connect to your virtual machine running
Haiku with [Secure Shell](https://www.haiku-os.org/guides/daily-tasks/netservices/) and integrate that in your workflow.
This may be a particularly viable option when working with [HaikuPorts](https://github.com/haikuports/haikuports).

**[Nightly images](https://download.haiku-os.org) (or [the latest stable release](/get-haiku)) of Haiku should contain most
of the software needed to build Haiku in Haiku. Please see below for the requirements not included.** Note that building
the entire operating system on an x86_64 Haiku host will require that the [`buildtools`](https://cgit.haiku-os.org/buildtools)
for that architecture are also prepared and compiled. Use the same instructions as a cross-compile in this case. The reason 
for this is because some 32-bit objects need to be built as well and the compiler supplied by default on an x86_64 environment
is insufficient for building these objects.

In short, you are basically free to use whichever operating system suits you the most in order to develop with Haiku.
We understand that you may not be able to switch operating systems on a whim, or that Haiku may not fulfill your needs
as well as it does for other people. You're free to use whichever operating system you feel like.

For your convenience, we have also compiled a table with a list of operating systems that have been tested and confirmed to work,
as far as building Haiku is concerned. If your operating system exhibits weird building-related problems, we would
appreciate that you report these issues - or better yet, deal with them yourself and send them in, since that
would massively help us and other people interested in developing on that operating system. The latter also applies
if your operating system cannot be currently used to build Haiku.

## Installing Jam

<a name="build_jam"></a>

Haiku uses a [custom version of Jam](/guides/building/jam) which needs to be built from sources.
It is not possible to use the Jam version that may be packaged with Linux distributions, which
is missing several features added by Haiku developers.

Haiku's version of jam lives inside the <a href="https://cgit.haiku-os.org/buildtools/">buildtools repository</a>. If you need to, see this page on <a href="/guides/building/get-source-git">Getting Haiku Source Code</a>.

<pre class="terminal">
cd  /path/haiku/buildtools/jam/
make
&lt;jam-install-command&gt;
</pre>

Note, you may need to use `gmake` instead of `make` on BSD systems.

<h4>&lt;jam-install-command&gt;</h4>

To install jam you can use one of two commands:
The first requires administrative privilege, as jam will be installed to '/usr/local/bin/'
<ul>
<li><span class="cli">sudo ./jam0 install</span></li>
<li><span class="cli">./jam0 -sBINDIR=$HOME/bin install</span></li>
</ul>

## Is my platform supported for building Haiku?

Below are common build platforms and their statuses. This is not meant as a complete list, and the build specifics might change with new versions of those platforms. Further below you'll find more specific help on how to set up the build.

Note that in addition to all the platform-specific packages, you will also need to [install Haiku's custom version of Jam](/guides/building/jam).

| Platform                           | Package Manager      | Supported | Notes                 |
|------------------------------------|----------------------|-----------|-----------------------|
| [Haiku](https://www.haiku-os.org)  | [pkgman](#pkgman)    | YES       | Easiest               |
| [ArchLinux](https://archlinux.org) | [pacman](#pacman)    | YES       |                       |
| [CentOS](http://centos.org)        | [rpm/yum](#yum)      | YES       |                       |
| [Debian](http://debian.org)        | [deb/apt](#apt)      | YES       |                       |
| [Fedora](https://fedoraproject.org)| [rpm/dnf](#yum)      | YES       |                       |
| [FreeBSD](http://freebsd.org)      | [packages](#bsd)     | YES       | Not frequently tested |
| [Gentoo](http://gentoo.org)        | [Portage](#gentoo)   | YES       |                       |
| [Linux Mint](http://linuxmint.com) | [deb/apt](#apt)      | YES       |                       |
| [Nix OS](https://nixos.org/)       | [Nix](#nix)          | YES       |                       |
| [openSUSE](https://www.opensuse.org)| [rpm/zypper](#zypper)| YES      |                       |
| [RedHat Linux](http://redhat.com)  | [rpm/yum](#yum)      | YES       |                       |
| [Rocky Linux](https://rockylinux.org)   | [rpm/yum](#yum) | YES       |                       |
| [Ubuntu](http://ubuntu.com)        | [deb/apt](#apt)      | YES       |                       |
| macOS                              | [Homebrew](#macos)   | MAYBE     | Need a working case sensitive filesystem |
| [NetBSD](http://netbsd.org)        | [packages](#bsd)     | MAYBE?    | Untested.             |
| [Windows](https://microsoft.com/)  | [see notes](#windows)| USING WSL | [Using Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/) |
| BeOS                               | [pkg](#beos_zeta)    | NO        | Once upon a time…     |
| Solaris                            | [solaris](#solaris)  | NO        | Once upon a time…     |
| Zeta                               | [pkg](#beos_zeta)    | NO        | Once upon a time…     |

<a name="pkgman"></a>
## ![pkgman](/files/os-icons/package-32.png) pkgman (Haiku package system)

**Basic requirements:**

```sh
pkgman install cmd:python3 cmd:xorriso devel:libzstd
```

<a name="apt"></a>
## ![APT](/files/os-icons/ubuntu-32.png) APT (Linux distributions such as Debian, Ubuntu, Mint...)

**Basic requirements:**

```sh
sudo apt install git nasm bc autoconf automake texinfo flex bison gawk build-essential unzip wget zip less zlib1g-dev libzstd-dev xorriso libtool gcc-multilib python3
```

**Additional requirements for building ARM versions of Haiku:**

```sh
sudo apt-get install u-boot-tools util-linux
```

<a name="pacman"></a>
## ![pacman](/files/os-icons/arch-32.png) pacman (ArchLinux)

**Basic requirements:**

```sh
sudo pacman -S base-devel multilib-devel bison git texinfo nasm openssh unzip zstd curl wget flex xorriso python lib32-glibc bc
```

**Additional requirements for building ARM versions of Haiku:**

```sh
sudo pacman -S paru uboot-tools
```

<a name="yum"></a>
## ![yum](/files/os-icons/fedora-32.png) RPM-based GNU/Linux Distributions using yum (Fedora, CentOS...)

**Basic requirements:**

```sh
sudo yum install git nasm autoconf automake texinfo flex bison gcc gcc-c++ make glibc-devel zlib-devel zstd-devel xorriso curl-devel byacc libstdc++-static glibc-devel.i686 libstdc++-devel.i686 libstdc++-devel python36
```

<a name="zypper"></a>
## ![zypper](/files/os-icons/suse-32.png) RPM-based GNU/Linux Distribution using zypper (openSUSE, SLES)

**Basic requirements:**

```sh
sudo zypper install git nasm autoconf automake texinfo flex bison gcc-c++ make glibc-devel zlib-devel zstd-devel curl-devel xorriso python3
```

<a name="gentoo"></a>
## ![gentoo](/files/os-icons/gentoo-32.png) Portage based GNU/Linux Distribution (Gentoo)

**Basic requirements:**

```sh
sudo emerge -av dev-vcs/git autoconf automake texinfo flex bison gawk tar sys-libs/zlib app-arch/zstd libisoburn wget nasm net-misc/curl
```

**Additional requirements for building ARM versions of Haiku:**

```sh
sudo emerge -av u-boot-tools util-linux
```

<a name="nix"></a>
## ![nix](/files/os-icons/nixos-32.png) NixOS

You can use nix-shell to create a suitable build environment using this configuration:

```nix
with import <nixpkgs> {}; {
  qpidEnv = stdenvNoCC.mkDerivation {
    name = "my-buildhaiku-environment";
    hardeningDisable = [ "format" ]; # Nix's gcc treats some warnings as errors by default, making the build fail
    buildInputs = [
        autoconf #autoheader
        automake
        bison
        bc
        flex
        gawk
        gcc13 # version chosen without good reason
        mtools
        nasm
        python3
        texinfo #makeinfo
        unzip
        wget
        xorriso
        zip
        zlib
        zstd # for when running jam
    ];
  };
}
```


<a name="freebsd"></a>
## ![freebsd](/files/os-icons/freebsd-32.png) FreeBSD

**Basic requirements:**

```sh
pkg install devel/bison devel/git devel/nasm lang/gawk print/texinfo sysutils/xorriso ftp/curl ftp/wget sysutils/u-boot-tools sysutils/linuxfdisk lang/python lang/gcc devel/gmake
```

The configure script has to be run with extra enviroment variables to tell it the location of gcc-ranlib and gcc-ar, for example:
```sh
$ NM=gcc-nm9 RANLIB=gcc-ranlib9 AR=gcc-ar9 ./configure --cross-tools-source ../buildtools/ --build-cross-tools x86_64
```

<a name="macos"></a>
## ![macos](/files/os-icons/macosx-32.png) macOS

A case-sensitive file system is required to build Haiku. You can use Disk Utility to create a case-sensitive disk image and store the Haiku source tree on that. Case-sensitive HFS+ works fine.

First install Xcode via ```xcode-select --install``` and accept the license. ```xcodebuild -license```

Once you have installed XCode and the command line tools as well as agreed to the end user license you can install the prerequisite software either by using MacPorts or by using Homebrew.

**To install the prerequisite software using Homebrew:**

1. Install <a href="http://brew.sh/">Homebrew</a> using the ruby command line installer provided on the linked page.
2. Next install the prerequisite software to build Haiku using the following command via ```brew install autoconf zstd xorriso gawk wget nasm less mpfr gmp libmpc bison```
3. Force using the newer bison version. ```brew link bison --force```
    - Note that Homebrew may refuse to shadow the built-in version of bison. If so, follow the instructions so that a new version of bison is in your $PATH

Note: You'll need to install gnu less from the dupes repository as macOS comes with BSD less while Haiku requires GNU less.

**To install the prerequisite software using Macports do the following:**

1. Install <a href="http://www.macports.org/">MacPorts</a> (A standard Installer package is provided).
2. Close your Terminal, open a new one and type ```sudo port install autoconf zstd xorriso gawk wget nasm less mpfr gmp libmpc bison```

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

<p>Note: the ARM port is not yet supported for macOS, MacPorts is missing sfdisk at least.</p>

<a name="windows"></a>
## ![windows](/files/os-icons/package-32.png) Windows
{{< alert-warning "Warning" "Windows is not maintained as a development environment.">}}

It is possible to install Windows Subsystem for Linux and follow the instructions
for the appropriate Linux distribution (for example, Ubuntu is available this way
in the Windows store).

<a name="beos_zeta"></a>
## ![beos](/files/os-icons/beos-32.png) BeOS & Zeta
{{< alert-warning "Warning" "BeOS and Zeta are no longer maintained or supported.">}}

<a name="solaris"></a>
## ![solaris](/files/os-icons/package-32.png) Solaris

{{< alert-warning "Warning" "Solaris is not maintained as a development environment. These instructions are dependent on community contributions.">}}

* [[openbeos] Building Haiku on Solaris...](https://www.freelists.org/post/haiku/Building-Haiku-on-Solaris,2)

# Linux remarks - xattr

Building Haiku correctly currently requires proper xattr support on the file system you compile it with.
Unfortunately, the ext4 filesystem often used with Linux does not provide sufficient support.
It is recommended to use either XFS or btrfs for the partition where your generated directory is stored.
There is a fallback mechanism that is used otherwise, but the build will be slower.

In order to use xattr support, some distributions may need "attr" and "attr-dev" installed. See [Configure Option : \--use-xattr](/guides/building/configure/use-xattr)

