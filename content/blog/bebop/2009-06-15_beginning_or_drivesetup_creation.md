+++
type = "blog"
author = "bebop"
title = "In the beginning (or DriveSetup creation)"
date = "2009-06-16T02:08:36.000Z"
tags = ["gsoc", "DriveSetup", "disk_device"]
+++

Another week has gone by and I am glad to say that some progress has been made. Just a few minutes ago I was able to create a brand new partition from within DriveSetup. The setup is as follows: Create a new empty Intel partition map (thanks Stippi), in that map create a new partition that spans the whole disk. It works! After that I initialized the partition with BFS and can install Haiku on it. 

This is far from a complete solution however, there are a few places were code that should not be commented out is commented out and a bunch of my debugging information is still in the code. Also one cannot yet set the size of the partition or where you want it on the disk and I suspect that being able to set these parameters will lead to some more bugs that I will get to track down. 

In any case I am really excited because I can finally see visual progress in the work that I have been doing which I think makes anyone happy. So stay tuned and hopefully I will have a nice neat patch in the near future. 
Ciao,
Bryce

p.s. BIG thanks to Bonefish.