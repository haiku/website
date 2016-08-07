+++
type = "blog"
author = "yongcong"
title = "cpuidle: three quarter term report"
date = "2012-08-05T11:34:33.000Z"
tags = ["gsoc2012", "gsoc"]
+++

I began to implement the acpi cpuidle driver so that the power saving feature can benefit all x86 platforms(In theory although). The acpi is more complicated than I thought. The main time is spent on implementing "_CST" evaluation and decoding. 

First of all, to evaluate any acpi object/method needs acpi handle. Since haiku doesn't export AcpiWalkSpace method of acpica, so after system booting, I can get the acpi processor handle. the only solution is using the device manager so that the acpi cpuidle driver can be loaded during boot. This requires cpuidle modification so that generic cpuidle module is loaded by low level idle driver.  The modification is not done because it's simple and I want to get "_CST" evaluation done firstly.

To evaluate "_CST", we need to evaluate "_PDC" or "_OSC" firstly. While "_OSC" is preferred than "_PDC" from ACPI 3.0. So my implementation evaluate "_OSC", fallback to "_PDC" if failed.

The "_CST" decoding is simpler than "_CST" evaluation. Some code is ready during gsoc bonding period. I just make it finished.

Then I came across one big problem which block me for one week--under haiku, the acpi processor is enumerated in "cpu8=>cpu7...=>cpu1" rather than "cpu1=>cpu2=>...>cpu8". The later order is taken by Linux, FreeBSD, NetBSD, etc. To evaluate "_CST" of cpu8 needs "_CST" of CPU1, so haiku's enumeration make the acpica reports AE_NOT_FOUND. But I dunno such requirement before, I even dig into acpica code but found nothing. After frustrated for about one week, I realized that the problem may exists in the evaluation order so I dumped the according processor id every acpi processor and found the reason. In no more than ten minutes, I implemented one workaround and it works!! Here is the CSTATES information dumped from my laptop

<pre>
KERN: evaluate _CST @0x821e7698
KERN: cpuidle found 2 cstates
KERN: c1
KERN: Latency: 1
KERN: power: 1000
KERN: bufer length 17
KERN: cpu_reg size: 15
KERN: FFH method
KERN: c3
KERN: Latency: 104
KERN: power: 350
KERN: bufer length 17
KERN: cpu_reg size: 15
KERN: IO method
</pre>

NOTE: Here, Cx is acpi reported Cx rather than OS's cx. For example, acpi's C2 is missing if AC is plugged. But Linux take ACPI C3 as the OS C2. I would like the take similar solution to make the generic cpuidle module happy