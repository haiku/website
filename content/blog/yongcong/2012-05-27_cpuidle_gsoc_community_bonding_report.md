+++
type = "blog"
author = "yongcong"
title = "cpuidle: GSoC community bonding report"
date = "2012-05-27T13:38:12.000Z"
tags = ["gsoc", "gsoc2012"]
+++

As we all know, cpuidle can't save any power if cpu is wakeup frequently during idle-- cpu doesn't have chance to go to deep sleep. So to get power savings, besides cpuidle support, we must remove those unnecessary wakeups.

During the bonding period, I added some code to dump system timer wakeup events and found the cpu wakeup during idle is too high, ~550 wakeup/s. Then with the help of KDL, I found one obvious wakeup source -- the scheduler's quantumTimer. But I can't understand its duty. Then with the help of Axel, I catch its functionality and meaning. Axel also gave one suggestion:disable the timer for idle thread. So the only one patch during my bonding period was submitted and latter was merged by my mentor tqh. By my test, this patch removes ~41% unnecessary wakeups during idle.

My wakeup investigation goes further after then. I found another unnecessary wakeups source: intel e1000e ipro1000 driver. The freebsd network driver glue layer timer function: hardClock() is triggered too much(it sits in src/libs/compat/freebsd_network/clock.c). I can fix it but I think to remove all unnecessary wakeups can't be achieved in this summer and I should focus on my project. So I just decide to just remove the ipro1000 when testing.

Then with the help of mmu_man, I learned to quit process using roster. mmu_man also suggested kill Tracker and Deskbar because they are still using poll mode. Later I modified my bootscript to don't launch those services. Finally I succeeded to decrease the wakeup during idle from ~550 wakeup/s to ~30wakeup/s. It's enough for cpuidle testing.

I also read one excellent document about how to write power efficient software from intel:http://download.intel.com/technology/pdf/Green_Hill_Software.pdf.


The first goal(by the end of Jun11) should be x86 architecture specific code modifications. the first is to check whether we need to make arch_cpu_idle as a function pointer; the second is to add moniter/mwait instruction support. Because we need to use mointer/mwait extension to enter intel processors native deep states and it's simpler than ACPI solution. 