+++
type = "blog"
author = "stippi"
title = "Axel does not have a secret patch"
date = "2007-08-12T07:14:15.000Z"
tags = ["personal", "hardware"]
+++

<p align="justify">
Whenever I was with Axel and saw Haiku running on his IBM ThinkPad T40p, I was almost convinced, that he must have forgotten to commit a rather effective patch, though he swore that that was not the case. I have never seen the app_server perform so well on any other machine.<!--break--> When I saw this first, at the time I was working on a bigger patch to the app_server, but it was already taking me some time, and I was quite afraid that I had messed it up and must have made app_server much slower. But then I commited that work regardless and Axel installed it on his machine and it was just as fast. Before my patch to the BRegion implementation, which came some time later, Axel could degrade the performance by opening a couple more windows, but with the new BRegion code from XOrg, the app_server scales much better.
</p>

<p align="justify">
And now I have such a machine myself. My employer lend me his unneeded T40p and I swapped the harddrive with my installation. I'm sure that I run Haiku without Axel's secret patch and the performance is just as convincing as on his machine. So I must admit that Axel didn't, after all, forget to commit something. <br>Usually when I run Haiku, I think that we have got one long road ahead with our app_server. But running Haiku on this machine, which has much weaker specs by the way than my other computer, I'm tempted to think there is nothing left to do but fix bugs. The difference is like night and day! Not only is the window redraw absolutely instant without any lag, it is not even using a lot of CPU either. What is the secret of this little machine? Is Haiku bombarded with unkown interrupts, possibly power management related, on newer hardware? Is the IBM using shared memory for the frame buffer (I would think not)? Is our scheduler in love with the first generation Pentium-M and it's chipset? I have no idea, but I'm very curious to find out what it is, because if my other computers are not an exception, it could be very useful information with regards to "unlocking" Haiku on newer and much more powerful machines. I'm interested to know how Haiku performs on other peoples real hardware. Is there a strongly noticable lag when redrawing windows that are exposed by moving other windows, like I see with all my other computers?
</p>
