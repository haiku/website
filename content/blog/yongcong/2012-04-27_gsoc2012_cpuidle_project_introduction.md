+++
type = "blog"
author = "yongcong"
title = "gsoc2012 cpuidle project introduction"
date = "2012-04-27T16:04:08.000Z"
tags = []
+++

My gsoc2012 project is adding cpuidle support to haiku. As we all know, transistor power consumption is composed of dynamic and static ones. The former is due to charge/discharge of capacitance and other switching activity; the later is due to leakage and bias current. In the following section, I'd like to simply abstract power saving technology in nowadays cpu; powering saving technology in nowadays OS; what's missing in haiku, IOW the reason why I want to work on it.

<strong>Power saving technology in CPU</strong>
Dynamic Frequency and Voltage Scaling
Change core frequency and the corresponding supply voltage on the fly. This technology can reduce both reduce the dynamic and static power consumption.

clock gating
stop clock distribution. This technology can reduce dynamic power consumption

power gating
With the improvement of manufacturing process, transistor feature size reduced significantly. Smaller transistors consumes less dynamic power due to lower voltage and gate capacitance. On the other hand, it consumes more static power due to leakage current rises s exponentially. One manufacturing technology -- the so called power gating can almost really cut off the transistors, so the leakage current and voltage is nearly zero. This technology can reduce static power consumption.

DFVS is used in the so called p-state. Clock gating and power gating is used in the so called C-states idle.

<strong>OS technology</strong>
Basically, two components are used: macro(suspend to ram or disk) and micro. The micro component consists of two components too:
cpufreq makes use of the DFVS technology in cpu
cpuidle makes use of the clock gating and power gating technology in cpu.


<strong>what's Haiku missing</strong>
Haiku can support pstate to some extent. However, since the DFVS is taken much less use than clock gating and power gating, and the leakage current is more obvious, the cpuidle is more and more important in nowadays OS.

<strong>What I will do</strong>
In my gsoc project, I'd like to implement the general cpuidle support and specific driver: intel idle driver for intel newer CPUs such as i3,i5,i7 etc. and acpi driver. Also one userspace tool is implemented to tell us the idle stages' statistics. I believe my project will benefit haiku in power efficiency and laptops' battery life.

During the bonding period, I'd like to dig into acpi spec and try to get the c-states information from ACPI _CST table and read documents about power saving from intel and AMD.

Last but not least, I'm glad work on this project under haiku's mentors guide.I can't wait to benchmark the power saving results after cpuidle is enabled on haiku;)