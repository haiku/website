+++
type = "blog"
author = "axeld"
title = "Almost, but not there yet"
date = "2010-12-14T22:08:56.000Z"
tags = ["wpa", "WiFi", "haikuware bounty"]
+++

<p>As you might have noticed, the WiFi encryption bounty ends tomorrow. Obviously, this is a good time to give an overview over what I did in the past weeks. Unfortunately, and hopefully before I got you excited, the most interesting thing of the bounty, the wpa_supplicant, does not work yet. I've ported it to Haiku, but so far it has resisted my attempts to find out where the problem is located -- well, in the hours I put into debugging I've found a couple of potential causes, but there is at least one more to be found, and fixed.</p>
<!--more-->
<p>The bounty was divided into three parts: the first was porting the wpa_supplicant, the second one was to design, and implement a C++ API to use WLAN functions; the WLAN functionality is pretty much completely covered by the new BNetworkDevice class. The final part was to integrate the WiFi functionality into userland applications like ifconfig, net_server, NetworkStatus, and the Network preferences application.</p>

<p>While there is always room for improvement, I at least completed the last two parts of the bounty. I have not published the wpa_supplicant port anywhere yet, as I need to clean it up a bit before, and I haven't decided where to put it yet. In any case, I intend to work on this over the next weeks.</p>

<p>Haiku will now automatically try to connect to a configured wireless network, or an open one from your neighborhood in case you have not configured anything, unless the wireless interface had been disabled. You can select which network should be chosen via Network, and you can also switch networks during runtime via the NetworkStatus application which will also show you a list of all available networks, and their signal strength.</p>

<p>Currently, if you need to connect to a password protected network, you need to configure it manually (due to the wpa_supplicant, this will only work with WEP for now), and put the password into the configuration file in clear text. This is obviously only a temporary solution - net_server should use a system wide password manager that takes care of that. To do so, you need to create a file called <i>"wireless_networks"</i> along with the other network configuration files in <i>/boot/common/settings/network/</i>. If your network is called gurke, and your password is salat, the contents of that file could look like this:</p>
<pre>
network gurke {
    password salat
}
</pre>
<p>In case the net_server does not correctly detect the network as WEP "protected" (you can check this using the ifconfig command), you can also override the detection by adding a line like "authentication wep".</p>

<p>With ifconfig, you can also connect to a password protected network manually; it has some more WLAN support functions now:</p>

<ul>
    <li>"ifconfig /dev/net/iprowifi3945/0 list" will show all known networks. You can also only scan for a specific network by adding its name as argument. It will also show the authentication protocol, as well the cipher as well as the key management mode that is used for encryption.</li>
    <li>"ifconfig /dev/net/iprowifi3945/0 join gurke salat" will join the network "gurke" using the password "salat".</li>
    <li>"ifconfig /dev/net/iprowifi3945/0 leave gurke" will leave the network again.</li>
</ul>

<p>Since the Network preferences application is scheduled to be replaced some day, I kept the changes there rather simple: you can only choose whether the net_server should automatically choose a network for you, or if you force a particular one.</p>

<p>I hope you are not too disappointed that there is still an important chunk missing yet, but I am willing to complete the work I started - since I am currently pretty low on free time, it might take some weeks though.</p>

<p>In any case, I welcome suggestions on how to further improve the user interface, as well as the C++ API powering it. There is at least one limitation that I know of, though: hidden SSIDs are not supported yet, since they do not provide any actual protection, and only make things less user friendly, I did not take the time to make them work yet.</p>