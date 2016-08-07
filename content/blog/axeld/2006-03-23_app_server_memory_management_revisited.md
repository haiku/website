+++
type = "blog"
author = "axeld"
title = "app_server Memory Management Revisited"
date = "2006-03-23T08:30:00.000Z"
tags = ["app_server"]
+++

I recently looked into why BeIDE's interface did only have green squares where its icons should have been (bug #313). The function importing the client's bitmap data did not work correctly, and while playing with it, the app_server suddenly crashed, and continued to do so in a reproducible way.

How was this possible? Bitmaps are located in a shared memory pool between the app_server, and an application. Unfortunately, the app_server put those bitmaps into arbitrary larger areas, and put the structures managing that space into those areas as well - like a userland memory allocator would do. However, if a client clobbered memory outside of its space in those areas (and that's what buggy clients do all the time), the structures could be easily broken, which caused the app_server to crash when it tried to use them next time. Also, since all applications shared the same area, they could easily clobber bitmaps of each other, as well.

But there even were more disadvantages of the way client memory was managed: the client would clone that area for each bitmap therein - that meant for an application like Tracker with potentially tons of icons (which are bitmaps), that it wasted huge amounts of address space: if the area was 1 MB large and contained 500 icons, Tracker would have cloned that area 500 times, once for each icon, wasting 500 MB of address space. If you have a folder with many image thumbnails, the maximum limit (2 GB per application) could have been reached with ease. Not a very good idea.

Another problem of the previous solution was memory fragmentation and contention - if many applications were allocating server memory at the same time, their memory would have been spread out over the available areas, and since it was only a single resource, all applications needed to reserve their memory one after the other, for every single allocation. If now one of these applications were quit, its memory had to be freed again, and left holes in the area. Of course, the app_server needed to create quite a few areas - and with memory fragmentation like this, would waste much more memory and address space, which is a real concern in the app_server.

Anyway, the new solution works pretty much different: the app_server now tries to have a single area per application - if that application dies, that area can be freed instantly, without having to worry about other applications. To achieve this, the client reserves a certain area for the app_server - that makes sure that the area can be resized if required - at the server's side, the area is always exactly as large as needed. Since the app_server doesn't reserve space for the client, it comes up with fully relocatable memory; if an area cannot be resized in the app_server (since there are other areas in its way), it can be relocated to another address where it fits. If that's not possible, a new area is created, and the client is triggered to clone it. Of course, every area is now only cloned once in the client, too.

The structures that manage the allocations and free space in these areas are now separated from the memory itself, and not reachable by the client, with the desired effect that the app_server cannot be crashed that easily anymore that way. The contention is reduced to the requirements of a single application which should be much more adequate.

As an additional bonus, the new solution should be much faster due to the wastly reduced amount of area creations and clones. The allocator itself is pretty simple, though, and could probably be improved further, however it works pretty nice so far.