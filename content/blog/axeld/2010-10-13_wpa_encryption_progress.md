+++
type = "blog"
author = "axeld"
title = "WPA encryption progress"
date = "2010-10-13T21:03:41.000Z"
tags = ["wpa", "network", "WLAN", "haikuware bounty"]
+++

<p>
I've been working on getting WPA encryption to work on Haiku. While I haven't been able to invest as much time as I hoped for before, I made a bit of progress that at least justifies a small status update.
</p>
The first part of WPA related work has actually happened while I was working on the network stack for Haiku Inc., as it was not possible to inject packets into the network - while you could easily monitor all incoming packets, there was no mechanism to send packets for arbitrary protocols. I've extended the AF_LINK protocol to be able to deliver that mechanism.
</p>
<p>
Then I started the actual work on porting wpa_supplicant, the standard tool for allowing WPA/WPA2 encryption almost everywhere. Since we're using the net80211 WLAN stack as part of our FreeBSD driver compatibility layer, a lot of code from the existing BSD driver backend could be used. There are actually only two differences between Haiku, and your favorite BSD for this kind of work:
</p>
<ul>
<li>ioctl() needs a length parameter that tells the kernel how large the structure passed in is. In BSD this information is encrypted in the control constant, but this is not the case for Haiku. While the BSD way is certainly more convenient, Haiku's solution is safer and more flexible.</li>
<li>the BSDs are using AF_ROUTE sockets to pass network notifications to the interested user software. In Haiku, we already have a system wide interprocess messaging service, and this is what is therefore used there. The only downside of this approach is that the API is C++ only which is probably something that won't be accepted upstream.</li>
<p>
After I had the driver backend ported, the next thing was to implement the level 2 packet support, as the wpa_supplicant needs a way to receive, and send packets outside of the usual protocols. This part is now using the AF_LINK method I described above, although there seems to be a problem left that I need to look into: select() always reports the socket readable. For now, due to the event based implementation of the wpa_supplicant, this is only causing a bit more CPU usage than you would want to have. I am not sure there is anything actually relying on receiving something yet (or if it works, as nothing has been sent or received so far).
</p>
<p>
Once I had the wpa_supplicant working in theory, more problems surfaced, though, as usual. One is that the FreeBSD driver layer does not receive a few ioctl() calls that need to be forwarded to it in the use case of wpa_supplicant. That one only took a bit of debugging, and I've added a quick hack that forwards the needed calls for now; since I'm not happy with that yet, I haven't committed the changes yet.
</p>
<p>
A more serious problem was that Colin did an iterative port of the net80211 stack: he added/implemented only the parts that were needed at the time. It seems that WPA needs a bit more parts; so far I've only added the xauth module which allowed me to actually receive node association events from the the stack. After that, it still fails for some reason, but I haven't figured out why.
</p>
<p>
I will only be able to work a few hours per week in the next weeks, so I hope I'll get something useful done until the deadline is hit. In any case, once I have the wpa_supplicant working, I will commit what I have done so far - since the wpa_supplicant currently needs private Haiku headers, and the changes I'm planning on doing are unlikely to be accepted upstream, I will probably end up adding all of its sources to the Haiku repository. Once I have WPA working, I will continue with extending the existing configuration tools to support WLAN as well. This will also cause further integration of the wpa_supplicant, it will probably end up being an add-on for the net_server.
</p>
