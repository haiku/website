+++
type = "blog"
title = "[GSoC 2023] VPN Support Project Update #6"
author = "Pairisto"
date = "2023-08-17 21:53:21-05:00"
tags = ["haiku", "software"]
+++

## Where We Last Left Off
So last time I posted I was able to say that I got the client side for OpenVPN on Haiku working but not the server but I am proud to say that now both the server and client work extremely well now on Haiku :) I was able to get the server from not working to working and was able to get the latency for the entire VPN operation down from 1000ms average to anywhere between 2ms to 9ms (that's a caveat as that is without blocking which will be discussed later). I had a check in my tun_read() function wrong where I wanted any side that is non-blocking to send a signal to the other side's condition variable that something is now in their queue but had it backwards with a `not` statement in there. The simplest mistakes slip the mind huh :p Anyway, the server also follows suit with the faster latency so now that the read and write functions are basically complete, lets get on with what I was dealing with for the past 2ish weeks.
## New Week, New Problems
After I had gotten the read and write functions sorted out I wanted to move on to making sure the tun_close() function works properly as before it would just hang when `ifconfig down/delete` were called on the interface. I realized that the hanging behavior was due to the interface waiting for the reader thread to return something in the [down_device_interface()](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/network/stack/device_interfaces.cpp#n575) function in device_interfaces.cpp. Well it sounds like a simple fix, notify the condition variable in tun_close() and job well done right? WRONG! Whenever I would add the NotifyAll() method into tun_close(), I would get a kernel panic saying:
```
attempt to acquire lock (some random address here) twice on non-SMP system (last caller: 0x0000000000000000, value deadbeef)
```
After the error was shown in KDL, it would show me that this was coming from the tun_read() `Wait` that I was doing on the condition variable where it specifically locks again. If you don't know how condition variable waiting works, here is a brief run down and look at the code [here](https://cgit.haiku-os.org/haiku/tree/src/system/kernel/condition_variable.cpp#n302):
1. You pass in a locked mutex and depending on what language you are using, either the condition variable itself or Wait will be a method to a condition variable class like it is with Haiku
2. It will then unlock the mutex
3. Wait using a thread blocker and spinlock
4. When notified, it will then exit the wait function and relock the mutex
The last part was where the problem was. This was an extremely odd error to get since tun_write() also needs to notify the locked read thread but that has never done something like this. This error basically came about due to me trying to acquire the mutex at the same time so I decided to make the tun_close() function pause for a bit after it notified the mutex and started working again.

Now one last thing that I mentioned in my last post was that OpenVPN takes about 99% CPU usage on Haiku which is still in a weird state of affairs for now. I had thought that since OpenVPN wants the driver in a non-blocking state to operate efficiently, we would need Asynchronous I/O to get the write and read calls to not block each other but we do not have this functionality (yet ;)). That was when Waddlesplash and x512 helped me with looking at the source code for OpenVPN and realized that it had a select/poll way of doing things instead of AIO. Now I have the select functionality working, however, this is where there are some problems as it works but not well as the average latency is above 2000ms and when using ping it drops more than 60% of packets on average. Hopefully I can fine tune things though I don't know how much more I can give what select itself is and how the implementation of select you have to do in Haiku is done but I will update you all on this.  
## Moving Forward
Now that tun_close() is done, there is really only one thing that I want to finish up before I feel like the code is ready for a push to the main code base being that I want the driver to be dynamically allocated. The behavior that I am looking for is that when `ifconfig tap1 ... up` is called, I want it to be able to make a new entry in devfs with the name provided to ifconfig like in Linux. Currently, the way I have it set up is to have the entry in devfs made when Haiku starts which I personally don't want to push out like that since it's just a devfs entry that may never be used by the user. There are two immediate problems that I see being:
1. The creation of a new devfs entry upon `open()`.
2. How I will differentiate the application side from the interface side.
The first problem will probably be solved by understanding how making an entry in devfs works though that will be learning so I will learn more about that. Maybe something like [this](https://cgit.haiku-os.org/haiku/tree/src/add-ons/kernel/drivers/network/ether/etherpci/etherpci.c#n1408) could help? Moving onto the second problem, my current solution for it is creating another entry called `tun_interface` within `/dev/misc` that the interface calls on which helps with differentiating the two sides. However, I would rather have the interface just call on the name it was given to through `ifconfig` which would then bring up that devfs entry. So an `IOCTL` call when the interface is going up can probably do the trick if I just have the default `tun_struct` be in the app's form and then change it to the interfaces form through said call.

Thank you all for reading, please feel free to leave a comment!
