+++
type = "blog"
title = "TUN/TAP Development Update 2"
author = "Pairisto"
date = "2023-06-29 22:57:53-05:00"
tags = ["haiku", "software"]
+++

More updates on the TUN Driver development!

## So What's Been Happening?
Thankfully I've been able to get a lot more done on the driver this week with finishing the write/sending functionality of the driver and I am currently on the reading/receiving functionality which is getting close to being done. At first I tried to implement a solution in the networking interface (tun.cpp) that didn't use iovecs but that just caught up to me in the end and it was just significantly easier to copy and paste the code from [ethernet.cpp](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/devices/ethernet/ethernet.cpp#n282)'s send/receive functions as that is something that works a lot better than what I was implementing. Me and my mentors also decided on using the already made [BufferQueue](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/protocols/tcp/BufferQueue.cpp) data structure for holding the data in the driver itself since it would just be plain easier to make the data parameter, when using read from a interface, a straight up net_buffer packet that it can immediately be read back and just use the `net_buffer_module_info` structs read function member to get the byte stream information that any application needs. The main roadblock I have with the read functionality is using semaphores correctly to stop the networking stack from continuously reading data that isn't there. As of writing this update, I am able to make read blocking but I am testing different ways I can release the semaphore for it to read data properly. Big shoutout to [PulkoMandy](https://discuss.haiku-os.org/u/pulkomandy/summary) and [Korli](https://discuss.haiku-os.org/u/korli/summary) for helping me with this issue!

## Anything Else on OpenVPN?
Not too much on this front since there still needs to be a working TUN Driver but huge thanks to [Begasus](https://discuss.haiku-os.org/u/Begasus)'s OpenVPN recipe that was posted to [haikuports](https://github.com/haikuports/haikuports/tree/master/net-vpn/openvpn) a couple of weeks back which helps me out a lot and I can just update it as I go.

Thanks for reading and I would love to respond to any questions or comments you have down below!
