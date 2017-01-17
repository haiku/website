+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #61"
date = "2015-01-30T09:27:54.000Z"
tags = ["contract work"]
+++

Hello there!

As you may have noticed if you watch the commit list closely, my libbind work has not been merged yet. There are still some bugs to solve there, but I got sidetracked. I use BReferenceable in my DNS cache implementation to keep track of the cache entries. BReferenceable is a class used in Haiku to implement reference counted objects. In C++, the language only has very simple memory management, in the form of the new and delete operators. Objects can be allocated on the stack (they are temporary and only last as long as the function they are declared in is executing), or on the heap (for long lived objects). Objects allocated on the stack are deleted automatically when the function exits, while objects allocated on the heap must be deleted manually. This is one of the annoying parts of C++: managing the lifetime of these objects, making sure they are deleted only once, and that no one will try to use them after deletion.
<!--more-->
In languages such as Java, object deletion is managed by a "garbage collector": this is a specific piece of code that looks for unused objects and releases their memory. It completely removes the need for the programmer to handle memory allocation and release. This solution has some limitations and is not easily applicable to C++ in a generic way.

Reference counting is a simpler approach to this. The idea is that each object knows how many "references" there are to it from other parts of the code. When the last reference is released, the object is unreachable and can be deleted. With the BReferenceable implementation, the C++ programmer must still manually acquire and release references to the object. This leaves more control of the memory allocation to him, while simplifying the memory management a lot.

BReferenceable can also be used to implement object pools, objects with shared or transferable ownership, and a few other patterns. As such it is a rather generic class, and used in many places throughout the system.

While trying to use BReferenceable in the DNS cache I got crashing issues with it and clearly invalid reference counts. I wanted to debug this, so I enabled the debugging features in BReferenceable. But this didn't work too well. I kept hitting issues in other places of the code using BReferenceable in ways that worked fine in release mode, but that the debug mode code didn't allow.

I fixed some of these in app_server so I could get a reasonably usable system, and continue debugging, but there are issues in several other places (for example in the package_daemon). This raised some discussion on whether the way BReferenceable is used in these places should actually be allowed, and to help resolve the issue, I wrote some documentation for the BReferenceable class.

I also worked on a way to handle references to const objects, which wasn't possible until now.

I also fixed a bug in the new getifaddrs implementation which locked the net_server on the first attempt to configure a network card. With that fixed I got DNS requests working, but very slowly. I will need to find why this happens.

I also did some work on WebKit again. As you probably know, there are problems with redirect requests, and sometimes Web+ would deadlock when loading a page. I found where the problem comes from, and partially fixed it, but there still are some issues. Either way, the situation is already much better, so I packaged a new WebKit release (1.4.9). I will try to fix the remaining issues in the coming weeks.