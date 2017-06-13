+++
type = "article"
title = "VirtualBox Serial Debugging on Linux"
date = "2013-01-09T15:30:28.000Z"
tags = []
+++

This tutorial describes using a feature of VirtualBox that writes the output of a serial port into a file on the host machine. Because Haiku, by default, writes debug information to the COM1 port, you can use it to quickly extract stacktraces to text files, for example.

This tutorial is based on following tools:
<ul>
 <li>Debian Wheezy</li>
 <li>VirtualBox 4.1.18</li>
 <li>Haiku R1A4.1</li>
</ul>

It should also work on platforms other than Linux.

<img alt="Result" width="660" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-linux-debugging/image1.png" />

<h3 id="part_vm">Step 1: Configure the virtual machine</h3>
First, we will create a serial port in VirtualBox and redirect its output to file:
<ol>
 <li>Open machine settings.</li>
 <li>Go to the <em>Serial Ports</em> tab.</li>
 <li>Check <em>Enable Serial Port</em>.</li>
 <li>Under <em>Port Number</em>, chose a port and remember the one you pick.</li>
 <li>In the <em>Port Mode</em> menu, choose the <em>Raw File</em> option.</li>
 <li>In the <em>Port/File Path</em> field, enter the output file path.</li>
 <li>Click OK.</li>
</ol>

<div class="alert alert-info">There is also the possibility to redirect output to a physical port:
<ul>
 <li>Choose the <em>Host Device</em> option in the <em>Port Mode</em> menu</li>
 <li>Change <em>Port/File Path</em> values to port file path (for example <em>/dev/ttyS0</em> on Linux, <em>COM1</em> on Windows).</li>
</ul>
</div>

<img alt="Configuration example" width="660" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-linux-debugging/image2.png" />

<h3 id="part_haiku">Step 2: Configure Haiku</h3>
This step allows you to adjust output port and speed. If you have chosen COM1 as your virtual port and you don't want to change the default speed (115200 bps), there is no need to do anything.
<ol>
 <li>Launch Haiku VM.</li>
 <li>Open the <em>/boot/home/config/settings/kernel/drivers/kernel</em> file.</li>
</ol>
However, if your virtual port is something else, change the desired output port in this line:
From
<pre>#serial_debug_port 1</pre>
to
<pre>serial_debug_port number</pre>

"<em>number</em>" is the serial port number minus 1 (COM2 = 1).

You can also adapt the  transmission speed:
Change the line:
<pre>#serial_debug_speed 57600</pre>
to
<pre>serial_debug_speed speed</pre>
Possible "<em>speed</em>" values are: 9600, 19200, 38400, 57600, 115200.

<h3 id="part_finish">The End</h3>
<div class="alert alert-warning">Don't forget to delete or move the output file! VirtualBox won't do it automatically and it can grow to immense sizes.</div>