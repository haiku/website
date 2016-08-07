+++
type = "blog"
author = "axeld"
title = "SMP update"
date = "2005-10-22T18:34:00.000Z"
tags = ["smp"]
+++

Even though I usually don't work at the weekend, I had to, since I didn't manage to work 8 hours on friday.<br /><br />Unfortunately, I still haven't got SMP to work yet. I've investigated the issue, and came to the simple conclusion that the APIC interrupts doesn't reach their goal (it just took me some time to get there, and exlude all other possible faults). I can trigger such an interrupt manually, so the second CPU is setup correctly, but its APIC doesn't seem to be. You don't understand a word of what I just said? Well, let's just say one CPU doesn't manage to talk to the other CPU (through the APIC, the "advanced programmable interrupt controller").<br /><br />Basically, the boot process is halted as soon as the first CPU tries to tell the second CPU what to do, and then waits for an answer - until you stop it.<br /><br />I haven't been able to find a bug in the initialization code yet, and I haven't even started looking at the I/O APIC, but I still hope I can figure out what's going wrong on monday.
