+++
type = "article"
title = "VirtualBox Serial Debugging on Windows"
date = "2013-01-14T13:02:46.000Z"
tags = []
+++

This tutorial uses VirtualBox version 4.2.6. You can set <em>Port Mode</em> as either <em>Host Pipe Mode</em> or <em>Raw File Mode</em> when serial debugging with VirtualBox.

With <em>Raw File Mode</em>, you can easily and quickly save the debugged onto a .txt file whereas it might be rather difficult for to check out the content of debugging real time. When it comes to <em>Host Pipe Mode</em>, it's a little more complicated than the <em>Raw File Mode</em>, but you can confirm what is being debugged real time. The results made by the two modes differ little from each other, so we recommend you employ a relatively simpler way: <em>Raw File Mode</em>.

<h3>Serial Debugging using a Raw File</h3>
1. Run VirtualBox. Select your haiku image then click settings.
Select Serial ports. Tick the tickbox "Enable Serial port". Change <em>Port Mode</em> to "Raw File".

Then set the name and directory of the file to be saved in <em>File Path</em>.
<br /><img style="padding:12px" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-windows-debugging/image1.png" /><br />
And click start (virtual machine) or double click your Haiku image.

2. Once you open the file on the designated path, you can make sure it has been debugged.

<h3>Serial Debugging using Host pipe</h3>

<h4>HyperTerminal and VMWareGateway Method</h4>

1. First of all, you need vmwaregateway.exe (you can find that <a href="http://l4ka.sourceforge.net/download/vmwaregateway.exe">here</a>) Move the downloaded file to the directory you want.

2. Start Command Prompt by pressing <span class="button">Win</span>+<span class="button">R</span> and enter "cmd". Then drag and drop vmwaregateway.exe onto cmd with the mouse. Then add "/t" before pushing the <span class="button">Enter</span> button on your keyboard.

<pre class="terminal">C:\Documents and Settings\me>"C:\where\vmware\gateway\is\vmwaregateway.exe" /t

test mode - press <span class="button">Ctrl</span>+<span class="button">c</span> to stop program</pre>

3. Run HyperTerminal. If your OS is Windows XP, you can find it here: Start>Programs>Accessories>Communications>HyperTerminal

However if you are running Windows vista, Windows 7, and Windows 8, then sadly HyperTerminal is not included as a bundled application like XP had. These later versions of windows do have software we can use, but it is not at all user friendly, rather you should just download HyperTerminal from <a href="http://digitizor.com/2009/08/29/install-winxp-hyperterminal-client-on-windows-vista-or-windows-7-free/">here</a> and follow the directions given. If you run HyperTerminal, it will ask you to create a new connection, pick a name and icon. Click <span class="button">OK</span>.

After it will ask you what you are connecting with, change it to "<em>TCP/IP(winsock)</em>"
Change the host address to "localhost" and change the port number to "<em>567</em>", click <span class="button">OK</span> again.
<br /><img style="padding:12px" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-windows-debugging/image2.png" /><br />
If it can't connect, vmwaregateway.exe isn't running in Command Prompt properly.

Command Prompt should now read:

<pre class="terminal">C:\Documents and Settings\me>

C:\Documents and Settings\me>"C:\where\vmware\gateway\is\vmwaregateway.exe" /t

test mode - press <span class="button">Ctrl</span>+<span class="button">c</span> to stop program incoming telnet request accepted</pre>

4. Run Virtualbox. Select your Haiku image then click settings.
Select <strong>Serial ports</strong>. Tick the tickbox "<em>Enable Serial port</em>" and for <strong>Port Number</strong> tick "<em>COM1</em>"(Because Haiku by default writes debug information to the COM1 port)

Change Port mode to "<em>host pipe</em>" and change the port path to: \\.\pipe\vmwaredebug and click <span class="button">OK</span>
<br /><img style="padding:12px" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-windows-debugging/image3.png" /><br />
When you start your VM, it will now be debugging onto HyperTerminal.
<br /><img style="padding:12px" width="660" src="https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/virtualbox-windows-debugging/image4.png" /><br />

<h4>PuTTY Method</h4>

A simpler way is to use PuTTY Telnet, which can read VirtualBox's fake serial port pipe directly without the need for vmwaregateway.exe. You can get Putty from the author's site at http://www.chiark.greenend.org.uk/~sgtatham/putty/

<br /><img style="padding:12px" src="http://www.haiku-os.org/files/PuttySerialPipeSettings.png" alt="[PuTTY Settings for displaying a Pipe as a Serial Port]"><br />

The trick is to use Serial mode, and replace the COM1 with \\.\pipe\vmwaredebug or whatever you called the pipe in the VirtualBox serial settings.  There are additional serial settings near the end of the preferences where you can set the baud rate to 115200, turn off handshaking and use 8N1 bits.

Then fire up VirtualBox, and once it is running your VM, the pipe will exist and you can start up PuTTY.

<h3>Configure Haiku</h3>

If you are to control the output port and speed, you should do it with Haiku.

Run Haiku on VirtualBox
Open the file  /boot/home/config/settings/kernel/drivers/kernel.

1. To revise Output Port,

<pre class="terminal">#serial_debug_port num</pre>

Turn "num" into any figure you want. Default setting is 0 (COM1).

2. To change Transmission speed,

<pre class="terminal">#serial_debug_speed values</pre>

Change values. Values available are <9600|19200|38400|57600|115200> with the default being 115200. 
Turn "num" into any figure you want. Default setting is 0 (COM1).