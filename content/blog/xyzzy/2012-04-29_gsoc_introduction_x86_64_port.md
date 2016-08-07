+++
type = "blog"
author = "xyzzy"
title = "GSoC Introduction: x86_64 port"
date = "2012-04-29T14:52:49.000Z"
tags = ["gsoc", "gsoc2012", "x86_64"]
+++

My name is Alex, I am a first year computer science student with a strong interest in operating systems and low-level software. My GSoC project this year is to begin a port of Haiku to the x86_64 architecture. Almost all modern x86 CPUs have 64-bit support, therefore a port of Haiku will allow it to take full advantage of these CPUs. The GSoC coding period is almost certainly too little time to finish a port of the whole OS, however my plan is to have ported at least the boot loader, kernel and some modules/drivers.

Universities in the UK finish later than most US universities, I do not finish my exams until a couple of weeks into the GSoC coding period. Therefore, there is a limited amount of work I will be able to do during the community bonding period. However, while researching my project proposal I’ve got myself familiar with the Haiku codebase and also submitted patches to fix the GCC4 x86_64 toolchain, which have been committed. I will use time that I do have to continue to familiarise myself with the Haiku code and start thinking about some of the implementation details of my project.

During the coding period, I will first work on the boot loader. I intend to modify the existing x86 boot loader so that it is capable of loading both a 32-bit Haiku kernel and a 64-bit one. Once this is done, I will work on implementing the x86_64 architecture functionality in the kernel. Finally, I will port modules and drivers to the 64-bit kernel.

Should I have time, I will also begin work on porting userland. As I said, there may not be enough time to get that far, but even if I don’t, there’s some future work for me to do after GSoC.
