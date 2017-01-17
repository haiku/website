+++
type = "blog"
author = "engima"
title = "Haiku SVN: USBKit, Messaging, VMDK"
date = "2007-03-13T08:18:54.000Z"
tags = ["usb", "USBKit", "BMessage", "VMWare", "VMDK"]
+++

<h3>Quick Updates</h3>
<em>19900-20000</em>
<ul>
<li>Introduction of USBKit reimplementation</li>
<li>Interesting local message passing optimisations</li>
<li>VMWare vmdk tools
<ul><li>vmdk image generator</li>
<li>vmdk jam target: haiku-vmware-image</li></ul></li></ul>
<!--more-->
<h3>Full Updates</h3>
<p>Kicking off this period was the introduction a reengineered USBKit compatible USB library implementation from Michael Lotz. His library includes a number of features such as 'string getters' for interfaces that will interest USB fans in addition to building fine under R5!</p>

<p>Immediately following the above the usb_webcam driver was updated to reflect the changes, with build fixes and removing Zeta specific code. Subsequently added to the haiku-image target, this could provide some fun for alpha testers.</p>

<p>Those interested in the depths of Haiku message passing should <a href="http://blubinc.com/revision/show/19968">check out</a> Axel's local message passing optimisation, fixing a deadlock with full message queues.</p>

<p>In what will no doubt be a favourite tool of many, Marcus added a vmdk header generator for Haiku image files. Tested under VMWare player 1.0.3 and Linux it is sure to save time for those VMWare users out there. Try using the haiku-vmware-image target to build haiku.vmdk.</p>

<p>For those few interested souls we saw the update of FreeType2 to 2.3.0</p>