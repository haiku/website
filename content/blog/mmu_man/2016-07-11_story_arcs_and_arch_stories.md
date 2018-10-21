+++
type = "blog"
author = "mmu_man"
title = "Story arcs and arch stories"
date = "2016-07-11T11:24:09.000Z"
tags = ["m68k", "porting", "powerpc", "ppc", "sam460ex", "amiga", "arm", "atari", "bebox"]
+++

This week I just received a blue box.

<img src="/files/Misc_TARDIS.png" />

No, not this kind of blue box!

…
<a href="https://www.youtube.com/watch?v=13S58aQw7wA">Spoilers!</a>

<!--more-->

<h3>Blue box</h3>

<p>Actually, some time ago, Finn Bastiansen mailed me, asking if I was interested in getting a BeBox he didn't use anymore. He thought about auctioning it first and giving the money to Haiku, Inc. but he thought it'd be interesting to see if it could boot Haiku. It might take some time but should be quite doable.</p>

<img src="/files/BeBox_DSCN4982_0.jpg" width="48%" height="48%" align="left" alt="Unboxing the blue box" title="Unboxing the blue box" /><img src="/files/BeBox_DSCN4983_0.jpg" width="48%" height="48%" align="left" alt="Unboxing the blue box" title="Unboxing the blue box" />
It's a weird feeling opening the thing…

<img src="/files/BeBox_DSCN4984_0.jpg" width="48%" height="48%" align="left" alt="Beeeeee Box!" title="Beeeeee Box!" />It's in pretty good condition for such an old lady. The two top plastic caps are left alone, they have broken clips but I should be able to fix that. The gray facade has yellowed a bit, but not too much.

Now, I just notice we don't have an HVIF icon for it yet.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Let's see what's inside…


<img src="/files/BeBox_DSCN4985_0.jpg" width="48%" height="48%" align="left" alt="" title="" /><img src="/files/BeBox_DSCN4986_0.jpg" width="48%" height="48%" align="left" alt="" title="" />

Other than the CD audio connector (I managed to straighten it back enough to plug it back) which is not really well placed, the inside looks good as well.

<img src="/files/BeBox_DSCN4995.jpg" width="48%" height="48%" align="left" alt="Blinkenlights!" title="Blinkenlights!" />

The famous Blinkenlights behind the case. They work quite well ;-)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Hmm, where did I put my AT keyboard… oh here it is!

Let's see how it boots now…

<img src="/files/BeBox_DSCN4988_0.jpg" width="48%" height="48%" align="left" alt="" title="" /><img src="/files/BeBox_DSCN4990.jpg" width="48%" height="48%" align="left" alt="" title="" />

At least it tries to… oh, the harddisk was plugged off! Let's fix this… much better!

So what's the CPU already?

<img src="/files/BeBox_DSCN4992.jpg" width="48%" height="48%" align="left" alt="sysinfo output" title="sysinfo output" /><img src="/files/BeBox_DSCN4994.jpg" width="48%" height="48%" align="left" alt="About box" title="About box" />

So, it works. Now will it someday run Haiku? We're quite far from it, but it should be doable. The <a href="http://wiki.netbsd.org/ports/bebox/">NetBSD port</a> should provide some hints about drivers, memory mappings and such. Interestingly also, <a href="http://www.mess.org/">MESS</a> (which has now been fully integrated into MAME) has some support for BeBox emulation. There is some attempt at adding a <a href="http://wiki.qemu.org/Features/BeBox">BeBox target</a> to QEMU as well (I also started looking at it long ago). First steps should be to see how far those emulation targets work, then how to best get to haiku_loader from the BeBox nub ROM, which is much simpler than OpenFirmware. An option would be to port <a href="http://www.openfirmware.info/Welcome_to_OpenBIOS">OpenBIOS</a> and CoreBoot to it, and let it start haiku_loader. Then I'd write an FDT for the BeBox, as that's what the ARM ports now support to describe the hardware, and the PPC port on Linux as well (they even dump the OpenFirmware tree into an FDT), so I think I'll use it on PPC as well.

Anyway, thanks Finn for giving me more work ahead! ;-)

<h3>Sam 460ex</h3>

<img src="/files/Sam460_DSCN4997.jpg" width="48%" height="48%" align="left" alt="" title="" /><img src="/files/Sam460_DSCN4998.jpg" width="48%" height="48%" align="left" alt="" title="" />

That's the Sam460ex box I'm currently porting Haiku to. Progress has been quite slow for now, mostly getting binutils and gcc fixed after each update to the buildtools, but hopefully I'll get past this point. At last <a href="http://triplea.fr/alchimie/">Alchimie demoparty</a> I showed the bootloader splashscreen, although it was hardcoded with the framebuffer address because, well U-Boot is a mess, and ACube's version is probably the messiest I've seen.

I started writing a QEMU target for the Sam board (there's a <a href="https://github.com/mmuman/qemu/tree/sam460ex-WIP-rebasing">rebasing branch</a> on github). My <a href="https://github.com/mmuman/haiku/tree/sam460ex">Haiku sam branch</a> also gets rebased from time to time.

<h3>Raise your ARM!</h3>

<img src="/files/EfikaMX_DSCN4999.jpg" width="48%" height="48%" align="right" alt="" title="" />I also have some ARM hardware waiting for a usable port, but these will have to wait a bit more I guess. For example this <a href="https://genesi.company/products/efika">EfikaMX</a>, which although much older than a Raspberry Pi has a much nicer case ;-)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

<h3>68k news</h3>

Some of you may know I also started a port to the 68k architecture. It probably won't be usable but it'd definitely be cool to see Haiku booting on an Atari Falcon. Although I wrote Amiga support for the bootloader, most Amiga models have an EC CPU, that is, without any MMU, meaning they wouldn't be usable at all.

I just learnt about a new CPU card called <a href="http://amigastore.eu/en/501-aca-1233n40mhz-includes-mmu-and-128mb-of-ram.html">ACA 1233n</a> for the Classic Amiga (A1200 and A500) that includes a full 68030 at 40MHz and 128MB of RAM, which should be enough for Haiku to boot to the desktop when all the 68k support is finished. But we're not there yet!

<b>Update:</b>

Buildtools still compile, here's what I use:
<pre>
mkdir generated-m68k-gcc4
cd generated-m68k-gcc4
../configure --build-cross-tools m68k ../../buildtools --use-xattr --use-gcc-pipe --distro-compatibility official --enable-multiuser --include-gpl-addons --include-patented-code --include-3rdparty --bootstrap ../../../haikuporter/haikuporter/haikuporter ../../../haikuports.cross/haikuports.cross ../../../haikuports/haikuports
</pre>

I also built GDB from the 7.8 stock sources although I'm not sure I'll use it:
<pre>
mkdir build/gdb && cd build/gdb && ../../../gdb-7.8/configure --target=m68k-elf --enable-multilib --prefix=/home/revol/devel/haiku/trunk/generated-m68k-gcc4/cross-tools-m68k && make && make install && cd - && rm -Rf build/gdb
</pre>

Now let's see if the Atari bootloader still builds…
<pre>
cd ..
(cd generated-m68k-gcc4/; jam -q @bootstrap-raw haiku-boot-floppy haiku.prg)
</pre>
… ok so now it wants to bootstrap packages by starting to build gcc, it may take a while… or not:
<pre>
libiberty/mkstemps.c:84:18: error: storage size of 'tv' isn't known
</pre>
I suppose some new definitions are missing from some header.

…

Ok, so 3 hours later I just understood that configure in libiberty (part of gcc) actually discards headers that emit a warning, like, well, the "#warning M68K:" I added in signal.h, so it basically misses half of them. No wonder it doesn't build. Now, it's possible it does it for PPC as well, I'll have to check this.

<b>Update 2:</b>

I just managed to build the kernel_m68k again \o/
