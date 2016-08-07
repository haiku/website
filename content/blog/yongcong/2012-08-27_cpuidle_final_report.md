+++
type = "blog"
author = "yongcong"
title = "cpuidle: final report"
date = "2012-08-27T12:18:33.000Z"
tags = []
+++

the last quarter term is mostly spent on acpi cpuidle driver implementation. I also spent about 2 days to adjust the cpuidle framework so that the cpuidle generic module is loaded by lowlevel cpuidle driver, while the later will be loaded during boot up either by bus enumeration or calling get_module() manually. I also tested the power after acpi cpuidle driver is finished. The result is as good as intel native one. Since all the goals defined in my proposal are achieved, so the project is successfully finished. 

Here I want to summarize the status:
<strong>generic cpuidle</strong>
generic cpuidle module is implemented which can be used on all cpu architectures;
<strong>x86 cpuidle driver</strong>
On x86 platform, we support intel native cpuidle driver and acpi cpuidle driver. The previous one make fully use of intel mwait extension support on intel newer cpus such snb, ivb or latter, since it won't touch the complex acpi part, it's preferred if the HW supports. The acpi driver is our last choice.
<strong>power saving number</strong>
On my T420 laptop, it saves about ~2.5watt
<strong>main limitation</strong>
we don't support old platform which doesn't have ARAT(always running apic timer). To support such platform, we need to enhance haiku's timer subsystem

I'd like to continue all the related power saving work in haiku such as to find and remove all the unnecessary wakeup source, to enchance haiku's timer subsystem mentioned above. I may also work on some acpi related driver, the acpi is complex but I learned a lot about acpi during this summer ;)


Finally I'd like to thank tqh for his guidance, carefully code review and kind help about ACPI related topics, thank haiku for giving me the chance to code for such a clean and beautiful operating system. I also owe a great deal to many haiku experts for their immediate answers on IRC or great suggestions on mail-list. The last thank belong to Google :D