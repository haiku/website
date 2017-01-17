+++
type = "blog"
author = "xyzzy"
title = "x86_64 port: final report"
date = "2012-08-28T09:57:09.000Z"
tags = ["gsoc", "gsoc2012", "x86_64"]
+++

Since the three-quarter term report, I have continued porting userland servers and apps. The app server is fully functional, as are Deskbar and Tracker and a few other apps. I also cross-compiled all of the basic development optional packages (GCC/Binutils, autotools, make, etc.) for x86_64. Another screenshot showing the current state of things is below:
<!--more-->
<div align="center">
<a href="/files/images/x86_64-final.png"><br />
<img src="/files/images/x86_64-final.png" width="640px" height="519px" />
<br /></a>
</div>

As you can see, this looks pretty much like a regular Haiku desktop. There's still a lot of things missing, though - not many apps or drivers yet. However, most things should be fairly simple to get working, typically just a few compilation fixes.

As expected, I encountered quite a few bugs in getting to this point, such as app_server rendering issues and crashes. These were caused by things like 64-bit calculation issues and type mismatches between client/server code - there were a few cases of one side using int32 in messages and the other side using long. Not an issue on 32-bit architectures because int32 and long are the same, but long is 64-bit on x86_64 so there was a mismatch. The most difficult bug to track down was intermittent kernel panics, particularly when the system was under heavy load. In the end I found that this was caused by libsupc++, the GCC C++ runtime support library. This library is linked into the kernel (and any C++ apps) to provide support code for C++ features like RTTI (dynamic_cast). The problem was that kernel code for x86_64 needs to be compiled with the GCC flag -mno-red-zone, to prevent use of the "red zone" specified by the AMD64 ABI. This is an area below the stack pointer that is reserved for code to use for temporary storage without changing the stack pointer. This can't be used in kernel code because CPU interrupts would overwrite that area. libsupc++ was not compiled with that flag, so it was using the red zone which ended up getting corrupted if an interrupt occurred during a dynamic_cast. I fixed this by building a separate libsupc++ for use by the kernel with the correct flags. Once this was fixed, stability improved a great deal, and in fact it is now possible to build Haiku x86_64 from within itself without running into any problems!

The future work required on the port is basically just continuing to port apps and drivers, and building more optional packages. Having the development packages available means it is easy for others to help with this. I won't be doing too many more fixes in my branch, as I think it'd be better to wait until after it is merged into the main repository (which I hope will happen after the Alpha 4 release). I've already made changes to a lot of code and the likelihood of merge conflicts will increase if I continue to make changes in my branch.

If anyone would like to try out the port, you can grab the code from <a href="https://github.com/xyzzy51/haiku/tree/x86_64">here</a> (don't forgot to check out the x86_64 branch after cloning) and build an image using the usual build targets. Be warned though that it's received nowhere near as much testing as the x86 port, so it could eat your data, kill your cat, etc ;) If you run into any bugs, feel free to poke me on the IRC channel about it.

Finally, thanks a lot to my mentor, Ingo Weinhold, and the other Haiku developers for the useful feedback on my code, as well as Rene Gollent and others who have been testing the port and reporting bugs!