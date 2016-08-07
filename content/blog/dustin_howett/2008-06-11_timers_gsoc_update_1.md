+++
type = "blog"
author = "dustin_howett"
title = "Timers (GSoC) Update #1"
date = "2008-06-11T05:32:25.000Z"
tags = ["gsoc", "timer", "hpet"]
+++

Just posting a very brief entry to let you all know what's up with HPET support in Haiku.

So far, I've been able to mostly separate all the x86 timers into individual (but still statically linked into the kernel) modules, and have them used based on priority.

Currently, they break booting on my system (qemu works, though, with the ISA timer).

Brief TODO (<b>in no particular order</b>):
<ul><li>Modify how each arch advertises which timers it supports</li>
<li>Migrate the other arch timers into modules (low priority, since the other architectures are not fully supported, I believe)</li>
<li>Move priority & init code into the generic section, out of x86 (this can only be done when all other archs are migrated)</li>
<li>Implement HPET support (currently stubbed out, but the module is there.)</li>
<li>Work on system_time()</li>
<li>Fix the immediate issues with booting and the like</li></ul>