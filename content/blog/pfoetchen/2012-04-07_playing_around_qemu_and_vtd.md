+++
type = "blog"
author = "pfoetchen"
title = "Playing Around With QEMU and VT-d"
date = "2012-04-07T21:38:30.000Z"
tags = ["vtd", "iommu", "vt-d", "pci", "radeon"]
+++

Yesterday I played a bit with qemu and the VT-d/IOMMU extension. The Vt-d extension present in many modern <a href="http://wiki.xensource.com/xenwiki/VTdHowTo">processors</a> allows you to forward a PCI-device directly to your virtual machine so you can access it from the virtual machine as if it were a real device. This can be very helpful to develop drivers for PCI-devices without having to reboot the whole computer all the time.
<br/>
For example in my PC I use my Intel-onboard graphic as my main graphics card but I also have a Radeon in the PCI-express slot so I tried to forward it to my Haiku VM and it was more or less successful ;). To do that under Linux you have to detach the card from its real driver (probably the <code>radeon</code> kernel module under linux) and give it to the <code>pci-stub</code> module (you might have to load it first). To get the PCI-IDs and all the other information use <code>lspci</code>.
<pre>
# where 1002 is the vendor ID and 68f9 is the device ID of the Radeon card
echo "68f9 1002" > /sys/bus/pci/drivers/pci-stub/new_id
#unbind the device from the driver "0000:01:00.0" is the first device on the PCI-express-bus
echo 0000:01:00.0 > /sys/bus/pci/devices/0000:01:00.0/driver/unbind
# unbinding might take some time so better be save than sorry ;)
sleep 5
#and finaly bind it to pci-stub
echo 0000:01:00.0 > /sys/bus/pci/drivers/pci-stub/bind
</pre>

Now the Radeon card should be assigned to the pci-stub driver (you might have to rebind the audio part, too). This threw some errors for me but it still worked ;)

So we can come to the interesting part of it all: starting qemu with the new device I used the following comandline:
<pre>
qemu-system-x86_64  -m 1024  -cdrom haiku-nightly-anyboot.image -device pci-assign,host=01:00.0  -serial file:log.txt
</pre>
The thing that does all the work is the <code>-device pci-assign,host=01:00.0</code> part that assigns the radeon card we just bound to the <code>pci-stub</code> driver to the virtual machine. Qemu should now start and boot on the normal qemu window but as soon as it loads the (Haiku) <code>radeon</code> driver with some luck your monitor attached to the Radeon card will go on and display something that should look like Haiku ;). It worked for me after some help from Alexander von Gluck.


This method will work with many devices but it has some caveats:
<ul>
<li> <b>binding a graphics card is not yet officially supported by qemu</b></li>
<li>the graphics card was not yet started by the bios so the driver has to start it itself and that is probably the reason why I did get a rather distorted picture an my monitor sounded like it would explode soon ;)... </li>
<li> binding single devices does only work with PCI-express. If you want to bind a normal PCI-device you have to bind the whole PCI bus afaik</a></li>
<li> and the whole system is still quite experimental ;)</li>
</ul>

So have fun with this little trick and develop/test some cool drivers for haiku ;)

Ps: It works for Windows, too: I could play HL2 without any problems on my real Radeon (but I often get bluescreens if the card tries to save power...)
PPs: you should probably not annoy kallist5 with vt-d related bugs to much it is not supposed to work yet ;)