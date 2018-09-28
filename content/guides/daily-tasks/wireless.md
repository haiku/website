+++
type = "article"
title = "Connecting to wireless networks"
date = "2010-05-10T16:31:57.000Z"
tags = []
+++

Haiku has growing support for connecting to wireless (Wi-Fi, 802.11) networks and currently supports connecting to unencrypted, WEP encrypted and WPA encrypted wireless networks. However, because WEP encrypted wireless networks are not very secure, it is recommended that you configure your router and Haiku to use WPA.<br>
 
<h3>Pre-requirements</h3>
<ul>
<li>Haiku R1/beta1 or later</li>
<li>A <a href="#hardware-notes">supported</a> 802.11 wireless network device</li>
</ul>
<br>
 
 
<h3>The firmware installer</h3>
<p>
Some wireless network cards require binary firmware modules to operate.  Haiku cannot include some of these proprietary firmware files due to licensing issues. Haiku does however include an easy script which will retrieve and install all of the needed proprietary bits for you. Generally if you are planning to use wireless networking it is a good idea to run this to ensure your system has all the proprietary network code it might need.
<div class="alert alert-info">
If you are unable to access the Internet due to the lack of wireless firmware binaries, please check out the <a href='#firmware-offline'>offline</a> method of running the firmware installer.
</div>
<ol>
<li>Open the <span class='app'>Haiku Terminal</span></li>
<li>Type <span class='cli'>install-wifi-firmwares.sh</span> <span class="key">Enter</span></li>
<li>Review the licenses and accept them to install all of the available firmware files</li>
</ol>
</p>
 
<h3><a name="connect">Connecting to a WEP or WPA wireless network</a></h3>
Haiku has support for accessing wireless networks via <a href='#wep-notes'>WEP encryption keys</a> and WPA encryption keys. WEP is an old encryption method that is not the most secure. Therefore it is recommended that you use WPA.
 
<div class="alert alert-info">
If you are unsure on what to enter for your <em>wifi_device_path</em>, you can look at the <span class='app'>Network preferences</span> applet, or execute <span class='cli'>ifconfig -a</span> in the <span class='app'>Haiku Terminal</span>.
</div>

Below are a few examples of connecting to a wireless network named <em>wifitopia</em>. For these examples we are assuming your Wi-Fi network card is <em>/dev/net/iprowifi3945/0</em>. All commands have to be exexcuted in the Haiku Terminal.

<h4>Listing wireless networks:</h4>
<pre class="terminal">ifconfig /dev/net/iprowifi3945/0 list</pre>
     
<h4>Joining WEP or WPA secured wireless network using an ascii password:</h4>
<pre class="terminal">ifconfig /dev/net/iprowifi3945/0 join wifitopia mypassword</pre>
     
<h4>Joining WEP or WPA secured wireless network using a 64-bit hex password:</h4>
<pre class="terminal">ifconfig /dev/net/iprowifi3945/0 join wifitopia 0x4010FABEEF</pre>
     
<div class="alert alert-info">
<a name="wep-notes"><strong>WEP encryption keys</strong></a><br />
WEP encryption keys are password strings used to identify one's self to a wireless network and to encrypt data sent to the wireless network. A WEP password key can be a fixed length string or hexadecimal number.
<ul>
<li>64-bit WEP uses a 40-bit key, which means 5 text characters or 10 hex digits</li>
<li>128-bit WEP uses a 104-bit key, which means 13 text characters or 26 hex digits</li>
<li>hexadecimal digits = characters 0-9 and A through F (prepended with "0x" in <span class="cli">ifconfig</span>)</li>
</ul>
<strong>WPA encryption keys</strong><br />
WPA encryption keys don't have a fixed length. For security's sake, a minimum of 8 characters is recommended, however.
</div>

<h4>Leaving a wireless network:</h4>
<pre class="terminal">ifconfig /dev/net/iprowifi3945/0 leave wifitopia</pre>
This doesn't work WPA yet!

<h3><a name="connect">Automatically connecting to a wireless network</a></h3>
To make your system connect to a given SSID at each boot automatically, you can specify your wireless networks and passwords in <span class='path'>/boot/system/settings/network/wireless_networks</span> with the following format:
<pre>
    network wifitopia {
        password mypassword
    }
</pre>

Alternatively, you can put your ifconfig command to join your wireless network into the <em>UserBootscript</em> at <span class='path'>/boot/home/config/settings/boot/</span>.

<h3>Notes</h3>
 
<a name="firmware-offline"><strong>Offline download of binary firmware files.</strong></a>
<p>If you cannot obtain the binary firmware files via the install-wifi-firmwares.sh script (for example due to lack of Internet connection within Haiku), you can also <strong>download this <a href="/files/download-data-for-wlan-firmwares.txt">shell script</a></strong> (or the <a href="/files/alpha4_download-data-for-wlan-firmwares.txt">Alpha4-version</a> if you're still using that), <strong>and run it from another OS</strong> that has <span class="cli>wget</span> and <span class="cli">zip</span> installed.<br />
Windows users need to have <a href="http://gnuwin32.sourceforge.net/packages/wget.htm">wget</a> and <a href="http://gnuwin32.sourceforge.net/packages/zip.htm">zip</a> for Windows installed in their default locations and use this <a href="/files/download-data-for-wlan-firmwares.bat">batch script</a>.</p>
<p>The script will download the needed files and create a zip file that is to be extracted to Haiku's /boot. Once unpacked, execute the install-wifi-firmwares.sh script to install the firmware files.</p>
 
<h3><a name="hardware-notes"><strong>Wi-Fi hardware support</strong></a></h3>
To support a large number of wireless cards with reduced legwork, the Haiku wireless network drivers are FreeBSD wireless drivers wrapped in code to translate them to the Haiku driver subsystem.
 
<h4>Non-Supported Hardware</h4>
<ul>
<li>aironetwifi at least
        <ul>
        <li>Cisco Aironet 350 Series</li>
        <li>Aironet PCI4500</li>
        <li>Aironet PCI4800</li>
        </ul>
</li>
<li>The following Broadcom 43xx devices:
    <ul>
    <li>bcm4311: vendor 14e4, device 4311</li>
    <li>bcm4312: vendor 14e4, device 4315</li>
    </ul>
</li>
<div class="alert alert-warning">
As of R1A4, only PCI, PCI-X, PCI-Express, Mini PCI, and Mini PCI-Express devices are expected to work. PCMCIA, CardBus, ExpressCard, USB and ISA devices do not have the needed glue code to operate at this time.
</div>
</ul>
 
<h4>Supported Hardware</h4>
All of <a href="​https://www.freebsd.org/releases/11.1R/hardware.html#wlan">FreeBSD 11.1 WiFi drivers</a> except aironetwifi should be working.
<ul>
<li>atheroswifi supporting almost every Atheros pre-10K chipset</li>
<li>broadcom43xx supporting
        <ul>
        <li>Broadcom BCM4301</li>
        <li>Broadcom BCM4306</li>
        <li>Broadcom BCM4307</li>
        <li>Broadcom BCM4309</li>
        <li>Broadcom BCM4311</li>
        <li>Broadcom BCM4312</li>
        <li>Broadcom BCM4318</li>
        </ul>
</li>
<li>iprowifi2200 supporting
        <ul>
        <li>Intel Pro Wireless 2200BG</li>
        <li>Intel Pro Wireless 2225BG</li>
        <li>Intel Pro Wireless 2915ABG</li>
        </ul>
</li>
<li>iprowifi3945 supporting Intel Pro Wireless 3945+</li>
<li>iprowifi4965 supporting Intel Pro Wireless 4965+</li>
<li>idualwifi7260 supporting Intel Dual-Band Wireless AC 3160+/7260+</li>
<li>marvell88w8335 supporting
        <ul>
        <li>Marvell Libertas 88W8310</li>
        <li>Marvell Libertas 88W8335</li>
        </ul>
</li>
<li>marvell88w8363 supporting Marvell 88W8363</li>
<li>ralink2860 supporting Ralink RT2860</li>
<li>ralinkwifi supporting
        <ul>
        <li>Ralink RT2560</li>
        <li>Ralink RT2561S</li>
        <li>Ralink RT2561</li>
        <li>Ralink RT2661</li>
        </ul>
</li>
<li>wavelanwifi supporting at least
        <ul>
        <li>3Com Airconnect</li>
        <li>GLPRISM2 WaveLAN</li>
        <li>Intersil Prism3</li>
        <li>Intersil Prism2.5</li>
        <li>Linksys WDT11</li>
        <li>Netgear MA301</li>
        <li>PRISM2STA WaveLAN</li>
        <li>Siemens SpeedStream</li>
        <li>SMC 2602W</li>
        <li>Us Robotics 2415</li>
        <li>Addtron AWA-100 PCI</li>
        </ul>
</li>
</ul>
