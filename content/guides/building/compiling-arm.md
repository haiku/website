+++
type = "article"
title = "Compiling Haiku for Arm"
date = "2012-09-08T19:18:09.000Z"
tags = ["compiling", "arm"]
+++

<h3>ARM Compiler Toolset</h3>
<p>Building the ARM compiler toolset is quite easy and involves generating gcc binaries for your platform.
For a complete list of flags for the configure script, see <a href='/guides/building/configure'>Haiku's Configure Options</a></p>

<p>From the haiku source directory, run the following. (be sure to adjust the options to match your build environment.)
<pre class="terminal">mkdir generated.armpi; cd generated.armpi
../configure --build-cross-tools arm ../../buildtools --target-board BOARD</pre></p>

<p>If you want to run configure again to tweak some more options, you need to tell it to configure for ARM. This is done with the --cross-tools-prefix option:
<pre class="terminal">../configure --use-gcc-pipe --cross-tools-prefix cross-tools/bin/arm-unknown-haiku- --target-board BOARD
</pre></p>

<p>The target-board parameter (BOARD) will set the configuration for both the compiler and the Haiku image built from the generated Jamfile. Available target boards are can be found on the <a href='/guides/building/port_status'>port status</a> matrix.

<h3>ARM Haiku Builds</h3>
<p>These builds require a valid ARM compiler toolset. The ARM ports are in an <strong>extremely</strong> early state, don't expect these to work.

<h4>Compiling Haiku for the Beagle Board xm</h4>
<p>The <a href='http://beagleboard.org/' target='_blank'>Beagle Board xm</a> is a 75x75 mm ARM computer with all the features you would find on a normal x86 desktop machine. The AM37x includes an Cortex-A8 ARM processor and 256 MB of flash memory paired with 512 MB of RAM. This board is also supported by the Linaro version of Qemu.
<pre class="terminal">jam -q @minimum-mmc</pre>
</p>

<h4>Compiling Haiku for the Verdex (mostly qemu)</h4>
<p>The <a href='http://docwiki.gumstix.org/Verdex' target='_blank'>Verdex</a> is an extremely small ARM machine marketed by Gumstix. It utilizes a PXA270 ARM processor made by Marvell. Testing with QEMU requires a firmware image in addition to the SD card image. This is done by jamming haiku-flash-uimage.
<pre class="terminal">jam -q haiku-mmc-image haiku-flash-uimage</pre>
</p>

<h4>Compiling Haiku for the Raspberry Pi</h4>
<p>The <a href='http://raspberrypi.org' target='_blank'>Raspberry Pi</a> is a popular small ARM computer geared towards the educational market. Given the extremely low price (US$ 35) of the Raspberry Pi, demand has been quite high.  The Pi includes a BCM2835 system on a chip (SoC), containing an ARM1176JZF-S processor bolted to the side of a VideoCore IV GPU. The more popular B model contains 256MB RAM with a configurable split between the ARM processor and the VideoCore GPU.</p>
<p>While the Raspberry Pi is attractive due to it's extremely low cost compared to it's moderate performance, it does have the drawback of the firmware being very closed source. The Raspberry Pi foundation does however work with developers to make improvements to the closed source firmware.</p>
<p>There is an <strong>extremely</strong> early port of Haiku to the Raspberry Pi.
<pre class="terminal">jam -q @minimum-mmc</pre>
</pre>
</p>