+++
type = "article"
title = "A Guide to Building Haiku"
date = "2019-03-05T11:19:23.0530Z"
+++


Haiku builds for several computer architectures, below is a list of each architecture with additional information. The *interest* column does not reflect any architecture preference by the Haiku project, only current real-world developer interest.

<table>
<tr><td COLSPAN=6><h3>x86 (Tier 1)</h3>The platform of choice for most traditional desktop and laptop computers</td></tr>
<tr><td><b>Platform</b></td><td><b>Interest</b></td><td><b>Target</b></td><td><b>Haiku Loader</b></td><td><b>Haiku Kernel</b></td><td><b>Application Server</b></td><td><b>Status</b></td></tr>
<tr><td>32-bit x86 PC (Compat)</td><td>High</td><td>x86_gcc2</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td>Stable</td></tr>
<tr><td>32-bit x86 PC</td><td>High</td><td>x86</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td>Stable</td></tr>
<tr><td>64-bit x86 PC</td><td>High</td><td>x86_64</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td>90%</td></tr>

<tr><td COLSPAN=6><h3>ARM (Tier 2)</h3>Newly revitalized line of processors excelling at low power consumption and low cost. See <a href="https://cgit.haiku-os.org/haiku/tree/docs/develop/ports/arm">platform-specific notes</a> in the source tree.</td></tr>
<tr><td><b>Platform</b></td><td><b>Interest</b></td><td><b>Target</b></td><td><b>Haiku Loader</b></td><td><b>Haiku Kernel</b></td><td><b>Application Server</b></td><td><b>Status</b></td></tr>
<tr><td><a href="http://beagleboard.org" title="BeagleBoard">BeagleBoard</a> Black</td><td>Moderate</td><td>beagle</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>20%</td></tr>
<tr><td><a href="http://www.cubieboard.org/">Cubieboard 4</a></td><td>Moderate</td><td>cubieboard4</td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Gumstix <a href="http://www.gumstix.org/hardware-design/verdex-pro-coms.html" title="Verdex">Verdex</a> (emu)</td><td>Moderate</td><td>verdex</td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Gumstix <a href="http://www.gumstix.org/hardware-design/overo-coms.html">Overo</a></td><td>Moderate</td><td>overo</td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Genesi <a href="http://www.genesi-tech.com/products/efika">Efika MX</a></td><td>Moderate</td><td>???</td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td><a href="http://www.raspberrypi.org/">Raspberry Pi</a></td><td>Moderate</td><td>rpi1</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/need-maintainer.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>20%</td></tr>
<tr><td><a href="http://www.raspberrypi.org/">Raspberry Pi 2</a></td><td>Moderate</td><td>rpi2</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>20%</td></tr>

<tr><td COLSPAN=6><h3>PowerPC (Tier 2)</h3>Previous challenger to the x86 market in desktop and laptop computers. See <a href="https://cgit.haiku-os.org/haiku/tree/docs/develop/ports/ppc">platform-specific notes</a> in the source tree.</td></tr>
<tr><td><b>Platform</b></td><td><b>Interest</b></td><td><b>Target</b></td><td><b>Haiku Loader</b></td><td><b>Haiku Kernel</b></td><td><b>Application Server</b></td><td><b>Status</b></td></tr>
<tr><td>Genesi Efika I & II</td><td>Low</td><td>ppc</td><td><img src='/files/status-icons/complete.png' alt='Complete'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td>80%</td></tr>
<tr><td>Apple G3/G4</td><td>Low</td><td>ppc</td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>ACube Sam460ex</td><td>High</td><td>ppc</td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/in-progress.png' alt='In Progress'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>BeBox</td><td>None</td><td>ppc</td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>0%</td></tr>

<tr><td COLSPAN=6><h3>m68k (Tier 2)</h3>Classic home computer devices. See <a href="https://cgit.haiku-os.org/haiku/tree/docs/develop/ports/m68k">platform-specific notes</a> in the source tree.</td></tr>
<tr><td><b>Platform</b></td><td><b>Interest</b></td><td><b>Target</b></td><td><b>Haiku Loader</b></td><td><b>Haiku Kernel</b></td><td><b>Application Server</b></td><td><b>Status</b></td></tr>
<tr><td>Atari TT</td><td>Low</td><td>m68k</td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Atari Falcon</td><td>Low</td><td>m68k</td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Amiga <a href="https://en.wikipedia.org/wiki/Amiga_4000">A4000/040</a></td><td>Low</td><td>m68k</td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Amiga + 68030 cpu</td><td>Low</td><td>m68k</td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/need-maintainer.png' alt='Need Maintainer'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>10%</td></tr>
<tr><td>Old-world Macintosh</td><td>None</td><td>m68k</td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>1%</td></tr>
<tr><td>NeXT Cube</td><td>None</td><td>m68k</td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td><img src='/files/status-icons/no-work.png' alt='No Work Complete'></td><td>1%</td></tr>

</table>
<br/>
<div style="float: right; text-align: right; width: 100%">
<b><u>Icon Legend</u></b><br/>
No work complete <img src='/files/status-icons/no-work.png'><br/>
Needs maintainer <img src='/files/status-icons/need-maintainer.png'><br/>
Ongoing work <img src='/files/status-icons/in-progress.png'><br/>
Functional <img src='/files/status-icons/complete.png'><br/>
<span style='font-size: 0.7em'>Status icons by <a href='http://p.yusukekamiyamane.com/'>Yusuke Kamiyamane</a></span>
</div>

# Pre-requisite Software
The tools you need to compile software for Haiku, or to compile Haiku itself, depend on the platform that is used for building.

Currently, Haiku is arguably the most convenient development environment. **A [nightly image](https://download.haiku-os.org) (or [stable release](/get-haiku)) of Haiku should contain all of the software needed to build its sources for x86.**

So while Haiku is not the fastest, being able to immediately test the freshly compiled binaries and having the tool chain pre-installed certainly reduces the chances of headaches. On occasion, building Haiku on Haiku can be problematic if the host version is significantly out of date compared to the version being built. In this case, cross-compiling from another OS, or updating to a newer Haiku may be required to get things working again.

Haiku currently supports building itself, or having itself *cross compiled* on another platform.

## Build platform support matrix

Below are common build platforms and their statuses. This is not meant as a complete list, and the build specifics might change with new versions of those platforms. Further below you'll find more specific help on how to set up the build.

Note that in addition to all the platform-specific packages, you will also need to [install Haiku's custom version of Jam](/guides/building/jam).

| Platform                           | Package Manager      | Supported | Notes               |
|------------------------------------|----------------------|-----------|---------------------|
| [Haiku](https://www.haiku-os.org)  | pkgman               | YES       | Easiest             |
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

<a name="apt"></a>
## ![APT](/files/os-icons/ubuntu-32.png) APT (Linux distributions such as Debian, Ubuntu, Mint...)

**Basic requirements:**

```sh
sudo apt install git nasm autoconf automake texinfo flex bison gawk build-essential unzip wget zip less zlib1g-dev xorriso libtool mtools gcc-multilib python3
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
sudo pkg install bison git nasm gawk texinfo xorriso wget u-boot mtools linuxfdisk curl python3
```

**Ports based:**
```sh
sudo portinstall devel/bison devel/git devel/nasm lang/gawk print/texinfo sysutils/xorriso ftp/curl ftp/wget devel/u-boot emulators/mtools sysutils/linuxfdisk lang/python
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

# Getting the source code

<span class="right"><img src='/images/archive_64.png'></span>

Haiku's source code is currently being hosted in a <a href="http://git-scm.com/" target="_blank">Git based repository</a>. Anonymous access will allow anyone to download Haiku's source code; However, only Haiku contributors with commit access should use the authenticated (non-anonymous) method.

<div class="alert alert-danger">
<strong>Configure your git!</strong> Before making any commits to the Haiku repository (local even), be <strong>sure</strong> to <a href="#configure_env">configure</a> the git environment on your local system! Failure to configure git properly before a commit will result in incorrect naming in your commit and public humiliation on the mailing list.</div>

<div class="alert alert-warning">
<strong>The buildtools are not needed when building from within Haiku</strong>. Pre-built images of Haiku already come with the buildtools pre-installed.
</div>

<a name="anon_access"></a>
<h3>Git Access - Anonymous testers</h3>
<ul>
<li><h4>Build Tools:</h4>
```sh
git clone https://review.haiku-os.org/buildtools
```
</li>

<li><h4>Haiku:</h4>
```sh
git clone https://review.haiku-os.org/haiku
```
</li>
</ul>
<p>If you don't care about the commit history and want to keep the download small, try using the parameter `--depth` when cloning. `--depth 10` limits the history to the last 10 commits, for example.</p>

<a name="dev_access"></a>
<h3>Git Access - Contributors with commit permission</h3>
<ul>
<li><h4>Configure Git on your system:<a name="configure_env"></a></h4>
<p>Before making your first commit on a new system, be <strong>sure</strong> to configure Git. These global settings are stored in your git configuration directory (~/.git/ or for Haiku: ~config/settings/git/) and will be appended to <strong>each</strong> commit as your personal information.</p>
```sh
git config --global user.name "John Doe"
git config --global user.email "john.doe@developers.com"
```
If you were used to the short version of the svn commands (st, di,... instead of status, diff,...), you'll also want to set up similar shortcuts as aliases for the respective long git commands:
```sh
git config --global alias.st "status -s"
git config --global alias.di "diff"
git config --global alias.ci "commit"
git config --global alias.co "checkout"
```
On Mac OS X, you should always set the following option in order to avoid confusion about the NFD and NFC representation of filenames:
```sh
git config core.precomposeunicode true
```
</li>

<li><h4>Build Tools:</h4>
The &lt;login&gt;@ is only needed if your currently logged in username doesn't match your git.haiku-os.org username.
```sh
git clone ssh://<login>@git.haiku-os.org/buildtools
```
</li>

<li><h4>Haiku:</h4>
The &lt;login&gt;@ is only needed if your currently logged in username doesn't match your git.haiku-os.org username.
```sh
git clone ssh://<login>@git.haiku-os.org/haiku
```
</li>
</ul>

<h4>Switching from anonymous to developer access</h4>
<p>Just got commit access to Haiku? Congratulations! You don't need to checkout the sources again. Instead you can update your existing copy of the source to use the commiter access. Just change the remote URL:</p>
```sh
git remote set-url origin ssh://<login>@git.haiku-os.org/haiku
```

<h3>Some Notes</h3>
<ul>
<li><h4>Case Sensitive Filesystem</h4>
<div class="alert alert-warning">
Haiku's source code needs to reside on a case sensitive file system.
</div>
In short, such a file system recognizes "ThisIsAFile.txt" and "THISISAFILE.txt" as two different files. Some file systems that are (or could be) case in-sensitive include, FAT32, NTFS, and HFS+. Mac OS X's HFS+ is case in-sensitive by default. For more information regarding how to create a case-sensitive HFS+ volume, see <a href="/documents/dev/how_build_haiku_mac_os_x#part_diskimage">this article</a>.
</li>
<a name="proxy_access"></a>
<li><h4>Getting the source code through an HTTP proxy</h4>
<div class="alert alert-warning">
Haiku's main Git repository does not allow HTTP access, which is a problem if you are accessing the Internet through a proxy server that only permits HTTP (port 80) traffic.
</div>
Instead, use one of our mirror repositories at GitHub or Gitorious for anonymous HTTP access, they are both kept in sync with the main repository. First, set Git to connect through your proxy server:
```sh
git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080
```
Then clone the repositories from GitHub:
```sh
git clone http://github.com/haiku/buildtools.git
git clone http://github.com/haiku/haiku.git
```
Note however that these repositories do not contain any hrev tags, which are used by the Haiku build system to determine the Haiku revision. To work around this limitation, use the <a href="https://cgit.haiku-os.org/haiku/tree/build/jam/UserBuildConfig.ReadMe" target="_blank">HAIKU_REVISION build variable</a> when building Haiku.
</li>
<li><h4>Updating the Sources</h4>
<div class="alert alert-danger">
Be sure to use the `--rebase` argument while doing a pull prior to a push to avoid confusing nonlinear histories! ("Merge 'master' on ssh://git.haiku-os.org/haiku" messages showing your name and others changes) Do <b>NOT</b> however use --rebase on branches you have shared with other people! (rebase re-writes the local history. If your local history doesn't match people who cloned off of you, and they want to push to you, they will have <b>major</b> problems.)
</div>
```sh
cd /path/haiku/haiku
git pull --rebase
```
Alternatively, a single path or multiple paths can be given to <span class="cli">git pull</span>. This will allow you to run the following command from any directory. This becomes extremely useful if you use an <a href="/guides/building/configure/different-generated">external object directory</a> or if you wish to update both the buildtools and haiku directories at the same time.
```sh
git pull --rebase /path/haiku/haiku /path/haiku/buildtools
```
</li>
<li><h4>Making local commits</h4>

In git you make commits to your local tree, then push the final results to the central remote Haiku repository. The comment quality of commits should be high, explaining changes in as much detail as possible.

<h5>Short commit comment</h5>
Short commit messages are best utilized for small changes or changes that hold a simple ideal.
```sh
git commit -a -m "WebPositive: Style cleanup, no functional change"
```

The short commit message should be a summary no longer than 64 characters, no returns

<h5>Long commit comments</h5>
Long commit messages are best used to explain what was changed and why on new code, rewrites, or other tasks that may need explanation.
```sh
git commit -a -F ~/mycommitlog
```

The following commit message format is recommended:
```
kernel: Perform the usual early morning tasks

* Ensure cats in computer are fed.
* Clean up white space.
* The retroencabulator needs to be adjusted to accept input from
  multiple sources of data and ensure the buffer is free for
  shenanigans.
* No functional change.
```
The first line should be a summary no longer than 64 characters, separated from a detailed description by a blank line. The description lines shouldn't be longer than 72 characters.

</li>
<li><h4>Pushing changes remotely</h4>
```sh
git push
```
After your changes are complete, the push command will push your local tree to the remote Haiku repository.
</li>
<li><h4>Example git workflow</h4>
<img src='/files/gitProcess_0.png'>
</li>
</ul>

# Compiling for x86_64
x86_64 Compiler Toolset
=======================

Building the x86_64 compiler toolset is quite easy and involves generating GCC
binaries for your platform. For a complete list of flags for the configure
script, see <a href='/guides/building/configure'>Haiku's Configure Options</a>.

x86_64 exclusively uses gcc7, this differs from our 32-bit x86_gcc2 builds which
include both gcc2 (for BeOS compatibility) and gcc7 as a secondary architecture.

From the Haiku source directory, run the following to compile
the build tools (be sure to adjust the options to match your build environment):

**Working in a clean build directory:**
```sh
mkdir generated.x86_64; cd generated.x86_64
../configure --build-cross-tools x86_64 ../../buildtools
```

**Working in the top level:**
```sh
./configure --build-cross-tools x86_64 ../buildtools
```

x86_64 Haiku Builds
===================

These builds require a valid x86_64 compiler toolset (see above), and might also
need additional software packages installed -- see the
<a href="/guides/building/pre-reqs">pre-requisite software</a> page for more details.

These commands should be run from the same path you ran your configure in above.

Compiling a nightly anyboot Haiku iso image
--------------------------------------

This is the standard build which which results in a live ISO that can be burned
to an optical disc, or that can be written directly to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```sh
jam -q -j2 @nightly-anyboot
```


Compiling a nightly raw disk images
---------------------------------

This generates a simple raw disk image of Haiku which can be booted directly in
a VM or written directly to a USB stick.

{{< alert-info "Build Threads" "Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.">}}

```sh
jam -q -j2 @nightly-raw
```

# Compiling for x86

<h3>x86 Compiler Toolset</h3>
Building the x86 compiler toolset is quite easy and involves generating gcc binaries for your platform. For a complete list of flags for the configure script, see <a href='/guides/building/configure'>Haiku's Configure Options</a>

From the haiku source directory, run the following. (be sure to adjust the options to match your build environment.)
<h4>gcc2</h4>
gcc2 is the default build planned for R1 given it's BeOS binary compatibility enabling native binary BeOS applications to run on Haiku.
```sh
./configure --build-cross-tools x86_gcc2 ../buildtools
```

<h4>gcc2h / gcc7h hybrid builds</h4>
<p>Haiku can be build as a hybrid image meaning that it contains gcc2 as well as gcc7 binaries. More information on this can be found on the <a href='/guides/building/gcc-hybrid'>gcc-hybrid</a> page.</p>

<h3>x86 Haiku Builds</h3>
<p>These builds require a valid x86 compiler toolset (see above), and might also need additional software packages installed -- see the <a href="/guides/building/pre-reqs">pre-requisite software</a> page for more details.

<h4>Compiling a basic raw Haiku disk image</h4>
<p>This is the most basic build, it generally is good for quickly testing the OS after making modifications as it doesn't contain a lot of extra applications. Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.
```sh
jam -q -j2 @image
```
</p>

<h4>Compiling raw nightly disk images</h4>
This is the default nightly image build target. This contains a complete system with an included compiler. Be sure to modify -j2 with the number of cpu cores on your build system to ensure the fastest build times.
```sh
jam -q -j2 @nightly-raw
```

# Compiling for Arm

Haiku can be compiled for devices leveraging the ARMv7 or later processor architecture.

{{< alert-danger "Unstable" "The state of the ARM port is extremely early. Roll up your sleeves and help out!">}}

## Create a Compiler Toolchain

Building the ARM compiler toolchain is quite easy using Haiku's ```configure``` tool.

> For a complete list of flags for the configure script, see [Haiku's Configure Options](/guides/building/configure)

1. Perform a git clone haiku and buildtools
2. Within the haiku source directory, create your workspace for ARM via ```mkdir generated.arm; cd generated.arm```
2. Leverage configure to build your ARM toolchain. ```../configure -j2 --build-cross-tools arm ../../buildtools```

## Building an MMC (SD Card) Image

Once you have a complete ARM toolchain, you can build a Haiku MMC disk image via ``jam -j2 -q @minimum-mmc``
This will generate an MMC image suitable for booting Haiku on a real ARM hardware device.

{{< alert-warning "Post-processing" "The generated MMC image only contains Haiku software. Most ARM hardware devices will require extra binary bootloaders (including u-boot). User-run automated post-processing tools are being developed to automate these steps.">}}

## Emulating ARM Image

The ARM images can also be emulated in QEMU. In the example below, we emulate a Raspberry Pi 2.

```sh qemu-system-arm -M raspi2 -kernel haiku_loader.ub -initrd haiku-floppyboot.tgz.ub -dtb rpi2.dtb -m 2G```

# Compiling for PowerPC

<h3>PowerPC Compiler Toolset</h3>
<p>Building the PowerPC compiler toolset is quite easy and involves generating gcc binaries for your platform. For a complete list of flags for the configure script, see <a href='/guides/building/configure'>Haiku's Configure Options</a></p>
<p>From the haiku source directory, run the following. (be sure to adjust the options to match your build environment.)
<pre class="terminal">./configure --build-cross-tools ppc ../buildtools</pre></p>

<p>If you want to run configure again to tweak some more options, you need to tell it to configure for PowerPC. This is done with the --cross-tools-prefix option:
<pre class="terminal">../configure --use-gcc-pipe --cross-tools-prefix cross-tools/bin/ppc-unknown-haiku-
</pre></p>

<h3>PowerPC Haiku Builds</h3>
<p>These builds require a valid PowerPC compiler toolset. The PowerPC port is in an <strong>extremely</strong> early state, don't expect these to work.

<h4>Compiling Haiku for Apple hardware</h4>
<p>Apple PowerPC hardware is starting to age. There was quite a bit of work on PowerPC code, however given the large amount of reliability issues with Apple PowerPC hardware and the large hardware cost, PowerPC development has slowed.<br/>

<b>To compile a Haiku boot cd for PowerPC:</b>
<pre class="terminal">jam -q haiku-boot-cd</pre>
<br/>
<b>To compile a Haiku network boot image:</b>
<a href="/guides/network_booting">Booting Haiku over a local network</a>
</p>
