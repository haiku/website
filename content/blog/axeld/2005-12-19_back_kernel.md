+++
type = "blog"
author = "axeld"
title = "Back To The Kernel "
date = "2005-12-19T20:16:00.000Z"
tags = ["kernel", "vm", "swap"]
+++

It's not that the app_server is ready and polished or anything close - but it's in an acceptable state. For now, my main focus is back in the kernel, although I'll come back to the app_server from time to time in the next days and weeks.

I am currently looking into getting paging support for Haiku. That's the feature you know by the term "virtual memory" or "swapping". Plain and simple it makes Haiku support more memory than you have installed in your computer. When the RAM is full Haiku will utilize the hard disk as an additional backing store.

But why would I start working on this before Haiku even runs stable? One reason is indeed to increase the system stability: currently, it's almost impossible to let the system run out of memory. Am I contradicting myself here? It looks like I do, granted, but let me try to explain what I mean. No, you don't have to know. If you like, you can just skip to the next paragraph. Yeah, you don't have to read that one either if you don't like :-))

Anyway, when an area of memory is allocated, the memory is not really taken from the system memory - it's just reserved. Only the memory you are really using is actually taken from the system page pool (where one page is an architecture dependent amount of memory, usually it's 4096 bytes), we call this "committing memory". Especially with binaries, the areas created for them are usually much larger than what finally makes its way into the memory, certain functionality that you don't use of your web browser or debug info aren't loaded into memory to safe space and time.
So theoretically, we could always promise more memory than we can actually deliver. Just think about the main stack area in BeOS: it's a 16 MB area per application. You don't need that many fingers to figure out how many applications you could run if the system would be entirely honest with you (well, at least a few years ago you would have been successful doing so). So yes, it's lying. If every application would actually need its whole stack, the system would need to stop them before memory becomes really tight. This technique is known as "overcommitting" - the system pretends to have what you might need, because it assumes that you won't need it.
Therefore, it shouldn't lie to you that often, it should choose these occasions wisely. Haiku only uses this for stacks. For everything else it makes sure it can deliver the memory it had previously promised to you. This can result in "out of memory" situations even though there are plenty of free pages left - the problem with those pages is that they are promised to someone else. They may still get used for system caches and the like, but they are unavailable to applications.

And that's where the swap file comes in: having some extra space in there, the system can promise much more memory, and thus, can actually use up those pages for real, it can really have no free pages left. In other words, to run out of memory (to be able to test the kernel in these situations) it needs to at least think it has a swap file.

The Haiku swap file implementation will be anything but spectacular, but it'll hopefully work good enough for our target audience - the usual desktop user don't have that heavy requirements there. On the other hand, it will probably work better than the one in BeOS - at least I can hardly imagine how it could run that badly :-)