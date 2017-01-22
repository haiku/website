+++
type = "blog"
author = "mmu_man"
title = "Helping on m68k"
date = "2008-08-03T22:17:04.000Z"
tags = ["port", "m68k"]
+++

As the m68k port is getting shape, maybe some of you want to give a hand, so here is how to set up the environment. After explaining the choice of the target platform we'll start with the build system, then the emulator to debug on the chosen platform.


<!--more-->


<h3>Why not Macs? I want it on my Amiga! I have a NeXT to give away!</h3>
<i>(I wish ;))</i>
The choice of the target platform was actually directed by the available emulators for various m68k machines. <a href="http://bellard.org/qemu/">QEMU</a> has a m68k target, but it's still only ColdFire, not the real thing. And it doesn't emulate an existing machine.
Most operating systems for the 68k machines from this era had to support cpus ranging from the bare 68000 to 68030. This means most didn't actually use the MMU available on the 030 and later CPU. Actually, many machines were using Low Cost versions like the <a href="https://en.wikipedia.org/wiki/Motorola_68EC030">68EC030</a> which lacked either the FPU or the MMU. This was the case of most Amiga models, of course one could add CPU boards with a 040 or 060 to them. But we do need an mmu for Haiku. While I own a <a href="http://68kmla.net/wiki/Macintosh_LC_III">Mac LC III</a> which has a full 030, <a href="https://en.wikipedia.org/wiki/Basilisk_II">Basilisk II</a> doesn't emulate the MMU as far as I know, because since most Macs didn't have one, MacOS didn't use it anyway, except for swapping when enabled in some versions.
I don't know of any <a href="https://en.wikipedia.org/wiki/NeXT">NeXT</a> emulator, but just shout if you do. 
Early SUN workstations were also using 68k chips, but with a custom MMU so let's not talk about them.
The Amiga has a well known emulator, <a href="http://uae.coresystems.de/">UAE</a>, but it doesn't have MMU support either. I heard recent WinUAE does, but I just don't use Windows for real work. But it will probably make a good second candidate for later on. It seems there is even an attempt at creating a <a href="http://www.natami.net/">new 68K-based Amiga</a>.
There are some other 68k platforms around, like <a href="https://en.wikipedia.org/wiki/X68000">X68000</a>, which a 030 model existed, but they are quite rare. The only common platform left is the Atari <a href="https://en.wikipedia.org/wiki/Atari_Falcon">Falcon</a>, for which the emulator <a href="http://aranym.org/">ARAnyM</a> (for Atari Running on Any Machine) actually provides full 040 emulation, including the MMU. The platform is also much more standardized and documented than Macs, due to the low number of models and being a gaming platform forced Atari to stay hardware compatible with the plain ST, whereas Macs used the ROM and the OS to abstract the hardware which radically changed from one model to the next.


<h3>Making a build</h3>
It's not much different from a regular x86 build, the only difference being the target architecture. To get the required tools, just follow the <a href="/documents/dev/building_haiku_on_ubuntu_linux_step_by_step">Linux guide</a>, then when comes the time of configuring, instead we'll do a
<pre>./configure  --build-cross-tools-gcc4 m68k ../buildtools/</pre>
This should build the cross compiler and set everything up.
Then just go forward with a
<pre>jam -q haiku-image</pre>
The kernel isn't fully working yet, but everything should build just fine.

Now we'll also need a bootloader that can be used by the emulator. For now we only target the Atari Falcon. Theoretically, the Falcon should be able to just go ahead and use the BFS boot sector, but at least the emulator doesn't do it, mostly because on most Atari machines harddrive support needs to load drivers first. To make things easier also, the bootloader can be built as a .prg file that can be loaded directly by the emulator. It should be possible to also build a bootable floppy, but it's not yet working, so let's use a .prg, which can also be used on real machines, when put in the AUTO folder.
<pre>jam -q haiku.prg</pre>

<h3>Testing it</h3>
Now we'll need something to test this image, and don't expect your laptop to boot it.
First, we'll need a recent ARAnyM, as I fixed an issue with Transparent Translation Register handling, so release version won't work.
We'll just use the CVS version:
<pre>cvs -d:pserver:anoncvs@cvs.aranym.org:/var/repos login
cvs -z3 -d:pserver:anoncvs@cvs.aranym.org:/var/repos co aranym
cd aranym
./configure --enable-fullmmu --enable-fullhistory
make</pre>
Optionally we can install it, as root:
<pre>
su
make install</pre>
But it can also be run from there with the full path.

We'll also need a ROM to boot. Luckily, Some people reimplemented the full Atari ROM as Free Software, it's named AFROS.
Go download it from <a href="http://aranym.org/afros.html">here</a>, just follow the link to sourceforge.
Unzip it somewhere. We'll now copy the default configuration file to tweak it, and create a symlink to the haiku.prg we generated earlier.
<pre>
cd afros-0.9.5
cp config haiku
ln -s /path/to/haiku/trunk/generated/objects/haiku/m68k/release/system/boot/platform/atari_m68k/haiku.prg  system/
</pre>
Now, edit the file named haiku, and changes matching lines to:
<pre>
Bootstrap = system/haiku.prg
RedirConsole = Yes
</pre>
And in the [IDE0] section:
<pre>
Present = Yes
ByteSwap = Yes
Path = /path/to/haiku/trunk/generated/haiku.image
</pre>

Now you should be set. To start the emulator, let's try:
<pre>
/path/to/aranym -c ~/afros-0.9.5/haiku
</pre>

After a lot of messages, it should present you the familiar boot menu, where you can select the partition to use, and continue booting.
Then it will load the kernel.
I'm still working on getting the kernel on shape, so it won't go far, but feel free to help out.